/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "cosmos.circuit.v1";
/** Level is the permission level. */
export var Permissions_Level;
(function (Permissions_Level) {
    /**
     * LEVEL_NONE_UNSPECIFIED - LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
     * breaker permissions.
     */
    Permissions_Level[Permissions_Level["LEVEL_NONE_UNSPECIFIED"] = 0] = "LEVEL_NONE_UNSPECIFIED";
    /**
     * LEVEL_SOME_MSGS - LEVEL_SOME_MSGS indicates that the account will have permission to
     * trip or reset the circuit breaker for some Msg type URLs. If this level
     * is chosen, a non-empty list of Msg type URLs must be provided in
     * limit_type_urls.
     */
    Permissions_Level[Permissions_Level["LEVEL_SOME_MSGS"] = 1] = "LEVEL_SOME_MSGS";
    /**
     * LEVEL_ALL_MSGS - LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
     * breaker for Msg's of all type URLs.
     */
    Permissions_Level[Permissions_Level["LEVEL_ALL_MSGS"] = 2] = "LEVEL_ALL_MSGS";
    /**
     * LEVEL_SUPER_ADMIN - LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
     * actions and can grant permissions to other accounts.
     */
    Permissions_Level[Permissions_Level["LEVEL_SUPER_ADMIN"] = 3] = "LEVEL_SUPER_ADMIN";
    Permissions_Level[Permissions_Level["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Permissions_Level || (Permissions_Level = {}));
export function permissions_LevelFromJSON(object) {
    switch (object) {
        case 0:
        case "LEVEL_NONE_UNSPECIFIED":
            return Permissions_Level.LEVEL_NONE_UNSPECIFIED;
        case 1:
        case "LEVEL_SOME_MSGS":
            return Permissions_Level.LEVEL_SOME_MSGS;
        case 2:
        case "LEVEL_ALL_MSGS":
            return Permissions_Level.LEVEL_ALL_MSGS;
        case 3:
        case "LEVEL_SUPER_ADMIN":
            return Permissions_Level.LEVEL_SUPER_ADMIN;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Permissions_Level.UNRECOGNIZED;
    }
}
export function permissions_LevelToJSON(object) {
    switch (object) {
        case Permissions_Level.LEVEL_NONE_UNSPECIFIED:
            return "LEVEL_NONE_UNSPECIFIED";
        case Permissions_Level.LEVEL_SOME_MSGS:
            return "LEVEL_SOME_MSGS";
        case Permissions_Level.LEVEL_ALL_MSGS:
            return "LEVEL_ALL_MSGS";
        case Permissions_Level.LEVEL_SUPER_ADMIN:
            return "LEVEL_SUPER_ADMIN";
        case Permissions_Level.UNRECOGNIZED:
        default:
            return "UNRECOGNIZED";
    }
}
function createBasePermissions() {
    return { level: 0, limitTypeUrls: [] };
}
export const Permissions = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.level !== 0) {
            writer.uint32(8).int32(message.level);
        }
        for (const v of message.limitTypeUrls) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePermissions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 8) {
                        break;
                    }
                    message.level = reader.int32();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.limitTypeUrls.push(reader.string());
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
            level: isSet(object.level) ? permissions_LevelFromJSON(object.level) : 0,
            limitTypeUrls: Array.isArray(object?.limitTypeUrls) ? object.limitTypeUrls.map((e) => String(e)) : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.level !== 0) {
            obj.level = permissions_LevelToJSON(message.level);
        }
        if (message.limitTypeUrls?.length) {
            obj.limitTypeUrls = message.limitTypeUrls;
        }
        return obj;
    },
    create(base) {
        return Permissions.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePermissions();
        message.level = object.level ?? 0;
        message.limitTypeUrls = object.limitTypeUrls?.map((e) => e) || [];
        return message;
    },
};
function createBaseGenesisAccountPermissions() {
    return { address: "", permissions: undefined };
}
export const GenesisAccountPermissions = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.permissions !== undefined) {
            Permissions.encode(message.permissions, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisAccountPermissions();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.address = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.permissions = Permissions.decode(reader, reader.uint32());
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
            address: isSet(object.address) ? String(object.address) : "",
            permissions: isSet(object.permissions) ? Permissions.fromJSON(object.permissions) : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.address !== "") {
            obj.address = message.address;
        }
        if (message.permissions !== undefined) {
            obj.permissions = Permissions.toJSON(message.permissions);
        }
        return obj;
    },
    create(base) {
        return GenesisAccountPermissions.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisAccountPermissions();
        message.address = object.address ?? "";
        message.permissions = (object.permissions !== undefined && object.permissions !== null)
            ? Permissions.fromPartial(object.permissions)
            : undefined;
        return message;
    },
};
function createBaseGenesisState() {
    return { accountPermissions: [], disabledTypeUrls: [] };
}
export const GenesisState = {
    encode(message, writer = _m0.Writer.create()) {
        for (const v of message.accountPermissions) {
            GenesisAccountPermissions.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.disabledTypeUrls) {
            writer.uint32(18).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.accountPermissions.push(GenesisAccountPermissions.decode(reader, reader.uint32()));
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.disabledTypeUrls.push(reader.string());
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
            accountPermissions: Array.isArray(object?.accountPermissions)
                ? object.accountPermissions.map((e) => GenesisAccountPermissions.fromJSON(e))
                : [],
            disabledTypeUrls: Array.isArray(object?.disabledTypeUrls)
                ? object.disabledTypeUrls.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.accountPermissions?.length) {
            obj.accountPermissions = message.accountPermissions.map((e) => GenesisAccountPermissions.toJSON(e));
        }
        if (message.disabledTypeUrls?.length) {
            obj.disabledTypeUrls = message.disabledTypeUrls;
        }
        return obj;
    },
    create(base) {
        return GenesisState.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseGenesisState();
        message.accountPermissions = object.accountPermissions?.map((e) => GenesisAccountPermissions.fromPartial(e)) || [];
        message.disabledTypeUrls = object.disabledTypeUrls?.map((e) => e) || [];
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
