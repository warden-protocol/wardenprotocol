import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { Height } from "../../client/v1/client";
import { Counterparty, Params, Version } from "./connection";
export declare const protobufPackage = "ibc.core.connection.v1";
/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to
 * initialize a connection with Chain B.
 */
export interface MsgConnectionOpenInit {
    clientId: string;
    counterparty: Counterparty | undefined;
    version: Version | undefined;
    delayPeriod: number;
    signer: string;
}
/**
 * MsgConnectionOpenInitResponse defines the Msg/ConnectionOpenInit response
 * type.
 */
export interface MsgConnectionOpenInitResponse {
}
/**
 * MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a
 * connection on Chain B.
 */
export interface MsgConnectionOpenTry {
    clientId: string;
    /**
     * Deprecated: this field is unused. Crossing hellos are no longer supported in core IBC.
     *
     * @deprecated
     */
    previousConnectionId: string;
    clientState: Any | undefined;
    counterparty: Counterparty | undefined;
    delayPeriod: number;
    counterpartyVersions: Version[];
    proofHeight: Height | undefined;
    /**
     * proof of the initialization the connection on Chain A: `UNITIALIZED ->
     * INIT`
     */
    proofInit: Uint8Array;
    /** proof of client state included in message */
    proofClient: Uint8Array;
    /** proof of client consensus state */
    proofConsensus: Uint8Array;
    consensusHeight: Height | undefined;
    signer: string;
    /** optional proof data for host state machines that are unable to introspect their own consensus state */
    hostConsensusStateProof: Uint8Array;
}
/** MsgConnectionOpenTryResponse defines the Msg/ConnectionOpenTry response type. */
export interface MsgConnectionOpenTryResponse {
}
/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
export interface MsgConnectionOpenAck {
    connectionId: string;
    counterpartyConnectionId: string;
    version: Version | undefined;
    clientState: Any | undefined;
    proofHeight: Height | undefined;
    /**
     * proof of the initialization the connection on Chain B: `UNITIALIZED ->
     * TRYOPEN`
     */
    proofTry: Uint8Array;
    /** proof of client state included in message */
    proofClient: Uint8Array;
    /** proof of client consensus state */
    proofConsensus: Uint8Array;
    consensusHeight: Height | undefined;
    signer: string;
    /** optional proof data for host state machines that are unable to introspect their own consensus state */
    hostConsensusStateProof: Uint8Array;
}
/** MsgConnectionOpenAckResponse defines the Msg/ConnectionOpenAck response type. */
export interface MsgConnectionOpenAckResponse {
}
/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
export interface MsgConnectionOpenConfirm {
    connectionId: string;
    /** proof for the change of the connection state on Chain A: `INIT -> OPEN` */
    proofAck: Uint8Array;
    proofHeight: Height | undefined;
    signer: string;
}
/**
 * MsgConnectionOpenConfirmResponse defines the Msg/ConnectionOpenConfirm
 * response type.
 */
