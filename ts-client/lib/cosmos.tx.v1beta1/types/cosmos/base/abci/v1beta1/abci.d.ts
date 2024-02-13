import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";
import { Event } from "../../../../tendermint/abci/types";
import { Block } from "../../../../tendermint/types/block";
export declare const protobufPackage = "cosmos.base.abci.v1beta1";
/**
 * TxResponse defines a structure containing relevant tx data and metadata. The
 * tags are stringified and the log is JSON decoded.
 */
export interface TxResponse {
    /** The block height */
    height: number;
    /** The transaction hash. */
    txhash: string;
    /** Namespace for the Code */
    codespace: string;
    /** Response code. */
    code: number;
    /** Result bytes, if any. */
    data: string;
    /**
     * The output of the application's logger (raw string). May be
     * non-deterministic.
     */
    rawLog: string;
    /** The output of the application's logger (typed). May be non-deterministic. */
    logs: ABCIMessageLog[];
    /** Additional information. May be non-deterministic. */
    info: string;
    /** Amount of gas requested for transaction. */
    gasWanted: number;
    /** Amount of gas consumed by transaction. */
    gasUsed: number;
    /** The request transaction bytes. */
    tx: Any | undefined;
    /**
     * Time of the previous block. For heights > 1, it's the weighted median of
     * the timestamps of the valid votes in the block.LastCommit. For height == 1,
     * it's genesis time.
     */
    timestamp: string;
    /**
     * Events defines all the events emitted by processing a transaction. Note,
     * these events include those emitted by processing all the messages and those
     * emitted from the ante. Whereas Logs contains the events, with
     * additional metadata, emitted only by processing the messages.
     *
     * Since: cosmos-sdk 0.42.11, 0.44.5, 0.45
     */
    events: Event[];
}
/** ABCIMessageLog defines a structure containing an indexed tx ABCI message log. */
export interface ABCIMessageLog {
    msgIndex: number;
    log: string;
    /**
     * Events contains a slice of Event objects that were emitted during some
     * execution.
     */
    events: StringEvent[];
}
/**
 * StringEvent defines en Event object wrapper where all the attributes
 * contain key/value pairs that are strings instead of raw bytes.
 */
export interface StringEvent {
    type: string;
    attributes: Attribute[];
}
/**
 * Attribute defines an attribute wrapper where the key and value are
 * strings instead of raw bytes.
 */
export interface Attribute {
    key: string;
    value: string;
}
/** GasInfo defines tx execution gas context. */
export interface GasInfo {
    /** GasWanted is the maximum units of work we allow this tx to perform. */
    gasWanted: number;
    /** GasUsed is the amount of gas actually consumed. */
    gasUsed: number;
}
/** Result is the union of ResponseFormat and ResponseCheckTx. */
export interface Result {
    /**
     * Data is any data returned from message or handler execution. It MUST be
     * length prefixed in order to separate data from multiple message executions.
     * Deprecated. This field is still populated, but prefer msg_response instead
     * because it also contains the Msg response typeURL.
     *
     * @deprecated
     */
    data: Uint8Array;
    /** Log contains the log information from message or handler execution. */
    log: string;
    /**
     * Events contains a slice of Event objects that were emitted during message
     * or handler execution.
     */
    events: Event[];
    /**
     * msg_responses contains the Msg handler responses type packed in Anys.
     *
     * Since: cosmos-sdk 0.46
     */
    msgResponses: Any[];
}
/**
 * SimulationResponse defines the response generated when a transaction is
 * successfully simulated.
 */
export interface SimulationResponse {
    gasInfo: GasInfo | undefined;
    result: Result | undefined;
}
/**
 * MsgData defines the data returned in a Result object during message
 * execution.
 *
 * @deprecated
 */
export interface MsgData {
    msgType: string;
    data: Uint8Array;
}
/**
 * TxMsgData defines a list of MsgData. A transaction will have a MsgData object
 * for each message.
 */
