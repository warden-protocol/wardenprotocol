/** @see https://rgxdb.com/r/1NUN74O6 */
export declare const base64Matcher: RegExp;
export declare const faucet: {
    mnemonic: string;
    pubkey: {
        type: string;
        value: string;
    };
    address: string;
};
/** See TEST_VECTORS.md for how those are generated */
export declare const testVectors: {
    inputs: {
        accountNumber: number;
        sequence: number;
        bodyBytes: string;
        authInfoBytes: string;
    };
    outputs: {
        signBytes: string;
        signature: string;
        signedTxBytes: string;
    };
}[];
