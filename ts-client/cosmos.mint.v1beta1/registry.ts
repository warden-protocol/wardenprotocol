import { GeneratedType } from "@cosmjs/proto-signing";
import { QueryInflationRequest } from "./types/cosmos/mint/v1beta1/query";
import { QueryAnnualProvisionsRequest } from "./types/cosmos/mint/v1beta1/query";
import { QueryAnnualProvisionsResponse } from "./types/cosmos/mint/v1beta1/query";
import { GenesisState } from "./types/cosmos/mint/v1beta1/genesis";
import { MsgUpdateParams } from "./types/cosmos/mint/v1beta1/tx";
import { QueryParamsResponse } from "./types/cosmos/mint/v1beta1/query";
import { Minter } from "./types/cosmos/mint/v1beta1/mint";
import { Params } from "./types/cosmos/mint/v1beta1/mint";
import { QueryParamsRequest } from "./types/cosmos/mint/v1beta1/query";
import { QueryInflationResponse } from "./types/cosmos/mint/v1beta1/query";
import { MsgUpdateParamsResponse } from "./types/cosmos/mint/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.mint.v1beta1.QueryInflationRequest", QueryInflationRequest],
    ["/cosmos.mint.v1beta1.QueryAnnualProvisionsRequest", QueryAnnualProvisionsRequest],
    ["/cosmos.mint.v1beta1.QueryAnnualProvisionsResponse", QueryAnnualProvisionsResponse],
    ["/cosmos.mint.v1beta1.GenesisState", GenesisState],
    ["/cosmos.mint.v1beta1.MsgUpdateParams", MsgUpdateParams],
    ["/cosmos.mint.v1beta1.QueryParamsResponse", QueryParamsResponse],
    ["/cosmos.mint.v1beta1.Minter", Minter],
    ["/cosmos.mint.v1beta1.Params", Params],
    ["/cosmos.mint.v1beta1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.mint.v1beta1.QueryInflationResponse", QueryInflationResponse],
    ["/cosmos.mint.v1beta1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    
];

export { msgTypes }