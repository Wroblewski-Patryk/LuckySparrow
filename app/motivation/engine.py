from app.core.contracts import ContextOutput, Event, MotivationOutput, PerceptionOutput
from app.utils.language import normalize_for_matching


class MotivationEngine:
    def run(
        self,
        event: Event,
        context: ContextOutput,
        perception: PerceptionOutput,
        user_preferences: dict | None = None,
        theta: dict | None = None,
        active_goals: list[dict] | None = None,
        active_tasks: list[dict] | None = None,
        goal_milestone_history: list[dict] | None = None,
        goal_progress_history: list[dict] | None = None,
    ) -> MotivationOutput:
        text = str(event.payload.get("text", "")).strip()
        lowered = normalize_for_matching(text)

        if not text:
            return MotivationOutput(
                importance=0.3,
                urgency=0.1,
                valence=0.0,
                arousal=0.1,
                mode="clarify",
            )

        emotional_keywords = {
            "sad",
            "stressed",
            "overwhelmed",
            "anxious",
            "tired",
            "lonely",
            "upset",
            "scared",
            "smutny",
            "smutna",
            "zestresowany",
            "zestresowana",
            "przytloczony",
            "przytloczona",
            "zmeczony",
            "samotny",
            "samotna",
            "zdenerwowany",
            "zdenerwowana",
        }
        urgent_keywords = {
            "urgent",
            "asap",
            "immediately",
            "now",
            "blocked",
            "broken",
            "production",
            "failing",
            "deadline",
            "pilne",
            "natychmiast",
            "teraz",
            "blokuje",
            "awaria",
            "produkcja",
            "termin",
        }
        analysis_keywords = {
            "analyze",
            "analysis",
            "review",
            "compare",
            "debug",
            "explain",
            "plan",
            "analiza",
            "przeanalizuj",
            "porownaj",
            "wyjasnij",
            "sprawdz",
            "zaplanuj",
        }
        execution_keywords = {
            "build",
            "create",
            "write",
            "fix",
            "implement",
            "add",
            "setup",
            "deploy",
            "zbuduj",
            "stworz",
            "napisz",
            "napraw",
            "wdroz",
            "dodaj",
            "skonfiguruj",
            "ustaw",
            "zrob",
        }
        positive_keywords = {"thanks", "thank you", "happy", "great", "awesome", "dzieki", "super"}

        has_question = text.endswith("?")
        has_urgent_signal = any(keyword in lowered for keyword in urgent_keywords) or "!" in text
        has_emotional_signal = any(keyword in lowered for keyword in emotional_keywords)
        has_analysis_signal = has_question or any(keyword in lowered for keyword in analysis_keywords)
        has_execution_signal = any(lowered.startswith(keyword) for keyword in execution_keywords)
        has_positive_signal = any(keyword in lowered for keyword in positive_keywords)
        is_brief_turn = len(lowered.split()) <= 4
        collaboration_preference = str((user_preferences or {}).get("collaboration_preference", "")).strip().lower()
        goal_execution_state = str((user_preferences or {}).get("goal_execution_state", "")).strip().lower()
        goal_progress_score = float((user_preferences or {}).get("goal_progress_score", 0.0) or 0.0)
        goal_progress_trend = str((user_preferences or {}).get("goal_progress_trend", "")).strip().lower()
        goal_progress_arc = str((user_preferences or {}).get("goal_progress_arc", "")).strip().lower()
        goal_milestone_state = str((user_preferences or {}).get("goal_milestone_state", "")).strip().lower()
        goal_milestone_transition = str((user_preferences or {}).get("goal_milestone_transition", "")).strip().lower()
        goal_milestone_risk = str((user_preferences or {}).get("goal_milestone_risk", "")).strip().lower()
        goal_completion_criteria = str((user_preferences or {}).get("goal_completion_criteria", "")).strip().lower()
        milestone_history_signal = self._goal_milestone_history_signal(goal_milestone_history or [])
        goal_history_signal = self._goal_history_signal(goal_progress_history or [])
        related_goal_priority = self._related_goal_priority(text=text, goals=active_goals or [])
        blocked_task_match = self._has_related_blocked_task(text=text, tasks=active_tasks or [])

        importance = 0.45
        importance += 0.15 if has_question else 0.0
        importance += 0.2 if has_urgent_signal else 0.0
        importance += min(context.risk_level, 0.2)
        importance += {"medium": 0.05, "high": 0.1, "critical": 0.18}.get(related_goal_priority, 0.0)
        importance += 0.08 if blocked_task_match else 0.0
        importance += (
            0.06
            if goal_execution_state == "blocked"
            else 0.05
            if goal_execution_state == "recovering"
            else 0.04
            if goal_execution_state == "advancing"
            else 0.04
            if goal_execution_state == "stagnating"
            else 0.03
            if goal_execution_state == "progressing"
            else 0.0
        )
        importance += 0.04 if 0 < goal_progress_score < 0.35 else 0.03 if goal_progress_score >= 0.75 else 0.0
        importance += (
            0.05
            if goal_progress_trend == "slipping"
            else 0.03
            if goal_progress_trend == "improving"
            else 0.01
            if goal_progress_trend == "steady"
            else 0.0
        )
        importance += (
            0.05
            if goal_progress_arc == "falling_behind"
            else 0.04
            if goal_progress_arc == "unstable_progress"
            else 0.03
            if goal_progress_arc in {"recovery_gaining_traction", "breakthrough_momentum"}
            else 0.01
            if goal_progress_arc == "holding_pattern"
            else 0.0
        )
        importance += (
            0.05
            if goal_milestone_state == "completion_window"
            else 0.04
            if goal_milestone_state == "recovery_phase"
            else 0.03
            if goal_milestone_state == "execution_phase"
            else 0.02
            if goal_milestone_state == "early_stage"
            else 0.0
        )
        importance += (
            0.05
            if goal_milestone_transition == "slipped_from_completion_window"
            else 0.04
            if goal_milestone_transition == "entered_completion_window"
            else 0.04
            if goal_milestone_transition == "dropped_back_to_early_stage"
            else 0.03
            if goal_milestone_transition == "entered_execution_phase"
            else 0.0
        )
        importance += (
            0.06
            if goal_milestone_risk == "at_risk"
            else 0.04
            if goal_milestone_risk == "ready_to_close"
            else 0.03
            if goal_milestone_risk in {"watch", "stabilizing"}
            else 0.01
            if goal_milestone_risk == "on_track"
            else 0.0
        )
        importance += (
            0.05
            if goal_completion_criteria in {"resolve_remaining_blocker", "finish_remaining_active_work"}
            else 0.04
            if goal_completion_criteria == "confirm_goal_completion"
            else 0.03
            if goal_completion_criteria in {"stabilize_remaining_work", "unblock_next_task"}
            else 0.02
            if goal_completion_criteria in {"define_first_execution_step", "advance_next_task"}
            else 0.0
        )
        importance += (
            0.06
            if milestone_history_signal == "milestone_regression"
            else 0.05
            if milestone_history_signal == "closure_momentum"
            else 0.04
            if milestone_history_signal == "volatile"
            else 0.03
            if milestone_history_signal == "recovery_stabilizing"
            else 0.0
        )
        importance += 0.04 if goal_history_signal == "regression" else 0.02 if goal_history_signal == "lift" else 0.0

        urgency = 0.2
        urgency += 0.45 if has_urgent_signal else 0.0
        urgency += 0.1 if has_execution_signal else 0.0
        urgency += 0.15 if blocked_task_match else 0.0
        urgency += (
            0.08
            if goal_execution_state == "blocked"
            else 0.04
            if goal_execution_state == "recovering"
            else 0.03
            if goal_execution_state == "advancing"
            else 0.05
            if goal_execution_state == "stagnating"
            else 0.0
        )
        urgency += 0.03 if 0 < goal_progress_score < 0.35 else 0.04 if goal_progress_score >= 0.75 else 0.0
        urgency += 0.05 if goal_progress_trend == "slipping" else 0.02 if goal_progress_trend == "improving" else 0.0
        urgency += (
            0.05
            if goal_progress_arc == "falling_behind"
            else 0.04
            if goal_progress_arc == "unstable_progress"
            else 0.02
            if goal_progress_arc == "breakthrough_momentum"
            else 0.01
            if goal_progress_arc in {"recovery_gaining_traction", "holding_pattern"}
            else 0.0
        )
        urgency += (
            0.05
            if goal_milestone_state == "completion_window"
            else 0.03
            if goal_milestone_state == "recovery_phase"
            else 0.03
            if goal_milestone_state == "execution_phase"
            else 0.02
            if goal_milestone_state == "early_stage"
            else 0.0
        )
        urgency += (
            0.08
            if goal_milestone_transition == "slipped_from_completion_window"
            else 0.1
            if goal_milestone_transition == "entered_completion_window"
            else 0.05
            if goal_milestone_transition == "dropped_back_to_early_stage"
            else 0.03
            if goal_milestone_transition == "entered_execution_phase"
            else 0.0
        )
        urgency += (
            0.08
            if goal_milestone_risk == "at_risk"
            else 0.07
            if goal_milestone_risk == "ready_to_close"
            else 0.04
            if goal_milestone_risk in {"watch", "stabilizing"}
            else 0.02
            if goal_milestone_risk == "on_track"
            else 0.0
        )
        urgency += (
            0.08
            if goal_completion_criteria == "resolve_remaining_blocker"
            else 0.07
            if goal_completion_criteria == "finish_remaining_active_work"
            else 0.06
            if goal_completion_criteria == "confirm_goal_completion"
            else 0.05
            if goal_completion_criteria in {"stabilize_remaining_work", "unblock_next_task"}
            else 0.03
            if goal_completion_criteria in {"define_first_execution_step", "advance_next_task"}
            else 0.0
        )
        urgency += (
            0.08
            if milestone_history_signal == "milestone_regression"
            else 0.07
            if milestone_history_signal == "closure_momentum"
            else 0.05
            if milestone_history_signal == "volatile"
            else 0.04
            if milestone_history_signal == "recovery_stabilizing"
            else 0.0
        )
        urgency += 0.04 if goal_history_signal == "regression" else 0.01 if goal_history_signal == "lift" else 0.0

        if has_emotional_signal:
            valence = -0.45
        elif has_positive_signal:
            valence = 0.35
        elif has_urgent_signal:
            valence = -0.1
        else:
            valence = 0.05

        arousal = 0.3
        arousal += 0.35 if has_urgent_signal else 0.0
        arousal += 0.2 if has_emotional_signal else 0.0
        arousal += 0.1 if has_question else 0.0

        theta_mode = None
        if not has_emotional_signal and not has_execution_signal and not has_analysis_signal:
            theta_mode = self._theta_mode(theta)
        collaboration_mode = None
        if not has_emotional_signal and not has_execution_signal and not has_analysis_signal:
            collaboration_mode = self._collaboration_mode(collaboration_preference)

        if has_emotional_signal:
            mode = "support"
        elif has_execution_signal:
            mode = "execute"
        elif has_analysis_signal:
            mode = "analyze"
        elif collaboration_mode and (
            perception.intent == "request_help"
            or (perception.topic == "general" and is_brief_turn and not has_positive_signal)
        ):
            mode = collaboration_mode
            importance += 0.05
            if collaboration_mode == "execute":
                urgency += 0.08
                arousal += 0.05
        elif theta_mode and (
            perception.intent == "request_help"
            or (perception.topic == "general" and is_brief_turn and not has_positive_signal)
        ):
            mode = theta_mode
            importance += 0.05
            if theta_mode == "execute":
                urgency += 0.08
                arousal += 0.05
            elif theta_mode == "support":
                valence = min(valence, -0.05)
        else:
            mode = "respond"

        return MotivationOutput(
            importance=self._clamp(importance),
            urgency=self._clamp(urgency),
            valence=max(-1.0, min(1.0, valence)),
            arousal=self._clamp(arousal),
            mode=mode,
        )

    def _related_goal_priority(self, text: str, goals: list[dict]) -> str | None:
        tokens = self._text_tokens(text)
        best_priority: str | None = None
        best_rank = 0
        for goal in goals:
            goal_tokens = self._text_tokens(str(goal.get("name", "")) + " " + str(goal.get("description", "")))
            if tokens and not tokens.intersection(goal_tokens):
                continue
            rank = self._priority_rank(str(goal.get("priority", "")))
            if rank > best_rank:
                best_rank = rank
                best_priority = str(goal.get("priority", "")).strip().lower() or None
        return best_priority

    def _has_related_blocked_task(self, text: str, tasks: list[dict]) -> bool:
        tokens = self._text_tokens(text)
        for task in tasks:
            if str(task.get("status", "")).strip().lower() != "blocked":
                continue
            task_tokens = self._text_tokens(str(task.get("name", "")) + " " + str(task.get("description", "")))
            if not tokens or tokens.intersection(task_tokens):
                return True
        return False

    def _text_tokens(self, value: str) -> set[str]:
        canonical = normalize_for_matching(value)
        return {token for token in canonical.split() if len(token) >= 3}

    def _priority_rank(self, priority: str) -> int:
        return {
            "low": 1,
            "medium": 2,
            "high": 3,
            "critical": 4,
        }.get(priority, 0)

    def _clamp(self, value: float) -> float:
        return max(0.0, min(1.0, round(value, 2)))

    def _theta_mode(self, theta: dict | None) -> str | None:
        if not theta:
            return None

        candidates = {
            "support": float(theta.get("support_bias", 0.0) or 0.0),
            "analyze": float(theta.get("analysis_bias", 0.0) or 0.0),
            "execute": float(theta.get("execution_bias", 0.0) or 0.0),
        }
        mode, bias = max(candidates.items(), key=lambda item: item[1])
        if bias < 0.58:
            return None
        return mode

    def _collaboration_mode(self, collaboration_preference: str) -> str | None:
        if collaboration_preference == "hands_on":
            return "execute"
        if collaboration_preference == "guided":
            return "analyze"
        return None

    def _goal_history_signal(self, goal_progress_history: list[dict]) -> str:
        if len(goal_progress_history) < 2:
            return ""

        ordered = list(reversed(goal_progress_history))
        scores: list[float] = []
        for item in ordered:
            try:
                scores.append(float(item.get("score", 0.0)))
            except (TypeError, ValueError):
                continue

        if len(scores) < 2:
            return ""

        delta = round(scores[-1] - scores[0], 2)
        span = round(max(scores) - min(scores), 2)
        if delta <= -0.2:
            return "regression"
        if delta >= 0.2:
            return "lift"
        if span >= 0.3:
            return "volatile"
        return ""

    def _goal_milestone_history_signal(self, goal_milestone_history: list[dict]) -> str:
        if len(goal_milestone_history) < 2:
            return ""

        ordered = list(reversed(goal_milestone_history))
        start = ordered[0]
        end = ordered[-1]
        start_phase = str(start.get("phase", "")).strip().lower()
        end_phase = str(end.get("phase", "")).strip().lower()
        start_risk = str(start.get("risk_level", "")).strip().lower()
        end_risk = str(end.get("risk_level", "")).strip().lower()
        distinct_pairs = {
            (
                str(item.get("phase", "")).strip().lower(),
                str(item.get("risk_level", "")).strip().lower(),
            )
            for item in ordered
        }

        if (
            start_phase != "completion_window" and end_phase == "completion_window"
        ) or (
            start_risk in {"watch", "stabilizing", "on_track"} and end_risk == "ready_to_close"
        ):
            return "closure_momentum"
        if (
            start_risk == "at_risk" and end_risk in {"watch", "stabilizing", "on_track"}
        ) or (
            start_phase == "recovery_phase" and end_phase in {"recovery_phase", "execution_phase"}
        ):
            return "recovery_stabilizing"
        if (
            start_phase == "completion_window" and end_phase != "completion_window"
        ) or (
            start_risk == "ready_to_close" and end_risk in {"watch", "at_risk"}
        ):
            return "milestone_regression"
        if len(distinct_pairs) >= 3:
            return "volatile"
        return ""
