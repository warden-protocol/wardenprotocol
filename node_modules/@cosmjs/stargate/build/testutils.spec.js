"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModifyingDirectSecp256k1HdWallet = exports.ModifyingSecp256k1HdWallet = exports.tendermintIdMatcher = exports.nonNegativeIntegerMatcher = exports.nonExistentAddress = exports.validator = exports.unused = exports.faucet = exports.defaultSigningClientOptions = exports.slowSimapp = exports.simapp = exports.defaultSendFee = exports.defaultGasPrice = exports.fromOneElementArray = exports.makeRandomAddress = exports.makeRandomAddressBytes = exports.pendingWithoutSlowSimapp = exports.slowSimappEnabled = exports.pendingWithoutSimapp = exports.pendingWithoutSimapp42 = exports.pendingWithoutSimapp44 = exports.simappEnabled = exports.simapp44Enabled = exports.simapp42Enabled = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
const tx_1 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const fee_1 = require("./fee");
function simapp42Enabled() {
    return !!process.env.SIMAPP42_ENABLED;
}
exports.simapp42Enabled = simapp42Enabled;
function simapp44Enabled() {
    return !!process.env.SIMAPP44_ENABLED;
}
exports.simapp44Enabled = simapp44Enabled;
function simappEnabled() {
    return simapp42Enabled() || simapp44Enabled();
}
exports.simappEnabled = simappEnabled;
function pendingWithoutSimapp44() {
    if (!simapp44Enabled()) {
        return pending("Set SIMAPP44_ENABLED to enable Simapp based tests");
    }
}
exports.pendingWithoutSimapp44 = pendingWithoutSimapp44;
function pendingWithoutSimapp42() {
    if (!simapp42Enabled()) {
        return pending("Set SIMAPP42_ENABLED to enable Simapp based tests");
    }
}
exports.pendingWithoutSimapp42 = pendingWithoutSimapp42;
function pendingWithoutSimapp() {
    if (!simappEnabled()) {
        return pending("Set SIMAPP42_ENABLED or SIMAPP44_ENABLED to enable Simapp based tests");
    }
}
exports.pendingWithoutSimapp = pendingWithoutSimapp;
function slowSimappEnabled() {
    return !!process.env.SLOW_SIMAPP42_ENABLED || !!process.env.SLOW_SIMAPP44_ENABLED;
}
exports.slowSimappEnabled = slowSimappEnabled;
function pendingWithoutSlowSimapp() {
    if (!slowSimappEnabled()) {
        return pending("Set SLOW_SIMAPP42_ENABLED or SLOW_SIMAPP44_ENABLED to enable slow Simapp based tests");
    }
}
exports.pendingWithoutSlowSimapp = pendingWithoutSlowSimapp;
function makeRandomAddressBytes() {
    return crypto_1.Random.getBytes(20);
}
exports.makeRandomAddressBytes = makeRandomAddressBytes;
function makeRandomAddress() {
    return (0, encoding_1.toBech32)("cosmos", makeRandomAddressBytes());
}
exports.makeRandomAddress = makeRandomAddress;
/** Returns first element. Throws if array has a different length than 1. */
function fromOneElementArray(elements) {
    if (elements.length !== 1)
        throw new Error(`Expected exactly one element but got ${elements.length}`);
    return elements[0];
}
exports.fromOneElementArray = fromOneElementArray;
exports.defaultGasPrice = fee_1.GasPrice.fromString("0.025ucosm");
exports.defaultSendFee = (0, fee_1.calculateFee)(100000, exports.defaultGasPrice);
exports.simapp = {
    tendermintUrl: "localhost:26658",
    tendermintUrlWs: "ws://localhost:26658",
    tendermintUrlHttp: "http://localhost:26658",
    chainId: "simd-testing",
    denomStaking: "ustake",
    denomFee: "ucosm",
    blockTime: 1000,
    totalSupply: 21000000000,
    govMinDeposit: (0, proto_signing_1.coins)(10000000, "ustake"),
};
exports.slowSimapp = {
    tendermintUrl: "localhost:26660",
    tendermintUrlWs: "ws://localhost:26660",
    tendermintUrlHttp: "http://localhost:26660",
    chainId: "simd-testing",
    denomStaking: "ustake",
    denomFee: "ucosm",
    blockTime: 10000,
    totalSupply: 21000000000, // ucosm
};
/** Setting to speed up testing */
exports.defaultSigningClientOptions = {
    broadcastPollIntervalMs: 300,
    broadcastTimeoutMs: 8000,
    gasPrice: fee_1.GasPrice.fromString("0.01ucosm"),
};
exports.faucet = {
    mnemonic: "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
    pubkey0: {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
    },
    pubkey1: {
        type: "tendermint/PubKeySecp256k1",
        value: "AiDosfIbBi54XJ1QjCeApumcy/FjdtF+YhywPf3DKTx7",
    },
    pubkey2: {
        type: "tendermint/PubKeySecp256k1",
        value: "AzQg33JZqH7vSsm09esZY5bZvmzYwE/SY78cA0iLxpD7",
    },
    pubkey3: {
        type: "tendermint/PubKeySecp256k1",
        value: "A3gOAlB6aiRTCPvWMQg2+ZbGYNsLd8qlvV28m8p2UhY2",
    },
    pubkey4: {
        type: "tendermint/PubKeySecp256k1",
        value: "Aum2063ub/ErUnIUB36sK55LktGUStgcbSiaAnL1wadu",
    },
    address0: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
    address1: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
    address2: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
    address3: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx",
    address4: "cosmos1hsm76p4ahyhl5yh3ve9ur49r5kemhp2r0dcjvx",
};
/** Unused account */
exports.unused = {
    pubkey: {
        type: "tendermint/PubKeySecp256k1",
        value: "ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ",
    },
    address: "cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u",
    accountNumber: 16,
    sequence: 0,
    balanceStaking: "2000000000",
    balanceFee: "1000000000", // 1000 COSM
};
exports.validator = {
    /**
     * From first gentx's auth_info.signer_infos in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].auth_info.signer_infos[0].public_key" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    pubkey: {
        type: "tendermint/PubKeySecp256k1",
        value: "AtDcuH4cX1eaxZrJ5shheLG3tXPAoV4awoIZmNQtQxmf",
    },
    /**
     * delegator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].body.messages[0].delegator_address" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    delegatorAddress: "cosmos1urk9gy7cfws0ak9x5nu7lx4un9n6gqkry79679",
    /**
     * validator_address from /cosmos.staking.v1beta1.MsgCreateValidator in scripts/simapp42/template/.simapp/config/genesis.json
     *
     * ```
     * jq ".app_state.genutil.gen_txs[0].body.messages[0].validator_address" scripts/simapp42/template/.simapp/config/genesis.json
     * ```
     */
    validatorAddress: "cosmosvaloper1urk9gy7cfws0ak9x5nu7lx4un9n6gqkrp230jk",
    accountNumber: 0,
    sequence: 1,
};
exports.nonExistentAddress = "cosmos1p79apjaufyphcmsn4g07cynqf0wyjuezqu84hd";
exports.nonNegativeIntegerMatcher = /^[0-9]+$/;
exports.tendermintIdMatcher = /^[0-9A-F]{64}$/;
/**
 * A class for testing clients using an Amino signer which modifies the transaction it receives before signing
 */