export interface TxMsgData {
    /**
     * data field is deprecated and not populated.
     *
     * @deprecated
     */
    data: MsgData[];
    /**
     * msg_responses contains the Msg handler responses packed into Anys.
     *
     * Since: cosmos-sdk 0.46
     */
    msgResponses: Any[];
}
/** SearchTxsResult defines a structure for querying txs pageable */
export interface SearchTxsResult {
    /** Count of all txs */
    totalCount: number;
    /** Count of txs in current page */
    count: number;
    /** Index of current page, start from 1 */
    pageNumber: number;
    /** Count of total pages */
    pageTotal: number;
    /** Max count txs per page */
    limit: number;
    /** List of txs in current page */
    txs: TxResponse[];
}
/** SearchBlocksResult defines a structure for querying blocks pageable */
export interface SearchBlocksResult {
    /** Count of all blocks */
    totalCount: number;
    /** Count of blocks in current page */
    count: number;
    /** Index of current page, start from 1 */
    pageNumber: number;
    /** Count of total pages */
    pageTotal: number;
    /** Max count blocks per page */
    limit: number;
    /** List of blocks in current page */
    blocks: Block[];
}
export declare const TxResponse: {
    encode(message: TxResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxResponse;
    fromJSON(object: any): TxResponse;
    toJSON(message: TxResponse): unknown;
    create<I extends {
        height?: number;
        txhash?: string;
        codespace?: string;
        code?: number;
        data?: string;
        rawLog?: string;
        logs?: {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        }[];
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        tx?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        timestamp?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
    } & {
        height?: number;
        txhash?: string;
        codespace?: string;
        code?: number;
        data?: string;
        rawLog?: string;
        logs?: {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        }[] & ({
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        } & {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[] & ({
                    key?: string;
                    value?: string;
                } & {
                    key?: string;
                    value?: string;
                } & { [K in Exclude<keyof I["logs"][number]["events"][number]["attributes"][number], keyof Attribute>]: never; })[] & { [K_1 in Exclude<keyof I["logs"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                }[]>]: never; };
            } & { [K_2 in Exclude<keyof I["logs"][number]["events"][number], keyof StringEvent>]: never; })[] & { [K_3 in Exclude<keyof I["logs"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[]>]: never; };
        } & { [K_4 in Exclude<keyof I["logs"][number], keyof ABCIMessageLog>]: never; })[] & { [K_5 in Exclude<keyof I["logs"], keyof {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        }[]>]: never; };
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        tx?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_6 in Exclude<keyof I["tx"], keyof Any>]: never; };
        timestamp?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K_7 in Exclude<keyof I["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_8 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_9 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_10 in Exclude<keyof I["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
    } & { [K_11 in Exclude<keyof I, keyof TxResponse>]: never; }>(base?: I): TxResponse;
    fromPartial<I_1 extends {
        height?: number;
        txhash?: string;
        codespace?: string;
        code?: number;
        data?: string;
        rawLog?: string;
        logs?: {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        }[];
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        tx?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        timestamp?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
    } & {
        height?: number;
        txhash?: string;
        codespace?: string;
        code?: number;
        data?: string;
        rawLog?: string;
        logs?: {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        }[] & ({
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        } & {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[] & ({
                    key?: string;
                    value?: string;
                } & {
                    key?: string;
                    value?: string;
                } & { [K_12 in Exclude<keyof I_1["logs"][number]["events"][number]["attributes"][number], keyof Attribute>]: never; })[] & { [K_13 in Exclude<keyof I_1["logs"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                }[]>]: never; };
            } & { [K_14 in Exclude<keyof I_1["logs"][number]["events"][number], keyof StringEvent>]: never; })[] & { [K_15 in Exclude<keyof I_1["logs"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[]>]: never; };
        } & { [K_16 in Exclude<keyof I_1["logs"][number], keyof ABCIMessageLog>]: never; })[] & { [K_17 in Exclude<keyof I_1["logs"], keyof {
            msgIndex?: number;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                }[];
            }[];
        }[]>]: never; };
        info?: string;
        gasWanted?: number;
        gasUsed?: number;
        tx?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_18 in Exclude<keyof I_1["tx"], keyof Any>]: never; };
        timestamp?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K_19 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_20 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_21 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_22 in Exclude<keyof I_1["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
    } & { [K_23 in Exclude<keyof I_1, keyof TxResponse>]: never; }>(object: I_1): TxResponse;
};
export declare const ABCIMessageLog: {
    encode(message: ABCIMessageLog, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ABCIMessageLog;
    fromJSON(object: any): ABCIMessageLog;
    toJSON(message: ABCIMessageLog): unknown;
    create<I extends {
        msgIndex?: number;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        }[];
    } & {
        msgIndex?: number;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[] & ({
                key?: string;
                value?: string;
            } & {
                key?: string;
                value?: string;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof Attribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["events"][number], keyof StringEvent>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof ABCIMessageLog>]: never; }>(base?: I): ABCIMessageLog;
    fromPartial<I_1 extends {
        msgIndex?: number;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        }[];
    } & {
        msgIndex?: number;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[] & ({
                key?: string;
                value?: string;
            } & {
                key?: string;
                value?: string;
            } & { [K_5 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof Attribute>]: never; })[] & { [K_6 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I_1["events"][number], keyof StringEvent>]: never; })[] & { [K_8 in Exclude<keyof I_1["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
            }[];
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof ABCIMessageLog>]: never; }>(object: I_1): ABCIMessageLog;
};
export declare const StringEvent: {
    encode(message: StringEvent, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StringEvent;
    fromJSON(object: any): StringEvent;
    toJSON(message: StringEvent): unknown;
    create<I extends {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
        }[];
    } & {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
        }[] & ({
            key?: string;
            value?: string;
        } & {
            key?: string;
            value?: string;
        } & { [K in Exclude<keyof I["attributes"][number], keyof Attribute>]: never; })[] & { [K_1 in Exclude<keyof I["attributes"], keyof {
            key?: string;
            value?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof StringEvent>]: never; }>(base?: I): StringEvent;
    fromPartial<I_1 extends {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
        }[];
    } & {
        type?: string;
        attributes?: {
            key?: string;
            value?: string;
        }[] & ({
            key?: string;
            value?: string;
        } & {
            key?: string;
            value?: string;
        } & { [K_3 in Exclude<keyof I_1["attributes"][number], keyof Attribute>]: never; })[] & { [K_4 in Exclude<keyof I_1["attributes"], keyof {
            key?: string;
            value?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof StringEvent>]: never; }>(object: I_1): StringEvent;
};
export declare const Attribute: {
    encode(message: Attribute, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Attribute;
    fromJSON(object: any): Attribute;
    toJSON(message: Attribute): unknown;
    create<I extends {
        key?: string;
        value?: string;
    } & {
        key?: string;
        value?: string;
    } & { [K in Exclude<keyof I, keyof Attribute>]: never; }>(base?: I): Attribute;
    fromPartial<I_1 extends {
        key?: string;
        value?: string;
    } & {
        key?: string;
        value?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof Attribute>]: never; }>(object: I_1): Attribute;
};
export declare const GasInfo: {
    encode(message: GasInfo, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GasInfo;
    fromJSON(object: any): GasInfo;
    toJSON(message: GasInfo): unknown;
    create<I extends {
        gasWanted?: number;
        gasUsed?: number;
    } & {
        gasWanted?: number;
        gasUsed?: number;
    } & { [K in Exclude<keyof I, keyof GasInfo>]: never; }>(base?: I): GasInfo;
    fromPartial<I_1 extends {
        gasWanted?: number;
        gasUsed?: number;
    } & {
        gasWanted?: number;
        gasUsed?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof GasInfo>]: never; }>(object: I_1): GasInfo;
};
export declare const Result: {
    encode(message: Result, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Result;
    fromJSON(object: any): Result;
    toJSON(message: Result): unknown;
    create<I extends {
        data?: Uint8Array;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        data?: Uint8Array;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K in Exclude<keyof I["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_1 in Exclude<keyof I["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_2 in Exclude<keyof I["events"][number], keyof Event>]: never; })[] & { [K_3 in Exclude<keyof I["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_4 in Exclude<keyof I["msgResponses"][number], keyof Any>]: never; })[] & { [K_5 in Exclude<keyof I["msgResponses"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof Result>]: never; }>(base?: I): Result;
    fromPartial<I_1 extends {
        data?: Uint8Array;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[];
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        data?: Uint8Array;
        log?: string;
        events?: {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[] & ({
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        } & {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[] & ({
                key?: string;
                value?: string;
                index?: boolean;
            } & {
                key?: string;
                value?: string;
                index?: boolean;
            } & { [K_7 in Exclude<keyof I_1["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_8 in Exclude<keyof I_1["events"][number]["attributes"], keyof {
                key?: string;
                value?: string;
                index?: boolean;
            }[]>]: never; };
        } & { [K_9 in Exclude<keyof I_1["events"][number], keyof Event>]: never; })[] & { [K_10 in Exclude<keyof I_1["events"], keyof {
            type?: string;
            attributes?: {
                key?: string;
                value?: string;
                index?: boolean;
            }[];
        }[]>]: never; };
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_11 in Exclude<keyof I_1["msgResponses"][number], keyof Any>]: never; })[] & { [K_12 in Exclude<keyof I_1["msgResponses"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof Result>]: never; }>(object: I_1): Result;
};
export declare const SimulationResponse: {
    encode(message: SimulationResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SimulationResponse;
    fromJSON(object: any): SimulationResponse;
    toJSON(message: SimulationResponse): unknown;
    create<I extends {
        gasInfo?: {
            gasWanted?: number;
            gasUsed?: number;
        };
        result?: {
            data?: Uint8Array;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            msgResponses?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
        };
    } & {
        gasInfo?: {
            gasWanted?: number;
            gasUsed?: number;
        } & {
            gasWanted?: number;
            gasUsed?: number;
        } & { [K in Exclude<keyof I["gasInfo"], keyof GasInfo>]: never; };
        result?: {
            data?: Uint8Array;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            msgResponses?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
        } & {
            data?: Uint8Array;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_1 in Exclude<keyof I["result"]["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_2 in Exclude<keyof I["result"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_3 in Exclude<keyof I["result"]["events"][number], keyof Event>]: never; })[] & { [K_4 in Exclude<keyof I["result"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            msgResponses?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_5 in Exclude<keyof I["result"]["msgResponses"][number], keyof Any>]: never; })[] & { [K_6 in Exclude<keyof I["result"]["msgResponses"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I["result"], keyof Result>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof SimulationResponse>]: never; }>(base?: I): SimulationResponse;
    fromPartial<I_1 extends {
        gasInfo?: {
            gasWanted?: number;
            gasUsed?: number;
        };
        result?: {
            data?: Uint8Array;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            msgResponses?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
        };
    } & {
        gasInfo?: {
            gasWanted?: number;
            gasUsed?: number;
        } & {
            gasWanted?: number;
            gasUsed?: number;
        } & { [K_9 in Exclude<keyof I_1["gasInfo"], keyof GasInfo>]: never; };
        result?: {
            data?: Uint8Array;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
            msgResponses?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[];
        } & {
            data?: Uint8Array;
            log?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_10 in Exclude<keyof I_1["result"]["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_11 in Exclude<keyof I_1["result"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_12 in Exclude<keyof I_1["result"]["events"][number], keyof Event>]: never; })[] & { [K_13 in Exclude<keyof I_1["result"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
            msgResponses?: {
                typeUrl?: string;
                value?: Uint8Array;
            }[] & ({
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_14 in Exclude<keyof I_1["result"]["msgResponses"][number], keyof Any>]: never; })[] & { [K_15 in Exclude<keyof I_1["result"]["msgResponses"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
        } & { [K_16 in Exclude<keyof I_1["result"], keyof Result>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof SimulationResponse>]: never; }>(object: I_1): SimulationResponse;
};
export declare const MsgData: {
    encode(message: MsgData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgData;
    fromJSON(object: any): MsgData;
    toJSON(message: MsgData): unknown;
    create<I extends {
        msgType?: string;
        data?: Uint8Array;
    } & {
        msgType?: string;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof MsgData>]: never; }>(base?: I): MsgData;
    fromPartial<I_1 extends {
        msgType?: string;
        data?: Uint8Array;
    } & {
        msgType?: string;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof MsgData>]: never; }>(object: I_1): MsgData;
};
export declare const TxMsgData: {
    encode(message: TxMsgData, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxMsgData;
    fromJSON(object: any): TxMsgData;
    toJSON(message: TxMsgData): unknown;
    create<I extends {
        data?: {
            msgType?: string;
            data?: Uint8Array;
        }[];
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        data?: {
            msgType?: string;
            data?: Uint8Array;
        }[] & ({
            msgType?: string;
            data?: Uint8Array;
        } & {
            msgType?: string;
            data?: Uint8Array;
        } & { [K in Exclude<keyof I["data"][number], keyof MsgData>]: never; })[] & { [K_1 in Exclude<keyof I["data"], keyof {
            msgType?: string;
            data?: Uint8Array;
        }[]>]: never; };
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_2 in Exclude<keyof I["msgResponses"][number], keyof Any>]: never; })[] & { [K_3 in Exclude<keyof I["msgResponses"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof TxMsgData>]: never; }>(base?: I): TxMsgData;
    fromPartial<I_1 extends {
        data?: {
            msgType?: string;
            data?: Uint8Array;
        }[];
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[];
    } & {
        data?: {
            msgType?: string;
            data?: Uint8Array;
        }[] & ({
            msgType?: string;
            data?: Uint8Array;
        } & {
            msgType?: string;
            data?: Uint8Array;
        } & { [K_5 in Exclude<keyof I_1["data"][number], keyof MsgData>]: never; })[] & { [K_6 in Exclude<keyof I_1["data"], keyof {
            msgType?: string;
            data?: Uint8Array;
        }[]>]: never; };
        msgResponses?: {
            typeUrl?: string;
            value?: Uint8Array;
        }[] & ({
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_7 in Exclude<keyof I_1["msgResponses"][number], keyof Any>]: never; })[] & { [K_8 in Exclude<keyof I_1["msgResponses"], keyof {
            typeUrl?: string;
            value?: Uint8Array;
        }[]>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof TxMsgData>]: never; }>(object: I_1): TxMsgData;
};
export declare const SearchTxsResult: {
    encode(message: SearchTxsResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SearchTxsResult;
    fromJSON(object: any): SearchTxsResult;
    toJSON(message: SearchTxsResult): unknown;
    create<I extends {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        txs?: {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        }[];
    } & {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        txs?: {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        }[] & ({
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        } & {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[] & ({
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            } & {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[] & ({
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                } & {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[] & ({
                        key?: string;
                        value?: string;
                    } & {
                        key?: string;
                        value?: string;
                    } & { [K in Exclude<keyof I["txs"][number]["logs"][number]["events"][number]["attributes"][number], keyof Attribute>]: never; })[] & { [K_1 in Exclude<keyof I["txs"][number]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_2 in Exclude<keyof I["txs"][number]["logs"][number]["events"][number], keyof StringEvent>]: never; })[] & { [K_3 in Exclude<keyof I["txs"][number]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_4 in Exclude<keyof I["txs"][number]["logs"][number], keyof ABCIMessageLog>]: never; })[] & { [K_5 in Exclude<keyof I["txs"][number]["logs"], keyof {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[]>]: never; };
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_6 in Exclude<keyof I["txs"][number]["tx"], keyof Any>]: never; };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_7 in Exclude<keyof I["txs"][number]["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_8 in Exclude<keyof I["txs"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_9 in Exclude<keyof I["txs"][number]["events"][number], keyof Event>]: never; })[] & { [K_10 in Exclude<keyof I["txs"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["txs"][number], keyof TxResponse>]: never; })[] & { [K_12 in Exclude<keyof I["txs"], keyof {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        }[]>]: never; };
    } & { [K_13 in Exclude<keyof I, keyof SearchTxsResult>]: never; }>(base?: I): SearchTxsResult;
    fromPartial<I_1 extends {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        txs?: {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        }[];
    } & {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        txs?: {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        }[] & ({
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        } & {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[] & ({
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            } & {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[] & ({
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                } & {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[] & ({
                        key?: string;
                        value?: string;
                    } & {
                        key?: string;
                        value?: string;
                    } & { [K_14 in Exclude<keyof I_1["txs"][number]["logs"][number]["events"][number]["attributes"][number], keyof Attribute>]: never; })[] & { [K_15 in Exclude<keyof I_1["txs"][number]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_16 in Exclude<keyof I_1["txs"][number]["logs"][number]["events"][number], keyof StringEvent>]: never; })[] & { [K_17 in Exclude<keyof I_1["txs"][number]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_18 in Exclude<keyof I_1["txs"][number]["logs"][number], keyof ABCIMessageLog>]: never; })[] & { [K_19 in Exclude<keyof I_1["txs"][number]["logs"], keyof {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[]>]: never; };
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_20 in Exclude<keyof I_1["txs"][number]["tx"], keyof Any>]: never; };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[] & ({
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            } & {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[] & ({
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & {
                    key?: string;
                    value?: string;
                    index?: boolean;
                } & { [K_21 in Exclude<keyof I_1["txs"][number]["events"][number]["attributes"][number], keyof import("../../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_22 in Exclude<keyof I_1["txs"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_23 in Exclude<keyof I_1["txs"][number]["events"][number], keyof Event>]: never; })[] & { [K_24 in Exclude<keyof I_1["txs"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_25 in Exclude<keyof I_1["txs"][number], keyof TxResponse>]: never; })[] & { [K_26 in Exclude<keyof I_1["txs"], keyof {
            height?: number;
            txhash?: string;
            codespace?: string;
            code?: number;
            data?: string;
            rawLog?: string;
            logs?: {
                msgIndex?: number;
                log?: string;
                events?: {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[];
            }[];
            info?: string;
            gasWanted?: number;
            gasUsed?: number;
            tx?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            timestamp?: string;
            events?: {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[];
        }[]>]: never; };
    } & { [K_27 in Exclude<keyof I_1, keyof SearchTxsResult>]: never; }>(object: I_1): SearchTxsResult;
};
export declare const SearchBlocksResult: {
    encode(message: SearchBlocksResult, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SearchBlocksResult;
    fromJSON(object: any): SearchBlocksResult;
    toJSON(message: SearchBlocksResult): unknown;
    create<I extends {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        blocks?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        }[];
    } & {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        blocks?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        }[] & ({
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        } & {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K in Exclude<keyof I["blocks"][number]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                } & {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    } & {
                        total?: number;
                        hash?: Uint8Array;
                    } & { [K_1 in Exclude<keyof I["blocks"][number]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_2 in Exclude<keyof I["blocks"][number]["header"]["lastBlockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_3 in Exclude<keyof I["blocks"][number]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_4 in Exclude<keyof I["blocks"][number]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_5 in Exclude<keyof I["blocks"][number]["data"], "txs">]: never; };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            } & {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[] & ({
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                } & {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            } & {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & { [K_6 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_7 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_8 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            } & {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & { [K_9 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_10 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_11 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_12 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    } & {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        } & {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            } & {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    } & {
                                        block?: number;
                                        app?: number;
                                    } & { [K_13 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    } & {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & { [K_14 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_15 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_16 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                } & {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    } & {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & { [K_17 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_18 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[] & ({
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & { [K_19 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_20 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_21 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_22 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            } & {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[] & ({
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & { [K_23 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_24 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_25 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[]>]: never; };
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & { [K_26 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_27 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_28 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_29 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[] & ({
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            } & {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            } & { [K_30 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_31 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_32 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[]>]: never; };
                        totalVotingPower?: number;
                        timestamp?: Date;
                    } & { [K_33 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_34 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_35 in Exclude<keyof I["blocks"][number]["evidence"]["evidence"], keyof {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[]>]: never; };
            } & { [K_36 in Exclude<keyof I["blocks"][number]["evidence"], "evidence">]: never; };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            } & {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                } & {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    } & {
                        total?: number;
                        hash?: Uint8Array;
                    } & { [K_37 in Exclude<keyof I["blocks"][number]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_38 in Exclude<keyof I["blocks"][number]["lastCommit"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[] & ({
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & { [K_39 in Exclude<keyof I["blocks"][number]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_40 in Exclude<keyof I["blocks"][number]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_41 in Exclude<keyof I["blocks"][number]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_42 in Exclude<keyof I["blocks"][number], keyof Block>]: never; })[] & { [K_43 in Exclude<keyof I["blocks"], keyof {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        }[]>]: never; };
    } & { [K_44 in Exclude<keyof I, keyof SearchBlocksResult>]: never; }>(base?: I): SearchBlocksResult;
    fromPartial<I_1 extends {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        blocks?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        }[];
    } & {
        totalCount?: number;
        count?: number;
        pageNumber?: number;
        pageTotal?: number;
        limit?: number;
        blocks?: {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        }[] & ({
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        } & {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & {
                version?: {
                    block?: number;
                    app?: number;
                } & {
                    block?: number;
                    app?: number;
                } & { [K_45 in Exclude<keyof I_1["blocks"][number]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                } & {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    } & {
                        total?: number;
                        hash?: Uint8Array;
                    } & { [K_46 in Exclude<keyof I_1["blocks"][number]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_47 in Exclude<keyof I_1["blocks"][number]["header"]["lastBlockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_48 in Exclude<keyof I_1["blocks"][number]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_49 in Exclude<keyof I_1["blocks"][number]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_50 in Exclude<keyof I_1["blocks"][number]["data"], "txs">]: never; };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            } & {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[] & ({
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                } & {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            } & {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & { [K_51 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_52 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_53 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            } & {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & {
                                    total?: number;
                                    hash?: Uint8Array;
                                } & { [K_54 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_55 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_56 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_57 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    } & {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        } & {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            } & {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    } & {
                                        block?: number;
                                        app?: number;
                                    } & { [K_58 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../../tendermint/version/types").Consensus>]: never; };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    } & {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & { [K_59 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_60 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_61 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../../tendermint/types/types").Header>]: never; };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                } & {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    } & {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & {
                                            total?: number;
                                            hash?: Uint8Array;
                                        } & { [K_62 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_63 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[] & ({
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & { [K_64 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_65 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_66 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_67 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../../tendermint/types/types").SignedHeader>]: never; };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            } & {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[] & ({
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & { [K_68 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_69 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_70 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[]>]: never; };
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    } & { [K_71 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_72 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_73 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_74 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../../tendermint/types/types").LightBlock>]: never; };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[] & ({
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            } & {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            } & { [K_75 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_76 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../../tendermint/types/validator").Validator>]: never; })[] & { [K_77 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[]>]: never; };
                        totalVotingPower?: number;
                        timestamp?: Date;
                    } & { [K_78 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_79 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"][number], keyof import("../../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_80 in Exclude<keyof I_1["blocks"][number]["evidence"]["evidence"], keyof {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[]>]: never; };
            } & { [K_81 in Exclude<keyof I_1["blocks"][number]["evidence"], "evidence">]: never; };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            } & {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                } & {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    } & {
                        total?: number;
                        hash?: Uint8Array;
                    } & { [K_82 in Exclude<keyof I_1["blocks"][number]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_83 in Exclude<keyof I_1["blocks"][number]["lastCommit"]["blockId"], keyof import("../../../../tendermint/types/types").BlockID>]: never; };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[] & ({
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & { [K_84 in Exclude<keyof I_1["blocks"][number]["lastCommit"]["signatures"][number], keyof import("../../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_85 in Exclude<keyof I_1["blocks"][number]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_86 in Exclude<keyof I_1["blocks"][number]["lastCommit"], keyof import("../../../../tendermint/types/types").Commit>]: never; };
        } & { [K_87 in Exclude<keyof I_1["blocks"][number], keyof Block>]: never; })[] & { [K_88 in Exclude<keyof I_1["blocks"], keyof {
            header?: {
                version?: {
                    block?: number;
                    app?: number;
                };
                chainId?: string;
                height?: number;
                time?: Date;
                lastBlockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            };
            data?: {
                txs?: Uint8Array[];
            };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        voteB?: {
                            type?: import("../../../../tendermint/types/types").SignedMsgType;
                            height?: number;
                            round?: number;
                            blockId?: {
                                hash?: Uint8Array;
                                partSetHeader?: {
                                    total?: number;
                                    hash?: Uint8Array;
                                };
                            };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    };
                    lightClientAttackEvidence?: {
                        conflictingBlock?: {
                            signedHeader?: {
                                header?: {
                                    version?: {
                                        block?: number;
                                        app?: number;
                                    };
                                    chainId?: string;
                                    height?: number;
                                    time?: Date;
                                    lastBlockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                };
                                commit?: {
                                    height?: number;
                                    round?: number;
                                    blockId?: {
                                        hash?: Uint8Array;
                                        partSetHeader?: {
                                            total?: number;
                                            hash?: Uint8Array;
                                        };
                                    };
                                    signatures?: {
                                        blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[];
                                };
                            };
                            validatorSet?: {
                                validators?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                }[];
                                proposer?: {
                                    address?: Uint8Array;
                                    pubKey?: {
                                        ed25519?: Uint8Array;
                                        secp256k1?: Uint8Array;
                                    };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                };
                                totalVotingPower?: number;
                            };
                        };
                        commonHeight?: number;
                        byzantineValidators?: {
                            address?: Uint8Array;
                            pubKey?: {
                                ed25519?: Uint8Array;
                                secp256k1?: Uint8Array;
                            };
                            votingPower?: number;
                            proposerPriority?: number;
                        }[];
                        totalVotingPower?: number;
                        timestamp?: Date;
                    };
                }[];
            };
            lastCommit?: {
                height?: number;
                round?: number;
                blockId?: {
                    hash?: Uint8Array;
                    partSetHeader?: {
                        total?: number;
                        hash?: Uint8Array;
                    };
                };
                signatures?: {
                    blockIdFlag?: import("../../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        }[]>]: never; };
    } & { [K_89 in Exclude<keyof I_1, keyof SearchBlocksResult>]: never; }>(object: I_1): SearchBlocksResult;
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
