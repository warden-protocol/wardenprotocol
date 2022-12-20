"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@cosmjs/utils");
const random_1 = require("./random");
describe("Random", () => {
    it("returns an Uint8Array", () => {
        const data = random_1.Random.getBytes(5);
        expect((0, utils_1.isUint8Array)(data)).toEqual(true);
    });
    it("creates random bytes", () => {
        {
            const bytes = random_1.Random.getBytes(0);
            expect(bytes.length).toEqual(0);
        }
        {
            const bytes = random_1.Random.getBytes(1);
            expect(bytes.length).toEqual(1);
        }
        {
            const bytes = random_1.Random.getBytes(32);
            expect(bytes.length).toEqual(32);
        }
        {
            const bytes = random_1.Random.getBytes(4096);
            expect(bytes.length).toEqual(4096);
        }
        {
            const bytes1 = random_1.Random.getBytes(32);
            const bytes2 = random_1.Random.getBytes(32);
            expect(bytes1).not.toEqual(bytes2);
        }
    });
});
//# sourceMappingURL=random.spec.js.map