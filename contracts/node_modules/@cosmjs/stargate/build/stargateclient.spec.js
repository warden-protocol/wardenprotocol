"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const utils_1 = require("@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const readonly_date_1 = require("readonly-date");
const stargateclient_1 = require("./stargateclient");
const testutils_spec_1 = require("./testutils.spec");
const resultFailure = {
    code: 5,
    height: 219901,
    rawLog: "failed to execute message; message index: 0: 1855527000ufct is smaller than 20000000000000000000000ufct: insufficient funds",
    transactionHash: "FDC4FB701AABD465935F7D04AE490D1EF5F2BD4B227601C4E98B57EB077D9B7D",
    gasUsed: 54396,
    gasWanted: 200000,
};
const resultSuccess = {
    code: 0,
    height: 219894,
    rawLog: '[{"events":[{"type":"message","attributes":[{"key":"action","value":"send"},{"key":"sender","value":"firma1trqyle9m2nvyafc2n25frkpwed2504y6avgfzr"},{"key":"module","value":"bank"}]},{"type":"transfer","attributes":[{"key":"recipient","value":"firma12er8ls2sf5zess3jgjxz59xat9xtf8hz0hk6n4"},{"key":"sender","value":"firma1trqyle9m2nvyafc2n25frkpwed2504y6avgfzr"},{"key":"amount","value":"2000000ufct"}]}]}]',
    transactionHash: "C0B416CA868C55C2B8C1BBB8F3CFA233854F13A5CB15D3E9599F50CAF7B3D161",
    gasUsed: 61556,
    gasWanted: 200000,
};
describe("isDeliverTxFailure", () => {
    it("works", () => {
        expect((0, stargateclient_1.isDeliverTxFailure)(resultFailure)).toEqual(true);
        expect((0, stargateclient_1.isDeliverTxFailure)(resultSuccess)).toEqual(false);
    });
});
describe("isDeliverTxSuccess", () => {
    it("works", () => {
        expect((0, stargateclient_1.isDeliverTxSuccess)(resultFailure)).toEqual(false);
        expect((0, stargateclient_1.isDeliverTxSuccess)(resultSuccess)).toEqual(true);
    });
});
describe("StargateClient", () => {
    describe("connect", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            expect(client).toBeTruthy();
            client.disconnect();
        });
    });
    describe("getChainId", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            expect(await client.getChainId()).toEqual(testutils_spec_1.simapp.chainId);
            client.disconnect();
        });
        it("caches chain ID", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const openedClient = client;
            const getCodeSpy = spyOn(openedClient.tmClient, "status").and.callThrough();
            expect(await client.getChainId()).toEqual(testutils_spec_1.simapp.chainId); // from network
            expect(await client.getChainId()).toEqual(testutils_spec_1.simapp.chainId); // from cache
            expect(getCodeSpy).toHaveBeenCalledTimes(1);
            client.disconnect();
        });
    });
    describe("getHeight", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const height1 = await client.getHeight();
            expect(height1).toBeGreaterThan(0);
            await (0, utils_1.sleep)(testutils_spec_1.simapp.blockTime * 1.4); // tolerate chain being 40% slower than expected
            const height2 = await client.getHeight();
            expect(height2).toBeGreaterThanOrEqual(height1 + 1);
            expect(height2).toBeLessThanOrEqual(height1 + 2);
            client.disconnect();
        });
    });
    describe("getAccount", () => {
        it("works for unused account", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const account = await client.getAccount(testutils_spec_1.unused.address);
            (0, utils_1.assert)(account);
            expect(account).toEqual({
                address: testutils_spec_1.unused.address,
                pubkey: null,
                accountNumber: testutils_spec_1.unused.accountNumber,
                sequence: testutils_spec_1.unused.sequence,
            });
            client.disconnect();
        });
        it("works for account with pubkey and non-zero sequence", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const account = await client.getAccount(testutils_spec_1.validator.delegatorAddress);
            (0, utils_1.assert)(account);
            expect(account).toEqual({
                address: testutils_spec_1.validator.delegatorAddress,
                pubkey: testutils_spec_1.validator.pubkey,
                accountNumber: testutils_spec_1.validator.accountNumber,
                sequence: testutils_spec_1.validator.sequence,
            });
            client.disconnect();
        });
        it("returns null for non-existent address", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const account = await client.getAccount(testutils_spec_1.nonExistentAddress);
            expect(account).toBeNull();
            client.disconnect();
        });
    });
    describe("getSequence", () => {
        it("works for unused account", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const account = await client.getSequence(testutils_spec_1.unused.address);
            (0, utils_1.assert)(account);
            expect(account).toEqual({
                accountNumber: testutils_spec_1.unused.accountNumber,
                sequence: testutils_spec_1.unused.sequence,
            });
            client.disconnect();
        });
        it("rejects for non-existent address", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            await expectAsync(client.getSequence(testutils_spec_1.nonExistentAddress)).toBeRejectedWithError(/account does not exist on chain/i);
            client.disconnect();
        });
    });
    describe("getBlock", () => {
        it("works for latest block", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.getBlock();
            expect(response).toEqual(jasmine.objectContaining({
                id: jasmine.stringMatching(testutils_spec_1.tendermintIdMatcher),
                header: jasmine.objectContaining({
                    chainId: await client.getChainId(),
                }),
                txs: jasmine.arrayContaining([]),
            }));
            expect(response.header.height).toBeGreaterThanOrEqual(1);
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeLessThan(readonly_date_1.ReadonlyDate.now());
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(readonly_date_1.ReadonlyDate.now() - 5000);
            client.disconnect();
        });
        it("works for block by height", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const height = (await client.getBlock()).header.height;
            const response = await client.getBlock(height - 1);
            expect(response).toEqual(jasmine.objectContaining({
                id: jasmine.stringMatching(testutils_spec_1.tendermintIdMatcher),
                header: jasmine.objectContaining({
                    height: height - 1,
                    chainId: await client.getChainId(),
                }),
                txs: jasmine.arrayContaining([]),
            }));
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeLessThan(readonly_date_1.ReadonlyDate.now());
            expect(new readonly_date_1.ReadonlyDate(response.header.time).getTime()).toBeGreaterThanOrEqual(readonly_date_1.ReadonlyDate.now() - 5000);
            client.disconnect();
        });
    });
    describe("getBalance", () => {
        it("works for different existing balances", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const response1 = await client.getBalance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomFee);
            expect(response1).toEqual({
                amount: testutils_spec_1.unused.balanceFee,
                denom: testutils_spec_1.simapp.denomFee,
            });
            const response2 = await client.getBalance(testutils_spec_1.unused.address, testutils_spec_1.simapp.denomStaking);
            expect(response2).toEqual({
                amount: testutils_spec_1.unused.balanceStaking,
                denom: testutils_spec_1.simapp.denomStaking,
            });
            client.disconnect();
        });
        it("returns 0 for non-existent balance", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.getBalance(testutils_spec_1.unused.address, "gintonic");
            expect(response).toEqual({
                denom: "gintonic",
                amount: "0",
            });
            client.disconnect();
        });
        it("returns 0 for non-existent address", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.getBalance(testutils_spec_1.nonExistentAddress, testutils_spec_1.simapp.denomFee);
            expect(response).toEqual({
                denom: testutils_spec_1.simapp.denomFee,
                amount: "0",
            });
            client.disconnect();
        });
    });
    describe("getAllBalances", () => {
        it("returns all balances for unused account", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const balances = await client.getAllBalances(testutils_spec_1.unused.address);
            expect(balances).toEqual([
                {
                    amount: testutils_spec_1.unused.balanceFee,
                    denom: testutils_spec_1.simapp.denomFee,
                },
                {
                    amount: testutils_spec_1.unused.balanceStaking,
                    denom: testutils_spec_1.simapp.denomStaking,
                },
            ]);
            client.disconnect();
        });
        it("returns an empty list for non-existent account", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const balances = await client.getAllBalances(testutils_spec_1.nonExistentAddress);
            expect(balances).toEqual([]);
            client.disconnect();
        });
    });
    describe("getBalanceStaked", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const response = await client.getBalanceStaked(testutils_spec_1.faucet.address0);
            expect(response).toEqual({ denom: "ustake", amount: "63474" });
            client.disconnect();
        });
    });
    describe("broadcastTx", () => {
        it("broadcasts a transaction", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
            const pubkey = (0, proto_signing_1.encodePubkey)({
                type: "tendermint/PubKeySecp256k1",
                value: (0, encoding_1.toBase64)(pubkeyBytes),
            });
            const registry = new proto_signing_1.Registry();
            const txBodyFields = {
                typeUrl: "/cosmos.tx.v1beta1.TxBody",
                value: {
                    messages: [
                        {
                            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                            value: {
                                fromAddress: address,
                                toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                                amount: [
                                    {
                                        denom: "ucosm",
                                        amount: "1234567",
                                    },
                                ],
                            },
                        },
                    ],
                },
            };
            const txBodyBytes = registry.encode(txBodyFields);
            const { accountNumber, sequence } = (await client.getSequence(address));
            const feeAmount = (0, proto_signing_1.coins)(2000, "ucosm");
            const gasLimit = 200000;
            const authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence }], feeAmount, gasLimit);
            const chainId = await client.getChainId();
            const signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
            const { signature } = await wallet.signDirect(address, signDoc);
            const txRaw = tx_1.TxRaw.fromPartial({
                bodyBytes: txBodyBytes,
                authInfoBytes: authInfoBytes,
                signatures: [(0, encoding_1.fromBase64)(signature.signature)],
            });
            const txRawBytes = Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish());
            const txResult = await client.broadcastTx(txRawBytes);
            (0, stargateclient_1.assertIsDeliverTxSuccess)(txResult);
            const { gasUsed, rawLog, transactionHash } = txResult;
            expect(gasUsed).toBeGreaterThan(0);
            expect(rawLog).toMatch(/{"key":"amount","value":"1234567ucosm"}/);
            expect(transactionHash).toMatch(/^[0-9A-F]{64}$/);
            client.disconnect();
        });
        it("errors immediately for a CheckTx failure", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.simapp.tendermintUrl);
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
            const pubkey = (0, proto_signing_1.encodePubkey)({
                type: "tendermint/PubKeySecp256k1",
                value: (0, encoding_1.toBase64)(pubkeyBytes),
            });
            const registry = new proto_signing_1.Registry();
            const invalidRecipientAddress = "tgrade1z363ulwcrxged4z5jswyt5dn5v3lzsemwz9ewj"; // wrong bech32 prefix
            const txBodyFields = {
                typeUrl: "/cosmos.tx.v1beta1.TxBody",
                value: {
                    messages: [
                        {
                            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                            value: {
                                fromAddress: address,
                                toAddress: invalidRecipientAddress,
                                amount: [
                                    {
                                        denom: "ucosm",
                                        amount: "1234567",
                                    },
                                ],
                            },
                        },
                    ],
                },
            };
            const txBodyBytes = registry.encode(txBodyFields);
            const { accountNumber, sequence } = (await client.getSequence(address));
            const feeAmount = (0, proto_signing_1.coins)(2000, "ucosm");
            const gasLimit = 200000;
            const authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence }], feeAmount, gasLimit, sequence);
            const chainId = await client.getChainId();
            const signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
            const { signature } = await wallet.signDirect(address, signDoc);
            const txRaw = tx_1.TxRaw.fromPartial({
                bodyBytes: txBodyBytes,
                authInfoBytes: authInfoBytes,
                signatures: [(0, encoding_1.fromBase64)(signature.signature)],
            });
            const txRawBytes = Uint8Array.from(tx_1.TxRaw.encode(txRaw).finish());
            await expectAsync(client.broadcastTx(txRawBytes)).toBeRejectedWithError(/invalid recipient address/i);
            client.disconnect();
        });
        it("respects user timeouts rather than RPC timeouts", async () => {
            (0, testutils_spec_1.pendingWithoutSlowSimapp)();
            const client = await stargateclient_1.StargateClient.connect(testutils_spec_1.slowSimapp.tendermintUrl);
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const [{ address, pubkey: pubkeyBytes }] = await wallet.getAccounts();
            const pubkey = (0, proto_signing_1.encodePubkey)({
                type: "tendermint/PubKeySecp256k1",
                value: (0, encoding_1.toBase64)(pubkeyBytes),
            });
            const registry = new proto_signing_1.Registry();
            const txBodyFields = {
                typeUrl: "/cosmos.tx.v1beta1.TxBody",
                value: {
                    messages: [
                        {
                            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                            value: {
                                fromAddress: address,
                                toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                                amount: [
                                    {
                                        denom: "ucosm",
                                        amount: "1234567",
                                    },
                                ],
                            },
                        },
                    ],
                },
            };
            const txBodyBytes = registry.encode(txBodyFields);
            const chainId = await client.getChainId();
            const feeAmount = (0, proto_signing_1.coins)(2000, "ucosm");
            const gasLimit = 200000;
            const { accountNumber: accountNumber1, sequence: sequence1 } = (await client.getSequence(address));
            const authInfoBytes1 = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence: sequence1 }], feeAmount, gasLimit);
            const signDoc1 = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes1, chainId, accountNumber1);
            const { signature: signature1 } = await wallet.signDirect(address, signDoc1);
            const txRaw1 = tx_1.TxRaw.fromPartial({
                bodyBytes: txBodyBytes,
                authInfoBytes: authInfoBytes1,
                signatures: [(0, encoding_1.fromBase64)(signature1.signature)],
            });
            const txRawBytes1 = Uint8Array.from(tx_1.TxRaw.encode(txRaw1).finish());
            const largeTimeoutMs = 30000;
            const txResult = await client.broadcastTx(txRawBytes1, largeTimeoutMs);
            (0, stargateclient_1.assertIsDeliverTxSuccess)(txResult);
            const { accountNumber: accountNumber2, sequence: sequence2 } = (await client.getSequence(address));
            const authInfoBytes2 = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence: sequence2 }], feeAmount, gasLimit);
            const signDoc2 = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes2, chainId, accountNumber2);
            const { signature: signature2 } = await wallet.signDirect(address, signDoc2);
            const txRaw2 = tx_1.TxRaw.fromPartial({
                bodyBytes: txBodyBytes,
                authInfoBytes: authInfoBytes2,
                signatures: [(0, encoding_1.fromBase64)(signature2.signature)],
            });
            const txRawBytes2 = Uint8Array.from(tx_1.TxRaw.encode(txRaw2).finish());
            const smallTimeoutMs = 1000;
            await expectAsync(client.broadcastTx(txRawBytes2, smallTimeoutMs)).toBeRejectedWithError(stargateclient_1.TimeoutError, /transaction with id .+ was submitted but was not yet found on the chain/i);
            client.disconnect();
        }, 30000);
    });
});
//# sourceMappingURL=stargateclient.spec.js.map