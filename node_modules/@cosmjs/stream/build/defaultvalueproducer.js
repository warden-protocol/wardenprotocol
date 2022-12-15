"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultValueProducer = void 0;
// allows pre-producing values before anyone is listening
class DefaultValueProducer {
    constructor(value, callbacks) {
        this.callbacks = callbacks;
        this.internalValue = value;
    }
    get value() {
        return this.internalValue;
    }
    /**
     * Update the current value.
     *
     * If producer is active (i.e. someone is listening), this emits an event.
     * If not, just the current value is updated.
     */
    update(value) {
        this.internalValue = value;
        if (this.listener) {
            this.listener.next(value);
        }
    }
    /**
     * Produce an error
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    error(error) {
        if (this.listener) {
            this.listener.error(error);
        }
    }
    /**
     * Called by the stream. Do not call this directly.
     */
    start(listener) {
        this.listener = listener;
        listener.next(this.internalValue);
        if (this.callbacks) {
            this.callbacks.onStarted();
        }
    }
    /**
     * Called by the stream. Do not call this directly.
     */
    stop() {
        if (this.callbacks) {
            this.callbacks.onStop();
        }
        this.listener = undefined;
    }
}
exports.DefaultValueProducer = DefaultValueProducer;
//# sourceMappingURL=defaultvalueproducer.js.map