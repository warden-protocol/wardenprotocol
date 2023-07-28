import * as dependency_2 from "./slashing";
import * as pb_1 from "google-protobuf";
export declare namespace cosmos.slashing.v1beta1 {
    class GenesisState extends pb_1.Message {
        constructor(data?: any[] | {
            params?: dependency_2.cosmos.slashing.v1beta1.Params;
            signing_infos?: SigningInfo[];
            missed_blocks?: ValidatorMissedBlocks[];
        });
        get params(): dependency_2.cosmos.slashing.v1beta1.Params;
        set params(value: dependency_2.cosmos.slashing.v1beta1.Params);
        get signing_infos(): SigningInfo[];
        set signing_infos(value: SigningInfo[]);
        get missed_blocks(): ValidatorMissedBlocks[];
        set missed_blocks(value: ValidatorMissedBlocks[]);
        static fromObject(data: {
            params?: ReturnType<typeof dependency_2.cosmos.slashing.v1beta1.Params.prototype.toObject>;
            signing_infos?: ReturnType<typeof SigningInfo.prototype.toObject>[];
            missed_blocks?: ReturnType<typeof ValidatorMissedBlocks.prototype.toObject>[];
        }): GenesisState;
        toObject(): {
            params?: {
                signed_blocks_window?: number | undefined;
                min_signed_per_window?: Uint8Array | undefined;
                downtime_jail_duration?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                slash_fraction_double_sign?: Uint8Array | undefined;
                slash_fraction_downtime?: Uint8Array | undefined;
            } | undefined;
            signing_infos?: {
                address?: string | undefined;
                validator_signing_info?: {
                    address?: string | undefined;
                    start_height?: number | undefined;
                    index_offset?: number | undefined;
                    jailed_until?: {
                        seconds?: number | undefined;
                        nanos?: number | undefined;
                    } | undefined;
                    tombstoned?: boolean | undefined;
                    missed_blocks_counter?: number | undefined;
                } | undefined;
            }[] | undefined;
            missed_blocks?: {
                address?: string | undefined;
                missed_blocks?: {
                    index?: number | undefined;
                    missed?: boolean | undefined;
                }[] | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GenesisState;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GenesisState;
    }
    class SigningInfo extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            validator_signing_info?: dependency_2.cosmos.slashing.v1beta1.ValidatorSigningInfo;
        });
        get address(): string;
        set address(value: string);
        get validator_signing_info(): dependency_2.cosmos.slashing.v1beta1.ValidatorSigningInfo;
        set validator_signing_info(value: dependency_2.cosmos.slashing.v1beta1.ValidatorSigningInfo);
        static fromObject(data: {
            address?: string;
            validator_signing_info?: ReturnType<typeof dependency_2.cosmos.slashing.v1beta1.ValidatorSigningInfo.prototype.toObject>;
        }): SigningInfo;
        toObject(): {
            address?: string | undefined;
            validator_signing_info?: {
                address?: string | undefined;
                start_height?: number | undefined;
                index_offset?: number | undefined;
                jailed_until?: {
                    seconds?: number | undefined;
                    nanos?: number | undefined;
                } | undefined;
                tombstoned?: boolean | undefined;
                missed_blocks_counter?: number | undefined;
            } | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SigningInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SigningInfo;
    }
    class ValidatorMissedBlocks extends pb_1.Message {
        constructor(data?: any[] | {
            address?: string;
            missed_blocks?: MissedBlock[];
        });
        get address(): string;
        set address(value: string);
        get missed_blocks(): MissedBlock[];
        set missed_blocks(value: MissedBlock[]);
        static fromObject(data: {
            address?: string;
            missed_blocks?: ReturnType<typeof MissedBlock.prototype.toObject>[];
        }): ValidatorMissedBlocks;
        toObject(): {
            address?: string | undefined;
            missed_blocks?: {
                index?: number | undefined;
                missed?: boolean | undefined;
            }[] | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ValidatorMissedBlocks;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ValidatorMissedBlocks;
    }
    class MissedBlock extends pb_1.Message {
        constructor(data?: any[] | {
            index?: number;
            missed?: boolean;
        });
        get index(): number;
        set index(value: number);
        get missed(): boolean;
        set missed(value: boolean);
        static fromObject(data: {
            index?: number;
            missed?: boolean;
        }): MissedBlock;
        toObject(): {
            index?: number | undefined;
            missed?: boolean | undefined;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MissedBlock;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MissedBlock;
    }
}
//# sourceMappingURL=genesis.d.ts.map