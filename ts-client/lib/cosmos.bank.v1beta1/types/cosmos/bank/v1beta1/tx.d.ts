import _m0 from "protobufjs/minimal";
import { Coin } from "../../base/v1beta1/coin";
import { Input, Output, Params, SendEnabled } from "./bank";
export declare const protobufPackage = "cosmos.bank.v1beta1";
/** MsgSend represents a message to send coins from one account to another. */
export interface MsgSend {
    fromAddress: string;
    toAddress: string;
    amount: Coin[];
}
/** MsgSendResponse defines the Msg/Send response type. */
export interface MsgSendResponse {
}
/** MsgMultiSend represents an arbitrary multi-in, multi-out send message. */
export interface MsgMultiSend {
    /**
     * Inputs, despite being `repeated`, only allows one sender input. This is
     * checked in MsgMultiSend's ValidateBasic.
     */
    inputs: Input[];
    outputs: Output[];
}
/** MsgMultiSendResponse defines the Msg/MultiSend response type. */
export interface MsgMultiSendResponse {
}
/**
 * MsgUpdateParams is the Msg/UpdateParams request type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParams {
    /** authority is the address that controls the module (defaults to x/gov unless overwritten). */
    authority: string;
    /**
     * params defines the x/bank parameters to update.
     *
     * NOTE: All parameters must be supplied.
     */
    params: Params | undefined;
}
/**
 * MsgUpdateParamsResponse defines the response structure for executing a
 * MsgUpdateParams message.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgUpdateParamsResponse {
}
/**
 * MsgSetSendEnabled is the Msg/SetSendEnabled request type.
 *
 * Only entries to add/update/delete need to be included.
 * Existing SendEnabled entries that are not included in this
 * message are left unchanged.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabled {
    /** authority is the address that controls the module. */
    authority: string;
    /** send_enabled is the list of entries to add or update. */
    sendEnabled: SendEnabled[];
    /**
     * use_default_for is a list of denoms that should use the params.default_send_enabled value.
     * Denoms listed here will have their SendEnabled entries deleted.
     * If a denom is included that doesn't have a SendEnabled entry,
     * it will be ignored.
     */
    useDefaultFor: string[];
}
/**
 * MsgSetSendEnabledResponse defines the Msg/SetSendEnabled response type.
 *
 * Since: cosmos-sdk 0.47
 */
