/**
 * Lightweight event bus foundation that dispatches normalized events to
 * Silent Core while allowing future middleware/subscribers (analytics, AI,
 * integrations, notifications) without changing providers or reducers.
 */
class EventDispatcher {
  /**
   * @param {Object} [options]
   * @param {(event: Record<string, any>, context?: Record<string, any>) => any} [options.onDispatch]
   */
  constructor(options = {}) {
    this.onDispatch = options.onDispatch || null;
    this.subscribers = new Set();
    this.middlewares = [];
  }

  /**
   * Register middleware in Koa-like shape: (event, context, next) => any.
   *
   * @param {(event: Record<string, any>, context: Record<string, any>, next: Function) => any} middleware
   * @returns {void}
   */
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * Register a subscriber callback.
   *
   * @param {(event: Record<string, any>, context: Record<string, any>) => any} handler
   * @returns {() => void}
   */
  subscribe(handler) {
    this.subscribers.add(handler);
    return () => {
      this.subscribers.delete(handler);
    };
  }

  /**
   * Dispatch a normalized event through middleware then to Silent Core.
   *
   * @param {Record<string, any>} event
   * @param {Record<string, any>} [context]
   * @returns {any}
   */
  dispatch(event, context = {}) {
    const run = (index, currentEvent) => {
      if (index >= this.middlewares.length) {
        return this.finalDispatch(currentEvent, context);
      }

      const middleware = this.middlewares[index];
      return middleware(currentEvent, context, (nextEvent = currentEvent) =>
        run(index + 1, nextEvent),
      );
    };

    return run(0, event);
  }

  /**
   * @param {Array<Record<string, any>>} events
   * @param {Record<string, any>} [context]
   * @returns {Array<any>}
   */
  dispatchBatch(events = [], context = {}) {
    return events.map((event) => this.dispatch(event, context));
  }

  /**
   * @param {Record<string, any>} event
   * @param {Record<string, any>} context
   * @returns {any}
   */
  finalDispatch(event, context) {
    this.subscribers.forEach((subscriber) => {
      subscriber(event, context);
    });

    if (this.onDispatch) {
      return this.onDispatch(event, context);
    }

    return event;
  }
}

module.exports = EventDispatcher;
