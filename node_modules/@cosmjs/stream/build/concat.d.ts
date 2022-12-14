import { Stream } from "xstream";
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
export declare function concat<T>(...streams: Array<Stream<T>>): Stream<T>;
