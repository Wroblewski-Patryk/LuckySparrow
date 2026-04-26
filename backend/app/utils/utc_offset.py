from datetime import timedelta, timezone
import re


DEFAULT_UTC_OFFSET = "UTC+00:00"
_UTC_OFFSET_PATTERN = re.compile(r"^([+-])(\d{1,2})(?::?(\d{2}))?$")
_ALLOWED_MINUTES = {0, 15, 30, 45}


def normalize_utc_offset(value: str | None) -> str:
    candidate = str(value or "").strip().upper().replace(" ", "")
    if candidate.startswith("UTC"):
        candidate = candidate[3:]
    match = _UTC_OFFSET_PATTERN.fullmatch(candidate)
    if match is None:
        return DEFAULT_UTC_OFFSET

    sign, hours_text, minutes_text = match.groups()
    hours = int(hours_text)
    minutes = int(minutes_text or "0")
    if minutes not in _ALLOWED_MINUTES:
        return DEFAULT_UTC_OFFSET

    total_minutes = (hours * 60) + minutes
    if sign == "-":
        total_minutes *= -1
    if total_minutes < -720 or total_minutes > 840:
        return DEFAULT_UTC_OFFSET

    normalized_hours = abs(total_minutes) // 60
    normalized_minutes = abs(total_minutes) % 60
    normalized_sign = "+" if total_minutes >= 0 else "-"
    return f"UTC{normalized_sign}{normalized_hours:02d}:{normalized_minutes:02d}"


def utc_offset_minutes(value: str | None) -> int:
    normalized = normalize_utc_offset(value)
    sign = 1 if normalized[3] == "+" else -1
    hours = int(normalized[4:6])
    minutes = int(normalized[7:9])
    return sign * ((hours * 60) + minutes)


def utc_offset_timezone(value: str | None):
    return timezone(timedelta(minutes=utc_offset_minutes(value)), name=normalize_utc_offset(value))
