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
const dependency_1 = __importStar(require("./../../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var applications;
    (function (applications) {
        var interchain_accounts;
        (function (interchain_accounts) {
            var v1;
            (function (v1) {
                let Type;
                (function (Type) {
                    Type[Type["TYPE_UNSPECIFIED"] = 0] = "TYPE_UNSPECIFIED";
                    Type[Type["TYPE_EXECUTE_TX"] = 1] = "TYPE_EXECUTE_TX";
                })(Type = v1.Type || (v1.Type = {}));
                class InterchainAccountPacketData extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("type" in data && data.type != undefined) {
                                this.type = data.type;
                            }
                            if ("data" in data && data.data != undefined) {
                                this.data = data.data;
                            }
                            if ("memo" in data && data.memo != undefined) {
                                this.memo = data.memo;
                            }
                        }
                    }
                    get type() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set type(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get data() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set data(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get memo() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set memo(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new InterchainAccountPacketData({});
                        if (data.type != null) {
                            message.type = data.type;
                        }
                        if (data.data != null) {
                            message.data = data.data;
                        }
                        if (data.memo != null) {
                            message.memo = data.memo;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.type != null) {
                            data.type = this.type;
                        }
                        if (this.data != null) {
                            data.data = this.data;
                        }
                        if (this.memo != null) {
                            data.memo = this.memo;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.type !== undefined)
                            writer.writeEnum(1, this.type);
                        if (this.data !== undefined)
                            writer.writeBytes(2, this.data);
                        if (typeof this.memo === "string" && this.memo.length)
                            writer.writeString(3, this.memo);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new InterchainAccountPacketData();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.type = reader.readEnum();
                                    break;
                                case 2:
                                    message.data = reader.readBytes();
                                    break;
                                case 3:
                                    message.memo = reader.readString();
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
                        return InterchainAccountPacketData.deserialize(bytes);
                    }
                }
                v1.InterchainAccountPacketData = InterchainAccountPacketData;
                class CosmosTx extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("messages" in data && data.messages != undefined) {
                                this.messages = data.messages;
                            }
                        }
                    }
                    get messages() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_1.google.protobuf.Any, 1);
                    }
                    set messages(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    static fromObject(data) {
                        const message = new CosmosTx({});
                        if (data.messages != null) {
                            message.messages = data.messages.map(item => dependency_1.google.protobuf.Any.fromObject(item));
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.messages != null) {
                            data.messages = this.messages.map((item) => item.toObject());
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.messages !== undefined)
                            writer.writeRepeatedMessage(1, this.messages, (item) => item.serialize(writer));
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CosmosTx();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    reader.readMessage(message.messages, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_1.google.protobuf.Any.deserialize(reader), dependency_1.google.protobuf.Any));
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
                        return CosmosTx.deserialize(bytes);
                    }
                }
                v1.CosmosTx = CosmosTx;
            })(v1 = interchain_accounts.v1 || (interchain_accounts.v1 = {}));
        })(interchain_accounts = applications.interchain_accounts || (applications.interchain_accounts = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=packet.js.map