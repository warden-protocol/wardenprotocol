import { MsgActionCreated } from "./types/warden/intent/action";
import { QueryParamsRequest } from "./types/warden/intent/query";
import { GenesisState } from "./types/warden/intent/genesis";
import { QueryActionsByAddressResponse } from "./types/warden/intent/query";
import { QueryActionByIdRequest } from "./types/warden/intent/query";
import { Params } from "./types/warden/intent/params";
import { MsgUpdateParams } from "./types/warden/intent/tx";
import { QueryActionsRequest } from "./types/warden/intent/query";
import { MsgApproveAction } from "./types/warden/intent/tx";
import { QueryIntentsResponse } from "./types/warden/intent/query";
import { MsgUpdateIntent } from "./types/warden/intent/tx";
import { MsgUpdateIntentResponse } from "./types/warden/intent/tx";
import { Action } from "./types/warden/intent/action";
import { QueryParamsResponse } from "./types/warden/intent/query";
import { QueryIntentsRequest } from "./types/warden/intent/query";
import { MsgNewIntent } from "./types/warden/intent/tx";
import { QueryActionsResponse } from "./types/warden/intent/query";
import { QueryIntentByIdResponse } from "./types/warden/intent/query";
import { MsgUpdateParamsResponse } from "./types/warden/intent/tx";
import { MsgApproveActionResponse } from "./types/warden/intent/tx";
import { MsgRevokeAction } from "./types/warden/intent/tx";
import { MsgRevokeActionResponse } from "./types/warden/intent/tx";
import { MsgNewIntentResponse } from "./types/warden/intent/tx";
import { Approver } from "./types/warden/intent/action";
import { Intent } from "./types/warden/intent/intent";
import { QueryIntentByIdRequest } from "./types/warden/intent/query";
import { QueryActionsByAddressRequest } from "./types/warden/intent/query";
import { QueryActionByIdResponse } from "./types/warden/intent/query";
const msgTypes = [
    ["/warden.intent.MsgActionCreated", MsgActionCreated],
    ["/warden.intent.QueryParamsRequest", QueryParamsRequest],
    ["/warden.intent.GenesisState", GenesisState],
    ["/warden.intent.QueryActionsByAddressResponse", QueryActionsByAddressResponse],
    ["/warden.intent.QueryActionByIdRequest", QueryActionByIdRequest],
    ["/warden.intent.Params", Params],
    ["/warden.intent.MsgUpdateParams", MsgUpdateParams],
    ["/warden.intent.QueryActionsRequest", QueryActionsRequest],
    ["/warden.intent.MsgApproveAction", MsgApproveAction],
    ["/warden.intent.QueryIntentsResponse", QueryIntentsResponse],
    ["/warden.intent.MsgUpdateIntent", MsgUpdateIntent],
    ["/warden.intent.MsgUpdateIntentResponse", MsgUpdateIntentResponse],
    ["/warden.intent.Action", Action],
    ["/warden.intent.QueryParamsResponse", QueryParamsResponse],
    ["/warden.intent.QueryIntentsRequest", QueryIntentsRequest],
    ["/warden.intent.MsgNewIntent", MsgNewIntent],
    ["/warden.intent.QueryActionsResponse", QueryActionsResponse],
    ["/warden.intent.QueryIntentByIdResponse", QueryIntentByIdResponse],
    ["/warden.intent.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/warden.intent.MsgApproveActionResponse", MsgApproveActionResponse],
    ["/warden.intent.MsgRevokeAction", MsgRevokeAction],
    ["/warden.intent.MsgRevokeActionResponse", MsgRevokeActionResponse],
    ["/warden.intent.MsgNewIntentResponse", MsgNewIntentResponse],
    ["/warden.intent.Approver", Approver],
    ["/warden.intent.Intent", Intent],
    ["/warden.intent.QueryIntentByIdRequest", QueryIntentByIdRequest],
    ["/warden.intent.QueryActionsByAddressRequest", QueryActionsByAddressRequest],
    ["/warden.intent.QueryActionByIdResponse", QueryActionByIdResponse],
];
export { msgTypes };
