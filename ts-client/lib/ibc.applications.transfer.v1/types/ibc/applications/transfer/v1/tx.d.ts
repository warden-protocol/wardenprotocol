import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { Height } from "../../../core/client/v1/client";
import { Params } from "./transfer";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/**
 * MsgTransfer defines a msg to transfer fungible tokens (i.e Coins) between
 * ICS20 enabled chains. See ICS Spec here:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 */
export interface MsgTransfer {
    /** the port on which the packet will be sent */
    sourcePort: string;
    /** the channel by which the packet will be sent */
    sourceChannel: string;
    /** the tokens to be transferred */
    token: Coin | undefined;
    /** the sender address */
    sender: string;
    /** the recipient address on the destination chain */
    receiver: string;
    /**
     * Timeout height relative to the current block height.
     * The timeout is disabled when set to 0.
     */
    timeoutHeight: Height | undefined;
    /**
     * Timeout timestamp in absolute nanoseconds since unix epoch.
     * The timeout is disabled when set to 0.
     */
    timeoutTimestamp: number;
    /** optional memo */
    memo: string;
}
/** MsgTransferResponse defines the Msg/Transfer response type. */
export interface MsgTransferResponse {
    /** sequence number of the transfer packet sent */
    sequence: number;
}
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the transfer parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}
export declare const MsgTransfer: {
    encode(message: MsgTransfer, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransfer;
    fromJSON(object: any): MsgTransfer;
    toJSON(message: MsgTransfer): unknown;
    create<I extends {
        sourcePort?: string;
        sourceChannel?: string;
        token?: {
            denom?: string;
            amount?: string;
        };
        sender?: string;
        receiver?: string;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        timeoutTimestamp?: number;
        memo?: string;
    } & {
        sourcePort?: string;
        sourceChannel?: string;
        token?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["token"], keyof Coin>]: never; };
        sender?: string;
        receiver?: string;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["timeoutHeight"], keyof Height>]: never; };
        timeoutTimestamp?: number;
        memo?: string;
    } & { [K_2 in Exclude<keyof I, keyof MsgTransfer>]: never; }>(base?: I): MsgTransfer;
    fromPartial<I_1 extends {
        sourcePort?: string;
        sourceChannel?: string;
        token?: {
            denom?: string;
            amount?: string;
        };
        sender?: string;
        receiver?: string;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        timeoutTimestamp?: number;
        memo?: string;
    } & {
        sourcePort?: string;
        sourceChannel?: string;
        token?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["token"], keyof Coin>]: never; };
        sender?: string;
        receiver?: string;
        timeoutHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["timeoutHeight"], keyof Height>]: never; };
        timeoutTimestamp?: number;
        memo?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgTransfer>]: never; }>(object: I_1): MsgTransfer;
};
export declare const MsgTransferResponse: {
    encode(message: MsgTransferResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferResponse;
    fromJSON(object: any): MsgTransferResponse;
    toJSON(message: MsgTransferResponse): unknown;
    create<I extends {
        sequence?: number;
    } & {
        sequence?: number;
    } & { [K in Exclude<keyof I, "sequence">]: never; }>(base?: I): MsgTransferResponse;
    fromPartial<I_1 extends {
        sequence?: number;
    } & {
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, "sequence">]: never; }>(object: I_1): MsgTransferResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        signer?: string;
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        };
    } & {
        signer?: string;
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & { [K in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        signer?: string;
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        };
    } & {
        signer?: string;
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
/** Msg defines the ibc/transfer Msg service. */
export interface Msg {
    /** Transfer defines a rpc handler method for MsgTransfer. */
    Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
    /** UpdateParams defines a rpc handler for MsgUpdateParams. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.applications.transfer.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Transfer(request: MsgTransfer): Promise<MsgTransferResponse>;
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
