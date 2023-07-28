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
const dependency_1 = __importStar(require("./revenue"));
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var revenue;
    (function (revenue) {
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
                        if ("revenues" in data && data.revenues != undefined) {
                            this.revenues = data.revenues;
                        }
                    }
                }
                get params() {
                    return pb_1.Message.getWrapperField(this, Params, 1);
                }
                set params(value) {
                    pb_1.Message.setWrapperField(this, 1, value);
                }
                get revenues() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.evmos.revenue.v1.Revenue, 2);
                }
                set revenues(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.params != null) {
                        message.params = Params.fromObject(data.params);
                    }
                    if (data.revenues != null) {
                        message.revenues = data.revenues.map(item => dependency_1.evmos.revenue.v1.Revenue.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.params != null) {
                        data.params = this.params.toObject();
                    }
                    if (this.revenues != null) {
                        data.revenues = this.revenues.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.params !== undefined)
                        writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                    if (this.revenues !== undefined)
                        writer.writeRepeatedMessage(2, this.revenues, (item) => item.serialize(writer));
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
                                reader.readMessage(message.revenues, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_1.evmos.revenue.v1.Revenue.deserialize(reader), dependency_1.evmos.revenue.v1.Revenue));
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
                        if ("enable_revenue" in data && data.enable_revenue != undefined) {
                            this.enable_revenue = data.enable_revenue;
                        }
                        if ("developer_shares" in data && data.developer_shares != undefined) {
                            this.developer_shares = data.developer_shares;
                        }
                        if ("addr_derivation_cost_create" in data && data.addr_derivation_cost_create != undefined) {
                            this.addr_derivation_cost_create = data.addr_derivation_cost_create;
                        }
                    }
                }
                get enable_revenue() {
                    return pb_1.Message.getField(this, 1);
                }
                set enable_revenue(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get developer_shares() {
                    return pb_1.Message.getField(this, 2);
                }
                set developer_shares(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get addr_derivation_cost_create() {
                    return pb_1.Message.getField(this, 3);
                }
                set addr_derivation_cost_create(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new Params({});
                    if (data.enable_revenue != null) {
                        message.enable_revenue = data.enable_revenue;
                    }
                    if (data.developer_shares != null) {
                        message.developer_shares = data.developer_shares;
                    }
                    if (data.addr_derivation_cost_create != null) {
                        message.addr_derivation_cost_create = data.addr_derivation_cost_create;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.enable_revenue != null) {
                        data.enable_revenue = this.enable_revenue;
                    }
                    if (this.developer_shares != null) {
                        data.developer_shares = this.developer_shares;
                    }
                    if (this.addr_derivation_cost_create != null) {
                        data.addr_derivation_cost_create = this.addr_derivation_cost_create;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.enable_revenue !== undefined)
                        writer.writeBool(1, this.enable_revenue);
                    if (typeof this.developer_shares === "string" && this.developer_shares.length)
                        writer.writeString(2, this.developer_shares);
                    if (this.addr_derivation_cost_create !== undefined)
                        writer.writeUint64(3, this.addr_derivation_cost_create);
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
                                message.enable_revenue = reader.readBool();
                                break;
                            case 2:
                                message.developer_shares = reader.readString();
                                break;
                            case 3:
                                message.addr_derivation_cost_create = reader.readUint64();
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
        })(v1 = revenue.v1 || (revenue.v1 = {}));
    })(revenue = evmos.revenue || (evmos.revenue = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=genesis.js.map