/**
 * Operations selectors.
 *
 * All derivations happen here so page/components remain presentation-only.
 */

const EMPTY_ARRAY = [];

const getStateSlice = (state, paths, fallback) => {
  for (const path of paths) {
    let current = state;
    let exists = true;
    for (const key of path) {
      if (current && Object.prototype.hasOwnProperty.call(current, key)) {
        current = current[key];
      } else {
        exists = false;
        break;
      }
    }
    if (exists && current !== undefined && current !== null) {
      return current;
    }
  }
  return fallback;
};

const normalizeCurrency = (value) => {
  if (typeof value !== "number") {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

export const getOperationsOverview = (state) => {
  const workforce = getStateSlice(
    state,
    [
      ["workforce", "summary"],
      ["dashboard", "workforceSummary"],
    ],
    {},
  );
  const sites = getStateSlice(
    state,
    [
      ["sites", "summary"],
      ["dashboard", "siteSummary"],
    ],
    {},
  );
  const finance = getStateSlice(
    state,
    [
      ["finance", "summary"],
      ["dashboard", "financialSummary"],
    ],
    {},
  );
  const projects = getStateSlice(
    state,
    [
      ["projects", "activeProjects"],
      ["dashboard", "activeProjects"],
    ],
    EMPTY_ARRAY,
  );

  return {
    workforce: {
      totalWorkers: workforce.totalWorkers ?? 0,
      checkedIn: workforce.checkedIn ?? 0,
      checkedOut: workforce.checkedOut ?? 0,
      onLeave: workforce.onLeave ?? 0,
    },
    sites: {
      totalSites: sites.totalSites ?? 0,
      activeSites: sites.activeSites ?? 0,
      delayedSites: sites.delayedSites ?? 0,
    },
    finance: {
      laborCostToday: normalizeCurrency(finance.laborCostToday ?? 0),
      projectedPayroll: normalizeCurrency(finance.projectedPayroll ?? 0),
      budgetVariance: normalizeCurrency(finance.budgetVariance ?? 0),
    },
    activeProjects: projects,
  };
};

export const getSiteStatus = (state) =>
  getStateSlice(
    state,
    [
      ["sites", "statusList"],
      ["dashboard", "siteStatus"],
    ],
    EMPTY_ARRAY,
  );

export const getCriticalAlerts = (state) =>
  getStateSlice(
    state,
    [
      ["alerts", "critical"],
      ["dashboard", "criticalAlerts"],
    ],
    EMPTY_ARRAY,
  );

const isSameDay = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const formatEventTime = (timestamp) => {
  const eventDate = new Date(timestamp);
  if (Number.isNaN(eventDate.getTime())) {
    return "Invalid time";
  }

  return eventDate.toLocaleTimeString();
};

export const getTodaysEvents = (state) => {
  // Workforce Event Engine is the source of truth for operational timeline.
  const workforceEngineEvents = getStateSlice(
    state,
    [
      ["workforceInputEngine", "events"],
      ["workforceInput", "events"],
      ["attendance", "events"],
    ],
    EMPTY_ARRAY,
  );

  const now = new Date();
  return workforceEngineEvents
    .filter((event) => {
      const eventDate = new Date(event.timestamp);
      return !Number.isNaN(eventDate.getTime()) && isSameDay(eventDate, now);
    })
    .map((event) => ({
      id: event.id,
      timestamp: event.timestamp,
      displayTime: formatEventTime(event.timestamp),
      eventType: event.eventType,
      workerId: event.workerId,
      siteId: event.siteId,
      source: event.source,
      metadata: event.metadata || {},
    }))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getRecommendations = (state) =>
  getStateSlice(
    state,
    [
      ["operations", "recommendations"],
      ["dashboard", "recommendations"],
    ],
    EMPTY_ARRAY,
  );

// JS identifiers cannot contain apostrophes, so this alias preserves
// the requested selector name for registry-based usage if needed.
export const selectorAliases = {
  "getToday'sEvents": getTodaysEvents,
};

