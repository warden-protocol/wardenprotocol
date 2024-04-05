import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "warden.intent";
export interface Intent {
    id: number;
    creator: string;
    name: string;
    /** The definition of the intent written in the Shield language. */
    definition: string;
    /** The list of addresses referenced from the intent definition. */
    addresses: string[];
}
export declare const Intent: {
    encode(message: Intent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Intent;
    fromJSON(object: any): Intent;
    toJSON(message: Intent): unknown;
    create<I extends {
        id?: number;
        creator?: string;
        name?: string;
        definition?: string;
        addresses?: string[];
    } & {
        id?: number;
        creator?: string;
        name?: string;
        definition?: string;
        addresses?: string[] & string[] & { [K in Exclude<keyof I["addresses"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Intent>]: never; }>(base?: I): Intent;
    fromPartial<I_1 extends {
        id?: number;
        creator?: string;
        name?: string;
        definition?: string;
        addresses?: string[];
    } & {
        id?: number;
        creator?: string;
        name?: string;
        definition?: string;
        addresses?: string[] & string[] & { [K_2 in Exclude<keyof I_1["addresses"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Intent>]: never; }>(object: I_1): Intent;
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
