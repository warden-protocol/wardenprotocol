import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
export declare const protobufPackage = "warden.intent";
export interface Intent {
    id: number;
    name: string;
    /**
     * The actual intent informations. It must be one the supported intent types:
     * - BoolparserIntent
     */
    intent: Any | undefined;
}
export interface BoolparserIntent {
    /**
     * Definition of the intent, eg.
     * "t1 + t2 + t3 > 1"
     */
    definition: string;
    participants: IntentParticipant[];
}
export interface IntentParticipant {
    abbreviation: string;
    address: string;
}
export declare const Intent: {
    encode(message: Intent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Intent;
    fromJSON(object: any): Intent;
    toJSON(message: Intent): unknown;
    create<I extends {
        id?: number;
        name?: string;
        intent?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        id?: number;
        name?: string;
        intent?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["intent"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Intent>]: never; }>(base?: I): Intent;
    fromPartial<I_1 extends {
        id?: number;
        name?: string;
        intent?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        id?: number;
        name?: string;
        intent?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["intent"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Intent>]: never; }>(object: I_1): Intent;
};
export declare const BoolparserIntent: {
    encode(message: BoolparserIntent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BoolparserIntent;
    fromJSON(object: any): BoolparserIntent;
    toJSON(message: BoolparserIntent): unknown;
    create<I extends {
        definition?: string;
        participants?: {
            abbreviation?: string;
            address?: string;
        }[];
    } & {
        definition?: string;
        participants?: {
            abbreviation?: string;
            address?: string;
        }[] & ({
            abbreviation?: string;
            address?: string;
        } & {
            abbreviation?: string;
            address?: string;
        } & { [K in Exclude<keyof I["participants"][number], keyof IntentParticipant>]: never; })[] & { [K_1 in Exclude<keyof I["participants"], keyof {
            abbreviation?: string;
            address?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof BoolparserIntent>]: never; }>(base?: I): BoolparserIntent;
    fromPartial<I_1 extends {
        definition?: string;
        participants?: {
            abbreviation?: string;
            address?: string;
        }[];
    } & {
        definition?: string;
        participants?: {
            abbreviation?: string;
            address?: string;
        }[] & ({
            abbreviation?: string;
            address?: string;
        } & {
            abbreviation?: string;
            address?: string;
        } & { [K_3 in Exclude<keyof I_1["participants"][number], keyof IntentParticipant>]: never; })[] & { [K_4 in Exclude<keyof I_1["participants"], keyof {
            abbreviation?: string;
            address?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof BoolparserIntent>]: never; }>(object: I_1): BoolparserIntent;
};
export declare const IntentParticipant: {
    encode(message: IntentParticipant, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): IntentParticipant;
    fromJSON(object: any): IntentParticipant;
    toJSON(message: IntentParticipant): unknown;
    create<I extends {
        abbreviation?: string;
        address?: string;
    } & {
        abbreviation?: string;
        address?: string;
    } & { [K in Exclude<keyof I, keyof IntentParticipant>]: never; }>(base?: I): IntentParticipant;
    fromPartial<I_1 extends {
        abbreviation?: string;
        address?: string;
    } & {
        abbreviation?: string;
        address?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof IntentParticipant>]: never; }>(object: I_1): IntentParticipant;
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