export interface MsgConnectionOpenConfirmResponse {
}
/** MsgUpdateParams defines the sdk.Msg type to update the connection parameters. */
export interface MsgUpdateParams {
    /** signer address */
    signer: string;
    /**
     * params defines the connection parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/** MsgUpdateParamsResponse defines the MsgUpdateParams response type. */
export interface MsgUpdateParamsResponse {
}
export declare const MsgConnectionOpenInit: {
    encode(message: MsgConnectionOpenInit, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenInit;
    fromJSON(object: any): MsgConnectionOpenInit;
    toJSON(message: MsgConnectionOpenInit): unknown;
    create<I extends {
        clientId?: string;
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        };
        version?: {
            identifier?: string;
            features?: string[];
        };
        delayPeriod?: number;
        signer?: string;
    } & {
        clientId?: string;
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        } & {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            } & {
                keyPrefix?: Uint8Array;
            } & { [K in Exclude<keyof I["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_1 in Exclude<keyof I["counterparty"], keyof Counterparty>]: never; };
        version?: {
            identifier?: string;
            features?: string[];
        } & {
            identifier?: string;
            features?: string[] & string[] & { [K_2 in Exclude<keyof I["version"]["features"], keyof string[]>]: never; };
        } & { [K_3 in Exclude<keyof I["version"], keyof Version>]: never; };
        delayPeriod?: number;
        signer?: string;
    } & { [K_4 in Exclude<keyof I, keyof MsgConnectionOpenInit>]: never; }>(base?: I): MsgConnectionOpenInit;
    fromPartial<I_1 extends {
        clientId?: string;
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        };
        version?: {
            identifier?: string;
            features?: string[];
        };
        delayPeriod?: number;
        signer?: string;
    } & {
        clientId?: string;
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        } & {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            } & {
                keyPrefix?: Uint8Array;
            } & { [K_5 in Exclude<keyof I_1["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_6 in Exclude<keyof I_1["counterparty"], keyof Counterparty>]: never; };
        version?: {
            identifier?: string;
            features?: string[];
        } & {
            identifier?: string;
            features?: string[] & string[] & { [K_7 in Exclude<keyof I_1["version"]["features"], keyof string[]>]: never; };
        } & { [K_8 in Exclude<keyof I_1["version"], keyof Version>]: never; };
        delayPeriod?: number;
        signer?: string;
    } & { [K_9 in Exclude<keyof I_1, keyof MsgConnectionOpenInit>]: never; }>(object: I_1): MsgConnectionOpenInit;
};
export declare const MsgConnectionOpenInitResponse: {
    encode(_: MsgConnectionOpenInitResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenInitResponse;
    fromJSON(_: any): MsgConnectionOpenInitResponse;
    toJSON(_: MsgConnectionOpenInitResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgConnectionOpenInitResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgConnectionOpenInitResponse;
};
export declare const MsgConnectionOpenTry: {
    encode(message: MsgConnectionOpenTry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenTry;
    fromJSON(object: any): MsgConnectionOpenTry;
    toJSON(message: MsgConnectionOpenTry): unknown;
    create<I extends {
        clientId?: string;
        previousConnectionId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        };
        delayPeriod?: number;
        counterpartyVersions?: {
            identifier?: string;
            features?: string[];
        }[];
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        proofInit?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & {
        clientId?: string;
        previousConnectionId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["clientState"], keyof Any>]: never; };
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        } & {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            } & {
                keyPrefix?: Uint8Array;
            } & { [K_1 in Exclude<keyof I["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_2 in Exclude<keyof I["counterparty"], keyof Counterparty>]: never; };
        delayPeriod?: number;
        counterpartyVersions?: {
            identifier?: string;
            features?: string[];
        }[] & ({
            identifier?: string;
            features?: string[];
        } & {
            identifier?: string;
            features?: string[] & string[] & { [K_3 in Exclude<keyof I["counterpartyVersions"][number]["features"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I["counterpartyVersions"][number], keyof Version>]: never; })[] & { [K_5 in Exclude<keyof I["counterpartyVersions"], keyof {
            identifier?: string;
            features?: string[];
        }[]>]: never; };
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        proofInit?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_7 in Exclude<keyof I["consensusHeight"], keyof Height>]: never; };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & { [K_8 in Exclude<keyof I, keyof MsgConnectionOpenTry>]: never; }>(base?: I): MsgConnectionOpenTry;
    fromPartial<I_1 extends {
        clientId?: string;
        previousConnectionId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        };
        delayPeriod?: number;
        counterpartyVersions?: {
            identifier?: string;
            features?: string[];
        }[];
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        proofInit?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & {
        clientId?: string;
        previousConnectionId?: string;
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_9 in Exclude<keyof I_1["clientState"], keyof Any>]: never; };
        counterparty?: {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            };
        } & {
            clientId?: string;
            connectionId?: string;
            prefix?: {
                keyPrefix?: Uint8Array;
            } & {
                keyPrefix?: Uint8Array;
            } & { [K_10 in Exclude<keyof I_1["counterparty"]["prefix"], "keyPrefix">]: never; };
        } & { [K_11 in Exclude<keyof I_1["counterparty"], keyof Counterparty>]: never; };
        delayPeriod?: number;
        counterpartyVersions?: {
            identifier?: string;
            features?: string[];
        }[] & ({
            identifier?: string;
            features?: string[];
        } & {
            identifier?: string;
            features?: string[] & string[] & { [K_12 in Exclude<keyof I_1["counterpartyVersions"][number]["features"], keyof string[]>]: never; };
        } & { [K_13 in Exclude<keyof I_1["counterpartyVersions"][number], keyof Version>]: never; })[] & { [K_14 in Exclude<keyof I_1["counterpartyVersions"], keyof {
            identifier?: string;
            features?: string[];
        }[]>]: never; };
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_15 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        proofInit?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_16 in Exclude<keyof I_1["consensusHeight"], keyof Height>]: never; };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & { [K_17 in Exclude<keyof I_1, keyof MsgConnectionOpenTry>]: never; }>(object: I_1): MsgConnectionOpenTry;
};
export declare const MsgConnectionOpenTryResponse: {
    encode(_: MsgConnectionOpenTryResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenTryResponse;
    fromJSON(_: any): MsgConnectionOpenTryResponse;
    toJSON(_: MsgConnectionOpenTryResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgConnectionOpenTryResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgConnectionOpenTryResponse;
};
export declare const MsgConnectionOpenAck: {
    encode(message: MsgConnectionOpenAck, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenAck;
    fromJSON(object: any): MsgConnectionOpenAck;
    toJSON(message: MsgConnectionOpenAck): unknown;
    create<I extends {
        connectionId?: string;
        counterpartyConnectionId?: string;
        version?: {
            identifier?: string;
            features?: string[];
        };
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        proofTry?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & {
        connectionId?: string;
        counterpartyConnectionId?: string;
        version?: {
            identifier?: string;
            features?: string[];
        } & {
            identifier?: string;
            features?: string[] & string[] & { [K in Exclude<keyof I["version"]["features"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["version"], keyof Version>]: never; };
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["clientState"], keyof Any>]: never; };
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_3 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        proofTry?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I["consensusHeight"], keyof Height>]: never; };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & { [K_5 in Exclude<keyof I, keyof MsgConnectionOpenAck>]: never; }>(base?: I): MsgConnectionOpenAck;
    fromPartial<I_1 extends {
        connectionId?: string;
        counterpartyConnectionId?: string;
        version?: {
            identifier?: string;
            features?: string[];
        };
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        proofTry?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & {
        connectionId?: string;
        counterpartyConnectionId?: string;
        version?: {
            identifier?: string;
            features?: string[];
        } & {
            identifier?: string;
            features?: string[] & string[] & { [K_6 in Exclude<keyof I_1["version"]["features"], keyof string[]>]: never; };
        } & { [K_7 in Exclude<keyof I_1["version"], keyof Version>]: never; };
        clientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_8 in Exclude<keyof I_1["clientState"], keyof Any>]: never; };
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_9 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        proofTry?: Uint8Array;
        proofClient?: Uint8Array;
        proofConsensus?: Uint8Array;
        consensusHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_10 in Exclude<keyof I_1["consensusHeight"], keyof Height>]: never; };
        signer?: string;
        hostConsensusStateProof?: Uint8Array;
    } & { [K_11 in Exclude<keyof I_1, keyof MsgConnectionOpenAck>]: never; }>(object: I_1): MsgConnectionOpenAck;
};
export declare const MsgConnectionOpenAckResponse: {
    encode(_: MsgConnectionOpenAckResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenAckResponse;
    fromJSON(_: any): MsgConnectionOpenAckResponse;
    toJSON(_: MsgConnectionOpenAckResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgConnectionOpenAckResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgConnectionOpenAckResponse;
};
export declare const MsgConnectionOpenConfirm: {
    encode(message: MsgConnectionOpenConfirm, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenConfirm;
    fromJSON(object: any): MsgConnectionOpenConfirm;
    toJSON(message: MsgConnectionOpenConfirm): unknown;
    create<I extends {
        connectionId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        connectionId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_1 in Exclude<keyof I, keyof MsgConnectionOpenConfirm>]: never; }>(base?: I): MsgConnectionOpenConfirm;
    fromPartial<I_1 extends {
        connectionId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
        signer?: string;
    } & {
        connectionId?: string;
        proofAck?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
        signer?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof MsgConnectionOpenConfirm>]: never; }>(object: I_1): MsgConnectionOpenConfirm;
};
export declare const MsgConnectionOpenConfirmResponse: {
    encode(_: MsgConnectionOpenConfirmResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgConnectionOpenConfirmResponse;
    fromJSON(_: any): MsgConnectionOpenConfirmResponse;
    toJSON(_: MsgConnectionOpenConfirmResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgConnectionOpenConfirmResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgConnectionOpenConfirmResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        signer?: string;
        params?: {
            maxExpectedTimePerBlock?: number;
        };
    } & {
        signer?: string;
        params?: {
            maxExpectedTimePerBlock?: number;
        } & {
            maxExpectedTimePerBlock?: number;
        } & { [K in Exclude<keyof I["params"], "maxExpectedTimePerBlock">]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        signer?: string;
        params?: {
            maxExpectedTimePerBlock?: number;
        };
    } & {
        signer?: string;
        params?: {
            maxExpectedTimePerBlock?: number;
        } & {
            maxExpectedTimePerBlock?: number;
        } & { [K_2 in Exclude<keyof I_1["params"], "maxExpectedTimePerBlock">]: never; };
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
/** Msg defines the ibc/connection Msg service. */
export interface Msg {
    /** ConnectionOpenInit defines a rpc handler method for MsgConnectionOpenInit. */
    ConnectionOpenInit(request: MsgConnectionOpenInit): Promise<MsgConnectionOpenInitResponse>;
    /** ConnectionOpenTry defines a rpc handler method for MsgConnectionOpenTry. */
    ConnectionOpenTry(request: MsgConnectionOpenTry): Promise<MsgConnectionOpenTryResponse>;
    /** ConnectionOpenAck defines a rpc handler method for MsgConnectionOpenAck. */
    ConnectionOpenAck(request: MsgConnectionOpenAck): Promise<MsgConnectionOpenAckResponse>;
    /**
     * ConnectionOpenConfirm defines a rpc handler method for
     * MsgConnectionOpenConfirm.
     */
    ConnectionOpenConfirm(request: MsgConnectionOpenConfirm): Promise<MsgConnectionOpenConfirmResponse>;
    /**
     * UpdateConnectionParams defines a rpc handler method for
     * MsgUpdateParams.
     */
    UpdateConnectionParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "ibc.core.connection.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    ConnectionOpenInit(request: MsgConnectionOpenInit): Promise<MsgConnectionOpenInitResponse>;
    ConnectionOpenTry(request: MsgConnectionOpenTry): Promise<MsgConnectionOpenTryResponse>;
    ConnectionOpenAck(request: MsgConnectionOpenAck): Promise<MsgConnectionOpenAckResponse>;
    ConnectionOpenConfirm(request: MsgConnectionOpenConfirm): Promise<MsgConnectionOpenConfirmResponse>;
    UpdateConnectionParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
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
