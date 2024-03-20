import { GeneratedType } from "@cosmjs/proto-signing";
import { DelayedVestingAccount } from "./types/cosmos/vesting/v1beta1/vesting";
import { MsgCreateVestingAccount } from "./types/cosmos/vesting/v1beta1/tx";
import { MsgCreatePeriodicVestingAccountResponse } from "./types/cosmos/vesting/v1beta1/tx";
import { PeriodicVestingAccount } from "./types/cosmos/vesting/v1beta1/vesting";
import { BaseVestingAccount } from "./types/cosmos/vesting/v1beta1/vesting";
import { Period } from "./types/cosmos/vesting/v1beta1/vesting";
import { ContinuousVestingAccount } from "./types/cosmos/vesting/v1beta1/vesting";
import { PermanentLockedAccount } from "./types/cosmos/vesting/v1beta1/vesting";
import { MsgCreateVestingAccountResponse } from "./types/cosmos/vesting/v1beta1/tx";
import { MsgCreatePermanentLockedAccount } from "./types/cosmos/vesting/v1beta1/tx";
import { MsgCreatePermanentLockedAccountResponse } from "./types/cosmos/vesting/v1beta1/tx";
import { MsgCreatePeriodicVestingAccount } from "./types/cosmos/vesting/v1beta1/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/cosmos.vesting.v1beta1.DelayedVestingAccount", DelayedVestingAccount],
    ["/cosmos.vesting.v1beta1.MsgCreateVestingAccount", MsgCreateVestingAccount],
    ["/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccountResponse", MsgCreatePeriodicVestingAccountResponse],
    ["/cosmos.vesting.v1beta1.PeriodicVestingAccount", PeriodicVestingAccount],
    ["/cosmos.vesting.v1beta1.BaseVestingAccount", BaseVestingAccount],
    ["/cosmos.vesting.v1beta1.Period", Period],
    ["/cosmos.vesting.v1beta1.ContinuousVestingAccount", ContinuousVestingAccount],
    ["/cosmos.vesting.v1beta1.PermanentLockedAccount", PermanentLockedAccount],
    ["/cosmos.vesting.v1beta1.MsgCreateVestingAccountResponse", MsgCreateVestingAccountResponse],
    ["/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccount", MsgCreatePermanentLockedAccount],
    ["/cosmos.vesting.v1beta1.MsgCreatePermanentLockedAccountResponse", MsgCreatePermanentLockedAccountResponse],
    ["/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount", MsgCreatePeriodicVestingAccount],
    
];

export { msgTypes }