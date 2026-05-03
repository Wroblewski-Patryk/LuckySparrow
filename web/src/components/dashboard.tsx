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
