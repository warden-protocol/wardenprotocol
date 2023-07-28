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
const pb_1 = __importStar(require("google-protobuf"));
var ethermint;
(function (ethermint) {
    var types;
    (function (types) {
        var v1;
        (function (v1) {
            class ExtensionOptionsWeb3Tx extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("typed_data_chain_id" in data && data.typed_data_chain_id != undefined) {
                            this.typed_data_chain_id = data.typed_data_chain_id;
                        }
                        if ("fee_payer" in data && data.fee_payer != undefined) {
                            this.fee_payer = data.fee_payer;
                        }
                        if ("fee_payer_sig" in data && data.fee_payer_sig != undefined) {
                            this.fee_payer_sig = data.fee_payer_sig;
                        }
                    }
                }
                get typed_data_chain_id() {
                    return pb_1.Message.getField(this, 1);
                }
                set typed_data_chain_id(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get fee_payer() {
                    return pb_1.Message.getField(this, 2);
                }
                set fee_payer(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get fee_payer_sig() {
                    return pb_1.Message.getField(this, 3);
                }
                set fee_payer_sig(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new ExtensionOptionsWeb3Tx({});
                    if (data.typed_data_chain_id != null) {
                        message.typed_data_chain_id = data.typed_data_chain_id;
                    }
                    if (data.fee_payer != null) {
                        message.fee_payer = data.fee_payer;
                    }
                    if (data.fee_payer_sig != null) {
                        message.fee_payer_sig = data.fee_payer_sig;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.typed_data_chain_id != null) {
                        data.typed_data_chain_id = this.typed_data_chain_id;
                    }
                    if (this.fee_payer != null) {
                        data.fee_payer = this.fee_payer;
                    }
                    if (this.fee_payer_sig != null) {
                        data.fee_payer_sig = this.fee_payer_sig;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.typed_data_chain_id !== undefined)
                        writer.writeUint64(1, this.typed_data_chain_id);
                    if (typeof this.fee_payer === "string" && this.fee_payer.length)
                        writer.writeString(2, this.fee_payer);
                    if (this.fee_payer_sig !== undefined)
                        writer.writeBytes(3, this.fee_payer_sig);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ExtensionOptionsWeb3Tx();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.typed_data_chain_id = reader.readUint64();
                                break;
                            case 2:
                                message.fee_payer = reader.readString();
                                break;
                            case 3:
                                message.fee_payer_sig = reader.readBytes();
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
                    return ExtensionOptionsWeb3Tx.deserialize(bytes);
                }
            }
            v1.ExtensionOptionsWeb3Tx = ExtensionOptionsWeb3Tx;
        })(v1 = types.v1 || (types.v1 = {}));
    })(types = ethermint.types || (ethermint.types = {}));
})(ethermint = exports.ethermint || (exports.ethermint = {}));
//# sourceMappingURL=web3.js.map