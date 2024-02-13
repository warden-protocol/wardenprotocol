import _m0 from "protobufjs/minimal";
import { Delegation, Params, Redelegation, UnbondingDelegation, Validator } from "./staking";
export declare const protobufPackage = "cosmos.staking.v1beta1";
/** GenesisState defines the staking module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of related to deposit. */
    params: Params | undefined;
    /**
     * last_total_power tracks the total amounts of bonded tokens recorded during
     * the previous end block.
     */
    lastTotalPower: Uint8Array;
    /**
     * last_validator_powers is a special index that provides a historical list
     * of the last-block's bonded validators.
     */
    lastValidatorPowers: LastValidatorPower[];
    /** validators defines the validator set at genesis. */
    validators: Validator[];
    /** delegations defines the delegations active at genesis. */
    delegations: Delegation[];
    /** unbonding_delegations defines the unbonding delegations active at genesis. */
    unbondingDelegations: UnbondingDelegation[];
    /** redelegations defines the redelegations active at genesis. */
    redelegations: Redelegation[];
    /** exported defines a bool to identify whether the chain dealing with exported or initialized genesis. */
    exported: boolean;
}
/** LastValidatorPower required for validator set update logic. */
export interface LastValidatorPower {
    /** address is the address of the validator. */
    address: string;
    /** power defines the power of the validator. */
    power: number;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        };
        lastTotalPower?: Uint8Array;
        lastValidatorPowers?: {
            address?: string;
            power?: number;
        }[];
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
        delegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        }[];
        unbondingDelegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        redelegations?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        exported?: boolean;
    } & {
        params?: {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K in Exclude<keyof I["params"]["unbondingTime"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & { [K_1 in Exclude<keyof I["params"], keyof Params>]: never; };
        lastTotalPower?: Uint8Array;
        lastValidatorPowers?: {
            address?: string;
            power?: number;
        }[] & ({
            address?: string;
            power?: number;
        } & {
            address?: string;
            power?: number;
        } & { [K_2 in Exclude<keyof I["lastValidatorPowers"][number], keyof LastValidatorPower>]: never; })[] & { [K_3 in Exclude<keyof I["lastValidatorPowers"], keyof {
            address?: string;
            power?: number;
        }[]>]: never; };
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[] & ({
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I["validators"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_5 in Exclude<keyof I["validators"][number]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_6 in Exclude<keyof I["validators"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_7 in Exclude<keyof I["validators"][number]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_8 in Exclude<keyof I["validators"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_9 in Exclude<keyof I["validators"][number], keyof Validator>]: never; })[] & { [K_10 in Exclude<keyof I["validators"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
        delegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & { [K_11 in Exclude<keyof I["delegations"][number], keyof Delegation>]: never; })[] & { [K_12 in Exclude<keyof I["delegations"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        }[]>]: never; };
        unbondingDelegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_13 in Exclude<keyof I["unbondingDelegations"][number]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_14 in Exclude<keyof I["unbondingDelegations"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_15 in Exclude<keyof I["unbondingDelegations"][number], keyof UnbondingDelegation>]: never; })[] & { [K_16 in Exclude<keyof I["unbondingDelegations"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        redelegations?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_17 in Exclude<keyof I["redelegations"][number]["entries"][number], keyof import("./staking").RedelegationEntry>]: never; })[] & { [K_18 in Exclude<keyof I["redelegations"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_19 in Exclude<keyof I["redelegations"][number], keyof Redelegation>]: never; })[] & { [K_20 in Exclude<keyof I["redelegations"], keyof {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        exported?: boolean;
    } & { [K_21 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        };
        lastTotalPower?: Uint8Array;
        lastValidatorPowers?: {
            address?: string;
            power?: number;
        }[];
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
        delegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        }[];
        unbondingDelegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        redelegations?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[];
        exported?: boolean;
    } & {
        params?: {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & {
            unbondingTime?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_22 in Exclude<keyof I_1["params"]["unbondingTime"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            maxValidators?: number;
            maxEntries?: number;
            historicalEntries?: number;
            bondDenom?: string;
            minCommissionRate?: string;
        } & { [K_23 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        lastTotalPower?: Uint8Array;
        lastValidatorPowers?: {
            address?: string;
            power?: number;
        }[] & ({
            address?: string;
            power?: number;
        } & {
            address?: string;
            power?: number;
        } & { [K_24 in Exclude<keyof I_1["lastValidatorPowers"][number], keyof LastValidatorPower>]: never; })[] & { [K_25 in Exclude<keyof I_1["lastValidatorPowers"], keyof {
            address?: string;
            power?: number;
        }[]>]: never; };
        validators?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[] & ({
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        } & {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_26 in Exclude<keyof I_1["validators"][number]["consensusPubkey"], keyof import("../../../google/protobuf/any").Any>]: never; };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            } & { [K_27 in Exclude<keyof I_1["validators"][number]["description"], keyof import("./staking").Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_28 in Exclude<keyof I_1["validators"][number]["commission"]["commissionRates"], keyof import("./staking").CommissionRates>]: never; };
                updateTime?: Date;
            } & { [K_29 in Exclude<keyof I_1["validators"][number]["commission"], keyof import("./staking").Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_30 in Exclude<keyof I_1["validators"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_31 in Exclude<keyof I_1["validators"][number], keyof Validator>]: never; })[] & { [K_32 in Exclude<keyof I_1["validators"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: import("./staking").BondStatus;
            tokens?: string;
            delegatorShares?: string;
            description?: {
                moniker?: string;
                identity?: string;
                website?: string;
                securityContact?: string;
                details?: string;
            };
            unbondingHeight?: number;
            unbondingTime?: Date;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
        delegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & { [K_33 in Exclude<keyof I_1["delegations"][number], keyof Delegation>]: never; })[] & { [K_34 in Exclude<keyof I_1["delegations"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        }[]>]: never; };
        unbondingDelegations?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_35 in Exclude<keyof I_1["unbondingDelegations"][number]["entries"][number], keyof import("./staking").UnbondingDelegationEntry>]: never; })[] & { [K_36 in Exclude<keyof I_1["unbondingDelegations"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_37 in Exclude<keyof I_1["unbondingDelegations"][number], keyof UnbondingDelegation>]: never; })[] & { [K_38 in Exclude<keyof I_1["unbondingDelegations"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                balance?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        redelegations?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[] & ({
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        } & {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_39 in Exclude<keyof I_1["redelegations"][number]["entries"][number], keyof import("./staking").RedelegationEntry>]: never; })[] & { [K_40 in Exclude<keyof I_1["redelegations"][number]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_41 in Exclude<keyof I_1["redelegations"][number], keyof Redelegation>]: never; })[] & { [K_42 in Exclude<keyof I_1["redelegations"], keyof {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        }[]>]: never; };
        exported?: boolean;
    } & { [K_43 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const LastValidatorPower: {
    encode(message: LastValidatorPower, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): LastValidatorPower;
    fromJSON(object: any): LastValidatorPower;
    toJSON(message: LastValidatorPower): unknown;
    create<I extends {
        address?: string;
        power?: number;
    } & {
        address?: string;
        power?: number;
    } & { [K in Exclude<keyof I, keyof LastValidatorPower>]: never; }>(base?: I): LastValidatorPower;
    fromPartial<I_1 extends {
        address?: string;
        power?: number;
    } & {
        address?: string;
        power?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof LastValidatorPower>]: never; }>(object: I_1): LastValidatorPower;
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
