import { Listener, Producer } from "xstream";
export interface DefaultValueProducerCallsbacks {
    readonly onStarted: () => void;
    readonly onStop: () => void;
}
export declare class DefaultValueProducer<T> implements Producer<T> {
    get value(): T;
    private readonly callbacks;
    private internalValue;
    private listener;
    constructor(value: T, callbacks?: DefaultValueProducerCallsbacks);
    /**
     * Update the current value.
     *
     * If producer is active (i.e. someone is listening), this emits an event.
     * If not, just the current value is updated.
     */
    update(value: T): void;
    /**
     * Produce an error
     */
    error(error: any): void;
    /**
     * Called by the stream. Do not call this directly.
     */
    start(listener: Listener<T>): void;
    /**
     * Called by the stream. Do not call this directly.
     */
    stop(): void;
}
