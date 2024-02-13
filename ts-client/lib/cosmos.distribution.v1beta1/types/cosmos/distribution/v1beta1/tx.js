/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
import { Params } from "./distribution";
export const protobufPackage = "cosmos.distribution.v1beta1";
function createBaseMsgSetWithdrawAddress() {
    return { delegatorAddress: "", withdrawAddress: "" };
}
export const MsgSetWithdrawAddress = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.delegatorAddress !== "") {
            writer.uint32(10).string(message.delegatorAddress);
        }
        if (message.withdrawAddress !== "") {
            writer.uint32(18).string(message.withdrawAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetWithdrawAddress();
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
        return {
            delegatorAddress: isSet(object.delegatorAddress) ? String(object.delegatorAddress) : "",
            withdrawAddress: isSet(object.withdrawAddress) ? String(object.withdrawAddress) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.delegatorAddress !== "") {
            obj.delegatorAddress = message.delegatorAddress;
        }
        if (message.withdrawAddress !== "") {
            obj.withdrawAddress = message.withdrawAddress;
        }
        return obj;
    },
    create(base) {
        return MsgSetWithdrawAddress.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSetWithdrawAddress();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.withdrawAddress = object.withdrawAddress ?? "";
        return message;
    },
};
function createBaseMsgSetWithdrawAddressResponse() {
    return {};
}
export const MsgSetWithdrawAddressResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetWithdrawAddressResponse();
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
        return MsgSetWithdrawAddressResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgSetWithdrawAddressResponse();
        return message;
    },
};
function createBaseMsgWithdrawDelegatorReward() {
    return { delegatorAddress: "", validatorAddress: "" };
}
export const MsgWithdrawDelegatorReward = {
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
        const message = createBaseMsgWithdrawDelegatorReward();
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
        return MsgWithdrawDelegatorReward.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawDelegatorReward();
        message.delegatorAddress = object.delegatorAddress ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
};
function createBaseMsgWithdrawDelegatorRewardResponse() {
    return { amount: [] };
}
export const MsgWithdrawDelegatorRewardResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawDelegatorRewardResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
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
        return { amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgWithdrawDelegatorRewardResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawDelegatorRewardResponse();
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgWithdrawValidatorCommission() {
    return { validatorAddress: "" };
}
export const MsgWithdrawValidatorCommission = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.validatorAddress !== "") {
            writer.uint32(10).string(message.validatorAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawValidatorCommission();
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
        return MsgWithdrawValidatorCommission.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawValidatorCommission();
        message.validatorAddress = object.validatorAddress ?? "";
        return message;
    },
};
function createBaseMsgWithdrawValidatorCommissionResponse() {
    return { amount: [] };
}
export const MsgWithdrawValidatorCommissionResponse = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgWithdrawValidatorCommissionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
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
        return { amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [] };
    },
    toJSON(message) {
        const obj = {};
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgWithdrawValidatorCommissionResponse.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgWithdrawValidatorCommissionResponse();
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgFundCommunityPool() {
    return { amount: [], depositor: "" };
}
export const MsgFundCommunityPool = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.depositor !== "") {
            writer.uint32(18).string(message.depositor);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgFundCommunityPool();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.depositor = reader.string();
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
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
            depositor: isSet(object.depositor) ? String(object.depositor) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        if (message.depositor !== "") {
            obj.depositor = message.depositor;
        }
        return obj;
    },
    create(base) {
        return MsgFundCommunityPool.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgFundCommunityPool();
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        message.depositor = object.depositor ?? "";
        return message;
    },
};
function createBaseMsgFundCommunityPoolResponse() {
    return {};
}
export const MsgFundCommunityPoolResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgFundCommunityPoolResponse();
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
        return MsgFundCommunityPoolResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgFundCommunityPoolResponse();
        return message;
    },
};
function createBaseMsgUpdateParams() {
    return { authority: "", params: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.params !== undefined) {
            Params.encode(message.params, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
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
        return {
            authority: isSet(object.authority) ? String(object.authority) : "",
            params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.params !== undefined) {
            obj.params = Params.toJSON(message.params);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.params = (object.params !== undefined && object.params !== null)
            ? Params.fromPartial(object.params)
            : undefined;
        return message;
    },
};
function createBaseMsgUpdateParamsResponse() {
    return {};
}
export const MsgUpdateParamsResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateParamsResponse();
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
        return MsgUpdateParamsResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgUpdateParamsResponse();
        return message;
    },
};
function createBaseMsgCommunityPoolSpend() {
    return { authority: "", recipient: "", amount: [] };
}
export const MsgCommunityPoolSpend = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.recipient !== "") {
            writer.uint32(18).string(message.recipient);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCommunityPoolSpend();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.recipient = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
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
            authority: isSet(object.authority) ? String(object.authority) : "",
            recipient: isSet(object.recipient) ? String(object.recipient) : "",
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.recipient !== "") {
            obj.recipient = message.recipient;
        }
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgCommunityPoolSpend.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgCommunityPoolSpend();
        message.authority = object.authority ?? "";
        message.recipient = object.recipient ?? "";
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgCommunityPoolSpendResponse() {
    return {};
}
export const MsgCommunityPoolSpendResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCommunityPoolSpendResponse();
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
        return MsgCommunityPoolSpendResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgCommunityPoolSpendResponse();
        return message;
    },
};
function createBaseMsgDepositValidatorRewardsPool() {
    return { depositor: "", validatorAddress: "", amount: [] };
}
export const MsgDepositValidatorRewardsPool = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.depositor !== "") {
            writer.uint32(10).string(message.depositor);
        }
        if (message.validatorAddress !== "") {
            writer.uint32(18).string(message.validatorAddress);
        }
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositValidatorRewardsPool();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.depositor = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.validatorAddress = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.amount.push(Coin.decode(reader, reader.uint32()));
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
            depositor: isSet(object.depositor) ? String(object.depositor) : "",
            validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
            amount: Array.isArray(object?.amount) ? object.amount.map((e) => Coin.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.depositor !== "") {
            obj.depositor = message.depositor;
        }
        if (message.validatorAddress !== "") {
            obj.validatorAddress = message.validatorAddress;
        }
        if (message.amount?.length) {
            obj.amount = message.amount.map((e) => Coin.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return MsgDepositValidatorRewardsPool.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgDepositValidatorRewardsPool();
        message.depositor = object.depositor ?? "";
        message.validatorAddress = object.validatorAddress ?? "";
        message.amount = object.amount?.map((e) => Coin.fromPartial(e)) || [];
        return message;
    },
};
function createBaseMsgDepositValidatorRewardsPoolResponse() {
    return {};
}
export const MsgDepositValidatorRewardsPoolResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgDepositValidatorRewardsPoolResponse();
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
        return MsgDepositValidatorRewardsPoolResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgDepositValidatorRewardsPoolResponse();
        return message;
    },
};
export const MsgServiceName = "cosmos.distribution.v1beta1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.SetWithdrawAddress = this.SetWithdrawAddress.bind(this);
        this.WithdrawDelegatorReward = this.WithdrawDelegatorReward.bind(this);
        this.WithdrawValidatorCommission = this.WithdrawValidatorCommission.bind(this);
        this.FundCommunityPool = this.FundCommunityPool.bind(this);
        this.UpdateParams = this.UpdateParams.bind(this);
        this.CommunityPoolSpend = this.CommunityPoolSpend.bind(this);
        this.DepositValidatorRewardsPool = this.DepositValidatorRewardsPool.bind(this);
    }
    SetWithdrawAddress(request) {
        const data = MsgSetWithdrawAddress.encode(request).finish();
        const promise = this.rpc.request(this.service, "SetWithdrawAddress", data);
        return promise.then((data) => MsgSetWithdrawAddressResponse.decode(_m0.Reader.create(data)));
    }
    WithdrawDelegatorReward(request) {
        const data = MsgWithdrawDelegatorReward.encode(request).finish();
        const promise = this.rpc.request(this.service, "WithdrawDelegatorReward", data);
        return promise.then((data) => MsgWithdrawDelegatorRewardResponse.decode(_m0.Reader.create(data)));
    }
    WithdrawValidatorCommission(request) {
        const data = MsgWithdrawValidatorCommission.encode(request).finish();
        const promise = this.rpc.request(this.service, "WithdrawValidatorCommission", data);
        return promise.then((data) => MsgWithdrawValidatorCommissionResponse.decode(_m0.Reader.create(data)));
    }
    FundCommunityPool(request) {
        const data = MsgFundCommunityPool.encode(request).finish();
        const promise = this.rpc.request(this.service, "FundCommunityPool", data);
        return promise.then((data) => MsgFundCommunityPoolResponse.decode(_m0.Reader.create(data)));
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
    CommunityPoolSpend(request) {
        const data = MsgCommunityPoolSpend.encode(request).finish();
        const promise = this.rpc.request(this.service, "CommunityPoolSpend", data);
        return promise.then((data) => MsgCommunityPoolSpendResponse.decode(_m0.Reader.create(data)));
    }
    DepositValidatorRewardsPool(request) {
        const data = MsgDepositValidatorRewardsPool.encode(request).finish();
        const promise = this.rpc.request(this.service, "DepositValidatorRewardsPool", data);
        return promise.then((data) => MsgDepositValidatorRewardsPoolResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
