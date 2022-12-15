"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QuerySigningInfosResponse = exports.QuerySigningInfosRequest = exports.QuerySigningInfoResponse = exports.QuerySigningInfoRequest = exports.QueryParamsResponse = exports.QueryParamsRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const slashing_1 = require("../../../cosmos/slashing/v1beta1/slashing");
const pagination_1 = require("../../../cosmos/base/query/v1beta1/pagination");
exports.protobufPackage = "cosmos.slashing.v1beta1";
const baseQueryParamsRequest = {};
exports.QueryParamsRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryParamsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseQueryParamsRequest);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseQueryParamsRequest);
        return message;
    },
};
const baseQueryParamsResponse = {};
exports.QueryParamsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.params !== undefined) {
            slashing_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryParamsResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.params = slashing_1.Params.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryParamsResponse);
        message.params =
            object.params !== undefined && object.params !== null ? slashing_1.Params.fromJSON(object.params) : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined && (obj.params = message.params ? slashing_1.Params.toJSON(message.params) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryParamsResponse);
        message.params =
            object.params !== undefined && object.params !== null ? slashing_1.Params.fromPartial(object.params) : undefined;
        return message;
    },
};
const baseQuerySigningInfoRequest = { consAddress: "" };
exports.QuerySigningInfoRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.consAddress !== "") {
            writer.uint32(10).string(message.consAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQuerySigningInfoRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consAddress = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQuerySigningInfoRequest);
        message.consAddress =
            object.consAddress !== undefined && object.consAddress !== null ? String(object.consAddress) : "";
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.consAddress !== undefined && (obj.consAddress = message.consAddress);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQuerySigningInfoRequest);
        message.consAddress = (_a = object.consAddress) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
const baseQuerySigningInfoResponse = {};
exports.QuerySigningInfoResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.valSigningInfo !== undefined) {
            slashing_1.ValidatorSigningInfo.encode(message.valSigningInfo, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQuerySigningInfoResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.valSigningInfo = slashing_1.ValidatorSigningInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQuerySigningInfoResponse);
        message.valSigningInfo =
            object.valSigningInfo !== undefined && object.valSigningInfo !== null
                ? slashing_1.ValidatorSigningInfo.fromJSON(object.valSigningInfo)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.valSigningInfo !== undefined &&
            (obj.valSigningInfo = message.valSigningInfo
                ? slashing_1.ValidatorSigningInfo.toJSON(message.valSigningInfo)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQuerySigningInfoResponse);
        message.valSigningInfo =
            object.valSigningInfo !== undefined && object.valSigningInfo !== null
                ? slashing_1.ValidatorSigningInfo.fromPartial(object.valSigningInfo)
                : undefined;
        return message;
    },
};
const baseQuerySigningInfosRequest = {};
exports.QuerySigningInfosRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQuerySigningInfosRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQuerySigningInfosRequest);
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageRequest.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQuerySigningInfosRequest);
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageRequest.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
const baseQuerySigningInfosResponse = {};
exports.QuerySigningInfosResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.info) {
            slashing_1.ValidatorSigningInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQuerySigningInfosResponse);
        message.info = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.info.push(slashing_1.ValidatorSigningInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        var _a;
        const message = Object.assign({}, baseQuerySigningInfosResponse);
        message.info = ((_a = object.info) !== null && _a !== void 0 ? _a : []).map((e) => slashing_1.ValidatorSigningInfo.fromJSON(e));
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromJSON(object.pagination)
                : undefined;
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.info) {
            obj.info = message.info.map((e) => (e ? slashing_1.ValidatorSigningInfo.toJSON(e) : undefined));
        }
        else {
            obj.info = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination ? pagination_1.PageResponse.toJSON(message.pagination) : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = Object.assign({}, baseQuerySigningInfosResponse);
        message.info = ((_a = object.info) === null || _a === void 0 ? void 0 : _a.map((e) => slashing_1.ValidatorSigningInfo.fromPartial(e))) || [];
        message.pagination =
            object.pagination !== undefined && object.pagination !== null
                ? pagination_1.PageResponse.fromPartial(object.pagination)
                : undefined;
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.Params = this.Params.bind(this);
        this.SigningInfo = this.SigningInfo.bind(this);
        this.SigningInfos = this.SigningInfos.bind(this);
    }
    Params(request) {
        const data = exports.QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.slashing.v1beta1.Query", "Params", data);
        return promise.then((data) => exports.QueryParamsResponse.decode(new minimal_1.default.Reader(data)));
    }
    SigningInfo(request) {
        const data = exports.QuerySigningInfoRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.slashing.v1beta1.Query", "SigningInfo", data);
        return promise.then((data) => exports.QuerySigningInfoResponse.decode(new minimal_1.default.Reader(data)));
    }
    SigningInfos(request) {
        const data = exports.QuerySigningInfosRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.slashing.v1beta1.Query", "SigningInfos", data);
        return promise.then((data) => exports.QuerySigningInfosResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
//# sourceMappingURL=query.js.map