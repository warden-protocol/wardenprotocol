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
    var base;
    (function (base) {
        var query;
        (function (query) {
            var v1beta1;
            (function (v1beta1) {
                class PageRequest extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("key" in data && data.key != undefined) {
                                this.key = data.key;
                            }
                            if ("offset" in data && data.offset != undefined) {
                                this.offset = data.offset;
                            }
                            if ("limit" in data && data.limit != undefined) {
                                this.limit = data.limit;
                            }
                            if ("count_total" in data && data.count_total != undefined) {
                                this.count_total = data.count_total;
                            }
                            if ("reverse" in data && data.reverse != undefined) {
                                this.reverse = data.reverse;
                            }
                        }
                    }
                    get key() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set key(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get offset() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set offset(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    get limit() {
                        return pb_1.Message.getField(this, 3);
                    }
                    set limit(value) {
                        pb_1.Message.setField(this, 3, value);
                    }
                    get count_total() {
                        return pb_1.Message.getField(this, 4);
                    }
                    set count_total(value) {
                        pb_1.Message.setField(this, 4, value);
                    }
                    get reverse() {
                        return pb_1.Message.getField(this, 5);
                    }
                    set reverse(value) {
                        pb_1.Message.setField(this, 5, value);
                    }
                    static fromObject(data) {
                        const message = new PageRequest({});
                        if (data.key != null) {
                            message.key = data.key;
                        }
                        if (data.offset != null) {
                            message.offset = data.offset;
                        }
                        if (data.limit != null) {
                            message.limit = data.limit;
                        }
                        if (data.count_total != null) {
                            message.count_total = data.count_total;
                        }
                        if (data.reverse != null) {
                            message.reverse = data.reverse;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.key != null) {
                            data.key = this.key;
                        }
                        if (this.offset != null) {
                            data.offset = this.offset;
                        }
                        if (this.limit != null) {
                            data.limit = this.limit;
                        }
                        if (this.count_total != null) {
                            data.count_total = this.count_total;
                        }
                        if (this.reverse != null) {
                            data.reverse = this.reverse;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.key !== undefined)
                            writer.writeBytes(1, this.key);
                        if (this.offset !== undefined)
                            writer.writeUint64(2, this.offset);
                        if (this.limit !== undefined)
                            writer.writeUint64(3, this.limit);
                        if (this.count_total !== undefined)
                            writer.writeBool(4, this.count_total);
                        if (this.reverse !== undefined)
                            writer.writeBool(5, this.reverse);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PageRequest();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.key = reader.readBytes();
                                    break;
                                case 2:
                                    message.offset = reader.readUint64();
                                    break;
                                case 3:
                                    message.limit = reader.readUint64();
                                    break;
                                case 4:
                                    message.count_total = reader.readBool();
                                    break;
                                case 5:
                                    message.reverse = reader.readBool();
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
                        return PageRequest.deserialize(bytes);
                    }
                }
                v1beta1.PageRequest = PageRequest;
                class PageResponse extends pb_1.Message {
                    constructor(data) {
                        super();
                        pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                        if (!Array.isArray(data) && typeof data == "object") {
                            if ("next_key" in data && data.next_key != undefined) {
                                this.next_key = data.next_key;
                            }
                            if ("total" in data && data.total != undefined) {
                                this.total = data.total;
                            }
                        }
                    }
                    get next_key() {
                        return pb_1.Message.getField(this, 1);
                    }
                    set next_key(value) {
                        pb_1.Message.setField(this, 1, value);
                    }
                    get total() {
                        return pb_1.Message.getField(this, 2);
                    }
                    set total(value) {
                        pb_1.Message.setField(this, 2, value);
                    }
                    static fromObject(data) {
                        const message = new PageResponse({});
                        if (data.next_key != null) {
                            message.next_key = data.next_key;
                        }
                        if (data.total != null) {
                            message.total = data.total;
                        }
                        return message;
                    }
                    toObject() {
                        const data = {};
                        if (this.next_key != null) {
                            data.next_key = this.next_key;
                        }
                        if (this.total != null) {
                            data.total = this.total;
                        }
                        return data;
                    }
                    serialize(w) {
                        const writer = w || new pb_1.BinaryWriter();
                        if (this.next_key !== undefined)
                            writer.writeBytes(1, this.next_key);
                        if (this.total !== undefined)
                            writer.writeUint64(2, this.total);
                        if (!w)
                            return writer.getResultBuffer();
                    }
                    static deserialize(bytes) {
                        const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PageResponse();
                        while (reader.nextField()) {
                            if (reader.isEndGroup())
                                break;
                            switch (reader.getFieldNumber()) {
                                case 1:
                                    message.next_key = reader.readBytes();
                                    break;
                                case 2:
                                    message.total = reader.readUint64();
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
                        return PageResponse.deserialize(bytes);
                    }
                }
                v1beta1.PageResponse = PageResponse;
            })(v1beta1 = query.v1beta1 || (query.v1beta1 = {}));
        })(query = base.query || (base.query = {}));
    })(base = cosmos.base || (cosmos.base = {}));
})(cosmos = exports.cosmos || (exports.cosmos = {}));
//# sourceMappingURL=pagination.js.map