# Data Model

## Purpose

This document defines the canonical data model of AION.

The goal is to support:

- memory
- identity
- adaptation
- decision making

Without proper structure, AION cannot function as a persistent cognitive system.

---

## Core Principle

Data must reflect cognition.

If the system:

- remembers
- learns
- adapts

then the data model must support those operations explicitly.

---

## Core Entities

### users

Stores the owner or user identity root.

Fields:

- id
- created_at
- updated_at
- name

### identity

Stores the stable identity definition.

Fields:

- id
- user_id
- mission
- values
- behavior_rules
- created_at
- updated_at

### theta

Stores adaptive parameters.

Fields:

- id
- user_id
- emotional
- display
- learning
- cognitive
- updated_at

### episodic_memory

Stores episode history.

Fields:

- id
- user_id
- event_id
- timestamp
- summary
- context
- role
- plan
- result
- importance

### conclusions

Stores learned patterns and semantic summaries.

Fields:

- id
- user_id
- type
- content
- confidence
- created_at
- updated_at

### goals

Stores long-lived direction.

Fields:

- id
- user_id
- name
- description
- priority
- status

### tasks

Stores actionable work linked to goals when possible.

Fields:

- id
- user_id
- goal_id
- name
- status
- priority

### metrics

Stores measurable runtime or behavioral data.

Fields:

- id
- user_id
- name
- value
- timestamp

---

## Relationships

- user -> identity (1:1)
- user -> theta (1:1)
- user -> episodic_memory (1:N)
- user -> conclusions (1:N)
- user -> goals (1:N)
- goals -> tasks (1:N)

---

## Storage

The canonical model requires durable structured storage.

It may later be extended with:

- vector retrieval
- relation graphs
- richer memory-link structures

Those extensions should not replace the core entities above.

---

## Memory Priority

Not all stored data is equal.

Each retrievable memory should preserve:

- importance
- relevance
- recency

These signals influence retrieval quality.

---

## Minimal MVP Entities

- users
- identity
- theta
- episodic_memory
- conclusions

Goals and tasks may be introduced early, but the minimal architecture only requires enough persistence to preserve continuity and learning.

---

## Optional Future Entities

- relation_notes
- event_logs
- memory_links
- theta_history
- proactive_triggers

---

## Final Principle

Database design is part of cognition design.

If the data model is weak, the system cannot become meaningfully stateful.
