import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { Metadata } from "./types/ibc/applications/fee/v1/metadata";
import { MsgPayPacketFeeAsync } from "./types/ibc/applications/fee/v1/tx";
import { QueryIncentivizedPacketsForChannelRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalTimeoutFeesRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryPayeeResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryCounterpartyPayeeResponse } from "./types/ibc/applications/fee/v1/query";
import { PacketFees } from "./types/ibc/applications/fee/v1/fee";
import { Fee } from "./types/ibc/applications/fee/v1/fee";
import { MsgRegisterCounterpartyPayee } from "./types/ibc/applications/fee/v1/tx";
import { QueryIncentivizedPacketsRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryIncentivizedPacketsForChannelResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryCounterpartyPayeeRequest } from "./types/ibc/applications/fee/v1/query";
import { IncentivizedAcknowledgement } from "./types/ibc/applications/fee/v1/ack";
import { ForwardRelayerAddress } from "./types/ibc/applications/fee/v1/genesis";
import { PacketFee } from "./types/ibc/applications/fee/v1/fee";
import { MsgPayPacketFee } from "./types/ibc/applications/fee/v1/tx";
import { QueryTotalRecvFeesResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalTimeoutFeesResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryFeeEnabledChannelsRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryFeeEnabledChannelResponse } from "./types/ibc/applications/fee/v1/query";
import { GenesisState } from "./types/ibc/applications/fee/v1/genesis";
import { MsgRegisterCounterpartyPayeeResponse } from "./types/ibc/applications/fee/v1/tx";
import { IdentifiedPacketFees } from "./types/ibc/applications/fee/v1/fee";
import { QueryIncentivizedPacketRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryIncentivizedPacketResponse } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalAckFeesRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryTotalAckFeesResponse } from "./types/ibc/applications/fee/v1/query";
import { MsgRegisterPayeeResponse } from "./types/ibc/applications/fee/v1/tx";
import { FeeEnabledChannel } from "./types/ibc/applications/fee/v1/genesis";
import { MsgRegisterPayee } from "./types/ibc/applications/fee/v1/tx";
import { RegisteredPayee } from "./types/ibc/applications/fee/v1/genesis";
import { QueryPayeeRequest } from "./types/ibc/applications/fee/v1/query";
import { QueryFeeEnabledChannelRequest } from "./types/ibc/applications/fee/v1/query";
import { MsgPayPacketFeeResponse } from "./types/ibc/applications/fee/v1/tx";
import { QueryTotalRecvFeesRequest } from "./types/ibc/applications/fee/v1/query";
import { RegisteredCounterpartyPayee } from "./types/ibc/applications/fee/v1/genesis";
import { QueryFeeEnabledChannelsResponse } from "./types/ibc/applications/fee/v1/query";
import { MsgPayPacketFeeAsyncResponse } from "./types/ibc/applications/fee/v1/tx";
import { QueryIncentivizedPacketsResponse } from "./types/ibc/applications/fee/v1/query";
export { Metadata, MsgPayPacketFeeAsync, QueryIncentivizedPacketsForChannelRequest, QueryTotalTimeoutFeesRequest, QueryPayeeResponse, QueryCounterpartyPayeeResponse, PacketFees, Fee, MsgRegisterCounterpartyPayee, QueryIncentivizedPacketsRequest, QueryIncentivizedPacketsForChannelResponse, QueryCounterpartyPayeeRequest, IncentivizedAcknowledgement, ForwardRelayerAddress, PacketFee, MsgPayPacketFee, QueryTotalRecvFeesResponse, QueryTotalTimeoutFeesResponse, QueryFeeEnabledChannelsRequest, QueryFeeEnabledChannelResponse, GenesisState, MsgRegisterCounterpartyPayeeResponse, IdentifiedPacketFees, QueryIncentivizedPacketRequest, QueryIncentivizedPacketResponse, QueryTotalAckFeesRequest, QueryTotalAckFeesResponse, MsgRegisterPayeeResponse, FeeEnabledChannel, MsgRegisterPayee, RegisteredPayee, QueryPayeeRequest, QueryFeeEnabledChannelRequest, MsgPayPacketFeeResponse, QueryTotalRecvFeesRequest, RegisteredCounterpartyPayee, QueryFeeEnabledChannelsResponse, MsgPayPacketFeeAsyncResponse, QueryIncentivizedPacketsResponse };
type sendMetadataParams = {
    value: Metadata;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPayPacketFeeAsyncParams = {
    value: MsgPayPacketFeeAsync;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIncentivizedPacketsForChannelRequestParams = {
    value: QueryIncentivizedPacketsForChannelRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalTimeoutFeesRequestParams = {
    value: QueryTotalTimeoutFeesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPayeeResponseParams = {
    value: QueryPayeeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCounterpartyPayeeResponseParams = {
    value: QueryCounterpartyPayeeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendPacketFeesParams = {
    value: PacketFees;
    fee?: StdFee;
    memo?: string;
};
type sendFeeParams = {
    value: Fee;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRegisterCounterpartyPayeeParams = {
    value: MsgRegisterCounterpartyPayee;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIncentivizedPacketsRequestParams = {
    value: QueryIncentivizedPacketsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIncentivizedPacketsForChannelResponseParams = {
    value: QueryIncentivizedPacketsForChannelResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCounterpartyPayeeRequestParams = {
    value: QueryCounterpartyPayeeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendIncentivizedAcknowledgementParams = {
    value: IncentivizedAcknowledgement;
    fee?: StdFee;
    memo?: string;
};
type sendForwardRelayerAddressParams = {
    value: ForwardRelayerAddress;
    fee?: StdFee;
    memo?: string;
};
type sendPacketFeeParams = {
    value: PacketFee;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPayPacketFeeParams = {
    value: MsgPayPacketFee;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalRecvFeesResponseParams = {
    value: QueryTotalRecvFeesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalTimeoutFeesResponseParams = {
    value: QueryTotalTimeoutFeesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryFeeEnabledChannelsRequestParams = {
    value: QueryFeeEnabledChannelsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryFeeEnabledChannelResponseParams = {
    value: QueryFeeEnabledChannelResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRegisterCounterpartyPayeeResponseParams = {
    value: MsgRegisterCounterpartyPayeeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendIdentifiedPacketFeesParams = {
    value: IdentifiedPacketFees;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIncentivizedPacketRequestParams = {
    value: QueryIncentivizedPacketRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIncentivizedPacketResponseParams = {
    value: QueryIncentivizedPacketResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalAckFeesRequestParams = {
    value: QueryTotalAckFeesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalAckFeesResponseParams = {
    value: QueryTotalAckFeesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRegisterPayeeResponseParams = {
    value: MsgRegisterPayeeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendFeeEnabledChannelParams = {
    value: FeeEnabledChannel;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRegisterPayeeParams = {
    value: MsgRegisterPayee;
    fee?: StdFee;
    memo?: string;
};
type sendRegisteredPayeeParams = {
    value: RegisteredPayee;
    fee?: StdFee;
    memo?: string;
};
type sendQueryPayeeRequestParams = {
    value: QueryPayeeRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryFeeEnabledChannelRequestParams = {
    value: QueryFeeEnabledChannelRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPayPacketFeeResponseParams = {
    value: MsgPayPacketFeeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryTotalRecvFeesRequestParams = {
    value: QueryTotalRecvFeesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendRegisteredCounterpartyPayeeParams = {
    value: RegisteredCounterpartyPayee;
    fee?: StdFee;
    memo?: string;
};
type sendQueryFeeEnabledChannelsResponseParams = {
    value: QueryFeeEnabledChannelsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPayPacketFeeAsyncResponseParams = {
    value: MsgPayPacketFeeAsyncResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIncentivizedPacketsResponseParams = {
    value: QueryIncentivizedPacketsResponse;
    fee?: StdFee;
    memo?: string;
};
type metadataParams = {
    value: Metadata;
};
type msgPayPacketFeeAsyncParams = {
    value: MsgPayPacketFeeAsync;
};
type queryIncentivizedPacketsForChannelRequestParams = {
    value: QueryIncentivizedPacketsForChannelRequest;
};
type queryTotalTimeoutFeesRequestParams = {
    value: QueryTotalTimeoutFeesRequest;
};
type queryPayeeResponseParams = {
    value: QueryPayeeResponse;
};
type queryCounterpartyPayeeResponseParams = {
    value: QueryCounterpartyPayeeResponse;
};
type packetFeesParams = {
    value: PacketFees;
};
type feeParams = {
    value: Fee;
};
type msgRegisterCounterpartyPayeeParams = {
    value: MsgRegisterCounterpartyPayee;
};
type queryIncentivizedPacketsRequestParams = {
    value: QueryIncentivizedPacketsRequest;
};
type queryIncentivizedPacketsForChannelResponseParams = {
    value: QueryIncentivizedPacketsForChannelResponse;
};
type queryCounterpartyPayeeRequestParams = {
    value: QueryCounterpartyPayeeRequest;
};
type incentivizedAcknowledgementParams = {
    value: IncentivizedAcknowledgement;
};
type forwardRelayerAddressParams = {
    value: ForwardRelayerAddress;
};
type packetFeeParams = {
    value: PacketFee;
};
type msgPayPacketFeeParams = {
    value: MsgPayPacketFee;
};
type queryTotalRecvFeesResponseParams = {
    value: QueryTotalRecvFeesResponse;
};
type queryTotalTimeoutFeesResponseParams = {
    value: QueryTotalTimeoutFeesResponse;
};
type queryFeeEnabledChannelsRequestParams = {
    value: QueryFeeEnabledChannelsRequest;
};
type queryFeeEnabledChannelResponseParams = {
    value: QueryFeeEnabledChannelResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgRegisterCounterpartyPayeeResponseParams = {
    value: MsgRegisterCounterpartyPayeeResponse;
};
type identifiedPacketFeesParams = {
    value: IdentifiedPacketFees;
};
type queryIncentivizedPacketRequestParams = {
    value: QueryIncentivizedPacketRequest;
};
type queryIncentivizedPacketResponseParams = {
    value: QueryIncentivizedPacketResponse;
};
type queryTotalAckFeesRequestParams = {
    value: QueryTotalAckFeesRequest;
};
type queryTotalAckFeesResponseParams = {
    value: QueryTotalAckFeesResponse;
};
type msgRegisterPayeeResponseParams = {
    value: MsgRegisterPayeeResponse;
};
type feeEnabledChannelParams = {
    value: FeeEnabledChannel;
};
type msgRegisterPayeeParams = {
    value: MsgRegisterPayee;
};
type registeredPayeeParams = {
    value: RegisteredPayee;
};
type queryPayeeRequestParams = {
    value: QueryPayeeRequest;
};
type queryFeeEnabledChannelRequestParams = {
    value: QueryFeeEnabledChannelRequest;
};
type msgPayPacketFeeResponseParams = {
    value: MsgPayPacketFeeResponse;
};
type queryTotalRecvFeesRequestParams = {
    value: QueryTotalRecvFeesRequest;
};
type registeredCounterpartyPayeeParams = {
    value: RegisteredCounterpartyPayee;
};
type queryFeeEnabledChannelsResponseParams = {
    value: QueryFeeEnabledChannelsResponse;
};
type msgPayPacketFeeAsyncResponseParams = {
    value: MsgPayPacketFeeAsyncResponse;
};
type queryIncentivizedPacketsResponseParams = {
    value: QueryIncentivizedPacketsResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMetadata({ value, fee, memo }: sendMetadataParams): Promise<DeliverTxResponse>;
    sendMsgPayPacketFeeAsync({ value, fee, memo }: sendMsgPayPacketFeeAsyncParams): Promise<DeliverTxResponse>;
    sendQueryIncentivizedPacketsForChannelRequest({ value, fee, memo }: sendQueryIncentivizedPacketsForChannelRequestParams): Promise<DeliverTxResponse>;
    sendQueryTotalTimeoutFeesRequest({ value, fee, memo }: sendQueryTotalTimeoutFeesRequestParams): Promise<DeliverTxResponse>;
    sendQueryPayeeResponse({ value, fee, memo }: sendQueryPayeeResponseParams): Promise<DeliverTxResponse>;
    sendQueryCounterpartyPayeeResponse({ value, fee, memo }: sendQueryCounterpartyPayeeResponseParams): Promise<DeliverTxResponse>;
    sendPacketFees({ value, fee, memo }: sendPacketFeesParams): Promise<DeliverTxResponse>;
    sendFee({ value, fee, memo }: sendFeeParams): Promise<DeliverTxResponse>;
    sendMsgRegisterCounterpartyPayee({ value, fee, memo }: sendMsgRegisterCounterpartyPayeeParams): Promise<DeliverTxResponse>;
    sendQueryIncentivizedPacketsRequest({ value, fee, memo }: sendQueryIncentivizedPacketsRequestParams): Promise<DeliverTxResponse>;
    sendQueryIncentivizedPacketsForChannelResponse({ value, fee, memo }: sendQueryIncentivizedPacketsForChannelResponseParams): Promise<DeliverTxResponse>;
    sendQueryCounterpartyPayeeRequest({ value, fee, memo }: sendQueryCounterpartyPayeeRequestParams): Promise<DeliverTxResponse>;
    sendIncentivizedAcknowledgement({ value, fee, memo }: sendIncentivizedAcknowledgementParams): Promise<DeliverTxResponse>;
    sendForwardRelayerAddress({ value, fee, memo }: sendForwardRelayerAddressParams): Promise<DeliverTxResponse>;
    sendPacketFee({ value, fee, memo }: sendPacketFeeParams): Promise<DeliverTxResponse>;
    sendMsgPayPacketFee({ value, fee, memo }: sendMsgPayPacketFeeParams): Promise<DeliverTxResponse>;
    sendQueryTotalRecvFeesResponse({ value, fee, memo }: sendQueryTotalRecvFeesResponseParams): Promise<DeliverTxResponse>;
    sendQueryTotalTimeoutFeesResponse({ value, fee, memo }: sendQueryTotalTimeoutFeesResponseParams): Promise<DeliverTxResponse>;
    sendQueryFeeEnabledChannelsRequest({ value, fee, memo }: sendQueryFeeEnabledChannelsRequestParams): Promise<DeliverTxResponse>;
    sendQueryFeeEnabledChannelResponse({ value, fee, memo }: sendQueryFeeEnabledChannelResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgRegisterCounterpartyPayeeResponse({ value, fee, memo }: sendMsgRegisterCounterpartyPayeeResponseParams): Promise<DeliverTxResponse>;
    sendIdentifiedPacketFees({ value, fee, memo }: sendIdentifiedPacketFeesParams): Promise<DeliverTxResponse>;
    sendQueryIncentivizedPacketRequest({ value, fee, memo }: sendQueryIncentivizedPacketRequestParams): Promise<DeliverTxResponse>;
    sendQueryIncentivizedPacketResponse({ value, fee, memo }: sendQueryIncentivizedPacketResponseParams): Promise<DeliverTxResponse>;
    sendQueryTotalAckFeesRequest({ value, fee, memo }: sendQueryTotalAckFeesRequestParams): Promise<DeliverTxResponse>;
    sendQueryTotalAckFeesResponse({ value, fee, memo }: sendQueryTotalAckFeesResponseParams): Promise<DeliverTxResponse>;
    sendMsgRegisterPayeeResponse({ value, fee, memo }: sendMsgRegisterPayeeResponseParams): Promise<DeliverTxResponse>;
    sendFeeEnabledChannel({ value, fee, memo }: sendFeeEnabledChannelParams): Promise<DeliverTxResponse>;
    sendMsgRegisterPayee({ value, fee, memo }: sendMsgRegisterPayeeParams): Promise<DeliverTxResponse>;
    sendRegisteredPayee({ value, fee, memo }: sendRegisteredPayeeParams): Promise<DeliverTxResponse>;
    sendQueryPayeeRequest({ value, fee, memo }: sendQueryPayeeRequestParams): Promise<DeliverTxResponse>;
    sendQueryFeeEnabledChannelRequest({ value, fee, memo }: sendQueryFeeEnabledChannelRequestParams): Promise<DeliverTxResponse>;
    sendMsgPayPacketFeeResponse({ value, fee, memo }: sendMsgPayPacketFeeResponseParams): Promise<DeliverTxResponse>;
    sendQueryTotalRecvFeesRequest({ value, fee, memo }: sendQueryTotalRecvFeesRequestParams): Promise<DeliverTxResponse>;
    sendRegisteredCounterpartyPayee({ value, fee, memo }: sendRegisteredCounterpartyPayeeParams): Promise<DeliverTxResponse>;
    sendQueryFeeEnabledChannelsResponse({ value, fee, memo }: sendQueryFeeEnabledChannelsResponseParams): Promise<DeliverTxResponse>;
    sendMsgPayPacketFeeAsyncResponse({ value, fee, memo }: sendMsgPayPacketFeeAsyncResponseParams): Promise<DeliverTxResponse>;
    sendQueryIncentivizedPacketsResponse({ value, fee, memo }: sendQueryIncentivizedPacketsResponseParams): Promise<DeliverTxResponse>;
    metadata({ value }: metadataParams): EncodeObject;
    msgPayPacketFeeAsync({ value }: msgPayPacketFeeAsyncParams): EncodeObject;
    queryIncentivizedPacketsForChannelRequest({ value }: queryIncentivizedPacketsForChannelRequestParams): EncodeObject;
    queryTotalTimeoutFeesRequest({ value }: queryTotalTimeoutFeesRequestParams): EncodeObject;
    queryPayeeResponse({ value }: queryPayeeResponseParams): EncodeObject;
    queryCounterpartyPayeeResponse({ value }: queryCounterpartyPayeeResponseParams): EncodeObject;
    packetFees({ value }: packetFeesParams): EncodeObject;
    fee({ value }: feeParams): EncodeObject;
    msgRegisterCounterpartyPayee({ value }: msgRegisterCounterpartyPayeeParams): EncodeObject;
    queryIncentivizedPacketsRequest({ value }: queryIncentivizedPacketsRequestParams): EncodeObject;
    queryIncentivizedPacketsForChannelResponse({ value }: queryIncentivizedPacketsForChannelResponseParams): EncodeObject;
    queryCounterpartyPayeeRequest({ value }: queryCounterpartyPayeeRequestParams): EncodeObject;
    incentivizedAcknowledgement({ value }: incentivizedAcknowledgementParams): EncodeObject;
    forwardRelayerAddress({ value }: forwardRelayerAddressParams): EncodeObject;
    packetFee({ value }: packetFeeParams): EncodeObject;
    msgPayPacketFee({ value }: msgPayPacketFeeParams): EncodeObject;
    queryTotalRecvFeesResponse({ value }: queryTotalRecvFeesResponseParams): EncodeObject;
    queryTotalTimeoutFeesResponse({ value }: queryTotalTimeoutFeesResponseParams): EncodeObject;
    queryFeeEnabledChannelsRequest({ value }: queryFeeEnabledChannelsRequestParams): EncodeObject;
    queryFeeEnabledChannelResponse({ value }: queryFeeEnabledChannelResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgRegisterCounterpartyPayeeResponse({ value }: msgRegisterCounterpartyPayeeResponseParams): EncodeObject;
    identifiedPacketFees({ value }: identifiedPacketFeesParams): EncodeObject;
    queryIncentivizedPacketRequest({ value }: queryIncentivizedPacketRequestParams): EncodeObject;
    queryIncentivizedPacketResponse({ value }: queryIncentivizedPacketResponseParams): EncodeObject;
    queryTotalAckFeesRequest({ value }: queryTotalAckFeesRequestParams): EncodeObject;
    queryTotalAckFeesResponse({ value }: queryTotalAckFeesResponseParams): EncodeObject;
    msgRegisterPayeeResponse({ value }: msgRegisterPayeeResponseParams): EncodeObject;
    feeEnabledChannel({ value }: feeEnabledChannelParams): EncodeObject;
    msgRegisterPayee({ value }: msgRegisterPayeeParams): EncodeObject;
    registeredPayee({ value }: registeredPayeeParams): EncodeObject;
    queryPayeeRequest({ value }: queryPayeeRequestParams): EncodeObject;
    queryFeeEnabledChannelRequest({ value }: queryFeeEnabledChannelRequestParams): EncodeObject;
    msgPayPacketFeeResponse({ value }: msgPayPacketFeeResponseParams): EncodeObject;
    queryTotalRecvFeesRequest({ value }: queryTotalRecvFeesRequestParams): EncodeObject;
    registeredCounterpartyPayee({ value }: registeredCounterpartyPayeeParams): EncodeObject;
    queryFeeEnabledChannelsResponse({ value }: queryFeeEnabledChannelsResponseParams): EncodeObject;
    msgPayPacketFeeAsyncResponse({ value }: msgPayPacketFeeAsyncResponseParams): EncodeObject;
    queryIncentivizedPacketsResponse({ value }: queryIncentivizedPacketsResponseParams): EncodeObject;
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
        IbcApplicationsFeeV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
