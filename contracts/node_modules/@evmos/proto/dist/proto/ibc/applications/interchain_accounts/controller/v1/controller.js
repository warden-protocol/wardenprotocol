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
            var controller;
            (function (controller) {
                var v1;
                (function (v1) {
                    class Params extends pb_1.Message {
                        constructor(data) {
                            super();
                            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                            if (!Array.isArray(data) && typeof data == "object") {
                                if ("controller_enabled" in data && data.controller_enabled != undefined) {
                                    this.controller_enabled = data.controller_enabled;
                                }
                            }
                        }
                        get controller_enabled() {
                            return pb_1.Message.getField(this, 1);
                        }
                        set controller_enabled(value) {
                            pb_1.Message.setField(this, 1, value);
                        }
                        static fromObject(data) {
                            const message = new Params({});
                            if (data.controller_enabled != null) {
                                message.controller_enabled = data.controller_enabled;
                            }
                            return message;
                        }
                        toObject() {
                            const data = {};
                            if (this.controller_enabled != null) {
                                data.controller_enabled = this.controller_enabled;
                            }
                            return data;
                        }
                        serialize(w) {
                            const writer = w || new pb_1.BinaryWriter();
                            if (this.controller_enabled !== undefined)
                                writer.writeBool(1, this.controller_enabled);
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
                                        message.controller_enabled = reader.readBool();
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
                })(v1 = controller.v1 || (controller.v1 = {}));
            })(controller = interchain_accounts.controller || (interchain_accounts.controller = {}));
        })(interchain_accounts = applications.interchain_accounts || (applications.interchain_accounts = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=controller.js.map