import { forwardRef, type FormEvent, type ReactNode } from "react";
import type { ChatDeliveryState } from "../lib/chat-transcript";

export type ChatCognitiveBeltItem = {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  meta: string;
  tone: "lead" | "soft" | "progress";
};

export function ChatFlowStage({
  label,
  title,
  detail,
  active = false,
}: {
  label: string;
  title: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <article className={`aion-chat-flow-stage ${active ? "aion-chat-flow-stage-active" : ""}`}>
      <span className={`aion-chat-flow-icon ${active ? "aion-chat-flow-icon-active" : ""}`}>{label}</span>
      <div>
        <p className="text-base font-semibold text-base-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-base-800">{detail}</p>
      </div>
    </article>
  );
}

export function ChatTopbar({
  title,
  activeSummary,
  linkedChannelsLabel,
  preferredLanguageLabel,
}: {
  title: string;
  activeSummary: string;
  linkedChannelsLabel: string;
  preferredLanguageLabel: string;
}) {
  return (
    <div className="aion-chat-topbar">
      <div className="aion-chat-headline">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="aion-chat-title">{title}</h2>
          <span className="aion-chat-live-status">
            <span className="aion-chat-live-status-dot" />
            {activeSummary}
          </span>
        </div>
      </div>
      <div className="aion-chat-route-posture">
        <span>{linkedChannelsLabel}</span>
        <span>{preferredLanguageLabel}</span>
      </div>
    </div>
  );
}

export const ChatTranscriptMessageRow = forwardRef<
  HTMLDivElement,
  {
    isUser: boolean;
    preview: boolean;
    speakerLabel: string;
    timestampLabel: string;
    deliveryState: ChatDeliveryState | null;
    deliveryLabel: string | null;
    children: ReactNode;
  }
