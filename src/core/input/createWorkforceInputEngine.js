const InputEngine = require("./InputEngine");
const InputValidator = require("./InputValidator");
const InputNormalizer = require("./InputNormalizer");
const EventDispatcher = require("./EventDispatcher");

const ManualAttendanceProvider = require("./providers/ManualAttendanceProvider");
const SupervisorAttendanceProvider = require("./providers/SupervisorAttendanceProvider");

/**
 * Factory for creating the Workforce Input Engine with provider registry.
 *
 * This function intentionally registers providers instead of hardcoding
 * provider routing in the engine itself.
 *
 * @param {Object} [options]
 * @param {InputValidator} [options.validator]
 * @param {InputNormalizer} [options.normalizer]
 * @param {EventDispatcher} [options.dispatcher]
 * @param {(record: Record<string, any>) => void} [options.auditLogger]
 * @returns {InputEngine}
 */
function createWorkforceInputEngine(options = {}) {
  const engine = new InputEngine({
    validator: options.validator || new InputValidator(options),
    normalizer: options.normalizer || new InputNormalizer(),
    dispatcher: options.dispatcher || new EventDispatcher(options),
    auditLogger: options.auditLogger,
  });

  engine.registerProvider(new ManualAttendanceProvider());
  engine.registerProvider(new SupervisorAttendanceProvider());

  return engine;
}

module.exports = createWorkforceInputEngine;
