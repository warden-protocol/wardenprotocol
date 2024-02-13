/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "cosmos.params.v1beta1";
function createBaseParameterChangeProposal() {
    return { title: "", description: "", changes: [] };
}
export const ParameterChangeProposal = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.title !== "") {
            writer.uint32(10).string(message.title);
        }
        if (message.description !== "") {
            writer.uint32(18).string(message.description);
        }
        for (const v of message.changes) {
            ParamChange.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParameterChangeProposal();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.title = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.description = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.changes.push(ParamChange.decode(reader, reader.uint32()));
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
            title: isSet(object.title) ? String(object.title) : "",
            description: isSet(object.description) ? String(object.description) : "",
            changes: Array.isArray(object?.changes) ? object.changes.map((e) => ParamChange.fromJSON(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.title !== "") {
            obj.title = message.title;
        }
        if (message.description !== "") {
            obj.description = message.description;
        }
        if (message.changes?.length) {
            obj.changes = message.changes.map((e) => ParamChange.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ParameterChangeProposal.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParameterChangeProposal();
        message.title = object.title ?? "";
        message.description = object.description ?? "";
        message.changes = object.changes?.map((e) => ParamChange.fromPartial(e)) || [];
        return message;
    },
};
function createBaseParamChange() {
    return { subspace: "", key: "", value: "" };
}
export const ParamChange = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.subspace !== "") {
            writer.uint32(10).string(message.subspace);
        }
        if (message.key !== "") {
            writer.uint32(18).string(message.key);
        }
        if (message.value !== "") {
            writer.uint32(26).string(message.value);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParamChange();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.subspace = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.key = reader.string();
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.value = reader.string();
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
            subspace: isSet(object.subspace) ? String(object.subspace) : "",
            key: isSet(object.key) ? String(object.key) : "",
            value: isSet(object.value) ? String(object.value) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.subspace !== "") {
            obj.subspace = message.subspace;
        }
        if (message.key !== "") {
            obj.key = message.key;
        }
        if (message.value !== "") {
            obj.value = message.value;
        }
        return obj;
    },
    create(base) {
        return ParamChange.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseParamChange();
        message.subspace = object.subspace ?? "";
        message.key = object.key ?? "";
        message.value = object.value ?? "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
