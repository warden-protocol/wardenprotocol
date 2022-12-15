"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_1 = require("./sleep");
describe("sleep", () => {
    it("resolves after at least x milliseconds", async () => {
        for (const x of [10, 30, 120, 280]) {
            const start = Date.now();
            await (0, sleep_1.sleep)(x);
            const sleepingTime = Date.now() - start;
            // Add 1 ms safety margin due to rounding issues. The elapsed time between
            // timestamps 1000 and 1010 can be somethting between 10 and 11 ms.
            expect(sleepingTime + 1).toBeGreaterThanOrEqual(x);
        }
    });
    it("resolves within a reasonable amount of time >= x milliseconds", async () => {
        // Don't be too strict as jest will run many tests at the same time and test systems can be slow sometimes.
        const tolerance = 30; // ms
        for (const x of [10, 30, 120, 280]) {
            const start = Date.now();
            await (0, sleep_1.sleep)(x);
            const sleepingTime = Date.now() - start;
            expect(sleepingTime).toBeLessThanOrEqual(x + tolerance);
        }
    });
});
//# sourceMappingURL=sleep.spec.js.map