import { TxBody, Fee, SignerInfo, AuthInfo, SignDoc } from '../proto/cosmos/transactions/tx.js';
import { SignMode } from '../proto/cosmos/transactions/signing.js';
export declare const SIGN_DIRECT = SignMode.DIRECT;
export declare const LEGACY_AMINO = SignMode.LEGACY_AMINO_JSON;
export declare function createBodyWithMultipleMessages(messages: any[], memo: string): TxBody;
export declare function createBody(message: any, memo: string): TxBody;
export declare function createFee(fee: string, denom: string, gasLimit: number): Fee;
export declare function createSignerInfo(algo: string, publicKey: Uint8Array, sequence: number, mode: number): SignerInfo;
export declare function createAuthInfo(signerInfo: SignerInfo, fee: Fee): AuthInfo;
export declare function createSigDoc(bodyBytes: Uint8Array, authInfoBytes: Uint8Array, chainId: string, accountNumber: number): SignDoc;
export declare function createTransactionWithMultipleMessages(messages: any, memo: string, fee: string, denom: string, gasLimit: number, algo: string, pubKey: string, sequence: number, accountNumber: number, chainId: string): {
    legacyAmino: {
        body: TxBody;
        authInfo: AuthInfo;
        signBytes: string;
    };
    signDirect: {
        body: TxBody;
        authInfo: AuthInfo;
        signBytes: string;
    };
};
export declare function createTransaction(message: any, memo: string, fee: string, denom: string, gasLimit: number, algo: string, pubKey: string, sequence: number, accountNumber: number, chainId: string): {
    legacyAmino: {
        body: TxBody;
        authInfo: AuthInfo;
        signBytes: string;
    };
    signDirect: {
        body: TxBody;
        authInfo: AuthInfo;
        signBytes: string;
    };
};
//# sourceMappingURL=transaction.d.ts.map