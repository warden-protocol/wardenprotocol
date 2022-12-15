"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const bip39_1 = require("./bip39");
const sha_1 = require("./sha");
const bip39_json_1 = __importDefault(require("./testdata/bip39.json"));
const bip39_wordlists_json_1 = __importDefault(require("./testdata/bip39_wordlists.json"));
describe("entropyToMnemonic", () => {
    it("works", () => {
        // From https://iancoleman.io/bip39/
        expect((0, bip39_1.entropyToMnemonic)((0, encoding_1.fromHex)("a323224e6b13d31942509dc4e2e579be3d5bb7f2"))).toEqual("permit boil near stomach diamond million announce beauty shaft blame fury ladder stick swim slab");
    });
    it("works for all the test vectors", () => {
        // Test vectors from https://github.com/trezor/python-mnemonic/blob/b502451a33a440783926e04428115e0bed87d01f/vectors.json
        // plus similar vectors generated for the missing lengths 15 and 21 words
        const { "12": vec12, "15": vec15, "18": vec18, "21": vec21, "24": vec24 } = bip39_json_1.default.encoding;
        for (const vectors of [vec12, vec15, vec18, vec21, vec24]) {
            for (const { entropy, mnemonic } of vectors) {
                expect((0, bip39_1.entropyToMnemonic)((0, encoding_1.fromHex)(entropy)).toString()).toEqual(mnemonic);
            }
        }
    });
});
describe("mnemonicToEntropy", () => {
    it("works", () => {
        // From https://iancoleman.io/bip39/
        expect((0, bip39_1.mnemonicToEntropy)("permit boil near stomach diamond million announce beauty shaft blame fury ladder stick swim slab")).toEqual((0, encoding_1.fromHex)("a323224e6b13d31942509dc4e2e579be3d5bb7f2"));
    });
    it("works for all the test vectors", () => {
        const { "12": vec12, "15": vec15, "18": vec18, "21": vec21, "24": vec24 } = bip39_json_1.default.encoding;
        for (const vectors of [vec12, vec15, vec18, vec21, vec24]) {
            for (const { entropy, mnemonic } of vectors) {
                expect((0, bip39_1.mnemonicToEntropy)(mnemonic)).toEqual((0, encoding_1.fromHex)(entropy));
            }
        }
    });
});
describe("Bip39", () => {
    describe("encode", () => {
        it("can encode to mnemonic", () => {
            // Test vectors from https://github.com/trezor/python-mnemonic/blob/b502451a33a440783926e04428115e0bed87d01f/vectors.json
            // plus similar vectors generated for the missing lengths 15 and 21 words
            const { "12": vec12, "15": vec15, "18": vec18, "21": vec21, "24": vec24 } = bip39_json_1.default.encoding;
            for (const vectors of [vec12, vec15, vec18, vec21, vec24]) {
                for (const { entropy, mnemonic } of vectors) {
                    expect(bip39_1.Bip39.encode((0, encoding_1.fromHex)(entropy)).toString()).toEqual(mnemonic);
                }
            }
        });
        it("throws for invalid input", () => {
            // invalid input length
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)(""))).toThrowError(/invalid input length/);
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)("00"))).toThrowError(/invalid input length/);
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)("000000000000000000000000000000"))).toThrowError(/invalid input length/);
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)("0000000000000000000000000000000000"))).toThrowError(/invalid input length/);
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)("0000000000000000000000000000000000000000000000"))).toThrowError(/invalid input length/);
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)("00000000000000000000000000000000000000000000000000"))).toThrowError(/invalid input length/);
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)("00000000000000000000000000000000000000000000000000000000000000"))).toThrowError(/invalid input length/);
            expect(() => bip39_1.Bip39.encode((0, encoding_1.fromHex)("000000000000000000000000000000000000000000000000000000000000000000"))).toThrowError(/invalid input length/);
        });
    });
    describe("decode", () => {
        it("can decode from mnemonic", () => {
            const { "12": vec12, "15": vec15, "18": vec18, "21": vec21, "24": vec24 } = bip39_json_1.default.encoding;
            for (const vectors of [vec12, vec15, vec18, vec21, vec24]) {
                for (const { entropy, mnemonic } of vectors) {
                    expect(bip39_1.Bip39.decode(new bip39_1.EnglishMnemonic(mnemonic))).toEqual((0, encoding_1.fromHex)(entropy));
                }
            }
        });
    });
    describe("mnemonicToSeed", () => {
        it("can calculate seed from mnemonic (trezor test vectors)", async () => {
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"), "TREZOR")).toEqual((0, encoding_1.fromHex)("c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("legal winner thank year wave sausage worth useful legal winner thank yellow"), "TREZOR")).toEqual((0, encoding_1.fromHex)("2e8905819b8723fe2c1d161860e5ee1830318dbf49a83bd451cfb8440c28bd6fa457fe1296106559a3c80937a1c1069be3a3a5bd381ee6260e8d9739fce1f607"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("letter advice cage absurd amount doctor acoustic avoid letter advice cage above"), "TREZOR")).toEqual((0, encoding_1.fromHex)("d71de856f81a8acc65e6fc851a38d4d7ec216fd0796d0a6827a3ad6ed5511a30fa280f12eb2e47ed2ac03b5c462a0358d18d69fe4f985ec81778c1b370b652a8"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong"), "TREZOR")).toEqual((0, encoding_1.fromHex)("ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent"), "TREZOR")).toEqual((0, encoding_1.fromHex)("035895f2f481b1b0f01fcf8c289c794660b289981a78f8106447707fdd9666ca06da5a9a565181599b79f53b844d8a71dd9f439c52a3d7b3e8a79c906ac845fa"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will"), "TREZOR")).toEqual((0, encoding_1.fromHex)("f2b94508732bcbacbcc020faefecfc89feafa6649a5491b8c952cede496c214a0c7b3c392d168748f2d4a612bada0753b52a1c7ac53c1e93abd5c6320b9e95dd"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always"), "TREZOR")).toEqual((0, encoding_1.fromHex)("107d7c02a5aa6f38c58083ff74f04c607c2d2c0ecc55501dadd72d025b751bc27fe913ffb796f841c49b1d33b610cf0e91d3aa239027f5e99fe4ce9e5088cd65"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when"), "TREZOR")).toEqual((0, encoding_1.fromHex)("0cd6e5d827bb62eb8fc1e262254223817fd068a74b5b449cc2f667c3f1f985a76379b43348d952e2265b4cd129090758b3e3c2c49103b5051aac2eaeb890a528"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art"), "TREZOR")).toEqual((0, encoding_1.fromHex)("bda85446c68413707090a52022edd26a1c9462295029f2e60cd7c4f2bbd3097170af7a4d73245cafa9c3cca8d561a7c3de6f5d4a10be8ed2a5e608d68f92fcc8"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title"), "TREZOR")).toEqual((0, encoding_1.fromHex)("bc09fca1804f7e69da93c2f2028eb238c227f2e9dda30cd63699232578480a4021b146ad717fbb7e451ce9eb835f43620bf5c514db0f8add49f5d121449d3e87"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless"), "TREZOR")).toEqual((0, encoding_1.fromHex)("c0c519bd0e91a2ed54357d9d1ebef6f5af218a153624cf4f2da911a0ed8f7a09e2ef61af0aca007096df430022f7a2b6fb91661a9589097069720d015e4e982f"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote"), "TREZOR")).toEqual((0, encoding_1.fromHex)("dd48c104698c30cfe2b6142103248622fb7bb0ff692eebb00089b32d22484e1613912f0a5b694407be899ffd31ed3992c456cdf60f5d4564b8ba3f05a69890ad"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("ozone drill grab fiber curtain grace pudding thank cruise elder eight picnic"), "TREZOR")).toEqual((0, encoding_1.fromHex)("274ddc525802f7c828d8ef7ddbcdc5304e87ac3535913611fbbfa986d0c9e5476c91689f9c8a54fd55bd38606aa6a8595ad213d4c9c9f9aca3fb217069a41028"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("gravity machine north sort system female filter attitude volume fold club stay feature office ecology stable narrow fog"), "TREZOR")).toEqual((0, encoding_1.fromHex)("628c3827a8823298ee685db84f55caa34b5cc195a778e52d45f59bcf75aba68e4d7590e101dc414bc1bbd5737666fbbef35d1f1903953b66624f910feef245ac"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("hamster diagram private dutch cause delay private meat slide toddler razor book happy fancy gospel tennis maple dilemma loan word shrug inflict delay length"), "TREZOR")).toEqual((0, encoding_1.fromHex)("64c87cde7e12ecf6704ab95bb1408bef047c22db4cc7491c4271d170a1b213d20b385bc1588d9c7b38f1b39d415665b8a9030c9ec653d75e65f847d8fc1fc440"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("scheme spot photo card baby mountain device kick cradle pact join borrow"), "TREZOR")).toEqual((0, encoding_1.fromHex)("ea725895aaae8d4c1cf682c1bfd2d358d52ed9f0f0591131b559e2724bb234fca05aa9c02c57407e04ee9dc3b454aa63fbff483a8b11de949624b9f1831a9612"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("horn tenant knee talent sponsor spell gate clip pulse soap slush warm silver nephew swap uncle crack brave"), "TREZOR")).toEqual((0, encoding_1.fromHex)("fd579828af3da1d32544ce4db5c73d53fc8acc4ddb1e3b251a31179cdb71e853c56d2fcb11aed39898ce6c34b10b5382772db8796e52837b54468aeb312cfc3d"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("panda eyebrow bullet gorilla call smoke muffin taste mesh discover soft ostrich alcohol speed nation flash devote level hobby quick inner drive ghost inside"), "TREZOR")).toEqual((0, encoding_1.fromHex)("72be8e052fc4919d2adf28d5306b5474b0069df35b02303de8c1729c9538dbb6fc2d731d5f832193cd9fb6aeecbc469594a70e3dd50811b5067f3b88b28c3e8d"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("cat swing flag economy stadium alone churn speed unique patch report train"), "TREZOR")).toEqual((0, encoding_1.fromHex)("deb5f45449e615feff5640f2e49f933ff51895de3b4381832b3139941c57b59205a42480c52175b6efcffaa58a2503887c1e8b363a707256bdd2b587b46541f5"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("light rule cinnamon wrap drastic word pride squirrel upgrade then income fatal apart sustain crack supply proud access"), "TREZOR")).toEqual((0, encoding_1.fromHex)("4cbdff1ca2db800fd61cae72a57475fdc6bab03e441fd63f96dabd1f183ef5b782925f00105f318309a7e9c3ea6967c7801e46c8a58082674c860a37b93eda02"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("all hour make first leader extend hole alien behind guard gospel lava path output census museum junior mass reopen famous sing advance salt reform"), "TREZOR")).toEqual((0, encoding_1.fromHex)("26e975ec644423f4a4c4f4215ef09b4bd7ef924e85d1d17c4cf3f136c2863cf6df0a475045652c57eb5fb41513ca2a2d67722b77e954b4b3fc11f7590449191d"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("vessel ladder alter error federal sibling chat ability sun glass valve picture"), "TREZOR")).toEqual((0, encoding_1.fromHex)("2aaa9242daafcee6aa9d7269f17d4efe271e1b9a529178d7dc139cd18747090bf9d60295d0ce74309a78852a9caadf0af48aae1c6253839624076224374bc63f"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump"), "TREZOR")).toEqual((0, encoding_1.fromHex)("7b4a10be9d98e6cba265566db7f136718e1398c71cb581e1b2f464cac1ceedf4f3e274dc270003c670ad8d02c4558b2f8e39edea2775c9e232c7cb798b069e88"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold"), "TREZOR")).toEqual((0, encoding_1.fromHex)("01f5bced59dec48e362f2c45b5de68b9fd6c92c6634f44d6d40aab69056506f0e35524a518034ddc1192e1dacd32c1ed3eaa3c3b131c88ed8e7e54c49a5d0998"));
        });
        it("can calculate seed from mnemonic (no password)", async () => {
            // custom test vectors using
            // $ git clone https://github.com/trezor/python-mnemonic.git && cd python-mnemonic
            // $ python3 -m venv venv
            // $ source venv/bin/activate
            // $ pip install wheel bip32utils
            // $ pip install -r requirements.txt
            // patch generate_vectors.py to your needs
            // $ python generate_vectors.py
            // empty password
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("robust pipe raise illness symptom crowd trip will slow assault recipe oven"), "")).toEqual((0, encoding_1.fromHex)("5539eed11e1096e9d52f69f15ad3d7c6547a40a3865b9517dbcbb03c31f231900622f58616d64d2d1cc0440f31d67fb0b2699a5fc885f796c746e0f844477093"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("pair ethics august street tornado spare present under capital raise cross current main craft stone clutch tray all"), "")).toEqual((0, encoding_1.fromHex)("1272467e954cec4e0ad720002d037a3aaf795a57ffbeea6aaa0c242d410eb52050292447aa2c68470a07ecc80171edfa9e027793265047be3128d94e867a4f99"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("allow finger front connect strategy purchase journey distance trouble guitar honey alpha giraffe canal junk vintage chronic blade gate custom soap flip first mix"), "")).toEqual((0, encoding_1.fromHex)("476a41ac016b5bdf9f114456929975a036ae326e2efdca441ac5a0949ef89ab9246dc9e49a5d2d64d1926eb9dbe17576cb010471c2a821b216202acdf3d7a27b"));
            // no password
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("robust pipe raise illness symptom crowd trip will slow assault recipe oven"))).toEqual((0, encoding_1.fromHex)("5539eed11e1096e9d52f69f15ad3d7c6547a40a3865b9517dbcbb03c31f231900622f58616d64d2d1cc0440f31d67fb0b2699a5fc885f796c746e0f844477093"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("pair ethics august street tornado spare present under capital raise cross current main craft stone clutch tray all"))).toEqual((0, encoding_1.fromHex)("1272467e954cec4e0ad720002d037a3aaf795a57ffbeea6aaa0c242d410eb52050292447aa2c68470a07ecc80171edfa9e027793265047be3128d94e867a4f99"));
            expect(await bip39_1.Bip39.mnemonicToSeed(new bip39_1.EnglishMnemonic("allow finger front connect strategy purchase journey distance trouble guitar honey alpha giraffe canal junk vintage chronic blade gate custom soap flip first mix"))).toEqual((0, encoding_1.fromHex)("476a41ac016b5bdf9f114456929975a036ae326e2efdca441ac5a0949ef89ab9246dc9e49a5d2d64d1926eb9dbe17576cb010471c2a821b216202acdf3d7a27b"));
        });
    });
});
describe("EnglishMnemonic", () => {
    describe("wordlist", () => {
        it("matches the words from the bitcoin/bips/bip-0039 spec", () => {
            const lineFeed = 0x0a;
            const bip39EnglishTxt = (0, encoding_1.fromBase64)(bip39_wordlists_json_1.default.english);
            // Ensure we loaded the correct english.txt from https://github.com/bitcoin/bips/tree/master/bip-0039
            const checksum = (0, sha_1.sha256)(bip39EnglishTxt);
            expect(checksum).toEqual((0, encoding_1.fromHex)("2f5eed53a4727b4bf8880d8f3f199efc90e58503646d9ff8eff3a2ed3b24dbda"));
            const wordsFromSpec = [];
            let start = 0; // the start cursor marks the first byte of the word
            let end = 0; // the end cursor marks the line feed byte
            while (end < bip39EnglishTxt.length - 1) {
                end = start;
                while (bip39EnglishTxt[end] !== lineFeed)
                    end++;
                const slice = bip39EnglishTxt.slice(start, end);
                wordsFromSpec.push((0, encoding_1.fromAscii)(slice));
                start = end + 1;
            }
            expect(bip39_1.EnglishMnemonic.wordlist).toEqual(wordsFromSpec);
        });
    });
    it("works for valid inputs", () => {
        expect(() => {
            new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
            new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon address");
            new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent");
            new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon admit");
            new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art");
        }).not.toThrow();
    });
    it("rejects invalid whitespacing", () => {
        // extra space (leading, middle, trailing)
        expect(() => new bip39_1.EnglishMnemonic(" abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon  abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about ")).toThrowError(/invalid mnemonic format/i);
        // newline, tab
        expect(() => new bip39_1.EnglishMnemonic("abandon\nabandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon\tabandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
    });
    it("rejects disallowed letters", () => {
        // Disallowed letters in words (capital, number, special char)
        expect(() => new bip39_1.EnglishMnemonic("Abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon Abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("route66 abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon route66 abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("lötkolben abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon lötkolben abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid mnemonic format/i);
    });
    it("word counts other than 12, 15, 18, 21, 24", () => {
        // too few and too many words (11, 13, 17, 19, 23, 25)
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid word count(.*)got: 11/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about")).toThrowError(/invalid word count(.*)got: 13/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent")).toThrowError(/invalid word count(.*)got: 17/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent")).toThrowError(/invalid word count(.*)got: 19/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art")).toThrowError(/invalid word count(.*)got: 23/i);
        expect(() => new bip39_1.EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art")).toThrowError(/invalid word count(.*)got: 25/i);
    });
    it("rejects invalid checksums", () => {
        // 12x, 15x, 18x, 21x, 24x "zoo"
        expect(() => new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo")).toThrowError(/invalid mnemonic checksum/i);
        expect(() => new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo")).toThrowError(/invalid mnemonic checksum/i);
        expect(() => new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo")).toThrowError(/invalid mnemonic checksum/i);
        expect(() => new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo")).toThrowError(/invalid mnemonic checksum/i);
        expect(() => new bip39_1.EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo")).toThrowError(/invalid mnemonic checksum/i);
    });
    it("rejects valid mnemonics of other languages", () => {
        // valid Spanish and Italian bip39 mnemonics
        expect(() => new bip39_1.EnglishMnemonic("humo odio oriente colina taco fingir salto geranio glaciar academia suave vigor")).toThrowError(/contains invalid word/i);
        expect(() => new bip39_1.EnglishMnemonic("yema folleto tos llave obtener natural fruta deseo laico sopa novato lazo imponer afinar vena hoja zarza cama")).toThrowError(/contains invalid word/i);
        expect(() => new bip39_1.EnglishMnemonic("burla plaza arroz ronda pregunta vacuna veloz boina retiro exento prensa tortuga cabeza pilar anual molino molde fiesta masivo jefe leve fatiga clase plomo")).toThrowError(/contains invalid word/i);
        expect(() => new bip39_1.EnglishMnemonic("braccio trincea armonia emiro svedese lepre stridulo metallo baldo rasente potassio rilassato")).toThrowError(/contains invalid word/i);
        expect(() => new bip39_1.EnglishMnemonic("riparato arrosto globulo singolo bozzolo roba pirolisi ultimato padrone munto leggero avanzato monetario guanto lorenzo latino inoltrare modulo")).toThrowError(/contains invalid word/i);
        expect(() => new bip39_1.EnglishMnemonic("promessa mercurio spessore snodo trave risata mecenate vichingo ceto orecchino vissuto risultato canino scarso futile fune epilogo uovo inedito apatico folata egoismo rifugio coma")).toThrowError(/contains invalid word/i);
    });
    describe("toString", () => {
        it("works", () => {
            const original = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";
            const mnemonic = new bip39_1.EnglishMnemonic(original);
            expect(mnemonic.toString()).toEqual(original);
        });
    });
});
//# sourceMappingURL=bip39.spec.js.map