import { TxContext } from '../base.js';
export interface MsgStakeAuthorizationParams {
    granteeAddress: string;
    validatorAddress: string;
    denom: string;
    maxTokens: string | undefined;
    expiration: number;
}
export declare function createTxMsgStakeAuthorization(context: TxContext, params: MsgStakeAuthorizationParams): import("../common.js").TxPayload;
//# sourceMappingURL=stakingGrant.d.ts.map