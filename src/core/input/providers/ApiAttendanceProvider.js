const AttendanceProvider = require("./AttendanceProvider");

/**
 * API attendance provider scaffold.
 *
 * TODO: Implement provider-specific ingestion and mapping logic.
 * Expected raw payload format:
 * { workerExternalId, siteExternalId, occurredAt, eventType, metadata }
 */
class ApiAttendanceProvider extends AttendanceProvider {
  /**
   * @returns {string}
   */
  providerName() {
    return "API";
  }

  /**
   * TODO: determine real-time capability once implemented.
   * @returns {boolean}
   */
  supportsRealtime() {
    return false;
  }

  /**
   * TODO: implement check-in ingestion.
   */
  checkIn(_payload) {
    throw new Error("TODO: implement API checkIn().");
  }

  /**
   * TODO: implement check-out ingestion.
   */
  checkOut(_payload) {
    throw new Error("TODO: implement API checkOut().");
  }

  /**
   * TODO: implement batch sync ingestion.
   */
  sync(_payloads = []) {
    throw new Error("TODO: implement API sync().");
  }
}

module.exports = ApiAttendanceProvider;
