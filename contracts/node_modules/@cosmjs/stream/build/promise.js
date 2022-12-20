"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstEvent = exports.toListPromise = exports.fromListPromise = void 0;
const xstream_1 = require("xstream");
/**
 * Emits one event for each list element as soon as the promise resolves
 */
function fromListPromise(promise) {
    const producer = {
        start: (listener) => {
            // the code in `start` runs as soon as anyone listens to the stream
            promise
                .then((iterable) => {
                for (const element of iterable) {
                    listener.next(element);
                }
                listener.complete();
            })
                .catch((error) => listener.error(error));
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        stop: () => { },
    };
    return xstream_1.Stream.create(producer);
}
exports.fromListPromise = fromListPromise;
/**
 * Listens to stream and collects events. When `count` events are collected,
 * the promise resolves with an array of events.
 *
 * Rejects if stream completes before `count` events are collected.
 */
async function toListPromise(stream, count) {
    return new Promise((resolve, reject) => {
        if (count === 0) {
            resolve([]);
            return;
        }
        const events = new Array();
        // take() unsubscribes from source stream automatically
        stream.take(count).subscribe({
            next: (event) => {
                events.push(event);
                if (events.length === count) {
                    resolve(events);
                }
            },
            complete: () => {
                reject(`Stream completed before all events could be collected. ` +
                    `Collected ${events.length}, expected ${count}`);
            },
            error: (error) => reject(error),
        });
    });
}
exports.toListPromise = toListPromise;
/**
 * Listens to stream, collects one event and revolves.
 *
 * Rejects if stream completes before one event was fired.
 */
async function firstEvent(stream) {
    return (await toListPromise(stream, 1))[0];
}
exports.firstEvent = firstEvent;
//# sourceMappingURL=promise.js.map