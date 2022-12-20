"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const proto_signing_1 = require("@cosmjs/proto-signing");
const aminotypes_1 = require("./aminotypes");
const modules_1 = require("./modules");
describe("AminoTypes", () => {
    describe("constructor", () => {
        const msg = {
            delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
            amount: (0, proto_signing_1.coin)(1234, "ucosm"),
        };
        it("can override type by type URL", () => {
            const types = new aminotypes_1.AminoTypes({
                "/cosmos.staking.v1beta1.MsgDelegate": {
                    aminoType: "my-override/MsgDelegate",
                    toAmino: (m) => {
                        var _a;
                        return ({
                            foo: (_a = m.delegatorAddress) !== null && _a !== void 0 ? _a : "",
                        });
                    },
                    fromAmino: () => ({
                        bar: 123,
                    }),
                },
            });
            const aminoMsg = types.toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg,
            });
            expect(aminoMsg).toEqual({
                type: "my-override/MsgDelegate",
                value: {
                    foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                },
            });
            expect(types.fromAmino(aminoMsg)).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: {
                    bar: 123,
                },
            });
        });
        it("can override type with Amino type collision", () => {
            const types = new aminotypes_1.AminoTypes({
                ...(0, modules_1.createStakingAminoConverters)("cosmos"),
                "/cosmos.staking.otherVersion456.MsgDelegate": {
                    aminoType: "cosmos-sdk/MsgDelegate",
                    toAmino: (m) => {
                        var _a;
                        return ({
                            foo: (_a = m.delegatorAddress) !== null && _a !== void 0 ? _a : "",
                        });
                    },
                    fromAmino: () => ({
                        bar: 123,
                    }),
                },
            });
            const aminoMsg = types.toAmino({
                typeUrl: "/cosmos.staking.otherVersion456.MsgDelegate",
                value: msg,
            });
            expect(aminoMsg).toEqual({
                type: "cosmos-sdk/MsgDelegate",
                value: {
                    foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                },
            });
            expect(() => types.fromAmino(aminoMsg)).toThrowError("Multiple types are registered with Amino type identifier 'cosmos-sdk/MsgDelegate': '/cosmos.staking.otherVersion456.MsgDelegate', '/cosmos.staking.v1beta1.MsgDelegate'. Thus fromAmino cannot be performed.");
        });
    });
    describe("toAmino", () => {
        it("works with custom type url", () => {
            const msg = {
                foo: "bar",
            };
            const aminoMsg = new aminotypes_1.AminoTypes({
                "/my.CustomType": {
                    aminoType: "my-sdk/CustomType",
                    toAmino: ({ foo, }) => ({
                        foo: `amino-prefix-${foo}`,
                        constant: "something-for-amino",
                    }),
                    fromAmino: () => { },
                },
            }).toAmino({ typeUrl: "/my.CustomType", value: msg });
            expect(aminoMsg).toEqual({
                type: "my-sdk/CustomType",
                value: {
                    foo: "amino-prefix-bar",
                    constant: "something-for-amino",
                },
            });
        });
        it("works with overridden type url", () => {
            const msg = {
                delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                amount: (0, proto_signing_1.coin)(1234, "ucosm"),
            };
            const aminoMsg = new aminotypes_1.AminoTypes({
                "/cosmos.staking.v1beta1.MsgDelegate": {
                    aminoType: "my-override/MsgDelegate",
                    toAmino: (m) => {
                        var _a;
                        return ({
                            foo: (_a = m.delegatorAddress) !== null && _a !== void 0 ? _a : "",
                        });
                    },
                    fromAmino: () => { },
                },
            }).toAmino({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: msg,
            });
            const expected = {
                type: "my-override/MsgDelegate",
                value: {
                    foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                },
            };
            expect(aminoMsg).toEqual(expected);
        });
        it("throws for unknown type url", () => {
            expect(() => new aminotypes_1.AminoTypes((0, modules_1.createBankAminoConverters)()).toAmino({
                typeUrl: "/xxx.Unknown",
                value: { foo: "bar" },
            })).toThrowError(/Type URL '\/xxx\.Unknown' does not exist in the Amino message type register./i);
        });
    });
    describe("fromAmino", () => {
        it("works for custom type url", () => {
            const aminoMsg = {
                type: "my-sdk/CustomType",
                value: {
                    foo: "amino-prefix-bar",
                    constant: "something-for-amino",
                },
            };
            const msg = new aminotypes_1.AminoTypes({
                "/my.CustomType": {
                    aminoType: "my-sdk/CustomType",
                    toAmino: () => { },
                    fromAmino: ({ foo }) => ({
                        foo: foo.slice(13),
                    }),
                },
            }).fromAmino(aminoMsg);
            const expectedValue = {
                foo: "bar",
            };
            expect(msg).toEqual({
                typeUrl: "/my.CustomType",
                value: expectedValue,
            });
        });
        it("works with overridden type URL", () => {
            const msg = new aminotypes_1.AminoTypes({
                "/cosmos.staking.v1beta1.MsgDelegate": {
                    aminoType: "cosmos-sdk/MsgDelegate2",
                    toAmino: () => { },
                    fromAmino: ({ foo }) => ({
                        delegatorAddress: foo,
                        validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                        amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                    }),
                },
            }).fromAmino({
                type: "cosmos-sdk/MsgDelegate2",
                value: {
                    foo: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                },
            });
            expect(msg).toEqual({
                typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
                value: {
                    delegatorAddress: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                    validatorAddress: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
                    amount: (0, proto_signing_1.coin)(1234, "ucosm"),
                },
            });
        });
        it("throws for types which are not on chain yet", () => {
            expect(() => {
                new aminotypes_1.AminoTypes({ "/cosmos.feegrant.v1beta1.MsgRevokeAllowance": "not_supported_by_chain" }).toAmino({
                    typeUrl: "/cosmos.feegrant.v1beta1.MsgRevokeAllowance",
                    value: 0,
                });
            }).toThrowError(/The message type '\/cosmos.feegrant.v1beta1.MsgRevokeAllowance' cannot be signed using the Amino JSON sign mode because this is not supported by chain./i);
        });
        it("throws for unknown type url", () => {
            expect(() => new aminotypes_1.AminoTypes((0, modules_1.createBankAminoConverters)()).fromAmino({
                type: "cosmos-sdk/MsgUnknown",
                value: { foo: "bar" },
            })).toThrowError(/Amino type identifier 'cosmos-sdk\/MsgUnknown' does not exist in the Amino message type register./i);
        });
    });
});
//# sourceMappingURL=aminotypes.spec.js.map