import { GeneratedType } from "@cosmjs/proto-signing";
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

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.intent.MsgUpdateIntentResponse", MsgUpdateIntentResponse],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.Action", Action],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.Params", Params],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.MsgUpdateIntent", MsgUpdateIntent],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    
];

export { msgTypes }