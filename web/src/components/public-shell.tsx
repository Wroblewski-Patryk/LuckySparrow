import type { ReactNode } from "react";

export type PublicNavLinkItem = {
  label: string;
  href: string;
};

export function PublicNavLinkList({
  items,
}: {
  items: PublicNavLinkItem[];
}) {
  return (
    <nav className="aion-public-nav-links" aria-label="Public navigation">
      {items.map((item) => (
        <a key={item.label} className="aion-public-nav-link" href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function MotifFigurePanel({
  highlights,
  artSrc,
  scenic = false,
  overlay,
}: {
  highlights: Array<{ label: string; value: string }>;
  artSrc: string;
  scenic?: boolean;
  overlay?: ReactNode;
}) {
  return (
    <div className={`aion-landing-motif-stage ${scenic ? "aion-landing-motif-stage-scenic" : ""}`}>
      <div className="aion-landing-motif-orbit" aria-hidden="true" />
      {scenic ? (
        <div
          aria-hidden="true"
          className="aion-landing-motif-scene"
          style={{ backgroundImage: `url("${artSrc}")` }}
        />
      ) : (
        <img alt="" aria-hidden="true" className="aion-landing-motif-art" src={artSrc} />
      )}
      {overlay ? <div className="aion-landing-motif-overlay">{overlay}</div> : null}
      {highlights.map((item, index) => (
        <article
          key={item.label}
          className={`aion-landing-motif-note aion-landing-motif-note-${index + 1}`}
        >
          <p className="aion-landing-motif-note-label">{item.label}</p>
          <p className="aion-landing-motif-note-value">{item.value}</p>
        </article>
      ))}
    </div>
  );
}

export function PublicTrustPillList({
  items,
  className,
  itemClassName,
  iconClassName,
}: {
  items: Array<{ label: string; icon: string }>;
  className: string;
  itemClassName: string;
  iconClassName: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <span key={item.label} className={itemClassName}>
          <span className={iconClassName} aria-hidden="true">
            <PublicGlyph kind={item.icon} />
          </span>
          {item.label}
        </span>
      ))}
    </div>
  );
}

export function PublicFeatureCardList({
  items,
}: {
  items: Array<{
    icon: string;
    title: string;
    body: string;
  }>;
}) {
  return (
    <div className="aion-public-feature-strip">
      {items.map((pillar) => (
        <article key={pillar.title} className="aion-public-feature-card">
          <span className="aion-public-feature-icon" aria-hidden="true">
            <PublicGlyph kind={pillar.icon} />
          </span>
          <p className="aion-public-feature-title">{pillar.title}</p>
          <p className="aion-public-feature-body">{pillar.body}</p>
        </article>
      ))}
    </div>
  );
}

export function PublicTrustBand({
  id,
  items,
}: {
  id?: string;
  items: Array<{
    icon: string;
    label: string;
  }>;
}) {
  return (
    <footer className="aion-public-trust-band" id={id}>
      {items.map((item) => (
        <article key={item.label} className="aion-public-trust-item">
          <span className="aion-public-trust-icon" aria-hidden="true">
            <PublicGlyph kind={item.icon} />
          </span>
          <p>{item.label}</p>
        </article>
      ))}
    </footer>
  );
}

export function PublicGlyph({ kind }: { kind: string }) {
  if (kind === "understanding") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 4.8c4 0 7.3 2.7 8.6 6.4-1.3 3.7-4.6 6.4-8.6 6.4s-7.3-2.7-8.6-6.4C4.7 7.5 8 4.8 12 4.8Z" />
        <circle cx="12" cy="11.2" r="2.45" />
      </svg>
    );
  }
  if (kind === "memory") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M7.6 5.4h8.8a1.8 1.8 0 0 1 1.8 1.8v9.6a1 1 0 0 1-1.54.84L12 14.7l-4.66 2.94A1 1 0 0 1 5.8 16.8V7.2a1.8 1.8 0 0 1 1.8-1.8Z" />
        <path d="M9.6 8.8h4.8" />
        <path d="M9.6 11.6h3.2" />
      </svg>
    );
  }
  if (kind === "clarity") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 4.7 13.96 9l4.74.46-3.58 3.15 1 4.69L12 14.98 7.88 17.3l1-4.69-3.58-3.15L10.04 9 12 4.7Z" />
      </svg>
    );
  }
  if (kind === "planning") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M5.5 6.5h13v11h-13z" />
        <path d="M8.2 10.1h4.1" />
        <path d="m8.2 13.4 1.5 1.5 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "companion") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 18.4c-3.7 0-6.8-3-6.8-6.8S8.3 4.8 12 4.8s6.8 3 6.8 6.8-3 6.8-6.8 6.8Z" />
        <path d="M9.6 11.2c.44.7 1.16 1.12 2.4 1.12 1.24 0 1.96-.42 2.4-1.12" strokeLinecap="round" />
        <circle cx="10" cy="9.3" r=".7" fill="currentColor" stroke="none" />
        <circle cx="14" cy="9.3" r=".7" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "privacy") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 4.8 18.2 7v4.8c0 3.42-2.52 6.48-6.2 7.44-3.68-.96-6.2-4.02-6.2-7.44V7L12 4.8Z" />
        <path d="M9.8 12.1 11.2 13.5 14.4 10.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "encryption") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="6.2" y="10.1" width="11.6" height="8.1" rx="2.1" />
        <path d="M8.8 10.1V8.6a3.2 3.2 0 1 1 6.4 0v1.5" />
      </svg>
    );
  }
  if (kind === "storage") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <ellipse cx="12" cy="7" rx="5.7" ry="2.2" />
        <path d="M6.3 7v4.1c0 1.22 2.55 2.2 5.7 2.2s5.7-.98 5.7-2.2V7" />
        <path d="M6.3 11.1v4.1c0 1.22 2.55 2.2 5.7 2.2s5.7-.98 5.7-2.2v-4.1" />
      </svg>
    );
  }
  if (kind === "ownership") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M7.2 11.2V8.8a4.8 4.8 0 1 1 9.6 0v2.4" />
        <path d="M6.2 11.2h11.6v7H6.2z" />
        <path d="M12 14.2v2.3" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 5.2v13.6" />
      <path d="M5.2 12h13.6" />
      <circle cx="12" cy="12" r="6.8" />
    </svg>
  );
}
