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
exports.ethermint = void 0;
const dependency_1 = __importStar(require("./../../../cosmos/auth/v1beta1/auth"));
const pb_1 = __importStar(require("google-protobuf"));
var ethermint;
(function (ethermint) {
    var types;
    (function (types) {
        var v1;
        (function (v1) {
            class EthAccount extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("base_account" in data && data.base_account != undefined) {
                            this.base_account = data.base_account;
                        }
                        if ("code_hash" in data && data.code_hash != undefined) {
                            this.code_hash = data.code_hash;
                        }
                    }
                }
                get base_account() {
                    return pb_1.Message.getWrapperField(this, dependency_1.cosmos.auth.v1beta1.BaseAccount, 1);
                }
                set base_account(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get code_hash() {
                    return pb_1.Message.getField(this, 2);
                }
                set code_hash(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new EthAccount({});
                    if (data.base_account != null) {
                        message.base_account = dependency_1.cosmos.auth.v1beta1.BaseAccount.fromObject(data.base_account);
                    }
                    if (data.code_hash != null) {
                        message.code_hash = data.code_hash;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.base_account != null) {
                        data.base_account = this.base_account.toObject();
                    }
                    if (this.code_hash != null) {
                        data.code_hash = this.code_hash;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.base_account !== undefined)
                        writer.writeMessage(1, this.base_account, () => this.base_account.serialize(writer));
                    if (typeof this.code_hash === "string" && this.code_hash.length)
                        writer.writeString(2, this.code_hash);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EthAccount();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.base_account, () => message.base_account = dependency_1.cosmos.auth.v1beta1.BaseAccount.deserialize(reader));
                                break;
                            case 2:
                                message.code_hash = reader.readString();
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
                    return EthAccount.deserialize(bytes);
                }
            }
            v1.EthAccount = EthAccount;
        })(v1 = types.v1 || (types.v1 = {}));
    })(types = ethermint.types || (ethermint.types = {}));
})(ethermint = exports.ethermint || (exports.ethermint = {}));
//# sourceMappingURL=account.js.map