"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const sha_1 = require("./sha");
const sha_json_1 = __importDefault(require("./testdata/sha.json"));
describe("Sha256", () => {
    it("exists", () => {
        expect(sha_1.Sha256).toBeTruthy();
    });
    it("works for empty input", () => {
        {
            const hash = new sha_1.Sha256(new Uint8Array([])).digest();
            expect((0, encoding_1.toHex)(hash)).toEqual("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        }
        {
            const hash = new sha_1.Sha256().digest();
            expect((0, encoding_1.toHex)(hash)).toEqual("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
        }
    });
    it("works for all the Botan test vectors", () => {
        // https://github.com/randombit/botan/blob/2.6.0/src/tests/data/hash/sha2_32.vec#L13
        for (const { in: input, out: output } of sha_json_1.default.sha256) {
            expect(new sha_1.Sha256((0, encoding_1.fromHex)(input)).digest()).toEqual((0, encoding_1.fromHex)(output));
        }
    });
    it("exposes a convenience function", () => {
        const { in: input, out: output } = sha_json_1.default.sha256[0];
        expect((0, sha_1.sha256)((0, encoding_1.fromHex)(input))).toEqual((0, encoding_1.fromHex)(output));
    });
});
//# sourceMappingURL=sha.spec.js.map