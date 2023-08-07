import { TxContext } from '../base.js';
export interface MsgGenericAuthorizationParams {
    granteeAddress: string;
    typeUrl: string;
    expires: number;
}
export declare const createTxMsgGenericGrant: (context: TxContext, params: MsgGenericAuthorizationParams) => import("../common.js").TxPayload;
//# sourceMappingURL=genericGrant.d.ts.map