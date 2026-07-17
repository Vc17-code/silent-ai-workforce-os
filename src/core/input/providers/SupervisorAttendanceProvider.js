const AttendanceProvider = require("./AttendanceProvider");

/**
 * Supervisor attendance provider for supervisor-managed workforce events.
 *
 * This provider is fully implemented and normalizes supervisor initiated
 * actions through the same input engine as all other attendance sources.
 */
class SupervisorAttendanceProvider extends AttendanceProvider {
  /**
   * @returns {string}
   */
  providerName() {
    return "SUPERVISOR";
  }

  /**
   * Supervisor operations are real-time interactions.
   *
   * @returns {boolean}
   */
  supportsRealtime() {
    return true;
  }

  /**
   * Supervisor checks in a selected worker.
   *
   * @param {Object} payload
   * @param {string|Object} payload.worker Worker id or worker object
   * @param {string|Object} payload.site Site id or site object
   * @param {string|Object} [payload.project] Project id or project object
   * @param {string} payload.supervisorId
   * @param {string|number|Date} [payload.timestamp]
   * @param {Object} [payload.metadata]
   * @returns {any}
   */
  checkIn(payload) {
    return this.emit({
      ...payload,
      eventType: "CHECK_IN",
      source: this.providerName(),
    });
  }

  /**
   * Supervisor checks out a selected worker.
   *
   * @param {Object} payload
   * @param {string|Object} payload.worker Worker id or worker object
   * @param {string|Object} payload.site Site id or site object
   * @param {string|Object} [payload.project] Project id or project object
   * @param {string} payload.supervisorId
   * @param {string|number|Date} [payload.timestamp]
   * @param {Object} [payload.metadata]
   * @returns {any}
   */
  checkOut(payload) {
    return this.emit({
      ...payload,
      eventType: "CHECK_OUT",
      source: this.providerName(),
    });
  }

  /**
   * Sync supervisor-created events in batch.
   *
   * @param {Array<Object>} payloads
   * @returns {Array<any>}
   */
  sync(payloads = []) {
    const events = payloads.map((payload) => ({
      ...payload,
      source: this.providerName(),
    }));
    return this.emitBatch(events);
  }
}

module.exports = SupervisorAttendanceProvider;
