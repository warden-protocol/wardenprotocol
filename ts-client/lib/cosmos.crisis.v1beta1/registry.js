import { GenesisState } from "./types/cosmos/crisis/v1beta1/genesis";
import { MsgVerifyInvariant } from "./types/cosmos/crisis/v1beta1/tx";
import { MsgVerifyInvariantResponse } from "./types/cosmos/crisis/v1beta1/tx";
import { MsgUpdateParams } from "./types/cosmos/crisis/v1beta1/tx";
import { MsgUpdateParamsResponse } from "./types/cosmos/crisis/v1beta1/tx";
const msgTypes = [
    ["/cosmos.crisis.v1beta1.GenesisState", GenesisState],
    ["/cosmos.crisis.v1beta1.MsgVerifyInvariant", MsgVerifyInvariant],
    ["/cosmos.crisis.v1beta1.MsgVerifyInvariantResponse", MsgVerifyInvariantResponse],
    ["/cosmos.crisis.v1beta1.MsgUpdateParams", MsgUpdateParams],
    ["/cosmos.crisis.v1beta1.MsgUpdateParamsResponse", MsgUpdateParamsResponse],
];
export { msgTypes };
