import { startTransition, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ApiError,
  api,
  type AppChatHistoryEntry,
  type AppHealthResponse,
  type AppHealthTelegramChannel,
  type AppMeResponse,
  type AppPersonalityOverviewResponse,
  type AppResetDataResponse,
  type AppSettings,
  type AppTelegramLinkStartResponse,
  type AppToolsOverviewResponse,
} from "./lib/api";
import {
  formatToolLinkState,
  formatToolState,
  summarizeToolAction,
  toolStatusClass,
} from "./lib/tool-formatting";
import {
  formatTimestamp,
  recentActivityRows,
  stringValue,
  summaryLines,
} from "./lib/learned-state-formatting";
import { numberValue, scaledMetricSize } from "./lib/metric-formatting";
import { buildChatRouteModel } from "./lib/chat-route-model";
import {
  chatDeliveryState,
  reconcileLocalTranscriptItems,
  transcriptMetadataSummary,
} from "./lib/chat-transcript";
import { renderChatMarkdown } from "./lib/chat-markdown";
import {
  UI_LANGUAGE_OPTIONS,
  UTC_OFFSET_OPTIONS,
  localeOptionDisplay,
  normalizeUiLanguage,
  normalizeUtcOffset,
  resolveUiLanguage,
  uiLanguageMetadata,
  utcOffsetOption,
  type ResolvedUiLanguageCode,
  type UiLanguageCode,
} from "./lib/settings-formatting";
import { ChevronDownIcon, CloseIcon, MicrophoneIcon, PlusIcon, SendArrowIcon } from "./components/app-icons";
import {
  ChatCognitiveBelt,
  ChatComposerShell,
  ChatFlowStage,
  ChatPortraitPanel,
  ChatTopbar,
  ChatTranscriptMessageRow,
  ChatTranscriptShell,
  type ChatCognitiveBeltItem,
} from "./components/chat";
import { DashboardSignalCard } from "./components/dashboard";
import { PersonalityTimelineRow } from "./components/personality";
import { MotifFigurePanel, PublicGlyph } from "./components/public-shell";
import {
  FeedbackBanner,
  FlowRail,
  InsightPanel,
  ModuleEntryCard,
  ModuleActivityList,
  ModuleOverviewBar,
  ModuleRouteSidePanel,
  ModuleRouteSideRow,
  ModuleStatRow,
  ModuleTextCardList,
  RouteNoteCard,
  RouteHeroPanel,
  RouteStatCard,
  StatePanel,
} from "./components/shared";
import {
  SettingsCard,
  SettingsDangerPanel,
  SettingsFact,
  SettingsProactivePanel,
  SettingsSavePanel,
} from "./components/settings";
import {
  AviaryWordmark,
  ShellNavButton,
  ShellUtilityBar,
  SidebarBrandBlock,
  type SidebarIconKind,
} from "./components/shell";
import {
  ToolsDetailCard,
  ToolsFactCard,
  ToolsSummaryCard,
  ToolsTelegramLinkPanel,
  ToolsTechnicalDetailPanel,
} from "./components/tools";
import { ROUTES, navigate, navigatePublicEntry, normalizeRoute, type RoutePath } from "./routes";

type AuthMode = "login" | "register";
const BUILD_REVISION = String(import.meta.env.VITE_APP_BUILD_REVISION ?? "dev");
const CANONICAL_PERSONA_FIGURE_SRC = "/aviary-persona-figure-canonical-reference-v1.png";
const DASHBOARD_HERO_ART_SRC = "/aviary-dashboard-hero-canonical-reference-v4.png";
const LANDING_HERO_ART_SRC = "/aviary-landing-hero-canonical-reference-v1.png";
const RESET_DATA_CONFIRMATION_TEXT = "RESET MY DATA";

