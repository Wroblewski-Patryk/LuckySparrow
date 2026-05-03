import type { ReactNode } from "react";

export function SettingsCard({
  label,
  title,
  body,
  lead = false,
  accessory,
  children,
}: {
  label: string;
  title: string;
  body: string;
  lead?: boolean;
  accessory?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className={`aion-settings-card ${lead ? "aion-settings-card-lead" : ""}`.trim()}>
      {accessory ? (
        <div className="aion-settings-card-header">
          <div>
            <p className="aion-settings-card-label">{label}</p>
            <h4 className="aion-settings-card-title">{title}</h4>
          </div>
          {accessory}
        </div>
      ) : (
        <>
          <p className="aion-settings-card-label">{label}</p>
          <h4 className="aion-settings-card-title">{title}</h4>
        </>
      )}
      <p className="aion-settings-card-body">{body}</p>
      {children}
    </section>
  );
}

export function SettingsFact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="aion-settings-fact">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}
