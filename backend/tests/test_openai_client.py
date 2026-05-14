from types import SimpleNamespace

from app.integrations.openai.client import OpenAIClient
from app.integrations.openai.response_budget import ResponseBudgetPolicy


class _FakeResponses:
    def __init__(self, output_text: str | None):
        self.output_text = output_text
        self.calls = []

    async def create(self, **kwargs):  # noqa: ANN003
        self.calls.append(kwargs)
        return SimpleNamespace(output_text=self.output_text)


class _FakeClient:
    def __init__(self, output_text: str | None):
        self.responses = _FakeResponses(output_text=output_text)


async def test_openai_client_classify_affective_state_accepts_valid_structured_payload() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(
        output_text=(
            '{"affect_label":"support_distress","intensity":0.78,'
            '"needs_support":true,"confidence":0.74,"evidence":["overwhelmed"]}'
        )
    )

    result = await client.classify_affective_state(
        user_text="I feel overwhelmed",
        response_language="en",
    )

    assert isinstance(result, dict)
    assert result["affect_label"] == "support_distress"
    assert result["needs_support"] is True
    assert result["evidence"] == ["overwhelmed"]


async def test_openai_client_classify_affective_state_extracts_json_object_from_wrapped_text() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(
        output_text=(
            "```json\n"
            '{"affect_label":"neutral","intensity":0.11,"needs_support":false,'
            '"confidence":0.67,"evidence":[]}\n'
            "```"
        )
    )

    result = await client.classify_affective_state(
        user_text="hello",
        response_language="en",
    )

    assert isinstance(result, dict)
    assert result["affect_label"] == "neutral"
    assert result["needs_support"] is False


async def test_openai_client_classify_affective_state_returns_diagnostic_when_schema_keys_are_missing() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(output_text='{"affect_label":"neutral"}')

    result = await client.classify_affective_state(
        user_text="hello",
        response_language="en",
    )

    assert result == {
        OpenAIClient.AFFECTIVE_FALLBACK_REASON_FIELD: "openai_affective_schema_missing_keys"
    }


async def test_openai_client_classify_affective_state_returns_diagnostic_when_schema_type_is_invalid() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(
        output_text=(
            '{"affect_label":"neutral","intensity":"0.3","needs_support":"false",'
            '"confidence":0.67,"evidence":[]}'
        )
    )

    result = await client.classify_affective_state(
        user_text="hello",
        response_language="en",
    )

    assert result == {
        OpenAIClient.AFFECTIVE_FALLBACK_REASON_FIELD: "openai_affective_schema_invalid_needs_support_type"
    }


async def test_openai_client_classify_affective_state_returns_diagnostic_when_parse_fails() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(output_text="not-json")

    result = await client.classify_affective_state(
        user_text="hello",
        response_language="en",
    )

    assert result == {
        OpenAIClient.AFFECTIVE_FALLBACK_REASON_FIELD: "openai_affective_parse_failed"
    }


async def test_openai_client_generate_reply_uses_api_chat_response_budget() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(output_text="Generated answer")

    result = await client.generate_reply(
        user_text="Explain the plan in enough detail to finish the thought.",
        context_summary="ctx",
        foreground_awareness_summary="current turn",
        role_name="advisor",
        response_language="en",
        response_style=None,
        plan_goal="reply",
        motivation_mode="respond",
        response_tone="supportive",
        collaboration_preference=None,
    )

    assert result == "Generated answer"
    assert client.client.responses.calls[0]["max_output_tokens"] == ResponseBudgetPolicy.API_NORMAL.max_output_tokens
    system_prompt = client.client.responses.calls[0]["input"][0]["content"]
    assert "Channel: api." in system_prompt
    assert "never stop mid-sentence" in system_prompt


async def test_openai_client_generate_reply_keeps_concise_api_style_bounded_with_buffer() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(output_text="Generated answer")

    await client.generate_reply(
        user_text="Please answer briefly.",
        context_summary="ctx",
        foreground_awareness_summary="current turn",
        role_name="advisor",
        response_language="en",
        response_style="concise",
        plan_goal="reply",
        motivation_mode="respond",
        response_tone="supportive",
        collaboration_preference=None,
    )

    assert client.client.responses.calls[0]["max_output_tokens"] == ResponseBudgetPolicy.API_CONCISE.max_output_tokens
    assert ResponseBudgetPolicy.API_CONCISE.max_output_tokens > 120


async def test_openai_client_generate_reply_uses_telegram_budget_for_telegram_turn() -> None:
    client = OpenAIClient(api_key=None, model="gpt-test")
    client.client = _FakeClient(output_text="Generated answer")

    await client.generate_reply(
        user_text="Explain this through Telegram.",
        context_summary="ctx",
        foreground_awareness_summary="current turn",
        role_name="advisor",
        response_language="en",
        response_style=None,
        plan_goal="reply",
        motivation_mode="respond",
        response_tone="supportive",
        collaboration_preference=None,
        delivery_channel="telegram",
    )

    assert client.client.responses.calls[0]["max_output_tokens"] == (
        ResponseBudgetPolicy.TELEGRAM_NORMAL.max_output_tokens
    )
    system_prompt = client.client.responses.calls[0]["input"][0]["content"]
    assert "Channel: telegram." in system_prompt
