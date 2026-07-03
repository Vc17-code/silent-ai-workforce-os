const InputValidator = require("./InputValidator");
const InputNormalizer = require("./InputNormalizer");
const EventDispatcher = require("./EventDispatcher");

/**
 * Workforce Input Engine.
 *
 * This is the only entry point for workforce attendance events.
 * Providers emit source-specific payloads and the engine guarantees:
 * - validation before state changes
 * - canonical event normalization
 * - event bus dispatch to Silent Core
 * - audit record generation for every processed event
 */
class InputEngine {
  /**
   * @param {Object} [options]
   * @param {InputValidator} [options.validator]
   * @param {InputNormalizer} [options.normalizer]
   * @param {EventDispatcher} [options.dispatcher]
   * @param {(record: Record<string, any>) => void} [options.auditLogger]
   */
  constructor(options = {}) {
    this.validator = options.validator || new InputValidator();
    this.normalizer = options.normalizer || new InputNormalizer();
    this.dispatcher = options.dispatcher || new EventDispatcher();
    this.auditLogger = options.auditLogger || (() => {});

    /** @type {Map<string, any>} */
    this.providerRegistry = new Map();
  }

  /**
   * Register provider in provider registry.
   *
   * @param {any} provider
   * @returns {void}
   */
  registerProvider(provider) {
    this.assertProviderContract(provider);
    provider.setInputEngine(this);
    this.providerRegistry.set(provider.providerName(), provider);
  }

  /**
   * @returns {Array<any>}
   */
  getProviders() {
    return Array.from(this.providerRegistry.values());
  }

  /**
   * @param {string} providerName
   * @returns {any | undefined}
   */
  getProvider(providerName) {
    return this.providerRegistry.get(providerName);
  }

  /**
   * Process one event payload through pipeline:
   * normalize -> validate -> dispatch -> audit.
   *
   * @param {Record<string, any>} rawEvent
   * @param {Object} [context]
   * @param {string} [context.providerName]
   * @returns {{ accepted: boolean, event: Record<string, any>, validation: { isValid: boolean, errors: string[] }, dispatchResult?: any }}
   */
  processEvent(rawEvent, context = {}) {
    const source = (rawEvent.source || context.providerName || "").toUpperCase();
    const normalizedEvent = this.normalizer.normalize({
      ...rawEvent,
      source,
    });

    const validation = this.validator.validate(normalizedEvent);

    this.auditLogger(
      this.createAuditRecord(normalizedEvent, source, validation, context),
    );

    if (!validation.isValid) {
      return {
        accepted: false,
        event: normalizedEvent,
        validation,
      };
    }

    const dispatchResult = this.dispatcher.dispatch(normalizedEvent, {
      ...context,
      source,
      validation,
    });

    return {
      accepted: true,
      event: normalizedEvent,
      validation,
      dispatchResult,
    };
  }

  /**
   * Process a batch of events through the same pipeline.
   *
   * @param {Array<Record<string, any>>} rawEvents
   * @param {Object} [context]
   * @returns {Array<{ accepted: boolean, event: Record<string, any>, validation: { isValid: boolean, errors: string[] }, dispatchResult?: any }>}
   */
  processBatch(rawEvents = [], context = {}) {
    return rawEvents.map((event) => this.processEvent(event, context));
  }

  /**
   * @param {Record<string, any>} event
   * @param {string} source
   * @param {{ isValid: boolean, errors: string[] }} validation
   * @param {Record<string, any>} context
   * @returns {Record<string, any>}
   */
  createAuditRecord(event, source, validation, context) {
    return {
      provider: source || event.source,
      eventId: event.id,
      event,
      timestamp: new Date().toISOString(),
      workerId: event.workerId,
      siteId: event.siteId,
      validationResult: validation.isValid ? "VALID" : "INVALID",
      validationErrors: validation.errors,
      context,
    };
  }

  /**
   * @param {any} provider
   * @returns {void}
   */
  assertProviderContract(provider) {
    const methods = [
      "checkIn",
      "checkOut",
      "sync",
      "supportsRealtime",
      "providerName",
      "setInputEngine",
    ];

    methods.forEach((methodName) => {
      if (!provider || typeof provider[methodName] !== "function") {
        throw new Error(
          `Invalid provider registration: missing ${methodName}() contract method.`,
        );
      }
    });
  }
}

module.exports = InputEngine;
