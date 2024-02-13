import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryParamsResponse } from "./types/cosmos/params/v1beta1/query";
import { QuerySubspacesRequest } from "./types/cosmos/params/v1beta1/query";
import { Subspace } from "./types/cosmos/params/v1beta1/query";
import { ParameterChangeProposal } from "./types/cosmos/params/v1beta1/params";
import { ParamChange } from "./types/cosmos/params/v1beta1/params";
import { QueryParamsRequest } from "./types/cosmos/params/v1beta1/query";
import { QuerySubspacesResponse } from "./types/cosmos/params/v1beta1/query";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.params.v1beta1.QueryParamsResponse", QueryParamsResponse],
    ["/cosmos.params.v1beta1.QuerySubspacesRequest", QuerySubspacesRequest],
    ["/cosmos.params.v1beta1.Subspace", Subspace],
    ["/cosmos.params.v1beta1.ParameterChangeProposal", ParameterChangeProposal],
    ["/cosmos.params.v1beta1.ParamChange", ParamChange],
    ["/cosmos.params.v1beta1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.params.v1beta1.QuerySubspacesResponse", QuerySubspacesResponse],
    
];

export { msgTypes }