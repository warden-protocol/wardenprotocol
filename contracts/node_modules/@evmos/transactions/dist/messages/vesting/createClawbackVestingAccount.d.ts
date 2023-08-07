import { TxContext } from '../base.js';
import { Period } from '../common.js';
export interface MsgCreateClawbackVestingAccountParams {
    fromAddress: string;
    toAddress: string;
    startTime: number;
    lockupPeriods: Period[];
    vestingPeriods: Period[];
    merge: boolean;
}
export declare const createTxMsgCreateClawbackVestingAccount: (context: TxContext, params: MsgCreateClawbackVestingAccountParams) => import("../common.js").TxPayload;
//# sourceMappingURL=createClawbackVestingAccount.d.ts.map