import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any } from "../../../../google/protobuf/any";
import { Height, IdentifiedClientState } from "../../client/v1/client";
import { Channel, IdentifiedChannel, PacketState, Params } from "./channel";
import { ErrorReceipt, Upgrade } from "./upgrade";
export declare const protobufPackage = "ibc.core.channel.v1";
/** QueryChannelRequest is the request type for the Query/Channel RPC method */
export interface QueryChannelRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
}
/**
 * QueryChannelResponse is the response type for the Query/Channel RPC method.
 * Besides the Channel end, it includes a proof and the height from which the
 * proof was retrieved.
 */
export interface QueryChannelResponse {
    /** channel associated with the request identifiers */
    channel: Channel | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/** QueryChannelsRequest is the request type for the Query/Channels RPC method */
export interface QueryChannelsRequest {
    /** pagination request */
    pagination: PageRequest | undefined;
}
/** QueryChannelsResponse is the response type for the Query/Channels RPC method. */
export interface QueryChannelsResponse {
    /** list of stored channels of the chain. */
    channels: IdentifiedChannel[];
    /** pagination response */
    pagination: PageResponse | undefined;
    /** query block height */
    height: Height | undefined;
}
/**
 * QueryConnectionChannelsRequest is the request type for the
 * Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsRequest {
    /** connection unique identifier */
    connection: string;
    /** pagination request */
    pagination: PageRequest | undefined;
}
/**
 * QueryConnectionChannelsResponse is the Response type for the
 * Query/QueryConnectionChannels RPC method
 */
export interface QueryConnectionChannelsResponse {
    /** list of channels associated with a connection. */
    channels: IdentifiedChannel[];
    /** pagination response */
    pagination: PageResponse | undefined;
    /** query block height */
    height: Height | undefined;
}
/**
 * QueryChannelClientStateRequest is the request type for the Query/ClientState
 * RPC method
 */
export interface QueryChannelClientStateRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
}
/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface QueryChannelClientStateResponse {
    /** client state associated with the channel */
    identifiedClientState: IdentifiedClientState | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryChannelConsensusStateRequest is the request type for the
 * Query/ConsensusState RPC method
 */
export interface QueryChannelConsensusStateRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** revision number of the consensus state */
    revisionNumber: number;
    /** revision height of the consensus state */
    revisionHeight: number;
}
/**
 * QueryChannelClientStateResponse is the Response type for the
 * Query/QueryChannelClientState RPC method
 */
export interface QueryChannelConsensusStateResponse {
    /** consensus state associated with the channel */
    consensusState: Any | undefined;
    /** client ID associated with the consensus state */
    clientId: string;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryPacketCommitmentRequest is the request type for the
 * Query/PacketCommitment RPC method
 */
export interface QueryPacketCommitmentRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** packet sequence */
    sequence: number;
}
/**
 * QueryPacketCommitmentResponse defines the client query response for a packet
 * which also includes a proof and the height from which the proof was
 * retrieved
 */
export interface QueryPacketCommitmentResponse {
    /** packet associated with the request fields */
    commitment: Uint8Array;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryPacketCommitmentsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** pagination request */
    pagination: PageRequest | undefined;
}
/**
 * QueryPacketCommitmentsResponse is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketCommitmentsResponse {
    commitments: PacketState[];
    /** pagination response */
    pagination: PageResponse | undefined;
    /** query block height */
    height: Height | undefined;
}
/**
 * QueryPacketReceiptRequest is the request type for the
 * Query/PacketReceipt RPC method
 */
export interface QueryPacketReceiptRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** packet sequence */
    sequence: number;
}
/**
 * QueryPacketReceiptResponse defines the client query response for a packet
 * receipt which also includes a proof, and the height from which the proof was
 * retrieved
 */
export interface QueryPacketReceiptResponse {
    /** success flag for if receipt exists */
    received: boolean;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryPacketAcknowledgementRequest is the request type for the
 * Query/PacketAcknowledgement RPC method
 */
export interface QueryPacketAcknowledgementRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** packet sequence */
    sequence: number;
}
/**
 * QueryPacketAcknowledgementResponse defines the client query response for a
 * packet which also includes a proof and the height from which the
 * proof was retrieved
 */
export interface QueryPacketAcknowledgementResponse {
    /** packet associated with the request fields */
    acknowledgement: Uint8Array;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryPacketAcknowledgementsRequest is the request type for the
 * Query/QueryPacketCommitments RPC method
 */
export interface QueryPacketAcknowledgementsRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** pagination request */
    pagination: PageRequest | undefined;
    /** list of packet sequences */
    packetCommitmentSequences: number[];
}
/**
 * QueryPacketAcknowledgemetsResponse is the request type for the
 * Query/QueryPacketAcknowledgements RPC method
 */
export interface QueryPacketAcknowledgementsResponse {
    acknowledgements: PacketState[];
    /** pagination response */
    pagination: PageResponse | undefined;
    /** query block height */
    height: Height | undefined;
}
/**
 * QueryUnreceivedPacketsRequest is the request type for the
 * Query/UnreceivedPackets RPC method
 */
export interface QueryUnreceivedPacketsRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** list of packet sequences */
    packetCommitmentSequences: number[];
}
/**
 * QueryUnreceivedPacketsResponse is the response type for the
 * Query/UnreceivedPacketCommitments RPC method
 */
export interface QueryUnreceivedPacketsResponse {
    /** list of unreceived packet sequences */
    sequences: number[];
    /** query block height */
    height: Height | undefined;
}
/**
 * QueryUnreceivedAcks is the request type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
    /** list of acknowledgement sequences */
    packetAckSequences: number[];
}
/**
 * QueryUnreceivedAcksResponse is the response type for the
 * Query/UnreceivedAcks RPC method
 */
export interface QueryUnreceivedAcksResponse {
    /** list of unreceived acknowledgement sequences */
    sequences: number[];
    /** query block height */
    height: Height | undefined;
}
/**
 * QueryNextSequenceReceiveRequest is the request type for the
 * Query/QueryNextSequenceReceiveRequest RPC method
 */
export interface QueryNextSequenceReceiveRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
}
/**
 * QuerySequenceResponse is the response type for the
 * Query/QueryNextSequenceReceiveResponse RPC method
 */
export interface QueryNextSequenceReceiveResponse {
    /** next sequence receive number */
    nextSequenceReceive: number;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/**
 * QueryNextSequenceSendRequest is the request type for the
 * Query/QueryNextSequenceSend RPC method
 */
export interface QueryNextSequenceSendRequest {
    /** port unique identifier */
    portId: string;
    /** channel unique identifier */
    channelId: string;
}
/**
 * QueryNextSequenceSendResponse is the request type for the
 * Query/QueryNextSequenceSend RPC method
 */
export interface QueryNextSequenceSendResponse {
    /** next sequence send number */
    nextSequenceSend: number;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/** QueryUpgradeErrorRequest is the request type for the Query/QueryUpgradeError RPC method */
export interface QueryUpgradeErrorRequest {
    portId: string;
    channelId: string;
}
/** QueryUpgradeErrorResponse is the response type for the Query/QueryUpgradeError RPC method */
export interface QueryUpgradeErrorResponse {
    errorReceipt: ErrorReceipt | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/** QueryUpgradeRequest is the request type for the QueryUpgradeRequest RPC method */
export interface QueryUpgradeRequest {
    portId: string;
    channelId: string;
}
/** QueryUpgradeResponse is the response type for the QueryUpgradeResponse RPC method */
export interface QueryUpgradeResponse {
    upgrade: Upgrade | undefined;
    /** merkle proof of existence */
    proof: Uint8Array;
    /** height at which the proof was retrieved */
    proofHeight: Height | undefined;
}
/** QueryChannelParamsRequest is the request type for the Query/ChannelParams RPC method. */
export interface QueryChannelParamsRequest {
}
/** QueryChannelParamsResponse is the response type for the Query/ChannelParams RPC method. */
export interface QueryChannelParamsResponse {
    /** params defines the parameters of the module. */
    params: Params | undefined;
}
export declare const QueryChannelRequest: {
    encode(message: QueryChannelRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelRequest;
    fromJSON(object: any): QueryChannelRequest;
    toJSON(message: QueryChannelRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryChannelRequest>]: never; }>(base?: I): QueryChannelRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryChannelRequest>]: never; }>(object: I_1): QueryChannelRequest;
};
export declare const QueryChannelResponse: {
    encode(message: QueryChannelResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelResponse;
    fromJSON(object: any): QueryChannelResponse;
    toJSON(message: QueryChannelResponse): unknown;
    create<I extends {
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K in Exclude<keyof I["channel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["channel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_2 in Exclude<keyof I["channel"], keyof Channel>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_3 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryChannelResponse>]: never; }>(base?: I): QueryChannelResponse;
    fromPartial<I_1 extends {
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        channel?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K_5 in Exclude<keyof I_1["channel"]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_6 in Exclude<keyof I_1["channel"]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            upgradeSequence?: number;
        } & { [K_7 in Exclude<keyof I_1["channel"], keyof Channel>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_8 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryChannelResponse>]: never; }>(object: I_1): QueryChannelResponse;
};
export declare const QueryChannelsRequest: {
    encode(message: QueryChannelsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelsRequest;
    fromJSON(object: any): QueryChannelsRequest;
    toJSON(message: QueryChannelsRequest): unknown;
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
    } & { [K_1 in Exclude<keyof I, "pagination">]: never; }>(base?: I): QueryChannelsRequest;
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
    } & { [K_3 in Exclude<keyof I_1, "pagination">]: never; }>(object: I_1): QueryChannelsRequest;
};
export declare const QueryChannelsResponse: {
    encode(message: QueryChannelsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelsResponse;
    fromJSON(object: any): QueryChannelsResponse;
    toJSON(message: QueryChannelsResponse): unknown;
    create<I extends {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[] & ({
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K in Exclude<keyof I["channels"][number]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["channels"][number]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & { [K_2 in Exclude<keyof I["channels"][number], keyof IdentifiedChannel>]: never; })[] & { [K_3 in Exclude<keyof I["channels"], keyof {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_5 in Exclude<keyof I["height"], keyof Height>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof QueryChannelsResponse>]: never; }>(base?: I): QueryChannelsResponse;
    fromPartial<I_1 extends {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[] & ({
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K_7 in Exclude<keyof I_1["channels"][number]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_8 in Exclude<keyof I_1["channels"][number]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & { [K_9 in Exclude<keyof I_1["channels"][number], keyof IdentifiedChannel>]: never; })[] & { [K_10 in Exclude<keyof I_1["channels"], keyof {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_11 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_12 in Exclude<keyof I_1["height"], keyof Height>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof QueryChannelsResponse>]: never; }>(object: I_1): QueryChannelsResponse;
};
export declare const QueryConnectionChannelsRequest: {
    encode(message: QueryConnectionChannelsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionChannelsRequest;
    fromJSON(object: any): QueryConnectionChannelsRequest;
    toJSON(message: QueryConnectionChannelsRequest): unknown;
    create<I extends {
        connection?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        connection?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryConnectionChannelsRequest>]: never; }>(base?: I): QueryConnectionChannelsRequest;
    fromPartial<I_1 extends {
        connection?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        connection?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryConnectionChannelsRequest>]: never; }>(object: I_1): QueryConnectionChannelsRequest;
};
export declare const QueryConnectionChannelsResponse: {
    encode(message: QueryConnectionChannelsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryConnectionChannelsResponse;
    fromJSON(object: any): QueryConnectionChannelsResponse;
    toJSON(message: QueryConnectionChannelsResponse): unknown;
    create<I extends {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[] & ({
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K in Exclude<keyof I["channels"][number]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_1 in Exclude<keyof I["channels"][number]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & { [K_2 in Exclude<keyof I["channels"][number], keyof IdentifiedChannel>]: never; })[] & { [K_3 in Exclude<keyof I["channels"], keyof {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_4 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_5 in Exclude<keyof I["height"], keyof Height>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof QueryConnectionChannelsResponse>]: never; }>(base?: I): QueryConnectionChannelsResponse;
    fromPartial<I_1 extends {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        channels?: {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[] & ({
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            } & {
                portId?: string;
                channelId?: string;
            } & { [K_7 in Exclude<keyof I_1["channels"][number]["counterparty"], keyof import("./channel").Counterparty>]: never; };
            connectionHops?: string[] & string[] & { [K_8 in Exclude<keyof I_1["channels"][number]["connectionHops"], keyof string[]>]: never; };
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        } & { [K_9 in Exclude<keyof I_1["channels"][number], keyof IdentifiedChannel>]: never; })[] & { [K_10 in Exclude<keyof I_1["channels"], keyof {
            state?: import("./channel").State;
            ordering?: import("./channel").Order;
            counterparty?: {
                portId?: string;
                channelId?: string;
            };
            connectionHops?: string[];
            version?: string;
            portId?: string;
            channelId?: string;
            upgradeSequence?: number;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_11 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_12 in Exclude<keyof I_1["height"], keyof Height>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof QueryConnectionChannelsResponse>]: never; }>(object: I_1): QueryConnectionChannelsResponse;
};
export declare const QueryChannelClientStateRequest: {
    encode(message: QueryChannelClientStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelClientStateRequest;
    fromJSON(object: any): QueryChannelClientStateRequest;
    toJSON(message: QueryChannelClientStateRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryChannelClientStateRequest>]: never; }>(base?: I): QueryChannelClientStateRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryChannelClientStateRequest>]: never; }>(object: I_1): QueryChannelClientStateRequest;
};
export declare const QueryChannelClientStateResponse: {
    encode(message: QueryChannelClientStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelClientStateResponse;
    fromJSON(object: any): QueryChannelClientStateResponse;
    toJSON(message: QueryChannelClientStateResponse): unknown;
    create<I extends {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K in Exclude<keyof I["identifiedClientState"]["clientState"], keyof Any>]: never; };
        } & { [K_1 in Exclude<keyof I["identifiedClientState"], keyof IdentifiedClientState>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof QueryChannelClientStateResponse>]: never; }>(base?: I): QueryChannelClientStateResponse;
    fromPartial<I_1 extends {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        identifiedClientState?: {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
        } & {
            clientId?: string;
            clientState?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & { [K_4 in Exclude<keyof I_1["identifiedClientState"]["clientState"], keyof Any>]: never; };
        } & { [K_5 in Exclude<keyof I_1["identifiedClientState"], keyof IdentifiedClientState>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_6 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof QueryChannelClientStateResponse>]: never; }>(object: I_1): QueryChannelClientStateResponse;
};
export declare const QueryChannelConsensusStateRequest: {
    encode(message: QueryChannelConsensusStateRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelConsensusStateRequest;
    fromJSON(object: any): QueryChannelConsensusStateRequest;
    toJSON(message: QueryChannelConsensusStateRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & {
        portId?: string;
        channelId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & { [K in Exclude<keyof I, keyof QueryChannelConsensusStateRequest>]: never; }>(base?: I): QueryChannelConsensusStateRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & {
        portId?: string;
        channelId?: string;
        revisionNumber?: number;
        revisionHeight?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryChannelConsensusStateRequest>]: never; }>(object: I_1): QueryChannelConsensusStateRequest;
};
export declare const QueryChannelConsensusStateResponse: {
    encode(message: QueryChannelConsensusStateResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelConsensusStateResponse;
    fromJSON(object: any): QueryChannelConsensusStateResponse;
    toJSON(message: QueryChannelConsensusStateResponse): unknown;
    create<I extends {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K in Exclude<keyof I["consensusState"], keyof Any>]: never; };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryChannelConsensusStateResponse>]: never; }>(base?: I): QueryChannelConsensusStateResponse;
    fromPartial<I_1 extends {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        consensusState?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & { [K_3 in Exclude<keyof I_1["consensusState"], keyof Any>]: never; };
        clientId?: string;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryChannelConsensusStateResponse>]: never; }>(object: I_1): QueryChannelConsensusStateResponse;
};
export declare const QueryPacketCommitmentRequest: {
    encode(message: QueryPacketCommitmentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentRequest;
    fromJSON(object: any): QueryPacketCommitmentRequest;
    toJSON(message: QueryPacketCommitmentRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K in Exclude<keyof I, keyof QueryPacketCommitmentRequest>]: never; }>(base?: I): QueryPacketCommitmentRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryPacketCommitmentRequest>]: never; }>(object: I_1): QueryPacketCommitmentRequest;
};
export declare const QueryPacketCommitmentResponse: {
    encode(message: QueryPacketCommitmentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentResponse;
    fromJSON(object: any): QueryPacketCommitmentResponse;
    toJSON(message: QueryPacketCommitmentResponse): unknown;
    create<I extends {
        commitment?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        commitment?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryPacketCommitmentResponse>]: never; }>(base?: I): QueryPacketCommitmentResponse;
    fromPartial<I_1 extends {
        commitment?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        commitment?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryPacketCommitmentResponse>]: never; }>(object: I_1): QueryPacketCommitmentResponse;
};
export declare const QueryPacketCommitmentsRequest: {
    encode(message: QueryPacketCommitmentsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentsRequest;
    fromJSON(object: any): QueryPacketCommitmentsRequest;
    toJSON(message: QueryPacketCommitmentsRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        portId?: string;
        channelId?: string;
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
    } & { [K_1 in Exclude<keyof I, keyof QueryPacketCommitmentsRequest>]: never; }>(base?: I): QueryPacketCommitmentsRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
    } & {
        portId?: string;
        channelId?: string;
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
    } & { [K_3 in Exclude<keyof I_1, keyof QueryPacketCommitmentsRequest>]: never; }>(object: I_1): QueryPacketCommitmentsRequest;
};
export declare const QueryPacketCommitmentsResponse: {
    encode(message: QueryPacketCommitmentsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketCommitmentsResponse;
    fromJSON(object: any): QueryPacketCommitmentsResponse;
    toJSON(message: QueryPacketCommitmentsResponse): unknown;
    create<I extends {
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K in Exclude<keyof I["commitments"][number], keyof PacketState>]: never; })[] & { [K_1 in Exclude<keyof I["commitments"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_3 in Exclude<keyof I["height"], keyof Height>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryPacketCommitmentsResponse>]: never; }>(base?: I): QueryPacketCommitmentsResponse;
    fromPartial<I_1 extends {
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        commitments?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_5 in Exclude<keyof I_1["commitments"][number], keyof PacketState>]: never; })[] & { [K_6 in Exclude<keyof I_1["commitments"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_7 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_8 in Exclude<keyof I_1["height"], keyof Height>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryPacketCommitmentsResponse>]: never; }>(object: I_1): QueryPacketCommitmentsResponse;
};
export declare const QueryPacketReceiptRequest: {
    encode(message: QueryPacketReceiptRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketReceiptRequest;
    fromJSON(object: any): QueryPacketReceiptRequest;
    toJSON(message: QueryPacketReceiptRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K in Exclude<keyof I, keyof QueryPacketReceiptRequest>]: never; }>(base?: I): QueryPacketReceiptRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryPacketReceiptRequest>]: never; }>(object: I_1): QueryPacketReceiptRequest;
};
export declare const QueryPacketReceiptResponse: {
    encode(message: QueryPacketReceiptResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketReceiptResponse;
    fromJSON(object: any): QueryPacketReceiptResponse;
    toJSON(message: QueryPacketReceiptResponse): unknown;
    create<I extends {
        received?: boolean;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        received?: boolean;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryPacketReceiptResponse>]: never; }>(base?: I): QueryPacketReceiptResponse;
    fromPartial<I_1 extends {
        received?: boolean;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        received?: boolean;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryPacketReceiptResponse>]: never; }>(object: I_1): QueryPacketReceiptResponse;
};
export declare const QueryPacketAcknowledgementRequest: {
    encode(message: QueryPacketAcknowledgementRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementRequest;
    fromJSON(object: any): QueryPacketAcknowledgementRequest;
    toJSON(message: QueryPacketAcknowledgementRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K in Exclude<keyof I, keyof QueryPacketAcknowledgementRequest>]: never; }>(base?: I): QueryPacketAcknowledgementRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & {
        portId?: string;
        channelId?: string;
        sequence?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryPacketAcknowledgementRequest>]: never; }>(object: I_1): QueryPacketAcknowledgementRequest;
};
export declare const QueryPacketAcknowledgementResponse: {
    encode(message: QueryPacketAcknowledgementResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementResponse;
    fromJSON(object: any): QueryPacketAcknowledgementResponse;
    toJSON(message: QueryPacketAcknowledgementResponse): unknown;
    create<I extends {
        acknowledgement?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        acknowledgement?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryPacketAcknowledgementResponse>]: never; }>(base?: I): QueryPacketAcknowledgementResponse;
    fromPartial<I_1 extends {
        acknowledgement?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        acknowledgement?: Uint8Array;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryPacketAcknowledgementResponse>]: never; }>(object: I_1): QueryPacketAcknowledgementResponse;
};
export declare const QueryPacketAcknowledgementsRequest: {
    encode(message: QueryPacketAcknowledgementsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementsRequest;
    fromJSON(object: any): QueryPacketAcknowledgementsRequest;
    toJSON(message: QueryPacketAcknowledgementsRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        packetCommitmentSequences?: number[];
    } & {
        portId?: string;
        channelId?: string;
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
        packetCommitmentSequences?: number[] & number[] & { [K_1 in Exclude<keyof I["packetCommitmentSequences"], keyof number[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryPacketAcknowledgementsRequest>]: never; }>(base?: I): QueryPacketAcknowledgementsRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        pagination?: {
            key?: Uint8Array;
            offset?: number;
            limit?: number;
            countTotal?: boolean;
            reverse?: boolean;
        };
        packetCommitmentSequences?: number[];
    } & {
        portId?: string;
        channelId?: string;
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
        } & { [K_3 in Exclude<keyof I_1["pagination"], keyof PageRequest>]: never; };
        packetCommitmentSequences?: number[] & number[] & { [K_4 in Exclude<keyof I_1["packetCommitmentSequences"], keyof number[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryPacketAcknowledgementsRequest>]: never; }>(object: I_1): QueryPacketAcknowledgementsRequest;
};
export declare const QueryPacketAcknowledgementsResponse: {
    encode(message: QueryPacketAcknowledgementsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryPacketAcknowledgementsResponse;
    fromJSON(object: any): QueryPacketAcknowledgementsResponse;
    toJSON(message: QueryPacketAcknowledgementsResponse): unknown;
    create<I extends {
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K in Exclude<keyof I["acknowledgements"][number], keyof PacketState>]: never; })[] & { [K_1 in Exclude<keyof I["acknowledgements"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_2 in Exclude<keyof I["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_3 in Exclude<keyof I["height"], keyof Height>]: never; };
    } & { [K_4 in Exclude<keyof I, keyof QueryPacketAcknowledgementsResponse>]: never; }>(base?: I): QueryPacketAcknowledgementsResponse;
    fromPartial<I_1 extends {
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[];
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        acknowledgements?: {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[] & ({
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        } & { [K_5 in Exclude<keyof I_1["acknowledgements"][number], keyof PacketState>]: never; })[] & { [K_6 in Exclude<keyof I_1["acknowledgements"], keyof {
            portId?: string;
            channelId?: string;
            sequence?: number;
            data?: Uint8Array;
        }[]>]: never; };
        pagination?: {
            nextKey?: Uint8Array;
            total?: number;
        } & {
            nextKey?: Uint8Array;
            total?: number;
        } & { [K_7 in Exclude<keyof I_1["pagination"], keyof PageResponse>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_8 in Exclude<keyof I_1["height"], keyof Height>]: never; };
    } & { [K_9 in Exclude<keyof I_1, keyof QueryPacketAcknowledgementsResponse>]: never; }>(object: I_1): QueryPacketAcknowledgementsResponse;
};
export declare const QueryUnreceivedPacketsRequest: {
    encode(message: QueryUnreceivedPacketsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedPacketsRequest;
    fromJSON(object: any): QueryUnreceivedPacketsRequest;
    toJSON(message: QueryUnreceivedPacketsRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        packetCommitmentSequences?: number[];
    } & {
        portId?: string;
        channelId?: string;
        packetCommitmentSequences?: number[] & number[] & { [K in Exclude<keyof I["packetCommitmentSequences"], keyof number[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryUnreceivedPacketsRequest>]: never; }>(base?: I): QueryUnreceivedPacketsRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        packetCommitmentSequences?: number[];
    } & {
        portId?: string;
        channelId?: string;
        packetCommitmentSequences?: number[] & number[] & { [K_2 in Exclude<keyof I_1["packetCommitmentSequences"], keyof number[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryUnreceivedPacketsRequest>]: never; }>(object: I_1): QueryUnreceivedPacketsRequest;
};
export declare const QueryUnreceivedPacketsResponse: {
    encode(message: QueryUnreceivedPacketsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedPacketsResponse;
    fromJSON(object: any): QueryUnreceivedPacketsResponse;
    toJSON(message: QueryUnreceivedPacketsResponse): unknown;
    create<I extends {
        sequences?: number[];
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        sequences?: number[] & number[] & { [K in Exclude<keyof I["sequences"], keyof number[]>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["height"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryUnreceivedPacketsResponse>]: never; }>(base?: I): QueryUnreceivedPacketsResponse;
    fromPartial<I_1 extends {
        sequences?: number[];
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        sequences?: number[] & number[] & { [K_3 in Exclude<keyof I_1["sequences"], keyof number[]>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["height"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryUnreceivedPacketsResponse>]: never; }>(object: I_1): QueryUnreceivedPacketsResponse;
};
export declare const QueryUnreceivedAcksRequest: {
    encode(message: QueryUnreceivedAcksRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedAcksRequest;
    fromJSON(object: any): QueryUnreceivedAcksRequest;
    toJSON(message: QueryUnreceivedAcksRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
        packetAckSequences?: number[];
    } & {
        portId?: string;
        channelId?: string;
        packetAckSequences?: number[] & number[] & { [K in Exclude<keyof I["packetAckSequences"], keyof number[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryUnreceivedAcksRequest>]: never; }>(base?: I): QueryUnreceivedAcksRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
        packetAckSequences?: number[];
    } & {
        portId?: string;
        channelId?: string;
        packetAckSequences?: number[] & number[] & { [K_2 in Exclude<keyof I_1["packetAckSequences"], keyof number[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryUnreceivedAcksRequest>]: never; }>(object: I_1): QueryUnreceivedAcksRequest;
};
export declare const QueryUnreceivedAcksResponse: {
    encode(message: QueryUnreceivedAcksResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUnreceivedAcksResponse;
    fromJSON(object: any): QueryUnreceivedAcksResponse;
    toJSON(message: QueryUnreceivedAcksResponse): unknown;
    create<I extends {
        sequences?: number[];
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        sequences?: number[] & number[] & { [K in Exclude<keyof I["sequences"], keyof number[]>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["height"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryUnreceivedAcksResponse>]: never; }>(base?: I): QueryUnreceivedAcksResponse;
    fromPartial<I_1 extends {
        sequences?: number[];
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        sequences?: number[] & number[] & { [K_3 in Exclude<keyof I_1["sequences"], keyof number[]>]: never; };
        height?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["height"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryUnreceivedAcksResponse>]: never; }>(object: I_1): QueryUnreceivedAcksResponse;
};
export declare const QueryNextSequenceReceiveRequest: {
    encode(message: QueryNextSequenceReceiveRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceReceiveRequest;
    fromJSON(object: any): QueryNextSequenceReceiveRequest;
    toJSON(message: QueryNextSequenceReceiveRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryNextSequenceReceiveRequest>]: never; }>(base?: I): QueryNextSequenceReceiveRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryNextSequenceReceiveRequest>]: never; }>(object: I_1): QueryNextSequenceReceiveRequest;
};
export declare const QueryNextSequenceReceiveResponse: {
    encode(message: QueryNextSequenceReceiveResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceReceiveResponse;
    fromJSON(object: any): QueryNextSequenceReceiveResponse;
    toJSON(message: QueryNextSequenceReceiveResponse): unknown;
    create<I extends {
        nextSequenceReceive?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        nextSequenceReceive?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryNextSequenceReceiveResponse>]: never; }>(base?: I): QueryNextSequenceReceiveResponse;
    fromPartial<I_1 extends {
        nextSequenceReceive?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        nextSequenceReceive?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryNextSequenceReceiveResponse>]: never; }>(object: I_1): QueryNextSequenceReceiveResponse;
};
export declare const QueryNextSequenceSendRequest: {
    encode(message: QueryNextSequenceSendRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceSendRequest;
    fromJSON(object: any): QueryNextSequenceSendRequest;
    toJSON(message: QueryNextSequenceSendRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryNextSequenceSendRequest>]: never; }>(base?: I): QueryNextSequenceSendRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryNextSequenceSendRequest>]: never; }>(object: I_1): QueryNextSequenceSendRequest;
};
export declare const QueryNextSequenceSendResponse: {
    encode(message: QueryNextSequenceSendResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryNextSequenceSendResponse;
    fromJSON(object: any): QueryNextSequenceSendResponse;
    toJSON(message: QueryNextSequenceSendResponse): unknown;
    create<I extends {
        nextSequenceSend?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        nextSequenceSend?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof QueryNextSequenceSendResponse>]: never; }>(base?: I): QueryNextSequenceSendResponse;
    fromPartial<I_1 extends {
        nextSequenceSend?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        nextSequenceSend?: number;
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_2 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof QueryNextSequenceSendResponse>]: never; }>(object: I_1): QueryNextSequenceSendResponse;
};
export declare const QueryUpgradeErrorRequest: {
    encode(message: QueryUpgradeErrorRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeErrorRequest;
    fromJSON(object: any): QueryUpgradeErrorRequest;
    toJSON(message: QueryUpgradeErrorRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryUpgradeErrorRequest>]: never; }>(base?: I): QueryUpgradeErrorRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryUpgradeErrorRequest>]: never; }>(object: I_1): QueryUpgradeErrorRequest;
};
export declare const QueryUpgradeErrorResponse: {
    encode(message: QueryUpgradeErrorResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeErrorResponse;
    fromJSON(object: any): QueryUpgradeErrorResponse;
    toJSON(message: QueryUpgradeErrorResponse): unknown;
    create<I extends {
        errorReceipt?: {
            sequence?: number;
            message?: string;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        errorReceipt?: {
            sequence?: number;
            message?: string;
        } & {
            sequence?: number;
            message?: string;
        } & { [K in Exclude<keyof I["errorReceipt"], keyof ErrorReceipt>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_1 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof QueryUpgradeErrorResponse>]: never; }>(base?: I): QueryUpgradeErrorResponse;
    fromPartial<I_1 extends {
        errorReceipt?: {
            sequence?: number;
            message?: string;
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        errorReceipt?: {
            sequence?: number;
            message?: string;
        } & {
            sequence?: number;
            message?: string;
        } & { [K_3 in Exclude<keyof I_1["errorReceipt"], keyof ErrorReceipt>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_4 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof QueryUpgradeErrorResponse>]: never; }>(object: I_1): QueryUpgradeErrorResponse;
};
export declare const QueryUpgradeRequest: {
    encode(message: QueryUpgradeRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeRequest;
    fromJSON(object: any): QueryUpgradeRequest;
    toJSON(message: QueryUpgradeRequest): unknown;
    create<I extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K in Exclude<keyof I, keyof QueryUpgradeRequest>]: never; }>(base?: I): QueryUpgradeRequest;
    fromPartial<I_1 extends {
        portId?: string;
        channelId?: string;
    } & {
        portId?: string;
        channelId?: string;
    } & { [K_1 in Exclude<keyof I_1, keyof QueryUpgradeRequest>]: never; }>(object: I_1): QueryUpgradeRequest;
};
export declare const QueryUpgradeResponse: {
    encode(message: QueryUpgradeResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryUpgradeResponse;
    fromJSON(object: any): QueryUpgradeResponse;
    toJSON(message: QueryUpgradeResponse): unknown;
    create<I extends {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
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
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
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
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K in Exclude<keyof I["upgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_1 in Exclude<keyof I["upgrade"]["fields"], keyof import("./upgrade").UpgradeFields>]: never; };
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
                } & { [K_2 in Exclude<keyof I["upgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_3 in Exclude<keyof I["upgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_4 in Exclude<keyof I["upgrade"], keyof Upgrade>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_5 in Exclude<keyof I["proofHeight"], keyof Height>]: never; };
    } & { [K_6 in Exclude<keyof I, keyof QueryUpgradeResponse>]: never; }>(base?: I): QueryUpgradeResponse;
    fromPartial<I_1 extends {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
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
        };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        };
    } & {
        upgrade?: {
            fields?: {
                ordering?: import("./channel").Order;
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
                ordering?: import("./channel").Order;
                connectionHops?: string[];
                version?: string;
            } & {
                ordering?: import("./channel").Order;
                connectionHops?: string[] & string[] & { [K_7 in Exclude<keyof I_1["upgrade"]["fields"]["connectionHops"], keyof string[]>]: never; };
                version?: string;
            } & { [K_8 in Exclude<keyof I_1["upgrade"]["fields"], keyof import("./upgrade").UpgradeFields>]: never; };
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
                } & { [K_9 in Exclude<keyof I_1["upgrade"]["timeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_10 in Exclude<keyof I_1["upgrade"]["timeout"], keyof import("./channel").Timeout>]: never; };
            nextSequenceSend?: number;
        } & { [K_11 in Exclude<keyof I_1["upgrade"], keyof Upgrade>]: never; };
        proof?: Uint8Array;
        proofHeight?: {
            revisionNumber?: number;
            revisionHeight?: number;
        } & {
            revisionNumber?: number;
            revisionHeight?: number;
        } & { [K_12 in Exclude<keyof I_1["proofHeight"], keyof Height>]: never; };
    } & { [K_13 in Exclude<keyof I_1, keyof QueryUpgradeResponse>]: never; }>(object: I_1): QueryUpgradeResponse;
};
export declare const QueryChannelParamsRequest: {
    encode(_: QueryChannelParamsRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelParamsRequest;
    fromJSON(_: any): QueryChannelParamsRequest;
    toJSON(_: QueryChannelParamsRequest): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): QueryChannelParamsRequest;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): QueryChannelParamsRequest;
};
export declare const QueryChannelParamsResponse: {
    encode(message: QueryChannelParamsResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryChannelParamsResponse;
    fromJSON(object: any): QueryChannelParamsResponse;
    toJSON(message: QueryChannelParamsResponse): unknown;
    create<I extends {
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        };
    } & {
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        } & {
            upgradeTimeout?: {
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
                } & { [K in Exclude<keyof I["params"]["upgradeTimeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_1 in Exclude<keyof I["params"]["upgradeTimeout"], keyof import("./channel").Timeout>]: never; };
        } & { [K_2 in Exclude<keyof I["params"], "upgradeTimeout">]: never; };
    } & { [K_3 in Exclude<keyof I, "params">]: never; }>(base?: I): QueryChannelParamsResponse;
    fromPartial<I_1 extends {
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        };
    } & {
        params?: {
            upgradeTimeout?: {
                height?: {
                    revisionNumber?: number;
                    revisionHeight?: number;
                };
                timestamp?: number;
            };
        } & {
            upgradeTimeout?: {
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
                } & { [K_4 in Exclude<keyof I_1["params"]["upgradeTimeout"]["height"], keyof Height>]: never; };
                timestamp?: number;
            } & { [K_5 in Exclude<keyof I_1["params"]["upgradeTimeout"], keyof import("./channel").Timeout>]: never; };
        } & { [K_6 in Exclude<keyof I_1["params"], "upgradeTimeout">]: never; };
    } & { [K_7 in Exclude<keyof I_1, "params">]: never; }>(object: I_1): QueryChannelParamsResponse;
};
/** Query provides defines the gRPC querier service */
export interface Query {
    /** Channel queries an IBC Channel. */
    Channel(request: QueryChannelRequest): Promise<QueryChannelResponse>;
    /** Channels queries all the IBC channels of a chain. */
    Channels(request: QueryChannelsRequest): Promise<QueryChannelsResponse>;
    /**
     * ConnectionChannels queries all the channels associated with a connection
     * end.
     */
    ConnectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse>;
    /**
     * ChannelClientState queries for the client state for the channel associated
     * with the provided channel identifiers.
     */
    ChannelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse>;
    /**
     * ChannelConsensusState queries for the consensus state for the channel
     * associated with the provided channel identifiers.
     */
    ChannelConsensusState(request: QueryChannelConsensusStateRequest): Promise<QueryChannelConsensusStateResponse>;
    /** PacketCommitment queries a stored packet commitment hash. */
    PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;
    /**
     * PacketCommitments returns all the packet commitments hashes associated
     * with a channel.
     */
    PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;
    /**
     * PacketReceipt queries if a given packet sequence has been received on the
     * queried chain
     */
    PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;
    /** PacketAcknowledgement queries a stored packet acknowledgement hash. */
    PacketAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse>;
    /**
     * PacketAcknowledgements returns all the packet acknowledgements associated
     * with a channel.
     */
    PacketAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse>;
    /**
     * UnreceivedPackets returns all the unreceived IBC packets associated with a
     * channel and sequences.
     */
    UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;
    /**
     * UnreceivedAcks returns all the unreceived IBC acknowledgements associated
     * with a channel and sequences.
     */
    UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;
    /** NextSequenceReceive returns the next receive sequence for a given channel. */
    NextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse>;
    /** NextSequenceSend returns the next send sequence for a given channel. */
    NextSequenceSend(request: QueryNextSequenceSendRequest): Promise<QueryNextSequenceSendResponse>;
    /** UpgradeError returns the error receipt if the upgrade handshake failed. */
    UpgradeError(request: QueryUpgradeErrorRequest): Promise<QueryUpgradeErrorResponse>;
    /** Upgrade returns the upgrade for a given port and channel id. */
    Upgrade(request: QueryUpgradeRequest): Promise<QueryUpgradeResponse>;
    /** ChannelParams queries all parameters of the ibc channel submodule. */
    ChannelParams(request: QueryChannelParamsRequest): Promise<QueryChannelParamsResponse>;
}
export declare const QueryServiceName = "ibc.core.channel.v1.Query";
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    private readonly service;
    constructor(rpc: Rpc, opts?: {
        service?: string;
    });
    Channel(request: QueryChannelRequest): Promise<QueryChannelResponse>;
    Channels(request: QueryChannelsRequest): Promise<QueryChannelsResponse>;
    ConnectionChannels(request: QueryConnectionChannelsRequest): Promise<QueryConnectionChannelsResponse>;
    ChannelClientState(request: QueryChannelClientStateRequest): Promise<QueryChannelClientStateResponse>;
    ChannelConsensusState(request: QueryChannelConsensusStateRequest): Promise<QueryChannelConsensusStateResponse>;
    PacketCommitment(request: QueryPacketCommitmentRequest): Promise<QueryPacketCommitmentResponse>;
    PacketCommitments(request: QueryPacketCommitmentsRequest): Promise<QueryPacketCommitmentsResponse>;
    PacketReceipt(request: QueryPacketReceiptRequest): Promise<QueryPacketReceiptResponse>;
    PacketAcknowledgement(request: QueryPacketAcknowledgementRequest): Promise<QueryPacketAcknowledgementResponse>;
    PacketAcknowledgements(request: QueryPacketAcknowledgementsRequest): Promise<QueryPacketAcknowledgementsResponse>;
    UnreceivedPackets(request: QueryUnreceivedPacketsRequest): Promise<QueryUnreceivedPacketsResponse>;
    UnreceivedAcks(request: QueryUnreceivedAcksRequest): Promise<QueryUnreceivedAcksResponse>;
    NextSequenceReceive(request: QueryNextSequenceReceiveRequest): Promise<QueryNextSequenceReceiveResponse>;
    NextSequenceSend(request: QueryNextSequenceSendRequest): Promise<QueryNextSequenceSendResponse>;
    UpgradeError(request: QueryUpgradeErrorRequest): Promise<QueryUpgradeErrorResponse>;
    Upgrade(request: QueryUpgradeRequest): Promise<QueryUpgradeResponse>;
    ChannelParams(request: QueryChannelParamsRequest): Promise<QueryChannelParamsResponse>;
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
