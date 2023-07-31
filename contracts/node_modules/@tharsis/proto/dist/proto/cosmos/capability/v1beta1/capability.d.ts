import * as pb_1 from "google-protobuf";
export declare namespace cosmos.capability.v1beta1 {
    class Capability extends pb_1.Message {
        constructor(data?: any[] | {
            index?: number;
        });
        get index(): number;
        set index(value: number);
        static fromObject(data: {
            index?: number;
        }): Capability;
        toObject(): {
            index?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Capability;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Capability;
    }
    class Owner extends pb_1.Message {
        constructor(data?: any[] | {
            module?: string;
            name?: string;
        });
        get module(): string;
        set module(value: string);
        get name(): string;
        set name(value: string);
        static fromObject(data: {
            module?: string;
            name?: string;
        }): Owner;
        toObject(): {
            module?: string | undefined;
            name?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Owner;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Owner;
    }
    class CapabilityOwners extends pb_1.Message {
        constructor(data?: any[] | {
            owners?: Owner[];
        });
        get owners(): Owner[];
        set owners(value: Owner[]);
        static fromObject(data: {
            owners?: ReturnType<typeof Owner.prototype.toObject>[];
        }): CapabilityOwners;
        toObject(): {
            owners?: {
                module?: string | undefined;
                name?: string | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CapabilityOwners;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CapabilityOwners;
    }
}
//# sourceMappingURL=capability.d.ts.map