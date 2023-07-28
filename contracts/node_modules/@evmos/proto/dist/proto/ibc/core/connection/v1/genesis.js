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
const dependency_2 = __importStar(require("./connection"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var core;
    (function (core) {
        var connection;
        (function (connection) {
            var v1;
            (function (v1) {
                class GenesisState extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1, 2], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("connections" in data && data.connections != undefined) {
                                this.connections = data.connections;
                            }
                            if ("client_connection_paths" in data && data.client_connection_paths != undefined) {
                                this.client_connection_paths = data.client_connection_paths;
                            }
                            if ("next_connection_sequence" in data && data.next_connection_sequence != undefined) {
                                this.next_connection_sequence = data.next_connection_sequence;
                            }
                            if ("params" in data && data.params != undefined) {
                                this.params = data.params;
                            }
                        }
                    }
                    get connections() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.connection.v1.IdentifiedConnection, 1);
                    }
                    set connections(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 1, value);
                    }
                    get client_connection_paths() {
                        return pb_1.Message.getRepeatedWrapperField(this, dependency_2.ibc.core.connection.v1.ConnectionPaths, 2);
                    }
                    set client_connection_paths(value) {
                        pb_1.Message.setRepeatedWrapperField(this, 2, value);
                    }
                    get next_connection_sequence() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set next_connection_sequence(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get params() {
                        return pb_1.Message.getWrapperField(this, dependency_2.ibc.core.connection.v1.Params, 4);
                    }
                    set params(value) {
                        pb_1.Message.setWrapperField(this, 4, value);
                    }
                    static fromObject(data) {
                        const message = new GenesisState({});
                        if (data.connections != null) {
                            message.connections = data.connections.map(item => dependency_2.ibc.core.connection.v1.IdentifiedConnection.fromObject(item));
                        }
                        if (data.client_connection_paths != null) {
                            message.client_connection_paths = data.client_connection_paths.map(item => dependency_2.ibc.core.connection.v1.ConnectionPaths.fromObject(item));
                        }
                        if (data.next_connection_sequence != null) {
                            message.next_connection_sequence = data.next_connection_sequence;
                        }
                        if (data.params != null) {
                            message.params = dependency_2.ibc.core.connection.v1.Params.fromObject(data.params);
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.connections != null) {
                            data.connections = this.connections.map((item) => item.toObject());
                        }
                        if (this.client_connection_paths != null) {
                            data.client_connection_paths = this.client_connection_paths.map((item) => item.toObject());
                        }
                        if (this.next_connection_sequence != null) {
                            data.next_connection_sequence = this.next_connection_sequence;
                        }
                        if (this.params != null) {
                            data.params = this.params.toObject();
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.connections !== undefined)
                            writer.writeRepeatedMessage(1, this.connections, (item) => item.serialize(writer));
                        if (this.client_connection_paths !== undefined)
                            writer.writeRepeatedMessage(2, this.client_connection_paths, (item) => item.serialize(writer));
                        if (this.next_connection_sequence !== undefined)
                            writer.writeUint64(3, this.next_connection_sequence);
                        if (this.params !== undefined)
                            writer.writeMessage(4, this.params, () => this.params.serialize(writer));
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
                                    reader.readMessage(message.connections, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_2.ibc.core.connection.v1.IdentifiedConnection.deserialize(reader), dependency_2.ibc.core.connection.v1.IdentifiedConnection));
                                    break;
                                case 2:
                                    reader.readMessage(message.client_connection_paths, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.ibc.core.connection.v1.ConnectionPaths.deserialize(reader), dependency_2.ibc.core.connection.v1.ConnectionPaths));
                                    break;
                                case 3:
                                    message.next_connection_sequence = reader.readUint64();
                                    break;
                                case 4:
                                    reader.readMessage(message.params, () => message.params = dependency_2.ibc.core.connection.v1.Params.deserialize(reader));
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
            })(v1 = connection.v1 || (connection.v1 = {}));
        })(connection = core.connection || (core.connection = {}));
    })(core = ibc.core || (ibc.core = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=genesis.js.map