# Architecture

## Purpose

This document defines the canonical AION architecture.

It describes the intended cognitive model of the system:

- how AION receives a stimulus
- how it forms understanding
- how it prepares expression
- how it performs action
- how it learns over time

Temporary implementation details belong outside `docs/architecture/`.

---

## Core Model

AION is a stateful event-driven cognitive runtime.

It does not start from zero on each turn.
Every new event is processed through existing identity, memory, and adaptive state.

The canonical loop is:

`state -> event -> interpretation -> expression -> action -> memory -> reflection -> updated state`

---

## Main Components

1. Identity
2. Memory System
3. Conscious Loop
4. Subconscious Loop
5. Motivation Engine
6. Role and Skill Layer
7. Planning Layer
8. Expression Layer
9. Action Layer
10. Infrastructure

---

## Execution Model

AION operates through two cooperating loops.

The conscious loop handles real-time turns:

- receives an event
- interprets it
- selects a role
- prepares a response or action
- executes the required side effects
- writes memory

The subconscious loop handles delayed cognition:

- analyzes stored episodes
- detects recurring patterns
- updates conclusions
- adjusts theta and relation state

---

## Unified Cognitive Pipeline

The canonical foreground pipeline is:

`event -> perception -> context -> motivation -> role -> planning -> expression -> action -> memory -> reflection`

Each stage has one responsibility:

- perception identifies what happened
- context explains what it means now
- motivation scores importance and urgency
- role selects behavioral stance
- planning decides what should happen next
- expression shapes outward communication
- action executes side effects
- memory stores the episode
- reflection improves future behavior

---

## Stage Responsibilities

### Perception

Recognize the event.

Questions answered:

- what happened?
- what kind of event is this?
- what is the likely intent?

### Context

Build situational understanding.

Questions answered:

- what does this event mean?
- what background matters now?
- what memories or goals are relevant?

### Motivation

Determine how strongly the system should care.

Questions answered:

- how important is this?
- how urgent is this?
- should AION respond, clarify, analyze, execute, or ignore?

### Role

Select the behavioral mode for this turn.

Questions answered:

- what stance best fits the situation?
- how should identity be expressed here?

Role selection may read from a durable role registry that stores approved
role presets, prompt variants, and runtime selection hints.
Those role records shape expression and planning posture, but they do not
replace runtime ownership of role selection.

### Skill

Select reusable capability guidance for the turn.

Questions answered:

- which capabilities fit this situation?
- which stored skill descriptions or usage notes should guide planning?
- which approved tool families may be considered?

Skills may evolve as durable descriptions over time, but they remain guidance
for planning rather than direct execution authority.

### Planning

Turn understanding into intended next steps.

Questions answered:

- what should happen next?
- what needs response?
- what needs action?

### Expression

Form the outward message or communicative structure.

Questions answered:

- what should be said?
- in what tone?
- in what structure or language?

### Action

Perform side effects in the system or outside world.

Questions answered:

- what must be written, sent, updated, or triggered?
- did execution succeed?

### Memory

Store the finished episode for future retrieval and learning.

### Reflection

Analyze patterns across episodes and update future behavior.

---

## Event Contract

All inputs must be normalized into a shared event shape before deeper cognition.

Minimum canonical structure:

```json
{
  "event_id": "uuid",
  "source": "telegram|api|system|scheduler",
  "subsource": "...",
  "timestamp": "ISO-8601",
  "payload": {},
  "meta": {
    "user_id": "...",
    "trace_id": "..."
  }
}
```

---

## Runtime Node Contract

Each processing node must:

- receive structured input
- return structured output
- avoid hidden side effects
- avoid doing another stage's work

Canonical shared runtime state can include:

```json
{
  "event": {},
  "identity": {},
  "memory": {},
  "theta": {},
  "perception": {},
  "context": {},
  "motivation": {},
  "role": {},
  "skills": [],
  "plan": {},
  "expression": {},
  "action_result": {}
}
```

Not every stage uses every field.

---

## Action Boundary

The action boundary is a non-negotiable architectural rule.

Only the Action layer may:

- write to persistent storage
- call external APIs
- send outbound messages
- modify system state outside the local reasoning object
- trigger external or background execution

This remains true even when roles or skills reference prompts, heuristics,
tool families, or user-authorized providers.

Reasoning stages may prepare intent, but they may not perform side effects.

---

## Expression Layer

Expression is distinct from action.

Expression decides:

- wording
- tone
- structure
- channel adaptation

Action decides:

- what is executed
- where it is delivered
- what is persisted or triggered

This mirrors the intended human-like flow from stimulus to expression and then to action.

---

## Observability

Architecture must remain inspectable.

Core observability expectations:

- event and trace identifiers
- per-stage timing
- structured stage outcomes
- failure visibility
- runtime policy visibility

Without observability, architecture degrades into guesswork.

---

## Deployment Model

The long-term deployment shape remains:

- FastAPI as API boundary
- PostgreSQL as durable state
- background reflection execution
- containerized deployment

Supporting technologies may evolve, but the cognitive architecture should remain stable.

---

## Architectural Principles

- keep stage responsibilities explicit
- keep side effects controlled
- preserve identity continuity
- let memory influence future behavior
- keep reflection asynchronous to foreground interaction
- prefer small, inspectable runtime contracts

---

## Final Principle

Architecture is the system's cognitive spine.

If the architectural order is clear:

- implementation can evolve safely
- debugging stays possible
- future capability can grow without chaos

If the architectural order drifts, the system stops being coherent.
