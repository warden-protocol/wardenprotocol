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
const dependency_2 = __importStar(require("./../../client/v1/genesis"));
const dependency_3 = __importStar(require("./../../connection/v1/genesis"));
const dependency_4 = __importStar(require("./../../channel/v1/genesis"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var types;
        (function (types) {
            var v1;
            (function (v1) {
                class GenesisState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("client_genesis" in data && data.client_genesis != undefined) {
                                this.client_genesis = data.client_genesis;
                            }
                            if ("connection_genesis" in data && data.connection_genesis != undefined) {
                                this.connection_genesis = data.connection_genesis;
                            }
                            if ("channel_genesis" in data && data.channel_genesis != undefined) {
                                this.channel_genesis = data.channel_genesis;
                            }
                        }
                    }
                    get client_genesis() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.core.client.v1.GenesisState, 1);
                    }
                    set client_genesis(value) {
                        pb_1.Message.setWrapperField(this, 1, value);
                    }
                    get connection_genesis() {
                        return pb_1.Message.getWrapperField(this, dependency_3.ibc.core.connection.v1.GenesisState, 2);
                    }
                    set connection_genesis(value) {
                        pb_1.Message.setWrapperField(this, 2, value);
                    }
                    get channel_genesis() {
                        return pb_1.Message.getWrapperField(this, dependency_4.ibc.core.channel.v1.GenesisState, 3);
                    }
                    set channel_genesis(value) {
                        pb_1.Message.setWrapperField(this, 3, value);
                    }
                    static fromObject(data) {
                        const message = new GenesisState({});
                        if (data.client_genesis != null) {
                            message.client_genesis = dependency_2.ibc.core.client.v1.GenesisState.fromObject(data.client_genesis);
                        }
                        if (data.connection_genesis != null) {
                            message.connection_genesis = dependency_3.ibc.core.connection.v1.GenesisState.fromObject(data.connection_genesis);
                        }
                        if (data.channel_genesis != null) {
                            message.channel_genesis = dependency_4.ibc.core.channel.v1.GenesisState.fromObject(data.channel_genesis);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.client_genesis != null) {
                            data.client_genesis = this.client_genesis.toObject();
                        }
                        if (this.connection_genesis != null) {
                            data.connection_genesis = this.connection_genesis.toObject();
                        }
                        if (this.channel_genesis != null) {
                            data.channel_genesis = this.channel_genesis.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.client_genesis !== undefined)
                            writer.writeMessage(1, this.client_genesis, () => this.client_genesis.serialize(writer));
                        if (this.connection_genesis !== undefined)
                            writer.writeMessage(2, this.connection_genesis, () => this.connection_genesis.serialize(writer));
                        if (this.channel_genesis !== undefined)
                            writer.writeMessage(3, this.channel_genesis, () => this.channel_genesis.serialize(writer));
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
                                    reader.readMessage(message.client_genesis, () => message.client_genesis = dependency_2.ibc.core.client.v1.GenesisState.deserialize(reader));
                                    break;
                                case 2:
                                    reader.readMessage(message.connection_genesis, () => message.connection_genesis = dependency_3.ibc.core.connection.v1.GenesisState.deserialize(reader));
                                    break;
                                case 3:
                                    reader.readMessage(message.channel_genesis, () => message.channel_genesis = dependency_4.ibc.core.channel.v1.GenesisState.deserialize(reader));
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
            })(v1 = types.v1 || (types.v1 = {}));
        })(types = core.types || (core.types = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=genesis.js.map