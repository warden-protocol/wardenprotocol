import _m0 from "protobufjs/minimal";
import { Order, Timeout } from "./channel";
export declare const protobufPackage = "ibc.core.channel.v1";
/**
 * Upgrade is a verifiable type which contains the relevant information
 * for an attempted upgrade. It provides the proposed changes to the channel
 * end, the timeout for this upgrade attempt and the next packet sequence
 * which allows the counterparty to efficiently know the highest sequence it has received.
 * The next sequence send is used for pruning and upgrading from unordered to ordered channels.
 */
export interface Upgrade {
    fields: UpgradeFields | undefined;
    timeout: Timeout | undefined;
    nextSequenceSend: number;
}
/**
 * UpgradeFields are the fields in a channel end which may be changed
 * during a channel upgrade.
 */
export interface UpgradeFields {
    ordering: Order;
    connectionHops: string[];
    version: string;
}
/**
 * ErrorReceipt defines a type which encapsulates the upgrade sequence and error associated with the
 * upgrade handshake failure. When a channel upgrade handshake is aborted both chains are expected to increment to the
 * next sequence.
 */
export interface ErrorReceipt {
    /** the channel upgrade sequence */
    sequence: number;
    /** the error message detailing the cause of failure */
    message: string;
}
export declare const Upgrade: {
    encode(message: Upgrade, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Upgrade;
    fromJSON(object: any): Upgrade;
    toJSON(message: Upgrade): unknown;
    create<I extends {
        fields?: {
            ordering?: Order;
            connectionHops?: string[];
            version?: string;
        };
        timeout?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timestamp?: number;
        };
        nextSequenceSend?: number;
    } & {
        fields?: {
            ordering?: Order;
            connectionHops?: string[];
            version?: string;
        } & {
            ordering?: Order;
            connectionHops?: string[] & string[] & { [K in Exclude<keyof I["fields"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
        } & { [K_1 in Exclude<keyof I["fields"], keyof UpgradeFields>]: never; };
        timeout?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timestamp?: number;
        } & {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K_2 in Exclude<keyof I["timeout"]["height"], keyof import("../../client/v1/client").Height>]: never; };
            timestamp?: number;
        } & { [K_3 in Exclude<keyof I["timeout"], keyof Timeout>]: never; };
        nextSequenceSend?: number;
    } & { [K_4 in Exclude<keyof I, keyof Upgrade>]: never; }>(base?: I): Upgrade;
    fromPartial<I_1 extends {
        fields?: {
            ordering?: Order;
            connectionHops?: string[];
            version?: string;
        };
        timeout?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timestamp?: number;
        };
        nextSequenceSend?: number;
    } & {
        fields?: {
            ordering?: Order;
            connectionHops?: string[];
            version?: string;
        } & {
            ordering?: Order;
            connectionHops?: string[] & string[] & { [K_5 in Exclude<keyof I_1["fields"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
        } & { [K_6 in Exclude<keyof I_1["fields"], keyof UpgradeFields>]: never; };
        timeout?: {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            };
            timestamp?: number;
        } & {
            height?: {
                revisionNumber?: number;
                revisionHeight?: number;
            } & {
                revisionNumber?: number;
                revisionHeight?: number;
            } & { [K_7 in Exclude<keyof I_1["timeout"]["height"], keyof import("../../client/v1/client").Height>]: never; };
            timestamp?: number;
        } & { [K_8 in Exclude<keyof I_1["timeout"], keyof Timeout>]: never; };
        nextSequenceSend?: number;
    } & { [K_9 in Exclude<keyof I_1, keyof Upgrade>]: never; }>(object: I_1): Upgrade;
};
export declare const UpgradeFields: {
    encode(message: UpgradeFields, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): UpgradeFields;
    fromJSON(object: any): UpgradeFields;
    toJSON(message: UpgradeFields): unknown;
    create<I extends {
        ordering?: Order;
        connectionHops?: string[];
        version?: string;
    } & {
        ordering?: Order;
        connectionHops?: string[] & string[] & { [K in Exclude<keyof I["connectionHops"], keyof string[]>]: never; };
        version?: string;
    } & { [K_1 in Exclude<keyof I, keyof UpgradeFields>]: never; }>(base?: I): UpgradeFields;
    fromPartial<I_1 extends {
        ordering?: Order;
        connectionHops?: string[];
        version?: string;
    } & {
        ordering?: Order;
        connectionHops?: string[] & string[] & { [K_2 in Exclude<keyof I_1["connectionHops"], keyof string[]>]: never; };
        version?: string;
    } & { [K_3 in Exclude<keyof I_1, keyof UpgradeFields>]: never; }>(object: I_1): UpgradeFields;
};
export declare const ErrorReceipt: {
    encode(message: ErrorReceipt, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ErrorReceipt;
    fromJSON(object: any): ErrorReceipt;
    toJSON(message: ErrorReceipt): unknown;
    create<I extends {
        sequence?: number;
        message?: string;
    } & {
        sequence?: number;
        message?: string;
    } & { [K in Exclude<keyof I, keyof ErrorReceipt>]: never; }>(base?: I): ErrorReceipt;
    fromPartial<I_1 extends {
        sequence?: number;
        message?: string;
    } & {
        sequence?: number;
        message?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof ErrorReceipt>]: never; }>(object: I_1): ErrorReceipt;
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
