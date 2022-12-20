"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention,no-bitwise */
const amino_1 = require("@cosmjs/amino");
const proto_signing_1 = require("@cosmjs/proto-signing");
const utils_1 = require("@cosmjs/utils");
const tx_1 = require("cosmjs-types/cosmos/bank/v1beta1/tx");
const coin_1 = require("cosmjs-types/cosmos/base/v1beta1/coin");
const tx_2 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
const tx_3 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
const aminotypes_1 = require("./aminotypes");
const signingstargateclient_1 = require("./signingstargateclient");
const stargateclient_1 = require("./stargateclient");
const testutils_spec_1 = require("./testutils.spec");
describe("SigningStargateClient", () => {
    describe("constructor", () => {
        it("can be constructed with custom registry", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const registry = new proto_signing_1.Registry();
            registry.register("/custom.MsgCustom", tx_1.MsgSend);
            const options = { ...testutils_spec_1.defaultSigningClientOptions, registry: registry };
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, options);
            const openedClient = client;
            expect(openedClient.registry.lookupType("/custom.MsgCustom")).toEqual(tx_1.MsgSend);
        });
    });
    describe("simulate", () => {
        it("works", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const msg = tx_2.MsgDelegate.fromPartial({
                delegatorAddress: testutils_spec_1.faucet.address0,
                validatorAddress: testutils_spec_1.validator.validatorAddress,
                amount: (0, proto_signing_1.coin)(1234, "ustake"),
            });
            const msgAny = {
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg,
            };
            const memo = "Use your power wisely";
            const gasUsed = await client.simulate(testutils_spec_1.faucet.address0, [msgAny], memo);
            expect(gasUsed).toBeGreaterThanOrEqual(101000);
            expect(gasUsed).toBeLessThanOrEqual(150000);
            client.disconnect();
        });
    });
    describe("sendTokens", () => {
        it("works with direct signer", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const amount = (0, proto_signing_1.coins)(7890, "ucosm");
            const beneficiaryAddress = (0, testutils_spec_1.makeRandomAddress)();
            const memo = "for dinner";
            // no tokens here
            const before = await client.getBalance(beneficiaryAddress, "ucosm");
            expect(before).toEqual({
                denom: "ucosm",
                amount: "0",
            });
            // send
            const result = await client.sendTokens(testutils_spec_1.faucet.address0, beneficiaryAddress, amount, testutils_spec_1.defaultSendFee, memo);
            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            expect(result.rawLog).toBeTruthy();
            // got tokens
            const after = await client.getBalance(beneficiaryAddress, "ucosm");
            expect(after).toEqual(amount[0]);
        });
        it("works with legacy Amino signer", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp)();
            const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const amount = (0, proto_signing_1.coins)(7890, "ucosm");
            const beneficiaryAddress = (0, testutils_spec_1.makeRandomAddress)();
            const memo = "for dinner";
            // no tokens here
            const before = await client.getBalance(beneficiaryAddress, "ucosm");
            expect(before).toEqual({
                denom: "ucosm",
                amount: "0",
            });
            // send
            const result = await client.sendTokens(testutils_spec_1.faucet.address0, beneficiaryAddress, amount, testutils_spec_1.defaultSendFee, memo);
            (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            expect(result.rawLog).toBeTruthy();
            // got tokens
            const after = await client.getBalance(beneficiaryAddress, "ucosm");
            expect(after).toEqual(amount[0]);
        });
    });
    describe("sendIbcTokens", () => {
        it("works with direct signing", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp42)();
            const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const memo = "Cross-chain fun";
            const fee = {
                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                gas: "180000", // 180k
            };
            // both timeouts set
            {
                const result = await client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", { revisionHeight: long_1.default.fromNumber(123), revisionNumber: long_1.default.fromNumber(456) }, Math.floor(Date.now() / 1000) + 60, fee, memo);
                // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
            }
            // no height timeout
            {
                const result = await client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", undefined, Math.floor(Date.now() / 1000) + 60, fee, memo);
                // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
            }
        });
        it("works with Amino signing", async () => {
            (0, testutils_spec_1.pendingWithoutSimapp42)();
            const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
            const memo = "Cross-chain fun";
            const fee = {
                amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                gas: "180000", // 180k
            };
            // both timeouts set
            {
                const result = await client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", { revisionHeight: long_1.default.fromNumber(123), revisionNumber: long_1.default.fromNumber(456) }, Math.floor(Date.now() / 1000) + 60, fee, memo);
                // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
            }
            // no height timeout
            {
                const result = await client.sendIbcTokens(testutils_spec_1.faucet.address0, testutils_spec_1.faucet.address1, (0, proto_signing_1.coin)(1234, "ucosm"), "fooPort", "fooChannel", undefined, Math.floor(Date.now() / 1000) + 60, fee, memo);
                // CheckTx must pass but the execution must fail in DeliverTx due to invalid channel/port
                expect((0, stargateclient_1.isDeliverTxFailure)(result)).toEqual(true);
            }
        });
    });
    describe("signAndBroadcast", () => {
        describe("direct mode", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                expect(result.code).toEqual(0);
                expect(result.gasWanted).toEqual(180000);
                expect(result.gasUsed).toBeLessThanOrEqual(180000);
                expect(result.gasUsed).toBeGreaterThan(100000);
            });
            it("returns DeliverTxFailure on DeliverTx failure", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msg = tx_1.MsgSend.fromPartial({
                    fromAddress: testutils_spec_1.faucet.address0,
                    toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                    amount: (0, proto_signing_1.coins)(Number.MAX_SAFE_INTEGER, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "99000",
                };
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee);
                (0, stargateclient_1.assertIsDeliverTxFailure)(result);
                expect(result.code).toBeGreaterThan(0);
                expect(result.gasWanted).toEqual(99000);
                expect(result.gasUsed).toBeLessThanOrEqual(99000);
                expect(result.gasUsed).toBeGreaterThan(40000);
            });
            it("works with auto gas", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, {
                    ...testutils_spec_1.defaultSigningClientOptions,
                    gasPrice: testutils_spec_1.defaultGasPrice,
                });
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], "auto");
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with a modifying signer", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await testutils_spec_1.ModifyingDirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                await (0, utils_1.sleep)(1000);
                const searchResult = await client.getTx(result.transactionHash);
                (0, utils_1.assert)(searchResult, "Must find transaction");
                const tx = (0, proto_signing_1.decodeTxRaw)(searchResult.tx);
                // From ModifyingDirectSecp256k1HdWallet
                expect(tx.body.memo).toEqual("This was modified");
                expect({ ...tx.authInfo.fee.amount[0] }).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                expect(tx.authInfo.fee.gasLimit.toNumber()).toEqual(333333);
            });
        });
        describe("legacy Amino mode", () => {
            it("works with bank MsgSend", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msgSend = {
                    fromAddress: testutils_spec_1.faucet.address0,
                    toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                    amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: msgSend,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with staking MsgDelegate", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msgDelegate = {
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msgDelegate,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ustake"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with a custom registry and custom message", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const customRegistry = new proto_signing_1.Registry();
                const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                const baseCustomMsgDelegate = {
                    customDelegatorAddress: "",
                    customValidatorAddress: "",
                };
                const CustomMsgDelegate = {
                    // Adapted from autogenerated MsgDelegate implementation
                    encode(message, writer = minimal_1.default.Writer.create()) {
                        var _a, _b;
                        writer.uint32(10).string((_a = message.customDelegatorAddress) !== null && _a !== void 0 ? _a : "");
                        writer.uint32(18).string((_b = message.customValidatorAddress) !== null && _b !== void 0 ? _b : "");
                        if (message.customAmount !== undefined && message.customAmount !== undefined) {
                            coin_1.Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
                        }
                        return writer;
                    },
                    decode() {
                        throw new Error("decode method should not be required");
                    },
                    fromJSON() {
                        throw new Error("fromJSON method should not be required");
                    },
                    fromPartial(object) {
                        const message = { ...baseCustomMsgDelegate };
                        if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
                            message.customDelegatorAddress = object.customDelegatorAddress;
                        }
                        else {
                            message.customDelegatorAddress = "";
                        }
                        if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
                            message.customValidatorAddress = object.customValidatorAddress;
                        }
                        else {
                            message.customValidatorAddress = "";
                        }
                        if (object.customAmount !== undefined && object.customAmount !== null) {
                            message.customAmount = coin_1.Coin.fromPartial(object.customAmount);
                        }
                        else {
                            message.customAmount = undefined;
                        }
                        return message;
                    },
                    toJSON() {
                        throw new Error("toJSON method should not be required");
                    },
                };
                customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
                const customAminoTypes = new aminotypes_1.AminoTypes({
                    "/cosmos.staking.v1beta1.MsgDelegate": {
                        aminoType: "cosmos-sdk/MsgDelegate",
                        toAmino: ({ customDelegatorAddress, customValidatorAddress, customAmount, }) => {
                            (0, utils_1.assert)(customDelegatorAddress, "missing customDelegatorAddress");
                            (0, utils_1.assert)(customValidatorAddress, "missing validatorAddress");
                            (0, utils_1.assert)(customAmount, "missing amount");
                            return {
                                delegator_address: customDelegatorAddress,
                                validator_address: customValidatorAddress,
                                amount: {
                                    amount: customAmount.amount,
                                    denom: customAmount.denom,
                                },
                            };
                        },
                        fromAmino: ({ delegator_address, validator_address, amount, }) => ({
                            customDelegatorAddress: delegator_address,
                            customValidatorAddress: validator_address,
                            customAmount: coin_1.Coin.fromPartial(amount),
                        }),
                    },
                });
                const options = {
                    ...testutils_spec_1.defaultSigningClientOptions,
                    registry: customRegistry,
                    aminoTypes: customAminoTypes,
                };
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, options);
                const msg = {
                    customDelegatorAddress: testutils_spec_1.faucet.address0,
                    customValidatorAddress: testutils_spec_1.validator.validatorAddress,
                    customAmount: (0, proto_signing_1.coin)(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with a modifying signer", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await testutils_spec_1.ModifyingSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msg = {
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const result = await client.signAndBroadcast(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
                await (0, utils_1.sleep)(1000);
                const searchResult = await client.getTx(result.transactionHash);
                (0, utils_1.assert)(searchResult, "Must find transaction");
                const tx = (0, proto_signing_1.decodeTxRaw)(searchResult.tx);
                // From ModifyingSecp256k1HdWallet
                expect(tx.body.memo).toEqual("This was modified");
                expect({ ...tx.authInfo.fee.amount[0] }).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                expect(tx.authInfo.fee.gasLimit.toNumber()).toEqual(333333);
            });
        });
    });
    describe("sign", () => {
        describe("direct mode", () => {
            it("works", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await proto_signing_1.DirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with a modifying signer", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await testutils_spec_1.ModifyingDirectSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msg = tx_2.MsgDelegate.fromPartial({
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                });
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "180000", // 180k
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                const body = tx_3.TxBody.decode(signed.bodyBytes);
                const authInfo = tx_3.AuthInfo.decode(signed.authInfoBytes);
                // From ModifyingDirectSecp256k1HdWallet
                expect(body.memo).toEqual("This was modified");
                expect({ ...authInfo.fee.amount[0] }).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                expect(authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
        });
        describe("legacy Amino mode", () => {
            it("works with bank MsgSend", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msgSend = {
                    fromAddress: testutils_spec_1.faucet.address0,
                    toAddress: (0, testutils_spec_1.makeRandomAddress)(),
                    amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                    value: msgSend,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const signed = await client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with staking MsgDelegate", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msgDelegate = {
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msgDelegate,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ustake"),
                    gas: "200000",
                };
                const memo = "Use your tokens wisely";
                const signed = await client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with a custom registry and custom message", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const customRegistry = new proto_signing_1.Registry();
                const msgDelegateTypeUrl = "/cosmos.staking.v1beta1.MsgDelegate";
                const baseCustomMsgDelegate = {
                    customDelegatorAddress: "",
                    customValidatorAddress: "",
                };
                const CustomMsgDelegate = {
                    // Adapted from autogenerated MsgDelegate implementation
                    encode(message, writer = minimal_1.default.Writer.create()) {
                        var _a, _b;
                        writer.uint32(10).string((_a = message.customDelegatorAddress) !== null && _a !== void 0 ? _a : "");
                        writer.uint32(18).string((_b = message.customValidatorAddress) !== null && _b !== void 0 ? _b : "");
                        if (message.customAmount !== undefined && message.customAmount !== undefined) {
                            coin_1.Coin.encode(message.customAmount, writer.uint32(26).fork()).ldelim();
                        }
                        return writer;
                    },
                    decode() {
                        throw new Error("decode method should not be required");
                    },
                    fromJSON() {
                        throw new Error("fromJSON method should not be required");
                    },
                    fromPartial(object) {
                        const message = { ...baseCustomMsgDelegate };
                        if (object.customDelegatorAddress !== undefined && object.customDelegatorAddress !== null) {
                            message.customDelegatorAddress = object.customDelegatorAddress;
                        }
                        else {
                            message.customDelegatorAddress = "";
                        }
                        if (object.customValidatorAddress !== undefined && object.customValidatorAddress !== null) {
                            message.customValidatorAddress = object.customValidatorAddress;
                        }
                        else {
                            message.customValidatorAddress = "";
                        }
                        if (object.customAmount !== undefined && object.customAmount !== null) {
                            message.customAmount = coin_1.Coin.fromPartial(object.customAmount);
                        }
                        else {
                            message.customAmount = undefined;
                        }
                        return message;
                    },
                    toJSON() {
                        throw new Error("toJSON method should not be required");
                    },
                };
                customRegistry.register(msgDelegateTypeUrl, CustomMsgDelegate);
                const customAminoTypes = new aminotypes_1.AminoTypes({
                    "/cosmos.staking.v1beta1.MsgDelegate": {
                        aminoType: "cosmos-sdk/MsgDelegate",
                        toAmino: ({ customDelegatorAddress, customValidatorAddress, customAmount, }) => {
                            (0, utils_1.assert)(customDelegatorAddress, "missing customDelegatorAddress");
                            (0, utils_1.assert)(customValidatorAddress, "missing validatorAddress");
                            (0, utils_1.assert)(customAmount, "missing amount");
                            return {
                                delegator_address: customDelegatorAddress,
                                validator_address: customValidatorAddress,
                                amount: {
                                    amount: customAmount.amount,
                                    denom: customAmount.denom,
                                },
                            };
                        },
                        fromAmino: ({ delegator_address, validator_address, amount, }) => ({
                            customDelegatorAddress: delegator_address,
                            customValidatorAddress: validator_address,
                            customAmount: coin_1.Coin.fromPartial(amount),
                        }),
                    },
                });
                const options = {
                    ...testutils_spec_1.defaultSigningClientOptions,
                    registry: customRegistry,
                    aminoTypes: customAminoTypes,
                };
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, options);
                const msg = {
                    customDelegatorAddress: testutils_spec_1.faucet.address0,
                    customValidatorAddress: testutils_spec_1.validator.validatorAddress,
                    customAmount: (0, proto_signing_1.coin)(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
            it("works with a modifying signer", async () => {
                (0, testutils_spec_1.pendingWithoutSimapp)();
                const wallet = await testutils_spec_1.ModifyingSecp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
                const client = await signingstargateclient_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.tendermintUrl, wallet, testutils_spec_1.defaultSigningClientOptions);
                const msg = {
                    delegatorAddress: testutils_spec_1.faucet.address0,
                    validatorAddress: testutils_spec_1.validator.validatorAddress,
                    amount: (0, proto_signing_1.coin)(1234, "ustake"),
                };
                const msgAny = {
                    typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                    value: msg,
                };
                const fee = {
                    amount: (0, proto_signing_1.coins)(2000, "ucosm"),
                    gas: "200000",
                };
                const memo = "Use your power wisely";
                const signed = await client.sign(testutils_spec_1.faucet.address0, [msgAny], fee, memo);
                const body = tx_3.TxBody.decode(signed.bodyBytes);
                const authInfo = tx_3.AuthInfo.decode(signed.authInfoBytes);
                // From ModifyingSecp256k1HdWallet
                expect(body.memo).toEqual("This was modified");
                expect({ ...authInfo.fee.amount[0] }).toEqual((0, proto_signing_1.coin)(3000, "ucosm"));
                expect(authInfo.fee.gasLimit.toNumber()).toEqual(333333);
                // ensure signature is valid
                const result = await client.broadcastTx(Uint8Array.from(tx_3.TxRaw.encode(signed).finish()));
                (0, stargateclient_1.assertIsDeliverTxSuccess)(result);
            });
        });
    });
});
//# sourceMappingURL=signingstargateclient.spec.js.map