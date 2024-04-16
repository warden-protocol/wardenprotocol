import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmwasm.wasm.v1";
/** MsgIBCSend */
export interface MsgIBCSend {
    /** the channel by which the packet will be sent */
    channel: string;
    /**
     * Timeout height relative to the current block height.
     * The timeout is disabled when set to 0.
     */
    timeoutHeight: number;
    /**
     * Timeout timestamp (in nanoseconds) relative to the current block timestamp.
     * The timeout is disabled when set to 0.
     */
    timeoutTimestamp: number;
    /**
     * Data is the payload to transfer. We must not make assumption what format or
     * content is in here.
     */
    data: Uint8Array;
}
/** MsgIBCSendResponse */
export interface MsgIBCSendResponse {
    /** Sequence number of the IBC packet sent */
    sequence: number;
}
/** MsgIBCCloseChannel port and channel need to be owned by the contract */
export interface MsgIBCCloseChannel {
    channel: string;
}
export declare const MsgIBCSend: {
    encode(message: MsgIBCSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgIBCSend;
    fromJSON(object: any): MsgIBCSend;
    toJSON(message: MsgIBCSend): unknown;
    create<I extends {
        channel?: string;
        timeoutHeight?: number;
        timeoutTimestamp?: number;
        data?: Uint8Array;
    } & {
        channel?: string;
        timeoutHeight?: number;
        timeoutTimestamp?: number;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgIBCSend>]: never; }>(base?: I): MsgIBCSend;
    fromPartial<I_1 extends {
        channel?: string;
        timeoutHeight?: number;
        timeoutTimestamp?: number;
        data?: Uint8Array;
    } & {
        channel?: string;
        timeoutHeight?: number;
        timeoutTimestamp?: number;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgIBCSend>]: never; }>(object: I_1): MsgIBCSend;
};
export declare const MsgIBCSendResponse: {
    encode(message: MsgIBCSendResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgIBCSendResponse;
    fromJSON(object: any): MsgIBCSendResponse;
    toJSON(message: MsgIBCSendResponse): unknown;
    create<I extends {
        sequence?: number;
    } & {
        sequence?: number;
    } & { [K in Exclude<keyof I, "sequence">]: never; }>(base?: I): MsgIBCSendResponse;
    fromPartial<I_1 extends {
        sequence?: number;
    } & {
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, "sequence">]: never; }>(object: I_1): MsgIBCSendResponse;
};
export declare const MsgIBCCloseChannel: {
    encode(message: MsgIBCCloseChannel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgIBCCloseChannel;
    fromJSON(object: any): MsgIBCCloseChannel;
    toJSON(message: MsgIBCCloseChannel): unknown;
    create<I extends {
        channel?: string;
    } & {
        channel?: string;
    } & { [K in Exclude<keyof I, "channel">]: never; }>(base?: I): MsgIBCCloseChannel;
    fromPartial<I_1 extends {
        channel?: string;
    } & {
        channel?: string;
    } & { [K_1 in Exclude<keyof I_1, "channel">]: never; }>(object: I_1): MsgIBCCloseChannel;
};
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
