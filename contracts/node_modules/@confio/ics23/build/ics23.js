"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchVerifyNonMembership = exports.batchVerifyMembership = exports.verifyNonMembership = exports.verifyMembership = void 0;
const compress_1 = require("./compress");
const proofs_1 = require("./proofs");
const specs_1 = require("./specs");
/*
This implements the client side functions as specified in
https://github.com/cosmos/ics/tree/master/spec/ics-023-vector-commitments

In particular:

  // Assumes ExistenceProof
  type verifyMembership = (root: CommitmentRoot, proof: CommitmentProof, key: Key, value: Value) => boolean

  // Assumes NonExistenceProof
  type verifyNonMembership = (root: CommitmentRoot, proof: CommitmentProof, key: Key) => boolean

  // Assumes BatchProof - required ExistenceProofs may be a subset of all items proven
  type batchVerifyMembership = (root: CommitmentRoot, proof: CommitmentProof, items: Map<Key, Value>) => boolean

  // Assumes BatchProof - required NonExistenceProofs may be a subset of all items proven
  type batchVerifyNonMembership = (root: CommitmentRoot, proof: CommitmentProof, keys: Set<Key>) => boolean

We make an adjustment to accept a Spec to ensure the provided proof is in the format of the expected merkle store.
This can avoid an range of attacks on fake preimages, as we need to be careful on how to map key, value -> leaf
and determine neighbors
*/
/**
 * verifyMembership ensures proof is (contains) a valid existence proof for the given
 */
function verifyMembership(proof, spec, root, key, value) {
    const norm = (0, compress_1.decompress)(proof);
    const exist = getExistForKey(norm, key);
    if (!exist) {
        return false;
    }
    try {
        (0, proofs_1.verifyExistence)(exist, spec, root, key, value);
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.verifyMembership = verifyMembership;
/**
 * verifyNonMembership ensures proof is (contains) a valid non-existence proof for the given key
 */
function verifyNonMembership(proof, spec, root, key) {
    const norm = (0, compress_1.decompress)(proof);
    const nonexist = getNonExistForKey(norm, key);
    if (!nonexist) {
        return false;
    }
    try {
        (0, proofs_1.verifyNonExistence)(nonexist, spec, root, key);
        return true;
    }
    catch (_a) {
        return false;
    }
}
exports.verifyNonMembership = verifyNonMembership;
/**
 * batchVerifyMembership ensures proof is (contains) a valid existence proof for the given
 */
function batchVerifyMembership(proof, spec, root, items) {
    const norm = (0, compress_1.decompress)(proof);
    for (const [key, value] of items.entries()) {
        if (!verifyMembership(norm, spec, root, key, value)) {
            return false;
        }
    }
    return true;
}
exports.batchVerifyMembership = batchVerifyMembership;
/**
 * batchVerifyNonMembership ensures proof is (contains) a valid existence proof for the given
 */
function batchVerifyNonMembership(proof, spec, root, keys) {
    const norm = (0, compress_1.decompress)(proof);
    for (const key of keys) {
        if (!verifyNonMembership(norm, spec, root, key)) {
            return false;
        }
    }
    return true;
}
exports.batchVerifyNonMembership = batchVerifyNonMembership;
function getExistForKey(proof, key) {
    const match = (p) => !!p && (0, specs_1.bytesEqual)(key, p.key);
    if (match(proof.exist)) {
        return proof.exist;
    }
    else if (proof.batch) {
        return proof.batch.entries.map((x) => x.exist || null).find(match);
    }
    return undefined;
}
function getNonExistForKey(proof, key) {
    const match = (p) => {
        return (!!p &&
            (!p.left || (0, specs_1.bytesBefore)(p.left.key, key)) &&
            (!p.right || (0, specs_1.bytesBefore)(key, p.right.key)));
    };
    if (match(proof.nonexist)) {
        return proof.nonexist;
    }
    else if (proof.batch) {
        return proof.batch.entries.map((x) => x.nonexist || null).find(match);
    }
    return undefined;
}
//# sourceMappingURL=ics23.js.map