import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { ModuleVersion } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { QueryCurrentPlanResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryModuleVersionsRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryAuthorityRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryAuthorityResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { CancelSoftwareUpgradeProposal } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { MsgSoftwareUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";
import { MsgCancelUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";
import { QueryAppliedPlanRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryAppliedPlanResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryUpgradedConsensusStateResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { Plan } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { MsgSoftwareUpgradeResponse } from "./types/cosmos/upgrade/v1beta1/tx";
import { QueryCurrentPlanRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { SoftwareUpgradeProposal } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { MsgCancelUpgradeResponse } from "./types/cosmos/upgrade/v1beta1/tx";
import { QueryUpgradedConsensusStateRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryModuleVersionsResponse } from "./types/cosmos/upgrade/v1beta1/query";
export { ModuleVersion, QueryCurrentPlanResponse, QueryModuleVersionsRequest, QueryAuthorityRequest, QueryAuthorityResponse, CancelSoftwareUpgradeProposal, MsgSoftwareUpgrade, MsgCancelUpgrade, QueryAppliedPlanRequest, QueryAppliedPlanResponse, QueryUpgradedConsensusStateResponse, Plan, MsgSoftwareUpgradeResponse, QueryCurrentPlanRequest, SoftwareUpgradeProposal, MsgCancelUpgradeResponse, QueryUpgradedConsensusStateRequest, QueryModuleVersionsResponse };
type sendModuleVersionParams = {
    value: ModuleVersion;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCurrentPlanResponseParams = {
    value: QueryCurrentPlanResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleVersionsRequestParams = {
    value: QueryModuleVersionsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAuthorityRequestParams = {
    value: QueryAuthorityRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAuthorityResponseParams = {
    value: QueryAuthorityResponse;
    fee?: StdFee;
    memo?: string;
};
type sendCancelSoftwareUpgradeProposalParams = {
    value: CancelSoftwareUpgradeProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSoftwareUpgradeParams = {
    value: MsgSoftwareUpgrade;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCancelUpgradeParams = {
    value: MsgCancelUpgrade;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAppliedPlanRequestParams = {
    value: QueryAppliedPlanRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAppliedPlanResponseParams = {
    value: QueryAppliedPlanResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedConsensusStateResponseParams = {
    value: QueryUpgradedConsensusStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendPlanParams = {
    value: Plan;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSoftwareUpgradeResponseParams = {
    value: MsgSoftwareUpgradeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCurrentPlanRequestParams = {
    value: QueryCurrentPlanRequest;
    fee?: StdFee;
    memo?: string;
};
type sendSoftwareUpgradeProposalParams = {
    value: SoftwareUpgradeProposal;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCancelUpgradeResponseParams = {
    value: MsgCancelUpgradeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedConsensusStateRequestParams = {
    value: QueryUpgradedConsensusStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleVersionsResponseParams = {
    value: QueryModuleVersionsResponse;
    fee?: StdFee;
    memo?: string;
};
type moduleVersionParams = {
    value: ModuleVersion;
};
type queryCurrentPlanResponseParams = {
    value: QueryCurrentPlanResponse;
};
type queryModuleVersionsRequestParams = {
    value: QueryModuleVersionsRequest;
};
type queryAuthorityRequestParams = {
    value: QueryAuthorityRequest;
};
type queryAuthorityResponseParams = {
    value: QueryAuthorityResponse;
};
type cancelSoftwareUpgradeProposalParams = {
    value: CancelSoftwareUpgradeProposal;
};
type msgSoftwareUpgradeParams = {
    value: MsgSoftwareUpgrade;
};
type msgCancelUpgradeParams = {
    value: MsgCancelUpgrade;
};
type queryAppliedPlanRequestParams = {
    value: QueryAppliedPlanRequest;
};
type queryAppliedPlanResponseParams = {
    value: QueryAppliedPlanResponse;
};
type queryUpgradedConsensusStateResponseParams = {
    value: QueryUpgradedConsensusStateResponse;
};
type planParams = {
    value: Plan;
};
type msgSoftwareUpgradeResponseParams = {
    value: MsgSoftwareUpgradeResponse;
};
type queryCurrentPlanRequestParams = {
    value: QueryCurrentPlanRequest;
};
type softwareUpgradeProposalParams = {
    value: SoftwareUpgradeProposal;
};
type msgCancelUpgradeResponseParams = {
    value: MsgCancelUpgradeResponse;
};
type queryUpgradedConsensusStateRequestParams = {
    value: QueryUpgradedConsensusStateRequest;
};
type queryModuleVersionsResponseParams = {
    value: QueryModuleVersionsResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendModuleVersion({ value, fee, memo }: sendModuleVersionParams): Promise<DeliverTxResponse>;
    sendQueryCurrentPlanResponse({ value, fee, memo }: sendQueryCurrentPlanResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleVersionsRequest({ value, fee, memo }: sendQueryModuleVersionsRequestParams): Promise<DeliverTxResponse>;
    sendQueryAuthorityRequest({ value, fee, memo }: sendQueryAuthorityRequestParams): Promise<DeliverTxResponse>;
    sendQueryAuthorityResponse({ value, fee, memo }: sendQueryAuthorityResponseParams): Promise<DeliverTxResponse>;
    sendCancelSoftwareUpgradeProposal({ value, fee, memo }: sendCancelSoftwareUpgradeProposalParams): Promise<DeliverTxResponse>;
    sendMsgSoftwareUpgrade({ value, fee, memo }: sendMsgSoftwareUpgradeParams): Promise<DeliverTxResponse>;
    sendMsgCancelUpgrade({ value, fee, memo }: sendMsgCancelUpgradeParams): Promise<DeliverTxResponse>;
    sendQueryAppliedPlanRequest({ value, fee, memo }: sendQueryAppliedPlanRequestParams): Promise<DeliverTxResponse>;
    sendQueryAppliedPlanResponse({ value, fee, memo }: sendQueryAppliedPlanResponseParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedConsensusStateResponse({ value, fee, memo }: sendQueryUpgradedConsensusStateResponseParams): Promise<DeliverTxResponse>;
    sendPlan({ value, fee, memo }: sendPlanParams): Promise<DeliverTxResponse>;
    sendMsgSoftwareUpgradeResponse({ value, fee, memo }: sendMsgSoftwareUpgradeResponseParams): Promise<DeliverTxResponse>;
    sendQueryCurrentPlanRequest({ value, fee, memo }: sendQueryCurrentPlanRequestParams): Promise<DeliverTxResponse>;
    sendSoftwareUpgradeProposal({ value, fee, memo }: sendSoftwareUpgradeProposalParams): Promise<DeliverTxResponse>;
    sendMsgCancelUpgradeResponse({ value, fee, memo }: sendMsgCancelUpgradeResponseParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedConsensusStateRequest({ value, fee, memo }: sendQueryUpgradedConsensusStateRequestParams): Promise<DeliverTxResponse>;
    sendQueryModuleVersionsResponse({ value, fee, memo }: sendQueryModuleVersionsResponseParams): Promise<DeliverTxResponse>;
    moduleVersion({ value }: moduleVersionParams): EncodeObject;
    queryCurrentPlanResponse({ value }: queryCurrentPlanResponseParams): EncodeObject;
    queryModuleVersionsRequest({ value }: queryModuleVersionsRequestParams): EncodeObject;
    queryAuthorityRequest({ value }: queryAuthorityRequestParams): EncodeObject;
    queryAuthorityResponse({ value }: queryAuthorityResponseParams): EncodeObject;
    cancelSoftwareUpgradeProposal({ value }: cancelSoftwareUpgradeProposalParams): EncodeObject;
    msgSoftwareUpgrade({ value }: msgSoftwareUpgradeParams): EncodeObject;
    msgCancelUpgrade({ value }: msgCancelUpgradeParams): EncodeObject;
    queryAppliedPlanRequest({ value }: queryAppliedPlanRequestParams): EncodeObject;
    queryAppliedPlanResponse({ value }: queryAppliedPlanResponseParams): EncodeObject;
    queryUpgradedConsensusStateResponse({ value }: queryUpgradedConsensusStateResponseParams): EncodeObject;
    plan({ value }: planParams): EncodeObject;
    msgSoftwareUpgradeResponse({ value }: msgSoftwareUpgradeResponseParams): EncodeObject;
    queryCurrentPlanRequest({ value }: queryCurrentPlanRequestParams): EncodeObject;
    softwareUpgradeProposal({ value }: softwareUpgradeProposalParams): EncodeObject;
    msgCancelUpgradeResponse({ value }: msgCancelUpgradeResponseParams): EncodeObject;
    queryUpgradedConsensusStateRequest({ value }: queryUpgradedConsensusStateRequestParams): EncodeObject;
    queryModuleVersionsResponse({ value }: queryModuleVersionsResponseParams): EncodeObject;
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
        CosmosUpgradeV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
