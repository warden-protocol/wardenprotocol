import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { Duration } from "../../../google/protobuf/duration";
import { ValidatorUpdate } from "../../../tendermint/abci/types";
import { Header } from "../../../tendermint/types/types";
import { Coin } from "../../base/v1beta1/coin";
export declare const protobufPackage = "cosmos.staking.v1beta1";
/** BondStatus is the status of a validator. */
export declare enum BondStatus {
    /** BOND_STATUS_UNSPECIFIED - UNSPECIFIED defines an invalid validator status. */
    BOND_STATUS_UNSPECIFIED = 0,
    /** BOND_STATUS_UNBONDED - UNBONDED defines a validator that is not bonded. */
    BOND_STATUS_UNBONDED = 1,
    /** BOND_STATUS_UNBONDING - UNBONDING defines a validator that is unbonding. */
    BOND_STATUS_UNBONDING = 2,
    /** BOND_STATUS_BONDED - BONDED defines a validator that is bonded. */
    BOND_STATUS_BONDED = 3,
    UNRECOGNIZED = -1
}
export declare function bondStatusFromJSON(object: any): BondStatus;
export declare function bondStatusToJSON(object: BondStatus): string;
/** Infraction indicates the infraction a validator commited. */
export declare enum Infraction {
    /** INFRACTION_UNSPECIFIED - UNSPECIFIED defines an empty infraction. */
    INFRACTION_UNSPECIFIED = 0,
    /** INFRACTION_DOUBLE_SIGN - DOUBLE_SIGN defines a validator that double-signs a block. */
    INFRACTION_DOUBLE_SIGN = 1,
    /** INFRACTION_DOWNTIME - DOWNTIME defines a validator that missed signing too many blocks. */
    INFRACTION_DOWNTIME = 2,
    UNRECOGNIZED = -1
}
export declare function infractionFromJSON(object: any): Infraction;
export declare function infractionToJSON(object: Infraction): string;
/**
 * HistoricalInfo contains header and validator information for a given block.
 * It is stored as part of staking module's state, which persists the `n` most
 * recent HistoricalInfo
 * (`n` is set by the staking module's `historical_entries` parameter).
 */
export interface HistoricalInfo {
    header: Header | undefined;
    valset: Validator[];
}
/**
 * CommissionRates defines the initial commission rates to be used for creating
 * a validator.
 */
export interface CommissionRates {
    /** rate is the commission rate charged to delegators, as a fraction. */
    rate: string;
    /** max_rate defines the maximum commission rate which validator can ever charge, as a fraction. */
    maxRate: string;
    /** max_change_rate defines the maximum daily increase of the validator commission, as a fraction. */
    maxChangeRate: string;
}
/** Commission defines commission parameters for a given validator. */
export interface Commission {
    /** commission_rates defines the initial commission rates to be used for creating a validator. */
    commissionRates: CommissionRates | undefined;
    /** update_time is the last time the commission rate was changed. */
    updateTime: Date | undefined;
}
/** Description defines a validator description. */
export interface Description {
    /** moniker defines a human-readable name for the validator. */
    moniker: string;
    /** identity defines an optional identity signature (ex. UPort or Keybase). */
    identity: string;
    /** website defines an optional website link. */
    website: string;
    /** security_contact defines an optional email for security contact. */
    securityContact: string;
    /** details define other optional details. */
    details: string;
}
/**
 * Validator defines a validator, together with the total amount of the
 * Validator's bond shares and their exchange rate to coins. Slashing results in
 * a decrease in the exchange rate, allowing correct calculation of future
 * undelegations without iterating over delegators. When coins are delegated to
 * this validator, the validator is credited with a delegation whose number of
 * bond shares is based on the amount of coins delegated divided by the current
 * exchange rate. Voting power can be calculated as total bonded shares
 * multiplied by exchange rate.
 */
