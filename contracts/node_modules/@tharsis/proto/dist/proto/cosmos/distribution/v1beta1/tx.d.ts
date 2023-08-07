import * as dependency_2 from "./../../base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.distribution.v1beta1 {
    class MsgSetWithdrawAddress extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            withdraw_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get withdraw_address(): string;
        set withdraw_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
            withdraw_address?: string;
        }): MsgSetWithdrawAddress;
        toObject(): {
            delegator_address?: string | undefined;
            withdraw_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSetWithdrawAddress;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSetWithdrawAddress;
    }
    class MsgSetWithdrawAddressResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgSetWithdrawAddressResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgSetWithdrawAddressResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgSetWithdrawAddressResponse;
    }
    class MsgWithdrawDelegatorReward extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_address?: string;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        static fromObject(data: {
            delegator_address?: string;
            validator_address?: string;
        }): MsgWithdrawDelegatorReward;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgWithdrawDelegatorReward;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgWithdrawDelegatorReward;
    }
    class MsgWithdrawDelegatorRewardResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgWithdrawDelegatorRewardResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgWithdrawDelegatorRewardResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgWithdrawDelegatorRewardResponse;
    }
    class MsgWithdrawValidatorCommission extends pb_1.Message {
        constructor(data?: any[] | {
            validator_address?: string;
        });
        get validator_address(): string;
        set validator_address(value: string);
        static fromObject(data: {
            validator_address?: string;
        }): MsgWithdrawValidatorCommission;
        toObject(): {
            validator_address?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgWithdrawValidatorCommission;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgWithdrawValidatorCommission;
    }
    class MsgWithdrawValidatorCommissionResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgWithdrawValidatorCommissionResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgWithdrawValidatorCommissionResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgWithdrawValidatorCommissionResponse;
    }
    class MsgFundCommunityPool extends pb_1.Message {
        constructor(data?: any[] | {
            amount?: dependency_2.cosmos.base.v1beta1.Coin[];
            depositor?: string;
        });
        get amount(): dependency_2.cosmos.base.v1beta1.Coin[];
        set amount(value: dependency_2.cosmos.base.v1beta1.Coin[]);
        get depositor(): string;
        set depositor(value: string);
        static fromObject(data: {
            amount?: ReturnType<typeof dependency_2.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            depositor?: string;
        }): MsgFundCommunityPool;
        toObject(): {
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            depositor?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgFundCommunityPool;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgFundCommunityPool;
    }
    class MsgFundCommunityPoolResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgFundCommunityPoolResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgFundCommunityPoolResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgFundCommunityPoolResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map