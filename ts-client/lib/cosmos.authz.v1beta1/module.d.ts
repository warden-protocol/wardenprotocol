import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryGranteeGrantsRequest } from "./types/cosmos/authz/v1beta1/query";
import { MsgGrantResponse } from "./types/cosmos/authz/v1beta1/tx";
import { EventGrant } from "./types/cosmos/authz/v1beta1/event";
import { MsgGrant } from "./types/cosmos/authz/v1beta1/tx";
import { MsgExecResponse } from "./types/cosmos/authz/v1beta1/tx";
import { EventRevoke } from "./types/cosmos/authz/v1beta1/event";
import { GenericAuthorization } from "./types/cosmos/authz/v1beta1/authz";
import { GrantAuthorization } from "./types/cosmos/authz/v1beta1/authz";
import { QueryGrantsResponse } from "./types/cosmos/authz/v1beta1/query";
import { QueryGranterGrantsRequest } from "./types/cosmos/authz/v1beta1/query";
import { QueryGranteeGrantsResponse } from "./types/cosmos/authz/v1beta1/query";
import { MsgRevokeResponse } from "./types/cosmos/authz/v1beta1/tx";
import { GrantQueueItem } from "./types/cosmos/authz/v1beta1/authz";
import { MsgRevoke } from "./types/cosmos/authz/v1beta1/tx";
import { GenesisState } from "./types/cosmos/authz/v1beta1/genesis";
import { MsgExec } from "./types/cosmos/authz/v1beta1/tx";
import { Grant } from "./types/cosmos/authz/v1beta1/authz";
import { QueryGrantsRequest } from "./types/cosmos/authz/v1beta1/query";
import { QueryGranterGrantsResponse } from "./types/cosmos/authz/v1beta1/query";
export { QueryGranteeGrantsRequest, MsgGrantResponse, EventGrant, MsgGrant, MsgExecResponse, EventRevoke, GenericAuthorization, GrantAuthorization, QueryGrantsResponse, QueryGranterGrantsRequest, QueryGranteeGrantsResponse, MsgRevokeResponse, GrantQueueItem, MsgRevoke, GenesisState, MsgExec, Grant, QueryGrantsRequest, QueryGranterGrantsResponse };
type sendQueryGranteeGrantsRequestParams = {
    value: QueryGranteeGrantsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgGrantResponseParams = {
    value: MsgGrantResponse;
    fee?: StdFee;
    memo?: string;
};
type sendEventGrantParams = {
    value: EventGrant;
    fee?: StdFee;
    memo?: string;
};
type sendMsgGrantParams = {
    value: MsgGrant;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecResponseParams = {
    value: MsgExecResponse;
    fee?: StdFee;
    memo?: string;
};
type sendEventRevokeParams = {
    value: EventRevoke;
    fee?: StdFee;
    memo?: string;
};
type sendGenericAuthorizationParams = {
    value: GenericAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendGrantAuthorizationParams = {
    value: GrantAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGrantsResponseParams = {
    value: QueryGrantsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGranterGrantsRequestParams = {
    value: QueryGranterGrantsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGranteeGrantsResponseParams = {
    value: QueryGranteeGrantsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeResponseParams = {
    value: MsgRevokeResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGrantQueueItemParams = {
    value: GrantQueueItem;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeParams = {
    value: MsgRevoke;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecParams = {
    value: MsgExec;
    fee?: StdFee;
    memo?: string;
};
type sendGrantParams = {
    value: Grant;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGrantsRequestParams = {
    value: QueryGrantsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGranterGrantsResponseParams = {
    value: QueryGranterGrantsResponse;
    fee?: StdFee;
    memo?: string;
};
type queryGranteeGrantsRequestParams = {
    value: QueryGranteeGrantsRequest;
};
type msgGrantResponseParams = {
    value: MsgGrantResponse;
};
type eventGrantParams = {
    value: EventGrant;
};
type msgGrantParams = {
    value: MsgGrant;
};
type msgExecResponseParams = {
    value: MsgExecResponse;
};
type eventRevokeParams = {
    value: EventRevoke;
};
type genericAuthorizationParams = {
    value: GenericAuthorization;
};
type grantAuthorizationParams = {
    value: GrantAuthorization;
};
type queryGrantsResponseParams = {
    value: QueryGrantsResponse;
};
type queryGranterGrantsRequestParams = {
    value: QueryGranterGrantsRequest;
};
type queryGranteeGrantsResponseParams = {
    value: QueryGranteeGrantsResponse;
};
type msgRevokeResponseParams = {
    value: MsgRevokeResponse;
};
type grantQueueItemParams = {
    value: GrantQueueItem;
};
type msgRevokeParams = {
    value: MsgRevoke;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgExecParams = {
    value: MsgExec;
};
type grantParams = {
    value: Grant;
};
type queryGrantsRequestParams = {
    value: QueryGrantsRequest;
};
type queryGranterGrantsResponseParams = {
    value: QueryGranterGrantsResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryGranteeGrantsRequest({ value, fee, memo }: sendQueryGranteeGrantsRequestParams): Promise<DeliverTxResponse>;
    sendMsgGrantResponse({ value, fee, memo }: sendMsgGrantResponseParams): Promise<DeliverTxResponse>;
    sendEventGrant({ value, fee, memo }: sendEventGrantParams): Promise<DeliverTxResponse>;
    sendMsgGrant({ value, fee, memo }: sendMsgGrantParams): Promise<DeliverTxResponse>;
    sendMsgExecResponse({ value, fee, memo }: sendMsgExecResponseParams): Promise<DeliverTxResponse>;
    sendEventRevoke({ value, fee, memo }: sendEventRevokeParams): Promise<DeliverTxResponse>;
    sendGenericAuthorization({ value, fee, memo }: sendGenericAuthorizationParams): Promise<DeliverTxResponse>;
    sendGrantAuthorization({ value, fee, memo }: sendGrantAuthorizationParams): Promise<DeliverTxResponse>;
    sendQueryGrantsResponse({ value, fee, memo }: sendQueryGrantsResponseParams): Promise<DeliverTxResponse>;
    sendQueryGranterGrantsRequest({ value, fee, memo }: sendQueryGranterGrantsRequestParams): Promise<DeliverTxResponse>;
    sendQueryGranteeGrantsResponse({ value, fee, memo }: sendQueryGranteeGrantsResponseParams): Promise<DeliverTxResponse>;
    sendMsgRevokeResponse({ value, fee, memo }: sendMsgRevokeResponseParams): Promise<DeliverTxResponse>;
    sendGrantQueueItem({ value, fee, memo }: sendGrantQueueItemParams): Promise<DeliverTxResponse>;
    sendMsgRevoke({ value, fee, memo }: sendMsgRevokeParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgExec({ value, fee, memo }: sendMsgExecParams): Promise<DeliverTxResponse>;
    sendGrant({ value, fee, memo }: sendGrantParams): Promise<DeliverTxResponse>;
    sendQueryGrantsRequest({ value, fee, memo }: sendQueryGrantsRequestParams): Promise<DeliverTxResponse>;
    sendQueryGranterGrantsResponse({ value, fee, memo }: sendQueryGranterGrantsResponseParams): Promise<DeliverTxResponse>;
    queryGranteeGrantsRequest({ value }: queryGranteeGrantsRequestParams): EncodeObject;
    msgGrantResponse({ value }: msgGrantResponseParams): EncodeObject;
    eventGrant({ value }: eventGrantParams): EncodeObject;
    msgGrant({ value }: msgGrantParams): EncodeObject;
    msgExecResponse({ value }: msgExecResponseParams): EncodeObject;
    eventRevoke({ value }: eventRevokeParams): EncodeObject;
    genericAuthorization({ value }: genericAuthorizationParams): EncodeObject;
    grantAuthorization({ value }: grantAuthorizationParams): EncodeObject;
    queryGrantsResponse({ value }: queryGrantsResponseParams): EncodeObject;
    queryGranterGrantsRequest({ value }: queryGranterGrantsRequestParams): EncodeObject;
    queryGranteeGrantsResponse({ value }: queryGranteeGrantsResponseParams): EncodeObject;
    msgRevokeResponse({ value }: msgRevokeResponseParams): EncodeObject;
    grantQueueItem({ value }: grantQueueItemParams): EncodeObject;
    msgRevoke({ value }: msgRevokeParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgExec({ value }: msgExecParams): EncodeObject;
    grant({ value }: grantParams): EncodeObject;
    queryGrantsRequest({ value }: queryGrantsRequestParams): EncodeObject;
    queryGranterGrantsResponse({ value }: queryGranterGrantsResponseParams): EncodeObject;
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
        CosmosAuthzV1Beta1: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
