import _m0 from "protobufjs/minimal";
import { Any } from "../../google/protobuf/any";
export declare const protobufPackage = "warden.intent";
/** Current status of an action. */
export declare enum ActionStatus {
    /** ACTION_STATUS_UNSPECIFIED - Unspecified status. */
    ACTION_STATUS_UNSPECIFIED = 0,
    /** ACTION_STATUS_PENDING - Action is pending approval. This is the initial status. */
    ACTION_STATUS_PENDING = 1,
    /** ACTION_STATUS_COMPLETED - Intent has been satified, action has been executed. */
    ACTION_STATUS_COMPLETED = 2,
    /** ACTION_STATUS_REVOKED - Action has been revoked by its creator. */
    ACTION_STATUS_REVOKED = 3,
    /** ACTION_STATUS_TIMEOUT - Action has been rejected since Btl is expired */
    ACTION_STATUS_TIMEOUT = 4,
    UNRECOGNIZED = -1
}
export declare function actionStatusFromJSON(object: any): ActionStatus;
export declare function actionStatusToJSON(object: ActionStatus): string;
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface Action {
    id: number;
    approvers: string[];
    status: ActionStatus;
    /**
     * Optional intent id that must be satisfied by the approvers.
     * If not specified, it's up to the creator of the action to decide what to
     * apply.
     */
    intentId: number;
    /**
     * Original message that started the action, it will be executed when the
     * intent is satisfied.
     */
    msg: Any | undefined;
    creator: string;
    /**
     * BTL (blocks to live) is the block height up until this action can be
     * approved or rejected.
     */
    btl: number;
}
export declare const Action: {
    encode(message: Action, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Action;
    fromJSON(object: any): Action;
    toJSON(message: Action): unknown;
    create<I extends {
        id?: number;
        approvers?: string[];
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        creator?: string;
        btl?: number;
    } & {
        id?: number;
        approvers?: string[] & string[] & { [K in Exclude<keyof I["approvers"], keyof string[]>]: never; };
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_1 in Exclude<keyof I["msg"], keyof Any>]: never; };
        creator?: string;
        btl?: number;
    } & { [K_2 in Exclude<keyof I, keyof Action>]: never; }>(base?: I): Action;
    fromPartial<I_1 extends {
        id?: number;
        approvers?: string[];
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        creator?: string;
        btl?: number;
    } & {
        id?: number;
        approvers?: string[] & string[] & { [K_3 in Exclude<keyof I_1["approvers"], keyof string[]>]: never; };
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I_1["msg"], keyof Any>]: never; };
        creator?: string;
        btl?: number;
    } & { [K_5 in Exclude<keyof I_1, keyof Action>]: never; }>(object: I_1): Action;
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
