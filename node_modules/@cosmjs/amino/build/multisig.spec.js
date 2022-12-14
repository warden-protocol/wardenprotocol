"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multisig_1 = require("./multisig");
const testutils_spec_1 = require("./testutils.spec");
describe("multisig", () => {
    describe("compareArrays", () => {
        it("return 0 for equal arrays", () => {
            expect((0, multisig_1.compareArrays)(new Uint8Array([]), new Uint8Array([]))).toEqual(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([1]), new Uint8Array([1]))).toEqual(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([3, 2, 1]), new Uint8Array([3, 2, 1]))).toEqual(0);
        });
        it("return > 0 for left > right", () => {
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 5]), new Uint8Array([5, 5, 4]))).toBeGreaterThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 5]), new Uint8Array([5, 4, 5]))).toBeGreaterThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 5]), new Uint8Array([4, 5, 5]))).toBeGreaterThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 5]), new Uint8Array([5, 5]))).toBeGreaterThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 5]), new Uint8Array([5]))).toBeGreaterThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 5]), new Uint8Array([]))).toBeGreaterThan(0);
            // left or right precedence
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 4]), new Uint8Array([4, 5, 5]))).toBeGreaterThan(0);
            // magnitude is more important than length
            expect((0, multisig_1.compareArrays)(new Uint8Array([6]), new Uint8Array([5, 5]))).toBeGreaterThan(0);
        });
        it("return < 0 for left < right", () => {
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5, 4]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 4, 5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([4, 5, 5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([5]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
            expect((0, multisig_1.compareArrays)(new Uint8Array([]), new Uint8Array([5, 5, 5]))).toBeLessThan(0);
            // left or right precedence
            expect((0, multisig_1.compareArrays)(new Uint8Array([4, 5, 5]), new Uint8Array([5, 5, 4]))).toBeLessThan(0);
            // magnitude is more important than length
            expect((0, multisig_1.compareArrays)(new Uint8Array([5, 5]), new Uint8Array([6]))).toBeLessThan(0);
        });
        it("can be used with sort", () => {
            const values = [
                new Uint8Array([2]),
                new Uint8Array([1]),
                new Uint8Array([2, 5]),
                new Uint8Array([3]),
                new Uint8Array([]),
            ].sort(multisig_1.compareArrays);
            expect(values).toEqual([
                new Uint8Array([]),
                new Uint8Array([1]),
                new Uint8Array([2]),
                new Uint8Array([2, 5]),
                new Uint8Array([3]),
            ]);
        });
    });
    describe("MultisigThresholdPubkey", () => {
        it("works with sorting", () => {
            expect((0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test1, testutils_spec_1.test2, testutils_spec_1.test3], 2)).toEqual(testutils_spec_1.testgroup1);
            expect((0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test1, testutils_spec_1.test2, testutils_spec_1.test3], 1)).toEqual(testutils_spec_1.testgroup2);
            expect((0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test3, testutils_spec_1.test1], 2)).toEqual(testutils_spec_1.testgroup3);
            expect((0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test1, testutils_spec_1.test2, testutils_spec_1.test3], 2, false)).toEqual(testutils_spec_1.testgroup1);
            expect((0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test1, testutils_spec_1.test2, testutils_spec_1.test3], 1, false)).toEqual(testutils_spec_1.testgroup2);
            expect((0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test3, testutils_spec_1.test1], 2, false)).toEqual(testutils_spec_1.testgroup3);
        });
        it("works with nosort", () => {
            expect((0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test3, testutils_spec_1.test1], 2, true)).toEqual(testutils_spec_1.testgroup4);
        });
        it("throws for threshold larger than number of keys", () => {
            expect(() => (0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test1, testutils_spec_1.test2, testutils_spec_1.test3], 4)).toThrowError(/threshold k = 4 exceeds number of keys n = 3/i);
            expect(() => (0, multisig_1.createMultisigThresholdPubkey)([testutils_spec_1.test1, testutils_spec_1.test2, testutils_spec_1.test3], 75)).toThrowError(/threshold k = 75 exceeds number of keys n = 3/i);
        });
    });
});
//# sourceMappingURL=multisig.spec.js.map