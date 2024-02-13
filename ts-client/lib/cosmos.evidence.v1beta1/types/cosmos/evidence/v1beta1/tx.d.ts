import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmos.evidence.v1beta1";
/**
 * MsgSubmitEvidence represents a message that supports submitting arbitrary
 * Evidence of misbehavior such as equivocation or counterfactual signing.
 */
export interface MsgSubmitEvidence {
    /** submitter is the signer account address of evidence. */
    submitter: string;
    /** evidence defines the evidence of misbehavior. */
    evidence: Any | undefined;
}
/** MsgSubmitEvidenceResponse defines the Msg/SubmitEvidence response type. */
export interface MsgSubmitEvidenceResponse {
    /** hash defines the hash of the evidence. */
    hash: Uint8Array;
}
export declare const MsgSubmitEvidence: {
    encode(message: MsgSubmitEvidence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitEvidence;
    fromJSON(object: any): MsgSubmitEvidence;
    toJSON(message: MsgSubmitEvidence): unknown;
    create<I extends {
        submitter?: string;
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        submitter?: string;
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["evidence"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgSubmitEvidence>]: never; }>(base?: I): MsgSubmitEvidence;
    fromPartial<I_1 extends {
        submitter?: string;
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        submitter?: string;
        evidence?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["evidence"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgSubmitEvidence>]: never; }>(object: I_1): MsgSubmitEvidence;
};
export declare const MsgSubmitEvidenceResponse: {
    encode(message: MsgSubmitEvidenceResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitEvidenceResponse;
    fromJSON(object: any): MsgSubmitEvidenceResponse;
    toJSON(message: MsgSubmitEvidenceResponse): unknown;
    create<I extends {
        hash?: Uint8Array;
    } & {
        hash?: Uint8Array;
    } & { [K in Exclude<keyof I, "hash">]: never; }>(base?: I): MsgSubmitEvidenceResponse;
    fromPartial<I_1 extends {
        hash?: Uint8Array;
    } & {
        hash?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "hash">]: never; }>(object: I_1): MsgSubmitEvidenceResponse;
};
/** Msg defines the evidence Msg service. */
export interface Msg {
    /**
     * SubmitEvidence submits an arbitrary Evidence of misbehavior such as equivocation or
     * counterfactual signing.
     */
    SubmitEvidence(request: MsgSubmitEvidence): Promise<MsgSubmitEvidenceResponse>;
}
export declare const MsgServiceName = "cosmos.evidence.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    SubmitEvidence(request: MsgSubmitEvidence): Promise<MsgSubmitEvidenceResponse>;
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
