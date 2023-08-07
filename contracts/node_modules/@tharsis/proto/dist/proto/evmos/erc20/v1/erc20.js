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
exports.evmos = void 0;
const dependency_2 = __importStar(require("./../../../cosmos/bank/v1beta1/bank"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var erc20;
    (function (erc20) {
        var v1;
        (function (v1) {
            let Owner;
            (function (Owner) {
                Owner[Owner["OWNER_UNSPECIFIED"] = 0] = "OWNER_UNSPECIFIED";
                Owner[Owner["OWNER_MODULE"] = 1] = "OWNER_MODULE";
                Owner[Owner["OWNER_EXTERNAL"] = 2] = "OWNER_EXTERNAL";
            })(Owner = v1.Owner || (v1.Owner = {}));
            class TokenPair extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("erc20_address" in data && data.erc20_address != undefined) {
                            this.erc20_address = data.erc20_address;
                        }
                        if ("denom" in data && data.denom != undefined) {
                            this.denom = data.denom;
                        }
                        if ("enabled" in data && data.enabled != undefined) {
                            this.enabled = data.enabled;
                        }
                        if ("contract_owner" in data && data.contract_owner != undefined) {
                            this.contract_owner = data.contract_owner;
                        }
                    }
                }
                get erc20_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set erc20_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get denom() {
                    return pb_1.Message.getField(this, 2);
                }
                set denom(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get enabled() {
                    return pb_1.Message.getField(this, 3);
                }
                set enabled(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get contract_owner() {
                    return pb_1.Message.getField(this, 4);
                }
                set contract_owner(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new TokenPair({});
                    if (data.erc20_address != null) {
                        message.erc20_address = data.erc20_address;
                    }
                    if (data.denom != null) {
                        message.denom = data.denom;
                    }
                    if (data.enabled != null) {
                        message.enabled = data.enabled;
                    }
                    if (data.contract_owner != null) {
                        message.contract_owner = data.contract_owner;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.erc20_address != null) {
                        data.erc20_address = this.erc20_address;
                    }
                    if (this.denom != null) {
                        data.denom = this.denom;
                    }
                    if (this.enabled != null) {
                        data.enabled = this.enabled;
                    }
                    if (this.contract_owner != null) {
                        data.contract_owner = this.contract_owner;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.erc20_address === "string" && this.erc20_address.length)
                        writer.writeString(1, this.erc20_address);
                    if (typeof this.denom === "string" && this.denom.length)
                        writer.writeString(2, this.denom);
                    if (this.enabled !== undefined)
                        writer.writeBool(3, this.enabled);
                    if (this.contract_owner !== undefined)
                        writer.writeEnum(4, this.contract_owner);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TokenPair();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.erc20_address = reader.readString();
                                break;
                            case 2:
                                message.denom = reader.readString();
                                break;
                            case 3:
                                message.enabled = reader.readBool();
                                break;
                            case 4:
                                message.contract_owner = reader.readEnum();
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
                    return TokenPair.deserialize(bytes);
                }
            }
            v1.TokenPair = TokenPair;
            class RegisterCoinProposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("metadata" in data && data.metadata != undefined) {
                            this.metadata = data.metadata;
                        }
                    }
                }
                get title() {
                    return pb_1.Message.getField(this, 1);
                }
                set title(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get description() {
                    return pb_1.Message.getField(this, 2);
                }
                set description(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get metadata() {
                    return pb_1.Message.getWrapperField(this, dependency_2.cosmos.bank.v1beta1.Metadata, 3);
                }
                set metadata(value) {
                    pb_1.Message.setWrapperField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new RegisterCoinProposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.metadata != null) {
                        message.metadata = dependency_2.cosmos.bank.v1beta1.Metadata.fromObject(data.metadata);
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.title != null) {
                        data.title = this.title;
                    }
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    if (this.metadata != null) {
                        data.metadata = this.metadata.toObject();
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (this.metadata !== undefined)
                        writer.writeMessage(3, this.metadata, () => this.metadata.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RegisterCoinProposal();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.title = reader.readString();
                                break;
                            case 2:
                                message.description = reader.readString();
                                break;
                            case 3:
                                reader.readMessage(message.metadata, () => message.metadata = dependency_2.cosmos.bank.v1beta1.Metadata.deserialize(reader));
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
                    return RegisterCoinProposal.deserialize(bytes);
                }
            }
            v1.RegisterCoinProposal = RegisterCoinProposal;
            class RegisterERC20Proposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("erc20address" in data && data.erc20address != undefined) {
                            this.erc20address = data.erc20address;
                        }
                    }
                }
                get title() {
                    return pb_1.Message.getField(this, 1);
                }
                set title(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get description() {
                    return pb_1.Message.getField(this, 2);
                }
                set description(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get erc20address() {
                    return pb_1.Message.getField(this, 3);
                }
                set erc20address(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new RegisterERC20Proposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.erc20address != null) {
                        message.erc20address = data.erc20address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.title != null) {
                        data.title = this.title;
                    }
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    if (this.erc20address != null) {
                        data.erc20address = this.erc20address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (typeof this.erc20address === "string" && this.erc20address.length)
                        writer.writeString(3, this.erc20address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RegisterERC20Proposal();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.title = reader.readString();
                                break;
                            case 2:
                                message.description = reader.readString();
                                break;
                            case 3:
                                message.erc20address = reader.readString();
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
                    return RegisterERC20Proposal.deserialize(bytes);
                }
            }
            v1.RegisterERC20Proposal = RegisterERC20Proposal;
            class ToggleTokenConversionProposal extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("title" in data && data.title != undefined) {
                            this.title = data.title;
                        }
                        if ("description" in data && data.description != undefined) {
                            this.description = data.description;
                        }
                        if ("token" in data && data.token != undefined) {
                            this.token = data.token;
                        }
                    }
                }
                get title() {
                    return pb_1.Message.getField(this, 1);
                }
                set title(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get description() {
                    return pb_1.Message.getField(this, 2);
                }
                set description(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get token() {
                    return pb_1.Message.getField(this, 3);
                }
                set token(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new ToggleTokenConversionProposal({});
                    if (data.title != null) {
                        message.title = data.title;
                    }
                    if (data.description != null) {
                        message.description = data.description;
                    }
                    if (data.token != null) {
                        message.token = data.token;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.title != null) {
                        data.title = this.title;
                    }
                    if (this.description != null) {
                        data.description = this.description;
                    }
                    if (this.token != null) {
                        data.token = this.token;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.title === "string" && this.title.length)
                        writer.writeString(1, this.title);
                    if (typeof this.description === "string" && this.description.length)
                        writer.writeString(2, this.description);
                    if (typeof this.token === "string" && this.token.length)
                        writer.writeString(3, this.token);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ToggleTokenConversionProposal();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.title = reader.readString();
                                break;
                            case 2:
                                message.description = reader.readString();
                                break;
                            case 3:
                                message.token = reader.readString();
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
                    return ToggleTokenConversionProposal.deserialize(bytes);
                }
            }
            v1.ToggleTokenConversionProposal = ToggleTokenConversionProposal;
        })(v1 = erc20.v1 || (erc20.v1 = {}));
    })(erc20 = evmos.erc20 || (evmos.erc20 = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=erc20.js.map