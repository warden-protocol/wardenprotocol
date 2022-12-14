import { Stream } from "xstream";
/**
 * Emits one event for each list element as soon as the promise resolves
 */
export declare function fromListPromise<T>(promise: Promise<Iterable<T>>): Stream<T>;
/**
 * Listens to stream and collects events. When `count` events are collected,
 * the promise resolves with an array of events.
 *
 * Rejects if stream completes before `count` events are collected.
 */
export declare function toListPromise<T>(stream: Stream<T>, count: number): Promise<readonly T[]>;
/**
 * Listens to stream, collects one event and revolves.
 *
 * Rejects if stream completes before one event was fired.
 */
export declare function firstEvent<T>(stream: Stream<T>): Promise<T>;
