import { GeneratedType } from "@cosmjs/proto-signing";
import { FeeEnabledChannel } from "./types/ibc/applications/fee/v1/genesis";
import { QueryTotalAckFeesResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryCounterpartyPayeeRequest } from "./types/ibc/applications/fee/v1/query";
import { GenesisState } from "./types/ibc/applications/fee/v1/genesis";
import { MsgPayPacketFeeAsyncResponse } from "./types/ibc/applications/fee/v1/tx";
import { RegisteredPayee } from "./types/ibc/applications/fee/v1/genesis";
import { PacketFees } from "./types/ibc/applications/fee/v1/fee";
import { QueryPayeeRequest } from "./types/ibc/applications/fee/v1/query";
import { MsgPayPacketFeeResponse } from "./types/ibc/applications/fee/v1/tx";
import { QueryCounterpartyPayeeResponse } from "./types/ibc/applications/fee/v1/query";
import { MsgRegisterCounterpartyPayee } from "./types/ibc/applications/fee/v1/tx";
import { MsgPayPacketFeeAsync } from "./types/ibc/applications/fee/v1/tx";
import { PacketFee } from "./types/ibc/applications/fee/v1/fee";
import { IdentifiedPacketFees } from "./types/ibc/applications/fee/v1/fee";
import { QueryPayeeResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryFeeEnabledChannelResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryIncentivizedPacketResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalRecvFeesRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalTimeoutFeesResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalTimeoutFeesRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryFeeEnabledChannelsResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryFeeEnabledChannelRequest } from "./types/ibc/applications/fee/v1/query";
import { Metadata } from "./types/ibc/applications/fee/v1/metadata";
import { Fee } from "./types/ibc/applications/fee/v1/fee";
import { QueryIncentivizedPacketsRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryIncentivizedPacketsForChannelResponse } from "./types/ibc/applications/fee/v1/query";
import { RegisteredCounterpartyPayee } from "./types/ibc/applications/fee/v1/genesis";
import { MsgRegisterPayee } from "./types/ibc/applications/fee/v1/tx";
import { MsgRegisterCounterpartyPayeeResponse } from "./types/ibc/applications/fee/v1/tx";
import { ForwardRelayerAddress } from "./types/ibc/applications/fee/v1/genesis";
import { QueryTotalRecvFeesResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalAckFeesRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryFeeEnabledChannelsRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryIncentivizedPacketsForChannelRequest } from "./types/ibc/applications/fee/v1/query";
import { MsgRegisterPayeeResponse } from "./types/ibc/applications/fee/v1/tx";
import { MsgPayPacketFee } from "./types/ibc/applications/fee/v1/tx";
import { IncentivizedAcknowledgement } from "./types/ibc/applications/fee/v1/ack";
import { QueryIncentivizedPacketsResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryIncentivizedPacketRequest } from "./types/ibc/applications/fee/v1/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/ibc.applications.fee.v1.FeeEnabledChannel", FeeEnabledChannel],
    ["/ibc.applications.fee.v1.QueryTotalAckFeesResponse", QueryTotalAckFeesResponse],
    ["/ibc.applications.fee.v1.QueryCounterpartyPayeeRequest", QueryCounterpartyPayeeRequest],
    ["/ibc.applications.fee.v1.GenesisState", GenesisState],
    ["/ibc.applications.fee.v1.MsgPayPacketFeeAsyncResponse", MsgPayPacketFeeAsyncResponse],
    ["/ibc.applications.fee.v1.RegisteredPayee", RegisteredPayee],
    ["/ibc.applications.fee.v1.PacketFees", PacketFees],
    ["/ibc.applications.fee.v1.QueryPayeeRequest", QueryPayeeRequest],
    ["/ibc.applications.fee.v1.MsgPayPacketFeeResponse", MsgPayPacketFeeResponse],
    ["/ibc.applications.fee.v1.QueryCounterpartyPayeeResponse", QueryCounterpartyPayeeResponse],
    ["/ibc.applications.fee.v1.MsgRegisterCounterpartyPayee", MsgRegisterCounterpartyPayee],
    ["/ibc.applications.fee.v1.MsgPayPacketFeeAsync", MsgPayPacketFeeAsync],
    ["/ibc.applications.fee.v1.PacketFee", PacketFee],
    ["/ibc.applications.fee.v1.IdentifiedPacketFees", IdentifiedPacketFees],
    ["/ibc.applications.fee.v1.QueryPayeeResponse", QueryPayeeResponse],
    ["/ibc.applications.fee.v1.QueryFeeEnabledChannelResponse", QueryFeeEnabledChannelResponse],
    ["/ibc.applications.fee.v1.QueryIncentivizedPacketResponse", QueryIncentivizedPacketResponse],
    ["/ibc.applications.fee.v1.QueryTotalRecvFeesRequest", QueryTotalRecvFeesRequest],
    ["/ibc.applications.fee.v1.QueryTotalTimeoutFeesResponse", QueryTotalTimeoutFeesResponse],
    ["/ibc.applications.fee.v1.QueryTotalTimeoutFeesRequest", QueryTotalTimeoutFeesRequest],
    ["/ibc.applications.fee.v1.QueryFeeEnabledChannelsResponse", QueryFeeEnabledChannelsResponse],
    ["/ibc.applications.fee.v1.QueryFeeEnabledChannelRequest", QueryFeeEnabledChannelRequest],
    ["/ibc.applications.fee.v1.Metadata", Metadata],
    ["/ibc.applications.fee.v1.Fee", Fee],
    ["/ibc.applications.fee.v1.QueryIncentivizedPacketsRequest", QueryIncentivizedPacketsRequest],
    ["/ibc.applications.fee.v1.QueryIncentivizedPacketsForChannelResponse", QueryIncentivizedPacketsForChannelResponse],
    ["/ibc.applications.fee.v1.RegisteredCounterpartyPayee", RegisteredCounterpartyPayee],
    ["/ibc.applications.fee.v1.MsgRegisterPayee", MsgRegisterPayee],
    ["/ibc.applications.fee.v1.MsgRegisterCounterpartyPayeeResponse", MsgRegisterCounterpartyPayeeResponse],
    ["/ibc.applications.fee.v1.ForwardRelayerAddress", ForwardRelayerAddress],
    ["/ibc.applications.fee.v1.QueryTotalRecvFeesResponse", QueryTotalRecvFeesResponse],
    ["/ibc.applications.fee.v1.QueryTotalAckFeesRequest", QueryTotalAckFeesRequest],
    ["/ibc.applications.fee.v1.QueryFeeEnabledChannelsRequest", QueryFeeEnabledChannelsRequest],
    ["/ibc.applications.fee.v1.QueryIncentivizedPacketsForChannelRequest", QueryIncentivizedPacketsForChannelRequest],
    ["/ibc.applications.fee.v1.MsgRegisterPayeeResponse", MsgRegisterPayeeResponse],
    ["/ibc.applications.fee.v1.MsgPayPacketFee", MsgPayPacketFee],
    ["/ibc.applications.fee.v1.IncentivizedAcknowledgement", IncentivizedAcknowledgement],
    ["/ibc.applications.fee.v1.QueryIncentivizedPacketsResponse", QueryIncentivizedPacketsResponse],
    ["/ibc.applications.fee.v1.QueryIncentivizedPacketRequest", QueryIncentivizedPacketRequest],
    
];

export { msgTypes }