"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const secp256k1signature_1 = require("./secp256k1signature");
describe("Secp256k1Signature", () => {
    describe("fromFixedLength", () => {
        it("works", () => {
            const data = (0, encoding_1.fromHex)("000000000000000000000000000000000000000000000000000000000000223300000000000000000000000000000000000000000000000000000000000000aa");
            const signature = secp256k1signature_1.Secp256k1Signature.fromFixedLength(data);
            expect(signature.r()).toEqual(new Uint8Array([0x22, 0x33]));
            expect(signature.s()).toEqual(new Uint8Array([0xaa]));
        });
        it("throws for invalid length", () => {
            const data = (0, encoding_1.fromHex)("000000000000000000000000000000000000000000000000000000000000223300000000000000000000000000000000000000000000000000000000000000aa01");
            expect(() => secp256k1signature_1.Secp256k1Signature.fromFixedLength(data)).toThrowError(/got invalid data length/i);
        });
    });
    it("can be constructed", () => {
        const signature = new secp256k1signature_1.Secp256k1Signature(new Uint8Array([0x22, 0x33]), new Uint8Array([0xaa]));
        expect(signature).toBeTruthy();
    });
    it("can get r and s", () => {
        const signature = new secp256k1signature_1.Secp256k1Signature(new Uint8Array([0x22, 0x33]), new Uint8Array([0xaa]));
        expect(signature.r()).toEqual(new Uint8Array([0x22, 0x33]));
        expect(signature.s()).toEqual(new Uint8Array([0xaa]));
    });
    it("can padd r and s", () => {
        const signature = new secp256k1signature_1.Secp256k1Signature(new Uint8Array([0x22, 0x33]), new Uint8Array([0xaa]));
        expect(signature.r(2)).toEqual((0, encoding_1.fromHex)("2233"));
        expect(signature.r(5)).toEqual((0, encoding_1.fromHex)("0000002233"));
        expect(signature.r(32)).toEqual((0, encoding_1.fromHex)("0000000000000000000000000000000000000000000000000000000000002233"));
        expect(signature.s(1)).toEqual((0, encoding_1.fromHex)("AA"));
        expect(signature.s(2)).toEqual((0, encoding_1.fromHex)("00AA"));
        expect(signature.s(7)).toEqual((0, encoding_1.fromHex)("000000000000AA"));
    });
    it("throws when output size of r or s is too small", () => {
        const signature = new secp256k1signature_1.Secp256k1Signature(new Uint8Array([0x22, 0x33, 0x44]), new Uint8Array([0xaa, 0xbb]));
        expect(() => signature.r(0)).toThrowError(/length too small to hold parameter r/i);
        expect(() => signature.r(1)).toThrowError(/length too small to hold parameter r/i);
        expect(() => signature.r(2)).toThrowError(/length too small to hold parameter r/i);
        expect(() => signature.s(0)).toThrowError(/length too small to hold parameter s/i);
        expect(() => signature.s(1)).toThrowError(/length too small to hold parameter s/i);
    });
    it("throws for r with leading 0", () => {
        expect(() => new secp256k1signature_1.Secp256k1Signature((0, encoding_1.fromHex)("00F25B86E1D8A11D72475B3ED273B0781C7D7F6F9E1DAE0DD5D3EE9B84F3FAB891"), new Uint8Array([0xaa]))).toThrowError(/unsigned integer r must be encoded as unpadded big endian./i);
    });
    it("throws for s with leading 0", () => {
        expect(() => new secp256k1signature_1.Secp256k1Signature(new Uint8Array([0xaa]), (0, encoding_1.fromHex)("00F25B86E1D8A11D72475B3ED273B0781C7D7F6F9E1DAE0DD5D3EE9B84F3FAB891"))).toThrowError(/unsigned integer s must be encoded as unpadded big endian./i);
    });
    it("can be encoded as fixed length", () => {
        const signature = new secp256k1signature_1.Secp256k1Signature(new Uint8Array([0x22, 0x33]), new Uint8Array([0xaa]));
        expect(signature.toFixedLength()).toEqual((0, encoding_1.fromHex)("000000000000000000000000000000000000000000000000000000000000223300000000000000000000000000000000000000000000000000000000000000aa"));
    });
    it("can encode to DER", () => {
        // Signature 3045022100f25b86e1d8a11d72475b3ed273b0781c7d7f6f9e1dae0dd5d3ee9b84f3fab891022063d9c4e1391de077244583e9a6e3d8e8e1f236a3bf5963735353b93b1a3ba935
        // decoded by http://asn1-playground.oss.com/
        const signature = new secp256k1signature_1.Secp256k1Signature((0, encoding_1.fromHex)("F25B86E1D8A11D72475B3ED273B0781C7D7F6F9E1DAE0DD5D3EE9B84F3FAB891"), (0, encoding_1.fromHex)("63D9C4E1391DE077244583E9A6E3D8E8E1F236A3BF5963735353B93B1A3BA935"));
        expect(signature.toDer()).toEqual((0, encoding_1.fromHex)("3045022100f25b86e1d8a11d72475b3ed273b0781c7d7f6f9e1dae0dd5d3ee9b84f3fab891022063d9c4e1391de077244583e9a6e3d8e8e1f236a3bf5963735353b93b1a3ba935"));
    });
    it("can decode from DER", () => {
        // Signatures found by searching the CosmJS codebase for "3044", "3045" and "3046".
        // Decoded using https://asn1.io/asn1playground/.
        // 70 bytes (no leading zeros)
        const sig70 = secp256k1signature_1.Secp256k1Signature.fromDer((0, encoding_1.fromHex)("30440220626d61b7be1488b563e8a85bfb623b2331903964b5c0476c9f9ad29144f076fe02202002a2c0ab5e48626bf761cf677dfeede9c7309d2436d4b8c2b89f21ee2ebc6a"));
        expect(sig70.r()).toEqual((0, encoding_1.fromHex)("626D61B7BE1488B563E8A85BFB623B2331903964B5C0476C9F9AD29144F076FE"));
        expect(sig70.s()).toEqual((0, encoding_1.fromHex)("2002A2C0AB5E48626BF761CF677DFEEDE9C7309D2436D4B8C2B89F21EE2EBC6A"));
        // 71 bytes (leading zero in r)
        const sig71 = secp256k1signature_1.Secp256k1Signature.fromDer((0, encoding_1.fromHex)("3045022100f25b86e1d8a11d72475b3ed273b0781c7d7f6f9e1dae0dd5d3ee9b84f3fab891022063d9c4e1391de077244583e9a6e3d8e8e1f236a3bf5963735353b93b1a3ba935"));
        expect(sig71.r()).toEqual((0, encoding_1.fromHex)("F25B86E1D8A11D72475B3ED273B0781C7D7F6F9E1DAE0DD5D3EE9B84F3FAB891"));
        expect(sig71.s()).toEqual((0, encoding_1.fromHex)("63D9C4E1391DE077244583E9A6E3D8E8E1F236A3BF5963735353B93B1A3BA935"));
        // 72 bytes (leading zero in r and s)
        const sig72 = secp256k1signature_1.Secp256k1Signature.fromDer((0, encoding_1.fromHex)("304602210083de9be443bcf480892b8c8ca1d5ee65c79a315642c3f7b5305aff3065fda2780221009747932122b93cec42cad8ee4630a8f6cbe127578b8c495b4ab927275f657658"));
        expect(sig72.r()).toEqual((0, encoding_1.fromHex)("83DE9BE443BCF480892B8C8CA1D5EE65C79A315642C3F7B5305AFF3065FDA278"));
        expect(sig72.s()).toEqual((0, encoding_1.fromHex)("9747932122B93CEC42CAD8EE4630A8F6CBE127578B8C495B4AB927275F657658"));
    });
});
describe("ExtendedSecp256k1Signature", () => {
    it("can be constructed", () => {
        const signature = new secp256k1signature_1.ExtendedSecp256k1Signature(new Uint8Array([0x22, 0x33]), new Uint8Array([0xaa]), 1);
        expect(signature.recovery).toEqual(1);
    });
    it("throws for recovery param out of range", () => {
        expect(() => new secp256k1signature_1.ExtendedSecp256k1Signature((0, encoding_1.fromHex)("aa"), (0, encoding_1.fromHex)("bb"), Number.NaN)).toThrowError(/the recovery parameter must be an integer/i);
        expect(() => new secp256k1signature_1.ExtendedSecp256k1Signature((0, encoding_1.fromHex)("aa"), (0, encoding_1.fromHex)("bb"), Number.NEGATIVE_INFINITY)).toThrowError(/the recovery parameter must be an integer/i);
        expect(() => new secp256k1signature_1.ExtendedSecp256k1Signature((0, encoding_1.fromHex)("aa"), (0, encoding_1.fromHex)("bb"), Number.POSITIVE_INFINITY)).toThrowError(/the recovery parameter must be an integer/i);
        expect(() => new secp256k1signature_1.ExtendedSecp256k1Signature((0, encoding_1.fromHex)("aa"), (0, encoding_1.fromHex)("bb"), 1.1)).toThrowError(/the recovery parameter must be an integer/i);
        expect(() => new secp256k1signature_1.ExtendedSecp256k1Signature((0, encoding_1.fromHex)("aa"), (0, encoding_1.fromHex)("bb"), -1)).toThrowError(/the recovery parameter must be one of 0, 1, 2, 3/i);
        expect(() => new secp256k1signature_1.ExtendedSecp256k1Signature((0, encoding_1.fromHex)("aa"), (0, encoding_1.fromHex)("bb"), 5)).toThrowError(/the recovery parameter must be one of 0, 1, 2, 3/i);
    });
    it("can be encoded as fixed length", () => {
        const signature = new secp256k1signature_1.ExtendedSecp256k1Signature(new Uint8Array([0x22, 0x33]), new Uint8Array([0xaa]), 1);
        expect(signature.toFixedLength()).toEqual((0, encoding_1.fromHex)("000000000000000000000000000000000000000000000000000000000000223300000000000000000000000000000000000000000000000000000000000000aa01"));
    });
    it("can be decoded from fixed length", () => {
        const signature = secp256k1signature_1.ExtendedSecp256k1Signature.fromFixedLength((0, encoding_1.fromHex)("000000000000000000000000000000000000000000000000000000000000223300000000000000000000000000000000000000000000000000000000000000aa01"));
        expect(signature.r()).toEqual(new Uint8Array([0x22, 0x33]));
        expect(signature.s()).toEqual(new Uint8Array([0xaa]));
        expect(signature.recovery).toEqual(1);
    });
});
//# sourceMappingURL=secp256k1signature.spec.js.map