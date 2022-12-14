"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropDuplicates = void 0;
/**
 * Drops duplicate values in a stream.
 *
 * Marble diagram:
 *
 * ```text
 * -1-1-1-2-4-3-3-4--
 *   dropDuplicates
 * -1-----2-4-3------
 * ```
 *
 * Each value must be uniquely identified by a string given by
 * valueToKey(value).
 *
 * Internally this maintains a set of keys that have been processed already,
 * i.e. memory consumption and Set lookup times should be considered when
 * using this function.
 */
function dropDuplicates(valueToKey) {
    const operand = (instream) => {
        const emittedKeys = new Set();
        const deduplicatedStream = instream
            .filter((value) => !emittedKeys.has(valueToKey(value)))
            .debug((value) => emittedKeys.add(valueToKey(value)));
        return deduplicatedStream;
    };
    return operand;
}
exports.dropDuplicates = dropDuplicates;
//# sourceMappingURL=dropduplicates.js.map