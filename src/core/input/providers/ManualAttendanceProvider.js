const AttendanceProvider = require("./AttendanceProvider");

/**
 * Manual attendance provider used by existing UI check-in/check-out flows.
 *
 * This provider is fully implemented and should remain backward-compatible
 * with manual attendance behavior while routing every event through the
 * workforce input engine pipeline.
 */
class ManualAttendanceProvider extends AttendanceProvider {
  /**
   * @returns {string}
   */
  providerName() {
    return "MANUAL";
  }

  /**
   * Manual UI can publish events in real-time.
   *
   * @returns {boolean}
   */
  supportsRealtime() {
    return true;
  }

  /**
   * Check in a worker via manual UI.
   *
   * @param {Object} payload
   * @param {string} payload.workerId
   * @param {string} payload.siteId
   * @param {string} [payload.projectId]
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
   * Check out a worker via manual UI.
   *
   * @param {Object} payload
   * @param {string} payload.workerId
   * @param {string} payload.siteId
   * @param {string} [payload.projectId]
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
   * Sync legacy/manual attendance events in batch.
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

module.exports = ManualAttendanceProvider;
