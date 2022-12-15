"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ascii_1 = require("./ascii");
describe("ascii", () => {
    it("encodes to ascii", () => {
        expect((0, ascii_1.toAscii)("")).toEqual(new Uint8Array([]));
        expect((0, ascii_1.toAscii)("abc")).toEqual(new Uint8Array([0x61, 0x62, 0x63]));
        expect((0, ascii_1.toAscii)(" ?=-n|~+-*/\\")).toEqual(new Uint8Array([0x20, 0x3f, 0x3d, 0x2d, 0x6e, 0x7c, 0x7e, 0x2b, 0x2d, 0x2a, 0x2f, 0x5c]));
        expect(() => (0, ascii_1.toAscii)("ö")).toThrow();
        expect(() => (0, ascii_1.toAscii)("ß")).toThrow();
    });
    it("decodes from ascii", () => {
        expect((0, ascii_1.fromAscii)(new Uint8Array([]))).toEqual("");
        expect((0, ascii_1.fromAscii)(new Uint8Array([0x61, 0x62, 0x63]))).toEqual("abc");
        expect((0, ascii_1.fromAscii)(new Uint8Array([0x20, 0x3f, 0x3d, 0x2d, 0x6e, 0x7c, 0x7e, 0x2b, 0x2d, 0x2a, 0x2f, 0x5c]))).toEqual(" ?=-n|~+-*/\\");
        expect(() => (0, ascii_1.fromAscii)(new Uint8Array([0x00]))).toThrow();
        expect(() => (0, ascii_1.fromAscii)(new Uint8Array([0x7f]))).toThrow();
        expect(() => (0, ascii_1.fromAscii)(new Uint8Array([0xff]))).toThrow();
    });
});
//# sourceMappingURL=ascii.spec.js.map