export interface Validator {
    /** operator_address defines the address of the validator's operator; bech encoded in JSON. */
    operatorAddress: string;
    /** consensus_pubkey is the consensus public key of the validator, as a Protobuf Any. */
    consensusPubkey: Any | undefined;
    /** jailed defined whether the validator has been jailed from bonded status or not. */
    jailed: boolean;
    /** status is the validator status (bonded/unbonding/unbonded). */
    status: BondStatus;
    /** tokens define the delegated tokens (incl. self-delegation). */
    tokens: string;
    /** delegator_shares defines total shares issued to a validator's delegators. */
    delegatorShares: string;
    /** description defines the description terms for the validator. */
    description: Description | undefined;
    /** unbonding_height defines, if unbonding, the height at which this validator has begun unbonding. */
    unbondingHeight: number;
    /** unbonding_time defines, if unbonding, the min time for the validator to complete unbonding. */
    unbondingTime: Date | undefined;
    /** commission defines the commission parameters. */
    commission: Commission | undefined;
    /**
     * min_self_delegation is the validator's self declared minimum self delegation.
     *
     * Since: cosmos-sdk 0.46
     */
    minSelfDelegation: string;
    /** strictly positive if this validator's unbonding has been stopped by external modules */
    unbondingOnHoldRefCount: number;
    /** list of unbonding ids, each uniquely identifing an unbonding of this validator */
    unbondingIds: number[];
}
/** ValAddresses defines a repeated set of validator addresses. */
export interface ValAddresses {
    addresses: string[];
}
/**
 * DVPair is struct that just has a delegator-validator pair with no other data.
 * It is intended to be used as a marshalable pointer. For example, a DVPair can
 * be used to construct the key to getting an UnbondingDelegation from state.
 */
export interface DVPair {
    delegatorAddress: string;
    validatorAddress: string;
}
/** DVPairs defines an array of DVPair objects. */
export interface DVPairs {
    pairs: DVPair[];
}
/**
 * DVVTriplet is struct that just has a delegator-validator-validator triplet
 * with no other data. It is intended to be used as a marshalable pointer. For
 * example, a DVVTriplet can be used to construct the key to getting a
 * Redelegation from state.
 */
export interface DVVTriplet {
    delegatorAddress: string;
    validatorSrcAddress: string;
    validatorDstAddress: string;
}
/** DVVTriplets defines an array of DVVTriplet objects. */
export interface DVVTriplets {
    triplets: DVVTriplet[];
}
/**
 * Delegation represents the bond with tokens held by an account. It is
 * owned by one delegator, and is associated with the voting power of one
 * validator.
 */
export interface Delegation {
    /** delegator_address is the encoded address of the delegator. */
    delegatorAddress: string;
    /** validator_address is the encoded address of the validator. */
    validatorAddress: string;
    /** shares define the delegation shares received. */
    shares: string;
}
/**
 * UnbondingDelegation stores all of a single delegator's unbonding bonds
 * for a single validator in an time-ordered list.
 */
export interface UnbondingDelegation {
    /** delegator_address is the encoded address of the delegator. */
    delegatorAddress: string;
    /** validator_address is the encoded address of the validator. */
    validatorAddress: string;
    /** entries are the unbonding delegation entries. */
    entries: UnbondingDelegationEntry[];
}
/** UnbondingDelegationEntry defines an unbonding object with relevant metadata. */
export interface UnbondingDelegationEntry {
    /** creation_height is the height which the unbonding took place. */
    creationHeight: number;
    /** completion_time is the unix time for unbonding completion. */
    completionTime: Date | undefined;
    /** initial_balance defines the tokens initially scheduled to receive at completion. */
    initialBalance: string;
    /** balance defines the tokens to receive at completion. */
    balance: string;
    /** Incrementing id that uniquely identifies this entry */
    unbondingId: number;
    /** Strictly positive if this entry's unbonding has been stopped by external modules */
    unbondingOnHoldRefCount: number;
}
/** RedelegationEntry defines a redelegation object with relevant metadata. */
export interface RedelegationEntry {
    /** creation_height  defines the height which the redelegation took place. */
    creationHeight: number;
    /** completion_time defines the unix time for redelegation completion. */
    completionTime: Date | undefined;
    /** initial_balance defines the initial balance when redelegation started. */
    initialBalance: string;
    /** shares_dst is the amount of destination-validator shares created by redelegation. */
    sharesDst: string;
    /** Incrementing id that uniquely identifies this entry */
    unbondingId: number;
    /** Strictly positive if this entry's unbonding has been stopped by external modules */
    unbondingOnHoldRefCount: number;
}
/**
 * Redelegation contains the list of a particular delegator's redelegating bonds
 * from a particular source validator to a particular destination validator.
 */
