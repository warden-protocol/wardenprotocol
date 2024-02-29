import { MsgChannelOpenTry } from "./types/ibc/core/channel/v1/tx";
import { MsgTimeoutOnClose } from "./types/ibc/core/channel/v1/tx";
import { QueryConnectionChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryChannelClientStateRequest } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedPacketsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceSendRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentResponse } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedPacketsResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelCloseInitResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelConsensusStateResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenTryResponse } from "./types/ibc/core/channel/v1/tx";
import { MsgRecvPacket } from "./types/ibc/core/channel/v1/tx";
import { MsgRecvPacketResponse } from "./types/ibc/core/channel/v1/tx";
import { Timeout } from "./types/ibc/core/channel/v1/channel";
import { QueryPacketAcknowledgementResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenConfirmResponse } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelCloseConfirm } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelRequest } from "./types/ibc/core/channel/v1/query";
import { QueryChannelResponse } from "./types/ibc/core/channel/v1/query";
import { QueryChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryChannelsResponse } from "./types/ibc/core/channel/v1/query";
import { Packet } from "./types/ibc/core/channel/v1/channel";
import { PacketId } from "./types/ibc/core/channel/v1/channel";
import { MsgChannelOpenInitResponse } from "./types/ibc/core/channel/v1/tx";
import { MsgAcknowledgement } from "./types/ibc/core/channel/v1/tx";
import { MsgTimeoutResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryPacketAcknowledgementRequest } from "./types/ibc/core/channel/v1/query";
import { Counterparty } from "./types/ibc/core/channel/v1/channel";
import { MsgChannelOpenAck } from "./types/ibc/core/channel/v1/tx";
import { QueryConnectionChannelsResponse } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceReceiveResponse } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceSendResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelCloseInit } from "./types/ibc/core/channel/v1/tx";
import { MsgTimeoutOnCloseResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryPacketCommitmentsResponse } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedAcksResponse } from "./types/ibc/core/channel/v1/query";
import { Channel } from "./types/ibc/core/channel/v1/channel";
import { MsgChannelOpenAckResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelConsensusStateRequest } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedAcksRequest } from "./types/ibc/core/channel/v1/query";
import { IdentifiedChannel } from "./types/ibc/core/channel/v1/channel";
import { GenesisState } from "./types/ibc/core/channel/v1/genesis";
import { MsgChannelOpenConfirm } from "./types/ibc/core/channel/v1/tx";
import { QueryPacketReceiptRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketAcknowledgementsRequest } from "./types/ibc/core/channel/v1/query";
import { PacketSequence } from "./types/ibc/core/channel/v1/genesis";
import { MsgTimeout } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenInit } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelClientStateResponse } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceReceiveRequest } from "./types/ibc/core/channel/v1/query";
import { MsgAcknowledgementResponse } from "./types/ibc/core/channel/v1/tx";
import { PacketState } from "./types/ibc/core/channel/v1/channel";
import { QueryPacketReceiptResponse } from "./types/ibc/core/channel/v1/query";
import { QueryPacketAcknowledgementsResponse } from "./types/ibc/core/channel/v1/query";
import { Acknowledgement } from "./types/ibc/core/channel/v1/channel";
import { MsgChannelCloseConfirmResponse } from "./types/ibc/core/channel/v1/tx";
const msgTypes = [
    ["/ibc.core.channel.v1.MsgChannelOpenTry", MsgChannelOpenTry],
    ["/ibc.core.channel.v1.MsgTimeoutOnClose", MsgTimeoutOnClose],
    ["/ibc.core.channel.v1.QueryConnectionChannelsRequest", QueryConnectionChannelsRequest],
    ["/ibc.core.channel.v1.QueryChannelClientStateRequest", QueryChannelClientStateRequest],
    ["/ibc.core.channel.v1.QueryUnreceivedPacketsRequest", QueryUnreceivedPacketsRequest],
    ["/ibc.core.channel.v1.QueryNextSequenceSendRequest", QueryNextSequenceSendRequest],
    ["/ibc.core.channel.v1.QueryPacketCommitmentResponse", QueryPacketCommitmentResponse],
    ["/ibc.core.channel.v1.QueryUnreceivedPacketsResponse", QueryUnreceivedPacketsResponse],
    ["/ibc.core.channel.v1.MsgChannelCloseInitResponse", MsgChannelCloseInitResponse],
    ["/ibc.core.channel.v1.QueryChannelConsensusStateResponse", QueryChannelConsensusStateResponse],
    ["/ibc.core.channel.v1.MsgChannelOpenTryResponse", MsgChannelOpenTryResponse],
    ["/ibc.core.channel.v1.MsgRecvPacket", MsgRecvPacket],
    ["/ibc.core.channel.v1.MsgRecvPacketResponse", MsgRecvPacketResponse],
    ["/ibc.core.channel.v1.Timeout", Timeout],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementResponse", QueryPacketAcknowledgementResponse],
    ["/ibc.core.channel.v1.MsgChannelOpenConfirmResponse", MsgChannelOpenConfirmResponse],
    ["/ibc.core.channel.v1.MsgChannelCloseConfirm", MsgChannelCloseConfirm],
    ["/ibc.core.channel.v1.QueryChannelRequest", QueryChannelRequest],
    ["/ibc.core.channel.v1.QueryChannelResponse", QueryChannelResponse],
    ["/ibc.core.channel.v1.QueryChannelsRequest", QueryChannelsRequest],
    ["/ibc.core.channel.v1.QueryChannelsResponse", QueryChannelsResponse],
    ["/ibc.core.channel.v1.Packet", Packet],
    ["/ibc.core.channel.v1.PacketId", PacketId],
    ["/ibc.core.channel.v1.MsgChannelOpenInitResponse", MsgChannelOpenInitResponse],
    ["/ibc.core.channel.v1.MsgAcknowledgement", MsgAcknowledgement],
    ["/ibc.core.channel.v1.MsgTimeoutResponse", MsgTimeoutResponse],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementRequest", QueryPacketAcknowledgementRequest],
    ["/ibc.core.channel.v1.Counterparty", Counterparty],
    ["/ibc.core.channel.v1.MsgChannelOpenAck", MsgChannelOpenAck],
    ["/ibc.core.channel.v1.QueryConnectionChannelsResponse", QueryConnectionChannelsResponse],
    ["/ibc.core.channel.v1.QueryNextSequenceReceiveResponse", QueryNextSequenceReceiveResponse],
    ["/ibc.core.channel.v1.QueryNextSequenceSendResponse", QueryNextSequenceSendResponse],
    ["/ibc.core.channel.v1.MsgChannelCloseInit", MsgChannelCloseInit],
    ["/ibc.core.channel.v1.MsgTimeoutOnCloseResponse", MsgTimeoutOnCloseResponse],
    ["/ibc.core.channel.v1.QueryPacketCommitmentsResponse", QueryPacketCommitmentsResponse],
    ["/ibc.core.channel.v1.QueryUnreceivedAcksResponse", QueryUnreceivedAcksResponse],
    ["/ibc.core.channel.v1.Channel", Channel],
    ["/ibc.core.channel.v1.MsgChannelOpenAckResponse", MsgChannelOpenAckResponse],
    ["/ibc.core.channel.v1.QueryChannelConsensusStateRequest", QueryChannelConsensusStateRequest],
    ["/ibc.core.channel.v1.QueryUnreceivedAcksRequest", QueryUnreceivedAcksRequest],
    ["/ibc.core.channel.v1.IdentifiedChannel", IdentifiedChannel],
    ["/ibc.core.channel.v1.GenesisState", GenesisState],
    ["/ibc.core.channel.v1.MsgChannelOpenConfirm", MsgChannelOpenConfirm],
    ["/ibc.core.channel.v1.QueryPacketReceiptRequest", QueryPacketReceiptRequest],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementsRequest", QueryPacketAcknowledgementsRequest],
    ["/ibc.core.channel.v1.PacketSequence", PacketSequence],
    ["/ibc.core.channel.v1.MsgTimeout", MsgTimeout],
    ["/ibc.core.channel.v1.MsgChannelOpenInit", MsgChannelOpenInit],
    ["/ibc.core.channel.v1.QueryChannelClientStateResponse", QueryChannelClientStateResponse],
    ["/ibc.core.channel.v1.QueryPacketCommitmentRequest", QueryPacketCommitmentRequest],
    ["/ibc.core.channel.v1.QueryPacketCommitmentsRequest", QueryPacketCommitmentsRequest],
    ["/ibc.core.channel.v1.QueryNextSequenceReceiveRequest", QueryNextSequenceReceiveRequest],
    ["/ibc.core.channel.v1.MsgAcknowledgementResponse", MsgAcknowledgementResponse],
    ["/ibc.core.channel.v1.PacketState", PacketState],
    ["/ibc.core.channel.v1.QueryPacketReceiptResponse", QueryPacketReceiptResponse],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementsResponse", QueryPacketAcknowledgementsResponse],
    ["/ibc.core.channel.v1.Acknowledgement", Acknowledgement],
    ["/ibc.core.channel.v1.MsgChannelCloseConfirmResponse", MsgChannelCloseConfirmResponse],
];
export { msgTypes };
