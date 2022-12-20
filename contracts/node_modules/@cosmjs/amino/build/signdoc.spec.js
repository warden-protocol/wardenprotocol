"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const signdoc_1 = require("./signdoc");
function makeRandomAddress() {
    return (0, encoding_1.toBech32)("cosmos", crypto_1.Random.getBytes(20));
}
const testAddress = "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6";
const testValidatorAddress = "cosmosvaloper1yfkkk04ve8a0sugj4fe6q6zxuvmvza8r3arurr";
describe("encoding", () => {
    describe("sortedJsonStringify", () => {
        it("leaves non-objects unchanged", () => {
            expect((0, signdoc_1.sortedJsonStringify)(true)).toEqual(`true`);
            expect((0, signdoc_1.sortedJsonStringify)(false)).toEqual(`false`);
            expect((0, signdoc_1.sortedJsonStringify)("aabbccdd")).toEqual(`"aabbccdd"`);
            expect((0, signdoc_1.sortedJsonStringify)(75)).toEqual(`75`);
            expect((0, signdoc_1.sortedJsonStringify)(null)).toEqual(`null`);
            expect((0, signdoc_1.sortedJsonStringify)([5, 6, 7, 1])).toEqual(`[5,6,7,1]`);
            expect((0, signdoc_1.sortedJsonStringify)([5, ["a", "b"], true, null, 1])).toEqual(`[5,["a","b"],true,null,1]`);
        });
        it("sorts objects by key", () => {
            // already sorted
            expect((0, signdoc_1.sortedJsonStringify)({})).toEqual(`{}`);
            expect((0, signdoc_1.sortedJsonStringify)({ a: 3 })).toEqual(`{"a":3}`);
            expect((0, signdoc_1.sortedJsonStringify)({ a: 3, b: 2, c: 1 })).toEqual(`{"a":3,"b":2,"c":1}`);
            // not yet sorted
            expect((0, signdoc_1.sortedJsonStringify)({ b: 2, a: 3, c: 1 })).toEqual(`{"a":3,"b":2,"c":1}`);
            expect((0, signdoc_1.sortedJsonStringify)({ aaa: true, aa: true, a: true })).toEqual(`{"a":true,"aa":true,"aaa":true}`);
        });
        it("sorts nested objects", () => {
            // already sorted
            expect((0, signdoc_1.sortedJsonStringify)({ x: { y: { z: null } } })).toEqual(`{"x":{"y":{"z":null}}}`);
            // not yet sorted
            expect((0, signdoc_1.sortedJsonStringify)({ b: { z: true, x: true, y: true }, a: true, c: true })).toEqual(`{"a":true,"b":{"x":true,"y":true,"z":true},"c":true}`);
        });
        it("sorts objects in arrays", () => {
            // already sorted
            expect((0, signdoc_1.sortedJsonStringify)([1, 2, { x: { y: { z: null } } }, 4])).toEqual(`[1,2,{"x":{"y":{"z":null}}},4]`);
            // not yet sorted
            expect((0, signdoc_1.sortedJsonStringify)([1, 2, { b: { z: true, x: true, y: true }, a: true, c: true }, 4])).toEqual(`[1,2,{"a":true,"b":{"x":true,"y":true,"z":true},"c":true},4]`);
        });
    });
    describe("makeSignDoc", () => {
        it("works", () => {
            const chainId = "testspace-12";
            const msg1 = {
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    delegator_address: testAddress,
                    validator_address: testValidatorAddress,
                    amount: { amount: "1234", denom: "ustake" },
                },
            };
            const msg2 = {
                type: "cosmos-sdk/MsgSend",
                value: {
                    from_address: testAddress,
                    to_address: makeRandomAddress(),
                    amount: [{ amount: "1234567", denom: "ucosm" }],
                },
            };
            const fee = {
                amount: [{ amount: "2000", denom: "ucosm" }],
                gas: "180000", // 180k
            };
            const memo = "Use your power wisely";
            const accountNumber = 15;
            const sequence = 16;
            const signDoc = (0, signdoc_1.makeSignDoc)([msg1, msg2], fee, chainId, memo, accountNumber, sequence);
            expect(signDoc).toEqual({
                msgs: [msg1, msg2],
                fee: fee,
                chain_id: chainId,
                account_number: accountNumber.toString(),
                sequence: sequence.toString(),
                memo: memo,
            });
        });
        it("works with undefined memo", () => {
            const chainId = "testspace-12";
            const msg1 = {
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    delegator_address: testAddress,
                    validator_address: testValidatorAddress,
                    amount: { amount: "1234", denom: "ustake" },
                },
            };
            const msg2 = {
                type: "cosmos-sdk/MsgSend",
                value: {
                    from_address: testAddress,
                    to_address: makeRandomAddress(),
                    amount: [{ amount: "1234567", denom: "ucosm" }],
                },
            };
            const fee = {
                amount: [{ amount: "2000", denom: "ucosm" }],
                gas: "180000", // 180k
            };
            const accountNumber = 15;
            const sequence = 16;
            const signDoc = (0, signdoc_1.makeSignDoc)([msg1, msg2], fee, chainId, undefined, accountNumber, sequence);
            expect(signDoc).toEqual({
                msgs: [msg1, msg2],
                fee: fee,
                chain_id: chainId,
                account_number: accountNumber.toString(),
                sequence: sequence.toString(),
                memo: "",
            });
        });
    });
});
//# sourceMappingURL=signdoc.spec.js.map