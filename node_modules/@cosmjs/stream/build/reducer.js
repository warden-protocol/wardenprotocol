"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastValue = exports.asArray = exports.countStream = exports.Reducer = void 0;
// Reducer takes a stream of events T and a ReducerFunc, that
// materializes a state of type U.
class Reducer {
    constructor(stream, reducer, initState) {
        this.stream = stream;
        this.reducer = reducer;
        this.state = initState;
        this.completed = new Promise((resolve, reject) => {
            const subscription = this.stream.subscribe({
                next: (evt) => {
                    this.state = this.reducer(this.state, evt);
                },
                complete: () => {
                    resolve();
                    // this must happen after resolve, to ensure stream.subscribe() has finished
                    subscription.unsubscribe();
                },
                error: (err) => {
                    reject(err);
                    // the stream already closed on error, but unsubscribe to be safe
                    subscription.unsubscribe();
                },
            });
        });
    }
    // value returns current materialized state
    value() {
        return this.state;
    }
    // finished resolves on completed stream, rejects on stream error
    async finished() {
        return this.completed;
    }
}
exports.Reducer = Reducer;
function increment(sum, _) {
    return sum + 1;
}
// countStream returns a reducer that contains current count
// of events on the stream
function countStream(stream) {
    return new Reducer(stream, increment, 0);
}
exports.countStream = countStream;
function append(list, evt) {
    return [...list, evt];
}
// asArray maintains an array containing all events that have
// occurred on the stream
function asArray(stream) {
    return new Reducer(stream, append, []);
}
exports.asArray = asArray;
function last(_, event) {
    return event;
}
// lastValue returns the last value read from the stream, or undefined if no values sent
function lastValue(stream) {
    return new Reducer(stream, last, undefined);
}
exports.lastValue = lastValue;
//# sourceMappingURL=reducer.js.map