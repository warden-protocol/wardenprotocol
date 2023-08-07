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
exports.tendermint = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var tendermint;
(function (tendermint) {
    var crypto;
    (function (crypto) {
        class PublicKey extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], [[1, 2]]);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("ed25519" in data && data.ed25519 != undefined) {
                        this.ed25519 = data.ed25519;
                    }
                    if ("secp256k1" in data && data.secp256k1 != undefined) {
                        this.secp256k1 = data.secp256k1;
                    }
                }
            }
            get ed25519() {
                return pb_1.Message.getField(this, 1);
            }
            set ed25519(value) {
                pb_1.Message.setOneofField(this, 1, [1, 2], value);
            }
            get secp256k1() {
                return pb_1.Message.getField(this, 2);
            }
            set secp256k1(value) {
                pb_1.Message.setOneofField(this, 2, [1, 2], value);
            }
            get sum() {
                const cases = {
                    0: "none",
                    1: "ed25519",
                    2: "secp256k1"
                };
                return cases[pb_1.Message.computeOneofCase(this, [1, 2])];
            }
            static fromObject(data) {
                const message = new PublicKey({});
                if (data.ed25519 != null) {
                    message.ed25519 = data.ed25519;
                }
                if (data.secp256k1 != null) {
                    message.secp256k1 = data.secp256k1;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.ed25519 != null) {
                    data.ed25519 = this.ed25519;
                }
                if (this.secp256k1 != null) {
                    data.secp256k1 = this.secp256k1;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.ed25519 !== undefined)
                    writer.writeBytes(1, this.ed25519);
                if (this.secp256k1 !== undefined)
                    writer.writeBytes(2, this.secp256k1);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PublicKey();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.ed25519 = reader.readBytes();
                            break;
                        case 2:
                            message.secp256k1 = reader.readBytes();
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
                return PublicKey.deserialize(bytes);
            }
        }
        crypto.PublicKey = PublicKey;
    })(crypto = tendermint.crypto || (tendermint.crypto = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=keys.js.map