/**
 * Base contract for all workforce attendance providers.
 *
 * Providers represent external attendance sources (manual UI, supervisor,
 * biometrics, API integrations, IoT devices, etc.).
 *
 * Every concrete provider must implement:
 * - checkIn(payload)
 * - checkOut(payload)
 * - sync(payload)
 * - supportsRealtime()
 * - providerName()
 */
class AttendanceProvider {
  constructor() {
    /** @type {import("../InputEngine")} */
    this.inputEngine = null;
  }

  /**
   * Attach provider to an input engine instance.
   *
   * @param {import("../InputEngine")} inputEngine
   * @returns {void}
   */
  setInputEngine(inputEngine) {
    this.inputEngine = inputEngine;
  }

  /**
   * Submit an event through the workforce input pipeline.
   *
   * @param {Record<string, any>} payload
   * @returns {any}
   */
  emit(payload) {
    if (!this.inputEngine) {
      throw new Error(
        `${this.providerName()} provider is not registered with an InputEngine.`,
      );
    }

    return this.inputEngine.processEvent(payload, {
      providerName: this.providerName(),
    });
  }

  /**
   * Submit a batch through the workforce input pipeline.
   *
   * @param {Array<Record<string, any>>} payloads
   * @returns {any}
   */
  emitBatch(payloads) {
    if (!this.inputEngine) {
      throw new Error(
        `${this.providerName()} provider is not registered with an InputEngine.`,
      );
    }

    return this.inputEngine.processBatch(payloads, {
      providerName: this.providerName(),
    });
  }

  /**
   * @param {Record<string, any>} _payload
   * @returns {any}
   */
  checkIn(_payload) {
    throw new Error("checkIn() must be implemented by provider.");
  }

  /**
   * @param {Record<string, any>} _payload
   * @returns {any}
   */
  checkOut(_payload) {
    throw new Error("checkOut() must be implemented by provider.");
  }

  /**
   * @param {Array<Record<string, any>>} _payload
   * @returns {any}
   */
  sync(_payload) {
    throw new Error("sync() must be implemented by provider.");
  }

  /**
   * @returns {boolean}
   */
  supportsRealtime() {
    throw new Error("supportsRealtime() must be implemented by provider.");
  }

  /**
   * @returns {string}
   */
  providerName() {
    throw new Error("providerName() must be implemented by provider.");
  }
}

module.exports = AttendanceProvider;
