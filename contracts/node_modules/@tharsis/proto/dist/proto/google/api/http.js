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
exports.google = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var google;
(function (google) {
    var api;
    (function (api) {
        class Http extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("rules" in data && data.rules != undefined) {
                        this.rules = data.rules;
                    }
                    if ("fully_decode_reserved_expansion" in data && data.fully_decode_reserved_expansion != undefined) {
                        this.fully_decode_reserved_expansion = data.fully_decode_reserved_expansion;
                    }
                }
            }
            get rules() {
                return pb_1.Message.getRepeatedWrapperField(this, HttpRule, 1);
            }
            set rules(value) {
                pb_1.Message.setRepeatedWrapperField(this, 1, value);
            }
            get fully_decode_reserved_expansion() {
                return pb_1.Message.getField(this, 2);
            }
            set fully_decode_reserved_expansion(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new Http({});
                if (data.rules != null) {
                    message.rules = data.rules.map(item => HttpRule.fromObject(item));
                }
                if (data.fully_decode_reserved_expansion != null) {
                    message.fully_decode_reserved_expansion = data.fully_decode_reserved_expansion;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.rules != null) {
                    data.rules = this.rules.map((item) => item.toObject());
                }
                if (this.fully_decode_reserved_expansion != null) {
                    data.fully_decode_reserved_expansion = this.fully_decode_reserved_expansion;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.rules !== undefined)
                    writer.writeRepeatedMessage(1, this.rules, (item) => item.serialize(writer));
                if (this.fully_decode_reserved_expansion !== undefined)
                    writer.writeBool(2, this.fully_decode_reserved_expansion);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Http();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            reader.readMessage(message.rules, () => pb_1.Message.addToRepeatedWrapperField(message, 1, HttpRule.deserialize(reader), HttpRule));
                            break;
                        case 2:
                            message.fully_decode_reserved_expansion = reader.readBool();
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
                return Http.deserialize(bytes);
            }
        }
        api.Http = Http;
        class HttpRule extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [11], [[2, 3, 4, 5, 6, 8]]);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("selector" in data && data.selector != undefined) {
                        this.selector = data.selector;
                    }
                    if ("get" in data && data.get != undefined) {
                        this.get = data.get;
                    }
                    if ("put" in data && data.put != undefined) {
                        this.put = data.put;
                    }
                    if ("post" in data && data.post != undefined) {
                        this.post = data.post;
                    }
                    if ("delete" in data && data.delete != undefined) {
                        this.delete = data.delete;
                    }
                    if ("patch" in data && data.patch != undefined) {
                        this.patch = data.patch;
                    }
                    if ("custom" in data && data.custom != undefined) {
                        this.custom = data.custom;
                    }
                    if ("body" in data && data.body != undefined) {
                        this.body = data.body;
                    }
                    if ("response_body" in data && data.response_body != undefined) {
                        this.response_body = data.response_body;
                    }
                    if ("additional_bindings" in data && data.additional_bindings != undefined) {
                        this.additional_bindings = data.additional_bindings;
                    }
                }
            }
            get selector() {
                return pb_1.Message.getField(this, 1);
            }
            set selector(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get get() {
                return pb_1.Message.getField(this, 2);
            }
            set get(value) {
                pb_1.Message.setOneofField(this, 2, [2, 3, 4, 5, 6, 8], value);
            }
            get put() {
                return pb_1.Message.getField(this, 3);
            }
            set put(value) {
                pb_1.Message.setOneofField(this, 3, [2, 3, 4, 5, 6, 8], value);
            }
            get post() {
                return pb_1.Message.getField(this, 4);
            }
            set post(value) {
                pb_1.Message.setOneofField(this, 4, [2, 3, 4, 5, 6, 8], value);
            }
            get delete() {
                return pb_1.Message.getField(this, 5);
            }
            set delete(value) {
                pb_1.Message.setOneofField(this, 5, [2, 3, 4, 5, 6, 8], value);
            }
            get patch() {
                return pb_1.Message.getField(this, 6);
            }
            set patch(value) {
                pb_1.Message.setOneofField(this, 6, [2, 3, 4, 5, 6, 8], value);
            }
            get custom() {
                return pb_1.Message.getWrapperField(this, CustomHttpPattern, 8);
            }
            set custom(value) {
                pb_1.Message.setOneofWrapperField(this, 8, [2, 3, 4, 5, 6, 8], value);
            }
            get body() {
                return pb_1.Message.getField(this, 7);
            }
            set body(value) {
                pb_1.Message.setField(this, 7, value);
            }
            get response_body() {
                return pb_1.Message.getField(this, 12);
            }
            set response_body(value) {
                pb_1.Message.setField(this, 12, value);
            }
            get additional_bindings() {
                return pb_1.Message.getRepeatedWrapperField(this, HttpRule, 11);
            }
            set additional_bindings(value) {
                pb_1.Message.setRepeatedWrapperField(this, 11, value);
            }
            get pattern() {
                const cases = {
                    0: "none",
                    2: "get",
                    3: "put",
                    4: "post",
                    5: "delete",
                    6: "patch",
                    8: "custom"
                };
                return cases[pb_1.Message.computeOneofCase(this, [2, 3, 4, 5, 6, 8])];
            }
            static fromObject(data) {
                const message = new HttpRule({});
                if (data.selector != null) {
                    message.selector = data.selector;
                }
                if (data.get != null) {
                    message.get = data.get;
                }
                if (data.put != null) {
                    message.put = data.put;
                }
                if (data.post != null) {
                    message.post = data.post;
                }
                if (data.delete != null) {
                    message.delete = data.delete;
                }
                if (data.patch != null) {
                    message.patch = data.patch;
                }
                if (data.custom != null) {
                    message.custom = CustomHttpPattern.fromObject(data.custom);
                }
                if (data.body != null) {
                    message.body = data.body;
                }
                if (data.response_body != null) {
                    message.response_body = data.response_body;
                }
                if (data.additional_bindings != null) {
                    message.additional_bindings = data.additional_bindings.map(item => HttpRule.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.selector != null) {
                    data.selector = this.selector;
                }
                if (this.get != null) {
                    data.get = this.get;
                }
                if (this.put != null) {
                    data.put = this.put;
                }
                if (this.post != null) {
                    data.post = this.post;
                }
                if (this.delete != null) {
                    data.delete = this.delete;
                }
                if (this.patch != null) {
                    data.patch = this.patch;
                }
                if (this.custom != null) {
                    data.custom = this.custom.toObject();
                }
                if (this.body != null) {
                    data.body = this.body;
                }
                if (this.response_body != null) {
                    data.response_body = this.response_body;
                }
                if (this.additional_bindings != null) {
                    data.additional_bindings = this.additional_bindings.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.selector === "string" && this.selector.length)
                    writer.writeString(1, this.selector);
                if (typeof this.get === "string" && this.get.length)
                    writer.writeString(2, this.get);
                if (typeof this.put === "string" && this.put.length)
                    writer.writeString(3, this.put);
                if (typeof this.post === "string" && this.post.length)
                    writer.writeString(4, this.post);
                if (typeof this.delete === "string" && this.delete.length)
                    writer.writeString(5, this.delete);
                if (typeof this.patch === "string" && this.patch.length)
                    writer.writeString(6, this.patch);
                if (this.custom !== undefined)
                    writer.writeMessage(8, this.custom, () => this.custom.serialize(writer));
                if (typeof this.body === "string" && this.body.length)
                    writer.writeString(7, this.body);
                if (typeof this.response_body === "string" && this.response_body.length)
                    writer.writeString(12, this.response_body);
                if (this.additional_bindings !== undefined)
                    writer.writeRepeatedMessage(11, this.additional_bindings, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new HttpRule();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.selector = reader.readString();
                            break;
                        case 2:
                            message.get = reader.readString();
                            break;
                        case 3:
                            message.put = reader.readString();
                            break;
                        case 4:
                            message.post = reader.readString();
                            break;
                        case 5:
                            message.delete = reader.readString();
                            break;
                        case 6:
                            message.patch = reader.readString();
                            break;
                        case 8:
                            reader.readMessage(message.custom, () => message.custom = CustomHttpPattern.deserialize(reader));
                            break;
                        case 7:
                            message.body = reader.readString();
                            break;
                        case 12:
                            message.response_body = reader.readString();
                            break;
                        case 11:
                            reader.readMessage(message.additional_bindings, () => pb_1.Message.addToRepeatedWrapperField(message, 11, HttpRule.deserialize(reader), HttpRule));
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
                return HttpRule.deserialize(bytes);
            }
        }
        api.HttpRule = HttpRule;
        class CustomHttpPattern extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("kind" in data && data.kind != undefined) {
                        this.kind = data.kind;
                    }
                    if ("path" in data && data.path != undefined) {
                        this.path = data.path;
                    }
                }
            }
            get kind() {
                return pb_1.Message.getField(this, 1);
            }
            set kind(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get path() {
                return pb_1.Message.getField(this, 2);
            }
            set path(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new CustomHttpPattern({});
                if (data.kind != null) {
                    message.kind = data.kind;
                }
                if (data.path != null) {
                    message.path = data.path;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.kind != null) {
                    data.kind = this.kind;
                }
                if (this.path != null) {
                    data.path = this.path;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.kind === "string" && this.kind.length)
                    writer.writeString(1, this.kind);
                if (typeof this.path === "string" && this.path.length)
                    writer.writeString(2, this.path);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CustomHttpPattern();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.kind = reader.readString();
                            break;
                        case 2:
                            message.path = reader.readString();
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
                return CustomHttpPattern.deserialize(bytes);
            }
        }
        api.CustomHttpPattern = CustomHttpPattern;
    })(api = google.api || (google.api = {}));
})(google = exports.google || (exports.google = {}));
//# sourceMappingURL=http.js.map