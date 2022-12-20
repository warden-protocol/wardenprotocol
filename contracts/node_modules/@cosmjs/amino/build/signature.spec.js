"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const signature_1 = require("./signature");
describe("signature", () => {
    describe("encodeSecp256k1Signature", () => {
        it("encodes a full signature", () => {
            const pubkey = (0, encoding_1.fromBase64)("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
            const signature = (0, encoding_1.fromBase64)("1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==");
            expect((0, signature_1.encodeSecp256k1Signature)(pubkey, signature)).toEqual({
                pub_key: {
                    type: "tendermint/PubKeySecp256k1",
                    value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
                },
                signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
            });
        });
        it("throws when getting uncompressed public keys", () => {
            const pubkey = (0, encoding_1.fromBase64)("BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=");
            const signature = (0, encoding_1.fromBase64)("1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==");
            expect(() => (0, signature_1.encodeSecp256k1Signature)(pubkey, signature)).toThrowError(/public key must be compressed secp256k1/i);
        });
        it("throws if signature contains recovery byte", () => {
            const pubkey = (0, encoding_1.fromBase64)("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
            const signature = Uint8Array.from([
                ...(0, encoding_1.fromBase64)("1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ=="),
                99,
            ]);
            expect(() => (0, signature_1.encodeSecp256k1Signature)(pubkey, signature)).toThrowError(/signature must be 64 bytes long/i);
        });
    });
    describe("decodeSignature", () => {
        it("works for secp256k1", () => {
            const signature = {
                pub_key: {
                    type: "tendermint/PubKeySecp256k1",
                    value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
                },
                signature: "1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ==",
            };
            expect((0, signature_1.decodeSignature)(signature)).toEqual({
                pubkey: (0, encoding_1.fromBase64)("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP"),
                signature: (0, encoding_1.fromBase64)("1nUcIH0CLT0/nQ0mBTDrT6kMG20NY/PsH7P2gc4bpYNGLEYjBmdWevXUJouSE/9A/60QG9cYeqyTe5kFDeIPxQ=="),
            });
        });
    });
});
//# sourceMappingURL=signature.spec.js.map