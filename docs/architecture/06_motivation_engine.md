# Motivation Engine

## Purpose

The motivation engine determines what matters, how much it matters, and what the system should do about it.

Without motivation:

- everything is equally important
- decisions become random
- behavior becomes flat

Motivation gives direction to cognition.

---

## Core Principle

Motivation is not emotion.

Motivation is functional prioritization.

It answers:

- is this important?
- is this urgent?
- should AION respond?
- should AION clarify before acting?
- should AION execute something?
- should AION ignore this?

---

## Base Model

`motivation = f(importance, urgency, context, goals, memory, theta)`

---

## Key Parameters

- importance
- urgency
- valence
- arousal
- goal relevance
- uncertainty
- risk

---

## Definitions

### Importance

How much the event matters overall.

### Urgency

How quickly action is required.

### Valence

Positive, negative, or neutral character of the event.

### Arousal

Level of activation or intensity.

### Goal Relevance

Connection to active goals.

### Uncertainty

How unclear the situation is.

### Risk

Potential negative outcome.

---

## RGD Model

A simple functional model:

- Reward -> positive outcome
- Gain -> opportunity
- Danger -> threat

This helps bias behavior without making motivation arbitrary.

---

## Motivation Output

Example:

```json
{
  "importance": 0.8,
  "urgency": 0.5,
  "valence": 0.2,
  "arousal": 0.6,
  "mode": "respond"
}
```

---

## Action Tendencies

The motivation layer should ultimately resolve to one of the shared operating modes:

- `respond`
- `ignore`
- `analyze`
- `execute`
- `clarify`

Meaning:

- `respond` = reply is needed
- `ignore` = no meaningful response or action is needed
- `analyze` = deeper reasoning is needed before commitment
- `execute` = action-oriented handling is needed
- `clarify` = the system should ask for missing or ambiguous information

---

## Motivation and Behavior

Examples:

- high urgency plus high risk -> direct, fast handling
- low urgency plus high uncertainty -> analysis or clarification
- high reward plus clear path -> constructive response or execution

---

## Motivation and Memory

Higher motivation should generally increase memory importance.

Important events:

- are stored more strongly
- are retrieved more often
- influence future decisions more clearly

---

## Motivation and Theta

Theta modifies how motivation is expressed.

Example:

- higher directness -> sharper responses
- higher emotional reactivity -> stronger activation
- stronger execution bias -> more action-oriented handling

---

## Computation Strategy

Use a hybrid approach:

Deterministic inputs:

- urgency
- repetition
- risk
- goal relevance

Higher-level interpretation:

- context meaning
- ambiguity
- subtle social or behavioral cues

---

## Anti-Randomness Rule

Motivation exists to prevent randomness.

The system must:

- prioritize
- choose
- act intentionally

---

## Safety Rules

Motivation must not:

- overreact to a single event
- amplify noise
- destabilize identity

---

## MVP Requirement

Motivation must decide:

- whether a response is needed
- how strong the response posture should be
- which shared mode best fits the turn

---

## Final Principle

Motivation transforms:

"something happened"

into

"this is what matters and how strongly the system should care"
