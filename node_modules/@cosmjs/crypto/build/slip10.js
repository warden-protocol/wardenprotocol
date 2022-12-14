"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToPath = exports.pathToString = exports.Slip10 = exports.Slip10RawIndex = exports.slip10CurveFromString = exports.Slip10Curve = void 0;
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const bn_js_1 = __importDefault(require("bn.js"));
const elliptic_1 = __importDefault(require("elliptic"));
const hmac_1 = require("./hmac");
const sha_1 = require("./sha");
/**
 * Raw values must match the curve string in SLIP-0010 master key generation
 *
 * @see https://github.com/satoshilabs/slips/blob/master/slip-0010.md#master-key-generation
 */
var Slip10Curve;
(function (Slip10Curve) {
    Slip10Curve["Secp256k1"] = "Bitcoin seed";
    Slip10Curve["Ed25519"] = "ed25519 seed";
})(Slip10Curve = exports.Slip10Curve || (exports.Slip10Curve = {}));
/**
 * Reverse mapping of Slip10Curve
 */
function slip10CurveFromString(curveString) {
    switch (curveString) {
        case Slip10Curve.Ed25519:
            return Slip10Curve.Ed25519;
        case Slip10Curve.Secp256k1:
            return Slip10Curve.Secp256k1;
        default:
            throw new Error(`Unknown curve string: '${curveString}'`);
    }
}
exports.slip10CurveFromString = slip10CurveFromString;
class Slip10RawIndex extends math_1.Uint32 {
    static hardened(hardenedIndex) {
        return new Slip10RawIndex(hardenedIndex + 2 ** 31);
    }
    static normal(normalIndex) {
        return new Slip10RawIndex(normalIndex);
    }
    isHardened() {
        return this.data >= 2 ** 31;
    }
}
exports.Slip10RawIndex = Slip10RawIndex;
const secp256k1 = new elliptic_1.default.ec("secp256k1");
// Universal private key derivation accoring to
// https://github.com/satoshilabs/slips/blob/master/slip-0010.md
class Slip10 {
    static derivePath(curve, seed, path) {
        let result = this.master(curve, seed);
        for (const rawIndex of path) {
            result = this.child(curve, result.privkey, result.chainCode, rawIndex);
        }
        return result;
    }
    static master(curve, seed) {
        const i = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.toAscii)(curve)).update(seed).digest();
        const il = i.slice(0, 32);
        const ir = i.slice(32, 64);
        if (curve !== Slip10Curve.Ed25519 && (this.isZero(il) || this.isGteN(curve, il))) {
            return this.master(curve, i);
        }
        return {
            chainCode: ir,
            privkey: il,
        };
    }
    static child(curve, parentPrivkey, parentChainCode, rawIndex) {
        let i;
        if (rawIndex.isHardened()) {
            const payload = new Uint8Array([0x00, ...parentPrivkey, ...rawIndex.toBytesBigEndian()]);
            i = new hmac_1.Hmac(sha_1.Sha512, parentChainCode).update(payload).digest();
        }
        else {
            if (curve === Slip10Curve.Ed25519) {
                throw new Error("Normal keys are not allowed with ed25519");
            }
            else {
                // Step 1 of https://github.com/satoshilabs/slips/blob/master/slip-0010.md#private-parent-key--private-child-key
                // Calculate I = HMAC-SHA512(Key = c_par, Data = ser_P(point(k_par)) || ser_32(i)).
                // where the functions point() and ser_p() are defined in BIP-0032
                const data = new Uint8Array([
                    ...Slip10.serializedPoint(curve, new bn_js_1.default(parentPrivkey)),
                    ...rawIndex.toBytesBigEndian(),
                ]);
                i = new hmac_1.Hmac(sha_1.Sha512, parentChainCode).update(data).digest();
            }
        }
        return this.childImpl(curve, parentPrivkey, parentChainCode, rawIndex, i);
    }
    /**
     * Implementation of ser_P(point(k_par)) from BIP-0032
     *
     * @see https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki
     */
    static serializedPoint(curve, p) {
        switch (curve) {
            case Slip10Curve.Secp256k1:
                return (0, encoding_1.fromHex)(secp256k1.g.mul(p).encodeCompressed("hex"));
            default:
                throw new Error("curve not supported");
        }
    }
    static childImpl(curve, parentPrivkey, parentChainCode, rawIndex, i) {
        // step 2 (of the Private parent key → private child key algorithm)
        const il = i.slice(0, 32);
        const ir = i.slice(32, 64);
        // step 3
        const returnChainCode = ir;
        // step 4
        if (curve === Slip10Curve.Ed25519) {
            return {
                chainCode: returnChainCode,
                privkey: il,
            };
        }
        // step 5
        const n = this.n(curve);
        const returnChildKeyAsNumber = new bn_js_1.default(il).add(new bn_js_1.default(parentPrivkey)).mod(n);
        const returnChildKey = Uint8Array.from(returnChildKeyAsNumber.toArray("be", 32));
        // step 6
        if (this.isGteN(curve, il) || this.isZero(returnChildKey)) {
            const newI = new hmac_1.Hmac(sha_1.Sha512, parentChainCode)
                .update(new Uint8Array([0x01, ...ir, ...rawIndex.toBytesBigEndian()]))
                .digest();
            return this.childImpl(curve, parentPrivkey, parentChainCode, rawIndex, newI);
        }
        // step 7
        return {
            chainCode: returnChainCode,
            privkey: returnChildKey,
        };
    }
    static isZero(privkey) {
        return privkey.every((byte) => byte === 0);
    }
    static isGteN(curve, privkey) {
        const keyAsNumber = new bn_js_1.default(privkey);
        return keyAsNumber.gte(this.n(curve));
    }
    static n(curve) {
        switch (curve) {
            case Slip10Curve.Secp256k1:
                return new bn_js_1.default("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 16);
            default:
                throw new Error("curve not supported");
        }
    }
}
exports.Slip10 = Slip10;
function pathToString(path) {
    return path.reduce((current, component) => {
        const componentString = component.isHardened()
            ? `${component.toNumber() - 2 ** 31}'`
            : component.toString();
        return current + "/" + componentString;
    }, "m");
}
exports.pathToString = pathToString;
function stringToPath(input) {
    if (!input.startsWith("m"))
        throw new Error("Path string must start with 'm'");
    let rest = input.slice(1);
    const out = new Array();
    while (rest) {
        const match = rest.match(/^\/([0-9]+)('?)/);
        if (!match)
            throw new Error("Syntax error while reading path component");
        const [fullMatch, numberString, apostrophe] = match;
        const value = math_1.Uint53.fromString(numberString).toNumber();
        if (value >= 2 ** 31)
            throw new Error("Component value too high. Must not exceed 2**31-1.");
        if (apostrophe)
            out.push(Slip10RawIndex.hardened(value));
        else
            out.push(Slip10RawIndex.normal(value));
        rest = rest.slice(fullMatch.length);
    }
    return out;
}
exports.stringToPath = stringToPath;
//# sourceMappingURL=slip10.js.map