import { EnglishMnemonic, HdPath } from "@cosmjs/crypto";
import { StdSignDoc } from "./signdoc";
import { AccountData, AminoSignResponse, OfflineAminoSigner } from "./signer";
import { EncryptionConfiguration, KdfConfiguration } from "./wallet";
/**
 * This interface describes a JSON object holding the encrypted wallet and the meta data.
 * All fields in here must be JSON types.
 */
export interface Secp256k1HdWalletSerialization {
    /** A format+version identifier for this serialization format */
    readonly type: string;
    /** Information about the key derivation function (i.e. password to encryption key) */
    readonly kdf: KdfConfiguration;
    /** Information about the symmetric encryption */
    readonly encryption: EncryptionConfiguration;
    /** An instance of Secp256k1HdWalletData, which is stringified, encrypted and base64 encoded. */
    readonly data: string;
}
export declare function extractKdfConfiguration(serialization: string): KdfConfiguration;
export interface Secp256k1HdWalletOptions {
    /** The password to use when deriving a BIP39 seed from a mnemonic. */
    readonly bip39Password: string;
    /** The BIP-32/SLIP-10 derivation paths. Defaults to the Cosmos Hub/ATOM path `m/44'/118'/0'/0/0`. */
    readonly hdPaths: readonly HdPath[];
    /** The bech32 address prefix (human readable part). Defaults to "cosmos". */
    readonly prefix: string;
}
interface Secp256k1HdWalletConstructorOptions extends Partial<Secp256k1HdWalletOptions> {
    readonly seed: Uint8Array;
}
export declare class Secp256k1HdWallet implements OfflineAminoSigner {
    /**
     * Restores a wallet from the given BIP39 mnemonic.
     *
     * @param mnemonic Any valid English mnemonic.
     * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
     */
    static fromMnemonic(mnemonic: string, options?: Partial<Secp256k1HdWalletOptions>): Promise<Secp256k1HdWallet>;
    /**
     * Generates a new wallet with a BIP39 mnemonic of the given length.
     *
     * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
     * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
     */
    static generate(length?: 12 | 15 | 18 | 21 | 24, options?: Partial<Secp256k1HdWalletOptions>): Promise<Secp256k1HdWallet>;
    /**
     * Restores a wallet from an encrypted serialization.
     *
     * @param password The user provided password used to generate an encryption key via a KDF.
     *                 This is not normalized internally (see "Unicode normalization" to learn more).
     */
    static deserialize(serialization: string, password: string): Promise<Secp256k1HdWallet>;
    /**
     * Restores a wallet from an encrypted serialization.
     *
     * This is an advanced alternative to calling `deserialize(serialization, password)` directly, which allows
     * you to offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
     *
     * The caller is responsible for ensuring the key was derived with the given KDF configuration. This can be
     * done using `extractKdfConfiguration(serialization)` and `executeKdf(password, kdfConfiguration)` from this package.
     */
    static deserializeWithEncryptionKey(serialization: string, encryptionKey: Uint8Array): Promise<Secp256k1HdWallet>;
    private static deserializeTypeV1;
    /** Base secret */
    private readonly secret;
    /** BIP39 seed */
    private readonly seed;
    /** Derivation instruction */
    private readonly accounts;
    protected constructor(mnemonic: EnglishMnemonic, options: Secp256k1HdWalletConstructorOptions);
    get mnemonic(): string;
    getAccounts(): Promise<readonly AccountData[]>;
    signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse>;
    /**
     * Generates an encrypted serialization of this wallet.
     *
     * @param password The user provided password used to generate an encryption key via a KDF.
     *                 This is not normalized internally (see "Unicode normalization" to learn more).
     */
    serialize(password: string): Promise<string>;
    /**
     * Generates an encrypted serialization of this wallet.
     *
     * This is an advanced alternative to calling `serialize(password)` directly, which allows you to
     * offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
     *
     * The caller is responsible for ensuring the key was derived with the given KDF options. If this
     * is not the case, the wallet cannot be restored with the original password.
     */
    serializeWithEncryptionKey(encryptionKey: Uint8Array, kdfConfiguration: KdfConfiguration): Promise<string>;
    private getKeyPair;
    private getAccountsWithPrivkeys;
}
export {};
