import { Operator, Stream } from '../index';
export declare class DropUntilOperator<T> implements Operator<T, T> {
    o: Stream<any>;
    ins: Stream<T>;
    type: string;
    out: Stream<T>;
    private oil;
    private on;
    constructor(o: Stream<any>, // o = other
    ins: Stream<T>);
    _start(out: Stream<T>): void;
    _stop(): void;
    up(): void;
    _n(t: T): void;
    _e(err: any): void;
    _c(): void;
}
/**
 * Starts emitting the input stream when another stream emits a next event. The
 * output stream will emit no items if another stream is empty.
 *
 * Marble diagram:
 *
 * ```text
 * ---1---2-----3--4----5----6---
 *   dropUntil( --------a--b--| )
 * ---------------------5----6|
 * ```
 *
 * Example:
 *
 * ```js
 * import dropUntil from 'xstream/extra/dropUntil'
 *
 * const other = xs.periodic(220).take(1)
 *
 * const stream = xs.periodic(50)
 *   .take(6)
 *   .compose(dropUntil(other))
 *
 * stream.addListener({
 *   next: i => console.log(i),
 *   error: err => console.error(err),
 *   complete: () => console.log('completed')
 * })
 * ```
 *
 * ```text
 * > 4
 * > 5
 * > completed
 * ```
 *
 * #### Arguments:
 *
 * @param {Stream} other Some other stream that is used to know when the output
 * stream of this operator should start emitting.
 * @return {Stream}
 */
export default function dropUntil<T>(other: Stream<any>): (ins: Stream<T>) => Stream<T>;
