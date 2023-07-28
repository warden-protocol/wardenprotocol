import * as dependency_1 from "./../../../google/protobuf/any";
import * as dependency_2 from "./../../../google/protobuf/timestamp";
import * as dependency_5 from "./../../base/v1beta1/coin";
import * as dependency_6 from "./staking";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.staking.v1beta1 {
    class MsgCreateValidator extends pb_1.Message {
        constructor(data?: any[] | {
            description?: dependency_6.cosmos.staking.v1beta1.Description;
            commission?: dependency_6.cosmos.staking.v1beta1.CommissionRates;
            min_self_delegation?: string;
            delegator_address?: string;
            validator_address?: string;
            pubkey?: dependency_1.google.protobuf.Any;
            value?: dependency_5.cosmos.base.v1beta1.Coin;
        });
        get description(): dependency_6.cosmos.staking.v1beta1.Description;
        set description(value: dependency_6.cosmos.staking.v1beta1.Description);
        get commission(): dependency_6.cosmos.staking.v1beta1.CommissionRates;
        set commission(value: dependency_6.cosmos.staking.v1beta1.CommissionRates);
        get min_self_delegation(): string;
        set min_self_delegation(value: string);
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        get pubkey(): dependency_1.google.protobuf.Any;
        set pubkey(value: dependency_1.google.protobuf.Any);
        get value(): dependency_5.cosmos.base.v1beta1.Coin;
        set value(value: dependency_5.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            description?: ReturnType<typeof dependency_6.cosmos.staking.v1beta1.Description.prototype.toObject>;
            commission?: ReturnType<typeof dependency_6.cosmos.staking.v1beta1.CommissionRates.prototype.toObject>;
            min_self_delegation?: string;
            delegator_address?: string;
            validator_address?: string;
            pubkey?: ReturnType<typeof dependency_1.google.protobuf.Any.prototype.toObject>;
            value?: ReturnType<typeof dependency_5.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): MsgCreateValidator;
        toObject(): {
            description?: {
                moniker?: string | undefined;
                identity?: string | undefined;
                website?: string | undefined;
                security_contact?: string | undefined;
                details?: string | undefined;
            } | undefined;
            commission?: {
                rate?: string | undefined;
                max_rate?: string | undefined;
                max_change_rate?: string | undefined;
            } | undefined;
            min_self_delegation?: string | undefined;
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
            pubkey?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            value?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgCreateValidator;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgCreateValidator;
    }
    class MsgCreateValidatorResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgCreateValidatorResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgCreateValidatorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgCreateValidatorResponse;
    }
    class MsgEditValidator extends pb_1.Message {
        constructor(data?: any[] | {
            description?: dependency_6.cosmos.staking.v1beta1.Description;
            validator_address?: string;
            commission_rate?: string;
            min_self_delegation?: string;
        });
        get description(): dependency_6.cosmos.staking.v1beta1.Description;
        set description(value: dependency_6.cosmos.staking.v1beta1.Description);
        get validator_address(): string;
        set validator_address(value: string);
        get commission_rate(): string;
        set commission_rate(value: string);
        get min_self_delegation(): string;
        set min_self_delegation(value: string);
        static fromObject(data: {
            description?: ReturnType<typeof dependency_6.cosmos.staking.v1beta1.Description.prototype.toObject>;
            validator_address?: string;
            commission_rate?: string;
            min_self_delegation?: string;
        }): MsgEditValidator;
        toObject(): {
            description?: {
                moniker?: string | undefined;
                identity?: string | undefined;
                website?: string | undefined;
                security_contact?: string | undefined;
                details?: string | undefined;
            } | undefined;
            validator_address?: string | undefined;
            commission_rate?: string | undefined;
            min_self_delegation?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgEditValidator;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgEditValidator;
    }
    class MsgEditValidatorResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgEditValidatorResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgEditValidatorResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgEditValidatorResponse;
    }
    class MsgDelegate extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_address?: string;
            amount?: dependency_5.cosmos.base.v1beta1.Coin;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        get amount(): dependency_5.cosmos.base.v1beta1.Coin;
        set amount(value: dependency_5.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            delegator_address?: string;
            validator_address?: string;
            amount?: ReturnType<typeof dependency_5.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): MsgDelegate;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgDelegate;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgDelegate;
    }
    class MsgDelegateResponse extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): MsgDelegateResponse;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgDelegateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgDelegateResponse;
    }
    class MsgBeginRedelegate extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_src_address?: string;
            validator_dst_address?: string;
            amount?: dependency_5.cosmos.base.v1beta1.Coin;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_src_address(): string;
        set validator_src_address(value: string);
        get validator_dst_address(): string;
        set validator_dst_address(value: string);
        get amount(): dependency_5.cosmos.base.v1beta1.Coin;
        set amount(value: dependency_5.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            delegator_address?: string;
            validator_src_address?: string;
            validator_dst_address?: string;
            amount?: ReturnType<typeof dependency_5.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): MsgBeginRedelegate;
        toObject(): {
            delegator_address?: string | undefined;
            validator_src_address?: string | undefined;
            validator_dst_address?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgBeginRedelegate;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgBeginRedelegate;
    }
    class MsgBeginRedelegateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            completion_time?: dependency_2.google.protobuf.Timestamp;
        });
        get completion_time(): dependency_2.google.protobuf.Timestamp;
        set completion_time(value: dependency_2.google.protobuf.Timestamp);
        static fromObject(data: {
            completion_time?: ReturnType<typeof dependency_2.google.protobuf.Timestamp.prototype.toObject>;
        }): MsgBeginRedelegateResponse;
        toObject(): {
            completion_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgBeginRedelegateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgBeginRedelegateResponse;
    }
    class MsgUndelegate extends pb_1.Message {
        constructor(data?: any[] | {
            delegator_address?: string;
            validator_address?: string;
            amount?: dependency_5.cosmos.base.v1beta1.Coin;
        });
        get delegator_address(): string;
        set delegator_address(value: string);
        get validator_address(): string;
        set validator_address(value: string);
        get amount(): dependency_5.cosmos.base.v1beta1.Coin;
        set amount(value: dependency_5.cosmos.base.v1beta1.Coin);
        static fromObject(data: {
            delegator_address?: string;
            validator_address?: string;
            amount?: ReturnType<typeof dependency_5.cosmos.base.v1beta1.Coin.prototype.toObject>;
        }): MsgUndelegate;
        toObject(): {
            delegator_address?: string | undefined;
            validator_address?: string | undefined;
            amount?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUndelegate;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUndelegate;
    }
    class MsgUndelegateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            completion_time?: dependency_2.google.protobuf.Timestamp;
        });
        get completion_time(): dependency_2.google.protobuf.Timestamp;
        set completion_time(value: dependency_2.google.protobuf.Timestamp);
        static fromObject(data: {
            completion_time?: ReturnType<typeof dependency_2.google.protobuf.Timestamp.prototype.toObject>;
        }): MsgUndelegateResponse;
        toObject(): {
            completion_time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MsgUndelegateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MsgUndelegateResponse;
    }
}
//# sourceMappingURL=tx.d.ts.map