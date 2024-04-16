import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { GenesisState } from "./types/warden/intent/genesis";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { MsgUpdateIntent } from "./types/warden/intent/tx";
import { Params } from "./types/warden/intent/params";
import { Approver } from "./types/warden/intent/action";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { Intent } from "./types/warden/intent/intent";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgUpdateIntentResponse } from "./types/warden/intent/tx";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { Action } from "./types/warden/intent/action";
export { GenesisState, QueryIntentsRequest, QueryActionByIdRequest, MsgUpdateParams, MsgNewIntent, MsgUpdateIntent, Params, Approver, MsgApproveAction, QueryIntentsResponse, QueryActionsByAddressResponse, Intent, QueryActionsResponse, MsgActionCreated, QueryActionsRequest, QueryIntentByIdResponse, MsgApproveActionResponse, MsgNewIntentResponse, MsgRevokeActionResponse, QueryParamsRequest, MsgUpdateParamsResponse, MsgUpdateIntentResponse, QueryActionsByAddressRequest, QueryActionByIdResponse, MsgRevokeAction, QueryParamsResponse, QueryIntentByIdRequest, Action };
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentsRequestParams = {
    value: QueryIntentsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionByIdRequestParams = {
    value: QueryActionByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewIntentParams = {
    value: MsgNewIntent;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateIntentParams = {
    value: MsgUpdateIntent;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendApproverParams = {
    value: Approver;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionParams = {
    value: MsgApproveAction;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentsResponseParams = {
    value: QueryIntentsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendIntentParams = {
    value: Intent;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsResponseParams = {
    value: QueryActionsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgActionCreatedParams = {
    value: MsgActionCreated;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsRequestParams = {
    value: QueryActionsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateIntentResponseParams = {
    value: MsgUpdateIntentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionParams = {
    value: MsgRevokeAction;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
    fee?: StdFee;
    memo?: string;
};
type sendActionParams = {
    value: Action;
    fee?: StdFee;
    memo?: string;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryIntentsRequestParams = {
    value: QueryIntentsRequest;
};
type queryActionByIdRequestParams = {
    value: QueryActionByIdRequest;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgNewIntentParams = {
    value: MsgNewIntent;
};
type msgUpdateIntentParams = {
    value: MsgUpdateIntent;
};
type paramsParams = {
    value: Params;
};
type approverParams = {
    value: Approver;
};
type msgApproveActionParams = {
    value: MsgApproveAction;
};
type queryIntentsResponseParams = {
    value: QueryIntentsResponse;
};
type queryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
};
type intentParams = {
    value: Intent;
};
type queryActionsResponseParams = {
    value: QueryActionsResponse;
};
type msgActionCreatedParams = {
    value: MsgActionCreated;
};
type queryActionsRequestParams = {
    value: QueryActionsRequest;
};
type queryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
};
type msgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
};
type msgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
};
type msgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgUpdateIntentResponseParams = {
    value: MsgUpdateIntentResponse;
};
type queryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
};
type queryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
};
type msgRevokeActionParams = {
    value: MsgRevokeAction;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
};
type actionParams = {
    value: Action;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryIntentsRequest({ value, fee, memo }: sendQueryIntentsRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdRequest({ value, fee, memo }: sendQueryActionByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgNewIntent({ value, fee, memo }: sendMsgNewIntentParams): Promise<DeliverTxResponse>;
    sendMsgUpdateIntent({ value, fee, memo }: sendMsgUpdateIntentParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendApprover({ value, fee, memo }: sendApproverParams): Promise<DeliverTxResponse>;
    sendMsgApproveAction({ value, fee, memo }: sendMsgApproveActionParams): Promise<DeliverTxResponse>;
    sendQueryIntentsResponse({ value, fee, memo }: sendQueryIntentsResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressResponse({ value, fee, memo }: sendQueryActionsByAddressResponseParams): Promise<DeliverTxResponse>;
    sendIntent({ value, fee, memo }: sendIntentParams): Promise<DeliverTxResponse>;
    sendQueryActionsResponse({ value, fee, memo }: sendQueryActionsResponseParams): Promise<DeliverTxResponse>;
    sendMsgActionCreated({ value, fee, memo }: sendMsgActionCreatedParams): Promise<DeliverTxResponse>;
    sendQueryActionsRequest({ value, fee, memo }: sendQueryActionsRequestParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdResponse({ value, fee, memo }: sendQueryIntentByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgApproveActionResponse({ value, fee, memo }: sendMsgApproveActionResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewIntentResponse({ value, fee, memo }: sendMsgNewIntentResponseParams): Promise<DeliverTxResponse>;
    sendMsgRevokeActionResponse({ value, fee, memo }: sendMsgRevokeActionResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateIntentResponse({ value, fee, memo }: sendMsgUpdateIntentResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressRequest({ value, fee, memo }: sendQueryActionsByAddressRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdResponse({ value, fee, memo }: sendQueryActionByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAction({ value, fee, memo }: sendMsgRevokeActionParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdRequest({ value, fee, memo }: sendQueryIntentByIdRequestParams): Promise<DeliverTxResponse>;
    sendAction({ value, fee, memo }: sendActionParams): Promise<DeliverTxResponse>;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryIntentsRequest({ value }: queryIntentsRequestParams): EncodeObject;
    queryActionByIdRequest({ value }: queryActionByIdRequestParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgNewIntent({ value }: msgNewIntentParams): EncodeObject;
    msgUpdateIntent({ value }: msgUpdateIntentParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    approver({ value }: approverParams): EncodeObject;
    msgApproveAction({ value }: msgApproveActionParams): EncodeObject;
    queryIntentsResponse({ value }: queryIntentsResponseParams): EncodeObject;
    queryActionsByAddressResponse({ value }: queryActionsByAddressResponseParams): EncodeObject;
    intent({ value }: intentParams): EncodeObject;
    queryActionsResponse({ value }: queryActionsResponseParams): EncodeObject;
    msgActionCreated({ value }: msgActionCreatedParams): EncodeObject;
    queryActionsRequest({ value }: queryActionsRequestParams): EncodeObject;
    queryIntentByIdResponse({ value }: queryIntentByIdResponseParams): EncodeObject;
    msgApproveActionResponse({ value }: msgApproveActionResponseParams): EncodeObject;
    msgNewIntentResponse({ value }: msgNewIntentResponseParams): EncodeObject;
    msgRevokeActionResponse({ value }: msgRevokeActionResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgUpdateIntentResponse({ value }: msgUpdateIntentResponseParams): EncodeObject;
    queryActionsByAddressRequest({ value }: queryActionsByAddressRequestParams): EncodeObject;
    queryActionByIdResponse({ value }: queryActionByIdResponseParams): EncodeObject;
    msgRevokeAction({ value }: msgRevokeActionParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryIntentByIdRequest({ value }: queryIntentByIdRequestParams): EncodeObject;
    action({ value }: actionParams): EncodeObject;
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
