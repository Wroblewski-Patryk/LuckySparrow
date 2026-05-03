import type { FormEvent, ReactNode } from "react";

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
