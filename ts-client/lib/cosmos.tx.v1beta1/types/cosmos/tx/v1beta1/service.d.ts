import _m0 from "protobufjs/minimal";
import { Block } from "../../../tendermint/types/block";
import { BlockID } from "../../../tendermint/types/types";
import { GasInfo, Result, TxResponse } from "../../base/abci/v1beta1/abci";
import { PageRequest, PageResponse } from "../../base/query/v1beta1/pagination";
import { Tx } from "./tx";
export declare const protobufPackage = "cosmos.tx.v1beta1";
/** OrderBy defines the sorting order */
export declare enum OrderBy {
    /**
     * ORDER_BY_UNSPECIFIED - ORDER_BY_UNSPECIFIED specifies an unknown sorting order. OrderBy defaults
     * to ASC in this case.
     */
    ORDER_BY_UNSPECIFIED = 0,
    /** ORDER_BY_ASC - ORDER_BY_ASC defines ascending order */
    ORDER_BY_ASC = 1,
    /** ORDER_BY_DESC - ORDER_BY_DESC defines descending order */
    ORDER_BY_DESC = 2,
    UNRECOGNIZED = -1
}
export declare function orderByFromJSON(object: any): OrderBy;
export declare function orderByToJSON(object: OrderBy): string;
/**
 * BroadcastMode specifies the broadcast mode for the TxService.Broadcast RPC
 * method.
 */
export declare enum BroadcastMode {
    /** BROADCAST_MODE_UNSPECIFIED - zero-value for mode ordering */
    BROADCAST_MODE_UNSPECIFIED = 0,
    /**
     * BROADCAST_MODE_BLOCK - DEPRECATED: use BROADCAST_MODE_SYNC instead,
     * BROADCAST_MODE_BLOCK is not supported by the SDK from v0.47.x onwards.
     *
     * @deprecated
     */
    BROADCAST_MODE_BLOCK = 1,
    /**
     * BROADCAST_MODE_SYNC - BROADCAST_MODE_SYNC defines a tx broadcasting mode where the client waits
     * for a CheckTx execution response only.
     */
    BROADCAST_MODE_SYNC = 2,
    /**
     * BROADCAST_MODE_ASYNC - BROADCAST_MODE_ASYNC defines a tx broadcasting mode where the client
     * returns immediately.
     */
    BROADCAST_MODE_ASYNC = 3,
    UNRECOGNIZED = -1
}
export declare function broadcastModeFromJSON(object: any): BroadcastMode;
export declare function broadcastModeToJSON(object: BroadcastMode): string;
/**
 * GetTxsEventRequest is the request type for the Service.TxsByEvents
 * RPC method.
 */
export interface GetTxsEventRequest {
    /**
     * events is the list of transaction event type.
     * Deprecated post v0.47.x: use query instead, which should contain a valid
     * events query.
     *
     * @deprecated
     */
    events: string[];
    /**
     * pagination defines a pagination for the request.
     * Deprecated post v0.46.x: use page and limit instead.
     *
     * @deprecated
     */
    pagination: PageRequest | undefined;
    orderBy: OrderBy;
    /**
     * page is the page number to query, starts at 1. If not provided, will
     * default to first page.
     */
    page: number;
    /**
     * limit is the total number of results to be returned in the result page.
     * If left empty it will default to a value to be set by each app.
     */
    limit: number;
    /**
     * query defines the transaction event query that is proxied to Tendermint's
     * TxSearch RPC method. The query must be valid.
     *
     * Since cosmos-sdk 0.50
     */
    query: string;
}
/**
 * GetTxsEventResponse is the response type for the Service.TxsByEvents
 * RPC method.
 */
export interface GetTxsEventResponse {
    /** txs is the list of queried transactions. */
    txs: Tx[];
    /** tx_responses is the list of queried TxResponses. */
    txResponses: TxResponse[];
    /**
     * pagination defines a pagination for the response.
     * Deprecated post v0.46.x: use total instead.
     *
     * @deprecated
     */
    pagination: PageResponse | undefined;
    /** total is total number of results available */
    total: number;
}
/**
 * BroadcastTxRequest is the request type for the Service.BroadcastTxRequest
 * RPC method.
 */
export interface BroadcastTxRequest {
    /** tx_bytes is the raw transaction. */
    txBytes: Uint8Array;
    mode: BroadcastMode;
}
/**
 * BroadcastTxResponse is the response type for the
 * Service.BroadcastTx method.
 */
export interface BroadcastTxResponse {
    /** tx_response is the queried TxResponses. */
    txResponse: TxResponse | undefined;
}
/**
 * SimulateRequest is the request type for the Service.Simulate
 * RPC method.
 */
export interface SimulateRequest {
    /**
     * tx is the transaction to simulate.
     * Deprecated. Send raw tx bytes instead.
     *
     * @deprecated
     */
    tx: Tx | undefined;
    /**
     * tx_bytes is the raw transaction.
     *
     * Since: cosmos-sdk 0.43
     */
    txBytes: Uint8Array;
}
/**
 * SimulateResponse is the response type for the
 * Service.SimulateRPC method.
 */
export interface SimulateResponse {
    /** gas_info is the information about gas used in the simulation. */
    gasInfo: GasInfo | undefined;
    /** result is the result of the simulation. */
    result: Result | undefined;
}
/**
 * GetTxRequest is the request type for the Service.GetTx
 * RPC method.
 */
export interface GetTxRequest {
    /** hash is the tx hash to query, encoded as a hex string. */
    hash: string;
}
/** GetTxResponse is the response type for the Service.GetTx method. */
export interface GetTxResponse {
    /** tx is the queried transaction. */
    tx: Tx | undefined;
    /** tx_response is the queried TxResponses. */
    txResponse: TxResponse | undefined;
}
/**
 * GetBlockWithTxsRequest is the request type for the Service.GetBlockWithTxs
 * RPC method.
 *
 * Since: cosmos-sdk 0.45.2
 */
export interface GetBlockWithTxsRequest {
    /** height is the height of the block to query. */
    height: number;
    /** pagination defines a pagination for the request. */
    pagination: PageRequest | undefined;
}
/**
 * GetBlockWithTxsResponse is the response type for the Service.GetBlockWithTxs
 * method.
 *
 * Since: cosmos-sdk 0.45.2
 */
