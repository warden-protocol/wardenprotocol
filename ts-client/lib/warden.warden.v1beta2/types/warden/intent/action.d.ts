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
export interface Approver {
    /** address is the address of the approver */
    address: string;
    /** approved_at is a timestamp specifying when the approver approved an action */
    approvedAt: Date | undefined;
}
/** Action wraps a message that needs to be approved by a set of approvers. */
export interface Action {
    id: number;
    approvers: Approver[];
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
    /** Result of the action, it will be set when the action is completed. */
    result: Any | undefined;
    creator: string;
    /**
     * BTL (blocks to live) is the block height up until this action can be
     * approved or rejected.
     */
    btl: number;
    /** created_at is a timestamp specifying when the action was created */
    createdAt: Date | undefined;
    /** updated_at is a timestamp specifying when the action's status was updated */
    updatedAt: Date | undefined;
}
/** MsgActionCreated is returned by rpc that creates an action. */
export interface MsgActionCreated {
    action: Action | undefined;
}
export declare const Approver: {
    encode(message: Approver, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Approver;
    fromJSON(object: any): Approver;
    toJSON(message: Approver): unknown;
    create<I extends {
        address?: string;
        approvedAt?: Date | undefined;
    } & {
        address?: string;
        approvedAt?: Date | undefined;
    } & { [K in Exclude<keyof I, keyof Approver>]: never; }>(base?: I): Approver;
    fromPartial<I_1 extends {
        address?: string;
        approvedAt?: Date | undefined;
    } & {
        address?: string;
        approvedAt?: Date | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Approver>]: never; }>(object: I_1): Approver;
};
export declare const Action: {
    encode(message: Action, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Action;
    fromJSON(object: any): Action;
    toJSON(message: Action): unknown;
    create<I extends {
        id?: number;
        approvers?: {
            address?: string;
            approvedAt?: Date | undefined;
        }[];
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        result?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        creator?: string;
        btl?: number;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & {
        id?: number;
        approvers?: {
            address?: string;
            approvedAt?: Date | undefined;
        }[] & ({
            address?: string;
            approvedAt?: Date | undefined;
        } & {
            address?: string;
            approvedAt?: Date | undefined;
        } & { [K in Exclude<keyof I["approvers"][number], keyof Approver>]: never; })[] & { [K_1 in Exclude<keyof I["approvers"], keyof {
            address?: string;
            approvedAt?: Date | undefined;
        }[]>]: never; };
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["msg"], keyof Any>]: never; };
        result?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I["result"], keyof Any>]: never; };
        creator?: string;
        btl?: number;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K_4 in Exclude<keyof I, keyof Action>]: never; }>(base?: I): Action;
    fromPartial<I_1 extends {
        id?: number;
        approvers?: {
            address?: string;
            approvedAt?: Date | undefined;
        }[];
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        result?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        creator?: string;
        btl?: number;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & {
        id?: number;
        approvers?: {
            address?: string;
            approvedAt?: Date | undefined;
        }[] & ({
            address?: string;
            approvedAt?: Date | undefined;
        } & {
            address?: string;
            approvedAt?: Date | undefined;
        } & { [K_5 in Exclude<keyof I_1["approvers"][number], keyof Approver>]: never; })[] & { [K_6 in Exclude<keyof I_1["approvers"], keyof {
            address?: string;
            approvedAt?: Date | undefined;
        }[]>]: never; };
        status?: ActionStatus;
        intentId?: number;
        msg?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_7 in Exclude<keyof I_1["msg"], keyof Any>]: never; };
        result?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_8 in Exclude<keyof I_1["result"], keyof Any>]: never; };
        creator?: string;
        btl?: number;
        createdAt?: Date | undefined;
        updatedAt?: Date | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof Action>]: never; }>(object: I_1): Action;
};
export declare const MsgActionCreated: {
    encode(message: MsgActionCreated, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgActionCreated;
    fromJSON(object: any): MsgActionCreated;
    toJSON(message: MsgActionCreated): unknown;
    create<I extends {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date | undefined;
            }[];
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            creator?: string;
            btl?: number;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        };
    } & {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date | undefined;
            }[];
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            creator?: string;
            btl?: number;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date | undefined;
            }[] & ({
                address?: string;
                approvedAt?: Date | undefined;
            } & {
                address?: string;
                approvedAt?: Date | undefined;
            } & { [K in Exclude<keyof I["action"]["approvers"][number], keyof Approver>]: never; })[] & { [K_1 in Exclude<keyof I["action"]["approvers"], keyof {
                address?: string;
                approvedAt?: Date | undefined;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_2 in Exclude<keyof I["action"]["msg"], keyof Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I["action"]["result"], keyof Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_4 in Exclude<keyof I["action"], keyof Action>]: never; };
    } & { [K_5 in Exclude<keyof I, "action">]: never; }>(base?: I): MsgActionCreated;
    fromPartial<I_1 extends {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date | undefined;
            }[];
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            creator?: string;
            btl?: number;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        };
    } & {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date | undefined;
            }[];
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            creator?: string;
            btl?: number;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date | undefined;
            }[] & ({
                address?: string;
                approvedAt?: Date | undefined;
            } & {
                address?: string;
                approvedAt?: Date | undefined;
            } & { [K_6 in Exclude<keyof I_1["action"]["approvers"][number], keyof Approver>]: never; })[] & { [K_7 in Exclude<keyof I_1["action"]["approvers"], keyof {
                address?: string;
                approvedAt?: Date | undefined;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_8 in Exclude<keyof I_1["action"]["msg"], keyof Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_9 in Exclude<keyof I_1["action"]["result"], keyof Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date | undefined;
            updatedAt?: Date | undefined;
        } & { [K_10 in Exclude<keyof I_1["action"], keyof Action>]: never; };
    } & { [K_11 in Exclude<keyof I_1, "action">]: never; }>(object: I_1): MsgActionCreated;
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
