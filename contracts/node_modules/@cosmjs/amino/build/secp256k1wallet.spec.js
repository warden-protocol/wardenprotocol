"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const secp256k1wallet_1 = require("./secp256k1wallet");
const signdoc_1 = require("./signdoc");
describe("Secp256k1Wallet", () => {
    const defaultPrivkey = (0, encoding_1.fromHex)("b8c462d2bb0c1a92edf44f735021f16c270f28ee2c3d1cb49943a5e70a3c763e");
    const defaultAddress = "cosmos1kxt5x5q2l57ma2d434pqpafxdm0mgeg9c8cvtx";
    const defaultPubkey = (0, encoding_1.fromHex)("03f146c27639179e5b67b8646108f48e1a78b146c74939e34afaa5414ad5c93f8a");
    describe("fromKey", () => {
        it("works", async () => {
            const signer = await secp256k1wallet_1.Secp256k1Wallet.fromKey(defaultPrivkey);
            expect(signer).toBeTruthy();
        });
    });
    describe("getAccounts", () => {
        it("resolves to a list of accounts", async () => {
            const signer = await secp256k1wallet_1.Secp256k1Wallet.fromKey(defaultPrivkey);
            const accounts = await signer.getAccounts();
            expect(accounts.length).toEqual(1);
            expect(accounts[0]).toEqual({
                address: defaultAddress,
                algo: "secp256k1",
                pubkey: defaultPubkey,
            });
        });
    });
    describe("signAmino", () => {
        it("resolves to valid signature", async () => {
            const signer = await secp256k1wallet_1.Secp256k1Wallet.fromKey(defaultPrivkey);
            const signDoc = {
                msgs: [],
                fee: { amount: [], gas: "23" },
                chain_id: "foochain",
                memo: "hello, world",
                account_number: "7",
                sequence: "54",
            };
            const { signed, signature } = await signer.signAmino(defaultAddress, signDoc);
            expect(signed).toEqual(signDoc);
            const valid = await crypto_1.Secp256k1.verifySignature(crypto_1.Secp256k1Signature.fromFixedLength((0, encoding_1.fromBase64)(signature.signature)), new crypto_1.Sha256((0, signdoc_1.serializeSignDoc)(signed)).digest(), defaultPubkey);
            expect(valid).toEqual(true);
        });
    });
});
//# sourceMappingURL=secp256k1wallet.spec.js.map