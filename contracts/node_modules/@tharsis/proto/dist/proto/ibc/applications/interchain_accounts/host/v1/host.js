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
            var host;
            (function (host) {
                var v1;
                (function (v1) {
                    class Params extends pb_1.Message {
                        constructor(data) {
                            super();
                            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                            if (!Array.isArray(data) && typeof data == "object") {
                                if ("host_enabled" in data && data.host_enabled != undefined) {
                                    this.host_enabled = data.host_enabled;
                                }
                                if ("allow_messages" in data && data.allow_messages != undefined) {
                                    this.allow_messages = data.allow_messages;
                                }
                            }
                        }
                        get host_enabled() {
                            return pb_1.Message.getField(this, 1);
                        }
                        set host_enabled(value) {
                            pb_1.Message.setField(this, 1, value);
                        }
                        get allow_messages() {
                            return pb_1.Message.getField(this, 2);
                        }
                        set allow_messages(value) {
                            pb_1.Message.setField(this, 2, value);
                        }
                        static fromObject(data) {
                            const message = new Params({});
                            if (data.host_enabled != null) {
                                message.host_enabled = data.host_enabled;
                            }
                            if (data.allow_messages != null) {
                                message.allow_messages = data.allow_messages;
                            }
                            return message;
                        }
                        toObject() {
                            const data = {};
                            if (this.host_enabled != null) {
                                data.host_enabled = this.host_enabled;
                            }
                            if (this.allow_messages != null) {
                                data.allow_messages = this.allow_messages;
                            }
                            return data;
                        }
                        serialize(w) {
                            const writer = w || new pb_1.BinaryWriter();
                            if (this.host_enabled !== undefined)
                                writer.writeBool(1, this.host_enabled);
                            if (this.allow_messages !== undefined)
                                writer.writeRepeatedString(2, this.allow_messages);
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
                                        message.host_enabled = reader.readBool();
                                        break;
                                    case 2:
                                        pb_1.Message.addToRepeatedField(message, 2, reader.readString());
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
                })(v1 = host.v1 || (host.v1 = {}));
            })(host = interchain_accounts.host || (interchain_accounts.host = {}));
        })(interchain_accounts = applications.interchain_accounts || (applications.interchain_accounts = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=host.js.map