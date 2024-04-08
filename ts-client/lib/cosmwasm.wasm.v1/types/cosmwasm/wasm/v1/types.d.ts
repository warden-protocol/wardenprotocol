import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmwasm.wasm.v1";
/** AccessType permission types */
export declare enum AccessType {
    /** ACCESS_TYPE_UNSPECIFIED - AccessTypeUnspecified placeholder for empty value */
    ACCESS_TYPE_UNSPECIFIED = 0,
    /** ACCESS_TYPE_NOBODY - AccessTypeNobody forbidden */
    ACCESS_TYPE_NOBODY = 1,
    /** ACCESS_TYPE_EVERYBODY - AccessTypeEverybody unrestricted */
    ACCESS_TYPE_EVERYBODY = 3,
    /** ACCESS_TYPE_ANY_OF_ADDRESSES - AccessTypeAnyOfAddresses allow any of the addresses */
    ACCESS_TYPE_ANY_OF_ADDRESSES = 4,
    UNRECOGNIZED = -1
}
export declare function accessTypeFromJSON(object: any): AccessType;
export declare function accessTypeToJSON(object: AccessType): string;
/** ContractCodeHistoryOperationType actions that caused a code change */
export declare enum ContractCodeHistoryOperationType {
    /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED - ContractCodeHistoryOperationTypeUnspecified placeholder for empty value */
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = 0,
    /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT - ContractCodeHistoryOperationTypeInit on chain contract instantiation */
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = 1,
    /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE - ContractCodeHistoryOperationTypeMigrate code migration */
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = 2,
    /** CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS - ContractCodeHistoryOperationTypeGenesis based on genesis data */
    CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = 3,
    UNRECOGNIZED = -1
}
export declare function contractCodeHistoryOperationTypeFromJSON(object: any): ContractCodeHistoryOperationType;
export declare function contractCodeHistoryOperationTypeToJSON(object: ContractCodeHistoryOperationType): string;
/** AccessTypeParam */
export interface AccessTypeParam {
    value: AccessType;
}
/** AccessConfig access control type. */
export interface AccessConfig {
    permission: AccessType;
    addresses: string[];
}
/** Params defines the set of wasm parameters. */
export interface Params {
    codeUploadAccess: AccessConfig | undefined;
    instantiateDefaultPermission: AccessType;
}
/** CodeInfo is data for the uploaded contract WASM code */
export interface CodeInfo {
    /** CodeHash is the unique identifier created by wasmvm */
    codeHash: Uint8Array;
    /** Creator address who initially stored the code */
    creator: string;
    /** InstantiateConfig access control to apply on contract creation, optional */
    instantiateConfig: AccessConfig | undefined;
}
/** ContractInfo stores a WASM contract instance */
export interface ContractInfo {
    /** CodeID is the reference to the stored Wasm code */
    codeId: number;
    /** Creator address who initially instantiated the contract */
    creator: string;
    /** Admin is an optional address that can execute migrations */
    admin: string;
    /** Label is optional metadata to be stored with a contract instance. */
    label: string;
    /** Created Tx position when the contract was instantiated. */
    created: AbsoluteTxPosition | undefined;
    ibcPortId: string;
    /**
     * Extension is an extension point to store custom metadata within the
     * persistence model.
     */
    extension: Any | undefined;
}
/** ContractCodeHistoryEntry metadata to a contract. */
export interface ContractCodeHistoryEntry {
    operation: ContractCodeHistoryOperationType;
    /** CodeID is the reference to the stored WASM code */
    codeId: number;
    /** Updated Tx position when the operation was executed. */
    updated: AbsoluteTxPosition | undefined;
    msg: Uint8Array;
}
/**
 * AbsoluteTxPosition is a unique transaction position that allows for global
 * ordering of transactions.
 */