export interface Redelegation {
    /** delegator_address is the bech32-encoded address of the delegator. */
    delegatorAddress: string;
    /** validator_src_address is the validator redelegation source operator address. */
    validatorSrcAddress: string;
    /** validator_dst_address is the validator redelegation destination operator address. */
    validatorDstAddress: string;
    /** entries are the redelegation entries. */
    entries: RedelegationEntry[];
}
/** Params defines the parameters for the x/staking module. */
export interface Params {
    /** unbonding_time is the time duration of unbonding. */
    unbondingTime: Duration | undefined;
    /** max_validators is the maximum number of validators. */
    maxValidators: number;
    /** max_entries is the max entries for either unbonding delegation or redelegation (per pair/trio). */
    maxEntries: number;
    /** historical_entries is the number of historical entries to persist. */
    historicalEntries: number;
    /** bond_denom defines the bondable coin denomination. */
    bondDenom: string;
    /** min_commission_rate is the chain-wide minimum commission rate that a validator can charge their delegators */
    minCommissionRate: string;
}
/**
 * DelegationResponse is equivalent to Delegation except that it contains a
 * balance in addition to shares which is more suitable for client responses.
 */
export interface DelegationResponse {
    delegation: Delegation | undefined;
    balance: Coin | undefined;
}
/**
 * RedelegationEntryResponse is equivalent to a RedelegationEntry except that it
 * contains a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface RedelegationEntryResponse {
    redelegationEntry: RedelegationEntry | undefined;
    balance: string;
}
/**
 * RedelegationResponse is equivalent to a Redelegation except that its entries
 * contain a balance in addition to shares which is more suitable for client
 * responses.
 */
export interface RedelegationResponse {
    redelegation: Redelegation | undefined;
    entries: RedelegationEntryResponse[];
}
/**
 * Pool is used for tracking bonded and not-bonded token supply of the bond
 * denomination.
 */
export interface Pool {
    notBondedTokens: string;
    bondedTokens: string;
}
/**
 * ValidatorUpdates defines an array of abci.ValidatorUpdate objects.
 * TODO: explore moving this to proto/cosmos/base to separate modules from tendermint dependence
 */
