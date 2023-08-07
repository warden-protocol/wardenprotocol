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
const dependency_1 = __importStar(require("./../protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var google;
(function (google) {
    var api;
    (function (api) {
        class HttpBody extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("content_type" in data && data.content_type != undefined) {
                        this.content_type = data.content_type;
                    }
                    if ("data" in data && data.data != undefined) {
                        this.data = data.data;
                    }
                    if ("extensions" in data && data.extensions != undefined) {
                        this.extensions = data.extensions;
                    }
                }
            }
            get content_type() {
                return pb_1.Message.getField(this, 1);
            }
            set content_type(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get data() {
                return pb_1.Message.getField(this, 2);
            }
            set data(value) {
                pb_1.Message.setField(this, 2, value);
            }
            get extensions() {
                return pb_1.Message.getRepeatedWrapperField(this, dependency_1.google.protobuf.Any, 3);
            }
            set extensions(value) {
                pb_1.Message.setRepeatedWrapperField(this, 3, value);
            }
            static fromObject(data) {
                const message = new HttpBody({});
                if (data.content_type != null) {
                    message.content_type = data.content_type;
                }
                if (data.data != null) {
                    message.data = data.data;
                }
                if (data.extensions != null) {
                    message.extensions = data.extensions.map(item => dependency_1.google.protobuf.Any.fromObject(item));
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.content_type != null) {
                    data.content_type = this.content_type;
                }
                if (this.data != null) {
                    data.data = this.data;
                }
                if (this.extensions != null) {
                    data.extensions = this.extensions.map((item) => item.toObject());
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.content_type === "string" && this.content_type.length)
                    writer.writeString(1, this.content_type);
                if (this.data !== undefined)
                    writer.writeBytes(2, this.data);
                if (this.extensions !== undefined)
                    writer.writeRepeatedMessage(3, this.extensions, (item) => item.serialize(writer));
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new HttpBody();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.content_type = reader.readString();
                            break;
                        case 2:
                            message.data = reader.readBytes();
                            break;
                        case 3:
                            reader.readMessage(message.extensions, () => pb_1.Message.addToRepeatedWrapperField(message, 3, dependency_1.google.protobuf.Any.deserialize(reader), dependency_1.google.protobuf.Any));
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
                return HttpBody.deserialize(bytes);
            }
        }
        api.HttpBody = HttpBody;
    })(api = google.api || (google.api = {}));
})(google = exports.google || (exports.google = {}));
//# sourceMappingURL=httpbody.js.map