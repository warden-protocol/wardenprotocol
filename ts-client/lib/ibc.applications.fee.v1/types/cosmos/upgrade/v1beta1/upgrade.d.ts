import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
export declare const protobufPackage = "cosmos.upgrade.v1beta1";
/** Plan specifies information about a planned upgrade and when it should occur. */
export interface Plan {
    /**
     * Sets the name for the upgrade. This name will be used by the upgraded
     * version of the software to apply any special "on-upgrade" commands during
     * the first BeginBlock method after the upgrade is applied. It is also used
     * to detect whether a software version can handle a given upgrade. If no
     * upgrade handler with this name has been set in the software, it will be
     * assumed that the software is out-of-date when the upgrade Time or Height is
     * reached and the software will exit.
     */
    name: string;
    /**
     * Deprecated: Time based upgrades have been deprecated. Time based upgrade logic
     * has been removed from the SDK.
     * If this field is not empty, an error will be thrown.
     *
     * @deprecated
     */
    time: Date | undefined;
    /** The height at which the upgrade must be performed. */
    height: number;
    /**
     * Any application specific upgrade info to be included on-chain
     * such as a git commit that validators could automatically upgrade to
     */
    info: string;
    /**
     * Deprecated: UpgradedClientState field has been deprecated. IBC upgrade logic has been
     * moved to the IBC module in the sub module 02-client.
     * If this field is not empty, an error will be thrown.
     *
     * @deprecated
     */
    upgradedClientState: Any | undefined;
}
/**
 * SoftwareUpgradeProposal is a gov Content type for initiating a software
 * upgrade.
 * Deprecated: This legacy proposal is deprecated in favor of Msg-based gov
 * proposals, see MsgSoftwareUpgrade.
 *
 * @deprecated
 */
export interface SoftwareUpgradeProposal {
    /** title of the proposal */
    title: string;
    /** description of the proposal */
    description: string;
    /** plan of the proposal */
    plan: Plan | undefined;
}
/**
 * CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software
 * upgrade.
 * Deprecated: This legacy proposal is deprecated in favor of Msg-based gov
 * proposals, see MsgCancelUpgrade.
 *
 * @deprecated
 */
export interface CancelSoftwareUpgradeProposal {
    /** title of the proposal */
    title: string;
    /** description of the proposal */
    description: string;
}
/**
 * ModuleVersion specifies a module and its consensus version.
 *
 * Since: cosmos-sdk 0.43
 */
export interface ModuleVersion {
    /** name of the app module */
    name: string;
    /** consensus version of the app module */
    version: number;
}
export declare const Plan: {
    encode(message: Plan, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Plan;
    fromJSON(object: any): Plan;
    toJSON(message: Plan): unknown;
    create<I extends {
        name?: string;
        time?: Date | undefined;
        height?: number;
        info?: string;
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        name?: string;
        time?: Date | undefined;
        height?: number;
        info?: string;
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["upgradedClientState"], keyof Any>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof Plan>]: never; }>(base?: I): Plan;
    fromPartial<I_1 extends {
        name?: string;
        time?: Date | undefined;
        height?: number;
        info?: string;
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
    } & {
        name?: string;
        time?: Date | undefined;
        height?: number;
        info?: string;
        upgradedClientState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I_1["upgradedClientState"], keyof Any>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof Plan>]: never; }>(object: I_1): Plan;
};
export declare const SoftwareUpgradeProposal: {
    encode(message: SoftwareUpgradeProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SoftwareUpgradeProposal;
    fromJSON(object: any): SoftwareUpgradeProposal;
    toJSON(message: SoftwareUpgradeProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date | undefined;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date | undefined;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date | undefined;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["plan"]["upgradedClientState"], keyof Any>]: never; };
        } & { [K_1 in Exclude<keyof I["plan"], keyof Plan>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof SoftwareUpgradeProposal>]: never; }>(base?: I): SoftwareUpgradeProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date | undefined;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
    } & {
        title?: string;
        description?: string;
        plan?: {
            name?: string;
            time?: Date | undefined;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            name?: string;
            time?: Date | undefined;
            height?: number;
            info?: string;
            upgradedClientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I_1["plan"]["upgradedClientState"], keyof Any>]: never; };
        } & { [K_4 in Exclude<keyof I_1["plan"], keyof Plan>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof SoftwareUpgradeProposal>]: never; }>(object: I_1): SoftwareUpgradeProposal;
};
export declare const CancelSoftwareUpgradeProposal: {
    encode(message: CancelSoftwareUpgradeProposal, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): CancelSoftwareUpgradeProposal;
    fromJSON(object: any): CancelSoftwareUpgradeProposal;
    toJSON(message: CancelSoftwareUpgradeProposal): unknown;
    create<I extends {
        title?: string;
        description?: string;
    } & {
        title?: string;
        description?: string;
    } & { [K in Exclude<keyof I, keyof CancelSoftwareUpgradeProposal>]: never; }>(base?: I): CancelSoftwareUpgradeProposal;
    fromPartial<I_1 extends {
        title?: string;
        description?: string;
    } & {
        title?: string;
        description?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof CancelSoftwareUpgradeProposal>]: never; }>(object: I_1): CancelSoftwareUpgradeProposal;
};
export declare const ModuleVersion: {
    encode(message: ModuleVersion, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ModuleVersion;
    fromJSON(object: any): ModuleVersion;
    toJSON(message: ModuleVersion): unknown;
    create<I extends {
        name?: string;
        version?: number;
    } & {
        name?: string;
        version?: number;
    } & { [K in Exclude<keyof I, keyof ModuleVersion>]: never; }>(base?: I): ModuleVersion;
    fromPartial<I_1 extends {
        name?: string;
        version?: number;
    } & {
        name?: string;
        version?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof ModuleVersion>]: never; }>(object: I_1): ModuleVersion;
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
