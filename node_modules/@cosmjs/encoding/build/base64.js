"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromBase64 = exports.toBase64 = void 0;
const base64js = __importStar(require("base64-js"));
function toBase64(data) {
    return base64js.fromByteArray(data);
}
exports.toBase64 = toBase64;
function fromBase64(base64String) {
    if (!base64String.match(/^[a-zA-Z0-9+/]*={0,2}$/)) {
        throw new Error("Invalid base64 string format");
    }
    return base64js.toByteArray(base64String);
}
exports.fromBase64 = fromBase64;
//# sourceMappingURL=base64.js.map