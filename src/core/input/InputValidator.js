const VALID_EVENT_TYPES = new Set([
  "CHECK_IN",
  "CHECK_OUT",
  "TRANSFER",
  "BREAK_START",
  "BREAK_END",
  "LEAVE",
]);

/**
 * Validates normalized workforce events before reducer dispatch.
 */
class InputValidator {
  /**
   * @param {Object} [dependencies]
   * @param {(workerId: string) => boolean} [dependencies.workerExists]
   * @param {(siteId: string) => boolean} [dependencies.siteExists]
   * @param {(event: Record<string, any>) => boolean} [dependencies.isDuplicatePunch]
   * @param {(event: Record<string, any>) => boolean} [dependencies.isInvalidSequence]
   */
  constructor(dependencies = {}) {
    this.workerExists = dependencies.workerExists || (() => true);
    this.siteExists = dependencies.siteExists || (() => true);
    this.isDuplicatePunch = dependencies.isDuplicatePunch || (() => false);
    this.isInvalidSequence = dependencies.isInvalidSequence || (() => false);
  }

  /**
   * @param {Record<string, any>} event
   * @returns {{ isValid: boolean, errors: string[] }}
   */
  validate(event) {
    const errors = [];

    if (!event.id) {
      errors.push("Missing event id");
    }
    if (!event.workerId) {
      errors.push("Missing workerId");
    }
    if (!event.siteId) {
      errors.push("Missing siteId");
    }
    if (!event.timestamp) {
      errors.push("Missing timestamp");
    }
    if (!event.eventType) {
      errors.push("Missing eventType");
    }

    if (!VALID_EVENT_TYPES.has(event.eventType)) {
      errors.push(`Invalid eventType: ${event.eventType}`);
    }

    const eventDate = new Date(event.timestamp);
    if (Number.isNaN(eventDate.getTime())) {
      errors.push("Invalid timestamp value");
    } else if (eventDate.getTime() > Date.now()) {
      errors.push("Future timestamps are not allowed");
    }

    if (event.workerId && !this.workerExists(event.workerId)) {
      errors.push(`Worker does not exist: ${event.workerId}`);
    }

    if (event.siteId && !this.siteExists(event.siteId)) {
      errors.push(`Site does not exist: ${event.siteId}`);
    }

    if (this.isDuplicatePunch(event)) {
      errors.push("Duplicate punch detected");
    }

    if (this.isInvalidSequence(event)) {
      errors.push("Invalid attendance sequence");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = InputValidator;
