import { MsgDelegateParams } from './delegate.js';
import { TxContext } from '../base.js';
export interface MultipleMsgDelegateParams {
    values: MsgDelegateParams[];
}
export declare const createTxMultipleMsgDelegate: (context: TxContext, params: MultipleMsgDelegateParams) => import("../common.js").TxPayload;
//# sourceMappingURL=multipleDelegate.d.ts.map