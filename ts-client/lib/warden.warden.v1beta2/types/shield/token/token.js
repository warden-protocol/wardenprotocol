/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "shield.token";
export var Type;
(function (Type) {
    Type[Type["ILLEGAL"] = 0] = "ILLEGAL";
    Type[Type["EOF"] = 1] = "EOF";
    Type[Type["IDENT"] = 2] = "IDENT";
    Type[Type["INT"] = 3] = "INT";
    Type[Type["COMMA"] = 4] = "COMMA";
    Type[Type["SEMICOLON"] = 5] = "SEMICOLON";
    Type[Type["LPAREN"] = 6] = "LPAREN";
    Type[Type["RPAREN"] = 7] = "RPAREN";
    Type[Type["LBRACKET"] = 8] = "LBRACKET";
    Type[Type["RBRACKET"] = 9] = "RBRACKET";
    Type[Type["AND"] = 10] = "AND";
    Type[Type["OR"] = 11] = "OR";
    Type[Type["TRUE"] = 12] = "TRUE";
    Type[Type["FALSE"] = 13] = "FALSE";
    Type[Type["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Type || (Type = {}));
export function typeFromJSON(object) {
    switch (object) {
        case 0:
        case "ILLEGAL":
            return Type.ILLEGAL;
        case 1:
        case "EOF":
            return Type.EOF;
        case 2:
        case "IDENT":
            return Type.IDENT;
        case 3:
        case "INT":
            return Type.INT;
        case 4:
        case "COMMA":
            return Type.COMMA;
        case 5:
        case "SEMICOLON":
            return Type.SEMICOLON;
        case 6:
        case "LPAREN":
            return Type.LPAREN;
        case 7:
        case "RPAREN":
            return Type.RPAREN;
        case 8:
        case "LBRACKET":
            return Type.LBRACKET;
        case 9:
        case "RBRACKET":
            return Type.RBRACKET;
        case 10:
        case "AND":
            return Type.AND;
        case 11:
        case "OR":
            return Type.OR;
        case 12:
        case "TRUE":
            return Type.TRUE;
        case 13:
        case "FALSE":
            return Type.FALSE;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Type.UNRECOGNIZED;
    }
}
export function typeToJSON(object) {
    switch (object) {
        case Type.ILLEGAL:
            return "ILLEGAL";
        case Type.EOF:
            return "EOF";
        case Type.IDENT:
            return "IDENT";
        case Type.INT:
            return "INT";
        case Type.COMMA:
            return "COMMA";
        case Type.SEMICOLON:
            return "SEMICOLON";
        case Type.LPAREN:
            return "LPAREN";
        case Type.RPAREN:
            return "RPAREN";
        case Type.LBRACKET:
            return "LBRACKET";
        case Type.RBRACKET:
            return "RBRACKET";
        case Type.AND:
            return "AND";
        case Type.OR:
            return "OR";
        case Type.TRUE:
            return "TRUE";
        case Type.FALSE:
            return "FALSE";
        case Type.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBaseToken() {
    return { type: 0, literal: "" };
}
export const Token = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.type !== 0) {
            writer.uint32(8).int32(message.type);
        }
        if (message.literal !== "") {
            writer.uint32(18).string(message.literal);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseToken();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.type = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.literal = reader.string();
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
            type: isSet(object.type) ? typeFromJSON(object.type) : 0,
            literal: isSet(object.literal) ? String(object.literal) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.type !== 0) {
            obj.type = typeToJSON(message.type);
        }
        if (message.literal !== "") {
            obj.literal = message.literal;
        }
        return obj;
    },
    create(base) {
        return Token.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseToken();
        message.type = object.type ?? 0;
        message.literal = object.literal ?? "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
