import { TxContext } from '../base.js';
export interface MsgCancelUnbondingDelegationParams {
    delegatorAddress: string;
    validatorAddress: string;
    amount: string;
    denom: string;
    creationHeight: string;
}
export declare const createTxMsgCancelUnbondingDelegation: (context: TxContext, params: MsgCancelUnbondingDelegationParams) => import("../common.js").TxPayload;
//# sourceMappingURL=cancelUnbondingDelegation.d.ts.map