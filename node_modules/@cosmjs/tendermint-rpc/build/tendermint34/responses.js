"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteType = exports.broadcastTxCommitSuccess = exports.broadcastTxSyncSuccess = void 0;
/**
 * Returns true iff transaction made it successfully into the transaction pool
 */
function broadcastTxSyncSuccess(res) {
    // code must be 0 on success
    return res.code === 0;
}
exports.broadcastTxSyncSuccess = broadcastTxSyncSuccess;
/**
 * Returns true iff transaction made it successfully into a block
 * (i.e. success in `check_tx` and `deliver_tx` field)
 */
function broadcastTxCommitSuccess(response) {
    // code must be 0 on success
    // deliverTx may be present but empty on failure
    return response.checkTx.code === 0 && !!response.deliverTx && response.deliverTx.code === 0;
}
exports.broadcastTxCommitSuccess = broadcastTxCommitSuccess;
/**
 * raw values from https://github.com/tendermint/tendermint/blob/dfa9a9a30a666132425b29454e90a472aa579a48/types/vote.go#L44
 */
var VoteType;
(function (VoteType) {
    VoteType[VoteType["PreVote"] = 1] = "PreVote";
    VoteType[VoteType["PreCommit"] = 2] = "PreCommit";
})(VoteType = exports.VoteType || (exports.VoteType = {}));
//# sourceMappingURL=responses.js.map