import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { Params } from "./types/warden/intent/params";
import { Approver } from "./types/warden/intent/action";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { Intent } from "./types/warden/intent/intent";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { Action } from "./types/warden/intent/action";
import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
const msgTypes = [
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.Params", Params],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.Action", Action],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
];
export { msgTypes };
