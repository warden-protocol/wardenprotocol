import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.version";
/**
 * App includes the protocol and software version for the application.
 * This information is included in ResponseInfo. The App.Protocol can be
 * updated in ResponseEndBlock.
 */
export interface App {
    protocol: number;
    software: string;
}
/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
export interface Consensus {
    block: number;
    app: number;
}
export declare const App: {
    encode(message: App, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): App;
    fromJSON(object: any): App;
    toJSON(message: App): unknown;
    create<I extends {
        protocol?: number;
        software?: string;
    } & {
        protocol?: number;
        software?: string;
    } & { [K in Exclude<keyof I, keyof App>]: never; }>(base?: I): App;
    fromPartial<I_1 extends {
        protocol?: number;
        software?: string;
    } & {
        protocol?: number;
        software?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof App>]: never; }>(object: I_1): App;
};
export declare const Consensus: {
    encode(message: Consensus, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Consensus;
    fromJSON(object: any): Consensus;
    toJSON(message: Consensus): unknown;
    create<I extends {
        block?: number;
        app?: number;
    } & {
        block?: number;
        app?: number;
    } & { [K in Exclude<keyof I, keyof Consensus>]: never; }>(base?: I): Consensus;
    fromPartial<I_1 extends {
        block?: number;
        app?: number;
    } & {
        block?: number;
        app?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof Consensus>]: never; }>(object: I_1): Consensus;
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
