import type { ReactNode } from "react";
import type { AppTelegramLinkStartResponse, AppToolGroup, AppToolItem } from "../lib/api";
import {
  formatToolLinkState,
  formatToolState,
  summarizeToolAction,
  toolStatusClass,
} from "../lib/tool-formatting";

export type ToolsSummaryCardItem = {
  title: string;
  value: string;
  note: string;
};

export type ToolsDirectoryLabels = {
  groupCount: string;
  itemSingularSuffix: string;
  itemsSuffix: string;
  integral: string;
  availability: string;
  provider: string;
  providerReadyValue: string;
  providerConfiguredValue: string;
  providerNotConfiguredValue: string;
  control: string;
  saving: string;
  enabledByUser: string;
  disabledByUser: string;
  readOnly: string;
  linkState: string;
  currentStatus: string;
  nextStep: string;
  noAction: string;
  telegramLinking: string;
  telegramInstructionBody: string;
  generating: string;
  rotateCode: string;
  generateCode: string;
  linkCode: string;
  expiresInAbout: string;
  seconds: string;
  instruction: string;
  noLinkCode: string;
  technicalDetails: string;
  capabilities: string;
  skillBindings: string;
};

export type ToolsDirectoryCommonLabels = {
  on: string;
  off: string;
  noData: string;
  sourceOfTruth: string;
};

export function ToolsSummaryCard({
  title,
  value,
  note,
}: ToolsSummaryCardItem) {
  return (
    <article className="aion-tools-summary-card">
      <p className="aion-tools-summary-label">{title}</p>
      <p className="aion-tools-summary-value">{value}</p>
      <p className="aion-tools-summary-note">{note}</p>
    </article>
  );
}

export function ToolsSummaryCardList({ items }: { items: ToolsSummaryCardItem[] }) {
  return (
    <div className="aion-tools-summary-grid">
      {items.map((item, index) => (
        <ToolsSummaryCard
          key={`${item.title}-${index}`}
          title={item.title}
          value={item.value}
          note={item.note}
        />
      ))}
    </div>
  );
}

export function ToolsDirectoryGroupList({
  groups,
  labels,
  commonLabels,
  savingToolId,
  telegramLinkBusy,
  telegramLinkStart,
  onToolToggle,
  onStartTelegramLink,
}: {
  groups: AppToolGroup[];
  labels: ToolsDirectoryLabels;
  commonLabels: ToolsDirectoryCommonLabels;
  savingToolId: string | null;
  telegramLinkBusy: boolean;
  telegramLinkStart: AppTelegramLinkStartResponse | null;
  onToolToggle: (toolId: string, nextValue: boolean) => void;
  onStartTelegramLink: () => void;
}) {
  return (
    <div className="grid gap-5">
      {groups.map((group) => (
        <ToolsDirectoryGroup
          key={group.id}
          group={group}
          labels={labels}
          commonLabels={commonLabels}
          savingToolId={savingToolId}
          telegramLinkBusy={telegramLinkBusy}
          telegramLinkStart={telegramLinkStart}
          onToolToggle={onToolToggle}
          onStartTelegramLink={onStartTelegramLink}
        />
      ))}
    </div>
  );
}

function ToolsDirectoryGroup({
  group,
  labels,
  commonLabels,
  savingToolId,
  telegramLinkBusy,
  telegramLinkStart,
  onToolToggle,
  onStartTelegramLink,
}: {
  group: AppToolGroup;
  labels: ToolsDirectoryLabels;
  commonLabels: ToolsDirectoryCommonLabels;
  savingToolId: string | null;
  telegramLinkBusy: boolean;
  telegramLinkStart: AppTelegramLinkStartResponse | null;
  onToolToggle: (toolId: string, nextValue: boolean) => void;
  onStartTelegramLink: () => void;
}) {
  return (
    <article className="aion-tools-group">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl text-base-900">{group.title}</h3>
          <p className="mt-1 max-w-3xl text-sm leading-7 text-base-800">{group.description}</p>
        </div>
        <div className="rounded-[1rem] bg-base-100 px-3 py-2">
          <p className="text-[10px] uppercase tracking-[0.18em] text-base-800">{labels.groupCount}</p>
          <p className="mt-1 text-sm font-semibold text-base-900">
            {group.item_count} {group.item_count === 1 ? labels.itemSingularSuffix : labels.itemsSuffix}
          </p>
        </div>
      </div>

      <div className={`aion-tools-item-grid ${group.items.length === 1 ? "aion-tools-item-grid-single" : ""}`}>
        {group.items.map((item) => (
          <ToolsDirectoryItem
            key={item.id}
            item={item}
            labels={labels}
            commonLabels={commonLabels}
            saving={savingToolId === item.id}
            telegramLinkBusy={telegramLinkBusy}
            telegramLinkStart={telegramLinkStart}
            onToolToggle={onToolToggle}
            onStartTelegramLink={onStartTelegramLink}
          />
        ))}
      </div>
    </article>
  );
}

