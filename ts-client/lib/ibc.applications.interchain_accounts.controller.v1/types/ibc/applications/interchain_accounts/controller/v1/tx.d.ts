import _m0 from "protobufjs/minimal";
import { Order } from "../../../../core/channel/v1/channel";
import { InterchainAccountPacketData } from "../../v1/packet";
import { Params } from "./controller";
export declare const protobufPackage = "ibc.applications.interchain_accounts.controller.v1";
/** MsgRegisterInterchainAccount defines the payload for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccount {
    owner: string;
    connectionId: string;
    version: string;
    ordering: Order;
}
/** MsgRegisterInterchainAccountResponse defines the response for Msg/RegisterAccount */
export interface MsgRegisterInterchainAccountResponse {
    channelId: string;
    portId: string;
}
/** MsgSendTx defines the payload for Msg/SendTx */
export interface MsgSendTx {
    owner: string;
    connectionId: string;
    packetData: InterchainAccountPacketData | undefined;
    /**
     * Relative timeout timestamp provided will be added to the current block time during transaction execution.
     * The timeout timestamp must be non-zero.
     */
    relativeTimeout: number;
}
/** MsgSendTxResponse defines the response for MsgSendTx */
export interface MsgSendTxResponse {
    sequence: number;
}
/** MsgUpdateParams defines the payload for Msg/UpdateParams */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the 27-interchain-accounts/controller parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/** MsgUpdateParamsResponse defines the response for Msg/UpdateParams */
export interface MsgUpdateParamsResponse {
}
export declare const MsgRegisterInterchainAccount: {
    encode(message: MsgRegisterInterchainAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInterchainAccount;
    fromJSON(object: any): MsgRegisterInterchainAccount;
    toJSON(message: MsgRegisterInterchainAccount): unknown;
    create<I extends {
        owner?: string;
        connectionId?: string;
        version?: string;
        ordering?: Order;
    } & {
        owner?: string;
        connectionId?: string;
        version?: string;
        ordering?: Order;
    } & { [K in Exclude<keyof I, keyof MsgRegisterInterchainAccount>]: never; }>(base?: I): MsgRegisterInterchainAccount;
    fromPartial<I_1 extends {
        owner?: string;
        connectionId?: string;
        version?: string;
        ordering?: Order;
    } & {
        owner?: string;
        connectionId?: string;
        version?: string;
        ordering?: Order;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgRegisterInterchainAccount>]: never; }>(object: I_1): MsgRegisterInterchainAccount;
};
export declare const MsgRegisterInterchainAccountResponse: {
    encode(message: MsgRegisterInterchainAccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterInterchainAccountResponse;
    fromJSON(object: any): MsgRegisterInterchainAccountResponse;
    toJSON(message: MsgRegisterInterchainAccountResponse): unknown;
    create<I extends {
        channelId?: string;
        portId?: string;
    } & {
        channelId?: string;
        portId?: string;
    } & { [K in Exclude<keyof I, keyof MsgRegisterInterchainAccountResponse>]: never; }>(base?: I): MsgRegisterInterchainAccountResponse;
    fromPartial<I_1 extends {
        channelId?: string;
        portId?: string;
    } & {
        channelId?: string;
        portId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgRegisterInterchainAccountResponse>]: never; }>(object: I_1): MsgRegisterInterchainAccountResponse;
};
export declare const MsgSendTx: {
    encode(message: MsgSendTx, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendTx;
    fromJSON(object: any): MsgSendTx;
    toJSON(message: MsgSendTx): unknown;
    create<I extends {
        owner?: string;
        connectionId?: string;
        packetData?: {
            type?: import("../../v1/packet").Type;
            data?: Uint8Array;
            memo?: string;
        };
        relativeTimeout?: number;
    } & {
        owner?: string;
        connectionId?: string;
        packetData?: {
            type?: import("../../v1/packet").Type;
            data?: Uint8Array;
            memo?: string;
        } & {
            type?: import("../../v1/packet").Type;
            data?: Uint8Array;
            memo?: string;
        } & { [K in Exclude<keyof I["packetData"], keyof InterchainAccountPacketData>]: never; };
        relativeTimeout?: number;
    } & { [K_1 in Exclude<keyof I, keyof MsgSendTx>]: never; }>(base?: I): MsgSendTx;
    fromPartial<I_1 extends {
        owner?: string;
        connectionId?: string;
        packetData?: {
            type?: import("../../v1/packet").Type;
            data?: Uint8Array;
            memo?: string;
        };
        relativeTimeout?: number;
    } & {
        owner?: string;
        connectionId?: string;
        packetData?: {
            type?: import("../../v1/packet").Type;
            data?: Uint8Array;
            memo?: string;
        } & {
            type?: import("../../v1/packet").Type;
            data?: Uint8Array;
            memo?: string;
        } & { [K_2 in Exclude<keyof I_1["packetData"], keyof InterchainAccountPacketData>]: never; };
        relativeTimeout?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgSendTx>]: never; }>(object: I_1): MsgSendTx;
};
export declare const MsgSendTxResponse: {
    encode(message: MsgSendTxResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendTxResponse;
    fromJSON(object: any): MsgSendTxResponse;
    toJSON(message: MsgSendTxResponse): unknown;
    create<I extends {
        sequence?: number;
    } & {
        sequence?: number;
    } & { [K in Exclude<keyof I, "sequence">]: never; }>(base?: I): MsgSendTxResponse;
    fromPartial<I_1 extends {
        sequence?: number;
    } & {
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, "sequence">]: never; }>(object: I_1): MsgSendTxResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        signer?: string;
        params?: {
            controllerEnabled?: boolean;
        };
    } & {
        signer?: string;
        params?: {
            controllerEnabled?: boolean;
        } & {
            controllerEnabled?: boolean;
        } & { [K in Exclude<keyof I["params"], "controllerEnabled">]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        signer?: string;
        params?: {
            controllerEnabled?: boolean;
        };
    } & {
        signer?: string;
        params?: {
            controllerEnabled?: boolean;
        } & {
            controllerEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I_1["params"], "controllerEnabled">]: never; };
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
/** Msg defines the 27-interchain-accounts/controller Msg service. */
export interface Msg {
    /** RegisterInterchainAccount defines a rpc handler for MsgRegisterInterchainAccount. */
    RegisterInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
    /** SendTx defines a rpc handler for MsgSendTx. */
    SendTx(request: MsgSendTx): Promise<MsgSendTxResponse>;
    /** UpdateParams defines a rpc handler for MsgUpdateParams. */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.applications.interchain_accounts.controller.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    RegisterInterchainAccount(request: MsgRegisterInterchainAccount): Promise<MsgRegisterInterchainAccountResponse>;
    SendTx(request: MsgSendTx): Promise<MsgSendTxResponse>;
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
