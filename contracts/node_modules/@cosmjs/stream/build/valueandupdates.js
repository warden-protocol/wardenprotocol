"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueAndUpdates = void 0;
const xstream_1 = require("xstream");
/**
 * A read only wrapper around DefaultValueProducer that allows
 * to synchronously get the current value using the .value property
 * and listen to to updates by suscribing to the .updates stream
 */
class ValueAndUpdates {
    constructor(producer) {
        this.producer = producer;
        this.updates = xstream_1.MemoryStream.createWithMemory(this.producer);
    }
    get value() {
        return this.producer.value;
    }
    /**
     * Resolves as soon as search value is found.
     *
     * @param search either a value or a function that must return true when found
     * @returns the value of the update that caused the search match
     */
    async waitFor(search) {
        const searchImplementation = typeof search === "function" ? search : (value) => value === search;
        return new Promise((resolve, reject) => {
            const subscription = this.updates.subscribe({
                next: (newValue) => {
                    if (searchImplementation(newValue)) {
                        resolve(newValue);
                        // MemoryStream.subscribe() calls next with the last value.
                        // Make async to ensure the subscription exists
                        setTimeout(() => subscription.unsubscribe(), 0);
                    }
                },
                complete: () => {
                    subscription.unsubscribe();
                    reject("Update stream completed without expected value");
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    }
}
exports.ValueAndUpdates = ValueAndUpdates;
//# sourceMappingURL=valueandupdates.js.map