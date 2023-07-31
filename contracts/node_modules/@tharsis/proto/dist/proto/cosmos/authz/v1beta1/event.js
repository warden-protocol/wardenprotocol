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
exports.cosmos = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var authz;
    (function (authz) {
        var v1beta1;
        (function (v1beta1) {
            class EventGrant extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("msg_type_url" in data && data.msg_type_url != undefined) {
                            this.msg_type_url = data.msg_type_url;
                        }
                        if ("granter" in data && data.granter != undefined) {
                            this.granter = data.granter;
                        }
                        if ("grantee" in data && data.grantee != undefined) {
                            this.grantee = data.grantee;
                        }
                    }
                }
                get msg_type_url() {
                    return pb_1.Message.getField(this, 2);
                }
                set msg_type_url(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get granter() {
                    return pb_1.Message.getField(this, 3);
                }
                set granter(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get grantee() {
                    return pb_1.Message.getField(this, 4);
                }
                set grantee(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new EventGrant({});
                    if (data.msg_type_url != null) {
                        message.msg_type_url = data.msg_type_url;
                    }
                    if (data.granter != null) {
                        message.granter = data.granter;
                    }
                    if (data.grantee != null) {
                        message.grantee = data.grantee;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.msg_type_url != null) {
                        data.msg_type_url = this.msg_type_url;
                    }
                    if (this.granter != null) {
                        data.granter = this.granter;
                    }
                    if (this.grantee != null) {
                        data.grantee = this.grantee;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.msg_type_url === "string" && this.msg_type_url.length)
                        writer.writeString(2, this.msg_type_url);
                    if (typeof this.granter === "string" && this.granter.length)
                        writer.writeString(3, this.granter);
                    if (typeof this.grantee === "string" && this.grantee.length)
                        writer.writeString(4, this.grantee);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventGrant();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 2:
                                message.msg_type_url = reader.readString();
                                break;
                            case 3:
                                message.granter = reader.readString();
                                break;
                            case 4:
                                message.grantee = reader.readString();
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
                    return EventGrant.deserialize(bytes);
                }
            }
            v1beta1.EventGrant = EventGrant;
            class EventRevoke extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("msg_type_url" in data && data.msg_type_url != undefined) {
                            this.msg_type_url = data.msg_type_url;
                        }
                        if ("granter" in data && data.granter != undefined) {
                            this.granter = data.granter;
                        }
                        if ("grantee" in data && data.grantee != undefined) {
                            this.grantee = data.grantee;
                        }
                    }
                }
                get msg_type_url() {
                    return pb_1.Message.getField(this, 2);
                }
                set msg_type_url(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get granter() {
                    return pb_1.Message.getField(this, 3);
                }
                set granter(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                get grantee() {
                    return pb_1.Message.getField(this, 4);
                }
                set grantee(value) {
                    pb_1.Message.setField(this, 4, value);
                }
                static fromObject(data) {
                    const message = new EventRevoke({});
                    if (data.msg_type_url != null) {
                        message.msg_type_url = data.msg_type_url;
                    }
                    if (data.granter != null) {
                        message.granter = data.granter;
                    }
                    if (data.grantee != null) {
                        message.grantee = data.grantee;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.msg_type_url != null) {
                        data.msg_type_url = this.msg_type_url;
                    }
                    if (this.granter != null) {
                        data.granter = this.granter;
                    }
                    if (this.grantee != null) {
                        data.grantee = this.grantee;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.msg_type_url === "string" && this.msg_type_url.length)
                        writer.writeString(2, this.msg_type_url);
                    if (typeof this.granter === "string" && this.granter.length)
                        writer.writeString(3, this.granter);
                    if (typeof this.grantee === "string" && this.grantee.length)
                        writer.writeString(4, this.grantee);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventRevoke();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 2:
                                message.msg_type_url = reader.readString();
                                break;
                            case 3:
                                message.granter = reader.readString();
                                break;
                            case 4:
                                message.grantee = reader.readString();
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
                    return EventRevoke.deserialize(bytes);
                }
            }
            v1beta1.EventRevoke = EventRevoke;
        })(v1beta1 = authz.v1beta1 || (authz.v1beta1 = {}));
    })(authz = cosmos.authz || (cosmos.authz = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=event.js.map