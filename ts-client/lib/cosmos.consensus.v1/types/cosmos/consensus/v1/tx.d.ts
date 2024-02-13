import _m0 from "protobufjs/minimal";
import { ABCIParams, BlockParams, EvidenceParams, ValidatorParams } from "../../../tendermint/types/params";
export declare const protobufPackage = "cosmos.consensus.v1";
/** Since: cosmos-sdk 0.47 */
/** MsgUpdateParams is the Msg/UpdateParams request type. */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/consensus parameters to update.
     * VersionsParams is not included in this Msg because it is tracked
     * separarately in x/upgrade.
     *
     * NOTE: All parameters must be supplied.
     */
    block: BlockParams | undefined;
    evidence: EvidenceParams | undefined;
    validator: ValidatorParams | undefined;
    /** Since: cosmos-sdk 0.50 */
    abci: ABCIParams | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 */
export interface MsgUpdateParamsResponse {
}
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        authority?: string;
        block?: {
            maxBytes?: number;
            maxGas?: number;
        };
        evidence?: {
            maxAgeNumBlocks?: number;
            maxAgeDuration?: {
                seconds?: number;
                nanos?: number;
            };
            maxBytes?: number;
        };
        validator?: {
            pubKeyTypes?: string[];
        };
        abci?: {
            voteExtensionsEnableHeight?: number;
        };
    } & {
        authority?: string;
        block?: {
            maxBytes?: number;
            maxGas?: number;
        } & {
            maxBytes?: number;
            maxGas?: number;
        } & { [K in Exclude<keyof I["block"], keyof BlockParams>]: never; };
        evidence?: {
            maxAgeNumBlocks?: number;
            maxAgeDuration?: {
                seconds?: number;
                nanos?: number;
            };
            maxBytes?: number;
        } & {
            maxAgeNumBlocks?: number;
            maxAgeDuration?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_1 in Exclude<keyof I["evidence"]["maxAgeDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            maxBytes?: number;
        } & { [K_2 in Exclude<keyof I["evidence"], keyof EvidenceParams>]: never; };
        validator?: {
            pubKeyTypes?: string[];
        } & {
            pubKeyTypes?: string[] & string[] & { [K_3 in Exclude<keyof I["validator"]["pubKeyTypes"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I["validator"], "pubKeyTypes">]: never; };
        abci?: {
            voteExtensionsEnableHeight?: number;
        } & {
            voteExtensionsEnableHeight?: number;
        } & { [K_5 in Exclude<keyof I["abci"], "voteExtensionsEnableHeight">]: never; };
    } & { [K_6 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        authority?: string;
        block?: {
            maxBytes?: number;
            maxGas?: number;
        };
        evidence?: {
            maxAgeNumBlocks?: number;
            maxAgeDuration?: {
                seconds?: number;
                nanos?: number;
            };
            maxBytes?: number;
        };
        validator?: {
            pubKeyTypes?: string[];
        };
        abci?: {
            voteExtensionsEnableHeight?: number;
        };
    } & {
        authority?: string;
        block?: {
            maxBytes?: number;
            maxGas?: number;
        } & {
            maxBytes?: number;
            maxGas?: number;
        } & { [K_7 in Exclude<keyof I_1["block"], keyof BlockParams>]: never; };
        evidence?: {
            maxAgeNumBlocks?: number;
            maxAgeDuration?: {
                seconds?: number;
                nanos?: number;
            };
            maxBytes?: number;
        } & {
            maxAgeNumBlocks?: number;
            maxAgeDuration?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_8 in Exclude<keyof I_1["evidence"]["maxAgeDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            maxBytes?: number;
        } & { [K_9 in Exclude<keyof I_1["evidence"], keyof EvidenceParams>]: never; };
        validator?: {
            pubKeyTypes?: string[];
        } & {
            pubKeyTypes?: string[] & string[] & { [K_10 in Exclude<keyof I_1["validator"]["pubKeyTypes"], keyof string[]>]: never; };
        } & { [K_11 in Exclude<keyof I_1["validator"], "pubKeyTypes">]: never; };
        abci?: {
            voteExtensionsEnableHeight?: number;
        } & {
            voteExtensionsEnableHeight?: number;
        } & { [K_12 in Exclude<keyof I_1["abci"], "voteExtensionsEnableHeight">]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
/** Msg defines the consensus Msg service. */
export interface Msg {
    /**
     * UpdateParams defines a governance operation for updating the x/consensus module parameters.
     * The authority is defined in the keeper.
     *
     * Since: cosmos-sdk 0.47
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
}
export declare const MsgServiceName = "cosmos.consensus.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
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
