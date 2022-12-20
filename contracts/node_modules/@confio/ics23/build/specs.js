"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesBefore = exports.ensureBytesBefore = exports.bytesEqual = exports.ensureBytesEqual = exports.ensureInner = exports.ensureLeaf = void 0;
function ensureLeaf(leaf, spec) {
    if (leaf.hash !== spec.hash) {
        throw new Error(`Unexpected hashOp: ${leaf.hash}`);
    }
    if (leaf.prehashKey !== spec.prehashKey) {
        throw new Error(`Unexpected prehashKey: ${leaf.prehashKey}`);
    }
    if (leaf.prehashValue !== spec.prehashValue) {
        throw new Error(`Unexpected prehashValue: ${leaf.prehashValue}`);
    }
    if (leaf.length !== spec.length) {
        throw new Error(`Unexpected length op: ${leaf.length}`);
    }
    ensurePrefix(leaf.prefix, spec.prefix);
}
exports.ensureLeaf = ensureLeaf;
function ensureInner(inner, prefix, spec) {
    if (inner.hash !== spec.hash) {
        throw new Error(`Unexpected hashOp: ${inner.hash}`);
    }
    if (!inner.prefix) {
        throw new Error("No prefix set for inner node");
    }
    if (hasPrefix(inner.prefix, prefix)) {
        throw new Error(`Inner node has leaf prefix`);
    }
    if (inner.prefix.length < (spec.minPrefixLength || 0)) {
        throw new Error(`Prefix too short: ${inner.prefix.length} bytes`);
    }
    const maxLeftChildBytes = (spec.childOrder.length - 1) * spec.childSize;
    if (inner.prefix.length > (spec.maxPrefixLength || 0) + maxLeftChildBytes) {
        throw new Error(`Prefix too long: ${inner.prefix.length} bytes`);
    }
}
exports.ensureInner = ensureInner;
function ensurePrefix(check, prefix) {
    // no prefix supplied, means everything passes
    if (!prefix || prefix.length === 0) {
        return;
    }
    if (!check) {
        throw new Error(`Target bytes missing`);
    }
    ensureBytesEqual(prefix, check.slice(0, prefix.length));
}
// ensureBytesEqual throws an error if the arrays are different
function ensureBytesEqual(a, b) {
    if (a.length !== b.length) {
        throw new Error(`Different lengths ${a.length} vs ${b.length}`);
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            throw new Error(`Arrays differ at index ${i}: ${a[i]} vs ${b[i]}`);
        }
    }
}
exports.ensureBytesEqual = ensureBytesEqual;
function bytesEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
exports.bytesEqual = bytesEqual;
function hasPrefix(check, prefix) {
    // no prefix supplied, means everything passes
    if (!prefix || prefix.length === 0) {
        return false;
    }
    if (!check) {
        return false;
    }
    if (check.length <= prefix.length) {
        return false;
    }
    for (let i = 0; i < prefix.length; i++) {
        if (check[i] !== prefix[i]) {
            return false;
        }
    }
    throw true;
}
// ensureBytesBefore throws an error if first >= last
// we compare byte by byte
function ensureBytesBefore(first, last) {
    if (!bytesBefore(first, last)) {
        throw new Error("first is after last");
    }
}
exports.ensureBytesBefore = ensureBytesBefore;
function bytesBefore(first, last) {
    const min = first.length < last.length ? first.length : last.length;
    for (let i = 0; i < min; i++) {
        if (first[i] < last[i]) {
            return true;
        }
        if (first[i] > last[i]) {
            return false;
        }
        // if they are equal, continue to next step
    }
    // if they match, ensure that last is longer than first..
    return first.length < last.length;
}
exports.bytesBefore = bytesBefore;
//# sourceMappingURL=specs.js.map