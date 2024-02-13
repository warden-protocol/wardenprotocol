import _m0 from "protobufjs/minimal";
import { BaseAccount } from "../../auth/v1beta1/auth";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.vesting.v1beta1";
/**
 * BaseVestingAccount implements the VestingAccount interface. It contains all
 * the necessary fields needed for any vesting account implementation.
 */
export interface BaseVestingAccount {
    baseAccount: BaseAccount | undefined;
    originalVesting: Coin[];
    delegatedFree: Coin[];
    delegatedVesting: Coin[];
    /** Vesting end time, as unix timestamp (in seconds). */
    endTime: number;
}
/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
export interface ContinuousVestingAccount {
    baseVestingAccount: BaseVestingAccount | undefined;
    /** Vesting start time, as unix timestamp (in seconds). */
    startTime: number;
}
/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
export interface DelayedVestingAccount {
    baseVestingAccount: BaseVestingAccount | undefined;
}
/** Period defines a length of time and amount of coins that will vest. */
export interface Period {
    /** Period duration in seconds. */
    length: number;
    amount: Coin[];
}
/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
export interface PeriodicVestingAccount {
    baseVestingAccount: BaseVestingAccount | undefined;
    startTime: number;
    vestingPeriods: Period[];
}
/**
 * PermanentLockedAccount implements the VestingAccount interface. It does
 * not ever release coins, locking them indefinitely. Coins in this account can
 * still be used for delegating and for governance votes even while locked.
 *
 * Since: cosmos-sdk 0.43
 */
