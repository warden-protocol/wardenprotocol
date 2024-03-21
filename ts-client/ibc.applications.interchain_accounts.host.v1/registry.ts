import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateParams } from "./types/ibc/applications/interchain_accounts/host/v1/tx";
import { QueryParamsResponse } from "./types/ibc/applications/interchain_accounts/host/v1/query";
import { MsgUpdateParamsResponse } from "./types/ibc/applications/interchain_accounts/host/v1/tx";
import { QueryParamsRequest } from "./types/ibc/applications/interchain_accounts/host/v1/query";
import { Params } from "./types/ibc/applications/interchain_accounts/host/v1/host";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/ibc.applications.interchain_accounts.host.v1.MsgUpdateParams", MsgUpdateParams],
    ["/ibc.applications.interchain_accounts.host.v1.QueryParamsResponse", QueryParamsResponse],
    ["/ibc.applications.interchain_accounts.host.v1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/ibc.applications.interchain_accounts.host.v1.QueryParamsRequest", QueryParamsRequest],
    ["/ibc.applications.interchain_accounts.host.v1.Params", Params],
    
];

export { msgTypes }