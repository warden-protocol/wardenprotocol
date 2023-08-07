import { TxContext } from '../base.js';
export interface MsgConvertERC20Params {
    contractAddress: string;
    amount: string;
    receiverBech32: string;
    senderHex: string;
}
export declare const createTxMsgConvertERC20: (context: TxContext, params: MsgConvertERC20Params) => import("../common.js").TxPayload;
//# sourceMappingURL=convertERC20.d.ts.map