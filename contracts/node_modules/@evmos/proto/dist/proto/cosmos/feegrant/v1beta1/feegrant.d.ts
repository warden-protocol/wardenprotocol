import * as dependency_2 from "./../../../google/protobuf/any";
import * as dependency_4 from "./../../base/v1beta1/coin";
import * as dependency_5 from "./../../../google/protobuf/timestamp";
import * as dependency_6 from "./../../../google/protobuf/duration";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.feegrant.v1beta1 {
    class BasicAllowance extends pb_1.Message {
        constructor(data?: any[] | {
            spend_limit?: dependency_4.cosmos.base.v1beta1.Coin[];
            expiration?: dependency_5.google.protobuf.Timestamp;
        });
        get spend_limit(): dependency_4.cosmos.base.v1beta1.Coin[];
        set spend_limit(value: dependency_4.cosmos.base.v1beta1.Coin[]);
        get expiration(): dependency_5.google.protobuf.Timestamp;
        set expiration(value: dependency_5.google.protobuf.Timestamp);
        static fromObject(data: {
            spend_limit?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            expiration?: ReturnType<typeof dependency_5.google.protobuf.Timestamp.prototype.toObject>;
        }): BasicAllowance;
        toObject(): {
            spend_limit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            expiration?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): BasicAllowance;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): BasicAllowance;
    }
    class PeriodicAllowance extends pb_1.Message {
        constructor(data?: any[] | {
            basic?: BasicAllowance;
            period?: dependency_6.google.protobuf.Duration;
            period_spend_limit?: dependency_4.cosmos.base.v1beta1.Coin[];
            period_can_spend?: dependency_4.cosmos.base.v1beta1.Coin[];
            period_reset?: dependency_5.google.protobuf.Timestamp;
        });
        get basic(): BasicAllowance;
        set basic(value: BasicAllowance);
        get period(): dependency_6.google.protobuf.Duration;
        set period(value: dependency_6.google.protobuf.Duration);
        get period_spend_limit(): dependency_4.cosmos.base.v1beta1.Coin[];
        set period_spend_limit(value: dependency_4.cosmos.base.v1beta1.Coin[]);
        get period_can_spend(): dependency_4.cosmos.base.v1beta1.Coin[];
        set period_can_spend(value: dependency_4.cosmos.base.v1beta1.Coin[]);
        get period_reset(): dependency_5.google.protobuf.Timestamp;
        set period_reset(value: dependency_5.google.protobuf.Timestamp);
        static fromObject(data: {
            basic?: ReturnType<typeof BasicAllowance.prototype.toObject>;
            period?: ReturnType<typeof dependency_6.google.protobuf.Duration.prototype.toObject>;
            period_spend_limit?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            period_can_spend?: ReturnType<typeof dependency_4.cosmos.base.v1beta1.Coin.prototype.toObject>[];
            period_reset?: ReturnType<typeof dependency_5.google.protobuf.Timestamp.prototype.toObject>;
        }): PeriodicAllowance;
        toObject(): {
            basic?: {
                spend_limit?: {
                    denom?: string | undefined;
                    amount?: string | undefined;
                }[] | undefined;
                expiration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
            } | undefined;
            period?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            period_spend_limit?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            period_can_spend?: {
                denom?: string | undefined;
                amount?: string | undefined;
            }[] | undefined;
            period_reset?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PeriodicAllowance;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PeriodicAllowance;
    }
    class AllowedMsgAllowance extends pb_1.Message {
        constructor(data?: any[] | {
            allowance?: dependency_2.google.protobuf.Any;
            allowed_messages?: string[];
        });
        get allowance(): dependency_2.google.protobuf.Any;
        set allowance(value: dependency_2.google.protobuf.Any);
        get allowed_messages(): string[];
        set allowed_messages(value: string[]);
        static fromObject(data: {
            allowance?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
            allowed_messages?: string[];
        }): AllowedMsgAllowance;
        toObject(): {
            allowance?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
            allowed_messages?: string[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AllowedMsgAllowance;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AllowedMsgAllowance;
    }
    class Grant extends pb_1.Message {
        constructor(data?: any[] | {
            granter?: string;
            grantee?: string;
            allowance?: dependency_2.google.protobuf.Any;
        });
        get granter(): string;
        set granter(value: string);
        get grantee(): string;
        set grantee(value: string);
        get allowance(): dependency_2.google.protobuf.Any;
        set allowance(value: dependency_2.google.protobuf.Any);
        static fromObject(data: {
            granter?: string;
            grantee?: string;
            allowance?: ReturnType<typeof dependency_2.google.protobuf.Any.prototype.toObject>;
        }): Grant;
        toObject(): {
            granter?: string | undefined;
            grantee?: string | undefined;
            allowance?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Grant;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Grant;
    }
}
//# sourceMappingURL=feegrant.d.ts.map