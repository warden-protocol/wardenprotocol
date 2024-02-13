/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
export const protobufPackage = "cosmos.staking.v1beta1";
/**
 * AuthorizationType defines the type of staking module authorization type
 *
 * Since: cosmos-sdk 0.43
 */
export var AuthorizationType;
(function (AuthorizationType) {
    /** AUTHORIZATION_TYPE_UNSPECIFIED - AUTHORIZATION_TYPE_UNSPECIFIED specifies an unknown authorization type */
    AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_UNSPECIFIED"] = 0] = "AUTHORIZATION_TYPE_UNSPECIFIED";
    /** AUTHORIZATION_TYPE_DELEGATE - AUTHORIZATION_TYPE_DELEGATE defines an authorization type for Msg/Delegate */
    AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_DELEGATE"] = 1] = "AUTHORIZATION_TYPE_DELEGATE";
    /** AUTHORIZATION_TYPE_UNDELEGATE - AUTHORIZATION_TYPE_UNDELEGATE defines an authorization type for Msg/Undelegate */
    AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_UNDELEGATE"] = 2] = "AUTHORIZATION_TYPE_UNDELEGATE";
    /** AUTHORIZATION_TYPE_REDELEGATE - AUTHORIZATION_TYPE_REDELEGATE defines an authorization type for Msg/BeginRedelegate */
    AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_REDELEGATE"] = 3] = "AUTHORIZATION_TYPE_REDELEGATE";
    /** AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION - AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION defines an authorization type for Msg/MsgCancelUnbondingDelegation */
    AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION"] = 4] = "AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION";
    AuthorizationType[AuthorizationType["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(AuthorizationType || (AuthorizationType = {}));
export function authorizationTypeFromJSON(object) {
    switch (object) {
        case 0:
        case "AUTHORIZATION_TYPE_UNSPECIFIED":
            return AuthorizationType.AUTHORIZATION_TYPE_UNSPECIFIED;
        case 1:
        case "AUTHORIZATION_TYPE_DELEGATE":
            return AuthorizationType.AUTHORIZATION_TYPE_DELEGATE;
        case 2:
        case "AUTHORIZATION_TYPE_UNDELEGATE":
            return AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE;
        case 3:
        case "AUTHORIZATION_TYPE_REDELEGATE":
            return AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE;
        case 4:
        case "AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION":
            return AuthorizationType.AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION;
        case -1:
        case "UNRECOGNIZED":
        default:
            return AuthorizationType.UNRECOGNIZED;
    }
}
export function authorizationTypeToJSON(object) {
    switch (object) {
        case AuthorizationType.AUTHORIZATION_TYPE_UNSPECIFIED:
            return "AUTHORIZATION_TYPE_UNSPECIFIED";
        case AuthorizationType.AUTHORIZATION_TYPE_DELEGATE:
            return "AUTHORIZATION_TYPE_DELEGATE";
        case AuthorizationType.AUTHORIZATION_TYPE_UNDELEGATE:
            return "AUTHORIZATION_TYPE_UNDELEGATE";
        case AuthorizationType.AUTHORIZATION_TYPE_REDELEGATE:
            return "AUTHORIZATION_TYPE_REDELEGATE";
        case AuthorizationType.AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION:
            return "AUTHORIZATION_TYPE_CANCEL_UNBONDING_DELEGATION";
        case AuthorizationType.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseStakeAuthorization() {
    return { maxTokens: undefined, allowList: undefined, denyList: undefined, authorizationType: 0 };
}
export const StakeAuthorization = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.maxTokens !== undefined) {
            Coin.encode(message.maxTokens, writer.uint32(10).fork()).ldelim();
        }
        if (message.allowList !== undefined) {
            StakeAuthorization_Validators.encode(message.allowList, writer.uint32(18).fork()).ldelim();
        }
        if (message.denyList !== undefined) {
            StakeAuthorization_Validators.encode(message.denyList, writer.uint32(26).fork()).ldelim();
        }
        if (message.authorizationType !== 0) {
            writer.uint32(32).int32(message.authorizationType);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStakeAuthorization();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.maxTokens = Coin.decode(reader, reader.uint32());
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.allowList = StakeAuthorization_Validators.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.denyList = StakeAuthorization_Validators.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 32) {
                        break;
                    }
                    message.authorizationType = reader.int32();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            maxTokens: isSet(object.maxTokens) ? Coin.fromJSON(object.maxTokens) : undefined,
            allowList: isSet(object.allowList) ? StakeAuthorization_Validators.fromJSON(object.allowList) : undefined,
            denyList: isSet(object.denyList) ? StakeAuthorization_Validators.fromJSON(object.denyList) : undefined,
            authorizationType: isSet(object.authorizationType) ? authorizationTypeFromJSON(object.authorizationType) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.maxTokens !== undefined) {
            obj.maxTokens = Coin.toJSON(message.maxTokens);
        }
        if (message.allowList !== undefined) {
            obj.allowList = StakeAuthorization_Validators.toJSON(message.allowList);
        }
        if (message.denyList !== undefined) {
            obj.denyList = StakeAuthorization_Validators.toJSON(message.denyList);
        }
        if (message.authorizationType !== 0) {
            obj.authorizationType = authorizationTypeToJSON(message.authorizationType);
        }
        return obj;
    },
    create(base) {
        return StakeAuthorization.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseStakeAuthorization();
        message.maxTokens = (object.maxTokens !== undefined && object.maxTokens !== null)
            ? Coin.fromPartial(object.maxTokens)
            : undefined;
        message.allowList = (object.allowList !== undefined && object.allowList !== null)
            ? StakeAuthorization_Validators.fromPartial(object.allowList)
            : undefined;
        message.denyList = (object.denyList !== undefined && object.denyList !== null)
            ? StakeAuthorization_Validators.fromPartial(object.denyList)
            : undefined;
        message.authorizationType = object.authorizationType ?? 0;
        return message;
    },
};
function createBaseStakeAuthorization_Validators() {
    return { address: [] };
}
export const StakeAuthorization_Validators = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.address) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStakeAuthorization_Validators();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address.push(reader.string());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { address: Array.isArray(object?.address) ? object.address.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.address?.length) {
            obj.address = message.address;
        }
        return obj;
    },
    create(base) {
        return StakeAuthorization_Validators.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseStakeAuthorization_Validators();
        message.address = object.address?.map((e) => e) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