export interface GetBlockWithTxsResponse {
    /** txs are the transactions in the block. */
    txs: Tx[];
    blockId: BlockID | undefined;
    block: Block | undefined;
    /** pagination defines a pagination for the response. */
    pagination: PageResponse | undefined;
}
/**
 * TxDecodeRequest is the request type for the Service.TxDecode
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeRequest {
    /** tx_bytes is the raw transaction. */
    txBytes: Uint8Array;
}
/**
 * TxDecodeResponse is the response type for the
 * Service.TxDecode method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeResponse {
    /** tx is the decoded transaction. */
    tx: Tx | undefined;
}
/**
 * TxEncodeRequest is the request type for the Service.TxEncode
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeRequest {
    /** tx is the transaction to encode. */
    tx: Tx | undefined;
}
/**
 * TxEncodeResponse is the response type for the
 * Service.TxEncode method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeResponse {
    /** tx_bytes is the encoded transaction bytes. */
    txBytes: Uint8Array;
}
/**
 * TxEncodeAminoRequest is the request type for the Service.TxEncodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeAminoRequest {
    aminoJson: string;
}
/**
 * TxEncodeAminoResponse is the response type for the Service.TxEncodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxEncodeAminoResponse {
    aminoBinary: Uint8Array;
}
/**
 * TxDecodeAminoRequest is the request type for the Service.TxDecodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeAminoRequest {
    aminoBinary: Uint8Array;
}
/**
 * TxDecodeAminoResponse is the response type for the Service.TxDecodeAmino
 * RPC method.
 *
 * Since: cosmos-sdk 0.47
 */
