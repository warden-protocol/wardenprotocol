"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const keccak_1 = require("./keccak");
const keccak_json_1 = __importDefault(require("./testdata/keccak.json"));
describe("Keccak256", () => {
    it("exists", () => {
        expect(keccak_1.Keccak256).toBeTruthy();
    });
    it("works for empty input", () => {
        {
            const hash = new keccak_1.Keccak256(new Uint8Array([])).digest();
            expect((0, encoding_1.toHex)(hash)).toEqual("c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470");
        }
        {
            const hash = new keccak_1.Keccak256().digest();
            expect((0, encoding_1.toHex)(hash)).toEqual("c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470");
        }
    });
    it("works for all the Botan test vectors", () => {
        // https://github.com/randombit/botan/blob/2.8.0/src/tests/data/hash/keccak.vec#L806
        for (const { in: input, out: output } of keccak_json_1.default.keccak256) {
            expect(new keccak_1.Keccak256((0, encoding_1.fromHex)(input)).digest()).toEqual((0, encoding_1.fromHex)(output));
        }
    });
    it("exposes a convenience function", () => {
        const { in: input, out: output } = keccak_json_1.default.keccak256[0];
        expect((0, keccak_1.keccak256)((0, encoding_1.fromHex)(input))).toEqual((0, encoding_1.fromHex)(output));
    });
});
//# sourceMappingURL=keccak.spec.js.map