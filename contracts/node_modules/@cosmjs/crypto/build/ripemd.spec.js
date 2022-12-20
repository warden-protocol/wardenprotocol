"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const ripemd_1 = require("./ripemd");
const ripemd_json_1 = __importDefault(require("./testdata/ripemd.json"));
describe("Ripemd160", () => {
    it("exists", () => {
        expect(ripemd_1.Ripemd160).toBeTruthy();
    });
    it("works for empty input", () => {
        {
            const hash = new ripemd_1.Ripemd160(new Uint8Array([])).digest();
            expect(hash).toEqual((0, encoding_1.fromHex)("9c1185a5c5e9fc54612808977ee8f548b2258d31"));
        }
        {
            const hash = new ripemd_1.Ripemd160().digest();
            expect(hash).toEqual((0, encoding_1.fromHex)("9c1185a5c5e9fc54612808977ee8f548b2258d31"));
        }
    });
    it("works for all the Botan test vectors", () => {
        // https://github.com/randombit/botan/blob/2.12.1/src/tests/data/hash/ripemd160.vec
        for (const { in: input, out: output } of ripemd_json_1.default.ripemd160) {
            expect(new ripemd_1.Ripemd160((0, encoding_1.fromHex)(input)).digest()).toEqual((0, encoding_1.fromHex)(output));
        }
    });
    it("exposes a convenience function", () => {
        const { in: input, out: output } = ripemd_json_1.default.ripemd160[0];
        expect((0, ripemd_1.ripemd160)((0, encoding_1.fromHex)(input))).toEqual((0, encoding_1.fromHex)(output));
    });
});
//# sourceMappingURL=ripemd.spec.js.map