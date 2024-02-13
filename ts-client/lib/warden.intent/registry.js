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
const msgTypes = [
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.Action", Action],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.IntentParticipant", IntentParticipant],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.IntentResponse", IntentResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.Params", Params],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.BoolparserIntent", BoolparserIntent],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
];
export { msgTypes };
