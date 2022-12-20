"use strict";
// Types in this file are exported outside of the @cosmjs/tendermint-rpc package,
// e.g. as part of a request or response
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockIdFlag = void 0;
var BlockIdFlag;
(function (BlockIdFlag) {
    BlockIdFlag[BlockIdFlag["Unknown"] = 0] = "Unknown";
    BlockIdFlag[BlockIdFlag["Absent"] = 1] = "Absent";
    BlockIdFlag[BlockIdFlag["Commit"] = 2] = "Commit";
    BlockIdFlag[BlockIdFlag["Nil"] = 3] = "Nil";
    BlockIdFlag[BlockIdFlag["Unrecognized"] = -1] = "Unrecognized";
})(BlockIdFlag = exports.BlockIdFlag || (exports.BlockIdFlag = {}));
//# sourceMappingURL=types.js.map