"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AminoTypes = void 0;
function isAminoConverter(converter) {
    return typeof converter[1] !== "string";
}
/**
 * A map from Stargate message types as used in the messages's `Any` type
 * to Amino types.
 */
class AminoTypes {
    constructor(types) {
        this.register = types;
    }
    toAmino({ typeUrl, value }) {
        const converter = this.register[typeUrl];
        if (converter === "not_supported_by_chain") {
            throw new Error(`The message type '${typeUrl}' cannot be signed using the Amino JSON sign mode because this is not supported by chain.`);
        }
        if (!converter) {
            throw new Error(`Type URL '${typeUrl}' does not exist in the Amino message type register. ` +
                "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
                "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.");
        }
        return {
            type: converter.aminoType,
            value: converter.toAmino(value),
        };
    }
    fromAmino({ type, value }) {
        const matches = Object.entries(this.register)
            .filter(isAminoConverter)
            .filter(([_typeUrl, { aminoType }]) => aminoType === type);
        switch (matches.length) {
            case 0: {
                throw new Error(`Amino type identifier '${type}' does not exist in the Amino message type register. ` +
                    "If you need support for this message type, you can pass in additional entries to the AminoTypes constructor. " +
                    "If you think this message type should be included by default, please open an issue at https://github.com/cosmos/cosmjs/issues.");
            }
            case 1: {
                const [typeUrl, converter] = matches[0];
                return {
                    typeUrl: typeUrl,
                    value: converter.fromAmino(value),
                };
            }
            default:
                throw new Error(`Multiple types are registered with Amino type identifier '${type}': '` +
                    matches
                        .map(([key, _value]) => key)
                        .sort()
                        .join("', '") +
                    "'. Thus fromAmino cannot be performed.");
        }
    }
}
exports.AminoTypes = AminoTypes;
//# sourceMappingURL=aminotypes.js.map