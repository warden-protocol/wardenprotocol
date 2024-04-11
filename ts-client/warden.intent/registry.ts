import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { Params } from "./types/warden/intent/params";
import { Intent } from "./types/warden/intent/intent";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { Approver } from "./types/warden/intent/action";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { MsgActionCreated } from "./types/warden/intent/action";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { MsgUpdateIntent } from "./types/warden/intent/tx";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgUpdateIntentResponse } from "./types/warden/intent/tx";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { Action } from "./types/warden/intent/action";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.Params", Params],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.MsgUpdateIntent", MsgUpdateIntent],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgUpdateIntentResponse", MsgUpdateIntentResponse],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.Action", Action],
    
];

export { msgTypes }