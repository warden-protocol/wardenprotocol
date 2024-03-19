import { MsgChannelOpenTry } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelClientStateResponse } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentRequest } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedAcksResponse } from "./types/ibc/core/channel/v1/query";
import { MsgTimeoutOnClose } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelCloseConfirmResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketAcknowledgementsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceReceiveRequest } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenConfirmResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryNextSequenceSendResponse } from "./types/ibc/core/channel/v1/query";
import { MsgAcknowledgementResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryUnreceivedAcksRequest } from "./types/ibc/core/channel/v1/query";
import { Acknowledgement } from "./types/ibc/core/channel/v1/channel";
import { MsgChannelCloseInitResponse } from "./types/ibc/core/channel/v1/tx";
import { Counterparty } from "./types/ibc/core/channel/v1/channel";
import { QueryPacketCommitmentsResponse } from "./types/ibc/core/channel/v1/query";
import { QueryPacketReceiptRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketAcknowledgementResponse } from "./types/ibc/core/channel/v1/query";
import { QueryConnectionChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryConnectionChannelsResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenAck } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenConfirm } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelConsensusStateResponse } from "./types/ibc/core/channel/v1/query";
import { MsgTimeoutOnCloseResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelsResponse } from "./types/ibc/core/channel/v1/query";
import { PacketId } from "./types/ibc/core/channel/v1/channel";
import { MsgRecvPacket } from "./types/ibc/core/channel/v1/tx";
import { QueryUnreceivedPacketsResponse } from "./types/ibc/core/channel/v1/query";
import { QueryChannelClientStateRequest } from "./types/ibc/core/channel/v1/query";
import { QueryChannelConsensusStateRequest } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedPacketsRequest } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenInit } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelCloseInit } from "./types/ibc/core/channel/v1/tx";
import { MsgTimeout } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenAckResponse } from "./types/ibc/core/channel/v1/tx";
import { MsgRecvPacketResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelResponse } from "./types/ibc/core/channel/v1/query";
import { MsgAcknowledgement } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentResponse } from "./types/ibc/core/channel/v1/query";
import { QueryPacketReceiptResponse } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceReceiveResponse } from "./types/ibc/core/channel/v1/query";
import { Timeout } from "./types/ibc/core/channel/v1/channel";
import { MsgTimeoutResponse } from "./types/ibc/core/channel/v1/tx";
import { GenesisState } from "./types/ibc/core/channel/v1/genesis";
import { Packet } from "./types/ibc/core/channel/v1/channel";
import { QueryPacketCommitmentsRequest } from "./types/ibc/core/channel/v1/query";
import { MsgChannelCloseConfirm } from "./types/ibc/core/channel/v1/tx";
import { QueryPacketAcknowledgementsResponse } from "./types/ibc/core/channel/v1/query";
import { PacketState } from "./types/ibc/core/channel/v1/channel";
import { IdentifiedChannel } from "./types/ibc/core/channel/v1/channel";
import { QueryNextSequenceSendRequest } from "./types/ibc/core/channel/v1/query";
import { PacketSequence } from "./types/ibc/core/channel/v1/genesis";
import { Channel } from "./types/ibc/core/channel/v1/channel";
import { MsgChannelOpenTryResponse } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenInitResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryPacketAcknowledgementRequest } from "./types/ibc/core/channel/v1/query";
const msgTypes = [
    ["/ibc.core.channel.v1.MsgChannelOpenTry", MsgChannelOpenTry],
    ["/ibc.core.channel.v1.QueryChannelClientStateResponse", QueryChannelClientStateResponse],
    ["/ibc.core.channel.v1.QueryPacketCommitmentRequest", QueryPacketCommitmentRequest],
    ["/ibc.core.channel.v1.QueryUnreceivedAcksResponse", QueryUnreceivedAcksResponse],
    ["/ibc.core.channel.v1.MsgTimeoutOnClose", MsgTimeoutOnClose],
    ["/ibc.core.channel.v1.MsgChannelCloseConfirmResponse", MsgChannelCloseConfirmResponse],
    ["/ibc.core.channel.v1.QueryChannelsRequest", QueryChannelsRequest],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementsRequest", QueryPacketAcknowledgementsRequest],
    ["/ibc.core.channel.v1.QueryNextSequenceReceiveRequest", QueryNextSequenceReceiveRequest],
    ["/ibc.core.channel.v1.MsgChannelOpenConfirmResponse", MsgChannelOpenConfirmResponse],
    ["/ibc.core.channel.v1.QueryNextSequenceSendResponse", QueryNextSequenceSendResponse],
    ["/ibc.core.channel.v1.MsgAcknowledgementResponse", MsgAcknowledgementResponse],
    ["/ibc.core.channel.v1.QueryUnreceivedAcksRequest", QueryUnreceivedAcksRequest],
    ["/ibc.core.channel.v1.Acknowledgement", Acknowledgement],
    ["/ibc.core.channel.v1.MsgChannelCloseInitResponse", MsgChannelCloseInitResponse],
    ["/ibc.core.channel.v1.Counterparty", Counterparty],
    ["/ibc.core.channel.v1.QueryPacketCommitmentsResponse", QueryPacketCommitmentsResponse],
    ["/ibc.core.channel.v1.QueryPacketReceiptRequest", QueryPacketReceiptRequest],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementResponse", QueryPacketAcknowledgementResponse],
    ["/ibc.core.channel.v1.QueryConnectionChannelsRequest", QueryConnectionChannelsRequest],
    ["/ibc.core.channel.v1.QueryConnectionChannelsResponse", QueryConnectionChannelsResponse],
    ["/ibc.core.channel.v1.MsgChannelOpenAck", MsgChannelOpenAck],
    ["/ibc.core.channel.v1.MsgChannelOpenConfirm", MsgChannelOpenConfirm],
    ["/ibc.core.channel.v1.QueryChannelConsensusStateResponse", QueryChannelConsensusStateResponse],
    ["/ibc.core.channel.v1.MsgTimeoutOnCloseResponse", MsgTimeoutOnCloseResponse],
    ["/ibc.core.channel.v1.QueryChannelsResponse", QueryChannelsResponse],
    ["/ibc.core.channel.v1.PacketId", PacketId],
    ["/ibc.core.channel.v1.MsgRecvPacket", MsgRecvPacket],
    ["/ibc.core.channel.v1.QueryUnreceivedPacketsResponse", QueryUnreceivedPacketsResponse],
    ["/ibc.core.channel.v1.QueryChannelClientStateRequest", QueryChannelClientStateRequest],
    ["/ibc.core.channel.v1.QueryChannelConsensusStateRequest", QueryChannelConsensusStateRequest],
    ["/ibc.core.channel.v1.QueryUnreceivedPacketsRequest", QueryUnreceivedPacketsRequest],
    ["/ibc.core.channel.v1.MsgChannelOpenInit", MsgChannelOpenInit],
    ["/ibc.core.channel.v1.MsgChannelCloseInit", MsgChannelCloseInit],
    ["/ibc.core.channel.v1.MsgTimeout", MsgTimeout],
    ["/ibc.core.channel.v1.MsgChannelOpenAckResponse", MsgChannelOpenAckResponse],
    ["/ibc.core.channel.v1.MsgRecvPacketResponse", MsgRecvPacketResponse],
    ["/ibc.core.channel.v1.QueryChannelResponse", QueryChannelResponse],
    ["/ibc.core.channel.v1.MsgAcknowledgement", MsgAcknowledgement],
    ["/ibc.core.channel.v1.QueryChannelRequest", QueryChannelRequest],
    ["/ibc.core.channel.v1.QueryPacketCommitmentResponse", QueryPacketCommitmentResponse],
    ["/ibc.core.channel.v1.QueryPacketReceiptResponse", QueryPacketReceiptResponse],
    ["/ibc.core.channel.v1.QueryNextSequenceReceiveResponse", QueryNextSequenceReceiveResponse],
    ["/ibc.core.channel.v1.Timeout", Timeout],
    ["/ibc.core.channel.v1.MsgTimeoutResponse", MsgTimeoutResponse],
    ["/ibc.core.channel.v1.GenesisState", GenesisState],
    ["/ibc.core.channel.v1.Packet", Packet],
    ["/ibc.core.channel.v1.QueryPacketCommitmentsRequest", QueryPacketCommitmentsRequest],
    ["/ibc.core.channel.v1.MsgChannelCloseConfirm", MsgChannelCloseConfirm],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementsResponse", QueryPacketAcknowledgementsResponse],
    ["/ibc.core.channel.v1.PacketState", PacketState],
    ["/ibc.core.channel.v1.IdentifiedChannel", IdentifiedChannel],
    ["/ibc.core.channel.v1.QueryNextSequenceSendRequest", QueryNextSequenceSendRequest],
    ["/ibc.core.channel.v1.PacketSequence", PacketSequence],
    ["/ibc.core.channel.v1.Channel", Channel],
    ["/ibc.core.channel.v1.MsgChannelOpenTryResponse", MsgChannelOpenTryResponse],
    ["/ibc.core.channel.v1.MsgChannelOpenInitResponse", MsgChannelOpenInitResponse],
    ["/ibc.core.channel.v1.QueryPacketAcknowledgementRequest", QueryPacketAcknowledgementRequest],
];
export { msgTypes };
