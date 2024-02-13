import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
import { Period } from "./vesting";
export declare const protobufPackage = "cosmos.vesting.v1beta1";
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 */
export interface MsgCreateVestingAccount {
    fromAddress: string;
    toAddress: string;
    amount: Coin[];
    /** end of vesting as unix time (in seconds). */
    endTime: number;
    delayed: boolean;
}
/** MsgCreateVestingAccountResponse defines the Msg/CreateVestingAccount response type. */
export interface MsgCreateVestingAccountResponse {
}
/**
 * MsgCreatePermanentLockedAccount defines a message that enables creating a permanent
 * locked account.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCreatePermanentLockedAccount {
    fromAddress: string;
    toAddress: string;
    amount: Coin[];
}
/**
 * MsgCreatePermanentLockedAccountResponse defines the Msg/CreatePermanentLockedAccount response type.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCreatePermanentLockedAccountResponse {
}
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting
 * account.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCreatePeriodicVestingAccount {
    fromAddress: string;
    toAddress: string;
    /** start of vesting as unix time (in seconds). */
    startTime: number;
    vestingPeriods: Period[];
}
/**
 * MsgCreateVestingAccountResponse defines the Msg/CreatePeriodicVestingAccount
 * response type.
 *
 * Since: cosmos-sdk 0.46
 */
export interface MsgCreatePeriodicVestingAccountResponse {
}
export declare const MsgCreateVestingAccount: {
    encode(message: MsgCreateVestingAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateVestingAccount;
    fromJSON(object: any): MsgCreateVestingAccount;
    toJSON(message: MsgCreateVestingAccount): unknown;
    create<I extends {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
        endTime?: number;
        delayed?: boolean;
    } & {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        endTime?: number;
        delayed?: boolean;
    } & { [K_2 in Exclude<keyof I, keyof MsgCreateVestingAccount>]: never; }>(base?: I): MsgCreateVestingAccount;
    fromPartial<I_1 extends {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
        endTime?: number;
        delayed?: boolean;
    } & {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["amount"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        endTime?: number;
        delayed?: boolean;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgCreateVestingAccount>]: never; }>(object: I_1): MsgCreateVestingAccount;
};
export declare const MsgCreateVestingAccountResponse: {
    encode(_: MsgCreateVestingAccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateVestingAccountResponse;
    fromJSON(_: any): MsgCreateVestingAccountResponse;
    toJSON(_: MsgCreateVestingAccountResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgCreateVestingAccountResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgCreateVestingAccountResponse;
};
export declare const MsgCreatePermanentLockedAccount: {
    encode(message: MsgCreatePermanentLockedAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePermanentLockedAccount;
    fromJSON(object: any): MsgCreatePermanentLockedAccount;
    toJSON(message: MsgCreatePermanentLockedAccount): unknown;
    create<I extends {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgCreatePermanentLockedAccount>]: never; }>(base?: I): MsgCreatePermanentLockedAccount;
    fromPartial<I_1 extends {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["amount"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgCreatePermanentLockedAccount>]: never; }>(object: I_1): MsgCreatePermanentLockedAccount;
};
export declare const MsgCreatePermanentLockedAccountResponse: {
    encode(_: MsgCreatePermanentLockedAccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePermanentLockedAccountResponse;
    fromJSON(_: any): MsgCreatePermanentLockedAccountResponse;
    toJSON(_: MsgCreatePermanentLockedAccountResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgCreatePermanentLockedAccountResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgCreatePermanentLockedAccountResponse;
};
export declare const MsgCreatePeriodicVestingAccount: {
    encode(message: MsgCreatePeriodicVestingAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePeriodicVestingAccount;
    fromJSON(object: any): MsgCreatePeriodicVestingAccount;
    toJSON(message: MsgCreatePeriodicVestingAccount): unknown;
    create<I extends {
        fromAddress?: string;
        toAddress?: string;
        startTime?: number;
        vestingPeriods?: {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        fromAddress?: string;
        toAddress?: string;
        startTime?: number;
        vestingPeriods?: {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["vestingPeriods"][number]["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["vestingPeriods"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["vestingPeriods"][number], keyof Period>]: never; })[] & { [K_3 in Exclude<keyof I["vestingPeriods"], keyof {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof MsgCreatePeriodicVestingAccount>]: never; }>(base?: I): MsgCreatePeriodicVestingAccount;
    fromPartial<I_1 extends {
        fromAddress?: string;
        toAddress?: string;
        startTime?: number;
        vestingPeriods?: {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        fromAddress?: string;
        toAddress?: string;
        startTime?: number;
        vestingPeriods?: {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_5 in Exclude<keyof I_1["vestingPeriods"][number]["amount"][number], keyof Coin>]: never; })[] & { [K_6 in Exclude<keyof I_1["vestingPeriods"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I_1["vestingPeriods"][number], keyof Period>]: never; })[] & { [K_8 in Exclude<keyof I_1["vestingPeriods"], keyof {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof MsgCreatePeriodicVestingAccount>]: never; }>(object: I_1): MsgCreatePeriodicVestingAccount;
};
export declare const MsgCreatePeriodicVestingAccountResponse: {
    encode(_: MsgCreatePeriodicVestingAccountResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreatePeriodicVestingAccountResponse;
    fromJSON(_: any): MsgCreatePeriodicVestingAccountResponse;
    toJSON(_: MsgCreatePeriodicVestingAccountResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgCreatePeriodicVestingAccountResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgCreatePeriodicVestingAccountResponse;
};
/** Msg defines the bank Msg service. */
export interface Msg {
    /**
     * CreateVestingAccount defines a method that enables creating a vesting
     * account.
     */
    CreateVestingAccount(request: MsgCreateVestingAccount): Promise<MsgCreateVestingAccountResponse>;
    /**
     * CreatePermanentLockedAccount defines a method that enables creating a permanent
     * locked account.
     *
     * Since: cosmos-sdk 0.46
     */
    CreatePermanentLockedAccount(request: MsgCreatePermanentLockedAccount): Promise<MsgCreatePermanentLockedAccountResponse>;
    /**
     * CreatePeriodicVestingAccount defines a method that enables creating a
     * periodic vesting account.
     *
     * Since: cosmos-sdk 0.46
     */
    CreatePeriodicVestingAccount(request: MsgCreatePeriodicVestingAccount): Promise<MsgCreatePeriodicVestingAccountResponse>;
}
export declare const MsgServiceName = "cosmos.vesting.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    CreateVestingAccount(request: MsgCreateVestingAccount): Promise<MsgCreateVestingAccountResponse>;
    CreatePermanentLockedAccount(request: MsgCreatePermanentLockedAccount): Promise<MsgCreatePermanentLockedAccountResponse>;
    CreatePeriodicVestingAccount(request: MsgCreatePeriodicVestingAccount): Promise<MsgCreatePeriodicVestingAccountResponse>;
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
