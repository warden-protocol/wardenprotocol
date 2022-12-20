"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectSecp256k1Wallet = void 0;
const amino_1 = require("@cosmjs/amino");
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const signing_1 = require("./signing");
/**
 * A wallet that holds a single secp256k1 keypair.
 *
 * If you want to work with BIP39 mnemonics and multiple accounts, use DirectSecp256k1HdWallet.
 */
class DirectSecp256k1Wallet {
    constructor(privkey, pubkey, prefix) {
        this.privkey = privkey;
        this.pubkey = pubkey;
        this.prefix = prefix;
    }
    /**
     * Creates a DirectSecp256k1Wallet from the given private key
     *
     * @param privkey The private key.
     * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
     */
    static async fromKey(privkey, prefix = "cosmos") {
        const uncompressed = (await crypto_1.Secp256k1.makeKeypair(privkey)).pubkey;
        return new DirectSecp256k1Wallet(privkey, crypto_1.Secp256k1.compressPubkey(uncompressed), prefix);
    }
    get address() {
        return (0, encoding_1.toBech32)(this.prefix, (0, amino_1.rawSecp256k1PubkeyToRawAddress)(this.pubkey));
    }
    async getAccounts() {
        return [
            {
                algo: "secp256k1",
                address: this.address,
                pubkey: this.pubkey,
            },
        ];
    }
    async signDirect(address, signDoc) {
        const signBytes = (0, signing_1.makeSignBytes)(signDoc);
        if (address !== this.address) {
            throw new Error(`Address ${address} not found in wallet`);
        }
        const hashedMessage = (0, crypto_1.sha256)(signBytes);
        const signature = await crypto_1.Secp256k1.createSignature(hashedMessage, this.privkey);
        const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
        const stdSignature = (0, amino_1.encodeSecp256k1Signature)(this.pubkey, signatureBytes);
        return {
            signed: signDoc,
            signature: stdSignature,
        };
    }
}
exports.DirectSecp256k1Wallet = DirectSecp256k1Wallet;
//# sourceMappingURL=directsecp256k1wallet.js.map