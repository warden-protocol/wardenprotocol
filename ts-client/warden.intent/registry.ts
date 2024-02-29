import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgActionCreated } from "./types/warden/intent/action";
import { Action } from "./types/warden/intent/action";
import { IntentResponse } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { BoolparserIntent } from "./types/warden/intent/intent";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { Intent } from "./types/warden/intent/intent";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { Approver } from "./types/warden/intent/action";
import { IntentParticipant } from "./types/warden/intent/intent";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.Action", Action],
    ["/warden.intent.IntentResponse", IntentResponse],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.Params", Params],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.BoolparserIntent", BoolparserIntent],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.IntentParticipant", IntentParticipant],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    
];

export { msgTypes }