import { Stream } from '../index';
/**
 * Buffers a stream using a separator stream. Returns a stream that emits
 * arrays.
 *
 * Marble diagram:
 *
 * ```text
 * --1--2--3--4--5--6--7--8--9|
 * buffer( -a---------b---------c| )
 * ---------[1,2,3]---[4,5,6]---[7,8,9]|
 * ```
 *
 * Example:
 *
 * ```js
 * import buffer from 'xstream/extra/buffer'
 *
 * const source = xs.periodic(50).take(10);
 * const separator = xs.periodic(170).take(3);
 * const buffered = source.compose(buffer(separator));
 *
 * buffered.addListener({
 *   next: arr => console.log(arr),
 *   error: err => console.error(err)
 * });
 * ```
 *
 * ```text
 * > [0, 1, 2]
 * > [3, 4, 5]
 * > [6, 7, 8]
 * ```
 *
 * @param {Stream} separator Some other stream that is used to know when to
 * split the output stream.
 * @return {Stream}
 */
export default function buffer<T>(s: Stream<any>): (ins: Stream<T>) => Stream<Array<T>>;
