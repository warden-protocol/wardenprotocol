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
const dependency_2 = __importStar(require("./host"));
const pb_1 = __importStar(require("google-protobuf"));
var ibc;
(function (ibc) {
    var applications;
    (function (applications) {
        var interchain_accounts;
        (function (interchain_accounts) {
            var host;
            (function (host) {
                var v1;
                (function (v1) {
                    class QueryParamsRequest extends pb_1.Message {
                        constructor(data) {
                            super();
                            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                            if (!Array.isArray(data) && typeof data == "object") { }
                        }
                        static fromObject(data) {
                            const message = new QueryParamsRequest({});
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
                            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryParamsRequest();
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
                            return QueryParamsRequest.deserialize(bytes);
                        }
                    }
                    v1.QueryParamsRequest = QueryParamsRequest;
                    class QueryParamsResponse extends pb_1.Message {
                        constructor(data) {
                            super();
                            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                            if (!Array.isArray(data) && typeof data == "object") {
                                if ("params" in data && data.params != undefined) {
                                    this.params = data.params;
                                }
                            }
                        }
                        get params() {
                            return pb_1.Message.getWrapperField(this, dependency_2.ibc.applications.interchain_accounts.host.v1.Params, 1);
                        }
                        set params(value) {
                            pb_1.Message.setWrapperField(this, 1, value);
                        }
                        static fromObject(data) {
                            const message = new QueryParamsResponse({});
                            if (data.params != null) {
                                message.params = dependency_2.ibc.applications.interchain_accounts.host.v1.Params.fromObject(data.params);
                            }
                            return message;
                        }
                        toObject() {
                            const data = {};
                            if (this.params != null) {
                                data.params = this.params.toObject();
                            }
                            return data;
                        }
                        serialize(w) {
                            const writer = w || new pb_1.BinaryWriter();
                            if (this.params !== undefined)
                                writer.writeMessage(1, this.params, () => this.params.serialize(writer));
                            if (!w)
                                return writer.getResultBuffer();
                        }
                        static deserialize(bytes) {
                            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new QueryParamsResponse();
                            while (reader.nextField()) {
                                if (reader.isEndGroup())
                                    break;
                                switch (reader.getFieldNumber()) {
                                    case 1:
                                        reader.readMessage(message.params, () => message.params = dependency_2.ibc.applications.interchain_accounts.host.v1.Params.deserialize(reader));
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
                            return QueryParamsResponse.deserialize(bytes);
                        }
                    }
                    v1.QueryParamsResponse = QueryParamsResponse;
                })(v1 = host.v1 || (host.v1 = {}));
            })(host = interchain_accounts.host || (interchain_accounts.host = {}));
        })(interchain_accounts = applications.interchain_accounts || (applications.interchain_accounts = {}));
    })(applications = ibc.applications || (ibc.applications = {}));
})(ibc = exports.ibc || (exports.ibc = {}));
//# sourceMappingURL=query.js.map