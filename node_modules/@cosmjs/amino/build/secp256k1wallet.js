"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secp256k1Wallet = void 0;
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const addresses_1 = require("./addresses");
const signature_1 = require("./signature");
const signdoc_1 = require("./signdoc");
/**
 * A wallet that holds a single secp256k1 keypair.
 *
 * If you want to work with BIP39 mnemonics and multiple accounts, use Secp256k1HdWallet.
 */
class Secp256k1Wallet {
    constructor(privkey, pubkey, prefix) {
        this.privkey = privkey;
        this.pubkey = pubkey;
        this.prefix = prefix;
    }
    /**
     * Creates a Secp256k1Wallet from the given private key
     *
     * @param privkey The private key.
     * @param prefix The bech32 address prefix (human readable part). Defaults to "cosmos".
     */
    static async fromKey(privkey, prefix = "cosmos") {
        const uncompressed = (await crypto_1.Secp256k1.makeKeypair(privkey)).pubkey;
        return new Secp256k1Wallet(privkey, crypto_1.Secp256k1.compressPubkey(uncompressed), prefix);
    }
    get address() {
        return (0, encoding_1.toBech32)(this.prefix, (0, addresses_1.rawSecp256k1PubkeyToRawAddress)(this.pubkey));
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
    async signAmino(signerAddress, signDoc) {
        if (signerAddress !== this.address) {
            throw new Error(`Address ${signerAddress} not found in wallet`);
        }
        const message = new crypto_1.Sha256((0, signdoc_1.serializeSignDoc)(signDoc)).digest();
        const signature = await crypto_1.Secp256k1.createSignature(message, this.privkey);
        const signatureBytes = new Uint8Array([...signature.r(32), ...signature.s(32)]);
        return {
            signed: signDoc,
            signature: (0, signature_1.encodeSecp256k1Signature)(this.pubkey, signatureBytes),
        };
    }
}
exports.Secp256k1Wallet = Secp256k1Wallet;
//# sourceMappingURL=secp256k1wallet.js.map