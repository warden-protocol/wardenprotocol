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
            class TxResult extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("height" in data && data.height != undefined) {
                            this.height = data.height;
                        }
                        if ("tx_index" in data && data.tx_index != undefined) {
                            this.tx_index = data.tx_index;
                        }
                        if ("msg_index" in data && data.msg_index != undefined) {
                            this.msg_index = data.msg_index;
                        }
                        if ("eth_tx_index" in data && data.eth_tx_index != undefined) {
                            this.eth_tx_index = data.eth_tx_index;
                        }
                        if ("failed" in data && data.failed != undefined) {
                            this.failed = data.failed;
                        }
                        if ("gas_used" in data && data.gas_used != undefined) {
                            this.gas_used = data.gas_used;
                        }
                        if ("cumulative_gas_used" in data && data.cumulative_gas_used != undefined) {
                            this.cumulative_gas_used = data.cumulative_gas_used;
                        }
                    }
                }
                get height() {
                    return pb_1.Message.getField(this, 1);
                }
                set height(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get tx_index() {
                    return pb_1.Message.getField(this, 2);
                }
                set tx_index(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get msg_index() {
                    return pb_1.Message.getField(this, 3);
                }
                set msg_index(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get eth_tx_index() {
                    return pb_1.Message.getField(this, 4);
                }
                set eth_tx_index(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                get failed() {
                    return pb_1.Message.getField(this, 5);
                }
                set failed(value) {
                    pb_1.Message.setField(this, 5, value);
                }
                get gas_used() {
                    return pb_1.Message.getField(this, 6);
                }
                set gas_used(value) {
                    pb_1.Message.setField(this, 6, value);
                }
                get cumulative_gas_used() {
                    return pb_1.Message.getField(this, 7);
                }
                set cumulative_gas_used(value) {
                    pb_1.Message.setField(this, 7, value);
                }
                static fromObject(data) {
                    const message = new TxResult({});
                    if (data.height != null) {
                        message.height = data.height;
                    }
                    if (data.tx_index != null) {
                        message.tx_index = data.tx_index;
                    }
                    if (data.msg_index != null) {
                        message.msg_index = data.msg_index;
                    }
                    if (data.eth_tx_index != null) {
                        message.eth_tx_index = data.eth_tx_index;
                    }
                    if (data.failed != null) {
                        message.failed = data.failed;
                    }
                    if (data.gas_used != null) {
                        message.gas_used = data.gas_used;
                    }
                    if (data.cumulative_gas_used != null) {
                        message.cumulative_gas_used = data.cumulative_gas_used;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.height != null) {
                        data.height = this.height;
                    }
                    if (this.tx_index != null) {
                        data.tx_index = this.tx_index;
                    }
                    if (this.msg_index != null) {
                        data.msg_index = this.msg_index;
                    }
                    if (this.eth_tx_index != null) {
                        data.eth_tx_index = this.eth_tx_index;
                    }
                    if (this.failed != null) {
                        data.failed = this.failed;
                    }
                    if (this.gas_used != null) {
                        data.gas_used = this.gas_used;
                    }
                    if (this.cumulative_gas_used != null) {
                        data.cumulative_gas_used = this.cumulative_gas_used;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.height !== undefined)
                        writer.writeInt64(1, this.height);
                    if (this.tx_index !== undefined)
                        writer.writeUint32(2, this.tx_index);
                    if (this.msg_index !== undefined)
                        writer.writeUint32(3, this.msg_index);
                    if (this.eth_tx_index !== undefined)
                        writer.writeInt32(4, this.eth_tx_index);
                    if (this.failed !== undefined)
                        writer.writeBool(5, this.failed);
                    if (this.gas_used !== undefined)
                        writer.writeUint64(6, this.gas_used);
                    if (this.cumulative_gas_used !== undefined)
                        writer.writeUint64(7, this.cumulative_gas_used);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new TxResult();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.height = reader.readInt64();
                                break;
                            case 2:
                                message.tx_index = reader.readUint32();
                                break;
                            case 3:
                                message.msg_index = reader.readUint32();
                                break;
                            case 4:
                                message.eth_tx_index = reader.readInt32();
                                break;
                            case 5:
                                message.failed = reader.readBool();
                                break;
                            case 6:
                                message.gas_used = reader.readUint64();
                                break;
                            case 7:
                                message.cumulative_gas_used = reader.readUint64();
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
                    return TxResult.deserialize(bytes);
                }
            }
            v1.TxResult = TxResult;
        })(v1 = types.v1 || (types.v1 = {}));
    })(types = ethermint.types || (ethermint.types = {}));
})(ethermint = exports.ethermint || (exports.ethermint = {}));
//# sourceMappingURL=indexer.js.map