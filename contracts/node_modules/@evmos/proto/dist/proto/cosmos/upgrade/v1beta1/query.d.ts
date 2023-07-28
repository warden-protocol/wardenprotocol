import * as dependency_3 from "./upgrade";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.upgrade.v1beta1 {
    class QueryCurrentPlanRequest extends pb_1.Message {
        constructor(data?: any[] | {});
        static fromObject(data: {}): QueryCurrentPlanRequest;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryCurrentPlanRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryCurrentPlanRequest;
    }
    class QueryCurrentPlanResponse extends pb_1.Message {
        constructor(data?: any[] | {
            plan?: dependency_3.cosmos.upgrade.v1beta1.Plan;
        });
        get plan(): dependency_3.cosmos.upgrade.v1beta1.Plan;
        set plan(value: dependency_3.cosmos.upgrade.v1beta1.Plan);
        static fromObject(data: {
            plan?: ReturnType<typeof dependency_3.cosmos.upgrade.v1beta1.Plan.prototype.toObject>;
        }): QueryCurrentPlanResponse;
        toObject(): {
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
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryCurrentPlanResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryCurrentPlanResponse;
    }
    class QueryAppliedPlanRequest extends pb_1.Message {
        constructor(data?: any[] | {
            name?: string;
        });
        get name(): string;
        set name(value: string);
        static fromObject(data: {
            name?: string;
        }): QueryAppliedPlanRequest;
        toObject(): {
            name?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAppliedPlanRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAppliedPlanRequest;
    }
    class QueryAppliedPlanResponse extends pb_1.Message {
        constructor(data?: any[] | {
            height?: number;
        });
        get height(): number;
        set height(value: number);
        static fromObject(data: {
            height?: number;
        }): QueryAppliedPlanResponse;
        toObject(): {
            height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryAppliedPlanResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryAppliedPlanResponse;
    }
    class QueryUpgradedConsensusStateRequest extends pb_1.Message {
        constructor(data?: any[] | {
            last_height?: number;
        });
        get last_height(): number;
        set last_height(value: number);
        static fromObject(data: {
            last_height?: number;
        }): QueryUpgradedConsensusStateRequest;
        toObject(): {
            last_height?: number | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUpgradedConsensusStateRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUpgradedConsensusStateRequest;
    }
    class QueryUpgradedConsensusStateResponse extends pb_1.Message {
        constructor(data?: any[] | {
            upgraded_consensus_state?: Uint8Array;
        });
        get upgraded_consensus_state(): Uint8Array;
        set upgraded_consensus_state(value: Uint8Array);
        static fromObject(data: {
            upgraded_consensus_state?: Uint8Array;
        }): QueryUpgradedConsensusStateResponse;
        toObject(): {
            upgraded_consensus_state?: Uint8Array | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryUpgradedConsensusStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryUpgradedConsensusStateResponse;
    }
    class QueryModuleVersionsRequest extends pb_1.Message {
        constructor(data?: any[] | {
            module_name?: string;
        });
        get module_name(): string;
        set module_name(value: string);
        static fromObject(data: {
            module_name?: string;
        }): QueryModuleVersionsRequest;
        toObject(): {
            module_name?: string | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryModuleVersionsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryModuleVersionsRequest;
    }
    class QueryModuleVersionsResponse extends pb_1.Message {
        constructor(data?: any[] | {
            module_versions?: dependency_3.cosmos.upgrade.v1beta1.ModuleVersion[];
        });
        get module_versions(): dependency_3.cosmos.upgrade.v1beta1.ModuleVersion[];
        set module_versions(value: dependency_3.cosmos.upgrade.v1beta1.ModuleVersion[]);
        static fromObject(data: {
            module_versions?: ReturnType<typeof dependency_3.cosmos.upgrade.v1beta1.ModuleVersion.prototype.toObject>[];
        }): QueryModuleVersionsResponse;
        toObject(): {
            module_versions?: {
                name?: string | undefined;
                version?: number | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): QueryModuleVersionsResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): QueryModuleVersionsResponse;
    }
}
//# sourceMappingURL=query.d.ts.map