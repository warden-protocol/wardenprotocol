import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgAcknowledgement } from "./types/ibc/core/channel/v1/tx";
import { MsgTimeoutOnCloseResponse } from "./types/ibc/core/channel/v1/tx";
import { IdentifiedChannel } from "./types/ibc/core/channel/v1/channel";
import { QueryChannelConsensusStateResponse } from "./types/ibc/core/channel/v1/query";
import { QueryConnectionChannelsResponse } from "./types/ibc/core/channel/v1/query";
import { QueryPacketAcknowledgementsResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenAck } from "./types/ibc/core/channel/v1/tx";
import { PacketId } from "./types/ibc/core/channel/v1/channel";
import { Timeout } from "./types/ibc/core/channel/v1/channel";
import { QueryPacketAcknowledgementResponse } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedAcksRequest } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceSendResponse } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedAcksResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelCloseConfirm } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenInitResponse } from "./types/ibc/core/channel/v1/tx";
import { Channel } from "./types/ibc/core/channel/v1/channel";
import { QueryPacketCommitmentResponse } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceReceiveResponse } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenInit } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenTry } from "./types/ibc/core/channel/v1/tx";
import { GenesisState } from "./types/ibc/core/channel/v1/genesis";
import { MsgChannelCloseInit } from "./types/ibc/core/channel/v1/tx";
import { MsgRecvPacketResponse } from "./types/ibc/core/channel/v1/tx";
import { Packet } from "./types/ibc/core/channel/v1/channel";
import { QueryNextSequenceSendRequest } from "./types/ibc/core/channel/v1/query";
import { MsgTimeout } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenTryResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelsResponse } from "./types/ibc/core/channel/v1/query";
import { QueryPacketReceiptResponse } from "./types/ibc/core/channel/v1/query";
import { PacketSequence } from "./types/ibc/core/channel/v1/genesis";
import { MsgRecvPacket } from "./types/ibc/core/channel/v1/tx";
import { Counterparty } from "./types/ibc/core/channel/v1/channel";
import { QueryPacketCommitmentsResponse } from "./types/ibc/core/channel/v1/query";
import { QueryUnreceivedPacketsResponse } from "./types/ibc/core/channel/v1/query";
import { MsgAcknowledgementResponse } from "./types/ibc/core/channel/v1/tx";
import { PacketState } from "./types/ibc/core/channel/v1/channel";
import { QueryChannelClientStateResponse } from "./types/ibc/core/channel/v1/query";
import { QueryConnectionChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentRequest } from "./types/ibc/core/channel/v1/query";
import { MsgChannelOpenConfirm } from "./types/ibc/core/channel/v1/tx";
import { Acknowledgement } from "./types/ibc/core/channel/v1/channel";
import { QueryChannelConsensusStateRequest } from "./types/ibc/core/channel/v1/query";
import { MsgTimeoutOnClose } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenAckResponse } from "./types/ibc/core/channel/v1/tx";
import { MsgChannelOpenConfirmResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryPacketAcknowledgementsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryChannelRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketReceiptRequest } from "./types/ibc/core/channel/v1/query";
import { QueryNextSequenceReceiveRequest } from "./types/ibc/core/channel/v1/query";
import { MsgChannelCloseConfirmResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryUnreceivedPacketsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryChannelsRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketAcknowledgementRequest } from "./types/ibc/core/channel/v1/query";
import { MsgChannelCloseInitResponse } from "./types/ibc/core/channel/v1/tx";
import { MsgTimeoutResponse } from "./types/ibc/core/channel/v1/tx";
import { QueryChannelResponse } from "./types/ibc/core/channel/v1/query";
import { QueryChannelClientStateRequest } from "./types/ibc/core/channel/v1/query";
import { QueryPacketCommitmentsRequest } from "./types/ibc/core/channel/v1/query";
export { MsgAcknowledgement, MsgTimeoutOnCloseResponse, IdentifiedChannel, QueryChannelConsensusStateResponse, QueryConnectionChannelsResponse, QueryPacketAcknowledgementsResponse, MsgChannelOpenAck, PacketId, Timeout, QueryPacketAcknowledgementResponse, QueryUnreceivedAcksRequest, QueryNextSequenceSendResponse, QueryUnreceivedAcksResponse, MsgChannelCloseConfirm, MsgChannelOpenInitResponse, Channel, QueryPacketCommitmentResponse, QueryNextSequenceReceiveResponse, MsgChannelOpenInit, MsgChannelOpenTry, GenesisState, MsgChannelCloseInit, MsgRecvPacketResponse, Packet, QueryNextSequenceSendRequest, MsgTimeout, MsgChannelOpenTryResponse, QueryChannelsResponse, QueryPacketReceiptResponse, PacketSequence, MsgRecvPacket, Counterparty, QueryPacketCommitmentsResponse, QueryUnreceivedPacketsResponse, MsgAcknowledgementResponse, PacketState, QueryChannelClientStateResponse, QueryConnectionChannelsRequest, QueryPacketCommitmentRequest, MsgChannelOpenConfirm, Acknowledgement, QueryChannelConsensusStateRequest, MsgTimeoutOnClose, MsgChannelOpenAckResponse, MsgChannelOpenConfirmResponse, QueryPacketAcknowledgementsRequest, QueryChannelRequest, QueryPacketReceiptRequest, QueryNextSequenceReceiveRequest, MsgChannelCloseConfirmResponse, QueryUnreceivedPacketsRequest, QueryChannelsRequest, QueryPacketAcknowledgementRequest, MsgChannelCloseInitResponse, MsgTimeoutResponse, QueryChannelResponse, QueryChannelClientStateRequest, QueryPacketCommitmentsRequest };
type sendMsgAcknowledgementParams = {
    value: MsgAcknowledgement;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTimeoutOnCloseResponseParams = {
    value: MsgTimeoutOnCloseResponse;
    fee?: StdFee;
    memo?: string;
};
type sendIdentifiedChannelParams = {
    value: IdentifiedChannel;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelConsensusStateResponseParams = {
    value: QueryChannelConsensusStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConnectionChannelsResponseParams = {
    value: QueryConnectionChannelsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketAcknowledgementsResponseParams = {
    value: QueryPacketAcknowledgementsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenAckParams = {
    value: MsgChannelOpenAck;
    fee?: StdFee;
    memo?: string;
};
type sendPacketIdParams = {
    value: PacketId;
    fee?: StdFee;
    memo?: string;
};
type sendTimeoutParams = {
    value: Timeout;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketAcknowledgementResponseParams = {
    value: QueryPacketAcknowledgementResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUnreceivedAcksRequestParams = {
    value: QueryUnreceivedAcksRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryNextSequenceSendResponseParams = {
    value: QueryNextSequenceSendResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUnreceivedAcksResponseParams = {
    value: QueryUnreceivedAcksResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelCloseConfirmParams = {
    value: MsgChannelCloseConfirm;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenInitResponseParams = {
    value: MsgChannelOpenInitResponse;
    fee?: StdFee;
    memo?: string;
};
type sendChannelParams = {
    value: Channel;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketCommitmentResponseParams = {
    value: QueryPacketCommitmentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryNextSequenceReceiveResponseParams = {
    value: QueryNextSequenceReceiveResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenInitParams = {
    value: MsgChannelOpenInit;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenTryParams = {
    value: MsgChannelOpenTry;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelCloseInitParams = {
    value: MsgChannelCloseInit;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRecvPacketResponseParams = {
    value: MsgRecvPacketResponse;
    fee?: StdFee;
    memo?: string;
};
type sendPacketParams = {
    value: Packet;
    fee?: StdFee;
    memo?: string;
};
type sendQueryNextSequenceSendRequestParams = {
    value: QueryNextSequenceSendRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTimeoutParams = {
    value: MsgTimeout;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenTryResponseParams = {
    value: MsgChannelOpenTryResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelsResponseParams = {
    value: QueryChannelsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketReceiptResponseParams = {
    value: QueryPacketReceiptResponse;
    fee?: StdFee;
    memo?: string;
};
type sendPacketSequenceParams = {
    value: PacketSequence;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRecvPacketParams = {
    value: MsgRecvPacket;
    fee?: StdFee;
    memo?: string;
};
type sendCounterpartyParams = {
    value: Counterparty;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketCommitmentsResponseParams = {
    value: QueryPacketCommitmentsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUnreceivedPacketsResponseParams = {
    value: QueryUnreceivedPacketsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgAcknowledgementResponseParams = {
    value: MsgAcknowledgementResponse;
    fee?: StdFee;
    memo?: string;
};
type sendPacketStateParams = {
    value: PacketState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelClientStateResponseParams = {
    value: QueryChannelClientStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConnectionChannelsRequestParams = {
    value: QueryConnectionChannelsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketCommitmentRequestParams = {
    value: QueryPacketCommitmentRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenConfirmParams = {
    value: MsgChannelOpenConfirm;
    fee?: StdFee;
    memo?: string;
};
type sendAcknowledgementParams = {
    value: Acknowledgement;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelConsensusStateRequestParams = {
    value: QueryChannelConsensusStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTimeoutOnCloseParams = {
    value: MsgTimeoutOnClose;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenAckResponseParams = {
    value: MsgChannelOpenAckResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelOpenConfirmResponseParams = {
    value: MsgChannelOpenConfirmResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketAcknowledgementsRequestParams = {
    value: QueryPacketAcknowledgementsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelRequestParams = {
    value: QueryChannelRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketReceiptRequestParams = {
    value: QueryPacketReceiptRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryNextSequenceReceiveRequestParams = {
    value: QueryNextSequenceReceiveRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelCloseConfirmResponseParams = {
    value: MsgChannelCloseConfirmResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUnreceivedPacketsRequestParams = {
    value: QueryUnreceivedPacketsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelsRequestParams = {
    value: QueryChannelsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketAcknowledgementRequestParams = {
    value: QueryPacketAcknowledgementRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgChannelCloseInitResponseParams = {
    value: MsgChannelCloseInitResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgTimeoutResponseParams = {
    value: MsgTimeoutResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelResponseParams = {
    value: QueryChannelResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryChannelClientStateRequestParams = {
    value: QueryChannelClientStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPacketCommitmentsRequestParams = {
    value: QueryPacketCommitmentsRequest;
    fee?: StdFee;
    memo?: string;
};
type msgAcknowledgementParams = {
    value: MsgAcknowledgement;
};
type msgTimeoutOnCloseResponseParams = {
    value: MsgTimeoutOnCloseResponse;
};
type identifiedChannelParams = {
    value: IdentifiedChannel;
};
type queryChannelConsensusStateResponseParams = {
    value: QueryChannelConsensusStateResponse;
};
type queryConnectionChannelsResponseParams = {
    value: QueryConnectionChannelsResponse;
};
type queryPacketAcknowledgementsResponseParams = {
    value: QueryPacketAcknowledgementsResponse;
};
type msgChannelOpenAckParams = {
    value: MsgChannelOpenAck;
};
type packetIdParams = {
    value: PacketId;
};
type timeoutParams = {
    value: Timeout;
};
type queryPacketAcknowledgementResponseParams = {
    value: QueryPacketAcknowledgementResponse;
};
type queryUnreceivedAcksRequestParams = {
    value: QueryUnreceivedAcksRequest;
};
type queryNextSequenceSendResponseParams = {
    value: QueryNextSequenceSendResponse;
};
type queryUnreceivedAcksResponseParams = {
    value: QueryUnreceivedAcksResponse;
};
type msgChannelCloseConfirmParams = {
    value: MsgChannelCloseConfirm;
};
type msgChannelOpenInitResponseParams = {
    value: MsgChannelOpenInitResponse;
};
type channelParams = {
    value: Channel;
};
type queryPacketCommitmentResponseParams = {
    value: QueryPacketCommitmentResponse;
};
type queryNextSequenceReceiveResponseParams = {
    value: QueryNextSequenceReceiveResponse;
};
type msgChannelOpenInitParams = {
    value: MsgChannelOpenInit;
};
type msgChannelOpenTryParams = {
    value: MsgChannelOpenTry;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgChannelCloseInitParams = {
    value: MsgChannelCloseInit;
};
type msgRecvPacketResponseParams = {
    value: MsgRecvPacketResponse;
};
type packetParams = {
    value: Packet;
};
type queryNextSequenceSendRequestParams = {
    value: QueryNextSequenceSendRequest;
};
type msgTimeoutParams = {
    value: MsgTimeout;
};
type msgChannelOpenTryResponseParams = {
    value: MsgChannelOpenTryResponse;
};
type queryChannelsResponseParams = {
    value: QueryChannelsResponse;
};
type queryPacketReceiptResponseParams = {
    value: QueryPacketReceiptResponse;
};
type packetSequenceParams = {
    value: PacketSequence;
};
type msgRecvPacketParams = {
    value: MsgRecvPacket;
};
type counterpartyParams = {
    value: Counterparty;
};
type queryPacketCommitmentsResponseParams = {
    value: QueryPacketCommitmentsResponse;
};
type queryUnreceivedPacketsResponseParams = {
    value: QueryUnreceivedPacketsResponse;
};
type msgAcknowledgementResponseParams = {
    value: MsgAcknowledgementResponse;
};
type packetStateParams = {
    value: PacketState;
};
type queryChannelClientStateResponseParams = {
    value: QueryChannelClientStateResponse;
};
type queryConnectionChannelsRequestParams = {
    value: QueryConnectionChannelsRequest;
};
type queryPacketCommitmentRequestParams = {
    value: QueryPacketCommitmentRequest;
};
type msgChannelOpenConfirmParams = {
    value: MsgChannelOpenConfirm;
};
type acknowledgementParams = {
    value: Acknowledgement;
};
type queryChannelConsensusStateRequestParams = {
    value: QueryChannelConsensusStateRequest;
};
type msgTimeoutOnCloseParams = {
    value: MsgTimeoutOnClose;
};
type msgChannelOpenAckResponseParams = {
    value: MsgChannelOpenAckResponse;
};
type msgChannelOpenConfirmResponseParams = {
    value: MsgChannelOpenConfirmResponse;
};
type queryPacketAcknowledgementsRequestParams = {
    value: QueryPacketAcknowledgementsRequest;
};
type queryChannelRequestParams = {
    value: QueryChannelRequest;
};
type queryPacketReceiptRequestParams = {
    value: QueryPacketReceiptRequest;
};
type queryNextSequenceReceiveRequestParams = {
    value: QueryNextSequenceReceiveRequest;
};
type msgChannelCloseConfirmResponseParams = {
    value: MsgChannelCloseConfirmResponse;
};
type queryUnreceivedPacketsRequestParams = {
    value: QueryUnreceivedPacketsRequest;
};
type queryChannelsRequestParams = {
    value: QueryChannelsRequest;
};
type queryPacketAcknowledgementRequestParams = {
    value: QueryPacketAcknowledgementRequest;
};
type msgChannelCloseInitResponseParams = {
    value: MsgChannelCloseInitResponse;
};
type msgTimeoutResponseParams = {
    value: MsgTimeoutResponse;
};
type queryChannelResponseParams = {
    value: QueryChannelResponse;
};
type queryChannelClientStateRequestParams = {
    value: QueryChannelClientStateRequest;
};
type queryPacketCommitmentsRequestParams = {
    value: QueryPacketCommitmentsRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgAcknowledgement({ value, fee, memo }: sendMsgAcknowledgementParams): Promise<DeliverTxResponse>;
    sendMsgTimeoutOnCloseResponse({ value, fee, memo }: sendMsgTimeoutOnCloseResponseParams): Promise<DeliverTxResponse>;
    sendIdentifiedChannel({ value, fee, memo }: sendIdentifiedChannelParams): Promise<DeliverTxResponse>;
    sendQueryChannelConsensusStateResponse({ value, fee, memo }: sendQueryChannelConsensusStateResponseParams): Promise<DeliverTxResponse>;
    sendQueryConnectionChannelsResponse({ value, fee, memo }: sendQueryConnectionChannelsResponseParams): Promise<DeliverTxResponse>;
    sendQueryPacketAcknowledgementsResponse({ value, fee, memo }: sendQueryPacketAcknowledgementsResponseParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenAck({ value, fee, memo }: sendMsgChannelOpenAckParams): Promise<DeliverTxResponse>;
    sendPacketId({ value, fee, memo }: sendPacketIdParams): Promise<DeliverTxResponse>;
    sendTimeout({ value, fee, memo }: sendTimeoutParams): Promise<DeliverTxResponse>;
    sendQueryPacketAcknowledgementResponse({ value, fee, memo }: sendQueryPacketAcknowledgementResponseParams): Promise<DeliverTxResponse>;
    sendQueryUnreceivedAcksRequest({ value, fee, memo }: sendQueryUnreceivedAcksRequestParams): Promise<DeliverTxResponse>;
    sendQueryNextSequenceSendResponse({ value, fee, memo }: sendQueryNextSequenceSendResponseParams): Promise<DeliverTxResponse>;
    sendQueryUnreceivedAcksResponse({ value, fee, memo }: sendQueryUnreceivedAcksResponseParams): Promise<DeliverTxResponse>;
    sendMsgChannelCloseConfirm({ value, fee, memo }: sendMsgChannelCloseConfirmParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenInitResponse({ value, fee, memo }: sendMsgChannelOpenInitResponseParams): Promise<DeliverTxResponse>;
    sendChannel({ value, fee, memo }: sendChannelParams): Promise<DeliverTxResponse>;
    sendQueryPacketCommitmentResponse({ value, fee, memo }: sendQueryPacketCommitmentResponseParams): Promise<DeliverTxResponse>;
    sendQueryNextSequenceReceiveResponse({ value, fee, memo }: sendQueryNextSequenceReceiveResponseParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenInit({ value, fee, memo }: sendMsgChannelOpenInitParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenTry({ value, fee, memo }: sendMsgChannelOpenTryParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgChannelCloseInit({ value, fee, memo }: sendMsgChannelCloseInitParams): Promise<DeliverTxResponse>;
    sendMsgRecvPacketResponse({ value, fee, memo }: sendMsgRecvPacketResponseParams): Promise<DeliverTxResponse>;
    sendPacket({ value, fee, memo }: sendPacketParams): Promise<DeliverTxResponse>;
    sendQueryNextSequenceSendRequest({ value, fee, memo }: sendQueryNextSequenceSendRequestParams): Promise<DeliverTxResponse>;
    sendMsgTimeout({ value, fee, memo }: sendMsgTimeoutParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenTryResponse({ value, fee, memo }: sendMsgChannelOpenTryResponseParams): Promise<DeliverTxResponse>;
    sendQueryChannelsResponse({ value, fee, memo }: sendQueryChannelsResponseParams): Promise<DeliverTxResponse>;
    sendQueryPacketReceiptResponse({ value, fee, memo }: sendQueryPacketReceiptResponseParams): Promise<DeliverTxResponse>;
    sendPacketSequence({ value, fee, memo }: sendPacketSequenceParams): Promise<DeliverTxResponse>;
    sendMsgRecvPacket({ value, fee, memo }: sendMsgRecvPacketParams): Promise<DeliverTxResponse>;
    sendCounterparty({ value, fee, memo }: sendCounterpartyParams): Promise<DeliverTxResponse>;
    sendQueryPacketCommitmentsResponse({ value, fee, memo }: sendQueryPacketCommitmentsResponseParams): Promise<DeliverTxResponse>;
    sendQueryUnreceivedPacketsResponse({ value, fee, memo }: sendQueryUnreceivedPacketsResponseParams): Promise<DeliverTxResponse>;
    sendMsgAcknowledgementResponse({ value, fee, memo }: sendMsgAcknowledgementResponseParams): Promise<DeliverTxResponse>;
    sendPacketState({ value, fee, memo }: sendPacketStateParams): Promise<DeliverTxResponse>;
    sendQueryChannelClientStateResponse({ value, fee, memo }: sendQueryChannelClientStateResponseParams): Promise<DeliverTxResponse>;
    sendQueryConnectionChannelsRequest({ value, fee, memo }: sendQueryConnectionChannelsRequestParams): Promise<DeliverTxResponse>;
    sendQueryPacketCommitmentRequest({ value, fee, memo }: sendQueryPacketCommitmentRequestParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenConfirm({ value, fee, memo }: sendMsgChannelOpenConfirmParams): Promise<DeliverTxResponse>;
    sendAcknowledgement({ value, fee, memo }: sendAcknowledgementParams): Promise<DeliverTxResponse>;
    sendQueryChannelConsensusStateRequest({ value, fee, memo }: sendQueryChannelConsensusStateRequestParams): Promise<DeliverTxResponse>;
    sendMsgTimeoutOnClose({ value, fee, memo }: sendMsgTimeoutOnCloseParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenAckResponse({ value, fee, memo }: sendMsgChannelOpenAckResponseParams): Promise<DeliverTxResponse>;
    sendMsgChannelOpenConfirmResponse({ value, fee, memo }: sendMsgChannelOpenConfirmResponseParams): Promise<DeliverTxResponse>;
    sendQueryPacketAcknowledgementsRequest({ value, fee, memo }: sendQueryPacketAcknowledgementsRequestParams): Promise<DeliverTxResponse>;
    sendQueryChannelRequest({ value, fee, memo }: sendQueryChannelRequestParams): Promise<DeliverTxResponse>;
    sendQueryPacketReceiptRequest({ value, fee, memo }: sendQueryPacketReceiptRequestParams): Promise<DeliverTxResponse>;
    sendQueryNextSequenceReceiveRequest({ value, fee, memo }: sendQueryNextSequenceReceiveRequestParams): Promise<DeliverTxResponse>;
    sendMsgChannelCloseConfirmResponse({ value, fee, memo }: sendMsgChannelCloseConfirmResponseParams): Promise<DeliverTxResponse>;
    sendQueryUnreceivedPacketsRequest({ value, fee, memo }: sendQueryUnreceivedPacketsRequestParams): Promise<DeliverTxResponse>;
    sendQueryChannelsRequest({ value, fee, memo }: sendQueryChannelsRequestParams): Promise<DeliverTxResponse>;
    sendQueryPacketAcknowledgementRequest({ value, fee, memo }: sendQueryPacketAcknowledgementRequestParams): Promise<DeliverTxResponse>;
    sendMsgChannelCloseInitResponse({ value, fee, memo }: sendMsgChannelCloseInitResponseParams): Promise<DeliverTxResponse>;
    sendMsgTimeoutResponse({ value, fee, memo }: sendMsgTimeoutResponseParams): Promise<DeliverTxResponse>;
    sendQueryChannelResponse({ value, fee, memo }: sendQueryChannelResponseParams): Promise<DeliverTxResponse>;
    sendQueryChannelClientStateRequest({ value, fee, memo }: sendQueryChannelClientStateRequestParams): Promise<DeliverTxResponse>;
    sendQueryPacketCommitmentsRequest({ value, fee, memo }: sendQueryPacketCommitmentsRequestParams): Promise<DeliverTxResponse>;
    msgAcknowledgement({ value }: msgAcknowledgementParams): EncodeObject;
    msgTimeoutOnCloseResponse({ value }: msgTimeoutOnCloseResponseParams): EncodeObject;
    identifiedChannel({ value }: identifiedChannelParams): EncodeObject;
    queryChannelConsensusStateResponse({ value }: queryChannelConsensusStateResponseParams): EncodeObject;
    queryConnectionChannelsResponse({ value }: queryConnectionChannelsResponseParams): EncodeObject;
    queryPacketAcknowledgementsResponse({ value }: queryPacketAcknowledgementsResponseParams): EncodeObject;
    msgChannelOpenAck({ value }: msgChannelOpenAckParams): EncodeObject;
    packetId({ value }: packetIdParams): EncodeObject;
    timeout({ value }: timeoutParams): EncodeObject;
    queryPacketAcknowledgementResponse({ value }: queryPacketAcknowledgementResponseParams): EncodeObject;
    queryUnreceivedAcksRequest({ value }: queryUnreceivedAcksRequestParams): EncodeObject;
    queryNextSequenceSendResponse({ value }: queryNextSequenceSendResponseParams): EncodeObject;
    queryUnreceivedAcksResponse({ value }: queryUnreceivedAcksResponseParams): EncodeObject;
    msgChannelCloseConfirm({ value }: msgChannelCloseConfirmParams): EncodeObject;
    msgChannelOpenInitResponse({ value }: msgChannelOpenInitResponseParams): EncodeObject;
    channel({ value }: channelParams): EncodeObject;
    queryPacketCommitmentResponse({ value }: queryPacketCommitmentResponseParams): EncodeObject;
    queryNextSequenceReceiveResponse({ value }: queryNextSequenceReceiveResponseParams): EncodeObject;
    msgChannelOpenInit({ value }: msgChannelOpenInitParams): EncodeObject;
    msgChannelOpenTry({ value }: msgChannelOpenTryParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgChannelCloseInit({ value }: msgChannelCloseInitParams): EncodeObject;
    msgRecvPacketResponse({ value }: msgRecvPacketResponseParams): EncodeObject;
    packet({ value }: packetParams): EncodeObject;
    queryNextSequenceSendRequest({ value }: queryNextSequenceSendRequestParams): EncodeObject;
    msgTimeout({ value }: msgTimeoutParams): EncodeObject;
    msgChannelOpenTryResponse({ value }: msgChannelOpenTryResponseParams): EncodeObject;
    queryChannelsResponse({ value }: queryChannelsResponseParams): EncodeObject;
    queryPacketReceiptResponse({ value }: queryPacketReceiptResponseParams): EncodeObject;
    packetSequence({ value }: packetSequenceParams): EncodeObject;
    msgRecvPacket({ value }: msgRecvPacketParams): EncodeObject;
    counterparty({ value }: counterpartyParams): EncodeObject;
    queryPacketCommitmentsResponse({ value }: queryPacketCommitmentsResponseParams): EncodeObject;
    queryUnreceivedPacketsResponse({ value }: queryUnreceivedPacketsResponseParams): EncodeObject;
    msgAcknowledgementResponse({ value }: msgAcknowledgementResponseParams): EncodeObject;
    packetState({ value }: packetStateParams): EncodeObject;
    queryChannelClientStateResponse({ value }: queryChannelClientStateResponseParams): EncodeObject;
    queryConnectionChannelsRequest({ value }: queryConnectionChannelsRequestParams): EncodeObject;
    queryPacketCommitmentRequest({ value }: queryPacketCommitmentRequestParams): EncodeObject;
    msgChannelOpenConfirm({ value }: msgChannelOpenConfirmParams): EncodeObject;
    acknowledgement({ value }: acknowledgementParams): EncodeObject;
    queryChannelConsensusStateRequest({ value }: queryChannelConsensusStateRequestParams): EncodeObject;
    msgTimeoutOnClose({ value }: msgTimeoutOnCloseParams): EncodeObject;
    msgChannelOpenAckResponse({ value }: msgChannelOpenAckResponseParams): EncodeObject;
    msgChannelOpenConfirmResponse({ value }: msgChannelOpenConfirmResponseParams): EncodeObject;
    queryPacketAcknowledgementsRequest({ value }: queryPacketAcknowledgementsRequestParams): EncodeObject;
    queryChannelRequest({ value }: queryChannelRequestParams): EncodeObject;
    queryPacketReceiptRequest({ value }: queryPacketReceiptRequestParams): EncodeObject;
    queryNextSequenceReceiveRequest({ value }: queryNextSequenceReceiveRequestParams): EncodeObject;
    msgChannelCloseConfirmResponse({ value }: msgChannelCloseConfirmResponseParams): EncodeObject;
    queryUnreceivedPacketsRequest({ value }: queryUnreceivedPacketsRequestParams): EncodeObject;
    queryChannelsRequest({ value }: queryChannelsRequestParams): EncodeObject;
    queryPacketAcknowledgementRequest({ value }: queryPacketAcknowledgementRequestParams): EncodeObject;
    msgChannelCloseInitResponse({ value }: msgChannelCloseInitResponseParams): EncodeObject;
    msgTimeoutResponse({ value }: msgTimeoutResponseParams): EncodeObject;
    queryChannelResponse({ value }: queryChannelResponseParams): EncodeObject;
    queryChannelClientStateRequest({ value }: queryChannelClientStateRequestParams): EncodeObject;
    queryPacketCommitmentsRequest({ value }: queryPacketCommitmentsRequestParams): EncodeObject;
};
interface QueryClientOptions {
    addr: string;
}
export declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Api<unknown>;
declare class SDKModule {
    query: ReturnType<typeof queryClient>;
    tx: ReturnType<typeof txClient>;
    structure: Record<string, unknown>;
    registry: Array<[string, GeneratedType]>;
    constructor(client: IgniteClient);
    updateTX(client: IgniteClient): void;
}
declare const IgntModule: (test: IgniteClient) => {
    module: {
        IbcCoreChannelV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
