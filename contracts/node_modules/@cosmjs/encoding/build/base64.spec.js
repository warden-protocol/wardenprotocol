"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64_1 = require("./base64");
describe("base64", () => {
    it("encodes to base64", () => {
        expect((0, base64_1.toBase64)(new Uint8Array([]))).toEqual("");
        expect((0, base64_1.toBase64)(new Uint8Array([0x00]))).toEqual("AA==");
        expect((0, base64_1.toBase64)(new Uint8Array([0x00, 0x00]))).toEqual("AAA=");
        expect((0, base64_1.toBase64)(new Uint8Array([0x00, 0x00, 0x00]))).toEqual("AAAA");
        expect((0, base64_1.toBase64)(new Uint8Array([0x00, 0x00, 0x00, 0x00]))).toEqual("AAAAAA==");
        expect((0, base64_1.toBase64)(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00]))).toEqual("AAAAAAA=");
        expect((0, base64_1.toBase64)(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]))).toEqual("AAAAAAAA");
        expect((0, base64_1.toBase64)(new Uint8Array([0x61]))).toEqual("YQ==");
        expect((0, base64_1.toBase64)(new Uint8Array([0x62]))).toEqual("Yg==");
        expect((0, base64_1.toBase64)(new Uint8Array([0x63]))).toEqual("Yw==");
        expect((0, base64_1.toBase64)(new Uint8Array([0x61, 0x62, 0x63]))).toEqual("YWJj");
    });
    it("decodes from base64", () => {
        expect((0, base64_1.fromBase64)("")).toEqual(new Uint8Array([]));
        expect((0, base64_1.fromBase64)("AA==")).toEqual(new Uint8Array([0x00]));
        expect((0, base64_1.fromBase64)("AAA=")).toEqual(new Uint8Array([0x00, 0x00]));
        expect((0, base64_1.fromBase64)("AAAA")).toEqual(new Uint8Array([0x00, 0x00, 0x00]));
        expect((0, base64_1.fromBase64)("AAAAAA==")).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00]));
        expect((0, base64_1.fromBase64)("AAAAAAA=")).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00]));
        expect((0, base64_1.fromBase64)("AAAAAAAA")).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
        expect((0, base64_1.fromBase64)("YQ==")).toEqual(new Uint8Array([0x61]));
        expect((0, base64_1.fromBase64)("Yg==")).toEqual(new Uint8Array([0x62]));
        expect((0, base64_1.fromBase64)("Yw==")).toEqual(new Uint8Array([0x63]));
        expect((0, base64_1.fromBase64)("YWJj")).toEqual(new Uint8Array([0x61, 0x62, 0x63]));
        // invalid length
        expect(() => (0, base64_1.fromBase64)("a")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aa")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aaa")).toThrow();
        // proper length including invalid character
        expect(() => (0, base64_1.fromBase64)("aaa!")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aaa*")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aaaä")).toThrow();
        // proper length plus invalid character
        expect(() => (0, base64_1.fromBase64)("aaaa!")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aaaa*")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aaaaä")).toThrow();
        // extra spaces
        expect(() => (0, base64_1.fromBase64)("aaaa ")).toThrow();
        expect(() => (0, base64_1.fromBase64)(" aaaa")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aa aa")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aaaa\n")).toThrow();
        expect(() => (0, base64_1.fromBase64)("\naaaa")).toThrow();
        expect(() => (0, base64_1.fromBase64)("aa\naa")).toThrow();
        // position of =
        expect(() => (0, base64_1.fromBase64)("=aaa")).toThrow();
        expect(() => (0, base64_1.fromBase64)("==aa")).toThrow();
        // concatenated base64 strings should not be supported
        // see https://github.com/beatgammit/base64-js/issues/42
        expect(() => (0, base64_1.fromBase64)("AAA=AAA=")).toThrow();
        // wrong number of =
        expect(() => (0, base64_1.fromBase64)("a===")).toThrow();
    });
});
//# sourceMappingURL=base64.spec.js.map