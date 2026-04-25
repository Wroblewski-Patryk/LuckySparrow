import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  ApiError,
  api,
  type AppChatHistoryEntry,
  type AppMeResponse,
  type AppPersonalityOverviewResponse,
  type AppResetDataResponse,
  type AppSettings,
  type AppTelegramLinkStartResponse,
  type AppToolsOverviewResponse,
} from "./lib/api";

type RoutePath = "/login" | "/chat" | "/settings" | "/personality" | "/tools";
type AuthMode = "login" | "register";
type UiLanguageCode = "system" | "en" | "pl" | "de";
type SessionMessage =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "assistant"; text: string; meta?: string };

const BUILD_REVISION = String(import.meta.env.VITE_APP_BUILD_REVISION ?? "dev");
const RESET_DATA_CONFIRMATION_TEXT = "RESET MY DATA";
const ROUTES: RoutePath[] = ["/chat", "/settings", "/tools", "/personality"];
const UI_LANGUAGE_OPTIONS: Array<{
  value: UiLanguageCode;
  flag: string;
  label: Record<Exclude<UiLanguageCode, "system">, string>;
}> = [
  { value: "system", flag: "🌐", label: { en: "System", pl: "System", de: "System" } },
  { value: "en", flag: "🇺🇸", label: { en: "English", pl: "Angielski", de: "Englisch" } },
  { value: "pl", flag: "🇵🇱", label: { en: "Polish", pl: "Polski", de: "Polnisch" } },
  { value: "de", flag: "🇩🇪", label: { en: "German", pl: "Niemiecki", de: "Deutsch" } },
];

