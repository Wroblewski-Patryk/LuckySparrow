import type { ReactNode } from "react";

export function StatePanel({
  tone,
  title,
  body,
  loading = false,
}: {
  tone: "neutral" | "success" | "error";
  title: string;
  body: string;
  loading?: boolean;
}) {
  const toneClasses =
    tone === "error"
      ? "border-error/30 bg-error/5 text-base-900"
      : tone === "success"
        ? "border-success/30 bg-success/10 text-base-900"
        : "border-base-300 bg-base-200 text-base-900";

  return (
    <div className={`rounded-2xl border px-4 py-5 ${toneClasses}`}>
      <div className="flex items-start gap-3">
        {loading ? <span className="loading loading-spinner loading-sm mt-0.5 text-primary" /> : null}
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="mt-1 text-sm leading-7 text-base-800">{body}</p>
        </div>
      </div>
    </div>
  );
}

export function ModuleEntryCard({
  label,
  title,
  body,
  meta,
  onClick,
}: {
  label: string;
  title: string;
  body: string;
  meta: string;
  onClick: () => void;
}) {
  return (
    <button
      className="aion-panel-soft group rounded-[1.6rem] p-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-[#7ea79f]/35"
      onClick={onClick}
      type="button"
    >
      <p className="text-[11px] uppercase tracking-[0.24em] text-base-800">{label}</p>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl text-base-900">{title}</h3>
          <p className="mt-2 text-sm leading-7 text-base-800">{body}</p>
        </div>
        <span className="aion-chip rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-base-900">
          {meta}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-base-800">
        <span>Open space</span>
        <span className="font-semibold text-base-900 transition group-hover:translate-x-1">→</span>
      </div>
    </button>
  );
}

export function FlowRail({
  items,
}: {
  items: Array<{
    eyebrow: string;
    title: string;
    body: string;
  }>;
}) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article key={item.title} className="aion-flow-line pl-8">
          <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#8eb8b2]/35 bg-[#f6faf8] text-[10px] font-semibold text-[#567671]">
            â€˘
          </span>
          <p className="text-[11px] uppercase tracking-[0.22em] text-base-800">{item.eyebrow}</p>
          <h4 className="mt-1 font-display text-xl text-base-900">{item.title}</h4>
          <p className="mt-2 text-sm leading-7 text-base-800">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function ModuleOverviewBar({
  routeKey,
  eyebrow,
  title,
  subtitle,
  statusLabel,
  statusValue,
  statusAriaLabel,
}: {
  routeKey: string;
  eyebrow: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
  statusLabel: ReactNode;
  statusValue: ReactNode;
  statusAriaLabel: string;
}) {
  return (
    <section className={`aion-${routeKey}-overview-bar`}>
      <span className="aion-chat-headline-emblem" aria-hidden="true" />
      <div className={`aion-${routeKey}-overview-copy`}>
        <p className="text-sm uppercase tracking-[0.24em] text-base-800">{eyebrow}</p>
        <h2 className="mt-1.5 font-display text-4xl text-base-900">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-base-800">{subtitle}</p>
      </div>
      <div className={`aion-${routeKey}-overview-status`} aria-label={statusAriaLabel}>
        <span>{statusLabel}</span>
        <strong>{statusValue}</strong>
      </div>
    </section>
  );
}

export function ModuleStatRow({
  routeKey,
  ariaLabel,
  children,
}: {
  routeKey: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <section className={`aion-${routeKey}-stat-row`} aria-label={ariaLabel}>
      {children}
    </section>
  );
}

