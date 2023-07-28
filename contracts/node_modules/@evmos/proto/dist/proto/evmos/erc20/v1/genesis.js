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
const dependency_1 = __importStar(require("./erc20"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var erc20;
    (function (erc20) {
        var v1;
        (function (v1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("params" in data && data.params != undefined) {
                            this.params = data.params;
                        }
                        if ("token_pairs" in data && data.token_pairs != undefined) {
                            this.token_pairs = data.token_pairs;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get token_pairs() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.evmos.erc20.v1.TokenPair, 2);
                }
                set token_pairs(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = Params.fromObject(data.params);
                    }
                    if (data.token_pairs != null) {
                        message.token_pairs = data.token_pairs.map(item => dependency_1.evmos.erc20.v1.TokenPair.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.token_pairs != null) {
                        data.token_pairs = this.token_pairs.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.token_pairs !== undefined)
                        writer.writeRepeatedMessage(2, this.token_pairs, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GenesisState();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                reader.readMessage(message.params, () => message.params = Params.deserialize(reader));
                                break;
                            case 2:
                                reader.readMessage(message.token_pairs, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_1.evmos.erc20.v1.TokenPair.deserialize(reader), dependency_1.evmos.erc20.v1.TokenPair));
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
                    return GenesisState.deserialize(bytes);
                }
            }
            v1.GenesisState = GenesisState;
            class Params extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("enable_erc20" in data && data.enable_erc20 != undefined) {
                            this.enable_erc20 = data.enable_erc20;
                        }
                        if ("enable_evm_hook" in data && data.enable_evm_hook != undefined) {
                            this.enable_evm_hook = data.enable_evm_hook;
                        }
                    }
                }
                get enable_erc20() {
                    return pb_1.Message.getField(this, 1);
                }
                set enable_erc20(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get enable_evm_hook() {
                    return pb_1.Message.getField(this, 2);
                }
                set enable_evm_hook(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.enable_erc20 != null) {
                        message.enable_erc20 = data.enable_erc20;
                    }
                    if (data.enable_evm_hook != null) {
                        message.enable_evm_hook = data.enable_evm_hook;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.enable_erc20 != null) {
                        data.enable_erc20 = this.enable_erc20;
                    }
                    if (this.enable_evm_hook != null) {
                        data.enable_evm_hook = this.enable_evm_hook;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.enable_erc20 !== undefined)
                        writer.writeBool(1, this.enable_erc20);
                    if (this.enable_evm_hook !== undefined)
                        writer.writeBool(2, this.enable_evm_hook);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Params();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.enable_erc20 = reader.readBool();
                                break;
                            case 2:
                                message.enable_evm_hook = reader.readBool();
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
                    return Params.deserialize(bytes);
                }
            }
            v1.Params = Params;
        })(v1 = erc20.v1 || (erc20.v1 = {}));
    })(erc20 = evmos.erc20 || (evmos.erc20 = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=genesis.js.map