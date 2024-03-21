import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { Action } from "./types/warden/intent/action";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { Approver } from "./types/warden/intent/action";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { Intent } from "./types/warden/intent/intent";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.Action", Action],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.Params", Params],
    
];

export { msgTypes }