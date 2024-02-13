/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Plan } from "./upgrade";
export const protobufPackage = "cosmos.upgrade.v1beta1";
function createBaseMsgSoftwareUpgrade() {
    return { authority: "", plan: undefined };
}
export const MsgSoftwareUpgrade = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.plan !== undefined) {
            Plan.encode(message.plan, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSoftwareUpgrade();
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
                    message.plan = Plan.decode(reader, reader.uint32());
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
            plan: isSet(object.plan) ? Plan.fromJSON(object.plan) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.plan !== undefined) {
            obj.plan = Plan.toJSON(message.plan);
        }
        return obj;
    },
    create(base) {
        return MsgSoftwareUpgrade.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgSoftwareUpgrade();
        message.authority = object.authority ?? "";
        message.plan = (object.plan !== undefined && object.plan !== null) ? Plan.fromPartial(object.plan) : undefined;
        return message;
    },
};
function createBaseMsgSoftwareUpgradeResponse() {
    return {};
}
export const MsgSoftwareUpgradeResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSoftwareUpgradeResponse();
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
        return MsgSoftwareUpgradeResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgSoftwareUpgradeResponse();
        return message;
    },
};
function createBaseMsgCancelUpgrade() {
    return { authority: "" };
}
export const MsgCancelUpgrade = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUpgrade();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.authority = reader.string();
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
        return { authority: isSet(object.authority) ? String(object.authority) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        return obj;
    },
    create(base) {
        return MsgCancelUpgrade.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgCancelUpgrade();
        message.authority = object.authority ?? "";
        return message;
    },
};
function createBaseMsgCancelUpgradeResponse() {
    return {};
}
export const MsgCancelUpgradeResponse = {
    encode(_, writer = _m0.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCancelUpgradeResponse();
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
        return MsgCancelUpgradeResponse.fromPartial(base ?? {});
    },
    fromPartial(_) {
        const message = createBaseMsgCancelUpgradeResponse();
        return message;
    },
};
export const MsgServiceName = "cosmos.upgrade.v1beta1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.SoftwareUpgrade = this.SoftwareUpgrade.bind(this);
        this.CancelUpgrade = this.CancelUpgrade.bind(this);
    }
    SoftwareUpgrade(request) {
        const data = MsgSoftwareUpgrade.encode(request).finish();
        const promise = this.rpc.request(this.service, "SoftwareUpgrade", data);
        return promise.then((data) => MsgSoftwareUpgradeResponse.decode(_m0.Reader.create(data)));
    }
    CancelUpgrade(request) {
        const data = MsgCancelUpgrade.encode(request).finish();
        const promise = this.rpc.request(this.service, "CancelUpgrade", data);
        return promise.then((data) => MsgCancelUpgradeResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
