import { StdFee } from "@cosmjs/amino";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { HttpEndpoint, Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import { AminoTypes } from "./aminotypes";
import { GasPrice } from "./fee";
import { DeliverTxResponse, StargateClient, StargateClientOptions } from "./stargateclient";
export declare const defaultRegistryTypes: ReadonlyArray<[string, GeneratedType]>;
/**
 * Signing information for a single signer that is not included in the transaction.
 *
 * @see https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/x/auth/signing/sign_mode_handler.go#L23-L37
 */
export interface SignerData {
    readonly accountNumber: number;
    readonly sequence: number;
    readonly chainId: string;
}
/** Use for testing only */
export interface PrivateSigningStargateClient {
    readonly registry: Registry;
}
export interface SigningStargateClientOptions extends StargateClientOptions {
    readonly registry?: Registry;
    readonly aminoTypes?: AminoTypes;
    readonly prefix?: string;
    readonly broadcastTimeoutMs?: number;
    readonly broadcastPollIntervalMs?: number;
    readonly gasPrice?: GasPrice;
}
export declare class SigningStargateClient extends StargateClient {
    readonly registry: Registry;
    readonly broadcastTimeoutMs: number | undefined;
    readonly broadcastPollIntervalMs: number | undefined;
    private readonly signer;
    private readonly aminoTypes;
    private readonly gasPrice;
    static connectWithSigner(endpoint: string | HttpEndpoint, signer: OfflineSigner, options?: SigningStargateClientOptions): Promise<SigningStargateClient>;
    /**
     * Creates a client in offline mode.
     *
     * This should only be used in niche cases where you know exactly what you're doing,
     * e.g. when building an offline signing application.
     *
     * When you try to use online functionality with such a signer, an
     * exception will be raised.
     */
    static offline(signer: OfflineSigner, options?: SigningStargateClientOptions): Promise<SigningStargateClient>;
    protected constructor(tmClient: Tendermint34Client | undefined, signer: OfflineSigner, options: SigningStargateClientOptions);
    simulate(signerAddress: string, messages: readonly EncodeObject[], memo: string | undefined): Promise<number>;
    sendTokens(senderAddress: string, recipientAddress: string, amount: readonly Coin[], fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse>;
    delegateTokens(delegatorAddress: string, validatorAddress: string, amount: Coin, fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse>;
    undelegateTokens(delegatorAddress: string, validatorAddress: string, amount: Coin, fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse>;
    withdrawRewards(delegatorAddress: string, validatorAddress: string, fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse>;
    sendIbcTokens(senderAddress: string, recipientAddress: string, transferAmount: Coin, sourcePort: string, sourceChannel: string, timeoutHeight: Height | undefined, 
    /** timeout in seconds */
    timeoutTimestamp: number | undefined, fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse>;
    signAndBroadcast(signerAddress: string, messages: readonly EncodeObject[], fee: StdFee | "auto" | number, memo?: string): Promise<DeliverTxResponse>;
    /**
     * Gets account number and sequence from the API, creates a sign doc,
     * creates a single signature and assembles the signed transaction.
     *
     * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
     *
     * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
     * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
     * (See the SigningStargateClient.offline constructor).
     */
    sign(signerAddress: string, messages: readonly EncodeObject[], fee: StdFee, memo: string, explicitSignerData?: SignerData): Promise<TxRaw>;
    private signAmino;
    private signDirect;
}
