import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { AccessConfig, Params } from "./types";
export declare const protobufPackage = "cosmwasm.wasm.v1";
/** MsgStoreCode submit Wasm code to the system */
export interface MsgStoreCode {
    /** Sender is the actor that signed the messages */
    sender: string;
    /** WASMByteCode can be raw or gzip compressed */
    wasmByteCode: Uint8Array;
    /**
     * InstantiatePermission access control to apply on contract creation,
     * optional
     */
    instantiatePermission: AccessConfig | undefined;
}
/** MsgStoreCodeResponse returns store result data. */
export interface MsgStoreCodeResponse {
    /** CodeID is the reference to the stored WASM code */
    codeId: number;
    /** Checksum is the sha256 hash of the stored code */
    checksum: Uint8Array;
}
/**
 * MsgInstantiateContract create a new smart contract instance for the given
 * code id.
 */
export interface MsgInstantiateContract {
    /** Sender is the that actor that signed the messages */
    sender: string;
    /** Admin is an optional address that can execute migrations */
    admin: string;
    /** CodeID is the reference to the stored WASM code */
    codeId: number;
    /** Label is optional metadata to be stored with a contract instance. */
    label: string;
    /** Msg json encoded message to be passed to the contract on instantiation */
    msg: Uint8Array;
    /** Funds coins that are transferred to the contract on instantiation */
    funds: Coin[];
}
/** MsgInstantiateContractResponse return instantiation result data */
export interface MsgInstantiateContractResponse {
    /** Address is the bech32 address of the new contract instance. */
    address: string;
    /** Data contains bytes to returned from the contract */
    data: Uint8Array;
}
/**
 * MsgInstantiateContract2 create a new smart contract instance for the given
 * code id with a predicable address.
 */
