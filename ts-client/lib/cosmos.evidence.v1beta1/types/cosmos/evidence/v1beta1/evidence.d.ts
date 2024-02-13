import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.evidence.v1beta1";
/**
 * Equivocation implements the Evidence interface and defines evidence of double
 * signing misbehavior.
 */
export interface Equivocation {
    /** height is the equivocation height. */
    height: number;
    /** time is the equivocation time. */
    time: Date | undefined;
    /** power is the equivocation validator power. */
    power: number;
    /** consensus_address is the equivocation validator consensus address. */
    consensusAddress: string;
}
export declare const Equivocation: {
    encode(message: Equivocation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Equivocation;
    fromJSON(object: any): Equivocation;
    toJSON(message: Equivocation): unknown;
    create<I extends {
        height?: number;
        time?: Date | undefined;
        power?: number;
        consensusAddress?: string;
    } & {
        height?: number;
        time?: Date | undefined;
        power?: number;
        consensusAddress?: string;
    } & { [K in Exclude<keyof I, keyof Equivocation>]: never; }>(base?: I): Equivocation;
    fromPartial<I_1 extends {
        height?: number;
        time?: Date | undefined;
        power?: number;
        consensusAddress?: string;
    } & {
        height?: number;
        time?: Date | undefined;
        power?: number;
        consensusAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Equivocation>]: never; }>(object: I_1): Equivocation;
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
