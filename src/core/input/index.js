const EventDispatcher = require("./EventDispatcher");
const InputEngine = require("./InputEngine");
const InputNormalizer = require("./InputNormalizer");
const InputValidator = require("./InputValidator");
const createWorkforceInputEngine = require("./createWorkforceInputEngine");

const AttendanceProvider = require("./providers/AttendanceProvider");
const ManualAttendanceProvider = require("./providers/ManualAttendanceProvider");
const SupervisorAttendanceProvider = require("./providers/SupervisorAttendanceProvider");
const MobileAttendanceProvider = require("./providers/MobileAttendanceProvider");
const BiometricAttendanceProvider = require("./providers/BiometricAttendanceProvider");
const QrAttendanceProvider = require("./providers/QrAttendanceProvider");
const ApiAttendanceProvider = require("./providers/ApiAttendanceProvider");
const ExcelAttendanceProvider = require("./providers/ExcelAttendanceProvider");

module.exports = {
  EventDispatcher,
  InputEngine,
  InputNormalizer,
  InputValidator,
  createWorkforceInputEngine,
  providers: {
    AttendanceProvider,
    ManualAttendanceProvider,
    SupervisorAttendanceProvider,
    MobileAttendanceProvider,
    BiometricAttendanceProvider,
    QrAttendanceProvider,
    ApiAttendanceProvider,
    ExcelAttendanceProvider,
  },
};
