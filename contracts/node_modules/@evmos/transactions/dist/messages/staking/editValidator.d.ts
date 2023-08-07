import { TxContext } from '../base.js';
export interface MsgEditValidatorParams {
    moniker: string | undefined;
    identity: string | undefined;
    website: string | undefined;
    securityContact: string | undefined;
    details: string | undefined;
    validatorAddress: string | undefined;
    commissionRate: string | undefined;
    minSelfDelegation: string | undefined;
}
export declare const createTxMsgEditValidator: (context: TxContext, params: MsgEditValidatorParams) => import("../common.js").TxPayload;
//# sourceMappingURL=editValidator.d.ts.map