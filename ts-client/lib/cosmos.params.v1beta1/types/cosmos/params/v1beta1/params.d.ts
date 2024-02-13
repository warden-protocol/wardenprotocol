import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.params.v1beta1";
/** ParameterChangeProposal defines a proposal to change one or more parameters. */
export interface ParameterChangeProposal {
    title: string;
    description: string;
    changes: ParamChange[];
}
/**
 * ParamChange defines an individual parameter change, for use in
 * ParameterChangeProposal.
 */
export interface ParamChange {
    subspace: string;
    key: string;
    value: string;
}
export declare const ParameterChangeProposal: {
    encode(message: ParameterChangeProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ParameterChangeProposal;
    fromJSON(object: any): ParameterChangeProposal;
    toJSON(message: ParameterChangeProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        changes?: {
            subspace?: string;
            key?: string;
            value?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        changes?: {
            subspace?: string;
            key?: string;
            value?: string;
        }[] & ({
            subspace?: string;
            key?: string;
            value?: string;
        } & {
            subspace?: string;
            key?: string;
            value?: string;
        } & { [K in Exclude<keyof I["changes"][number], keyof ParamChange>]: never; })[] & { [K_1 in Exclude<keyof I["changes"], keyof {
            subspace?: string;
            key?: string;
            value?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ParameterChangeProposal>]: never; }>(base?: I): ParameterChangeProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        changes?: {
            subspace?: string;
            key?: string;
            value?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        changes?: {
            subspace?: string;
            key?: string;
            value?: string;
        }[] & ({
            subspace?: string;
            key?: string;
            value?: string;
        } & {
            subspace?: string;
            key?: string;
            value?: string;
        } & { [K_3 in Exclude<keyof I_1["changes"][number], keyof ParamChange>]: never; })[] & { [K_4 in Exclude<keyof I_1["changes"], keyof {
            subspace?: string;
            key?: string;
            value?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ParameterChangeProposal>]: never; }>(object: I_1): ParameterChangeProposal;
};
export declare const ParamChange: {
    encode(message: ParamChange, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ParamChange;
    fromJSON(object: any): ParamChange;
    toJSON(message: ParamChange): unknown;
    create<I extends {
        subspace?: string;
        key?: string;
        value?: string;
    } & {
        subspace?: string;
        key?: string;
        value?: string;
    } & { [K in Exclude<keyof I, keyof ParamChange>]: never; }>(base?: I): ParamChange;
    fromPartial<I_1 extends {
        subspace?: string;
        key?: string;
        value?: string;
    } & {
        subspace?: string;
        key?: string;
        value?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof ParamChange>]: never; }>(object: I_1): ParamChange;
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
