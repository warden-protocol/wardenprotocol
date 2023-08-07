import * as dependency_2 from "./../../base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.distribution.v1beta1 {
    class Params extends pb_1.Message {
        constructor(data?: any[] | {
            community_tax?: string;
            base_proposer_reward?: string;
            bonus_proposer_reward?: string;
            withdraw_addr_enabled?: boolean;
        });
        get community_tax(): string;
        set community_tax(value: string);
        get base_proposer_reward(): string;
        set base_proposer_reward(value: string);
        get bonus_proposer_reward(): string;
        set bonus_proposer_reward(value: string);
        get withdraw_addr_enabled(): boolean;
        set withdraw_addr_enabled(value: boolean);
        static fromObject(data: {
            community_tax?: string;
            base_proposer_reward?: string;
            bonus_proposer_reward?: string;
            withdraw_addr_enabled?: boolean;
        }): Params;
        toObject(): {
            community_tax?: string | undefined;
            base_proposer_reward?: string | undefined;
            bonus_proposer_reward?: string | undefined;
            withdraw_addr_enabled?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Params;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Params;
    }
    class ValidatorHistoricalRewards extends pb_1.Message {
        constructor(data?: any[] | {
            cumulative_reward_ratio?: dependency_2.cosmos.base.v1beta1.DecCoin[];
            reference_count?: number;
        });
        get cumulative_reward_ratio(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set cumulative_reward_ratio(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        get reference_count(): number;
        set reference_count(value: number);
        static fromObject(data: {
            cumulative_reward_ratio?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
            reference_count?: number;
        }): ValidatorHistoricalRewards;
        toObject(): {
            cumulative_reward_ratio?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            reference_count?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorHistoricalRewards;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorHistoricalRewards;
    }
    class ValidatorCurrentRewards extends pb_1.Message {
        constructor(data?: any[] | {
            rewards?: dependency_2.cosmos.base.v1beta1.DecCoin[];
            period?: number;
        });
        get rewards(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set rewards(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        get period(): number;
        set period(value: number);
        static fromObject(data: {
            rewards?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
            period?: number;
        }): ValidatorCurrentRewards;
        toObject(): {
            rewards?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            period?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorCurrentRewards;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorCurrentRewards;
    }
    class ValidatorAccumulatedCommission extends pb_1.Message {
        constructor(data?: any[] | {
            commission?: dependency_2.cosmos.base.v1beta1.DecCoin[];
        });
        get commission(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set commission(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            commission?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): ValidatorAccumulatedCommission;
        toObject(): {
            commission?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorAccumulatedCommission;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorAccumulatedCommission;
    }
    class ValidatorOutstandingRewards extends pb_1.Message {
        constructor(data?: any[] | {
            rewards?: dependency_2.cosmos.base.v1beta1.DecCoin[];
        });
        get rewards(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set rewards(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            rewards?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): ValidatorOutstandingRewards;
        toObject(): {
            rewards?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorOutstandingRewards;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorOutstandingRewards;
    }
    class ValidatorSlashEvent extends pb_1.Message {
        constructor(data?: any[] | {
            validator_period?: number;
            fraction?: string;
        });
        get validator_period(): number;
        set validator_period(value: number);
        get fraction(): string;
        set fraction(value: string);
        static fromObject(data: {
            validator_period?: number;
            fraction?: string;
        }): ValidatorSlashEvent;
        toObject(): {
            validator_period?: number | undefined;
            fraction?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorSlashEvent;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorSlashEvent;
    }
    class ValidatorSlashEvents extends pb_1.Message {
        constructor(data?: any[] | {
            validator_slash_events?: ValidatorSlashEvent[];
        });
        get validator_slash_events(): ValidatorSlashEvent[];
        set validator_slash_events(value: ValidatorSlashEvent[]);
        static fromObject(data: {
            validator_slash_events?: ReturnType<typeof ValidatorSlashEvent.prototype.toObject>[];
        }): ValidatorSlashEvents;
        toObject(): {
            validator_slash_events?: {
                validator_period?: number | undefined;
                fraction?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorSlashEvents;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorSlashEvents;
    }
    class FeePool extends pb_1.Message {
        constructor(data?: any[] | {
            community_pool?: dependency_2.cosmos.base.v1beta1.DecCoin[];
        });
        get community_pool(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set community_pool(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            community_pool?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): FeePool;
        toObject(): {
            community_pool?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): FeePool;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): FeePool;
    }
    class CommunityPoolSpendProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            recipient?: string;
            amount?: dependency_2.cosmos.base.v1beta1.Coin[];
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get recipient(): string;
        set recipient(value: string);
        get amount(): dependency_2.cosmos.base.v1beta1.Coin[];
        set amount(value: dependency_2.cosmos.base.v1beta1.Coin[]);
        static fromObject(data: {
            title?: string;
            description?: string;
            recipient?: string;
            amount?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>[];
        }): CommunityPoolSpendProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            recipient?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CommunityPoolSpendProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CommunityPoolSpendProposal;
    }
    class DelegatorStartingInfo extends pb_1.Message {
        constructor(data?: any[] | {
            previous_period?: number;
            stake?: string;
            height?: number;
        });
        get previous_period(): number;
        set previous_period(value: number);
        get stake(): string;
        set stake(value: string);
        get height(): number;
        set height(value: number);
        static fromObject(data: {
            previous_period?: number;
            stake?: string;
            height?: number;
        }): DelegatorStartingInfo;
        toObject(): {
            previous_period?: number | undefined;
            stake?: string | undefined;
            height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegatorStartingInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegatorStartingInfo;
    }
    class DelegationDelegatorReward extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
            reward?: dependency_2.cosmos.base.v1beta1.DecCoin[];
        });
        get validator_address(): string;
        set validator_address(value: string);
        get reward(): dependency_2.cosmos.base.v1beta1.DecCoin[];
        set reward(value: dependency_2.cosmos.base.v1beta1.DecCoin[]);
        static fromObject(data: {
            validator_address?: string;
            reward?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.DecCoin.prototype.toObject>[];
        }): DelegationDelegatorReward;
        toObject(): {
            validator_address?: string | undefined;
            reward?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DelegationDelegatorReward;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DelegationDelegatorReward;
    }
    class CommunityPoolSpendProposalWithDeposit extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            recipient?: string;
            amount?: string;
            deposit?: string;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get recipient(): string;
        set recipient(value: string);
        get amount(): string;
        set amount(value: string);
        get deposit(): string;
        set deposit(value: string);
        static fromObject(data: {
            title?: string;
            description?: string;
            recipient?: string;
            amount?: string;
            deposit?: string;
        }): CommunityPoolSpendProposalWithDeposit;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            recipient?: string | undefined;
            amount?: string | undefined;
            deposit?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CommunityPoolSpendProposalWithDeposit;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CommunityPoolSpendProposalWithDeposit;
    }
}
//# sourceMappingURL=distribution.d.ts.map