export interface AbsoluteTxPosition {
    /** BlockHeight is the block the contract was created at */
    blockHeight: number;
    /**
     * TxIndex is a monotonic counter within the block (actual transaction index,
     * or gas consumed)
     */
    txIndex: number;
}
/** Model is a struct that holds a KV pair */
export interface Model {
    /** hex-encode key to read it better (this is often ascii) */
    key: Uint8Array;
    /** base64-encode raw value */
    value: Uint8Array;
}
export declare const AccessTypeParam: {
    encode(message: AccessTypeParam, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccessTypeParam;
    fromJSON(object: any): AccessTypeParam;
    toJSON(message: AccessTypeParam): unknown;
    create<I extends {
        value?: AccessType;
    } & {
        value?: AccessType;
    } & { [K in Exclude<keyof I, "value">]: never; }>(base?: I): AccessTypeParam;
    fromPartial<I_1 extends {
        value?: AccessType;
    } & {
        value?: AccessType;
    } & { [K_1 in Exclude<keyof I_1, "value">]: never; }>(object: I_1): AccessTypeParam;
};
export declare const AccessConfig: {
    encode(message: AccessConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AccessConfig;
    fromJSON(object: any): AccessConfig;
    toJSON(message: AccessConfig): unknown;
    create<I extends {
        permission?: AccessType;
        addresses?: string[];
    } & {
        permission?: AccessType;
        addresses?: string[] & string[] & { [K in Exclude<keyof I["addresses"], keyof string[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof AccessConfig>]: never; }>(base?: I): AccessConfig;
    fromPartial<I_1 extends {
        permission?: AccessType;
        addresses?: string[];
    } & {
        permission?: AccessType;
        addresses?: string[] & string[] & { [K_2 in Exclude<keyof I_1["addresses"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof AccessConfig>]: never; }>(object: I_1): AccessConfig;
};
export declare const Params: {
    encode(message: Params, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Params;
    fromJSON(object: any): Params;
    toJSON(message: Params): unknown;
    create<I extends {
        codeUploadAccess?: {
            permission?: AccessType;
            addresses?: string[];
        };
        instantiateDefaultPermission?: AccessType;
    } & {
        codeUploadAccess?: {
            permission?: AccessType;
            addresses?: string[];
        } & {
            permission?: AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["codeUploadAccess"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["codeUploadAccess"], keyof AccessConfig>]: never; };
        instantiateDefaultPermission?: AccessType;
    } & { [K_2 in Exclude<keyof I, keyof Params>]: never; }>(base?: I): Params;
    fromPartial<I_1 extends {
        codeUploadAccess?: {
            permission?: AccessType;
            addresses?: string[];
        };
        instantiateDefaultPermission?: AccessType;
    } & {
        codeUploadAccess?: {
            permission?: AccessType;
            addresses?: string[];
        } & {
            permission?: AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["codeUploadAccess"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["codeUploadAccess"], keyof AccessConfig>]: never; };
        instantiateDefaultPermission?: AccessType;
    } & { [K_5 in Exclude<keyof I_1, keyof Params>]: never; }>(object: I_1): Params;
};
export declare const CodeInfo: {
    encode(message: CodeInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CodeInfo;
    fromJSON(object: any): CodeInfo;
    toJSON(message: CodeInfo): unknown;
    create<I extends {
        codeHash?: Uint8Array;
        creator?: string;
        instantiateConfig?: {
            permission?: AccessType;
            addresses?: string[];
        };
    } & {
        codeHash?: Uint8Array;
        creator?: string;
        instantiateConfig?: {
            permission?: AccessType;
            addresses?: string[];
        } & {
            permission?: AccessType;
            addresses?: string[] & string[] & { [K in Exclude<keyof I["instantiateConfig"]["addresses"], keyof string[]>]: never; };
        } & { [K_1 in Exclude<keyof I["instantiateConfig"], keyof AccessConfig>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof CodeInfo>]: never; }>(base?: I): CodeInfo;
    fromPartial<I_1 extends {
        codeHash?: Uint8Array;
        creator?: string;
        instantiateConfig?: {
            permission?: AccessType;
            addresses?: string[];
        };
    } & {
        codeHash?: Uint8Array;
        creator?: string;
        instantiateConfig?: {
            permission?: AccessType;
            addresses?: string[];
        } & {
            permission?: AccessType;
            addresses?: string[] & string[] & { [K_3 in Exclude<keyof I_1["instantiateConfig"]["addresses"], keyof string[]>]: never; };
        } & { [K_4 in Exclude<keyof I_1["instantiateConfig"], keyof AccessConfig>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof CodeInfo>]: never; }>(object: I_1): CodeInfo;
};
export declare const ContractInfo: {
    encode(message: ContractInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ContractInfo;
    fromJSON(object: any): ContractInfo;
    toJSON(message: ContractInfo): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["created"], keyof AbsoluteTxPosition>]: never; };
        ibcPortId?: string;
        extension?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["extension"], keyof Any>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ContractInfo>]: never; }>(base?: I): ContractInfo;
    fromPartial<I_1 extends {
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
        } & { [K_3 in Exclude<keyof I_1["created"], keyof AbsoluteTxPosition>]: never; };
        ibcPortId?: string;
        extension?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["extension"], keyof Any>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ContractInfo>]: never; }>(object: I_1): ContractInfo;
};
export declare const ContractCodeHistoryEntry: {
    encode(message: ContractCodeHistoryEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ContractCodeHistoryEntry;
    fromJSON(object: any): ContractCodeHistoryEntry;
    toJSON(message: ContractCodeHistoryEntry): unknown;
    create<I extends {
        operation?: ContractCodeHistoryOperationType;
        codeId?: number;
        updated?: {
            blockHeight?: number;
            txIndex?: number;
        };
        msg?: Uint8Array;
    } & {
        operation?: ContractCodeHistoryOperationType;
        codeId?: number;
        updated?: {
            blockHeight?: number;
            txIndex?: number;
        } & {
            blockHeight?: number;
            txIndex?: number;
        } & { [K in Exclude<keyof I["updated"], keyof AbsoluteTxPosition>]: never; };
        msg?: Uint8Array;
    } & { [K_1 in Exclude<keyof I, keyof ContractCodeHistoryEntry>]: never; }>(base?: I): ContractCodeHistoryEntry;
    fromPartial<I_1 extends {
        operation?: ContractCodeHistoryOperationType;
        codeId?: number;
        updated?: {
            blockHeight?: number;
            txIndex?: number;
        };
        msg?: Uint8Array;
    } & {
        operation?: ContractCodeHistoryOperationType;
        codeId?: number;
        updated?: {
            blockHeight?: number;
            txIndex?: number;
        } & {
            blockHeight?: number;
            txIndex?: number;
        } & { [K_2 in Exclude<keyof I_1["updated"], keyof AbsoluteTxPosition>]: never; };
        msg?: Uint8Array;
    } & { [K_3 in Exclude<keyof I_1, keyof ContractCodeHistoryEntry>]: never; }>(object: I_1): ContractCodeHistoryEntry;
};
export declare const AbsoluteTxPosition: {
    encode(message: AbsoluteTxPosition, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): AbsoluteTxPosition;
    fromJSON(object: any): AbsoluteTxPosition;
    toJSON(message: AbsoluteTxPosition): unknown;
    create<I extends {
        blockHeight?: number;
        txIndex?: number;
    } & {
        blockHeight?: number;
        txIndex?: number;
    } & { [K in Exclude<keyof I, keyof AbsoluteTxPosition>]: never; }>(base?: I): AbsoluteTxPosition;
    fromPartial<I_1 extends {
        blockHeight?: number;
        txIndex?: number;
    } & {
        blockHeight?: number;
        txIndex?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof AbsoluteTxPosition>]: never; }>(object: I_1): AbsoluteTxPosition;
};
export declare const Model: {
    encode(message: Model, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Model;
    fromJSON(object: any): Model;
    toJSON(message: Model): unknown;
    create<I extends {
        key?: Uint8Array;
        value?: Uint8Array;
    } & {
        key?: Uint8Array;
        value?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof Model>]: never; }>(base?: I): Model;
    fromPartial<I_1 extends {
        key?: Uint8Array;
        value?: Uint8Array;
    } & {
        key?: Uint8Array;
        value?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof Model>]: never; }>(object: I_1): Model;
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
