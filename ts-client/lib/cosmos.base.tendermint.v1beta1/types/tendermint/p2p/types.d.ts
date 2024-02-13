import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.p2p";
export interface NetAddress {
    id: string;
    ip: string;
    port: number;
}
export interface ProtocolVersion {
    p2p: number;
    block: number;
    app: number;
}
export interface DefaultNodeInfo {
    protocolVersion: ProtocolVersion | undefined;
    defaultNodeId: string;
    listenAddr: string;
    network: string;
    version: string;
    channels: Uint8Array;
    moniker: string;
    other: DefaultNodeInfoOther | undefined;
}
export interface DefaultNodeInfoOther {
    txIndex: string;
    rpcAddress: string;
}
export declare const NetAddress: {
    encode(message: NetAddress, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): NetAddress;
    fromJSON(object: any): NetAddress;
    toJSON(message: NetAddress): unknown;
    create<I extends {
        id?: string;
        ip?: string;
        port?: number;
    } & {
        id?: string;
        ip?: string;
        port?: number;
    } & { [K in Exclude<keyof I, keyof NetAddress>]: never; }>(base?: I): NetAddress;
    fromPartial<I_1 extends {
        id?: string;
        ip?: string;
        port?: number;
    } & {
        id?: string;
        ip?: string;
        port?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof NetAddress>]: never; }>(object: I_1): NetAddress;
};
export declare const ProtocolVersion: {
    encode(message: ProtocolVersion, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ProtocolVersion;
    fromJSON(object: any): ProtocolVersion;
    toJSON(message: ProtocolVersion): unknown;
    create<I extends {
        p2p?: number;
        block?: number;
        app?: number;
    } & {
        p2p?: number;
        block?: number;
        app?: number;
    } & { [K in Exclude<keyof I, keyof ProtocolVersion>]: never; }>(base?: I): ProtocolVersion;
    fromPartial<I_1 extends {
        p2p?: number;
        block?: number;
        app?: number;
    } & {
        p2p?: number;
        block?: number;
        app?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof ProtocolVersion>]: never; }>(object: I_1): ProtocolVersion;
};
export declare const DefaultNodeInfo: {
    encode(message: DefaultNodeInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DefaultNodeInfo;
    fromJSON(object: any): DefaultNodeInfo;
    toJSON(message: DefaultNodeInfo): unknown;
    create<I extends {
        protocolVersion?: {
            p2p?: number;
            block?: number;
            app?: number;
        };
        defaultNodeId?: string;
        listenAddr?: string;
        network?: string;
        version?: string;
        channels?: Uint8Array;
        moniker?: string;
        other?: {
            txIndex?: string;
            rpcAddress?: string;
        };
    } & {
        protocolVersion?: {
            p2p?: number;
            block?: number;
            app?: number;
        } & {
            p2p?: number;
            block?: number;
            app?: number;
        } & { [K in Exclude<keyof I["protocolVersion"], keyof ProtocolVersion>]: never; };
        defaultNodeId?: string;
        listenAddr?: string;
        network?: string;
        version?: string;
        channels?: Uint8Array;
        moniker?: string;
        other?: {
            txIndex?: string;
            rpcAddress?: string;
        } & {
            txIndex?: string;
            rpcAddress?: string;
        } & { [K_1 in Exclude<keyof I["other"], keyof DefaultNodeInfoOther>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof DefaultNodeInfo>]: never; }>(base?: I): DefaultNodeInfo;
    fromPartial<I_1 extends {
        protocolVersion?: {
            p2p?: number;
            block?: number;
            app?: number;
        };
        defaultNodeId?: string;
        listenAddr?: string;
        network?: string;
        version?: string;
        channels?: Uint8Array;
        moniker?: string;
        other?: {
            txIndex?: string;
            rpcAddress?: string;
        };
    } & {
        protocolVersion?: {
            p2p?: number;
            block?: number;
            app?: number;
        } & {
            p2p?: number;
            block?: number;
            app?: number;
        } & { [K_3 in Exclude<keyof I_1["protocolVersion"], keyof ProtocolVersion>]: never; };
        defaultNodeId?: string;
        listenAddr?: string;
        network?: string;
        version?: string;
        channels?: Uint8Array;
        moniker?: string;
        other?: {
            txIndex?: string;
            rpcAddress?: string;
        } & {
            txIndex?: string;
            rpcAddress?: string;
        } & { [K_4 in Exclude<keyof I_1["other"], keyof DefaultNodeInfoOther>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof DefaultNodeInfo>]: never; }>(object: I_1): DefaultNodeInfo;
};
export declare const DefaultNodeInfoOther: {
    encode(message: DefaultNodeInfoOther, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DefaultNodeInfoOther;
    fromJSON(object: any): DefaultNodeInfoOther;
    toJSON(message: DefaultNodeInfoOther): unknown;
    create<I extends {
        txIndex?: string;
        rpcAddress?: string;
    } & {
        txIndex?: string;
        rpcAddress?: string;
    } & { [K in Exclude<keyof I, keyof DefaultNodeInfoOther>]: never; }>(base?: I): DefaultNodeInfoOther;
    fromPartial<I_1 extends {
        txIndex?: string;
        rpcAddress?: string;
    } & {
        txIndex?: string;
        rpcAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof DefaultNodeInfoOther>]: never; }>(object: I_1): DefaultNodeInfoOther;
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
