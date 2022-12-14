"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const gov_1 = require("cosmjs-types/cosmos/gov/v1beta1/gov");
const long_1 = __importDefault(require("long"));
const aminotypes_1 = require("../../aminotypes");
const aminomessages_1 = require("./aminomessages");
describe("AminoTypes", () => {
    describe("toAmino", () => {
        it("works for MsgDeposit", () => {
            const msg = {
                amount: [{ amount: "12300000", denom: "ustake" }],
                depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                proposalId: long_1.default.fromNumber(5),
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createGovAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgDeposit",
                value: {
                    amount: [{ amount: "12300000", denom: "ustake" }],
                    depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    proposal_id: "5",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgSubmitProposal", () => {
            const msg = {
                initialDeposit: [{ amount: "12300000", denom: "ustake" }],
                proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                content: {
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: gov_1.TextProposal.encode({
                        description: "This proposal proposes to test whether this proposal passes",
                        title: "Test Proposal",
                    }).finish(),
                },
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createGovAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgSubmitProposal",
                value: {
                    initial_deposit: [{ amount: "12300000", denom: "ustake" }],
                    proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    content: {
                        type: "cosmos-sdk/TextProposal",
                        value: {
                            description: "This proposal proposes to test whether this proposal passes",
                            title: "Test Proposal",
                        },
                    },
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgVote", () => {
            const msg = {
                option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                proposalId: long_1.default.fromNumber(5),
                voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createGovAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgVote",
                value: {
                    option: 4,
                    proposal_id: "5",
                    voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
    });
    describe("fromAmino", () => {
        it("works for MsgDeposit", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgDeposit",
                value: {
                    amount: [{ amount: "12300000", denom: "ustake" }],
                    depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    proposal_id: "5",
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createGovAminoConverters)()).fromAmino(aminoMsg);
            const expectedValue = {
                amount: [{ amount: "12300000", denom: "ustake" }],
                depositor: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                proposalId: long_1.default.fromNumber(5),
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.gov.v1beta1.MsgDeposit",
                value: expectedValue,
            });
        });
        it("works for MsgSubmitProposal", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgSubmitProposal",
                value: {
                    initial_deposit: [{ amount: "12300000", denom: "ustake" }],
                    proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    content: {
                        type: "cosmos-sdk/TextProposal",
                        value: {
                            description: "This proposal proposes to test whether this proposal passes",
                            title: "Test Proposal",
                        },
                    },
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createGovAminoConverters)()).fromAmino(aminoMsg);
            const expectedValue = {
                initialDeposit: [{ amount: "12300000", denom: "ustake" }],
                proposer: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                content: {
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: gov_1.TextProposal.encode({
                        description: "This proposal proposes to test whether this proposal passes",
                        title: "Test Proposal",
                    }).finish(),
                },
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                value: expectedValue,
            });
        });
        it("works for MsgVote", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgVote",
                value: {
                    option: 4,
                    proposal_id: "5",
                    voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createGovAminoConverters)()).fromAmino(aminoMsg);
            const expectedValue = {
                option: gov_1.VoteOption.VOTE_OPTION_NO_WITH_VETO,
                proposalId: long_1.default.fromNumber(5),
                voter: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.gov.v1beta1.MsgVote",
                value: expectedValue,
            });
        });
    });
});
//# sourceMappingURL=aminomessages.spec.js.map