function ToolsDirectoryItem({
  item,
  labels,
  commonLabels,
  saving,
  telegramLinkBusy,
  telegramLinkStart,
  onToolToggle,
  onStartTelegramLink,
}: {
  item: AppToolItem;
  labels: ToolsDirectoryLabels;
  commonLabels: ToolsDirectoryCommonLabels;
  saving: boolean;
  telegramLinkBusy: boolean;
  telegramLinkStart: AppTelegramLinkStartResponse | null;
  onToolToggle: (toolId: string, nextValue: boolean) => void;
  onStartTelegramLink: () => void;
}) {
  const toolTone = item.status === "integral_active" || item.status === "provider_ready"
    ? "ready"
    : item.status === "provider_ready_link_required"
      ? "link"
      : "review";
  const enabledLabel = item.enabled ? commonLabels.on : commonLabels.off;
  const providerState = item.provider.ready
    ? labels.providerReadyValue
    : item.provider.configured
      ? labels.providerConfiguredValue
      : labels.providerNotConfiguredValue;
  const controlLabel = saving
    ? labels.saving
    : item.user_control.toggle_allowed
      ? item.user_control.requested_enabled
        ? labels.enabledByUser
        : labels.disabledByUser
      : labels.readOnly;

  return (
    <section className={`aion-tools-item-card aion-tools-item-card-${toolTone}`}>
      <div className="aion-tools-item-heading">
        <div className="aion-tools-item-title-block">
          <h4 className="font-display text-xl text-base-900">{item.label}</h4>
          <p className="text-sm leading-7 text-base-800">{item.description}</p>
        </div>
        <div className="aion-tools-status-stack">
          <div className={`badge ${toolStatusClass(item.status)}`}>{formatToolState(item.status, labels)}</div>
          {item.integral ? (
            <span className="aion-tools-integral-pill">{labels.integral}</span>
          ) : null}
        </div>
      </div>

      <div className="aion-tools-decision-strip" aria-label={`${item.label} status`}>
        <ToolsDecisionPill label={labels.availability} value={enabledLabel} />
        <ToolsDecisionPill label={labels.linkState} value={formatToolLinkState(item.link_state, labels)} />
        <ToolsDecisionPill label={labels.provider} value={providerState} detail={item.provider.name.replaceAll("_", " ")} />
      </div>

      <div className="aion-tools-action-row">
        <div className="aion-tools-action-copy">
          <p className="aion-tools-action-label">{labels.nextStep}</p>
          <p className="aion-tools-action-value">{summarizeToolAction(item.next_actions, labels.noAction)}</p>
        </div>
        <div className="aion-tools-control-surface">
          <p className="aion-tools-action-label">{labels.control}</p>
          {item.user_control.toggle_allowed ? (
            <label className="aion-tools-toggle-control">
              <input
                className="toggle toggle-primary"
                type="checkbox"
                checked={Boolean(item.user_control.requested_enabled)}
                disabled={saving}
                onChange={(event) => {
                  onToolToggle(item.id, event.target.checked);
                }}
              />
              <span>{controlLabel}</span>
            </label>
          ) : (
            <p className="aion-tools-control-value">{controlLabel}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <ToolsDetailCard label={labels.currentStatus}>
          <p className="mt-2 text-sm leading-7 text-base-900">{item.status_reason}</p>
        </ToolsDetailCard>

        {item.id === "telegram" &&
        item.user_control.requested_enabled &&
        item.provider.ready &&
        item.link_state !== "linked" ? (
          <ToolsTelegramLinkPanel
            title={labels.telegramLinking}
            body={labels.telegramInstructionBody}
            buttonLabel={
              telegramLinkBusy
                ? labels.generating
                : telegramLinkStart
                  ? labels.rotateCode
                  : labels.generateCode
            }
            linkStart={telegramLinkStart}
            linkCodeLabel={labels.linkCode}
            expiresInAboutLabel={labels.expiresInAbout}
            secondsLabel={labels.seconds}
            instructionLabel={labels.instruction}
            noLinkCodeLabel={labels.noLinkCode}
            busy={telegramLinkBusy}
            onStart={onStartTelegramLink}
          />
        ) : null}

        <details className="aion-tools-details">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-base-900">
            {labels.technicalDetails}
          </summary>
          <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2">
            <ToolsTechnicalDetailPanel
              label={labels.capabilities}
              values={item.capabilities}
              emptyLabel={commonLabels.noData}
            />
            <ToolsTechnicalDetailPanel
              label={labels.skillBindings}
              values={item.skill_tool_bindings.map((binding) =>
                `${binding.label}: ${binding.posture}`,
              )}
              emptyLabel={commonLabels.noData}
            />
            <ToolsTechnicalDetailPanel
              label={commonLabels.sourceOfTruth}
              values={item.source_of_truth}
              emptyLabel={commonLabels.noData}
              chipTone="muted"
            />
          </div>
        </details>
      </div>
    </section>
  );
}

export function ToolsDecisionPill({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="aion-tools-decision-pill">
      <p>{label}</p>
      <strong>{value}</strong>
      {detail ? <span>{detail}</span> : null}
    </div>
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
