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