export interface PermanentLockedAccount {
    baseVestingAccount: BaseVestingAccount | undefined;
}
export declare const BaseVestingAccount: {
    encode(message: BaseVestingAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BaseVestingAccount;
    fromJSON(object: any): BaseVestingAccount;
    toJSON(message: BaseVestingAccount): unknown;
    create<I extends {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        };
        originalVesting?: {
            denom?: string;
            amount?: string;
        }[];
        delegatedFree?: {
            denom?: string;
            amount?: string;
        }[];
        delegatedVesting?: {
            denom?: string;
            amount?: string;
        }[];
        endTime?: number;
    } & {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            accountNumber?: number;
            sequence?: number;
        } & { [K_1 in Exclude<keyof I["baseAccount"], keyof BaseAccount>]: never; };
        originalVesting?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I["originalVesting"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["originalVesting"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        delegatedFree?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["delegatedFree"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        delegatedVesting?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_6 in Exclude<keyof I["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_7 in Exclude<keyof I["delegatedVesting"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        endTime?: number;
    } & { [K_8 in Exclude<keyof I, keyof BaseVestingAccount>]: never; }>(base?: I): BaseVestingAccount;
    fromPartial<I_1 extends {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        };
        originalVesting?: {
            denom?: string;
            amount?: string;
        }[];
        delegatedFree?: {
            denom?: string;
            amount?: string;
        }[];
        delegatedVesting?: {
            denom?: string;
            amount?: string;
        }[];
        endTime?: number;
    } & {
        baseAccount?: {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            accountNumber?: number;
            sequence?: number;
        } & {
            address?: string;
            pubKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_9 in Exclude<keyof I_1["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            accountNumber?: number;
            sequence?: number;
        } & { [K_10 in Exclude<keyof I_1["baseAccount"], keyof BaseAccount>]: never; };
        originalVesting?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_11 in Exclude<keyof I_1["originalVesting"][number], keyof Coin>]: never; })[] & { [K_12 in Exclude<keyof I_1["originalVesting"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        delegatedFree?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_13 in Exclude<keyof I_1["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_14 in Exclude<keyof I_1["delegatedFree"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        delegatedVesting?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_15 in Exclude<keyof I_1["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_16 in Exclude<keyof I_1["delegatedVesting"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        endTime?: number;
    } & { [K_17 in Exclude<keyof I_1, keyof BaseVestingAccount>]: never; }>(object: I_1): BaseVestingAccount;
};
export declare const ContinuousVestingAccount: {
    encode(message: ContinuousVestingAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ContinuousVestingAccount;
    fromJSON(object: any): ContinuousVestingAccount;
    toJSON(message: ContinuousVestingAccount): unknown;
    create<I extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
        startTime?: number;
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_1 in Exclude<keyof I["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_2 in Exclude<keyof I["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_4 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_6 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_7 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_8 in Exclude<keyof I["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
        startTime?: number;
    } & { [K_9 in Exclude<keyof I, keyof ContinuousVestingAccount>]: never; }>(base?: I): ContinuousVestingAccount;
    fromPartial<I_1 extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
        startTime?: number;
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_10 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_11 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_12 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_13 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_14 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_15 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_16 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_17 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_18 in Exclude<keyof I_1["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
        startTime?: number;
    } & { [K_19 in Exclude<keyof I_1, keyof ContinuousVestingAccount>]: never; }>(object: I_1): ContinuousVestingAccount;
};
export declare const DelayedVestingAccount: {
    encode(message: DelayedVestingAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DelayedVestingAccount;
    fromJSON(object: any): DelayedVestingAccount;
    toJSON(message: DelayedVestingAccount): unknown;
    create<I extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_1 in Exclude<keyof I["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_2 in Exclude<keyof I["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_4 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_6 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_7 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_8 in Exclude<keyof I["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
    } & { [K_9 in Exclude<keyof I, "baseVestingAccount">]: never; }>(base?: I): DelayedVestingAccount;
    fromPartial<I_1 extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_10 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_11 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_12 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_13 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_14 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_15 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_16 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_17 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_18 in Exclude<keyof I_1["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
    } & { [K_19 in Exclude<keyof I_1, "baseVestingAccount">]: never; }>(object: I_1): DelayedVestingAccount;
};
export declare const Period: {
    encode(message: Period, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Period;
    fromJSON(object: any): Period;
    toJSON(message: Period): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof Period>]: never; }>(base?: I): Period;
    fromPartial<I_1 extends {
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
        } & { [K_3 in Exclude<keyof I_1["amount"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof Period>]: never; }>(object: I_1): Period;
};
export declare const PeriodicVestingAccount: {
    encode(message: PeriodicVestingAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PeriodicVestingAccount;
    fromJSON(object: any): PeriodicVestingAccount;
    toJSON(message: PeriodicVestingAccount): unknown;
    create<I extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
        startTime?: number;
        vestingPeriods?: {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_1 in Exclude<keyof I["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_2 in Exclude<keyof I["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_4 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_6 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_7 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_8 in Exclude<keyof I["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
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
            } & { [K_9 in Exclude<keyof I["vestingPeriods"][number]["amount"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I["vestingPeriods"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["vestingPeriods"][number], keyof Period>]: never; })[] & { [K_12 in Exclude<keyof I["vestingPeriods"], keyof {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I, keyof PeriodicVestingAccount>]: never; }>(base?: I): PeriodicVestingAccount;
    fromPartial<I_1 extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
        startTime?: number;
        vestingPeriods?: {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_14 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_15 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_16 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_17 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_18 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_19 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_20 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_21 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_22 in Exclude<keyof I_1["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
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
            } & { [K_23 in Exclude<keyof I_1["vestingPeriods"][number]["amount"][number], keyof Coin>]: never; })[] & { [K_24 in Exclude<keyof I_1["vestingPeriods"][number]["amount"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_25 in Exclude<keyof I_1["vestingPeriods"][number], keyof Period>]: never; })[] & { [K_26 in Exclude<keyof I_1["vestingPeriods"], keyof {
            length?: number;
            amount?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_27 in Exclude<keyof I_1, keyof PeriodicVestingAccount>]: never; }>(object: I_1): PeriodicVestingAccount;
};
export declare const PermanentLockedAccount: {
    encode(message: PermanentLockedAccount, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PermanentLockedAccount;
    fromJSON(object: any): PermanentLockedAccount;
    toJSON(message: PermanentLockedAccount): unknown;
    create<I extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_1 in Exclude<keyof I["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_2 in Exclude<keyof I["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_4 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_6 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_7 in Exclude<keyof I["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_8 in Exclude<keyof I["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
    } & { [K_9 in Exclude<keyof I, "baseVestingAccount">]: never; }>(base?: I): PermanentLockedAccount;
    fromPartial<I_1 extends {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        };
    } & {
        baseVestingAccount?: {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[];
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[];
            endTime?: number;
        } & {
            baseAccount?: {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
                accountNumber?: number;
                sequence?: number;
            } & {
                address?: string;
                pubKey?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_10 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"]["pubKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                accountNumber?: number;
                sequence?: number;
            } & { [K_11 in Exclude<keyof I_1["baseVestingAccount"]["baseAccount"], keyof BaseAccount>]: never; };
            originalVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_12 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"][number], keyof Coin>]: never; })[] & { [K_13 in Exclude<keyof I_1["baseVestingAccount"]["originalVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedFree?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_14 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"][number], keyof Coin>]: never; })[] & { [K_15 in Exclude<keyof I_1["baseVestingAccount"]["delegatedFree"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            delegatedVesting?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_16 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"][number], keyof Coin>]: never; })[] & { [K_17 in Exclude<keyof I_1["baseVestingAccount"]["delegatedVesting"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
            endTime?: number;
        } & { [K_18 in Exclude<keyof I_1["baseVestingAccount"], keyof BaseVestingAccount>]: never; };
    } & { [K_19 in Exclude<keyof I_1, "baseVestingAccount">]: never; }>(object: I_1): PermanentLockedAccount;
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
