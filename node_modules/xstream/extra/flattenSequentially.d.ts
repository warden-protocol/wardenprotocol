import { Operator, Stream, MemoryStream } from '../index';
export declare class FlattenSeqOperator<T> implements Operator<Stream<T>, T> {
    type: string;
    ins: Stream<Stream<T>>;
    private open;
    private active;
    private activeIL;
    private seq;
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
 * Flattens a "stream of streams", handling only one nested stream at a time,
 * with no concurrency, but does not drop nested streams like `flatten` does.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens sequentially and without concurrency. It works like this:
 * when the input stream emits a nested stream, *flattenSequentially* will start
 * imitating that nested one. When the next nested stream is emitted on the
 * input stream, *flattenSequentially* will keep that in a buffer, and only
 * start imitating it once the previous nested stream completes.
 *
 * In essence, `flattenSequentially` concatenates all nested streams.
 *
 * Marble diagram:
 *
 * ```text
 * --+--------+-------------------------
 *   \        \
 *    \       ----1----2---3--|
 *    --a--b----c----d--|
 *          flattenSequentially
 * -----a--b----c----d------1----2---3--
 * ```
 *
 * @return {Stream}
 */
export default function flattenSequentially<T>(ins: Stream<Stream<T> | MemoryStream<T>>): Stream<T>;
