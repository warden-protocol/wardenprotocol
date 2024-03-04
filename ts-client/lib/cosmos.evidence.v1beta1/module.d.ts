import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { Equivocation } from "./types/cosmos/evidence/v1beta1/evidence";
import { MsgSubmitEvidence } from "./types/cosmos/evidence/v1beta1/tx";
import { MsgSubmitEvidenceResponse } from "./types/cosmos/evidence/v1beta1/tx";
import { QueryAllEvidenceRequest } from "./types/cosmos/evidence/v1beta1/query";
import { GenesisState } from "./types/cosmos/evidence/v1beta1/genesis";
import { QueryEvidenceResponse } from "./types/cosmos/evidence/v1beta1/query";
import { QueryAllEvidenceResponse } from "./types/cosmos/evidence/v1beta1/query";
import { QueryEvidenceRequest } from "./types/cosmos/evidence/v1beta1/query";
export { Equivocation, MsgSubmitEvidence, MsgSubmitEvidenceResponse, QueryAllEvidenceRequest, GenesisState, QueryEvidenceResponse, QueryAllEvidenceResponse, QueryEvidenceRequest };
type sendEquivocationParams = {
    value: Equivocation;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitEvidenceParams = {
    value: MsgSubmitEvidence;
    fee?: StdFee;
    memo?: string;
};
type sendMsgSubmitEvidenceResponseParams = {
    value: MsgSubmitEvidenceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllEvidenceRequestParams = {
    value: QueryAllEvidenceRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryEvidenceResponseParams = {
    value: QueryEvidenceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllEvidenceResponseParams = {
    value: QueryAllEvidenceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryEvidenceRequestParams = {
    value: QueryEvidenceRequest;
    fee?: StdFee;
    memo?: string;
};
type equivocationParams = {
    value: Equivocation;
};
type msgSubmitEvidenceParams = {
    value: MsgSubmitEvidence;
};
type msgSubmitEvidenceResponseParams = {
    value: MsgSubmitEvidenceResponse;
};
type queryAllEvidenceRequestParams = {
    value: QueryAllEvidenceRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryEvidenceResponseParams = {
    value: QueryEvidenceResponse;
};
type queryAllEvidenceResponseParams = {
    value: QueryAllEvidenceResponse;
};
type queryEvidenceRequestParams = {
    value: QueryEvidenceRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendEquivocation({ value, fee, memo }: sendEquivocationParams): Promise<DeliverTxResponse>;
    sendMsgSubmitEvidence({ value, fee, memo }: sendMsgSubmitEvidenceParams): Promise<DeliverTxResponse>;
    sendMsgSubmitEvidenceResponse({ value, fee, memo }: sendMsgSubmitEvidenceResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllEvidenceRequest({ value, fee, memo }: sendQueryAllEvidenceRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryEvidenceResponse({ value, fee, memo }: sendQueryEvidenceResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllEvidenceResponse({ value, fee, memo }: sendQueryAllEvidenceResponseParams): Promise<DeliverTxResponse>;
    sendQueryEvidenceRequest({ value, fee, memo }: sendQueryEvidenceRequestParams): Promise<DeliverTxResponse>;
    equivocation({ value }: equivocationParams): EncodeObject;
    msgSubmitEvidence({ value }: msgSubmitEvidenceParams): EncodeObject;
    msgSubmitEvidenceResponse({ value }: msgSubmitEvidenceResponseParams): EncodeObject;
    queryAllEvidenceRequest({ value }: queryAllEvidenceRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryEvidenceResponse({ value }: queryEvidenceResponseParams): EncodeObject;
    queryAllEvidenceResponse({ value }: queryAllEvidenceResponseParams): EncodeObject;
    queryEvidenceRequest({ value }: queryEvidenceRequestParams): EncodeObject;
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
        CosmosEvidenceV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
