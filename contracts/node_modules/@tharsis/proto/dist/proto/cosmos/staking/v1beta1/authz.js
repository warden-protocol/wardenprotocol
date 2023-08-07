"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosmos = void 0;
const dependency_3 = __importStar(require("./../../base/v1beta1/coin"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var staking;
    (function (staking) {
        var v1beta1;
        (function (v1beta1) {
            let AuthorizationType;
            (function (AuthorizationType) {
                AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_UNSPECIFIED"] = 0] = "AUTHORIZATION_TYPE_UNSPECIFIED";
                AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_DELEGATE"] = 1] = "AUTHORIZATION_TYPE_DELEGATE";
                AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_UNDELEGATE"] = 2] = "AUTHORIZATION_TYPE_UNDELEGATE";
                AuthorizationType[AuthorizationType["AUTHORIZATION_TYPE_REDELEGATE"] = 3] = "AUTHORIZATION_TYPE_REDELEGATE";
            })(AuthorizationType = v1beta1.AuthorizationType || (v1beta1.AuthorizationType = {}));
            class StakeAuthorization extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[2, 3]]);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("max_tokens" in data && data.max_tokens != undefined) {
                            this.max_tokens = data.max_tokens;
                        }
                        if ("allow_list" in data && data.allow_list != undefined) {
                            this.allow_list = data.allow_list;
                        }
                        if ("deny_list" in data && data.deny_list != undefined) {
                            this.deny_list = data.deny_list;
                        }
                        if ("authorization_type" in data && data.authorization_type != undefined) {
                            this.authorization_type = data.authorization_type;
                        }
                    }
                }
                get max_tokens() {
                    return pb_1.Message.getWrapperField(this, dependency_3.cosmos.base.v1beta1.Coin, 1);
                }
                set max_tokens(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get allow_list() {
                    return pb_1.Message.getWrapperField(this, StakeAuthorization.Validators, 2);
                }
                set allow_list(value) {
                    pb_1.Message.setOneofWrapperField(this, 2, [2, 3], value);
                }
                get deny_list() {
                    return pb_1.Message.getWrapperField(this, StakeAuthorization.Validators, 3);
                }
                set deny_list(value) {
                    pb_1.Message.setOneofWrapperField(this, 3, [2, 3], value);
                }
                get authorization_type() {
                    return pb_1.Message.getField(this, 4);
                }
                set authorization_type(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get validators() {
                    const cases = {
                        0: "none",
                        2: "allow_list",
                        3: "deny_list"
                    };
                    return cases[pb_1.Message.computeOneofCase(this, [2, 3])];
                }
                static fromObject(data) {
                    const message = new StakeAuthorization({});
                    if (data.max_tokens != null) {
                        message.max_tokens = dependency_3.cosmos.base.v1beta1.Coin.fromObject(data.max_tokens);
                    }
                    if (data.allow_list != null) {
                        message.allow_list = StakeAuthorization.Validators.fromObject(data.allow_list);
                    }
                    if (data.deny_list != null) {
                        message.deny_list = StakeAuthorization.Validators.fromObject(data.deny_list);
                    }
                    if (data.authorization_type != null) {
                        message.authorization_type = data.authorization_type;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.max_tokens != null) {
                        data.max_tokens = this.max_tokens.toObject();
                    }
                    if (this.allow_list != null) {
                        data.allow_list = this.allow_list.toObject();
                    }
                    if (this.deny_list != null) {
                        data.deny_list = this.deny_list.toObject();
                    }
                    if (this.authorization_type != null) {
                        data.authorization_type = this.authorization_type;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.max_tokens !== undefined)
                        writer.writeMessage(1, this.max_tokens, () => this.max_tokens.serialize(writer));
                    if (this.allow_list !== undefined)
                        writer.writeMessage(2, this.allow_list, () => this.allow_list.serialize(writer));
                    if (this.deny_list !== undefined)
                        writer.writeMessage(3, this.deny_list, () => this.deny_list.serialize(writer));
                    if (this.authorization_type !== undefined)
                        writer.writeEnum(4, this.authorization_type);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new StakeAuthorization();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.max_tokens, () => message.max_tokens = dependency_3.cosmos.base.v1beta1.Coin.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.allow_list, () => message.allow_list = StakeAuthorization.Validators.deserialize(reader));
                                break;
                            case 3:
                                reader.readMessage(message.deny_list, () => message.deny_list = StakeAuthorization.Validators.deserialize(reader));
                                break;
                            case 4:
                                message.authorization_type = reader.readEnum();
                                break;
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return StakeAuthorization.deserialize(bytes);
                }
            }
            v1beta1.StakeAuthorization = StakeAuthorization;
            (function (StakeAuthorization) {
                class Validators extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("address" in data && data.address != undefined) {
                                this.address = data.address;
                            }
                        }
                    }
                    get address() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set address(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new Validators({});
                        if (data.address != null) {
                            message.address = data.address;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.address != null) {
                            data.address = this.address;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.address !== undefined)
                            writer.writeRepeatedString(1, this.address);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Validators();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    pb_1.Message.addToRepeatedField(message, 1, reader.readString());
                                    break;
                                default: reader.skipField();
                            }
                        }
                        return message;
                    }
                    serializeBinary() {
                        return this.serialize();
                    }
                    static deserializeBinary(bytes) {
                        return Validators.deserialize(bytes);
                    }
                }
                StakeAuthorization.Validators = Validators;
            })(StakeAuthorization = v1beta1.StakeAuthorization || (v1beta1.StakeAuthorization = {}));
        })(v1beta1 = staking.v1beta1 || (staking.v1beta1 = {}));
    })(staking = cosmos.staking || (cosmos.staking = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=authz.js.map