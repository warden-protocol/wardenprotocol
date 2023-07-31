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
            var v1;
            (function (v1) {
                class DenomTrace extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("path" in data && data.path != undefined) {
                                this.path = data.path;
                            }
                            if ("base_denom" in data && data.base_denom != undefined) {
                                this.base_denom = data.base_denom;
                            }
                        }
                    }
                    get path() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set path(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get base_denom() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set base_denom(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new DenomTrace({});
                        if (data.path != null) {
                            message.path = data.path;
                        }
                        if (data.base_denom != null) {
                            message.base_denom = data.base_denom;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.path != null) {
                            data.path = this.path;
                        }
                        if (this.base_denom != null) {
                            data.base_denom = this.base_denom;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (typeof this.path === "string" && this.path.length)
                            writer.writeString(1, this.path);
                        if (typeof this.base_denom === "string" && this.base_denom.length)
                            writer.writeString(2, this.base_denom);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DenomTrace();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.path = reader.readString();
                                    break;
                                case 2:
                                    message.base_denom = reader.readString();
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
                        return DenomTrace.deserialize(bytes);
                    }
                }
                v1.DenomTrace = DenomTrace;
                class Params extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("send_enabled" in data && data.send_enabled != undefined) {
                                this.send_enabled = data.send_enabled;
                            }
                            if ("receive_enabled" in data && data.receive_enabled != undefined) {
                                this.receive_enabled = data.receive_enabled;
                            }
                        }
                    }
                    get send_enabled() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set send_enabled(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get receive_enabled() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set receive_enabled(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new Params({});
                        if (data.send_enabled != null) {
                            message.send_enabled = data.send_enabled;
                        }
                        if (data.receive_enabled != null) {
                            message.receive_enabled = data.receive_enabled;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.send_enabled != null) {
                            data.send_enabled = this.send_enabled;
                        }
                        if (this.receive_enabled != null) {
                            data.receive_enabled = this.receive_enabled;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.send_enabled !== undefined)
                            writer.writeBool(1, this.send_enabled);
                        if (this.receive_enabled !== undefined)
                            writer.writeBool(2, this.receive_enabled);
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
                                    message.send_enabled = reader.readBool();
                                    break;
                                case 2:
                                    message.receive_enabled = reader.readBool();
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
            })(v1 = transfer.v1 || (transfer.v1 = {}));
        })(transfer = applications.transfer || (applications.transfer = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=transfer.js.map