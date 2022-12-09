import { Operator, Stream, MemoryStream } from '../index';
export declare class FlattenConcOperator<T> implements Operator<Stream<T>, T> {
    ins: Stream<Stream<T>>;
    type: string;
    private active;
    out: Stream<T>;
    constructor(ins: Stream<Stream<T>>);
    _start(out: Stream<T>): void;
    _stop(): void;
    less(): void;
    _n(s: Stream<T>): void;
    _e(err: any): void;
    _c(): void;
}
/**
 * Flattens a "stream of streams", handling multiple concurrent nested streams
 * simultaneously.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens concurrently. It works like this: when the input stream
 * emits a nested stream, *flattenConcurrently* will start imitating that
 * nested one. When the next nested stream is emitted on the input stream,
 * *flattenConcurrently* will also imitate that new one, but will continue to
 * imitate the previous nested streams as well.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--
 *    --a--b----c----d--------
 *     flattenConcurrently
 * -----a--b----c-1--d-2---3--
 * ```
 *
 * @return {Stream}
 */
export default function flattenConcurrently<T>(ins: Stream<Stream<T> | MemoryStream<T>>): Stream<T>;
