import _m0 from "protobufjs/minimal";
import { CodeInfo, ContractCodeHistoryEntry, ContractInfo, Model, Params } from "./types";
export declare const protobufPackage = "cosmwasm.wasm.v1";
/** GenesisState - genesis state of x/wasm */
export interface GenesisState {
    params: Params | undefined;
    codes: Code[];
    contracts: Contract[];
    sequences: Sequence[];
}
/** Code struct encompasses CodeInfo and CodeBytes */
export interface Code {
    codeId: number;
    codeInfo: CodeInfo | undefined;
    codeBytes: Uint8Array;
    /** Pinned to wasmvm cache */
    pinned: boolean;
}
/** Contract struct encompasses ContractAddress, ContractInfo, and ContractState */
export interface Contract {
    contractAddress: string;
    contractInfo: ContractInfo | undefined;
    contractState: Model[];
    contractCodeHistory: ContractCodeHistoryEntry[];
}
/** Sequence key and value of an id generation counter */
export interface Sequence {
    idKey: Uint8Array;
    value: number;
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    create<I extends {
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        };
        codes?: {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        }[];
        contracts?: {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        }[];
        sequences?: {
            idKey?: Uint8Array;
            value?: number;
        }[];
    } & {
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K in Exclude<keyof I["params"]["codeUploadAccess"]["addresses"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["params"]["codeUploadAccess"], keyof import("./types").AccessConfig>]: never; };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; };
        codes?: {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        }[] & ({
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        } & {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            } & {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                } & {
                    permission?: import("./types").AccessType;
                    addresses?: string[] & string[] & { [K_3 in Exclude<keyof I["codes"][number]["codeInfo"]["instantiateConfig"]["addresses"], keyof string[]>]: never; };
                } & { [K_4 in Exclude<keyof I["codes"][number]["codeInfo"]["instantiateConfig"], keyof import("./types").AccessConfig>]: never; };
            } & { [K_5 in Exclude<keyof I["codes"][number]["codeInfo"], keyof CodeInfo>]: never; };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        } & { [K_6 in Exclude<keyof I["codes"][number], keyof Code>]: never; })[] & { [K_7 in Exclude<keyof I["codes"], keyof {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        }[]>]: never; };
        contracts?: {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        }[] & ({
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        } & {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            } & {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                } & {
                    blockHeight?: number;
                    txIndex?: number;
                } & { [K_8 in Exclude<keyof I["contracts"][number]["contractInfo"]["created"], keyof import("./types").AbsoluteTxPosition>]: never; };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_9 in Exclude<keyof I["contracts"][number]["contractInfo"]["extension"], keyof import("../../../google/protobuf/any").Any>]: never; };
            } & { [K_10 in Exclude<keyof I["contracts"][number]["contractInfo"], keyof ContractInfo>]: never; };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[] & ({
                key?: Uint8Array;
                value?: Uint8Array;
            } & {
                key?: Uint8Array;
                value?: Uint8Array;
            } & { [K_11 in Exclude<keyof I["contracts"][number]["contractState"][number], keyof Model>]: never; })[] & { [K_12 in Exclude<keyof I["contracts"][number]["contractState"], keyof {
                key?: Uint8Array;
                value?: Uint8Array;
            }[]>]: never; };
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[] & ({
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            } & {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                } & {
                    blockHeight?: number;
                    txIndex?: number;
                } & { [K_13 in Exclude<keyof I["contracts"][number]["contractCodeHistory"][number]["updated"], keyof import("./types").AbsoluteTxPosition>]: never; };
                msg?: Uint8Array;
            } & { [K_14 in Exclude<keyof I["contracts"][number]["contractCodeHistory"][number], keyof ContractCodeHistoryEntry>]: never; })[] & { [K_15 in Exclude<keyof I["contracts"][number]["contractCodeHistory"], keyof {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[]>]: never; };
        } & { [K_16 in Exclude<keyof I["contracts"][number], keyof Contract>]: never; })[] & { [K_17 in Exclude<keyof I["contracts"], keyof {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        }[]>]: never; };
        sequences?: {
            idKey?: Uint8Array;
            value?: number;
        }[] & ({
            idKey?: Uint8Array;
            value?: number;
        } & {
            idKey?: Uint8Array;
            value?: number;
        } & { [K_18 in Exclude<keyof I["sequences"][number], keyof Sequence>]: never; })[] & { [K_19 in Exclude<keyof I["sequences"], keyof {
            idKey?: Uint8Array;
            value?: number;
        }[]>]: never; };
    } & { [K_20 in Exclude<keyof I, keyof GenesisState>]: never; }>(base?: I): GenesisState;
    fromPartial<I_1 extends {
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        };
        codes?: {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        }[];
        contracts?: {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        }[];
        sequences?: {
            idKey?: Uint8Array;
            value?: number;
        }[];
    } & {
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K_21 in Exclude<keyof I_1["params"]["codeUploadAccess"]["addresses"], keyof string[]>]: never; };
            } & { [K_22 in Exclude<keyof I_1["params"]["codeUploadAccess"], keyof import("./types").AccessConfig>]: never; };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & { [K_23 in Exclude<keyof I_1["params"], keyof Params>]: never; };
        codes?: {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        }[] & ({
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        } & {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            } & {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                } & {
                    permission?: import("./types").AccessType;
                    addresses?: string[] & string[] & { [K_24 in Exclude<keyof I_1["codes"][number]["codeInfo"]["instantiateConfig"]["addresses"], keyof string[]>]: never; };
                } & { [K_25 in Exclude<keyof I_1["codes"][number]["codeInfo"]["instantiateConfig"], keyof import("./types").AccessConfig>]: never; };
            } & { [K_26 in Exclude<keyof I_1["codes"][number]["codeInfo"], keyof CodeInfo>]: never; };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        } & { [K_27 in Exclude<keyof I_1["codes"][number], keyof Code>]: never; })[] & { [K_28 in Exclude<keyof I_1["codes"], keyof {
            codeId?: number;
            codeInfo?: {
                codeHash?: Uint8Array;
                creator?: string;
                instantiateConfig?: {
                    permission?: import("./types").AccessType;
                    addresses?: string[];
                };
            };
            codeBytes?: Uint8Array;
            pinned?: boolean;
        }[]>]: never; };
        contracts?: {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        }[] & ({
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        } & {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            } & {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                } & {
                    blockHeight?: number;
                    txIndex?: number;
                } & { [K_29 in Exclude<keyof I_1["contracts"][number]["contractInfo"]["created"], keyof import("./types").AbsoluteTxPosition>]: never; };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_30 in Exclude<keyof I_1["contracts"][number]["contractInfo"]["extension"], keyof import("../../../google/protobuf/any").Any>]: never; };
            } & { [K_31 in Exclude<keyof I_1["contracts"][number]["contractInfo"], keyof ContractInfo>]: never; };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[] & ({
                key?: Uint8Array;
                value?: Uint8Array;
            } & {
                key?: Uint8Array;
                value?: Uint8Array;
            } & { [K_32 in Exclude<keyof I_1["contracts"][number]["contractState"][number], keyof Model>]: never; })[] & { [K_33 in Exclude<keyof I_1["contracts"][number]["contractState"], keyof {
                key?: Uint8Array;
                value?: Uint8Array;
            }[]>]: never; };
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[] & ({
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            } & {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                } & {
                    blockHeight?: number;
                    txIndex?: number;
                } & { [K_34 in Exclude<keyof I_1["contracts"][number]["contractCodeHistory"][number]["updated"], keyof import("./types").AbsoluteTxPosition>]: never; };
                msg?: Uint8Array;
            } & { [K_35 in Exclude<keyof I_1["contracts"][number]["contractCodeHistory"][number], keyof ContractCodeHistoryEntry>]: never; })[] & { [K_36 in Exclude<keyof I_1["contracts"][number]["contractCodeHistory"], keyof {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[]>]: never; };
        } & { [K_37 in Exclude<keyof I_1["contracts"][number], keyof Contract>]: never; })[] & { [K_38 in Exclude<keyof I_1["contracts"], keyof {
            contractAddress?: string;
            contractInfo?: {
                codeId?: number;
                creator?: string;
                admin?: string;
                label?: string;
                created?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                ibcPortId?: string;
                extension?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                };
            };
            contractState?: {
                key?: Uint8Array;
                value?: Uint8Array;
            }[];
            contractCodeHistory?: {
                operation?: import("./types").ContractCodeHistoryOperationType;
                codeId?: number;
                updated?: {
                    blockHeight?: number;
                    txIndex?: number;
                };
                msg?: Uint8Array;
            }[];
        }[]>]: never; };
        sequences?: {
            idKey?: Uint8Array;
            value?: number;
        }[] & ({
            idKey?: Uint8Array;
            value?: number;
        } & {
            idKey?: Uint8Array;
            value?: number;
        } & { [K_39 in Exclude<keyof I_1["sequences"][number], keyof Sequence>]: never; })[] & { [K_40 in Exclude<keyof I_1["sequences"], keyof {
            idKey?: Uint8Array;
            value?: number;
        }[]>]: never; };
    } & { [K_41 in Exclude<keyof I_1, keyof GenesisState>]: never; }>(object: I_1): GenesisState;
};
export declare const Code: {
    encode(message: Code, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Code;
    fromJSON(object: any): Code;
    toJSON(message: Code): unknown;
    create<I extends {
        codeId?: number;
        codeInfo?: {
            codeHash?: Uint8Array;
            creator?: string;
            instantiateConfig?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        };
        codeBytes?: Uint8Array;
        pinned?: boolean;
    } & {
        codeId?: number;
        codeInfo?: {
            codeHash?: Uint8Array;
            creator?: string;
            instantiateConfig?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeHash?: Uint8Array;
            creator?: string;
            instantiateConfig?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K in Exclude<keyof I["codeInfo"]["instantiateConfig"]["addresses"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["codeInfo"]["instantiateConfig"], keyof import("./types").AccessConfig>]: never; };
        } & { [K_2 in Exclude<keyof I["codeInfo"], keyof CodeInfo>]: never; };
        codeBytes?: Uint8Array;
        pinned?: boolean;
    } & { [K_3 in Exclude<keyof I, keyof Code>]: never; }>(base?: I): Code;
    fromPartial<I_1 extends {
        codeId?: number;
        codeInfo?: {
            codeHash?: Uint8Array;
            creator?: string;
            instantiateConfig?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        };
        codeBytes?: Uint8Array;
        pinned?: boolean;
    } & {
        codeId?: number;
        codeInfo?: {
            codeHash?: Uint8Array;
            creator?: string;
            instantiateConfig?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeHash?: Uint8Array;
            creator?: string;
            instantiateConfig?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K_4 in Exclude<keyof I_1["codeInfo"]["instantiateConfig"]["addresses"], keyof string[]>]: never; };
            } & { [K_5 in Exclude<keyof I_1["codeInfo"]["instantiateConfig"], keyof import("./types").AccessConfig>]: never; };
        } & { [K_6 in Exclude<keyof I_1["codeInfo"], keyof CodeInfo>]: never; };
        codeBytes?: Uint8Array;
        pinned?: boolean;
    } & { [K_7 in Exclude<keyof I_1, keyof Code>]: never; }>(object: I_1): Code;
};
export declare const Contract: {
    encode(message: Contract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Contract;
    fromJSON(object: any): Contract;
    toJSON(message: Contract): unknown;
    create<I extends {
        contractAddress?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        contractState?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[];
        contractCodeHistory?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[];
    } & {
        contractAddress?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K in Exclude<keyof I["contractInfo"]["created"], keyof import("./types").AbsoluteTxPosition>]: never; };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_1 in Exclude<keyof I["contractInfo"]["extension"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_2 in Exclude<keyof I["contractInfo"], keyof ContractInfo>]: never; };
        contractState?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[] & ({
            key?: Uint8Array;
            value?: Uint8Array;
        } & {
            key?: Uint8Array;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I["contractState"][number], keyof Model>]: never; })[] & { [K_4 in Exclude<keyof I["contractState"], keyof {
            key?: Uint8Array;
            value?: Uint8Array;
        }[]>]: never; };
        contractCodeHistory?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[] & ({
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        } & {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K_5 in Exclude<keyof I["contractCodeHistory"][number]["updated"], keyof import("./types").AbsoluteTxPosition>]: never; };
            msg?: Uint8Array;
        } & { [K_6 in Exclude<keyof I["contractCodeHistory"][number], keyof ContractCodeHistoryEntry>]: never; })[] & { [K_7 in Exclude<keyof I["contractCodeHistory"], keyof {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[]>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof Contract>]: never; }>(base?: I): Contract;
    fromPartial<I_1 extends {
        contractAddress?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        contractState?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[];
        contractCodeHistory?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[];
    } & {
        contractAddress?: string;
        contractInfo?: {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            codeId?: number;
            creator?: string;
            admin?: string;
            label?: string;
            created?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K_9 in Exclude<keyof I_1["contractInfo"]["created"], keyof import("./types").AbsoluteTxPosition>]: never; };
            ibcPortId?: string;
            extension?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_10 in Exclude<keyof I_1["contractInfo"]["extension"], keyof import("../../../google/protobuf/any").Any>]: never; };
        } & { [K_11 in Exclude<keyof I_1["contractInfo"], keyof ContractInfo>]: never; };
        contractState?: {
            key?: Uint8Array;
            value?: Uint8Array;
        }[] & ({
            key?: Uint8Array;
            value?: Uint8Array;
        } & {
            key?: Uint8Array;
            value?: Uint8Array;
        } & { [K_12 in Exclude<keyof I_1["contractState"][number], keyof Model>]: never; })[] & { [K_13 in Exclude<keyof I_1["contractState"], keyof {
            key?: Uint8Array;
            value?: Uint8Array;
        }[]>]: never; };
        contractCodeHistory?: {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[] & ({
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        } & {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            } & {
                blockHeight?: number;
                txIndex?: number;
            } & { [K_14 in Exclude<keyof I_1["contractCodeHistory"][number]["updated"], keyof import("./types").AbsoluteTxPosition>]: never; };
            msg?: Uint8Array;
        } & { [K_15 in Exclude<keyof I_1["contractCodeHistory"][number], keyof ContractCodeHistoryEntry>]: never; })[] & { [K_16 in Exclude<keyof I_1["contractCodeHistory"], keyof {
            operation?: import("./types").ContractCodeHistoryOperationType;
            codeId?: number;
            updated?: {
                blockHeight?: number;
                txIndex?: number;
            };
            msg?: Uint8Array;
        }[]>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof Contract>]: never; }>(object: I_1): Contract;
};
export declare const Sequence: {
    encode(message: Sequence, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Sequence;
    fromJSON(object: any): Sequence;
    toJSON(message: Sequence): unknown;
    create<I extends {
        idKey?: Uint8Array;
        value?: number;
    } & {
        idKey?: Uint8Array;
        value?: number;
    } & { [K in Exclude<keyof I, keyof Sequence>]: never; }>(base?: I): Sequence;
    fromPartial<I_1 extends {
        idKey?: Uint8Array;
        value?: number;
    } & {
        idKey?: Uint8Array;
        value?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof Sequence>]: never; }>(object: I_1): Sequence;
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
