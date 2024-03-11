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
const msgTypes = [
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.IntentResponse", IntentResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.Action", Action],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.IntentParticipant", IntentParticipant],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.Params", Params],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.BoolparserIntent", BoolparserIntent],
];
export { msgTypes };
