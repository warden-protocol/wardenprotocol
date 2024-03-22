import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { Action } from "./types/warden/intent/action";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { Approver } from "./types/warden/intent/action";
import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";
import { GenesisState } from "./types/warden/intent/genesis";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { Intent } from "./types/warden/intent/intent";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.Action", Action],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.Params", Params],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.Intent", Intent],
    
];

export { msgTypes }