>(function ChatTranscriptMessageRow(
  {
    isUser,
    preview,
    speakerLabel,
    timestampLabel,
    deliveryState,
    deliveryLabel,
    children,
  },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`aion-chat-message-row ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser ? <span className="aion-chat-avatar">A</span> : null}
      <article className={`aion-chat-message ${isUser ? "aion-chat-message-user" : "aion-chat-message-assistant"}`}>
        <div className={`aion-chat-message-meta ${preview ? "aion-chat-message-meta-preview" : ""}`}>
          <span className="aion-chat-message-speaker">{speakerLabel}</span>
          <span className="aion-chat-meta-separator" aria-hidden="true" />
          <span>{timestampLabel}</span>
          {deliveryState && deliveryLabel ? (
            <span
              aria-label={deliveryLabel}
              className={`aion-chat-delivery-status aion-chat-delivery-status-${deliveryState}`}
              title={deliveryLabel}
            />
          ) : null}
        </div>
        <div className={`aion-chat-message-copy ${preview ? "aion-chat-message-copy-preview" : ""}`}>
          {children}
        </div>
      </article>
    </div>
  );
});

export function ChatCognitiveBelt({
  items,
  goalProgress,
}: {
  items: ChatCognitiveBeltItem[];
  goalProgress: string;
}) {
  return (
    <div className="aion-chat-cognitive-belt" aria-label="Conversation context">
      {items.map((item) => (
        <article
          key={item.key}
          className={`aion-chat-belt-card aion-chat-belt-card-${item.tone}`}
        >
          <div className="aion-chat-belt-card-head">
            <p className="aion-chat-belt-eyebrow">{item.eyebrow}</p>
            <span className="aion-chat-belt-meta">{item.meta}</span>
          </div>
          <h3 className="aion-chat-belt-title">{item.title}</h3>
          <p className="aion-chat-belt-body">{item.body}</p>
          {item.key === "goal" ? (
            <div className="aion-chat-belt-progress" aria-hidden="true">
              <span style={{ width: goalProgress }} />
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

export function ChatPortraitPanel({
  currentFocus,
  emphasis,
  learnedCueCount,
}: {
  currentFocus: string;
  emphasis: string;
  learnedCueCount: string;
}) {
  return (
    <aside className="aion-chat-portrait-panel aion-chat-portrait-panel-elevated">
      <article className="aion-chat-portrait-note aion-chat-portrait-note-memory">
        <p className="aion-chat-portrait-note-eyebrow">Memory continuity</p>
        <p className="aion-chat-portrait-note-title">Strong coherence</p>
        <p className="aion-chat-portrait-note-body">
          Preferences stable across touchpoints.
        </p>
      </article>
      <article className="aion-chat-portrait-note aion-chat-portrait-note-expression">
        <p className="aion-chat-portrait-note-eyebrow">Expression</p>
        <p className="aion-chat-portrait-note-title">Attentive</p>
        <p className="aion-chat-portrait-note-body">
          Listening and synthesizing context.
        </p>
      </article>
      <article className="aion-chat-portrait-note aion-chat-portrait-note-channels">
        <p className="aion-chat-portrait-note-eyebrow">Channel</p>
        <p className="aion-chat-portrait-note-title">App</p>
        <p className="aion-chat-portrait-note-body">
          Private focused environment.
        </p>
      </article>
      <div className="aion-chat-portrait-overlay">
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#5f8f93]">Planning</p>
        <p className="mt-2 font-display text-[1.62rem] leading-[1.08] text-base-900">{currentFocus}</p>
        <div className="mt-3 text-[0.8rem] text-base-800">
          <div className="flex items-center justify-between gap-3">
            <span>Current focus</span>
            <span className="font-semibold text-base-900">{emphasis}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Learned cues</span>
            <span className="font-semibold text-[#5f8f93]">
              {learnedCueCount}
            </span>
          </div>
        </div>
      </div>
      <div className="aion-chat-portrait-copy">
        <span className="aion-chat-portrait-chip">Embodied cognition</span>
        <p className="mt-3.5 max-w-[12rem] text-[0.84rem] leading-6 text-base-800">
          Clarity forms before action takes shape.
        </p>
      </div>
    </aside>
  );
}

export function ChatComposerShell({
  quickActions,
  text,
  placeholder,
  sending,
  sendLabel,
  note,
  addIcon,
  voiceIcon,
  sendIcon,
  onQuickAction,
  onTextChange,
  onSubmit,
}: {
  quickActions: string[];
  text: string;
  placeholder: string;
  sending: boolean;
  sendLabel: string;
  note: string;
  addIcon: ReactNode;
  voiceIcon: ReactNode;
  sendIcon: ReactNode;
  onQuickAction: (value: string) => void;
  onTextChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="aion-chat-composer-zone">
      <div className="aion-chat-action-tray">
        {quickActions.map((action) => (
          <button
            key={action}
            className={`aion-chat-action-chip ${
              quickActions.length === 1 ? "aion-chat-action-chip-solo" : ""
            }`}
            type="button"
            onClick={() => onQuickAction(action)}
          >
            {action}
          </button>
        ))}
      </div>
      <form className="aion-chat-composer" onSubmit={onSubmit}>
        <div className="aion-chat-mode-tabs" aria-label="Conversation mode">
          {["Ask", "Plan", "Reflect", "Execute"].map((mode, index) => (
            <span
              key={mode}
              className={`aion-chat-mode-tab ${index === 0 ? "aion-chat-mode-tab-active" : ""}`}
            >
              {mode}
            </span>
          ))}
        </div>
        <div className="aion-chat-composer-primary">
          <button className="aion-chat-icon-button" type="button" aria-label="Add context">
            {addIcon}
          </button>
          <div className="aion-chat-input-stack">
            <textarea
              className="aion-chat-input"
              placeholder={placeholder}
              value={text}
              onChange={(event) => onTextChange(event.target.value)}
            />
          </div>
          <button className="aion-chat-icon-button hidden sm:inline-flex" type="button" aria-label="Voice input">
            {voiceIcon}
          </button>
          <button
            aria-label={sendLabel}
            className="aion-chat-send"
            disabled={sending}
            type="submit"
          >
            {sending ? "..." : sendIcon}
          </button>
        </div>
      </form>
      <p className="aion-chat-composer-note">{note}</p>
    </div>
  );
}
