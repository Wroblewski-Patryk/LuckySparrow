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
