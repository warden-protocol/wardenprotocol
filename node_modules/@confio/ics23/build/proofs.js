"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLeftNeighbor = exports.ensureSpec = exports.calculateExistenceRoot = exports.verifyNonExistence = exports.verifyExistence = exports.smtSpec = exports.tendermintSpec = exports.iavlSpec = void 0;
const codecimpl_1 = require("./generated/codecimpl");
const ops_1 = require("./ops");
const specs_1 = require("./specs");
exports.iavlSpec = {
    leafSpec: {
        prefix: Uint8Array.from([0]),
        hash: codecimpl_1.ics23.HashOp.SHA256,
        prehashValue: codecimpl_1.ics23.HashOp.SHA256,
        prehashKey: codecimpl_1.ics23.HashOp.NO_HASH,
        length: codecimpl_1.ics23.LengthOp.VAR_PROTO,
    },
    innerSpec: {
        childOrder: [0, 1],
        minPrefixLength: 4,
        maxPrefixLength: 12,
        childSize: 33,
        hash: codecimpl_1.ics23.HashOp.SHA256,
    },
};
exports.tendermintSpec = {
    leafSpec: {
        prefix: Uint8Array.from([0]),
        hash: codecimpl_1.ics23.HashOp.SHA256,
        prehashValue: codecimpl_1.ics23.HashOp.SHA256,
        prehashKey: codecimpl_1.ics23.HashOp.NO_HASH,
        length: codecimpl_1.ics23.LengthOp.VAR_PROTO,
    },
    innerSpec: {
        childOrder: [0, 1],
        minPrefixLength: 1,
        maxPrefixLength: 1,
        childSize: 32,
        hash: codecimpl_1.ics23.HashOp.SHA256,
    },
};
exports.smtSpec = {
    leafSpec: {
        hash: codecimpl_1.ics23.HashOp.SHA256,
        prehashKey: codecimpl_1.ics23.HashOp.NO_HASH,
        prehashValue: codecimpl_1.ics23.HashOp.SHA256,
        length: codecimpl_1.ics23.LengthOp.NO_PREFIX,
        prefix: Uint8Array.from([0]),
    },
    innerSpec: {
        childOrder: [0, 1],
        childSize: 32,
        minPrefixLength: 1,
        maxPrefixLength: 1,
        emptyChild: new Uint8Array(32),
        hash: codecimpl_1.ics23.HashOp.SHA256,
    },
    maxDepth: 256,
};
// verifyExistence will throw an error if the proof doesn't link key, value -> root
// or if it doesn't fulfill the spec
function verifyExistence(proof, spec, root, key, value) {
    ensureSpec(proof, spec);
    const calc = calculateExistenceRoot(proof);
    (0, specs_1.ensureBytesEqual)(calc, root);
    (0, specs_1.ensureBytesEqual)(key, proof.key);
    (0, specs_1.ensureBytesEqual)(value, proof.value);
}
exports.verifyExistence = verifyExistence;
// Verify does all checks to ensure the proof has valid non-existence proofs,
// and they ensure the given key is not in the CommitmentState,
// throwing an error if there is an issue
function verifyNonExistence(proof, spec, root, key) {
    let leftKey;
    let rightKey;
    if (proof.left) {
        verifyExistence(proof.left, spec, root, proof.left.key, proof.left.value);
        leftKey = proof.left.key;
    }
    if (proof.right) {
        verifyExistence(proof.right, spec, root, proof.right.key, proof.right.value);
        rightKey = proof.right.key;
    }
    if (!leftKey && !rightKey) {
        throw new Error("neither left nor right proof defined");
    }
    if (leftKey) {
        (0, specs_1.ensureBytesBefore)(leftKey, key);
    }
    if (rightKey) {
        (0, specs_1.ensureBytesBefore)(key, rightKey);
    }
    if (!spec.innerSpec) {
        throw new Error("no inner spec");
    }
    if (!leftKey) {
        ensureLeftMost(spec.innerSpec, proof.right.path);
    }
    else if (!rightKey) {
        ensureRightMost(spec.innerSpec, proof.left.path);
    }
    else {
        ensureLeftNeighbor(spec.innerSpec, proof.left.path, proof.right.path);
    }
    return;
}
exports.verifyNonExistence = verifyNonExistence;
// Calculate determines the root hash that matches the given proof.
// You must validate the result is what you have in a header.
// Returns error if the calculations cannot be performed.
function calculateExistenceRoot(proof) {
    if (!proof.key || !proof.value) {
        throw new Error("Existence proof needs key and value set");
    }
    if (!proof.leaf) {
        throw new Error("Existence proof must start with a leaf operation");
    }
    const path = proof.path || [];
    let res = (0, ops_1.applyLeaf)(proof.leaf, proof.key, proof.value);
    for (const inner of path) {
        res = (0, ops_1.applyInner)(inner, res);
    }
    return res;
}
exports.calculateExistenceRoot = calculateExistenceRoot;
// ensureSpec throws an Error if proof doesn't fulfill spec
function ensureSpec(proof, spec) {
    if (!proof.leaf) {
        throw new Error("Existence proof must start with a leaf operation");
    }
    if (!spec.leafSpec) {
        throw new Error("Spec must include leafSpec");
    }
    if (!spec.innerSpec) {
        throw new Error("Spec must include innerSpec");
    }
    (0, specs_1.ensureLeaf)(proof.leaf, spec.leafSpec);
    const path = proof.path || [];
    if (spec.minDepth && path.length < spec.minDepth) {
        throw new Error(`Too few inner nodes ${path.length}`);
    }
    if (spec.maxDepth && path.length > spec.maxDepth) {
        throw new Error(`Too many inner nodes ${path.length}`);
    }
    for (const inner of path) {
        (0, specs_1.ensureInner)(inner, spec.leafSpec.prefix, spec.innerSpec);
    }
}
exports.ensureSpec = ensureSpec;
function ensureLeftMost(spec, path) {
    const { minPrefix, maxPrefix, suffix } = getPadding(spec, 0);
    // ensure every step has a prefix and suffix defined to be leftmost
    for (const step of path) {
        if (!hasPadding(step, minPrefix, maxPrefix, suffix)) {
            throw new Error("Step not leftmost");
        }
    }
}
function ensureRightMost(spec, path) {
    const len = spec.childOrder.length - 1;
    const { minPrefix, maxPrefix, suffix } = getPadding(spec, len);
    // ensure every step has a prefix and suffix defined to be leftmost
    for (const step of path) {
        if (!hasPadding(step, minPrefix, maxPrefix, suffix)) {
            throw new Error("Step not leftmost");
        }
    }
}
function ensureLeftNeighbor(spec, left, right) {
    const mutleft = [...left];
    const mutright = [...right];
    let topleft = mutleft.pop();
    let topright = mutright.pop();
    while ((0, specs_1.bytesEqual)(topleft.prefix, topright.prefix) &&
        (0, specs_1.bytesEqual)(topleft.suffix, topright.suffix)) {
        topleft = mutleft.pop();
        topright = mutright.pop();
    }
    // now topleft and topright are the first divergent nodes
    // make sure they are left and right of each other
    if (!isLeftStep(spec, topleft, topright)) {
        throw new Error(`Not left neightbor at first divergent step`);
    }
    // make sure the paths are left and right most possibilities respectively
    ensureRightMost(spec, mutleft);
    ensureLeftMost(spec, mutright);
}
exports.ensureLeftNeighbor = ensureLeftNeighbor;
// isLeftStep assumes left and right have common parents
// checks if left is exactly one slot to the left of right
function isLeftStep(spec, left, right) {
    const leftidx = orderFromPadding(spec, left);
    const rightidx = orderFromPadding(spec, right);
    return rightidx === leftidx + 1;
}
function orderFromPadding(spec, inner) {
    for (let branch = 0; branch < spec.childOrder.length; branch++) {
        const { minPrefix, maxPrefix, suffix } = getPadding(spec, branch);
        if (hasPadding(inner, minPrefix, maxPrefix, suffix)) {
            return branch;
        }
    }
    throw new Error(`Cannot find any valid spacing for this node`);
}
function hasPadding(op, minPrefix, maxPrefix, suffix) {
    if ((op.prefix || []).length < minPrefix) {
        return false;
    }
    if ((op.prefix || []).length > maxPrefix) {
        return false;
    }
    return (op.suffix || []).length === suffix;
}
function getPadding(spec, branch) {
    const idx = getPosition(spec.childOrder, branch);
    // count how many children are in the prefix
    const prefix = idx * spec.childSize;
    const minPrefix = prefix + spec.minPrefixLength;
    const maxPrefix = prefix + spec.maxPrefixLength;
    // count how many children are in the suffix
    const suffix = (spec.childOrder.length - 1 - idx) * spec.childSize;
    return { minPrefix, maxPrefix, suffix };
}
function getPosition(order, branch) {
    if (branch < 0 || branch >= order.length) {
        throw new Error(`Invalid branch: ${branch}`);
    }
    return order.findIndex((val) => val === branch);
}
//# sourceMappingURL=proofs.js.map