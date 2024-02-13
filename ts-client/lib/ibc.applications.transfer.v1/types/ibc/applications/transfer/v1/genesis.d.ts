import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { DenomTrace, Params } from "./transfer";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/** GenesisState defines the ibc-transfer genesis state */
export interface GenesisState {
    portId: string;
    denomTraces: DenomTrace[];
    params: Params | undefined;
    /**
     * total_escrowed contains the total amount of tokens escrowed
     * by the transfer module
     */
    totalEscrowed: Coin[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        portId?: string;
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[];
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        };
        totalEscrowed?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        portId?: string;
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[] & ({
            path?: string;
            baseDenom?: string;
        } & {
            path?: string;
            baseDenom?: string;
        } & { [K in Exclude<keyof I["denomTraces"][number], keyof DenomTrace>]: never; })[] & { [K_1 in Exclude<keyof I["denomTraces"], keyof {
            path?: string;
            baseDenom?: string;
        }[]>]: never; };
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; };
        totalEscrowed?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I["totalEscrowed"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I["totalEscrowed"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        portId?: string;
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[];
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        };
        totalEscrowed?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        portId?: string;
        denomTraces?: {
            path?: string;
            baseDenom?: string;
        }[] & ({
            path?: string;
            baseDenom?: string;
        } & {
            path?: string;
            baseDenom?: string;
        } & { [K_6 in Exclude<keyof I_1["denomTraces"][number], keyof DenomTrace>]: never; })[] & { [K_7 in Exclude<keyof I_1["denomTraces"], keyof {
            path?: string;
            baseDenom?: string;
        }[]>]: never; };
        params?: {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & {
            sendEnabled?: boolean;
            receiveEnabled?: boolean;
        } & { [K_8 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        totalEscrowed?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_9 in Exclude<keyof I_1["totalEscrowed"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I_1["totalEscrowed"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
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
