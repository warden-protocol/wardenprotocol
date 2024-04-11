import { MsgUpdateParams } from "./types/cosmos/consensus/v1/tx";
import { MsgUpdateParamsResponse } from "./types/cosmos/consensus/v1/tx";
import { QueryParamsRequest } from "./types/cosmos/consensus/v1/query";
import { QueryParamsResponse } from "./types/cosmos/consensus/v1/query";
const msgTypes = [
    ["/cosmos.consensus.v1.MsgUpdateParams", MsgUpdateParams],
    ["/cosmos.consensus.v1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cosmos.consensus.v1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.consensus.v1.QueryParamsResponse", QueryParamsResponse],
];
export { msgTypes };
