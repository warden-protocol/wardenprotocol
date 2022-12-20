"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SigningStargateClient = exports.defaultRegistryTypes = void 0;
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const proto_signing_1 = require("@cosmjs/proto-signing");
const tendermint_rpc_1 = require("@cosmjs/tendermint-rpc");
const utils_1 = require("@cosmjs/utils");
const coin_1 = require("cosmjs-types/cosmos/base/v1beta1/coin");
const tx_1 = require("cosmjs-types/cosmos/distribution/v1beta1/tx");
const tx_2 = require("cosmjs-types/cosmos/staking/v1beta1/tx");
const signing_1 = require("cosmjs-types/cosmos/tx/signing/v1beta1/signing");
const tx_3 = require("cosmjs-types/cosmos/tx/v1beta1/tx");
const tx_4 = require("cosmjs-types/ibc/applications/transfer/v1/tx");
const long_1 = __importDefault(require("long"));
const aminotypes_1 = require("./aminotypes");
const fee_1 = require("./fee");
const modules_1 = require("./modules");
const modules_2 = require("./modules");
const stargateclient_1 = require("./stargateclient");
exports.defaultRegistryTypes = [
    ["/cosmos.base.v1beta1.Coin", coin_1.Coin],
    ...modules_1.authzTypes,
    ...modules_1.bankTypes,
    ...modules_1.distributionTypes,
    ...modules_1.feegrantTypes,
    ...modules_1.govTypes,
    ...modules_1.stakingTypes,
    ...modules_1.ibcTypes,
    ...modules_1.vestingTypes,
];
function createDefaultRegistry() {
    return new proto_signing_1.Registry(exports.defaultRegistryTypes);
}
function createDefaultTypes(prefix) {
    return {
        ...(0, modules_2.createAuthzAminoConverters)(),
        ...(0, modules_2.createBankAminoConverters)(),
        ...(0, modules_2.createDistributionAminoConverters)(),
        ...(0, modules_2.createGovAminoConverters)(),
        ...(0, modules_2.createStakingAminoConverters)(prefix),
        ...(0, modules_2.createIbcAminoConverters)(),
        ...(0, modules_2.createFreegrantAminoConverters)(),
        ...(0, modules_2.createVestingAminoConverters)(),
    };
}
class SigningStargateClient extends stargateclient_1.StargateClient {
    constructor(tmClient, signer, options) {
        var _a;
        super(tmClient, options);
        // TODO: do we really want to set a default here? Ideally we could get it from the signer such that users only have to set it once.
        const prefix = (_a = options.prefix) !== null && _a !== void 0 ? _a : "cosmos";
        const { registry = createDefaultRegistry(), aminoTypes = new aminotypes_1.AminoTypes(createDefaultTypes(prefix)) } = options;
        this.registry = registry;
        this.aminoTypes = aminoTypes;
        this.signer = signer;
        this.broadcastTimeoutMs = options.broadcastTimeoutMs;
        this.broadcastPollIntervalMs = options.broadcastPollIntervalMs;
        this.gasPrice = options.gasPrice;
    }
    static async connectWithSigner(endpoint, signer, options = {}) {
        const tmClient = await tendermint_rpc_1.Tendermint34Client.connect(endpoint);
        return new SigningStargateClient(tmClient, signer, options);
    }
    /**
     * Creates a client in offline mode.
     *
     * This should only be used in niche cases where you know exactly what you're doing,
     * e.g. when building an offline signing application.
     *
     * When you try to use online functionality with such a signer, an
     * exception will be raised.
     */
    static async offline(signer, options = {}) {
        return new SigningStargateClient(undefined, signer, options);
    }
    async simulate(signerAddress, messages, memo) {
        const anyMsgs = messages.map((m) => this.registry.encodeAsAny(m));
        const accountFromSigner = (await this.signer.getAccounts()).find((account) => account.address === signerAddress);
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        const pubkey = (0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey);
        const { sequence } = await this.getSequence(signerAddress);
        const { gasInfo } = await this.forceGetQueryClient().tx.simulate(anyMsgs, memo, pubkey, sequence);
        (0, utils_1.assertDefined)(gasInfo);
        return math_1.Uint53.fromString(gasInfo.gasUsed.toString()).toNumber();
    }
    async sendTokens(senderAddress, recipientAddress, amount, fee, memo = "") {
        const sendMsg = {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: {
                fromAddress: senderAddress,
                toAddress: recipientAddress,
                amount: [...amount],
            },
        };
        return this.signAndBroadcast(senderAddress, [sendMsg], fee, memo);
    }
    async delegateTokens(delegatorAddress, validatorAddress, amount, fee, memo = "") {
        const delegateMsg = {
            typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
            value: tx_2.MsgDelegate.fromPartial({
                delegatorAddress: delegatorAddress,
                validatorAddress: validatorAddress,
                amount: amount,
            }),
        };
        return this.signAndBroadcast(delegatorAddress, [delegateMsg], fee, memo);
    }
    async undelegateTokens(delegatorAddress, validatorAddress, amount, fee, memo = "") {
        const undelegateMsg = {
            typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
            value: tx_2.MsgUndelegate.fromPartial({
                delegatorAddress: delegatorAddress,
                validatorAddress: validatorAddress,
                amount: amount,
            }),
        };
        return this.signAndBroadcast(delegatorAddress, [undelegateMsg], fee, memo);
    }
    async withdrawRewards(delegatorAddress, validatorAddress, fee, memo = "") {
        const withdrawMsg = {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
            value: tx_1.MsgWithdrawDelegatorReward.fromPartial({
                delegatorAddress: delegatorAddress,
                validatorAddress: validatorAddress,
            }),
        };
        return this.signAndBroadcast(delegatorAddress, [withdrawMsg], fee, memo);
    }
    async sendIbcTokens(senderAddress, recipientAddress, transferAmount, sourcePort, sourceChannel, timeoutHeight, 
    /** timeout in seconds */
    timeoutTimestamp, fee, memo = "") {
        const timeoutTimestampNanoseconds = timeoutTimestamp
            ? long_1.default.fromNumber(timeoutTimestamp).multiply(1000000000)
            : undefined;
        const transferMsg = {
            typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
            value: tx_4.MsgTransfer.fromPartial({
                sourcePort: sourcePort,
                sourceChannel: sourceChannel,
                sender: senderAddress,
                receiver: recipientAddress,
                token: transferAmount,
                timeoutHeight: timeoutHeight,
                timeoutTimestamp: timeoutTimestampNanoseconds,
            }),
        };
        return this.signAndBroadcast(senderAddress, [transferMsg], fee, memo);
    }
    async signAndBroadcast(signerAddress, messages, fee, memo = "") {
        let usedFee;
        if (fee == "auto" || typeof fee === "number") {
            (0, utils_1.assertDefined)(this.gasPrice, "Gas price must be set in the client options when auto gas is used.");
            const gasEstimation = await this.simulate(signerAddress, messages, memo);
            const multiplier = typeof fee === "number" ? fee : 1.3;
            usedFee = (0, fee_1.calculateFee)(Math.round(gasEstimation * multiplier), this.gasPrice);
        }
        else {
            usedFee = fee;
        }
        const txRaw = await this.sign(signerAddress, messages, usedFee, memo);
        const txBytes = tx_3.TxRaw.encode(txRaw).finish();
        return this.broadcastTx(txBytes, this.broadcastTimeoutMs, this.broadcastPollIntervalMs);
    }
    /**
     * Gets account number and sequence from the API, creates a sign doc,
     * creates a single signature and assembles the signed transaction.
     *
     * The sign mode (SIGN_MODE_DIRECT or SIGN_MODE_LEGACY_AMINO_JSON) is determined by this client's signer.
     *
     * You can pass signer data (account number, sequence and chain ID) explicitly instead of querying them
     * from the chain. This is needed when signing for a multisig account, but it also allows for offline signing
     * (See the SigningStargateClient.offline constructor).
     */
    async sign(signerAddress, messages, fee, memo, explicitSignerData) {
        let signerData;
        if (explicitSignerData) {
            signerData = explicitSignerData;
        }
        else {
            const { accountNumber, sequence } = await this.getSequence(signerAddress);
            const chainId = await this.getChainId();
            signerData = {
                accountNumber: accountNumber,
                sequence: sequence,
                chainId: chainId,
            };
        }
        return (0, proto_signing_1.isOfflineDirectSigner)(this.signer)
            ? this.signDirect(signerAddress, messages, fee, memo, signerData)
            : this.signAmino(signerAddress, messages, fee, memo, signerData);
    }
    async signAmino(signerAddress, messages, fee, memo, { accountNumber, sequence, chainId }) {
        (0, utils_1.assert)(!(0, proto_signing_1.isOfflineDirectSigner)(this.signer));
        const accountFromSigner = (await this.signer.getAccounts()).find((account) => account.address === signerAddress);
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        const pubkey = (0, proto_signing_1.encodePubkey)((0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey));
        const signMode = signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON;
        const msgs = messages.map((msg) => this.aminoTypes.toAmino(msg));
        const signDoc = (0, amino_1.makeSignDoc)(msgs, fee, chainId, memo, accountNumber, sequence);
        const { signature, signed } = await this.signer.signAmino(signerAddress, signDoc);
        const signedTxBody = {
            messages: signed.msgs.map((msg) => this.aminoTypes.fromAmino(msg)),
            memo: signed.memo,
        };
        const signedTxBodyEncodeObject = {
            typeUrl: "/cosmos.tx.v1beta1.TxBody",
            value: signedTxBody,
        };
        const signedTxBodyBytes = this.registry.encode(signedTxBodyEncodeObject);
        const signedGasLimit = math_1.Int53.fromString(signed.fee.gas).toNumber();
        const signedSequence = math_1.Int53.fromString(signed.sequence).toNumber();
        const signedAuthInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence: signedSequence }], signed.fee.amount, signedGasLimit, signMode);
        return tx_3.TxRaw.fromPartial({
            bodyBytes: signedTxBodyBytes,
            authInfoBytes: signedAuthInfoBytes,
            signatures: [(0, encoding_1.fromBase64)(signature.signature)],
        });
    }
    async signDirect(signerAddress, messages, fee, memo, { accountNumber, sequence, chainId }) {
        (0, utils_1.assert)((0, proto_signing_1.isOfflineDirectSigner)(this.signer));
        const accountFromSigner = (await this.signer.getAccounts()).find((account) => account.address === signerAddress);
        if (!accountFromSigner) {
            throw new Error("Failed to retrieve account from signer");
        }
        const pubkey = (0, proto_signing_1.encodePubkey)((0, amino_1.encodeSecp256k1Pubkey)(accountFromSigner.pubkey));
        const txBodyEncodeObject = {
            typeUrl: "/cosmos.tx.v1beta1.TxBody",
            value: {
                messages: messages,
                memo: memo,
            },
        };
        const txBodyBytes = this.registry.encode(txBodyEncodeObject);
        const gasLimit = math_1.Int53.fromString(fee.gas).toNumber();
        const authInfoBytes = (0, proto_signing_1.makeAuthInfoBytes)([{ pubkey, sequence }], fee.amount, gasLimit);
        const signDoc = (0, proto_signing_1.makeSignDoc)(txBodyBytes, authInfoBytes, chainId, accountNumber);
        const { signature, signed } = await this.signer.signDirect(signerAddress, signDoc);
        return tx_3.TxRaw.fromPartial({
            bodyBytes: signed.bodyBytes,
            authInfoBytes: signed.authInfoBytes,
            signatures: [(0, encoding_1.fromBase64)(signature.signature)],
        });
    }
}
exports.SigningStargateClient = SigningStargateClient;
//# sourceMappingURL=signingstargateclient.js.map