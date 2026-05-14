from dataclasses import dataclass


@dataclass(frozen=True)
class ResponseBudget:
    channel: str
    response_style: str
    intent_depth: str
    target_characters: int
    max_output_tokens: int

    @property
    def contract_summary(self) -> str:
        return (
            f"Channel: {self.channel}. Style: {self.response_style}. "
            f"Intent depth: {self.intent_depth}. Aim for about "
            f"{self.target_characters} characters when the task fits. "
            "Complete the answer cleanly: never stop mid-sentence, mid-list, "
            "or inside an unfinished code block. If the topic needs more than "
            "the budget, deliver a complete useful first part and explicitly "
            "offer to continue."
        )


class ResponseBudgetPolicy:
    """Owns output budgets separately from transport delivery limits."""

    API_CONCISE = ResponseBudget(
        channel="api",
        response_style="concise",
        intent_depth="brief",
        target_characters=1800,
        max_output_tokens=650,
    )
    API_NORMAL = ResponseBudget(
        channel="api",
        response_style="default",
        intent_depth="normal",
        target_characters=5200,
        max_output_tokens=1800,
    )
    API_STRUCTURED = ResponseBudget(
        channel="api",
        response_style="structured",
        intent_depth="structured",
        target_characters=6200,
        max_output_tokens=2100,
    )
    API_DEEP = ResponseBudget(
        channel="api",
        response_style="default",
        intent_depth="deep",
        target_characters=7600,
        max_output_tokens=2600,
    )
    TELEGRAM_CONCISE = ResponseBudget(
        channel="telegram",
        response_style="concise",
        intent_depth="brief",
        target_characters=1500,
        max_output_tokens=550,
    )
    TELEGRAM_NORMAL = ResponseBudget(
        channel="telegram",
        response_style="default",
        intent_depth="normal",
        target_characters=3600,
        max_output_tokens=1300,
    )
    TELEGRAM_STRUCTURED = ResponseBudget(
        channel="telegram",
        response_style="structured",
        intent_depth="structured",
        target_characters=3900,
        max_output_tokens=1450,
    )
    TELEGRAM_DEEP = ResponseBudget(
        channel="telegram",
        response_style="default",
        intent_depth="deep",
        target_characters=4400,
        max_output_tokens=1800,
    )

    @classmethod
    def for_turn(
        cls,
        *,
        delivery_channel: str,
        response_style: str | None,
        motivation_mode: str,
        role_name: str,
        plan_goal: str,
    ) -> ResponseBudget:
        channel = cls._normalize_channel(delivery_channel)
        style = cls._normalize_style(response_style)
        deep = cls._is_deep_intent(
            motivation_mode=motivation_mode,
            role_name=role_name,
            plan_goal=plan_goal,
        )

        if channel == "telegram":
            if style == "concise":
                return cls.TELEGRAM_CONCISE
            if style == "structured":
                return cls.TELEGRAM_STRUCTURED
            if deep:
                return cls.TELEGRAM_DEEP
            return cls.TELEGRAM_NORMAL

        if style == "concise":
            return cls.API_CONCISE
        if style == "structured":
            return cls.API_STRUCTURED
        if deep:
            return cls.API_DEEP
        return cls.API_NORMAL

    @classmethod
    def _normalize_channel(cls, delivery_channel: str) -> str:
        channel = str(delivery_channel or "api").strip().lower()
        if channel == "telegram":
            return "telegram"
        return "api"

    @classmethod
    def _normalize_style(cls, response_style: str | None) -> str:
        style = str(response_style or "default").strip().lower()
        if style in {"concise", "direct"}:
            return "concise"
        if style == "structured":
            return "structured"
        return "default"

    @classmethod
    def _is_deep_intent(
        cls,
        *,
        motivation_mode: str,
        role_name: str,
        plan_goal: str,
    ) -> bool:
        mode = str(motivation_mode or "").strip().lower()
        role = str(role_name or "").strip().lower()
        goal = str(plan_goal or "").strip().lower()
        if mode in {"analyze", "execute"}:
            return True
        if role in {"analyst", "mentor", "executor"}:
            return True
        deep_markers = (
            "plan",
            "architecture",
            "analysis",
            "analyze",
            "design",
            "implementation",
            "strategy",
        )
        return any(marker in goal for marker in deep_markers)
