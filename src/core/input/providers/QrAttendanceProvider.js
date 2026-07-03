const AttendanceProvider = require("./AttendanceProvider");

/**
 * QR attendance provider scaffold.
 *
 * TODO: Implement provider-specific ingestion and mapping logic.
 * Expected raw payload format:
 * { workerQrToken, siteQrToken, scannedAt, scannerId }
 */
class QrAttendanceProvider extends AttendanceProvider {
  /**
   * @returns {string}
   */
  providerName() {
    return "QR";
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
    throw new Error("TODO: implement QR checkIn().");
  }

  /**
   * TODO: implement check-out ingestion.
   */
  checkOut(_payload) {
    throw new Error("TODO: implement QR checkOut().");
  }

  /**
   * TODO: implement batch sync ingestion.
   */
  sync(_payloads = []) {
    throw new Error("TODO: implement QR sync().");
  }
}

module.exports = QrAttendanceProvider;
