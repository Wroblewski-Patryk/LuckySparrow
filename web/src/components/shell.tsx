export type SidebarIconKind =
  | "dashboard"
  | "chat"
  | "personality"
  | "memory"
  | "reflections"
  | "plans"
  | "goals"
  | "insights"
  | "tools"
  | "automations"
  | "integrations"
  | "settings";

function SidebarGlyph({ kind }: { kind: SidebarIconKind }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (kind === "dashboard") {
    return (
      <svg {...commonProps}>
        <path d="M3.75 10.75 12 4l8.25 6.75" />
        <path d="M6.5 9.5V19h11V9.5" />
      </svg>
    );
  }

  if (kind === "chat") {
    return (
      <svg {...commonProps}>
        <path d="M7.5 18.5 4.75 20v-4.25A6.75 6.75 0 1 1 18 17H9.25" />
        <path d="M8.5 9.5h6.75" />
        <path d="M8.5 13h4.25" />
      </svg>
    );
  }

  if (kind === "personality") {
    return (
      <svg {...commonProps}>
        <path d="M12 20s5.25-5.68 5.25-9.5A5.25 5.25 0 1 0 6.75 10.5C6.75 14.32 12 20 12 20Z" />
        <path d="M12 12.5a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
      </svg>
    );
  }

  if (kind === "memory") {
    return (
      <svg {...commonProps}>
        <path d="M8 6.5h8a2 2 0 0 1 2 2v8.2a1 1 0 0 1-1.45.9L12 15.35 7.45 17.6A1 1 0 0 1 6 16.7V8.5a2 2 0 0 1 2-2Z" />
        <path d="M9.5 10h5" />
        <path d="M9.5 12.8h3.4" />
      </svg>
    );
  }

  if (kind === "reflections") {
    return (
      <svg {...commonProps}>
        <path d="M7 5.8h10v12.4H7z" />
        <path d="M9.2 9.1h5.6" />
        <path d="M9.2 12h4.2" />
        <path d="m9.3 15 1 1 2.2-2.4" />
      </svg>
    );
  }

  if (kind === "plans") {
    return (
      <svg {...commonProps}>
        <path d="M7 6.2h10v12H7z" />
        <path d="M9 4.8v2.8" />
        <path d="M15 4.8v2.8" />
        <path d="M9.5 11.4h5" />
        <path d="M9.5 14.4h3.3" />
      </svg>
    );
  }

  if (kind === "goals") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="6.8" />
        <circle cx="12" cy="12" r="3.2" />
        <path d="m12 12 3.4-3.4" />
      </svg>
    );
  }

  if (kind === "insights") {
    return (
      <svg {...commonProps}>
        <path d="M6.5 13.2 9.2 16l3.6-8 2.6 5.2 2.1-2.1" />
        <path d="M8 6.8v1.4" />
        <path d="M16 16v1.4" />
      </svg>
    );
  }

  if (kind === "tools") {
    return (
      <svg {...commonProps}>
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="16" cy="8" r="2.5" />
        <circle cx="8" cy="16" r="2.5" />
        <circle cx="16" cy="16" r="2.5" />
      </svg>
    );
  }

  if (kind === "automations") {
    return (
      <svg {...commonProps}>
        <path d="M8.2 8.2a4.9 4.9 0 0 1 7.6 0" />
        <path d="M15.8 15.8a4.9 4.9 0 0 1-7.6 0" />
        <path d="M16.8 5.9v3.1h-3.1" />
        <path d="M7.2 18.1V15h3.1" />
        <circle cx="12" cy="12" r="2.1" />
      </svg>
    );
  }

  if (kind === "integrations") {
    return (
      <svg {...commonProps}>
        <path d="M8.2 12h7.6" />
        <path d="M10.2 8.2 7.4 5.4a2 2 0 0 0-2.8 2.8l2.8 2.8" />
        <path d="m13.8 15.8 2.8 2.8a2 2 0 0 0 2.8-2.8l-2.8-2.8" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 4.8v1.7" />
      <path d="M12 17.5v1.7" />
      <path d="m18.2 6.8-1.22 1.22" />
      <path d="m7.02 17.98-1.22 1.22" />
      <path d="M19.2 12h-1.7" />
      <path d="M6.5 12H4.8" />
      <path d="m18.2 17.2-1.22-1.22" />
      <path d="M7.02 6.02 5.8 4.8" />
    </svg>
  );
}

