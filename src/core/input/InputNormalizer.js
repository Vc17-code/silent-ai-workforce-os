const SUPPORTED_EVENT_TYPES = new Set([
  "CHECK_IN",
  "CHECK_OUT",
  "TRANSFER",
  "BREAK_START",
  "BREAK_END",
  "LEAVE",
]);

const SUPPORTED_SOURCES = new Set([
  "MANUAL",
  "SUPERVISOR",
  "MOBILE",
  "BIOMETRIC",
  "QR",
  "API",
  "EXCEL",
]);

/**
 * Normalizes provider-specific payloads into the canonical workforce event
 * consumed by Silent Core reducers and downstream systems.
 */
class InputNormalizer {
  /**
   * @param {Record<string, any>} event
   * @returns {Record<string, any>}
   */
  normalize(event) {
    const source = (event.source || "").toUpperCase();

    if (!SUPPORTED_SOURCES.has(source)) {
      throw new Error(`Unsupported attendance source: ${event.source}`);
    }

    switch (source) {
      case "MANUAL":
        return this.normalizeManual(event);
      case "SUPERVISOR":
        return this.normalizeSupervisor(event);
      case "MOBILE":
      case "BIOMETRIC":
      case "QR":
      case "API":
      case "EXCEL":
        return this.normalizeScaffoldSource(event, source);
      default:
        return this.toCanonicalEvent(event, source);
    }
  }

  /**
   * @param {Array<Record<string, any>>} events
   * @returns {Array<Record<string, any>>}
   */
  normalizeBatch(events = []) {
    return events.map((event) => this.normalize(event));
  }

  /**
   * @param {Record<string, any>} event
   * @returns {Record<string, any>}
   */
  normalizeManual(event) {
    return this.toCanonicalEvent(
      {
        ...event,
        workerId: event.workerId,
        siteId: event.siteId,
        projectId: event.projectId,
        eventType: event.eventType || event.type,
      },
      "MANUAL",
    );
  }

  /**
   * @param {Record<string, any>} event
   * @returns {Record<string, any>}
   */
  normalizeSupervisor(event) {
    return this.toCanonicalEvent(
      {
        ...event,
        workerId: this.extractEntityId(event.worker || event.workerId),
        siteId: this.extractEntityId(event.site || event.siteId),
        projectId: this.extractEntityId(event.project || event.projectId),
        eventType: event.eventType || event.type || event.action,
        metadata: {
          ...event.metadata,
          supervisorId: event.supervisorId,
        },
      },
      "SUPERVISOR",
    );
  }

  /**
   * Scaffold normalizer for not-yet-implemented providers.
   *
   * TODO: Replace with provider-specific transformations as integrations land.
   *
   * @param {Record<string, any>} event
   * @param {string} source
   * @returns {Record<string, any>}
   */
  normalizeScaffoldSource(event, source) {
    return this.toCanonicalEvent(event, source);
  }

  /**
   * @param {Record<string, any>} event
   * @param {string} source
   * @returns {Record<string, any>}
   */
  toCanonicalEvent(event, source) {
    const eventType = (event.eventType || event.type || "").toUpperCase();
    const timestamp = this.asIsoString(event.timestamp || event.time || Date.now());

    const normalizedEvent = {
      id: event.id || this.generateId(source, event.workerId, timestamp),
      workerId: event.workerId,
      siteId: event.siteId,
      projectId: event.projectId || null,
      timestamp,
      eventType,
      source,
      metadata: event.metadata || {},
    };

    if (!SUPPORTED_EVENT_TYPES.has(normalizedEvent.eventType)) {
      normalizedEvent.metadata.normalizationWarning =
        "eventType is outside supported set";
    }

    return normalizedEvent;
  }

  /**
   * @param {string|Object|null|undefined} entity
   * @returns {string|undefined}
   */
  extractEntityId(entity) {
    if (!entity) {
      return undefined;
    }

    if (typeof entity === "string") {
      return entity;
    }

    return entity.id || entity.workerId || entity.siteId || entity.projectId;
  }

  /**
   * @param {string|number|Date} value
   * @returns {string}
   */
  asIsoString(value) {
    const dateValue = value instanceof Date ? value : new Date(value);
    return dateValue.toISOString();
  }

  /**
   * @param {string} source
   * @param {string} workerId
   * @param {string} timestamp
   * @returns {string}
   */
  generateId(source, workerId, timestamp) {
    const randomSegment = Math.random().toString(36).slice(2, 8);
    return `${source}-${workerId || "unknown"}-${timestamp}-${randomSegment}`;
  }
}

module.exports = InputNormalizer;
