"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1HdWallet = exports.extractKdfConfiguration = void 0;
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const utils_1 = require("@cosmjs/utils");
const addresses_1 = require("./addresses");
const paths_1 = require("./paths");
const signature_1 = require("./signature");
const signdoc_1 = require("./signdoc");
const wallet_1 = require("./wallet");
const serializationTypeV1 = "secp256k1wallet-v1";
/**
 * A KDF configuration that is not very strong but can be used on the main thread.
 * It takes about 1 second in Node.js 16.0.0 and should have similar runtimes in other modern Wasm hosts.
 */
const basicPasswordHashingOptions = {
    algorithm: "argon2id",
    params: {
        outputLength: 32,
        opsLimit: 24,
        memLimitKib: 12 * 1024,
    },
};
function isDerivationJson(thing) {
    if (!(0, utils_1.isNonNullObject)(thing))
        return false;
    if (typeof thing.hdPath !== "string")
        return false;
    if (typeof thing.prefix !== "string")
        return false;
    return true;
}
function extractKdfConfigurationV1(doc) {
    return doc.kdf;
}
function extractKdfConfiguration(serialization) {
    const root = JSON.parse(serialization);
    if (!(0, utils_1.isNonNullObject)(root))
        throw new Error("Root document is not an object.");
    switch (root.type) {
        case serializationTypeV1:
            return extractKdfConfigurationV1(root);
        default:
            throw new Error("Unsupported serialization type");
    }
}
exports.extractKdfConfiguration = extractKdfConfiguration;
const defaultOptions = {
    bip39Password: "",
    hdPaths: [(0, paths_1.makeCosmoshubPath)(0)],
    prefix: "cosmos",
};
class Secp256k1HdWallet {
    constructor(mnemonic, options) {
        var _a, _b;
        const hdPaths = (_a = options.hdPaths) !== null && _a !== void 0 ? _a : defaultOptions.hdPaths;
        const prefix = (_b = options.prefix) !== null && _b !== void 0 ? _b : defaultOptions.prefix;
        this.secret = mnemonic;
        this.seed = options.seed;
        this.accounts = hdPaths.map((hdPath) => ({
            hdPath: hdPath,
            prefix,
        }));
    }
    /**
     * Restores a wallet from the given BIP39 mnemonic.
     *
     * @param mnemonic Any valid English mnemonic.
     * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
     */
    static async fromMnemonic(mnemonic, options = {}) {
        const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
        const seed = await crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
        return new Secp256k1HdWallet(mnemonicChecked, {
            ...options,
            seed: seed,
        });
    }
    /**
     * Generates a new wallet with a BIP39 mnemonic of the given length.
     *
     * @param length The number of words in the mnemonic (12, 15, 18, 21 or 24).
     * @param options An optional `Secp256k1HdWalletOptions` object optionally containing a bip39Password, hdPaths, and prefix.
     */
    static async generate(length = 12, options = {}) {
        const entropyLength = 4 * Math.floor((11 * length) / 33);
        const entropy = crypto_1.Random.getBytes(entropyLength);
        const mnemonic = crypto_1.Bip39.encode(entropy);
        return Secp256k1HdWallet.fromMnemonic(mnemonic.toString(), options);
    }
    /**
     * Restores a wallet from an encrypted serialization.
     *
     * @param password The user provided password used to generate an encryption key via a KDF.
     *                 This is not normalized internally (see "Unicode normalization" to learn more).
     */
    static async deserialize(serialization, password) {
        const root = JSON.parse(serialization);
        if (!(0, utils_1.isNonNullObject)(root))
            throw new Error("Root document is not an object.");
        switch (root.type) {
            case serializationTypeV1:
                return Secp256k1HdWallet.deserializeTypeV1(serialization, password);
            default:
                throw new Error("Unsupported serialization type");
        }
    }
    /**
     * Restores a wallet from an encrypted serialization.
     *
     * This is an advanced alternative to calling `deserialize(serialization, password)` directly, which allows
     * you to offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
     *
     * The caller is responsible for ensuring the key was derived with the given KDF configuration. This can be
     * done using `extractKdfConfiguration(serialization)` and `executeKdf(password, kdfConfiguration)` from this package.
     */
    static async deserializeWithEncryptionKey(serialization, encryptionKey) {
        const root = JSON.parse(serialization);
        if (!(0, utils_1.isNonNullObject)(root))
            throw new Error("Root document is not an object.");
        const untypedRoot = root;
        switch (untypedRoot.type) {
            case serializationTypeV1: {
                const decryptedBytes = await (0, wallet_1.decrypt)((0, encoding_1.fromBase64)(untypedRoot.data), encryptionKey, untypedRoot.encryption);
                const decryptedDocument = JSON.parse((0, encoding_1.fromUtf8)(decryptedBytes));
                const { mnemonic, accounts } = decryptedDocument;
                (0, utils_1.assert)(typeof mnemonic === "string");
                if (!Array.isArray(accounts))
                    throw new Error("Property 'accounts' is not an array");
                if (!accounts.every((account) => isDerivationJson(account))) {
                    throw new Error("Account is not in the correct format.");
                }
                const firstPrefix = accounts[0].prefix;
                if (!accounts.every(({ prefix }) => prefix === firstPrefix)) {
                    throw new Error("Accounts do not all have the same prefix");
                }
                const hdPaths = accounts.map(({ hdPath }) => (0, crypto_1.stringToPath)(hdPath));
                return Secp256k1HdWallet.fromMnemonic(mnemonic, {
                    hdPaths: hdPaths,
                    prefix: firstPrefix,
                });
            }
            default:
                throw new Error("Unsupported serialization type");
        }
    }
    static async deserializeTypeV1(serialization, password) {
        const root = JSON.parse(serialization);
        if (!(0, utils_1.isNonNullObject)(root))
            throw new Error("Root document is not an object.");
        const encryptionKey = await (0, wallet_1.executeKdf)(password, root.kdf);
        return Secp256k1HdWallet.deserializeWithEncryptionKey(serialization, encryptionKey);
    }
    get mnemonic() {
        return this.secret.toString();
    }
    async getAccounts() {
        const accountsWithPrivkeys = await this.getAccountsWithPrivkeys();
        return accountsWithPrivkeys.map(({ algo, pubkey, address }) => ({
            algo: algo,
            pubkey: pubkey,
            address: address,
        }));
    }
    async signAmino(signerAddress, signDoc) {
        const accounts = await this.getAccountsWithPrivkeys();
        const account = accounts.find(({ address }) => address === signerAddress);
        if (account === undefined) {
            throw new Error(`Address ${signerAddress} not found in wallet`);
        }
        const { privkey, pubkey } = account;
        const message = (0, crypto_1.sha256)((0, signdoc_1.serializeSignDoc)(signDoc));
        const signature = await crypto_1.Secp256k1.createSignature(message, privkey);
        const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
        return {
            signed: signDoc,
            signature: (0, signature_1.encodeSecp256k1Signature)(pubkey, signatureBytes),
        };
    }
    /**
     * Generates an encrypted serialization of this wallet.
     *
     * @param password The user provided password used to generate an encryption key via a KDF.
     *                 This is not normalized internally (see "Unicode normalization" to learn more).
     */
    async serialize(password) {
        const kdfConfiguration = basicPasswordHashingOptions;
        const encryptionKey = await (0, wallet_1.executeKdf)(password, kdfConfiguration);
        return this.serializeWithEncryptionKey(encryptionKey, kdfConfiguration);
    }
    /**
     * Generates an encrypted serialization of this wallet.
     *
     * This is an advanced alternative to calling `serialize(password)` directly, which allows you to
     * offload the KDF execution to a non-UI thread (e.g. in a WebWorker).
     *
     * The caller is responsible for ensuring the key was derived with the given KDF options. If this
     * is not the case, the wallet cannot be restored with the original password.
     */
    async serializeWithEncryptionKey(encryptionKey, kdfConfiguration) {
        const dataToEncrypt = {
            mnemonic: this.mnemonic,
            accounts: this.accounts.map(({ hdPath, prefix }) => ({
                hdPath: (0, crypto_1.pathToString)(hdPath),
                prefix: prefix,
            })),
        };
        const dataToEncryptRaw = (0, encoding_1.toUtf8)(JSON.stringify(dataToEncrypt));
        const encryptionConfiguration = {
            algorithm: wallet_1.supportedAlgorithms.xchacha20poly1305Ietf,
        };
        const encryptedData = await (0, wallet_1.encrypt)(dataToEncryptRaw, encryptionKey, encryptionConfiguration);
        const out = {
            type: serializationTypeV1,
            kdf: kdfConfiguration,
            encryption: encryptionConfiguration,
            data: (0, encoding_1.toBase64)(encryptedData),
        };
        return JSON.stringify(out);
    }
    async getKeyPair(hdPath) {
        const { privkey } = crypto_1.Slip10.derivePath(crypto_1.Slip10Curve.Secp256k1, this.seed, hdPath);
        const { pubkey } = await crypto_1.Secp256k1.makeKeypair(privkey);
        return {
            privkey: privkey,
            pubkey: crypto_1.Secp256k1.compressPubkey(pubkey),
        };
    }
    async getAccountsWithPrivkeys() {
        return Promise.all(this.accounts.map(async ({ hdPath, prefix }) => {
            const { privkey, pubkey } = await this.getKeyPair(hdPath);
            const address = (0, encoding_1.toBech32)(prefix, (0, addresses_1.rawSecp256k1PubkeyToRawAddress)(pubkey));
            return {
                algo: "secp256k1",
                privkey: privkey,
                pubkey: pubkey,
                address: address,
            };
        }));
    }
}
exports.Secp256k1HdWallet = Secp256k1HdWallet;
//# sourceMappingURL=secp256k1hdwallet.js.map