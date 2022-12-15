"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrysisAminoConverters = exports.isAminoMsgVerifyInvariant = void 0;
function isAminoMsgVerifyInvariant(msg) {
    return msg.type === "cosmos-sdk/MsgVerifyInvariant";
}
exports.isAminoMsgVerifyInvariant = isAminoMsgVerifyInvariant;
function createCrysisAminoConverters() {
    throw new Error("Not implemented");
}
exports.createCrysisAminoConverters = createCrysisAminoConverters;
//# sourceMappingURL=aminomessages.js.map