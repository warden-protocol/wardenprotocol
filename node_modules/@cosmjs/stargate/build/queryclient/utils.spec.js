"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const utils_1 = require("./utils");
describe("utils", () => {
    describe("decodeCosmosSdkDecFromProto", () => {
        it("works for string inputs", () => {
            expect((0, utils_1.decodeCosmosSdkDecFromProto)("0").toString()).toEqual("0");
            expect((0, utils_1.decodeCosmosSdkDecFromProto)("1").toString()).toEqual("0.000000000000000001");
            expect((0, utils_1.decodeCosmosSdkDecFromProto)("3000000").toString()).toEqual("0.000000000003");
            expect((0, utils_1.decodeCosmosSdkDecFromProto)("123456789123456789").toString()).toEqual("0.123456789123456789");
            expect((0, utils_1.decodeCosmosSdkDecFromProto)("1234567891234567890").toString()).toEqual("1.23456789123456789");
        });
        it("works for byte inputs", () => {
            expect((0, utils_1.decodeCosmosSdkDecFromProto)((0, encoding_1.fromHex)("313330303033343138373830313631333938")).toString()).toEqual("0.130003418780161398");
        });
    });
});
//# sourceMappingURL=utils.spec.js.map