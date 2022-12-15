import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { MsgData } from "cosmjs-types/cosmos/base/abci/v1beta1/abci";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { Account, AccountParser } from "./accounts";
import { AuthExtension, BankExtension, StakingExtension, TxExtension } from "./modules";
import { QueryClient } from "./queryclient";
import { SearchTxFilter, SearchTxQuery } from "./search";
export declare class TimeoutError extends Error {
    readonly txId: string;
    constructor(message: string, txId: string);
}
export interface BlockHeader {
    readonly version: {
        readonly block: string;
        readonly app: string;
    };
    readonly height: number;
    readonly chainId: string;
    /** An RFC 3339 time string like e.g. '2020-02-15T10:39:10.4696305Z' */
    readonly time: string;
}
export interface Block {
    /** The ID is a hash of the block header (uppercase hex) */
    readonly id: string;
    readonly header: BlockHeader;
    /** Array of raw transactions */
    readonly txs: readonly Uint8Array[];
}
/** A transaction that is indexed as part of the transaction history */
export interface IndexedTx {
    readonly height: number;
    /** Transaction hash (might be used as transaction ID). Guaranteed to be non-empty upper-case hex */
    readonly hash: string;
    /** Transaction execution error code. 0 on success. */
    readonly code: number;
    readonly rawLog: string;
    /**
     * Raw transaction bytes stored in Tendermint.
     *
     * If you hash this, you get the transaction hash (= transaction ID):
     *
     * ```js
     * import { sha256 } from "@cosmjs/crypto";
     * import { toHex } from "@cosmjs/encoding";
     *
     * const transactionId = toHex(sha256(indexTx.tx)).toUpperCase();
     * ```
     *
     * Use `decodeTxRaw` from @cosmjs/proto-signing to decode this.
     */
    readonly tx: Uint8Array;
    readonly gasUsed: number;
    readonly gasWanted: number;
}
export interface SequenceResponse {
    readonly accountNumber: number;
    readonly sequence: number;
}
/**
 * The response after successfully broadcasting a transaction.
 * Success or failure refer to the execution result.
 */
export interface DeliverTxResponse {
    readonly height: number;
    /** Error code. The transaction suceeded iff code is 0. */
    readonly code: number;
    readonly transactionHash: string;
    readonly rawLog?: string;
    readonly data?: readonly MsgData[];
    readonly gasUsed: number;
    readonly gasWanted: number;
}
export declare function isDeliverTxFailure(result: DeliverTxResponse): boolean;
export declare function isDeliverTxSuccess(result: DeliverTxResponse): boolean;
/**
 * Ensures the given result is a success. Throws a detailed error message otherwise.
 */
export declare function assertIsDeliverTxSuccess(result: DeliverTxResponse): void;
/**
 * Ensures the given result is a failure. Throws a detailed error message otherwise.
 */
export declare function assertIsDeliverTxFailure(result: DeliverTxResponse): void;
/** Use for testing only */
export interface PrivateStargateClient {
    readonly tmClient: Tendermint34Client | undefined;
}
export interface StargateClientOptions {
    readonly accountParser?: AccountParser;
}
export declare class StargateClient {
    private readonly tmClient;
    private readonly queryClient;
    private chainId;
    private readonly accountParser;
    static connect(endpoint: string | HttpEndpoint, options?: StargateClientOptions): Promise<StargateClient>;
    protected constructor(tmClient: Tendermint34Client | undefined, options: StargateClientOptions);
    protected getTmClient(): Tendermint34Client | undefined;
    protected forceGetTmClient(): Tendermint34Client;
    protected getQueryClient(): (QueryClient & AuthExtension & BankExtension & StakingExtension & TxExtension) | undefined;
    protected forceGetQueryClient(): QueryClient & AuthExtension & BankExtension & StakingExtension & TxExtension;
    getChainId(): Promise<string>;
    getHeight(): Promise<number>;
    getAccount(searchAddress: string): Promise<Account | null>;
    getSequence(address: string): Promise<SequenceResponse>;
    getBlock(height?: number): Promise<Block>;
    getBalance(address: string, searchDenom: string): Promise<Coin>;
    /**
     * Queries all balances for all denoms that belong to this address.
     *
     * Uses the grpc queries (which iterates over the store internally), and we cannot get
     * proofs from such a method.
     */
    getAllBalances(address: string): Promise<readonly Coin[]>;
    getBalanceStaked(address: string): Promise<Coin | null>;
    getDelegation(delegatorAddress: string, validatorAddress: string): Promise<Coin | null>;
    getTx(id: string): Promise<IndexedTx | null>;
    searchTx(query: SearchTxQuery, filter?: SearchTxFilter): Promise<readonly IndexedTx[]>;
    disconnect(): void;
    /**
     * Broadcasts a signed transaction to the network and monitors its inclusion in a block.
     *
     * If broadcasting is rejected by the node for some reason (e.g. because of a CheckTx failure),
     * an error is thrown.
     *
     * If the transaction is not included in a block before the provided timeout, this errors with a `TimeoutError`.
     *
     * If the transaction is included in a block, a `DeliverTxResponse` is returned. The caller then
     * usually needs to check for execution success or failure.
     */
    broadcastTx(tx: Uint8Array, timeoutMs?: number, pollIntervalMs?: number): Promise<DeliverTxResponse>;
    private txsQuery;
}
