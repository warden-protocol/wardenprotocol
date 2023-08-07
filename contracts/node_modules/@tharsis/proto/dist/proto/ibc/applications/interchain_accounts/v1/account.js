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
exports.ibc = void 0;
const dependency_3 = __importStar(require("./../../../../cosmos/auth/v1beta1/auth"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var applications;
    (function (applications) {
        var interchain_accounts;
        (function (interchain_accounts) {
            var v1;
            (function (v1) {
                class InterchainAccount extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("base_account" in data && data.base_account != undefined) {
                                this.base_account = data.base_account;
                            }
                            if ("account_owner" in data && data.account_owner != undefined) {
                                this.account_owner = data.account_owner;
                            }
                        }
                    }
                    get base_account() {
                        return pb_1.Message.getWrapperField(this, dependency_3.cosmos.auth.v1beta1.BaseAccount, 1);
                    }
                    set base_account(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get account_owner() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set account_owner(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new InterchainAccount({});
                        if (data.base_account != null) {
                            message.base_account = dependency_3.cosmos.auth.v1beta1.BaseAccount.fromObject(data.base_account);
                        }
                        if (data.account_owner != null) {
                            message.account_owner = data.account_owner;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.base_account != null) {
                            data.base_account = this.base_account.toObject();
                        }
                        if (this.account_owner != null) {
                            data.account_owner = this.account_owner;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.base_account !== undefined)
                            writer.writeMessage(1, this.base_account, () => this.base_account.serialize(writer));
                        if (typeof this.account_owner === "string" && this.account_owner.length)
                            writer.writeString(2, this.account_owner);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new InterchainAccount();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.base_account, () => message.base_account = dependency_3.cosmos.auth.v1beta1.BaseAccount.deserialize(reader));
                                    break;
                                case 2:
                                    message.account_owner = reader.readString();
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
                        return InterchainAccount.deserialize(bytes);
                    }
                }
                v1.InterchainAccount = InterchainAccount;
            })(v1 = interchain_accounts.v1 || (interchain_accounts.v1 = {}));
        })(interchain_accounts = applications.interchain_accounts || (applications.interchain_accounts = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=account.js.map