import { JsonRpcRequest } from "@cosmjs/json-rpc";
import * as requests from "../requests";
export declare class Params {
    static encodeAbciInfo(req: requests.AbciInfoRequest): JsonRpcRequest;
    static encodeAbciQuery(req: requests.AbciQueryRequest): JsonRpcRequest;
    static encodeBlock(req: requests.BlockRequest): JsonRpcRequest;
    static encodeBlockchain(req: requests.BlockchainRequest): JsonRpcRequest;
    static encodeBlockResults(req: requests.BlockResultsRequest): JsonRpcRequest;
    static encodeBlockSearch(req: requests.BlockSearchRequest): JsonRpcRequest;
    static encodeBroadcastTx(req: requests.BroadcastTxRequest): JsonRpcRequest;
    static encodeCommit(req: requests.CommitRequest): JsonRpcRequest;
    static encodeGenesis(req: requests.GenesisRequest): JsonRpcRequest;
    static encodeHealth(req: requests.HealthRequest): JsonRpcRequest;
    static encodeNumUnconfirmedTxs(req: requests.NumUnconfirmedTxsRequest): JsonRpcRequest;
    static encodeStatus(req: requests.StatusRequest): JsonRpcRequest;
    static encodeSubscribe(req: requests.SubscribeRequest): JsonRpcRequest;
    static encodeTx(req: requests.TxRequest): JsonRpcRequest;
    static encodeTxSearch(req: requests.TxSearchRequest): JsonRpcRequest;
    static encodeValidators(req: requests.ValidatorsRequest): JsonRpcRequest;
}
