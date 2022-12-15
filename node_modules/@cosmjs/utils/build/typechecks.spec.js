"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typechecks_1 = require("./typechecks");
describe("typechecks", () => {
    describe("isNonNullObject", () => {
        it("returns true for objects", () => {
            expect((0, typechecks_1.isNonNullObject)({})).toEqual(true);
            expect((0, typechecks_1.isNonNullObject)({ foo: 123 })).toEqual(true);
            expect((0, typechecks_1.isNonNullObject)(new Uint8Array([]))).toEqual(true);
        });
        it("returns true for arrays", () => {
            // > object is a type that represents the non-primitive type, i.e.
            // > anything that is not number, string, boolean, symbol, null, or undefined.
            // https://www.typescriptlang.org/docs/handbook/basic-types.html#object
            expect((0, typechecks_1.isNonNullObject)([])).toEqual(true);
        });
        it("returns false for null", () => {
            expect((0, typechecks_1.isNonNullObject)(null)).toEqual(false);
        });
        it("returns false for other kind of data", () => {
            expect((0, typechecks_1.isNonNullObject)(undefined)).toEqual(false);
            expect((0, typechecks_1.isNonNullObject)("abc")).toEqual(false);
            expect((0, typechecks_1.isNonNullObject)(123)).toEqual(false);
            expect((0, typechecks_1.isNonNullObject)(true)).toEqual(false);
        });
    });
    describe("isUint8Array", () => {
        it("returns true for Uint8Arrays", () => {
            expect((0, typechecks_1.isUint8Array)(new Uint8Array())).toEqual(true);
            expect((0, typechecks_1.isUint8Array)(new Uint8Array([1, 2, 3]))).toEqual(true);
        });
        it("returns false for Buffer", () => {
            // One could start a big debate about whether or not a Buffer is a Uint8Array, which
            // required a definition of "is a" in a languages that has no proper object oriented
            // programming support.
            //
            // In all our software we use Uint8Array for storing binary data and copy Buffers into
            // new Uint8Array to make deep equality checks work and to ensure our code works the same
            // way in browsers and Node.js. So our expectation is: _a Buffer is not an Uint8Array_.
            expect((0, typechecks_1.isUint8Array)(Buffer.from(""))).toEqual(false);
        });
        it("returns false for other kind of data", () => {
            expect((0, typechecks_1.isUint8Array)(undefined)).toEqual(false);
            expect((0, typechecks_1.isUint8Array)("abc")).toEqual(false);
            expect((0, typechecks_1.isUint8Array)(123)).toEqual(false);
            expect((0, typechecks_1.isUint8Array)(true)).toEqual(false);
            expect((0, typechecks_1.isUint8Array)([])).toEqual(false);
            expect((0, typechecks_1.isUint8Array)(new Int8Array())).toEqual(false);
            expect((0, typechecks_1.isUint8Array)(new Uint16Array())).toEqual(false);
        });
    });
});
//# sourceMappingURL=typechecks.spec.js.map