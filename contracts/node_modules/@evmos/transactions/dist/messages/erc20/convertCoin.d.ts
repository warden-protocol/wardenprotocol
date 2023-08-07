import { TxContext } from '../base.js';
export interface MsgConvertCoinParams {
    denom: string;
    amount: string;
    receiverHex: string;
    senderBech32: string;
}
export declare const createTxMsgConvertCoin: (context: TxContext, params: MsgConvertCoinParams) => import("../common.js").TxPayload;
//# sourceMappingURL=convertCoin.d.ts.map