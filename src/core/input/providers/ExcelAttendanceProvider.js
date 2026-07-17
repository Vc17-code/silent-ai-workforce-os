const AttendanceProvider = require("./AttendanceProvider");

/**
 * EXCEL attendance provider scaffold.
 *
 * TODO: Implement provider-specific ingestion and mapping logic.
 * Expected raw payload format:
 * { rows: [{ workerCode, siteCode, time, type }] }
 */
class ExcelAttendanceProvider extends AttendanceProvider {
  /**
   * @returns {string}
   */
  providerName() {
    return "EXCEL";
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
    throw new Error("TODO: implement EXCEL checkIn().");
  }

  /**
   * TODO: implement check-out ingestion.
   */
  checkOut(_payload) {
    throw new Error("TODO: implement EXCEL checkOut().");
  }

  /**
   * TODO: implement batch sync ingestion.
   */
  sync(_payloads = []) {
    throw new Error("TODO: implement EXCEL sync().");
  }
}

module.exports = ExcelAttendanceProvider;
