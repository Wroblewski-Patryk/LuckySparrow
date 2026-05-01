from app.communication.boundary import (
    communication_boundary_summary,
    extract_communication_boundary_signals,
    proactive_boundary_block_reason,
    should_avoid_repeated_greeting,
)
from app.communication.behavior_feedback import BehaviorFeedbackAssessor
from app.memory.episodic import extract_episode_fields
from app.reflection.relation_signals import derive_relation_updates


def test_extracts_contact_cadence_and_ritual_boundary_signals() -> None:
    signals = extract_communication_boundary_signals(
        "Nie pisz do mnie co pol godziny i nie musisz sie witac co wiadomosc."
    )

    assert {
        (signal.relation_type, signal.relation_value)
        for signal in signals
    } == {
        ("contact_cadence_preference", "low_frequency"),
        ("interaction_ritual_preference", "avoid_repeated_greeting"),
    }


def test_extracts_repeated_greeting_from_observational_feedback() -> None:
    signals = extract_communication_boundary_signals(
        "Zauważam, że osobowość za kążdą wiadomością się wita."
    )

    assert {
        (signal.relation_type, signal.relation_value)
        for signal in signals
    } >= {("interaction_ritual_preference", "avoid_repeated_greeting")}


def test_extracts_loose_repeated_greeting_feedback() -> None:
    signals = extract_communication_boundary_signals(
        "Mam wrazenie, ze zawsze zaczyna od hej mimo ze to ciag dalszy rozmowy."
    )

    assert {
        (signal.relation_type, signal.relation_value)
        for signal in signals
    } >= {("interaction_ritual_preference", "avoid_repeated_greeting")}


def test_extracts_loose_contact_frequency_feedback() -> None:
    signals = extract_communication_boundary_signals(
        "Aviary chyba nie czai, ze pisze do mnie zbyt czesto i co chwile mnie pinguje."
    )

    assert {
        (signal.relation_type, signal.relation_value)
        for signal in signals
    } >= {("contact_cadence_preference", "low_frequency")}


def test_behavior_feedback_assessor_reuses_boundary_signals_for_greetings() -> None:
    feedback = BehaviorFeedbackAssessor().assess("You greet every message.")

    assert feedback
    assert feedback[0].feedback_target == "interaction_ritual"
    assert feedback[0].feedback_polarity == "correction"
    assert feedback[0].suggested_relation_type == "interaction_ritual_preference"
    assert feedback[0].suggested_relation_value == "avoid_repeated_greeting"


def test_behavior_feedback_assessor_detects_context_continuity_feedback() -> None:
    feedback = BehaviorFeedbackAssessor().assess("You are acting like this is a new conversation.")

    assert feedback
    assert feedback[0].feedback_target == "context_continuity"
    assert feedback[0].feedback_polarity == "correction"
    assert feedback[0].suggested_relation_value == "preserve_recent_conversation_continuity"
    assert feedback[0].suggested_relation_type is None


def test_behavior_feedback_assessor_detects_response_style_feedback() -> None:
    feedback = BehaviorFeedbackAssessor().assess("That tone is too formal; this direct style works better.")

    assert {
        (item.feedback_target, item.feedback_polarity, item.suggested_relation_value)
        for item in feedback
    } >= {
        ("response_style", "correction", "less_formal_direct_style"),
        ("response_style", "approval", "direct_style_works"),
    }


def test_behavior_feedback_assessor_keeps_unclear_feedback_descriptive() -> None:
    feedback = BehaviorFeedbackAssessor().assess("Aviary feels kind of weird today.")

    assert feedback
    assert feedback[0].feedback_target == "unknown"
    assert feedback[0].feedback_polarity == "unclear"
    assert feedback[0].confidence < 0.5
    assert feedback[0].suggested_relation_type is None
    assert feedback[0].suggested_relation_value is None


def test_boundary_relations_block_generic_proactive_checkins() -> None:
    relations = [
        {
            "relation_type": "contact_cadence_preference",
            "relation_value": "low_frequency",
            "confidence": 0.94,
        }
    ]

    reason = proactive_boundary_block_reason(
        relations=relations,
        trigger="time_checkin",
        recent_outbound_count=0,
        unanswered_proactive_count=0,
    )

    assert reason == "contact_cadence_low_frequency_generic_trigger"


