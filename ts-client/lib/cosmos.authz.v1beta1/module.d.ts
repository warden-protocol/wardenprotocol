import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgExec } from "./types/cosmos/authz/v1beta1/tx";
import { Grant } from "./types/cosmos/authz/v1beta1/authz";
import { QueryGranteeGrantsResponse } from "./types/cosmos/authz/v1beta1/query";
import { GenesisState } from "./types/cosmos/authz/v1beta1/genesis";
import { GrantAuthorization } from "./types/cosmos/authz/v1beta1/authz";
import { MsgGrant } from "./types/cosmos/authz/v1beta1/tx";
import { MsgRevokeResponse } from "./types/cosmos/authz/v1beta1/tx";
import { GrantQueueItem } from "./types/cosmos/authz/v1beta1/authz";
import { EventRevoke } from "./types/cosmos/authz/v1beta1/event";
import { QueryGranterGrantsRequest } from "./types/cosmos/authz/v1beta1/query";
import { GenericAuthorization } from "./types/cosmos/authz/v1beta1/authz";
import { MsgRevoke } from "./types/cosmos/authz/v1beta1/tx";
import { QueryGrantsRequest } from "./types/cosmos/authz/v1beta1/query";
import { QueryGranterGrantsResponse } from "./types/cosmos/authz/v1beta1/query";
import { QueryGranteeGrantsRequest } from "./types/cosmos/authz/v1beta1/query";
import { EventGrant } from "./types/cosmos/authz/v1beta1/event";
import { MsgGrantResponse } from "./types/cosmos/authz/v1beta1/tx";
import { MsgExecResponse } from "./types/cosmos/authz/v1beta1/tx";
import { QueryGrantsResponse } from "./types/cosmos/authz/v1beta1/query";
export { MsgExec, Grant, QueryGranteeGrantsResponse, GenesisState, GrantAuthorization, MsgGrant, MsgRevokeResponse, GrantQueueItem, EventRevoke, QueryGranterGrantsRequest, GenericAuthorization, MsgRevoke, QueryGrantsRequest, QueryGranterGrantsResponse, QueryGranteeGrantsRequest, EventGrant, MsgGrantResponse, MsgExecResponse, QueryGrantsResponse };
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
type sendQueryGranteeGrantsResponseParams = {
    value: QueryGranteeGrantsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendGrantAuthorizationParams = {
    value: GrantAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendMsgGrantParams = {
    value: MsgGrant;
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
type sendEventRevokeParams = {
    value: EventRevoke;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGranterGrantsRequestParams = {
    value: QueryGranterGrantsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendGenericAuthorizationParams = {
    value: GenericAuthorization;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeParams = {
    value: MsgRevoke;
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
type sendQueryGranteeGrantsRequestParams = {
    value: QueryGranteeGrantsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendEventGrantParams = {
    value: EventGrant;
    fee?: StdFee;
    memo?: string;
};
type sendMsgGrantResponseParams = {
    value: MsgGrantResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgExecResponseParams = {
    value: MsgExecResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryGrantsResponseParams = {
    value: QueryGrantsResponse;
    fee?: StdFee;
    memo?: string;
};
type msgExecParams = {
    value: MsgExec;
};
type grantParams = {
    value: Grant;
};
type queryGranteeGrantsResponseParams = {
    value: QueryGranteeGrantsResponse;
};
type genesisStateParams = {
    value: GenesisState;
};
type grantAuthorizationParams = {
    value: GrantAuthorization;
};
type msgGrantParams = {
    value: MsgGrant;
};
type msgRevokeResponseParams = {
    value: MsgRevokeResponse;
};
type grantQueueItemParams = {
    value: GrantQueueItem;
};
type eventRevokeParams = {
    value: EventRevoke;
};
type queryGranterGrantsRequestParams = {
    value: QueryGranterGrantsRequest;
};
type genericAuthorizationParams = {
    value: GenericAuthorization;
};
type msgRevokeParams = {
    value: MsgRevoke;
};
type queryGrantsRequestParams = {
    value: QueryGrantsRequest;
};
type queryGranterGrantsResponseParams = {
    value: QueryGranterGrantsResponse;
};
type queryGranteeGrantsRequestParams = {
    value: QueryGranteeGrantsRequest;
};
type eventGrantParams = {
    value: EventGrant;
};
type msgGrantResponseParams = {
    value: MsgGrantResponse;
};
type msgExecResponseParams = {
    value: MsgExecResponse;
};
type queryGrantsResponseParams = {
    value: QueryGrantsResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgExec({ value, fee, memo }: sendMsgExecParams): Promise<DeliverTxResponse>;
    sendGrant({ value, fee, memo }: sendGrantParams): Promise<DeliverTxResponse>;
    sendQueryGranteeGrantsResponse({ value, fee, memo }: sendQueryGranteeGrantsResponseParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendGrantAuthorization({ value, fee, memo }: sendGrantAuthorizationParams): Promise<DeliverTxResponse>;
    sendMsgGrant({ value, fee, memo }: sendMsgGrantParams): Promise<DeliverTxResponse>;
    sendMsgRevokeResponse({ value, fee, memo }: sendMsgRevokeResponseParams): Promise<DeliverTxResponse>;
    sendGrantQueueItem({ value, fee, memo }: sendGrantQueueItemParams): Promise<DeliverTxResponse>;
    sendEventRevoke({ value, fee, memo }: sendEventRevokeParams): Promise<DeliverTxResponse>;
    sendQueryGranterGrantsRequest({ value, fee, memo }: sendQueryGranterGrantsRequestParams): Promise<DeliverTxResponse>;
    sendGenericAuthorization({ value, fee, memo }: sendGenericAuthorizationParams): Promise<DeliverTxResponse>;
    sendMsgRevoke({ value, fee, memo }: sendMsgRevokeParams): Promise<DeliverTxResponse>;
    sendQueryGrantsRequest({ value, fee, memo }: sendQueryGrantsRequestParams): Promise<DeliverTxResponse>;
    sendQueryGranterGrantsResponse({ value, fee, memo }: sendQueryGranterGrantsResponseParams): Promise<DeliverTxResponse>;
    sendQueryGranteeGrantsRequest({ value, fee, memo }: sendQueryGranteeGrantsRequestParams): Promise<DeliverTxResponse>;
    sendEventGrant({ value, fee, memo }: sendEventGrantParams): Promise<DeliverTxResponse>;
    sendMsgGrantResponse({ value, fee, memo }: sendMsgGrantResponseParams): Promise<DeliverTxResponse>;
    sendMsgExecResponse({ value, fee, memo }: sendMsgExecResponseParams): Promise<DeliverTxResponse>;
    sendQueryGrantsResponse({ value, fee, memo }: sendQueryGrantsResponseParams): Promise<DeliverTxResponse>;
    msgExec({ value }: msgExecParams): EncodeObject;
    grant({ value }: grantParams): EncodeObject;
    queryGranteeGrantsResponse({ value }: queryGranteeGrantsResponseParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    grantAuthorization({ value }: grantAuthorizationParams): EncodeObject;
    msgGrant({ value }: msgGrantParams): EncodeObject;
    msgRevokeResponse({ value }: msgRevokeResponseParams): EncodeObject;
    grantQueueItem({ value }: grantQueueItemParams): EncodeObject;
    eventRevoke({ value }: eventRevokeParams): EncodeObject;
    queryGranterGrantsRequest({ value }: queryGranterGrantsRequestParams): EncodeObject;
    genericAuthorization({ value }: genericAuthorizationParams): EncodeObject;
    msgRevoke({ value }: msgRevokeParams): EncodeObject;
    queryGrantsRequest({ value }: queryGrantsRequestParams): EncodeObject;
    queryGranterGrantsResponse({ value }: queryGranterGrantsResponseParams): EncodeObject;
    queryGranteeGrantsRequest({ value }: queryGranteeGrantsRequestParams): EncodeObject;
    eventGrant({ value }: eventGrantParams): EncodeObject;
    msgGrantResponse({ value }: msgGrantResponseParams): EncodeObject;
    msgExecResponse({ value }: msgExecResponseParams): EncodeObject;
    queryGrantsResponse({ value }: queryGrantsResponseParams): EncodeObject;
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
