import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { AccessConfig } from "./types";
export declare const protobufPackage = "cosmwasm.wasm.v1";
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit StoreCodeProposal. To submit WASM code to the system,
 * a simple MsgStoreCode can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface StoreCodeProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** RunAs is the address that is passed to the contract's environment as sender */
    runAs: string;
    /** WASMByteCode can be raw or gzip compressed */
    wasmByteCode: Uint8Array;
    /** InstantiatePermission to apply on contract creation, optional */
    instantiatePermission: AccessConfig | undefined;
    /** UnpinCode code on upload, optional */
    unpinCode: boolean;
    /** Source is the URL where the code is hosted */
    source: string;
    /**
     * Builder is the docker image used to build the code deterministically, used
     * for smart contract verification
     */
    builder: string;
    /**
     * CodeHash is the SHA256 sum of the code outputted by builder, used for smart
     * contract verification
     */
    codeHash: Uint8Array;
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit InstantiateContractProposal. To instantiate a contract,
 * a simple MsgInstantiateContract can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface InstantiateContractProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** RunAs is the address that is passed to the contract's environment as sender */
    runAs: string;
    /** Admin is an optional address that can execute migrations */
    admin: string;
    /** CodeID is the reference to the stored WASM code */
    codeId: number;
    /** Label is optional metadata to be stored with a constract instance. */
    label: string;
    /** Msg json encoded message to be passed to the contract on instantiation */
    msg: Uint8Array;
    /** Funds coins that are transferred to the contract on instantiation */
    funds: Coin[];
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit InstantiateContract2Proposal. To instantiate contract 2,
 * a simple MsgInstantiateContract2 can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface InstantiateContract2Proposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** RunAs is the address that is passed to the contract's enviroment as sender */
    runAs: string;
    /** Admin is an optional address that can execute migrations */
    admin: string;
    /** CodeID is the reference to the stored WASM code */
    codeId: number;
    /** Label is optional metadata to be stored with a constract instance. */
    label: string;
    /** Msg json encode message to be passed to the contract on instantiation */
    msg: Uint8Array;
    /** Funds coins that are transferred to the contract on instantiation */
    funds: Coin[];
    /** Salt is an arbitrary value provided by the sender. Size can be 1 to 64. */
    salt: Uint8Array;
    /**
     * FixMsg include the msg value into the hash for the predictable address.
     * Default is false
     */
    fixMsg: boolean;
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit MigrateContractProposal. To migrate a contract,
 * a simple MsgMigrateContract can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface MigrateContractProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** Contract is the address of the smart contract */
    contract: string;
    /** CodeID references the new WASM code */
    codeId: number;
    /** Msg json encoded message to be passed to the contract on migration */
    msg: Uint8Array;
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit SudoContractProposal. To call sudo on a contract,
 * a simple MsgSudoContract can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface SudoContractProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** Contract is the address of the smart contract */
    contract: string;
    /** Msg json encoded message to be passed to the contract as sudo */
    msg: Uint8Array;
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit ExecuteContractProposal. To call execute on a contract,
 * a simple MsgExecuteContract can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface ExecuteContractProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** RunAs is the address that is passed to the contract's environment as sender */
    runAs: string;
    /** Contract is the address of the smart contract */
    contract: string;
    /** Msg json encoded message to be passed to the contract as execute */
    msg: Uint8Array;
    /** Funds coins that are transferred to the contract on instantiation */
    funds: Coin[];
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit UpdateAdminProposal. To set an admin for a contract,
 * a simple MsgUpdateAdmin can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface UpdateAdminProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** NewAdmin address to be set */
    newAdmin: string;
    /** Contract is the address of the smart contract */
    contract: string;
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit ClearAdminProposal. To clear the admin of a contract,
 * a simple MsgClearAdmin can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface ClearAdminProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** Contract is the address of the smart contract */
    contract: string;
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit PinCodesProposal. To pin a set of code ids in the wasmvm
 * cache, a simple MsgPinCodes can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface PinCodesProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** CodeIDs references the new WASM codes */
    codeIds: number[];
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit UnpinCodesProposal. To unpin a set of code ids in the wasmvm
 * cache, a simple MsgUnpinCodes can be invoked from the x/gov module via
 * a v1 governance proposal.
 *
 * @deprecated
 */
