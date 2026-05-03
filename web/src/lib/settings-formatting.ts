export type UiLanguageCode = "system" | "en" | "pl" | "de";
export type ResolvedUiLanguageCode = Exclude<UiLanguageCode, "system">;

export type UtcOffsetOption = {
  value: string;
  label: string;
};

export const UI_LANGUAGE_OPTIONS: Array<{
  value: UiLanguageCode;
  iconToken: string;
  nativeLabel: string;
  label: Record<ResolvedUiLanguageCode, string>;
  fallbackLabel: ResolvedUiLanguageCode | "browser";
}> = [
  {
    value: "system",
    iconToken: "AUTO",
    nativeLabel: "System",
    label: { en: "System default", pl: "Domyślne systemu", de: "Systemstandard" },
    fallbackLabel: "browser",
  },
  {
    value: "en",
    iconToken: "EN",
    nativeLabel: "English",
    label: { en: "English", pl: "Angielski", de: "Englisch" },
    fallbackLabel: "en",
  },
  {
    value: "pl",
    iconToken: "PL",
    nativeLabel: "Polski",
    label: { en: "Polish", pl: "Polski", de: "Polnisch" },
    fallbackLabel: "pl",
  },
  {
    value: "de",
    iconToken: "DE",
    nativeLabel: "Deutsch",
    label: { en: "German", pl: "Niemiecki", de: "Deutsch" },
    fallbackLabel: "de",
  },
];

export const UTC_OFFSET_OPTIONS: UtcOffsetOption[] = Array.from({ length: 105 }, (_, index) => {
  const totalMinutes = -12 * 60 + index * 15;
  const sign = totalMinutes >= 0 ? "+" : "-";
  const absoluteMinutes = Math.abs(totalMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;
  const value = `UTC${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  return {
    value,
    label: `(UTC${sign}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")})`,
  };
});

export function normalizeUiLanguage(value: string | null | undefined): UiLanguageCode {
  if (value === "en" || value === "pl" || value === "de" || value === "system") {
    return value;
  }
  return "system";
}

export function resolveUiLanguage(value: UiLanguageCode): ResolvedUiLanguageCode {
  if (value !== "system") {
    return value;
  }
  const browserLanguage = typeof window !== "undefined" ? window.navigator.language.toLowerCase() : "en";
  if (browserLanguage.startsWith("pl")) {
    return "pl";
  }
  if (browserLanguage.startsWith("de")) {
    return "de";
  }
  return "en";
}

export function uiLanguageMetadata(value: UiLanguageCode) {
  return UI_LANGUAGE_OPTIONS.find((option) => option.value === value) ?? UI_LANGUAGE_OPTIONS[0];
}

export function normalizeUtcOffset(value: string | null | undefined) {
  const normalized = String(value ?? "").trim().toUpperCase();
  return UTC_OFFSET_OPTIONS.find((option) => option.value === normalized)?.value ?? "UTC+00:00";
}

export function utcOffsetOption(value: string | null | undefined) {
  const normalized = normalizeUtcOffset(value);
  return UTC_OFFSET_OPTIONS.find((option) => option.value === normalized) ?? UTC_OFFSET_OPTIONS[48];
}

export function localeLanguageLabel(
  option: (typeof UI_LANGUAGE_OPTIONS)[number],
  locale: ResolvedUiLanguageCode,
) {
  return option.label[locale];
}

export function localeOptionDisplay(
  option: (typeof UI_LANGUAGE_OPTIONS)[number],
  locale: ResolvedUiLanguageCode,
) {
  const localizedLabel = localeLanguageLabel(option, locale);
  return `${option.iconToken} ${option.nativeLabel}${localizedLabel === option.nativeLabel ? "" : ` · ${localizedLabel}`}`;
}
