import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "shield.token";
export declare enum Type {
    ILLEGAL = 0,
    EOF = 1,
    IDENT = 2,
    INT = 3,
    COMMA = 4,
    SEMICOLON = 5,
    LPAREN = 6,
    RPAREN = 7,
    LBRACKET = 8,
    RBRACKET = 9,
    AND = 10,
    OR = 11,
    TRUE = 12,
    FALSE = 13,
    UNRECOGNIZED = -1
}
export declare function typeFromJSON(object: any): Type;
export declare function typeToJSON(object: Type): string;
export interface Token {
    type: Type;
    literal: string;
}
export declare const Token: {
    encode(message: Token, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Token;
    fromJSON(object: any): Token;
    toJSON(message: Token): unknown;
    create<I extends {
        type?: Type;
        literal?: string;
    } & {
        type?: Type;
        literal?: string;
    } & { [K in Exclude<keyof I, keyof Token>]: never; }>(base?: I): Token;
    fromPartial<I_1 extends {
        type?: Type;
        literal?: string;
    } & {
        type?: Type;
        literal?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Token>]: never; }>(object: I_1): Token;
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
