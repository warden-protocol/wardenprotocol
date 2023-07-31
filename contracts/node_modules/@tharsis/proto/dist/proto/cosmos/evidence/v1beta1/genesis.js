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
const dependency_1 = __importStar(require("./../../../google/protobuf/any"));
const pb_1 = __importStar(require("google-protobuf"));
var cosmos;
(function (cosmos) {
    var evidence;
    (function (evidence) {
        var v1beta1;
        (function (v1beta1) {
            class GenesisState extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("evidence" in data && data.evidence != undefined) {
                            this.evidence = data.evidence;
                        }
                    }
                }
                get evidence() {
                    return pb_1.Message.getRepeatedWrapperField(this, dependency_1.google.protobuf.Any, 1);
                }
                set evidence(value) {
                    pb_1.Message.setRepeatedWrapperField(this, 1, value);
                }
                static fromObject(data) {
                    const message = new GenesisState({});
                    if (data.evidence != null) {
                        message.evidence = data.evidence.map(item => dependency_1.google.protobuf.Any.fromObject(item));
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.evidence != null) {
                        data.evidence = this.evidence.map((item) => item.toObject());
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.evidence !== undefined)
                        writer.writeRepeatedMessage(1, this.evidence, (item) => item.serialize(writer));
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
                                reader.readMessage(message.evidence, () => pb_1.Message.addToRepeatedWrapperField(message, 1, dependency_1.google.protobuf.Any.deserialize(reader), dependency_1.google.protobuf.Any));
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
            v1beta1.GenesisState = GenesisState;
        })(v1beta1 = evidence.v1beta1 || (evidence.v1beta1 = {}));
    })(evidence = cosmos.evidence || (cosmos.evidence = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=genesis.js.map