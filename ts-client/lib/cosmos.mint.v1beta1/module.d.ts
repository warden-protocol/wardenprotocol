import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryInflationRequest } from "./types/cosmos/mint/v1beta1/query";
import { QueryAnnualProvisionsRequest } from "./types/cosmos/mint/v1beta1/query";
import { QueryAnnualProvisionsResponse } from "./types/cosmos/mint/v1beta1/query";
import { GenesisState } from "./types/cosmos/mint/v1beta1/genesis";
import { MsgUpdateParams } from "./types/cosmos/mint/v1beta1/tx";
import { QueryParamsResponse } from "./types/cosmos/mint/v1beta1/query";
import { Minter } from "./types/cosmos/mint/v1beta1/mint";
import { Params } from "./types/cosmos/mint/v1beta1/mint";
import { QueryParamsRequest } from "./types/cosmos/mint/v1beta1/query";
import { QueryInflationResponse } from "./types/cosmos/mint/v1beta1/query";
import { MsgUpdateParamsResponse } from "./types/cosmos/mint/v1beta1/tx";
export { QueryInflationRequest, QueryAnnualProvisionsRequest, QueryAnnualProvisionsResponse, GenesisState, MsgUpdateParams, QueryParamsResponse, Minter, Params, QueryParamsRequest, QueryInflationResponse, MsgUpdateParamsResponse };
type sendQueryInflationRequestParams = {
    value: QueryInflationRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAnnualProvisionsRequestParams = {
    value: QueryAnnualProvisionsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAnnualProvisionsResponseParams = {
    value: QueryAnnualProvisionsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMinterParams = {
    value: Minter;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryInflationResponseParams = {
    value: QueryInflationResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type queryInflationRequestParams = {
    value: QueryInflationRequest;
};
type queryAnnualProvisionsRequestParams = {
    value: QueryAnnualProvisionsRequest;
};
type queryAnnualProvisionsResponseParams = {
    value: QueryAnnualProvisionsResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type minterParams = {
    value: Minter;
};
type paramsParams = {
    value: Params;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryInflationResponseParams = {
    value: QueryInflationResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryInflationRequest({ value, fee, memo }: sendQueryInflationRequestParams): Promise<DeliverTxResponse>;
    sendQueryAnnualProvisionsRequest({ value, fee, memo }: sendQueryAnnualProvisionsRequestParams): Promise<DeliverTxResponse>;
    sendQueryAnnualProvisionsResponse({ value, fee, memo }: sendQueryAnnualProvisionsResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendMinter({ value, fee, memo }: sendMinterParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryInflationResponse({ value, fee, memo }: sendQueryInflationResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    queryInflationRequest({ value }: queryInflationRequestParams): EncodeObject;
    queryAnnualProvisionsRequest({ value }: queryAnnualProvisionsRequestParams): EncodeObject;
    queryAnnualProvisionsResponse({ value }: queryAnnualProvisionsResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    minter({ value }: minterParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryInflationResponse({ value }: queryInflationResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
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
        CosmosMintV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
