"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const proto_signing_1 = require("@cosmjs/proto-signing");
const aminotypes_1 = require("../../aminotypes");
const aminomessages_1 = require("./aminomessages");
describe("AminoTypes", () => {
    describe("toAmino", () => {
        it("works for MsgFundCommunityPool", async () => {
            const msg = {
                amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createDistributionAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.distribution.v1beta1.MsgFundCommunityPool",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgFundCommunityPool",
                value: {
                    amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                    depositor: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgSetWithdrawAddress", async () => {
            const msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                withdrawAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createDistributionAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.distribution.v1beta1.MsgSetWithdrawAddress",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgModifyWithdrawAddress",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    withdraw_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgWithdrawDelegatorReward", async () => {
            const msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createDistributionAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgWithdrawDelegationReward",
                value: {
                    delegator_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgWithdrawValidatorCommission", async () => {
            const msg = {
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createDistributionAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgWithdrawValidatorCommission",
                value: {
                    validator_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
    });
    // describe("fromAmino", () => {
    // TODO: MsgFundCommunityPool
    // TODO: MsgSetWithdrawAddress
    // TODO: MsgWithdrawDelegatorReward
    // TODO: MsgWithdrawValidatorCommission
    // });
});
//# sourceMappingURL=aminomessages.spec.js.map