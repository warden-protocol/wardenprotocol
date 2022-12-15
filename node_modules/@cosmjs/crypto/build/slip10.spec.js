"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const slip10_1 = require("./slip10");
describe("Slip10", () => {
    it("has working slip10CurveFromString()", () => {
        expect((0, slip10_1.slip10CurveFromString)("Bitcoin seed")).toEqual(slip10_1.Slip10Curve.Secp256k1);
        expect((0, slip10_1.slip10CurveFromString)("ed25519 seed")).toEqual(slip10_1.Slip10Curve.Ed25519);
        expect(() => (0, slip10_1.slip10CurveFromString)("something else")).toThrowError(/unknown curve/i);
        expect(() => (0, slip10_1.slip10CurveFromString)("")).toThrowError(/unknown curve/i);
    });
    describe("Test vector 1 for secp256k1", () => {
        // https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-1-for-secp256k1
        const seed = (0, encoding_1.fromHex)("000102030405060708090a0b0c0d0e0f");
        it("can derive path m", () => {
            const path = [];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("e8f32e723decf4051aefac8e2c93c9c5b214313817cdb01a1494b917c8436b35"));
        });
        it("can derive path m/0'", () => {
            const path = [slip10_1.Slip10RawIndex.hardened(0)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("47fdacbd0f1097043b78c63c20c34ef4ed9a111d980047ad16282c7ae6236141"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("edb2e14f9ee77d26dd93b4ecede8d16ed408ce149b6cd80b0715a2d911a0afea"));
        });
        it("can derive path m/0'/1", () => {
            const path = [slip10_1.Slip10RawIndex.hardened(0), slip10_1.Slip10RawIndex.normal(1)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("2a7857631386ba23dacac34180dd1983734e444fdbf774041578e9b6adb37c19"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("3c6cb8d0f6a264c91ea8b5030fadaa8e538b020f0a387421a12de9319dc93368"));
        });
        it("can derive path m/0'/1/2'", () => {
            const path = [slip10_1.Slip10RawIndex.hardened(0), slip10_1.Slip10RawIndex.normal(1), slip10_1.Slip10RawIndex.hardened(2)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("04466b9cc8e161e966409ca52986c584f07e9dc81f735db683c3ff6ec7b1503f"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("cbce0d719ecf7431d88e6a89fa1483e02e35092af60c042b1df2ff59fa424dca"));
        });
        it("can derive path m/0'/1/2'/2", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.normal(1),
                slip10_1.Slip10RawIndex.hardened(2),
                slip10_1.Slip10RawIndex.normal(2),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("cfb71883f01676f587d023cc53a35bc7f88f724b1f8c2892ac1275ac822a3edd"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("0f479245fb19a38a1954c5c7c0ebab2f9bdfd96a17563ef28a6a4b1a2a764ef4"));
        });
        it("can derive path m/0'/1/2'/2/1000000000", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.normal(1),
                slip10_1.Slip10RawIndex.hardened(2),
                slip10_1.Slip10RawIndex.normal(2),
                slip10_1.Slip10RawIndex.normal(1000000000),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("c783e67b921d2beb8f6b389cc646d7263b4145701dadd2161548a8b078e65e9e"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("471b76e389e528d6de6d816857e012c5455051cad6660850e58372a6c3e6e7c8"));
        });
    });
    describe("Test vector 2 for secp256k1", () => {
        // https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-2-for-secp256k1
        const seed = (0, encoding_1.fromHex)("fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542");
        it("can derive path m", () => {
            const path = [];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("60499f801b896d83179a4374aeb7822aaeaceaa0db1f85ee3e904c4defbd9689"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("4b03d6fc340455b363f51020ad3ecca4f0850280cf436c70c727923f6db46c3e"));
        });
        it("can derive path m/0", () => {
            const path = [slip10_1.Slip10RawIndex.normal(0)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("f0909affaa7ee7abe5dd4e100598d4dc53cd709d5a5c2cac40e7412f232f7c9c"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("abe74a98f6c7eabee0428f53798f0ab8aa1bd37873999041703c742f15ac7e1e"));
        });
        it("can derive path m/0/2147483647'", () => {
            const path = [slip10_1.Slip10RawIndex.normal(0), slip10_1.Slip10RawIndex.hardened(2147483647)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("be17a268474a6bb9c61e1d720cf6215e2a88c5406c4aee7b38547f585c9a37d9"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("877c779ad9687164e9c2f4f0f4ff0340814392330693ce95a58fe18fd52e6e93"));
        });
        it("can derive path m/0/2147483647'/1", () => {
            const path = [
                slip10_1.Slip10RawIndex.normal(0),
                slip10_1.Slip10RawIndex.hardened(2147483647),
                slip10_1.Slip10RawIndex.normal(1),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("f366f48f1ea9f2d1d3fe958c95ca84ea18e4c4ddb9366c336c927eb246fb38cb"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("704addf544a06e5ee4bea37098463c23613da32020d604506da8c0518e1da4b7"));
        });
        it("can derive path m/0/2147483647'/1/2147483646'", () => {
            const path = [
                slip10_1.Slip10RawIndex.normal(0),
                slip10_1.Slip10RawIndex.hardened(2147483647),
                slip10_1.Slip10RawIndex.normal(1),
                slip10_1.Slip10RawIndex.hardened(2147483646),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("637807030d55d01f9a0cb3a7839515d796bd07706386a6eddf06cc29a65a0e29"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("f1c7c871a54a804afe328b4c83a1c33b8e5ff48f5087273f04efa83b247d6a2d"));
        });
        it("can derive path m/0/2147483647'/1/2147483646'/2", () => {
            const path = [
                slip10_1.Slip10RawIndex.normal(0),
                slip10_1.Slip10RawIndex.hardened(2147483647),
                slip10_1.Slip10RawIndex.normal(1),
                slip10_1.Slip10RawIndex.hardened(2147483646),
                slip10_1.Slip10RawIndex.normal(2),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Secp256k1, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("9452b549be8cea3ecb7a84bec10dcfd94afe4d129ebfd3b3cb58eedf394ed271"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("bb7d39bdb83ecf58f2fd82b6d918341cbef428661ef01ab97c28a4842125ac23"));
        });
    });
    describe("Test vector 1 for ed25519", () => {
        // https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-1-for-ed25519
        const seed = (0, encoding_1.fromHex)("000102030405060708090a0b0c0d0e0f");
        it("can derive path m", () => {
            const path = [];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("90046a93de5380a72b5e45010748567d5ea02bbf6522f979e05c0d8d8ca9fffb"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("2b4be7f19ee27bbf30c667b642d5f4aa69fd169872f8fc3059c08ebae2eb19e7"));
        });
        it("can derive path m/0'", () => {
            const path = [slip10_1.Slip10RawIndex.hardened(0)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("8b59aa11380b624e81507a27fedda59fea6d0b779a778918a2fd3590e16e9c69"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("68e0fe46dfb67e368c75379acec591dad19df3cde26e63b93a8e704f1dade7a3"));
        });
        it("can derive path m/0'/1'", () => {
            const path = [slip10_1.Slip10RawIndex.hardened(0), slip10_1.Slip10RawIndex.hardened(1)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("a320425f77d1b5c2505a6b1b27382b37368ee640e3557c315416801243552f14"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("b1d0bad404bf35da785a64ca1ac54b2617211d2777696fbffaf208f746ae84f2"));
        });
        it("can derive path m/0'/1'/2'", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.hardened(1),
                slip10_1.Slip10RawIndex.hardened(2),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("2e69929e00b5ab250f49c3fb1c12f252de4fed2c1db88387094a0f8c4c9ccd6c"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("92a5b23c0b8a99e37d07df3fb9966917f5d06e02ddbd909c7e184371463e9fc9"));
        });
        it("can derive path m/0'/1'/2'/2'", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.hardened(1),
                slip10_1.Slip10RawIndex.hardened(2),
                slip10_1.Slip10RawIndex.hardened(2),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("8f6d87f93d750e0efccda017d662a1b31a266e4a6f5993b15f5c1f07f74dd5cc"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("30d1dc7e5fc04c31219ab25a27ae00b50f6fd66622f6e9c913253d6511d1e662"));
        });
        it("can derive path m/0'/1'/2'/2'/1000000000'", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.hardened(1),
                slip10_1.Slip10RawIndex.hardened(2),
                slip10_1.Slip10RawIndex.hardened(2),
                slip10_1.Slip10RawIndex.hardened(1000000000),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("68789923a0cac2cd5a29172a475fe9e0fb14cd6adb5ad98a3fa70333e7afa230"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("8f94d394a8e8fd6b1bc2f3f49f5c47e385281d5c17e65324b0f62483e37e8793"));
        });
    });
    describe("Test vector 2 for ed25519", () => {
        // https://github.com/satoshilabs/slips/blob/master/slip-0010.md#test-vector-2-for-ed25519
        const seed = (0, encoding_1.fromHex)("fffcf9f6f3f0edeae7e4e1dedbd8d5d2cfccc9c6c3c0bdbab7b4b1aeaba8a5a29f9c999693908d8a8784817e7b7875726f6c696663605d5a5754514e4b484542");
        it("can derive path m", () => {
            const path = [];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("ef70a74db9c3a5af931b5fe73ed8e1a53464133654fd55e7a66f8570b8e33c3b"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("171cb88b1b3c1db25add599712e36245d75bc65a1a5c9e18d76f9f2b1eab4012"));
        });
        it("can derive path m/0'", () => {
            const path = [slip10_1.Slip10RawIndex.hardened(0)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("0b78a3226f915c082bf118f83618a618ab6dec793752624cbeb622acb562862d"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("1559eb2bbec5790b0c65d8693e4d0875b1747f4970ae8b650486ed7470845635"));
        });
        it("can derive path m/0'/2147483647'", () => {
            const path = [slip10_1.Slip10RawIndex.hardened(0), slip10_1.Slip10RawIndex.hardened(2147483647)];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("138f0b2551bcafeca6ff2aa88ba8ed0ed8de070841f0c4ef0165df8181eaad7f"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("ea4f5bfe8694d8bb74b7b59404632fd5968b774ed545e810de9c32a4fb4192f4"));
        });
        it("can derive path m/0'/2147483647'/1'", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.hardened(2147483647),
                slip10_1.Slip10RawIndex.hardened(1),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("73bd9fff1cfbde33a1b846c27085f711c0fe2d66fd32e139d3ebc28e5a4a6b90"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("3757c7577170179c7868353ada796c839135b3d30554bbb74a4b1e4a5a58505c"));
        });
        it("can derive path m/0'/2147483647'/1'/2147483646'", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.hardened(2147483647),
                slip10_1.Slip10RawIndex.hardened(1),
                slip10_1.Slip10RawIndex.hardened(2147483646),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("0902fe8a29f9140480a00ef244bd183e8a13288e4412d8389d140aac1794825a"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("5837736c89570de861ebc173b1086da4f505d4adb387c6a1b1342d5e4ac9ec72"));
        });
        it("can derive path m/0'/2147483647'/1'/2147483646'/2'", () => {
            const path = [
                slip10_1.Slip10RawIndex.hardened(0),
                slip10_1.Slip10RawIndex.hardened(2147483647),
                slip10_1.Slip10RawIndex.hardened(1),
                slip10_1.Slip10RawIndex.hardened(2147483646),
                slip10_1.Slip10RawIndex.hardened(2),
            ];
            const derived = slip10_1.Slip10.derivePath(slip10_1.Slip10Curve.Ed25519, seed, path);
            expect(derived.chainCode).toEqual((0, encoding_1.fromHex)("5d70af781f3a37b829f0d060924d5e960bdc02e85423494afc0b1a41bbe196d4"));
            expect(derived.privkey).toEqual((0, encoding_1.fromHex)("551d333177df541ad876a60ea71f00447931c0a9da16f227c11ea080d7391b8d"));
        });
    });
    describe("pathToString", () => {
        it("works for no component", () => {
            // See https://github.com/bitcoin/bips/blob/master/bip-0032/derivation.png from BIP32
            expect((0, slip10_1.pathToString)([])).toEqual("m");
        });
        it("works for normal components", () => {
            const one = slip10_1.Slip10RawIndex.normal(1);
            expect((0, slip10_1.pathToString)([one])).toEqual("m/1");
            expect((0, slip10_1.pathToString)([one, one])).toEqual("m/1/1");
            expect((0, slip10_1.pathToString)([one, one, one])).toEqual("m/1/1/1");
            const min = slip10_1.Slip10RawIndex.normal(0);
            expect((0, slip10_1.pathToString)([min])).toEqual("m/0");
            const max = slip10_1.Slip10RawIndex.normal(2 ** 31 - 1);
            expect((0, slip10_1.pathToString)([max])).toEqual("m/2147483647");
        });
        it("works for hardened components", () => {
            const one = slip10_1.Slip10RawIndex.hardened(1);
            expect((0, slip10_1.pathToString)([one])).toEqual("m/1'");
            expect((0, slip10_1.pathToString)([one, one])).toEqual("m/1'/1'");
            expect((0, slip10_1.pathToString)([one, one, one])).toEqual("m/1'/1'/1'");
            const min = slip10_1.Slip10RawIndex.hardened(0);
            expect((0, slip10_1.pathToString)([min])).toEqual("m/0'");
            const max = slip10_1.Slip10RawIndex.hardened(2 ** 31 - 1);
            expect((0, slip10_1.pathToString)([max])).toEqual("m/2147483647'");
        });
        it("works for mixed components", () => {
            const one = slip10_1.Slip10RawIndex.normal(1);
            const two = slip10_1.Slip10RawIndex.hardened(2);
            expect((0, slip10_1.pathToString)([one, two, two, one])).toEqual("m/1/2'/2'/1");
        });
    });
    describe("stringToPath", () => {
        it("works for no component", () => {
            // See https://github.com/bitcoin/bips/blob/master/bip-0032/derivation.png from BIP32
            expect((0, slip10_1.stringToPath)("m")).toEqual([]);
        });
        it("throws for broken start", () => {
            expect(() => (0, slip10_1.stringToPath)("")).toThrowError(/must start with 'm'/);
            expect(() => (0, slip10_1.stringToPath)("M")).toThrowError(/must start with 'm'/);
            expect(() => (0, slip10_1.stringToPath)("/1/1")).toThrowError(/must start with 'm'/);
        });
        it("works for normal components", () => {
            const one = slip10_1.Slip10RawIndex.normal(1);
            expect((0, slip10_1.stringToPath)("m/1")).toEqual([one]);
            expect((0, slip10_1.stringToPath)("m/1/1")).toEqual([one, one]);
            expect((0, slip10_1.stringToPath)("m/1/1/1")).toEqual([one, one, one]);
            const min = slip10_1.Slip10RawIndex.normal(0);
            expect((0, slip10_1.stringToPath)("m/0")).toEqual([min]);
            const max = slip10_1.Slip10RawIndex.normal(2 ** 31 - 1);
            expect((0, slip10_1.stringToPath)("m/2147483647")).toEqual([max]);
        });
        it("errors for syntax error in component", () => {
            expect(() => (0, slip10_1.stringToPath)("m/ 1/1/1")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)("m/-1/1/1")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)("m//1/1")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)("m/1*/1/1")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)("m/1/1/1 ")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)("m/1''/1/1")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)("m/1 '/1/1")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)("m/'/1/1")).toThrowError(/syntax error/i);
            expect(() => (0, slip10_1.stringToPath)('m/1"/1/1')).toThrowError(/syntax error/i);
        });
        it("errors for value too high", () => {
            expect(() => (0, slip10_1.stringToPath)("m/2147483648/1/1")).toThrowError(/value too high/i);
            expect(() => (0, slip10_1.stringToPath)("m/1/9007199254740991/1")).toThrowError(/value too high/i);
            expect(() => (0, slip10_1.stringToPath)("m/1/1/9007199254740992")).toThrowError(/not in int53 range/i);
        });
        it("works for hardened components", () => {
            const one = slip10_1.Slip10RawIndex.hardened(1);
            expect((0, slip10_1.stringToPath)("m/1'")).toEqual([one]);
            expect((0, slip10_1.stringToPath)("m/1'/1'")).toEqual([one, one]);
            expect((0, slip10_1.stringToPath)("m/1'/1'/1'")).toEqual([one, one, one]);
            const min = slip10_1.Slip10RawIndex.hardened(0);
            expect((0, slip10_1.stringToPath)("m/0'")).toEqual([min]);
            const max = slip10_1.Slip10RawIndex.hardened(2 ** 31 - 1);
            expect((0, slip10_1.stringToPath)("m/2147483647'")).toEqual([max]);
        });
        it("works for mixed components", () => {
            const one = slip10_1.Slip10RawIndex.normal(1);
            const two = slip10_1.Slip10RawIndex.hardened(2);
            expect((0, slip10_1.stringToPath)("m/1/2'/2'/1")).toEqual([one, two, two, one]);
        });
    });
});
//# sourceMappingURL=slip10.spec.js.map