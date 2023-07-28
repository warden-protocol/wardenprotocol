import { Chain, Fee, Sender, TxPayload } from './common.js';
export interface TxContext {
    chain: Chain;
    sender: Sender;
    fee: Fee;
    memo: string;
}
export interface EIP712TypedData {
    types: object;
    message: object | object[];
}
export declare const createTransactionPayload: (context: TxContext, typedData: EIP712TypedData, cosmosMessage: any) => TxPayload;
//# sourceMappingURL=base.d.ts.map