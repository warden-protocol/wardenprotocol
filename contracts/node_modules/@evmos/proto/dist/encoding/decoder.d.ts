import { PubKey } from '../proto/ethermint/crypto/keys.js';
export declare const decodeEthSecp256k1PubKey: (key: any) => PubKey;
export declare const decodeEthermintAccount: (account: any) => {
    address: string;
    pubkey: PubKey | null;
    accountNumber: number;
    sequence: number;
} | undefined;
//# sourceMappingURL=decoder.d.ts.map