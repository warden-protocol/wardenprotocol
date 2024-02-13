import { DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { IgniteClient } from "../client";
import { Api } from "./rest";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { Action } from "./types/warden/intent/action";
import { Intent } from "./types/warden/intent/intent";
import { IntentParticipant } from "./types/warden/intent/intent";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { IntentResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { BoolparserIntent } from "./types/warden/intent/intent";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
export { QueryIntentsResponse, QueryActionsResponse, MsgApproveAction, GenesisState, MsgUpdateParams, MsgRevokeAction, QueryActionsByAddressRequest, QueryIntentByIdResponse, Action, Intent, IntentParticipant, QueryParamsRequest, QueryParamsResponse, IntentResponse, QueryIntentsRequest, QueryActionsByAddressResponse, Params, MsgNewIntentResponse, MsgUpdateParamsResponse, MsgApproveActionResponse, MsgNewIntent, MsgRevokeActionResponse, BoolparserIntent, QueryActionsRequest, QueryIntentByIdRequest };
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
type sendMsgApproveActionParams = {
    value: MsgApproveAction;
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
type sendMsgRevokeActionParams = {
    value: MsgRevokeAction;
    fee?: StdFee;
    memo?: string;
};
type sendQueryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
    fee?: StdFee;
    memo?: string;
};
type sendQueryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
    fee?: StdFee;
    memo?: string;
};
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
type sendIntentParticipantParams = {
    value: IntentParticipant;
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
type sendQueryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
    fee?: StdFee;
    memo?: string;
};
type sendParamsParams = {
    value: Params;
    fee?: StdFee;
    memo?: string;
};
type sendMsgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
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
type sendMsgNewIntentParams = {
    value: MsgNewIntent;
    fee?: StdFee;
    memo?: string;
};
type sendMsgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
    fee?: StdFee;
    memo?: string;
};
type sendBoolparserIntentParams = {
    value: BoolparserIntent;
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
type queryIntentsResponseParams = {
    value: QueryIntentsResponse;
};
type queryActionsResponseParams = {
    value: QueryActionsResponse;
};
type msgApproveActionParams = {
    value: MsgApproveAction;
};
type genesisStateParams = {
    value: GenesisState;
};
type msgUpdateParamsParams = {
    value: MsgUpdateParams;
};
type msgRevokeActionParams = {
    value: MsgRevokeAction;
};
type queryActionsByAddressRequestParams = {
    value: QueryActionsByAddressRequest;
};
type queryIntentByIdResponseParams = {
    value: QueryIntentByIdResponse;
};
type actionParams = {
    value: Action;
};
type intentParams = {
    value: Intent;
};
type intentParticipantParams = {
    value: IntentParticipant;
};
type queryParamsRequestParams = {
    value: QueryParamsRequest;
};
type queryParamsResponseParams = {
    value: QueryParamsResponse;
};
type intentResponseParams = {
    value: IntentResponse;
};
type queryIntentsRequestParams = {
    value: QueryIntentsRequest;
};
type queryActionsByAddressResponseParams = {
    value: QueryActionsByAddressResponse;
};
type paramsParams = {
    value: Params;
};
type msgNewIntentResponseParams = {
    value: MsgNewIntentResponse;
};
type msgUpdateParamsResponseParams = {
    value: MsgUpdateParamsResponse;
};
type msgApproveActionResponseParams = {
    value: MsgApproveActionResponse;
};
type msgNewIntentParams = {
    value: MsgNewIntent;
};
type msgRevokeActionResponseParams = {
    value: MsgRevokeActionResponse;
};
type boolparserIntentParams = {
    value: BoolparserIntent;
};
type queryActionsRequestParams = {
    value: QueryActionsRequest;
};
type queryIntentByIdRequestParams = {
    value: QueryIntentByIdRequest;
};
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
    prefix: string;
    signer?: OfflineSigner;
}
export declare const txClient: ({ signer, prefix, addr }?: TxClientOptions) => {
    sendQueryIntentsResponse({ value, fee, memo }: sendQueryIntentsResponseParams): Promise<DeliverTxResponse>;
    sendQueryActionsResponse({ value, fee, memo }: sendQueryActionsResponseParams): Promise<DeliverTxResponse>;
    sendMsgApproveAction({ value, fee, memo }: sendMsgApproveActionParams): Promise<DeliverTxResponse>;
    sendGenesisState({ value, fee, memo }: sendGenesisStateParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParams({ value, fee, memo }: sendMsgUpdateParamsParams): Promise<DeliverTxResponse>;
    sendMsgRevokeAction({ value, fee, memo }: sendMsgRevokeActionParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressRequest({ value, fee, memo }: sendQueryActionsByAddressRequestParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdResponse({ value, fee, memo }: sendQueryIntentByIdResponseParams): Promise<DeliverTxResponse>;
    sendAction({ value, fee, memo }: sendActionParams): Promise<DeliverTxResponse>;
    sendIntent({ value, fee, memo }: sendIntentParams): Promise<DeliverTxResponse>;
    sendIntentParticipant({ value, fee, memo }: sendIntentParticipantParams): Promise<DeliverTxResponse>;
    sendQueryParamsRequest({ value, fee, memo }: sendQueryParamsRequestParams): Promise<DeliverTxResponse>;
    sendQueryParamsResponse({ value, fee, memo }: sendQueryParamsResponseParams): Promise<DeliverTxResponse>;
    sendIntentResponse({ value, fee, memo }: sendIntentResponseParams): Promise<DeliverTxResponse>;
    sendQueryIntentsRequest({ value, fee, memo }: sendQueryIntentsRequestParams): Promise<DeliverTxResponse>;
    sendQueryActionsByAddressResponse({ value, fee, memo }: sendQueryActionsByAddressResponseParams): Promise<DeliverTxResponse>;
    sendParams({ value, fee, memo }: sendParamsParams): Promise<DeliverTxResponse>;
    sendMsgNewIntentResponse({ value, fee, memo }: sendMsgNewIntentResponseParams): Promise<DeliverTxResponse>;
    sendMsgUpdateParamsResponse({ value, fee, memo }: sendMsgUpdateParamsResponseParams): Promise<DeliverTxResponse>;
    sendMsgApproveActionResponse({ value, fee, memo }: sendMsgApproveActionResponseParams): Promise<DeliverTxResponse>;
    sendMsgNewIntent({ value, fee, memo }: sendMsgNewIntentParams): Promise<DeliverTxResponse>;
    sendMsgRevokeActionResponse({ value, fee, memo }: sendMsgRevokeActionResponseParams): Promise<DeliverTxResponse>;
    sendBoolparserIntent({ value, fee, memo }: sendBoolparserIntentParams): Promise<DeliverTxResponse>;
    sendQueryActionsRequest({ value, fee, memo }: sendQueryActionsRequestParams): Promise<DeliverTxResponse>;
    sendQueryIntentByIdRequest({ value, fee, memo }: sendQueryIntentByIdRequestParams): Promise<DeliverTxResponse>;
    queryIntentsResponse({ value }: queryIntentsResponseParams): EncodeObject;
    queryActionsResponse({ value }: queryActionsResponseParams): EncodeObject;
    msgApproveAction({ value }: msgApproveActionParams): EncodeObject;
    genesisState({ value }: genesisStateParams): EncodeObject;
    msgUpdateParams({ value }: msgUpdateParamsParams): EncodeObject;
    msgRevokeAction({ value }: msgRevokeActionParams): EncodeObject;
    queryActionsByAddressRequest({ value }: queryActionsByAddressRequestParams): EncodeObject;
    queryIntentByIdResponse({ value }: queryIntentByIdResponseParams): EncodeObject;
    action({ value }: actionParams): EncodeObject;
    intent({ value }: intentParams): EncodeObject;
    intentParticipant({ value }: intentParticipantParams): EncodeObject;
    queryParamsRequest({ value }: queryParamsRequestParams): EncodeObject;
    queryParamsResponse({ value }: queryParamsResponseParams): EncodeObject;
    intentResponse({ value }: intentResponseParams): EncodeObject;
    queryIntentsRequest({ value }: queryIntentsRequestParams): EncodeObject;
    queryActionsByAddressResponse({ value }: queryActionsByAddressResponseParams): EncodeObject;
    params({ value }: paramsParams): EncodeObject;
    msgNewIntentResponse({ value }: msgNewIntentResponseParams): EncodeObject;
    msgUpdateParamsResponse({ value }: msgUpdateParamsResponseParams): EncodeObject;
    msgApproveActionResponse({ value }: msgApproveActionResponseParams): EncodeObject;
    msgNewIntent({ value }: msgNewIntentParams): EncodeObject;
    msgRevokeActionResponse({ value }: msgRevokeActionResponseParams): EncodeObject;
    boolparserIntent({ value }: boolparserIntentParams): EncodeObject;
    queryActionsRequest({ value }: queryActionsRequestParams): EncodeObject;
    queryIntentByIdRequest({ value }: queryIntentByIdRequestParams): EncodeObject;
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
