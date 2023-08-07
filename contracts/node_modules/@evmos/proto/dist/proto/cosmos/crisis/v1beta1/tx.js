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
    var crisis;
    (function (crisis) {
        var v1beta1;
        (function (v1beta1) {
            class MsgVerifyInvariant extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("sender" in data && data.sender != undefined) {
                            this.sender = data.sender;
                        }
                        if ("invariant_module_name" in data && data.invariant_module_name != undefined) {
                            this.invariant_module_name = data.invariant_module_name;
                        }
                        if ("invariant_route" in data && data.invariant_route != undefined) {
                            this.invariant_route = data.invariant_route;
                        }
                    }
                }
                get sender() {
                    return pb_1.Message.getField(this, 1);
                }
                set sender(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get invariant_module_name() {
                    return pb_1.Message.getField(this, 2);
                }
                set invariant_module_name(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get invariant_route() {
                    return pb_1.Message.getField(this, 3);
                }
                set invariant_route(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new MsgVerifyInvariant({});
                    if (data.sender != null) {
                        message.sender = data.sender;
                    }
                    if (data.invariant_module_name != null) {
                        message.invariant_module_name = data.invariant_module_name;
                    }
                    if (data.invariant_route != null) {
                        message.invariant_route = data.invariant_route;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.sender != null) {
                        data.sender = this.sender;
                    }
                    if (this.invariant_module_name != null) {
                        data.invariant_module_name = this.invariant_module_name;
                    }
                    if (this.invariant_route != null) {
                        data.invariant_route = this.invariant_route;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.sender === "string" && this.sender.length)
                        writer.writeString(1, this.sender);
                    if (typeof this.invariant_module_name === "string" && this.invariant_module_name.length)
                        writer.writeString(2, this.invariant_module_name);
                    if (typeof this.invariant_route === "string" && this.invariant_route.length)
                        writer.writeString(3, this.invariant_route);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgVerifyInvariant();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.sender = reader.readString();
                                break;
                            case 2:
                                message.invariant_module_name = reader.readString();
                                break;
                            case 3:
                                message.invariant_route = reader.readString();
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
                    return MsgVerifyInvariant.deserialize(bytes);
                }
            }
            v1beta1.MsgVerifyInvariant = MsgVerifyInvariant;
            class MsgVerifyInvariantResponse extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") { }
                }
                static fromObject(data) {
                    const message = new MsgVerifyInvariantResponse({});
                    return message;
                }
                toObject() {
                    const data = {};
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MsgVerifyInvariantResponse();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            default: reader.skipField();
                        }
                    }
                    return message;
                }
                serializeBinary() {
                    return this.serialize();
                }
                static deserializeBinary(bytes) {
                    return MsgVerifyInvariantResponse.deserialize(bytes);
                }
            }
            v1beta1.MsgVerifyInvariantResponse = MsgVerifyInvariantResponse;
        })(v1beta1 = crisis.v1beta1 || (crisis.v1beta1 = {}));
    })(crisis = cosmos.crisis || (cosmos.crisis = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=tx.js.map