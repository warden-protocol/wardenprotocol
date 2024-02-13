import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.feegrant.v1beta1";
/** Since: cosmos-sdk 0.43 */
/**
 * BasicAllowance implements Allowance with a one-time grant of coins
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
export interface BasicAllowance {
    /**
     * spend_limit specifies the maximum amount of coins that can be spent
     * by this allowance and will be updated as coins are spent. If it is
     * empty, there is no spend limit and any amount of coins can be spent.
     */
    spendLimit: Coin[];
    /** expiration specifies an optional time when this allowance expires */
    expiration: Date | undefined;
}
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
export interface PeriodicAllowance {
    /** basic specifies a struct of `BasicAllowance` */
    basic: BasicAllowance | undefined;
    /**
     * period specifies the time duration in which period_spend_limit coins can
     * be spent before that allowance is reset
     */
    period: Duration | undefined;
    /**
     * period_spend_limit specifies the maximum number of coins that can be spent
     * in the period
     */
    periodSpendLimit: Coin[];
    /** period_can_spend is the number of coins left to be spent before the period_reset time */
    periodCanSpend: Coin[];
    /**
     * period_reset is the time at which this period resets and a new one begins,
     * it is calculated from the start time of the first transaction after the
     * last period ended
     */
    periodReset: Date | undefined;
}
/** AllowedMsgAllowance creates allowance only for specified message types. */
export interface AllowedMsgAllowance {
    /** allowance can be any of basic and periodic fee allowance. */
    allowance: Any | undefined;
    /** allowed_messages are the messages for which the grantee has the access. */
    allowedMessages: string[];
}
/** Grant is stored in the KVStore to record a grant with full context */
export interface Grant {
    /** granter is the address of the user granting an allowance of their funds. */
    granter: string;
    /** grantee is the address of the user being granted an allowance of another user's funds. */
    grantee: string;
    /** allowance can be any of basic, periodic, allowed fee allowance. */
    allowance: Any | undefined;
}
export declare const BasicAllowance: {
    encode(message: BasicAllowance, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BasicAllowance;
    fromJSON(object: any): BasicAllowance;
    toJSON(message: BasicAllowance): unknown;
    create<I extends {
        spendLimit?: {
            denom?: string;
            amount?: string;
        }[];
        expiration?: Date | undefined;
    } & {
        spendLimit?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["spendLimit"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["spendLimit"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        expiration?: Date | undefined;
    } & { [K_2 in Exclude<keyof I, keyof BasicAllowance>]: never; }>(base?: I): BasicAllowance;
    fromPartial<I_1 extends {
        spendLimit?: {
            denom?: string;
            amount?: string;
        }[];
        expiration?: Date | undefined;
    } & {
        spendLimit?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["spendLimit"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["spendLimit"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        expiration?: Date | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof BasicAllowance>]: never; }>(object: I_1): BasicAllowance;
};
export declare const PeriodicAllowance: {
    encode(message: PeriodicAllowance, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PeriodicAllowance;
    fromJSON(object: any): PeriodicAllowance;
    toJSON(message: PeriodicAllowance): unknown;
    create<I extends {
        basic?: {
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            expiration?: Date | undefined;
        };
        period?: {
            seconds?: number;
            nanos?: number;
        };
        periodSpendLimit?: {
            denom?: string;
            amount?: string;
        }[];
        periodCanSpend?: {
            denom?: string;
            amount?: string;
        }[];
        periodReset?: Date | undefined;
    } & {
        basic?: {
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            expiration?: Date | undefined;
        } & {
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["basic"]["spendLimit"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["basic"]["spendLimit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            expiration?: Date | undefined;
        } & { [K_2 in Exclude<keyof I["basic"], keyof BasicAllowance>]: never; };
        period?: {
            seconds?: number;
            nanos?: number;
        } & {
            seconds?: number;
            nanos?: number;
        } & { [K_3 in Exclude<keyof I["period"], keyof Duration>]: never; };
        periodSpendLimit?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I["periodSpendLimit"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["periodSpendLimit"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        periodCanSpend?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_6 in Exclude<keyof I["periodCanSpend"][number], keyof Coin>]: never; })[] & { [K_7 in Exclude<keyof I["periodCanSpend"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        periodReset?: Date | undefined;
    } & { [K_8 in Exclude<keyof I, keyof PeriodicAllowance>]: never; }>(base?: I): PeriodicAllowance;
    fromPartial<I_1 extends {
        basic?: {
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            expiration?: Date | undefined;
        };
        period?: {
            seconds?: number;
            nanos?: number;
        };
        periodSpendLimit?: {
            denom?: string;
            amount?: string;
        }[];
        periodCanSpend?: {
            denom?: string;
            amount?: string;
        }[];
        periodReset?: Date | undefined;
    } & {
        basic?: {
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            expiration?: Date | undefined;
        } & {
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_9 in Exclude<keyof I_1["basic"]["spendLimit"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I_1["basic"]["spendLimit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            expiration?: Date | undefined;
        } & { [K_11 in Exclude<keyof I_1["basic"], keyof BasicAllowance>]: never; };
        period?: {
            seconds?: number;
            nanos?: number;
        } & {
            seconds?: number;
            nanos?: number;
        } & { [K_12 in Exclude<keyof I_1["period"], keyof Duration>]: never; };
        periodSpendLimit?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_13 in Exclude<keyof I_1["periodSpendLimit"][number], keyof Coin>]: never; })[] & { [K_14 in Exclude<keyof I_1["periodSpendLimit"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        periodCanSpend?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_15 in Exclude<keyof I_1["periodCanSpend"][number], keyof Coin>]: never; })[] & { [K_16 in Exclude<keyof I_1["periodCanSpend"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        periodReset?: Date | undefined;
    } & { [K_17 in Exclude<keyof I_1, keyof PeriodicAllowance>]: never; }>(object: I_1): PeriodicAllowance;
};
export declare const AllowedMsgAllowance: {
    encode(message: AllowedMsgAllowance, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AllowedMsgAllowance;
    fromJSON(object: any): AllowedMsgAllowance;
    toJSON(message: AllowedMsgAllowance): unknown;
    create<I extends {
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        allowedMessages?: string[];
    } & {
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["allowance"], keyof Any>]: never; };
        allowedMessages?: string[] & string[] & { [K_1 in Exclude<keyof I["allowedMessages"], keyof string[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof AllowedMsgAllowance>]: never; }>(base?: I): AllowedMsgAllowance;
    fromPartial<I_1 extends {
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        allowedMessages?: string[];
    } & {
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["allowance"], keyof Any>]: never; };
        allowedMessages?: string[] & string[] & { [K_4 in Exclude<keyof I_1["allowedMessages"], keyof string[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof AllowedMsgAllowance>]: never; }>(object: I_1): AllowedMsgAllowance;
};
export declare const Grant: {
    encode(message: Grant, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Grant;
    fromJSON(object: any): Grant;
    toJSON(message: Grant): unknown;
    create<I extends {
        granter?: string;
        grantee?: string;
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        granter?: string;
        grantee?: string;
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["allowance"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Grant>]: never; }>(base?: I): Grant;
    fromPartial<I_1 extends {
        granter?: string;
        grantee?: string;
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        granter?: string;
        grantee?: string;
        allowance?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["allowance"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Grant>]: never; }>(object: I_1): Grant;
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
