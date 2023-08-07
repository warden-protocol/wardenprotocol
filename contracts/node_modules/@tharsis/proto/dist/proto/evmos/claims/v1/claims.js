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
exports.evmos = void 0;
const pb_1 = __importStar(require("google-protobuf"));
var evmos;
(function (evmos) {
    var claims;
    (function (claims) {
        var v1;
        (function (v1) {
            let Action;
            (function (Action) {
                Action[Action["ACTION_UNSPECIFIED"] = 0] = "ACTION_UNSPECIFIED";
                Action[Action["ACTION_VOTE"] = 1] = "ACTION_VOTE";
                Action[Action["ACTION_DELEGATE"] = 2] = "ACTION_DELEGATE";
                Action[Action["ACTION_EVM"] = 3] = "ACTION_EVM";
                Action[Action["ACTION_IBC_TRANSFER"] = 4] = "ACTION_IBC_TRANSFER";
            })(Action = v1.Action || (v1.Action = {}));
            class Claim extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("action" in data && data.action != undefined) {
                            this.action = data.action;
                        }
                        if ("completed" in data && data.completed != undefined) {
                            this.completed = data.completed;
                        }
                        if ("claimable_amount" in data && data.claimable_amount != undefined) {
                            this.claimable_amount = data.claimable_amount;
                        }
                    }
                }
                get action() {
                    return pb_1.Message.getField(this, 1);
                }
                set action(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get completed() {
                    return pb_1.Message.getField(this, 2);
                }
                set completed(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get claimable_amount() {
                    return pb_1.Message.getField(this, 3);
                }
                set claimable_amount(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new Claim({});
                    if (data.action != null) {
                        message.action = data.action;
                    }
                    if (data.completed != null) {
                        message.completed = data.completed;
                    }
                    if (data.claimable_amount != null) {
                        message.claimable_amount = data.claimable_amount;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.action != null) {
                        data.action = this.action;
                    }
                    if (this.completed != null) {
                        data.completed = this.completed;
                    }
                    if (this.claimable_amount != null) {
                        data.claimable_amount = this.claimable_amount;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (this.action !== undefined)
                        writer.writeEnum(1, this.action);
                    if (this.completed !== undefined)
                        writer.writeBool(2, this.completed);
                    if (typeof this.claimable_amount === "string" && this.claimable_amount.length)
                        writer.writeString(3, this.claimable_amount);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Claim();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.action = reader.readEnum();
                                break;
                            case 2:
                                message.completed = reader.readBool();
                                break;
                            case 3:
                                message.claimable_amount = reader.readString();
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
                    return Claim.deserialize(bytes);
                }
            }
            v1.Claim = Claim;
            class ClaimsRecordAddress extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("address" in data && data.address != undefined) {
                            this.address = data.address;
                        }
                        if ("initial_claimable_amount" in data && data.initial_claimable_amount != undefined) {
                            this.initial_claimable_amount = data.initial_claimable_amount;
                        }
                        if ("actions_completed" in data && data.actions_completed != undefined) {
                            this.actions_completed = data.actions_completed;
                        }
                    }
                }
                get address() {
                    return pb_1.Message.getField(this, 1);
                }
                set address(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get initial_claimable_amount() {
                    return pb_1.Message.getField(this, 2);
                }
                set initial_claimable_amount(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                get actions_completed() {
                    return pb_1.Message.getField(this, 3);
                }
                set actions_completed(value) {
                    pb_1.Message.setField(this, 3, value);
                }
                static fromObject(data) {
                    const message = new ClaimsRecordAddress({});
                    if (data.address != null) {
                        message.address = data.address;
                    }
                    if (data.initial_claimable_amount != null) {
                        message.initial_claimable_amount = data.initial_claimable_amount;
                    }
                    if (data.actions_completed != null) {
                        message.actions_completed = data.actions_completed;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.address != null) {
                        data.address = this.address;
                    }
                    if (this.initial_claimable_amount != null) {
                        data.initial_claimable_amount = this.initial_claimable_amount;
                    }
                    if (this.actions_completed != null) {
                        data.actions_completed = this.actions_completed;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.address === "string" && this.address.length)
                        writer.writeString(1, this.address);
                    if (typeof this.initial_claimable_amount === "string" && this.initial_claimable_amount.length)
                        writer.writeString(2, this.initial_claimable_amount);
                    if (this.actions_completed !== undefined)
                        writer.writePackedBool(3, this.actions_completed);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ClaimsRecordAddress();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.address = reader.readString();
                                break;
                            case 2:
                                message.initial_claimable_amount = reader.readString();
                                break;
                            case 3:
                                message.actions_completed = reader.readPackedBool();
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
                    return ClaimsRecordAddress.deserialize(bytes);
                }
            }
            v1.ClaimsRecordAddress = ClaimsRecordAddress;
            class ClaimsRecord extends pb_1.Message {
                constructor(data) {
                    super();
                    pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
                    if (!Array.isArray(data) && typeof data == "object") {
                        if ("initial_claimable_amount" in data && data.initial_claimable_amount != undefined) {
                            this.initial_claimable_amount = data.initial_claimable_amount;
                        }
                        if ("actions_completed" in data && data.actions_completed != undefined) {
                            this.actions_completed = data.actions_completed;
                        }
                    }
                }
                get initial_claimable_amount() {
                    return pb_1.Message.getField(this, 1);
                }
                set initial_claimable_amount(value) {
                    pb_1.Message.setField(this, 1, value);
                }
                get actions_completed() {
                    return pb_1.Message.getField(this, 2);
                }
                set actions_completed(value) {
                    pb_1.Message.setField(this, 2, value);
                }
                static fromObject(data) {
                    const message = new ClaimsRecord({});
                    if (data.initial_claimable_amount != null) {
                        message.initial_claimable_amount = data.initial_claimable_amount;
                    }
                    if (data.actions_completed != null) {
                        message.actions_completed = data.actions_completed;
                    }
                    return message;
                }
                toObject() {
                    const data = {};
                    if (this.initial_claimable_amount != null) {
                        data.initial_claimable_amount = this.initial_claimable_amount;
                    }
                    if (this.actions_completed != null) {
                        data.actions_completed = this.actions_completed;
                    }
                    return data;
                }
                serialize(w) {
                    const writer = w || new pb_1.BinaryWriter();
                    if (typeof this.initial_claimable_amount === "string" && this.initial_claimable_amount.length)
                        writer.writeString(1, this.initial_claimable_amount);
                    if (this.actions_completed !== undefined)
                        writer.writePackedBool(2, this.actions_completed);
                    if (!w)
                        return writer.getResultBuffer();
                }
                static deserialize(bytes) {
                    const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ClaimsRecord();
                    while (reader.nextField()) {
                        if (reader.isEndGroup())
                            break;
                        switch (reader.getFieldNumber()) {
                            case 1:
                                message.initial_claimable_amount = reader.readString();
                                break;
                            case 2:
                                message.actions_completed = reader.readPackedBool();
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
                    return ClaimsRecord.deserialize(bytes);
                }
            }
            v1.ClaimsRecord = ClaimsRecord;
        })(v1 = claims.v1 || (claims.v1 = {}));
    })(claims = evmos.claims || (evmos.claims = {}));
})(evmos = exports.evmos || (exports.evmos = {}));
//# sourceMappingURL=claims.js.map