import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { Approver } from "./types/warden/intent/action";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { MsgActionCreated } from "./types/warden/intent/action";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { Intent } from "./types/warden/intent/intent";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { IntentResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { Action } from "./types/warden/intent/action";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { IntentParticipant } from "./types/warden/intent/intent";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { BoolparserIntent } from "./types/warden/intent/intent";
export { Approver, QueryIntentByIdResponse, MsgActionCreated, MsgUpdateParams, MsgRevokeActionResponse, QueryActionsByAddressResponse, Intent, MsgRevokeAction, IntentResponse, QueryIntentsRequest, QueryIntentByIdRequest, QueryActionByIdResponse, MsgApproveAction, QueryActionsRequest, QueryActionByIdRequest, GenesisState, MsgNewIntent, MsgNewIntentResponse, QueryParamsRequest, QueryActionsByAddressRequest, QueryActionsResponse, QueryIntentsResponse, Action, MsgUpdateParamsResponse, IntentParticipant, QueryParamsResponse, Params, MsgApproveActionResponse, BoolparserIntent };
type sendApproverParams = {
    value: Approver;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgActionCreatedParams = {
    value: MsgActionCreated;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsParams = {
    value: MsgUpdateParams;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
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
type sendMsgRevokeActionParams = {
    value: MsgRevokeAction;
    fee?: StdFee;
    memo?: string;
};
type sendIntentResponseParams = {
    value: IntentResponse;
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
type sendQueryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionParams = {
    value: MsgApproveAction;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsRequestParams = {
    value: QueryActionsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionByIdRequestParams = {
    value: QueryActionByIdRequest;
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
type sendMsgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsRequestParams = {
    value: QueryParamsRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsResponseParams = {
    value: QueryActionsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentsResponseParams = {
    value: QueryIntentsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendActionParams = {
    value: Action;
    fee?: StdFee;
    memo?: string;
};
type sendMsgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendIntentParticipantParams = {
    value: IntentParticipant;
    fee?: StdFee;
    memo?: string;
};
type sendQueryParamsResponseParams = {
    value: QueryParamsResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendMsgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendBoolparserIntentParams = {
    value: BoolparserIntent;
    fee?: StdFee;
    memo?: string;
};
type approverParams = {
    value: Approver;
};
type queryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
};
type msgActionCreatedParams = {
    value: MsgActionCreated;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
};
type queryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
};
type intentParams = {
    value: Intent;
};
type msgRevokeActionParams = {
    value: MsgRevokeAction;
};
type intentResponseParams = {
    value: IntentResponse;
};
type queryIntentsRequestParams = {
    value: QueryIntentsRequest;
};
type queryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
};
type queryActionByIdResponseParams = {
    value: QueryActionByIdResponse;
};
type msgApproveActionParams = {
    value: MsgApproveAction;
};
type queryActionsRequestParams = {
    value: QueryActionsRequest;
};
type queryActionByIdRequestParams = {
    value: QueryActionByIdRequest;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgNewIntentParams = {
    value: MsgNewIntent;
};
type msgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
};
type queryActionsResponseParams = {
    value: QueryActionsResponse;
};
type queryIntentsResponseParams = {
    value: QueryIntentsResponse;
};
type actionParams = {
    value: Action;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type intentParticipantParams = {
    value: IntentParticipant;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type paramsParams = {
    value: Params;
};
type msgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
};
type boolparserIntentParams = {
    value: BoolparserIntent;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendApprover({ value, fee, memo }: sendApproverParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdResponse({ value, fee, memo }: sendQueryIntentByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgActionCreated({ value, fee, memo }: sendMsgActionCreatedParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgRevokeActionResponse({ value, fee, memo }: sendMsgRevokeActionResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressResponse({ value, fee, memo }: sendQueryActionsByAddressResponseParams): Promise<DeliverTxResponse>;
    sendIntent({ value, fee, memo }: sendIntentParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAction({ value, fee, memo }: sendMsgRevokeActionParams): Promise<DeliverTxResponse>;
    sendIntentResponse({ value, fee, memo }: sendIntentResponseParams): Promise<DeliverTxResponse>;
    sendQueryIntentsRequest({ value, fee, memo }: sendQueryIntentsRequestParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdRequest({ value, fee, memo }: sendQueryIntentByIdRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdResponse({ value, fee, memo }: sendQueryActionByIdResponseParams): Promise<DeliverTxResponse>;
    sendMsgApproveAction({ value, fee, memo }: sendMsgApproveActionParams): Promise<DeliverTxResponse>;
    sendQueryActionsRequest({ value, fee, memo }: sendQueryActionsRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionByIdRequest({ value, fee, memo }: sendQueryActionByIdRequestParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgNewIntent({ value, fee, memo }: sendMsgNewIntentParams): Promise<DeliverTxResponse>;
    sendMsgNewIntentResponse({ value, fee, memo }: sendMsgNewIntentResponseParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressRequest({ value, fee, memo }: sendQueryActionsByAddressRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionsResponse({ value, fee, memo }: sendQueryActionsResponseParams): Promise<DeliverTxResponse>;
    sendQueryIntentsResponse({ value, fee, memo }: sendQueryIntentsResponseParams): Promise<DeliverTxResponse>;
    sendAction({ value, fee, memo }: sendActionParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendIntentParticipant({ value, fee, memo }: sendIntentParticipantParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendMsgApproveActionResponse({ value, fee, memo }: sendMsgApproveActionResponseParams): Promise<DeliverTxResponse>;
    sendBoolparserIntent({ value, fee, memo }: sendBoolparserIntentParams): Promise<DeliverTxResponse>;
    approver({ value }: approverParams): EncodeObject;
    queryIntentByIdResponse({ value }: queryIntentByIdResponseParams): EncodeObject;
    msgActionCreated({ value }: msgActionCreatedParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgRevokeActionResponse({ value }: msgRevokeActionResponseParams): EncodeObject;
    queryActionsByAddressResponse({ value }: queryActionsByAddressResponseParams): EncodeObject;
    intent({ value }: intentParams): EncodeObject;
    msgRevokeAction({ value }: msgRevokeActionParams): EncodeObject;
    intentResponse({ value }: intentResponseParams): EncodeObject;
    queryIntentsRequest({ value }: queryIntentsRequestParams): EncodeObject;
    queryIntentByIdRequest({ value }: queryIntentByIdRequestParams): EncodeObject;
    queryActionByIdResponse({ value }: queryActionByIdResponseParams): EncodeObject;
    msgApproveAction({ value }: msgApproveActionParams): EncodeObject;
    queryActionsRequest({ value }: queryActionsRequestParams): EncodeObject;
    queryActionByIdRequest({ value }: queryActionByIdRequestParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgNewIntent({ value }: msgNewIntentParams): EncodeObject;
    msgNewIntentResponse({ value }: msgNewIntentResponseParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryActionsByAddressRequest({ value }: queryActionsByAddressRequestParams): EncodeObject;
    queryActionsResponse({ value }: queryActionsResponseParams): EncodeObject;
    queryIntentsResponse({ value }: queryIntentsResponseParams): EncodeObject;
    action({ value }: actionParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    intentParticipant({ value }: intentParticipantParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    msgApproveActionResponse({ value }: msgApproveActionResponseParams): EncodeObject;
    boolparserIntent({ value }: boolparserIntentParams): EncodeObject;
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