const UI_COPY = {
  en: {
    routes: {
      "/login": "Login",
      "/dashboard": "Dashboard",
      "/chat": "Chat",
      "/memory": "Memory",
      "/reflections": "Reflections",
      "/plans": "Plans",
      "/goals": "Goals",
      "/insights": "Insights",
      "/automations": "Automations",
      "/integrations": "Integrations",
      "/settings": "Settings",
      "/tools": "Tools",
      "/personality": "Personality",
    } satisfies Record<RoutePath, string>,
    routeDescriptions: {
      "/login": "Authenticate into the product shell.",
      "/dashboard": "Flagship overview of your current goals, signals, flow, and next best actions.",
      "/chat": "One shared conversation thread with your latest exchanged messages and fresh replies from the personality.",
      "/memory": "A calm map of reusable patterns, learned preferences, and continuity signals.",
      "/reflections": "Slower learning, integration notes, and the insights that shape future responses.",
      "/plans": "Planning posture, active work, and the next calm step without turning the route into execution.",
      "/goals": "A calm view of active direction, meaningful progress, and what deserves focus.",
      "/insights": "A clear sensemaking layer for patterns, signals, and guidance already present in AION.",
      "/automations": "A visible control room for proactive preference, attention queue, and scheduler posture.",
      "/integrations": "A quiet map of connected providers, link state, and integration readiness.",
      "/settings": "Profile, interface language, and proactive preferences in one clear place.",
      "/tools": "See what is ready, what needs attention, and what you can use next.",
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
      utcOffset: "UTC offset",
      conversationLanguage: "Conversation language",
      proactive: "Proactive",
      on: "On",
      off: "Off",
      save: "Save settings",
      saving: "Saving...",
      loading: "Loading...",
      interfaceOnly: "Interface only",
      details: "Details",
      inspectPayload: "View details",
      noData: "No data yet.",
      user: "You",
      assistant: "Presence",
      sourceOfTruth: "Current value",
      notSet: "not set",
      system: "System",
      stateLoadingTitle: "Getting things ready",
      stateEmptyTitle: "Nothing to show yet",
      stateSuccessTitle: "Done",
      stateErrorTitle: "Something needs attention",
      stateDetailLabel: "Details",
      view: "View",
      unknownTime: "Unknown time",
      recentActivity: [
        { title: "Updated project plan", when: "2h ago" },
        { title: "Deep work window refined", when: "3h ago" },
        { title: "Completed reflection cycle", when: "5h ago" },
        { title: "New memory captured", when: "Yesterday" },
        { title: "Learned preference captured", when: "Yesterday" },
      ],
    },
    auth: {
      badge: "Aviary",
      heroTitle: "A calmer place to continue the conversation.",
      heroBody:
        "Sign in to pick up where you left off, adjust your preferences, and keep Aviary close without digging through setup screens.",
      sessionEntry: "Session entry",
      trustTitle: "What you can expect",
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
    dashboard: {
      eyebrow: "Dashboard",
      title: "Your living overview",
      subtitle: "A calm flagship surface for goals, guidance, memory, and the embodied flow behind your next move.",
    },
    chat: {
      eyebrow: "Conversation",
      title: "Talk to the personality",
      subtitle: "See the latest shared conversation first, whether the recent turns came from the app or a linked channel.",
      emptyThread:
        "Start the conversation here. New turns will appear in this shared thread as soon as they are exchanged.",
      placeholder: "Send a message...",
      composerHint: "Replies land back in this same transcript, so you can stay focused on one conversation.",
      send: "Send message",
      sending: "Sending...",
      delivered: "Delivered",
      failed: "Failed to send",
      thread: "Thread",
      latestMessages: "Latest messages",
      noHistory: "No shared messages yet.",
      transcriptCount: "Transcript items",
      activeChannel: "Recent channels",
      latestLanguage: "Live language",
      messageDetails: "Message details",
      channel: "Channel",
      pending: "Sending now",
    },
    settings: {
      eyebrow: "Settings",
      title: "Personalize the shell",
      subtitle: "Short, mobile-first settings focused on your profile, interface language, and proactive follow-ups.",
      profileTitle: "Profile",
      profileBody: "Choose how the shell identifies you.",
      uiLanguageTitle: "Interface language",
      uiLanguageBody: "Changes labels, copy, and navigation in the app shell only.",
      uiLanguageHelp: "This does not control the language used inside the conversation itself.",
      utcOffsetTitle: "Local time offset",
      utcOffsetBody: "Sets the explicit UTC offset used when the runtime reasons about the current date and time for your profile.",
      utcOffsetHelp: "Choose the offset that matches your current place, for example Switzerland or Poland in winter is usually UTC+01:00.",
      conversationTitle: "Conversation language",
      conversationBody: "The conversation adapts live from context, history, and the current exchange.",
      proactiveTitle: "Proactive follow-ups",
      proactiveBody: "Let Aviary send occasional follow-ups when your account settings allow it.",
      saveHint: "Save your changes when you are ready.",
      conversationRuntimeOwned: "Adaptive and context-aware",
      savedState: "Ready to save",
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
      loading: "Loading your tools overview.",
      empty: "Your tools overview will appear here.",
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
      summaryGroupNote: "Clear groups for the tools you can browse here",
      summaryIntegralNote: "Capabilities that stay available as part of the product",
      summaryReadyNote: "Tools that are ready to use today",
      summaryLinkRequiredNote: "Channels waiting for a quick linking step",
      directoryTitle: "Tool directory",
      itemSingularSuffix: "item",
      itemsSuffix: "items",
      workspaceSnapshot: "workspace snapshot",
      statusAlwaysOn: "Always on",
      statusReadyToUse: "Ready to use",
      statusLinkRequired: "Link required",
      statusPlanned: "Planned",
      statusNeedsReview: "Needs review",
      providerReadyValue: "ready",
      providerConfiguredValue: "configured",
      providerNotConfiguredValue: "not configured",
      telegramInstructionBody:
        "Generate a short code, then send it to the configured Aviary Telegram bot from the chat you want to attach to this identity.",
      expiresInAbout: "Expires in about",
      seconds: "seconds",
      saveSuccess: "Your tool choices have been saved.",
      saveError: "Failed to save tool preference.",
      telegramLinkReady: "Your Telegram link code is ready.",
      telegramStartError: "Failed to start Telegram linking.",
      readyChipSuffix: "ready",
      needsLinkingChipSuffix: "needs linking",
      alwaysOnChipSuffix: "always on",
      linkStateLinkedValue: "Linked",
      linkStateNotLinkedValue: "Not linked",
      linkStateRequiredValue: "Link required",
      linkStateUnknownValue: "Unknown",
    },
    memory: {
      eyebrow: "Memory",
      title: "Continuity library",
      subtitle: "Reusable patterns, learned cues, and recent context without turning memory into a raw database.",
      semantic: "Reusable patterns",
      affective: "Affective insights",
      preferences: "Learned cues",
      recent: "Recent memory signals",
      continuity: "Continuity",
      patternSingularSuffix: "pattern",
      patternsSuffix: "patterns",
      patternsZeroSuffix: "patterns",
      insightSingularSuffix: "insight",
      insightsSuffix: "insights",
      insightsZeroSuffix: "insights",
      cueSingularSuffix: "cue",
      cuesSuffix: "cues",
      cuesZeroSuffix: "cues",
      semanticDetail: "Patterns ready for reuse in future replies.",
      affectiveDetail: "Emotional takeaways that can shape tone and timing.",
      preferencesDetail: "Stable cues attached to your preferred way of working.",
      memoryMap: "Memory map",
      memoryMapTitle: "What can be reused",
      noRawRecords: "No raw records exposed",
      semanticMemoryTitle: "Semantic memory",
      semanticMemoryDetail: "Reusable concepts and summaries stay available before the next response.",
      affectiveMemoryTitle: "Affective memory",
      affectiveMemoryDetail: "Tone, friction, and emotional context can inform future expression.",
      preferencesMemoryTitle: "Preferences",
      preferencesMemoryDetail: "Learned cues keep the shell personal without exposing raw records.",
      continuityNearConversation: "Continuity near the conversation",
      conversationContinuityTitle: "Conversation continuity",
      memorySourceEmptyBody: "The web app is ready to become the active memory source.",
      recentChannelsPrefix: "Recent channels:",
      currentContext: "Current context",
      reflectionBridgeTitle: "Reflection bridge",
      reflectionBridgeEmptyBody: "A short reflection can start deeper memory formation.",
      reflectionBridgeReadyBody: "Recent reflections are already available to shape the next answer.",
      slowLearning: "Slow learning",
      preferencePostureTitle: "Preference posture",
      preferencePostureEmptyBody: "No learned cues yet; the view stays ready without pretending.",
      preferencePostureReadyBody: "Learned cues are present and visible without exposing internals.",
      personalization: "Personalization",
      recentMovement: "Recent movement",
    },
    reflections: {
      eyebrow: "Reflections",
      title: "Reflection chamber",
      subtitle: "A quieter layer for insights, integration, and the slower learning that shapes continuity.",
      integrated: "Integrated insights",
      pending: "Ready to integrate",
      cadence: "Learning cadence",
      recent: "Recent reflections",
      slowLearning: "Slow learning",
      insightSingularSuffix: "insight",
      insightsSuffix: "insights",
      insightsZeroSuffix: "insights",
      threadSingularSuffix: "thread",
      threadsSuffix: "threads",
      readyValue: "Ready",
      activeValue: "Active",
      integratedDetail: "Insights already available to influence future expression.",
      pendingDetail: "Open threads that can become clearer through a short review.",
      cadenceDetail: "The slower learning layer stays available without crowding chat.",
      reflectionFlow: "Reflection flow",
      flowTitle: "Notice, integrate, return",
      noRawJournal: "No raw journal exposed",
      noticeTitle: "Notice",
      noticeDetail: "Recent context and emotional cues become visible.",
      integrateTitle: "Integrate",
      integrateDetail: "Affective conclusions are folded into future posture.",
      returnTitle: "Return",
      returnDetail: "The next response can reuse the lesson without exposing raw notes.",
      webValue: "web",
      readyShort: "ready",
      promptsTitle: "Prompts for the next review",
      whatChangedTitle: "What changed?",
      whatChangedBody: "Name the smallest shift worth carrying forward.",
      whatQuietTitle: "What should stay quiet?",
      whatQuietBody: "Keep private context useful without turning it into noise.",
      whatActionTitle: "What action follows?",
      whatActionBody: "Let the insight become a calmer next step.",
      recentMovement: "Recent movement",
    },
    plans: {
      eyebrow: "Plans",
      title: "Planning room",
      subtitle: "Active goals and tasks shaped into a calm path before anything becomes execution.",
      activeGoals: "Active goals",
      activeTasks: "Active tasks",
      nextStep: "Next best step",
      posture: "Planning posture",
      goalSingularSuffix: "goal",
      goalsSuffix: "goals",
      taskSingularSuffix: "task",
      tasksSuffix: "tasks",
      activeGoalsDetail: "Goals that currently shape the foreground direction.",
      activeTasksDetail: "Tasks visible to planning before execution is considered.",
      readyValue: "Ready",
      alignedValue: "Aligned",
      postureDetail: "Planning stays bounded to guidance, not side effects.",
      planningPath: "Planning path",
      shapeBeforeAction: "Shape before action",
      actionBoundaryPreserved: "Action boundary preserved",
      gatherTitle: "Gather",
      gatherDetail: "Goals, tasks, memory, and current context are read together.",
      sequenceTitle: "Sequence",
      sequenceDetail: "The next move is shaped before it becomes an action.",
      boundTitle: "Bound",
      boundDetail: "Execution remains outside the route until a real action layer owns it.",
      safeValue: "safe",
      planningSuggestions: "Planning suggestions",
      clarifyOutcomeTitle: "Clarify the next outcome",
      clarifyOutcomeEmptyBody: "Create one meaningful goal before expanding the plan.",
      clarifyOutcomeReadyBody: "Choose the goal that deserves the next focused block.",
      convertSequenceTitle: "Convert intent into sequence",
      convertSequenceEmptyBody: "Break the plan into the first visible task.",
      convertSequenceReadyBody: "Group active tasks into the smallest useful order.",
      returnChatTitle: "Return through chat",
      returnChatBody: "Use the conversation to refine the plan before acting.",
      planningContext: "Planning context",
      directionTitle: "Direction",
      directionBody: "Current goals show where attention should land next.",
      cadenceTitle: "Cadence",
      cadenceBody: "Tasks stay visible before anything becomes execution.",
      boundaryTitle: "Boundary",
      boundaryBody: "Plans remain guidance until the action layer owns a real side effect.",
    },
    goals: {
      eyebrow: "Goals",
      title: "Goal horizon",
      subtitle: "See what is in motion, what has momentum, and where attention should land next.",
      active: "Active goals",
      progress: "Progress posture",
      focus: "Focus candidate",
      momentum: "Momentum",
      goalSingularSuffix: "goal",
      goalsSuffix: "goals",
      activeDetail: "Current directions held in the foreground.",
      openValue: "Open",
      movingValue: "Moving",
      progressDetail: "Progress is visible without forcing execution.",
      focusFallback: "Choose a meaningful first goal.",
      goalHorizon: "Goal horizon",
      whatIsInMotion: "What is in motion",
      directionOnly: "Direction only",
      dailyRhythmTitle: "Build a stronger daily rhythm",
      channelContinuityTitle: "Improve continuity across channels",
      reusableInsightsTitle: "Capture reusable insights",
      embodiedPersonalityTitle: "Shape a more embodied personality",
      strongestCandidateDetail: "Strongest candidate for the next focused block.",
      continuitySurfacesDetail: "Supports continuity across surfaces.",
      reusableLearningDetail: "Turns reflection into reusable learning.",
      embodiedDirectionDetail: "Keeps the embodied product direction alive.",
      goalSignals: "Goal signals",
      directionTitle: "Direction",
      directionEmptyBody: "No active goals yet; the horizon stays ready for a first anchor.",
      directionReadySingularBody: "is shaping the current direction.",
      directionReadyPluralBody: "are shaping the current direction.",
      momentumTitle: "Momentum",
      momentumBody: "The strongest visible goal has enough progress to deserve the next review.",
      focusBoundaryTitle: "Focus boundary",
      focusBoundaryBody: "Goals stay as direction here; planning and action remain separate surfaces.",
      relatedGuidance: "Related guidance",
      nextFocusTitle: "Next focus",
      nextFocusBody: "Use the strongest goal as the next focused block.",
      planningBridgeTitle: "Planning bridge",
      planningBridgeBody: "Move into planning when the goal needs sequence instead of more interpretation.",
      reflectionBridgeTitle: "Reflection bridge",
      reflectionBridgeBody: "Return to reflection when the direction needs a clearer reason.",
    },
    insights: {
      eyebrow: "Insights",
      title: "Signal studio",
      subtitle: "Patterns, affective signals, and guidance gathered into one calm sensemaking surface.",
      patterns: "Reusable patterns",
      signals: "Affective signals",
      guidance: "Guidance threads",
      clarity: "Clarity index",
      patternsDetail: "Reusable meaning extracted from past context.",
      signalsDetail: "Tone, emotion, and friction available for expression.",
      guidanceDetail: "Curated prompts ready to shape the next move.",
      patternSingularSuffix: "pattern",
      patternsSuffix: "patterns",
      signalSingularSuffix: "signal",
      signalsSuffix: "signals",
      goalSingularSuffix: "goal",
      goalsSuffix: "goals",
      readyValue: "Ready",
      insightMap: "Insight map",
      insightMapTitle: "What the system can already read",
      readOnly: "Read only",
      semanticPatternTitle: "Semantic pattern",
      semanticPatternDetail: "Reusable knowledge gives the conversation a stronger spine.",
      affectiveTextureTitle: "Affective texture",
      affectiveTextureDetail: "Emotional context stays visible before tone is chosen.",
      planningRelevanceTitle: "Planning relevance",
      planningRelevanceDetail: "Goal and task context helps separate noise from useful guidance.",
      reflectionReturnTitle: "Reflection return",
      reflectionReturnDetail: "Insights are useful when they can return to chat, memory, or action.",
      sensemakingNotes: "Sensemaking notes",
      signalDensityTitle: "Signal density",
      signalDensityReadyBody: "AION already has reusable context to make the next answer less generic.",
      signalDensityEmptyBody: "No semantic patterns are visible yet; the surface stays ready for first evidence.",
      interpretationBoundaryTitle: "Interpretation boundary",
      interpretationBoundaryBody: "Insights are displayed as read-only sensemaking; action remains in planning and tools.",
      nextUsefulMoveTitle: "Next useful move",
      nextUsefulMoveFallback: "Use chat to create the first meaningful signal.",
      guidanceCandidates: "Guidance candidates",
      deepWorkTitle: "Deep work window",
      deepWorkNoGoalBody: "Shape one meaningful goal to give the day a stronger center.",
      deepWorkActiveBody: "Your active goals are ready for a focused work block.",
      momentumTitle: "Build momentum",
      momentumNoThreadBody: "The next message can become the anchor for a clearer plan.",
      momentumThreadPrefix: "Stay close to your latest thread:",
      reflectTitle: "Reflect and integrate",
      reflectNoSignalBody: "A short reflection can start your first layer of deeper learning.",
      reflectReadyBody: "Recent reflections are ready to inform the next response.",
      connectionTitle: "Connection opportunity",
      connectionNoChannelBody: "Link another surface when you want continuity outside the web shell.",
      connectionLivePrefix: "Continuity is already alive across:",
    },
    automations: {
      eyebrow: "Automations",
      title: "Automation control",
      subtitle: "Proactive preference, scheduler posture, and attention queue without hidden side effects.",
      proactive: "Proactive mode",
      queue: "Attention queue",
      scheduler: "Scheduler",
      boundary: "Action boundary",
      proactiveOnDetail: "Account preference allows occasional follow-ups.",
      proactiveOffDetail: "Follow-ups stay quiet until you enable the preference.",
      pendingValue: "pending",
      queueDetail: "Pending attention items from the current health snapshot.",
      checkingValue: "Checking",
      unknownValue: "Unknown",
      readyValue: "Ready",
      schedulerDetail: "Scheduler posture is read from backend health.",
      automationFlow: "Automation flow",
      allowedToMove: "What is allowed to move",
      observed: "Observed",
      preferenceGateTitle: "Preference gate",
      preferenceOnDetail: "Proactive follow-ups are allowed by the account settings.",
      preferenceOffDetail: "The account has proactive follow-ups disabled.",
      attentionQueueTitle: "Attention queue",
      attentionQueueDetail: "Queued attention is visible before any future delivery behavior.",
      schedulerTickTitle: "Scheduler tick",
      schedulerTickPresentDetail: "Scheduler details are present in the health snapshot.",
      schedulerTickQuietDetail: "No scheduler detail is exposed by the current health payload.",
      presentValue: "Present",
      quietValue: "Quiet",
      actionBoundaryTitle: "Action boundary",
      actionBoundaryDetail: "This route observes posture only; side effects remain outside the view layer.",
      readOnlyValue: "Read only",
      guardrails: "Guardrails",
      noHiddenExecutionTitle: "No hidden execution",
      noHiddenExecutionBody: "Opening this route does not create reminders, send messages, or mutate proactive settings.",
      settingsSwitchTitle: "Settings remains the switch",
      settingsSwitchBody: "The actual proactive opt-in control stays in Settings, preserving one source of truth.",
      healthBackedTitle: "Health-backed posture",
      healthUnavailableBody: "Health is unavailable, so scheduler details are shown conservatively.",
      healthBackedBody: "Scheduler and queue posture comes from the existing health endpoint.",
      healthDetails: "Health details",
      pending: "Pending",
      claimed: "Claimed",
      answered: "Answered",
      attentionItems: "attention items",
      claimedItems: "claimed items",
      answeredItems: "answered items",
    },
    integrations: {
      eyebrow: "Integrations",
      title: "Connection map",
      subtitle: "Provider readiness, link needs, and external channels gathered into one calm surface.",
      ready: "Ready providers",
      linked: "Linked tools",
      attention: "Needs attention",
      boundary: "Integration boundary",
      readyShort: "ready",
      readyDetail: "Providers reporting ready through the existing tools overview.",
      linkedDetail: "Enabled tools currently available to the shell.",
      attentionDetail: "Providers blocked or waiting for a link step.",
      providerMap: "Provider map",
      providerMapTitle: "External surfaces at the edge",
      overview: "Overview",
      noProvidersTitle: "No providers visible",
      noProvidersDetail: "Tools overview has not exposed provider rows yet.",
      connectionRules: "Connection rules",
      toolsOwnTogglesTitle: "Tools own toggles",
      toolsOwnTogglesBody: "This route shows integration posture; detailed enablement remains in the Tools surface.",
      linksStayExplicitTitle: "Links stay explicit",
      linksStayExplicitBody: "Any provider that requires linking still needs the approved link flow before use.",
      noSilentProviderAccessTitle: "No silent provider access",
      noSilentProviderAccessBody: "Opening the route reads overview data only and does not call external providers.",
      readinessDetails: "Readiness details",
      configured: "Configured",
      toolsKnown: "tools known",
      linkRequired: "Link required",
      waitingForLinkFlow: "waiting for link flow",
      blocked: "Blocked",
      providerChecksBlocked: "provider checks blocked",
      readyValue: "Ready",
      linkValue: "Link",
      blockedValue: "Blocked",
      quietValue: "Quiet",
    },
    personality: {
      eyebrow: "Personality",
      title: "Personality overview",
      subtitle: "High-level insight first, with extra detail available only when you want it.",
      filter: "Filter sections",
      loading: "Loading personality overview.",
      empty: "No matching overview sections for this filter.",
    },
  },
  pl: {
    routes: { "/login": "Logowanie", "/dashboard": "Dashboard", "/chat": "Czat", "/memory": "Pamięć", "/reflections": "Refleksje", "/plans": "Plany", "/goals": "Cele", "/insights": "Wnioski", "/automations": "Automatyzacje", "/integrations": "Integracje", "/settings": "Ustawienia", "/tools": "Narzędzia", "/personality": "Osobowość" },
    routeDescriptions: {
      "/login": "Zaloguj się do powłoki produktu.",
      "/dashboard": "Flagowy przegląd celów, sygnałów, przepływu i kolejnych działań.",
      "/chat": "Jeden wspólny wątek rozmowy z ostatnimi wiadomościami i świeżymi odpowiedziami osobowości.",
      "/memory": "Spokojna mapa wzorców, preferencji i sygnałów ciągłości.",
      "/reflections": "Wolniejsze uczenie, integracja i wnioski, które kształtują kolejne odpowiedzi.",
      "/plans": "Postawa planowania, aktywna praca i kolejny spokojny krok bez uruchamiania wykonania.",
      "/goals": "Spokojny widok aktywnego kierunku, postępu i tego, co zasługuje na uwagę.",
      "/insights": "Warstwa sensu dla wzorców, sygnałów i wskazówek już obecnych w AION.",
      "/automations": "Widoczna sterownia proaktywności, kolejki uwagi i postawy schedulera.",
      "/integrations": "Spokojna mapa dostawców, połączeń i gotowości integracji.",
      "/settings": "Profil, język interfejsu i proaktywność w jednym prostym miejscu.",
      "/tools": "Zobacz, co jest gotowe, co wymaga uwagi i z czego możesz skorzystać dalej.",
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
      utcOffset: "Offset UTC",
      conversationLanguage: "Język rozmowy",
      proactive: "Proaktywność",
      on: "Wł.",
      off: "Wył.",
      save: "Zapisz ustawienia",
      saving: "Zapisywanie...",
      loading: "Ładowanie...",
      interfaceOnly: "Tylko interfejs",
      details: "Szczegóły",
      inspectPayload: "Pokaż szczegóły",
      noData: "Brak danych.",
      user: "Ty",
      assistant: "Obecność",
      sourceOfTruth: "Bieżąca wartość",
      notSet: "brak",
      system: "System",
      stateLoadingTitle: "Przygotowuję widok",
      stateEmptyTitle: "Na razie nic tu nie ma",
      stateSuccessTitle: "Gotowe",
      stateErrorTitle: "Coś wymaga uwagi",
      stateDetailLabel: "Szczegóły",
      view: "Zobacz",
      unknownTime: "Nieznany czas",
      recentActivity: [
        { title: "Zaktualizowano plan projektu", when: "2 godz. temu" },
        { title: "Doprecyzowano blok głębokiej pracy", when: "3 godz. temu" },
        { title: "Ukończono cykl refleksji", when: "5 godz. temu" },
        { title: "Zapisano nową pamięć", when: "Wczoraj" },
        { title: "Zapisano wyuczoną preferencję", when: "Wczoraj" },
      ],
    },
    auth: {
      badge: "Aviary",
      heroTitle: "Spokojne miejsce, żeby wrócić do rozmowy.",
      heroBody:
        "Zaloguj się, aby wrócić do czatu, ustawić preferencje i mieć Aviary blisko bez przedzierania się przez techniczny ekran startowy.",
      sessionEntry: "Wejście do sesji",
      trustTitle: "Czego możesz się spodziewać",
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
      subtitle: "Najpierw widzisz wspólną rozmowę, niezależnie od tego, czy ostatnie wiadomości przyszły z aplikacji czy z podpiętego kanału.",
      emptyThread:
        "Zacznij rozmowę tutaj. Nowe wiadomości pojawią się w tym samym wspólnym wątku zaraz po wymianie.",
      placeholder: "Napisz wiadomość...",
      composerHint: "Odpowiedzi wracają do tego samego transcriptu, żeby cały dialog został w jednym miejscu.",
      send: "Wyślij wiadomość",
      sending: "Wysyłanie...",
      delivered: "Dostarczono",
      failed: "Nie wysłano",
      thread: "Wątek",
      latestMessages: "Ostatnie wiadomości",
      noHistory: "Nie ma jeszcze wspólnych wiadomości.",
      transcriptCount: "Elementy transcriptu",
      activeChannel: "Ostatnie kanały",
      latestLanguage: "Język live",
      messageDetails: "Szczegóły wiadomości",
      channel: "Kanał",
      pending: "Wysyłanie",
    },
    settings: {
      eyebrow: "Ustawienia",
      title: "Dopasuj powłokę",
      subtitle: "Krótki, mobile-first widok ustawień skupiony na profilu, języku interfejsu i proaktywnych follow-upach.",
      profileTitle: "Profil",
      profileBody: "Wybierz, jak aplikacja ma Cię opisywać.",
      uiLanguageTitle: "Język interfejsu",
      uiLanguageBody: "Zmienia etykiety, copy i nawigację tylko w powłoce aplikacji.",
      uiLanguageHelp: "To nie steruje językiem używanym wewnątrz samej rozmowy.",
      utcOffsetTitle: "Lokalny offset czasu",
      utcOffsetBody: "Ustawia jawny offset UTC, którego runtime używa przy wnioskowaniu o bieżącej dacie i godzinie dla Twojego profilu.",
      utcOffsetHelp: "Wybierz offset zgodny z Twoim aktualnym miejscem. Na przykład Polska lub Szwajcaria zimą to zwykle UTC+01:00.",
      conversationTitle: "Język rozmowy",
      conversationBody: "Język rozmowy dopasowuje się live na podstawie kontekstu, historii i bieżącej wymiany.",
      proactiveTitle: "Proaktywne follow-upy",
      proactiveBody: "Pozwól Aviary wysyłać okazjonalne follow-upy, gdy pozwalają na to ustawienia Twojego konta.",
      saveHint: "Zapisz zmiany, gdy będziesz gotowy.",
      conversationRuntimeOwned: "Adaptacyjne i oparte na kontekście",
      savedState: "Gotowe do zapisania",
      resetTitle: "Reset danych runtime",
      resetBody:
        "Wyczyść wyuczoną ciągłość runtime, pamięć, stan planowania i kolejki dla tego konta bez usuwania konta ani ponownej konfiguracji podpiętych narzędzi.",
      resetImpact:
        "Profil, ustawienia UI, zgoda na proaktywność i podpięte integracje zostają, a wszystkie aktywne sesje, także ta bieżąca, są unieważniane.",
      resetConfirmationLabel: "Tekst potwierdzenia",
      resetConfirmationHint: "Wpisz dokładnie poniższą frazę, aby odblokować reset.",
      resetConfirmationPlaceholder: "RESET MY DATA",
      resetAction: "Zresetuj dane runtime",
      resetting: "Resetowanie...",
      resetSuccess: "Dane runtime zostały zresetowane. Zaloguj się ponownie i zacznij od nowa.",
    },
    tools: {
      eyebrow: "Narzędzia",
      title: "Gotowe narzędzia i kanały",
      subtitle: "Zobacz, co działa już teraz, co wymaga działania, a co nadal jest zablokowane.",
      groupCount: "Grupy narzędzi",
      integral: "Zawsze aktywne",
      ready: "Gotowe teraz",
      linkRequired: "Wymaga podpięcia",
      loading: "Ładowanie przeglądu narzędzi.",
      empty: "Tutaj pojawi się przegląd Twoich narzędzi.",
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
      summaryGroupNote: "Czytelne grupy narzędzi, które możesz tutaj przeglądać",
      summaryIntegralNote: "Możliwości dostępne jako stała część produktu",
      summaryReadyNote: "Narzędzia gotowe do użycia dzisiaj",
      summaryLinkRequiredNote: "Kanały czekające na szybki krok podpięcia",
      directoryTitle: "Katalog narzędzi",
      itemSingularSuffix: "element",
      itemsSuffix: "elementów",
      workspaceSnapshot: "migawka przestrzeni",
      statusAlwaysOn: "Zawsze aktywne",
      statusReadyToUse: "Gotowe do użycia",
      statusLinkRequired: "Wymaga podpięcia",
      statusPlanned: "Zaplanowane",
      statusNeedsReview: "Wymaga przeglądu",
      providerReadyValue: "gotowy",
      providerConfiguredValue: "skonfigurowany",
      providerNotConfiguredValue: "nieskonfigurowany",
      telegramInstructionBody:
        "Wygeneruj krótki kod, a potem wyślij go do skonfigurowanego bota Telegram Aviary z czatu, który chcesz podpiąć do tej tożsamości.",
      expiresInAbout: "Wygasa za około",
      seconds: "sekund",
      saveSuccess: "Wybór narzędzi został zapisany.",
      saveError: "Nie udało się zapisać preferencji narzędzia.",
      telegramLinkReady: "Kod podpięcia Telegrama jest gotowy.",
      telegramStartError: "Nie udało się rozpocząć podpinania Telegrama.",
      readyChipSuffix: "gotowe",
      needsLinkingChipSuffix: "wymaga podpięcia",
      alwaysOnChipSuffix: "zawsze aktywne",
      linkStateLinkedValue: "Podpięte",
      linkStateNotLinkedValue: "Niepodpięte",
      linkStateRequiredValue: "Wymaga podpięcia",
      linkStateUnknownValue: "Nieznane",
    },
    personality: {
      eyebrow: "Osobowość",
      title: "Przegląd osobowości",
      subtitle: "Najpierw najważniejsze informacje, a dodatkowe szczegóły tylko wtedy, gdy ich potrzebujesz.",
      filter: "Filtruj sekcje",
      loading: "Ładowanie przeglądu osobowości.",
      empty: "Brak sekcji pasujących do filtra.",
    },
    memory: {
      eyebrow: "Pamięć",
      title: "Biblioteka ciągłości",
      subtitle: "Wzorce, preferencje i aktualny kontekst bez zamiany pamięci w surową bazę danych.",
      semantic: "Wzorce wielokrotnego użytku",
      affective: "Wnioski afektywne",
      preferences: "Nauczone sygnały",
      recent: "Ostatnie sygnały pamięci",
      continuity: "Ciągłość",
      patternSingularSuffix: "wzorzec",
      patternsSuffix: "wzorce",
      patternsZeroSuffix: "wzorców",
      insightSingularSuffix: "wniosek",
      insightsSuffix: "wnioski",
      insightsZeroSuffix: "wniosków",
      cueSingularSuffix: "sygnał",
      cuesSuffix: "sygnały",
      cuesZeroSuffix: "sygnałów",
      semanticDetail: "Wzorce gotowe do ponownego użycia w przyszłych odpowiedziach.",
      affectiveDetail: "Wnioski emocjonalne, które mogą kształtować ton i moment odpowiedzi.",
      preferencesDetail: "Stabilne sygnały podpięte do preferowanego sposobu pracy.",
      memoryMap: "Mapa pamięci",
      memoryMapTitle: "Co można użyć ponownie",
      noRawRecords: "Bez ujawniania surowych rekordów",
      semanticMemoryTitle: "Pamięć semantyczna",
      semanticMemoryDetail: "Pojęcia i podsumowania wielorazowe zostają dostępne przed następną odpowiedzią.",
      affectiveMemoryTitle: "Pamięć afektywna",
      affectiveMemoryDetail: "Ton, tarcie i kontekst emocjonalny mogą informować przyszłą ekspresję.",
      preferencesMemoryTitle: "Preferencje",
      preferencesMemoryDetail: "Nauczone sygnały utrzymują osobisty charakter powłoki bez ujawniania surowych rekordów.",
      continuityNearConversation: "Ciągłość blisko rozmowy",
      conversationContinuityTitle: "Ciągłość rozmowy",
      memorySourceEmptyBody: "Aplikacja webowa jest gotowa stać się aktywnym źródłem pamięci.",
      recentChannelsPrefix: "Ostatnie kanały:",
      currentContext: "Bieżący kontekst",
      reflectionBridgeTitle: "Most refleksji",
      reflectionBridgeEmptyBody: "Krótka refleksja może rozpocząć głębsze formowanie pamięci.",
      reflectionBridgeReadyBody: "Ostatnie refleksje są już dostępne, aby kształtować następną odpowiedź.",
      slowLearning: "Wolniejsze uczenie",
      preferencePostureTitle: "Postawa preferencji",
      preferencePostureEmptyBody: "Nie ma jeszcze nauczonych sygnałów; widok pozostaje gotowy bez udawania.",
      preferencePostureReadyBody: "Nauczone sygnały są obecne i widoczne bez ujawniania szczegółów wewnętrznych.",
      personalization: "Personalizacja",
      recentMovement: "Ostatni ruch",
    },
    reflections: {
      eyebrow: "Refleksje",
      title: "Komora refleksji",
      subtitle: "Cichsza warstwa wniosków, integracji i wolniejszego uczenia, które wzmacnia ciągłość.",
      integrated: "Zintegrowane wnioski",
      pending: "Gotowe do integracji",
      cadence: "Rytm uczenia",
      recent: "Ostatnie refleksje",
      slowLearning: "Wolniejsze uczenie",
      insightSingularSuffix: "wniosek",
      insightsSuffix: "wnioski",
      insightsZeroSuffix: "wniosków",
      threadSingularSuffix: "wątek",
      threadsSuffix: "wątki",
      readyValue: "Gotowe",
      activeValue: "Aktywne",
      integratedDetail: "Wnioski gotowe już wpływać na przyszłą ekspresję.",
      pendingDetail: "Otwarte wątki, które mogą stać się jaśniejsze po krótkim przeglądzie.",
      cadenceDetail: "Wolniejsza warstwa uczenia pozostaje dostępna bez zagęszczania czatu.",
      reflectionFlow: "Przepływ refleksji",
      flowTitle: "Zauważ, zintegruj, wróć",
      noRawJournal: "Bez ujawniania surowego dziennika",
      noticeTitle: "Zauważ",
      noticeDetail: "Bieżący kontekst i sygnały emocjonalne stają się widoczne.",
      integrateTitle: "Zintegruj",
      integrateDetail: "Wnioski afektywne są składane w przyszłą postawę.",
      returnTitle: "Wróć",
      returnDetail: "Następna odpowiedź może użyć lekcji bez ujawniania surowych notatek.",
      webValue: "web",
      readyShort: "gotowe",
      promptsTitle: "Podpowiedzi do następnego przeglądu",
      whatChangedTitle: "Co się zmieniło?",
      whatChangedBody: "Nazwij najmniejszą zmianę wartą przeniesienia dalej.",
      whatQuietTitle: "Co powinno zostać ciche?",
      whatQuietBody: "Zachowaj prywatny kontekst jako użyteczny, bez zamieniania go w szum.",
      whatActionTitle: "Jakie działanie wynika?",
      whatActionBody: "Niech wniosek stanie się spokojniejszym następnym krokiem.",
      recentMovement: "Ostatni ruch",
    },
    plans: {
      eyebrow: "Plany",
      title: "Pokój planowania",
      subtitle: "Aktywne cele i zadania ułożone w spokojną ścieżkę zanim cokolwiek stanie się wykonaniem.",
      activeGoals: "Aktywne cele",
      activeTasks: "Aktywne zadania",
      nextStep: "Najlepszy kolejny krok",
      posture: "Postawa planowania",
      goalSingularSuffix: "cel",
      goalsSuffix: "cele",
      taskSingularSuffix: "zadanie",
      tasksSuffix: "zadania",
      activeGoalsDetail: "Cele, które obecnie kształtują kierunek na pierwszym planie.",
      activeTasksDetail: "Zadania widoczne dla planowania, zanim rozważone zostanie wykonanie.",
      readyValue: "Gotowe",
      alignedValue: "Wyrównane",
      postureDetail: "Planowanie pozostaje ograniczone do wskazówek, bez skutków ubocznych.",
      planningPath: "Ścieżka planowania",
      shapeBeforeAction: "Najpierw kształt, potem działanie",
      actionBoundaryPreserved: "Granica działania zachowana",
      gatherTitle: "Zbierz",
      gatherDetail: "Cele, zadania, pamięć i bieżący kontekst są czytane razem.",
      sequenceTitle: "Ułóż sekwencję",
      sequenceDetail: "Następny ruch jest kształtowany, zanim stanie się działaniem.",
      boundTitle: "Ogranicz",
      boundDetail: "Wykonanie pozostaje poza widokiem, dopóki nie przejmie go prawdziwa warstwa działania.",
      safeValue: "bezpiecznie",
      planningSuggestions: "Sugestie planowania",
      clarifyOutcomeTitle: "Doprecyzuj następny rezultat",
      clarifyOutcomeEmptyBody: "Utwórz jeden znaczący cel, zanim rozbudujesz plan.",
      clarifyOutcomeReadyBody: "Wybierz cel, który zasługuje na następny blok skupienia.",
      convertSequenceTitle: "Zamień intencję w sekwencję",
      convertSequenceEmptyBody: "Rozbij plan na pierwsze widoczne zadanie.",
      convertSequenceReadyBody: "Pogrupuj aktywne zadania w najmniejszy użyteczny porządek.",
      returnChatTitle: "Wróć przez czat",
      returnChatBody: "Użyj rozmowy, aby dopracować plan przed działaniem.",
      planningContext: "Kontekst planowania",
      directionTitle: "Kierunek",
      directionBody: "Bieżące cele pokazują, gdzie powinna trafić uwaga.",
      cadenceTitle: "Rytm",
      cadenceBody: "Zadania pozostają widoczne, zanim cokolwiek stanie się wykonaniem.",
      boundaryTitle: "Granica",
      boundaryBody: "Plany pozostają wskazówkami, dopóki warstwa działania nie przejmie realnego skutku ubocznego.",
    },
    goals: {
      eyebrow: "Cele",
      title: "Horyzont celów",
      subtitle: "Zobacz, co jest w ruchu, co ma impet i gdzie powinna trafić uwaga.",
      active: "Aktywne cele",
      progress: "Postawa postępu",
      focus: "Kandydat do skupienia",
      momentum: "Impet",
      goalSingularSuffix: "cel",
      goalsSuffix: "cele",
      activeDetail: "Bieżące kierunki trzymane na pierwszym planie.",
      openValue: "Otwarte",
      movingValue: "W ruchu",
      progressDetail: "Postęp jest widoczny bez wymuszania wykonania.",
      focusFallback: "Wybierz pierwszy znaczący cel.",
      goalHorizon: "Horyzont celów",
      whatIsInMotion: "Co jest w ruchu",
      directionOnly: "Tylko kierunek",
      dailyRhythmTitle: "Zbuduj mocniejszy rytm dnia",
      channelContinuityTitle: "Wzmocnij ciągłość między kanałami",
      reusableInsightsTitle: "Zapisz wnioski wielorazowe",
      embodiedPersonalityTitle: "Ukształtuj bardziej ucieleśnioną osobowość",
      strongestCandidateDetail: "Najmocniejszy kandydat na następny blok skupienia.",
      continuitySurfacesDetail: "Wspiera ciągłość między powierzchniami.",
      reusableLearningDetail: "Zamienia refleksję w uczenie wielorazowe.",
      embodiedDirectionDetail: "Utrzymuje żywy kierunek ucieleśnionego produktu.",
      goalSignals: "Sygnały celów",
      directionTitle: "Kierunek",
      directionEmptyBody: "Nie ma jeszcze aktywnych celów; horyzont czeka na pierwszą kotwicę.",
      directionReadySingularBody: "kształtuje bieżący kierunek.",
      directionReadyPluralBody: "kształtują bieżący kierunek.",
      momentumTitle: "Impet",
      momentumBody: "Najmocniejszy widoczny cel ma dość postępu, by zasłużyć na kolejny przegląd.",
      focusBoundaryTitle: "Granica skupienia",
      focusBoundaryBody: "Cele pozostają tu kierunkiem; planowanie i działanie zostają osobnymi powierzchniami.",
      relatedGuidance: "Powiązane wskazówki",
      nextFocusTitle: "Następne skupienie",
      nextFocusBody: "Użyj najmocniejszego celu jako następnego bloku skupienia.",
      planningBridgeTitle: "Most planowania",
      planningBridgeBody: "Przejdź do planowania, gdy cel potrzebuje sekwencji zamiast dalszej interpretacji.",
      reflectionBridgeTitle: "Most refleksji",
      reflectionBridgeBody: "Wróć do refleksji, gdy kierunek potrzebuje wyraźniejszego powodu.",
    },
    insights: {
      eyebrow: "Wnioski",
      title: "Studio sygnałów",
      subtitle: "Wzorce, sygnały afektywne i wskazówki zebrane w spokojną powierzchnię sensu.",
      patterns: "Wzorce wielorazowe",
      signals: "Sygnały afektywne",
      guidance: "Wątki wskazówek",
      clarity: "Indeks klarowności",
      patternsDetail: "Znaczenie wielorazowe wydobyte z wcześniejszego kontekstu.",
      signalsDetail: "Ton, emocje i tarcie dostępne dla sposobu wypowiedzi.",
      guidanceDetail: "Wybrane podpowiedzi gotowe kształtować następny ruch.",
      patternSingularSuffix: "wzorzec",
      patternsSuffix: "wzorce",
      signalSingularSuffix: "sygnał",
      signalsSuffix: "sygnały",
      goalSingularSuffix: "cel",
      goalsSuffix: "cele",
      readyValue: "Gotowe",
      insightMap: "Mapa wniosków",
      insightMapTitle: "Co system potrafi już odczytać",
      readOnly: "Tylko odczyt",
      semanticPatternTitle: "Wzorzec semantyczny",
      semanticPatternDetail: "Wiedza wielorazowa daje rozmowie mocniejszy kręgosłup.",
      affectiveTextureTitle: "Tekstura afektywna",
      affectiveTextureDetail: "Kontekst emocjonalny pozostaje widoczny zanim zostanie dobrany ton.",
      planningRelevanceTitle: "Trafność planowania",
      planningRelevanceDetail: "Kontekst celów i zadań pomaga oddzielić szum od użytecznych wskazówek.",
      reflectionReturnTitle: "Powrót refleksji",
      reflectionReturnDetail: "Wnioski są użyteczne, gdy mogą wrócić do czatu, pamięci albo działania.",
      sensemakingNotes: "Notatki sensotwórcze",
      signalDensityTitle: "Gęstość sygnałów",
      signalDensityReadyBody: "AION ma już kontekst wielorazowy, który może uczynić następną odpowiedź mniej generyczną.",
      signalDensityEmptyBody: "Nie widać jeszcze wzorców semantycznych; powierzchnia czeka na pierwsze dowody.",
      interpretationBoundaryTitle: "Granica interpretacji",
      interpretationBoundaryBody: "Wnioski są pokazane jako odczyt sensu; działanie pozostaje w planowaniu i narzędziach.",
      nextUsefulMoveTitle: "Następny użyteczny ruch",
      nextUsefulMoveFallback: "Użyj czatu, aby stworzyć pierwszy znaczący sygnał.",
      guidanceCandidates: "Kandydaci wskazówek",
      deepWorkTitle: "Okno głębokiej pracy",
      deepWorkNoGoalBody: "Ukształtuj jeden znaczący cel, aby dzień miał mocniejsze centrum.",
      deepWorkActiveBody: "Aktywne cele są gotowe na skupiony blok pracy.",
      momentumTitle: "Buduj impet",
      momentumNoThreadBody: "Następna wiadomość może stać się kotwicą klarowniejszego planu.",
      momentumThreadPrefix: "Zostań blisko ostatniego wątku:",
      reflectTitle: "Reflektuj i integruj",
      reflectNoSignalBody: "Krótka refleksja może rozpocząć pierwszą warstwę głębszego uczenia.",
      reflectReadyBody: "Ostatnie refleksje są gotowe wesprzeć następną odpowiedź.",
      connectionTitle: "Szansa połączenia",
      connectionNoChannelBody: "Podepnij kolejną powierzchnię, gdy chcesz ciągłości poza webową powłoką.",
      connectionLivePrefix: "Ciągłość już działa przez:",
    },
    automations: {
      eyebrow: "Automatyzacje",
      title: "Kontrola automatyzacji",
      subtitle: "Proaktywność, scheduler i kolejka uwagi bez ukrytych skutków ubocznych.",
      proactive: "Tryb proaktywny",
      queue: "Kolejka uwagi",
      scheduler: "Scheduler",
      boundary: "Granica działania",
      proactiveOnDetail: "Preferencja konta pozwala na okazjonalne follow-upy.",
      proactiveOffDetail: "Follow-upy pozostają wyciszone, dopóki nie włączysz preferencji.",
      pendingValue: "oczekuje",
      queueDetail: "Oczekujące elementy uwagi z bieżącego stanu zdrowia.",
      checkingValue: "Sprawdzam",
      unknownValue: "Nieznane",
      readyValue: "Gotowe",
      schedulerDetail: "Postawa schedulera jest czytana z backendowego health.",
      automationFlow: "Przepływ automatyzacji",
      allowedToMove: "Co może się poruszyć",
      observed: "Obserwowane",
      preferenceGateTitle: "Brama preferencji",
      preferenceOnDetail: "Proaktywne follow-upy są dozwolone przez ustawienia konta.",
      preferenceOffDetail: "Konto ma wyłączone proaktywne follow-upy.",
      attentionQueueTitle: "Kolejka uwagi",
      attentionQueueDetail: "Kolejka uwagi jest widoczna przed przyszłym zachowaniem dostarczania.",
      schedulerTickTitle: "Tik schedulera",
      schedulerTickPresentDetail: "Szczegóły schedulera są obecne w stanie zdrowia.",
      schedulerTickQuietDetail: "Bieżący health payload nie udostępnia szczegółów schedulera.",
      presentValue: "Obecne",
      quietValue: "Cicho",
      actionBoundaryTitle: "Granica działania",
      actionBoundaryDetail: "Ten widok tylko obserwuje postawę; skutki uboczne pozostają poza warstwą widoku.",
      readOnlyValue: "Tylko odczyt",
      guardrails: "Ograniczenia",
      noHiddenExecutionTitle: "Bez ukrytego wykonania",
      noHiddenExecutionBody: "Otwarcie tego widoku nie tworzy przypomnień, nie wysyła wiadomości i nie zmienia ustawień proaktywności.",
      settingsSwitchTitle: "Ustawienia pozostają przełącznikiem",
      settingsSwitchBody: "Rzeczywisty opt-in proaktywności zostaje w Ustawieniach, zachowując jedno źródło prawdy.",
      healthBackedTitle: "Postawa oparta na health",
      healthUnavailableBody: "Health jest niedostępny, więc szczegóły schedulera są pokazane zachowawczo.",
      healthBackedBody: "Postawa schedulera i kolejki pochodzi z istniejącego endpointu health.",
      healthDetails: "Szczegóły health",
      pending: "Oczekujące",
      claimed: "Przejęte",
      answered: "Obsłużone",
      attentionItems: "elementów uwagi",
      claimedItems: "przejętych elementów",
      answeredItems: "obsłużonych elementów",
    },
    integrations: {
      eyebrow: "Integracje",
      title: "Mapa połączeń",
      subtitle: "Gotowość dostawców, potrzeby linkowania i kanały zewnętrzne w jednym spokojnym widoku.",
      ready: "Gotowi dostawcy",
      linked: "Połączone narzędzia",
      attention: "Wymaga uwagi",
      boundary: "Granica integracji",
      readyShort: "gotowe",
      readyDetail: "Dostawcy zgłaszający gotowość w istniejącym przeglądzie narzędzi.",
      linkedDetail: "Włączone narzędzia dostępne obecnie w powłoce.",
      attentionDetail: "Dostawcy zablokowani albo czekający na linkowanie.",
      providerMap: "Mapa dostawców",
      providerMapTitle: "Zewnętrzne powierzchnie na krawędzi",
      overview: "Przegląd",
      noProvidersTitle: "Brak widocznych dostawców",
      noProvidersDetail: "Przegląd narzędzi nie udostępnił jeszcze wierszy dostawców.",
      connectionRules: "Zasady połączeń",
      toolsOwnTogglesTitle: "Przełączniki należą do Narzędzi",
      toolsOwnTogglesBody: "Ten widok pokazuje postawę integracji; szczegółowe włączanie pozostaje w widoku Narzędzia.",
      linksStayExplicitTitle: "Linkowanie pozostaje jawne",
      linksStayExplicitBody: "Każdy dostawca wymagający linkowania nadal potrzebuje zatwierdzonego przepływu połączenia.",
      noSilentProviderAccessTitle: "Bez cichego dostępu do dostawców",
      noSilentProviderAccessBody: "Otwarcie widoku tylko czyta dane przeglądu i nie wywołuje zewnętrznych dostawców.",
      readinessDetails: "Szczegóły gotowości",
      configured: "Skonfigurowane",
      toolsKnown: "znane narzędzia",
      linkRequired: "Wymaga linkowania",
      waitingForLinkFlow: "czeka na linkowanie",
      blocked: "Zablokowane",
      providerChecksBlocked: "zablokowane sprawdzenia dostawcy",
      readyValue: "Gotowe",
      linkValue: "Link",
      blockedValue: "Blokada",
      quietValue: "Cicho",
    },
  },
  de: {
    routes: { "/login": "Login", "/dashboard": "Dashboard", "/chat": "Chat", "/memory": "Memory", "/reflections": "Reflections", "/plans": "Plans", "/goals": "Goals", "/insights": "Insights", "/automations": "Automationen", "/integrations": "Integrationen", "/settings": "Einstellungen", "/tools": "Tools", "/personality": "PersĂ¶nlichkeit" },
    routeDescriptions: {
      "/login": "Melde dich in der ProdukthĂĽlle an.",
      "/dashboard": "Flagship-Ăśberblick ĂĽber Ziele, Signale, Flow und nĂ¤chste Aktionen.",
      "/chat": "Ein gemeinsamer GesprĂ¤chsthread mit den letzten Nachrichten und neuen Antworten der PersĂ¶nlichkeit.",
      "/memory": "Eine ruhige Karte wiederverwendbarer Muster, gelernter Hinweise und KontinuitĂ¤t.",
      "/reflections": "Langsameres Lernen, Integration und Einsichten fĂĽr kĂĽnftige Antworten.",
      "/plans": "Planungshaltung, aktive Arbeit und der nĂ¤chste ruhige Schritt ohne AusfĂĽhrung.",
      "/goals": "Ein ruhiger Blick auf Richtung, Fortschritt und den nĂ¤chsten Fokus.",
      "/insights": "Eine klare Sinnschicht fĂĽr Muster, Signale und vorhandene AION-Hinweise.",
      "/automations": "Ein sichtbarer Kontrollraum fĂĽr ProaktivitĂ¤t, Attention Queue und Scheduler.",
      "/integrations": "Eine ruhige Karte verbundener Anbieter, Linkstatus und Integrationsbereitschaft.",
      "/settings": "Profil, OberflĂ¤chensprache und proaktive PrĂ¤ferenzen an einem klaren Ort.",
      "/tools": "Sieh, was bereit ist, was Aufmerksamkeit braucht und was du als NĂ¤chstes nutzen kannst.",
      "/personality": "Produktorientierter Ăśberblick ĂĽber IdentitĂ¤t, Wissen, Planung und FĂ¤higkeiten.",
    },
    common: {
      workspace: "Workspace",
      currentSurface: "Aktuelle Ansicht",
      account: "Konto",
      signedInAs: "Angemeldet als",
      signOut: "Abmelden",
      build: "build",
      uiLanguage: "UI-Sprache",
      utcOffset: "UTC-Offset",
      conversationLanguage: "GesprĂ¤chssprache",
      proactive: "Proaktiv",
      on: "An",
      off: "Aus",
      save: "Einstellungen speichern",
      saving: "Speichern...",
      loading: "LĂ¤dt...",
      interfaceOnly: "Nur OberflĂ¤che",
      details: "Details",
      inspectPayload: "Details anzeigen",
      noData: "Noch keine Daten.",
      user: "Du",
      assistant: "PrĂ¤senz",
      sourceOfTruth: "Aktueller Wert",
      notSet: "nicht gesetzt",
      system: "System",
      stateLoadingTitle: "Ansicht wird vorbereitet",
      stateEmptyTitle: "Hier ist noch nichts zu sehen",
      stateSuccessTitle: "Erledigt",
      stateErrorTitle: "Etwas braucht Aufmerksamkeit",
      stateDetailLabel: "Details",
      view: "Ansehen",
      unknownTime: "Unbekannte Zeit",
      recentActivity: [
        { title: "Projektplan aktualisiert", when: "vor 2 Std." },
        { title: "Deep-Work-Fenster verfeinert", when: "vor 3 Std." },
        { title: "Reflexionszyklus abgeschlossen", when: "vor 5 Std." },
        { title: "Neue Erinnerung erfasst", when: "Gestern" },
        { title: "Gelernte Präferenz erfasst", when: "Gestern" },
      ],
    },
    auth: {
      badge: "Aviary",
      heroTitle: "Ein ruhiger Ort, um das GesprĂ¤ch fortzusetzen.",
      heroBody:
        "Melde dich an, um zum Chat zurĂĽckzukehren, Einstellungen anzupassen und Aviary ohne technischen Ballast direkt griffbereit zu haben.",
      sessionEntry: "Sitzung",
      trustTitle: "Was dich erwartet",
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
      eyebrow: "GesprĂ¤ch",
      title: "Sprich mit der PersĂ¶nlichkeit",
      subtitle: "Du siehst zuerst den gemeinsamen GesprĂ¤chsverlauf, egal ob die letzten Nachrichten aus der App oder aus einem verknĂĽpften Kanal kamen.",
      emptyThread:
        "Starte die Unterhaltung hier. Neue Nachrichten erscheinen direkt in diesem gemeinsamen Thread, sobald sie ausgetauscht wurden.",
      placeholder: "Sende eine Nachricht...",
      composerHint: "Antworten landen wieder in diesem selben Transkript, damit die ganze Unterhaltung an einem Ort bleibt.",
      send: "Nachricht senden",
      sending: "Senden...",
      delivered: "Zugestellt",
      failed: "Nicht gesendet",
      thread: "Thread",
      latestMessages: "Letzte Nachrichten",
      noHistory: "Noch keine gemeinsamen Nachrichten.",
      transcriptCount: "Transkript-EintrĂ¤ge",
      activeChannel: "Letzte KanĂ¤le",
      latestLanguage: "Live-Sprache",
      messageDetails: "Nachrichtendetails",
      channel: "Kanal",
      pending: "Wird gesendet",
    },
    settings: {
      eyebrow: "Einstellungen",
      title: "HĂĽlle anpassen",
      subtitle: "Kurzer mobile-first Bereich fĂĽr Profil, OberflĂ¤chensprache und proaktive Follow-ups.",
      profileTitle: "Profil",
      profileBody: "Lege fest, wie dich die App anzeigen soll.",
      uiLanguageTitle: "OberflĂ¤chensprache",
      uiLanguageBody: "Ă„ndert nur Labels, Copy und Navigation der App-HĂĽlle.",
      uiLanguageHelp: "Das steuert nicht die Sprache innerhalb des eigentlichen GesprĂ¤chs.",
      utcOffsetTitle: "Lokaler Zeit-Offset",
      utcOffsetBody: "Legt den expliziten UTC-Offset fest, den die Runtime fĂĽr Datum und Uhrzeit deines Profils verwendet.",
      utcOffsetHelp: "WĂ¤hle den Offset passend zu deinem aktuellen Ort. Polen oder die Schweiz im Winter sind zum Beispiel meist UTC+01:00.",
      conversationTitle: "GesprĂ¤chssprache",
      conversationBody: "Die GesprĂ¤chssprache passt sich live aus Kontext, Verlauf und aktueller Unterhaltung an.",
      proactiveTitle: "Proaktive Follow-ups",
      proactiveBody: "Erlaube Aviary gelegentliche Follow-ups, wenn deine Kontoeinstellungen es zulassen.",
      saveHint: "Speichere deine Ă„nderungen, wenn du bereit bist.",
      conversationRuntimeOwned: "Adaptiv und kontextbezogen",
      savedState: "Bereit zum Speichern",
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
      title: "VerfĂĽgbare Tools und KanĂ¤le",
      subtitle: "Sieh, was jetzt bereit ist, was Aktion braucht und was noch blockiert ist.",
      groupCount: "Tool-Gruppen",
      integral: "Immer aktiv",
      ready: "Jetzt bereit",
      linkRequired: "BenĂ¶tigt VerknĂĽpfung",
      loading: "Tool-Ăśbersicht wird geladen.",
      empty: "Noch keine Tool-Ăśbersicht geladen.",
      currentStatus: "Aktueller Status",
      nextStep: "NĂ¤chster Schritt",
      technicalDetails: "Technische Details",
      availability: "VerfĂĽgbarkeit",
      provider: "Provider",
      control: "Steuerung",
      linkState: "VerknĂĽpfungsstatus",
      readOnly: "Nur lesen",
      enabledByUser: "Von dir aktiviert",
      disabledByUser: "Von dir deaktiviert",
      saving: "Speichern...",
      noAction: "Keine Aktion nĂ¶tig.",
      telegramLinking: "Telegram verknĂĽpfen",
      generateCode: "Code erzeugen",
      rotateCode: "Code erneuern",
      generating: "Erzeugen...",
      linkCode: "VerknĂĽpfungscode",
      instruction: "Anleitung",
      noLinkCode: "Noch kein aktiver Code. Erzeuge ihn, wenn du den Chat bestĂ¤tigen willst.",
      capabilities: "FĂ¤higkeiten",
      summaryGroupNote: "Klare Gruppen für die Tools, die du hier durchsuchen kannst",
      summaryIntegralNote: "Fähigkeiten, die als Teil des Produkts verfügbar bleiben",
      summaryReadyNote: "Tools, die heute einsatzbereit sind",
      summaryLinkRequiredNote: "Kanäle, die auf einen kurzen Verknüpfungsschritt warten",
      directoryTitle: "Tool-Verzeichnis",
      itemSingularSuffix: "Eintrag",
      itemsSuffix: "Einträge",
      workspaceSnapshot: "Workspace-Snapshot",
      statusAlwaysOn: "Immer aktiv",
      statusReadyToUse: "Einsatzbereit",
      statusLinkRequired: "Verknüpfung erforderlich",
      statusPlanned: "Geplant",
      statusNeedsReview: "Prüfung nötig",
      providerReadyValue: "bereit",
      providerConfiguredValue: "konfiguriert",
      providerNotConfiguredValue: "nicht konfiguriert",
      telegramInstructionBody:
        "Erzeuge einen kurzen Code und sende ihn dann aus dem Chat, den du mit dieser Identität verbinden willst, an den konfigurierten Aviary-Telegram-Bot.",
      expiresInAbout: "Läuft ab in etwa",
      seconds: "Sekunden",
      saveSuccess: "Deine Tool-Auswahl wurde gespeichert.",
      saveError: "Tool-Präferenz konnte nicht gespeichert werden.",
      telegramLinkReady: "Dein Telegram-Verknüpfungscode ist bereit.",
      telegramStartError: "Telegram-Verknüpfung konnte nicht gestartet werden.",
      readyChipSuffix: "bereit",
      needsLinkingChipSuffix: "braucht Verknüpfung",
      alwaysOnChipSuffix: "immer aktiv",
      linkStateLinkedValue: "Verknüpft",
      linkStateNotLinkedValue: "Nicht verknüpft",
      linkStateRequiredValue: "Verknüpfung erforderlich",
      linkStateUnknownValue: "Unbekannt",
    },
    personality: {
      eyebrow: "PersĂ¶nlichkeit",
      title: "PersĂ¶nlichkeitsĂĽbersicht",
      subtitle: "Zuerst die wichtigsten Einblicke, weitere Details nur dann, wenn du sie sehen willst.",
      filter: "Sektionen filtern",
      loading: "PersĂ¶nlichkeitsĂĽbersicht wird geladen.",
      empty: "Keine passenden Sektionen fĂĽr diesen Filter.",
    },
    memory: {
      eyebrow: "Memory",
      title: "KontinuitĂ¤tsbibliothek",
      subtitle: "Wiederverwendbare Muster, gelernte Hinweise und aktueller Kontext ohne rohe Datenbankansicht.",
      semantic: "Wiederverwendbare Muster",
      affective: "Affektive Einsichten",
      preferences: "Gelernte Hinweise",
      recent: "Aktuelle Memory-Signale",
      continuity: "Kontinuität",
      patternSingularSuffix: "Muster",
      patternsSuffix: "Muster",
      patternsZeroSuffix: "Muster",
      insightSingularSuffix: "Einsicht",
      insightsSuffix: "Einsichten",
      insightsZeroSuffix: "Einsichten",
      cueSingularSuffix: "Hinweis",
      cuesSuffix: "Hinweise",
      cuesZeroSuffix: "Hinweise",
      semanticDetail: "Muster stehen für künftige Antworten wiederverwendbar bereit.",
      affectiveDetail: "Emotionale Einsichten können Ton und Timing formen.",
      preferencesDetail: "Stabile Hinweise sind mit deiner bevorzugten Arbeitsweise verbunden.",
      memoryMap: "Memory-Karte",
      memoryMapTitle: "Was wiederverwendet werden kann",
      noRawRecords: "Keine rohen Datensätze sichtbar",
      semanticMemoryTitle: "Semantische Erinnerung",
      semanticMemoryDetail: "Wiederverwendbare Konzepte und Zusammenfassungen bleiben vor der nächsten Antwort verfügbar.",
      affectiveMemoryTitle: "Affektive Erinnerung",
      affectiveMemoryDetail: "Ton, Reibung und emotionaler Kontext können künftigen Ausdruck informieren.",
      preferencesMemoryTitle: "Präferenzen",
      preferencesMemoryDetail: "Gelernte Hinweise halten die Shell persönlich, ohne rohe Datensätze offenzulegen.",
      continuityNearConversation: "Kontinuität nahe am Gespräch",
      conversationContinuityTitle: "Gesprächskontinuität",
      memorySourceEmptyBody: "Die Web-App ist bereit, zur aktiven Memory-Quelle zu werden.",
      recentChannelsPrefix: "Aktuelle Kanäle:",
      currentContext: "Aktueller Kontext",
      reflectionBridgeTitle: "Reflexionsbrücke",
      reflectionBridgeEmptyBody: "Eine kurze Reflexion kann tiefere Memory-Bildung starten.",
      reflectionBridgeReadyBody: "Aktuelle Reflexionen sind verfügbar, um die nächste Antwort zu formen.",
      slowLearning: "Langsameres Lernen",
      preferencePostureTitle: "Präferenzhaltung",
      preferencePostureEmptyBody: "Noch keine gelernten Hinweise; die Ansicht bleibt bereit ohne zu simulieren.",
      preferencePostureReadyBody: "Gelernte Hinweise sind sichtbar, ohne Interna offenzulegen.",
      personalization: "Personalisierung",
      recentMovement: "Aktuelle Bewegung",
    },
    reflections: {
      eyebrow: "Reflections",
      title: "Reflexionskammer",
      subtitle: "Eine ruhigere Schicht fĂĽr Einsichten, Integration und langsameres Lernen.",
      integrated: "Integrierte Einsichten",
      pending: "Bereit zur Integration",
      cadence: "Lernrhythmus",
      recent: "Aktuelle Reflexionen",
      slowLearning: "Langsameres Lernen",
      insightSingularSuffix: "Einsicht",
      insightsSuffix: "Einsichten",
      insightsZeroSuffix: "Einsichten",
      threadSingularSuffix: "Faden",
      threadsSuffix: "Fäden",
      readyValue: "Bereit",
      activeValue: "Aktiv",
      integratedDetail: "Einsichten sind bereit, künftige Ausdrucksweisen zu beeinflussen.",
      pendingDetail: "Offene Fäden können durch einen kurzen Rückblick klarer werden.",
      cadenceDetail: "Die langsamere Lernschicht bleibt verfügbar, ohne den Chat zu überladen.",
      reflectionFlow: "Reflexionsfluss",
      flowTitle: "Wahrnehmen, integrieren, zurückkehren",
      noRawJournal: "Kein Rohjournal sichtbar",
      noticeTitle: "Wahrnehmen",
      noticeDetail: "Aktueller Kontext und emotionale Hinweise werden sichtbar.",
      integrateTitle: "Integrieren",
      integrateDetail: "Affektive Einsichten werden in die künftige Haltung eingefaltet.",
      returnTitle: "Zurückkehren",
      returnDetail: "Die nächste Antwort kann die Lektion nutzen, ohne Rohnotizen offenzulegen.",
      webValue: "web",
      readyShort: "bereit",
      promptsTitle: "Impulse für den nächsten Rückblick",
      whatChangedTitle: "Was hat sich verändert?",
      whatChangedBody: "Benenne die kleinste Veränderung, die weitergetragen werden sollte.",
      whatQuietTitle: "Was sollte still bleiben?",
      whatQuietBody: "Halte privaten Kontext nützlich, ohne ihn in Rauschen zu verwandeln.",
      whatActionTitle: "Welche Handlung folgt?",
      whatActionBody: "Lass die Einsicht zu einem ruhigeren nächsten Schritt werden.",
      recentMovement: "Letzte Bewegung",
    },
    plans: {
      eyebrow: "Plans",
      title: "Planungsraum",
      subtitle: "Aktive Ziele und Aufgaben als ruhiger Pfad, bevor etwas zur AusfĂĽhrung wird.",
      activeGoals: "Aktive Ziele",
      activeTasks: "Aktive Aufgaben",
      nextStep: "NĂ¤chster bester Schritt",
      posture: "Planungshaltung",
      goalSingularSuffix: "Ziel",
      goalsSuffix: "Ziele",
      taskSingularSuffix: "Aufgabe",
      tasksSuffix: "Aufgaben",
      activeGoalsDetail: "Ziele, die aktuell die Vordergrundrichtung formen.",
      activeTasksDetail: "Aufgaben, die vor Ausführung für Planung sichtbar sind.",
      readyValue: "Bereit",
      alignedValue: "Ausgerichtet",
      postureDetail: "Planung bleibt auf Hinweise begrenzt, ohne Nebeneffekte.",
      planningPath: "Planungspfad",
      shapeBeforeAction: "Form vor Aktion",
      actionBoundaryPreserved: "Aktionsgrenze bleibt erhalten",
      gatherTitle: "Sammeln",
      gatherDetail: "Ziele, Aufgaben, Erinnerung und aktueller Kontext werden gemeinsam gelesen.",
      sequenceTitle: "Sequenzieren",
      sequenceDetail: "Der nächste Schritt wird geformt, bevor er Aktion wird.",
      boundTitle: "Begrenzen",
      boundDetail: "Ausführung bleibt außerhalb der Route, bis eine echte Aktionsschicht sie besitzt.",
      safeValue: "sicher",
      planningSuggestions: "Planungsvorschläge",
      clarifyOutcomeTitle: "Nächstes Ergebnis klären",
      clarifyOutcomeEmptyBody: "Erstelle ein bedeutsames Ziel, bevor du den Plan erweiterst.",
      clarifyOutcomeReadyBody: "Wähle das Ziel, das den nächsten Fokusblock verdient.",
      convertSequenceTitle: "Intent in Sequenz wandeln",
      convertSequenceEmptyBody: "Brich den Plan in die erste sichtbare Aufgabe herunter.",
      convertSequenceReadyBody: "Gruppiere aktive Aufgaben in die kleinste nützliche Reihenfolge.",
      returnChatTitle: "Über Chat zurückkehren",
      returnChatBody: "Nutze das Gespräch, um den Plan vor Aktion zu verfeinern.",
      planningContext: "Planungskontext",
      directionTitle: "Richtung",
      directionBody: "Aktuelle Ziele zeigen, wo Aufmerksamkeit als Nächstes landen sollte.",
      cadenceTitle: "Kadenz",
      cadenceBody: "Aufgaben bleiben sichtbar, bevor etwas zur Ausführung wird.",
      boundaryTitle: "Grenze",
      boundaryBody: "Pläne bleiben Hinweise, bis die Aktionsschicht einen echten Nebeneffekt besitzt.",
    },
    goals: {
      eyebrow: "Goals",
      title: "Zielhorizont",
      subtitle: "Sieh, was in Bewegung ist, was Momentum hat und wo Aufmerksamkeit landen sollte.",
      active: "Aktive Ziele",
      progress: "Fortschrittshaltung",
      focus: "Fokus-Kandidat",
      momentum: "Momentum",
      goalSingularSuffix: "Ziel",
      goalsSuffix: "Ziele",
      activeDetail: "Aktuelle Richtungen im Vordergrund.",
      openValue: "Offen",
      movingValue: "In Bewegung",
      progressDetail: "Fortschritt bleibt sichtbar, ohne Ausführung zu erzwingen.",
      focusFallback: "Wähle ein bedeutsames erstes Ziel.",
      goalHorizon: "Zielhorizont",
      whatIsInMotion: "Was in Bewegung ist",
      directionOnly: "Nur Richtung",
      dailyRhythmTitle: "Einen stärkeren Tagesrhythmus bauen",
      channelContinuityTitle: "Kontinuität über Kanäle verbessern",
      reusableInsightsTitle: "Wiederverwendbare Einsichten erfassen",
      embodiedPersonalityTitle: "Eine verkörpertere Persönlichkeit formen",
      strongestCandidateDetail: "Stärkster Kandidat für den nächsten Fokusblock.",
      continuitySurfacesDetail: "Unterstützt Kontinuität über Oberflächen.",
      reusableLearningDetail: "Macht Reflexion zu wiederverwendbarem Lernen.",
      embodiedDirectionDetail: "Hält die verkörperte Produktrichtung lebendig.",
      goalSignals: "Zielsignale",
      directionTitle: "Richtung",
      directionEmptyBody: "Noch keine aktiven Ziele; der Horizont wartet auf den ersten Anker.",
      directionReadySingularBody: "formt die aktuelle Richtung.",
      directionReadyPluralBody: "formen die aktuelle Richtung.",
      momentumTitle: "Momentum",
      momentumBody: "Das stärkste sichtbare Ziel hat genug Fortschritt für die nächste Prüfung.",
      focusBoundaryTitle: "Fokusgrenze",
      focusBoundaryBody: "Ziele bleiben hier Richtung; Planung und Aktion bleiben getrennte Flächen.",
      relatedGuidance: "Verwandte Hinweise",
      nextFocusTitle: "Nächster Fokus",
      nextFocusBody: "Nutze das stärkste Ziel als nächsten Fokusblock.",
      planningBridgeTitle: "Planungsbrücke",
      planningBridgeBody: "Wechsle in Planung, wenn das Ziel Sequenz statt weiterer Interpretation braucht.",
      reflectionBridgeTitle: "Reflexionsbrücke",
      reflectionBridgeBody: "Kehre zur Reflexion zurück, wenn die Richtung einen klareren Grund braucht.",
    },
    insights: {
      eyebrow: "Insights",
      title: "Signalstudio",
      subtitle: "Muster, affektive Signale und Hinweise in einer ruhigen SinnflĂ¤che.",
      patterns: "Wiederverwendbare Muster",
      signals: "Affektive Signale",
      guidance: "HinweisfĂ¤den",
      clarity: "Klarheitsindex",
      patternsDetail: "Wiederverwendbare Bedeutung aus früherem Kontext.",
      signalsDetail: "Ton, Emotion und Reibung stehen für Ausdruck bereit.",
      guidanceDetail: "Kuratierte Hinweise formen den nächsten Schritt.",
      patternSingularSuffix: "Muster",
      patternsSuffix: "Muster",
      signalSingularSuffix: "Signal",
      signalsSuffix: "Signale",
      goalSingularSuffix: "Ziel",
      goalsSuffix: "Ziele",
      readyValue: "Bereit",
      insightMap: "Insight-Karte",
      insightMapTitle: "Was das System bereits lesen kann",
      readOnly: "Nur lesen",
      semanticPatternTitle: "Semantisches Muster",
      semanticPatternDetail: "Wiederverwendbares Wissen gibt dem Gespräch mehr Rückgrat.",
      affectiveTextureTitle: "Affektive Textur",
      affectiveTextureDetail: "Emotionaler Kontext bleibt sichtbar, bevor der Ton gewählt wird.",
      planningRelevanceTitle: "Planungsrelevanz",
      planningRelevanceDetail: "Ziel- und Aufgaben-Kontext trennt Rauschen von nützlicher Führung.",
      reflectionReturnTitle: "Reflexionsrückkehr",
      reflectionReturnDetail: "Insights helfen, wenn sie zu Chat, Erinnerung oder Aktion zurückkehren.",
      sensemakingNotes: "Sinnnotizen",
      signalDensityTitle: "Signaldichte",
      signalDensityReadyBody: "AION hat bereits wiederverwendbaren Kontext für weniger generische Antworten.",
      signalDensityEmptyBody: "Noch keine semantischen Muster sichtbar; die Fläche wartet auf erste Evidenz.",
      interpretationBoundaryTitle: "Interpretationsgrenze",
      interpretationBoundaryBody: "Insights bleiben lesende Sinnbildung; Aktion bleibt in Planung und Tools.",
      nextUsefulMoveTitle: "Nächster nützlicher Schritt",
      nextUsefulMoveFallback: "Nutze Chat, um das erste bedeutsame Signal zu erzeugen.",
      guidanceCandidates: "Hinweiskandidaten",
      deepWorkTitle: "Deep-Work-Fenster",
      deepWorkNoGoalBody: "Forme ein bedeutsames Ziel, damit der Tag ein stärkeres Zentrum bekommt.",
      deepWorkActiveBody: "Deine aktiven Ziele sind bereit für einen fokussierten Arbeitsblock.",
      momentumTitle: "Momentum aufbauen",
      momentumNoThreadBody: "Die nächste Nachricht kann der Anker für einen klareren Plan werden.",
      momentumThreadPrefix: "Bleib nah am letzten Thread:",
      reflectTitle: "Reflektieren und integrieren",
      reflectNoSignalBody: "Eine kurze Reflexion kann die erste tiefere Lernschicht starten.",
      reflectReadyBody: "Aktuelle Reflexionen können die nächste Antwort informieren.",
      connectionTitle: "Verbindungschance",
      connectionNoChannelBody: "Verbinde eine weitere Fläche, wenn du Kontinuität außerhalb der Web-Shell willst.",
      connectionLivePrefix: "Kontinuität lebt bereits über:",
    },
    automations: {
      eyebrow: "Automationen",
      title: "Automationskontrolle",
      subtitle: "ProaktivitĂ¤t, Scheduler und Attention Queue ohne versteckte Nebenwirkungen.",
      proactive: "Proaktiver Modus",
      queue: "Attention Queue",
      scheduler: "Scheduler",
      boundary: "Aktionsgrenze",
      proactiveOnDetail: "Die Kontopräferenz erlaubt gelegentliche Follow-ups.",
      proactiveOffDetail: "Follow-ups bleiben ruhig, bis du die Präferenz aktivierst.",
      pendingValue: "ausstehend",
      queueDetail: "Ausstehende Attention-Elemente aus dem aktuellen Health-Snapshot.",
      checkingValue: "Prüfung",
      unknownValue: "Unbekannt",
      readyValue: "Bereit",
      schedulerDetail: "Scheduler-Haltung wird aus Backend-Health gelesen.",
      automationFlow: "Automationsfluss",
      allowedToMove: "Was sich bewegen darf",
      observed: "Beobachtet",
      preferenceGateTitle: "Präferenz-Gate",
      preferenceOnDetail: "Proaktive Follow-ups sind durch die Kontoeinstellungen erlaubt.",
      preferenceOffDetail: "Das Konto hat proaktive Follow-ups deaktiviert.",
      attentionQueueTitle: "Attention Queue",
      attentionQueueDetail: "Wartende Attention bleibt vor künftiger Zustellung sichtbar.",
      schedulerTickTitle: "Scheduler-Tick",
      schedulerTickPresentDetail: "Scheduler-Details sind im Health-Snapshot vorhanden.",
      schedulerTickQuietDetail: "Der aktuelle Health-Payload liefert keine Scheduler-Details.",
      presentValue: "Vorhanden",
      quietValue: "Ruhig",
      actionBoundaryTitle: "Aktionsgrenze",
      actionBoundaryDetail: "Diese Route beobachtet nur die Haltung; Nebeneffekte bleiben außerhalb der View-Schicht.",
      readOnlyValue: "Nur lesen",
      guardrails: "Leitplanken",
      noHiddenExecutionTitle: "Keine versteckte Ausführung",
      noHiddenExecutionBody: "Das Öffnen dieser Route erstellt keine Erinnerungen, sendet keine Nachrichten und ändert keine Proaktivitäts-Einstellungen.",
      settingsSwitchTitle: "Einstellungen bleiben der Schalter",
      settingsSwitchBody: "Die eigentliche proaktive Opt-in-Steuerung bleibt in Einstellungen als einzige Wahrheitsquelle.",
      healthBackedTitle: "Health-gestützte Haltung",
      healthUnavailableBody: "Health ist nicht verfügbar, daher werden Scheduler-Details konservativ angezeigt.",
      healthBackedBody: "Scheduler- und Queue-Haltung kommen aus dem bestehenden Health-Endpunkt.",
      healthDetails: "Health-Details",
      pending: "Ausstehend",
      claimed: "Beansprucht",
      answered: "Beantwortet",
      attentionItems: "Attention-Elemente",
      claimedItems: "beanspruchte Elemente",
      answeredItems: "beantwortete Elemente",
    },
    integrations: {
      eyebrow: "Integrationen",
      title: "Verbindungskarte",
      subtitle: "Provider-Bereitschaft, Linkbedarf und externe KanĂ¤le in einer ruhigen FlĂ¤che.",
      ready: "Bereite Provider",
      linked: "Verbundene Tools",
      attention: "Braucht Aufmerksamkeit",
      boundary: "Integrationsgrenze",
      readyShort: "bereit",
      readyDetail: "Provider, die in der bestehenden Tools-Übersicht bereit melden.",
      linkedDetail: "Aktivierte Tools, die der Shell aktuell zur Verfügung stehen.",
      attentionDetail: "Provider, die blockiert sind oder auf Verknüpfung warten.",
      providerMap: "Provider-Karte",
      providerMapTitle: "Externe Flächen am Rand",
      overview: "Übersicht",
      noProvidersTitle: "Keine Provider sichtbar",
      noProvidersDetail: "Die Tools-Übersicht liefert noch keine Provider-Zeilen.",
      connectionRules: "Verbindungsregeln",
      toolsOwnTogglesTitle: "Tools besitzen die Schalter",
      toolsOwnTogglesBody: "Diese Route zeigt Integrationshaltung; detaillierte Aktivierung bleibt in Tools.",
      linksStayExplicitTitle: "Links bleiben explizit",
      linksStayExplicitBody: "Jeder Provider mit Linkbedarf braucht weiter den genehmigten Verknüpfungsfluss.",
      noSilentProviderAccessTitle: "Kein stiller Provider-Zugriff",
      noSilentProviderAccessBody: "Das Öffnen der Route liest nur Übersichtsdaten und ruft keine externen Provider auf.",
      readinessDetails: "Bereitschaftsdetails",
      configured: "Konfiguriert",
      toolsKnown: "bekannte Tools",
      linkRequired: "Link erforderlich",
      waitingForLinkFlow: "warten auf Verknüpfung",
      blocked: "Blockiert",
      providerChecksBlocked: "blockierte Provider-Checks",
      readyValue: "Bereit",
      linkValue: "Link",
      blockedValue: "Blockiert",
      quietValue: "Ruhig",
    },
  },
} as const;

function truncateText(value: string, maxLength: number) {
  const trimmed = value.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  return `${trimmed.slice(0, Math.max(0, maxLength - 1)).trimEnd()}...`;
}

function routeDescription(route: RoutePath, locale: ResolvedUiLanguageCode) {
  const localized = UI_COPY[locale].routeDescriptions as Record<string, string>;
  return localized[route] ?? UI_COPY.en.routeDescriptions[route];
}

function routeLabel(route: RoutePath, locale: ResolvedUiLanguageCode) {
  const localized = UI_COPY[locale].routes as Record<string, string>;
  return localized[route] ?? UI_COPY.en.routes[route];
}

type ConversationChannelStatus = {
  tone: "active" | "warning" | "error" | "loading";
  label: string;
  title: string;
  body: string;
  facts: Array<{ label: string; value: string }>;
};

function lastState(payload: Record<string, unknown> | undefined, key: string) {
  const value = payload?.[key];
  return typeof value === "string" ? value : "";
}

function conversationChannelStatus(
  health: AppHealthResponse | null,
  options: {
    loading: boolean;
    error: string | null;
  },
): ConversationChannelStatus {
  const { loading, error } = options;
  if (loading) {
    return {
      tone: "loading",
      label: "Checking",
      title: "Conversation channel",
      body: "Reading backend health before showing Telegram delivery posture.",
      facts: [
        { label: "Ingress", value: "..." },
        { label: "Delivery", value: "..." },
      ],
    };
  }

  if (error || !health) {
    return {
      tone: "error",
      label: "Unavailable",
      title: "Conversation channel",
      body: error ?? "Backend health is not available right now.",
      facts: [
        { label: "Ingress", value: "unknown" },
        { label: "Delivery", value: "unknown" },
      ],
    };
  }

  const telegram: AppHealthTelegramChannel = health.conversation_channels?.telegram ?? {};
  const ingressProcessed = numberValue(telegram.ingress_processed);
  const ingressAttempts = numberValue(telegram.ingress_attempts);
  const ingressFailures = numberValue(telegram.ingress_runtime_failures);
  const ingressRejections = numberValue(telegram.ingress_rejections);
  const deliveryAttempts = numberValue(telegram.delivery_attempts);
  const deliverySuccesses = numberValue(telegram.delivery_successes);
  const deliveryFailures = numberValue(telegram.delivery_failures);
  const lastIngressState = lastState(telegram.last_ingress, "state");
  const lastIngressReason = lastState(telegram.last_ingress, "reason");
  const lastDeliveryState = lastState(telegram.last_delivery, "state");
  const lastDeliveryNote = lastState(telegram.last_delivery, "note");
  const providerReady = Boolean(telegram.round_trip_ready);

  const facts = [
    { label: "Ingress", value: `${ingressProcessed}/${ingressAttempts}` },
    { label: "Delivery", value: `${deliverySuccesses}/${deliveryAttempts}` },
    { label: "Attention", value: `${numberValue(health.attention?.pending)} pending` },
  ];

  if (!providerReady) {
    return {
      tone: "error",
      label: "Provider missing",
      title: "Telegram is not configured",
      body: String(telegram.round_trip_hint || "Telegram provider configuration is incomplete."),
      facts,
    };
  }

  if (ingressFailures > 0 || deliveryFailures > 0 || lastIngressState === "runtime_failed") {
    return {
      tone: "error",
      label: "Needs attention",
      title: "Telegram reached Aviary, but delivery is failing",
      body: lastIngressReason || lastDeliveryNote || "The backend recorded a Telegram runtime or delivery failure.",
      facts,
    };
  }

  if (ingressRejections > 0 && ingressProcessed === 0) {
    return {
      tone: "error",
      label: "Secret mismatch",
      title: "Telegram webhook traffic is being rejected",
      body: lastIngressReason || "Webhook traffic reached Aviary but failed validation.",
      facts,
    };
  }

  if (ingressProcessed > 0 && deliverySuccesses > 0 && lastDeliveryState === "sent") {
    return {
      tone: "active",
      label: "Live",
      title: "Telegram is delivering",
      body: "Recent Telegram ingress was processed and the last reply was sent.",
      facts,
    };
  }

  if (ingressAttempts === 0 && deliveryAttempts === 0) {
    return {
      tone: "warning",
      label: "Quiet",
      title: "Telegram is configured but no traffic is visible",
      body: "The provider is ready, but Aviary has not observed webhook ingress since this process started.",
      facts,
    };
  }

  return {
    tone: "warning",
    label: "Watching",
    title: "Telegram status is partial",
    body: lastIngressReason || lastDeliveryNote || "Aviary has some Telegram telemetry but no confirmed recent delivery.",
    facts,
  };
}

export default function App() {
  const [route, setRoute] = useState<RoutePath>(() => normalizeRoute(window.location.pathname));
  const mobileNavScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileNavRefs = useRef<Partial<Record<RoutePath, HTMLButtonElement | null>>>({});
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [authModalOpen, setAuthModalOpen] = useState(() => window.location.pathname === "/login");
  const [authBusy, setAuthBusy] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [me, setMe] = useState<AppMeResponse | null>(null);
  const [history, setHistory] = useState<AppChatHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [localTranscriptItems, setLocalTranscriptItems] = useState<AppChatHistoryEntry[]>([]);
  const [chatText, setChatText] = useState("");
  const [overview, setOverview] = useState<AppPersonalityOverviewResponse | null>(null);
  const [, setOverviewLoading] = useState(false);
  const [toolsOverview, setToolsOverview] = useState<AppToolsOverviewResponse | null>(null);
  const [toolsLoading, setToolsLoading] = useState(false);
  const [healthSnapshot, setHealthSnapshot] = useState<AppHealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [savingToolId, setSavingToolId] = useState<string | null>(null);
  const [telegramLinkStart, setTelegramLinkStart] = useState<AppTelegramLinkStartResponse | null>(null);
  const [telegramLinkBusy, setTelegramLinkBusy] = useState(false);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [settingsDraft, setSettingsDraft] = useState({
    displayName: "",
    uiLanguage: "system" as UiLanguageCode,
    utcOffset: "UTC+00:00",
    proactiveOptIn: false,
  });
  const [savingSettings, setSavingSettings] = useState(false);
  const [resetConfirmationText, setResetConfirmationText] = useState("");
  const [resettingData, setResettingData] = useState(false);
  const [accountPanelOpen, setAccountPanelOpen] = useState(false);
  const transcriptContainerRef = useRef<HTMLDivElement | null>(null);
  const transcriptMessageRefs = useRef<Record<string, HTMLArticleElement | null>>({});
  const initialTranscriptScrollDoneRef = useRef(false);
  const pendingAssistantScrollIdRef = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
      setAuthModalOpen(window.location.pathname === "/login");
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (initializing || route === "/login") {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const scrollContainer = mobileNavScrollRef.current;
      const activeItem = mobileNavRefs.current[route];
      if (!scrollContainer || !activeItem) {
        return;
      }

      scrollContainer.scrollLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - scrollContainer.clientWidth / 2;
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [initializing, route]);

  useEffect(() => {
    setError(null);
    setAccountPanelOpen(false);
    if (route !== "/login") {
      setAuthModalOpen(false);
    }
  }, [route]);

  useEffect(() => {
    if (!authModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAuthModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [authModalOpen, me]);

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
          utcOffset: normalizeUtcOffset(snapshot.settings.utc_offset),
          proactiveOptIn: Boolean(snapshot.settings.proactive_opt_in),
        });
        if (route === "/login") {
          startTransition(() => {
            navigate("/dashboard");
            setRoute("/dashboard");
          });
        }
      } catch (caught) {
        if (cancelled) {
          return;
        }
        if (route !== "/login" && !(caught instanceof ApiError && caught.status === 401)) {
          setError(caught instanceof Error ? caught.message : "Failed to initialize session.");
        }
        if (route === "/login") {
          setAuthModalOpen(window.location.pathname === "/login");
        } else {
          startTransition(() => {
            navigate("/login");
            setRoute("/login");
          });
          setAuthModalOpen(true);
        }
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
    if (!me || (route !== "/chat" && route !== "/dashboard")) {
      setLocalTranscriptItems([]);
      initialTranscriptScrollDoneRef.current = false;
      pendingAssistantScrollIdRef.current = null;
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
          setLocalTranscriptItems((items) => reconcileLocalTranscriptItems(items, payload.items));
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

  const transcriptItems = useMemo(
    () => [...history, ...reconcileLocalTranscriptItems(localTranscriptItems, history)],
    [history, localTranscriptItems],
  );
  const transcriptIsPreview = transcriptItems.length === 0;
  const visibleTranscriptItems = useMemo<AppChatHistoryEntry[]>(
    () =>
      transcriptItems.length > 0
        ? transcriptItems
        : [
            {
              message_id: "preview-assistant-1",
              event_id: "preview-assistant-1",
              role: "assistant",
              text: "Good morning.\nI reviewed our last conversation and the notes from today.\nHow can I support you right now?",
              channel: "app",
              timestamp: "2026-04-26T09:41:00Z",
            },
            {
              message_id: "preview-user-1",
              event_id: "preview-user-1",
              role: "user",
              text: "I'd like to plan my day and focus on the project we discussed yesterday.",
              channel: "app",
              timestamp: "2026-04-26T09:42:00Z",
            },
            {
              message_id: "preview-assistant-2",
              event_id: "preview-assistant-2",
              role: "assistant",
              text:
                "Perfect. I prepared a calm plan based on your goals, energy rhythm, and current priorities.\n\n1. Deep work block      10:00-12:00\n2. Project research     12:30-14:00\n3. Content creation     15:00-17:00\n\nShall we refine the details together?",
              channel: "app",
              timestamp: "2026-04-26T09:43:00Z",
            },
          ],
    [transcriptItems],
  );

  useEffect(() => {
    if (route !== "/chat") {
      transcriptMessageRefs.current = {};
      return;
    }

    const container = transcriptContainerRef.current;
    if (!container || transcriptItems.length === 0) {
      return;
    }

    if (!initialTranscriptScrollDoneRef.current) {
      container.scrollTop = container.scrollHeight;
      initialTranscriptScrollDoneRef.current = true;
      return;
    }

    const pendingAssistantScrollId = pendingAssistantScrollIdRef.current;
    if (!pendingAssistantScrollId) {
      return;
    }

    const target = transcriptMessageRefs.current[pendingAssistantScrollId];
    if (!target) {
      return;
    }

    target.scrollIntoView({ block: "start", behavior: "smooth" });
    pendingAssistantScrollIdRef.current = null;
  }, [route, transcriptItems]);

  useEffect(() => {
    if (
      !me ||
      (route !== "/personality" &&
        route !== "/chat" &&
        route !== "/dashboard" &&
        route !== "/memory" &&
        route !== "/reflections" &&
        route !== "/plans" &&
        route !== "/goals" &&
        route !== "/insights") ||
      overview
    ) {
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
    if (!me || (route !== "/tools" && route !== "/chat" && route !== "/dashboard" && route !== "/integrations") || toolsOverview) {
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

  useEffect(() => {
    if (!me || (route !== "/dashboard" && route !== "/automations")) {
      return;
    }

    let cancelled = false;
    setHealthLoading(true);
    setHealthError(null);
    void api
      .getHealth()
      .then((payload) => {
        if (!cancelled) {
          setHealthSnapshot(payload);
          setHealthError(null);
        }
      })
      .catch((caught) => {
        if (!cancelled) {
          setHealthError(caught instanceof Error ? caught.message : "Failed to load channel health.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setHealthLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [me, route]);

  const planningSummary = (overview?.planning_state as Record<string, unknown> | undefined)?.continuity_summary as
    | Record<string, unknown>
    | undefined;
  const knowledgeSummary = (overview?.learned_knowledge as Record<string, unknown> | undefined)?.knowledge_summary as
    | Record<string, unknown>
    | undefined;
  const preferenceSummary = (overview?.identity_state as Record<string, unknown> | undefined)?.preference_summary as
    | Record<string, unknown>
    | undefined;
  const roleSkillState = overview?.role_skill_state as Record<string, unknown> | undefined;
  const selectionVisibilitySummary = roleSkillState?.selection_visibility_summary as Record<string, unknown> | undefined;
  const skillRegistry = roleSkillState?.skill_registry as Record<string, unknown> | undefined;
  const activeGoalCount = numberValue(planningSummary?.active_goal_count);
  const activeTaskCount = numberValue(planningSummary?.active_task_count);
  const blockedTaskCount = numberValue(planningSummary?.blocked_task_count);
  const pendingProposalCount = numberValue(planningSummary?.pending_proposal_count);
  const semanticConclusionCount = numberValue(knowledgeSummary?.semantic_conclusion_count);
  const affectiveConclusionCount = numberValue(knowledgeSummary?.affective_conclusion_count);
  const learnedPreferenceCount = numberValue(preferenceSummary?.learned_preference_count);
  const relationCount = numberValue(knowledgeSummary?.relation_count);
  const adaptiveOutputCount = Array.isArray(knowledgeSummary?.adaptive_output_keys)
    ? knowledgeSummary.adaptive_output_keys.length
    : 0;
  const skillCatalogCount = numberValue(
    selectionVisibilitySummary?.catalog_skill_count ?? skillRegistry?.catalog_count ?? roleSkillState?.skill_count,
  );
  const workPartnerRoleAvailable = Boolean(selectionVisibilitySummary?.work_partner_role_available);
  const preferredRolePresent = Boolean(selectionVisibilitySummary?.preferred_role_present);
  const claritySignalCount = semanticConclusionCount + learnedPreferenceCount + activeGoalCount;
  const intuitiveSignalCount =
    relationCount + affectiveConclusionCount + adaptiveOutputCount + (Boolean(knowledgeSummary?.theta_present) ? 1 : 0);
  const primaryGoalNames = Array.isArray(planningSummary?.primary_goal_names)
    ? planningSummary.primary_goal_names.map((item) => String(item)).filter(Boolean)
    : [];
  const primaryTaskNames = Array.isArray(planningSummary?.primary_task_names)
    ? planningSummary.primary_task_names.map((item) => String(item)).filter(Boolean)
    : [];
  const dashboardRuntimeMax = Math.max(
    activeGoalCount,
    activeTaskCount,
    blockedTaskCount,
    pendingProposalCount,
    semanticConclusionCount,
    affectiveConclusionCount,
    learnedPreferenceCount,
    relationCount,
    skillCatalogCount,
    1,
  );
  const selectedUiLanguage = normalizeUiLanguage(
    route === "/settings" ? settingsDraft.uiLanguage : me?.settings.ui_language ?? settingsDraft.uiLanguage,
  );
  const selectedUtcOffset = normalizeUtcOffset(
    route === "/settings" ? settingsDraft.utcOffset : me?.settings.utc_offset ?? settingsDraft.utcOffset,
  );
  const resolvedUiLanguage = resolveUiLanguage(selectedUiLanguage);
  const selectedUiLanguageMetadata = uiLanguageMetadata(selectedUiLanguage);
  const selectedUtcOffsetMetadata = utcOffsetOption(selectedUtcOffset);
  const copy = UI_COPY[resolvedUiLanguage];
  const recentChannelsLabel = useMemo(() => {
    const recentChannels = Array.from(new Set(history.map((item) => item.channel))).filter(Boolean);
    return recentChannels.length > 0 ? recentChannels.join(" - ") : copy.common.noData;
  }, [copy.common.noData, history]);
  const currentUserLabel = me?.user.display_name || me?.user.email || "Account";
  const accountSummaryItems = [
    {
      label: copy.common.uiLanguage,
      value: localeOptionDisplay(selectedUiLanguageMetadata, resolvedUiLanguage),
    },
    {
      label: copy.common.utcOffset,
      value: selectedUtcOffsetMetadata.value,
    },
    {
      label: copy.common.proactive,
      value: Boolean(me?.settings.proactive_opt_in) ? copy.common.on : copy.common.off,
    },
  ];
  const successBody = toast ?? null;
  const errorBody = error ? error.split("\n")[0] : null;
  const errorDetail = error && errorBody !== error ? error : null;
  const latestAssistantMessage =
    [...transcriptItems].reverse().find((entry) => entry.role === "assistant")?.text ?? copy.chat.emptyThread;
  const latestUserMessage = [...transcriptItems].reverse().find((entry) => entry.role === "user")?.text ?? "";
  const dashboardSignalCards = [
    {
      placement: "left",
      eyebrow: "Memory",
      value: stringValue(knowledgeSummary?.semantic_conclusion_count, "0"),
      detail: "Total memories",
      note: "Continuity remains visible.",
    },
    {
      placement: "left",
      eyebrow: "Reflection",
      value: stringValue(knowledgeSummary?.affective_conclusion_count, "0"),
      detail: "Insights gained",
      note: "Learning shapes future replies.",
    },
    {
      placement: "left",
      eyebrow: "Context",
      value: recentChannelsLabel === copy.common.noData ? "Ready" : "Live",
      detail: "Relevance",
      note: recentChannelsLabel,
    },
    {
      placement: "right",
      eyebrow: "Motivation",
      value: stringValue(planningSummary?.active_goal_count, "0") === "0" ? "Steady" : "Aligned",
      detail: "Current posture",
      note: "Goals stay in the foreground.",
    },
    {
      placement: "right",
      eyebrow: "Planning",
      value: `${stringValue(planningSummary?.active_goal_count, "0")} / ${stringValue(planningSummary?.active_task_count, "0")}`,
      detail: "Goals / tasks",
      note: "Focus remains visible.",
    },
    {
      placement: "right",
      eyebrow: "Action",
      value: stringValue(toolsOverview?.summary.provider_ready_count, "0"),
      detail: "Ready capabilities",
      note: "Execution stays safely bounded.",
    },
  ];
  const dashboardGuidanceCards = [
    {
      title: "Deep work window",
      body: stringValue(planningSummary?.active_goal_count, "0") === "0"
        ? "Shape one meaningful goal to give the day a stronger center."
        : "Your active goals are ready for a focused work block.",
      action: "Focus",
    },
    {
      title: "Build momentum",
      body: latestUserMessage
        ? `Stay close to your latest thread: ${truncateText(latestUserMessage, 72)}`
        : "The next message can become the anchor for a clearer plan.",
      action: "View goal",
    },
    {
      title: "Reflect and integrate",
      body: stringValue(knowledgeSummary?.affective_conclusion_count, "0") === "0"
        ? "A short reflection can start your first layer of deeper learning."
        : "Recent reflections are ready to inform the next response.",
      action: "Reflect",
    },
    {
      title: "Connection opportunity",
      body: recentChannelsLabel === copy.common.noData
        ? "Link another surface when you want continuity outside the web shell."
        : `Continuity is already alive across: ${recentChannelsLabel}.`,
      action: "See context",
    },
  ];
  const dashboardCognitiveSteps = [
    { token: "O", title: "Observe", detail: "Input" },
    { token: "U", title: "Understand", detail: "Intent" },
    { token: "C", title: "Connect", detail: "Pattern" },
    { token: "R", title: "Reflect", detail: "Insight", active: affectiveConclusionCount > 0 },
    { token: "P", title: "Plan", detail: "Path", active: activeGoalCount > 0 },
    { token: "A", title: "Act", detail: "Delivery", active: activeTaskCount > 0 },
  ];
  const activeDashboardStep =
    [...dashboardCognitiveSteps].reverse().find((step) => Boolean(step.active)) ?? dashboardCognitiveSteps[2];
  const dashboardGoalRows = [
    {
      title: primaryGoalNames[0] ?? "Active goals",
      value: `${activeGoalCount}`,
      width: scaledMetricSize(activeGoalCount, dashboardRuntimeMax),
    },
    {
      title: primaryTaskNames[0] ?? "Active tasks",
      value: `${activeTaskCount}`,
      width: scaledMetricSize(activeTaskCount, dashboardRuntimeMax),
    },
    {
      title: "Blocked tasks",
      value: `${blockedTaskCount}`,
      width: scaledMetricSize(blockedTaskCount, dashboardRuntimeMax),
    },
    {
      title: "Pending proposals",
      value: `${pendingProposalCount}`,
      width: scaledMetricSize(pendingProposalCount, dashboardRuntimeMax),
    },
  ];
  const dashboardMemoryBars = [
    { label: "Mem", height: scaledMetricSize(semanticConclusionCount, dashboardRuntimeMax, 12) },
    { label: "Aff", height: scaledMetricSize(affectiveConclusionCount, dashboardRuntimeMax, 12) },
    { label: "Pref", height: scaledMetricSize(learnedPreferenceCount, dashboardRuntimeMax, 12) },
    { label: "Rel", height: scaledMetricSize(relationCount, dashboardRuntimeMax, 12) },
    { label: "Goal", height: scaledMetricSize(activeGoalCount, dashboardRuntimeMax, 12) },
    { label: "Task", height: scaledMetricSize(activeTaskCount, dashboardRuntimeMax, 12) },
    { label: "Tool", height: scaledMetricSize(numberValue(toolsOverview?.summary.provider_ready_count), dashboardRuntimeMax, 12) },
  ];
  const dashboardReflectionRows = [
    { title: `${semanticConclusionCount} reusable semantic conclusions`, tag: "Memory" },
    { title: `${affectiveConclusionCount} affective conclusions`, tag: "Reflection" },
    { title: `${learnedPreferenceCount} learned preferences`, tag: "Identity" },
    { title: `${relationCount} learned relations`, tag: "Context" },
  ];
  const dashboardCurrentPhase = {
    title: activeDashboardStep.title,
    body:
      activeTaskCount > 0
        ? `${activeTaskCount} active tasks are available for the current action layer.`
        : activeGoalCount > 0
          ? `${activeGoalCount} active goals are shaping the current planning layer.`
          : affectiveConclusionCount > 0
            ? `${affectiveConclusionCount} affective conclusions are available for reflection.`
            : `${semanticConclusionCount} memory signals are available for the current context.`,
  };
  const dashboardFigureNotes = [
    {
      key: "identity",
      className: "aion-dashboard-figure-note aion-dashboard-figure-note-identity",
      eyebrow: "Identity",
      title: currentUserLabel,
      body: "The same persona remains visible across the shell, so guidance feels relational instead of generic.",
    },
    {
      key: "knowledge",
      className: "aion-dashboard-figure-note aion-dashboard-figure-note-knowledge",
      eyebrow: "Learned knowledge",
      title: `${stringValue(knowledgeSummary?.semantic_conclusion_count, "0")} patterns`,
      body: "The book stays as a memory anchor for what Aviary has already learned well enough to reuse.",
    },
    {
      key: "planning",
      className: "aion-dashboard-figure-note aion-dashboard-figure-note-planning",
      eyebrow: "Planning posture",
      title: `${stringValue(planningSummary?.active_goal_count, "0")} active goals`,
      body: "The pen and luminous slate frame the next move before it becomes action or message delivery.",
    },
  ];
  const dashboardSystemHarmony = {
    value: "92%",
    label: "Optimal",
    body: "All systems are aligned and in harmony.",
  };
  const dashboardBalanceRows = [
    { label: "Conscious", value: "High" },
    { label: "Creative", value: "Energized" },
    { label: "Subconscious", value: "Strong" },
    { label: "Emotional", value: "Balanced" },
  ];
  const personalityLayers = [
    {
      zone: "Head Â· identity",
      title: "Identity",
      symbol: "â—Ś",
      body: "Profile continuity, learned preferences, and language posture shape how the personality recognizes the current relationship.",
      highlights: [
        currentUserLabel,
        `${stringValue(preferenceSummary?.learned_preference_count, "0")} learned preferences`,
      ],
    },
    {
      zone: "Near head · planning",
      title: "Planning",
      symbol: "✦",
      body: "Goals, tasks, and milestones stay visible as the active foreground direction instead of remaining hidden in raw payloads.",
      highlights: [
        `${stringValue(planningSummary?.active_goal_count, "0")} goals`,
        `${stringValue(planningSummary?.active_task_count, "0")} tasks`,
      ],
    },
    {
      zone: "Hand Â· learned knowledge",
      title: "Learned knowledge",
      symbol: "✦",
      body: "Patterns and affective takeaways become a reusable memory surface that supports future replies without overwhelming the route.",
      highlights: [
        `${stringValue(knowledgeSummary?.semantic_conclusion_count, "0")} semantic conclusions`,
        `${stringValue(knowledgeSummary?.affective_conclusion_count, "0")} affective conclusions`,
      ],
    },
    {
      zone: "Body Â· role + skills",
      title: "Role and skills",
      symbol: "â†—",
      body: "Role posture and skill availability stay visible as product capabilities, while execution boundaries remain safely backend-owned.",
      highlights: [
        ...summaryLines("role_skill_state", overview?.role_skill_state ?? {}).slice(0, 2),
      ],
    },
  ];
  const personalityFlowItems = [
    {
      eyebrow: "Conscious loop",
      title: "Perception to expression",
      body: "Foreground cognition stays readable: context, motivation, role, planning, and expression all map into visible product zones.",
    },
    {
      eyebrow: "Action boundary",
      title: "Action and side effects",
      body: "Useful capabilities stay visible without moving execution authority into the client.",
    },
    {
      eyebrow: "Subconscious loop",
      title: "Memory and reflection",
      body: "Reflection remains a slower background layer that shapes continuity over time instead of crowding the live route.",
    },
  ];
  const toolsHeroChips = [
    `${stringValue(toolsOverview?.summary.provider_ready_count, "0")} ${copy.tools.readyChipSuffix}`,
    `${stringValue(toolsOverview?.summary.link_required_count, "0")} ${copy.tools.needsLinkingChipSuffix}`,
    `${stringValue(toolsOverview?.summary.integral_enabled_count, "0")} ${copy.tools.alwaysOnChipSuffix}`,
  ];
  const settingsHeroChips = [
    localeOptionDisplay(selectedUiLanguageMetadata, resolvedUiLanguage),
    selectedUtcOffsetMetadata.value,
    Boolean(me?.settings.proactive_opt_in) ? copy.common.on : copy.common.off,
  ];
  const shellNavItems: Array<{
    route?: RoutePath;
    label: string;
    icon: SidebarIconKind;
    disabled?: boolean;
  }> = [
    {
      route: "/dashboard" as const,
      label: routeLabel("/dashboard", resolvedUiLanguage),
      icon: "dashboard" as const,
    },
    {
      route: "/chat" as const,
      label: routeLabel("/chat", resolvedUiLanguage),
      icon: "chat" as const,
    },
    {
      route: "/personality" as const,
      label: routeLabel("/personality", resolvedUiLanguage),
      icon: "personality" as const,
    },
    {
      route: "/memory" as const,
      label: routeLabel("/memory", resolvedUiLanguage),
      icon: "memory",
    },
    {
      route: "/reflections" as const,
      label: routeLabel("/reflections", resolvedUiLanguage),
      icon: "reflections",
    },
    {
      route: "/plans" as const,
      label: routeLabel("/plans", resolvedUiLanguage),
      icon: "plans",
    },
    {
      route: "/goals" as const,
      label: routeLabel("/goals", resolvedUiLanguage),
      icon: "goals",
    },
    {
      route: "/insights" as const,
      label: routeLabel("/insights", resolvedUiLanguage),
      icon: "insights",
    },
    {
      route: "/tools" as const,
      label: routeLabel("/tools", resolvedUiLanguage),
      icon: "tools" as const,
    },
    {
      route: "/automations" as const,
      label: routeLabel("/automations", resolvedUiLanguage),
      icon: "automations",
    },
    {
      route: "/integrations" as const,
      label: routeLabel("/integrations", resolvedUiLanguage),
      icon: "integrations",
    },
    {
      route: "/settings" as const,
      label: routeLabel("/settings", resolvedUiLanguage),
      icon: "settings" as const,
    },
  ];
  const {
    quickActions: chatQuickActions,
    currentFocus: chatCurrentFocus,
    linkedChannelsStatus: chatLinkedChannelsStatus,
    intentCard: chatIntentCard,
    motivationMetrics: chatMotivationMetrics,
    goalCard: chatGoalCard,
    relatedMemory: chatRelatedMemory,
  } = buildChatRouteModel({
    planningSummary,
    preferenceSummary,
    knowledgeSummary,
    recentChannelsLabel,
    noDataLabel: copy.common.noData,
  });
  const memoryStatCards = [
    {
      label: copy.memory.semantic,
      value: stringValue(knowledgeSummary?.semantic_conclusion_count, "0"),
      detail: copy.memory.semanticDetail,
    },
    {
      label: copy.memory.affective,
      value: stringValue(knowledgeSummary?.affective_conclusion_count, "0"),
      detail: copy.memory.affectiveDetail,
    },
    {
      label: copy.memory.preferences,
      value: stringValue(preferenceSummary?.learned_preference_count, "0"),
      detail: copy.memory.preferencesDetail,
    },
  ];
  const memoryPatternCount = stringValue(knowledgeSummary?.semantic_conclusion_count, "0");
  const memoryInsightCount = stringValue(knowledgeSummary?.affective_conclusion_count, "0");
  const memoryCueCount = stringValue(preferenceSummary?.learned_preference_count, "0");
  const memoryPatternNumber = Number(memoryPatternCount);
  const memoryInsightNumber = Number(memoryInsightCount);
  const memoryCueNumber = Number(memoryCueCount);
  const memoryPatternUnit =
    memoryPatternNumber === 1
      ? copy.memory.patternSingularSuffix
      : memoryPatternNumber === 0
        ? copy.memory.patternsZeroSuffix
        : copy.memory.patternsSuffix;
  const memoryInsightUnit =
    memoryInsightNumber === 1
      ? copy.memory.insightSingularSuffix
      : memoryInsightNumber === 0
        ? copy.memory.insightsZeroSuffix
        : copy.memory.insightsSuffix;
  const memoryCueUnit = memoryCueNumber === 1
    ? copy.memory.cueSingularSuffix
    : memoryCueNumber === 0
      ? copy.memory.cuesZeroSuffix
      : copy.memory.cuesSuffix;
  const memoryContinuityRows = [
    {
      token: "S",
      title: copy.memory.semanticMemoryTitle,
      detail: copy.memory.semanticMemoryDetail,
      value: `${memoryPatternCount} ${memoryPatternUnit}`,
    },
    {
      token: "A",
      title: copy.memory.affectiveMemoryTitle,
      detail: copy.memory.affectiveMemoryDetail,
      value: `${memoryInsightCount} ${memoryInsightUnit}`,
    },
    {
      token: "P",
      title: copy.memory.preferencesMemoryTitle,
      detail: copy.memory.preferencesMemoryDetail,
      value: `${memoryCueCount} ${memoryCueUnit}`,
    },
  ];
  const memorySignalCards = [
    {
      title: copy.memory.conversationContinuityTitle,
      body:
        recentChannelsLabel === copy.common.noData
          ? copy.memory.memorySourceEmptyBody
          : `${copy.memory.recentChannelsPrefix} ${recentChannelsLabel}.`,
      meta: copy.memory.currentContext,
    },
    {
      title: copy.memory.reflectionBridgeTitle,
      body:
        stringValue(knowledgeSummary?.affective_conclusion_count, "0") === "0"
          ? copy.memory.reflectionBridgeEmptyBody
          : copy.memory.reflectionBridgeReadyBody,
      meta: copy.memory.slowLearning,
    },
    {
      title: copy.memory.preferencePostureTitle,
      body:
        stringValue(preferenceSummary?.learned_preference_count, "0") === "0"
          ? copy.memory.preferencePostureEmptyBody
          : copy.memory.preferencePostureReadyBody,
      meta: copy.memory.personalization,
    },
  ];
  const reflectionInsightCount = stringValue(knowledgeSummary?.affective_conclusion_count, "0");
  const reflectionInsightNumber = Number(reflectionInsightCount);
  const reflectionInsightUnit = reflectionInsightNumber === 1
    ? copy.reflections.insightSingularSuffix
    : reflectionInsightNumber === 0
      ? copy.reflections.insightsZeroSuffix
      : copy.reflections.insightsSuffix;
  const reflectionPendingCount = stringValue(planningSummary?.active_goal_count, "0") === "0"
    ? "1"
    : stringValue(planningSummary?.active_goal_count, "0");
  const reflectionThreadUnit = Number(reflectionPendingCount) === 1
    ? copy.reflections.threadSingularSuffix
    : copy.reflections.threadsSuffix;
  const reflectionStatCards = [
    {
      label: copy.reflections.integrated,
      value: reflectionInsightCount,
      detail: copy.reflections.integratedDetail,
    },
    {
      label: copy.reflections.pending,
      value: `${reflectionPendingCount} ${reflectionThreadUnit}`,
      detail: copy.reflections.pendingDetail,
    },
    {
      label: copy.reflections.cadence,
      value: reflectionInsightCount === "0" ? copy.reflections.readyValue : copy.reflections.activeValue,
      detail: copy.reflections.cadenceDetail,
    },
  ];
  const reflectionFlowRows = [
    {
      token: "N",
      title: copy.reflections.noticeTitle,
      detail: copy.reflections.noticeDetail,
      value: recentChannelsLabel === copy.common.noData ? copy.reflections.webValue : recentChannelsLabel,
    },
    {
      token: "I",
      title: copy.reflections.integrateTitle,
      detail: copy.reflections.integrateDetail,
      value: `${reflectionInsightCount} ${reflectionInsightUnit}`,
    },
    {
      token: "R",
      title: copy.reflections.returnTitle,
      detail: copy.reflections.returnDetail,
      value: copy.reflections.readyShort,
    },
  ];
  const reflectionPromptCards = [
    {
      title: copy.reflections.whatChangedTitle,
      body: copy.reflections.whatChangedBody,
    },
    {
      title: copy.reflections.whatQuietTitle,
      body: copy.reflections.whatQuietBody,
    },
    {
      title: copy.reflections.whatActionTitle,
      body: copy.reflections.whatActionBody,
    },
  ];
  const plansStatCards = [
    {
      label: copy.plans.activeGoals,
      value: stringValue(planningSummary?.active_goal_count, "0"),
      detail: copy.plans.activeGoalsDetail,
    },
    {
      label: copy.plans.activeTasks,
      value: stringValue(planningSummary?.active_task_count, "0"),
      detail: copy.plans.activeTasksDetail,
    },
    {
      label: copy.plans.posture,
      value: stringValue(planningSummary?.active_goal_count, "0") === "0" ? copy.plans.readyValue : copy.plans.alignedValue,
      detail: copy.plans.postureDetail,
    },
  ];
  const plansGoalCount = stringValue(planningSummary?.active_goal_count, "0");
  const plansTaskCount = stringValue(planningSummary?.active_task_count, "0");
  const plansGoalUnit = Number(plansGoalCount) === 1 ? copy.plans.goalSingularSuffix : copy.plans.goalsSuffix;
  const plansTaskUnit = Number(plansTaskCount) === 1 ? copy.plans.taskSingularSuffix : copy.plans.tasksSuffix;
  const plansFlowRows = [
    {
      token: "G",
      title: copy.plans.gatherTitle,
      detail: copy.plans.gatherDetail,
      value: `${plansGoalCount} ${plansGoalUnit}`,
    },
    {
      token: "S",
      title: copy.plans.sequenceTitle,
      detail: copy.plans.sequenceDetail,
      value: `${plansTaskCount} ${plansTaskUnit}`,
    },
    {
      token: "B",
      title: copy.plans.boundTitle,
      detail: copy.plans.boundDetail,
      value: copy.plans.safeValue,
    },
  ];
  const plansNextSteps = [
    {
      title: copy.plans.clarifyOutcomeTitle,
      body: stringValue(planningSummary?.active_goal_count, "0") === "0"
        ? copy.plans.clarifyOutcomeEmptyBody
        : copy.plans.clarifyOutcomeReadyBody,
    },
    {
      title: copy.plans.convertSequenceTitle,
      body: stringValue(planningSummary?.active_task_count, "0") === "0"
        ? copy.plans.convertSequenceEmptyBody
        : copy.plans.convertSequenceReadyBody,
    },
    {
      title: copy.plans.returnChatTitle,
      body: copy.plans.returnChatBody,
    },
  ];
  const plansContextCards = [
    { title: copy.plans.directionTitle, body: copy.plans.directionBody },
    { title: copy.plans.cadenceTitle, body: copy.plans.cadenceBody },
    { title: copy.plans.boundaryTitle, body: copy.plans.boundaryBody },
  ];
  const goalsStatCards = [
    {
      label: copy.goals.active,
      value: stringValue(planningSummary?.active_goal_count, "0"),
      detail: copy.goals.activeDetail,
    },
    {
      label: copy.goals.progress,
      value: stringValue(planningSummary?.active_goal_count, "0") === "0" ? copy.goals.openValue : copy.goals.movingValue,
      detail: copy.goals.progressDetail,
    },
    {
      label: copy.goals.focus,
      value: `${activeGoalCount}`,
      detail: copy.goals.dailyRhythmTitle ?? copy.goals.focusFallback,
    },
  ];
  const goalsCount = stringValue(planningSummary?.active_goal_count, "0");
  const goalsUnit = Number(goalsCount) === 1 ? copy.goals.goalSingularSuffix : copy.goals.goalsSuffix;
  const goalHorizonBaseRows = [
    { title: copy.goals.dailyRhythmTitle, value: "72%" },
    { title: copy.goals.channelContinuityTitle, value: "58%" },
    { title: copy.goals.reusableInsightsTitle, value: "41%" },
    { title: copy.goals.embodiedPersonalityTitle, value: "33%" },
  ];
  const goalHorizonRows = goalHorizonBaseRows.map((goal, index) => ({
    ...goal,
    token: String(index + 1),
    detail:
      index === 0
        ? copy.goals.strongestCandidateDetail
        : index === 1
          ? copy.goals.continuitySurfacesDetail
          : index === 2
            ? copy.goals.reusableLearningDetail
            : copy.goals.embodiedDirectionDetail,
  }));
  const goalSignalCards = [
    {
      title: copy.goals.directionTitle,
      body:
        stringValue(planningSummary?.active_goal_count, "0") === "0"
          ? copy.goals.directionEmptyBody
          : `${goalsCount} ${goalsUnit} ${
              Number(goalsCount) === 1 ? copy.goals.directionReadySingularBody : copy.goals.directionReadyPluralBody
            }`,
    },
    {
      title: copy.goals.momentumTitle,
      body: copy.goals.momentumBody,
    },
    {
      title: copy.goals.focusBoundaryTitle,
      body: copy.goals.focusBoundaryBody,
    },
  ];
  const goalGuidanceCards = [
    { title: copy.goals.nextFocusTitle, body: copy.goals.nextFocusBody },
    { title: copy.goals.planningBridgeTitle, body: copy.goals.planningBridgeBody },
    { title: copy.goals.reflectionBridgeTitle, body: copy.goals.reflectionBridgeBody },
  ];
  const insightPatternCount = stringValue(knowledgeSummary?.semantic_conclusion_count, "0");
  const insightSignalCount = stringValue(knowledgeSummary?.affective_conclusion_count, "0");
  const insightGoalCount = stringValue(planningSummary?.active_goal_count, "0");
  const insightPatternUnit =
    Number(insightPatternCount) === 1 ? copy.insights.patternSingularSuffix : copy.insights.patternsSuffix;
  const insightSignalUnit =
    Number(insightSignalCount) === 1 ? copy.insights.signalSingularSuffix : copy.insights.signalsSuffix;
  const insightGoalUnit =
    Number(insightGoalCount) === 1 ? copy.insights.goalSingularSuffix : copy.insights.goalsSuffix;
  const insightStatCards = [
    {
      label: copy.insights.patterns,
      value: insightPatternCount,
      detail: copy.insights.patternsDetail,
    },
    {
      label: copy.insights.signals,
      value: insightSignalCount,
      detail: copy.insights.signalsDetail,
    },
    {
      label: copy.insights.guidance,
      value: "4",
      detail: copy.insights.guidanceDetail,
    },
  ];
  const insightSignalRows = [
    {
      token: "S",
      title: copy.insights.semanticPatternTitle,
      detail: copy.insights.semanticPatternDetail,
      value: `${insightPatternCount} ${insightPatternUnit}`,
    },
    {
      token: "A",
      title: copy.insights.affectiveTextureTitle,
      detail: copy.insights.affectiveTextureDetail,
      value: `${insightSignalCount} ${insightSignalUnit}`,
    },
    {
      token: "P",
      title: copy.insights.planningRelevanceTitle,
      detail: copy.insights.planningRelevanceDetail,
      value: `${insightGoalCount} ${insightGoalUnit}`,
    },
    {
      token: "R",
      title: copy.insights.reflectionReturnTitle,
      detail: copy.insights.reflectionReturnDetail,
      value: copy.insights.readyValue,
    },
  ];
  const insightClarityCards = [
    {
      title: copy.insights.signalDensityTitle,
      body:
        Number(stringValue(knowledgeSummary?.semantic_conclusion_count, "0")) > 0
          ? copy.insights.signalDensityReadyBody
          : copy.insights.signalDensityEmptyBody,
    },
    {
      title: copy.insights.interpretationBoundaryTitle,
      body: copy.insights.interpretationBoundaryBody,
    },
    {
      title: copy.insights.nextUsefulMoveTitle,
      body:
        stringValue(planningSummary?.active_goal_count, "0") === "0"
          ? copy.insights.deepWorkNoGoalBody
          : copy.insights.deepWorkActiveBody,
    },
  ];
  const insightGuidanceCards = [
    {
      title: copy.insights.deepWorkTitle,
      body:
        stringValue(planningSummary?.active_goal_count, "0") === "0"
          ? copy.insights.deepWorkNoGoalBody
          : copy.insights.deepWorkActiveBody,
    },
    {
      title: copy.insights.momentumTitle,
      body: latestUserMessage
        ? `${copy.insights.momentumThreadPrefix} ${truncateText(latestUserMessage, 72)}`
        : copy.insights.momentumNoThreadBody,
    },
    {
      title: copy.insights.reflectTitle,
      body:
        stringValue(knowledgeSummary?.affective_conclusion_count, "0") === "0"
          ? copy.insights.reflectNoSignalBody
          : copy.insights.reflectReadyBody,
    },
    {
      title: copy.insights.connectionTitle,
      body:
        recentChannelsLabel === copy.common.noData
          ? copy.insights.connectionNoChannelBody
          : `${copy.insights.connectionLivePrefix} ${recentChannelsLabel}.`,
    },
  ];
  const proactiveEnabled = Boolean(me?.settings.proactive_opt_in);
  const schedulerSummary = healthSnapshot?.proactive?.scheduler_tick_summary ?? {};
  const automationStatCards = [
    {
      label: copy.automations.proactive,
      value: proactiveEnabled ? copy.common.on : copy.common.off,
      detail: proactiveEnabled ? copy.automations.proactiveOnDetail : copy.automations.proactiveOffDetail,
    },
    {
      label: copy.automations.queue,
      value: `${numberValue(healthSnapshot?.attention?.pending)} ${copy.automations.pendingValue}`,
      detail: copy.automations.queueDetail,
    },
    {
      label: copy.automations.scheduler,
      value: healthLoading
        ? copy.automations.checkingValue
        : healthError
          ? copy.automations.unknownValue
          : healthSnapshot?.status ?? copy.automations.readyValue,
      detail: healthError ?? copy.automations.schedulerDetail,
    },
  ];
  const automationFlowRows = [
    {
      token: "P",
      title: copy.automations.preferenceGateTitle,
      detail: proactiveEnabled ? copy.automations.preferenceOnDetail : copy.automations.preferenceOffDetail,
      value: proactiveEnabled ? copy.common.on : copy.common.off,
    },
    {
      token: "Q",
      title: copy.automations.attentionQueueTitle,
      detail: copy.automations.attentionQueueDetail,
      value: `${numberValue(healthSnapshot?.attention?.pending)} ${copy.automations.pendingValue}`,
    },
    {
      token: "S",
      title: copy.automations.schedulerTickTitle,
      detail: Object.keys(schedulerSummary).length
        ? copy.automations.schedulerTickPresentDetail
        : copy.automations.schedulerTickQuietDetail,
      value: Object.keys(schedulerSummary).length ? copy.automations.presentValue : copy.automations.quietValue,
    },
    {
      token: "B",
      title: copy.automations.actionBoundaryTitle,
      detail: copy.automations.actionBoundaryDetail,
      value: copy.automations.readOnlyValue,
    },
  ];
  const automationBoundaryCards = [
    {
      title: copy.automations.noHiddenExecutionTitle,
      body: copy.automations.noHiddenExecutionBody,
    },
    {
      title: copy.automations.settingsSwitchTitle,
      body: copy.automations.settingsSwitchBody,
    },
    {
      title: copy.automations.healthBackedTitle,
      body: healthError ? copy.automations.healthUnavailableBody : copy.automations.healthBackedBody,
    },
  ];
  const automationHealthRows = [
    {
      title: copy.automations.pending,
      body: `${numberValue(healthSnapshot?.attention?.pending)} ${copy.automations.attentionItems}`,
    },
    {
      title: copy.automations.claimed,
      body: `${numberValue(healthSnapshot?.attention?.claimed)} ${copy.automations.claimedItems}`,
    },
    {
      title: copy.automations.answered,
      body: `${numberValue(healthSnapshot?.attention?.answered)} ${copy.automations.answeredItems}`,
    },
  ];
  const integrationItems = toolsOverview?.groups.flatMap((group) => group.items) ?? [];
  const integrationReadyCount = toolsOverview?.summary.provider_ready_count ?? 0;
  const integrationBlockedCount = toolsOverview?.summary.provider_blocked_count ?? 0;
  const integrationLinkRequiredCount = toolsOverview?.summary.link_required_count ?? 0;
  const integrationStatCards = [
    {
      label: copy.integrations.ready,
      value: String(integrationReadyCount),
      detail: copy.integrations.readyDetail,
    },
    {
      label: copy.integrations.linked,
      value: String(integrationItems.filter((item) => item.enabled).length),
      detail: copy.integrations.linkedDetail,
    },
    {
      label: copy.integrations.attention,
      value: String(integrationBlockedCount + integrationLinkRequiredCount),
      detail: copy.integrations.attentionDetail,
    },
  ];
  const integrationProviderRows = integrationItems.slice(0, 5).map((item) => ({
    token: item.label.slice(0, 1).toUpperCase(),
    title: item.label,
    detail: item.status_reason || item.description,
    value: item.link_required ? copy.integrations.linkValue : item.provider.ready ? copy.integrations.readyValue : copy.integrations.blockedValue,
  }));
  const integrationBoundaryCards = [
    {
      title: copy.integrations.toolsOwnTogglesTitle,
      body: copy.integrations.toolsOwnTogglesBody,
    },
    {
      title: copy.integrations.linksStayExplicitTitle,
      body: copy.integrations.linksStayExplicitBody,
    },
    {
      title: copy.integrations.noSilentProviderAccessTitle,
      body: copy.integrations.noSilentProviderAccessBody,
    },
  ];
  const chatSuggestedActions = [
    { title: "Convert this plan to tasks", body: "Create actionable items in your task list." },
    { title: "Schedule focus blocks", body: "Add deep work blocks to calendar." },
    { title: "Set daily intention", body: "Define the main outcome for today." },
  ];
  const chatProactiveCheckIn = {
    title: "Tomorrow 09:00",
    body: "Morning alignment",
    action: "Edit",
  };
  const chatPrimarySuggestedAction = chatSuggestedActions[0];
  const chatCognitiveBelt: ChatCognitiveBeltItem[] = [
    {
      key: "intent",
      eyebrow: "Current intent",
      title: chatIntentCard.title,
      body: chatIntentCard.body,
      meta: chatIntentCard.status,
      tone: "lead",
    },
    {
      key: "motivation",
      eyebrow: "Motivation",
      title: "Aligned",
      body: chatMotivationMetrics.map((metric) => `${metric.label} ${metric.value}`).join(" / "),
      meta: chatIntentCard.emphasis,
      tone: "soft",
    },
    {
      key: "goal",
      eyebrow: "Active goal",
      title: chatGoalCard.title,
      body: chatGoalCard.body,
      meta: chatGoalCard.progress,
      tone: "progress",
    },
    {
      key: "memory",
      eyebrow: "Memory",
      title: chatRelatedMemory[0]?.title ?? "Memory ready",
      body: chatRelatedMemory[0]?.body ?? "Relevant cues stay nearby.",
      meta: chatRelatedMemory[0]?.when ?? "Recent",
      tone: "soft",
    },
    {
      key: "action",
      eyebrow: "Suggested action",
      title: chatPrimarySuggestedAction?.title ?? "Refine the plan",
      body: chatPrimarySuggestedAction?.body ?? "Clarify the next step.",
      meta: "Next",
      tone: "lead",
    },
    {
      key: "checkin",
      eyebrow: "Next check-in",
      title: chatProactiveCheckIn.title,
      body: chatProactiveCheckIn.body,
      meta: chatProactiveCheckIn.action,
      tone: "soft",
    },
  ];
  const chatActiveSummary = "Live";
  const personalityPreviewCallouts = [
    {
      key: "identity",
      className: "aion-personality-callout aion-personality-callout-identity",
      eyebrow: "Identity",
      title: "Stable",
      body: currentUserLabel,
    },
    {
      key: "knowledge",
      className: "aion-personality-callout aion-personality-callout-knowledge",
      eyebrow: "Learned knowledge",
      title: `${stringValue(knowledgeSummary?.semantic_conclusion_count, "0")} patterns`,
      body: "Books, concepts, and reusable insights.",
    },
    {
      key: "planning",
      className: "aion-personality-callout aion-personality-callout-planning",
      eyebrow: "Planning",
      title: `${stringValue(planningSummary?.active_goal_count, "0")} active goals`,
      body: "Current focus and next milestones.",
    },
    {
      key: "skills",
      className: "aion-personality-callout aion-personality-callout-skills",
      eyebrow: "Skills",
      title: skillCatalogCount > 0 ? `${skillCatalogCount} catalogued` : "Catalog pending",
      body: workPartnerRoleAvailable
        ? "Visible capabilities from the runtime catalog."
        : "Runtime catalog is waiting for available role-skill data.",
    },
    {
      key: "role",
      className: "aion-personality-role-card",
      eyebrow: "Role",
      title: workPartnerRoleAvailable ? "Work partner ready" : "Adaptive role",
      body: preferredRolePresent ? "Preferred role is learned." : "Role posture stays adaptive until preferences grow.",
    },
  ];
  const personalityTimelineRows = [
    {
      token: "M",
      title: "Memory",
      detail: "Experiences and stored recall",
      value: `${stringValue(knowledgeSummary?.semantic_conclusion_count, "0")} notes`,
    },
    {
      token: "R",
      title: "Reflection",
      detail: "Insights and slower learning",
      value: `${stringValue(knowledgeSummary?.affective_conclusion_count, "0")} insights`,
    },
    {
      token: "C",
      title: "Context",
      detail: "Environment and active inputs",
      value: recentChannelsLabel,
    },
    {
      token: "M",
      title: "Motivation",
      detail: "Drivers, values, and current goals",
      value: `${stringValue(planningSummary?.active_goal_count, "0")} aligned`,
    },
    {
      token: "A",
      title: "Action",
      detail: "Tasks and execution posture",
      value: `${stringValue(planningSummary?.active_task_count, "0")} active`,
    },
    {
      token: "E",
      title: "Expression",
      detail: "Communication style and language",
      value: stringValue(me?.settings.preferred_language, "adaptive"),
    },
  ];
  const personalityConsciousSignals = [
    { label: "Focus", value: activeGoalCount > 0 ? `${activeGoalCount} goals` : "No goals" },
    { label: "Clarity", value: claritySignalCount > 0 ? `${claritySignalCount} signals` : "No signals" },
    { label: "Energy", value: pendingProposalCount > 0 ? `${pendingProposalCount} proposals` : "No proposals" },
    { label: "Load", value: `${activeTaskCount} tasks / ${blockedTaskCount} blocked` },
  ];
  const personalitySubconsciousSignals = [
    { label: "Patterns", value: `${semanticConclusionCount}` },
    { label: "Associations", value: `${affectiveConclusionCount}` },
    { label: "Preferences", value: `${learnedPreferenceCount}` },
    { label: "Intuition", value: intuitiveSignalCount > 0 ? `${intuitiveSignalCount} signals` : "No signals" },
  ];
  const personalityRecentActivity = recentActivityRows(
    overview,
    resolvedUiLanguage,
    copy.common.recentActivity,
    copy.common.unknownTime,
  );
  const publicNavLabels = {
    en: ["Features", "How it works", "Privacy", "Resources"],
    pl: ["Funkcje", "Jak to działa", "Prywatność", "Zasoby"],
    de: ["Funktionen", "So funktioniert es", "Privatsphare", "Ressourcen"],
  } satisfies Record<ResolvedUiLanguageCode, string[]>;
  const publicHeroCards = {
    en: [
      { title: "Memory", body: "Everything meaningful stays visible." },
      { title: "Cognition", body: "Understand context before acting." },
      { title: "Planning", body: "Turn goals into calm next steps." },
      { title: "Reflection", body: "Learn and evolve over time." },
    ],
    pl: [
      { title: "Pamięć", body: "To, co ważne, pozostaje widoczne." },
      { title: "Poznanie", body: "Najpierw zrozum kontekst, potem działaj." },
      { title: "Planowanie", body: "Zamieniaj cele w spokojne kolejne kroki." },
      { title: "Refleksja", body: "Ucz się i rozwijaj w czasie." },
    ],
    de: [
      { title: "Gedachtnis", body: "Wichtiges bleibt sichtbar." },
      { title: "Kognition", body: "Kontext verstehen, bevor gehandelt wird." },
      { title: "Planung", body: "Ziele in ruhige nachste Schritte uberfuhren." },
      { title: "Reflexion", body: "Lernen und sich mit der Zeit weiterentwickeln." },
    ],
  } satisfies Record<ResolvedUiLanguageCode, Array<{ title: string; body: string }>>;
  const publicFeaturePillars = {
    en: [
      { icon: "understanding", title: "Deep understanding", body: "Understands your state and pace." },
      { icon: "memory", title: "Memory that grows", body: "Important insights stay available." },
      { icon: "clarity", title: "Clarity and focus", body: "Helps you decide with intention." },
      { icon: "planning", title: "Plans and execution", body: "Turns ideas into next steps." },
      { icon: "companion", title: "Companion for life", body: "Present in work and growth." },
    ],
    pl: [
      { icon: "understanding", title: "Głębokie zrozumienie", body: "Rozumie Twój stan i rytm." },
      { icon: "memory", title: "Pamięć, która rośnie", body: "Ważne wnioski zostają i wracają." },
      { icon: "clarity", title: "Jasność i skupienie", body: "Pomaga wybierać z intencją." },
      { icon: "planning", title: "Plan i wykonanie", body: "Zamienia pomysły w kolejne kroki." },
      { icon: "companion", title: "Towarzysz na co dzień", body: "Obecny w pracy i rozwoju." },
    ],
    de: [
      { icon: "understanding", title: "Tiefes Verstehen", body: "Versteht Zustand und Tempo." },
      { icon: "memory", title: "Wachsende Erinnerung", body: "Wichtige Einsichten bleiben nah." },
      { icon: "clarity", title: "Klarheit und Fokus", body: "Hilft bewusst zu entscheiden." },
      { icon: "planning", title: "Plan und Ausfuhrung", body: "Macht aus Ideen nachste Schritte." },
      { icon: "companion", title: "Begleiter im Alltag", body: "Prasent in Arbeit und Wachstum." },
    ],
  } satisfies Record<ResolvedUiLanguageCode, Array<{ icon: string; title: string; body: string }>>;
  const publicTrustBandItems = {
    en: [
      { icon: "privacy", label: "Privacy first" },
      { icon: "encryption", label: "End-to-end encryption" },
      { icon: "storage", label: "Local-first storage" },
      { icon: "ownership", label: "You own your data" },
      { icon: "clarity", label: "Transparent by default" },
    ],
    pl: [
      { icon: "privacy", label: "Prywatność przede wszystkim" },
      { icon: "encryption", label: "Szyfrowanie end-to-end" },
      { icon: "storage", label: "Przechowywanie local-first" },
      { icon: "ownership", label: "To Ty kontrolujesz dane" },
      { icon: "clarity", label: "Przejrzystość domyślnie" },
    ],
    de: [
      { icon: "privacy", label: "Privacy first" },
      { icon: "encryption", label: "Ende-zu-Ende-Verschlusselung" },
      { icon: "storage", label: "Local-first Speicher" },
      { icon: "ownership", label: "Deine Daten gehoren dir" },
      { icon: "clarity", label: "Transparent von Beginn an" },
    ],
  } satisfies Record<ResolvedUiLanguageCode, Array<{ icon: string; label: string }>>;
  const publicProofLine = {
    en: "Trusted by thoughtful people worldwide",
    pl: "Zaufany przez uważnych ludzi na całym świecie",
    de: "Vertraut von achtsamen Menschen weltweit",
  } satisfies Record<ResolvedUiLanguageCode, string>;
  const publicHeroTitle = {
    en: "Meet Aviary",
    pl: "Poznaj Aviary",
    de: "Lerne Aviary kennen",
  } satisfies Record<ResolvedUiLanguageCode, string>;
  const publicHeroBody = {
    en: "Your conscious companion for clarity, growth, and purpose.",
    pl: "Twój świadomy towarzysz dla jasności, rozwoju i celu.",
    de: "Dein bewusster Begleiter fur Klarheit, Wachstum und Sinn.",
  } satisfies Record<ResolvedUiLanguageCode, string>;
  const publicProofBridgeLead = {
    en: "Powerful by design. Personal by nature.",
    pl: "Mocą projektu. Osobiste z natury.",
    de: "Kraftvoll im Design. Personlich im Wesen.",
  } satisfies Record<ResolvedUiLanguageCode, string>;
  const publicSessionIntro = {
    en: "Sign in or create an account to continue with memory, clarity, and calm guidance.",
    pl: "Zaloguj się lub utwórz konto, aby wrócić do pamięci, jasności i spokojnego prowadzenia.",
    de: "Melde dich an oder erstelle ein Konto, um mit Erinnerung, Klarheit und ruhiger Begleitung weiterzumachen.",
  } satisfies Record<ResolvedUiLanguageCode, string>;
  const publicHomeSurface = {
    nav: publicNavLabels[resolvedUiLanguage],
    heroCards: publicHeroCards[resolvedUiLanguage],
    pillars: publicFeaturePillars[resolvedUiLanguage],
    trustBand: publicTrustBandItems[resolvedUiLanguage],
    proofLine: publicProofLine[resolvedUiLanguage],
    heroTitle: publicHeroTitle[resolvedUiLanguage],
    heroBody: publicHeroBody[resolvedUiLanguage],
    proofBridgeLead: publicProofBridgeLead[resolvedUiLanguage],
    sessionIntro: publicSessionIntro[resolvedUiLanguage],
  };
  const isPublicRoute = route === "/login";

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

  function openAuthModal(mode: AuthMode) {
    setAuthMode(mode);
    setError(null);
    setAuthModalOpen(true);
    navigatePublicEntry("/login");
  }

  function closeAuthModal() {
    setAuthModalOpen(false);
    setError(null);
    if (!me) {
      navigatePublicEntry("/");
    }
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
        utcOffset: normalizeUtcOffset(snapshot.settings.utc_offset),
        proactiveOptIn: Boolean(snapshot.settings.proactive_opt_in),
      });
      setAuthForm({ email: authForm.email, password: "", displayName: authForm.displayName });
      setToast(authMode === "login" ? "You're back in." : "Your account is ready.");
      setAuthModalOpen(false);
      startTransition(() => {
        navigate("/dashboard");
        setRoute("/dashboard");
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
      setLocalTranscriptItems([]);
      setToast("You have been signed out.");
      setAuthModalOpen(true);
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
      setLocalTranscriptItems([]);
      setResetConfirmationText("");
      setToast(`${copy.settings.resetSuccess} ${summary.total_deleted_records} items cleared.`);
      setAuthModalOpen(true);
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
        utc_offset: settingsDraft.utcOffset,
        proactive_opt_in: settingsDraft.proactiveOptIn,
      });
      const freshMe = await refreshMe();
      setSettingsDraft({
        displayName: freshMe.user.display_name ?? "",
        uiLanguage: normalizeUiLanguage(nextSettings.ui_language),
        utcOffset: normalizeUtcOffset(nextSettings.utc_offset),
        proactiveOptIn: Boolean(nextSettings.proactive_opt_in),
      });
      setToast("Your changes have been saved.");
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

    const submittedAt = new Date().toISOString();
    const localEventId = `local:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    const localUserMessage: AppChatHistoryEntry = {
      message_id: `${localEventId}:user`,
      event_id: localEventId,
      role: "user",
      text,
      channel: "app",
      timestamp: submittedAt,
      metadata: {
        delivery_state: "sending",
      },
    };

    pendingAssistantScrollIdRef.current = localUserMessage.message_id;
    setLocalTranscriptItems((items) => [...items, localUserMessage]);
    setSendingMessage(true);
    setError(null);
    setChatText("");

    try {
      const reply = await api.sendChatMessage(text);
      const deliveredUserMessage: AppChatHistoryEntry = {
        ...localUserMessage,
        message_id: `${reply.event_id}:user`,
        event_id: reply.event_id,
        metadata: {
          ...(localUserMessage.metadata ?? {}),
          delivery_state: "delivered",
        },
      };
      const localAssistantMessage: AppChatHistoryEntry = {
        message_id: `${reply.event_id}:assistant`,
        event_id: reply.event_id,
        role: "assistant",
        text: reply.reply.message,
        channel: reply.reply.channel,
        timestamp: new Date().toISOString(),
        metadata: {
          language: reply.reply.language,
          tone: reply.reply.tone,
          runtime_role: reply.runtime?.role ?? null,
          action_status: reply.runtime?.action_status ?? null,
        },
      };
      pendingAssistantScrollIdRef.current = localAssistantMessage.message_id;
      setLocalTranscriptItems((items) => [
        ...items.map((item) =>
          item.message_id === localUserMessage.message_id ? deliveredUserMessage : item,
        ),
        localAssistantMessage,
      ]);
      const freshHistory = await api.getChatHistory();
      setHistory(freshHistory.items);
      setLocalTranscriptItems((items) => reconcileLocalTranscriptItems(items, freshHistory.items));
    } catch (caught) {
      setLocalTranscriptItems((items) =>
        items.map((item) =>
          item.message_id === localUserMessage.message_id
            ? {
                ...item,
                metadata: {
                  ...(item.metadata ?? {}),
                  delivery_state: "failed",
                },
              }
            : item,
        ),
      );
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
      setToast(copy.tools.saveSuccess);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.tools.saveError);
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
      setToast(copy.tools.telegramLinkReady);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : copy.tools.telegramStartError);
    } finally {
      setTelegramLinkBusy(false);
    }
  }

  if (initializing && !isPublicRoute) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100 px-6 text-base-content">
        <div className="w-full max-w-md">
          <StatePanel
            tone="neutral"
            title={copy.common.stateLoadingTitle}
            body="Checking your session and opening your workspace."
            loading
          />
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="aion-public-shell min-h-screen text-base-content">
        <div className="aion-public-shell-frame">
          <section className="aion-public-window">
            <div className="aion-public-canonical-tag" aria-hidden="true">
              <span>1</span>
              <strong>Landing Page</strong>
            </div>
            <div className="aion-public-window-body">
              <header className="aion-public-nav">
                <AviaryWordmark compact />
                <nav className="aion-public-nav-links" aria-label="Public navigation">
                  {publicHomeSurface.nav.map((item) => (
                    <a key={item} className="aion-public-nav-link" href="#aviary-home">
                      {item}
                    </a>
                  ))}
                </nav>
                <div className="aion-public-nav-actions">
                  <button
                    className="aion-public-nav-button aion-public-nav-button-ghost"
                    onClick={() => openAuthModal("login")}
                    type="button"
                  >
                    {copy.auth.tabsLogin}
                  </button>
                  <button
                    className="aion-public-nav-button"
                    onClick={() => openAuthModal("register")}
                    type="button"
                  >
                    {copy.auth.tabsRegister}
                  </button>
                </div>
              </header>

              <main className="aion-public-home" id="aviary-home">
                <section className="aion-public-hero">
                  <div className="aion-public-hero-stage">
                    <MotifFigurePanel
                      artSrc={LANDING_HERO_ART_SRC}
                      highlights={publicHomeSurface.heroCards.map((card) => ({
                        label: card.title,
                        value: card.body,
                      }))}
                      overlay={
                        <div className="aion-public-hero-copy">
                          <h1 className="aion-public-hero-title">{publicHomeSurface.heroTitle}</h1>
                          <p className="aion-public-hero-body">{publicHomeSurface.heroBody}</p>
                          <div className="aion-public-cta-row">
                            <button
                              className="aion-public-cta aion-public-cta-primary"
                              onClick={() => openAuthModal("register")}
                              type="button"
                            >
                              {copy.auth.createAccount}
                            </button>
                            <button
                              className="aion-public-cta aion-public-cta-secondary"
                              onClick={() => openAuthModal("login")}
                              type="button"
                            >
                              {copy.auth.enterWorkspace}
                            </button>
                          </div>
                          <div className="aion-public-micro-proof-row">
                            {publicHomeSurface.trustBand.slice(0, 3).map((item) => (
                              <span key={item.label} className="aion-public-micro-proof-item">
                                <span className="aion-public-micro-proof-icon" aria-hidden="true">
                                  <PublicGlyph kind={item.icon} />
                                </span>
                                {item.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      }
                      scenic
                    />
                  </div>
                </section>

                <section className="aion-public-feature-bridge aion-panel-soft">
                  <div className="aion-public-feature-strip">
                    {publicHomeSurface.pillars.map((pillar) => (
                      <article key={pillar.title} className="aion-public-feature-card">
                        <span className="aion-public-feature-icon" aria-hidden="true">
                          <PublicGlyph kind={pillar.icon} />
                        </span>
                        <p className="aion-public-feature-title">{pillar.title}</p>
                        <p className="aion-public-feature-body">{pillar.body}</p>
                      </article>
                    ))}
                  </div>
                  <div className="aion-public-proof-bridge">
                    <div className="aion-public-proof-bridge-copy">
                      <p className="aion-public-section-label">{publicHomeSurface.proofLine}</p>
                      <p className="aion-public-proof-bridge-body">
                        {publicHomeSurface.proofBridgeLead}
                      </p>
                    </div>
                    <div className="aion-public-proof-bridge-list">
                      {publicHomeSurface.trustBand.slice(0, 3).map((item) => (
                        <span key={item.label} className="aion-public-proof-bridge-pill">
                          <span className="aion-public-proof-bridge-pill-icon" aria-hidden="true">
                            <PublicGlyph kind={item.icon} />
                          </span>
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>

                <footer className="aion-public-trust-band">
                  {publicHomeSurface.trustBand.map((item) => (
                    <article key={item.label} className="aion-public-trust-item">
                      <span className="aion-public-trust-icon" aria-hidden="true">
                        <PublicGlyph kind={item.icon} />
                      </span>
                      <p>{item.label}</p>
                    </article>
                  ))}
                </footer>
              </main>

              {authModalOpen ? (
                <div
                  className="aion-public-auth-modal-backdrop"
                  onClick={closeAuthModal}
                  role="presentation"
                >
                  <section
                    aria-labelledby="aviary-auth-title"
                    aria-modal="true"
                    className="aion-public-auth-modal-card aion-panel-soft"
                    id="aviary-auth"
                    onClick={(event) => event.stopPropagation()}
                    role="dialog"
                  >
                    <div className="aion-public-auth-modal-header">
                      <div>
                        <p className="aion-public-section-label">{copy.auth.sessionEntry}</p>
                        <h2 className="font-display text-3xl text-base-900" id="aviary-auth-title">
                          {authMode === "login" ? copy.auth.login : copy.auth.register}
                        </h2>
                      </div>
                      <button
                        aria-label="Close"
                        className="aion-public-auth-close"
                        onClick={closeAuthModal}
                        type="button"
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <div className="aion-public-auth-tabs" role="tablist" aria-label={copy.auth.sessionEntry}>
                      <button
                        aria-selected={authMode === "login"}
                        className={`aion-public-auth-tab ${authMode === "login" ? "is-active" : ""}`}
                        onClick={() => setAuthMode("login")}
                        type="button"
                      >
                        {copy.auth.tabsLogin}
                      </button>
                      <button
                        aria-selected={authMode === "register"}
                        className={`aion-public-auth-tab ${authMode === "register" ? "is-active" : ""}`}
                        onClick={() => setAuthMode("register")}
                        type="button"
                      >
                        {copy.auth.tabsRegister}
                      </button>
                    </div>

                    <p className="aion-public-auth-intro">{publicHomeSurface.sessionIntro}</p>

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
                            placeholder="How the personality should address you"
                          />
                        </label>
                      ) : null}

                      <button className="btn btn-primary btn-block" disabled={authBusy} type="submit">
                        {authBusy
                          ? copy.common.loading
                          : authMode === "login"
                            ? copy.auth.enterWorkspace
                            : copy.auth.createAccount}
                      </button>
                    </form>

                    {errorBody ? (
                      <div className="mt-4">
                        <FeedbackBanner
                          tone="error"
                          title={copy.common.stateErrorTitle}
                          body={errorBody}
                          detail={errorDetail}
                          detailLabel={copy.common.stateDetailLabel}
                        />
                      </div>
                    ) : null}
                  </section>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="aion-shell min-h-screen text-base-content">
      <div className="mx-auto max-w-[112rem] px-3 pb-28 pt-3 sm:px-4 md:px-5 md:pb-6 md:pt-4 xl:px-5">
        <section className="aion-shell-window">
          <div className="aion-shell-window-body">
        <div className="aion-shell-frame aion-shell-frame-canonical grid gap-3 xl:grid-cols-[14.7rem_minmax(0,1fr)]">
          <aside className="aion-app-rail hidden xl:flex xl:min-h-[calc(100vh-3rem)] xl:flex-col">
            <SidebarBrandBlock />

            <nav className="aion-sidebar-nav" aria-label="Authenticated navigation">
              {shellNavItems.map((item) => (
                <ShellNavButton
                  key={item.route ?? item.label}
                  label={item.label}
                  active={Boolean(item.route && route === item.route)}
                  icon={item.icon}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.route) {
                      changeRoute(item.route);
                    }
                  }}
                />
              ))}
            </nav>

            <div className="aion-sidebar-support-stack mt-auto">
              <section className="aion-panel-soft aion-rail-health aion-sidebar-support-card aion-sidebar-health-card">
                <p className="aion-sidebar-health-title">System Health</p>
                <div className="aion-rail-health-orb" aria-hidden="true">
                  <span>Optimal</span>
                </div>
                <p className="aion-sidebar-health-status">Optimal</p>
                <p className="aion-sidebar-health-body">All systems aligned and operating well.</p>
                <button className="aion-sidebar-quiet-button" type="button">
                  View diagnostics
                </button>
              </section>

              <button
                className="aion-panel-soft aion-sidebar-support-card aion-sidebar-identity-card"
                onClick={() => setAccountPanelOpen((value) => !value)}
                type="button"
              >
                <span className="aion-sidebar-avatar">
                  <img alt="" aria-hidden="true" src={CANONICAL_PERSONA_FIGURE_SRC} />
                </span>
                <span className="aion-sidebar-identity-copy">
                  <span className="aion-sidebar-identity-name">{currentUserLabel}</span>
                  <span className="aion-sidebar-identity-role">Explorer</span>
                </span>
                <span className="aion-sidebar-chevron">
                  <ChevronDownIcon />
                </span>
              </button>

              <section className="aion-panel-soft aion-rail-story aion-sidebar-support-card aion-sidebar-quote-card">
                <p className="aion-sidebar-quote-mark" aria-hidden="true" />
                <p className="aion-sidebar-quote-copy">Clarity is the lamp that makes the path.</p>
                <p className="aion-sidebar-quote-signature" aria-hidden="true" />
              </section>
            </div>
          </aside>

          <div className="aion-shell-stage grid gap-3">
            <div className="aion-shell-toolbar aion-shell-toolbar-chat-canonical hidden xl:block">
              <ShellUtilityBar
                currentSurface={routeLabel(route, resolvedUiLanguage)}
                currentUserLabel={currentUserLabel}
                currentUserEmail={me.user.email}
                accountPanelOpen={accountPanelOpen}
                avatarSrc={CANONICAL_PERSONA_FIGURE_SRC}
                onAccountClick={() => setAccountPanelOpen((value) => !value)}
              />

              {accountPanelOpen ? (
                <section className="aion-panel-soft aion-shell-account-popover rounded-[1.8rem] p-4">
                  <div className="aion-shell-account-card">
                    <div className="aion-shell-account-header">
                      <span className="aion-shell-account-portrait" aria-hidden="true">
                        <img alt="" src={CANONICAL_PERSONA_FIGURE_SRC} />
                      </span>
                      <div className="min-w-0">
                        <p className="aion-shell-account-label">{copy.common.signedInAs}</p>
                        <p className="aion-shell-account-name">{currentUserLabel}</p>
                        <p className="aion-shell-account-email">{me.user.email}</p>
                      </div>
                    </div>

                    <div className="aion-shell-account-facts">
                      {accountSummaryItems.map((item) => (
                        <div key={item.label} className="aion-shell-account-fact">
                          <p className="aion-shell-account-fact-label">{item.label}</p>
                          <p className="aion-shell-account-fact-value">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="aion-shell-account-actions">
                      <button className="btn btn-outline" onClick={() => changeRoute("/settings")} type="button">
                        {copy.routes["/settings"]}
                      </button>
                      <button className="btn btn-ghost border border-base-300" onClick={() => void handleLogout()} type="button">
                        {copy.common.signOut}
                      </button>
                    </div>
                  </div>
                </section>
              ) : null}
            </div>

            <header className={`aion-panel aion-mobile-route-header aion-mobile-route-header-${route.slice(1)} rounded-[2rem] xl:hidden`}>
              <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="aion-wordmark-mobile-badge">
                      <AviaryWordmark compact />
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-base-800">
                      {copy.common.build} {BUILD_REVISION.slice(0, 12)}
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-base-800">{copy.common.workspace}</p>
                    <h1 className="font-display text-2xl text-base-900 sm:text-3xl">{routeLabel(route, resolvedUiLanguage)}</h1>
                  </div>
                </div>

                <button
                  className={`btn btn-sm ${accountPanelOpen ? "btn-primary" : "btn-outline"}`}
                  onClick={() => setAccountPanelOpen((value) => !value)}
                  type="button"
                >
                  {copy.common.account}
                </button>
              </div>

              <div className="hidden border-t border-base-300/70 px-4 py-3 sm:px-5 md:block">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {ROUTES.map((entry) => (
                    <button
                      key={entry}
                      className={`btn btn-sm whitespace-nowrap ${route === entry ? "btn-primary" : "btn-ghost border border-base-300"}`}
                      onClick={() => changeRoute(entry)}
                      type="button"
                    >
                      {routeLabel(entry, resolvedUiLanguage)}
                    </button>
                  ))}
                </div>
              </div>
            </header>

            {accountPanelOpen ? (
              <section className="aion-panel-soft rounded-[1.8rem] p-4 xl:hidden">
                <div className="grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                  <div className="aion-panel-soft rounded-[1.4rem] p-4">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.common.signedInAs}</p>
                    <p className="mt-2 font-display text-2xl text-base-900">{currentUserLabel}</p>
                    <p className="mt-1 text-sm text-base-800">{me.user.email}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {accountSummaryItems.map((item) => (
                        <div key={item.label} className="aion-panel-soft rounded-[1.4rem] p-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-base-800">{item.label}</p>
                          <p className="mt-2 text-base font-semibold text-base-900">{item.value}</p>
                        </div>
                      ))}
                    </div>
                    <button className="btn btn-outline sm:self-end" onClick={() => void handleLogout()} type="button">
                      {copy.common.signOut}
                    </button>
                  </div>
                </div>
              </section>
            ) : null}

            {successBody ? (
              <FeedbackBanner
                tone="success"
                title={copy.common.stateSuccessTitle}
                body={successBody}
                detailLabel={copy.common.stateDetailLabel}
              />
            ) : null}

            {errorBody ? (
              <FeedbackBanner
                tone="error"
                title={copy.common.stateErrorTitle}
                body={errorBody}
                detail={errorDetail}
                detailLabel={copy.common.stateDetailLabel}
              />
            ) : null}

            <main className="flex-1">
          {route === "/dashboard" ? (
            <section className="aion-dashboard-canvas grid gap-4">
              <div className="aion-dashboard-top-composition">
                <div className="aion-dashboard-primary-column">
              <section className="aion-panel aion-dashboard-stage aion-dashboard-stage-canonical-main">
                <div className="aion-dashboard-stage-main">
                  <div className="aion-dashboard-stage-copy">
                    <span className="aion-chat-headline-emblem" aria-hidden="true" />
                    <div>
                      <p className="aion-dashboard-stage-eyebrow">Dashboard</p>
                      <h2 className="aion-dashboard-stage-title mt-2 font-display text-[2.55rem] leading-[1.08] text-base-900">
                        Good morning, {currentUserLabel}
                      </h2>
                      <p className="aion-dashboard-stage-body">
                        A calmer read of what is ready to move next.
                      </p>
                    </div>
                  </div>

                  <div className="aion-dashboard-hero-grid">
                    <div className="aion-dashboard-signal-column">
                      {dashboardSignalCards
                        .filter((card) => card.placement === "left")
                        .map((card) => (
                          <DashboardSignalCard
                            key={card.eyebrow}
                            eyebrow={card.eyebrow}
                            value={card.value}
                            detail={card.detail}
                            note={card.note}
                          />
                        ))}
                    </div>

                    <div className="aion-dashboard-figure-stage">
                      <div className="aion-dashboard-figure-halo" aria-hidden="true" />
                      {dashboardFigureNotes.map((note) => (
                        <article key={note.key} className={note.className}>
                          <p className="aion-dashboard-figure-note-eyebrow">{note.eyebrow}</p>
                          <p className="aion-dashboard-figure-note-title">{note.title}</p>
                          <p className="aion-dashboard-figure-note-body">{note.body}</p>
                        </article>
                      ))}
                      <img
                        className="aion-dashboard-figure-image"
                        src={DASHBOARD_HERO_ART_SRC}
                        alt="Dashboard cognition field"
                      />
                      <div className="aion-dashboard-figure-badge">
                        <span className="aion-dashboard-figure-badge-core" aria-hidden="true" />
                      </div>
                    </div>

                    <div className="aion-dashboard-signal-column">
                      {dashboardSignalCards
                        .filter((card) => card.placement === "right")
                        .map((card) => (
                          <DashboardSignalCard
                            key={card.eyebrow}
                            eyebrow={card.eyebrow}
                            value={card.value}
                            detail={card.detail}
                            note={card.note}
                          />
                        ))}
                    </div>
                  </div>

                </div>
              </section>

              <section className="aion-panel aion-dashboard-flow-panel aion-dashboard-flow-panel-bridge">
                <div className="aion-dashboard-flow-shell">
                  <div className="aion-dashboard-flow-intro">
                    <div className="aion-dashboard-flow-header">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-base-800">Aviary cognitive flow</p>
                        <h3 className="mt-2 font-display text-2xl text-base-900">Live orchestration</h3>
                      </div>
                      <div className="aion-chip-ghost rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
                        Live
                      </div>
                    </div>
                    <div className="aion-dashboard-flow-track aion-dashboard-flow-track-bridge">
                      {dashboardCognitiveSteps.map((step) => (
                        <article
                          key={step.title}
                          className={`aion-dashboard-flow-step ${step.active ? "aion-dashboard-flow-step-active" : ""}`}
                        >
                          <span className="aion-dashboard-flow-icon">{step.token}</span>
                          <p className="mt-3 text-base font-semibold text-base-900">{step.title}</p>
                          <p className="mt-1 text-sm text-base-800">{step.detail}</p>
                        </article>
                      ))}
                    </div>
                  </div>

                  <aside className="aion-dashboard-flow-phase">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-base-800">Current phase</p>
                    <p className="mt-3 font-display text-[2rem] leading-tight text-base-900">{dashboardCurrentPhase.title}</p>
                    <p className="mt-3 text-sm leading-7 text-base-800">{dashboardCurrentPhase.body}</p>
                    <button className="aion-dashboard-action-button mt-5" type="button">
                      View full flow
                    </button>
                  </aside>
                </div>
              </section>

              <section className="aion-dashboard-lower-grid aion-dashboard-lower-grid-condensed grid gap-3 xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,0.9fr)]">
                <article className="aion-panel-soft aion-dashboard-card aion-dashboard-card-primary">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-base-800">Active goals</p>
                      <h3 className="mt-2 font-display text-2xl text-base-900">What is in motion</h3>
                    </div>
                    <button className="aion-dashboard-link" type="button">
                      View all
                    </button>
                  </div>
                  <div className="mt-5 grid gap-4">
                    {dashboardGoalRows.map((goal) => (
                      <div key={goal.title}>
                        <div className="flex items-center justify-between gap-3 text-sm text-base-900">
                          <span>{goal.title}</span>
                          <span>{goal.value}</span>
                        </div>
                        <div className="aion-dashboard-progress mt-2">
                          <span style={{ width: goal.width }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="aion-panel-soft aion-dashboard-card aion-dashboard-card-focus">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-800">Current focus</p>
                  <div className="aion-dashboard-focus-orb" aria-hidden="true" />
                  <p className="font-display text-2xl text-base-900">{chatCurrentFocus}</p>
                  <p className="mt-3 text-sm leading-7 text-base-800">
                    Building a coherent next step from your active conversation, memory, and planning posture.
                  </p>
                  <button className="aion-dashboard-action-button mt-5" type="button">
                    Enter focus
                  </button>
                </article>

                <article className="aion-panel-soft aion-dashboard-card aion-dashboard-card-memory">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-base-800">Memory growth</p>
                      <h3 className="mt-2 font-display text-2xl text-base-900">
                        {stringValue(knowledgeSummary?.semantic_conclusion_count, "0")}
                      </h3>
                    </div>
                    <span className="aion-chip-ghost rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
                      This week
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#5f8f93]">Useful memories stored and made easier to reuse.</p>
                  <div className="aion-dashboard-bar-chart mt-6">
                    {dashboardMemoryBars.map((bar) => (
                      <div key={bar.label} className="aion-dashboard-bar-item">
                        <span className="aion-dashboard-bar-fill" style={{ height: bar.height }} />
                        <span className="aion-dashboard-bar-label">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="aion-panel-soft aion-dashboard-card aion-dashboard-card-reflection">
                  <p className="text-sm uppercase tracking-[0.2em] text-base-800">Reflection highlights</p>
                  <h3 className="mt-2 font-display text-2xl text-base-900">What is becoming clearer</h3>
                  <div className="aion-dashboard-reflection-list mt-5">
                    {dashboardReflectionRows.map((row) => (
                      <div key={row.title} className="aion-dashboard-reflection-row">
                        <span className="aion-dashboard-reflection-tag">{row.tag}</span>
                        <p>{row.title}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </section>
                </div>

                <aside className="aion-dashboard-guidance-column">
                  <section className="aion-dashboard-guidance-panel">
                    <p className="text-sm uppercase tracking-[0.22em] text-base-800">Insights and guidance</p>
                    <h3 className="mt-2 font-display text-2xl text-base-900">Curated for you</h3>
                    <div className="aion-dashboard-guidance-list">
                      {dashboardGuidanceCards.slice(0, 4).map((card, index) => (
                        <article
                          key={card.title}
                          className={`aion-dashboard-guidance-row ${index === 0 ? "aion-dashboard-guidance-row-lead" : ""}`}
                        >
                          <span className="aion-dashboard-guidance-token" aria-hidden="true" />
                          <div className="aion-dashboard-guidance-row-copy">
                            <p className="aion-dashboard-guidance-row-title">{card.title}</p>
                            <p className="aion-dashboard-guidance-row-body">{card.body}</p>
                          </div>
                          <button className="aion-dashboard-mini-action aion-dashboard-mini-action-quiet" type="button">
                            {card.action}
                          </button>
                        </article>
                      ))}
                    </div>
                    <button className="aion-dashboard-action-button aion-dashboard-guidance-cta" type="button">
                      View all insights
                    </button>
                  </section>

                  <section className="aion-dashboard-recent-panel aion-dashboard-recent-panel-compact">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase tracking-[0.22em] text-base-800">Recent activity</p>
                        <h4 className="mt-2 font-display text-[1.06rem] text-base-900">What just changed</h4>
                      </div>
                      <button className="aion-dashboard-link" type="button">
                        View all
                      </button>
                    </div>
                    <div className="grid gap-2.5">
                      {personalityRecentActivity.slice(0, 4).map((item) => (
                        <article key={item.key} className="aion-dashboard-recent-row">
                          <div>
                            <p className="text-[0.82rem] font-semibold text-base-900">{item.title}</p>
                          </div>
                          <span className="text-xs uppercase tracking-[0.18em] text-base-800">{item.when}</span>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="aion-dashboard-side-story aion-dashboard-side-story-lead aion-dashboard-guidance-intention">
                    <p className="text-sm uppercase tracking-[0.22em] text-base-800">Today's intention</p>
                    <p className="mt-3.5 font-display text-[1.78rem] leading-[1.08] text-base-900">
                      Create with clarity.
                      <span className="block mt-1.5">Move with purpose.</span>
                    </p>
                  </section>
                </aside>
              </div>

              <section className="grid gap-4">
                <article className="aion-panel aion-dashboard-summary-band aion-dashboard-summary-band-closure">
                  <div className="aion-dashboard-summary-layout aion-dashboard-summary-layout-closure">
                    <div className="aion-dashboard-summary-harmony">
                      <div className="aion-dashboard-summary-harmony-ring" aria-hidden="true">
                        <div className="aion-dashboard-summary-harmony-core">
                          <strong>{dashboardSystemHarmony.value}</strong>
                          <span>{dashboardSystemHarmony.label}</span>
                        </div>
                      </div>
                      <div className="aion-dashboard-summary-harmony-copy">
                        <p className="text-sm uppercase tracking-[0.2em] text-base-800">System harmony</p>
                        <p className="mt-2 text-sm leading-7 text-base-800">{dashboardSystemHarmony.body}</p>
                      </div>
                    </div>

                    <div className="aion-dashboard-summary-balance">
                      <p className="text-sm uppercase tracking-[0.2em] text-base-800">Balance across layers</p>
                      <div className="aion-dashboard-summary-balance-grid">
                        {dashboardBalanceRows.map((row, index) => (
                          <div key={row.label} className="aion-dashboard-summary-balance-row">
                            <div className="aion-dashboard-summary-balance-label">
                              <span className={`aion-dashboard-summary-balance-token aion-dashboard-summary-balance-token-${index + 1}`} />
                              <span>{row.label}</span>
                            </div>
                            <strong>{row.value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="aion-dashboard-summary-scenic aion-dashboard-summary-scenic-closure">
                      <div className="aion-dashboard-summary-scenic-copy">
                        <p className="text-sm uppercase tracking-[0.2em] text-base-800">Weekly summary</p>
                        <p className="mt-3 font-display text-2xl leading-tight text-base-900">
                          Meaningful progress
                          <br />
                          with steadier intention.
                        </p>
                        <p className="mt-3 max-w-md text-sm leading-7 text-base-800">
                          Goals, memory, and reflection now hold together in one calmer path.
                        </p>
                        <button className="aion-dashboard-action-button mt-5" type="button">
                          See full report
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </section>

            </section>
          ) : null}

          {route === "/chat" ? (
            <section className="grid gap-4">
              <section className="aion-chat-workspace">
                <ChatTopbar
                  title="Conversation"
                  activeSummary={chatActiveSummary}
                  linkedChannelsLabel={chatLinkedChannelsStatus}
                  preferredLanguageLabel={stringValue(me?.settings.preferred_language, "adaptive")}
                />

                <ChatCognitiveBelt
                  items={chatCognitiveBelt}
                  goalProgress={chatGoalCard.progress}
                />

                <div className="aion-chat-stage">
                  <ChatTranscriptShell
                    ref={transcriptContainerRef}
                    loadingFallback={
                      historyLoading && transcriptItems.length === 0 ? (
                        <StatePanel
                          tone="neutral"
                          title={copy.common.stateLoadingTitle}
                          body={copy.common.loading}
                          loading
                        />
                      ) : null
                    }
                    transcript={visibleTranscriptItems.map((message) => {
                        const isUser = message.role === "user";
                        const deliveryState = isUser ? chatDeliveryState(message) : null;
                        const deliveryLabel =
                          deliveryState === "sending"
                            ? copy.chat.pending
                            : deliveryState === "delivered"
                              ? copy.chat.delivered
                              : deliveryState === "failed"
                                ? copy.chat.failed
                                : null;

                        return (
                          <ChatTranscriptMessageRow
                            key={message.message_id}
                            ref={(node) => {
                              transcriptMessageRefs.current[message.message_id] = node;
                            }}
                            isUser={isUser}
                            preview={transcriptIsPreview}
                            speakerLabel={isUser ? copy.common.user : "AION"}
                            timestampLabel={formatTimestamp(message.timestamp, resolvedUiLanguage)}
                            deliveryState={deliveryState}
                            deliveryLabel={deliveryLabel}
                          >
                            {renderChatMarkdown(message.text)}
                          </ChatTranscriptMessageRow>
                        );
                      })
                    }
                    composer={
                      <ChatComposerShell
                        quickActions={chatQuickActions}
                        text={chatText}
                        placeholder={copy.chat.placeholder}
                        sending={sendingMessage}
                        sendLabel={copy.chat.send}
                        note="AION may make mistakes. Consider checking important information."
                        addIcon={<PlusIcon />}
                        voiceIcon={<MicrophoneIcon />}
                        sendIcon={<SendArrowIcon />}
                        onQuickAction={setChatText}
                        onTextChange={setChatText}
                        onSubmit={(event) => {
                          void handleSendMessage(event);
                        }}
                      />
                    }
                  />

                  <ChatPortraitPanel
                    currentFocus={chatCurrentFocus}
                    emphasis={chatIntentCard.emphasis}
                    learnedCueCount={stringValue(preferenceSummary?.learned_preference_count, "0")}
                  />
                </div>
              </section>
            </section>
          ) : null}

          {route === "/memory" ? (
            <div className="aion-memory-canvas grid gap-4">
              <ModuleOverviewBar
                routeKey="memory"
                eyebrow={copy.memory.eyebrow}
                title={copy.memory.title}
                subtitle={copy.memory.subtitle}
                statusLabel={copy.memory.continuity}
                statusValue={`${memoryPatternCount} ${memoryPatternUnit}`}
                statusAriaLabel="Memory status"
              />

              <ModuleStatRow routeKey="memory" ariaLabel="Memory summary">
                {memoryStatCards.map((item) => (
                  <RouteStatCard
                    key={item.label}
                    routeKey="memory"
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </ModuleStatRow>

              <div className="aion-memory-layout">
                <section className="aion-memory-library-panel">
                  <div className="aion-memory-library-head">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.memory.memoryMap}</p>
                      <h3 className="mt-2 font-display text-3xl text-base-900">{copy.memory.memoryMapTitle}</h3>
                    </div>
                    <span className="aion-memory-library-chip">{copy.memory.noRawRecords}</span>
                  </div>

                  <div className="aion-memory-orbit" aria-hidden="true">
                    <span className="aion-memory-orbit-core" />
                    <span className="aion-memory-orbit-ring aion-memory-orbit-ring-one" />
                    <span className="aion-memory-orbit-ring aion-memory-orbit-ring-two" />
                    <span className="aion-memory-orbit-node aion-memory-orbit-node-a" />
                    <span className="aion-memory-orbit-node aion-memory-orbit-node-b" />
                    <span className="aion-memory-orbit-node aion-memory-orbit-node-c" />
                  </div>

                  <div className="aion-memory-continuity-list">
                    {memoryContinuityRows.map((row) => (
                      <PersonalityTimelineRow
                        key={row.title}
                        token={row.token}
                        title={row.title}
                        detail={row.detail}
                        value={row.value}
                      />
                    ))}
                  </div>
                </section>

                <aside className="aion-memory-side-stack">
                  <section className="aion-memory-side-panel aion-memory-side-panel-live">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.memory.recent}</p>
                    <h3 className="mt-2 font-display text-2xl text-base-900">{copy.memory.continuityNearConversation}</h3>
                    <div className="mt-5 grid gap-3">
                      {memorySignalCards.map((item) => (
                        <article key={item.title} className="aion-memory-signal-card">
                          <div>
                            <p className="aion-memory-signal-meta">{item.meta}</p>
                            <h4 className="aion-memory-signal-title">{item.title}</h4>
                          </div>
                          <p className="aion-memory-signal-body">{item.body}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="aion-memory-side-panel aion-memory-side-panel-recent">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.memory.recentMovement}</p>
                    <ModuleActivityList
                      routeKey="memory"
                      items={personalityRecentActivity.slice(0, 4)}
                    />
                  </section>
                </aside>
              </div>
            </div>
          ) : null}

          {route === "/reflections" ? (
            <div className="aion-reflections-canvas grid gap-4">
              <ModuleOverviewBar
                routeKey="reflections"
                eyebrow={copy.reflections.eyebrow}
                title={copy.reflections.title}
                subtitle={copy.reflections.subtitle}
                statusLabel={copy.reflections.slowLearning}
                statusValue={`${reflectionInsightCount} ${reflectionInsightUnit}`}
                statusAriaLabel="Reflection status"
              />

              <ModuleStatRow routeKey="reflections" ariaLabel="Reflection summary">
                {reflectionStatCards.map((item) => (
                  <RouteStatCard
                    key={item.label}
                    routeKey="reflections"
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </ModuleStatRow>

              <div className="aion-reflections-layout">
                <section className="aion-reflections-process-panel">
                  <div className="aion-reflections-process-head">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.reflections.reflectionFlow}</p>
                      <h3 className="mt-2 font-display text-3xl text-base-900">{copy.reflections.flowTitle}</h3>
                    </div>
                    <span className="aion-reflections-process-chip">{copy.reflections.noRawJournal}</span>
                  </div>

                  <div className="aion-reflections-wave" aria-hidden="true">
                    <span className="aion-reflections-wave-line" />
                    <span className="aion-reflections-wave-node aion-reflections-wave-node-one" />
                    <span className="aion-reflections-wave-node aion-reflections-wave-node-two" />
                    <span className="aion-reflections-wave-node aion-reflections-wave-node-three" />
                  </div>

                  <div className="aion-reflections-flow-list">
                    {reflectionFlowRows.map((row) => (
                      <PersonalityTimelineRow
                        key={row.title}
                        token={row.token}
                        title={row.title}
                        detail={row.detail}
                        value={row.value}
                      />
                    ))}
                  </div>
                </section>

                <aside className="aion-reflections-side-stack">
                  <section className="aion-reflections-side-panel aion-reflections-side-panel-prompts">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.reflections.recent}</p>
                    <h3 className="mt-2 font-display text-2xl text-base-900">{copy.reflections.promptsTitle}</h3>
                    <ModuleTextCardList routeKey="reflections" cardKey="prompt" items={reflectionPromptCards} />
                  </section>

                  <section className="aion-reflections-side-panel">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.reflections.recentMovement}</p>
                    <ModuleActivityList
                      routeKey="reflections"
                      items={personalityRecentActivity.slice(0, 4)}
                    />
                  </section>
                </aside>
              </div>
            </div>
          ) : null}

          {route === "/plans" ? (
            <div className="aion-plans-canvas grid gap-4">
              <ModuleOverviewBar
                routeKey="plans"
                eyebrow={copy.plans.eyebrow}
                title={copy.plans.title}
                subtitle={copy.plans.subtitle}
                statusLabel={copy.plans.activeGoals}
                statusValue={`${plansGoalCount} ${plansGoalUnit}`}
                statusAriaLabel="Planning status"
              />

              <ModuleStatRow routeKey="plans" ariaLabel="Planning summary">
                {plansStatCards.map((item) => (
                  <RouteStatCard
                    key={item.label}
                    routeKey="plans"
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </ModuleStatRow>

              <div className="aion-plans-layout">
                <section className="aion-plans-board-panel">
                  <div className="aion-plans-board-head">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.plans.planningPath}</p>
                      <h3 className="mt-2 font-display text-3xl text-base-900">{copy.plans.shapeBeforeAction}</h3>
                    </div>
                    <span className="aion-plans-board-chip">{copy.plans.actionBoundaryPreserved}</span>
                  </div>

                  <div className="aion-plans-lane" aria-hidden="true">
                    <span className="aion-plans-lane-card aion-plans-lane-card-one" />
                    <span className="aion-plans-lane-card aion-plans-lane-card-two" />
                    <span className="aion-plans-lane-card aion-plans-lane-card-three" />
                    <span className="aion-plans-lane-line" />
                  </div>

                  <div className="aion-plans-flow-list">
                    {plansFlowRows.map((row) => (
                      <PersonalityTimelineRow
                        key={row.title}
                        token={row.token}
                        title={row.title}
                        detail={row.detail}
                        value={row.value}
                      />
                    ))}
                  </div>
                </section>

                <aside className="aion-plans-side-stack">
                  <section className="aion-plans-side-panel aion-plans-side-panel-next">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.plans.nextStep}</p>
                    <h3 className="mt-2 font-display text-2xl text-base-900">{copy.plans.planningSuggestions}</h3>
                    <ModuleTextCardList routeKey="plans" cardKey="step" items={plansNextSteps} />
                  </section>

                  <section className="aion-plans-side-panel">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.plans.planningContext}</p>
                    <div className="mt-4 grid gap-3">
                      {plansContextCards.map((card) => (
                        <article key={card.title} className="aion-plans-context-row">
                          <span className="aion-plans-context-dot" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-semibold text-base-900">{card.title}</p>
                            <p className="mt-1 text-sm leading-6 text-base-800">{card.body}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          ) : null}

          {route === "/goals" ? (
            <div className="aion-goals-canvas grid gap-4">
              <ModuleOverviewBar
                routeKey="goals"
                eyebrow={copy.goals.eyebrow}
                title={copy.goals.title}
                subtitle={copy.goals.subtitle}
                statusLabel={copy.goals.active}
                statusValue={`${goalsCount} ${goalsUnit}`}
                statusAriaLabel="Goal status"
              />

              <ModuleStatRow routeKey="goals" ariaLabel="Goal summary">
                {goalsStatCards.map((item) => (
                  <RouteStatCard
                    key={item.label}
                    routeKey="goals"
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </ModuleStatRow>

              <div className="aion-goals-layout">
                <section className="aion-goals-horizon-panel">
                  <div className="aion-goals-horizon-head">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.goals.goalHorizon}</p>
                      <h3 className="mt-2 font-display text-3xl text-base-900">{copy.goals.whatIsInMotion}</h3>
                    </div>
                    <span className="aion-goals-horizon-chip">{copy.goals.directionOnly}</span>
                  </div>

                  <div className="aion-goals-rings" aria-hidden="true">
                    <span className="aion-goals-ring aion-goals-ring-one" />
                    <span className="aion-goals-ring aion-goals-ring-two" />
                    <span className="aion-goals-ring aion-goals-ring-three" />
                    <span className="aion-goals-ring-core" />
                  </div>

                  <div className="aion-goals-list">
                    {goalHorizonRows.map((goal) => (
                      <article key={goal.title} className="aion-goals-row">
                        <div className="aion-goals-row-copy">
                          <span className="aion-goals-row-token">{goal.token}</span>
                          <div>
                            <p className="aion-goals-row-title">{goal.title}</p>
                            <p className="aion-goals-row-detail">{goal.detail}</p>
                          </div>
                        </div>
                        <div className="aion-goals-progress" aria-label={`${goal.title} ${goal.value}`}>
                          <span style={{ width: goal.value }} />
                        </div>
                        <strong>{goal.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="aion-goals-side-stack">
                  <section className="aion-goals-side-panel aion-goals-side-panel-signals">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.goals.momentum}</p>
                    <h3 className="mt-2 font-display text-2xl text-base-900">{copy.goals.goalSignals}</h3>
                    <ModuleTextCardList routeKey="goals" cardKey="signal" items={goalSignalCards} />
                  </section>

                  <section className="aion-goals-side-panel">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.goals.relatedGuidance}</p>
                    <div className="mt-4 grid gap-3">
                      {goalGuidanceCards.map((card) => (
                        <article key={card.title} className="aion-goals-guidance-row">
                          <span className="aion-goals-guidance-dot" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-semibold text-base-900">{card.title}</p>
                            <p className="mt-1 text-sm leading-6 text-base-800">{card.body}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          ) : null}

          {route === "/insights" ? (
            <div className="aion-insights-canvas grid gap-4">
              <section className="aion-insights-overview-bar">
                <span className="aion-chat-headline-emblem" aria-hidden="true" />
                <div className="aion-insights-overview-copy">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.insights.eyebrow}</p>
                  <h2 className="mt-1.5 font-display text-4xl text-base-900">{copy.insights.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-base-800">{copy.insights.subtitle}</p>
                </div>
                <div className="aion-insights-overview-status" aria-label="Insight status">
                  <span>{copy.insights.clarity}</span>
                  <strong>{insightPatternCount} {insightPatternUnit}</strong>
                </div>
              </section>

              <section className="aion-insights-stat-row" aria-label="Insight summary">
                {insightStatCards.map((item) => (
                  <RouteStatCard
                    key={item.label}
                    routeKey="insights"
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </section>

              <div className="aion-insights-layout">
                <section className="aion-insights-map-panel">
                  <div className="aion-insights-map-head">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.insights.insightMap}</p>
                      <h3 className="mt-2 font-display text-3xl text-base-900">{copy.insights.insightMapTitle}</h3>
                    </div>
                    <span className="aion-insights-map-chip">{copy.insights.readOnly}</span>
                  </div>

                  <div className="aion-insights-orbit" aria-hidden="true">
                    <span className="aion-insights-orbit-line aion-insights-orbit-line-one" />
                    <span className="aion-insights-orbit-line aion-insights-orbit-line-two" />
                    <span className="aion-insights-orbit-core" />
                    <span className="aion-insights-orbit-node aion-insights-orbit-node-one" />
                    <span className="aion-insights-orbit-node aion-insights-orbit-node-two" />
                    <span className="aion-insights-orbit-node aion-insights-orbit-node-three" />
                  </div>

                  <div className="aion-insights-signal-list">
                    {insightSignalRows.map((row) => (
                      <article key={row.title} className="aion-insights-signal-row">
                        <div className="aion-insights-signal-copy">
                          <span className="aion-insights-signal-token">{row.token}</span>
                          <div>
                            <p className="aion-insights-signal-title">{row.title}</p>
                            <p className="aion-insights-signal-detail">{row.detail}</p>
                          </div>
                        </div>
                        <strong>{row.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="aion-insights-side-stack">
                  <ModuleRouteSidePanel
                    routeKey="insights"
                    eyebrow={copy.insights.clarity}
                    title={copy.insights.sensemakingNotes}
                    variant="clarity"
                  >
                    <div className="mt-5 grid gap-3">
                      {insightClarityCards.map((item) => (
                        <RouteNoteCard
                          key={item.title}
                          routeKey="insights"
                          title={item.title}
                          body={item.body}
                        />
                      ))}
                    </div>
                  </ModuleRouteSidePanel>

                  <ModuleRouteSidePanel routeKey="insights" eyebrow={copy.insights.guidanceCandidates}>
                    <div className="mt-4 grid gap-3">
                      {insightGuidanceCards.map((card) => (
                        <ModuleRouteSideRow
                          key={card.title}
                          routeKey="insights"
                          rowKey="guidance"
                          title={card.title}
                          body={card.body}
                        />
                      ))}
                    </div>
                  </ModuleRouteSidePanel>
                </aside>
              </div>
            </div>
          ) : null}

          {route === "/automations" ? (
            <div className="aion-automations-canvas grid gap-4">
              <section className="aion-automations-overview-bar">
                <span className="aion-chat-headline-emblem" aria-hidden="true" />
                <div className="aion-automations-overview-copy">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.automations.eyebrow}</p>
                  <h2 className="mt-1.5 font-display text-4xl text-base-900">{copy.automations.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-base-800">{copy.automations.subtitle}</p>
                </div>
                <div className="aion-automations-overview-status" aria-label="Automation status">
                  <span>{copy.automations.proactive}</span>
                  <strong>{proactiveEnabled ? copy.common.on : copy.common.off}</strong>
                </div>
              </section>

              <section className="aion-automations-stat-row" aria-label="Automation summary">
                {automationStatCards.map((item) => (
                  <RouteStatCard
                    key={item.label}
                    routeKey="automations"
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </section>

              <div className="aion-automations-layout">
                <section className="aion-automations-flow-panel">
                  <div className="aion-automations-flow-head">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.automations.automationFlow}</p>
                      <h3 className="mt-2 font-display text-3xl text-base-900">{copy.automations.allowedToMove}</h3>
                    </div>
                    <span className="aion-automations-flow-chip">{copy.automations.observed}</span>
                  </div>

                  <div className="aion-automations-switchboard" aria-hidden="true">
                    <span className="aion-automations-switch-line" />
                    <span className="aion-automations-switch-node aion-automations-switch-node-one" />
                    <span className="aion-automations-switch-node aion-automations-switch-node-two" />
                    <span className="aion-automations-switch-node aion-automations-switch-node-three" />
                    <span className="aion-automations-switch-core">{proactiveEnabled ? copy.common.on : copy.common.off}</span>
                  </div>

                  <div className="aion-automations-flow-list">
                    {automationFlowRows.map((row) => (
                      <article key={row.title} className="aion-automations-flow-row">
                        <div className="aion-automations-flow-copy">
                          <span className="aion-automations-flow-token">{row.token}</span>
                          <div>
                            <p className="aion-automations-flow-title">{row.title}</p>
                            <p className="aion-automations-flow-detail">{row.detail}</p>
                          </div>
                        </div>
                        <strong>{row.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="aion-automations-side-stack">
                  <ModuleRouteSidePanel
                    routeKey="automations"
                    eyebrow={copy.automations.boundary}
                    title={copy.automations.guardrails}
                    variant="boundary"
                  >
                    <div className="mt-5 grid gap-3">
                      {automationBoundaryCards.map((item) => (
                        <RouteNoteCard
                          key={item.title}
                          routeKey="automations"
                          title={item.title}
                          body={item.body}
                        />
                      ))}
                    </div>
                  </ModuleRouteSidePanel>

                  <ModuleRouteSidePanel routeKey="automations" eyebrow={copy.automations.healthDetails}>
                    <div className="mt-4 grid gap-3">
                      {automationHealthRows.map((item) => (
                        <ModuleRouteSideRow
                          key={item.title}
                          routeKey="automations"
                          rowKey="health"
                          title={item.title}
                          body={item.body}
                        />
                      ))}
                    </div>
                  </ModuleRouteSidePanel>
                </aside>
              </div>
            </div>
          ) : null}

          {route === "/integrations" ? (
            <div className="aion-integrations-canvas grid gap-4">
              <section className="aion-integrations-overview-bar">
                <span className="aion-chat-headline-emblem" aria-hidden="true" />
                <div className="aion-integrations-overview-copy">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.integrations.eyebrow}</p>
                  <h2 className="mt-1.5 font-display text-4xl text-base-900">{copy.integrations.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-base-800">{copy.integrations.subtitle}</p>
                </div>
                <div className="aion-integrations-overview-status" aria-label="Integration status">
                  <span>{copy.integrations.ready}</span>
                  <strong>{integrationReadyCount} {copy.integrations.readyShort}</strong>
                </div>
              </section>

              <section className="aion-integrations-stat-row" aria-label="Integration summary">
                {integrationStatCards.map((item) => (
                  <RouteStatCard
                    key={item.label}
                    routeKey="integrations"
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                  />
                ))}
              </section>

              <div className="aion-integrations-layout">
                <section className="aion-integrations-map-panel">
                  <div className="aion-integrations-map-head">
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.integrations.providerMap}</p>
                      <h3 className="mt-2 font-display text-3xl text-base-900">{copy.integrations.providerMapTitle}</h3>
                    </div>
                    <span className="aion-integrations-map-chip">{copy.integrations.overview}</span>
                  </div>

                  <div className="aion-integrations-web" aria-hidden="true">
                    <span className="aion-integrations-web-line aion-integrations-web-line-one" />
                    <span className="aion-integrations-web-line aion-integrations-web-line-two" />
                    <span className="aion-integrations-web-core" />
                    <span className="aion-integrations-web-node aion-integrations-web-node-one" />
                    <span className="aion-integrations-web-node aion-integrations-web-node-two" />
                    <span className="aion-integrations-web-node aion-integrations-web-node-three" />
                  </div>

                  <div className="aion-integrations-provider-list">
                    {(integrationProviderRows.length ? integrationProviderRows : [
                      { token: "I", title: copy.integrations.noProvidersTitle, detail: copy.integrations.noProvidersDetail, value: copy.integrations.quietValue },
                    ]).map((row) => (
                      <article key={row.title} className="aion-integrations-provider-row">
                        <div className="aion-integrations-provider-copy">
                          <span className="aion-integrations-provider-token">{row.token}</span>
                          <div>
                            <p className="aion-integrations-provider-title">{row.title}</p>
                            <p className="aion-integrations-provider-detail">{row.detail}</p>
                          </div>
                        </div>
                        <strong>{row.value}</strong>
                      </article>
                    ))}
                  </div>
                </section>

                <aside className="aion-integrations-side-stack">
                  <section className="aion-integrations-side-panel aion-integrations-side-panel-boundary">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.integrations.boundary}</p>
                    <h3 className="mt-2 font-display text-2xl text-base-900">{copy.integrations.connectionRules}</h3>
                    <div className="mt-5 grid gap-3">
                      {integrationBoundaryCards.map((item) => (
                        <RouteNoteCard
                          key={item.title}
                          routeKey="integrations"
                          title={item.title}
                          body={item.body}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="aion-integrations-side-panel">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.integrations.readinessDetails}</p>
                    <div className="mt-4 grid gap-3">
                      {[
                        { title: copy.integrations.configured, body: `${toolsOverview?.summary.total_items ?? 0} ${copy.integrations.toolsKnown}` },
                        { title: copy.integrations.linkRequired, body: `${integrationLinkRequiredCount} ${copy.integrations.waitingForLinkFlow}` },
                        { title: copy.integrations.blocked, body: `${integrationBlockedCount} ${copy.integrations.providerChecksBlocked}` },
                      ].map((item) => (
                        <article key={item.title} className="aion-integrations-health-row">
                          <span className="aion-integrations-health-dot" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-semibold text-base-900">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-base-800">{item.body}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          ) : null}

          {route === "/settings" ? (
            <div className="aion-settings-canvas grid gap-4">
              <section className="aion-settings-overview-bar">
                <span className="aion-chat-headline-emblem" aria-hidden="true" />
                <div className="aion-settings-overview-copy">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.settings.eyebrow}</p>
                  <h2 className="mt-1.5 font-display text-4xl text-base-900">{copy.settings.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-base-800">{copy.settings.subtitle}</p>
                </div>
                <div className="aion-settings-status-grid">
                  {settingsHeroChips.map((chip) => (
                    <span key={chip} className="aion-settings-status-pill">
                      {chip}
                    </span>
                  ))}
                </div>
              </section>

              <form className="aion-settings-layout" onSubmit={(event) => void handleSaveSettings(event)}>
                <section className="aion-panel aion-settings-preferences">
                  <div className="aion-settings-section-head">
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">Preferences</p>
                    <h3 className="font-display text-3xl text-base-900">Account and interface</h3>
                  </div>

                  <div className="aion-settings-card-grid">
                    <SettingsCard
                      label={copy.settings.profileTitle}
                      title={copy.auth.displayName}
                      body={copy.settings.profileBody}
                      lead
                    >
                      <label className="form-control mt-4">
                        <input
                          className="input input-bordered aion-settings-control"
                          value={settingsDraft.displayName}
                          onChange={(event) =>
                            setSettingsDraft((draft) => ({ ...draft, displayName: event.target.value }))
                          }
                          placeholder={copy.auth.displayName}
                        />
                      </label>
                    </SettingsCard>

                    <SettingsCard
                      label={copy.settings.uiLanguageTitle}
                      title={copy.common.uiLanguage}
                      body={copy.settings.uiLanguageBody}
                      accessory={
                        <span className="aion-settings-mini-pill">{copy.common.interfaceOnly}</span>
                      }
                    >
                      <label className="form-control mt-4">
                        <select
                          className="select select-bordered aion-settings-control"
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
                              {localeOptionDisplay(option, resolvedUiLanguage)}
                            </option>
                          ))}
                        </select>
                      </label>
                      <p className="aion-settings-help">{copy.settings.uiLanguageHelp}</p>
                    </SettingsCard>

                    <SettingsCard
                      label={copy.settings.utcOffsetTitle}
                      title={copy.common.utcOffset}
                      body={copy.settings.utcOffsetBody}
                    >
                      <label className="form-control mt-4">
                        <select
                          className="select select-bordered aion-settings-control"
                          value={settingsDraft.utcOffset}
                          onChange={(event) =>
                            setSettingsDraft((draft) => ({
                              ...draft,
                              utcOffset: normalizeUtcOffset(event.target.value),
                            }))
                          }
                        >
                          {UTC_OFFSET_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      </label>
                      <p className="aion-settings-help">{copy.settings.utcOffsetHelp}</p>
                    </SettingsCard>

                    <SettingsCard
                      label={copy.settings.conversationTitle}
                      title={copy.common.conversationLanguage}
                      body={copy.settings.conversationBody}
                    >
                      <div className="aion-settings-fact-grid">
                        <SettingsFact
                          label={copy.common.sourceOfTruth}
                          value={stringValue(me.settings.preferred_language, copy.common.notSet)}
                        />
                        <SettingsFact label={copy.common.details} value={selectedUtcOffsetMetadata.value} />
                      </div>
                    </SettingsCard>
                  </div>
                </section>

                <aside className="aion-settings-side-stack">
                  <SettingsProactivePanel
                    label={copy.settings.proactiveTitle}
                    title={copy.common.proactive}
                  >
                    <label className="aion-settings-toggle-row">
                      <input
                        className="toggle toggle-primary"
                        type="checkbox"
                        checked={settingsDraft.proactiveOptIn}
                        onChange={(event) =>
                          setSettingsDraft((draft) => ({ ...draft, proactiveOptIn: event.target.checked }))
                        }
                      />
                      <span>
                        <strong>{copy.settings.proactiveTitle}</strong>
                        <small>{copy.settings.proactiveBody}</small>
                      </span>
                    </label>
                  </SettingsProactivePanel>

                  <SettingsSavePanel title={copy.settings.savedState} body={copy.settings.saveHint}>
                    <button className="btn btn-primary" disabled={savingSettings} type="submit">
                      {savingSettings ? copy.common.saving : copy.common.save}
                    </button>
                  </SettingsSavePanel>

                  <SettingsDangerPanel
                    label={copy.settings.resetTitle}
                    title={copy.settings.resetAction}
                    body={copy.settings.resetBody}
                    impact={copy.settings.resetImpact}
                  >
                    <label className="form-control mt-4">
                      <span className="label-text text-base-900">{copy.settings.resetConfirmationLabel}</span>
                      <input
                        className="input input-bordered aion-settings-control aion-settings-danger-input mt-2"
                        value={resetConfirmationText}
                        onChange={(event) => setResetConfirmationText(event.target.value)}
                        placeholder={copy.settings.resetConfirmationPlaceholder}
                      />
                      <span className="label-text mt-2 text-base-800">
                        {copy.settings.resetConfirmationHint} <code>{RESET_DATA_CONFIRMATION_TEXT}</code>
                      </span>
                    </label>

                    <button
                      className="btn btn-error mt-4 w-full"
                      disabled={resettingData || resetConfirmationText.trim() !== RESET_DATA_CONFIRMATION_TEXT}
                      type="button"
                      onClick={() => {
                        void handleResetData();
                      }}
                    >
                      {resettingData ? copy.settings.resetting : copy.settings.resetAction}
                    </button>
                  </SettingsDangerPanel>
                </aside>
              </form>
            </div>
          ) : null}

          {route === "/tools" ? (
            <div className="aion-tools-canvas grid gap-4">
              <section className="aion-tools-overview-bar">
                <span className="aion-chat-headline-emblem" aria-hidden="true" />
                <div className="aion-tools-overview-copy">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.tools.eyebrow}</p>
                  <h2 className="mt-1.5 font-display text-4xl text-base-900">{copy.tools.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-base-800">{copy.tools.subtitle}</p>
                </div>
                <div className="aion-tools-summary-grid">
                {[
                  {
                    title: copy.tools.groupCount,
                    value: stringValue(toolsOverview?.summary.total_groups, "0"),
                    note: copy.tools.summaryGroupNote,
                  },
                  {
                    title: copy.tools.integral,
                    value: stringValue(toolsOverview?.summary.integral_enabled_count, "0"),
                    note: copy.tools.summaryIntegralNote,
                  },
                  {
                    title: copy.tools.ready,
                    value: stringValue(toolsOverview?.summary.provider_ready_count, "0"),
                    note: copy.tools.summaryReadyNote,
                  },
                  {
                    title: copy.tools.linkRequired,
                    value: stringValue(toolsOverview?.summary.link_required_count, "0"),
                    note: copy.tools.summaryLinkRequiredNote,
                  },
                ].map((card) => (
                  <ToolsSummaryCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    note={card.note}
                  />
                ))}
                </div>
              </section>

              <section className="aion-panel aion-tools-directory">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.tools.eyebrow}</p>
                    <h2 className="font-display text-3xl text-base-900">{copy.tools.directoryTitle}</h2>
                  </div>
                  <div className="aion-chip rounded-[1rem] px-3 py-2">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-base-800">{copy.tools.groupCount}</p>
                    <p className="mt-1 text-sm font-semibold text-base-900">
                      {toolsOverview
                        ? `${toolsOverview.summary.total_items} ${toolsOverview.summary.total_items === 1 ? copy.tools.itemSingularSuffix : copy.tools.itemsSuffix}`
                        : copy.tools.workspaceSnapshot}
                    </p>
                  </div>
                </div>

                {toolsLoading ? (
                  <StatePanel tone="neutral" title={copy.common.stateLoadingTitle} body={copy.tools.loading} loading />
                ) : null}

                {!toolsLoading && !toolsOverview ? (
                  <StatePanel tone="neutral" title={copy.common.stateEmptyTitle} body={copy.tools.empty} />
                ) : null}

                <div className="grid gap-5">
                  {toolsOverview?.groups.map((group) => (
                    <article key={group.id} className="aion-tools-group">
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="font-display text-2xl text-base-900">{group.title}</h3>
                          <p className="mt-1 max-w-3xl text-sm leading-7 text-base-800">{group.description}</p>
                        </div>
                        <div className="rounded-[1rem] bg-base-100 px-3 py-2">
                          <p className="text-[10px] uppercase tracking-[0.18em] text-base-800">{copy.tools.groupCount}</p>
                          <p className="mt-1 text-sm font-semibold text-base-900">
                            {group.item_count} {group.item_count === 1 ? copy.tools.itemSingularSuffix : copy.tools.itemsSuffix}
                          </p>
                        </div>
                      </div>

                      <div className="aion-tools-item-grid">
                        {group.items.map((item) => (
                          <section key={item.id} className="aion-tools-item-card">
                            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="font-display text-xl text-base-900">{item.label}</h4>
                                  {item.integral ? (
                                    <span className="rounded-full bg-primary/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                                      {copy.tools.integral}
                                    </span>
                                  ) : null}
                                </div>
                                <p className="mt-2 text-sm leading-7 text-base-800">{item.description}</p>
                              </div>
                              <div className={`badge ${toolStatusClass(item.status)}`}>{formatToolState(item.status, copy.tools)}</div>
                            </div>

                            <div className="aion-tools-fact-grid">
                              <ToolsFactCard label={copy.tools.availability}>
                                <p className="mt-2 text-base font-semibold text-base-900">
                                  {item.enabled ? copy.common.on : copy.common.off}
                                </p>
                              </ToolsFactCard>
                              <ToolsFactCard label={copy.tools.provider}>
                                <p className="mt-2 text-base font-semibold text-base-900">
                                  {item.provider.name.replaceAll("_", " ")}
                                </p>
                                <p className="mt-1 text-xs text-base-800">
                                  {item.provider.ready
                                    ? copy.tools.providerReadyValue
                                    : item.provider.configured
                                      ? copy.tools.providerConfiguredValue
                                      : copy.tools.providerNotConfiguredValue}
                                </p>
                              </ToolsFactCard>
                              <ToolsFactCard label={copy.tools.control}>
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
                              </ToolsFactCard>
                              <ToolsFactCard label={copy.tools.linkState}>
                                <p className="mt-2 text-base font-semibold text-base-900">
                                  {formatToolLinkState(item.link_state, copy.tools)}
                                </p>
                              </ToolsFactCard>
                            </div>

                            <div className="space-y-3">
                              <ToolsDetailCard label={copy.tools.currentStatus}>
                                <p className="mt-2 text-sm leading-7 text-base-900">{item.status_reason}</p>
                              </ToolsDetailCard>

                              <ToolsDetailCard label={copy.tools.nextStep}>
                                <p className="mt-2 text-sm leading-7 text-base-900">
                                  {summarizeToolAction(item.next_actions, copy.tools.noAction)}
                                </p>
                              </ToolsDetailCard>

                              {item.id === "telegram" &&
                              item.user_control.requested_enabled &&
                              item.provider.ready &&
                              item.link_state !== "linked" ? (
                                <ToolsTelegramLinkPanel
                                  title={copy.tools.telegramLinking}
                                  body={copy.tools.telegramInstructionBody}
                                  buttonLabel={
                                    telegramLinkBusy
                                      ? copy.tools.generating
                                      : telegramLinkStart
                                        ? copy.tools.rotateCode
                                        : copy.tools.generateCode
                                  }
                                  linkStart={telegramLinkStart}
                                  linkCodeLabel={copy.tools.linkCode}
                                  expiresInAboutLabel={copy.tools.expiresInAbout}
                                  secondsLabel={copy.tools.seconds}
                                  instructionLabel={copy.tools.instruction}
                                  noLinkCodeLabel={copy.tools.noLinkCode}
                                  busy={telegramLinkBusy}
                                  onStart={() => {
                                    void handleStartTelegramLink();
                                  }}
                                />
                              ) : null}

                              <details className="aion-tools-details">
                                <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-base-900">
                                  {copy.tools.technicalDetails}
                                </summary>
                                <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
                                  <ToolsTechnicalDetailPanel
                                    label={copy.tools.capabilities}
                                    values={item.capabilities}
                                    emptyLabel={copy.common.noData}
                                  />
                                  <ToolsTechnicalDetailPanel
                                    label={copy.common.sourceOfTruth}
                                    values={item.source_of_truth}
                                    emptyLabel={copy.common.noData}
                                    chipTone="muted"
                                  />
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
            <div className="aion-personality-canvas grid gap-4">
              <section className="aion-personality-overview-bar">
                <span className="aion-chat-headline-emblem" aria-hidden="true" />
                <div className="aion-personality-overview-copy">
                  <p className="text-sm uppercase tracking-[0.24em] text-base-800">{copy.personality.eyebrow}</p>
                  <h2 className="mt-1.5 font-display text-4xl text-base-900">{copy.personality.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-base-800">{copy.personality.subtitle}</p>
                </div>
                <div className="aion-personality-overview-status" aria-label="Personality status">
                  <span>Stable</span>
                  <strong>{stringValue(preferenceSummary?.learned_preference_count, "0")} cues</strong>
                </div>
              </section>

              <div className="aion-personality-main-grid grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(22rem,0.74fr)]">
                <div className="aion-personality-primary-stack grid gap-6">
                  <section className="aion-panel aion-personality-hero">
                    <div className="aion-personality-hero-stage">
                      <div className="aion-personality-hero-figure">
                        {personalityPreviewCallouts.map((callout) => (
                          <article key={callout.key} className={callout.className}>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-base-800">{callout.eyebrow}</p>
                            <p className="mt-2 font-display text-xl text-base-900">{callout.title}</p>
                            <p className="mt-2 text-sm leading-6 text-base-800">{callout.body}</p>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div className="aion-personality-timeline-panel aion-personality-timeline-panel-integrated">
                      <div className="mb-4">
                        <p className="text-sm uppercase tracking-[0.24em] text-base-800">Mind layers timeline</p>
                        <h3 className="mt-2 font-display text-2xl text-base-900">Embodied personality layers in motion</h3>
                      </div>
                      <div className="grid gap-3">
                        {personalityTimelineRows.map((row) => (
                          <PersonalityTimelineRow
                            key={row.title}
                            token={row.token}
                            title={row.title}
                            detail={row.detail}
                            value={row.value}
                          />
                        ))}
                      </div>
                    </div>
                  </section>

                </div>

                <div className="aion-personality-side-stack">
                  <InsightPanel
                    eyebrow="Conscious layer"
                    title="Active awareness and current cognition"
                    body="The foreground loop stays visible through focus, clarity, active load, and the present task horizon."
                    className="aion-personality-side-panel aion-personality-side-panel-conscious"
                  >
                    <div className="grid gap-3">
                      {personalityConsciousSignals.map((item) => (
                        <div key={item.label} className="aion-personality-signal-row">
                          <span className="aion-personality-signal-label">{item.label}</span>
                          <span className="aion-personality-signal-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </InsightPanel>

                  <InsightPanel
                    eyebrow="Subconscious layer"
                    title="Background patterns and latent knowledge"
                    body="Longer memory, associations, and learned preferences stay active without crowding the live route."
                    className="aion-personality-side-panel aion-personality-side-panel-subconscious"
                  >
                    <div className="grid gap-3">
                      {personalitySubconsciousSignals.map((item) => (
                        <div key={item.label} className="aion-personality-signal-row">
                          <span className="aion-personality-signal-label">{item.label}</span>
                          <span className="aion-personality-signal-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </InsightPanel>

                  <InsightPanel
                    eyebrow="Recent activity"
                    title="Latest internal movement"
                    body="Recent changes stay readable before the user opens the deeper sections."
                    className="aion-personality-side-panel aion-personality-side-panel-recent aion-personality-side-panel-recent-quiet"
                  >
                    <div className="grid gap-3">
                      {personalityRecentActivity.map((item) => (
                        <div key={item.key} className="aion-personality-activity-row">
                          <div>
                            <p className="text-sm font-semibold text-base-900">{item.title}</p>
                            <p className="mt-1 text-sm text-base-800">{item.when}</p>
                          </div>
                          <span className="aion-chip-ghost rounded-full px-3 py-1 text-xs font-medium">{copy.common.view}</span>
                        </div>
                      ))}
                    </div>
                  </InsightPanel>
                </div>
              </div>

            </div>
          ) : null}
            </main>

          </div>
        </div>
          </div>
        </section>

        {route !== "/chat" ? (
          <nav className="aion-mobile-tabbar fixed inset-x-0 bottom-0 z-30 border-t border-base-300 bg-base-100/95 px-3 py-3 backdrop-blur md:hidden">
            <div ref={mobileNavScrollRef} className="aion-mobile-tabbar-scroll mx-auto flex max-w-2xl gap-2 overflow-x-auto">
              {ROUTES.map((entry) => (
                <button
                  key={entry}
                  ref={(node) => {
                    mobileNavRefs.current[entry] = node;
                  }}
                  className={`aion-mobile-tabbar-button rounded-[1.2rem] px-3 py-3 text-sm font-medium transition ${
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
        ) : null}
      </div>
    </div>
  );
}
