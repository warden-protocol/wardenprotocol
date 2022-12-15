"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvidenceAminoConverters = exports.isAminoMsgSubmitEvidence = void 0;
function isAminoMsgSubmitEvidence(msg) {
    return msg.type === "cosmos-sdk/MsgSubmitEvidence";
}
exports.isAminoMsgSubmitEvidence = isAminoMsgSubmitEvidence;
function createEvidenceAminoConverters() {
    throw new Error("Not implemented");
}
exports.createEvidenceAminoConverters = createEvidenceAminoConverters;
//# sourceMappingURL=aminomessages.js.map