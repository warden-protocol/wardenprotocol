import { Stream } from "xstream";
export declare type ReducerFunc<T, U> = (acc: U, evt: T) => U;
export declare class Reducer<T, U> {
    private readonly stream;
    private readonly reducer;
    private state;
    private readonly completed;
    constructor(stream: Stream<T>, reducer: ReducerFunc<T, U>, initState: U);
    value(): U;
    finished(): Promise<void>;
}
export declare function countStream<T>(stream: Stream<T>): Reducer<T, number>;
export declare function asArray<T>(stream: Stream<T>): Reducer<T, readonly T[]>;
export declare function lastValue<T>(stream: Stream<T>): Reducer<T, T | undefined>;
