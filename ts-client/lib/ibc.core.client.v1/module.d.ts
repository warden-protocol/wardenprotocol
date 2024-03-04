import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryClientStatusRequest } from "./types/ibc/core/client/v1/query";
import { MsgUpgradeClientResponse } from "./types/ibc/core/client/v1/tx";
import { MsgUpgradeClient } from "./types/ibc/core/client/v1/tx";
import { QueryConsensusStatesResponse } from "./types/ibc/core/client/v1/query";
import { QueryClientStateRequest } from "./types/ibc/core/client/v1/query";
import { QueryUpgradedClientStateRequest } from "./types/ibc/core/client/v1/query";
import { QueryUpgradedClientStateResponse } from "./types/ibc/core/client/v1/query";
import { QueryUpgradedConsensusStateRequest } from "./types/ibc/core/client/v1/query";
import { MsgIBCSoftwareUpgrade } from "./types/ibc/core/client/v1/tx";
import { MsgUpdateParams } from "./types/ibc/core/client/v1/tx";
import { QueryConsensusStateHeightsResponse } from "./types/ibc/core/client/v1/query";
import { QueryConsensusStatesRequest } from "./types/ibc/core/client/v1/query";
import { QueryClientParamsResponse } from "./types/ibc/core/client/v1/query";
import { MsgUpdateClientResponse } from "./types/ibc/core/client/v1/tx";
import { MsgRecoverClientResponse } from "./types/ibc/core/client/v1/tx";
import { MsgCreateClient } from "./types/ibc/core/client/v1/tx";
import { ClientConsensusStates } from "./types/ibc/core/client/v1/client";
import { MsgSubmitMisbehaviour } from "./types/ibc/core/client/v1/tx";
import { MsgCreateClientResponse } from "./types/ibc/core/client/v1/tx";
import { MsgIBCSoftwareUpgradeResponse } from "./types/ibc/core/client/v1/tx";
import { QueryConsensusStateResponse } from "./types/ibc/core/client/v1/query";
import { ConsensusStateWithHeight } from "./types/ibc/core/client/v1/client";
import { GenesisState } from "./types/ibc/core/client/v1/genesis";
import { MsgUpdateClient } from "./types/ibc/core/client/v1/tx";
import { QueryClientStatesResponse } from "./types/ibc/core/client/v1/query";
import { GenesisMetadata } from "./types/ibc/core/client/v1/genesis";
import { QueryUpgradedConsensusStateResponse } from "./types/ibc/core/client/v1/query";
import { Height } from "./types/ibc/core/client/v1/client";
import { QueryClientParamsRequest } from "./types/ibc/core/client/v1/query";
import { UpgradeProposal } from "./types/ibc/core/client/v1/client";
import { MsgSubmitMisbehaviourResponse } from "./types/ibc/core/client/v1/tx";
import { MsgUpdateParamsResponse } from "./types/ibc/core/client/v1/tx";
import { Params } from "./types/ibc/core/client/v1/client";
import { QueryClientStatesRequest } from "./types/ibc/core/client/v1/query";
import { QueryClientStatusResponse } from "./types/ibc/core/client/v1/query";
import { QueryConsensusStateRequest } from "./types/ibc/core/client/v1/query";
import { QueryConsensusStateHeightsRequest } from "./types/ibc/core/client/v1/query";
import { IdentifiedClientState } from "./types/ibc/core/client/v1/client";
import { ClientUpdateProposal } from "./types/ibc/core/client/v1/client";
import { IdentifiedGenesisMetadata } from "./types/ibc/core/client/v1/genesis";
import { MsgRecoverClient } from "./types/ibc/core/client/v1/tx";
import { QueryClientStateResponse } from "./types/ibc/core/client/v1/query";
export { QueryClientStatusRequest, MsgUpgradeClientResponse, MsgUpgradeClient, QueryConsensusStatesResponse, QueryClientStateRequest, QueryUpgradedClientStateRequest, QueryUpgradedClientStateResponse, QueryUpgradedConsensusStateRequest, MsgIBCSoftwareUpgrade, MsgUpdateParams, QueryConsensusStateHeightsResponse, QueryConsensusStatesRequest, QueryClientParamsResponse, MsgUpdateClientResponse, MsgRecoverClientResponse, MsgCreateClient, ClientConsensusStates, MsgSubmitMisbehaviour, MsgCreateClientResponse, MsgIBCSoftwareUpgradeResponse, QueryConsensusStateResponse, ConsensusStateWithHeight, GenesisState, MsgUpdateClient, QueryClientStatesResponse, GenesisMetadata, QueryUpgradedConsensusStateResponse, Height, QueryClientParamsRequest, UpgradeProposal, MsgSubmitMisbehaviourResponse, MsgUpdateParamsResponse, Params, QueryClientStatesRequest, QueryClientStatusResponse, QueryConsensusStateRequest, QueryConsensusStateHeightsRequest, IdentifiedClientState, ClientUpdateProposal, IdentifiedGenesisMetadata, MsgRecoverClient, QueryClientStateResponse };
type sendQueryClientStatusRequestParams = {
    value: QueryClientStatusRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpgradeClientResponseParams = {
    value: MsgUpgradeClientResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpgradeClientParams = {
    value: MsgUpgradeClient;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConsensusStatesResponseParams = {
    value: QueryConsensusStatesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryClientStateRequestParams = {
    value: QueryClientStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedClientStateRequestParams = {
    value: QueryUpgradedClientStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedClientStateResponseParams = {
    value: QueryUpgradedClientStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedConsensusStateRequestParams = {
    value: QueryUpgradedConsensusStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgIBCSoftwareUpgradeParams = {
    value: MsgIBCSoftwareUpgrade;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConsensusStateHeightsResponseParams = {
    value: QueryConsensusStateHeightsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConsensusStatesRequestParams = {
    value: QueryConsensusStatesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryClientParamsResponseParams = {
    value: QueryClientParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateClientResponseParams = {
    value: MsgUpdateClientResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRecoverClientResponseParams = {
    value: MsgRecoverClientResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateClientParams = {
    value: MsgCreateClient;
    fee?: StdFee;
    memo?: string;
};
type sendClientConsensusStatesParams = {
    value: ClientConsensusStates;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitMisbehaviourParams = {
    value: MsgSubmitMisbehaviour;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCreateClientResponseParams = {
    value: MsgCreateClientResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgIBCSoftwareUpgradeResponseParams = {
    value: MsgIBCSoftwareUpgradeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConsensusStateResponseParams = {
    value: QueryConsensusStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendConsensusStateWithHeightParams = {
    value: ConsensusStateWithHeight;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateClientParams = {
    value: MsgUpdateClient;
    fee?: StdFee;
    memo?: string;
};
type sendQueryClientStatesResponseParams = {
    value: QueryClientStatesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisMetadataParams = {
    value: GenesisMetadata;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedConsensusStateResponseParams = {
    value: QueryUpgradedConsensusStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendHeightParams = {
    value: Height;
    fee?: StdFee;
    memo?: string;
};
type sendQueryClientParamsRequestParams = {
    value: QueryClientParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendUpgradeProposalParams = {
    value: UpgradeProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitMisbehaviourResponseParams = {
    value: MsgSubmitMisbehaviourResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryClientStatesRequestParams = {
    value: QueryClientStatesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryClientStatusResponseParams = {
    value: QueryClientStatusResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConsensusStateRequestParams = {
    value: QueryConsensusStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryConsensusStateHeightsRequestParams = {
    value: QueryConsensusStateHeightsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendIdentifiedClientStateParams = {
    value: IdentifiedClientState;
    fee?: StdFee;
    memo?: string;
};
type sendClientUpdateProposalParams = {
    value: ClientUpdateProposal;
    fee?: StdFee;
    memo?: string;
};
type sendIdentifiedGenesisMetadataParams = {
    value: IdentifiedGenesisMetadata;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRecoverClientParams = {
    value: MsgRecoverClient;
    fee?: StdFee;
    memo?: string;
};
type sendQueryClientStateResponseParams = {
    value: QueryClientStateResponse;
    fee?: StdFee;
    memo?: string;
};
type queryClientStatusRequestParams = {
    value: QueryClientStatusRequest;
};
type msgUpgradeClientResponseParams = {
    value: MsgUpgradeClientResponse;
};
type msgUpgradeClientParams = {
    value: MsgUpgradeClient;
};
type queryConsensusStatesResponseParams = {
    value: QueryConsensusStatesResponse;
};
type queryClientStateRequestParams = {
    value: QueryClientStateRequest;
};
type queryUpgradedClientStateRequestParams = {
    value: QueryUpgradedClientStateRequest;
};
type queryUpgradedClientStateResponseParams = {
    value: QueryUpgradedClientStateResponse;
};
type queryUpgradedConsensusStateRequestParams = {
    value: QueryUpgradedConsensusStateRequest;
};
type msgIbcsoftwareUpgradeParams = {
    value: MsgIBCSoftwareUpgrade;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryConsensusStateHeightsResponseParams = {
    value: QueryConsensusStateHeightsResponse;
};
type queryConsensusStatesRequestParams = {
    value: QueryConsensusStatesRequest;
};
type queryClientParamsResponseParams = {
    value: QueryClientParamsResponse;
};
type msgUpdateClientResponseParams = {
    value: MsgUpdateClientResponse;
};
type msgRecoverClientResponseParams = {
    value: MsgRecoverClientResponse;
};
type msgCreateClientParams = {
    value: MsgCreateClient;
};
type clientConsensusStatesParams = {
    value: ClientConsensusStates;
};
type msgSubmitMisbehaviourParams = {
    value: MsgSubmitMisbehaviour;
};
type msgCreateClientResponseParams = {
    value: MsgCreateClientResponse;
};
type msgIbcsoftwareUpgradeResponseParams = {
    value: MsgIBCSoftwareUpgradeResponse;
};
type queryConsensusStateResponseParams = {
    value: QueryConsensusStateResponse;
};
type consensusStateWithHeightParams = {
    value: ConsensusStateWithHeight;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgUpdateClientParams = {
    value: MsgUpdateClient;
};
type queryClientStatesResponseParams = {
    value: QueryClientStatesResponse;
};
type genesisMetadataParams = {
    value: GenesisMetadata;
};
type queryUpgradedConsensusStateResponseParams = {
    value: QueryUpgradedConsensusStateResponse;
};
type heightParams = {
    value: Height;
};
type queryClientParamsRequestParams = {
    value: QueryClientParamsRequest;
};
type upgradeProposalParams = {
    value: UpgradeProposal;
};
type msgSubmitMisbehaviourResponseParams = {
    value: MsgSubmitMisbehaviourResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type paramsParams = {
    value: Params;
};
type queryClientStatesRequestParams = {
    value: QueryClientStatesRequest;
};
type queryClientStatusResponseParams = {
    value: QueryClientStatusResponse;
};
type queryConsensusStateRequestParams = {
    value: QueryConsensusStateRequest;
};
type queryConsensusStateHeightsRequestParams = {
    value: QueryConsensusStateHeightsRequest;
};
type identifiedClientStateParams = {
    value: IdentifiedClientState;
};
type clientUpdateProposalParams = {
    value: ClientUpdateProposal;
};
type identifiedGenesisMetadataParams = {
    value: IdentifiedGenesisMetadata;
};
type msgRecoverClientParams = {
    value: MsgRecoverClient;
};
type queryClientStateResponseParams = {
    value: QueryClientStateResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryClientStatusRequest({ value, fee, memo }: sendQueryClientStatusRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpgradeClientResponse({ value, fee, memo }: sendMsgUpgradeClientResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpgradeClient({ value, fee, memo }: sendMsgUpgradeClientParams): Promise<DeliverTxResponse>;
    sendQueryConsensusStatesResponse({ value, fee, memo }: sendQueryConsensusStatesResponseParams): Promise<DeliverTxResponse>;
    sendQueryClientStateRequest({ value, fee, memo }: sendQueryClientStateRequestParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedClientStateRequest({ value, fee, memo }: sendQueryUpgradedClientStateRequestParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedClientStateResponse({ value, fee, memo }: sendQueryUpgradedClientStateResponseParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedConsensusStateRequest({ value, fee, memo }: sendQueryUpgradedConsensusStateRequestParams): Promise<DeliverTxResponse>;
    sendMsgIBCSoftwareUpgrade({ value, fee, memo }: sendMsgIBCSoftwareUpgradeParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryConsensusStateHeightsResponse({ value, fee, memo }: sendQueryConsensusStateHeightsResponseParams): Promise<DeliverTxResponse>;
    sendQueryConsensusStatesRequest({ value, fee, memo }: sendQueryConsensusStatesRequestParams): Promise<DeliverTxResponse>;
    sendQueryClientParamsResponse({ value, fee, memo }: sendQueryClientParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateClientResponse({ value, fee, memo }: sendMsgUpdateClientResponseParams): Promise<DeliverTxResponse>;
    sendMsgRecoverClientResponse({ value, fee, memo }: sendMsgRecoverClientResponseParams): Promise<DeliverTxResponse>;
    sendMsgCreateClient({ value, fee, memo }: sendMsgCreateClientParams): Promise<DeliverTxResponse>;
    sendClientConsensusStates({ value, fee, memo }: sendClientConsensusStatesParams): Promise<DeliverTxResponse>;
    sendMsgSubmitMisbehaviour({ value, fee, memo }: sendMsgSubmitMisbehaviourParams): Promise<DeliverTxResponse>;
    sendMsgCreateClientResponse({ value, fee, memo }: sendMsgCreateClientResponseParams): Promise<DeliverTxResponse>;
    sendMsgIBCSoftwareUpgradeResponse({ value, fee, memo }: sendMsgIBCSoftwareUpgradeResponseParams): Promise<DeliverTxResponse>;
    sendQueryConsensusStateResponse({ value, fee, memo }: sendQueryConsensusStateResponseParams): Promise<DeliverTxResponse>;
    sendConsensusStateWithHeight({ value, fee, memo }: sendConsensusStateWithHeightParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgUpdateClient({ value, fee, memo }: sendMsgUpdateClientParams): Promise<DeliverTxResponse>;
    sendQueryClientStatesResponse({ value, fee, memo }: sendQueryClientStatesResponseParams): Promise<DeliverTxResponse>;
    sendGenesisMetadata({ value, fee, memo }: sendGenesisMetadataParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedConsensusStateResponse({ value, fee, memo }: sendQueryUpgradedConsensusStateResponseParams): Promise<DeliverTxResponse>;
    sendHeight({ value, fee, memo }: sendHeightParams): Promise<DeliverTxResponse>;
    sendQueryClientParamsRequest({ value, fee, memo }: sendQueryClientParamsRequestParams): Promise<DeliverTxResponse>;
    sendUpgradeProposal({ value, fee, memo }: sendUpgradeProposalParams): Promise<DeliverTxResponse>;
    sendMsgSubmitMisbehaviourResponse({ value, fee, memo }: sendMsgSubmitMisbehaviourResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryClientStatesRequest({ value, fee, memo }: sendQueryClientStatesRequestParams): Promise<DeliverTxResponse>;
    sendQueryClientStatusResponse({ value, fee, memo }: sendQueryClientStatusResponseParams): Promise<DeliverTxResponse>;
    sendQueryConsensusStateRequest({ value, fee, memo }: sendQueryConsensusStateRequestParams): Promise<DeliverTxResponse>;
    sendQueryConsensusStateHeightsRequest({ value, fee, memo }: sendQueryConsensusStateHeightsRequestParams): Promise<DeliverTxResponse>;
    sendIdentifiedClientState({ value, fee, memo }: sendIdentifiedClientStateParams): Promise<DeliverTxResponse>;
    sendClientUpdateProposal({ value, fee, memo }: sendClientUpdateProposalParams): Promise<DeliverTxResponse>;
    sendIdentifiedGenesisMetadata({ value, fee, memo }: sendIdentifiedGenesisMetadataParams): Promise<DeliverTxResponse>;
    sendMsgRecoverClient({ value, fee, memo }: sendMsgRecoverClientParams): Promise<DeliverTxResponse>;
    sendQueryClientStateResponse({ value, fee, memo }: sendQueryClientStateResponseParams): Promise<DeliverTxResponse>;
    queryClientStatusRequest({ value }: queryClientStatusRequestParams): EncodeObject;
    msgUpgradeClientResponse({ value }: msgUpgradeClientResponseParams): EncodeObject;
    msgUpgradeClient({ value }: msgUpgradeClientParams): EncodeObject;
    queryConsensusStatesResponse({ value }: queryConsensusStatesResponseParams): EncodeObject;
    queryClientStateRequest({ value }: queryClientStateRequestParams): EncodeObject;
    queryUpgradedClientStateRequest({ value }: queryUpgradedClientStateRequestParams): EncodeObject;
    queryUpgradedClientStateResponse({ value }: queryUpgradedClientStateResponseParams): EncodeObject;
    queryUpgradedConsensusStateRequest({ value }: queryUpgradedConsensusStateRequestParams): EncodeObject;
    msgIbcsoftwareUpgrade({ value }: msgIbcsoftwareUpgradeParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryConsensusStateHeightsResponse({ value }: queryConsensusStateHeightsResponseParams): EncodeObject;
    queryConsensusStatesRequest({ value }: queryConsensusStatesRequestParams): EncodeObject;
    queryClientParamsResponse({ value }: queryClientParamsResponseParams): EncodeObject;
    msgUpdateClientResponse({ value }: msgUpdateClientResponseParams): EncodeObject;
    msgRecoverClientResponse({ value }: msgRecoverClientResponseParams): EncodeObject;
    msgCreateClient({ value }: msgCreateClientParams): EncodeObject;
    clientConsensusStates({ value }: clientConsensusStatesParams): EncodeObject;
    msgSubmitMisbehaviour({ value }: msgSubmitMisbehaviourParams): EncodeObject;
    msgCreateClientResponse({ value }: msgCreateClientResponseParams): EncodeObject;
    msgIbcsoftwareUpgradeResponse({ value }: msgIbcsoftwareUpgradeResponseParams): EncodeObject;
    queryConsensusStateResponse({ value }: queryConsensusStateResponseParams): EncodeObject;
    consensusStateWithHeight({ value }: consensusStateWithHeightParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgUpdateClient({ value }: msgUpdateClientParams): EncodeObject;
    queryClientStatesResponse({ value }: queryClientStatesResponseParams): EncodeObject;
    genesisMetadata({ value }: genesisMetadataParams): EncodeObject;
    queryUpgradedConsensusStateResponse({ value }: queryUpgradedConsensusStateResponseParams): EncodeObject;
    height({ value }: heightParams): EncodeObject;
    queryClientParamsRequest({ value }: queryClientParamsRequestParams): EncodeObject;
    upgradeProposal({ value }: upgradeProposalParams): EncodeObject;
    msgSubmitMisbehaviourResponse({ value }: msgSubmitMisbehaviourResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryClientStatesRequest({ value }: queryClientStatesRequestParams): EncodeObject;
    queryClientStatusResponse({ value }: queryClientStatusResponseParams): EncodeObject;
    queryConsensusStateRequest({ value }: queryConsensusStateRequestParams): EncodeObject;
    queryConsensusStateHeightsRequest({ value }: queryConsensusStateHeightsRequestParams): EncodeObject;
    identifiedClientState({ value }: identifiedClientStateParams): EncodeObject;
    clientUpdateProposal({ value }: clientUpdateProposalParams): EncodeObject;
    identifiedGenesisMetadata({ value }: identifiedGenesisMetadataParams): EncodeObject;
    msgRecoverClient({ value }: msgRecoverClientParams): EncodeObject;
    queryClientStateResponse({ value }: queryClientStateResponseParams): EncodeObject;
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
        IbcCoreClientV1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
