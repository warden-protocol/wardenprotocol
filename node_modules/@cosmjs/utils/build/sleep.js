"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = void 0;
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
//# sourceMappingURL=sleep.js.map