export interface MsgInstantiateContract2 {
    /** Sender is the that actor that signed the messages */
    sender: string;
    /** Admin is an optional address that can execute migrations */
    admin: string;
    /** CodeID is the reference to the stored WASM code */
    codeId: number;
    /** Label is optional metadata to be stored with a contract instance. */
    label: string;
    /** Msg json encoded message to be passed to the contract on instantiation */
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
/** MsgInstantiateContract2Response return instantiation result data */
export interface MsgInstantiateContract2Response {
    /** Address is the bech32 address of the new contract instance. */
    address: string;
    /** Data contains bytes to returned from the contract */
    data: Uint8Array;
}
/** MsgExecuteContract submits the given message data to a smart contract */
export interface MsgExecuteContract {
    /** Sender is the that actor that signed the messages */
    sender: string;
    /** Contract is the address of the smart contract */
    contract: string;
    /** Msg json encoded message to be passed to the contract */
    msg: Uint8Array;
    /** Funds coins that are transferred to the contract on execution */
    funds: Coin[];
}
/** MsgExecuteContractResponse returns execution result data. */
export interface MsgExecuteContractResponse {
    /** Data contains bytes to returned from the contract */
    data: Uint8Array;
}
/** MsgMigrateContract runs a code upgrade/ downgrade for a smart contract */
export interface MsgMigrateContract {
    /** Sender is the that actor that signed the messages */
    sender: string;
    /** Contract is the address of the smart contract */
    contract: string;
    /** CodeID references the new WASM code */
    codeId: number;
    /** Msg json encoded message to be passed to the contract on migration */
    msg: Uint8Array;
}
/** MsgMigrateContractResponse returns contract migration result data. */
export interface MsgMigrateContractResponse {
    /**
     * Data contains same raw bytes returned as data from the wasm contract.
     * (May be empty)
     */
    data: Uint8Array;
}
/** MsgUpdateAdmin sets a new admin for a smart contract */
export interface MsgUpdateAdmin {
    /** Sender is the that actor that signed the messages */
    sender: string;
    /** NewAdmin address to be set */
    newAdmin: string;
    /** Contract is the address of the smart contract */
    contract: string;
}
/** MsgUpdateAdminResponse returns empty data */
export interface MsgUpdateAdminResponse {
}
/** MsgClearAdmin removes any admin stored for a smart contract */
export interface MsgClearAdmin {
    /** Sender is the actor that signed the messages */
    sender: string;
    /** Contract is the address of the smart contract */
    contract: string;
}
/** MsgClearAdminResponse returns empty data */
export interface MsgClearAdminResponse {
}
/** MsgUpdateInstantiateConfig updates instantiate config for a smart contract */
export interface MsgUpdateInstantiateConfig {
    /** Sender is the that actor that signed the messages */
    sender: string;
    /** CodeID references the stored WASM code */
    codeId: number;
    /** NewInstantiatePermission is the new access control */
    newInstantiatePermission: AccessConfig | undefined;
}
/** MsgUpdateInstantiateConfigResponse returns empty data */
export interface MsgUpdateInstantiateConfigResponse {
}
/**
 * MsgUpdateParams is the MsgUpdateParams request type.
 *
 * Since: 0.40
 */
export interface MsgUpdateParams {
    /** Authority is the address of the governance account. */
    authority: string;
    /**
     * params defines the x/wasm parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: 0.40
 */
export interface MsgUpdateParamsResponse {
}
/**
 * MsgSudoContract is the MsgSudoContract request type.
 *
 * Since: 0.40
 */
export interface MsgSudoContract {
    /** Authority is the address of the governance account. */
    authority: string;
    /** Contract is the address of the smart contract */
    contract: string;
    /** Msg json encoded message to be passed to the contract as sudo */
    msg: Uint8Array;
}
/**
 * MsgSudoContractResponse defines the response structure for executing a
 * MsgSudoContract message.
 *
 * Since: 0.40
 */
export interface MsgSudoContractResponse {
    /** Data contains bytes to returned from the contract */
    data: Uint8Array;
}
/**
 * MsgPinCodes is the MsgPinCodes request type.
 *
 * Since: 0.40
 */
export interface MsgPinCodes {
    /** Authority is the address of the governance account. */
    authority: string;
    /** CodeIDs references the new WASM codes */
    codeIds: number[];
}
/**
 * MsgPinCodesResponse defines the response structure for executing a
 * MsgPinCodes message.
 *
 * Since: 0.40
 */
export interface MsgPinCodesResponse {
}
/**
 * MsgUnpinCodes is the MsgUnpinCodes request type.
 *
 * Since: 0.40
 */
export interface MsgUnpinCodes {
    /** Authority is the address of the governance account. */
    authority: string;
    /** CodeIDs references the WASM codes */
    codeIds: number[];
}
/**
 * MsgUnpinCodesResponse defines the response structure for executing a
 * MsgUnpinCodes message.
 *
 * Since: 0.40
 */
export interface MsgUnpinCodesResponse {
}
/**
 * MsgStoreAndInstantiateContract is the MsgStoreAndInstantiateContract
 * request type.
 *
 * Since: 0.40
 */
export interface MsgStoreAndInstantiateContract {
    /** Authority is the address of the governance account. */
    authority: string;
    /** WASMByteCode can be raw or gzip compressed */
    wasmByteCode: Uint8Array;
    /** InstantiatePermission to apply on contract creation, optional */
    instantiatePermission: AccessConfig | undefined;
    /**
     * UnpinCode code on upload, optional. As default the uploaded contract is
     * pinned to cache.
     */
    unpinCode: boolean;
    /** Admin is an optional address that can execute migrations */
    admin: string;
    /** Label is optional metadata to be stored with a constract instance. */
    label: string;
    /** Msg json encoded message to be passed to the contract on instantiation */
    msg: Uint8Array;
    /**
     * Funds coins that are transferred from the authority account to the contract
     * on instantiation
     */
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
/**
 * MsgStoreAndInstantiateContractResponse defines the response structure
 * for executing a MsgStoreAndInstantiateContract message.
 *
 * Since: 0.40
 */
export interface MsgStoreAndInstantiateContractResponse {
    /** Address is the bech32 address of the new contract instance. */
    address: string;
    /** Data contains bytes to returned from the contract */
    data: Uint8Array;
}
/**
 * MsgAddCodeUploadParamsAddresses is the
 * MsgAddCodeUploadParamsAddresses request type.
 */
export interface MsgAddCodeUploadParamsAddresses {
    /** Authority is the address of the governance account. */
    authority: string;
    addresses: string[];
}
/**
 * MsgAddCodeUploadParamsAddressesResponse defines the response
 * structure for executing a MsgAddCodeUploadParamsAddresses message.
 */
export interface MsgAddCodeUploadParamsAddressesResponse {
}
/**
 * MsgRemoveCodeUploadParamsAddresses is the
 * MsgRemoveCodeUploadParamsAddresses request type.
 */
export interface MsgRemoveCodeUploadParamsAddresses {
    /** Authority is the address of the governance account. */
    authority: string;
    addresses: string[];
}
/**
 * MsgRemoveCodeUploadParamsAddressesResponse defines the response
 * structure for executing a MsgRemoveCodeUploadParamsAddresses message.
 */
export interface MsgRemoveCodeUploadParamsAddressesResponse {
}
/**
 * MsgStoreAndMigrateContract is the MsgStoreAndMigrateContract
 * request type.
 *
 * Since: 0.42
 */
export interface MsgStoreAndMigrateContract {
    /** Authority is the address of the governance account. */
    authority: string;
    /** WASMByteCode can be raw or gzip compressed */
    wasmByteCode: Uint8Array;
    /** InstantiatePermission to apply on contract creation, optional */
    instantiatePermission: AccessConfig | undefined;
    /** Contract is the address of the smart contract */
    contract: string;
    /** Msg json encoded message to be passed to the contract on migration */
    msg: Uint8Array;
}
/**
 * MsgStoreAndMigrateContractResponse defines the response structure
 * for executing a MsgStoreAndMigrateContract message.
 *
 * Since: 0.42
 */
export interface MsgStoreAndMigrateContractResponse {
    /** CodeID is the reference to the stored WASM code */
    codeId: number;
    /** Checksum is the sha256 hash of the stored code */
    checksum: Uint8Array;
    /** Data contains bytes to returned from the contract */
    data: Uint8Array;
}
/** MsgUpdateContractLabel sets a new label for a smart contract */
export interface MsgUpdateContractLabel {
    /** Sender is the that actor that signed the messages */
    sender: string;
    /** NewLabel string to be set */
    newLabel: string;
    /** Contract is the address of the smart contract */
    contract: string;
}
/** MsgUpdateContractLabelResponse returns empty data */
export interface MsgUpdateContractLabelResponse {
}
export declare const MsgStoreCode: {
    encode(message: MsgStoreCode, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreCode;
    fromJSON(object: any): MsgStoreCode;
    toJSON(message: MsgStoreCode): unknown;
    create<I extends {
        sender?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        sender?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgStoreCode>]: never; }>(base?: I): MsgStoreCode;
    fromPartial<I_1 extends {
        sender?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        sender?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["instantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgStoreCode>]: never; }>(object: I_1): MsgStoreCode;
};
export declare const MsgStoreCodeResponse: {
    encode(message: MsgStoreCodeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreCodeResponse;
    fromJSON(object: any): MsgStoreCodeResponse;
    toJSON(message: MsgStoreCodeResponse): unknown;
    create<I extends {
        codeId?: number;
        checksum?: Uint8Array;
    } & {
        codeId?: number;
        checksum?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgStoreCodeResponse>]: never; }>(base?: I): MsgStoreCodeResponse;
    fromPartial<I_1 extends {
        codeId?: number;
        checksum?: Uint8Array;
    } & {
        codeId?: number;
        checksum?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgStoreCodeResponse>]: never; }>(object: I_1): MsgStoreCodeResponse;
};
export declare const MsgInstantiateContract: {
    encode(message: MsgInstantiateContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContract;
    fromJSON(object: any): MsgInstantiateContract;
    toJSON(message: MsgInstantiateContract): unknown;
    create<I extends {
        sender?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        sender?: string;
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
    } & { [K_2 in Exclude<keyof I, keyof MsgInstantiateContract>]: never; }>(base?: I): MsgInstantiateContract;
    fromPartial<I_1 extends {
        sender?: string;
        admin?: string;
        codeId?: number;
        label?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        sender?: string;
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
    } & { [K_5 in Exclude<keyof I_1, keyof MsgInstantiateContract>]: never; }>(object: I_1): MsgInstantiateContract;
};
export declare const MsgInstantiateContractResponse: {
    encode(message: MsgInstantiateContractResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContractResponse;
    fromJSON(object: any): MsgInstantiateContractResponse;
    toJSON(message: MsgInstantiateContractResponse): unknown;
    create<I extends {
        address?: string;
        data?: Uint8Array;
    } & {
        address?: string;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgInstantiateContractResponse>]: never; }>(base?: I): MsgInstantiateContractResponse;
    fromPartial<I_1 extends {
        address?: string;
        data?: Uint8Array;
    } & {
        address?: string;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgInstantiateContractResponse>]: never; }>(object: I_1): MsgInstantiateContractResponse;
};
export declare const MsgInstantiateContract2: {
    encode(message: MsgInstantiateContract2, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContract2;
    fromJSON(object: any): MsgInstantiateContract2;
    toJSON(message: MsgInstantiateContract2): unknown;
    create<I extends {
        sender?: string;
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
        sender?: string;
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
    } & { [K_2 in Exclude<keyof I, keyof MsgInstantiateContract2>]: never; }>(base?: I): MsgInstantiateContract2;
    fromPartial<I_1 extends {
        sender?: string;
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
        sender?: string;
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
    } & { [K_5 in Exclude<keyof I_1, keyof MsgInstantiateContract2>]: never; }>(object: I_1): MsgInstantiateContract2;
};
export declare const MsgInstantiateContract2Response: {
    encode(message: MsgInstantiateContract2Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgInstantiateContract2Response;
    fromJSON(object: any): MsgInstantiateContract2Response;
    toJSON(message: MsgInstantiateContract2Response): unknown;
    create<I extends {
        address?: string;
        data?: Uint8Array;
    } & {
        address?: string;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgInstantiateContract2Response>]: never; }>(base?: I): MsgInstantiateContract2Response;
    fromPartial<I_1 extends {
        address?: string;
        data?: Uint8Array;
    } & {
        address?: string;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgInstantiateContract2Response>]: never; }>(object: I_1): MsgInstantiateContract2Response;
};
export declare const MsgExecuteContract: {
    encode(message: MsgExecuteContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteContract;
    fromJSON(object: any): MsgExecuteContract;
    toJSON(message: MsgExecuteContract): unknown;
    create<I extends {
        sender?: string;
        contract?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        sender?: string;
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
    } & { [K_2 in Exclude<keyof I, keyof MsgExecuteContract>]: never; }>(base?: I): MsgExecuteContract;
    fromPartial<I_1 extends {
        sender?: string;
        contract?: string;
        msg?: Uint8Array;
        funds?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        sender?: string;
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
    } & { [K_5 in Exclude<keyof I_1, keyof MsgExecuteContract>]: never; }>(object: I_1): MsgExecuteContract;
};
export declare const MsgExecuteContractResponse: {
    encode(message: MsgExecuteContractResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgExecuteContractResponse;
    fromJSON(object: any): MsgExecuteContractResponse;
    toJSON(message: MsgExecuteContractResponse): unknown;
    create<I extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, "data">]: never; }>(base?: I): MsgExecuteContractResponse;
    fromPartial<I_1 extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "data">]: never; }>(object: I_1): MsgExecuteContractResponse;
};
export declare const MsgMigrateContract: {
    encode(message: MsgMigrateContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateContract;
    fromJSON(object: any): MsgMigrateContract;
    toJSON(message: MsgMigrateContract): unknown;
    create<I extends {
        sender?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & {
        sender?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgMigrateContract>]: never; }>(base?: I): MsgMigrateContract;
    fromPartial<I_1 extends {
        sender?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & {
        sender?: string;
        contract?: string;
        codeId?: number;
        msg?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgMigrateContract>]: never; }>(object: I_1): MsgMigrateContract;
};
export declare const MsgMigrateContractResponse: {
    encode(message: MsgMigrateContractResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgMigrateContractResponse;
    fromJSON(object: any): MsgMigrateContractResponse;
    toJSON(message: MsgMigrateContractResponse): unknown;
    create<I extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, "data">]: never; }>(base?: I): MsgMigrateContractResponse;
    fromPartial<I_1 extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "data">]: never; }>(object: I_1): MsgMigrateContractResponse;
};
export declare const MsgUpdateAdmin: {
    encode(message: MsgUpdateAdmin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAdmin;
    fromJSON(object: any): MsgUpdateAdmin;
    toJSON(message: MsgUpdateAdmin): unknown;
    create<I extends {
        sender?: string;
        newAdmin?: string;
        contract?: string;
    } & {
        sender?: string;
        newAdmin?: string;
        contract?: string;
    } & { [K in Exclude<keyof I, keyof MsgUpdateAdmin>]: never; }>(base?: I): MsgUpdateAdmin;
    fromPartial<I_1 extends {
        sender?: string;
        newAdmin?: string;
        contract?: string;
    } & {
        sender?: string;
        newAdmin?: string;
        contract?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateAdmin>]: never; }>(object: I_1): MsgUpdateAdmin;
};
export declare const MsgUpdateAdminResponse: {
    encode(_: MsgUpdateAdminResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateAdminResponse;
    fromJSON(_: any): MsgUpdateAdminResponse;
    toJSON(_: MsgUpdateAdminResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateAdminResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateAdminResponse;
};
export declare const MsgClearAdmin: {
    encode(message: MsgClearAdmin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgClearAdmin;
    fromJSON(object: any): MsgClearAdmin;
    toJSON(message: MsgClearAdmin): unknown;
    create<I extends {
        sender?: string;
        contract?: string;
    } & {
        sender?: string;
        contract?: string;
    } & { [K in Exclude<keyof I, keyof MsgClearAdmin>]: never; }>(base?: I): MsgClearAdmin;
    fromPartial<I_1 extends {
        sender?: string;
        contract?: string;
    } & {
        sender?: string;
        contract?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgClearAdmin>]: never; }>(object: I_1): MsgClearAdmin;
};
export declare const MsgClearAdminResponse: {
    encode(_: MsgClearAdminResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgClearAdminResponse;
    fromJSON(_: any): MsgClearAdminResponse;
    toJSON(_: MsgClearAdminResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgClearAdminResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgClearAdminResponse;
};
export declare const MsgUpdateInstantiateConfig: {
    encode(message: MsgUpdateInstantiateConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateInstantiateConfig;
    fromJSON(object: any): MsgUpdateInstantiateConfig;
    toJSON(message: MsgUpdateInstantiateConfig): unknown;
    create<I extends {
        sender?: string;
        codeId?: number;
        newInstantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        sender?: string;
        codeId?: number;
        newInstantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["newInstantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["newInstantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgUpdateInstantiateConfig>]: never; }>(base?: I): MsgUpdateInstantiateConfig;
    fromPartial<I_1 extends {
        sender?: string;
        codeId?: number;
        newInstantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
    } & {
        sender?: string;
        codeId?: number;
        newInstantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["newInstantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["newInstantiatePermission"], keyof AccessConfig>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgUpdateInstantiateConfig>]: never; }>(object: I_1): MsgUpdateInstantiateConfig;
};
export declare const MsgUpdateInstantiateConfigResponse: {
    encode(_: MsgUpdateInstantiateConfigResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateInstantiateConfigResponse;
    fromJSON(_: any): MsgUpdateInstantiateConfigResponse;
    toJSON(_: MsgUpdateInstantiateConfigResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateInstantiateConfigResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateInstantiateConfigResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        authority?: string;
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        };
    } & {
        authority?: string;
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
            } & { [K_1 in Exclude<keyof I["params"]["codeUploadAccess"], keyof AccessConfig>]: never; };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        authority?: string;
        params?: {
            codeUploadAccess?: {
                permission?: import("./types").AccessType;
                addresses?: string[];
            };
            instantiateDefaultPermission?: import("./types").AccessType;
        };
    } & {
        authority?: string;
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
                addresses?: string[] & string[] & { [K_4 in Exclude<keyof I_1["params"]["codeUploadAccess"]["addresses"], keyof string[]>]: never; };
            } & { [K_5 in Exclude<keyof I_1["params"]["codeUploadAccess"], keyof AccessConfig>]: never; };
            instantiateDefaultPermission?: import("./types").AccessType;
        } & { [K_6 in Exclude<keyof I_1["params"], keyof Params>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof MsgUpdateParams>]: never; }>(object: I_1): MsgUpdateParams;
};
export declare const MsgUpdateParamsResponse: {
    encode(_: MsgUpdateParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParamsResponse;
    fromJSON(_: any): MsgUpdateParamsResponse;
    toJSON(_: MsgUpdateParamsResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateParamsResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateParamsResponse;
};
export declare const MsgSudoContract: {
    encode(message: MsgSudoContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSudoContract;
    fromJSON(object: any): MsgSudoContract;
    toJSON(message: MsgSudoContract): unknown;
    create<I extends {
        authority?: string;
        contract?: string;
        msg?: Uint8Array;
    } & {
        authority?: string;
        contract?: string;
        msg?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgSudoContract>]: never; }>(base?: I): MsgSudoContract;
    fromPartial<I_1 extends {
        authority?: string;
        contract?: string;
        msg?: Uint8Array;
    } & {
        authority?: string;
        contract?: string;
        msg?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgSudoContract>]: never; }>(object: I_1): MsgSudoContract;
};
export declare const MsgSudoContractResponse: {
    encode(message: MsgSudoContractResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSudoContractResponse;
    fromJSON(object: any): MsgSudoContractResponse;
    toJSON(message: MsgSudoContractResponse): unknown;
    create<I extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, "data">]: never; }>(base?: I): MsgSudoContractResponse;
    fromPartial<I_1 extends {
        data?: Uint8Array;
    } & {
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "data">]: never; }>(object: I_1): MsgSudoContractResponse;
};
export declare const MsgPinCodes: {
    encode(message: MsgPinCodes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPinCodes;
    fromJSON(object: any): MsgPinCodes;
    toJSON(message: MsgPinCodes): unknown;
    create<I extends {
        authority?: string;
        codeIds?: number[];
    } & {
        authority?: string;
        codeIds?: number[] & number[] & { [K in Exclude<keyof I["codeIds"], keyof number[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgPinCodes>]: never; }>(base?: I): MsgPinCodes;
    fromPartial<I_1 extends {
        authority?: string;
        codeIds?: number[];
    } & {
        authority?: string;
        codeIds?: number[] & number[] & { [K_2 in Exclude<keyof I_1["codeIds"], keyof number[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgPinCodes>]: never; }>(object: I_1): MsgPinCodes;
};
export declare const MsgPinCodesResponse: {
    encode(_: MsgPinCodesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPinCodesResponse;
    fromJSON(_: any): MsgPinCodesResponse;
    toJSON(_: MsgPinCodesResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgPinCodesResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgPinCodesResponse;
};
export declare const MsgUnpinCodes: {
    encode(message: MsgUnpinCodes, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnpinCodes;
    fromJSON(object: any): MsgUnpinCodes;
    toJSON(message: MsgUnpinCodes): unknown;
    create<I extends {
        authority?: string;
        codeIds?: number[];
    } & {
        authority?: string;
        codeIds?: number[] & number[] & { [K in Exclude<keyof I["codeIds"], keyof number[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgUnpinCodes>]: never; }>(base?: I): MsgUnpinCodes;
    fromPartial<I_1 extends {
        authority?: string;
        codeIds?: number[];
    } & {
        authority?: string;
        codeIds?: number[] & number[] & { [K_2 in Exclude<keyof I_1["codeIds"], keyof number[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgUnpinCodes>]: never; }>(object: I_1): MsgUnpinCodes;
};
export declare const MsgUnpinCodesResponse: {
    encode(_: MsgUnpinCodesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUnpinCodesResponse;
    fromJSON(_: any): MsgUnpinCodesResponse;
    toJSON(_: MsgUnpinCodesResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUnpinCodesResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUnpinCodesResponse;
};
export declare const MsgStoreAndInstantiateContract: {
    encode(message: MsgStoreAndInstantiateContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndInstantiateContract;
    fromJSON(object: any): MsgStoreAndInstantiateContract;
    toJSON(message: MsgStoreAndInstantiateContract): unknown;
    create<I extends {
        authority?: string;
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
        authority?: string;
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
    } & { [K_4 in Exclude<keyof I, keyof MsgStoreAndInstantiateContract>]: never; }>(base?: I): MsgStoreAndInstantiateContract;
    fromPartial<I_1 extends {
        authority?: string;
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
        authority?: string;
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
    } & { [K_9 in Exclude<keyof I_1, keyof MsgStoreAndInstantiateContract>]: never; }>(object: I_1): MsgStoreAndInstantiateContract;
};
export declare const MsgStoreAndInstantiateContractResponse: {
    encode(message: MsgStoreAndInstantiateContractResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndInstantiateContractResponse;
    fromJSON(object: any): MsgStoreAndInstantiateContractResponse;
    toJSON(message: MsgStoreAndInstantiateContractResponse): unknown;
    create<I extends {
        address?: string;
        data?: Uint8Array;
    } & {
        address?: string;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgStoreAndInstantiateContractResponse>]: never; }>(base?: I): MsgStoreAndInstantiateContractResponse;
    fromPartial<I_1 extends {
        address?: string;
        data?: Uint8Array;
    } & {
        address?: string;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgStoreAndInstantiateContractResponse>]: never; }>(object: I_1): MsgStoreAndInstantiateContractResponse;
};
export declare const MsgAddCodeUploadParamsAddresses: {
    encode(message: MsgAddCodeUploadParamsAddresses, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddCodeUploadParamsAddresses;
    fromJSON(object: any): MsgAddCodeUploadParamsAddresses;
    toJSON(message: MsgAddCodeUploadParamsAddresses): unknown;
    create<I extends {
        authority?: string;
        addresses?: string[];
    } & {
        authority?: string;
        addresses?: string[] & string[] & { [K in Exclude<keyof I["addresses"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgAddCodeUploadParamsAddresses>]: never; }>(base?: I): MsgAddCodeUploadParamsAddresses;
    fromPartial<I_1 extends {
        authority?: string;
        addresses?: string[];
    } & {
        authority?: string;
        addresses?: string[] & string[] & { [K_2 in Exclude<keyof I_1["addresses"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgAddCodeUploadParamsAddresses>]: never; }>(object: I_1): MsgAddCodeUploadParamsAddresses;
};
export declare const MsgAddCodeUploadParamsAddressesResponse: {
    encode(_: MsgAddCodeUploadParamsAddressesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddCodeUploadParamsAddressesResponse;
    fromJSON(_: any): MsgAddCodeUploadParamsAddressesResponse;
    toJSON(_: MsgAddCodeUploadParamsAddressesResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgAddCodeUploadParamsAddressesResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgAddCodeUploadParamsAddressesResponse;
};
export declare const MsgRemoveCodeUploadParamsAddresses: {
    encode(message: MsgRemoveCodeUploadParamsAddresses, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveCodeUploadParamsAddresses;
    fromJSON(object: any): MsgRemoveCodeUploadParamsAddresses;
    toJSON(message: MsgRemoveCodeUploadParamsAddresses): unknown;
    create<I extends {
        authority?: string;
        addresses?: string[];
    } & {
        authority?: string;
        addresses?: string[] & string[] & { [K in Exclude<keyof I["addresses"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof MsgRemoveCodeUploadParamsAddresses>]: never; }>(base?: I): MsgRemoveCodeUploadParamsAddresses;
    fromPartial<I_1 extends {
        authority?: string;
        addresses?: string[];
    } & {
        authority?: string;
        addresses?: string[] & string[] & { [K_2 in Exclude<keyof I_1["addresses"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof MsgRemoveCodeUploadParamsAddresses>]: never; }>(object: I_1): MsgRemoveCodeUploadParamsAddresses;
};
export declare const MsgRemoveCodeUploadParamsAddressesResponse: {
    encode(_: MsgRemoveCodeUploadParamsAddressesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgRemoveCodeUploadParamsAddressesResponse;
    fromJSON(_: any): MsgRemoveCodeUploadParamsAddressesResponse;
    toJSON(_: MsgRemoveCodeUploadParamsAddressesResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgRemoveCodeUploadParamsAddressesResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgRemoveCodeUploadParamsAddressesResponse;
};
export declare const MsgStoreAndMigrateContract: {
    encode(message: MsgStoreAndMigrateContract, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndMigrateContract;
    fromJSON(object: any): MsgStoreAndMigrateContract;
    toJSON(message: MsgStoreAndMigrateContract): unknown;
    create<I extends {
        authority?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
        contract?: string;
        msg?: Uint8Array;
    } & {
        authority?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiatePermission"], keyof AccessConfig>]: never; };
        contract?: string;
        msg?: Uint8Array;
    } & { [K_2 in Exclude<keyof I, keyof MsgStoreAndMigrateContract>]: never; }>(base?: I): MsgStoreAndMigrateContract;
    fromPartial<I_1 extends {
        authority?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        };
        contract?: string;
        msg?: Uint8Array;
    } & {
        authority?: string;
        wasmByteCode?: Uint8Array;
        instantiatePermission?: {
            permission?: import("./types").AccessType;
            addresses?: string[];
        } & {
            permission?: import("./types").AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["instantiatePermission"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["instantiatePermission"], keyof AccessConfig>]: never; };
        contract?: string;
        msg?: Uint8Array;
    } & { [K_5 in Exclude<keyof I_1, keyof MsgStoreAndMigrateContract>]: never; }>(object: I_1): MsgStoreAndMigrateContract;
};
export declare const MsgStoreAndMigrateContractResponse: {
    encode(message: MsgStoreAndMigrateContractResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgStoreAndMigrateContractResponse;
    fromJSON(object: any): MsgStoreAndMigrateContractResponse;
    toJSON(message: MsgStoreAndMigrateContractResponse): unknown;
    create<I extends {
        codeId?: number;
        checksum?: Uint8Array;
        data?: Uint8Array;
    } & {
        codeId?: number;
        checksum?: Uint8Array;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgStoreAndMigrateContractResponse>]: never; }>(base?: I): MsgStoreAndMigrateContractResponse;
    fromPartial<I_1 extends {
        codeId?: number;
        checksum?: Uint8Array;
        data?: Uint8Array;
    } & {
        codeId?: number;
        checksum?: Uint8Array;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgStoreAndMigrateContractResponse>]: never; }>(object: I_1): MsgStoreAndMigrateContractResponse;
};
export declare const MsgUpdateContractLabel: {
    encode(message: MsgUpdateContractLabel, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateContractLabel;
    fromJSON(object: any): MsgUpdateContractLabel;
    toJSON(message: MsgUpdateContractLabel): unknown;
    create<I extends {
        sender?: string;
        newLabel?: string;
        contract?: string;
    } & {
        sender?: string;
        newLabel?: string;
        contract?: string;
    } & { [K in Exclude<keyof I, keyof MsgUpdateContractLabel>]: never; }>(base?: I): MsgUpdateContractLabel;
    fromPartial<I_1 extends {
        sender?: string;
        newLabel?: string;
        contract?: string;
    } & {
        sender?: string;
        newLabel?: string;
        contract?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgUpdateContractLabel>]: never; }>(object: I_1): MsgUpdateContractLabel;
};
export declare const MsgUpdateContractLabelResponse: {
    encode(_: MsgUpdateContractLabelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateContractLabelResponse;
    fromJSON(_: any): MsgUpdateContractLabelResponse;
    toJSON(_: MsgUpdateContractLabelResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgUpdateContractLabelResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgUpdateContractLabelResponse;
};
/** Msg defines the wasm Msg service. */
export interface Msg {
    /** StoreCode to submit Wasm code to the system */
    StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
    /**
     * InstantiateContract creates a new smart contract instance for the given
     *  code id.
     */
    InstantiateContract(request: MsgInstantiateContract): Promise<MsgInstantiateContractResponse>;
    /**
     * InstantiateContract2 creates a new smart contract instance for the given
     *  code id with a predictable address
     */
    InstantiateContract2(request: MsgInstantiateContract2): Promise<MsgInstantiateContract2Response>;
    /** Execute submits the given message data to a smart contract */
    ExecuteContract(request: MsgExecuteContract): Promise<MsgExecuteContractResponse>;
    /** Migrate runs a code upgrade/ downgrade for a smart contract */
    MigrateContract(request: MsgMigrateContract): Promise<MsgMigrateContractResponse>;
    /** UpdateAdmin sets a new admin for a smart contract */
    UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse>;
    /** ClearAdmin removes any admin stored for a smart contract */
    ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse>;
    /** UpdateInstantiateConfig updates instantiate config for a smart contract */
    UpdateInstantiateConfig(request: MsgUpdateInstantiateConfig): Promise<MsgUpdateInstantiateConfigResponse>;
    /**
     * UpdateParams defines a governance operation for updating the x/wasm
     * module parameters. The authority is defined in the keeper.
     *
     * Since: 0.40
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /**
     * SudoContract defines a governance operation for calling sudo
     * on a contract. The authority is defined in the keeper.
     *
     * Since: 0.40
     */
    SudoContract(request: MsgSudoContract): Promise<MsgSudoContractResponse>;
    /**
     * PinCodes defines a governance operation for pinning a set of
     * code ids in the wasmvm cache. The authority is defined in the keeper.
     *
     * Since: 0.40
     */
    PinCodes(request: MsgPinCodes): Promise<MsgPinCodesResponse>;
    /**
     * UnpinCodes defines a governance operation for unpinning a set of
     * code ids in the wasmvm cache. The authority is defined in the keeper.
     *
     * Since: 0.40
     */
    UnpinCodes(request: MsgUnpinCodes): Promise<MsgUnpinCodesResponse>;
    /**
     * StoreAndInstantiateContract defines a governance operation for storing
     * and instantiating the contract. The authority is defined in the keeper.
     *
     * Since: 0.40
     */
    StoreAndInstantiateContract(request: MsgStoreAndInstantiateContract): Promise<MsgStoreAndInstantiateContractResponse>;
    /**
     * RemoveCodeUploadParamsAddresses defines a governance operation for
     * removing addresses from code upload params.
     * The authority is defined in the keeper.
     */
    RemoveCodeUploadParamsAddresses(request: MsgRemoveCodeUploadParamsAddresses): Promise<MsgRemoveCodeUploadParamsAddressesResponse>;
    /**
     * AddCodeUploadParamsAddresses defines a governance operation for
     * adding addresses to code upload params.
     * The authority is defined in the keeper.
     */
    AddCodeUploadParamsAddresses(request: MsgAddCodeUploadParamsAddresses): Promise<MsgAddCodeUploadParamsAddressesResponse>;
    /**
     * StoreAndMigrateContract defines a governance operation for storing
     * and migrating the contract. The authority is defined in the keeper.
     *
     * Since: 0.42
     */
    StoreAndMigrateContract(request: MsgStoreAndMigrateContract): Promise<MsgStoreAndMigrateContractResponse>;
    /**
     * UpdateContractLabel sets a new label for a smart contract
     *
     * Since: 0.43
     */
    UpdateContractLabel(request: MsgUpdateContractLabel): Promise<MsgUpdateContractLabelResponse>;
}
export declare const MsgServiceName = "cosmwasm.wasm.v1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    StoreCode(request: MsgStoreCode): Promise<MsgStoreCodeResponse>;
    InstantiateContract(request: MsgInstantiateContract): Promise<MsgInstantiateContractResponse>;
    InstantiateContract2(request: MsgInstantiateContract2): Promise<MsgInstantiateContract2Response>;
    ExecuteContract(request: MsgExecuteContract): Promise<MsgExecuteContractResponse>;
    MigrateContract(request: MsgMigrateContract): Promise<MsgMigrateContractResponse>;
    UpdateAdmin(request: MsgUpdateAdmin): Promise<MsgUpdateAdminResponse>;
    ClearAdmin(request: MsgClearAdmin): Promise<MsgClearAdminResponse>;
    UpdateInstantiateConfig(request: MsgUpdateInstantiateConfig): Promise<MsgUpdateInstantiateConfigResponse>;
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    SudoContract(request: MsgSudoContract): Promise<MsgSudoContractResponse>;
    PinCodes(request: MsgPinCodes): Promise<MsgPinCodesResponse>;
    UnpinCodes(request: MsgUnpinCodes): Promise<MsgUnpinCodesResponse>;
    StoreAndInstantiateContract(request: MsgStoreAndInstantiateContract): Promise<MsgStoreAndInstantiateContractResponse>;
    RemoveCodeUploadParamsAddresses(request: MsgRemoveCodeUploadParamsAddresses): Promise<MsgRemoveCodeUploadParamsAddressesResponse>;
    AddCodeUploadParamsAddresses(request: MsgAddCodeUploadParamsAddresses): Promise<MsgAddCodeUploadParamsAddressesResponse>;
    StoreAndMigrateContract(request: MsgStoreAndMigrateContract): Promise<MsgStoreAndMigrateContractResponse>;
    UpdateContractLabel(request: MsgUpdateContractLabel): Promise<MsgUpdateContractLabelResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
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