export interface UnpinCodesProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** CodeIDs references the WASM codes */
    codeIds: number[];
}
/**
 * AccessConfigUpdate contains the code id and the access config to be
 * applied.
 */
export interface AccessConfigUpdate {
    /** CodeID is the reference to the stored WASM code to be updated */
    codeId: number;
    /** InstantiatePermission to apply to the set of code ids */
    instantiatePermission: AccessConfig | undefined;
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit UpdateInstantiateConfigProposal. To update instantiate config
 * to a set of code ids, a simple MsgUpdateInstantiateConfig can be invoked from
 * the x/gov module via a v1 governance proposal.
 *
 * @deprecated
 */
export interface UpdateInstantiateConfigProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /**
     * AccessConfigUpdate contains the list of code ids and the access config
     * to be applied.
     */
    accessConfigUpdates: AccessConfigUpdate[];
}
/**
 * Deprecated: Do not use. Since wasmd v0.40, there is no longer a need for
 * an explicit StoreAndInstantiateContractProposal. To store and instantiate
 * the contract, a simple MsgStoreAndInstantiateContract can be invoked from
 * the x/gov module via a v1 governance proposal.
 *
 * @deprecated
 */
export interface StoreAndInstantiateContractProposal {
    /** Title is a short summary */
    title: string;
    /** Description is a human readable text */
    description: string;
    /** RunAs is the address that is passed to the contract's environment as sender */
    runAs: string;
    /** WASMByteCode can be raw or gzip compressed */
    wasmByteCode: Uint8Array;
    /** InstantiatePermission to apply on contract creation, optional */
    instantiatePermission: AccessConfig | undefined;
    /** UnpinCode code on upload, optional */
    unpinCode: boolean;
    /** Admin is an optional address that can execute migrations */
    admin: string;
    /** Label is optional metadata to be stored with a constract instance. */
    label: string;
    /** Msg json encoded message to be passed to the contract on instantiation */
    msg: Uint8Array;
    /** Funds coins that are transferred to the contract on instantiation */
    funds: Coin[];
    /** Source is the URL where the code is hosted */
    source: string;
    /**
     * Builder is the docker image used to build the code deterministically, used
     * for smart contract verification
     */
    builder: string;
    /**
     * CodeHash is the SHA256 sum of the code outputted by builder, used for smart
     * contract verification
     */
    codeHash: Uint8Array;
}
export declare const StoreCodeProposal: {
    encode(message: StoreCodeProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StoreCodeProposal;
    fromJSON(object: any): StoreCodeProposal;
    toJSON(message: StoreCodeProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
        unpinCode?: boolean;
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiatePermission"], keyof AccessConfig>]: never; };
        unpinCode?: boolean;
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & { [K_2 in Exclude<keyof I, keyof StoreCodeProposal>]: never; }>(base?: I): StoreCodeProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
        unpinCode?: boolean;
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["instantiatePermission"], keyof AccessConfig>]: never; };
        unpinCode?: boolean;
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & { [K_5 in Exclude<keyof I_1, keyof StoreCodeProposal>]: never; }>(object: I_1): StoreCodeProposal;
};
export declare const InstantiateContractProposal: {
    encode(message: InstantiateContractProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstantiateContractProposal;
    fromJSON(object: any): InstantiateContractProposal;
    toJSON(message: InstantiateContractProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["funds"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof InstantiateContractProposal>]: never; }>(base?: I): InstantiateContractProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["funds"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof InstantiateContractProposal>]: never; }>(object: I_1): InstantiateContractProposal;
};
export declare const InstantiateContract2Proposal: {
    encode(message: InstantiateContract2Proposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): InstantiateContract2Proposal;
    fromJSON(object: any): InstantiateContract2Proposal;
    toJSON(message: InstantiateContract2Proposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
        salt?: Uint8Array;
        fixMsg?: boolean;
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["funds"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        salt?: Uint8Array;
        fixMsg?: boolean;
    } & { [K_2 in Exclude<keyof I, keyof InstantiateContract2Proposal>]: never; }>(base?: I): InstantiateContract2Proposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
        salt?: Uint8Array;
        fixMsg?: boolean;
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["funds"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        salt?: Uint8Array;
        fixMsg?: boolean;
    } & { [K_5 in Exclude<keyof I_1, keyof InstantiateContract2Proposal>]: never; }>(object: I_1): InstantiateContract2Proposal;
};
export declare const MigrateContractProposal: {
    encode(message: MigrateContractProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MigrateContractProposal;
    fromJSON(object: any): MigrateContractProposal;
    toJSON(message: MigrateContractProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MigrateContractProposal>]: never; }>(base?: I): MigrateContractProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MigrateContractProposal>]: never; }>(object: I_1): MigrateContractProposal;
};
export declare const SudoContractProposal: {
    encode(message: SudoContractProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SudoContractProposal;
    fromJSON(object: any): SudoContractProposal;
    toJSON(message: SudoContractProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        contract?: string;
        msg?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        contract?: string;
        msg?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof SudoContractProposal>]: never; }>(base?: I): SudoContractProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        contract?: string;
        msg?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        contract?: string;
        msg?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof SudoContractProposal>]: never; }>(object: I_1): SudoContractProposal;
};
export declare const ExecuteContractProposal: {
    encode(message: ExecuteContractProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteContractProposal;
    fromJSON(object: any): ExecuteContractProposal;
    toJSON(message: ExecuteContractProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        runAs?: string;
        contract?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        contract?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["funds"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ExecuteContractProposal>]: never; }>(base?: I): ExecuteContractProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        runAs?: string;
        contract?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        contract?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["funds"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ExecuteContractProposal>]: never; }>(object: I_1): ExecuteContractProposal;
};
export declare const UpdateAdminProposal: {
    encode(message: UpdateAdminProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateAdminProposal;
    fromJSON(object: any): UpdateAdminProposal;
    toJSON(message: UpdateAdminProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        newAdmin?: string;
        contract?: string;
    } & {
        title?: string;
        description?: string;
        newAdmin?: string;
        contract?: string;
    } & { [K in Exclude<keyof I, keyof UpdateAdminProposal>]: never; }>(base?: I): UpdateAdminProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        newAdmin?: string;
        contract?: string;
    } & {
        title?: string;
        description?: string;
        newAdmin?: string;
        contract?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof UpdateAdminProposal>]: never; }>(object: I_1): UpdateAdminProposal;
};
export declare const ClearAdminProposal: {
    encode(message: ClearAdminProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClearAdminProposal;
    fromJSON(object: any): ClearAdminProposal;
    toJSON(message: ClearAdminProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        contract?: string;
    } & {
        title?: string;
        description?: string;
        contract?: string;
    } & { [K in Exclude<keyof I, keyof ClearAdminProposal>]: never; }>(base?: I): ClearAdminProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        contract?: string;
    } & {
        title?: string;
        description?: string;
        contract?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof ClearAdminProposal>]: never; }>(object: I_1): ClearAdminProposal;
};
export declare const PinCodesProposal: {
    encode(message: PinCodesProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): PinCodesProposal;
    fromJSON(object: any): PinCodesProposal;
    toJSON(message: PinCodesProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        codeIds?: number[];
    } & {
        title?: string;
        description?: string;
        codeIds?: number[] & number[] & { [K in Exclude<keyof I["codeIds"], keyof number[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof PinCodesProposal>]: never; }>(base?: I): PinCodesProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        codeIds?: number[];
    } & {
        title?: string;
        description?: string;
        codeIds?: number[] & number[] & { [K_2 in Exclude<keyof I_1["codeIds"], keyof number[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof PinCodesProposal>]: never; }>(object: I_1): PinCodesProposal;
};
export declare const UnpinCodesProposal: {
    encode(message: UnpinCodesProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UnpinCodesProposal;
    fromJSON(object: any): UnpinCodesProposal;
    toJSON(message: UnpinCodesProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        codeIds?: number[];
    } & {
        title?: string;
        description?: string;
        codeIds?: number[] & number[] & { [K in Exclude<keyof I["codeIds"], keyof number[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof UnpinCodesProposal>]: never; }>(base?: I): UnpinCodesProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        codeIds?: number[];
    } & {
        title?: string;
        description?: string;
        codeIds?: number[] & number[] & { [K_2 in Exclude<keyof I_1["codeIds"], keyof number[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof UnpinCodesProposal>]: never; }>(object: I_1): UnpinCodesProposal;
};
export declare const AccessConfigUpdate: {
    encode(message: AccessConfigUpdate, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccessConfigUpdate;
    fromJSON(object: any): AccessConfigUpdate;
    toJSON(message: AccessConfigUpdate): unknown;
    create<I extends {
        codeId?: number;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        codeId?: number;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof AccessConfigUpdate>]: never; }>(base?: I): AccessConfigUpdate;
    fromPartial<I_1 extends {
        codeId?: number;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        codeId?: number;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof AccessConfigUpdate>]: never; }>(object: I_1): AccessConfigUpdate;
};
export declare const UpdateInstantiateConfigProposal: {
    encode(message: UpdateInstantiateConfigProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpdateInstantiateConfigProposal;
    fromJSON(object: any): UpdateInstantiateConfigProposal;
    toJSON(message: UpdateInstantiateConfigProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        accessConfigUpdates?: {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[];
    } & {
        title?: string;
        description?: string;
        accessConfigUpdates?: {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[] & ({
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K in Exclude<keyof I["accessConfigUpdates"][number]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_1 in Exclude<keyof I["accessConfigUpdates"][number]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_2 in Exclude<keyof I["accessConfigUpdates"][number], keyof AccessConfigUpdate>]: never; })[] & { [K_3 in Exclude<keyof I["accessConfigUpdates"], keyof {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof UpdateInstantiateConfigProposal>]: never; }>(base?: I): UpdateInstantiateConfigProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        accessConfigUpdates?: {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[];
    } & {
        title?: string;
        description?: string;
        accessConfigUpdates?: {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[] & ({
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        } & {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            } & {
                permission?: import("./types").AccessType;
                addresses?: string[] & string[] & { [K_5 in Exclude<keyof I_1["accessConfigUpdates"][number]["instantiatePermission"]["addresses"], keyof string[]>]: never; };
            } & { [K_6 in Exclude<keyof I_1["accessConfigUpdates"][number]["instantiatePermission"], keyof AccessConfig>]: never; };
        } & { [K_7 in Exclude<keyof I_1["accessConfigUpdates"][number], keyof AccessConfigUpdate>]: never; })[] & { [K_8 in Exclude<keyof I_1["accessConfigUpdates"], keyof {
            codeId?: number;
            instantiatePermission?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof UpdateInstantiateConfigProposal>]: never; }>(object: I_1): UpdateInstantiateConfigProposal;
};
export declare const StoreAndInstantiateContractProposal: {
    encode(message: StoreAndInstantiateContractProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StoreAndInstantiateContractProposal;
    fromJSON(object: any): StoreAndInstantiateContractProposal;
    toJSON(message: StoreAndInstantiateContractProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
        unpinCode?: boolean;
        admin?: string;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiatePermission"], keyof AccessConfig>]: never; };
        unpinCode?: boolean;
        admin?: string;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_2 in Exclude<keyof I["funds"][number], keyof Coin>]: never; })[] & { [K_3 in Exclude<keyof I["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & { [K_4 in Exclude<keyof I, keyof StoreAndInstantiateContractProposal>]: never; }>(base?: I): StoreAndInstantiateContractProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
        unpinCode?: boolean;
        admin?: string;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & {
        title?: string;
        description?: string;
        runAs?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_5 in Exclude<keyof I_1["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_6 in Exclude<keyof I_1["instantiatePermission"], keyof AccessConfig>]: never; };
        unpinCode?: boolean;
        admin?: string;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_7 in Exclude<keyof I_1["funds"][number], keyof Coin>]: never; })[] & { [K_8 in Exclude<keyof I_1["funds"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
        source?: string;
        builder?: string;
        codeHash?: Uint8Array;
    } & { [K_9 in Exclude<keyof I_1, keyof StoreAndInstantiateContractProposal>]: never; }>(object: I_1): StoreAndInstantiateContractProposal;
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
