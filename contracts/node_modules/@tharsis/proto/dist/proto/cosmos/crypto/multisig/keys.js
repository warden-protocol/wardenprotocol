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
const dependency_2 = __importStar(require("./../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var crypto;
    (function (crypto) {
        var multisig;
        (function (multisig) {
            class LegacyAminoPubKey extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("threshold" in data && data.threshold != undefined) {
                            this.threshold = data.threshold;
                        }
                        if ("public_keys" in data && data.public_keys != undefined) {
                            this.public_keys = data.public_keys;
                        }
                    }
                }
                get threshold() {
                    return pb_1.Message.getField(this, 1);
                }
                set threshold(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get public_keys() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_2.google.protobuf.Any, 2);
                }
                set public_keys(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new LegacyAminoPubKey({});
                    if (data.threshold != null) {
                        message.threshold = data.threshold;
                    }
                    if (data.public_keys != null) {
                        message.public_keys = data.public_keys.map(item => dependency_2.google.protobuf.Any.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.threshold != null) {
                        data.threshold = this.threshold;
                    }
                    if (this.public_keys != null) {
                        data.public_keys = this.public_keys.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.threshold !== undefined)
                        writer.writeUint32(1, this.threshold);
                    if (this.public_keys !== undefined)
                        writer.writeRepeatedMessage(2, this.public_keys, (item) => item.serialize(writer));
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LegacyAminoPubKey();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.threshold = reader.readUint32();
                                break;
                            case 2:
                                reader.readMessage(message.public_keys, () => pb_1.Message.addToRepeatedWrapperField(message, 2, dependency_2.google.protobuf.Any.deserialize(reader), dependency_2.google.protobuf.Any));
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
                    return LegacyAminoPubKey.deserialize(bytes);
                }
            }
            multisig.LegacyAminoPubKey = LegacyAminoPubKey;
        })(multisig = crypto.multisig || (crypto.multisig = {}));
    })(crypto = cosmos.crypto || (cosmos.crypto = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=keys.js.map