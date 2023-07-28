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
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var revenue;
    (function (revenue) {
        var v1;
        (function (v1) {
            class Revenue extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("contract_address" in data && data.contract_address != undefined) {
                            this.contract_address = data.contract_address;
                        }
                        if ("deployer_address" in data && data.deployer_address != undefined) {
                            this.deployer_address = data.deployer_address;
                        }
                        if ("withdrawer_address" in data && data.withdrawer_address != undefined) {
                            this.withdrawer_address = data.withdrawer_address;
                        }
                    }
                }
                get contract_address() {
                    return pb_1.Message.getField(this, 1);
                }
                set contract_address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get deployer_address() {
                    return pb_1.Message.getField(this, 2);
                }
                set deployer_address(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get withdrawer_address() {
                    return pb_1.Message.getField(this, 3);
                }
                set withdrawer_address(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new Revenue({});
                    if (data.contract_address != null) {
                        message.contract_address = data.contract_address;
                    }
                    if (data.deployer_address != null) {
                        message.deployer_address = data.deployer_address;
                    }
                    if (data.withdrawer_address != null) {
                        message.withdrawer_address = data.withdrawer_address;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.contract_address != null) {
                        data.contract_address = this.contract_address;
                    }
                    if (this.deployer_address != null) {
                        data.deployer_address = this.deployer_address;
                    }
                    if (this.withdrawer_address != null) {
                        data.withdrawer_address = this.withdrawer_address;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.contract_address === "string" && this.contract_address.length)
                        writer.writeString(1, this.contract_address);
                    if (typeof this.deployer_address === "string" && this.deployer_address.length)
                        writer.writeString(2, this.deployer_address);
                    if (typeof this.withdrawer_address === "string" && this.withdrawer_address.length)
                        writer.writeString(3, this.withdrawer_address);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Revenue();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.contract_address = reader.readString();
                                break;
                            case 2:
                                message.deployer_address = reader.readString();
                                break;
                            case 3:
                                message.withdrawer_address = reader.readString();
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
                    return Revenue.deserialize(bytes);
                }
            }
            v1.Revenue = Revenue;
        })(v1 = revenue.v1 || (revenue.v1 = {}));
    })(revenue = evmos.revenue || (evmos.revenue = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=revenue.js.map