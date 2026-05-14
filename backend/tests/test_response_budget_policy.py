from app.integrations.openai.response_budget import ResponseBudgetPolicy


def test_response_budget_policy_gives_api_chat_more_room_than_telegram() -> None:
    api_budget = ResponseBudgetPolicy.for_turn(
        delivery_channel="api",
        response_style=None,
        motivation_mode="respond",
        role_name="advisor",
        plan_goal="reply",
    )
    telegram_budget = ResponseBudgetPolicy.for_turn(
        delivery_channel="telegram",
        response_style=None,
        motivation_mode="respond",
        role_name="advisor",
        plan_goal="reply",
    )

    assert api_budget.max_output_tokens > telegram_budget.max_output_tokens
    assert api_budget.target_characters > telegram_budget.target_characters
    assert "never stop mid-sentence" in api_budget.contract_summary


def test_response_budget_policy_keeps_concise_lower_cost_without_tiny_cap() -> None:
    concise_budget = ResponseBudgetPolicy.for_turn(
        delivery_channel="api",
        response_style="concise",
        motivation_mode="respond",
        role_name="advisor",
        plan_goal="reply",
    )
    normal_budget = ResponseBudgetPolicy.for_turn(
        delivery_channel="api",
        response_style=None,
        motivation_mode="respond",
        role_name="advisor",
        plan_goal="reply",
    )

    assert 120 < concise_budget.max_output_tokens < normal_budget.max_output_tokens
    assert concise_budget.target_characters < normal_budget.target_characters


def test_response_budget_policy_expands_deep_api_turns() -> None:
    normal_budget = ResponseBudgetPolicy.for_turn(
        delivery_channel="api",
        response_style=None,
        motivation_mode="respond",
        role_name="advisor",
        plan_goal="reply",
    )
    deep_budget = ResponseBudgetPolicy.for_turn(
        delivery_channel="api",
        response_style=None,
        motivation_mode="analyze",
        role_name="analyst",
        plan_goal="analyze implementation strategy",
    )

    assert deep_budget.max_output_tokens > normal_budget.max_output_tokens
    assert deep_budget.target_characters > normal_budget.target_characters


def test_response_budget_policy_prefers_explicit_structured_budget_over_deep_default() -> None:
    structured_budget = ResponseBudgetPolicy.for_turn(
        delivery_channel="api",
        response_style="structured",
        motivation_mode="analyze",
        role_name="analyst",
        plan_goal="analyze implementation strategy",
    )

    assert structured_budget == ResponseBudgetPolicy.API_STRUCTURED