export function ModuleActivityList({
  routeKey,
  items,
}: {
  routeKey: string;
  items: Array<{
    key: string;
    title: ReactNode;
    when: ReactNode;
  }>;
}) {
  return (
    <div className="mt-4 grid gap-3">
      {items.map((item) => (
        <article key={item.key} className={`aion-${routeKey}-activity-row`}>
          <span className={`aion-${routeKey}-activity-dot`} aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-base-900">{item.title}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-base-800">{item.when}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ModuleTextCardList({
  routeKey,
  cardKey,
  items,
}: {
  routeKey: string;
  cardKey: string;
  items: Array<{
    title: ReactNode;
    body: ReactNode;
  }>;
}) {
  return (
    <div className="mt-5 grid gap-3">
      {items.map((item) => (
        <article key={String(item.title)} className={`aion-${routeKey}-${cardKey}-card`}>
          <h4 className={`aion-${routeKey}-${cardKey}-title`}>{item.title}</h4>
          <p className={`aion-${routeKey}-${cardKey}-body`}>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export function ModuleDotRowList({
  routeKey,
  rowKey,
  items,
}: {
  routeKey: string;
  rowKey: string;
  items: Array<{
    title: ReactNode;
    body: ReactNode;
  }>;
}) {
  return (
    <div className="mt-4 grid gap-3">
      {items.map((item) => (
        <article key={String(item.title)} className={`aion-${routeKey}-${rowKey}-row`}>
          <span className={`aion-${routeKey}-${rowKey}-dot`} aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-base-900">{item.title}</p>
            <p className="mt-1 text-sm leading-6 text-base-800">{item.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ModuleValueRowList({
  routeKey,
  rowKey,
  items,
}: {
  routeKey: string;
  rowKey: string;
  items: Array<{
    token: ReactNode;
    title: ReactNode;
    detail: ReactNode;
    value: ReactNode;
  }>;
}) {
  return (
    <div className={`aion-${routeKey}-${rowKey}-list`}>
      {items.map((item) => (
        <article key={String(item.title)} className={`aion-${routeKey}-${rowKey}-row`}>
          <div className={`aion-${routeKey}-${rowKey}-copy`}>
            <span className={`aion-${routeKey}-${rowKey}-token`}>{item.token}</span>
            <div>
              <p className={`aion-${routeKey}-${rowKey}-title`}>{item.title}</p>
              <p className={`aion-${routeKey}-${rowKey}-detail`}>{item.detail}</p>
            </div>
          </div>
          <strong>{item.value}</strong>
        </article>
      ))}
    </div>
  );
}

export function RouteHeroPanel({
  eyebrow,
  title,
  body,
  chips,
  className = "",
}: {
  eyebrow: string;
  title: string;
  body: string;
  chips: string[];
  className?: string;
}) {
  return (
    <section className={`aion-panel aion-halo rounded-[2rem] p-5 ${className}`}>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-base-800">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl text-base-900 md:text-4xl">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-base-800 md:text-base">{body}</p>
        </div>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {chips.map((chip) => (
            <span key={chip} className="aion-chip rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-base-900">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InsightPanel({
  eyebrow,
  title,
  body,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`aion-panel-soft rounded-[2rem] p-5 ${className}`}>
      <div className="mb-4 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.24em] text-base-800">{eyebrow}</p>
        <h3 className="mt-2 font-display text-2xl text-base-900">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-base-800">{body}</p>
      </div>
      {children}
    </section>
  );
}

export function RouteStatCard({
  routeKey,
  label,
  value,
  detail,
}: {
  routeKey: string;
  label: ReactNode;
  value: ReactNode;
  detail: ReactNode;
}) {
  return (
    <article className={`aion-${routeKey}-stat-card`}>
      <p className={`aion-${routeKey}-stat-label`}>{label}</p>
      <p className={`aion-${routeKey}-stat-value`}>{value}</p>
      <p className={`aion-${routeKey}-stat-detail`}>{detail}</p>
    </article>
  );
}

export function RouteNoteCard({
  routeKey,
  title,
  body,
}: {
  routeKey: string;
  title: ReactNode;
  body: ReactNode;
}) {
  return (
    <article className={`aion-${routeKey}-note-card`}>
      <h4 className={`aion-${routeKey}-note-title`}>{title}</h4>
      <p className={`aion-${routeKey}-note-body`}>{body}</p>
    </article>
  );
}

export function ModuleRouteSidePanel({
  routeKey,
  eyebrow,
  title,
  variant,
  children,
}: {
  routeKey: string;
  eyebrow: ReactNode;
  title?: ReactNode;
  variant?: string;
  children: ReactNode;
}) {
  const variantClass = variant ? ` aion-${routeKey}-side-panel-${variant}` : "";

  return (
    <section className={`aion-${routeKey}-side-panel${variantClass}`}>
      <p className="text-sm uppercase tracking-[0.24em] text-base-800">{eyebrow}</p>
      {title ? <h3 className="mt-2 font-display text-2xl text-base-900">{title}</h3> : null}
      {children}
    </section>
  );
}

export function ModuleRouteSideRow({
  routeKey,
  rowKey,
  title,
  body,
}: {
  routeKey: string;
  rowKey: string;
  title: ReactNode;
  body: ReactNode;
}) {
  return (
    <article className={`aion-${routeKey}-${rowKey}-row`}>
      <span className={`aion-${routeKey}-${rowKey}-dot`} aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-base-900">{title}</p>
        <p className="mt-1 text-sm leading-6 text-base-800">{body}</p>
      </div>
    </article>
  );
}

export function FeedbackBanner({
  tone,
  title,
  body,
  detail,
  detailLabel,
}: {
  tone: "success" | "error";
  title: string;
  body: string;
  detail?: string | null;
  detailLabel: string;
}) {
  const toneClasses =
    tone === "error"
      ? "border-error/40 bg-error/8 text-base-900"
      : "border-success/40 bg-success/12 text-base-900";

  return (
    <div className={`mb-4 rounded-[1.5rem] border px-4 py-4 shadow-sm ${toneClasses}`}>
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-7 text-base-800">{body}</p>
      {detail ? (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-medium text-base-900">{detailLabel}</summary>
          <p className="mt-2 break-words rounded-xl bg-base-100/80 px-3 py-3 text-sm leading-7 text-base-800">
            {detail}
          </p>
        </details>
      ) : null}
    </div>
  );
}
