"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const proto_signing_1 = require("@cosmjs/proto-signing");
const aminotypes_1 = require("../../aminotypes");
const aminomessages_1 = require("./aminomessages");
describe("AminoTypes", () => {
    describe("toAmino", () => {
        it("works for MsgBeginRedelegate", () => {
            const msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                amount: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos"));
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgBeginRedelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgCreateValidator", () => {
            const msg = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "...",
                },
                commission: {
                    rate: "0.2",
                    maxRate: "0.3",
                    maxChangeRate: "0.1",
                },
                minSelfDelegation: "123",
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                pubkey: {
                    typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                    value: (0, encoding_1.fromBase64)("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"),
                },
                value: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos"));
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgCreateValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "...",
                    },
                    commission: {
                        rate: "0.2",
                        max_rate: "0.3",
                        max_change_rate: "0.1",
                    },
                    min_self_delegation: "123",
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    pubkey: (0, amino_1.encodeBech32Pubkey)({ type: "tendermint/PubKeySecp256k1", value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ" }, "cosmos"),
                    value: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgDelegate", () => {
            const msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos"));
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgEditValidator", () => {
            const msg = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "...",
                },
                commissionRate: "0.2",
                minSelfDelegation: "123",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos"));
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgEditValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "...",
                    },
                    commission_rate: "0.2",
                    min_self_delegation: "123",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgUndelegate", () => {
            const msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos"));
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgUndelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
    });
    describe("fromAmino", () => {
        it("works for MsgBeginRedelegate", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgBeginRedelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_src_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    validator_dst_address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos")).fromAmino(aminoMsg);
            const expectedValue = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorSrcAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                validatorDstAddress: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                amount: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
                value: expectedValue,
            });
        });
        it("works for MsgCreateValidator", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgCreateValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "...",
                    },
                    commission: {
                        rate: "0.2",
                        max_rate: "0.3",
                        max_change_rate: "0.1",
                    },
                    min_self_delegation: "123",
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    pubkey: (0, amino_1.encodeBech32Pubkey)({ type: "tendermint/PubKeySecp256k1", value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ" }, "cosmos"),
                    value: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos")).fromAmino(aminoMsg);
            const expectedValue = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "...",
                },
                commission: {
                    rate: "0.2",
                    maxRate: "0.3",
                    maxChangeRate: "0.1",
                },
                minSelfDelegation: "123",
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                pubkey: {
                    typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                    value: (0, encoding_1.fromBase64)("A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ"),
                },
                value: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgCreateValidator",
                value: expectedValue,
            });
        });
        it("works for MsgDelegate", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos")).fromAmino(aminoMsg);
            const expectedValue = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: expectedValue,
            });
        });
        it("works for MsgEditValidator", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgEditValidator",
                value: {
                    description: {
                        moniker: "validator",
                        identity: "me",
                        website: "valid.com",
                        security_contact: "Hamburglar",
                        details: "...",
                    },
                    commission_rate: "0.2",
                    min_self_delegation: "123",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos")).fromAmino(aminoMsg);
            const expectedValue = {
                description: {
                    moniker: "validator",
                    identity: "me",
                    website: "valid.com",
                    securityContact: "Hamburglar",
                    details: "...",
                },
                commissionRate: "0.2",
                minSelfDelegation: "123",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgEditValidator",
                value: expectedValue,
            });
        });
        it("works for MsgUndelegate", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgUndelegate",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createStakingAminoConverters)("cosmos")).fromAmino(aminoMsg);
            const expectedValue = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgUndelegate",
                value: expectedValue,
            });
        });
    });
});
//# sourceMappingURL=aminomessages.spec.js.map