export function numberValue(value: unknown, fallback = 0) {
  const candidate = Number(value);
  return Number.isFinite(candidate) ? candidate : fallback;
}

export function scaledMetricSize(value: number, maxValue: number, minimumWhenPresent = 10) {
  if (value <= 0 || maxValue <= 0) {
    return "0%";
  }
  return `${Math.min(100, Math.max(minimumWhenPresent, Math.round((value / maxValue) * 100)))}%`;
}
