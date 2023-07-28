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
    var version;
    (function (version) {
        class App extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("protocol" in data && data.protocol != undefined) {
                        this.protocol = data.protocol;
                    }
                    if ("software" in data && data.software != undefined) {
                        this.software = data.software;
                    }
                }
            }
            get protocol() {
                return pb_1.Message.getField(this, 1);
            }
            set protocol(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get software() {
                return pb_1.Message.getField(this, 2);
            }
            set software(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new App({});
                if (data.protocol != null) {
                    message.protocol = data.protocol;
                }
                if (data.software != null) {
                    message.software = data.software;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.protocol != null) {
                    data.protocol = this.protocol;
                }
                if (this.software != null) {
                    data.software = this.software;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.protocol !== undefined)
                    writer.writeUint64(1, this.protocol);
                if (typeof this.software === "string" && this.software.length)
                    writer.writeString(2, this.software);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new App();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.protocol = reader.readUint64();
                            break;
                        case 2:
                            message.software = reader.readString();
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
                return App.deserialize(bytes);
            }
        }
        version.App = App;
        class Consensus extends pb_1.Message {
            constructor(data) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("block" in data && data.block != undefined) {
                        this.block = data.block;
                    }
                    if ("app" in data && data.app != undefined) {
                        this.app = data.app;
                    }
                }
            }
            get block() {
                return pb_1.Message.getField(this, 1);
            }
            set block(value) {
                pb_1.Message.setField(this, 1, value);
            }
            get app() {
                return pb_1.Message.getField(this, 2);
            }
            set app(value) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data) {
                const message = new Consensus({});
                if (data.block != null) {
                    message.block = data.block;
                }
                if (data.app != null) {
                    message.app = data.app;
                }
                return message;
            }
            toObject() {
                const data = {};
                if (this.block != null) {
                    data.block = this.block;
                }
                if (this.app != null) {
                    data.app = this.app;
                }
                return data;
            }
            serialize(w) {
                const writer = w || new pb_1.BinaryWriter();
                if (this.block !== undefined)
                    writer.writeUint64(1, this.block);
                if (this.app !== undefined)
                    writer.writeUint64(2, this.app);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes) {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Consensus();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.block = reader.readUint64();
                            break;
                        case 2:
                            message.app = reader.readUint64();
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
                return Consensus.deserialize(bytes);
            }
        }
        version.Consensus = Consensus;
    })(version = tendermint.version || (tendermint.version = {}));
})(tendermint = exports.tendermint || (exports.tendermint = {}));
//# sourceMappingURL=types.js.map