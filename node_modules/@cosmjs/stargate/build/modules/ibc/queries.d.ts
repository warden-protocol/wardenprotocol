import { QueryDenomTraceResponse, QueryDenomTracesResponse, QueryParamsResponse as QueryTransferParamsResponse } from "cosmjs-types/ibc/applications/transfer/v1/query";
import { Channel } from "cosmjs-types/ibc/core/channel/v1/channel";
import { QueryChannelClientStateResponse, QueryChannelConsensusStateResponse, QueryChannelResponse, QueryChannelsResponse, QueryConnectionChannelsResponse, QueryNextSequenceReceiveResponse, QueryPacketAcknowledgementResponse, QueryPacketAcknowledgementsResponse, QueryPacketCommitmentResponse, QueryPacketCommitmentsResponse, QueryPacketReceiptResponse, QueryUnreceivedAcksResponse, QueryUnreceivedPacketsResponse } from "cosmjs-types/ibc/core/channel/v1/query";
import { Height } from "cosmjs-types/ibc/core/client/v1/client";
import { QueryClientParamsResponse, QueryClientStateResponse, QueryClientStatesResponse, QueryConsensusStateResponse, QueryConsensusStatesResponse } from "cosmjs-types/ibc/core/client/v1/query";
import { QueryClientConnectionsResponse, QueryConnectionClientStateResponse, QueryConnectionConsensusStateResponse, QueryConnectionResponse, QueryConnectionsResponse } from "cosmjs-types/ibc/core/connection/v1/query";
import { ClientState as TendermintClientState, ConsensusState as TendermintConsensusState } from "cosmjs-types/ibc/lightclients/tendermint/v1/tendermint";
import Long from "long";
import { QueryClient } from "../../queryclient";
export interface IbcExtension {
    readonly ibc: {
        readonly channel: {
            readonly channel: (portId: string, channelId: string) => Promise<QueryChannelResponse>;
            readonly channels: (paginationKey?: Uint8Array) => Promise<QueryChannelsResponse>;
            readonly allChannels: () => Promise<QueryChannelsResponse>;
            readonly connectionChannels: (connection: string, paginationKey?: Uint8Array) => Promise<QueryConnectionChannelsResponse>;
            readonly allConnectionChannels: (connection: string) => Promise<QueryConnectionChannelsResponse>;
            readonly clientState: (portId: string, channelId: string) => Promise<QueryChannelClientStateResponse>;
            readonly consensusState: (portId: string, channelId: string, revisionNumber: number, revisionHeight: number) => Promise<QueryChannelConsensusStateResponse>;
            readonly packetCommitment: (portId: string, channelId: string, sequence: Long) => Promise<QueryPacketCommitmentResponse>;
            readonly packetCommitments: (portId: string, channelId: string, paginationKey?: Uint8Array) => Promise<QueryPacketCommitmentsResponse>;
            readonly allPacketCommitments: (portId: string, channelId: string) => Promise<QueryPacketCommitmentsResponse>;
            readonly packetReceipt: (portId: string, channelId: string, sequence: number) => Promise<QueryPacketReceiptResponse>;
            readonly packetAcknowledgement: (portId: string, channelId: string, sequence: number) => Promise<QueryPacketAcknowledgementResponse>;
            readonly packetAcknowledgements: (portId: string, channelId: string, paginationKey?: Uint8Array) => Promise<QueryPacketAcknowledgementsResponse>;
            readonly allPacketAcknowledgements: (portId: string, channelId: string) => Promise<QueryPacketAcknowledgementsResponse>;
            readonly unreceivedPackets: (portId: string, channelId: string, packetCommitmentSequences: readonly number[]) => Promise<QueryUnreceivedPacketsResponse>;
            readonly unreceivedAcks: (portId: string, channelId: string, packetAckSequences: readonly number[]) => Promise<QueryUnreceivedAcksResponse>;
            readonly nextSequenceReceive: (portId: string, channelId: string) => Promise<QueryNextSequenceReceiveResponse>;
        };
        readonly client: {
            readonly state: (clientId: string) => Promise<QueryClientStateResponse>;
            readonly states: (paginationKey?: Uint8Array) => Promise<QueryClientStatesResponse>;
            readonly allStates: () => Promise<QueryClientStatesResponse>;
            readonly consensusState: (clientId: string, height?: number) => Promise<QueryConsensusStateResponse>;
            readonly consensusStates: (clientId: string, paginationKey?: Uint8Array) => Promise<QueryConsensusStatesResponse>;
            readonly allConsensusStates: (clientId: string) => Promise<QueryConsensusStatesResponse>;
            readonly params: () => Promise<QueryClientParamsResponse>;
            readonly stateTm: (clientId: string) => Promise<TendermintClientState>;
            readonly statesTm: (paginationKey?: Uint8Array) => Promise<TendermintClientState[]>;
            readonly allStatesTm: () => Promise<TendermintClientState[]>;
            readonly consensusStateTm: (clientId: string, height?: Height) => Promise<TendermintConsensusState>;
        };
        readonly connection: {
            readonly connection: (connectionId: string) => Promise<QueryConnectionResponse>;
            readonly connections: (paginationKey?: Uint8Array) => Promise<QueryConnectionsResponse>;
            readonly allConnections: () => Promise<QueryConnectionsResponse>;
            readonly clientConnections: (clientId: string) => Promise<QueryClientConnectionsResponse>;
            readonly clientState: (connectionId: string) => Promise<QueryConnectionClientStateResponse>;
            readonly consensusState: (connectionId: string, revisionNumber: number, revisionHeight: number) => Promise<QueryConnectionConsensusStateResponse>;
        };
        readonly transfer: {
            readonly denomTrace: (hash: string) => Promise<QueryDenomTraceResponse>;
            readonly denomTraces: (paginationKey?: Uint8Array) => Promise<QueryDenomTracesResponse>;
            readonly allDenomTraces: () => Promise<QueryDenomTracesResponse>;
            readonly params: () => Promise<QueryTransferParamsResponse>;
        };
        readonly verified: {
            readonly channel: {
                readonly channel: (portId: string, channelId: string) => Promise<Channel | null>;
                readonly packetCommitment: (portId: string, channelId: string, sequence: number) => Promise<Uint8Array>;
                readonly packetAcknowledgement: (portId: string, channelId: string, sequence: number) => Promise<Uint8Array>;
                readonly nextSequenceReceive: (portId: string, channelId: string) => Promise<number | null>;
            };
        };
    };
}
export declare function setupIbcExtension(base: QueryClient): IbcExtension;
