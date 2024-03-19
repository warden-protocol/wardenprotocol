import { QueryParamsResponse } from "./types/cosmos/params/v1beta1/query";
import { QuerySubspacesRequest } from "./types/cosmos/params/v1beta1/query";
import { Subspace } from "./types/cosmos/params/v1beta1/query";
import { QueryParamsRequest } from "./types/cosmos/params/v1beta1/query";
import { ParamChange } from "./types/cosmos/params/v1beta1/params";
import { QuerySubspacesResponse } from "./types/cosmos/params/v1beta1/query";
import { ParameterChangeProposal } from "./types/cosmos/params/v1beta1/params";
const msgTypes = [
    ["/cosmos.params.v1beta1.QueryParamsResponse", QueryParamsResponse],
    ["/cosmos.params.v1beta1.QuerySubspacesRequest", QuerySubspacesRequest],
    ["/cosmos.params.v1beta1.Subspace", Subspace],
    ["/cosmos.params.v1beta1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.params.v1beta1.ParamChange", ParamChange],
    ["/cosmos.params.v1beta1.QuerySubspacesResponse", QuerySubspacesResponse],
    ["/cosmos.params.v1beta1.ParameterChangeProposal", ParameterChangeProposal],
];
export { msgTypes };
