import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { AllowedMsgAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { MsgRevokeAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { Grant } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { BasicAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { MsgGrantAllowance } from "./types/cosmos/feegrant/v1beta1/tx";
import { MsgPruneAllowancesResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { QueryAllowanceRequest } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesByGranterResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { MsgRevokeAllowance } from "./types/cosmos/feegrant/v1beta1/tx";
import { MsgPruneAllowances } from "./types/cosmos/feegrant/v1beta1/tx";
import { GenesisState } from "./types/cosmos/feegrant/v1beta1/genesis";
import { QueryAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesRequest } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesByGranterRequest } from "./types/cosmos/feegrant/v1beta1/query";
import { PeriodicAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { MsgGrantAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/tx";
export { AllowedMsgAllowance, MsgRevokeAllowanceResponse, Grant, BasicAllowance, MsgGrantAllowance, MsgPruneAllowancesResponse, QueryAllowanceRequest, QueryAllowancesByGranterResponse, MsgRevokeAllowance, MsgPruneAllowances, GenesisState, QueryAllowanceResponse, QueryAllowancesRequest, QueryAllowancesResponse, QueryAllowancesByGranterRequest, PeriodicAllowance, MsgGrantAllowanceResponse };
type sendAllowedMsgAllowanceParams = {
    value: AllowedMsgAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeAllowanceResponseParams = {
    value: MsgRevokeAllowanceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGrantParams = {
    value: Grant;
    fee?: StdFee;
    memo?: string;
};
type sendBasicAllowanceParams = {
    value: BasicAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgGrantAllowanceParams = {
    value: MsgGrantAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPruneAllowancesResponseParams = {
    value: MsgPruneAllowancesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowanceRequestParams = {
    value: QueryAllowanceRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowancesByGranterResponseParams = {
    value: QueryAllowancesByGranterResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeAllowanceParams = {
    value: MsgRevokeAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPruneAllowancesParams = {
    value: MsgPruneAllowances;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowanceResponseParams = {
    value: QueryAllowanceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowancesRequestParams = {
    value: QueryAllowancesRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowancesResponseParams = {
    value: QueryAllowancesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowancesByGranterRequestParams = {
    value: QueryAllowancesByGranterRequest;
    fee?: StdFee;
    memo?: string;
};
type sendPeriodicAllowanceParams = {
    value: PeriodicAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgGrantAllowanceResponseParams = {
    value: MsgGrantAllowanceResponse;
    fee?: StdFee;
    memo?: string;
};
type allowedMsgAllowanceParams = {
    value: AllowedMsgAllowance;
};
type msgRevokeAllowanceResponseParams = {
    value: MsgRevokeAllowanceResponse;
};
type grantParams = {
    value: Grant;
};
type basicAllowanceParams = {
    value: BasicAllowance;
};
type msgGrantAllowanceParams = {
    value: MsgGrantAllowance;
};
type msgPruneAllowancesResponseParams = {
    value: MsgPruneAllowancesResponse;
};
type queryAllowanceRequestParams = {
    value: QueryAllowanceRequest;
};
type queryAllowancesByGranterResponseParams = {
    value: QueryAllowancesByGranterResponse;
};
type msgRevokeAllowanceParams = {
    value: MsgRevokeAllowance;
};
type msgPruneAllowancesParams = {
    value: MsgPruneAllowances;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryAllowanceResponseParams = {
    value: QueryAllowanceResponse;
};
type queryAllowancesRequestParams = {
    value: QueryAllowancesRequest;
};
type queryAllowancesResponseParams = {
    value: QueryAllowancesResponse;
};
type queryAllowancesByGranterRequestParams = {
    value: QueryAllowancesByGranterRequest;
};
type periodicAllowanceParams = {
    value: PeriodicAllowance;
};
type msgGrantAllowanceResponseParams = {
    value: MsgGrantAllowanceResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendAllowedMsgAllowance({ value, fee, memo }: sendAllowedMsgAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAllowanceResponse({ value, fee, memo }: sendMsgRevokeAllowanceResponseParams): Promise<DeliverTxResponse>;
    sendGrant({ value, fee, memo }: sendGrantParams): Promise<DeliverTxResponse>;
    sendBasicAllowance({ value, fee, memo }: sendBasicAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgGrantAllowance({ value, fee, memo }: sendMsgGrantAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgPruneAllowancesResponse({ value, fee, memo }: sendMsgPruneAllowancesResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllowanceRequest({ value, fee, memo }: sendQueryAllowanceRequestParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesByGranterResponse({ value, fee, memo }: sendQueryAllowancesByGranterResponseParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAllowance({ value, fee, memo }: sendMsgRevokeAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgPruneAllowances({ value, fee, memo }: sendMsgPruneAllowancesParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryAllowanceResponse({ value, fee, memo }: sendQueryAllowanceResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesRequest({ value, fee, memo }: sendQueryAllowancesRequestParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesResponse({ value, fee, memo }: sendQueryAllowancesResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesByGranterRequest({ value, fee, memo }: sendQueryAllowancesByGranterRequestParams): Promise<DeliverTxResponse>;
    sendPeriodicAllowance({ value, fee, memo }: sendPeriodicAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgGrantAllowanceResponse({ value, fee, memo }: sendMsgGrantAllowanceResponseParams): Promise<DeliverTxResponse>;
    allowedMsgAllowance({ value }: allowedMsgAllowanceParams): EncodeObject;
    msgRevokeAllowanceResponse({ value }: msgRevokeAllowanceResponseParams): EncodeObject;
    grant({ value }: grantParams): EncodeObject;
    basicAllowance({ value }: basicAllowanceParams): EncodeObject;
    msgGrantAllowance({ value }: msgGrantAllowanceParams): EncodeObject;
    msgPruneAllowancesResponse({ value }: msgPruneAllowancesResponseParams): EncodeObject;
    queryAllowanceRequest({ value }: queryAllowanceRequestParams): EncodeObject;
    queryAllowancesByGranterResponse({ value }: queryAllowancesByGranterResponseParams): EncodeObject;
    msgRevokeAllowance({ value }: msgRevokeAllowanceParams): EncodeObject;
    msgPruneAllowances({ value }: msgPruneAllowancesParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryAllowanceResponse({ value }: queryAllowanceResponseParams): EncodeObject;
    queryAllowancesRequest({ value }: queryAllowancesRequestParams): EncodeObject;
    queryAllowancesResponse({ value }: queryAllowancesResponseParams): EncodeObject;
    queryAllowancesByGranterRequest({ value }: queryAllowancesByGranterRequestParams): EncodeObject;
    periodicAllowance({ value }: periodicAllowanceParams): EncodeObject;
    msgGrantAllowanceResponse({ value }: msgGrantAllowanceResponseParams): EncodeObject;
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
        CosmosFeegrantV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
