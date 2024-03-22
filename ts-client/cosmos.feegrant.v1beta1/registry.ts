import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryAllowancesResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { MsgRevokeAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { GenesisState } from "./types/cosmos/feegrant/v1beta1/genesis";
import { QueryAllowanceRequest } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesByGranterResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { AllowedMsgAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { Grant } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { MsgGrantAllowance } from "./types/cosmos/feegrant/v1beta1/tx";
import { MsgGrantAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { QueryAllowancesByGranterRequest } from "./types/cosmos/feegrant/v1beta1/query";
import { BasicAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { PeriodicAllowance } from "./types/cosmos/feegrant/v1beta1/feegrant";
import { MsgRevokeAllowance } from "./types/cosmos/feegrant/v1beta1/tx";
import { MsgPruneAllowances } from "./types/cosmos/feegrant/v1beta1/tx";
import { MsgPruneAllowancesResponse } from "./types/cosmos/feegrant/v1beta1/tx";
import { QueryAllowanceResponse } from "./types/cosmos/feegrant/v1beta1/query";
import { QueryAllowancesRequest } from "./types/cosmos/feegrant/v1beta1/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.feegrant.v1beta1.QueryAllowancesResponse", QueryAllowancesResponse],
    ["/cosmos.feegrant.v1beta1.MsgRevokeAllowanceResponse", MsgRevokeAllowanceResponse],
    ["/cosmos.feegrant.v1beta1.GenesisState", GenesisState],
    ["/cosmos.feegrant.v1beta1.QueryAllowanceRequest", QueryAllowanceRequest],
    ["/cosmos.feegrant.v1beta1.QueryAllowancesByGranterResponse", QueryAllowancesByGranterResponse],
    ["/cosmos.feegrant.v1beta1.AllowedMsgAllowance", AllowedMsgAllowance],
    ["/cosmos.feegrant.v1beta1.Grant", Grant],
    ["/cosmos.feegrant.v1beta1.MsgGrantAllowance", MsgGrantAllowance],
    ["/cosmos.feegrant.v1beta1.MsgGrantAllowanceResponse", MsgGrantAllowanceResponse],
    ["/cosmos.feegrant.v1beta1.QueryAllowancesByGranterRequest", QueryAllowancesByGranterRequest],
    ["/cosmos.feegrant.v1beta1.BasicAllowance", BasicAllowance],
    ["/cosmos.feegrant.v1beta1.PeriodicAllowance", PeriodicAllowance],
    ["/cosmos.feegrant.v1beta1.MsgRevokeAllowance", MsgRevokeAllowance],
    ["/cosmos.feegrant.v1beta1.MsgPruneAllowances", MsgPruneAllowances],
    ["/cosmos.feegrant.v1beta1.MsgPruneAllowancesResponse", MsgPruneAllowancesResponse],
    ["/cosmos.feegrant.v1beta1.QueryAllowanceResponse", QueryAllowanceResponse],
    ["/cosmos.feegrant.v1beta1.QueryAllowancesRequest", QueryAllowancesRequest],
    
];

export { msgTypes }