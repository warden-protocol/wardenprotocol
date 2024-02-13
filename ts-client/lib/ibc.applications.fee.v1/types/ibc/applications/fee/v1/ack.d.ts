import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "ibc.applications.fee.v1";
/** IncentivizedAcknowledgement is the acknowledgement format to be used by applications wrapped in the fee middleware */
export interface IncentivizedAcknowledgement {
    /** the underlying app acknowledgement bytes */
    appAcknowledgement: Uint8Array;
    /** the relayer address which submits the recv packet message */
    forwardRelayerAddress: string;
    /** success flag of the base application callback */
    underlyingAppSuccess: boolean;
}
export declare const IncentivizedAcknowledgement: {
    encode(message: IncentivizedAcknowledgement, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IncentivizedAcknowledgement;
    fromJSON(object: any): IncentivizedAcknowledgement;
    toJSON(message: IncentivizedAcknowledgement): unknown;
    create<I extends {
        appAcknowledgement?: Uint8Array;
        forwardRelayerAddress?: string;
        underlyingAppSuccess?: boolean;
    } & {
        appAcknowledgement?: Uint8Array;
        forwardRelayerAddress?: string;
        underlyingAppSuccess?: boolean;
    } & { [K in Exclude<keyof I, keyof IncentivizedAcknowledgement>]: never; }>(base?: I): IncentivizedAcknowledgement;
    fromPartial<I_1 extends {
        appAcknowledgement?: Uint8Array;
        forwardRelayerAddress?: string;
        underlyingAppSuccess?: boolean;
    } & {
        appAcknowledgement?: Uint8Array;
        forwardRelayerAddress?: string;
        underlyingAppSuccess?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof IncentivizedAcknowledgement>]: never; }>(object: I_1): IncentivizedAcknowledgement;
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