const UI_COPY = {
  en: {
    routes: {
      "/login": "Login",
      "/chat": "Chat",
      "/settings": "Settings",
      "/tools": "Tools",
      "/personality": "Personality",
    } satisfies Record<RoutePath, string>,
    routeDescriptions: {
      "/login": "Authenticate into the product shell.",
      "/chat": "Conversation-first workspace with recent continuity and live runtime replies.",
      "/settings": "Profile, interface language, and proactive preferences backed by backend truth.",
      "/tools": "Tools and channels framed around state, action, and progress instead of raw backend wording.",
      "/personality": "Product-facing overview of identity, knowledge, planning, and capabilities.",
    } satisfies Record<RoutePath, string>,
    common: {
      workspace: "Workspace",
      currentSurface: "Current surface",
      account: "Account",
      signedInAs: "Signed in as",
      signOut: "Sign out",
      build: "build",
      uiLanguage: "UI language",
      conversationLanguage: "Conversation language",
      proactive: "Proactive",
      on: "On",
      off: "Off",
      save: "Save settings",
      saving: "Saving...",
      loading: "Loading...",
      interfaceOnly: "Interface only",
      details: "Details",
      inspectPayload: "Inspect raw payload",
      noData: "No data yet.",
      user: "You",
      assistant: "AION",
      sourceOfTruth: "Source of truth",
      notSet: "not set",
      system: "System",
    },
    auth: {
      badge: "AION Web v2",
      heroTitle: "A mobile-first shell for the personality.",
      heroBody:
        "Login, chat, settings, tools, and personality insights now share one cleaner product shell built on the existing backend.",
      sessionEntry: "Session entry",
      login: "Log in",
      register: "Create account",
      email: "Email",
      password: "Password",
      displayName: "Display name",
      enterWorkspace: "Enter workspace",
      createAccount: "Create account",
      tabsLogin: "Login",
      tabsRegister: "Register",
    },
    chat: {
      eyebrow: "Conversation",
      title: "Talk to the personality",
      subtitle: "Keep the conversation front and center. Continuity stays available without pushing the chat off screen.",
      emptyThread:
        "Start the conversation here. Recent continuity stays available below, but the main thread remains the primary surface.",
      placeholder: "Send a message to AION...",
      composerHint: "Replies come from the existing backend runtime via `/app/chat/message`.",
      send: "Send message",
      sending: "Sending...",
      continuity: "Continuity",
      timeline: "Recent memory",
      noHistory: "No persisted conversation events yet.",
      sessionCount: "Current session",
      memoryCount: "Memory items",
      latestLanguage: "Live language",
      payload: "Event payload",
    },
    settings: {
      eyebrow: "Settings",
      title: "Personalize the shell",
      subtitle: "Short, mobile-first settings focused on your profile, interface language, and proactive follow-ups.",
      profileTitle: "Profile",
      profileBody: "Choose how the shell identifies you.",
      uiLanguageTitle: "Interface language",
      uiLanguageBody: "Changes labels, copy, and navigation in the app shell only.",
      uiLanguageHelp: "This does not control the language used when talking with AION.",
      conversationTitle: "Conversation language",
      conversationBody: "AION adapts live from context, history, and the current conversation.",
      proactiveTitle: "Proactive follow-ups",
      proactiveBody: "Let AION send bounded proactive nudges when runtime policy allows it.",
      saveHint: "Settings are persisted through `/app/me/settings`.",
      conversationRuntimeOwned: "Runtime-owned and adaptive",
      savedState: "Saved in backend truth",
      resetTitle: "Reset runtime data",
      resetBody:
        "Clear learned runtime continuity, memory, planning state, and queue state for this account without deleting the account or reconfiguring linked tools.",
      resetImpact:
        "This keeps your profile, UI settings, proactive preference, and linked integrations, then revokes every active session including this one.",
      resetConfirmationLabel: "Confirmation text",
      resetConfirmationHint: "Type the exact phrase below to unlock the reset action.",
      resetConfirmationPlaceholder: "RESET MY DATA",
      resetAction: "Reset my runtime data",
      resetting: "Resetting...",
      resetSuccess: "Runtime data reset. Sign in again to start fresh.",
    },
    tools: {
      eyebrow: "Tools",
      title: "Ready tools and channels",
      subtitle: "See what is available now, what needs action, and what is still blocked.",
      groupCount: "Tool groups",
      integral: "Always on",
      ready: "Ready now",
      linkRequired: "Needs linking",
      loading: "Loading tools overview from backend.",
      empty: "No tools overview payload is loaded yet.",
      currentStatus: "Current status",
      nextStep: "Next step",
      technicalDetails: "Technical details",
      availability: "Availability",
      provider: "Provider",
      control: "Control",
      linkState: "Link state",
      readOnly: "Read only",
      enabledByUser: "Enabled by you",
      disabledByUser: "Disabled by you",
      saving: "Saving...",
      noAction: "No action needed.",
      telegramLinking: "Telegram linking",
      generateCode: "Generate code",
      rotateCode: "Rotate code",
      generating: "Generating...",
      linkCode: "Link code",
      instruction: "Instruction",
      noLinkCode: "No active link code yet. Generate one when you are ready to confirm the chat.",
      capabilities: "Capabilities",
    },
    personality: {
      eyebrow: "Personality",
      title: "Personality overview",
      subtitle: "High-level insight first, raw payload only when you want to inspect it.",
      goals: "Goals",
      tasks: "Tasks",
      knowledge: "Knowledge",
      preferences: "Preferences",
      filter: "Filter sections",
      loading: "Loading personality overview from backend.",
      empty: "No matching overview sections for this filter.",
      highlights: "Highlights",
    },
  },
  pl: {
    routes: { "/login": "Logowanie", "/chat": "Czat", "/settings": "Ustawienia", "/tools": "Narzędzia", "/personality": "Osobowość" },
    routeDescriptions: {
      "/login": "Zaloguj się do powłoki produktu.",
      "/chat": "Widok rozmowy ustawiony mobile-first z pamięcią pod ręką.",
      "/settings": "Profil, język interfejsu i zgoda na proaktywność oparte o backend truth.",
      "/tools": "Narzędzia i kanały pokazane przez stan, akcję i gotowość zamiast surowego backendowego słownictwa.",
      "/personality": "Produktowy przegląd tożsamości, wiedzy, planowania i możliwości.",
    },
    common: {
      workspace: "Przestrzeń",
      currentSurface: "Bieżący ekran",
      account: "Konto",
      signedInAs: "Zalogowano jako",
      signOut: "Wyloguj",
      build: "build",
      uiLanguage: "Język UI",
      conversationLanguage: "Język rozmowy",
      proactive: "Proaktywność",
      on: "Wł.",
      off: "Wył.",
      save: "Zapisz ustawienia",
      saving: "Zapisywanie...",
      loading: "Ładowanie...",
      interfaceOnly: "Tylko interfejs",
      details: "Szczegóły",
      inspectPayload: "Pokaż surowy payload",
      noData: "Brak danych.",
      user: "Ty",
      assistant: "AION",
      sourceOfTruth: "Źródło prawdy",
      notSet: "brak",
      system: "System",
    },
    auth: {
      badge: "AION Web v2",
      heroTitle: "Mobile-first shell dla osobowości.",
      heroBody:
        "Logowanie, czat, ustawienia, narzędzia i wgląd w osobowość działają teraz w jednej, czystszej powłoce produktu nad istniejącym backendem.",
      sessionEntry: "Wejście do sesji",
      login: "Zaloguj się",
      register: "Załóż konto",
      email: "Email",
      password: "Hasło",
      displayName: "Nazwa wyświetlana",
      enterWorkspace: "Wejdź do aplikacji",
      createAccount: "Utwórz konto",
      tabsLogin: "Logowanie",
      tabsRegister: "Rejestracja",
    },
    chat: {
      eyebrow: "Rozmowa",
      title: "Porozmawiaj z osobowością",
      subtitle: "Rozmowa jest na pierwszym planie. Ciągłość pozostaje dostępna, ale nie spycha czatu z ekranu.",
      emptyThread:
        "Zacznij rozmowę tutaj. Ostatnia ciągłość jest dostępna niżej, ale główny wątek pozostaje najważniejszą powierzchnią.",
      placeholder: "Napisz wiadomość do AION...",
      composerHint: "Odpowiedzi pochodzą z istniejącego runtime backendu przez `/app/chat/message`.",
      send: "Wyślij wiadomość",
      sending: "Wysyłanie...",
      continuity: "Ciągłość",
      timeline: "Ostatnia pamięć",
      noHistory: "Brak zapisanych zdarzeń rozmowy.",
      sessionCount: "Bieżąca sesja",
      memoryCount: "Elementy pamięci",
      latestLanguage: "Język live",
      payload: "Payload zdarzenia",
    },
    settings: {
      eyebrow: "Ustawienia",
      title: "Dopasuj powłokę",
      subtitle: "Krótki, mobile-first widok ustawień skupiony na profilu, języku interfejsu i proaktywnych follow-upach.",
      profileTitle: "Profil",
      profileBody: "Wybierz, jak aplikacja ma Cię opisywać.",
      uiLanguageTitle: "Język interfejsu",
      uiLanguageBody: "Zmienia etykiety, copy i nawigację tylko w powłoce aplikacji.",
      uiLanguageHelp: "To nie steruje językiem rozmowy z AION.",
      conversationTitle: "Język rozmowy",
      conversationBody: "AION dopasowuje go live na podstawie kontekstu, historii i bieżącej rozmowy.",
      proactiveTitle: "Proaktywne follow-upy",
      proactiveBody: "Pozwól AION wysyłać ograniczone proaktywne przypomnienia, gdy pozwala na to polityka runtime.",
      saveHint: "Ustawienia zapisują się przez `/app/me/settings`.",
      conversationRuntimeOwned: "Sterowane przez runtime i adaptacyjne",
      savedState: "Zapisane w backend truth",
      resetTitle: "Reset danych runtime",
      resetBody:
        "Wyczysc wyuczona ciaglosc runtime, pamiec, stan planowania i kolejki dla tego konta bez usuwania konta ani ponownej konfiguracji podpietych narzedzi.",
      resetImpact:
        "Profil, ustawienia UI, zgoda na proaktywnosc i podpiete integracje zostaja, a wszystkie aktywne sesje, takze ta biezaca, sa uniewazniane.",
      resetConfirmationLabel: "Tekst potwierdzenia",
      resetConfirmationHint: "Wpisz dokladnie ponizsza fraze, aby odblokowac reset.",
      resetConfirmationPlaceholder: "RESET MY DATA",
      resetAction: "Zresetuj dane runtime",
      resetting: "Resetowanie...",
      resetSuccess: "Dane runtime zostaly zresetowane. Zaloguj sie ponownie i zacznij od nowa.",
    },
    tools: {
      eyebrow: "Narzędzia",
      title: "Gotowe narzędzia i kanały",
      subtitle: "Zobacz, co działa już teraz, co wymaga działania, a co nadal jest zablokowane.",
      groupCount: "Grupy narzędzi",
      integral: "Zawsze aktywne",
      ready: "Gotowe teraz",
      linkRequired: "Wymaga podpięcia",
      loading: "Ładowanie widoku narzędzi z backendu.",
      empty: "Brak załadowanego payloadu narzędzi.",
      currentStatus: "Obecny stan",
      nextStep: "Następny krok",
      technicalDetails: "Szczegóły techniczne",
      availability: "Dostępność",
      provider: "Provider",
      control: "Sterowanie",
      linkState: "Stan podpięcia",
      readOnly: "Tylko podgląd",
      enabledByUser: "Włączone przez Ciebie",
      disabledByUser: "Wyłączone przez Ciebie",
      saving: "Zapisywanie...",
      noAction: "Brak wymaganej akcji.",
      telegramLinking: "Podpinanie Telegrama",
      generateCode: "Wygeneruj kod",
      rotateCode: "Obróć kod",
      generating: "Generowanie...",
      linkCode: "Kod podpięcia",
      instruction: "Instrukcja",
      noLinkCode: "Brak aktywnego kodu. Wygeneruj go, gdy będziesz gotowy potwierdzić czat.",
      capabilities: "Możliwości",
    },
    personality: {
      eyebrow: "Osobowość",
      title: "Przegląd osobowości",
      subtitle: "Najpierw wgląd produktowy, a surowy payload tylko wtedy, gdy chcesz go sprawdzić.",
      goals: "Cele",
      tasks: "Zadania",
      knowledge: "Wiedza",
      preferences: "Preferencje",
      filter: "Filtruj sekcje",
      loading: "Ładowanie przeglądu osobowości z backendu.",
      empty: "Brak sekcji pasujących do filtra.",
      highlights: "Najważniejsze punkty",
    },
  },
  de: {
    routes: { "/login": "Login", "/chat": "Chat", "/settings": "Einstellungen", "/tools": "Tools", "/personality": "Persönlichkeit" },
    routeDescriptions: {
      "/login": "Melde dich in der Produkthülle an.",
      "/chat": "Konversationsfokus mit mobile-first Layout und sofort sichtbarer Kontinuität.",
      "/settings": "Profil, Oberflächensprache und proaktive Präferenzen mit Backend-Truth als Grundlage.",
      "/tools": "Tools und Kanäle über Status, Aktion und Fortschritt statt roher Backend-Terminologie.",
      "/personality": "Produktorientierter Überblick über Identität, Wissen, Planung und Fähigkeiten.",
    },
    common: {
      workspace: "Workspace",
      currentSurface: "Aktuelle Ansicht",
      account: "Konto",
      signedInAs: "Angemeldet als",
      signOut: "Abmelden",
      build: "build",
      uiLanguage: "UI-Sprache",
      conversationLanguage: "Gesprächssprache",
      proactive: "Proaktiv",
      on: "An",
      off: "Aus",
      save: "Einstellungen speichern",
      saving: "Speichern...",
      loading: "Lädt...",
      interfaceOnly: "Nur Oberfläche",
      details: "Details",
      inspectPayload: "Rohdaten anzeigen",
      noData: "Noch keine Daten.",
      user: "Du",
      assistant: "AION",
      sourceOfTruth: "Quelle der Wahrheit",
      notSet: "nicht gesetzt",
      system: "System",
    },
    auth: {
      badge: "AION Web v2",
      heroTitle: "Eine mobile-first Hülle für die Persönlichkeit.",
      heroBody:
        "Login, Chat, Einstellungen, Tools und Persönlichkeits-Einblicke teilen jetzt eine klarere Produkthülle über dem bestehenden Backend.",
      sessionEntry: "Sitzung",
      login: "Einloggen",
      register: "Konto erstellen",
      email: "E-Mail",
      password: "Passwort",
      displayName: "Anzeigename",
      enterWorkspace: "Zum Workspace",
      createAccount: "Konto erstellen",
      tabsLogin: "Login",
      tabsRegister: "Registrieren",
    },
    chat: {
      eyebrow: "Gespräch",
      title: "Sprich mit der Persönlichkeit",
      subtitle: "Die Unterhaltung steht im Vordergrund. Kontinuität bleibt sichtbar, verdrängt den Chat aber nicht.",
      emptyThread:
        "Starte die Unterhaltung hier. Die letzte Kontinuität bleibt darunter verfügbar, aber der Haupt-Thread bleibt die primäre Fläche.",
      placeholder: "Sende eine Nachricht an AION...",
      composerHint: "Antworten kommen aus der bestehenden Backend-Runtime über `/app/chat/message`.",
      send: "Nachricht senden",
      sending: "Senden...",
      continuity: "Kontinuität",
      timeline: "Letzter Verlauf",
      noHistory: "Noch keine gespeicherten Gesprächsereignisse.",
      sessionCount: "Aktuelle Sitzung",
      memoryCount: "Erinnerungseinträge",
      latestLanguage: "Live-Sprache",
      payload: "Ereignis-Payload",
    },
    settings: {
      eyebrow: "Einstellungen",
      title: "Hülle anpassen",
      subtitle: "Kurzer mobile-first Bereich für Profil, Oberflächensprache und proaktive Follow-ups.",
      profileTitle: "Profil",
      profileBody: "Lege fest, wie dich die App anzeigen soll.",
      uiLanguageTitle: "Oberflächensprache",
      uiLanguageBody: "Ändert nur Labels, Copy und Navigation der App-Hülle.",
      uiLanguageHelp: "Das steuert nicht die Sprache des Gesprächs mit AION.",
      conversationTitle: "Gesprächssprache",
      conversationBody: "AION passt sie live aus Kontext, Verlauf und aktueller Unterhaltung an.",
      proactiveTitle: "Proaktive Follow-ups",
      proactiveBody: "Erlaube AION begrenzte proaktive Hinweise, wenn die Runtime-Richtlinie es zulässt.",
      saveHint: "Einstellungen werden über `/app/me/settings` gespeichert.",
      conversationRuntimeOwned: "Runtime-gesteuert und adaptiv",
      savedState: "In Backend-Truth gespeichert",
      resetTitle: "Runtime-Daten zurucksetzen",
      resetBody:
        "Loscht gelernte Runtime-Kontinuitat, Erinnerung, Planungszustand und Warteschlangenstatus fur dieses Konto, ohne das Konto oder verknupfte Tools neu aufzusetzen.",
      resetImpact:
        "Profil, UI-Sprache, proaktive Einstellungen und verknupfte Integrationen bleiben erhalten, danach werden alle aktiven Sitzungen inklusive dieser Sitzung widerrufen.",
      resetConfirmationLabel: "Bestatigungstext",
      resetConfirmationHint: "Gib die folgende Phrase exakt ein, um den Reset freizuschalten.",
      resetConfirmationPlaceholder: "RESET MY DATA",
      resetAction: "Meine Runtime-Daten zurucksetzen",
      resetting: "Wird zuruckgesetzt...",
      resetSuccess: "Runtime-Daten wurden zuruckgesetzt. Melde dich erneut an, um frisch zu starten.",
    },
    tools: {
      eyebrow: "Tools",
      title: "Verfügbare Tools und Kanäle",
      subtitle: "Sieh, was jetzt bereit ist, was Aktion braucht und was noch blockiert ist.",
      groupCount: "Tool-Gruppen",
      integral: "Immer aktiv",
      ready: "Jetzt bereit",
      linkRequired: "Benötigt Verknüpfung",
      loading: "Tool-Übersicht wird aus dem Backend geladen.",
      empty: "Noch keine Tool-Übersicht geladen.",
      currentStatus: "Aktueller Status",
      nextStep: "Nächster Schritt",
      technicalDetails: "Technische Details",
      availability: "Verfügbarkeit",
      provider: "Provider",
      control: "Steuerung",
      linkState: "Verknüpfungsstatus",
      readOnly: "Nur lesen",
      enabledByUser: "Von dir aktiviert",
      disabledByUser: "Von dir deaktiviert",
      saving: "Speichern...",
      noAction: "Keine Aktion nötig.",
      telegramLinking: "Telegram verknüpfen",
      generateCode: "Code erzeugen",
      rotateCode: "Code erneuern",
      generating: "Erzeugen...",
      linkCode: "Verknüpfungscode",
      instruction: "Anleitung",
      noLinkCode: "Noch kein aktiver Code. Erzeuge ihn, wenn du den Chat bestätigen willst.",
      capabilities: "Fähigkeiten",
    },
    personality: {
      eyebrow: "Persönlichkeit",
      title: "Persönlichkeitsübersicht",
      subtitle: "Zuerst produktorientierte Einblicke, Rohdaten nur bei Bedarf.",
      goals: "Ziele",
      tasks: "Aufgaben",
      knowledge: "Wissen",
      preferences: "Präferenzen",
      filter: "Sektionen filtern",
      loading: "Persönlichkeitsübersicht wird aus dem Backend geladen.",
      empty: "Keine passenden Sektionen für diesen Filter.",
      highlights: "Highlights",
    },
  },
} as const;

