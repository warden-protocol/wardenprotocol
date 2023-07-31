import * as dependency_3 from "./../../base/v1beta1/coin";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.staking.v1beta1 {
    enum AuthorizationType {
        AUTHORIZATION_TYPE_UNSPECIFIED = 0,
        AUTHORIZATION_TYPE_DELEGATE = 1,
        AUTHORIZATION_TYPE_UNDELEGATE = 2,
        AUTHORIZATION_TYPE_REDELEGATE = 3
    }
    class StakeAuthorization extends pb_1.Message {
        constructor(data?: any[] | ({
            max_tokens?: dependency_3.cosmos.base.v1beta1.Coin;
            authorization_type?: AuthorizationType;
        } & (({
            allow_list?: StakeAuthorization.Validators;
            deny_list?: never;
        } | {
            allow_list?: never;
            deny_list?: StakeAuthorization.Validators;
        }))));
        get max_tokens(): dependency_3.cosmos.base.v1beta1.Coin;
        set max_tokens(value: dependency_3.cosmos.base.v1beta1.Coin);
        get allow_list(): StakeAuthorization.Validators;
        set allow_list(value: StakeAuthorization.Validators);
        get deny_list(): StakeAuthorization.Validators;
        set deny_list(value: StakeAuthorization.Validators);
        get authorization_type(): AuthorizationType;
        set authorization_type(value: AuthorizationType);
        get validators(): "allow_list" | "deny_list" | "none";
        static fromObject(data: {
            max_tokens?: ReturnType<typeof dependency_3.cosmos.base.v1beta1.Coin.prototype.toObject>;
            allow_list?: ReturnType<typeof StakeAuthorization.Validators.prototype.toObject>;
            deny_list?: ReturnType<typeof StakeAuthorization.Validators.prototype.toObject>;
            authorization_type?: AuthorizationType;
        }): StakeAuthorization;
        toObject(): {
            max_tokens?: {
                denom?: string | undefined;
                amount?: string | undefined;
            } | undefined;
            allow_list?: {
                address?: string[] | undefined;
            } | undefined;
            deny_list?: {
                address?: string[] | undefined;
            } | undefined;
            authorization_type?: AuthorizationType | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StakeAuthorization;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): StakeAuthorization;
    }
    namespace StakeAuthorization {
        class Validators extends pb_1.Message {
            constructor(data?: any[] | {
                address?: string[];
            });
            get address(): string[];
            set address(value: string[]);
            static fromObject(data: {
                address?: string[];
            }): Validators;
            toObject(): {
                address?: string[] | undefined;
            };
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Validators;
            serializeBinary(): Uint8Array;
            static deserializeBinary(bytes: Uint8Array): Validators;
        }
    }
}
//# sourceMappingURL=authz.d.ts.map