export function ShellNavButton({
  label,
  active,
  icon,
  onClick,
  disabled = false,
}: {
  label: string;
  active: boolean;
  icon: SidebarIconKind;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      aria-disabled={disabled}
      className={`aion-nav-button ${active ? "aion-nav-button-active" : ""} ${disabled ? "aion-nav-button-muted" : ""}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <span className={`aion-nav-icon ${active ? "aion-nav-icon-active" : ""}`}>
        <SidebarGlyph kind={icon} />
      </span>
      <span className="aion-nav-label">{label}</span>
    </button>
  );
}

export function AviaryWordmark({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      aria-label="AION"
      className={`aion-brand-lockup ${compact ? "aion-brand-lockup-compact" : ""} ${className}`.trim()}
    >
      <img alt="" aria-hidden="true" className="aion-brand-mark" src="/aviary-logomark.svg" />
      <span className="aion-brand-word">AION</span>
    </div>
  );
}

export function SidebarBrandBlock() {
  return (
    <div className="aion-sidebar-brand">
      <div aria-label="AION" className="aion-brand-lockup aion-brand-lockup-compact aion-sidebar-brand-lockup">
        <span className="aion-sidebar-sunmark" aria-hidden="true" />
        <span className="aion-brand-word">AION</span>
      </div>
      <p className="aion-sidebar-brand-subtitle">
        <span>Your conscious</span>
        <span>companion</span>
      </p>
    </div>
  );
}

export function ShellUtilityBar({
  currentSurface,
  currentUserLabel,
  currentUserEmail,
  accountPanelOpen,
  avatarSrc,
  onAccountClick,
}: {
  currentSurface: string;
  currentUserLabel: string;
  currentUserEmail: string;
  accountPanelOpen: boolean;
  avatarSrc: string;
  onAccountClick: () => void;
}) {
  return (
    <header className="aion-utility-bar hidden xl:grid">
      <div className="aion-utility-context">
        <span className="aion-utility-context-emblem" aria-hidden="true">
          <span className="aion-utility-context-emblem-core" />
        </span>
        <div className="min-w-0">
          <p className="aion-utility-context-label">Aviary workspace</p>
          <p className="aion-utility-context-copy">{currentSurface}</p>
        </div>
      </div>
      <label className="aion-utility-search" aria-label="Workspace continuity frame">
        <span className="aion-utility-search-icon">âŚ•</span>
        <input
          readOnly
          type="text"
          value=""
          placeholder="One calm shell for memory, planning, and the next meaningful action."
        />
        <span className="aion-utility-search-shortcut">âŚK</span>
      </label>
      <div className="aion-utility-actions">
        <button className="aion-utility-pill" type="button">
          <span className="aion-utility-pill-dot" />
          Focus mode
        </button>
        <button className="aion-utility-pill" type="button">
          âś§
          Quick capture
        </button>
        <button className="aion-utility-icon-pill" type="button" aria-label="Notifications">
          3
        </button>
        <button
          className={`aion-utility-account ${accountPanelOpen ? "aion-utility-account-active" : ""}`}
          onClick={onAccountClick}
          type="button"
        >
          <span className="aion-utility-account-avatar" aria-hidden="true">
            <img alt="" src={avatarSrc} />
          </span>
          <span className="aion-utility-account-copy">
            <span className="aion-utility-account-name">{currentUserLabel}</span>
            <span className="aion-utility-account-email">{currentUserEmail}</span>
          </span>
        </button>
      </div>
    </header>
  );
}