function normalizeRoute(pathname: string): RoutePath {
  if (pathname === "/settings") {
    return "/settings";
  }
  if (pathname === "/tools") {
    return "/tools";
  }
  if (pathname === "/personality") {
    return "/personality";
  }
  if (pathname === "/chat" || pathname === "/") {
    return "/chat";
  }
  return "/login";
}

function navigate(path: RoutePath) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
}

function normalizeUiLanguage(value: string | null | undefined): UiLanguageCode {
  if (value === "en" || value === "pl" || value === "de" || value === "system") {
    return value;
  }
  return "system";
}

function resolveUiLanguage(value: UiLanguageCode): Exclude<UiLanguageCode, "system"> {
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

function formatTimestamp(value: string | undefined, locale: string | undefined) {
  if (!value) {
    return "unknown time";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function prettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

function stringValue(value: unknown, fallback = "not set") {
  if (typeof value === "string" && value.trim()) {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return fallback;
}

function routeDescription(route: RoutePath, locale: Exclude<UiLanguageCode, "system">) {
  return UI_COPY[locale].routeDescriptions[route];
}

function routeLabel(route: RoutePath, locale: Exclude<UiLanguageCode, "system">) {
  return UI_COPY[locale].routes[route];
}

function localeLanguageLabel(option: (typeof UI_LANGUAGE_OPTIONS)[number], locale: Exclude<UiLanguageCode, "system">) {
  return option.label[locale];
}

function titleCaseFromStatus(value: string) {
  return value
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toolStatusClass(status: string) {
  if (status === "integral_active" || status === "provider_ready") {
    return "badge-success";
  }
  if (status === "provider_ready_link_required") {
    return "badge-warning";
  }
  if (status === "planned_placeholder") {
    return "badge-ghost";
  }
  return "badge-outline";
}

function formatToolState(status: string) {
  if (status === "integral_active") {
    return "Always on";
  }
  if (status === "provider_ready") {
    return "Ready to use";
  }
  if (status === "provider_ready_link_required") {
    return "Link required";
  }
  if (status === "planned_placeholder") {
    return "Planned";
  }
  return titleCaseFromStatus(status);
}

function summarizeToolAction(nextActions: string[], fallback: string) {
  const action = nextActions[0];
  if (!action) {
    return fallback;
  }
  return action.replaceAll("_", " ");
}

function summaryLines(sectionKey: string, payload: unknown): string[] {
  const record = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  if (sectionKey === "identity_state") {
    const profile = (record.profile as Record<string, unknown> | undefined) ?? {};
    const preferenceSummary = (record.preference_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Conversation continuity language: ${stringValue(profile.preferred_language, "unknown")}`,
      `Resolved learned preferences: ${stringValue(preferenceSummary.learned_preference_count, "0")}`,
    ];
  }
  if (sectionKey === "learned_knowledge") {
    const knowledgeSummary = (record.knowledge_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Semantic conclusions: ${stringValue(knowledgeSummary.semantic_conclusion_count, "0")}`,
      `Affective conclusions: ${stringValue(knowledgeSummary.affective_conclusion_count, "0")}`,
    ];
  }
  if (sectionKey === "planning_state") {
    const continuitySummary = (record.continuity_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Active goals: ${stringValue(continuitySummary.active_goal_count, "0")}`,
      `Active tasks: ${stringValue(continuitySummary.active_task_count, "0")}`,
    ];
  }
  if (sectionKey === "role_skill_state") {
    const selectionSummary = (record.selection_visibility_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Catalog skills: ${stringValue(selectionSummary.catalog_skill_count, "0")}`,
      `Runtime surface: ${stringValue(selectionSummary.runtime_selection_surface, "system_debug")}`,
    ];
  }
  if (sectionKey === "capability_catalog") {
    const posture = (record.tool_and_connector_posture as Record<string, unknown> | undefined) ?? {};
    return [
      `Organizer stack state: ${stringValue(posture.organizer_stack_state, "unknown")}`,
      `Selectable tool families: ${Array.isArray(posture.selectable_tool_families) ? posture.selectable_tool_families.length : 0}`,
    ];
  }
  if (sectionKey === "api_readiness") {
    return [
      `Product stage: ${stringValue(record.product_stage, "unknown")}`,
      `Inspection path: ${stringValue(record.internal_inspection_path, "/internal/state/inspect")}`,
    ];
  }
  return [prettyJson(payload).slice(0, 140)];
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(() => normalizeRoute(window.location.pathname));
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authBusy, setAuthBusy] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [me, setMe] = useState<AppMeResponse | null>(null);
  const [history, setHistory] = useState<AppChatHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [sessionMessages, setSessionMessages] = useState<SessionMessage[]>([]);
  const [chatText, setChatText] = useState("");
  const [overview, setOverview] = useState<AppPersonalityOverviewResponse | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [toolsOverview, setToolsOverview] = useState<AppToolsOverviewResponse | null>(null);
  const [toolsLoading, setToolsLoading] = useState(false);
  const [savingToolId, setSavingToolId] = useState<string | null>(null);
  const [telegramLinkStart, setTelegramLinkStart] = useState<AppTelegramLinkStartResponse | null>(null);
  const [telegramLinkBusy, setTelegramLinkBusy] = useState(false);
  const [inspectorQuery, setInspectorQuery] = useState("");
  const deferredInspectorQuery = useDeferredValue(inspectorQuery);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [settingsDraft, setSettingsDraft] = useState({
    displayName: "",
    uiLanguage: "system" as UiLanguageCode,
    proactiveOptIn: false,
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [resetConfirmationText, setResetConfirmationText] = useState("");
  const [resettingData, setResettingData] = useState(false);
  const [accountPanelOpen, setAccountPanelOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    setError(null);
    setAccountPanelOpen(false);
  }, [route]);

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const snapshot = await api.getMe();
        if (cancelled) {
          return;
        }
        setMe(snapshot);
        setSettingsDraft({
          displayName: snapshot.user.display_name ?? "",
          uiLanguage: normalizeUiLanguage(snapshot.settings.ui_language),
          proactiveOptIn: Boolean(snapshot.settings.proactive_opt_in),
        });
        if (route === "/login") {
          startTransition(() => {
            navigate("/chat");
            setRoute("/chat");
          });
        }
      } catch (caught) {
        if (cancelled) {
          return;
        }
        if (!(caught instanceof ApiError && caught.status === 401)) {
          setError(caught instanceof Error ? caught.message : "Failed to initialize session.");
        }
        startTransition(() => {
          navigate("/login");
          setRoute("/login");
        });
      } finally {
        if (!cancelled) {
          setInitializing(false);
        }
      }
    }

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!me || route !== "/chat") {
      return;
    }

    let cancelled = false;
    setHistoryLoading(true);
    void api
      .getChatHistory()
      .then((payload) => {
        if (!cancelled) {
          setError(null);
          setHistory(payload.items);
        }
      })
      .catch((caught) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Failed to load chat history.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [me, route]);

  useEffect(() => {
    if (!me || route !== "/personality" || overview) {
      return;
    }

    let cancelled = false;
    setOverviewLoading(true);
    void api
      .getPersonalityOverview()
      .then((payload) => {
        if (!cancelled) {
          setError(null);
          setOverview(payload);
        }
      })
      .catch((caught) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Failed to load personality overview.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setOverviewLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [me, route, overview]);

  useEffect(() => {
    if (!me || route !== "/tools" || toolsOverview) {
      return;
    }

    let cancelled = false;
    setToolsLoading(true);
    void api
      .getToolsOverview()
      .then((payload) => {
        if (!cancelled) {
          setError(null);
          setToolsOverview(payload);
        }
      })
      .catch((caught) => {
        if (!cancelled) {
          setError(caught instanceof Error ? caught.message : "Failed to load tools overview.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setToolsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [me, route, toolsOverview]);

  const overviewSections = useMemo(() => {
    if (!overview) {
      return [];
    }

    const sections = [
      {
        key: "identity_state",
        title: "Identity",
        subtitle: "Profile, learned preferences, and identity policy context.",
        payload: overview.identity_state,
      },
      {
        key: "learned_knowledge",
        title: "Learned Knowledge",
        subtitle: "Semantic conclusions, affective conclusions, relations, and reflective growth.",
        payload: overview.learned_knowledge,
      },
      {
        key: "planning_state",
        title: "Planning",
        subtitle: "Goals, tasks, milestones, pending proposals, and continuity summaries.",
        payload: overview.planning_state,
      },
      {
        key: "role_skill_state",
        title: "Role + Skills",
        subtitle: "Role-policy boundaries, skill metadata, and selection visibility.",
        payload: overview.role_skill_state,
      },
      {
        key: "capability_catalog",
        title: "Capability Catalog",
        subtitle: "Approved tool families, authorization posture, and client-safe catalog truth.",
        payload: overview.capability_catalog,
      },
      {
        key: "api_readiness",
        title: "API Readiness",
        subtitle: "Backend readiness posture for first-party surfaces and future clients.",
        payload: overview.api_readiness,
      },
    ];

    const filter = deferredInspectorQuery.trim().toLowerCase();
    if (!filter) {
      return sections;
    }

    return sections.filter((section) => {
      const blob = `${section.title}\n${section.subtitle}\n${prettyJson(section.payload)}`.toLowerCase();
      return blob.includes(filter);
    });
  }, [deferredInspectorQuery, overview]);

  const planningSummary = (overview?.planning_state as Record<string, unknown> | undefined)?.continuity_summary as
    | Record<string, unknown>
    | undefined;
  const knowledgeSummary = (overview?.learned_knowledge as Record<string, unknown> | undefined)?.knowledge_summary as
    | Record<string, unknown>
    | undefined;
  const preferenceSummary = (overview?.identity_state as Record<string, unknown> | undefined)?.preference_summary as
    | Record<string, unknown>
    | undefined;
  const selectedUiLanguage = normalizeUiLanguage(
    route === "/settings" ? settingsDraft.uiLanguage : me?.settings.ui_language ?? settingsDraft.uiLanguage,
  );
  const resolvedUiLanguage = resolveUiLanguage(selectedUiLanguage);
  const copy = UI_COPY[resolvedUiLanguage];
  const currentUserLabel = me?.user.display_name || me?.user.email || "Account";
  const accountSummaryItems = [
    {
      label: copy.common.uiLanguage,
      value: localeLanguageLabel(
        UI_LANGUAGE_OPTIONS.find((option) => option.value === selectedUiLanguage) ?? UI_LANGUAGE_OPTIONS[0],
        resolvedUiLanguage,
      ),
    },
    {
      label: copy.common.proactive,
      value: Boolean(me?.settings.proactive_opt_in) ? copy.common.on : copy.common.off,
    },
  ];

  function changeRoute(nextRoute: RoutePath) {
    startTransition(() => {
      navigate(nextRoute);
      setRoute(nextRoute);
    });
  }

  async function refreshMe() {
    const snapshot = await api.getMe();
    setMe(snapshot);
    return snapshot;
  }

  async function handleAuthSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthBusy(true);
    setError(null);

    try {
      const snapshot =
        authMode === "login"
          ? await api.login({
              email: authForm.email,
              password: authForm.password,
            })
          : await api.register({
              email: authForm.email,
              password: authForm.password,
              display_name: authForm.displayName || undefined,
            });

      setMe(snapshot);
      setSettingsDraft({
        displayName: snapshot.user.display_name ?? "",
        uiLanguage: normalizeUiLanguage(snapshot.settings.ui_language),
        proactiveOptIn: Boolean(snapshot.settings.proactive_opt_in),
      });
      setAuthForm({ email: authForm.email, password: "", displayName: authForm.displayName });
      setToast(authMode === "login" ? "Session restored." : "Account created and session started.");
      startTransition(() => {
        navigate("/chat");
        setRoute("/chat");
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed.");
    } finally {
      setAuthBusy(false);
    }
  }

  async function handleLogout() {
    try {
      await api.logout();
      setMe(null);
      setOverview(null);
      setToolsOverview(null);
      setTelegramLinkStart(null);
      setHistory([]);
      setSessionMessages([]);
      setToast("Signed out.");
      startTransition(() => {
        navigate("/login");
        setRoute("/login");
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to sign out.");
    }
  }

  async function handleResetData() {
    if (!me || resetConfirmationText.trim() !== RESET_DATA_CONFIRMATION_TEXT) {
      return;
    }

    setResettingData(true);
    setError(null);

    try {
      const summary: AppResetDataResponse = await api.resetData(resetConfirmationText.trim());
      setMe(null);
      setOverview(null);
      setToolsOverview(null);
      setTelegramLinkStart(null);
      setHistory([]);
      setSessionMessages([]);
      setResetConfirmationText("");
      setToast(
        `${copy.settings.resetSuccess} ${summary.total_deleted_records} cleared, ${summary.revoked_session_count} sessions revoked.`,
      );
      startTransition(() => {
        navigate("/login");
        setRoute("/login");
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to reset runtime data.");
    } finally {
      setResettingData(false);
    }
  }

  async function handleSaveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!me) {
      return;
    }

    setSavingSettings(true);
    setError(null);

    try {
      const nextSettings: AppSettings = await api.patchSettings({
        display_name: settingsDraft.displayName || null,
        ui_language: settingsDraft.uiLanguage,
        proactive_opt_in: settingsDraft.proactiveOptIn,
      });
      const freshMe = await refreshMe();
      setSettingsDraft({
        displayName: freshMe.user.display_name ?? "",
        uiLanguage: normalizeUiLanguage(nextSettings.ui_language),
        proactiveOptIn: Boolean(nextSettings.proactive_opt_in),
      });
      setToast("Settings saved.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  }

  async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = chatText.trim();
    if (!text) {
      return;
    }

    setSendingMessage(true);
    setError(null);
    setSessionMessages((messages) => [
      ...messages,
      { id: `local-user-${Date.now()}`, role: "user", text },
    ]);
    setChatText("");

    try {
      const reply = await api.sendChatMessage(text);
      setSessionMessages((messages) => [
        ...messages,
        {
          id: reply.event_id,
          role: "assistant",
          text: reply.reply.message,
          meta: [
            reply.reply.language,
            reply.runtime?.role ? `role ${reply.runtime.role}` : null,
            reply.runtime?.action_status ? `action ${reply.runtime.action_status}` : null,
          ]
            .filter(Boolean)
            .join(" | "),
        },
      ]);
      const freshHistory = await api.getChatHistory();
      setHistory(freshHistory.items);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Message delivery failed.");
    } finally {
      setSendingMessage(false);
    }
  }

  async function handleToolToggle(toolId: string, nextValue: boolean) {
    const payloadByToolId: Record<string, Record<string, boolean>> = {
      telegram: { telegram_enabled: nextValue },
      clickup: { clickup_enabled: nextValue },
      google_calendar: { google_calendar_enabled: nextValue },
      google_drive: { google_drive_enabled: nextValue },
    };

    const payload = payloadByToolId[toolId];
    if (!payload) {
      return;
    }

    setSavingToolId(toolId);
    setError(null);

    try {
      const nextOverview = await api.patchToolsPreferences(payload);
      setToolsOverview(nextOverview);
      if (toolId === "telegram" && !nextValue) {
        setTelegramLinkStart(null);
      }
      setToast("Tool preferences saved to backend memory.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to save tool preference.");
    } finally {
      setSavingToolId(null);
    }
  }

  async function handleStartTelegramLink() {
    setTelegramLinkBusy(true);
    setError(null);

    try {
      const linkStart = await api.startTelegramLink();
      const nextOverview = await api.getToolsOverview();
      setTelegramLinkStart(linkStart);
      setToolsOverview(nextOverview);
      setToast("Telegram link code generated.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to start Telegram linking.");
    } finally {
      setTelegramLinkBusy(false);
    }
  }

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100 px-6 text-base-content">
        <div className="flex max-w-md flex-col items-center gap-4 rounded-[2rem] border border-base-300 bg-base-100/90 px-8 py-10 text-center shadow-halo">
          <span className="loading loading-spinner loading-lg text-primary" />
          <h1 className="font-display text-3xl text-base-900">Preparing AION Web</h1>
          <p className="text-sm leading-7 text-base-800">
            Checking your backend-owned session and loading the first-party workspace.
          </p>
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
          <header className="mb-8 overflow-hidden rounded-[2rem] border border-base-300 bg-hero-glow shadow-halo">
            <div className="grid gap-8 px-6 py-8 lg:grid-cols-[1.2fr_0.9fr] lg:px-10">
              <div className="space-y-5">
                <span className="badge badge-lg border-none bg-base-900 px-4 py-3 font-display text-signal-gold">
                  {copy.auth.badge}
                </span>
                <div className="space-y-3">
                  <h1 className="font-display text-4xl leading-tight text-base-900 md:text-6xl">
                    {copy.auth.heroTitle}
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-base-800 md:text-lg">
                    {copy.auth.heroBody}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="badge badge-outline badge-lg">backend / web / mobile</div>
                  <div className="badge badge-outline badge-lg">first-party auth</div>
                  <div className="badge badge-outline badge-lg">daisyUI shell</div>
                </div>
              </div>

              <div className="grid gap-4 rounded-[1.5rem] border border-base-300 bg-base-100/80 p-4 backdrop-blur">
                {[
                  ["Login + Register", "Backend-owned session cookie and identity mapping."],
                  ["Chat Workspace", "Primary conversation surface with continuity."],
                  ["Inspector", "Identity, memory, plans, and capabilities."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl bg-base-200 p-4">
                    <p className="font-display text-xl text-base-900">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-base-800">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </header>

          <main className="grid gap-6 lg:grid-cols-[1.05fr_1.15fr]">
            <section className="rounded-[2rem] border border-base-300 bg-base-200 p-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.auth.sessionEntry}</p>
                  <h2 className="font-display text-3xl text-base-900">
                    {authMode === "login" ? copy.auth.login : copy.auth.register}
                  </h2>
                </div>
                <div className="badge badge-outline">
                  {copy.common.build} {BUILD_REVISION.slice(0, 12)}
                </div>
              </div>

              <div className="tabs tabs-boxed mb-5 w-fit bg-base-100">
                <button
                  className={`tab ${authMode === "login" ? "tab-active" : ""}`}
                  onClick={() => setAuthMode("login")}
                  type="button"
                >
                  {copy.auth.tabsLogin}
                </button>
                <button
                  className={`tab ${authMode === "register" ? "tab-active" : ""}`}
                  onClick={() => setAuthMode("register")}
                  type="button"
                >
                  {copy.auth.tabsRegister}
                </button>
              </div>

              <form className="space-y-4" onSubmit={(event) => void handleAuthSubmit(event)}>
                <label className="form-control w-full">
                    <div className="label">
                    <span className="label-text text-base-900">{copy.auth.email}</span>
                    </div>
                  <input
                    className="input input-bordered w-full"
                    type="email"
                    value={authForm.email}
                    onChange={(event) => setAuthForm((form) => ({ ...form, email: event.target.value }))}
                    placeholder="you@example.com"
                    required
                  />
                </label>

                <label className="form-control w-full">
                    <div className="label">
                    <span className="label-text text-base-900">{copy.auth.password}</span>
                    </div>
                  <input
                    className="input input-bordered w-full"
                    type="password"
                    value={authForm.password}
                    onChange={(event) => setAuthForm((form) => ({ ...form, password: event.target.value }))}
                    placeholder="At least 8 characters"
                    required
                  />
                </label>

                {authMode === "register" ? (
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text text-base-900">{copy.auth.displayName}</span>
                    </div>
                    <input
                      className="input input-bordered w-full"
                      type="text"
                      value={authForm.displayName}
                      onChange={(event) => setAuthForm((form) => ({ ...form, displayName: event.target.value }))}
                      placeholder="How AION should address you"
                    />
                  </label>
                ) : null}

                <button className="btn btn-primary btn-block" disabled={authBusy} type="submit">
                  {authBusy ? copy.common.loading : authMode === "login" ? copy.auth.enterWorkspace : copy.auth.createAccount}
                </button>
              </form>

              {error ? (
                <div className="alert alert-error mt-4">
                  <span>{error}</span>
                </div>
              ) : null}
            </section>

            <section className="grid gap-4">
              {[
                {
                  title: "Auth + Settings",
                  body: "Ownable profile and preference layer backed by `/app/me` and `/app/me/settings`.",
                },
                {
                  title: "Chat",
                  body: "Main product surface for messaging the personality through `/app/chat/message`.",
                },
                {
                  title: "Personality Inspector",
                  body: "Structured sections from `/app/personality/overview` instead of raw debug endpoints.",
                },
              ].map((section) => (
                <article
                  key={section.title}
                  className="rounded-[1.75rem] border border-base-300 bg-base-100 p-6 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h2 className="font-display text-2xl text-base-900">{section.title}</h2>
                    <span className="badge badge-outline">Live contract</span>
                  </div>
                  <p className="text-sm leading-7 text-base-800">{section.body}</p>
                </article>
              ))}
            </section>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-24 pt-4 sm:px-6 lg:px-10 lg:pb-8">
        <header className="sticky top-3 z-20 mb-4 rounded-[1.75rem] border border-base-300 bg-base-100/90 shadow-sm backdrop-blur">
          <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge border-none bg-base-900 px-3 py-3 font-display text-signal-gold">AION Web</span>
                <span className="badge badge-outline hidden sm:inline-flex">
                  {copy.common.build} {BUILD_REVISION.slice(0, 12)}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs uppercase tracking-[0.24em] text-base-800">{copy.common.workspace}</p>
                <h1 className="font-display text-2xl text-base-900 sm:text-3xl">{routeLabel(route, resolvedUiLanguage)}</h1>
              </div>
            </div>

            <div className="hidden lg:flex lg:flex-wrap lg:gap-2">
              {ROUTES.map((entry) => (
                <button
                  key={entry}
                  className={`btn btn-sm ${route === entry ? "btn-primary" : "btn-ghost border border-base-300"}`}
                  onClick={() => changeRoute(entry)}
                  type="button"
                >
                  {routeLabel(entry, resolvedUiLanguage)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                className={`btn btn-sm ${accountPanelOpen ? "btn-primary" : "btn-outline"}`}
                onClick={() => setAccountPanelOpen((value) => !value)}
                type="button"
              >
                {copy.common.account}
              </button>
            </div>
          </div>

          {accountPanelOpen ? (
            <div className="border-t border-base-300 px-4 py-4 sm:px-5">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="rounded-[1.4rem] bg-base-200 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.common.signedInAs}</p>
                  <p className="mt-2 font-display text-2xl text-base-900">{currentUserLabel}</p>
                  <p className="mt-1 text-sm text-base-800">{me.user.email}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {accountSummaryItems.map((item) => (
                      <div key={item.label} className="rounded-[1.4rem] bg-base-200 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-base-800">{item.label}</p>
                        <p className="mt-2 text-base font-semibold text-base-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-outline sm:self-end xl:self-center" onClick={() => void handleLogout()} type="button">
                    {copy.common.signOut}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </header>

        <section className="mb-4 rounded-[1.5rem] border border-base-300 bg-base-200/80 px-4 py-4 shadow-sm sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.24em] text-base-800">{copy.common.currentSurface}</p>
              <p className="mt-2 text-sm leading-7 text-base-800 sm:text-base">
                {routeDescription(route, resolvedUiLanguage)}
              </p>
            </div>
            <div className="badge badge-outline">{routeLabel(route, resolvedUiLanguage)}</div>
          </div>
        </section>

        {toast ? (
          <div className="alert alert-success mb-4">
            <span>{toast}</span>
          </div>
        ) : null}

        {error ? (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        ) : null}

        <main className="flex-1">
          {route === "/chat" ? (
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.8fr)]">
              <section className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.chat.eyebrow}</p>
                    <h2 className="font-display text-3xl text-base-900">{copy.chat.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-base-800">{copy.chat.subtitle}</p>
                  </div>
                  <div className="grid min-w-[12rem] gap-3 sm:grid-cols-3 xl:grid-cols-1">
                    <div className="rounded-[1.3rem] bg-base-200 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.chat.sessionCount}</p>
                      <p className="mt-2 text-xl font-semibold text-base-900">{sessionMessages.length}</p>
                    </div>
                    <div className="rounded-[1.3rem] bg-base-200 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.chat.memoryCount}</p>
                      <p className="mt-2 text-xl font-semibold text-base-900">{history.length}</p>
                    </div>
                    <div className="rounded-[1.3rem] bg-base-200 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.chat.latestLanguage}</p>
                      <p className="mt-2 text-xl font-semibold text-base-900">
                        {stringValue(me.settings.preferred_language, copy.common.system)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 flex max-h-[32rem] min-h-[22rem] flex-col gap-4 overflow-y-auto rounded-[1.6rem] bg-base-200 p-4">
                  {sessionMessages.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-5 text-sm leading-7 text-base-800">
                      {copy.chat.emptyThread}
                    </div>
                  ) : null}
                  {sessionMessages.map((message) => (
                    <article
                      key={message.id}
                      className={`max-w-[92%] rounded-[1.5rem] px-4 py-3 text-sm leading-7 shadow-sm sm:max-w-[85%] ${
                        message.role === "user"
                          ? "ml-auto bg-base-900 text-base-100"
                          : "border border-base-300 bg-base-100 text-base-900"
                      }`}
                    >
                      <p className="mb-2 text-xs uppercase tracking-[0.22em] opacity-70">
                        {message.role === "user" ? copy.common.user : copy.common.assistant}
                      </p>
                      <p>{message.text}</p>
                      {"meta" in message && message.meta ? (
                        <p className="mt-2 text-xs opacity-70">{message.meta}</p>
                      ) : null}
                    </article>
                  ))}
                </div>

                <form
                  className="sticky bottom-[4.5rem] rounded-[1.6rem] border border-base-300 bg-base-100/95 p-4 shadow-sm backdrop-blur lg:bottom-0"
                  onSubmit={(event) => void handleSendMessage(event)}
                >
                  <textarea
                    className="textarea textarea-bordered h-28 w-full"
                    placeholder={copy.chat.placeholder}
                    value={chatText}
                    onChange={(event) => setChatText(event.target.value)}
                  />
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-base-800">{copy.chat.composerHint}</p>
                    <button className="btn btn-primary" disabled={sendingMessage} type="submit">
                      {sendingMessage ? copy.chat.sending : copy.chat.send}
                    </button>
                  </div>
                </form>
              </section>

              <aside className="rounded-[2rem] border border-base-300 bg-base-200 p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.chat.continuity}</p>
                    <h2 className="font-display text-2xl text-base-900">{copy.chat.timeline}</h2>
                  </div>
                  {historyLoading ? <span className="loading loading-dots loading-sm text-primary" /> : null}
                </div>

                <div className="space-y-3">
                  {history.length === 0 ? (
                    <div className="rounded-2xl bg-base-100 p-4 text-sm text-base-800">{copy.chat.noHistory}</div>
                  ) : null}
                  {history.map((item) => (
                    <article key={item.event_id} className="rounded-2xl bg-base-100 p-4 text-sm shadow-sm">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="badge badge-outline">{item.source}</span>
                        <span className="text-xs text-base-800">
                          {formatTimestamp(item.event_timestamp, resolvedUiLanguage)}
                        </span>
                      </div>
                      <p className="font-semibold text-base-900">{item.summary}</p>
                      {item.payload ? (
                        <details className="collapse collapse-arrow mt-3 rounded-box border border-base-300 bg-base-100">
                          <summary className="collapse-title min-h-0 px-4 py-3 text-sm font-medium text-base-900">
                            {copy.chat.payload}
                          </summary>
                          <div className="collapse-content px-4 pb-4">
                            <pre className="overflow-x-auto rounded-xl bg-base-200 p-3 text-xs leading-6 text-base-900">
                              {prettyJson(item.payload)}
                            </pre>
                          </div>
                        </details>
                      ) : null}
                    </article>
                  ))}
                </div>
              </aside>
            </div>
          ) : null}

          {route === "/settings" ? (
            <section className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm">
              <div className="mb-6 max-w-3xl">
                <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.settings.eyebrow}</p>
                <h2 className="font-display text-3xl text-base-900">{copy.settings.title}</h2>
                <p className="mt-3 text-sm leading-7 text-base-800">{copy.settings.subtitle}</p>
              </div>

              <form className="grid gap-4 xl:grid-cols-2" onSubmit={(event) => void handleSaveSettings(event)}>
                <section className="rounded-[1.6rem] border border-base-300 bg-base-200 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-800">{copy.settings.profileTitle}</p>
                  <h3 className="mt-2 font-display text-2xl text-base-900">{copy.auth.displayName}</h3>
                  <p className="mt-2 text-sm leading-7 text-base-800">{copy.settings.profileBody}</p>
                  <label className="form-control mt-4">
                    <input
                      className="input input-bordered"
                      value={settingsDraft.displayName}
                      onChange={(event) =>
                        setSettingsDraft((draft) => ({ ...draft, displayName: event.target.value }))
                      }
                      placeholder={copy.auth.displayName}
                    />
                  </label>
                </section>

                <section className="rounded-[1.6rem] border border-base-300 bg-base-200 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-base-800">{copy.settings.uiLanguageTitle}</p>
                      <h3 className="mt-2 font-display text-2xl text-base-900">{copy.common.uiLanguage}</h3>
                    </div>
                    <div className="badge badge-outline">{copy.common.interfaceOnly}</div>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-base-800">{copy.settings.uiLanguageBody}</p>
                  <label className="form-control mt-4">
                    <select
                      className="select select-bordered"
                      value={settingsDraft.uiLanguage}
                      onChange={(event) =>
                        setSettingsDraft((draft) => ({
                          ...draft,
                          uiLanguage: normalizeUiLanguage(event.target.value),
                        }))
                      }
                    >
                      {UI_LANGUAGE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.flag} {localeLanguageLabel(option, resolvedUiLanguage)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="mt-3 text-sm text-base-800">{copy.settings.uiLanguageHelp}</p>
                </section>

                <section className="rounded-[1.6rem] border border-base-300 bg-base-200 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-800">{copy.settings.conversationTitle}</p>
                  <h3 className="mt-2 font-display text-2xl text-base-900">{copy.common.conversationLanguage}</h3>
                  <p className="mt-2 text-sm leading-7 text-base-800">{copy.settings.conversationBody}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.2rem] bg-base-100 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.common.sourceOfTruth}</p>
                      <p className="mt-2 text-base font-semibold text-base-900">
                        {stringValue(me.settings.preferred_language, copy.common.notSet)}
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] bg-base-100 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.common.details}</p>
                      <p className="mt-2 text-base font-semibold text-base-900">{copy.settings.conversationRuntimeOwned}</p>
                    </div>
                  </div>
                </section>

                <section className="rounded-[1.6rem] border border-base-300 bg-base-200 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-800">{copy.settings.proactiveTitle}</p>
                  <h3 className="mt-2 font-display text-2xl text-base-900">{copy.common.proactive}</h3>
                  <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-[1.2rem] bg-base-100 px-4 py-4">
                    <input
                      className="toggle toggle-primary mt-1"
                      type="checkbox"
                      checked={settingsDraft.proactiveOptIn}
                      onChange={(event) =>
                        setSettingsDraft((draft) => ({ ...draft, proactiveOptIn: event.target.checked }))
                      }
                    />
                    <div>
                      <span className="text-base font-semibold text-base-900">{copy.settings.proactiveTitle}</span>
                      <p className="mt-1 text-sm leading-7 text-base-800">{copy.settings.proactiveBody}</p>
                    </div>
                  </label>
                </section>

                <section className="rounded-[1.6rem] border border-error/40 bg-error/5 p-4 xl:col-span-2">
                  <p className="text-sm uppercase tracking-[0.2em] text-error">{copy.settings.resetTitle}</p>
                  <h3 className="mt-2 font-display text-2xl text-base-900">{copy.settings.resetAction}</h3>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-base-900">{copy.settings.resetBody}</p>
                  <p className="mt-3 max-w-4xl text-sm leading-7 text-base-800">{copy.settings.resetImpact}</p>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <label className="form-control">
                      <div className="label">
                        <span className="label-text text-base-900">{copy.settings.resetConfirmationLabel}</span>
                      </div>
                      <input
                        className="input input-bordered border-error/40 bg-base-100"
                        value={resetConfirmationText}
                        onChange={(event) => setResetConfirmationText(event.target.value)}
                        placeholder={copy.settings.resetConfirmationPlaceholder}
                      />
                      <div className="label">
                        <span className="label-text text-base-800">
                          {copy.settings.resetConfirmationHint} <code>{RESET_DATA_CONFIRMATION_TEXT}</code>
                        </span>
                      </div>
                    </label>

                    <button
                      className="btn btn-error w-full lg:w-fit"
                      disabled={resettingData || resetConfirmationText.trim() !== RESET_DATA_CONFIRMATION_TEXT}
                      type="button"
                      onClick={() => {
                        void handleResetData();
                      }}
                    >
                      {resettingData ? copy.settings.resetting : copy.settings.resetAction}
                    </button>
                  </div>
                </section>

                <div className="xl:col-span-2">
                  <div className="sticky bottom-[4.5rem] rounded-[1.6rem] border border-base-300 bg-base-100/95 p-4 shadow-sm backdrop-blur lg:bottom-0">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-base-900">{copy.settings.savedState}</p>
                        <p className="text-sm text-base-800">{copy.settings.saveHint}</p>
                      </div>
                      <button className="btn btn-primary w-full sm:w-fit" disabled={savingSettings} type="submit">
                        {savingSettings ? copy.common.saving : copy.common.save}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          ) : null}

          {route === "/tools" ? (
            <div className="grid gap-6">
              <section className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                <div className="mb-5 max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.tools.eyebrow}</p>
                  <h2 className="font-display text-3xl text-base-900">{copy.tools.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-base-800">{copy.tools.subtitle}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: copy.tools.groupCount,
                    value: stringValue(toolsOverview?.summary.total_groups, "0"),
                    note: "Grouped backend-owned categories",
                  },
                  {
                    title: copy.tools.integral,
                    value: stringValue(toolsOverview?.summary.integral_enabled_count, "0"),
                    note: "Always-on product capabilities",
                  },
                  {
                    title: copy.tools.ready,
                    value: stringValue(toolsOverview?.summary.provider_ready_count, "0"),
                    note: "Tools with a live provider path today",
                  },
                  {
                    title: copy.tools.linkRequired,
                    value: stringValue(toolsOverview?.summary.link_required_count, "0"),
                    note: "Channels awaiting user identity linking",
                  },
                ].map((card) => (
                  <article key={card.title} className="rounded-[1.75rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.22em] text-base-800">{card.title}</p>
                    <p className="mt-3 font-display text-4xl text-base-900">{card.value}</p>
                    <p className="mt-2 text-sm text-base-800">{card.note}</p>
                  </article>
                ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.tools.eyebrow}</p>
                    <h2 className="font-display text-3xl text-base-900">{copy.tools.title}</h2>
                  </div>
                  <div className="badge badge-outline">
                    {toolsOverview ? `${toolsOverview.summary.total_items} items` : "backend snapshot"}
                  </div>
                </div>

                {toolsLoading ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-base-200 px-4 py-5 text-base-900">
                    <span className="loading loading-spinner loading-sm text-primary" />
                    {copy.tools.loading}
                  </div>
                ) : null}

                {!toolsLoading && !toolsOverview ? (
                  <div className="rounded-2xl bg-base-200 px-4 py-5 text-sm text-base-800">
                    {copy.tools.empty}
                  </div>
                ) : null}

                <div className="grid gap-5">
                  {toolsOverview?.groups.map((group) => (
                    <article key={group.id} className="rounded-[1.6rem] border border-base-300 bg-base-200 p-4">
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl text-base-900">{group.title}</h3>
                          <p className="mt-1 max-w-3xl text-sm leading-7 text-base-800">{group.description}</p>
                        </div>
                        <span className="badge badge-outline">{group.item_count} items</span>
                      </div>

                      <div className="grid gap-4 xl:grid-cols-2">
                        {group.items.map((item) => (
                          <section key={item.id} className="rounded-[1.4rem] border border-base-300 bg-base-100 p-4">
                            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="font-display text-xl text-base-900">{item.label}</h4>
                                  {item.integral ? <span className="badge badge-primary">Integral</span> : null}
                                </div>
                                <p className="mt-2 text-sm leading-7 text-base-800">{item.description}</p>
                              </div>
                              <div className={`badge ${toolStatusClass(item.status)}`}>{formatToolState(item.status)}</div>
                            </div>

                            <div className="mb-4 grid gap-3 lg:grid-cols-2">
                              <div className="rounded-2xl bg-base-200 p-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.availability}</p>
                                <p className="mt-2 text-base font-semibold text-base-900">
                                  {item.enabled ? copy.common.on : copy.common.off}
                                </p>
                              </div>
                              <div className="rounded-2xl bg-base-200 p-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.provider}</p>
                                <p className="mt-2 text-base font-semibold text-base-900">
                                  {item.provider.name.replaceAll("_", " ")}
                                </p>
                                <p className="mt-1 text-xs text-base-800">
                                  {item.provider.ready
                                    ? "ready"
                                    : item.provider.configured
                                      ? "configured"
                                      : "not configured"}
                                </p>
                              </div>
                              <div className="rounded-2xl bg-base-200 p-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.control}</p>
                                {item.user_control.toggle_allowed ? (
                                  <label className="mt-2 flex items-center gap-3">
                                    <input
                                      className="toggle toggle-primary"
                                      type="checkbox"
                                      checked={Boolean(item.user_control.requested_enabled)}
                                      disabled={savingToolId === item.id}
                                      onChange={(event) => {
                                        void handleToolToggle(item.id, event.target.checked);
                                      }}
                                    />
                                    <span className="text-base font-semibold text-base-900">
                                      {savingToolId === item.id
                                        ? copy.tools.saving
                                        : item.user_control.requested_enabled
                                          ? copy.tools.enabledByUser
                                          : copy.tools.disabledByUser}
                                    </span>
                                  </label>
                                ) : (
                                  <p className="mt-2 text-base font-semibold text-base-900">{copy.tools.readOnly}</p>
                                )}
                              </div>
                              <div className="rounded-2xl bg-base-200 p-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.linkState}</p>
                                <p className="mt-2 text-base font-semibold text-base-900">
                                  {titleCaseFromStatus(item.link_state)}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <div className="rounded-2xl border border-base-300 px-4 py-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.currentStatus}</p>
                                <p className="mt-2 text-sm leading-7 text-base-900">{item.status_reason}</p>
                              </div>

                              <div className="rounded-2xl border border-base-300 px-4 py-3">
                                <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.nextStep}</p>
                                <p className="mt-2 text-sm leading-7 text-base-900">
                                  {summarizeToolAction(item.next_actions, copy.tools.noAction)}
                                </p>
                              </div>

                              {item.id === "telegram" &&
                              item.user_control.requested_enabled &&
                              item.provider.ready &&
                              item.link_state !== "linked" ? (
                                <div className="rounded-2xl border border-base-300 px-4 py-4">
                                  <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                      <p className="text-xs uppercase tracking-[0.18em] text-base-800">
                                        {copy.tools.telegramLinking}
                                      </p>
                                      <p className="mt-2 max-w-2xl text-sm leading-7 text-base-900">
                                        Generate a short code, then send it to the configured AION Telegram bot from
                                        the chat you want to attach to this identity.
                                      </p>
                                    </div>
                                    <button
                                      className="btn btn-primary btn-sm"
                                      disabled={telegramLinkBusy}
                                      type="button"
                                      onClick={() => {
                                        void handleStartTelegramLink();
                                      }}
                                    >
                                      {telegramLinkBusy
                                        ? copy.tools.generating
                                        : telegramLinkStart
                                          ? copy.tools.rotateCode
                                          : copy.tools.generateCode}
                                    </button>
                                  </div>

                                  {telegramLinkStart ? (
                                    <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
                                      <div className="rounded-2xl bg-base-200 p-3">
                                        <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.linkCode}</p>
                                        <p className="mt-2 font-display text-3xl tracking-[0.18em] text-base-900">
                                          {telegramLinkStart.link_code}
                                        </p>
                                        <p className="mt-2 text-xs text-base-800">
                                          Expires in about {telegramLinkStart.expires_in_seconds} seconds.
                                        </p>
                                      </div>
                                      <div className="rounded-2xl bg-base-200 p-3">
                                        <p className="text-xs uppercase tracking-[0.18em] text-base-800">
                                          {copy.tools.instruction}
                                        </p>
                                        <p className="mt-2 text-sm leading-7 text-base-900">
                                          {telegramLinkStart.instruction_text}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="mt-4 text-sm text-base-800">
                                      {copy.tools.noLinkCode}
                                    </p>
                                  )}
                                </div>
                              ) : null}

                              <details className="rounded-2xl border border-base-300 bg-base-100">
                                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-base-900">
                                  {copy.tools.technicalDetails}
                                </summary>
                                <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
                                  <div className="rounded-2xl bg-base-200 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.tools.capabilities}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {item.capabilities.length > 0 ? (
                                        item.capabilities.map((capability) => (
                                          <span key={capability} className="badge badge-outline">
                                            {capability}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-sm text-base-800">{copy.common.noData}</span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="rounded-2xl bg-base-200 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.common.sourceOfTruth}</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {item.source_of_truth.length > 0 ? (
                                        item.source_of_truth.map((source) => (
                                          <span key={source} className="badge badge-ghost">
                                            {source}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-sm text-base-800">{copy.common.noData}</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </details>
                            </div>
                          </section>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          ) : null}

          {route === "/personality" ? (
            <div className="grid gap-6">
              <section className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                <div className="mb-5 max-w-3xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.personality.eyebrow}</p>
                  <h2 className="font-display text-3xl text-base-900">{copy.personality.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-base-800">{copy.personality.subtitle}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: copy.personality.goals,
                    value: stringValue(planningSummary?.active_goal_count, "0"),
                    note: "Active goals in planning continuity",
                  },
                  {
                    title: copy.personality.tasks,
                    value: stringValue(planningSummary?.active_task_count, "0"),
                    note: "Current tracked task count",
                  },
                  {
                    title: copy.personality.knowledge,
                    value: stringValue(knowledgeSummary?.semantic_conclusion_count, "0"),
                    note: "Semantic conclusions stored",
                  },
                  {
                    title: copy.personality.preferences,
                    value: stringValue(preferenceSummary?.learned_preference_count, "0"),
                    note: "Resolved runtime preference keys",
                  },
                ].map((card) => (
                  <article key={card.title} className="rounded-[1.75rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.22em] text-base-800">{card.title}</p>
                    <p className="mt-3 font-display text-4xl text-base-900">{card.value}</p>
                    <p className="mt-2 text-sm text-base-800">{card.note}</p>
                  </article>
                ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-base-300 bg-base-100 p-5 shadow-sm">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.personality.eyebrow}</p>
                    <h2 className="font-display text-3xl text-base-900">{copy.personality.title}</h2>
                  </div>
                  <label className="input input-bordered flex w-full items-center gap-2 sm:max-w-sm">
                    <input
                      className="grow"
                      placeholder={copy.personality.filter}
                      value={inspectorQuery}
                      onChange={(event) => setInspectorQuery(event.target.value)}
                    />
                  </label>
                </div>

                {overviewLoading ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-base-200 px-4 py-5 text-base-900">
                    <span className="loading loading-spinner loading-sm text-primary" />
                    {copy.personality.loading}
                  </div>
                ) : null}

                {!overviewLoading && overviewSections.length === 0 ? (
                  <div className="rounded-2xl bg-base-200 px-4 py-5 text-sm text-base-800">
                    {copy.personality.empty}
                  </div>
                ) : null}

                <div className="grid gap-4 xl:grid-cols-2">
                  {overviewSections.map((section) => (
                    <article key={section.key} className="rounded-[1.6rem] border border-base-300 bg-base-200 p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl text-base-900">{section.title}</h3>
                          <p className="mt-1 text-sm leading-7 text-base-800">{section.subtitle}</p>
                        </div>
                        <span className="badge badge-outline">{section.key}</span>
                      </div>
                      <div className="rounded-2xl bg-base-100 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-base-800">{copy.personality.highlights}</p>
                        <div className="mt-3 space-y-2">
                          {summaryLines(section.key, section.payload).map((line) => (
                            <p key={line} className="text-sm leading-7 text-base-900">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                      <details className="mt-3 rounded-2xl border border-base-300 bg-base-100">
                        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-base-900">
                          {copy.common.inspectPayload}
                        </summary>
                        <pre className="max-h-[24rem] overflow-auto px-4 pb-4 text-xs leading-6 text-base-900">
                          {prettyJson(section.payload)}
                        </pre>
                      </details>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          ) : null}
        </main>

        <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-base-300 bg-base-100/95 px-3 py-3 backdrop-blur lg:hidden">
          <div className="mx-auto grid max-w-lg grid-cols-4 gap-2">
            {ROUTES.map((entry) => (
              <button
                key={entry}
                className={`rounded-[1.2rem] px-3 py-3 text-sm font-medium transition ${
                  route === entry
                    ? "bg-base-900 text-base-100 shadow-sm"
                    : "border border-base-300 bg-base-200 text-base-900"
                }`}
                onClick={() => changeRoute(entry)}
                type="button"
              >
                {routeLabel(entry, resolvedUiLanguage)}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
