"use strict";
/* eslint-disable @typescript-eslint/naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = exports.SubscriptionEventType = exports.Method = void 0;
/**
 * RPC methods as documented in https://docs.tendermint.com/master/rpc/
 *
 * Enum raw value must match the spelling in the "shell" example call (snake_case)
 */
var Method;
(function (Method) {
    Method["AbciInfo"] = "abci_info";
    Method["AbciQuery"] = "abci_query";
    Method["Block"] = "block";
    /** Get block headers for minHeight <= height <= maxHeight. */
    Method["Blockchain"] = "blockchain";
    Method["BlockResults"] = "block_results";
    Method["BlockSearch"] = "block_search";
    Method["BroadcastTxAsync"] = "broadcast_tx_async";
    Method["BroadcastTxSync"] = "broadcast_tx_sync";
    Method["BroadcastTxCommit"] = "broadcast_tx_commit";
    Method["Commit"] = "commit";
    Method["Genesis"] = "genesis";
    Method["Health"] = "health";
    Method["NumUnconfirmedTxs"] = "num_unconfirmed_txs";
    Method["Status"] = "status";
    Method["Subscribe"] = "subscribe";
    Method["Tx"] = "tx";
    Method["TxSearch"] = "tx_search";
    Method["Validators"] = "validators";
    Method["Unsubscribe"] = "unsubscribe";
})(Method = exports.Method || (exports.Method = {}));
/**
 * Raw values must match the tendermint event name
 *
 * @see https://godoc.org/github.com/tendermint/tendermint/types#pkg-constants
 */
var SubscriptionEventType;
(function (SubscriptionEventType) {
    SubscriptionEventType["NewBlock"] = "NewBlock";
    SubscriptionEventType["NewBlockHeader"] = "NewBlockHeader";
    SubscriptionEventType["Tx"] = "Tx";
})(SubscriptionEventType = exports.SubscriptionEventType || (exports.SubscriptionEventType = {}));
function buildQuery(components) {
    const tags = components.tags ? components.tags : [];
    const tagComponents = tags.map((tag) => `${tag.key}='${tag.value}'`);
    const rawComponents = components.raw ? [components.raw] : [];
    return [...tagComponents, ...rawComponents].join(" AND ");
}
exports.buildQuery = buildQuery;
//# sourceMappingURL=requests.js.map