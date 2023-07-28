import * as dependency_1 from "./../../../google/protobuf/any";
import * as dependency_3 from "./../../../google/protobuf/timestamp";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.upgrade.v1beta1 {
    class Plan extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
            time?: dependency_3.google.protobuf.Timestamp;
            height?: number;
            info?: string;
            upgraded_client_state?: dependency_1.google.protobuf.Any;
        });
        get name(): string;
        set name(value: string);
        get time(): dependency_3.google.protobuf.Timestamp;
        set time(value: dependency_3.google.protobuf.Timestamp);
        get height(): number;
        set height(value: number);
        get info(): string;
        set info(value: string);
        get upgraded_client_state(): dependency_1.google.protobuf.Any;
        set upgraded_client_state(value: dependency_1.google.protobuf.Any);
        static fromObject(data: {
            name?: string;
            time?: ReturnType<typeof dependency_3.google.protobuf.Timestamp.prototype.toObject>;
            height?: number;
            info?: string;
            upgraded_client_state?: ReturnType<typeof dependency_1.google.protobuf.Any.prototype.toObject>;
        }): Plan;
        toObject(): {
            name?: string | undefined;
            time?: {
                seconds?: number | undefined;
                nanos?: number | undefined;
            } | undefined;
            height?: number | undefined;
            info?: string | undefined;
            upgraded_client_state?: {
                type_url?: string | undefined;
                value?: Uint8Array | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Plan;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Plan;
    }
    class SoftwareUpgradeProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
            plan?: Plan;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get plan(): Plan;
        set plan(value: Plan);
        static fromObject(data: {
            title?: string;
            description?: string;
            plan?: ReturnType<typeof Plan.prototype.toObject>;
        }): SoftwareUpgradeProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
            plan?: {
                name?: string | undefined;
                time?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                height?: number | undefined;
                info?: string | undefined;
                upgraded_client_state?: {
                    type_url?: string | undefined;
                    value?: Uint8Array | undefined;
                } | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SoftwareUpgradeProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SoftwareUpgradeProposal;
    }
    class CancelSoftwareUpgradeProposal extends pb_1.Message {
        constructor(data?: any[] | {
            title?: string;
            description?: string;
        });
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        static fromObject(data: {
            title?: string;
            description?: string;
        }): CancelSoftwareUpgradeProposal;
        toObject(): {
            title?: string | undefined;
            description?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CancelSoftwareUpgradeProposal;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CancelSoftwareUpgradeProposal;
    }
    class ModuleVersion extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
            version?: number;
        });
        get name(): string;
        set name(value: string);
        get version(): number;
        set version(value: number);
        static fromObject(data: {
            name?: string;
            version?: number;
        }): ModuleVersion;
        toObject(): {
            name?: string | undefined;
            version?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ModuleVersion;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ModuleVersion;
    }
}
//# sourceMappingURL=upgrade.d.ts.map