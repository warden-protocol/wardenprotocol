import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../../../../cosmos/base/v1beta1/coin";
import { PacketId } from "../../../core/channel/v1/channel";
import { IdentifiedPacketFees } from "./fee";
import { FeeEnabledChannel } from "./genesis";
export declare const protobufPackage = "ibc.applications.fee.v1";
/** QueryIncentivizedPacketsRequest defines the request type for the IncentivizedPackets rpc */
export interface QueryIncentivizedPacketsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
    /** block height at which to query */
    queryHeight: number;
}
/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPackets rpc */
export interface QueryIncentivizedPacketsResponse {
    /** list of identified fees for incentivized packets */
    incentivizedPackets: IdentifiedPacketFees[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryIncentivizedPacketRequest defines the request type for the IncentivizedPacket rpc */
export interface QueryIncentivizedPacketRequest {
    /** unique packet identifier comprised of channel ID, port ID and sequence */
    packetId: PacketId | undefined;
    /** block height at which to query */
    queryHeight: number;
}
/** QueryIncentivizedPacketsResponse defines the response type for the IncentivizedPacket rpc */
export interface QueryIncentivizedPacketResponse {
    /** the identified fees for the incentivized packet */
    incentivizedPacket: IdentifiedPacketFees | undefined;
}
/**
 * QueryIncentivizedPacketsForChannelRequest defines the request type for querying for all incentivized packets
 * for a specific channel
 */
export interface QueryIncentivizedPacketsForChannelRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
    portId: string;
    channelId: string;
    /** Height to query at */
    queryHeight: number;
}
/** QueryIncentivizedPacketsResponse defines the response type for the incentivized packets RPC */
export interface QueryIncentivizedPacketsForChannelResponse {
    /** Map of all incentivized_packets */
    incentivizedPackets: IdentifiedPacketFees[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryTotalRecvFeesRequest defines the request type for the TotalRecvFees rpc */
export interface QueryTotalRecvFeesRequest {
    /** the packet identifier for the associated fees */
    packetId: PacketId | undefined;
}
/** QueryTotalRecvFeesResponse defines the response type for the TotalRecvFees rpc */
export interface QueryTotalRecvFeesResponse {
    /** the total packet receive fees */
    recvFees: Coin[];
}
/** QueryTotalAckFeesRequest defines the request type for the TotalAckFees rpc */
export interface QueryTotalAckFeesRequest {
    /** the packet identifier for the associated fees */
    packetId: PacketId | undefined;
}
/** QueryTotalAckFeesResponse defines the response type for the TotalAckFees rpc */
export interface QueryTotalAckFeesResponse {
    /** the total packet acknowledgement fees */
    ackFees: Coin[];
}
/** QueryTotalTimeoutFeesRequest defines the request type for the TotalTimeoutFees rpc */
export interface QueryTotalTimeoutFeesRequest {
    /** the packet identifier for the associated fees */
    packetId: PacketId | undefined;
}
/** QueryTotalTimeoutFeesResponse defines the response type for the TotalTimeoutFees rpc */
export interface QueryTotalTimeoutFeesResponse {
    /** the total packet timeout fees */
    timeoutFees: Coin[];
}
/** QueryPayeeRequest defines the request type for the Payee rpc */
export interface QueryPayeeRequest {
    /** unique channel identifier */
    channelId: string;
    /** the relayer address to which the distribution address is registered */
    relayer: string;
}
/** QueryPayeeResponse defines the response type for the Payee rpc */
export interface QueryPayeeResponse {
    /** the payee address to which packet fees are paid out */
    payeeAddress: string;
}
/** QueryCounterpartyPayeeRequest defines the request type for the CounterpartyPayee rpc */
export interface QueryCounterpartyPayeeRequest {
    /** unique channel identifier */
    channelId: string;
    /** the relayer address to which the counterparty is registered */
    relayer: string;
}
/** QueryCounterpartyPayeeResponse defines the response type for the CounterpartyPayee rpc */
export interface QueryCounterpartyPayeeResponse {
    /** the counterparty payee address used to compensate forward relaying */
    counterpartyPayee: string;
}
/** QueryFeeEnabledChannelsRequest defines the request type for the FeeEnabledChannels rpc */
export interface QueryFeeEnabledChannelsRequest {
    /** pagination defines an optional pagination for the request. */
    pagination: PageRequest | undefined;
    /** block height at which to query */
    queryHeight: number;
}
/** QueryFeeEnabledChannelsResponse defines the response type for the FeeEnabledChannels rpc */
export interface QueryFeeEnabledChannelsResponse {
    /** list of fee enabled channels */
    feeEnabledChannels: FeeEnabledChannel[];
    /** pagination defines the pagination in the response. */
    pagination: PageResponse | undefined;
}
/** QueryFeeEnabledChannelRequest defines the request type for the FeeEnabledChannel rpc */
export interface QueryFeeEnabledChannelRequest {
    /** unique port identifier */
    portId: string;
    /** unique channel identifier */
    channelId: string;
}
/** QueryFeeEnabledChannelResponse defines the response type for the FeeEnabledChannel rpc */
export interface QueryFeeEnabledChannelResponse {
    /** boolean flag representing the fee enabled channel status */
    feeEnabled: boolean;
}
export declare const QueryIncentivizedPacketsRequest: {
    encode(message: QueryIncentivizedPacketsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsRequest;
    fromJSON(object: any): QueryIncentivizedPacketsRequest;
    toJSON(message: QueryIncentivizedPacketsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        queryHeight?: number;
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
        queryHeight?: number;
    } & { [K_1 in Exclude<keyof I, keyof QueryIncentivizedPacketsRequest>]: never; }>(base?: I): QueryIncentivizedPacketsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        queryHeight?: number;
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
        queryHeight?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryIncentivizedPacketsRequest>]: never; }>(object: I_1): QueryIncentivizedPacketsRequest;
};
export declare const QueryIncentivizedPacketsResponse: {
    encode(message: QueryIncentivizedPacketsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsResponse;
    fromJSON(object: any): QueryIncentivizedPacketsResponse;
    toJSON(message: QueryIncentivizedPacketsResponse): unknown;
    create<I extends {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[] & ({
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K in Exclude<keyof I["incentivizedPackets"][number]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_1 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_2 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_3 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_5 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_6 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_7 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_8 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_9 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_10 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["incentivizedPackets"][number], keyof IdentifiedPacketFees>]: never; })[] & { [K_12 in Exclude<keyof I["incentivizedPackets"], keyof {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_13 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_14 in Exclude<keyof I, keyof QueryIncentivizedPacketsResponse>]: never; }>(base?: I): QueryIncentivizedPacketsResponse;
    fromPartial<I_1 extends {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[] & ({
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K_15 in Exclude<keyof I_1["incentivizedPackets"][number]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_16 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_17 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_18 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_19 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_20 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_21 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_22 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_23 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_24 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_25 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_26 in Exclude<keyof I_1["incentivizedPackets"][number], keyof IdentifiedPacketFees>]: never; })[] & { [K_27 in Exclude<keyof I_1["incentivizedPackets"], keyof {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_28 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_29 in Exclude<keyof I_1, keyof QueryIncentivizedPacketsResponse>]: never; }>(object: I_1): QueryIncentivizedPacketsResponse;
};
export declare const QueryIncentivizedPacketRequest: {
    encode(message: QueryIncentivizedPacketRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketRequest;
    fromJSON(object: any): QueryIncentivizedPacketRequest;
    toJSON(message: QueryIncentivizedPacketRequest): unknown;
    create<I extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
        queryHeight?: number;
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K in Exclude<keyof I["packetId"], keyof PacketId>]: never; };
        queryHeight?: number;
    } & { [K_1 in Exclude<keyof I, keyof QueryIncentivizedPacketRequest>]: never; }>(base?: I): QueryIncentivizedPacketRequest;
    fromPartial<I_1 extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
        queryHeight?: number;
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_2 in Exclude<keyof I_1["packetId"], keyof PacketId>]: never; };
        queryHeight?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryIncentivizedPacketRequest>]: never; }>(object: I_1): QueryIncentivizedPacketRequest;
};
export declare const QueryIncentivizedPacketResponse: {
    encode(message: QueryIncentivizedPacketResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketResponse;
    fromJSON(object: any): QueryIncentivizedPacketResponse;
    toJSON(message: QueryIncentivizedPacketResponse): unknown;
    create<I extends {
        incentivizedPacket?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        };
    } & {
        incentivizedPacket?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K in Exclude<keyof I["incentivizedPacket"]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_1 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_2 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_3 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_5 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_6 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_7 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_8 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_9 in Exclude<keyof I["incentivizedPacket"]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_10 in Exclude<keyof I["incentivizedPacket"]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["incentivizedPacket"], keyof IdentifiedPacketFees>]: never; };
    } & { [K_12 in Exclude<keyof I, "incentivizedPacket">]: never; }>(base?: I): QueryIncentivizedPacketResponse;
    fromPartial<I_1 extends {
        incentivizedPacket?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        };
    } & {
        incentivizedPacket?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K_13 in Exclude<keyof I_1["incentivizedPacket"]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_14 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_15 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_16 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_17 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_18 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_19 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_20 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_21 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_22 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_23 in Exclude<keyof I_1["incentivizedPacket"]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_24 in Exclude<keyof I_1["incentivizedPacket"], keyof IdentifiedPacketFees>]: never; };
    } & { [K_25 in Exclude<keyof I_1, "incentivizedPacket">]: never; }>(object: I_1): QueryIncentivizedPacketResponse;
};
export declare const QueryIncentivizedPacketsForChannelRequest: {
    encode(message: QueryIncentivizedPacketsForChannelRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsForChannelRequest;
    fromJSON(object: any): QueryIncentivizedPacketsForChannelRequest;
    toJSON(message: QueryIncentivizedPacketsForChannelRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        portId?: string;
        channelId?: string;
        queryHeight?: number;
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
        portId?: string;
        channelId?: string;
        queryHeight?: number;
    } & { [K_1 in Exclude<keyof I, keyof QueryIncentivizedPacketsForChannelRequest>]: never; }>(base?: I): QueryIncentivizedPacketsForChannelRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        portId?: string;
        channelId?: string;
        queryHeight?: number;
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
        portId?: string;
        channelId?: string;
        queryHeight?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryIncentivizedPacketsForChannelRequest>]: never; }>(object: I_1): QueryIncentivizedPacketsForChannelRequest;
};
export declare const QueryIncentivizedPacketsForChannelResponse: {
    encode(message: QueryIncentivizedPacketsForChannelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryIncentivizedPacketsForChannelResponse;
    fromJSON(object: any): QueryIncentivizedPacketsForChannelResponse;
    toJSON(message: QueryIncentivizedPacketsForChannelResponse): unknown;
    create<I extends {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[] & ({
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K in Exclude<keyof I["incentivizedPackets"][number]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_1 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_2 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_3 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_5 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_6 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_7 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_8 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_9 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_10 in Exclude<keyof I["incentivizedPackets"][number]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_11 in Exclude<keyof I["incentivizedPackets"][number], keyof IdentifiedPacketFees>]: never; })[] & { [K_12 in Exclude<keyof I["incentivizedPackets"], keyof {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_13 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_14 in Exclude<keyof I, keyof QueryIncentivizedPacketsForChannelResponse>]: never; }>(base?: I): QueryIncentivizedPacketsForChannelResponse;
    fromPartial<I_1 extends {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        incentivizedPackets?: {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[] & ({
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        } & {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & {
                portId?: string;
                channelId?: string;
                sequence?: number;
            } & { [K_15 in Exclude<keyof I_1["incentivizedPackets"][number]["packetId"], keyof PacketId>]: never; };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[] & ({
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            } & {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                } & {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_16 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"][number], keyof Coin>]: never; })[] & { [K_17 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["recvFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_18 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"][number], keyof Coin>]: never; })[] & { [K_19 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["ackFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[] & ({
                        denom?: string;
                        amount?: string;
                    } & {
                        denom?: string;
                        amount?: string;
                    } & { [K_20 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"][number], keyof Coin>]: never; })[] & { [K_21 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"]["timeoutFee"], keyof {
                        denom?: string;
                        amount?: string;
                    }[]>]: never; };
                } & { [K_22 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["fee"], keyof import("./fee").Fee>]: never; };
                refundAddress?: string;
                relayers?: string[] & string[] & { [K_23 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number]["relayers"], keyof string[]>]: never; };
            } & { [K_24 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"][number], keyof import("./fee").PacketFee>]: never; })[] & { [K_25 in Exclude<keyof I_1["incentivizedPackets"][number]["packetFees"], keyof {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[]>]: never; };
        } & { [K_26 in Exclude<keyof I_1["incentivizedPackets"][number], keyof IdentifiedPacketFees>]: never; })[] & { [K_27 in Exclude<keyof I_1["incentivizedPackets"], keyof {
            packetId?: {
                portId?: string;
                channelId?: string;
                sequence?: number;
            };
            packetFees?: {
                fee?: {
                    recvFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    ackFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                    timeoutFee?: {
                        denom?: string;
                        amount?: string;
                    }[];
                };
                refundAddress?: string;
                relayers?: string[];
            }[];
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_28 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_29 in Exclude<keyof I_1, keyof QueryIncentivizedPacketsForChannelResponse>]: never; }>(object: I_1): QueryIncentivizedPacketsForChannelResponse;
};
export declare const QueryTotalRecvFeesRequest: {
    encode(message: QueryTotalRecvFeesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalRecvFeesRequest;
    fromJSON(object: any): QueryTotalRecvFeesRequest;
    toJSON(message: QueryTotalRecvFeesRequest): unknown;
    create<I extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K in Exclude<keyof I["packetId"], keyof PacketId>]: never; };
    } & { [K_1 in Exclude<keyof I, "packetId">]: never; }>(base?: I): QueryTotalRecvFeesRequest;
    fromPartial<I_1 extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_2 in Exclude<keyof I_1["packetId"], keyof PacketId>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "packetId">]: never; }>(object: I_1): QueryTotalRecvFeesRequest;
};
export declare const QueryTotalRecvFeesResponse: {
    encode(message: QueryTotalRecvFeesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalRecvFeesResponse;
    fromJSON(object: any): QueryTotalRecvFeesResponse;
    toJSON(message: QueryTotalRecvFeesResponse): unknown;
    create<I extends {
        recvFees?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        recvFees?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["recvFees"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["recvFees"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "recvFees">]: never; }>(base?: I): QueryTotalRecvFeesResponse;
    fromPartial<I_1 extends {
        recvFees?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        recvFees?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["recvFees"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["recvFees"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "recvFees">]: never; }>(object: I_1): QueryTotalRecvFeesResponse;
};
export declare const QueryTotalAckFeesRequest: {
    encode(message: QueryTotalAckFeesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalAckFeesRequest;
    fromJSON(object: any): QueryTotalAckFeesRequest;
    toJSON(message: QueryTotalAckFeesRequest): unknown;
    create<I extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K in Exclude<keyof I["packetId"], keyof PacketId>]: never; };
    } & { [K_1 in Exclude<keyof I, "packetId">]: never; }>(base?: I): QueryTotalAckFeesRequest;
    fromPartial<I_1 extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_2 in Exclude<keyof I_1["packetId"], keyof PacketId>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "packetId">]: never; }>(object: I_1): QueryTotalAckFeesRequest;
};
export declare const QueryTotalAckFeesResponse: {
    encode(message: QueryTotalAckFeesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalAckFeesResponse;
    fromJSON(object: any): QueryTotalAckFeesResponse;
    toJSON(message: QueryTotalAckFeesResponse): unknown;
    create<I extends {
        ackFees?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        ackFees?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["ackFees"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["ackFees"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "ackFees">]: never; }>(base?: I): QueryTotalAckFeesResponse;
    fromPartial<I_1 extends {
        ackFees?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        ackFees?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["ackFees"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["ackFees"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "ackFees">]: never; }>(object: I_1): QueryTotalAckFeesResponse;
};
export declare const QueryTotalTimeoutFeesRequest: {
    encode(message: QueryTotalTimeoutFeesRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalTimeoutFeesRequest;
    fromJSON(object: any): QueryTotalTimeoutFeesRequest;
    toJSON(message: QueryTotalTimeoutFeesRequest): unknown;
    create<I extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K in Exclude<keyof I["packetId"], keyof PacketId>]: never; };
    } & { [K_1 in Exclude<keyof I, "packetId">]: never; }>(base?: I): QueryTotalTimeoutFeesRequest;
    fromPartial<I_1 extends {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        };
    } & {
        packetId?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
        } & { [K_2 in Exclude<keyof I_1["packetId"], keyof PacketId>]: never; };
    } & { [K_3 in Exclude<keyof I_1, "packetId">]: never; }>(object: I_1): QueryTotalTimeoutFeesRequest;
};
export declare const QueryTotalTimeoutFeesResponse: {
    encode(message: QueryTotalTimeoutFeesResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryTotalTimeoutFeesResponse;
    fromJSON(object: any): QueryTotalTimeoutFeesResponse;
    toJSON(message: QueryTotalTimeoutFeesResponse): unknown;
    create<I extends {
        timeoutFees?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        timeoutFees?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K in Exclude<keyof I["timeoutFees"][number], keyof Coin>]: never; })[] & { [K_1 in Exclude<keyof I["timeoutFees"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, "timeoutFees">]: never; }>(base?: I): QueryTotalTimeoutFeesResponse;
    fromPartial<I_1 extends {
        timeoutFees?: {
            denom?: string;
            amount?: string;
        }[];
    } & {
        timeoutFees?: {
            denom?: string;
            amount?: string;
        }[] & ({
            denom?: string;
            amount?: string;
        } & {
            denom?: string;
            amount?: string;
        } & { [K_3 in Exclude<keyof I_1["timeoutFees"][number], keyof Coin>]: never; })[] & { [K_4 in Exclude<keyof I_1["timeoutFees"], keyof {
            denom?: string;
            amount?: string;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, "timeoutFees">]: never; }>(object: I_1): QueryTotalTimeoutFeesResponse;
};
export declare const QueryPayeeRequest: {
    encode(message: QueryPayeeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPayeeRequest;
    fromJSON(object: any): QueryPayeeRequest;
    toJSON(message: QueryPayeeRequest): unknown;
    create<I extends {
        channelId?: string;
        relayer?: string;
    } & {
        channelId?: string;
        relayer?: string;
    } & { [K in Exclude<keyof I, keyof QueryPayeeRequest>]: never; }>(base?: I): QueryPayeeRequest;
    fromPartial<I_1 extends {
        channelId?: string;
        relayer?: string;
    } & {
        channelId?: string;
        relayer?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryPayeeRequest>]: never; }>(object: I_1): QueryPayeeRequest;
};
export declare const QueryPayeeResponse: {
    encode(message: QueryPayeeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPayeeResponse;
    fromJSON(object: any): QueryPayeeResponse;
    toJSON(message: QueryPayeeResponse): unknown;
    create<I extends {
        payeeAddress?: string;
    } & {
        payeeAddress?: string;
    } & { [K in Exclude<keyof I, "payeeAddress">]: never; }>(base?: I): QueryPayeeResponse;
    fromPartial<I_1 extends {
        payeeAddress?: string;
    } & {
        payeeAddress?: string;
    } & { [K_1 in Exclude<keyof I_1, "payeeAddress">]: never; }>(object: I_1): QueryPayeeResponse;
};
export declare const QueryCounterpartyPayeeRequest: {
    encode(message: QueryCounterpartyPayeeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterpartyPayeeRequest;
    fromJSON(object: any): QueryCounterpartyPayeeRequest;
    toJSON(message: QueryCounterpartyPayeeRequest): unknown;
    create<I extends {
        channelId?: string;
        relayer?: string;
    } & {
        channelId?: string;
        relayer?: string;
    } & { [K in Exclude<keyof I, keyof QueryCounterpartyPayeeRequest>]: never; }>(base?: I): QueryCounterpartyPayeeRequest;
    fromPartial<I_1 extends {
        channelId?: string;
        relayer?: string;
    } & {
        channelId?: string;
        relayer?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryCounterpartyPayeeRequest>]: never; }>(object: I_1): QueryCounterpartyPayeeRequest;
};
export declare const QueryCounterpartyPayeeResponse: {
    encode(message: QueryCounterpartyPayeeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryCounterpartyPayeeResponse;
    fromJSON(object: any): QueryCounterpartyPayeeResponse;
    toJSON(message: QueryCounterpartyPayeeResponse): unknown;
    create<I extends {
        counterpartyPayee?: string;
    } & {
        counterpartyPayee?: string;
    } & { [K in Exclude<keyof I, "counterpartyPayee">]: never; }>(base?: I): QueryCounterpartyPayeeResponse;
    fromPartial<I_1 extends {
        counterpartyPayee?: string;
    } & {
        counterpartyPayee?: string;
    } & { [K_1 in Exclude<keyof I_1, "counterpartyPayee">]: never; }>(object: I_1): QueryCounterpartyPayeeResponse;
};
export declare const QueryFeeEnabledChannelsRequest: {
    encode(message: QueryFeeEnabledChannelsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelsRequest;
    fromJSON(object: any): QueryFeeEnabledChannelsRequest;
    toJSON(message: QueryFeeEnabledChannelsRequest): unknown;
    create<I extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        queryHeight?: number;
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
        queryHeight?: number;
    } & { [K_1 in Exclude<keyof I, keyof QueryFeeEnabledChannelsRequest>]: never; }>(base?: I): QueryFeeEnabledChannelsRequest;
    fromPartial<I_1 extends {
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        queryHeight?: number;
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
        queryHeight?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof QueryFeeEnabledChannelsRequest>]: never; }>(object: I_1): QueryFeeEnabledChannelsRequest;
};
export declare const QueryFeeEnabledChannelsResponse: {
    encode(message: QueryFeeEnabledChannelsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelsResponse;
    fromJSON(object: any): QueryFeeEnabledChannelsResponse;
    toJSON(message: QueryFeeEnabledChannelsResponse): unknown;
    create<I extends {
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[] & ({
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K in Exclude<keyof I["feeEnabledChannels"][number], keyof FeeEnabledChannel>]: never; })[] & { [K_1 in Exclude<keyof I["feeEnabledChannels"], keyof {
            portId?: string;
            channelId?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryFeeEnabledChannelsResponse>]: never; }>(base?: I): QueryFeeEnabledChannelsResponse;
    fromPartial<I_1 extends {
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
    } & {
        feeEnabledChannels?: {
            portId?: string;
            channelId?: string;
        }[] & ({
            portId?: string;
            channelId?: string;
        } & {
            portId?: string;
            channelId?: string;
        } & { [K_4 in Exclude<keyof I_1["feeEnabledChannels"][number], keyof FeeEnabledChannel>]: never; })[] & { [K_5 in Exclude<keyof I_1["feeEnabledChannels"], keyof {
            portId?: string;
            channelId?: string;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_6 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryFeeEnabledChannelsResponse>]: never; }>(object: I_1): QueryFeeEnabledChannelsResponse;
};
export declare const QueryFeeEnabledChannelRequest: {
    encode(message: QueryFeeEnabledChannelRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelRequest;
    fromJSON(object: any): QueryFeeEnabledChannelRequest;
    toJSON(message: QueryFeeEnabledChannelRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryFeeEnabledChannelRequest>]: never; }>(base?: I): QueryFeeEnabledChannelRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryFeeEnabledChannelRequest>]: never; }>(object: I_1): QueryFeeEnabledChannelRequest;
};
export declare const QueryFeeEnabledChannelResponse: {
    encode(message: QueryFeeEnabledChannelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryFeeEnabledChannelResponse;
    fromJSON(object: any): QueryFeeEnabledChannelResponse;
    toJSON(message: QueryFeeEnabledChannelResponse): unknown;
    create<I extends {
        feeEnabled?: boolean;
    } & {
        feeEnabled?: boolean;
    } & { [K in Exclude<keyof I, "feeEnabled">]: never; }>(base?: I): QueryFeeEnabledChannelResponse;
    fromPartial<I_1 extends {
        feeEnabled?: boolean;
    } & {
        feeEnabled?: boolean;
    } & { [K_1 in Exclude<keyof I_1, "feeEnabled">]: never; }>(object: I_1): QueryFeeEnabledChannelResponse;
};
/** Query defines the ICS29 gRPC querier service. */
export interface Query {
    /** IncentivizedPackets returns all incentivized packets and their associated fees */
    IncentivizedPackets(request: QueryIncentivizedPacketsRequest): Promise<QueryIncentivizedPacketsResponse>;
    /** IncentivizedPacket returns all packet fees for a packet given its identifier */
    IncentivizedPacket(request: QueryIncentivizedPacketRequest): Promise<QueryIncentivizedPacketResponse>;
    /** Gets all incentivized packets for a specific channel */
    IncentivizedPacketsForChannel(request: QueryIncentivizedPacketsForChannelRequest): Promise<QueryIncentivizedPacketsForChannelResponse>;
    /** TotalRecvFees returns the total receive fees for a packet given its identifier */
    TotalRecvFees(request: QueryTotalRecvFeesRequest): Promise<QueryTotalRecvFeesResponse>;
    /** TotalAckFees returns the total acknowledgement fees for a packet given its identifier */
    TotalAckFees(request: QueryTotalAckFeesRequest): Promise<QueryTotalAckFeesResponse>;
    /** TotalTimeoutFees returns the total timeout fees for a packet given its identifier */
    TotalTimeoutFees(request: QueryTotalTimeoutFeesRequest): Promise<QueryTotalTimeoutFeesResponse>;
    /** Payee returns the registered payee address for a specific channel given the relayer address */
    Payee(request: QueryPayeeRequest): Promise<QueryPayeeResponse>;
    /** CounterpartyPayee returns the registered counterparty payee for forward relaying */
    CounterpartyPayee(request: QueryCounterpartyPayeeRequest): Promise<QueryCounterpartyPayeeResponse>;
    /** FeeEnabledChannels returns a list of all fee enabled channels */
    FeeEnabledChannels(request: QueryFeeEnabledChannelsRequest): Promise<QueryFeeEnabledChannelsResponse>;
    /** FeeEnabledChannel returns true if the provided port and channel identifiers belong to a fee enabled channel */
    FeeEnabledChannel(request: QueryFeeEnabledChannelRequest): Promise<QueryFeeEnabledChannelResponse>;
}
export declare const QueryServiceName = "ibc.applications.fee.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    IncentivizedPackets(request: QueryIncentivizedPacketsRequest): Promise<QueryIncentivizedPacketsResponse>;
    IncentivizedPacket(request: QueryIncentivizedPacketRequest): Promise<QueryIncentivizedPacketResponse>;
    IncentivizedPacketsForChannel(request: QueryIncentivizedPacketsForChannelRequest): Promise<QueryIncentivizedPacketsForChannelResponse>;
    TotalRecvFees(request: QueryTotalRecvFeesRequest): Promise<QueryTotalRecvFeesResponse>;
    TotalAckFees(request: QueryTotalAckFeesRequest): Promise<QueryTotalAckFeesResponse>;
    TotalTimeoutFees(request: QueryTotalTimeoutFeesRequest): Promise<QueryTotalTimeoutFeesResponse>;
    Payee(request: QueryPayeeRequest): Promise<QueryPayeeResponse>;
    CounterpartyPayee(request: QueryCounterpartyPayeeRequest): Promise<QueryCounterpartyPayeeResponse>;
    FeeEnabledChannels(request: QueryFeeEnabledChannelsRequest): Promise<QueryFeeEnabledChannelsResponse>;
    FeeEnabledChannel(request: QueryFeeEnabledChannelRequest): Promise<QueryFeeEnabledChannelResponse>;
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
