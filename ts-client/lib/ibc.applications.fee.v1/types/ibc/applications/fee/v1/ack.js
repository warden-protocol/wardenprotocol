/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "ibc.applications.fee.v1";
function createBaseIncentivizedAcknowledgement() {
    return { appAcknowledgement: new Uint8Array(0), forwardRelayerAddress: "", underlyingAppSuccess: false };
}
export const IncentivizedAcknowledgement = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.appAcknowledgement.length !== 0) {
            writer.uint32(10).bytes(message.appAcknowledgement);
        }
        if (message.forwardRelayerAddress !== "") {
            writer.uint32(18).string(message.forwardRelayerAddress);
        }
        if (message.underlyingAppSuccess === true) {
            writer.uint32(24).bool(message.underlyingAppSuccess);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseIncentivizedAcknowledgement();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.appAcknowledgement = reader.bytes();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.forwardRelayerAddress = reader.string();
                    continue;
                case 3:
                    if (tag !== 24) {
                        break;
                    }
                    message.underlyingAppSuccess = reader.bool();
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
            appAcknowledgement: isSet(object.appAcknowledgement)
                ? bytesFromBase64(object.appAcknowledgement)
                : new Uint8Array(0),
            forwardRelayerAddress: isSet(object.forwardRelayerAddress) ? String(object.forwardRelayerAddress) : "",
            underlyingAppSuccess: isSet(object.underlyingAppSuccess) ? Boolean(object.underlyingAppSuccess) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.appAcknowledgement.length !== 0) {
            obj.appAcknowledgement = base64FromBytes(message.appAcknowledgement);
        }
        if (message.forwardRelayerAddress !== "") {
            obj.forwardRelayerAddress = message.forwardRelayerAddress;
        }
        if (message.underlyingAppSuccess === true) {
            obj.underlyingAppSuccess = message.underlyingAppSuccess;
        }
        return obj;
    },
    create(base) {
        return IncentivizedAcknowledgement.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseIncentivizedAcknowledgement();
        message.appAcknowledgement = object.appAcknowledgement ?? new Uint8Array(0);
        message.forwardRelayerAddress = object.forwardRelayerAddress ?? "";
        message.underlyingAppSuccess = object.underlyingAppSuccess ?? false;
        return message;
    },
};
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
function bytesFromBase64(b64) {
    if (tsProtoGlobalThis.Buffer) {
        return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
    }
    else {
        const bin = tsProtoGlobalThis.atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
    }
}
function base64FromBytes(arr) {
    if (tsProtoGlobalThis.Buffer) {
        return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
    }
    else {
        const bin = [];
        arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
        });
        return tsProtoGlobalThis.btoa(bin.join(""));
    }
}
function isSet(value) {
    return value !== null && value !== undefined;
}
