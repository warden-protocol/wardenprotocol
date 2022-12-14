"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const hmac_1 = require("./hmac");
const sha_1 = require("./sha");
describe("HMAC", () => {
    it("can perform HMAC(SHA256) according to Botan test vectors", () => {
        // https://github.com/randombit/botan/blob/a5a260c/src/tests/data/mac/hmac.vec#L60
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)("0102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F20"));
            hmac.update((0, encoding_1.fromHex)("616263"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("A21B1F5D4CF4F73A4DD939750F7A066A7F98CC131CB16A6692759021CFAB8181"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)("4A656665"));
            hmac.update((0, encoding_1.fromHex)("7768617420646F2079612077616E7420666F72206E6F7468696E673F"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("5BDCC146BF60754E6A042426089575C75A003F089D2739839DEC58B964EC3843"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)("0102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F20"));
            hmac.update((0, encoding_1.fromHex)("6162636462636465636465666465666765666768666768696768696A68696A6B696A6B6C6A6B6C6D6B6C6D6E6C6D6E6F6D6E6F706E6F70716162636462636465636465666465666765666768666768696768696A68696A6B696A6B6C6A6B6C6D6B6C6D6E6C6D6E6F6D6E6F706E6F7071"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("470305FC7E40FE34D3EEB3E773D95AAB73ACF0FD060447A5EB4595BF33A9D1A3"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)("0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B"));
            hmac.update((0, encoding_1.fromHex)("4869205468657265"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("198A607EB44BFBC69903A0F1CF2BBDC5BA0AA3F3D9AE3C1C7A3B1696A0B68CF7"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)("0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C0C"));
            hmac.update((0, encoding_1.fromHex)("546573742057697468205472756E636174696F6E"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("7546AF01841FC09B1AB9C3749A5F1C17D4F589668A587B2700A9C97C1193CF42"));
        }
    });
    it("can perform HMAC(SHA512) according to RFC 4231", () => {
        // Test Case 1–7 from https://tools.ietf.org/html/rfc4231#section-4
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.fromHex)("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b"));
            hmac.update((0, encoding_1.fromHex)("4869205468657265"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("87aa7cdea5ef619d4ff0b4241a1d6cb02379f4e2ce4ec2787ad0b30545e17cdedaa833b7d6b8a702038b274eaea3f4e4be9d914eeb61f1702e696c203a126854"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.fromHex)("4a656665"));
            hmac.update((0, encoding_1.fromHex)("7768617420646f2079612077616e7420666f72206e6f7468696e673f"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("164b7a7bfcf819e2e395fbe73b56e0a387bd64222e831fd610270cd7ea2505549758bf75c05a994a6d034f65f8f0e6fdcaeab1a34d4a6b4b636e070a38bce737"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.fromHex)("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
            hmac.update((0, encoding_1.fromHex)("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("fa73b0089d56a284efb0f0756c890be9b1b5dbdd8ee81a3655f83e33b2279d39bf3e848279a722c806b485a47e67c807b946a337bee8942674278859e13292fb"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.fromHex)("0102030405060708090a0b0c0d0e0f10111213141516171819"));
            hmac.update((0, encoding_1.fromHex)("cdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcdcd"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("b0ba465637458c6990e5a8c5f61d4af7e576d97ff94b872de76f8050361ee3dba91ca5c11aa25eb4d679275cc5788063a5f19741120c4f2de2adebeb10a298dd"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.fromHex)("0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c"));
            hmac.update((0, encoding_1.fromHex)("546573742057697468205472756e636174696f6e"));
            expect(hmac.digest().slice(0, 16)).toEqual((0, encoding_1.fromHex)("415fad6271580a531d4179bc891d87a6"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.fromHex)("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
            hmac.update((0, encoding_1.fromHex)("54657374205573696e67204c6172676572205468616e20426c6f636b2d53697a65204b6579202d2048617368204b6579204669727374"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("80b24263c7c1a3ebb71493c1dd7be8b49b46d1f41b4aeec1121b013783f8f3526b56d037e05f2598bd0fd2215d6a1e5295e64f73f63f0aec8b915a985d786598"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha512, (0, encoding_1.fromHex)("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
            hmac.update((0, encoding_1.fromHex)("5468697320697320612074657374207573696e672061206c6172676572207468616e20626c6f636b2d73697a65206b657920616e642061206c6172676572207468616e20626c6f636b2d73697a6520646174612e20546865206b6579206e6565647320746f20626520686173686564206265666f7265206265696e6720757365642062792074686520484d414320616c676f726974686d2e"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("e37b6a775dc87dbaa4dfa9f96e5e3ffddebd71f8867289865df5a32d20cdc944b6022cac3c4982b10d5eeb55c3e4de15134676fb6de0446065c97440fa8c6a58"));
        }
    });
    it("can perform incremental hashing", () => {
        // https://github.com/randombit/botan/blob/a5a260c/src/tests/data/mac/hmac.vec#L73-L75
        const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)("0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B0B"));
        // full message: 4869205468657265
        hmac.update((0, encoding_1.fromHex)(""));
        hmac.update((0, encoding_1.fromHex)("48"));
        hmac.update((0, encoding_1.fromHex)(""));
        hmac.update((0, encoding_1.fromHex)(""));
        hmac.update((0, encoding_1.fromHex)("69"));
        hmac.update((0, encoding_1.fromHex)("20"));
        hmac.update((0, encoding_1.fromHex)("5468"));
        hmac.update((0, encoding_1.fromHex)("657265"));
        hmac.update((0, encoding_1.fromHex)(""));
        expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("198A607EB44BFBC69903A0F1CF2BBDC5BA0AA3F3D9AE3C1C7A3B1696A0B68CF7"));
    });
    it("works with empty keys", () => {
        // Generated using Python 3
        // hmac.new(b'', bytearray.fromhex("7061756c"), hashlib.sha256).hexdigest()
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)(""));
            hmac.update((0, encoding_1.fromHex)("7061756c"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("50972b73add1dbbbe6884104d0f91efcef184e0aef6e485a075b3cab1f70e572"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)(""));
            hmac.update((0, encoding_1.fromHex)("70"));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("a1d75fa8dc0d1a84cf6df6f0e55cb52d89d44acb26e786c9329cf8dc8804a94e"));
        }
        {
            const hmac = new hmac_1.Hmac(sha_1.Sha256, (0, encoding_1.fromHex)(""));
            hmac.update((0, encoding_1.fromHex)(""));
            expect(hmac.digest()).toEqual((0, encoding_1.fromHex)("b613679a0814d9ec772f95d778c35fc5ff1697c493715653c6c712144292c5ad"));
        }
    });
});
//# sourceMappingURL=hmac.spec.js.map