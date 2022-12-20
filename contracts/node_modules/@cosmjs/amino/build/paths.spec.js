"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("@cosmjs/crypto");
const paths_1 = require("./paths");
describe("paths", () => {
    describe("makeCosmoshubPath", () => {
        it("works", () => {
            // m/44'/118'/0'/0/0
            expect((0, paths_1.makeCosmoshubPath)(0)).toEqual([
                crypto_1.Slip10RawIndex.hardened(44),
                crypto_1.Slip10RawIndex.hardened(118),
                crypto_1.Slip10RawIndex.hardened(0),
                crypto_1.Slip10RawIndex.normal(0),
                crypto_1.Slip10RawIndex.normal(0),
            ]);
            // m/44'/118'/0'/0/123
            expect((0, paths_1.makeCosmoshubPath)(123)).toEqual([
                crypto_1.Slip10RawIndex.hardened(44),
                crypto_1.Slip10RawIndex.hardened(118),
                crypto_1.Slip10RawIndex.hardened(0),
                crypto_1.Slip10RawIndex.normal(0),
                crypto_1.Slip10RawIndex.normal(123),
            ]);
        });
    });
});
//# sourceMappingURL=paths.spec.js.map