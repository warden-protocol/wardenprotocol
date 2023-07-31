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
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var applications;
    (function (applications) {
        var transfer;
        (function (transfer) {
            var v2;
            (function (v2) {
                class FungibleTokenPacketData extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("denom" in data && data.denom != undefined) {
                                this.denom = data.denom;
                            }
                            if ("amount" in data && data.amount != undefined) {
                                this.amount = data.amount;
                            }
                            if ("sender" in data && data.sender != undefined) {
                                this.sender = data.sender;
                            }
                            if ("receiver" in data && data.receiver != undefined) {
                                this.receiver = data.receiver;
                            }
                        }
                    }
                    get denom() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set denom(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get amount() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set amount(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get sender() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set sender(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get receiver() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set receiver(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new FungibleTokenPacketData({});
                        if (data.denom != null) {
                            message.denom = data.denom;
                        }
                        if (data.amount != null) {
                            message.amount = data.amount;
                        }
                        if (data.sender != null) {
                            message.sender = data.sender;
                        }
                        if (data.receiver != null) {
                            message.receiver = data.receiver;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.denom != null) {
                            data.denom = this.denom;
                        }
                        if (this.amount != null) {
                            data.amount = this.amount;
                        }
                        if (this.sender != null) {
                            data.sender = this.sender;
                        }
                        if (this.receiver != null) {
                            data.receiver = this.receiver;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.denom === "string" && this.denom.length)
                            writer.writeString(1, this.denom);
                        if (typeof this.amount === "string" && this.amount.length)
                            writer.writeString(2, this.amount);
                        if (typeof this.sender === "string" && this.sender.length)
                            writer.writeString(3, this.sender);
                        if (typeof this.receiver === "string" && this.receiver.length)
                            writer.writeString(4, this.receiver);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new FungibleTokenPacketData();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.denom = reader.readString();
                                    break;
                                case 2:
                                    message.amount = reader.readString();
                                    break;
                                case 3:
                                    message.sender = reader.readString();
                                    break;
                                case 4:
                                    message.receiver = reader.readString();
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
                        return FungibleTokenPacketData.deserialize(bytes);
                    }
                }
                v2.FungibleTokenPacketData = FungibleTokenPacketData;
            })(v2 = transfer.v2 || (transfer.v2 = {}));
        })(transfer = applications.transfer || (applications.transfer = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=packet.js.map