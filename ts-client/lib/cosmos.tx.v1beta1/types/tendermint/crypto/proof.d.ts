import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.crypto";
export interface Proof {
    total: number;
    index: number;
    leafHash: Uint8Array;
    aunts: Uint8Array[];
}
export interface ValueOp {
    /** Encoded in ProofOp.Key. */
    key: Uint8Array;
    /** To encode in ProofOp.Data */
    proof: Proof | undefined;
}
export interface DominoOp {
    key: string;
    input: string;
    output: string;
}
/**
 * ProofOp defines an operation used for calculating Merkle root
 * The data could be arbitrary format, providing nessecary data
 * for example neighbouring node hash
 */
export interface ProofOp {
    type: string;
    key: Uint8Array;
    data: Uint8Array;
}
/** ProofOps is Merkle proof defined by the list of ProofOps */
export interface ProofOps {
    ops: ProofOp[];
}
export declare const Proof: {
    encode(message: Proof, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Proof;
    fromJSON(object: any): Proof;
    toJSON(message: Proof): unknown;
    create<I extends {
        total?: number;
        index?: number;
        leafHash?: Uint8Array;
        aunts?: Uint8Array[];
    } & {
        total?: number;
        index?: number;
        leafHash?: Uint8Array;
        aunts?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["aunts"], keyof Uint8Array[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Proof>]: never; }>(base?: I): Proof;
    fromPartial<I_1 extends {
        total?: number;
        index?: number;
        leafHash?: Uint8Array;
        aunts?: Uint8Array[];
    } & {
        total?: number;
        index?: number;
        leafHash?: Uint8Array;
        aunts?: Uint8Array[] & Uint8Array[] & { [K_2 in Exclude<keyof I_1["aunts"], keyof Uint8Array[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Proof>]: never; }>(object: I_1): Proof;
};
export declare const ValueOp: {
    encode(message: ValueOp, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValueOp;
    fromJSON(object: any): ValueOp;
    toJSON(message: ValueOp): unknown;
    create<I extends {
        key?: Uint8Array;
        proof?: {
            total?: number;
            index?: number;
            leafHash?: Uint8Array;
            aunts?: Uint8Array[];
        };
    } & {
        key?: Uint8Array;
        proof?: {
            total?: number;
            index?: number;
            leafHash?: Uint8Array;
            aunts?: Uint8Array[];
        } & {
            total?: number;
            index?: number;
            leafHash?: Uint8Array;
            aunts?: Uint8Array[] & Uint8Array[] & { [K in Exclude<keyof I["proof"]["aunts"], keyof Uint8Array[]>]: never; };
        } & { [K_1 in Exclude<keyof I["proof"], keyof Proof>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ValueOp>]: never; }>(base?: I): ValueOp;
    fromPartial<I_1 extends {
        key?: Uint8Array;
        proof?: {
            total?: number;
            index?: number;
            leafHash?: Uint8Array;
            aunts?: Uint8Array[];
        };
    } & {
        key?: Uint8Array;
        proof?: {
            total?: number;
            index?: number;
            leafHash?: Uint8Array;
            aunts?: Uint8Array[];
        } & {
            total?: number;
            index?: number;
            leafHash?: Uint8Array;
            aunts?: Uint8Array[] & Uint8Array[] & { [K_3 in Exclude<keyof I_1["proof"]["aunts"], keyof Uint8Array[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["proof"], keyof Proof>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ValueOp>]: never; }>(object: I_1): ValueOp;
};
export declare const DominoOp: {
    encode(message: DominoOp, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DominoOp;
    fromJSON(object: any): DominoOp;
    toJSON(message: DominoOp): unknown;
    create<I extends {
        key?: string;
        input?: string;
        output?: string;
    } & {
        key?: string;
        input?: string;
        output?: string;
    } & { [K in Exclude<keyof I, keyof DominoOp>]: never; }>(base?: I): DominoOp;
    fromPartial<I_1 extends {
        key?: string;
        input?: string;
        output?: string;
    } & {
        key?: string;
        input?: string;
        output?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof DominoOp>]: never; }>(object: I_1): DominoOp;
};
export declare const ProofOp: {
    encode(message: ProofOp, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ProofOp;
    fromJSON(object: any): ProofOp;
    toJSON(message: ProofOp): unknown;
    create<I extends {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof ProofOp>]: never; }>(base?: I): ProofOp;
    fromPartial<I_1 extends {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & {
        type?: string;
        key?: Uint8Array;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof ProofOp>]: never; }>(object: I_1): ProofOp;
};
export declare const ProofOps: {
    encode(message: ProofOps, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ProofOps;
    fromJSON(object: any): ProofOps;
    toJSON(message: ProofOps): unknown;
    create<I extends {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[];
    } & {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[] & ({
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & { [K in Exclude<keyof I["ops"][number], keyof ProofOp>]: never; })[] & { [K_1 in Exclude<keyof I["ops"], keyof {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "ops">]: never; }>(base?: I): ProofOps;
    fromPartial<I_1 extends {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[];
    } & {
        ops?: {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[] & ({
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["ops"][number], keyof ProofOp>]: never; })[] & { [K_4 in Exclude<keyof I_1["ops"], keyof {
            type?: string;
            key?: Uint8Array;
            data?: Uint8Array;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "ops">]: never; }>(object: I_1): ProofOps;
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
