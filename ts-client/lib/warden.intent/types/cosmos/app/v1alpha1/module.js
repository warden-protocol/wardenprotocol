/* eslint-disable */
import _m0 from "protobufjs/minimal";
export const protobufPackage = "cosmos.app.v1alpha1";
function createBaseModuleDescriptor() {
    return { goImport: "", usePackage: [], canMigrateFrom: [] };
}
export const ModuleDescriptor = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.goImport !== "") {
            writer.uint32(10).string(message.goImport);
        }
        for (const v of message.usePackage) {
            PackageReference.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.canMigrateFrom) {
            MigrateFromInfo.encode(v, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseModuleDescriptor();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.goImport = reader.string();
                    continue;
                case 2:
                    if (tag !== 18) {
                        break;
                    }
                    message.usePackage.push(PackageReference.decode(reader, reader.uint32()));
                    continue;
                case 3:
                    if (tag !== 26) {
                        break;
                    }
                    message.canMigrateFrom.push(MigrateFromInfo.decode(reader, reader.uint32()));
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
            goImport: isSet(object.goImport) ? String(object.goImport) : "",
            usePackage: Array.isArray(object?.usePackage)
                ? object.usePackage.map((e) => PackageReference.fromJSON(e))
                : [],
            canMigrateFrom: Array.isArray(object?.canMigrateFrom)
                ? object.canMigrateFrom.map((e) => MigrateFromInfo.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.goImport !== "") {
            obj.goImport = message.goImport;
        }
        if (message.usePackage?.length) {
            obj.usePackage = message.usePackage.map((e) => PackageReference.toJSON(e));
        }
        if (message.canMigrateFrom?.length) {
            obj.canMigrateFrom = message.canMigrateFrom.map((e) => MigrateFromInfo.toJSON(e));
        }
        return obj;
    },
    create(base) {
        return ModuleDescriptor.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseModuleDescriptor();
        message.goImport = object.goImport ?? "";
        message.usePackage = object.usePackage?.map((e) => PackageReference.fromPartial(e)) || [];
        message.canMigrateFrom = object.canMigrateFrom?.map((e) => MigrateFromInfo.fromPartial(e)) || [];
        return message;
    },
};
function createBasePackageReference() {
    return { name: "", revision: 0 };
}
export const PackageReference = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.revision !== 0) {
            writer.uint32(16).uint32(message.revision);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBasePackageReference();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.name = reader.string();
                    continue;
                case 2:
                    if (tag !== 16) {
                        break;
                    }
                    message.revision = reader.uint32();
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
            name: isSet(object.name) ? String(object.name) : "",
            revision: isSet(object.revision) ? Number(object.revision) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.name !== "") {
            obj.name = message.name;
        }
        if (message.revision !== 0) {
            obj.revision = Math.round(message.revision);
        }
        return obj;
    },
    create(base) {
        return PackageReference.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBasePackageReference();
        message.name = object.name ?? "";
        message.revision = object.revision ?? 0;
        return message;
    },
};
function createBaseMigrateFromInfo() {
    return { module: "" };
}
export const MigrateFromInfo = {
    encode(message, writer = _m0.Writer.create()) {
        if (message.module !== "") {
            writer.uint32(10).string(message.module);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMigrateFromInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if (tag !== 10) {
                        break;
                    }
                    message.module = reader.string();
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
        return { module: isSet(object.module) ? String(object.module) : "" };
    },
    toJSON(message) {
        const obj = {};
        if (message.module !== "") {
            obj.module = message.module;
        }
        return obj;
    },
    create(base) {
        return MigrateFromInfo.fromPartial(base ?? {});
    },
    fromPartial(object) {
        const message = createBaseMigrateFromInfo();
        message.module = object.module ?? "";
        return message;
    },
};
function isSet(value) {
    return value !== null && value !== undefined;
}
