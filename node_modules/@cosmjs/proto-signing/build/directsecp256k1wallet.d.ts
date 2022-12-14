import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { AccountData, DirectSignResponse, OfflineDirectSigner } from "./signer";
/**
 * A wallet that holds a single secp256k1 keypair.
 *
 * If you want to work with BIP39 mnemonics and multiple accounts, use DirectSecp256k1HdWallet.
 */
export declare class DirectSecp256k1Wallet implements OfflineDirectSigner {
    /**
     * Creates a DirectSecp256k1Wallet from the given private key
     *
     * @param privkey The private key.
     * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
     */
    static fromKey(privkey: Uint8Array, prefix?: string): Promise<DirectSecp256k1Wallet>;
    private readonly pubkey;
    private readonly privkey;
    private readonly prefix;
    private constructor();
    private get address();
    getAccounts(): Promise<readonly AccountData[]>;
    signDirect(address: string, signDoc: SignDoc): Promise<DirectSignResponse>;
}
