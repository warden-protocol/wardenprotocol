"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStakingAminoConverters = exports.isAminoMsgUndelegate = exports.isAminoMsgBeginRedelegate = exports.isAminoMsgDelegate = exports.isAminoMsgEditValidator = exports.isAminoMsgCreateValidator = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const utils_1 = require("@cosmjs/utils");
function isAminoMsgCreateValidator(msg) {
    return msg.type === "cosmos-sdk/MsgCreateValidator";
}
exports.isAminoMsgCreateValidator = isAminoMsgCreateValidator;
function isAminoMsgEditValidator(msg) {
    return msg.type === "cosmos-sdk/MsgEditValidator";
}
exports.isAminoMsgEditValidator = isAminoMsgEditValidator;
function isAminoMsgDelegate(msg) {
    return msg.type === "cosmos-sdk/MsgDelegate";
}
exports.isAminoMsgDelegate = isAminoMsgDelegate;
function isAminoMsgBeginRedelegate(msg) {
    return msg.type === "cosmos-sdk/MsgBeginRedelegate";
}
exports.isAminoMsgBeginRedelegate = isAminoMsgBeginRedelegate;
function isAminoMsgUndelegate(msg) {
    return msg.type === "cosmos-sdk/MsgUndelegate";
}
exports.isAminoMsgUndelegate = isAminoMsgUndelegate;
function createStakingAminoConverters(prefix) {
    return {
        "/cosmos.staking.v1beta1.MsgBeginRedelegate": {
            aminoType: "cosmos-sdk/MsgBeginRedelegate",
            toAmino: ({ delegatorAddress, validatorSrcAddress, validatorDstAddress, amount, }) => {
                (0, utils_1.assertDefinedAndNotNull)(amount, "missing amount");
                return {
                    delegator_address: delegatorAddress,
                    validator_src_address: validatorSrcAddress,
                    validator_dst_address: validatorDstAddress,
                    amount: amount,
                };
            },
            fromAmino: ({ delegator_address, validator_src_address, validator_dst_address, amount, }) => ({
                delegatorAddress: delegator_address,
                validatorSrcAddress: validator_src_address,
                validatorDstAddress: validator_dst_address,
                amount: amount,
            }),
        },
        "/cosmos.staking.v1beta1.MsgCreateValidator": {
            aminoType: "cosmos-sdk/MsgCreateValidator",
            toAmino: ({ description, commission, minSelfDelegation, delegatorAddress, validatorAddress, pubkey, value, }) => {
                (0, utils_1.assertDefinedAndNotNull)(description, "missing description");
                (0, utils_1.assertDefinedAndNotNull)(commission, "missing commission");
                (0, utils_1.assertDefinedAndNotNull)(pubkey, "missing pubkey");
                (0, utils_1.assertDefinedAndNotNull)(value, "missing value");
                return {
                    description: {
                        moniker: description.moniker,
                        identity: description.identity,
                        website: description.website,
                        security_contact: description.securityContact,
                        details: description.details,
                    },
                    commission: {
                        rate: commission.rate,
                        max_rate: commission.maxRate,
                        max_change_rate: commission.maxChangeRate,
                    },
                    min_self_delegation: minSelfDelegation,
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    pubkey: (0, amino_1.encodeBech32Pubkey)({
                        type: "tendermint/PubKeySecp256k1",
                        value: (0, encoding_1.toBase64)(pubkey.value),
                    }, prefix),
                    value: value,
                };
            },
            fromAmino: ({ description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value, }) => {
                const decodedPubkey = (0, amino_1.decodeBech32Pubkey)(pubkey);
                if (decodedPubkey.type !== "tendermint/PubKeySecp256k1") {
                    throw new Error("Only Secp256k1 public keys are supported");
                }
                return {
                    description: {
                        moniker: description.moniker,
                        identity: description.identity,
                        website: description.website,
                        securityContact: description.security_contact,
                        details: description.details,
                    },
                    commission: {
                        rate: commission.rate,
                        maxRate: commission.max_rate,
                        maxChangeRate: commission.max_change_rate,
                    },
                    minSelfDelegation: min_self_delegation,
                    delegatorAddress: delegator_address,
                    validatorAddress: validator_address,
                    pubkey: {
                        typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                        value: (0, encoding_1.fromBase64)(decodedPubkey.value),
                    },
                    value: value,
                };
            },
        },
        "/cosmos.staking.v1beta1.MsgDelegate": {
            aminoType: "cosmos-sdk/MsgDelegate",
            toAmino: ({ delegatorAddress, validatorAddress, amount }) => {
                (0, utils_1.assertDefinedAndNotNull)(amount, "missing amount");
                return {
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    amount: amount,
                };
            },
            fromAmino: ({ delegator_address, validator_address, amount, }) => ({
                delegatorAddress: delegator_address,
                validatorAddress: validator_address,
                amount: amount,
            }),
        },
        "/cosmos.staking.v1beta1.MsgEditValidator": {
            aminoType: "cosmos-sdk/MsgEditValidator",
            toAmino: ({ description, commissionRate, minSelfDelegation, validatorAddress, }) => {
                (0, utils_1.assertDefinedAndNotNull)(description, "missing description");
                return {
                    description: {
                        moniker: description.moniker,
                        identity: description.identity,
                        website: description.website,
                        security_contact: description.securityContact,
                        details: description.details,
                    },
                    commission_rate: commissionRate,
                    min_self_delegation: minSelfDelegation,
                    validator_address: validatorAddress,
                };
            },
            fromAmino: ({ description, commission_rate, min_self_delegation, validator_address, }) => ({
                description: {
                    moniker: description.moniker,
                    identity: description.identity,
                    website: description.website,
                    securityContact: description.security_contact,
                    details: description.details,
                },
                commissionRate: commission_rate,
                minSelfDelegation: min_self_delegation,
                validatorAddress: validator_address,
            }),
        },
        "/cosmos.staking.v1beta1.MsgUndelegate": {
            aminoType: "cosmos-sdk/MsgUndelegate",
            toAmino: ({ delegatorAddress, validatorAddress, amount, }) => {
                (0, utils_1.assertDefinedAndNotNull)(amount, "missing amount");
                return {
                    delegator_address: delegatorAddress,
                    validator_address: validatorAddress,
                    amount: amount,
                };
            },
            fromAmino: ({ delegator_address, validator_address, amount, }) => ({
                delegatorAddress: delegator_address,
                validatorAddress: validator_address,
                amount: amount,
            }),
        },
    };
}
exports.createStakingAminoConverters = createStakingAminoConverters;
//# sourceMappingURL=aminomessages.js.map