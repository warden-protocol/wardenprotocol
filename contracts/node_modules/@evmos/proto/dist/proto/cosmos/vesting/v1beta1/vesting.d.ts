import * as dependency_2 from "./../../base/v1beta1/coin";
import * as dependency_3 from "./../../auth/v1beta1/auth";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.vesting.v1beta1 {
    class BaseVestingAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_account?: dependency_3.cosmos.auth.v1beta1.BaseAccount;
            original_vesting?: dependency_2.cosmos.base.v1beta1.Coin[];
            delegated_free?: dependency_2.cosmos.base.v1beta1.Coin[];
            delegated_vesting?: dependency_2.cosmos.base.v1beta1.Coin[];
            end_time?: number;
        });
        get base_account(): dependency_3.cosmos.auth.v1beta1.BaseAccount;
        set base_account(value: dependency_3.cosmos.auth.v1beta1.BaseAccount);
        get original_vesting(): dependency_2.cosmos.base.v1beta1.Coin[];
        set original_vesting(value: dependency_2.cosmos.base.v1beta1.Coin[]);
        get delegated_free(): dependency_2.cosmos.base.v1beta1.Coin[];
        set delegated_free(value: dependency_2.cosmos.base.v1beta1.Coin[]);
        get delegated_vesting(): dependency_2.cosmos.base.v1beta1.Coin[];
        set delegated_vesting(value: dependency_2.cosmos.base.v1beta1.Coin[]);
        get end_time(): number;
        set end_time(value: number);
        static fromObject(data: {
            base_account?: ReturnType<typeof dependency_3.cosmos.auth.v1beta1.BaseAccount.prototype.toObject>;
            original_vesting?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            delegated_free?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            delegated_vesting?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            end_time?: number;
        }): BaseVestingAccount;
        toObject(): {
            base_account?: {
                address?: string | undefined;
                pub_key?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
                account_number?: number | undefined;
                sequence?: number | undefined;
            } | undefined;
            original_vesting?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            delegated_free?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            delegated_vesting?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            end_time?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BaseVestingAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BaseVestingAccount;
    }
    class ContinuousVestingAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_vesting_account?: BaseVestingAccount;
            start_time?: number;
        });
        get base_vesting_account(): BaseVestingAccount;
        set base_vesting_account(value: BaseVestingAccount);
        get start_time(): number;
        set start_time(value: number);
        static fromObject(data: {
            base_vesting_account?: ReturnType<typeof BaseVestingAccount.prototype.toObject>;
            start_time?: number;
        }): ContinuousVestingAccount;
        toObject(): {
            base_vesting_account?: {
                base_account?: {
                    address?: string | undefined;
                    pub_key?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    } | undefined;
                    account_number?: number | undefined;
                    sequence?: number | undefined;
                } | undefined;
                original_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_free?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                end_time?: number | undefined;
            } | undefined;
            start_time?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ContinuousVestingAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ContinuousVestingAccount;
    }
    class DelayedVestingAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_vesting_account?: BaseVestingAccount;
        });
        get base_vesting_account(): BaseVestingAccount;
        set base_vesting_account(value: BaseVestingAccount);
        static fromObject(data: {
            base_vesting_account?: ReturnType<typeof BaseVestingAccount.prototype.toObject>;
        }): DelayedVestingAccount;
        toObject(): {
            base_vesting_account?: {
                base_account?: {
                    address?: string | undefined;
                    pub_key?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    } | undefined;
                    account_number?: number | undefined;
                    sequence?: number | undefined;
                } | undefined;
                original_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_free?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                end_time?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelayedVestingAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelayedVestingAccount;
    }
    class Period extends pb_1.Message {
        constructor(data?: any[] | {
            length?: number;
            amount?: dependency_2.cosmos.base.v1beta1.Coin[];
        });
        get length(): number;
        set length(value: number);
        get amount(): dependency_2.cosmos.base.v1beta1.Coin[];
        set amount(value: dependency_2.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            length?: number;
            amount?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): Period;
        toObject(): {
            length?: number | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Period;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Period;
    }
    class PeriodicVestingAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_vesting_account?: BaseVestingAccount;
            start_time?: number;
            vesting_periods?: Period[];
        });
        get base_vesting_account(): BaseVestingAccount;
        set base_vesting_account(value: BaseVestingAccount);
        get start_time(): number;
        set start_time(value: number);
        get vesting_periods(): Period[];
        set vesting_periods(value: Period[]);
        static fromObject(data: {
            base_vesting_account?: ReturnType<typeof BaseVestingAccount.prototype.toObject>;
            start_time?: number;
            vesting_periods?: ReturnType<typeof Period.prototype.toObject>[];
        }): PeriodicVestingAccount;
        toObject(): {
            base_vesting_account?: {
                base_account?: {
                    address?: string | undefined;
                    pub_key?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    } | undefined;
                    account_number?: number | undefined;
                    sequence?: number | undefined;
                } | undefined;
                original_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_free?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                end_time?: number | undefined;
            } | undefined;
            start_time?: number | undefined;
            vesting_periods?: {
                length?: number | undefined;
                amount?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PeriodicVestingAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PeriodicVestingAccount;
    }
    class PermanentLockedAccount extends pb_1.Message {
        constructor(data?: any[] | {
            base_vesting_account?: BaseVestingAccount;
        });
        get base_vesting_account(): BaseVestingAccount;
        set base_vesting_account(value: BaseVestingAccount);
        static fromObject(data: {
            base_vesting_account?: ReturnType<typeof BaseVestingAccount.prototype.toObject>;
        }): PermanentLockedAccount;
        toObject(): {
            base_vesting_account?: {
                base_account?: {
                    address?: string | undefined;
                    pub_key?: {
                        type_url?: string | undefined;
                        value?: Uint8Array | undefined;
                    } | undefined;
                    account_number?: number | undefined;
                    sequence?: number | undefined;
                } | undefined;
                original_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_free?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                delegated_vesting?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                end_time?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PermanentLockedAccount;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PermanentLockedAccount;
    }
}
//# sourceMappingURL=vesting.d.ts.map