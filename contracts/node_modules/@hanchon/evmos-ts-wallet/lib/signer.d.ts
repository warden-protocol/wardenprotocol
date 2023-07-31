import { Wallet } from '@ethersproject/wallet';
import { TxGenerated, Chain } from '@tharsis/transactions';
export declare const LOCALNET_CHAIN: {
    chainId: number;
    cosmosChainId: string;
};
export declare const LOCALNET_FEE: {
    amount: string;
    denom: string;
    gas: string;
};
export declare const MAINNET_CHAIN: {
    chainId: number;
    cosmosChainId: string;
};
export declare const MAINNET_FEE: {
    amount: string;
    denom: string;
    gas: string;
};
export declare const TESTNET_CHAIN: {
    chainId: number;
    cosmosChainId: string;
};
export declare const TESTNET_FEE: {
    amount: string;
    denom: string;
    gas: string;
};
export declare function generatePubkey(wallet: Wallet): Promise<string>;
export declare function getSender(wallet: Wallet, url?: string): Promise<{
    accountAddress: string;
    sequence: number;
    accountNumber: number;
    pubkey: string;
}>;
export declare function broadcast(transactionBody: string, url?: string): Promise<any>;
export declare function signTransaction(wallet: Wallet, tx: TxGenerated, broadcastMode?: string): Promise<string>;
export declare function signTransactionUsingEIP712(wallet: Wallet, sender: string, tx: TxGenerated, chain?: Chain, broadcastMode?: string): Promise<string>;