export interface MsgSetSendEnabledResponse {
}
export declare const MsgSend: {
    encode(message: MsgSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSend;
    fromJSON(object: any): MsgSend;
    toJSON(message: MsgSend): unknown;
    create<I extends {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["amount"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof MsgSend>]: never; }>(base?: I): MsgSend;
    fromPartial<I_1 extends {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        fromAddress?: string;
        toAddress?: string;
        amount?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["amount"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["amount"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof MsgSend>]: never; }>(object: I_1): MsgSend;
};
export declare const MsgSendResponse: {
    encode(_: MsgSendResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSendResponse;
    fromJSON(_: any): MsgSendResponse;
    toJSON(_: MsgSendResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgSendResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgSendResponse;
};
export declare const MsgMultiSend: {
    encode(message: MsgMultiSend, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSend;
    fromJSON(object: any): MsgMultiSend;
    toJSON(message: MsgMultiSend): unknown;
    create<I extends {
        inputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        outputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        inputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K in Exclude<keyof I["inputs"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["inputs"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["inputs"][number], keyof Input>]: never; })[] & { [K_3 in Exclude<keyof I["inputs"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        outputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_4 in Exclude<keyof I["outputs"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_5 in Exclude<keyof I["outputs"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_6 in Exclude<keyof I["outputs"][number], keyof Output>]: never; })[] & { [K_7 in Exclude<keyof I["outputs"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof MsgMultiSend>]: never; }>(base?: I): MsgMultiSend;
    fromPartial<I_1 extends {
        inputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
        outputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[];
    } & {
        inputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_9 in Exclude<keyof I_1["inputs"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_10 in Exclude<keyof I_1["inputs"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I_1["inputs"][number], keyof Input>]: never; })[] & { [K_12 in Exclude<keyof I_1["inputs"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
        outputs?: {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[] & ({
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        } & {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[] & ({
                denom?: string;
                amount?: string;
            } & {
                denom?: string;
                amount?: string;
            } & { [K_13 in Exclude<keyof I_1["outputs"][number]["coins"][number], keyof Coin>]: never; })[] & { [K_14 in Exclude<keyof I_1["outputs"][number]["coins"], keyof {
                denom?: string;
                amount?: string;
            }[]>]: never; };
        } & { [K_15 in Exclude<keyof I_1["outputs"][number], keyof Output>]: never; })[] & { [K_16 in Exclude<keyof I_1["outputs"], keyof {
            address?: string;
            coins?: {
                denom?: string;
                amount?: string;
            }[];
        }[]>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof MsgMultiSend>]: never; }>(object: I_1): MsgMultiSend;
};
export declare const MsgMultiSendResponse: {
    encode(_: MsgMultiSendResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgMultiSendResponse;
    fromJSON(_: any): MsgMultiSendResponse;
    toJSON(_: MsgMultiSendResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgMultiSendResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgMultiSendResponse;
};
export declare const MsgUpdateParams: {
    encode(message: MsgUpdateParams, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateParams;
    fromJSON(object: any): MsgUpdateParams;
    toJSON(message: MsgUpdateParams): unknown;
    create<I extends {
        authority?: string;
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        };
    } & {
        authority?: string;
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        } & {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[] & ({
                denom?: string;
                enabled?: boolean;
            } & {
                denom?: string;
                enabled?: boolean;
            } & { [K in Exclude<keyof I["params"]["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_1 in Exclude<keyof I["params"]["sendEnabled"], keyof {
                denom?: string;
                enabled?: boolean;
            }[]>]: never; };
            defaultSendEnabled?: boolean;
        } & { [K_2 in Exclude<keyof I["params"], keyof Params>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof MsgUpdateParams>]: never; }>(base?: I): MsgUpdateParams;
    fromPartial<I_1 extends {
        authority?: string;
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        };
    } & {
        authority?: string;
        params?: {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[];
            defaultSendEnabled?: boolean;
        } & {
            sendEnabled?: {
                denom?: string;
                enabled?: boolean;
            }[] & ({
                denom?: string;
                enabled?: boolean;
            } & {
                denom?: string;
                enabled?: boolean;
            } & { [K_4 in Exclude<keyof I_1["params"]["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_5 in Exclude<keyof I_1["params"]["sendEnabled"], keyof {
                denom?: string;
                enabled?: boolean;
            }[]>]: never; };
            defaultSendEnabled?: boolean;
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
export declare const MsgSetSendEnabled: {
    encode(message: MsgSetSendEnabled, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSendEnabled;
    fromJSON(object: any): MsgSetSendEnabled;
    toJSON(message: MsgSetSendEnabled): unknown;
    create<I extends {
        authority?: string;
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
        useDefaultFor?: string[];
    } & {
        authority?: string;
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[] & ({
            denom?: string;
            enabled?: boolean;
        } & {
            denom?: string;
            enabled?: boolean;
        } & { [K in Exclude<keyof I["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_1 in Exclude<keyof I["sendEnabled"], keyof {
            denom?: string;
            enabled?: boolean;
        }[]>]: never; };
        useDefaultFor?: string[] & string[] & { [K_2 in Exclude<keyof I["useDefaultFor"], keyof string[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof MsgSetSendEnabled>]: never; }>(base?: I): MsgSetSendEnabled;
    fromPartial<I_1 extends {
        authority?: string;
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[];
        useDefaultFor?: string[];
    } & {
        authority?: string;
        sendEnabled?: {
            denom?: string;
            enabled?: boolean;
        }[] & ({
            denom?: string;
            enabled?: boolean;
        } & {
            denom?: string;
            enabled?: boolean;
        } & { [K_4 in Exclude<keyof I_1["sendEnabled"][number], keyof SendEnabled>]: never; })[] & { [K_5 in Exclude<keyof I_1["sendEnabled"], keyof {
            denom?: string;
            enabled?: boolean;
        }[]>]: never; };
        useDefaultFor?: string[] & string[] & { [K_6 in Exclude<keyof I_1["useDefaultFor"], keyof string[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof MsgSetSendEnabled>]: never; }>(object: I_1): MsgSetSendEnabled;
};
export declare const MsgSetSendEnabledResponse: {
    encode(_: MsgSetSendEnabledResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetSendEnabledResponse;
    fromJSON(_: any): MsgSetSendEnabledResponse;
    toJSON(_: MsgSetSendEnabledResponse): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): MsgSetSendEnabledResponse;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): MsgSetSendEnabledResponse;
};
/** Msg defines the bank Msg service. */
export interface Msg {
    /** Send defines a method for sending coins from one account to another account. */
    Send(request: MsgSend): Promise<MsgSendResponse>;
    /** MultiSend defines a method for sending coins from some accounts to other accounts. */
    MultiSend(request: MsgMultiSend): Promise<MsgMultiSendResponse>;
    /**
     * UpdateParams defines a governance operation for updating the x/bank module parameters.
     * The authority is defined in the keeper.
     *
     * Since: cosmos-sdk 0.47
     */
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    /**
     * SetSendEnabled is a governance operation for setting the SendEnabled flag
     * on any number of Denoms. Only the entries to add or update should be
     * included. Entries that already exist in the store, but that aren't
     * included in this message, will be left unchanged.
     *
     * Since: cosmos-sdk 0.47
     */
    SetSendEnabled(request: MsgSetSendEnabled): Promise<MsgSetSendEnabledResponse>;
}
export declare const MsgServiceName = "cosmos.bank.v1beta1.Msg";
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Send(request: MsgSend): Promise<MsgSendResponse>;
    MultiSend(request: MsgMultiSend): Promise<MsgMultiSendResponse>;
    UpdateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
    SetSendEnabled(request: MsgSetSendEnabled): Promise<MsgSetSendEnabledResponse>;
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