def test_boundary_summary_and_ritual_flag_use_relation_model() -> None:
    relations = [
        {
            "relation_type": "interaction_ritual_preference",
            "relation_value": "avoid_repeated_greeting",
            "confidence": 0.96,
        }
    ]

    assert should_avoid_repeated_greeting(relations) is True
    assert "avoid greeting" in communication_boundary_summary(relations)


def test_episode_field_extraction_exposes_relation_and_proactive_updates() -> None:
    fields = extract_episode_fields(
        {
            "payload": {
                "event": "Nie pisz co pol godziny",
                "relation_update": "contact_cadence_preference:low_frequency:global:global",
                "proactive_preference_update": "proactive_opt_in:false",
                "proactive_state_update": "delivery_guard_blocked:time_checkin:recent_outbound_limit",
            }
        }
    )

    assert fields["relation_update"] == "contact_cadence_preference:low_frequency:global:global"
    assert fields["proactive_preference_update"] == "proactive_opt_in:false"
    assert fields["proactive_state_update"] == "delivery_guard_blocked:time_checkin:recent_outbound_limit"


def test_episode_field_extraction_exposes_behavior_feedback_candidates() -> None:
    fields = extract_episode_fields(
        {
            "payload": {
                "behavior_feedback": [
                    {
                        "feedback_target": "interaction_ritual",
                        "feedback_polarity": "observation",
                        "suggested_relation_type": "interaction_ritual_preference",
                        "suggested_relation_value": "avoid_repeated_greeting",
                        "confidence": 0.58,
                        "evidence": ["Aviary says hello every time."],
                        "source": "behavior_feedback_assessor",
                    }
                ]
            }
        }
    )

    assert fields["behavior_feedback"] == (
        "interaction_ritual_preference:avoid_repeated_greeting:observation:0.58:"
        "behavior_feedback_assessor"
    )


def test_reflection_derives_boundary_relations_from_episode_text() -> None:
    updates = derive_relation_updates(
        [
            {
                "payload": {
                    "event": "Nie pisz do mnie co pol godziny.",
                    "memory_kind": "episodic",
                }
            }
        ],
        extract_memory_fields=extract_episode_fields,
    )

    assert {
        (update["relation_type"], update["relation_value"])
        for update in updates
    } >= {("contact_cadence_preference", "low_frequency")}


def test_reflection_consolidates_repeated_weak_behavior_feedback_candidates() -> None:
    updates = derive_relation_updates(
        [
            {
                "payload": {
                    "behavior_feedback": [
                        {
                            "feedback_target": "interaction_ritual",
                            "feedback_polarity": "observation",
                            "suggested_relation_type": "interaction_ritual_preference",
                            "suggested_relation_value": "avoid_repeated_greeting",
                            "confidence": 0.56,
                            "source": "behavior_feedback_assessor",
                        }
                    ]
                }
            },
            {
                "payload": {
                    "behavior_feedback": [
                        {
                            "feedback_target": "interaction_ritual",
                            "feedback_polarity": "observation",
                            "suggested_relation_type": "interaction_ritual_preference",
                            "suggested_relation_value": "avoid_repeated_greeting",
                            "confidence": 0.58,
                            "source": "behavior_feedback_assessor",
                        }
                    ]
                }
            },
        ],
        extract_memory_fields=extract_episode_fields,
    )

    assert {
        (update["relation_type"], update["relation_value"], update["source"], update["evidence_count"])
        for update in updates
    } >= {
        (
            "interaction_ritual_preference",
            "avoid_repeated_greeting",
            "background_reflection_behavior_feedback",
            2,
        )
    }


def test_reflection_does_not_consolidate_single_weak_behavior_feedback_candidate() -> None:
    updates = derive_relation_updates(
        [
            {
                "payload": {
                    "behavior_feedback": [
                        {
                            "feedback_target": "interaction_ritual",
                            "feedback_polarity": "observation",
                            "suggested_relation_type": "interaction_ritual_preference",
                            "suggested_relation_value": "avoid_repeated_greeting",
                            "confidence": 0.58,
                            "source": "behavior_feedback_assessor",
                        }
                    ]
                }
            }
        ],
        extract_memory_fields=extract_episode_fields,
    )

    assert not any(
        update["source"] == "background_reflection_behavior_feedback"
        for update in updates
    )
