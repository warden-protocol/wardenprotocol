import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { Action } from "./types/warden/intent/action";
import { Approver } from "./types/warden/intent/action";
import { Intent } from "./types/warden/intent/intent";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { MsgActionCreated } from "./types/warden/intent/action";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { Params } from "./types/warden/intent/params";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.Action", Action],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.Params", Params],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    
];

export { msgTypes }