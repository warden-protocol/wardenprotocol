import { Operator, Stream, MemoryStream } from '../index';
export declare class FlattenConcAMOperator<T> implements Operator<Stream<T>, T> {
    n: number;
    ins: Stream<Stream<T>>;
    type: string;
    out: Stream<T>;
    private _l;
    private _d;
    private _seq;
    constructor(n: number, ins: Stream<Stream<T>>);
    _start(out: Stream<T>): void;
    _stop(): void;
    less(): void;
    _n(s: Stream<T>): void;
    _e(err: any): void;
    _c(): void;
}
/**
 * Flattens a "stream of streams", handling multiple concurrent nested streams
 * simultaneously, up to some limit `n`.
 *
 * If the input stream is a stream that emits streams, then this operator will
 * return an output stream which is a flat stream: emits regular events. The
 * flattening happens concurrently, up to the configured limit. It works like
 * this: when the input stream emits a nested stream,
 * *flattenConcurrentlyAtMost* will start imitating that nested one. When the
 * next nested stream is emitted on the input stream,
 * *flattenConcurrentlyAtMost* will check to see how many streams it is connected
 * to. If it is connected to a number of streams less than the limit, it will also
 * imitate that new one, but will continue to imitate the previous nested streams
 * as well.
 *
 * If the limit has already been reached, *flattenConcurrentlyAtMost* will put the
 * stream in a queue. When any of the streams it is listening to completes, a stream
 * is taken out of the queue and `flattenConcurrentlyAtMost` will connect to it.
 *
 * This process continues until the metastream completes and there are no more
 * connected streams or streams in the queue.
 *
 * Marble diagrams:
 *
 * ```text
 * --+--------+---------------
 *   \        \
 *    \       ----1----2---3--|
 *    --a--b----c----|
 *     flattenConcurrentlyAtMost(1)
 * -----a--b----c-1----2---3--|
 * ```
 *
 * ```text
 * --+---+---+-|
 *    \   \   \
 *     \   \   ---fgh----i-----jh--|
 *      \   -----1----2----3--|
 *       ---a--b-----c--|
 *     flattenConcurrentlyAtMost(2)
 * ---------a--b-1---c2--i-3------fgh----i-----jh--|
 * ```
 *
 * @return {Stream}
 */
export default function flattenConcurrentlyAtMost<T>(n: number): (ins: Stream<Stream<T> | MemoryStream<T>>) => Stream<T>;
