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
        var interchain_accounts;
        (function (interchain_accounts) {
            var v1;
            (function (v1) {
                class Metadata extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("version" in data && data.version != undefined) {
                                this.version = data.version;
                            }
                            if ("controller_connection_id" in data && data.controller_connection_id != undefined) {
                                this.controller_connection_id = data.controller_connection_id;
                            }
                            if ("host_connection_id" in data && data.host_connection_id != undefined) {
                                this.host_connection_id = data.host_connection_id;
                            }
                            if ("address" in data && data.address != undefined) {
                                this.address = data.address;
                            }
                            if ("encoding" in data && data.encoding != undefined) {
                                this.encoding = data.encoding;
                            }
                            if ("tx_type" in data && data.tx_type != undefined) {
                                this.tx_type = data.tx_type;
                            }
                        }
                    }
                    get version() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set version(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get controller_connection_id() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set controller_connection_id(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get host_connection_id() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set host_connection_id(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get address() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set address(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get encoding() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set encoding(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    get tx_type() {
                        return pb_1.Message.getField(this, 6);
                    }
                    set tx_type(value) {
                        pb_1.Message.setField(this, 6, value);
                    }
                    static fromObject(data) {
                        const message = new Metadata({});
                        if (data.version != null) {
                            message.version = data.version;
                        }
                        if (data.controller_connection_id != null) {
                            message.controller_connection_id = data.controller_connection_id;
                        }
                        if (data.host_connection_id != null) {
                            message.host_connection_id = data.host_connection_id;
                        }
                        if (data.address != null) {
                            message.address = data.address;
                        }
                        if (data.encoding != null) {
                            message.encoding = data.encoding;
                        }
                        if (data.tx_type != null) {
                            message.tx_type = data.tx_type;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.version != null) {
                            data.version = this.version;
                        }
                        if (this.controller_connection_id != null) {
                            data.controller_connection_id = this.controller_connection_id;
                        }
                        if (this.host_connection_id != null) {
                            data.host_connection_id = this.host_connection_id;
                        }
                        if (this.address != null) {
                            data.address = this.address;
                        }
                        if (this.encoding != null) {
                            data.encoding = this.encoding;
                        }
                        if (this.tx_type != null) {
                            data.tx_type = this.tx_type;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.version === "string" && this.version.length)
                            writer.writeString(1, this.version);
                        if (typeof this.controller_connection_id === "string" && this.controller_connection_id.length)
                            writer.writeString(2, this.controller_connection_id);
                        if (typeof this.host_connection_id === "string" && this.host_connection_id.length)
                            writer.writeString(3, this.host_connection_id);
                        if (typeof this.address === "string" && this.address.length)
                            writer.writeString(4, this.address);
                        if (typeof this.encoding === "string" && this.encoding.length)
                            writer.writeString(5, this.encoding);
                        if (typeof this.tx_type === "string" && this.tx_type.length)
                            writer.writeString(6, this.tx_type);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Metadata();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.version = reader.readString();
                                    break;
                                case 2:
                                    message.controller_connection_id = reader.readString();
                                    break;
                                case 3:
                                    message.host_connection_id = reader.readString();
                                    break;
                                case 4:
                                    message.address = reader.readString();
                                    break;
                                case 5:
                                    message.encoding = reader.readString();
                                    break;
                                case 6:
                                    message.tx_type = reader.readString();
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
                        return Metadata.deserialize(bytes);
                    }
                }
                v1.Metadata = Metadata;
            })(v1 = interchain_accounts.v1 || (interchain_accounts.v1 = {}));
        })(interchain_accounts = applications.interchain_accounts || (applications.interchain_accounts = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=metadata.js.map