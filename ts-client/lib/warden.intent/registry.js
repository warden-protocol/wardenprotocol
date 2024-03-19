import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { Approver } from "./types/warden/intent/action";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { Intent } from "./types/warden/intent/intent";
import { Action } from "./types/warden/intent/action";
import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { QueryParamsResponse } from "./types/warden/intent/query";
const msgTypes = [
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.Action", Action],
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.Params", Params],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
];
export { msgTypes };