export interface TxDecodeAminoResponse {
    aminoJson: string;
}
export declare const GetTxsEventRequest: {
    encode(message: GetTxsEventRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetTxsEventRequest;
    fromJSON(object: any): GetTxsEventRequest;
    toJSON(message: GetTxsEventRequest): unknown;
    create<I extends {
        events?: string[];
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        orderBy?: OrderBy;
        page?: number;
        limit?: number;
        query?: string;
    } & {
        events?: string[] & string[] & { [K in Exclude<keyof I["events"], keyof string[]>]: never; };
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
        } & { [K_1 in Exclude<keyof I["pagination"], keyof PageRequest>]: never; };
        orderBy?: OrderBy;
        page?: number;
        limit?: number;
        query?: string;
    } & { [K_2 in Exclude<keyof I, keyof GetTxsEventRequest>]: never; }>(base?: I): GetTxsEventRequest;
    fromPartial<I_1 extends {
        events?: string[];
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        orderBy?: OrderBy;
        page?: number;
        limit?: number;
        query?: string;
    } & {
        events?: string[] & string[] & { [K_3 in Exclude<keyof I_1["events"], keyof string[]>]: never; };
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
        } & { [K_4 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        orderBy?: OrderBy;
        page?: number;
        limit?: number;
        query?: string;
    } & { [K_5 in Exclude<keyof I_1, keyof GetTxsEventRequest>]: never; }>(object: I_1): GetTxsEventRequest;
};
export declare const GetTxsEventResponse: {
    encode(message: GetTxsEventResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetTxsEventResponse;
    fromJSON(object: any): GetTxsEventResponse;
    toJSON(message: GetTxsEventResponse): unknown;
    create<I extends {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[];
        txResponses?: {
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
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        total?: number;
    } & {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[] & ({
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["txs"][number]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_1 in Exclude<keyof I["txs"][number]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_2 in Exclude<keyof I["txs"][number]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["txs"][number]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["txs"][number]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_5 in Exclude<keyof I["txs"][number]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["txs"][number]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_7 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_8 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_9 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_10 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_11 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_12 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_13 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_14 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_15 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_16 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_17 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_18 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_19 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_20 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_21 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_22 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_23 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_24 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_25 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_26 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_27 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_28 in Exclude<keyof I["txs"][number]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_29 in Exclude<keyof I["txs"][number]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_30 in Exclude<keyof I["txs"][number]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_31 in Exclude<keyof I["txs"][number]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_32 in Exclude<keyof I["txs"][number]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_33 in Exclude<keyof I["txs"][number]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_34 in Exclude<keyof I["txs"][number]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_35 in Exclude<keyof I["txs"][number]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_36 in Exclude<keyof I["txs"][number], keyof Tx>]: never; })[] & { [K_37 in Exclude<keyof I["txs"], keyof {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[]>]: never; };
        txResponses?: {
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
                    } & { [K_38 in Exclude<keyof I["txResponses"][number]["logs"][number]["events"][number]["attributes"][number], keyof import("../../base/abci/v1beta1/abci").Attribute>]: never; })[] & { [K_39 in Exclude<keyof I["txResponses"][number]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_40 in Exclude<keyof I["txResponses"][number]["logs"][number]["events"][number], keyof import("../../base/abci/v1beta1/abci").StringEvent>]: never; })[] & { [K_41 in Exclude<keyof I["txResponses"][number]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_42 in Exclude<keyof I["txResponses"][number]["logs"][number], keyof import("../../base/abci/v1beta1/abci").ABCIMessageLog>]: never; })[] & { [K_43 in Exclude<keyof I["txResponses"][number]["logs"], keyof {
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
            } & { [K_44 in Exclude<keyof I["txResponses"][number]["tx"], keyof import("../../../google/protobuf/any").Any>]: never; };
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
                } & { [K_45 in Exclude<keyof I["txResponses"][number]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_46 in Exclude<keyof I["txResponses"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_47 in Exclude<keyof I["txResponses"][number]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_48 in Exclude<keyof I["txResponses"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_49 in Exclude<keyof I["txResponses"][number], keyof TxResponse>]: never; })[] & { [K_50 in Exclude<keyof I["txResponses"], keyof {
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
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_51 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        total?: number;
    } & { [K_52 in Exclude<keyof I, keyof GetTxsEventResponse>]: never; }>(base?: I): GetTxsEventResponse;
    fromPartial<I_1 extends {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[];
        txResponses?: {
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
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        total?: number;
    } & {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[] & ({
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_53 in Exclude<keyof I_1["txs"][number]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_54 in Exclude<keyof I_1["txs"][number]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_55 in Exclude<keyof I_1["txs"][number]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_56 in Exclude<keyof I_1["txs"][number]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_57 in Exclude<keyof I_1["txs"][number]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_58 in Exclude<keyof I_1["txs"][number]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_59 in Exclude<keyof I_1["txs"][number]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_60 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_61 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_62 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_63 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_64 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_65 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_66 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_67 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_68 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_69 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_70 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_71 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_72 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_73 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_74 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_75 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_76 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_77 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_78 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_79 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_80 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_81 in Exclude<keyof I_1["txs"][number]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_82 in Exclude<keyof I_1["txs"][number]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_83 in Exclude<keyof I_1["txs"][number]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_84 in Exclude<keyof I_1["txs"][number]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_85 in Exclude<keyof I_1["txs"][number]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_86 in Exclude<keyof I_1["txs"][number]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_87 in Exclude<keyof I_1["txs"][number]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_88 in Exclude<keyof I_1["txs"][number]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_89 in Exclude<keyof I_1["txs"][number], keyof Tx>]: never; })[] & { [K_90 in Exclude<keyof I_1["txs"], keyof {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[]>]: never; };
        txResponses?: {
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
                    } & { [K_91 in Exclude<keyof I_1["txResponses"][number]["logs"][number]["events"][number]["attributes"][number], keyof import("../../base/abci/v1beta1/abci").Attribute>]: never; })[] & { [K_92 in Exclude<keyof I_1["txResponses"][number]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_93 in Exclude<keyof I_1["txResponses"][number]["logs"][number]["events"][number], keyof import("../../base/abci/v1beta1/abci").StringEvent>]: never; })[] & { [K_94 in Exclude<keyof I_1["txResponses"][number]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_95 in Exclude<keyof I_1["txResponses"][number]["logs"][number], keyof import("../../base/abci/v1beta1/abci").ABCIMessageLog>]: never; })[] & { [K_96 in Exclude<keyof I_1["txResponses"][number]["logs"], keyof {
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
            } & { [K_97 in Exclude<keyof I_1["txResponses"][number]["tx"], keyof import("../../../google/protobuf/any").Any>]: never; };
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
                } & { [K_98 in Exclude<keyof I_1["txResponses"][number]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_99 in Exclude<keyof I_1["txResponses"][number]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_100 in Exclude<keyof I_1["txResponses"][number]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_101 in Exclude<keyof I_1["txResponses"][number]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_102 in Exclude<keyof I_1["txResponses"][number], keyof TxResponse>]: never; })[] & { [K_103 in Exclude<keyof I_1["txResponses"], keyof {
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
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_104 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        total?: number;
    } & { [K_105 in Exclude<keyof I_1, keyof GetTxsEventResponse>]: never; }>(object: I_1): GetTxsEventResponse;
};
export declare const BroadcastTxRequest: {
    encode(message: BroadcastTxRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastTxRequest;
    fromJSON(object: any): BroadcastTxRequest;
    toJSON(message: BroadcastTxRequest): unknown;
    create<I extends {
        txBytes?: Uint8Array;
        mode?: BroadcastMode;
    } & {
        txBytes?: Uint8Array;
        mode?: BroadcastMode;
    } & { [K in Exclude<keyof I, keyof BroadcastTxRequest>]: never; }>(base?: I): BroadcastTxRequest;
    fromPartial<I_1 extends {
        txBytes?: Uint8Array;
        mode?: BroadcastMode;
    } & {
        txBytes?: Uint8Array;
        mode?: BroadcastMode;
    } & { [K_1 in Exclude<keyof I_1, keyof BroadcastTxRequest>]: never; }>(object: I_1): BroadcastTxRequest;
};
export declare const BroadcastTxResponse: {
    encode(message: BroadcastTxResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BroadcastTxResponse;
    fromJSON(object: any): BroadcastTxResponse;
    toJSON(message: BroadcastTxResponse): unknown;
    create<I extends {
        txResponse?: {
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
        };
    } & {
        txResponse?: {
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
                    } & { [K in Exclude<keyof I["txResponse"]["logs"][number]["events"][number]["attributes"][number], keyof import("../../base/abci/v1beta1/abci").Attribute>]: never; })[] & { [K_1 in Exclude<keyof I["txResponse"]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_2 in Exclude<keyof I["txResponse"]["logs"][number]["events"][number], keyof import("../../base/abci/v1beta1/abci").StringEvent>]: never; })[] & { [K_3 in Exclude<keyof I["txResponse"]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_4 in Exclude<keyof I["txResponse"]["logs"][number], keyof import("../../base/abci/v1beta1/abci").ABCIMessageLog>]: never; })[] & { [K_5 in Exclude<keyof I["txResponse"]["logs"], keyof {
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
            } & { [K_6 in Exclude<keyof I["txResponse"]["tx"], keyof import("../../../google/protobuf/any").Any>]: never; };
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
                } & { [K_7 in Exclude<keyof I["txResponse"]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_8 in Exclude<keyof I["txResponse"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_9 in Exclude<keyof I["txResponse"]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_10 in Exclude<keyof I["txResponse"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["txResponse"], keyof TxResponse>]: never; };
    } & { [K_12 in Exclude<keyof I, "txResponse">]: never; }>(base?: I): BroadcastTxResponse;
    fromPartial<I_1 extends {
        txResponse?: {
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
        };
    } & {
        txResponse?: {
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
                    } & { [K_13 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"][number]["attributes"][number], keyof import("../../base/abci/v1beta1/abci").Attribute>]: never; })[] & { [K_14 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_15 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"][number], keyof import("../../base/abci/v1beta1/abci").StringEvent>]: never; })[] & { [K_16 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_17 in Exclude<keyof I_1["txResponse"]["logs"][number], keyof import("../../base/abci/v1beta1/abci").ABCIMessageLog>]: never; })[] & { [K_18 in Exclude<keyof I_1["txResponse"]["logs"], keyof {
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
            } & { [K_19 in Exclude<keyof I_1["txResponse"]["tx"], keyof import("../../../google/protobuf/any").Any>]: never; };
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
                } & { [K_20 in Exclude<keyof I_1["txResponse"]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_21 in Exclude<keyof I_1["txResponse"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_22 in Exclude<keyof I_1["txResponse"]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_23 in Exclude<keyof I_1["txResponse"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_24 in Exclude<keyof I_1["txResponse"], keyof TxResponse>]: never; };
    } & { [K_25 in Exclude<keyof I_1, "txResponse">]: never; }>(object: I_1): BroadcastTxResponse;
};
export declare const SimulateRequest: {
    encode(message: SimulateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SimulateRequest;
    fromJSON(object: any): SimulateRequest;
    toJSON(message: SimulateRequest): unknown;
    create<I extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
        txBytes?: Uint8Array;
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_1 in Exclude<keyof I["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_2 in Exclude<keyof I["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_5 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_7 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_8 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_9 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_10 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_11 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_12 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_13 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_14 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_15 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_16 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_17 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_18 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_19 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_20 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_21 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_22 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_23 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_24 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_25 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_26 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_27 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_28 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_29 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_30 in Exclude<keyof I["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_31 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_32 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_33 in Exclude<keyof I["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_34 in Exclude<keyof I["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_35 in Exclude<keyof I["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_36 in Exclude<keyof I["tx"], keyof Tx>]: never; };
        txBytes?: Uint8Array;
    } & { [K_37 in Exclude<keyof I, keyof SimulateRequest>]: never; }>(base?: I): SimulateRequest;
    fromPartial<I_1 extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
        txBytes?: Uint8Array;
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_38 in Exclude<keyof I_1["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_39 in Exclude<keyof I_1["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_40 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_41 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_42 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_43 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_44 in Exclude<keyof I_1["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_45 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_46 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_47 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_48 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_49 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_50 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_51 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_52 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_53 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_54 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_55 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_56 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_57 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_58 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_59 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_60 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_61 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_62 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_63 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_64 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_65 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_66 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_67 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_68 in Exclude<keyof I_1["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_69 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_70 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_71 in Exclude<keyof I_1["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_72 in Exclude<keyof I_1["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_73 in Exclude<keyof I_1["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_74 in Exclude<keyof I_1["tx"], keyof Tx>]: never; };
        txBytes?: Uint8Array;
    } & { [K_75 in Exclude<keyof I_1, keyof SimulateRequest>]: never; }>(object: I_1): SimulateRequest;
};
export declare const SimulateResponse: {
    encode(message: SimulateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SimulateResponse;
    fromJSON(object: any): SimulateResponse;
    toJSON(message: SimulateResponse): unknown;
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
                } & { [K_1 in Exclude<keyof I["result"]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_2 in Exclude<keyof I["result"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_3 in Exclude<keyof I["result"]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_4 in Exclude<keyof I["result"]["events"], keyof {
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
            } & { [K_5 in Exclude<keyof I["result"]["msgResponses"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_6 in Exclude<keyof I["result"]["msgResponses"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
        } & { [K_7 in Exclude<keyof I["result"], keyof Result>]: never; };
    } & { [K_8 in Exclude<keyof I, keyof SimulateResponse>]: never; }>(base?: I): SimulateResponse;
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
                } & { [K_10 in Exclude<keyof I_1["result"]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_11 in Exclude<keyof I_1["result"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_12 in Exclude<keyof I_1["result"]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_13 in Exclude<keyof I_1["result"]["events"], keyof {
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
            } & { [K_14 in Exclude<keyof I_1["result"]["msgResponses"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_15 in Exclude<keyof I_1["result"]["msgResponses"], keyof {
                typeUrl?: string;
                value?: Uint8Array;
            }[]>]: never; };
        } & { [K_16 in Exclude<keyof I_1["result"], keyof Result>]: never; };
    } & { [K_17 in Exclude<keyof I_1, keyof SimulateResponse>]: never; }>(object: I_1): SimulateResponse;
};
export declare const GetTxRequest: {
    encode(message: GetTxRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetTxRequest;
    fromJSON(object: any): GetTxRequest;
    toJSON(message: GetTxRequest): unknown;
    create<I extends {
        hash?: string;
    } & {
        hash?: string;
    } & { [K in Exclude<keyof I, "hash">]: never; }>(base?: I): GetTxRequest;
    fromPartial<I_1 extends {
        hash?: string;
    } & {
        hash?: string;
    } & { [K_1 in Exclude<keyof I_1, "hash">]: never; }>(object: I_1): GetTxRequest;
};
export declare const GetTxResponse: {
    encode(message: GetTxResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetTxResponse;
    fromJSON(object: any): GetTxResponse;
    toJSON(message: GetTxResponse): unknown;
    create<I extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
        txResponse?: {
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
        };
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_1 in Exclude<keyof I["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_2 in Exclude<keyof I["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_5 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_7 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_8 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_9 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_10 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_11 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_12 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_13 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_14 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_15 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_16 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_17 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_18 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_19 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_20 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_21 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_22 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_23 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_24 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_25 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_26 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_27 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_28 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_29 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_30 in Exclude<keyof I["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_31 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_32 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_33 in Exclude<keyof I["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_34 in Exclude<keyof I["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_35 in Exclude<keyof I["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_36 in Exclude<keyof I["tx"], keyof Tx>]: never; };
        txResponse?: {
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
                    } & { [K_37 in Exclude<keyof I["txResponse"]["logs"][number]["events"][number]["attributes"][number], keyof import("../../base/abci/v1beta1/abci").Attribute>]: never; })[] & { [K_38 in Exclude<keyof I["txResponse"]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_39 in Exclude<keyof I["txResponse"]["logs"][number]["events"][number], keyof import("../../base/abci/v1beta1/abci").StringEvent>]: never; })[] & { [K_40 in Exclude<keyof I["txResponse"]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_41 in Exclude<keyof I["txResponse"]["logs"][number], keyof import("../../base/abci/v1beta1/abci").ABCIMessageLog>]: never; })[] & { [K_42 in Exclude<keyof I["txResponse"]["logs"], keyof {
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
            } & { [K_43 in Exclude<keyof I["txResponse"]["tx"], keyof import("../../../google/protobuf/any").Any>]: never; };
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
                } & { [K_44 in Exclude<keyof I["txResponse"]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_45 in Exclude<keyof I["txResponse"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_46 in Exclude<keyof I["txResponse"]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_47 in Exclude<keyof I["txResponse"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_48 in Exclude<keyof I["txResponse"], keyof TxResponse>]: never; };
    } & { [K_49 in Exclude<keyof I, keyof GetTxResponse>]: never; }>(base?: I): GetTxResponse;
    fromPartial<I_1 extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
        txResponse?: {
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
        };
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_50 in Exclude<keyof I_1["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_51 in Exclude<keyof I_1["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_52 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_53 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_54 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_55 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_56 in Exclude<keyof I_1["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_57 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_58 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_59 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_60 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_61 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_62 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_63 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_64 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_65 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_66 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_67 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_68 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_69 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_70 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_71 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_72 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_73 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_74 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_75 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_76 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_77 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_78 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_79 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_80 in Exclude<keyof I_1["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_81 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_82 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_83 in Exclude<keyof I_1["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_84 in Exclude<keyof I_1["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_85 in Exclude<keyof I_1["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_86 in Exclude<keyof I_1["tx"], keyof Tx>]: never; };
        txResponse?: {
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
                    } & { [K_87 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"][number]["attributes"][number], keyof import("../../base/abci/v1beta1/abci").Attribute>]: never; })[] & { [K_88 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"][number]["attributes"], keyof {
                        key?: string;
                        value?: string;
                    }[]>]: never; };
                } & { [K_89 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"][number], keyof import("../../base/abci/v1beta1/abci").StringEvent>]: never; })[] & { [K_90 in Exclude<keyof I_1["txResponse"]["logs"][number]["events"], keyof {
                    type?: string;
                    attributes?: {
                        key?: string;
                        value?: string;
                    }[];
                }[]>]: never; };
            } & { [K_91 in Exclude<keyof I_1["txResponse"]["logs"][number], keyof import("../../base/abci/v1beta1/abci").ABCIMessageLog>]: never; })[] & { [K_92 in Exclude<keyof I_1["txResponse"]["logs"], keyof {
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
            } & { [K_93 in Exclude<keyof I_1["txResponse"]["tx"], keyof import("../../../google/protobuf/any").Any>]: never; };
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
                } & { [K_94 in Exclude<keyof I_1["txResponse"]["events"][number]["attributes"][number], keyof import("../../../tendermint/abci/types").EventAttribute>]: never; })[] & { [K_95 in Exclude<keyof I_1["txResponse"]["events"][number]["attributes"], keyof {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[]>]: never; };
            } & { [K_96 in Exclude<keyof I_1["txResponse"]["events"][number], keyof import("../../../tendermint/abci/types").Event>]: never; })[] & { [K_97 in Exclude<keyof I_1["txResponse"]["events"], keyof {
                type?: string;
                attributes?: {
                    key?: string;
                    value?: string;
                    index?: boolean;
                }[];
            }[]>]: never; };
        } & { [K_98 in Exclude<keyof I_1["txResponse"], keyof TxResponse>]: never; };
    } & { [K_99 in Exclude<keyof I_1, keyof GetTxResponse>]: never; }>(object: I_1): GetTxResponse;
};
export declare const GetBlockWithTxsRequest: {
    encode(message: GetBlockWithTxsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockWithTxsRequest;
    fromJSON(object: any): GetBlockWithTxsRequest;
    toJSON(message: GetBlockWithTxsRequest): unknown;
    create<I extends {
        height?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        height?: number;
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
    } & { [K_1 in Exclude<keyof I, keyof GetBlockWithTxsRequest>]: never; }>(base?: I): GetBlockWithTxsRequest;
    fromPartial<I_1 extends {
        height?: number;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        height?: number;
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
    } & { [K_3 in Exclude<keyof I_1, keyof GetBlockWithTxsRequest>]: never; }>(object: I_1): GetBlockWithTxsRequest;
};
export declare const GetBlockWithTxsResponse: {
    encode(message: GetBlockWithTxsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetBlockWithTxsResponse;
    fromJSON(object: any): GetBlockWithTxsResponse;
    toJSON(message: GetBlockWithTxsResponse): unknown;
    create<I extends {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[];
        blockId?: {
            hash?: Uint8Array;
            partSetHeader?: {
                total?: number;
                hash?: Uint8Array;
            };
        };
        block?: {
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[] & ({
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["txs"][number]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_1 in Exclude<keyof I["txs"][number]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_2 in Exclude<keyof I["txs"][number]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["txs"][number]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["txs"][number]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_5 in Exclude<keyof I["txs"][number]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["txs"][number]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_7 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_8 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_9 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_10 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_11 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_12 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_13 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_14 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_15 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_16 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_17 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_18 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_19 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_20 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_21 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_22 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_23 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_24 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_25 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_26 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_27 in Exclude<keyof I["txs"][number]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_28 in Exclude<keyof I["txs"][number]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_29 in Exclude<keyof I["txs"][number]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_30 in Exclude<keyof I["txs"][number]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_31 in Exclude<keyof I["txs"][number]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_32 in Exclude<keyof I["txs"][number]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_33 in Exclude<keyof I["txs"][number]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_34 in Exclude<keyof I["txs"][number]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_35 in Exclude<keyof I["txs"][number]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_36 in Exclude<keyof I["txs"][number], keyof Tx>]: never; })[] & { [K_37 in Exclude<keyof I["txs"], keyof {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[]>]: never; };
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
            } & { [K_38 in Exclude<keyof I["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_39 in Exclude<keyof I["blockId"], keyof BlockID>]: never; };
        block?: {
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                } & { [K_40 in Exclude<keyof I["block"]["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_41 in Exclude<keyof I["block"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_42 in Exclude<keyof I["block"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_43 in Exclude<keyof I["block"]["header"], keyof import("../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_44 in Exclude<keyof I["block"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_45 in Exclude<keyof I["block"]["data"], "txs">]: never; };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                } & { [K_46 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_47 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_48 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../tendermint/types/types").Vote>]: never; };
                        voteB?: {
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                } & { [K_49 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_50 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_51 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_52 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                    } & { [K_53 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_54 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_55 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_56 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../tendermint/types/types").Header>]: never; };
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                        } & { [K_57 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_58 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
                                    signatures?: {
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[] & ({
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & {
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & { [K_59 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_60 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_61 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_62 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_63 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_64 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../tendermint/types/validator").Validator>]: never; })[] & { [K_65 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_66 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_67 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_68 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_69 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_70 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_71 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../tendermint/types/validator").Validator>]: never; })[] & { [K_72 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_73 in Exclude<keyof I["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_74 in Exclude<keyof I["block"]["evidence"]["evidence"][number], keyof import("../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_75 in Exclude<keyof I["block"]["evidence"]["evidence"], keyof {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
            } & { [K_76 in Exclude<keyof I["block"]["evidence"], "evidence">]: never; };
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
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                    } & { [K_77 in Exclude<keyof I["block"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_78 in Exclude<keyof I["block"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
                signatures?: {
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[] & ({
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & {
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & { [K_79 in Exclude<keyof I["block"]["lastCommit"]["signatures"][number], keyof import("../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_80 in Exclude<keyof I["block"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_81 in Exclude<keyof I["block"]["lastCommit"], keyof import("../../../tendermint/types/types").Commit>]: never; };
        } & { [K_82 in Exclude<keyof I["block"], keyof Block>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_83 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_84 in Exclude<keyof I, keyof GetBlockWithTxsResponse>]: never; }>(base?: I): GetBlockWithTxsResponse;
    fromPartial<I_1 extends {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[];
        blockId?: {
            hash?: Uint8Array;
            partSetHeader?: {
                total?: number;
                hash?: Uint8Array;
            };
        };
        block?: {
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[];
            };
        };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        txs?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[] & ({
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_85 in Exclude<keyof I_1["txs"][number]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_86 in Exclude<keyof I_1["txs"][number]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_87 in Exclude<keyof I_1["txs"][number]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_88 in Exclude<keyof I_1["txs"][number]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_89 in Exclude<keyof I_1["txs"][number]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_90 in Exclude<keyof I_1["txs"][number]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_91 in Exclude<keyof I_1["txs"][number]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_92 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_93 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_94 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_95 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_96 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_97 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_98 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_99 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_100 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_101 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_102 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_103 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_104 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_105 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_106 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_107 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_108 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_109 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_110 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_111 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_112 in Exclude<keyof I_1["txs"][number]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_113 in Exclude<keyof I_1["txs"][number]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_114 in Exclude<keyof I_1["txs"][number]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_115 in Exclude<keyof I_1["txs"][number]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_116 in Exclude<keyof I_1["txs"][number]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_117 in Exclude<keyof I_1["txs"][number]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_118 in Exclude<keyof I_1["txs"][number]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_119 in Exclude<keyof I_1["txs"][number]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_120 in Exclude<keyof I_1["txs"][number]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_121 in Exclude<keyof I_1["txs"][number], keyof Tx>]: never; })[] & { [K_122 in Exclude<keyof I_1["txs"], keyof {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        }[]>]: never; };
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
            } & { [K_123 in Exclude<keyof I_1["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
        } & { [K_124 in Exclude<keyof I_1["blockId"], keyof BlockID>]: never; };
        block?: {
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                } & { [K_125 in Exclude<keyof I_1["block"]["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
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
                    } & { [K_126 in Exclude<keyof I_1["block"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_127 in Exclude<keyof I_1["block"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                lastCommitHash?: Uint8Array;
                dataHash?: Uint8Array;
                validatorsHash?: Uint8Array;
                nextValidatorsHash?: Uint8Array;
                consensusHash?: Uint8Array;
                appHash?: Uint8Array;
                lastResultsHash?: Uint8Array;
                evidenceHash?: Uint8Array;
                proposerAddress?: Uint8Array;
            } & { [K_128 in Exclude<keyof I_1["block"]["header"], keyof import("../../../tendermint/types/types").Header>]: never; };
            data?: {
                txs?: Uint8Array[];
            } & {
                txs?: Uint8Array[] & Uint8Array[] & { [K_129 in Exclude<keyof I_1["block"]["data"]["txs"], keyof Uint8Array[]>]: never; };
            } & { [K_130 in Exclude<keyof I_1["block"]["data"], "txs">]: never; };
            evidence?: {
                evidence?: {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                } & { [K_131 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_132 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_133 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("../../../tendermint/types/types").Vote>]: never; };
                        voteB?: {
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                } & { [K_134 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                            } & { [K_135 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof BlockID>]: never; };
                            timestamp?: Date;
                            validatorAddress?: Uint8Array;
                            validatorIndex?: number;
                            signature?: Uint8Array;
                            extension?: Uint8Array;
                            extensionSignature?: Uint8Array;
                        } & { [K_136 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("../../../tendermint/types/types").Vote>]: never; };
                        totalVotingPower?: number;
                        validatorPower?: number;
                        timestamp?: Date;
                    } & { [K_137 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("../../../tendermint/types/evidence").DuplicateVoteEvidence>]: never; };
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                    } & { [K_138 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../../../tendermint/version/types").Consensus>]: never; };
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
                                        } & { [K_139 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_140 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof BlockID>]: never; };
                                    lastCommitHash?: Uint8Array;
                                    dataHash?: Uint8Array;
                                    validatorsHash?: Uint8Array;
                                    nextValidatorsHash?: Uint8Array;
                                    consensusHash?: Uint8Array;
                                    appHash?: Uint8Array;
                                    lastResultsHash?: Uint8Array;
                                    evidenceHash?: Uint8Array;
                                    proposerAddress?: Uint8Array;
                                } & { [K_141 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof import("../../../tendermint/types/types").Header>]: never; };
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                                        } & { [K_142 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                                    } & { [K_143 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof BlockID>]: never; };
                                    signatures?: {
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[] & ({
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & {
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    } & { [K_144 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_145 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                                        validatorAddress?: Uint8Array;
                                        timestamp?: Date;
                                        signature?: Uint8Array;
                                    }[]>]: never; };
                                } & { [K_146 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof import("../../../tendermint/types/types").Commit>]: never; };
                            } & { [K_147 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("../../../tendermint/types/types").SignedHeader>]: never; };
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
                                    } & { [K_148 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_149 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("../../../tendermint/types/validator").Validator>]: never; })[] & { [K_150 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
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
                                    } & { [K_151 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
                                    votingPower?: number;
                                    proposerPriority?: number;
                                } & { [K_152 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("../../../tendermint/types/validator").Validator>]: never; };
                                totalVotingPower?: number;
                            } & { [K_153 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("../../../tendermint/types/validator").ValidatorSet>]: never; };
                        } & { [K_154 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("../../../tendermint/types/types").LightBlock>]: never; };
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
                            } & { [K_155 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../../../tendermint/crypto/keys").PublicKey>]: never; };
                            votingPower?: number;
                            proposerPriority?: number;
                        } & { [K_156 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("../../../tendermint/types/validator").Validator>]: never; })[] & { [K_157 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
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
                    } & { [K_158 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("../../../tendermint/types/evidence").LightClientAttackEvidence>]: never; };
                } & { [K_159 in Exclude<keyof I_1["block"]["evidence"]["evidence"][number], keyof import("../../../tendermint/types/evidence").Evidence>]: never; })[] & { [K_160 in Exclude<keyof I_1["block"]["evidence"]["evidence"], keyof {
                    duplicateVoteEvidence?: {
                        voteA?: {
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                            type?: import("../../../tendermint/types/types").SignedMsgType;
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
                                        blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
            } & { [K_161 in Exclude<keyof I_1["block"]["evidence"], "evidence">]: never; };
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
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
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
                    } & { [K_162 in Exclude<keyof I_1["block"]["lastCommit"]["blockId"]["partSetHeader"], keyof import("../../../tendermint/types/types").PartSetHeader>]: never; };
                } & { [K_163 in Exclude<keyof I_1["block"]["lastCommit"]["blockId"], keyof BlockID>]: never; };
                signatures?: {
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[] & ({
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & {
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                } & { [K_164 in Exclude<keyof I_1["block"]["lastCommit"]["signatures"][number], keyof import("../../../tendermint/types/types").CommitSig>]: never; })[] & { [K_165 in Exclude<keyof I_1["block"]["lastCommit"]["signatures"], keyof {
                    blockIdFlag?: import("../../../tendermint/types/validator").BlockIDFlag;
                    validatorAddress?: Uint8Array;
                    timestamp?: Date;
                    signature?: Uint8Array;
                }[]>]: never; };
            } & { [K_166 in Exclude<keyof I_1["block"]["lastCommit"], keyof import("../../../tendermint/types/types").Commit>]: never; };
        } & { [K_167 in Exclude<keyof I_1["block"], keyof Block>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_168 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_169 in Exclude<keyof I_1, keyof GetBlockWithTxsResponse>]: never; }>(object: I_1): GetBlockWithTxsResponse;
};
export declare const TxDecodeRequest: {
    encode(message: TxDecodeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeRequest;
    fromJSON(object: any): TxDecodeRequest;
    toJSON(message: TxDecodeRequest): unknown;
    create<I extends {
        txBytes?: Uint8Array;
    } & {
        txBytes?: Uint8Array;
    } & { [K in Exclude<keyof I, "txBytes">]: never; }>(base?: I): TxDecodeRequest;
    fromPartial<I_1 extends {
        txBytes?: Uint8Array;
    } & {
        txBytes?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "txBytes">]: never; }>(object: I_1): TxDecodeRequest;
};
export declare const TxDecodeResponse: {
    encode(message: TxDecodeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeResponse;
    fromJSON(object: any): TxDecodeResponse;
    toJSON(message: TxDecodeResponse): unknown;
    create<I extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_1 in Exclude<keyof I["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_2 in Exclude<keyof I["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_5 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_7 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_8 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_9 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_10 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_11 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_12 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_13 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_14 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_15 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_16 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_17 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_18 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_19 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_20 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_21 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_22 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_23 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_24 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_25 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_26 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_27 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_28 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_29 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_30 in Exclude<keyof I["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_31 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_32 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_33 in Exclude<keyof I["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_34 in Exclude<keyof I["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_35 in Exclude<keyof I["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_36 in Exclude<keyof I["tx"], keyof Tx>]: never; };
    } & { [K_37 in Exclude<keyof I, "tx">]: never; }>(base?: I): TxDecodeResponse;
    fromPartial<I_1 extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_38 in Exclude<keyof I_1["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_39 in Exclude<keyof I_1["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_40 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_41 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_42 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_43 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_44 in Exclude<keyof I_1["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_45 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_46 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_47 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_48 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_49 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_50 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_51 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_52 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_53 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_54 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_55 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_56 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_57 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_58 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_59 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_60 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_61 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_62 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_63 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_64 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_65 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_66 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_67 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_68 in Exclude<keyof I_1["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_69 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_70 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_71 in Exclude<keyof I_1["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_72 in Exclude<keyof I_1["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_73 in Exclude<keyof I_1["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_74 in Exclude<keyof I_1["tx"], keyof Tx>]: never; };
    } & { [K_75 in Exclude<keyof I_1, "tx">]: never; }>(object: I_1): TxDecodeResponse;
};
export declare const TxEncodeRequest: {
    encode(message: TxEncodeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeRequest;
    fromJSON(object: any): TxEncodeRequest;
    toJSON(message: TxEncodeRequest): unknown;
    create<I extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K in Exclude<keyof I["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_1 in Exclude<keyof I["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_2 in Exclude<keyof I["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_3 in Exclude<keyof I["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_4 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_5 in Exclude<keyof I["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_6 in Exclude<keyof I["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_7 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_8 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_9 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_10 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_11 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_12 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_13 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_14 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_15 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_16 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_17 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_18 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_19 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_20 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_21 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_22 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_23 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_24 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_25 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_26 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_27 in Exclude<keyof I["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_28 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_29 in Exclude<keyof I["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_30 in Exclude<keyof I["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_31 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_32 in Exclude<keyof I["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_33 in Exclude<keyof I["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_34 in Exclude<keyof I["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_35 in Exclude<keyof I["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_36 in Exclude<keyof I["tx"], keyof Tx>]: never; };
    } & { [K_37 in Exclude<keyof I, "tx">]: never; }>(base?: I): TxEncodeRequest;
    fromPartial<I_1 extends {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        };
    } & {
        tx?: {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            };
            signatures?: Uint8Array[];
        } & {
            body?: {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[];
            } & {
                messages?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_38 in Exclude<keyof I_1["tx"]["body"]["messages"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_39 in Exclude<keyof I_1["tx"]["body"]["messages"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                memo?: string;
                timeoutHeight?: number;
                extensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_40 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_41 in Exclude<keyof I_1["tx"]["body"]["extensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
                nonCriticalExtensionOptions?: {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[] & ({
                    typeUrl?: string;
                    value?: Uint8Array;
                } & {
                    typeUrl?: string;
                    value?: Uint8Array;
                } & { [K_42 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"][number], keyof import("../../../google/protobuf/any").Any>]: never; })[] & { [K_43 in Exclude<keyof I_1["tx"]["body"]["nonCriticalExtensionOptions"], keyof {
                    typeUrl?: string;
                    value?: Uint8Array;
                }[]>]: never; };
            } & { [K_44 in Exclude<keyof I_1["tx"]["body"], keyof import("./tx").TxBody>]: never; };
            authInfo?: {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[];
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                };
            } & {
                signerInfos?: {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[] & ({
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                } & {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & {
                        typeUrl?: string;
                        value?: Uint8Array;
                    } & { [K_45 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["publicKey"], keyof import("../../../google/protobuf/any").Any>]: never; };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    } & {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        } & { [K_46 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["single"], "mode">]: never; };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & { [K_47 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                            modeInfos?: any[] & ({
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & {
                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                } & { [K_48 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    modeInfos?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & { [K_49 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                    modeInfos?: any[] & ({
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & {
                                            mode?: import("../signing/v1beta1/signing").SignMode;
                                        } & { [K_50 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            modeInfos?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & { [K_51 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["bitarray"], keyof import("../../crypto/multisig/v1beta1/multisig").CompactBitArray>]: never; };
                                            modeInfos?: any[] & ({
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: import("../signing/v1beta1/signing").SignMode;
                                                } & any & { [K_52 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["single"], "mode">]: never; };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    modeInfos?: any[];
                                                } & any & { [K_53 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                            } & { [K_54 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_55 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                        } & { [K_56 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                                    } & { [K_57 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_58 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"]["modeInfos"], keyof any[]>]: never; };
                                } & { [K_59 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                            } & { [K_60 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"][number], keyof import("./tx").ModeInfo>]: never; })[] & { [K_61 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"]["modeInfos"], keyof any[]>]: never; };
                        } & { [K_62 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"]["multi"], keyof import("./tx").ModeInfo_Multi>]: never; };
                    } & { [K_63 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number]["modeInfo"], keyof import("./tx").ModeInfo>]: never; };
                    sequence?: number;
                } & { [K_64 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"][number], keyof import("./tx").SignerInfo>]: never; })[] & { [K_65 in Exclude<keyof I_1["tx"]["authInfo"]["signerInfos"], keyof {
                    publicKey?: {
                        typeUrl?: string;
                        value?: Uint8Array;
                    };
                    modeInfo?: {
                        single?: {
                            mode?: import("../signing/v1beta1/signing").SignMode;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            modeInfos?: any[];
                        };
                    };
                    sequence?: number;
                }[]>]: never; };
                fee?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_66 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_67 in Exclude<keyof I_1["tx"]["authInfo"]["fee"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    gasLimit?: number;
                    payer?: string;
                    granter?: string;
                } & { [K_68 in Exclude<keyof I_1["tx"]["authInfo"]["fee"], keyof import("./tx").Fee>]: never; };
                tip?: {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    tipper?: string;
                } & {
                    amount?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_69 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"][number], keyof import("../../base/v1beta1/coin").Coin>]: never; })[] & { [K_70 in Exclude<keyof I_1["tx"]["authInfo"]["tip"]["amount"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    tipper?: string;
                } & { [K_71 in Exclude<keyof I_1["tx"]["authInfo"]["tip"], keyof import("./tx").Tip>]: never; };
            } & { [K_72 in Exclude<keyof I_1["tx"]["authInfo"], keyof import("./tx").AuthInfo>]: never; };
            signatures?: Uint8Array[] & Uint8Array[] & { [K_73 in Exclude<keyof I_1["tx"]["signatures"], keyof Uint8Array[]>]: never; };
        } & { [K_74 in Exclude<keyof I_1["tx"], keyof Tx>]: never; };
    } & { [K_75 in Exclude<keyof I_1, "tx">]: never; }>(object: I_1): TxEncodeRequest;
};
export declare const TxEncodeResponse: {
    encode(message: TxEncodeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeResponse;
    fromJSON(object: any): TxEncodeResponse;
    toJSON(message: TxEncodeResponse): unknown;
    create<I extends {
        txBytes?: Uint8Array;
    } & {
        txBytes?: Uint8Array;
    } & { [K in Exclude<keyof I, "txBytes">]: never; }>(base?: I): TxEncodeResponse;
    fromPartial<I_1 extends {
        txBytes?: Uint8Array;
    } & {
        txBytes?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "txBytes">]: never; }>(object: I_1): TxEncodeResponse;
};
export declare const TxEncodeAminoRequest: {
    encode(message: TxEncodeAminoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeAminoRequest;
    fromJSON(object: any): TxEncodeAminoRequest;
    toJSON(message: TxEncodeAminoRequest): unknown;
    create<I extends {
        aminoJson?: string;
    } & {
        aminoJson?: string;
    } & { [K in Exclude<keyof I, "aminoJson">]: never; }>(base?: I): TxEncodeAminoRequest;
    fromPartial<I_1 extends {
        aminoJson?: string;
    } & {
        aminoJson?: string;
    } & { [K_1 in Exclude<keyof I_1, "aminoJson">]: never; }>(object: I_1): TxEncodeAminoRequest;
};
export declare const TxEncodeAminoResponse: {
    encode(message: TxEncodeAminoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxEncodeAminoResponse;
    fromJSON(object: any): TxEncodeAminoResponse;
    toJSON(message: TxEncodeAminoResponse): unknown;
    create<I extends {
        aminoBinary?: Uint8Array;
    } & {
        aminoBinary?: Uint8Array;
    } & { [K in Exclude<keyof I, "aminoBinary">]: never; }>(base?: I): TxEncodeAminoResponse;
    fromPartial<I_1 extends {
        aminoBinary?: Uint8Array;
    } & {
        aminoBinary?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "aminoBinary">]: never; }>(object: I_1): TxEncodeAminoResponse;
};
export declare const TxDecodeAminoRequest: {
    encode(message: TxDecodeAminoRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeAminoRequest;
    fromJSON(object: any): TxDecodeAminoRequest;
    toJSON(message: TxDecodeAminoRequest): unknown;
    create<I extends {
        aminoBinary?: Uint8Array;
    } & {
        aminoBinary?: Uint8Array;
    } & { [K in Exclude<keyof I, "aminoBinary">]: never; }>(base?: I): TxDecodeAminoRequest;
    fromPartial<I_1 extends {
        aminoBinary?: Uint8Array;
    } & {
        aminoBinary?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, "aminoBinary">]: never; }>(object: I_1): TxDecodeAminoRequest;
};
export declare const TxDecodeAminoResponse: {
    encode(message: TxDecodeAminoResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TxDecodeAminoResponse;
    fromJSON(object: any): TxDecodeAminoResponse;
    toJSON(message: TxDecodeAminoResponse): unknown;
    create<I extends {
        aminoJson?: string;
    } & {
        aminoJson?: string;
    } & { [K in Exclude<keyof I, "aminoJson">]: never; }>(base?: I): TxDecodeAminoResponse;
    fromPartial<I_1 extends {
        aminoJson?: string;
    } & {
        aminoJson?: string;
    } & { [K_1 in Exclude<keyof I_1, "aminoJson">]: never; }>(object: I_1): TxDecodeAminoResponse;
};
/** Service defines a gRPC service for interacting with transactions. */
export interface Service {
    /** Simulate simulates executing a transaction for estimating gas usage. */
    Simulate(request: SimulateRequest): Promise<SimulateResponse>;
    /** GetTx fetches a tx by hash. */
    GetTx(request: GetTxRequest): Promise<GetTxResponse>;
    /** BroadcastTx broadcast transaction. */
    BroadcastTx(request: BroadcastTxRequest): Promise<BroadcastTxResponse>;
    /** GetTxsEvent fetches txs by event. */
    GetTxsEvent(request: GetTxsEventRequest): Promise<GetTxsEventResponse>;
    /**
     * GetBlockWithTxs fetches a block with decoded txs.
     *
     * Since: cosmos-sdk 0.45.2
     */
    GetBlockWithTxs(request: GetBlockWithTxsRequest): Promise<GetBlockWithTxsResponse>;
    /**
     * TxDecode decodes the transaction.
     *
     * Since: cosmos-sdk 0.47
     */
    TxDecode(request: TxDecodeRequest): Promise<TxDecodeResponse>;
    /**
     * TxEncode encodes the transaction.
     *
     * Since: cosmos-sdk 0.47
     */
    TxEncode(request: TxEncodeRequest): Promise<TxEncodeResponse>;
    /**
     * TxEncodeAmino encodes an Amino transaction from JSON to encoded bytes.
     *
     * Since: cosmos-sdk 0.47
     */
    TxEncodeAmino(request: TxEncodeAminoRequest): Promise<TxEncodeAminoResponse>;
    /**
     * TxDecodeAmino decodes an Amino transaction from encoded bytes to JSON.
     *
     * Since: cosmos-sdk 0.47
     */
    TxDecodeAmino(request: TxDecodeAminoRequest): Promise<TxDecodeAminoResponse>;
}
export declare const ServiceServiceName = "cosmos.tx.v1beta1.Service";
export declare class ServiceClientImpl implements Service {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Simulate(request: SimulateRequest): Promise<SimulateResponse>;
    GetTx(request: GetTxRequest): Promise<GetTxResponse>;
    BroadcastTx(request: BroadcastTxRequest): Promise<BroadcastTxResponse>;
    GetTxsEvent(request: GetTxsEventRequest): Promise<GetTxsEventResponse>;
    GetBlockWithTxs(request: GetBlockWithTxsRequest): Promise<GetBlockWithTxsResponse>;
    TxDecode(request: TxDecodeRequest): Promise<TxDecodeResponse>;
    TxEncode(request: TxEncodeRequest): Promise<TxEncodeResponse>;
    TxEncodeAmino(request: TxEncodeAminoRequest): Promise<TxEncodeAminoResponse>;
    TxDecodeAmino(request: TxDecodeAminoRequest): Promise<TxDecodeAminoResponse>;
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
