import { AminoSignResponse, Secp256k1HdWallet, Secp256k1HdWalletOptions, StdSignDoc } from "@cosmjs/amino";
import { DirectSecp256k1HdWallet, DirectSecp256k1HdWalletOptions, DirectSignResponse } from "@cosmjs/proto-signing";
import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { GasPrice } from "./fee";
import { SigningStargateClientOptions } from "./signingstargateclient";
export declare function simapp42Enabled(): boolean;
export declare function simapp44Enabled(): boolean;
export declare function simappEnabled(): boolean;
export declare function pendingWithoutSimapp44(): void;
export declare function pendingWithoutSimapp42(): void;
export declare function pendingWithoutSimapp(): void;
export declare function slowSimappEnabled(): boolean;
export declare function pendingWithoutSlowSimapp(): void;
export declare function makeRandomAddressBytes(): Uint8Array;
export declare function makeRandomAddress(): string;
/** Returns first element. Throws if array has a different length than 1. */
export declare function fromOneElementArray<T>(elements: ArrayLike<T>): T;
export declare const defaultGasPrice: GasPrice;
export declare const defaultSendFee: import("@cosmjs/amino").StdFee;
export declare const simapp: {
    tendermintUrl: string;
    tendermintUrlWs: string;
    tendermintUrlHttp: string;
    chainId: string;
    denomStaking: string;
    denomFee: string;
    blockTime: number;
    totalSupply: number;
    govMinDeposit: import("@cosmjs/amino").Coin[];
};
export declare const slowSimapp: {
    tendermintUrl: string;
    tendermintUrlWs: string;
    tendermintUrlHttp: string;
    chainId: string;
    denomStaking: string;
    denomFee: string;
    blockTime: number;
    totalSupply: number;
};
/** Setting to speed up testing */
export declare const defaultSigningClientOptions: SigningStargateClientOptions;
export declare const faucet: {
    mnemonic: string;
    pubkey0: {
        type: string;
        value: string;
    };
    pubkey1: {
        type: string;
        value: string;
    };
    pubkey2: {
        type: string;
        value: string;
    };
    pubkey3: {
        type: string;
        value: string;
    };
    pubkey4: {
        type: string;
        value: string;
    };
    address0: string;
    address1: string;
    address2: string;
    address3: string;
    address4: string;
};
/** Unused account */
export declare const unused: {
    pubkey: {
        type: string;
        value: string;
    };
    address: string;
    accountNumber: number;
    sequence: number;
    balanceStaking: string;
    balanceFee: string;
};
export declare const validator: {
    /**
     * From first gentx's auth_info.signer_infos in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].auth_info.signer_infos[0].public_key" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    pubkey: {
        type: string;
        value: string;
    };
    /**
     * delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].body.messages[0].delegator_address" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    delegatorAddress: string;
    /**
     * validator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].body.messages[0].validator_address" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    validatorAddress: string;
    accountNumber: number;
    sequence: number;
};
export declare const nonExistentAddress = "cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd";
export declare const nonNegativeIntegerMatcher: RegExp;
export declare const tendermintIdMatcher: RegExp;
/**
 * A class for testing clients using an Amino signer which modifies the transaction it receives before signing
 */
export declare class ModifyingSecp256k1HdWallet extends Secp256k1HdWallet {
    static fromMnemonic(mnemonic: string, options?: Partial<Secp256k1HdWalletOptions>): Promise<ModifyingSecp256k1HdWallet>;
    signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse>;
}
/**
 * A class for testing clients using a direct signer which modifies the transaction it receives before signing
 */
export declare class ModifyingDirectSecp256k1HdWallet extends DirectSecp256k1HdWallet {
    static fromMnemonic(mnemonic: string, options?: Partial<DirectSecp256k1HdWalletOptions>): Promise<DirectSecp256k1HdWallet>;
    signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse>;
}
