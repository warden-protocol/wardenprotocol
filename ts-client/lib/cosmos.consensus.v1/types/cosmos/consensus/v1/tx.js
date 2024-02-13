/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { ABCIParams, BlockParams, EvidenceParams, ValidatorParams } from "../../../tendermint/types/params";
export const protobufPackage = "cosmos.consensus.v1";
function createBaseMsgUpdateParams() {
    return { authority: "", block: undefined, evidence: undefined, validator: undefined, abci: undefined };
}
export const MsgUpdateParams = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.authority !== "") {
            writer.uint32(10).string(message.authority);
        }
        if (message.block !== undefined) {
            BlockParams.encode(message.block, writer.uint32(18).fork()).ldelim();
        }
        if (message.evidence !== undefined) {
            EvidenceParams.encode(message.evidence, writer.uint32(26).fork()).ldelim();
        }
        if (message.validator !== undefined) {
            ValidatorParams.encode(message.validator, writer.uint32(34).fork()).ldelim();
        }
        if (message.abci !== undefined) {
            ABCIParams.encode(message.abci, writer.uint32(42).fork()).ldelim();
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
                    message.block = BlockParams.decode(reader, reader.uint32());
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.evidence = EvidenceParams.decode(reader, reader.uint32());
                    continue;
                case 4:
                    if (tag !== 34) {
                        break;
                    }
                    message.validator = ValidatorParams.decode(reader, reader.uint32());
                    continue;
                case 5:
                    if (tag !== 42) {
                        break;
                    }
                    message.abci = ABCIParams.decode(reader, reader.uint32());
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
            block: isSet(object.block) ? BlockParams.fromJSON(object.block) : undefined,
            evidence: isSet(object.evidence) ? EvidenceParams.fromJSON(object.evidence) : undefined,
            validator: isSet(object.validator) ? ValidatorParams.fromJSON(object.validator) : undefined,
            abci: isSet(object.abci) ? ABCIParams.fromJSON(object.abci) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.authority !== "") {
            obj.authority = message.authority;
        }
        if (message.block !== undefined) {
            obj.block = BlockParams.toJSON(message.block);
        }
        if (message.evidence !== undefined) {
            obj.evidence = EvidenceParams.toJSON(message.evidence);
        }
        if (message.validator !== undefined) {
            obj.validator = ValidatorParams.toJSON(message.validator);
        }
        if (message.abci !== undefined) {
            obj.abci = ABCIParams.toJSON(message.abci);
        }
        return obj;
    },
    create(base) {
        return MsgUpdateParams.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMsgUpdateParams();
        message.authority = object.authority ?? "";
        message.block = (object.block !== undefined && object.block !== null)
            ? BlockParams.fromPartial(object.block)
            : undefined;
        message.evidence = (object.evidence !== undefined && object.evidence !== null)
            ? EvidenceParams.fromPartial(object.evidence)
            : undefined;
        message.validator = (object.validator !== undefined && object.validator !== null)
            ? ValidatorParams.fromPartial(object.validator)
            : undefined;
        message.abci = (object.abci !== undefined && object.abci !== null)
            ? ABCIParams.fromPartial(object.abci)
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
export const MsgServiceName = "cosmos.consensus.v1.Msg";
export class MsgClientImpl {
    constructor(rpc, opts) {
        this.service = opts?.service || MsgServiceName;
        this.rpc = rpc;
        this.UpdateParams = this.UpdateParams.bind(this);
    }
    UpdateParams(request) {
        const data = MsgUpdateParams.encode(request).finish();
        const promise = this.rpc.request(this.service, "UpdateParams", data);
        return promise.then((data) => MsgUpdateParamsResponse.decode(_m0.Reader.create(data)));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
