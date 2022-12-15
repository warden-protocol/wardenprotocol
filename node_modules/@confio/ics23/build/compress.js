"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decompress = exports.compress = void 0;
const codecimpl_1 = require("./generated/codecimpl");
function compress(proof) {
    if (!proof.batch) {
        return proof;
    }
    return { compressed: compressBatch(proof.batch) };
}
exports.compress = compress;
function decompress(proof) {
    if (!proof.compressed) {
        return proof;
    }
    return { batch: decompressBatch(proof.compressed) };
}
exports.decompress = decompress;
function compressBatch(proof) {
    const centries = [];
    const lookup = [];
    const registry = new Map();
    for (const entry of proof.entries) {
        if (entry.exist) {
            const centry = { exist: compressExist(entry.exist, lookup, registry) };
            centries.push(centry);
        }
        else if (entry.nonexist) {
            const non = entry.nonexist;
            const centry = {
                nonexist: {
                    key: non.key,
                    left: compressExist(non.left, lookup, registry),
                    right: compressExist(non.right, lookup, registry),
                },
            };
            centries.push(centry);
        }
        else {
            throw new Error("Unexpected batch entry during compress");
        }
    }
    return {
        entries: centries,
        lookupInners: lookup,
    };
}
function compressExist(exist, lookup, registry) {
    if (!exist) {
        return undefined;
    }
    const path = exist.path.map((inner) => {
        const sig = codecimpl_1.ics23.InnerOp.encode(inner).finish();
        let idx = registry.get(sig);
        if (idx === undefined) {
            idx = lookup.length;
            lookup.push(inner);
            registry.set(sig, idx);
        }
        return idx;
    });
    return {
        key: exist.key,
        value: exist.value,
        leaf: exist.leaf,
        path,
    };
}
function decompressBatch(proof) {
    const lookup = proof.lookupInners;
    const entries = proof.entries.map((comp) => {
        if (comp.exist) {
            return { exist: decompressExist(comp.exist, lookup) };
        }
        else if (comp.nonexist) {
            const non = comp.nonexist;
            return {
                nonexist: {
                    key: non.key,
                    left: decompressExist(non.left, lookup),
                    right: decompressExist(non.right, lookup),
                },
            };
        }
        else {
            throw new Error("Unexpected batch entry during compress");
        }
    });
    return {
        entries,
    };
}
function decompressExist(exist, lookup) {
    if (!exist) {
        return undefined;
    }
    const { key, value, leaf, path } = exist;
    const newPath = (path || []).map((idx) => lookup[idx]);
    return { key, value, leaf, path: newPath };
}
//# sourceMappingURL=compress.js.map