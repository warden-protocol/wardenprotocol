import { TxContext } from '../base.js';
export interface MsgGenericRevokeParams {
    granteeAddress: string;
    typeUrl: string;
}
export declare const createTxMsgGenericRevoke: (context: TxContext, params: MsgGenericRevokeParams) => import("../common.js").TxPayload;
//# sourceMappingURL=genericRevoke.d.ts.map