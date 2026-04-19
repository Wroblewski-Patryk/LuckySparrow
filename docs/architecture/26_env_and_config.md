# Environment and Configuration

## Purpose

This document defines how AION manages environment variables and configuration.

Proper configuration ensures:

- security
- flexibility
- safe deployment
- clean separation between code and environment

Without it:

- secrets leak
- runtime behavior becomes inconsistent
- environments drift

---

## Core Principle

Configuration must be external.

Never hardcode:

- API keys
- database credentials
- tokens
- deployment-specific flags

---

## Environment File

Use `.env` for local development.

Example:

```text
OPENAI_API_KEY=your_openai_key
TELEGRAM_BOT_TOKEN=your_telegram_token
DATABASE_URL=postgresql://user:password@db:5432/aion
APP_ENV=development
APP_PORT=8000
```

---

## Required Variables

### Core

`OPENAI_API_KEY`

Used for LLM calls.

`TELEGRAM_BOT_TOKEN`

Used for Telegram integration.

`DATABASE_URL`

Used for PostgreSQL connection.

`APP_ENV`

Defines runtime environment:

- development
- staging
- production

`APP_PORT`

Defines the FastAPI port.

---

## Optional Variables

`LOG_LEVEL`

Options:

- debug
- info
- warning
- error

`STARTUP_SCHEMA_MODE`

Controls schema bootstrap strategy on startup.

Allowed values:

- migrate
- create_tables

`EVENT_DEBUG_ENABLED`

Controls whether debug runtime payloads may be exposed through the event API.

`PRODUCTION_POLICY_ENFORCEMENT`

Controls how production policy mismatches are handled.

Allowed values:

- warn
- strict

`GET /health` runtime policy visibility now includes:

- effective policy flags
- policy source markers (for debug defaults)
- `production_policy_mismatches` preview list for strict-mode rollout safety
- `production_policy_mismatch_count` for quick triage summary
- `strict_startup_blocked` to indicate current strict-mode startup block state
- `strict_rollout_ready` to indicate no strict-mode mismatches are present

`REFLECTION_INTERVAL`

Controls background reflection cadence when such scheduling is enabled.

`PROACTIVE_ENABLED`

Enables or disables proactive system behavior when that subsystem exists.

---

## Configuration Loading

Use a central config loader in Python.

Recommended shape:

- pydantic settings
- environment variable loading
- startup-time validation

Config should be loaded once at startup and passed through the app as a shared runtime object.

---

## Config Structure (Example)

Logical groups:

- api_keys
- database
- runtime
- features
- policy

Example object:

```json
{
  "api_keys": {
    "openai": "...",
    "telegram": "..."
  },
  "database": {
    "url": "..."
  },
  "runtime": {
    "env": "development",
    "port": 8000,
    "log_level": "info"
  },
  "policy": {
    "startup_schema_mode": "migrate",
    "event_debug_enabled": true,
    "production_policy_enforcement": "warn"
  }
}
```

---

## Environment Separation

Different environments must use different configuration values.

### Development

- local database
- local secrets
- verbose logging
- permissive debugging

### Staging

- production-like configuration
- safe but realistic validation path

### Production

- real secrets
- explicit policy posture
- minimal debug exposure
- safe startup behavior

---

## Secrets Management

Never:

- commit `.env` to Git
- expose secrets in logs
- place secrets in docs or sample payloads

Use:

- `.env` locally
- environment variables in deployment
- secret management tooling when infrastructure matures

---

## Docker Integration

Pass variables via:

- `docker-compose.yml`
- deployment environment configuration

Example:

```yaml
environment:
  - OPENAI_API_KEY=${OPENAI_API_KEY}
  - DATABASE_URL=${DATABASE_URL}
```

---

## Validation

At startup, the system should:

- validate required variables
- fail fast when critical config is missing
- expose only safe policy visibility
- log clear configuration errors

---

## Default Values

Only safe defaults should exist for:

- port
- log level
- non-secret runtime behavior

Never provide silent defaults for:

- API keys
- database credentials
- externally sensitive production behavior

---

## Feature Flags

Configuration may enable or disable subsystems such as:

- reflection loop
- proactive behavior
- debug payload exposure

Feature flags must remain explicit and discoverable.

---

## Runtime Access

All modules should access configuration through:

- a central config object
- injected app state
- typed runtime settings

Not by reading environment variables ad hoc throughout the codebase.

---

## Logging Config

Config should define:

- log level
- structured logging posture
- debug exposure posture
- production policy handling

---

## Future Extensions

- config versioning
- remote config service
- dynamic reload for selected flags

---

## Final Principle

Configuration separates the system from its environment.

If config is clean:

- deployment is safer
- runtime policy is inspectable
- debugging is easier

If config is messy, the whole runtime becomes fragile.
