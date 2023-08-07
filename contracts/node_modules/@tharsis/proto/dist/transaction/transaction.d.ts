import * as tx from '../proto/cosmos/tx/v1beta1/tx';
import * as signing from '../proto/cosmos/tx/signing/v1beta1/signing';
export declare const SIGN_DIRECT = signing.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT;
export declare const LEGACY_AMINO = signing.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
export declare namespace protoTxNamespace {
    export import txn = tx.cosmos.tx.v1beta1;
}
export declare function createBodyWithMultipleMessages(messages: any[], memo: string): tx.cosmos.tx.v1beta1.TxBody;
export declare function createBody(message: any, memo: string): tx.cosmos.tx.v1beta1.TxBody;
export declare function createFee(fee: string, denom: string, gasLimit: number): tx.cosmos.tx.v1beta1.Fee;
export declare function createSignerInfo(algo: string, publicKey: Uint8Array, sequence: number, mode: number): tx.cosmos.tx.v1beta1.SignerInfo;
export declare function createAuthInfo(signerInfo: tx.cosmos.tx.v1beta1.SignerInfo, fee: tx.cosmos.tx.v1beta1.Fee): tx.cosmos.tx.v1beta1.AuthInfo;
export declare function createSigDoc(bodyBytes: Uint8Array, authInfoBytes: Uint8Array, chainId: string, accountNumber: number): tx.cosmos.tx.v1beta1.SignDoc;
export declare function createTransactionWithMultipleMessages(messages: any, memo: string, fee: string, denom: string, gasLimit: number, algo: string, pubKey: string, sequence: number, accountNumber: number, chainId: string): {
    legacyAmino: {
        body: tx.cosmos.tx.v1beta1.TxBody;
        authInfo: tx.cosmos.tx.v1beta1.AuthInfo;
        signBytes: string;
    };
    signDirect: {
        body: tx.cosmos.tx.v1beta1.TxBody;
        authInfo: tx.cosmos.tx.v1beta1.AuthInfo;
        signBytes: string;
    };
};
export declare function createTransaction(message: any, memo: string, fee: string, denom: string, gasLimit: number, algo: string, pubKey: string, sequence: number, accountNumber: number, chainId: string): {
    legacyAmino: {
        body: tx.cosmos.tx.v1beta1.TxBody;
        authInfo: tx.cosmos.tx.v1beta1.AuthInfo;
        signBytes: string;
    };
    signDirect: {
        body: tx.cosmos.tx.v1beta1.TxBody;
        authInfo: tx.cosmos.tx.v1beta1.AuthInfo;
        signBytes: string;
    };
};
//# sourceMappingURL=transaction.d.ts.map