import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateParams } from "./types/cosmos/consensus/v1/tx";
import { QueryParamsRequest } from "./types/cosmos/consensus/v1/query";
import { QueryParamsResponse } from "./types/cosmos/consensus/v1/query";
import { MsgUpdateParamsResponse } from "./types/cosmos/consensus/v1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.consensus.v1.MsgUpdateParams", MsgUpdateParams],
    ["/cosmos.consensus.v1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.consensus.v1.QueryParamsResponse", QueryParamsResponse],
    ["/cosmos.consensus.v1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    
];

export { msgTypes }