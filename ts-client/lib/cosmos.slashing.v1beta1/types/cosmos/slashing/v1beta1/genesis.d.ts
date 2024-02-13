import _m0 from "protobufjs/minimal";
import { Params, ValidatorSigningInfo } from "./slashing";
export declare const protobufPackage = "cosmos.slashing.v1beta1";
/** GenesisState defines the slashing module's genesis state. */
export interface GenesisState {
    /** params defines all the parameters of the module. */
    params: Params | undefined;
    /**
     * signing_infos represents a map between validator addresses and their
     * signing infos.
     */
    signingInfos: SigningInfo[];
    /**
     * missed_blocks represents a map between validator addresses and their
     * missed blocks.
     */
    missedBlocks: ValidatorMissedBlocks[];
}
/** SigningInfo stores validator signing info of corresponding address. */
export interface SigningInfo {
    /** address is the validator address. */
    address: string;
    /** validator_signing_info represents the signing info of this validator. */
    validatorSigningInfo: ValidatorSigningInfo | undefined;
}
/**
 * ValidatorMissedBlocks contains array of missed blocks of corresponding
 * address.
 */
export interface ValidatorMissedBlocks {
    /** address is the validator address. */
    address: string;
    /** missed_blocks is an array of missed blocks by the validator. */
    missedBlocks: MissedBlock[];
}
/** MissedBlock contains height and missed status as boolean. */
export interface MissedBlock {
    /** index is the height at which the block was missed. */
    index: number;
    /** missed is the missed status. */
    missed: boolean;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        };
        signingInfos?: {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        }[];
        missedBlocks?: {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        }[];
    } & {
        params?: {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K in Exclude<keyof I["params"]["downtimeJailDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["params"], keyof Params>]: never; };
        signingInfos?: {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        }[] & ({
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        } & {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            } & {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            } & { [K_2 in Exclude<keyof I["signingInfos"][number]["validatorSigningInfo"], keyof ValidatorSigningInfo>]: never; };
        } & { [K_3 in Exclude<keyof I["signingInfos"][number], keyof SigningInfo>]: never; })[] & { [K_4 in Exclude<keyof I["signingInfos"], keyof {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        }[]>]: never; };
        missedBlocks?: {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        }[] & ({
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        } & {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[] & ({
                index?: number;
                missed?: boolean;
            } & {
                index?: number;
                missed?: boolean;
            } & { [K_5 in Exclude<keyof I["missedBlocks"][number]["missedBlocks"][number], keyof MissedBlock>]: never; })[] & { [K_6 in Exclude<keyof I["missedBlocks"][number]["missedBlocks"], keyof {
                index?: number;
                missed?: boolean;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I["missedBlocks"][number], keyof ValidatorMissedBlocks>]: never; })[] & { [K_8 in Exclude<keyof I["missedBlocks"], keyof {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        };
        signingInfos?: {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        }[];
        missedBlocks?: {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        }[];
    } & {
        params?: {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & {
            signedBlocksWindow?: number;
            minSignedPerWindow?: Uint8Array;
            downtimeJailDuration?: {
                seconds?: number;
                nanos?: number;
            } & {
                seconds?: number;
                nanos?: number;
            } & { [K_10 in Exclude<keyof I_1["params"]["downtimeJailDuration"], keyof import("../../../google/protobuf/duration").Duration>]: never; };
            slashFractionDoubleSign?: Uint8Array;
            slashFractionDowntime?: Uint8Array;
        } & { [K_11 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        signingInfos?: {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        }[] & ({
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        } & {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            } & {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            } & { [K_12 in Exclude<keyof I_1["signingInfos"][number]["validatorSigningInfo"], keyof ValidatorSigningInfo>]: never; };
        } & { [K_13 in Exclude<keyof I_1["signingInfos"][number], keyof SigningInfo>]: never; })[] & { [K_14 in Exclude<keyof I_1["signingInfos"], keyof {
            address?: string;
            validatorSigningInfo?: {
                address?: string;
                startHeight?: number;
                indexOffset?: number;
                jailedUntil?: Date;
                tombstoned?: boolean;
                missedBlocksCounter?: number;
            };
        }[]>]: never; };
        missedBlocks?: {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        }[] & ({
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        } & {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[] & ({
                index?: number;
                missed?: boolean;
            } & {
                index?: number;
                missed?: boolean;
            } & { [K_15 in Exclude<keyof I_1["missedBlocks"][number]["missedBlocks"][number], keyof MissedBlock>]: never; })[] & { [K_16 in Exclude<keyof I_1["missedBlocks"][number]["missedBlocks"], keyof {
                index?: number;
                missed?: boolean;
            }[]>]: never; };
        } & { [K_17 in Exclude<keyof I_1["missedBlocks"][number], keyof ValidatorMissedBlocks>]: never; })[] & { [K_18 in Exclude<keyof I_1["missedBlocks"], keyof {
            address?: string;
            missedBlocks?: {
                index?: number;
                missed?: boolean;
            }[];
        }[]>]: never; };
    } & { [K_19 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const SigningInfo: {
    encode(message: SigningInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SigningInfo;
    fromJSON(object: any): SigningInfo;
    toJSON(message: SigningInfo): unknown;
    create<I extends {
        address?: string;
        validatorSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        };
    } & {
        address?: string;
        validatorSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & { [K in Exclude<keyof I["validatorSigningInfo"], keyof ValidatorSigningInfo>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof SigningInfo>]: never; }>(base?: I): SigningInfo;
    fromPartial<I_1 extends {
        address?: string;
        validatorSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        };
    } & {
        address?: string;
        validatorSigningInfo?: {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & {
            address?: string;
            startHeight?: number;
            indexOffset?: number;
            jailedUntil?: Date;
            tombstoned?: boolean;
            missedBlocksCounter?: number;
        } & { [K_2 in Exclude<keyof I_1["validatorSigningInfo"], keyof ValidatorSigningInfo>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof SigningInfo>]: never; }>(object: I_1): SigningInfo;
};
export declare const ValidatorMissedBlocks: {
    encode(message: ValidatorMissedBlocks, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorMissedBlocks;
    fromJSON(object: any): ValidatorMissedBlocks;
    toJSON(message: ValidatorMissedBlocks): unknown;
    create<I extends {
        address?: string;
        missedBlocks?: {
            index?: number;
            missed?: boolean;
        }[];
    } & {
        address?: string;
        missedBlocks?: {
            index?: number;
            missed?: boolean;
        }[] & ({
            index?: number;
            missed?: boolean;
        } & {
            index?: number;
            missed?: boolean;
        } & { [K in Exclude<keyof I["missedBlocks"][number], keyof MissedBlock>]: never; })[] & { [K_1 in Exclude<keyof I["missedBlocks"], keyof {
            index?: number;
            missed?: boolean;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ValidatorMissedBlocks>]: never; }>(base?: I): ValidatorMissedBlocks;
    fromPartial<I_1 extends {
        address?: string;
        missedBlocks?: {
            index?: number;
            missed?: boolean;
        }[];
    } & {
        address?: string;
        missedBlocks?: {
            index?: number;
            missed?: boolean;
        }[] & ({
            index?: number;
            missed?: boolean;
        } & {
            index?: number;
            missed?: boolean;
        } & { [K_3 in Exclude<keyof I_1["missedBlocks"][number], keyof MissedBlock>]: never; })[] & { [K_4 in Exclude<keyof I_1["missedBlocks"], keyof {
            index?: number;
            missed?: boolean;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ValidatorMissedBlocks>]: never; }>(object: I_1): ValidatorMissedBlocks;
};
export declare const MissedBlock: {
    encode(message: MissedBlock, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MissedBlock;
    fromJSON(object: any): MissedBlock;
    toJSON(message: MissedBlock): unknown;
    create<I extends {
        index?: number;
        missed?: boolean;
    } & {
        index?: number;
        missed?: boolean;
    } & { [K in Exclude<keyof I, keyof MissedBlock>]: never; }>(base?: I): MissedBlock;
    fromPartial<I_1 extends {
        index?: number;
        missed?: boolean;
    } & {
        index?: number;
        missed?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof MissedBlock>]: never; }>(object: I_1): MissedBlock;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
