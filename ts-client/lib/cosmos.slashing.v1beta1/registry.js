import { QueryParamsResponse } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfoResponse } from "./types/cosmos/slashing/v1beta1/query";
import { ValidatorSigningInfo } from "./types/cosmos/slashing/v1beta1/slashing";
import { Params } from "./types/cosmos/slashing/v1beta1/slashing";
import { ValidatorMissedBlocks } from "./types/cosmos/slashing/v1beta1/genesis";
import { QueryParamsRequest } from "./types/cosmos/slashing/v1beta1/query";
import { SigningInfo } from "./types/cosmos/slashing/v1beta1/genesis";
import { QuerySigningInfoRequest } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUnjail } from "./types/cosmos/slashing/v1beta1/tx";
import { MsgUnjailResponse } from "./types/cosmos/slashing/v1beta1/tx";
import { MsgUpdateParamsResponse } from "./types/cosmos/slashing/v1beta1/tx";
import { GenesisState } from "./types/cosmos/slashing/v1beta1/genesis";
import { MissedBlock } from "./types/cosmos/slashing/v1beta1/genesis";
import { QuerySigningInfosRequest } from "./types/cosmos/slashing/v1beta1/query";
import { QuerySigningInfosResponse } from "./types/cosmos/slashing/v1beta1/query";
import { MsgUpdateParams } from "./types/cosmos/slashing/v1beta1/tx";
const msgTypes = [
    ["/cosmos.slashing.v1beta1.QueryParamsResponse", QueryParamsResponse],
    ["/cosmos.slashing.v1beta1.QuerySigningInfoResponse", QuerySigningInfoResponse],
    ["/cosmos.slashing.v1beta1.ValidatorSigningInfo", ValidatorSigningInfo],
    ["/cosmos.slashing.v1beta1.Params", Params],
    ["/cosmos.slashing.v1beta1.ValidatorMissedBlocks", ValidatorMissedBlocks],
    ["/cosmos.slashing.v1beta1.QueryParamsRequest", QueryParamsRequest],
    ["/cosmos.slashing.v1beta1.SigningInfo", SigningInfo],
    ["/cosmos.slashing.v1beta1.QuerySigningInfoRequest", QuerySigningInfoRequest],
    ["/cosmos.slashing.v1beta1.MsgUnjail", MsgUnjail],
    ["/cosmos.slashing.v1beta1.MsgUnjailResponse", MsgUnjailResponse],
    ["/cosmos.slashing.v1beta1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
    ["/cosmos.slashing.v1beta1.GenesisState", GenesisState],
    ["/cosmos.slashing.v1beta1.MissedBlock", MissedBlock],
    ["/cosmos.slashing.v1beta1.QuerySigningInfosRequest", QuerySigningInfosRequest],
    ["/cosmos.slashing.v1beta1.QuerySigningInfosResponse", QuerySigningInfosResponse],
    ["/cosmos.slashing.v1beta1.MsgUpdateParams", MsgUpdateParams],
];
export { msgTypes };
