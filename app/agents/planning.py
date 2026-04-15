from app.core.contracts import ContextOutput, Event, MotivationOutput, PlanOutput, RoleOutput


class PlanningAgent:
    def run(
        self,
        event: Event,
        context: ContextOutput,
        motivation: MotivationOutput,
        role: RoleOutput,
        user_preferences: dict | None = None,
        theta: dict | None = None,
    ) -> PlanOutput:
        goal = "Provide a clear and useful response to the user event."
        steps = ["interpret_event", "review_context"]
        response_style = str((user_preferences or {}).get("response_style", "")).strip().lower()
        collaboration_preference = str((user_preferences or {}).get("collaboration_preference", "")).strip().lower()

        if motivation.mode == "clarify":
            goal = "Ask for the missing information needed to help."
            steps.extend(["request_missing_input", "prepare_response"])
        elif motivation.mode == "support" or role.selected == "friend":
            goal = "Provide grounded emotional support and one manageable next step."
            steps.extend(["acknowledge_emotion", "reduce_pressure", "prepare_response"])
        elif motivation.mode == "execute" or role.selected == "executor":
            goal = "Move the requested task toward execution with the smallest concrete next step."
            steps.extend(["identify_requested_change", "propose_execution_step", "prepare_response"])
        elif motivation.mode == "analyze" or role.selected == "analyst":
            goal = "Explain the situation clearly and suggest a structured next step."
            steps.extend(["break_down_problem", "highlight_next_step", "prepare_response"])
        elif role.selected == "mentor":
            goal = "Guide the user toward a confident next step."
            steps.extend(["offer_guidance", "prepare_response"])
        else:
            steps.append("prepare_response")

        needs_response = motivation.mode != "ignore"
        needs_action = event.source == "telegram" and needs_response
        if needs_action:
            steps.append("send_telegram_message")

        if response_style == "concise" and "keep_response_concise" not in steps:
            prepare_index = steps.index("prepare_response") if "prepare_response" in steps else len(steps)
            steps.insert(prepare_index, "keep_response_concise")
        elif response_style == "structured" and "format_response_as_bullets" not in steps:
            prepare_index = steps.index("prepare_response") if "prepare_response" in steps else len(steps)
            steps.insert(prepare_index, "format_response_as_bullets")

        goal = self._apply_collaboration_preference_goal(
            goal=goal,
            collaboration_preference=collaboration_preference,
            motivation=motivation,
            role=role,
        )
        collaboration_step = self._collaboration_plan_step(
            collaboration_preference=collaboration_preference,
            steps=steps,
        )
        if collaboration_step is not None and collaboration_step not in steps:
            prepare_index = steps.index("prepare_response") if "prepare_response" in steps else len(steps)
            steps.insert(prepare_index, collaboration_step)

        theta_step = self._theta_plan_step(theta=theta, steps=steps)
        if theta_step is not None and theta_step not in steps:
            prepare_index = steps.index("prepare_response") if "prepare_response" in steps else len(steps)
            steps.insert(prepare_index, theta_step)

        return PlanOutput(
            goal=goal,
            steps=steps,
            needs_action=needs_action,
            needs_response=needs_response,
        )

    def _theta_plan_step(self, theta: dict | None, steps: list[str]) -> str | None:
        if not theta:
            return None

        candidates = {
            "maintain_supportive_stance": float(theta.get("support_bias", 0.0) or 0.0),
            "favor_structured_reasoning": float(theta.get("analysis_bias", 0.0) or 0.0),
            "favor_concrete_next_step": float(theta.get("execution_bias", 0.0) or 0.0),
        }
        step, bias = max(candidates.items(), key=lambda item: item[1])
        if bias < 0.58:
            return None

        if step == "maintain_supportive_stance" and (
            "acknowledge_emotion" in steps or "reduce_pressure" in steps
        ):
            return None
        if step == "favor_structured_reasoning" and "break_down_problem" in steps:
            return None
        if step == "favor_concrete_next_step" and "propose_execution_step" in steps:
            return None
        return step

    def _collaboration_plan_step(self, collaboration_preference: str, steps: list[str]) -> str | None:
        if collaboration_preference == "hands_on":
            if "propose_execution_step" in steps or "favor_concrete_next_step" in steps:
                return None
            return "favor_concrete_next_step"
        if collaboration_preference == "guided":
            if (
                "offer_guidance" in steps
                or "break_down_problem" in steps
                or "favor_guided_walkthrough" in steps
            ):
                return None
            return "favor_guided_walkthrough"
        return None

    def _apply_collaboration_preference_goal(
        self,
        goal: str,
        collaboration_preference: str,
        motivation: MotivationOutput,
        role: RoleOutput,
    ) -> str:
        if collaboration_preference == "hands_on":
            if motivation.mode == "execute" or role.selected == "executor":
                return "Move the requested task toward execution with the smallest concrete next step."
            return "Provide a clear response that ends with a concrete next step."
        if collaboration_preference == "guided":
            if motivation.mode == "analyze" or role.selected in {"analyst", "mentor"}:
                return "Explain the situation clearly with a guided step by step path."
            return "Guide the user through the next step in a calm, step by step way."
        return goal
