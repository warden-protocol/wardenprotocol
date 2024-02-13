import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryAuthorityRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { MsgSoftwareUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";
import { MsgCancelUpgrade } from "./types/cosmos/upgrade/v1beta1/tx";
import { QueryCurrentPlanResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryAuthorityResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { MsgSoftwareUpgradeResponse } from "./types/cosmos/upgrade/v1beta1/tx";
import { ModuleVersion } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { QueryModuleVersionsResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryAppliedPlanRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryUpgradedConsensusStateResponse } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryModuleVersionsRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { MsgCancelUpgradeResponse } from "./types/cosmos/upgrade/v1beta1/tx";
import { CancelSoftwareUpgradeProposal } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { QueryCurrentPlanRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { QueryUpgradedConsensusStateRequest } from "./types/cosmos/upgrade/v1beta1/query";
import { Plan } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { SoftwareUpgradeProposal } from "./types/cosmos/upgrade/v1beta1/upgrade";
import { QueryAppliedPlanResponse } from "./types/cosmos/upgrade/v1beta1/query";
export { QueryAuthorityRequest, MsgSoftwareUpgrade, MsgCancelUpgrade, QueryCurrentPlanResponse, QueryAuthorityResponse, MsgSoftwareUpgradeResponse, ModuleVersion, QueryModuleVersionsResponse, QueryAppliedPlanRequest, QueryUpgradedConsensusStateResponse, QueryModuleVersionsRequest, MsgCancelUpgradeResponse, CancelSoftwareUpgradeProposal, QueryCurrentPlanRequest, QueryUpgradedConsensusStateRequest, Plan, SoftwareUpgradeProposal, QueryAppliedPlanResponse };
type sendQueryAuthorityRequestParams = {
    value: QueryAuthorityRequest;
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
type sendQueryCurrentPlanResponseParams = {
    value: QueryCurrentPlanResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAuthorityResponseParams = {
    value: QueryAuthorityResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSoftwareUpgradeResponseParams = {
    value: MsgSoftwareUpgradeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendModuleVersionParams = {
    value: ModuleVersion;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleVersionsResponseParams = {
    value: QueryModuleVersionsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAppliedPlanRequestParams = {
    value: QueryAppliedPlanRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedConsensusStateResponseParams = {
    value: QueryUpgradedConsensusStateResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryModuleVersionsRequestParams = {
    value: QueryModuleVersionsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgCancelUpgradeResponseParams = {
    value: MsgCancelUpgradeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendCancelSoftwareUpgradeProposalParams = {
    value: CancelSoftwareUpgradeProposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryCurrentPlanRequestParams = {
    value: QueryCurrentPlanRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryUpgradedConsensusStateRequestParams = {
    value: QueryUpgradedConsensusStateRequest;
    fee?: StdFee;
    memo?: string;
};
type sendPlanParams = {
    value: Plan;
    fee?: StdFee;
    memo?: string;
};
type sendSoftwareUpgradeProposalParams = {
    value: SoftwareUpgradeProposal;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAppliedPlanResponseParams = {
    value: QueryAppliedPlanResponse;
    fee?: StdFee;
    memo?: string;
};
type queryAuthorityRequestParams = {
    value: QueryAuthorityRequest;
};
type msgSoftwareUpgradeParams = {
    value: MsgSoftwareUpgrade;
};
type msgCancelUpgradeParams = {
    value: MsgCancelUpgrade;
};
type queryCurrentPlanResponseParams = {
    value: QueryCurrentPlanResponse;
};
type queryAuthorityResponseParams = {
    value: QueryAuthorityResponse;
};
type msgSoftwareUpgradeResponseParams = {
    value: MsgSoftwareUpgradeResponse;
};
type moduleVersionParams = {
    value: ModuleVersion;
};
type queryModuleVersionsResponseParams = {
    value: QueryModuleVersionsResponse;
};
type queryAppliedPlanRequestParams = {
    value: QueryAppliedPlanRequest;
};
type queryUpgradedConsensusStateResponseParams = {
    value: QueryUpgradedConsensusStateResponse;
};
type queryModuleVersionsRequestParams = {
    value: QueryModuleVersionsRequest;
};
type msgCancelUpgradeResponseParams = {
    value: MsgCancelUpgradeResponse;
};
type cancelSoftwareUpgradeProposalParams = {
    value: CancelSoftwareUpgradeProposal;
};
type queryCurrentPlanRequestParams = {
    value: QueryCurrentPlanRequest;
};
type queryUpgradedConsensusStateRequestParams = {
    value: QueryUpgradedConsensusStateRequest;
};
type planParams = {
    value: Plan;
};
type softwareUpgradeProposalParams = {
    value: SoftwareUpgradeProposal;
};
type queryAppliedPlanResponseParams = {
    value: QueryAppliedPlanResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryAuthorityRequest({ value, fee, memo }: sendQueryAuthorityRequestParams): Promise<DeliverTxResponse>;
    sendMsgSoftwareUpgrade({ value, fee, memo }: sendMsgSoftwareUpgradeParams): Promise<DeliverTxResponse>;
    sendMsgCancelUpgrade({ value, fee, memo }: sendMsgCancelUpgradeParams): Promise<DeliverTxResponse>;
    sendQueryCurrentPlanResponse({ value, fee, memo }: sendQueryCurrentPlanResponseParams): Promise<DeliverTxResponse>;
    sendQueryAuthorityResponse({ value, fee, memo }: sendQueryAuthorityResponseParams): Promise<DeliverTxResponse>;
    sendMsgSoftwareUpgradeResponse({ value, fee, memo }: sendMsgSoftwareUpgradeResponseParams): Promise<DeliverTxResponse>;
    sendModuleVersion({ value, fee, memo }: sendModuleVersionParams): Promise<DeliverTxResponse>;
    sendQueryModuleVersionsResponse({ value, fee, memo }: sendQueryModuleVersionsResponseParams): Promise<DeliverTxResponse>;
    sendQueryAppliedPlanRequest({ value, fee, memo }: sendQueryAppliedPlanRequestParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedConsensusStateResponse({ value, fee, memo }: sendQueryUpgradedConsensusStateResponseParams): Promise<DeliverTxResponse>;
    sendQueryModuleVersionsRequest({ value, fee, memo }: sendQueryModuleVersionsRequestParams): Promise<DeliverTxResponse>;
    sendMsgCancelUpgradeResponse({ value, fee, memo }: sendMsgCancelUpgradeResponseParams): Promise<DeliverTxResponse>;
    sendCancelSoftwareUpgradeProposal({ value, fee, memo }: sendCancelSoftwareUpgradeProposalParams): Promise<DeliverTxResponse>;
    sendQueryCurrentPlanRequest({ value, fee, memo }: sendQueryCurrentPlanRequestParams): Promise<DeliverTxResponse>;
    sendQueryUpgradedConsensusStateRequest({ value, fee, memo }: sendQueryUpgradedConsensusStateRequestParams): Promise<DeliverTxResponse>;
    sendPlan({ value, fee, memo }: sendPlanParams): Promise<DeliverTxResponse>;
    sendSoftwareUpgradeProposal({ value, fee, memo }: sendSoftwareUpgradeProposalParams): Promise<DeliverTxResponse>;
    sendQueryAppliedPlanResponse({ value, fee, memo }: sendQueryAppliedPlanResponseParams): Promise<DeliverTxResponse>;
    queryAuthorityRequest({ value }: queryAuthorityRequestParams): EncodeObject;
    msgSoftwareUpgrade({ value }: msgSoftwareUpgradeParams): EncodeObject;
    msgCancelUpgrade({ value }: msgCancelUpgradeParams): EncodeObject;
    queryCurrentPlanResponse({ value }: queryCurrentPlanResponseParams): EncodeObject;
    queryAuthorityResponse({ value }: queryAuthorityResponseParams): EncodeObject;
    msgSoftwareUpgradeResponse({ value }: msgSoftwareUpgradeResponseParams): EncodeObject;
    moduleVersion({ value }: moduleVersionParams): EncodeObject;
    queryModuleVersionsResponse({ value }: queryModuleVersionsResponseParams): EncodeObject;
    queryAppliedPlanRequest({ value }: queryAppliedPlanRequestParams): EncodeObject;
    queryUpgradedConsensusStateResponse({ value }: queryUpgradedConsensusStateResponseParams): EncodeObject;
    queryModuleVersionsRequest({ value }: queryModuleVersionsRequestParams): EncodeObject;
    msgCancelUpgradeResponse({ value }: msgCancelUpgradeResponseParams): EncodeObject;
    cancelSoftwareUpgradeProposal({ value }: cancelSoftwareUpgradeProposalParams): EncodeObject;
    queryCurrentPlanRequest({ value }: queryCurrentPlanRequestParams): EncodeObject;
    queryUpgradedConsensusStateRequest({ value }: queryUpgradedConsensusStateRequestParams): EncodeObject;
    plan({ value }: planParams): EncodeObject;
    softwareUpgradeProposal({ value }: softwareUpgradeProposalParams): EncodeObject;
    queryAppliedPlanResponse({ value }: queryAppliedPlanResponseParams): EncodeObject;
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
