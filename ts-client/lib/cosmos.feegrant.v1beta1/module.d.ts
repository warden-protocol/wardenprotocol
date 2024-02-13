import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgGrantAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { QueryAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { Grant } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { MsgRevokeAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { QueryAllowancesByGranterResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { BasicAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { MsgPruneAllowances } from "./types/cosmos/feegrant/v1beta1/tx";
import { PeriodicAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { QueryAllowanceRequest } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesByGranterRequest } from "./types/cosmos/feegrant/v1beta1/query";
import { GenesisState } from "./types/cosmos/feegrant/v1beta1/genesis";
import { MsgGrantAllowance } from "./types/cosmos/feegrant/v1beta1/tx";
import { MsgRevokeAllowance } from "./types/cosmos/feegrant/v1beta1/tx";
import { MsgPruneAllowancesResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { AllowedMsgAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { QueryAllowancesRequest } from "./types/cosmos/feegrant/v1beta1/query";
export { MsgGrantAllowanceResponse, QueryAllowanceResponse, Grant, MsgRevokeAllowanceResponse, QueryAllowancesByGranterResponse, BasicAllowance, MsgPruneAllowances, PeriodicAllowance, QueryAllowanceRequest, QueryAllowancesResponse, QueryAllowancesByGranterRequest, GenesisState, MsgGrantAllowance, MsgRevokeAllowance, MsgPruneAllowancesResponse, AllowedMsgAllowance, QueryAllowancesRequest };
type sendMsgGrantAllowanceResponseParams = {
    value: MsgGrantAllowanceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowanceResponseParams = {
    value: QueryAllowanceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGrantParams = {
    value: Grant;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeAllowanceResponseParams = {
    value: MsgRevokeAllowanceResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowancesByGranterResponseParams = {
    value: QueryAllowancesByGranterResponse;
    fee?: StdFee;
    memo?: string;
};
type sendBasicAllowanceParams = {
    value: BasicAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPruneAllowancesParams = {
    value: MsgPruneAllowances;
    fee?: StdFee;
    memo?: string;
};
type sendPeriodicAllowanceParams = {
    value: PeriodicAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowanceRequestParams = {
    value: QueryAllowanceRequest;
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
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgGrantAllowanceParams = {
    value: MsgGrantAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeAllowanceParams = {
    value: MsgRevokeAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendMsgPruneAllowancesResponseParams = {
    value: MsgPruneAllowancesResponse;
    fee?: StdFee;
    memo?: string;
};
type sendAllowedMsgAllowanceParams = {
    value: AllowedMsgAllowance;
    fee?: StdFee;
    memo?: string;
};
type sendQueryAllowancesRequestParams = {
    value: QueryAllowancesRequest;
    fee?: StdFee;
    memo?: string;
};
type msgGrantAllowanceResponseParams = {
    value: MsgGrantAllowanceResponse;
};
type queryAllowanceResponseParams = {
    value: QueryAllowanceResponse;
};
type grantParams = {
    value: Grant;
};
type msgRevokeAllowanceResponseParams = {
    value: MsgRevokeAllowanceResponse;
};
type queryAllowancesByGranterResponseParams = {
    value: QueryAllowancesByGranterResponse;
};
type basicAllowanceParams = {
    value: BasicAllowance;
};
type msgPruneAllowancesParams = {
    value: MsgPruneAllowances;
};
type periodicAllowanceParams = {
    value: PeriodicAllowance;
};
type queryAllowanceRequestParams = {
    value: QueryAllowanceRequest;
};
type queryAllowancesResponseParams = {
    value: QueryAllowancesResponse;
};
type queryAllowancesByGranterRequestParams = {
    value: QueryAllowancesByGranterRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgGrantAllowanceParams = {
    value: MsgGrantAllowance;
};
type msgRevokeAllowanceParams = {
    value: MsgRevokeAllowance;
};
type msgPruneAllowancesResponseParams = {
    value: MsgPruneAllowancesResponse;
};
type allowedMsgAllowanceParams = {
    value: AllowedMsgAllowance;
};
type queryAllowancesRequestParams = {
    value: QueryAllowancesRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgGrantAllowanceResponse({ value, fee, memo }: sendMsgGrantAllowanceResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllowanceResponse({ value, fee, memo }: sendQueryAllowanceResponseParams): Promise<DeliverTxResponse>;
    sendGrant({ value, fee, memo }: sendGrantParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAllowanceResponse({ value, fee, memo }: sendMsgRevokeAllowanceResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesByGranterResponse({ value, fee, memo }: sendQueryAllowancesByGranterResponseParams): Promise<DeliverTxResponse>;
    sendBasicAllowance({ value, fee, memo }: sendBasicAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgPruneAllowances({ value, fee, memo }: sendMsgPruneAllowancesParams): Promise<DeliverTxResponse>;
    sendPeriodicAllowance({ value, fee, memo }: sendPeriodicAllowanceParams): Promise<DeliverTxResponse>;
    sendQueryAllowanceRequest({ value, fee, memo }: sendQueryAllowanceRequestParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesResponse({ value, fee, memo }: sendQueryAllowancesResponseParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesByGranterRequest({ value, fee, memo }: sendQueryAllowancesByGranterRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgGrantAllowance({ value, fee, memo }: sendMsgGrantAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAllowance({ value, fee, memo }: sendMsgRevokeAllowanceParams): Promise<DeliverTxResponse>;
    sendMsgPruneAllowancesResponse({ value, fee, memo }: sendMsgPruneAllowancesResponseParams): Promise<DeliverTxResponse>;
    sendAllowedMsgAllowance({ value, fee, memo }: sendAllowedMsgAllowanceParams): Promise<DeliverTxResponse>;
    sendQueryAllowancesRequest({ value, fee, memo }: sendQueryAllowancesRequestParams): Promise<DeliverTxResponse>;
    msgGrantAllowanceResponse({ value }: msgGrantAllowanceResponseParams): EncodeObject;
    queryAllowanceResponse({ value }: queryAllowanceResponseParams): EncodeObject;
    grant({ value }: grantParams): EncodeObject;
    msgRevokeAllowanceResponse({ value }: msgRevokeAllowanceResponseParams): EncodeObject;
    queryAllowancesByGranterResponse({ value }: queryAllowancesByGranterResponseParams): EncodeObject;
    basicAllowance({ value }: basicAllowanceParams): EncodeObject;
    msgPruneAllowances({ value }: msgPruneAllowancesParams): EncodeObject;
    periodicAllowance({ value }: periodicAllowanceParams): EncodeObject;
    queryAllowanceRequest({ value }: queryAllowanceRequestParams): EncodeObject;
    queryAllowancesResponse({ value }: queryAllowancesResponseParams): EncodeObject;
    queryAllowancesByGranterRequest({ value }: queryAllowancesByGranterRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgGrantAllowance({ value }: msgGrantAllowanceParams): EncodeObject;
    msgRevokeAllowance({ value }: msgRevokeAllowanceParams): EncodeObject;
    msgPruneAllowancesResponse({ value }: msgPruneAllowancesResponseParams): EncodeObject;
    allowedMsgAllowance({ value }: allowedMsgAllowanceParams): EncodeObject;
    queryAllowancesRequest({ value }: queryAllowancesRequestParams): EncodeObject;
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
