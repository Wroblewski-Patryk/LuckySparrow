export type ToolFormattingCopy = {
  statusAlwaysOn: string;
  statusReadyToUse: string;
  statusLinkRequired: string;
  statusNeedsReview: string;
  linkStateLinkedValue: string;
  linkStateNotLinkedValue: string;
  linkStateRequiredValue: string;
  linkStateUnknownValue: string;
};

export function toolStatusClass(status: string) {
  if (status === "integral_active" || status === "provider_ready") {
    return "badge-success";
  }
  if (status === "provider_ready_link_required") {
    return "badge-warning";
  }
  return "badge-outline";
}

export function formatToolState(status: string, toolsCopy: ToolFormattingCopy) {
  if (status === "integral_active") {
    return toolsCopy.statusAlwaysOn;
  }
  if (status === "provider_ready") {
    return toolsCopy.statusReadyToUse;
  }
  if (status === "provider_ready_link_required") {
    return toolsCopy.statusLinkRequired;
  }
  return toolsCopy.statusNeedsReview;
}

export function formatToolLinkState(status: string, toolsCopy: ToolFormattingCopy) {
  if (status === "linked") {
    return toolsCopy.linkStateLinkedValue;
  }
  if (status === "not_linked") {
    return toolsCopy.linkStateNotLinkedValue;
  }
  if (status === "link_required") {
    return toolsCopy.linkStateRequiredValue;
  }
  return toolsCopy.linkStateUnknownValue;
}

export function summarizeToolAction(nextActions: string[], fallback: string) {
  const action = nextActions[0];
  if (!action) {
    return fallback;
  }
  return action.replaceAll("_", " ");
}
