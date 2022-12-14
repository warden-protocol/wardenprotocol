"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint64 = exports.Uint53 = exports.Int53 = exports.Uint32 = void 0;
/* eslint-disable no-bitwise */
const bn_js_1 = __importDefault(require("bn.js"));
const uint64MaxValue = new bn_js_1.default("18446744073709551615", 10, "be");
class Uint32 {
    constructor(input) {
        if (Number.isNaN(input)) {
            throw new Error("Input is not a number");
        }
        if (!Number.isInteger(input)) {
            throw new Error("Input is not an integer");
        }
        if (input < 0 || input > 4294967295) {
            throw new Error("Input not in uint32 range: " + input.toString());
        }
        this.data = input;
    }
    /** @deprecated use Uint32.fromBytes */
    static fromBigEndianBytes(bytes) {
        return Uint32.fromBytes(bytes);
    }
    /**
     * Creates a Uint32 from a fixed length byte array.
     *
     * @param bytes a list of exactly 4 bytes
     * @param endianess defaults to big endian
     */
    static fromBytes(bytes, endianess = "be") {
        if (bytes.length !== 4) {
            throw new Error("Invalid input length. Expected 4 bytes.");
        }
        for (let i = 0; i < bytes.length; ++i) {
            if (!Number.isInteger(bytes[i]) || bytes[i] > 255 || bytes[i] < 0) {
                throw new Error("Invalid value in byte. Found: " + bytes[i]);
            }
        }
        const beBytes = endianess === "be" ? bytes : Array.from(bytes).reverse();
        // Use mulitiplication instead of shifting since bitwise operators are defined
        // on SIGNED int32 in JavaScript and we don't want to risk surprises
        return new Uint32(beBytes[0] * 2 ** 24 + beBytes[1] * 2 ** 16 + beBytes[2] * 2 ** 8 + beBytes[3]);
    }
    static fromString(str) {
        if (!str.match(/^[0-9]+$/)) {
            throw new Error("Invalid string format");
        }
        return new Uint32(Number.parseInt(str, 10));
    }
    toBytesBigEndian() {
        // Use division instead of shifting since bitwise operators are defined
        // on SIGNED int32 in JavaScript and we don't want to risk surprises
        return new Uint8Array([
            Math.floor(this.data / 2 ** 24) & 0xff,
            Math.floor(this.data / 2 ** 16) & 0xff,
            Math.floor(this.data / 2 ** 8) & 0xff,
            Math.floor(this.data / 2 ** 0) & 0xff,
        ]);
    }
    toBytesLittleEndian() {
        // Use division instead of shifting since bitwise operators are defined
        // on SIGNED int32 in JavaScript and we don't want to risk surprises
        return new Uint8Array([
            Math.floor(this.data / 2 ** 0) & 0xff,
            Math.floor(this.data / 2 ** 8) & 0xff,
            Math.floor(this.data / 2 ** 16) & 0xff,
            Math.floor(this.data / 2 ** 24) & 0xff,
        ]);
    }
    toNumber() {
        return this.data;
    }
    toString() {
        return this.data.toString();
    }
}
exports.Uint32 = Uint32;
class Int53 {
    constructor(input) {
        if (Number.isNaN(input)) {
            throw new Error("Input is not a number");
        }
        if (!Number.isInteger(input)) {
            throw new Error("Input is not an integer");
        }
        if (input < Number.MIN_SAFE_INTEGER || input > Number.MAX_SAFE_INTEGER) {
            throw new Error("Input not in int53 range: " + input.toString());
        }
        this.data = input;
    }
    static fromString(str) {
        if (!str.match(/^-?[0-9]+$/)) {
            throw new Error("Invalid string format");
        }
        return new Int53(Number.parseInt(str, 10));
    }
    toNumber() {
        return this.data;
    }
    toString() {
        return this.data.toString();
    }
}
exports.Int53 = Int53;
class Uint53 {
    constructor(input) {
        const signed = new Int53(input);
        if (signed.toNumber() < 0) {
            throw new Error("Input is negative");
        }
        this.data = signed;
    }
    static fromString(str) {
        const signed = Int53.fromString(str);
        return new Uint53(signed.toNumber());
    }
    toNumber() {
        return this.data.toNumber();
    }
    toString() {
        return this.data.toString();
    }
}
exports.Uint53 = Uint53;
class Uint64 {
    constructor(data) {
        if (data.isNeg()) {
            throw new Error("Input is negative");
        }
        if (data.gt(uint64MaxValue)) {
            throw new Error("Input exceeds uint64 range");
        }
        this.data = data;
    }
    /** @deprecated use Uint64.fromBytes */
    static fromBytesBigEndian(bytes) {
        return Uint64.fromBytes(bytes);
    }
    /**
     * Creates a Uint64 from a fixed length byte array.
     *
     * @param bytes a list of exactly 8 bytes
     * @param endianess defaults to big endian
     */
    static fromBytes(bytes, endianess = "be") {
        if (bytes.length !== 8) {
            throw new Error("Invalid input length. Expected 8 bytes.");
        }
        for (let i = 0; i < bytes.length; ++i) {
            if (!Number.isInteger(bytes[i]) || bytes[i] > 255 || bytes[i] < 0) {
                throw new Error("Invalid value in byte. Found: " + bytes[i]);
            }
        }
        const beBytes = endianess === "be" ? Array.from(bytes) : Array.from(bytes).reverse();
        return new Uint64(new bn_js_1.default(beBytes));
    }
    static fromString(str) {
        if (!str.match(/^[0-9]+$/)) {
            throw new Error("Invalid string format");
        }
        return new Uint64(new bn_js_1.default(str, 10, "be"));
    }
    static fromNumber(input) {
        if (Number.isNaN(input)) {
            throw new Error("Input is not a number");
        }
        if (!Number.isInteger(input)) {
            throw new Error("Input is not an integer");
        }
        let bigint;
        try {
            bigint = new bn_js_1.default(input);
        }
        catch (_a) {
            throw new Error("Input is not a safe integer");
        }
        return new Uint64(bigint);
    }
    toBytesBigEndian() {
        return Uint8Array.from(this.data.toArray("be", 8));
    }
    toBytesLittleEndian() {
        return Uint8Array.from(this.data.toArray("le", 8));
    }
    toString() {
        return this.data.toString(10);
    }
    toNumber() {
        return this.data.toNumber();
    }
}
exports.Uint64 = Uint64;
// Assign classes to unused variables in order to verify static interface conformance at compile time.
// Workaround for https://github.com/microsoft/TypeScript/issues/33892
const _int53Class = Int53;
const _uint53Class = Uint53;
const _uint32Class = Uint32;
const _uint64Class = Uint64;
//# sourceMappingURL=integers.js.map