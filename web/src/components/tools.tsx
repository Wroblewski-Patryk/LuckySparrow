import type { ReactNode } from "react";

export function ToolsSummaryCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <article className="aion-tools-summary-card">
      <p className="aion-tools-summary-label">{title}</p>
      <p className="aion-tools-summary-value">{value}</p>
      <p className="aion-tools-summary-note">{note}</p>
    </article>
  );
}

export function ToolsFactCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="aion-tools-fact-card">
      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{label}</p>
      {children}
    </div>
  );
}

export function ToolsDetailCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="aion-tools-detail-card">
      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{label}</p>
      {children}
    </div>
  );
}

export function ToolsTechnicalDetailPanel({
  label,
  values,
  emptyLabel,
  chipTone = "default",
}: {
  label: string;
  values: string[];
  emptyLabel: string;
  chipTone?: "default" | "muted";
}) {
  const chipClassName =
    chipTone === "muted"
      ? "rounded-full bg-base-100 px-3 py-1 text-xs font-medium text-base-800"
      : "rounded-full border border-base-300 bg-base-100 px-3 py-1 text-xs font-medium text-base-900";

  return (
    <div className="rounded-2xl bg-base-200 p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-base-800">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.length > 0 ? (
          values.map((value) => (
            <span key={value} className={chipClassName}>
              {value}
            </span>
          ))
        ) : (
          <span className="text-sm text-base-800">{emptyLabel}</span>
        )}
      </div>
    </div>
  );
}

export function ToolsTelegramLinkPanel({
  title,
  body,
  buttonLabel,
  linkStart,
  linkCodeLabel,
  expiresInAboutLabel,
  secondsLabel,
  instructionLabel,
  noLinkCodeLabel,
  busy,
  onStart,
}: {
  title: string;
  body: string;
  buttonLabel: string;
  linkStart: {
    link_code: string;
    instruction_text: string;
    expires_in_seconds: number;
  } | null;
  linkCodeLabel: string;
  expiresInAboutLabel: string;
  secondsLabel: string;
  instructionLabel: string;
  noLinkCodeLabel: string;
  busy: boolean;
  onStart: () => void;
}) {
  return (
    <div className="rounded-2xl border border-base-300 px-4 py-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-base-800">{title}</p>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-base-900">{body}</p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          disabled={busy}
          type="button"
          onClick={onStart}
        >
          {buttonLabel}
        </button>
      </div>

      {linkStart ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
          <div className="rounded-2xl bg-base-200 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-base-800">{linkCodeLabel}</p>
            <p className="mt-2 font-display text-3xl tracking-[0.18em] text-base-900">
              {linkStart.link_code}
            </p>
            <p className="mt-2 text-xs text-base-800">
              {expiresInAboutLabel} {linkStart.expires_in_seconds} {secondsLabel}.
            </p>
          </div>
          <div className="rounded-2xl bg-base-200 p-3">
            <p className="text-xs uppercase tracking-[0.18em] text-base-800">{instructionLabel}</p>
            <p className="mt-2 text-sm leading-7 text-base-900">
              {linkStart.instruction_text}
            </p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-base-800">{noLinkCodeLabel}</p>
      )}
    </div>
  );
}
