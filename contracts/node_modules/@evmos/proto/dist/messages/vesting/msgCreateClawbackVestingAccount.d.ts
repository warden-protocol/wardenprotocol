import { MsgCreateClawbackVestingAccount } from '../../proto/evmos/vesting/tx.js';
type Coin = {
    denom: string;
    amount: string;
};
type Period = {
    length: number;
    amount: Coin[];
};
export declare function createMsgCreateClawbackVestingAccount(fromAddress: string, toAddress: string, startTime: number, lockupPeriods: Period[], vestingPeriods: Period[], merge: boolean): {
    message: MsgCreateClawbackVestingAccount;
    path: string;
};
export {};
//# sourceMappingURL=msgCreateClawbackVestingAccount.d.ts.map