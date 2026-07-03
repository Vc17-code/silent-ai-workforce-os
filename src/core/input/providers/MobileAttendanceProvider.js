const AttendanceProvider = require("./AttendanceProvider");

/**
 * MOBILE attendance provider scaffold.
 *
 * TODO: Implement provider-specific ingestion and mapping logic.
 * Expected raw payload format:
 * { workerId, gps, photoUrl, deviceTimestamp, deviceId }
 */
class MobileAttendanceProvider extends AttendanceProvider {
  /**
   * @returns {string}
   */
  providerName() {
    return "MOBILE";
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
    throw new Error("TODO: implement MOBILE checkIn().");
  }

  /**
   * TODO: implement check-out ingestion.
   */
  checkOut(_payload) {
    throw new Error("TODO: implement MOBILE checkOut().");
  }

  /**
   * TODO: implement batch sync ingestion.
   */
  sync(_payloads = []) {
    throw new Error("TODO: implement MOBILE sync().");
  }
}

module.exports = MobileAttendanceProvider;
