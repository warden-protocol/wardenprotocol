"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registry = exports.isTxBodyEncodeObject = exports.isPbjsGeneratedType = exports.isTsProtoGeneratedType = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
const coin_1 = require("cosmjs-types/cosmos/base/v1beta1/coin");
const tx_2 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const any_1 = require("cosmjs-types/google/protobuf/any");
function isTsProtoGeneratedType(type) {
    return typeof type.fromPartial === "function";
}
exports.isTsProtoGeneratedType = isTsProtoGeneratedType;
function isPbjsGeneratedType(type) {
    return !isTsProtoGeneratedType(type);
}
exports.isPbjsGeneratedType = isPbjsGeneratedType;
const defaultTypeUrls = {
    cosmosCoin: "/cosmos.base.v1beta1.Coin",
    cosmosMsgSend: "/cosmos.bank.v1beta1.MsgSend",
    cosmosTxBody: "/cosmos.tx.v1beta1.TxBody",
    googleAny: "/google.protobuf.Any",
};
function isTxBodyEncodeObject(encodeObject) {
    return encodeObject.typeUrl === "/cosmos.tx.v1beta1.TxBody";
}
exports.isTxBodyEncodeObject = isTxBodyEncodeObject;
class Registry {
    /**
     * Creates a new Registry for mapping protobuf type identifiers/type URLs to
     * actual implementations. Those implementations are typically generated with ts-proto
     * but we also support protobuf.js as a type generator.
     *
     * If there is no parameter given, a `new Registry()` adds the types `Coin` and `MsgSend`
     * for historic reasons. Those can be overriden by customTypes.
     *
     * There are currently two methods for adding new types:
     * 1. Passing types to the constructor.
     * 2. Using the `register()` method
     */
    constructor(customTypes) {
        const { cosmosCoin, cosmosMsgSend } = defaultTypeUrls;
        this.types = customTypes
            ? new Map([...customTypes])
            : new Map([
                [cosmosCoin, coin_1.Coin],
                [cosmosMsgSend, tx_1.MsgSend],
            ]);
    }
    register(typeUrl, type) {
        this.types.set(typeUrl, type);
    }
    /**
     * Looks up a type that was previously added to the registry.
     *
     * The generator information (ts-proto or pbjs) gets lost along the way.
     * If you need to work with the result type in TypeScript, you can use:
     *
     * ```
     * import { assert } from "@cosmjs/utils";
     *
     * const Coin = registry.lookupType("/cosmos.base.v1beta1.Coin");
     * assert(Coin); // Ensures not unset
     * assert(isTsProtoGeneratedType(Coin)); // Ensures this is the type we expect
     *
     * // Coin is typed TsProtoGeneratedType now.
     * ```
     */
    lookupType(typeUrl) {
        return this.types.get(typeUrl);
    }
    lookupTypeWithError(typeUrl) {
        const type = this.lookupType(typeUrl);
        if (!type) {
            throw new Error(`Unregistered type url: ${typeUrl}`);
        }
        return type;
    }
    /**
     * Takes a typeUrl/value pair and encodes the value to protobuf if
     * the given type was previously registered.
     *
     * If the value has to be wrapped in an Any, this needs to be done
     * manually after this call. Or use `encodeAsAny` instead.
     */
    encode(encodeObject) {
        const { value, typeUrl } = encodeObject;
        if (isTxBodyEncodeObject(encodeObject)) {
            return this.encodeTxBody(value);
        }
        const type = this.lookupTypeWithError(typeUrl);
        const instance = isTsProtoGeneratedType(type) ? type.fromPartial(value) : type.create(value);
        return type.encode(instance).finish();
    }
    /**
     * Takes a typeUrl/value pair and encodes the value to an Any if
     * the given type was previously registered.
     */
    encodeAsAny(encodeObject) {
        const binaryValue = this.encode(encodeObject);
        return any_1.Any.fromPartial({
            typeUrl: encodeObject.typeUrl,
            value: binaryValue,
        });
    }
    encodeTxBody(txBodyFields) {
        const wrappedMessages = txBodyFields.messages.map((message) => this.encodeAsAny(message));
        const txBody = tx_2.TxBody.fromPartial({
            ...txBodyFields,
            messages: wrappedMessages,
        });
        return tx_2.TxBody.encode(txBody).finish();
    }
    decode({ typeUrl, value }) {
        if (typeUrl === defaultTypeUrls.cosmosTxBody) {
            return this.decodeTxBody(value);
        }
        const type = this.lookupTypeWithError(typeUrl);
        const decoded = type.decode(value);
        Object.entries(decoded).forEach(([key, val]) => {
            if (typeof Buffer !== "undefined" && typeof Buffer.isBuffer !== "undefined" && Buffer.isBuffer(val)) {
                decoded[key] = Uint8Array.from(val);
            }
        });
        return decoded;
    }
    decodeTxBody(txBody) {
        const decodedTxBody = tx_2.TxBody.decode(txBody);
        return {
            ...decodedTxBody,
            messages: decodedTxBody.messages.map(({ typeUrl: typeUrl, value }) => {
                if (!typeUrl) {
                    throw new Error("Missing type_url in Any");
                }
                if (!value) {
                    throw new Error("Missing value in Any");
                }
                return this.decode({ typeUrl, value });
            }),
        };
    }
}
exports.Registry = Registry;
//# sourceMappingURL=registry.js.map