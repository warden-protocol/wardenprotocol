"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const proto_signing_1 = require("@cosmjs/proto-signing");
const long_1 = __importDefault(require("long"));
const aminotypes_1 = require("../../aminotypes");
const aminomessages_1 = require("./aminomessages");
describe("AminoTypes", () => {
    describe("toAmino", () => {
        it("works for MsgTransfer", () => {
            const msg = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1.default.fromString("123", true),
                    revisionNumber: long_1.default.fromString("456", true),
                },
                timeoutTimestamp: long_1.default.fromString("789", true),
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createIbcAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                        revision_height: "123",
                        revision_number: "456",
                    },
                    timeout_timestamp: "789",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgTransfer with empty values", () => {
            const msg = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1.default.UZERO,
                    revisionNumber: long_1.default.UZERO,
                },
                timeoutTimestamp: long_1.default.UZERO,
            };
            const aminoTypes = new aminotypes_1.AminoTypes((0, aminomessages_1.createIbcAminoConverters)());
            const aminoMsg = aminoTypes.toAmino({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                        revision_height: undefined,
                        revision_number: undefined,
                    },
                    timeout_timestamp: undefined,
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("works for MsgTransfer with no height timeout", () => {
            const msg = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: undefined,
                timeoutTimestamp: long_1.default.UZERO,
            };
            const aminoMsg = new aminotypes_1.AminoTypes((0, aminomessages_1.createIbcAminoConverters)()).toAmino({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: msg,
            });
            const expected = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {},
                    timeout_timestamp: undefined,
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
    });
    describe("fromAmino", () => {
        it("works for MsgTransfer", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                        revision_height: "123",
                        revision_number: "456",
                    },
                    timeout_timestamp: "789",
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createIbcAminoConverters)()).fromAmino(aminoMsg);
            const expectedValue = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1.default.fromString("123", true),
                    revisionNumber: long_1.default.fromString("456", true),
                },
                timeoutTimestamp: long_1.default.fromString("789", true),
            };
            expect(msg).toEqual({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: expectedValue,
            });
        });
        it("works for MsgTransfer with default values", () => {
            const aminoMsg = {
                type: "cosmos-sdk/MsgTransfer",
                value: {
                    source_port: "testport",
                    source_channel: "testchannel",
                    token: (0, proto_signing_1.coin)(1234, "utest"),
                    sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    timeout_height: {
                    // revision_height omitted
                    // revision_number omitted
                    },
                    // timeout_timestamp omitted
                },
            };
            const msg = new aminotypes_1.AminoTypes((0, aminomessages_1.createIbcAminoConverters)()).fromAmino(aminoMsg);
            const expectedValue = {
                sourcePort: "testport",
                sourceChannel: "testchannel",
                token: (0, proto_signing_1.coin)(1234, "utest"),
                sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                receiver: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                timeoutHeight: {
                    revisionHeight: long_1.default.UZERO,
                    revisionNumber: long_1.default.UZERO,
                },
                timeoutTimestamp: long_1.default.UZERO,
            };
            expect(msg).toEqual({
                typeUrl: "/ibc.applications.transfer.v1.MsgTransfer",
                value: expectedValue,
            });
        });
    });
});
//# sourceMappingURL=aminomessages.spec.js.map