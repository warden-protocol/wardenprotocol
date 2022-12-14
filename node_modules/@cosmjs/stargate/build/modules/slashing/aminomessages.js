"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlashingAminoConverters = exports.isAminoMsgUnjail = void 0;
function isAminoMsgUnjail(msg) {
    return msg.type === "cosmos-sdk/MsgUnjail";
}
exports.isAminoMsgUnjail = isAminoMsgUnjail;
function createSlashingAminoConverters() {
    throw new Error("Not implemented");
}
exports.createSlashingAminoConverters = createSlashingAminoConverters;
//# sourceMappingURL=aminomessages.js.map