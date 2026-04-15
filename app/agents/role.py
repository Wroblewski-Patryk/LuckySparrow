from app.core.contracts import ContextOutput, Event, PerceptionOutput, RoleOutput
from app.utils.language import normalize_for_matching


class RoleAgent:
    def run(
        self,
        event: Event,
        perception: PerceptionOutput,
        context: ContextOutput,
    ) -> RoleOutput:
        text = str(event.payload.get("text", "")).strip()
        lowered = normalize_for_matching(text)

        emotional_keywords = {
            "sad",
            "stressed",
            "overwhelmed",
            "tired",
            "lonely",
            "happy",
            "anxious",
            "smutny",
            "smutna",
            "zestresowany",
            "zestresowana",
            "przytloczony",
            "przytloczona",
            "zmeczony",
            "samotny",
            "samotna",
            "szczesliwy",
            "niespokojny",
        }
        analysis_keywords = {
            "analyze",
            "analysis",
            "review",
            "compare",
            "debug",
            "explain",
            "analiza",
            "przeanalizuj",
            "porownaj",
            "wyjasnij",
            "sprawdz",
            "zaplanuj",
        }
        executor_keywords = {
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

        if any(keyword in lowered for keyword in emotional_keywords):
            return RoleOutput(selected="friend", confidence=0.74)

        if perception.topic == "planning" or any(keyword in lowered for keyword in analysis_keywords):
            return RoleOutput(selected="analyst", confidence=0.82)

        if any(lowered.startswith(keyword) for keyword in executor_keywords):
            return RoleOutput(selected="executor", confidence=0.78)

        if perception.event_type == "question" or perception.intent == "request_help":
            return RoleOutput(selected="mentor", confidence=0.71)

        if context.risk_level >= 0.5:
            return RoleOutput(selected="advisor", confidence=0.7)

        return RoleOutput(selected="advisor", confidence=0.6)
