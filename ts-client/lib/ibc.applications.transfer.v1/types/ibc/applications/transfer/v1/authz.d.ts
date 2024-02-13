import _m0 from "protobufjs/minimal";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
export declare const protobufPackage = "ibc.applications.transfer.v1";
/** Allocation defines the spend limit for a particular port and channel */
export interface Allocation {
    /** the port on which the packet will be sent */
    sourcePort: string;
    /** the channel by which the packet will be sent */
    sourceChannel: string;
    /** spend limitation on the channel */
    spendLimit: Coin[];
    /** allow list of receivers, an empty allow list permits any receiver address */
    allowList: string[];
}
/**
 * TransferAuthorization allows the grantee to spend up to spend_limit coins from
 * the granter's account for ibc transfer on a specific channel
 */
export interface TransferAuthorization {
    /** port and channel amounts */
    allocations: Allocation[];
}
export declare const Allocation: {
    encode(message: Allocation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Allocation;
    fromJSON(object: any): Allocation;
    toJSON(message: Allocation): unknown;
    create<I extends {
        sourcePort?: string;
        sourceChannel?: string;
        spendLimit?: {
            denom?: string;
            amount?: string;
        }[];
        allowList?: string[];
    } & {
        sourcePort?: string;
        sourceChannel?: string;
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
        allowList?: string[] & string[] & { [K_2 in Exclude<keyof I["allowList"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof Allocation>]: never; }>(base?: I): Allocation;
    fromPartial<I_1 extends {
        sourcePort?: string;
        sourceChannel?: string;
        spendLimit?: {
            denom?: string;
            amount?: string;
        }[];
        allowList?: string[];
    } & {
        sourcePort?: string;
        sourceChannel?: string;
        spendLimit?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I_1["spendLimit"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I_1["spendLimit"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        allowList?: string[] & string[] & { [K_6 in Exclude<keyof I_1["allowList"], keyof string[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof Allocation>]: never; }>(object: I_1): Allocation;
};
export declare const TransferAuthorization: {
    encode(message: TransferAuthorization, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TransferAuthorization;
    fromJSON(object: any): TransferAuthorization;
    toJSON(message: TransferAuthorization): unknown;
    create<I extends {
        allocations?: {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        }[];
    } & {
        allocations?: {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        }[] & ({
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        } & {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["allocations"][number]["spendLimit"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["allocations"][number]["spendLimit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            allowList?: string[] & string[] & { [K_2 in Exclude<keyof I["allocations"][number]["allowList"], keyof string[]>]: never; };
        } & { [K_3 in Exclude<keyof I["allocations"][number], keyof Allocation>]: never; })[] & { [K_4 in Exclude<keyof I["allocations"], keyof {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I, "allocations">]: never; }>(base?: I): TransferAuthorization;
    fromPartial<I_1 extends {
        allocations?: {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        }[];
    } & {
        allocations?: {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        }[] & ({
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        } & {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_6 in Exclude<keyof I_1["allocations"][number]["spendLimit"][number], keyof Coin>]: never; })[] & { [K_7 in Exclude<keyof I_1["allocations"][number]["spendLimit"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            allowList?: string[] & string[] & { [K_8 in Exclude<keyof I_1["allocations"][number]["allowList"], keyof string[]>]: never; };
        } & { [K_9 in Exclude<keyof I_1["allocations"][number], keyof Allocation>]: never; })[] & { [K_10 in Exclude<keyof I_1["allocations"], keyof {
            sourcePort?: string;
            sourceChannel?: string;
            spendLimit?: {
                denom?: string;
                amount?: string;
            }[];
            allowList?: string[];
        }[]>]: never; };
    } & { [K_11 in Exclude<keyof I_1, "allocations">]: never; }>(object: I_1): TransferAuthorization;
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
