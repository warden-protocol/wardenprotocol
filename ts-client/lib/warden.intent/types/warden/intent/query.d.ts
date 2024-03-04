import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Action, ActionStatus } from "./action";
import { Intent } from "./intent";
import { Params } from "./params";
export declare const protobufPackage = "warden.intent";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryActionsRequest {
    pagination: PageRequest | undefined;
}
export interface QueryActionsResponse {
    pagination: PageResponse | undefined;
    actions: Action[];
}
export interface QueryIntentsRequest {
    pagination: PageRequest | undefined;
}
export interface QueryIntentsResponse {
    pagination: PageResponse | undefined;
    intents: Intent[];
}
export interface QueryIntentByIdRequest {
    id: number;
}
export interface QueryIntentByIdResponse {
    intent: Intent | undefined;
}
export interface QueryActionsByAddressRequest {
    pagination: PageRequest | undefined;
    address: string;
    status: ActionStatus;
}
export interface QueryActionsByAddressResponse {
    pagination: PageResponse | undefined;
    actions: Action[];
}
export interface QueryActionByIdRequest {
    id: number;
}
export interface QueryActionByIdResponse {
    action: Action | undefined;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    create<I extends {
        params?: {};
    } & {
        params?: {} & {} & { [K in Exclude<keyof I["params"], never>]: never; };
    } & { [K_1 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryParamsResponse;
    fromPartial<I_1 extends {
        params?: {};
    } & {
        params?: {} & {} & { [K_2 in Exclude<keyof I_1["params"], never>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryParamsResponse;
};
export declare const QueryActionsRequest: {
    encode(message: QueryActionsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsRequest;
    fromJSON(object: any): QueryActionsRequest;
    toJSON(message: QueryActionsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryActionsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryActionsRequest;
};
export declare const QueryActionsResponse: {
    encode(message: QueryActionsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsResponse;
    fromJSON(object: any): QueryActionsResponse;
    toJSON(message: QueryActionsResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[] & ({
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
            }[] & ({
                address?: string;
                approvedAt?: Date;
            } & {
                address?: string;
                approvedAt?: Date;
            } & { [K_1 in Exclude<keyof I["actions"][number]["approvers"][number], keyof import("./action").Approver>]: never; })[] & { [K_2 in Exclude<keyof I["actions"][number]["approvers"], keyof {
                address?: string;
                approvedAt?: Date;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I["actions"][number]["msg"], keyof import("../../google/protobuf/any").Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I["actions"][number]["result"], keyof import("../../google/protobuf/any").Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date;
            updatedAt?: Date;
        } & { [K_5 in Exclude<keyof I["actions"][number], keyof Action>]: never; })[] & { [K_6 in Exclude<keyof I["actions"], keyof {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I, keyof QueryActionsResponse>]: never; }>(base?: I): QueryActionsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[] & ({
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
            }[] & ({
                address?: string;
                approvedAt?: Date;
            } & {
                address?: string;
                approvedAt?: Date;
            } & { [K_9 in Exclude<keyof I_1["actions"][number]["approvers"][number], keyof import("./action").Approver>]: never; })[] & { [K_10 in Exclude<keyof I_1["actions"][number]["approvers"], keyof {
                address?: string;
                approvedAt?: Date;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_11 in Exclude<keyof I_1["actions"][number]["msg"], keyof import("../../google/protobuf/any").Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_12 in Exclude<keyof I_1["actions"][number]["result"], keyof import("../../google/protobuf/any").Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date;
            updatedAt?: Date;
        } & { [K_13 in Exclude<keyof I_1["actions"][number], keyof Action>]: never; })[] & { [K_14 in Exclude<keyof I_1["actions"], keyof {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[]>]: never; };
    } & { [K_15 in Exclude<keyof I_1, keyof QueryActionsResponse>]: never; }>(object: I_1): QueryActionsResponse;
};
export declare const QueryIntentsRequest: {
    encode(message: QueryIntentsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentsRequest;
    fromJSON(object: any): QueryIntentsRequest;
    toJSON(message: QueryIntentsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryIntentsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryIntentsRequest;
};
export declare const QueryIntentsResponse: {
    encode(message: QueryIntentsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentsResponse;
    fromJSON(object: any): QueryIntentsResponse;
    toJSON(message: QueryIntentsResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        intents?: {
            id?: number;
            name?: string;
            definition?: string;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        intents?: {
            id?: number;
            name?: string;
            definition?: string;
        }[] & ({
            id?: number;
            name?: string;
            definition?: string;
        } & {
            id?: number;
            name?: string;
            definition?: string;
        } & { [K_1 in Exclude<keyof I["intents"][number], keyof Intent>]: never; })[] & { [K_2 in Exclude<keyof I["intents"], keyof {
            id?: number;
            name?: string;
            definition?: string;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryIntentsResponse>]: never; }>(base?: I): QueryIntentsResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        intents?: {
            id?: number;
            name?: string;
            definition?: string;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        intents?: {
            id?: number;
            name?: string;
            definition?: string;
        }[] & ({
            id?: number;
            name?: string;
            definition?: string;
        } & {
            id?: number;
            name?: string;
            definition?: string;
        } & { [K_5 in Exclude<keyof I_1["intents"][number], keyof Intent>]: never; })[] & { [K_6 in Exclude<keyof I_1["intents"], keyof {
            id?: number;
            name?: string;
            definition?: string;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryIntentsResponse>]: never; }>(object: I_1): QueryIntentsResponse;
};
export declare const QueryIntentByIdRequest: {
    encode(message: QueryIntentByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentByIdRequest;
    fromJSON(object: any): QueryIntentByIdRequest;
    toJSON(message: QueryIntentByIdRequest): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QueryIntentByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QueryIntentByIdRequest;
};
export declare const QueryIntentByIdResponse: {
    encode(message: QueryIntentByIdResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIntentByIdResponse;
    fromJSON(object: any): QueryIntentByIdResponse;
    toJSON(message: QueryIntentByIdResponse): unknown;
    create<I extends {
        intent?: {
            id?: number;
            name?: string;
            definition?: string;
        };
    } & {
        intent?: {
            id?: number;
            name?: string;
            definition?: string;
        } & {
            id?: number;
            name?: string;
            definition?: string;
        } & { [K in Exclude<keyof I["intent"], keyof Intent>]: never; };
    } & { [K_1 in Exclude<keyof I, "intent">]: never; }>(base?: I): QueryIntentByIdResponse;
    fromPartial<I_1 extends {
        intent?: {
            id?: number;
            name?: string;
            definition?: string;
        };
    } & {
        intent?: {
            id?: number;
            name?: string;
            definition?: string;
        } & {
            id?: number;
            name?: string;
            definition?: string;
        } & { [K_2 in Exclude<keyof I_1["intent"], keyof Intent>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "intent">]: never; }>(object: I_1): QueryIntentByIdResponse;
};
export declare const QueryActionsByAddressRequest: {
    encode(message: QueryActionsByAddressRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsByAddressRequest;
    fromJSON(object: any): QueryActionsByAddressRequest;
    toJSON(message: QueryActionsByAddressRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        address?: string;
        status?: ActionStatus;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        address?: string;
        status?: ActionStatus;
    } & { [K_1 in Exclude<keyof I, keyof QueryActionsByAddressRequest>]: never; }>(base?: I): QueryActionsByAddressRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        address?: string;
        status?: ActionStatus;
    } & {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        } & { [K_2 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        address?: string;
        status?: ActionStatus;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryActionsByAddressRequest>]: never; }>(object: I_1): QueryActionsByAddressRequest;
};
export declare const QueryActionsByAddressResponse: {
    encode(message: QueryActionsByAddressResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionsByAddressResponse;
    fromJSON(object: any): QueryActionsByAddressResponse;
    toJSON(message: QueryActionsByAddressResponse): unknown;
    create<I extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[] & ({
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
            }[] & ({
                address?: string;
                approvedAt?: Date;
            } & {
                address?: string;
                approvedAt?: Date;
            } & { [K_1 in Exclude<keyof I["actions"][number]["approvers"][number], keyof import("./action").Approver>]: never; })[] & { [K_2 in Exclude<keyof I["actions"][number]["approvers"], keyof {
                address?: string;
                approvedAt?: Date;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I["actions"][number]["msg"], keyof import("../../google/protobuf/any").Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I["actions"][number]["result"], keyof import("../../google/protobuf/any").Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date;
            updatedAt?: Date;
        } & { [K_5 in Exclude<keyof I["actions"][number], keyof Action>]: never; })[] & { [K_6 in Exclude<keyof I["actions"], keyof {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I, keyof QueryActionsByAddressResponse>]: never; }>(base?: I): QueryActionsByAddressResponse;
    fromPartial<I_1 extends {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[];
    } & {
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_8 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        actions?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[] & ({
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
            }[] & ({
                address?: string;
                approvedAt?: Date;
            } & {
                address?: string;
                approvedAt?: Date;
            } & { [K_9 in Exclude<keyof I_1["actions"][number]["approvers"][number], keyof import("./action").Approver>]: never; })[] & { [K_10 in Exclude<keyof I_1["actions"][number]["approvers"], keyof {
                address?: string;
                approvedAt?: Date;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_11 in Exclude<keyof I_1["actions"][number]["msg"], keyof import("../../google/protobuf/any").Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_12 in Exclude<keyof I_1["actions"][number]["result"], keyof import("../../google/protobuf/any").Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date;
            updatedAt?: Date;
        } & { [K_13 in Exclude<keyof I_1["actions"][number], keyof Action>]: never; })[] & { [K_14 in Exclude<keyof I_1["actions"], keyof {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        }[]>]: never; };
    } & { [K_15 in Exclude<keyof I_1, keyof QueryActionsByAddressResponse>]: never; }>(object: I_1): QueryActionsByAddressResponse;
};
export declare const QueryActionByIdRequest: {
    encode(message: QueryActionByIdRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionByIdRequest;
    fromJSON(object: any): QueryActionByIdRequest;
    toJSON(message: QueryActionByIdRequest): unknown;
    create<I extends {
        id?: number;
    } & {
        id?: number;
    } & { [K in Exclude<keyof I, "id">]: never; }>(base?: I): QueryActionByIdRequest;
    fromPartial<I_1 extends {
        id?: number;
    } & {
        id?: number;
    } & { [K_1 in Exclude<keyof I_1, "id">]: never; }>(object: I_1): QueryActionByIdRequest;
};
export declare const QueryActionByIdResponse: {
    encode(message: QueryActionByIdResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryActionByIdResponse;
    fromJSON(object: any): QueryActionByIdResponse;
    toJSON(message: QueryActionByIdResponse): unknown;
    create<I extends {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        };
    } & {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
            }[] & ({
                address?: string;
                approvedAt?: Date;
            } & {
                address?: string;
                approvedAt?: Date;
            } & { [K in Exclude<keyof I["action"]["approvers"][number], keyof import("./action").Approver>]: never; })[] & { [K_1 in Exclude<keyof I["action"]["approvers"], keyof {
                address?: string;
                approvedAt?: Date;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_2 in Exclude<keyof I["action"]["msg"], keyof import("../../google/protobuf/any").Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_3 in Exclude<keyof I["action"]["result"], keyof import("../../google/protobuf/any").Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date;
            updatedAt?: Date;
        } & { [K_4 in Exclude<keyof I["action"], keyof Action>]: never; };
    } & { [K_5 in Exclude<keyof I, "action">]: never; }>(base?: I): QueryActionByIdResponse;
    fromPartial<I_1 extends {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        };
    } & {
        action?: {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
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
            createdAt?: Date;
            updatedAt?: Date;
        } & {
            id?: number;
            approvers?: {
                address?: string;
                approvedAt?: Date;
            }[] & ({
                address?: string;
                approvedAt?: Date;
            } & {
                address?: string;
                approvedAt?: Date;
            } & { [K_6 in Exclude<keyof I_1["action"]["approvers"][number], keyof import("./action").Approver>]: never; })[] & { [K_7 in Exclude<keyof I_1["action"]["approvers"], keyof {
                address?: string;
                approvedAt?: Date;
            }[]>]: never; };
            status?: ActionStatus;
            intentId?: number;
            msg?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_8 in Exclude<keyof I_1["action"]["msg"], keyof import("../../google/protobuf/any").Any>]: never; };
            result?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_9 in Exclude<keyof I_1["action"]["result"], keyof import("../../google/protobuf/any").Any>]: never; };
            creator?: string;
            btl?: number;
            createdAt?: Date;
            updatedAt?: Date;
        } & { [K_10 in Exclude<keyof I_1["action"], keyof Action>]: never; };
    } & { [K_11 in Exclude<keyof I_1, "action">]: never; }>(object: I_1): QueryActionByIdResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a list of Actions items. */
    Actions(request: QueryActionsRequest): Promise<QueryActionsResponse>;
    /** Queries a list of Intents items. */
    Intents(request: QueryIntentsRequest): Promise<QueryIntentsResponse>;
    /** Queries a list of IntentById items. */
    IntentById(request: QueryIntentByIdRequest): Promise<QueryIntentByIdResponse>;
    /** Queries a list of Actions items by one participant address. */
    ActionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse>;
    ActionById(request: QueryActionByIdRequest): Promise<QueryActionByIdResponse>;
}
export declare const QueryServiceName = "warden.intent.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Actions(request: QueryActionsRequest): Promise<QueryActionsResponse>;
    Intents(request: QueryIntentsRequest): Promise<QueryIntentsResponse>;
    IntentById(request: QueryIntentByIdRequest): Promise<QueryIntentByIdResponse>;
    ActionsByAddress(request: QueryActionsByAddressRequest): Promise<QueryActionsByAddressResponse>;
    ActionById(request: QueryActionByIdRequest): Promise<QueryActionByIdResponse>;
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
