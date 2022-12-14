"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amino_1 = require("@cosmjs/amino");
const proto_signing_1 = require("@cosmjs/proto-signing");
const utils_1 = require("@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const multisignature_1 = require("./multisignature");
const signingstargateclient_1 = require("./signingstargateclient");
const stargateclient_1 = require("./stargateclient");
const testutils_spec_1 = require("./testutils.spec");
describe("multisignature", () => {
    describe("makeCompactBitArray", () => {
        it("works for 0 bits of different lengths", () => {
            expect((0, multisignature_1.makeCompactBitArray)([])).toEqual({ elems: new Uint8Array([]), extraBitsStored: 0 });
            expect((0, multisignature_1.makeCompactBitArray)([false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 1,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 3,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 4,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 5,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 6,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 7,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000000]),
                extraBitsStored: 0,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000000, 0b00000000]),
                extraBitsStored: 1,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, false, false])).toEqual({ elems: new Uint8Array([0b00000000, 0b00000000]), extraBitsStored: 2 });
        });
        it("works for 1 bits of different lengths", () => {
            expect((0, multisignature_1.makeCompactBitArray)([])).toEqual({ elems: new Uint8Array([]), extraBitsStored: 0 });
            expect((0, multisignature_1.makeCompactBitArray)([true])).toEqual({
                elems: new Uint8Array([0b10000000]),
                extraBitsStored: 1,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true])).toEqual({
                elems: new Uint8Array([0b11000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true])).toEqual({
                elems: new Uint8Array([0b11100000]),
                extraBitsStored: 3,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true])).toEqual({
                elems: new Uint8Array([0b11110000]),
                extraBitsStored: 4,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true])).toEqual({
                elems: new Uint8Array([0b11111000]),
                extraBitsStored: 5,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([0b11111100]),
                extraBitsStored: 6,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([0b11111110]),
                extraBitsStored: 7,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([0b11111111]),
                extraBitsStored: 0,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([0b11111111, 0b10000000]),
                extraBitsStored: 1,
            });
            expect((0, multisignature_1.makeCompactBitArray)([true, true, true, true, true, true, true, true, true, true])).toEqual({
                elems: new Uint8Array([0b11111111, 0b11000000]),
                extraBitsStored: 2,
            });
        });
        it("works for 1 bit in different places", () => {
            expect((0, multisignature_1.makeCompactBitArray)([true, false, false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b10000000, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, true, false, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b01000000, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, true, false, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00100000, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, true, false, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00010000, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, true, false, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00001000, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, true, false, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000100, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, true, false, false, false])).toEqual({
                elems: new Uint8Array([0b00000010, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, true, false, false])).toEqual({
                elems: new Uint8Array([0b00000001, 0b00000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, true, false])).toEqual({
                elems: new Uint8Array([0b00000000, 0b10000000]),
                extraBitsStored: 2,
            });
            expect((0, multisignature_1.makeCompactBitArray)([false, false, false, false, false, false, false, false, false, true])).toEqual({
                elems: new Uint8Array([0b00000000, 0b01000000]),
                extraBitsStored: 2,
            });
        });
    });
    describe("makeMultisignedTx", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const multisigAccountAddress = "cosmos1h90ml36rcu7yegwduzgzderj2jmq49hcpfclw9";
            // On the composer's machine signing instructions are created.
            // The composer does not need to be one of the signers.
            const signingInstruction = await (async () => {
                const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
                const accountOnChain = await client.getAccount(multisigAccountAddress);
                (0, utils_1.assert)(accountOnChain, "Account does not exist on chain");
                const msgSend = {
                    fromAddress: multisigAccountAddress,
                    toAddress: "cosmos19rvl6ja9h0erq9dc2xxfdzypc739ej8k5esnhg",
                    amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                };
                const msg = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: msgSend,
                };
                const gasLimit = 200000;
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: gasLimit.toString(),
                };
                return {
                    accountNumber: accountOnChain.accountNumber,
                    sequence: accountOnChain.sequence,
                    chainId: await client.getChainId(),
                    msgs: [msg],
                    fee: fee,
                    memo: "Use your tokens wisely",
                };
            })();
            const [[pubkey0, signature0, bodyBytes], [pubkey1, signature1], [pubkey2, signature2], [pubkey3, signature3], [pubkey4, signature4],] = await Promise.all([0, 1, 2, 3, 4].map(async (i) => {
                // Signing environment
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic, {
                    hdPaths: [(0, amino_1.makeCosmoshubPath)(i)],
                });
                const pubkey = (0, amino_1.encodeSecp256k1Pubkey)((await wallet.getAccounts())[0].pubkey);
                const address = (await wallet.getAccounts())[0].address;
                const signingClient = await signingstargateclient_1.SigningStargateClient.offline(wallet);
                const signerData = {
                    accountNumber: signingInstruction.accountNumber,
                    sequence: signingInstruction.sequence,
                    chainId: signingInstruction.chainId,
                };
                const { bodyBytes: bb, signatures } = await signingClient.sign(address, signingInstruction.msgs, signingInstruction.fee, signingInstruction.memo, signerData);
                return [pubkey, signatures[0], bb];
            }));
            // From here on, no private keys are required anymore. Any anonymous entity
            // can collect, assemble and broadcast.
            {
                const multisigPubkey = (0, amino_1.createMultisigThresholdPubkey)([pubkey0, pubkey1, pubkey2, pubkey3, pubkey4], 2);
                expect((0, amino_1.pubkeyToAddress)(multisigPubkey, "cosmos")).toEqual(multisigAccountAddress);
                const address0 = (0, amino_1.pubkeyToAddress)(pubkey0, "cosmos");
                const address1 = (0, amino_1.pubkeyToAddress)(pubkey1, "cosmos");
                const address2 = (0, amino_1.pubkeyToAddress)(pubkey2, "cosmos");
                const address3 = (0, amino_1.pubkeyToAddress)(pubkey3, "cosmos");
                const address4 = (0, amino_1.pubkeyToAddress)(pubkey4, "cosmos");
                const broadcaster = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
                const signedTx = (0, multisignature_1.makeMultisignedTx)(multisigPubkey, signingInstruction.sequence, signingInstruction.fee, bodyBytes, new Map([
                    [address0, signature0],
                    [address1, signature1],
                    [address2, signature2],
                    [address3, signature3],
                    [address4, signature4],
                ]));
                // ensure signature is valid
                const result = await broadcaster.broadcastTx(Uint8Array.from(tx_1.TxRaw.encode(signedTx).finish()));
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            }
        });
    });
});
//# sourceMappingURL=multisignature.spec.js.map