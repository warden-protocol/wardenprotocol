/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { DecCoin } from "../../base/v1beta1/coin";
import { DelegationDelegatorReward, Params, ValidatorAccumulatedCommission, ValidatorOutstandingRewards, ValidatorSlashEvent, } from "./distribution";
export const protobufPackage = "cosmos.distribution.v1beta1";
function createBaseQueryParamsRequest() {
    return {};
}
export const QueryParamsRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return QueryParamsRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryParamsRequest();
        return message;
    },
};
function createBaseQueryParamsResponse() {
    return { params: undefined };
}
export const QueryParamsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryParamsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.params = Params.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return QueryParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryParamsResponse();
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseQueryValidatorDistributionInfoRequest() {
    return { validatorAddress: "" };
}
export const QueryValidatorDistributionInfoRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorDistributionInfoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validatorAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.validatorAddress !== "") {
            obj.validatorAddress = message.validatorAddress;
        }
        return obj;
    },
    create(base) {
        return QueryValidatorDistributionInfoRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorDistributionInfoRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
};
function createBaseQueryValidatorDistributionInfoResponse() {
    return { operatorAddress: "", selfBondRewards: [], commission: [] };
}
export const QueryValidatorDistributionInfoResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.operatorAddress !== "") {
            writer.uint32(10).string(message.operatorAddress);
        }
        for (const v of message.selfBondRewards) {
            DecCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.commission) {
            DecCoin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorDistributionInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.operatorAddress = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.selfBondRewards.push(DecCoin.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.commission.push(DecCoin.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            operatorAddress: isSet(object.operatorAddress) ? String(object.operatorAddress) : "",
            selfBondRewards: Array.isArray(object?.selfBondRewards)
                ? object.selfBondRewards.map((e) => DecCoin.fromJSON(e))
                : [],
            commission: Array.isArray(object?.commission) ? object.commission.map((e) => DecCoin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.operatorAddress !== "") {
            obj.operatorAddress = message.operatorAddress;
        }
        if (message.selfBondRewards?.length) {
            obj.selfBondRewards = message.selfBondRewards.map((e) => DecCoin.toJSON(e));
        }
        if (message.commission?.length) {
            obj.commission = message.commission.map((e) => DecCoin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryValidatorDistributionInfoResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorDistributionInfoResponse();
        message.operatorAddress = object.operatorAddress ?? "";
        message.selfBondRewards = object.selfBondRewards?.map((e) => DecCoin.fromPartial(e)) || [];
        message.commission = object.commission?.map((e) => DecCoin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryValidatorOutstandingRewardsRequest() {
    return { validatorAddress: "" };
}
export const QueryValidatorOutstandingRewardsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorOutstandingRewardsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validatorAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.validatorAddress !== "") {
            obj.validatorAddress = message.validatorAddress;
        }
        return obj;
    },
    create(base) {
        return QueryValidatorOutstandingRewardsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorOutstandingRewardsRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
};
function createBaseQueryValidatorOutstandingRewardsResponse() {
    return { rewards: undefined };
}
export const QueryValidatorOutstandingRewardsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.rewards !== undefined) {
            ValidatorOutstandingRewards.encode(message.rewards, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorOutstandingRewardsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.rewards = ValidatorOutstandingRewards.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { rewards: isSet(object.rewards) ? ValidatorOutstandingRewards.fromJSON(object.rewards) : undefined };
    },
    toJSON(message) {
        const obj = {};
        if (message.rewards !== undefined) {
            obj.rewards = ValidatorOutstandingRewards.toJSON(message.rewards);
        }
        return obj;
    },
    create(base) {
        return QueryValidatorOutstandingRewardsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorOutstandingRewardsResponse();
        message.rewards = (object.rewards !== undefined && object.rewards !== null)
            ? ValidatorOutstandingRewards.fromPartial(object.rewards)
            : undefined;
        return message;
    },
};
function createBaseQueryValidatorCommissionRequest() {
    return { validatorAddress: "" };
}
export const QueryValidatorCommissionRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorCommissionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validatorAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.validatorAddress !== "") {
            obj.validatorAddress = message.validatorAddress;
        }
        return obj;
    },
    create(base) {
        return QueryValidatorCommissionRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorCommissionRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
};
function createBaseQueryValidatorCommissionResponse() {
    return { commission: undefined };
}
export const QueryValidatorCommissionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.commission !== undefined) {
            ValidatorAccumulatedCommission.encode(message.commission, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorCommissionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.commission = ValidatorAccumulatedCommission.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            commission: isSet(object.commission) ? ValidatorAccumulatedCommission.fromJSON(object.commission) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.commission !== undefined) {
            obj.commission = ValidatorAccumulatedCommission.toJSON(message.commission);
        }
        return obj;
    },
    create(base) {
        return QueryValidatorCommissionResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorCommissionResponse();
        message.commission = (object.commission !== undefined && object.commission !== null)
            ? ValidatorAccumulatedCommission.fromPartial(object.commission)
            : undefined;
        return message;
    },
};
function createBaseQueryValidatorSlashesRequest() {
    return { validatorAddress: "", startingHeight: 0, endingHeight: 0, pagination: undefined };
}
export const QueryValidatorSlashesRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        if (message.startingHeight !== 0) {
            writer.uint32(16).uint64(message.startingHeight);
        }
        if (message.endingHeight !== 0) {
            writer.uint32(24).uint64(message.endingHeight);
        }
        if (message.pagination !== undefined) {
            PageRequest.encode(message.pagination, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorSlashesRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validatorAddress = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.startingHeight = longToNumber(reader.uint64());
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.endingHeight = longToNumber(reader.uint64());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.pagination = PageRequest.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
            startingHeight: isSet(object.startingHeight) ? Number(object.startingHeight) : 0,
            endingHeight: isSet(object.endingHeight) ? Number(object.endingHeight) : 0,
            pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.validatorAddress !== "") {
            obj.validatorAddress = message.validatorAddress;
        }
        if (message.startingHeight !== 0) {
            obj.startingHeight = Math.round(message.startingHeight);
        }
        if (message.endingHeight !== 0) {
            obj.endingHeight = Math.round(message.endingHeight);
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageRequest.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryValidatorSlashesRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorSlashesRequest();
        message.validatorAddress = object.validatorAddress ?? "";
        message.startingHeight = object.startingHeight ?? 0;
        message.endingHeight = object.endingHeight ?? 0;
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageRequest.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryValidatorSlashesResponse() {
    return { slashes: [], pagination: undefined };
}
export const QueryValidatorSlashesResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.slashes) {
            ValidatorSlashEvent.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryValidatorSlashesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.slashes.push(ValidatorSlashEvent.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.pagination = PageResponse.decode(reader, reader.uint32());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            slashes: Array.isArray(object?.slashes) ? object.slashes.map((e) => ValidatorSlashEvent.fromJSON(e)) : [],
            pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.slashes?.length) {
            obj.slashes = message.slashes.map((e) => ValidatorSlashEvent.toJSON(e));
        }
        if (message.pagination !== undefined) {
            obj.pagination = PageResponse.toJSON(message.pagination);
        }
        return obj;
    },
    create(base) {
        return QueryValidatorSlashesResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryValidatorSlashesResponse();
        message.slashes = object.slashes?.map((e) => ValidatorSlashEvent.fromPartial(e)) || [];
        message.pagination = (object.pagination !== undefined && object.pagination !== null)
            ? PageResponse.fromPartial(object.pagination)
            : undefined;
        return message;
    },
};
function createBaseQueryDelegationRewardsRequest() {
    return { delegatorAddress: "", validatorAddress: "" };
}
export const QueryDelegationRewardsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationRewardsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.delegatorAddress = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validatorAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
            validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.delegatorAddress !== "") {
            obj.delegatorAddress = message.delegatorAddress;
        }
        if (message.validatorAddress !== "") {
            obj.validatorAddress = message.validatorAddress;
        }
        return obj;
    },
    create(base) {
        return QueryDelegationRewardsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationRewardsRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
};
function createBaseQueryDelegationRewardsResponse() {
    return { rewards: [] };
}
export const QueryDelegationRewardsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.rewards) {
            DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationRewardsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.rewards.push(DecCoin.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { rewards: Array.isArray(object?.rewards) ? object.rewards.map((e) => DecCoin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.rewards?.length) {
            obj.rewards = message.rewards.map((e) => DecCoin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryDelegationRewardsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationRewardsResponse();
        message.rewards = object.rewards?.map((e) => DecCoin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryDelegationTotalRewardsRequest() {
    return { delegatorAddress: "" };
}
export const QueryDelegationTotalRewardsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationTotalRewardsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.delegatorAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.delegatorAddress !== "") {
            obj.delegatorAddress = message.delegatorAddress;
        }
        return obj;
    },
    create(base) {
        return QueryDelegationTotalRewardsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationTotalRewardsRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        return message;
    },
};
function createBaseQueryDelegationTotalRewardsResponse() {
    return { rewards: [], total: [] };
}
export const QueryDelegationTotalRewardsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.rewards) {
            DelegationDelegatorReward.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.total) {
            DecCoin.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegationTotalRewardsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.rewards.push(DelegationDelegatorReward.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.total.push(DecCoin.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return {
            rewards: Array.isArray(object?.rewards)
                ? object.rewards.map((e) => DelegationDelegatorReward.fromJSON(e))
                : [],
            total: Array.isArray(object?.total) ? object.total.map((e) => DecCoin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.rewards?.length) {
            obj.rewards = message.rewards.map((e) => DelegationDelegatorReward.toJSON(e));
        }
        if (message.total?.length) {
            obj.total = message.total.map((e) => DecCoin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryDelegationTotalRewardsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegationTotalRewardsResponse();
        message.rewards = object.rewards?.map((e) => DelegationDelegatorReward.fromPartial(e)) || [];
        message.total = object.total?.map((e) => DecCoin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseQueryDelegatorValidatorsRequest() {
    return { delegatorAddress: "" };
}
export const QueryDelegatorValidatorsRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorValidatorsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.delegatorAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.delegatorAddress !== "") {
            obj.delegatorAddress = message.delegatorAddress;
        }
        return obj;
    },
    create(base) {
        return QueryDelegatorValidatorsRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorValidatorsRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        return message;
    },
};
function createBaseQueryDelegatorValidatorsResponse() {
    return { validators: [] };
}
export const QueryDelegatorValidatorsResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.validators) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorValidatorsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.validators.push(reader.string());
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { validators: Array.isArray(object?.validators) ? object.validators.map((e) => String(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.validators?.length) {
            obj.validators = message.validators;
        }
        return obj;
    },
    create(base) {
        return QueryDelegatorValidatorsResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorValidatorsResponse();
        message.validators = object.validators?.map((e) => e) || [];
        return message;
    },
};
function createBaseQueryDelegatorWithdrawAddressRequest() {
    return { delegatorAddress: "" };
}
export const QueryDelegatorWithdrawAddressRequest = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorWithdrawAddressRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.delegatorAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.delegatorAddress !== "") {
            obj.delegatorAddress = message.delegatorAddress;
        }
        return obj;
    },
    create(base) {
        return QueryDelegatorWithdrawAddressRequest.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorWithdrawAddressRequest();
        message.delegatorAddress = object.delegatorAddress ?? "";
        return message;
    },
};
function createBaseQueryDelegatorWithdrawAddressResponse() {
    return { withdrawAddress: "" };
}
export const QueryDelegatorWithdrawAddressResponse = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.withdrawAddress !== "") {
            writer.uint32(10).string(message.withdrawAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryDelegatorWithdrawAddressResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.withdrawAddress = reader.string();
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { withdrawAddress: isSet(object.withdrawAddress) ? String(object.withdrawAddress) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.withdrawAddress !== "") {
            obj.withdrawAddress = message.withdrawAddress;
        }
        return obj;
    },
    create(base) {
        return QueryDelegatorWithdrawAddressResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryDelegatorWithdrawAddressResponse();
        message.withdrawAddress = object.withdrawAddress ?? "";
        return message;
    },
};
function createBaseQueryCommunityPoolRequest() {
    return {};
}
export const QueryCommunityPoolRequest = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCommunityPoolRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(_) {
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    create(base) {
        return QueryCommunityPoolRequest.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseQueryCommunityPoolRequest();
        return message;
    },
};
function createBaseQueryCommunityPoolResponse() {
    return { pool: [] };
}
export const QueryCommunityPoolResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.pool) {
            DecCoin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCommunityPoolResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.pool.push(DecCoin.decode(reader, reader.uint32()));
                    continue;
            }
            if ((tag & 7) === 4 || tag === 0) {
                break;
            }
            reader.skipType(tag & 7);
        }
        return message;
    },
    fromJSON(object) {
        return { pool: Array.isArray(object?.pool) ? object.pool.map((e) => DecCoin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.pool?.length) {
            obj.pool = message.pool.map((e) => DecCoin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return QueryCommunityPoolResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseQueryCommunityPoolResponse();
        message.pool = object.pool?.map((e) => DecCoin.fromPartial(e)) || [];
        return message;
    },
};
export const QueryServiceName = "cosmos.distribution.v1beta1.Query";
export class QueryClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || QueryServiceName;
        this.rpc = rpc;
        this.Params = this.Params.bind(this);
        this.ValidatorDistributionInfo = this.ValidatorDistributionInfo.bind(this);
        this.ValidatorOutstandingRewards = this.ValidatorOutstandingRewards.bind(this);
        this.ValidatorCommission = this.ValidatorCommission.bind(this);
        this.ValidatorSlashes = this.ValidatorSlashes.bind(this);
        this.DelegationRewards = this.DelegationRewards.bind(this);
        this.DelegationTotalRewards = this.DelegationTotalRewards.bind(this);
        this.DelegatorValidators = this.DelegatorValidators.bind(this);
        this.DelegatorWithdrawAddress = this.DelegatorWithdrawAddress.bind(this);
        this.CommunityPool = this.CommunityPool.bind(this);
    }
    Params(request) {
        const data = QueryParamsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "Params", data);
        return promise.then((data) => QueryParamsResponse.decode(_m0.Reader.create(data)));
    }
    ValidatorDistributionInfo(request) {
        const data = QueryValidatorDistributionInfoRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ValidatorDistributionInfo", data);
        return promise.then((data) => QueryValidatorDistributionInfoResponse.decode(_m0.Reader.create(data)));
    }
    ValidatorOutstandingRewards(request) {
        const data = QueryValidatorOutstandingRewardsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ValidatorOutstandingRewards", data);
        return promise.then((data) => QueryValidatorOutstandingRewardsResponse.decode(_m0.Reader.create(data)));
    }
    ValidatorCommission(request) {
        const data = QueryValidatorCommissionRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ValidatorCommission", data);
        return promise.then((data) => QueryValidatorCommissionResponse.decode(_m0.Reader.create(data)));
    }
    ValidatorSlashes(request) {
        const data = QueryValidatorSlashesRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "ValidatorSlashes", data);
        return promise.then((data) => QueryValidatorSlashesResponse.decode(_m0.Reader.create(data)));
    }
    DelegationRewards(request) {
        const data = QueryDelegationRewardsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DelegationRewards", data);
        return promise.then((data) => QueryDelegationRewardsResponse.decode(_m0.Reader.create(data)));
    }
    DelegationTotalRewards(request) {
        const data = QueryDelegationTotalRewardsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DelegationTotalRewards", data);
        return promise.then((data) => QueryDelegationTotalRewardsResponse.decode(_m0.Reader.create(data)));
    }
    DelegatorValidators(request) {
        const data = QueryDelegatorValidatorsRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DelegatorValidators", data);
        return promise.then((data) => QueryDelegatorValidatorsResponse.decode(_m0.Reader.create(data)));
    }
    DelegatorWithdrawAddress(request) {
        const data = QueryDelegatorWithdrawAddressRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "DelegatorWithdrawAddress", data);
        return promise.then((data) => QueryDelegatorWithdrawAddressResponse.decode(_m0.Reader.create(data)));
    }
    CommunityPool(request) {
        const data = QueryCommunityPoolRequest.encode(request).finish();
        const promise = this.rpc.request(this.service, "CommunityPool", data);
        return promise.then((data) => QueryCommunityPoolResponse.decode(_m0.Reader.create(data)));
    }
}
const tsProtoGlobalThis = (() => {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (_m0.util.Long !== Long) {
    _m0.util.Long = Long;
    _m0.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