class ModifyingSecp256k1HdWallet extends amino_1.Secp256k1HdWallet {
    static async fromMnemonic(mnemonic, options = {}) {
        const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
        const seed = await crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
        return new ModifyingSecp256k1HdWallet(mnemonicChecked, { ...options, seed: seed });
    }
    async signAmino(signerAddress, signDoc) {
        const modifiedSignDoc = {
            ...signDoc,
            fee: {
                amount: (0, proto_signing_1.coins)(3000, "ucosm"),
                gas: "333333",
            },
            memo: "This was modified",
        };
        return super.signAmino(signerAddress, modifiedSignDoc);
    }
}
exports.ModifyingSecp256k1HdWallet = ModifyingSecp256k1HdWallet;
/**
 * A class for testing clients using a direct signer which modifies the transaction it receives before signing
 */
class ModifyingDirectSecp256k1HdWallet extends proto_signing_1.DirectSecp256k1HdWallet {
    static async fromMnemonic(mnemonic, options = {}) {
        const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic);
        const seed = await crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, options.bip39Password);
        return new ModifyingDirectSecp256k1HdWallet(mnemonicChecked, { ...options, seed: seed });
    }
    async signDirect(address, signDoc) {
        const txBody = tx_1.TxBody.decode(signDoc.bodyBytes);
        const modifiedTxBody = tx_1.TxBody.fromPartial({
            ...txBody,
            memo: "This was modified",
        });
        const authInfo = tx_1.AuthInfo.decode(signDoc.authInfoBytes);
        const signers = authInfo.signerInfos.map((signerInfo) => ({
            pubkey: signerInfo.publicKey,
            sequence: signerInfo.sequence.toNumber(),
        }));
        const modifiedFeeAmount = (0, proto_signing_1.coins)(3000, "ucosm");
        const modifiedGasLimit = 333333;
        const modifiedSignDoc = {
            ...signDoc,
            bodyBytes: Uint8Array.from(tx_1.TxBody.encode(modifiedTxBody).finish()),
            authInfoBytes: (0, proto_signing_1.makeAuthInfoBytes)(signers, modifiedFeeAmount, modifiedGasLimit, signing_1.SignMode.SIGN_MODE_DIRECT),
        };
        return super.signDirect(address, modifiedSignDoc);
    }
}
exports.ModifyingDirectSecp256k1HdWallet = ModifyingDirectSecp256k1HdWallet;
//# sourceMappingURL=testutils.spec.js.map