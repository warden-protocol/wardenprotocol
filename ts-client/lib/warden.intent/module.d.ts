import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { MsgUpdateIntentResponse } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { Action } from "./types/warden/intent/action";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { Approver } from "./types/warden/intent/action";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { Intent } from "./types/warden/intent/intent";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { Params } from "./types/warden/intent/params";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { MsgUpdateIntent } from "./types/warden/intent/tx";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { MsgActionCreated } from "./types/warden/intent/action";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
export { MsgUpdateIntentResponse, MsgRevokeActionResponse, QueryIntentsResponse, QueryActionsResponse, Action, MsgApproveAction, QueryIntentsRequest, QueryIntentByIdRequest, Approver, MsgNewIntentResponse, Intent, QueryIntentByIdResponse, QueryActionsByAddressResponse, QueryActionByIdResponse, MsgUpdateParams, Params, MsgUpdateParamsResponse, MsgApproveActionResponse, MsgRevokeAction, MsgUpdateIntent, QueryParamsRequest, QueryParamsResponse, QueryActionsRequest, MsgActionCreated, GenesisState, MsgNewIntent, QueryActionsByAddressRequest, QueryActionByIdRequest };
type sendMsgUpdateIntentResponseParams = {
    value: MsgUpdateIntentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentsResponseParams = {
    value: QueryIntentsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsResponseParams = {
    value: QueryActionsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendActionParams = {
    value: Action;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionParams = {
    value: MsgApproveAction;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentsRequestParams = {
    value: QueryIntentsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendApproverParams = {
    value: Approver;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendIntentParams = {
    value: Intent;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionParams = {
    value: MsgRevokeAction;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateIntentParams = {
    value: MsgUpdateIntent;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsRequestParams = {
    value: QueryActionsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgActionCreatedParams = {
    value: MsgActionCreated;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewIntentParams = {
    value: MsgNewIntent;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionByIdRequestParams = {
    value: QueryActionByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type msgUpdateIntentResponseParams = {
    value: MsgUpdateIntentResponse;
};
type msgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
};
type queryIntentsResponseParams = {
    value: QueryIntentsResponse;
};
type queryActionsResponseParams = {
    value: QueryActionsResponse;
};
type actionParams = {
    value: Action;
};
type msgApproveActionParams = {
    value: MsgApproveAction;
};
type queryIntentsRequestParams = {
    value: QueryIntentsRequest;
};
type queryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
};
type approverParams = {
    value: Approver;
};
type msgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
};
type intentParams = {
    value: Intent;
};
type queryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
};
type queryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
};
type queryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type paramsParams = {
    value: Params;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
};
type msgRevokeActionParams = {
    value: MsgRevokeAction;
};
type msgUpdateIntentParams = {
    value: MsgUpdateIntent;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryActionsRequestParams = {
    value: QueryActionsRequest;
};
type msgActionCreatedParams = {
    value: MsgActionCreated;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgNewIntentParams = {
    value: MsgNewIntent;
};
type queryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
};
type queryActionByIdRequestParams = {
    value: QueryActionByIdRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendMsgUpdateIntentResponse({ value, fee, memo }: sendMsgUpdateIntentResponseParams): Promise<DeliverTxResponse>;
    sendMsgRevokeActionResponse({ value, fee, memo }: sendMsgRevokeActionResponseParams): Promise<DeliverTxResponse>;
    sendQueryIntentsResponse({ value, fee, memo }: sendQueryIntentsResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsResponse({ value, fee, memo }: sendQueryActionsResponseParams): Promise<DeliverTxResponse>;
    sendAction({ value, fee, memo }: sendActionParams): Promise<DeliverTxResponse>;
    sendMsgApproveAction({ value, fee, memo }: sendMsgApproveActionParams): Promise<DeliverTxResponse>;
    sendQueryIntentsRequest({ value, fee, memo }: sendQueryIntentsRequestParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdRequest({ value, fee, memo }: sendQueryIntentByIdRequestParams): Promise<DeliverTxResponse>;
    sendApprover({ value, fee, memo }: sendApproverParams): Promise<DeliverTxResponse>;
    sendMsgNewIntentResponse({ value, fee, memo }: sendMsgNewIntentResponseParams): Promise<DeliverTxResponse>;
    sendIntent({ value, fee, memo }: sendIntentParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdResponse({ value, fee, memo }: sendQueryIntentByIdResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressResponse({ value, fee, memo }: sendQueryActionsByAddressResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdResponse({ value, fee, memo }: sendQueryActionByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgApproveActionResponse({ value, fee, memo }: sendMsgApproveActionResponseParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAction({ value, fee, memo }: sendMsgRevokeActionParams): Promise<DeliverTxResponse>;
    sendMsgUpdateIntent({ value, fee, memo }: sendMsgUpdateIntentParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsRequest({ value, fee, memo }: sendQueryActionsRequestParams): Promise<DeliverTxResponse>;
    sendMsgActionCreated({ value, fee, memo }: sendMsgActionCreatedParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgNewIntent({ value, fee, memo }: sendMsgNewIntentParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressRequest({ value, fee, memo }: sendQueryActionsByAddressRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdRequest({ value, fee, memo }: sendQueryActionByIdRequestParams): Promise<DeliverTxResponse>;
    msgUpdateIntentResponse({ value }: msgUpdateIntentResponseParams): EncodeObject;
    msgRevokeActionResponse({ value }: msgRevokeActionResponseParams): EncodeObject;
    queryIntentsResponse({ value }: queryIntentsResponseParams): EncodeObject;
    queryActionsResponse({ value }: queryActionsResponseParams): EncodeObject;
    action({ value }: actionParams): EncodeObject;
    msgApproveAction({ value }: msgApproveActionParams): EncodeObject;
    queryIntentsRequest({ value }: queryIntentsRequestParams): EncodeObject;
    queryIntentByIdRequest({ value }: queryIntentByIdRequestParams): EncodeObject;
    approver({ value }: approverParams): EncodeObject;
    msgNewIntentResponse({ value }: msgNewIntentResponseParams): EncodeObject;
    intent({ value }: intentParams): EncodeObject;
    queryIntentByIdResponse({ value }: queryIntentByIdResponseParams): EncodeObject;
    queryActionsByAddressResponse({ value }: queryActionsByAddressResponseParams): EncodeObject;
    queryActionByIdResponse({ value }: queryActionByIdResponseParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgApproveActionResponse({ value }: msgApproveActionResponseParams): EncodeObject;
    msgRevokeAction({ value }: msgRevokeActionParams): EncodeObject;
    msgUpdateIntent({ value }: msgUpdateIntentParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryActionsRequest({ value }: queryActionsRequestParams): EncodeObject;
    msgActionCreated({ value }: msgActionCreatedParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgNewIntent({ value }: msgNewIntentParams): EncodeObject;
    queryActionsByAddressRequest({ value }: queryActionsByAddressRequestParams): EncodeObject;
    queryActionByIdRequest({ value }: queryActionByIdRequestParams): EncodeObject;
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
        WardenIntent: SDKModule;
    };
    registry: [string, GeneratedType][];
};
export default IgntModule;
