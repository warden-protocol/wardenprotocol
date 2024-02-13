import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
import { Metadata, Params, SendEnabled } from "./bank";
export declare const protobufPackage = "cosmos.bank.v1beta1";
/** GenesisState defines the bank module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    /** balances is an array containing the balances of all the accounts. */
    balances: Balance[];
    /**
     * supply represents the total supply. If it is left empty, then supply will be calculated based on the provided
     * balances. Otherwise, it will be used to validate that the sum of the balances equals this amount.
     */
    supply: Coin[];
    /** denom_metadata defines the metadata of the different coins. */
    denomMetadata: Metadata[];
    /**
     * send_enabled defines the denoms where send is enabled or disabled.
     *
     * Since: cosmos-sdk 0.47
     */
    sendEnabled: SendEnabled[];
}
/**
 * Balance defines an account address and balance pair used in the bank module's
 * genesis state.
 */
export interface Balance {
    /** address is the address of the balance holder. */
    address: string;
    /** coins defines the different coins this balance holds. */
    coins: Coin[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        };
        balances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        supply?: {
            denom?: string;
            amount?: string;
        }[];
        denomMetadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[];
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
    } & {
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        } & {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[] & ({
                denom?: string;
                enabled?: boolean;
            } & {
                denom?: string;
                enabled?: boolean;
            } & { [K in Exclude<keyof I["params"]["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_1 in Exclude<keyof I["params"]["sendEnabled"], keyof {
                denom?: string;
                enabled?: boolean;
            }[]>]: never; };
            defaultSendEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; };
        balances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_3 in Exclude<keyof I["balances"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I["balances"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_5 in Exclude<keyof I["balances"][number], keyof Balance>]: never; })[] & { [K_6 in Exclude<keyof I["balances"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        supply?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_7 in Exclude<keyof I["supply"][number], keyof Coin>]: never; })[] & { [K_8 in Exclude<keyof I["supply"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        denomMetadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[] & ({
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K_9 in Exclude<keyof I["denomMetadata"][number]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_10 in Exclude<keyof I["denomMetadata"][number]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_11 in Exclude<keyof I["denomMetadata"][number]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_12 in Exclude<keyof I["denomMetadata"][number], keyof Metadata>]: never; })[] & { [K_13 in Exclude<keyof I["denomMetadata"], keyof {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[]>]: never; };
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[] & ({
            denom?: string;
            enabled?: boolean;
        } & {
            denom?: string;
            enabled?: boolean;
        } & { [K_14 in Exclude<keyof I["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_15 in Exclude<keyof I["sendEnabled"], keyof {
            denom?: string;
            enabled?: boolean;
        }[]>]: never; };
    } & { [K_16 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        };
        balances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        supply?: {
            denom?: string;
            amount?: string;
        }[];
        denomMetadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[];
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
    } & {
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        } & {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[] & ({
                denom?: string;
                enabled?: boolean;
            } & {
                denom?: string;
                enabled?: boolean;
            } & { [K_17 in Exclude<keyof I_1["params"]["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_18 in Exclude<keyof I_1["params"]["sendEnabled"], keyof {
                denom?: string;
                enabled?: boolean;
            }[]>]: never; };
            defaultSendEnabled?: boolean;
        } & { [K_19 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        balances?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_20 in Exclude<keyof I_1["balances"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_21 in Exclude<keyof I_1["balances"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_22 in Exclude<keyof I_1["balances"][number], keyof Balance>]: never; })[] & { [K_23 in Exclude<keyof I_1["balances"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        supply?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_24 in Exclude<keyof I_1["supply"][number], keyof Coin>]: never; })[] & { [K_25 in Exclude<keyof I_1["supply"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        denomMetadata?: {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[] & ({
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[] & ({
                denom?: string;
                exponent?: number;
                aliases?: string[];
            } & {
                denom?: string;
                exponent?: number;
                aliases?: string[] & string[] & { [K_26 in Exclude<keyof I_1["denomMetadata"][number]["denomUnits"][number]["aliases"], keyof string[]>]: never; };
            } & { [K_27 in Exclude<keyof I_1["denomMetadata"][number]["denomUnits"][number], keyof import("./bank").DenomUnit>]: never; })[] & { [K_28 in Exclude<keyof I_1["denomMetadata"][number]["denomUnits"], keyof {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[]>]: never; };
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        } & { [K_29 in Exclude<keyof I_1["denomMetadata"][number], keyof Metadata>]: never; })[] & { [K_30 in Exclude<keyof I_1["denomMetadata"], keyof {
            description?: string;
            denomUnits?: {
                denom?: string;
                exponent?: number;
                aliases?: string[];
            }[];
            base?: string;
            display?: string;
            name?: string;
            symbol?: string;
            uri?: string;
            uriHash?: string;
        }[]>]: never; };
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[] & ({
            denom?: string;
            enabled?: boolean;
        } & {
            denom?: string;
            enabled?: boolean;
        } & { [K_31 in Exclude<keyof I_1["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_32 in Exclude<keyof I_1["sendEnabled"], keyof {
            denom?: string;
            enabled?: boolean;
        }[]>]: never; };
    } & { [K_33 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const Balance: {
    encode(message: Balance, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Balance;
    fromJSON(object: any): Balance;
    toJSON(message: Balance): unknown;
    create<I extends {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["coins"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["coins"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof Balance>]: never; }>(base?: I): Balance;
    fromPartial<I_1 extends {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        address?: string;
        coins?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["coins"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["coins"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof Balance>]: never; }>(object: I_1): Balance;
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
