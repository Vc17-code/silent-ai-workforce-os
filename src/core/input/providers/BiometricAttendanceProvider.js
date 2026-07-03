const AttendanceProvider = require("./AttendanceProvider");

/**
 * BIOMETRIC attendance provider scaffold.
 *
 * TODO: Implement provider-specific ingestion and mapping logic.
 * Expected raw payload format:
 * { employeeCode, deviceTime, deviceId, punchType }
 */
class BiometricAttendanceProvider extends AttendanceProvider {
  /**
   * @returns {string}
   */
  providerName() {
    return "BIOMETRIC";
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
    throw new Error("TODO: implement BIOMETRIC checkIn().");
  }

  /**
   * TODO: implement check-out ingestion.
   */
  checkOut(_payload) {
    throw new Error("TODO: implement BIOMETRIC checkOut().");
  }

  /**
   * TODO: implement batch sync ingestion.
   */
  sync(_payloads = []) {
    throw new Error("TODO: implement BIOMETRIC sync().");
  }
}

module.exports = BiometricAttendanceProvider;
