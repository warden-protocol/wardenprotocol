"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const proto_signing_1 = require("@cosmjs/proto-signing");
const aminotypes_1 = require("../../aminotypes");
const aminomessages_1 = require("./aminomessages");
describe("AminoTypes", () => {
    describe("toAmino", () => {
        it("works for MsgSend", () => {
            const msg = {
                fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coins)(1234, "ucosm"),
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createBankAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgSend",
                value: {
                    from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgMultiSend", () => {
            const msg = {
                inputs: [
                    { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                    { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                ],
                outputs: [
                    { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                    { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                ],
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createBankAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgMultiSend",
                value: {
                    inputs: [
                        { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                        { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                    ],
                    outputs: [
                        { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                        { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                    ],
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
    });
    describe("fromAmino", () => {
        it("works for MsgSend", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgSend",
                value: {
                    from_address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    to_address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coins)(1234, "ucosm"),
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createBankAminoConverters)()).fromAmino(aminoMsg);
            const expectedValue = {
                fromAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                toAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coins)(1234, "ucosm"),
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.bank.v1beta1.MsgSend",
                value: expectedValue,
            });
        });
        it("works for MsgMultiSend", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgMultiSend",
                value: {
                    inputs: [
                        { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                        { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                    ],
                    outputs: [
                        { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                        { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                    ],
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createBankAminoConverters)()).fromAmino(aminoMsg);
            const expectedValue = {
                inputs: [
                    { address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6", coins: (0, proto_signing_1.coins)(1234, "ucosm") },
                    { address: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5", coins: (0, proto_signing_1.coins)(5678, "ucosm") },
                ],
                outputs: [
                    { address: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k", coins: (0, proto_signing_1.coins)(6000, "ucosm") },
                    { address: "cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx", coins: (0, proto_signing_1.coins)(912, "ucosm") },
                ],
            };
            expect(msg).toEqual({
                typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
                value: expectedValue,
            });
        });
    });
});
//# sourceMappingURL=aminomessages.spec.js.map