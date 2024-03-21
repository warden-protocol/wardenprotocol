import { GeneratedType } from "@cosmjs/proto-signing";
import { Approver } from "./types/warden/intent/action";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { Action } from "./types/warden/intent/action";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { Intent } from "./types/warden/intent/intent";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { QueryActionsResponse } from "./types/warden/intent/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.Action", Action],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.Params", Params],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    
];

export { msgTypes }