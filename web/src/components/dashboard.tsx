export function DashboardSignalCard({
  eyebrow,
  value,
  detail,
  note,
}: {
  eyebrow: string;
  value: string;
  detail: string;
  note: string;
}) {
  return (
    <article className="aion-dashboard-signal-card">
      <p className="aion-dashboard-signal-eyebrow">{eyebrow}</p>
      <p className="aion-dashboard-signal-value">{value}</p>
      <p className="aion-dashboard-signal-detail">{detail}</p>
      <div className="aion-dashboard-signal-wave" aria-hidden="true" />
      <p className="aion-dashboard-signal-note">{note}</p>
    </article>
  );
}

export function DashboardSignalColumn({
  cards,
  placement,
}: {
  cards: Array<{
    placement: string;
    eyebrow: string;
    value: string;
    detail: string;
    note: string;
  }>;
  placement: string;
}) {
  return (
    <div className="aion-dashboard-signal-column">
      {cards
        .filter((card) => card.placement === placement)
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
  );
}

export function DashboardProgressList({
  items,
}: {
  items: Array<{
    title: string;
    value: string;
    width: string;
  }>;
}) {
  return (
    <div className="mt-5 grid gap-4">
      {items.map((item) => (
        <div key={item.title}>
          <div className="flex items-center justify-between gap-3 text-sm text-base-900">
            <span>{item.title}</span>
            <span>{item.value}</span>
          </div>
          <div className="aion-dashboard-progress mt-2">
            <span style={{ width: item.width }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DashboardReflectionList({
  items,
}: {
  items: Array<{
    title: string;
    tag: string;
  }>;
}) {
  return (
    <div className="aion-dashboard-reflection-list mt-5">
      {items.map((row) => (
        <div key={row.title} className="aion-dashboard-reflection-row">
          <span className="aion-dashboard-reflection-tag">{row.tag}</span>
          <p>{row.title}</p>
        </div>
      ))}
    </div>
  );
}

export function DashboardMemoryBarChart({
  items,
}: {
  items: Array<{
    label: string;
    height: string;
  }>;
}) {
  return (
    <div className="aion-dashboard-bar-chart mt-6">
      {items.map((bar) => (
        <div key={bar.label} className="aion-dashboard-bar-item">
          <span className="aion-dashboard-bar-fill" style={{ height: bar.height }} />
          <span className="aion-dashboard-bar-label">{bar.label}</span>
        </div>
      ))}
    </div>
  );
}

export function DashboardGuidanceList({
  items,
  onSelect,
}: {
  items: Array<{
    title: string;
    body: string;
    action: string;
    targetRoute?: string;
  }>;
  onSelect?: (targetRoute: string) => void;
}) {
  return (
    <div className="aion-dashboard-guidance-list">
      {items.slice(0, 4).map((card, index) => (
        <article
          key={card.title}
          className={`aion-dashboard-guidance-row ${index === 0 ? "aion-dashboard-guidance-row-lead" : ""}`}
        >
          <span className="aion-dashboard-guidance-token" aria-hidden="true" />
          <div className="aion-dashboard-guidance-row-copy">
            <p className="aion-dashboard-guidance-row-title">{card.title}</p>
            <p className="aion-dashboard-guidance-row-body">{card.body}</p>
          </div>
          <button
            className="aion-dashboard-mini-action aion-dashboard-mini-action-quiet"
            type="button"
            onClick={card.targetRoute ? () => onSelect?.(card.targetRoute ?? "") : undefined}
          >
            {card.action}
          </button>
        </article>
      ))}
    </div>
  );
}

export function DashboardRecentActivityList({
  items,
}: {
  items: Array<{
    key: string;
    title: string;
    when: string;
  }>;
}) {
  return (
    <div className="grid gap-2.5">
      {items.map((item) => (
        <article key={item.key} className="aion-dashboard-recent-row">
          <span className="aion-dashboard-recent-token" aria-hidden="true" />
          <div className="aion-dashboard-recent-row-copy">
            <p className="text-[0.82rem] font-semibold text-base-900">{item.title}</p>
          </div>
          <span className="aion-dashboard-recent-time text-xs uppercase tracking-[0.18em] text-base-800">
            {item.when}
          </span>
        </article>
      ))}
    </div>
  );
}

export function DashboardBalanceGrid({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <div className="aion-dashboard-summary-balance-grid">
      {items.map((row, index) => (
        <div key={row.label} className="aion-dashboard-summary-balance-row">
          <div className="aion-dashboard-summary-balance-label">
            <span className={`aion-dashboard-summary-balance-token aion-dashboard-summary-balance-token-${index + 1}`} />
            <span>{row.label}</span>
          </div>
          <strong>{row.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function DashboardCognitiveFlowTrack({
  steps,
}: {
  steps: Array<{
    token: string;
    title: string;
    detail: string;
    active?: boolean;
  }>;
}) {
  return (
    <div className="aion-dashboard-flow-track aion-dashboard-flow-track-bridge">
      {steps.map((step) => (
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
  );
}

export function DashboardFigureNoteList({
  notes,
}: {
  notes: Array<{
    key: string;
    className: string;
    eyebrow: string;
    title: string;
    body: string;
  }>;
}) {
  return (
    <>
      {notes.map((note) => (
        <article key={note.key} className={note.className}>
          <p className="aion-dashboard-figure-note-eyebrow">{note.eyebrow}</p>
          <p className="aion-dashboard-figure-note-title">{note.title}</p>
          <p className="aion-dashboard-figure-note-body">{note.body}</p>
        </article>
      ))}
    </>
  );
}
