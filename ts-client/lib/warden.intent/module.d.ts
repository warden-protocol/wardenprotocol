import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { Action } from "./types/warden/intent/action";
import { Intent } from "./types/warden/intent/intent";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { Approver } from "./types/warden/intent/action";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { Params } from "./types/warden/intent/params";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { GenesisState } from "./types/warden/intent/genesis";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
export { Action, Intent, MsgUpdateParamsResponse, QueryParamsRequest, MsgActionCreated, QueryActionsResponse, QueryIntentsRequest, QueryActionByIdRequest, QueryActionByIdResponse, Approver, MsgApproveActionResponse, Params, QueryParamsResponse, QueryActionsRequest, QueryIntentByIdRequest, MsgUpdateParams, MsgNewIntent, MsgNewIntentResponse, QueryIntentsResponse, QueryActionsByAddressRequest, QueryActionsByAddressResponse, MsgRevokeAction, GenesisState, QueryIntentByIdResponse, MsgApproveAction, MsgRevokeActionResponse };
type sendActionParams = {
    value: Action;
    fee?: StdFee;
    memo?: string;
};
type sendIntentParams = {
    value: Intent;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendMsgActionCreatedParams = {
    value: MsgActionCreated;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsResponseParams = {
    value: QueryActionsResponse;
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
type sendQueryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendApproverParams = {
    value: Approver;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
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
type sendQueryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
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
type sendMsgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentsResponseParams = {
    value: QueryIntentsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionParams = {
    value: MsgRevokeAction;
    fee?: StdFee;
    memo?: string;
};
type sendGenesisStateParams = {
    value: GenesisState;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionParams = {
    value: MsgApproveAction;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
    fee?: StdFee;
    memo?: string;
};
type actionParams = {
    value: Action;
};
type intentParams = {
    value: Intent;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type msgActionCreatedParams = {
    value: MsgActionCreated;
};
type queryActionsResponseParams = {
    value: QueryActionsResponse;
};
type queryIntentsRequestParams = {
    value: QueryIntentsRequest;
};
type queryActionByIdRequestParams = {
    value: QueryActionByIdRequest;
};
type queryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
};
type approverParams = {
    value: Approver;
};
type msgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
};
type paramsParams = {
    value: Params;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type queryActionsRequestParams = {
    value: QueryActionsRequest;
};
type queryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgNewIntentParams = {
    value: MsgNewIntent;
};
type msgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
};
type queryIntentsResponseParams = {
    value: QueryIntentsResponse;
};
type queryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
};
type queryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
};
type msgRevokeActionParams = {
    value: MsgRevokeAction;
};
type genesisStateParams = {
    value: GenesisState;
};
type queryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
};
type msgApproveActionParams = {
    value: MsgApproveAction;
};
type msgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendAction({ value, fee, memo }: sendActionParams): Promise<DeliverTxResponse>;
    sendIntent({ value, fee, memo }: sendIntentParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendMsgActionCreated({ value, fee, memo }: sendMsgActionCreatedParams): Promise<DeliverTxResponse>;
    sendQueryActionsResponse({ value, fee, memo }: sendQueryActionsResponseParams): Promise<DeliverTxResponse>;
    sendQueryIntentsRequest({ value, fee, memo }: sendQueryIntentsRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdRequest({ value, fee, memo }: sendQueryActionByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdResponse({ value, fee, memo }: sendQueryActionByIdResponseParams): Promise<DeliverTxResponse>;
    sendApprover({ value, fee, memo }: sendApproverParams): Promise<DeliverTxResponse>;
    sendMsgApproveActionResponse({ value, fee, memo }: sendMsgApproveActionResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsRequest({ value, fee, memo }: sendQueryActionsRequestParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdRequest({ value, fee, memo }: sendQueryIntentByIdRequestParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgNewIntent({ value, fee, memo }: sendMsgNewIntentParams): Promise<DeliverTxResponse>;
    sendMsgNewIntentResponse({ value, fee, memo }: sendMsgNewIntentResponseParams): Promise<DeliverTxResponse>;
    sendQueryIntentsResponse({ value, fee, memo }: sendQueryIntentsResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressRequest({ value, fee, memo }: sendQueryActionsByAddressRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressResponse({ value, fee, memo }: sendQueryActionsByAddressResponseParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAction({ value, fee, memo }: sendMsgRevokeActionParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdResponse({ value, fee, memo }: sendQueryIntentByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgApproveAction({ value, fee, memo }: sendMsgApproveActionParams): Promise<DeliverTxResponse>;
    sendMsgRevokeActionResponse({ value, fee, memo }: sendMsgRevokeActionResponseParams): Promise<DeliverTxResponse>;
    action({ value }: actionParams): EncodeObject;
    intent({ value }: intentParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    msgActionCreated({ value }: msgActionCreatedParams): EncodeObject;
    queryActionsResponse({ value }: queryActionsResponseParams): EncodeObject;
    queryIntentsRequest({ value }: queryIntentsRequestParams): EncodeObject;
    queryActionByIdRequest({ value }: queryActionByIdRequestParams): EncodeObject;
    queryActionByIdResponse({ value }: queryActionByIdResponseParams): EncodeObject;
    approver({ value }: approverParams): EncodeObject;
    msgApproveActionResponse({ value }: msgApproveActionResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    queryActionsRequest({ value }: queryActionsRequestParams): EncodeObject;
    queryIntentByIdRequest({ value }: queryIntentByIdRequestParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgNewIntent({ value }: msgNewIntentParams): EncodeObject;
    msgNewIntentResponse({ value }: msgNewIntentResponseParams): EncodeObject;
    queryIntentsResponse({ value }: queryIntentsResponseParams): EncodeObject;
    queryActionsByAddressRequest({ value }: queryActionsByAddressRequestParams): EncodeObject;
    queryActionsByAddressResponse({ value }: queryActionsByAddressResponseParams): EncodeObject;
    msgRevokeAction({ value }: msgRevokeActionParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    queryIntentByIdResponse({ value }: queryIntentByIdResponseParams): EncodeObject;
    msgApproveAction({ value }: msgApproveActionParams): EncodeObject;
    msgRevokeActionResponse({ value }: msgRevokeActionResponseParams): EncodeObject;
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
