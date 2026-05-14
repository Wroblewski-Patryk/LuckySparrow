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

export function SettingsStatusPillList({ items }: { items: string[] }) {
  return (
    <div className="aion-settings-status-grid">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="aion-settings-status-pill">
          {item}
        </span>
      ))}
    </div>
  );
}

export function SettingsSelectOptionList<TOption extends { value: string }>({
  options,
  labelForOption,
}: {
  options: TOption[];
  labelForOption: (option: TOption) => string;
}) {
  return (
    <>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {labelForOption(option)}
        </option>
      ))}
    </>
  );
}

export function SettingsProactivePanel({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="aion-panel aion-settings-proactive-panel">
      <p className="aion-settings-card-label">{label}</p>
      <h3 className="aion-settings-card-title">{title}</h3>
      {children}
    </section>
  );
}

export function SettingsSavePanel({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <section className="aion-settings-save-panel">
      <div>
        <p className="aion-settings-save-title">{title}</p>
        <p className="aion-settings-save-body">{body}</p>
      </div>
      {children}
    </section>
  );
}

export function SettingsDangerPanel({
  label,
  title,
  body,
  impact,
  children,
}: {
  label: string;
  title: string;
  body: string;
  impact: string;
  children: ReactNode;
}) {
  return (
    <details className="aion-settings-danger-panel">
      <summary className="aion-settings-danger-summary">
        <span className="aion-settings-danger-summary-copy">
          <span className="aion-settings-danger-label">{label}</span>
          <span className="aion-settings-card-title">{title}</span>
          <span className="aion-settings-card-body">{body}</span>
        </span>
        <span aria-hidden="true" className="aion-settings-danger-disclosure-icon" />
      </summary>
      <div className="aion-settings-danger-content">
        <p className="aion-settings-help">{impact}</p>
        {children}
      </div>
    </details>
  );
}
