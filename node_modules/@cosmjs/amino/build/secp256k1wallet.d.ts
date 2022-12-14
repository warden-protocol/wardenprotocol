import { StdSignDoc } from "./signdoc";
import { AccountData, AminoSignResponse, OfflineAminoSigner } from "./signer";
/**
 * A wallet that holds a single secp256k1 keypair.
 *
 * If you want to work with BIP39 mnemonics and multiple accounts, use Secp256k1HdWallet.
 */
export declare class Secp256k1Wallet implements OfflineAminoSigner {
    /**
     * Creates a Secp256k1Wallet from the given private key
     *
     * @param privkey The private key.
     * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
     */
    static fromKey(privkey: Uint8Array, prefix?: string): Promise<Secp256k1Wallet>;
    private readonly pubkey;
    private readonly privkey;
    private readonly prefix;
    private constructor();
    private get address();
    getAccounts(): Promise<readonly AccountData[]>;
    signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse>;
}