export interface ValidatorUpdates {
    updates: ValidatorUpdate[];
}
export declare const HistoricalInfo: {
    encode(message: HistoricalInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): HistoricalInfo;
    fromJSON(object: any): HistoricalInfo;
    toJSON(message: HistoricalInfo): unknown;
    create<I extends {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        valset?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
    } & {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            version?: {
                block?: number;
                app?: number;
            } & {
                block?: number;
                app?: number;
            } & { [K in Exclude<keyof I["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
            chainId?: string;
            height?: number;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            } & {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                } & {
                    total?: number;
                    hash?: Uint8Array;
                } & { [K_1 in Exclude<keyof I["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
            } & { [K_2 in Exclude<keyof I["header"]["lastBlockId"], keyof import("../../../tendermint/types/types").BlockID>]: never; };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_3 in Exclude<keyof I["header"], keyof Header>]: never; };
        valset?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
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
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
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
            } & { [K_4 in Exclude<keyof I["valset"][number]["consensusPubkey"], keyof Any>]: never; };
            jailed?: boolean;
            status?: BondStatus;
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
            } & { [K_5 in Exclude<keyof I["valset"][number]["description"], keyof Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_6 in Exclude<keyof I["valset"][number]["commission"]["commissionRates"], keyof CommissionRates>]: never; };
                updateTime?: Date | undefined;
            } & { [K_7 in Exclude<keyof I["valset"][number]["commission"], keyof Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_8 in Exclude<keyof I["valset"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_9 in Exclude<keyof I["valset"][number], keyof Validator>]: never; })[] & { [K_10 in Exclude<keyof I["valset"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
    } & { [K_11 in Exclude<keyof I, keyof HistoricalInfo>]: never; }>(base?: I): HistoricalInfo;
    fromPartial<I_1 extends {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        valset?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[];
    } & {
        header?: {
            version?: {
                block?: number;
                app?: number;
            };
            chainId?: string;
            height?: number;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            version?: {
                block?: number;
                app?: number;
            } & {
                block?: number;
                app?: number;
            } & { [K_12 in Exclude<keyof I_1["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
            chainId?: string;
            height?: number;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            } & {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                } & {
                    total?: number;
                    hash?: Uint8Array;
                } & { [K_13 in Exclude<keyof I_1["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
            } & { [K_14 in Exclude<keyof I_1["header"]["lastBlockId"], keyof import("../../../tendermint/types/types").BlockID>]: never; };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & { [K_15 in Exclude<keyof I_1["header"], keyof Header>]: never; };
        valset?: {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
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
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
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
            } & { [K_16 in Exclude<keyof I_1["valset"][number]["consensusPubkey"], keyof Any>]: never; };
            jailed?: boolean;
            status?: BondStatus;
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
            } & { [K_17 in Exclude<keyof I_1["valset"][number]["description"], keyof Description>]: never; };
            unbondingHeight?: number;
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
            } & {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                } & { [K_18 in Exclude<keyof I_1["valset"][number]["commission"]["commissionRates"], keyof CommissionRates>]: never; };
                updateTime?: Date | undefined;
            } & { [K_19 in Exclude<keyof I_1["valset"][number]["commission"], keyof Commission>]: never; };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[] & number[] & { [K_20 in Exclude<keyof I_1["valset"][number]["unbondingIds"], keyof number[]>]: never; };
        } & { [K_21 in Exclude<keyof I_1["valset"][number], keyof Validator>]: never; })[] & { [K_22 in Exclude<keyof I_1["valset"], keyof {
            operatorAddress?: string;
            consensusPubkey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            jailed?: boolean;
            status?: BondStatus;
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
            unbondingTime?: Date | undefined;
            commission?: {
                commissionRates?: {
                    rate?: string;
                    maxRate?: string;
                    maxChangeRate?: string;
                };
                updateTime?: Date | undefined;
            };
            minSelfDelegation?: string;
            unbondingOnHoldRefCount?: number;
            unbondingIds?: number[];
        }[]>]: never; };
    } & { [K_23 in Exclude<keyof I_1, keyof HistoricalInfo>]: never; }>(object: I_1): HistoricalInfo;
};
export declare const CommissionRates: {
    encode(message: CommissionRates, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CommissionRates;
    fromJSON(object: any): CommissionRates;
    toJSON(message: CommissionRates): unknown;
    create<I extends {
        rate?: string;
        maxRate?: string;
        maxChangeRate?: string;
    } & {
        rate?: string;
        maxRate?: string;
        maxChangeRate?: string;
    } & { [K in Exclude<keyof I, keyof CommissionRates>]: never; }>(base?: I): CommissionRates;
    fromPartial<I_1 extends {
        rate?: string;
        maxRate?: string;
        maxChangeRate?: string;
    } & {
        rate?: string;
        maxRate?: string;
        maxChangeRate?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof CommissionRates>]: never; }>(object: I_1): CommissionRates;
};
export declare const Commission: {
    encode(message: Commission, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Commission;
    fromJSON(object: any): Commission;
    toJSON(message: Commission): unknown;
    create<I extends {
        commissionRates?: {
            rate?: string;
            maxRate?: string;
            maxChangeRate?: string;
        };
        updateTime?: Date | undefined;
    } & {
        commissionRates?: {
            rate?: string;
            maxRate?: string;
            maxChangeRate?: string;
        } & {
            rate?: string;
            maxRate?: string;
            maxChangeRate?: string;
        } & { [K in Exclude<keyof I["commissionRates"], keyof CommissionRates>]: never; };
        updateTime?: Date | undefined;
    } & { [K_1 in Exclude<keyof I, keyof Commission>]: never; }>(base?: I): Commission;
    fromPartial<I_1 extends {
        commissionRates?: {
            rate?: string;
            maxRate?: string;
            maxChangeRate?: string;
        };
        updateTime?: Date | undefined;
    } & {
        commissionRates?: {
            rate?: string;
            maxRate?: string;
            maxChangeRate?: string;
        } & {
            rate?: string;
            maxRate?: string;
            maxChangeRate?: string;
        } & { [K_2 in Exclude<keyof I_1["commissionRates"], keyof CommissionRates>]: never; };
        updateTime?: Date | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof Commission>]: never; }>(object: I_1): Commission;
};
export declare const Description: {
    encode(message: Description, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Description;
    fromJSON(object: any): Description;
    toJSON(message: Description): unknown;
    create<I extends {
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
    } & { [K in Exclude<keyof I, keyof Description>]: never; }>(base?: I): Description;
    fromPartial<I_1 extends {
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
    } & { [K_1 in Exclude<keyof I_1, keyof Description>]: never; }>(object: I_1): Description;
};
export declare const Validator: {
    encode(message: Validator, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Validator;
    fromJSON(object: any): Validator;
    toJSON(message: Validator): unknown;
    create<I extends {
        operatorAddress?: string;
        consensusPubkey?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        jailed?: boolean;
        status?: BondStatus;
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
        unbondingTime?: Date | undefined;
        commission?: {
            commissionRates?: {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            };
            updateTime?: Date | undefined;
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
        } & { [K in Exclude<keyof I["consensusPubkey"], keyof Any>]: never; };
        jailed?: boolean;
        status?: BondStatus;
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
        } & { [K_1 in Exclude<keyof I["description"], keyof Description>]: never; };
        unbondingHeight?: number;
        unbondingTime?: Date | undefined;
        commission?: {
            commissionRates?: {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            };
            updateTime?: Date | undefined;
        } & {
            commissionRates?: {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            } & {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            } & { [K_2 in Exclude<keyof I["commission"]["commissionRates"], keyof CommissionRates>]: never; };
            updateTime?: Date | undefined;
        } & { [K_3 in Exclude<keyof I["commission"], keyof Commission>]: never; };
        minSelfDelegation?: string;
        unbondingOnHoldRefCount?: number;
        unbondingIds?: number[] & number[] & { [K_4 in Exclude<keyof I["unbondingIds"], keyof number[]>]: never; };
    } & { [K_5 in Exclude<keyof I, keyof Validator>]: never; }>(base?: I): Validator;
    fromPartial<I_1 extends {
        operatorAddress?: string;
        consensusPubkey?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        jailed?: boolean;
        status?: BondStatus;
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
        unbondingTime?: Date | undefined;
        commission?: {
            commissionRates?: {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            };
            updateTime?: Date | undefined;
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
        } & { [K_6 in Exclude<keyof I_1["consensusPubkey"], keyof Any>]: never; };
        jailed?: boolean;
        status?: BondStatus;
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
        } & { [K_7 in Exclude<keyof I_1["description"], keyof Description>]: never; };
        unbondingHeight?: number;
        unbondingTime?: Date | undefined;
        commission?: {
            commissionRates?: {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            };
            updateTime?: Date | undefined;
        } & {
            commissionRates?: {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            } & {
                rate?: string;
                maxRate?: string;
                maxChangeRate?: string;
            } & { [K_8 in Exclude<keyof I_1["commission"]["commissionRates"], keyof CommissionRates>]: never; };
            updateTime?: Date | undefined;
        } & { [K_9 in Exclude<keyof I_1["commission"], keyof Commission>]: never; };
        minSelfDelegation?: string;
        unbondingOnHoldRefCount?: number;
        unbondingIds?: number[] & number[] & { [K_10 in Exclude<keyof I_1["unbondingIds"], keyof number[]>]: never; };
    } & { [K_11 in Exclude<keyof I_1, keyof Validator>]: never; }>(object: I_1): Validator;
};
export declare const ValAddresses: {
    encode(message: ValAddresses, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValAddresses;
    fromJSON(object: any): ValAddresses;
    toJSON(message: ValAddresses): unknown;
    create<I extends {
        addresses?: string[];
    } & {
        addresses?: string[] & string[] & { [K in Exclude<keyof I["addresses"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, "addresses">]: never; }>(base?: I): ValAddresses;
    fromPartial<I_1 extends {
        addresses?: string[];
    } & {
        addresses?: string[] & string[] & { [K_2 in Exclude<keyof I_1["addresses"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "addresses">]: never; }>(object: I_1): ValAddresses;
};
export declare const DVPair: {
    encode(message: DVPair, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DVPair;
    fromJSON(object: any): DVPair;
    toJSON(message: DVPair): unknown;
    create<I extends {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & { [K in Exclude<keyof I, keyof DVPair>]: never; }>(base?: I): DVPair;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof DVPair>]: never; }>(object: I_1): DVPair;
};
export declare const DVPairs: {
    encode(message: DVPairs, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DVPairs;
    fromJSON(object: any): DVPairs;
    toJSON(message: DVPairs): unknown;
    create<I extends {
        pairs?: {
            delegatorAddress?: string;
            validatorAddress?: string;
        }[];
    } & {
        pairs?: {
            delegatorAddress?: string;
            validatorAddress?: string;
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
        } & { [K in Exclude<keyof I["pairs"][number], keyof DVPair>]: never; })[] & { [K_1 in Exclude<keyof I["pairs"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "pairs">]: never; }>(base?: I): DVPairs;
    fromPartial<I_1 extends {
        pairs?: {
            delegatorAddress?: string;
            validatorAddress?: string;
        }[];
    } & {
        pairs?: {
            delegatorAddress?: string;
            validatorAddress?: string;
        }[] & ({
            delegatorAddress?: string;
            validatorAddress?: string;
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
        } & { [K_3 in Exclude<keyof I_1["pairs"][number], keyof DVPair>]: never; })[] & { [K_4 in Exclude<keyof I_1["pairs"], keyof {
            delegatorAddress?: string;
            validatorAddress?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "pairs">]: never; }>(object: I_1): DVPairs;
};
export declare const DVVTriplet: {
    encode(message: DVVTriplet, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DVVTriplet;
    fromJSON(object: any): DVVTriplet;
    toJSON(message: DVVTriplet): unknown;
    create<I extends {
        delegatorAddress?: string;
        validatorSrcAddress?: string;
        validatorDstAddress?: string;
    } & {
        delegatorAddress?: string;
        validatorSrcAddress?: string;
        validatorDstAddress?: string;
    } & { [K in Exclude<keyof I, keyof DVVTriplet>]: never; }>(base?: I): DVVTriplet;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        validatorSrcAddress?: string;
        validatorDstAddress?: string;
    } & {
        delegatorAddress?: string;
        validatorSrcAddress?: string;
        validatorDstAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof DVVTriplet>]: never; }>(object: I_1): DVVTriplet;
};
export declare const DVVTriplets: {
    encode(message: DVVTriplets, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DVVTriplets;
    fromJSON(object: any): DVVTriplets;
    toJSON(message: DVVTriplets): unknown;
    create<I extends {
        triplets?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        }[];
    } & {
        triplets?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        }[] & ({
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        } & {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        } & { [K in Exclude<keyof I["triplets"][number], keyof DVVTriplet>]: never; })[] & { [K_1 in Exclude<keyof I["triplets"], keyof {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "triplets">]: never; }>(base?: I): DVVTriplets;
    fromPartial<I_1 extends {
        triplets?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        }[];
    } & {
        triplets?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        }[] & ({
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        } & {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        } & { [K_3 in Exclude<keyof I_1["triplets"][number], keyof DVVTriplet>]: never; })[] & { [K_4 in Exclude<keyof I_1["triplets"], keyof {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "triplets">]: never; }>(object: I_1): DVVTriplets;
};
export declare const Delegation: {
    encode(message: Delegation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Delegation;
    fromJSON(object: any): Delegation;
    toJSON(message: Delegation): unknown;
    create<I extends {
        delegatorAddress?: string;
        validatorAddress?: string;
        shares?: string;
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
        shares?: string;
    } & { [K in Exclude<keyof I, keyof Delegation>]: never; }>(base?: I): Delegation;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        validatorAddress?: string;
        shares?: string;
    } & {
        delegatorAddress?: string;
        validatorAddress?: string;
        shares?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Delegation>]: never; }>(object: I_1): Delegation;
};
export declare const UnbondingDelegation: {
    encode(message: UnbondingDelegation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UnbondingDelegation;
    fromJSON(object: any): UnbondingDelegation;
    toJSON(message: UnbondingDelegation): unknown;
    create<I extends {
        delegatorAddress?: string;
        validatorAddress?: string;
        entries?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
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
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[] & ({
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & { [K in Exclude<keyof I["entries"][number], keyof UnbondingDelegationEntry>]: never; })[] & { [K_1 in Exclude<keyof I["entries"], keyof {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof UnbondingDelegation>]: never; }>(base?: I): UnbondingDelegation;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        validatorAddress?: string;
        entries?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
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
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[] & ({
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & { [K_3 in Exclude<keyof I_1["entries"][number], keyof UnbondingDelegationEntry>]: never; })[] & { [K_4 in Exclude<keyof I_1["entries"], keyof {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            balance?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof UnbondingDelegation>]: never; }>(object: I_1): UnbondingDelegation;
};
export declare const UnbondingDelegationEntry: {
    encode(message: UnbondingDelegationEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UnbondingDelegationEntry;
    fromJSON(object: any): UnbondingDelegationEntry;
    toJSON(message: UnbondingDelegationEntry): unknown;
    create<I extends {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        balance?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        balance?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & { [K in Exclude<keyof I, keyof UnbondingDelegationEntry>]: never; }>(base?: I): UnbondingDelegationEntry;
    fromPartial<I_1 extends {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        balance?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        balance?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof UnbondingDelegationEntry>]: never; }>(object: I_1): UnbondingDelegationEntry;
};
export declare const RedelegationEntry: {
    encode(message: RedelegationEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RedelegationEntry;
    fromJSON(object: any): RedelegationEntry;
    toJSON(message: RedelegationEntry): unknown;
    create<I extends {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        sharesDst?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        sharesDst?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & { [K in Exclude<keyof I, keyof RedelegationEntry>]: never; }>(base?: I): RedelegationEntry;
    fromPartial<I_1 extends {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        sharesDst?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & {
        creationHeight?: number;
        completionTime?: Date | undefined;
        initialBalance?: string;
        sharesDst?: string;
        unbondingId?: number;
        unbondingOnHoldRefCount?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof RedelegationEntry>]: never; }>(object: I_1): RedelegationEntry;
};
export declare const Redelegation: {
    encode(message: Redelegation, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Redelegation;
    fromJSON(object: any): Redelegation;
    toJSON(message: Redelegation): unknown;
    create<I extends {
        delegatorAddress?: string;
        validatorSrcAddress?: string;
        validatorDstAddress?: string;
        entries?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
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
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[] & ({
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & { [K in Exclude<keyof I["entries"][number], keyof RedelegationEntry>]: never; })[] & { [K_1 in Exclude<keyof I["entries"], keyof {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof Redelegation>]: never; }>(base?: I): Redelegation;
    fromPartial<I_1 extends {
        delegatorAddress?: string;
        validatorSrcAddress?: string;
        validatorDstAddress?: string;
        entries?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
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
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[] & ({
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & { [K_3 in Exclude<keyof I_1["entries"][number], keyof RedelegationEntry>]: never; })[] & { [K_4 in Exclude<keyof I_1["entries"], keyof {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof Redelegation>]: never; }>(object: I_1): Redelegation;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["unbondingTime"], keyof Duration>]: never; };
        maxValidators?: number;
        maxEntries?: number;
        historicalEntries?: number;
        bondDenom?: string;
        minCommissionRate?: string;
    } & { [K_1 in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
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
        } & { [K_2 in Exclude<keyof I_1["unbondingTime"], keyof Duration>]: never; };
        maxValidators?: number;
        maxEntries?: number;
        historicalEntries?: number;
        bondDenom?: string;
        minCommissionRate?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof Params>]: never; }>(object: I_1): Params;
};
export declare const DelegationResponse: {
    encode(message: DelegationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DelegationResponse;
    fromJSON(object: any): DelegationResponse;
    toJSON(message: DelegationResponse): unknown;
    create<I extends {
        delegation?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        };
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        delegation?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & { [K in Exclude<keyof I["delegation"], keyof Delegation>]: never; };
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_1 in Exclude<keyof I["balance"], keyof Coin>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof DelegationResponse>]: never; }>(base?: I): DelegationResponse;
    fromPartial<I_1 extends {
        delegation?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        };
        balance?: {
            denom?: string;
            amount?: string;
        };
    } & {
        delegation?: {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & {
            delegatorAddress?: string;
            validatorAddress?: string;
            shares?: string;
        } & { [K_3 in Exclude<keyof I_1["delegation"], keyof Delegation>]: never; };
        balance?: {
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_4 in Exclude<keyof I_1["balance"], keyof Coin>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof DelegationResponse>]: never; }>(object: I_1): DelegationResponse;
};
export declare const RedelegationEntryResponse: {
    encode(message: RedelegationEntryResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RedelegationEntryResponse;
    fromJSON(object: any): RedelegationEntryResponse;
    toJSON(message: RedelegationEntryResponse): unknown;
    create<I extends {
        redelegationEntry?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        };
        balance?: string;
    } & {
        redelegationEntry?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & { [K in Exclude<keyof I["redelegationEntry"], keyof RedelegationEntry>]: never; };
        balance?: string;
    } & { [K_1 in Exclude<keyof I, keyof RedelegationEntryResponse>]: never; }>(base?: I): RedelegationEntryResponse;
    fromPartial<I_1 extends {
        redelegationEntry?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        };
        balance?: string;
    } & {
        redelegationEntry?: {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & {
            creationHeight?: number;
            completionTime?: Date | undefined;
            initialBalance?: string;
            sharesDst?: string;
            unbondingId?: number;
            unbondingOnHoldRefCount?: number;
        } & { [K_2 in Exclude<keyof I_1["redelegationEntry"], keyof RedelegationEntry>]: never; };
        balance?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof RedelegationEntryResponse>]: never; }>(object: I_1): RedelegationEntryResponse;
};
export declare const RedelegationResponse: {
    encode(message: RedelegationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RedelegationResponse;
    fromJSON(object: any): RedelegationResponse;
    toJSON(message: RedelegationResponse): unknown;
    create<I extends {
        redelegation?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        };
        entries?: {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        }[];
    } & {
        redelegation?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
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
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K in Exclude<keyof I["redelegation"]["entries"][number], keyof RedelegationEntry>]: never; })[] & { [K_1 in Exclude<keyof I["redelegation"]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["redelegation"], keyof Redelegation>]: never; };
        entries?: {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        }[] & ({
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        } & {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_3 in Exclude<keyof I["entries"][number]["redelegationEntry"], keyof RedelegationEntry>]: never; };
            balance?: string;
        } & { [K_4 in Exclude<keyof I["entries"][number], keyof RedelegationEntryResponse>]: never; })[] & { [K_5 in Exclude<keyof I["entries"], keyof {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof RedelegationResponse>]: never; }>(base?: I): RedelegationResponse;
    fromPartial<I_1 extends {
        redelegation?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[];
        };
        entries?: {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        }[];
    } & {
        redelegation?: {
            delegatorAddress?: string;
            validatorSrcAddress?: string;
            validatorDstAddress?: string;
            entries?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
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
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[] & ({
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_7 in Exclude<keyof I_1["redelegation"]["entries"][number], keyof RedelegationEntry>]: never; })[] & { [K_8 in Exclude<keyof I_1["redelegation"]["entries"], keyof {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            }[]>]: never; };
        } & { [K_9 in Exclude<keyof I_1["redelegation"], keyof Redelegation>]: never; };
        entries?: {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        }[] & ({
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        } & {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            } & { [K_10 in Exclude<keyof I_1["entries"][number]["redelegationEntry"], keyof RedelegationEntry>]: never; };
            balance?: string;
        } & { [K_11 in Exclude<keyof I_1["entries"][number], keyof RedelegationEntryResponse>]: never; })[] & { [K_12 in Exclude<keyof I_1["entries"], keyof {
            redelegationEntry?: {
                creationHeight?: number;
                completionTime?: Date | undefined;
                initialBalance?: string;
                sharesDst?: string;
                unbondingId?: number;
                unbondingOnHoldRefCount?: number;
            };
            balance?: string;
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof RedelegationResponse>]: never; }>(object: I_1): RedelegationResponse;
};
export declare const Pool: {
    encode(message: Pool, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Pool;
    fromJSON(object: any): Pool;
    toJSON(message: Pool): unknown;
    create<I extends {
        notBondedTokens?: string;
        bondedTokens?: string;
    } & {
        notBondedTokens?: string;
        bondedTokens?: string;
    } & { [K in Exclude<keyof I, keyof Pool>]: never; }>(base?: I): Pool;
    fromPartial<I_1 extends {
        notBondedTokens?: string;
        bondedTokens?: string;
    } & {
        notBondedTokens?: string;
        bondedTokens?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Pool>]: never; }>(object: I_1): Pool;
};
export declare const ValidatorUpdates: {
    encode(message: ValidatorUpdates, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorUpdates;
    fromJSON(object: any): ValidatorUpdates;
    toJSON(message: ValidatorUpdates): unknown;
    create<I extends {
        updates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
    } & {
        updates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K in Exclude<keyof I["updates"][number]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
            power?: number;
        } & { [K_1 in Exclude<keyof I["updates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_2 in Exclude<keyof I["updates"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, "updates">]: never; }>(base?: I): ValidatorUpdates;
    fromPartial<I_1 extends {
        updates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[];
    } & {
        updates?: {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[] & ({
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        } & {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["updates"][number]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
            power?: number;
        } & { [K_5 in Exclude<keyof I_1["updates"][number], keyof ValidatorUpdate>]: never; })[] & { [K_6 in Exclude<keyof I_1["updates"], keyof {
            pubKey?: {
                ed25519?: Uint8Array;
                secp256k1?: Uint8Array;
            };
            power?: number;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, "updates">]: never; }>(object: I_1): ValidatorUpdates;
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
