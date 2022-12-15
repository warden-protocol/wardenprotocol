"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concat = void 0;
const xstream_1 = require("xstream");
/**
 * An implementation of concat that buffers all source stream events
 *
 * Marble diagram:
 *
 * ```text
 * --1--2---3---4-|
 * -a--b-c--d-|
 * --------X---------Y---------Z-
 *           concat
 * --1--2---3---4-abcdXY-------Z-
 * ```
 *
 * This is inspired by RxJS's concat as documented at http://rxmarbles.com/#concat and behaves
 * differently than xstream's concat as discussed in https://github.com/staltz/xstream/issues/170.
 *
 */
function concat(...streams) {
    const subscriptions = new Array();
    const queues = new Array(); // one queue per stream
    const completedStreams = new Set();
    let activeStreamIndex = 0;
    function reset() {
        while (subscriptions.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const subscription = subscriptions.shift();
            subscription.unsubscribe();
        }
        queues.length = 0;
        completedStreams.clear();
        activeStreamIndex = 0;
    }
    const producer = {
        start: (listener) => {
            streams.forEach((_) => queues.push([]));
            function emitAllQueuesEvents(streamIndex) {
                // eslint-disable-next-line no-constant-condition
                while (true) {
                    const element = queues[streamIndex].shift();
                    if (element === undefined) {
                        return;
                    }
                    listener.next(element);
                }
            }
            function isDone() {
                return activeStreamIndex >= streams.length;
            }
            if (isDone()) {
                listener.complete();
                return;
            }
            streams.forEach((stream, index) => {
                subscriptions.push(stream.subscribe({
                    next: (value) => {
                        if (index === activeStreamIndex) {
                            listener.next(value);
                        }
                        else {
                            queues[index].push(value);
                        }
                    },
                    complete: () => {
                        completedStreams.add(index);
                        while (completedStreams.has(activeStreamIndex)) {
                            // this stream completed: emit all and move on
                            emitAllQueuesEvents(activeStreamIndex);
                            activeStreamIndex++;
                        }
                        if (isDone()) {
                            listener.complete();
                        }
                        else {
                            // now active stream can have some events queued but did not yet complete
                            emitAllQueuesEvents(activeStreamIndex);
                        }
                    },
                    error: (error) => {
                        listener.error(error);
                        reset();
                    },
                }));
            });
        },
        stop: () => {
            reset();
        },
    };
    return xstream_1.Stream.create(producer);
}
exports.concat = concat;
//# sourceMappingURL=concat.js.map