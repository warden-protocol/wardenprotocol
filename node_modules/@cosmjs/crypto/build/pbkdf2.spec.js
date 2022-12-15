"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encoding_1 = require("@cosmjs/encoding");
const pbkdf2_1 = require("./pbkdf2");
describe("pbkdf2", () => {
    // https://github.com/randombit/botan/blob/master/src/tests/data/pbkdf/pbkdf2.vec#L70-L74
    const botanTest = {
        secret: (0, encoding_1.toAscii)("xyz"),
        salt: (0, encoding_1.fromHex)("0001020304050607"),
        iterations: 10000,
        keylen: 48,
        expected: (0, encoding_1.fromHex)("DAF8A734327745EB63D19054DBD4018A682CEF11086A1BFB63FDBC16158C2F8B0742802F36AEF1B1DF92ACCBEA5D31A5"),
    };
    // https://github.com/brycx/Test-Vector-Generation/blob/f88d152db/PBKDF2/pbkdf2-hmac-sha2-test-vectors.md
    const brycxTests = [
        // Test Case 1
        {
            secret: (0, encoding_1.toUtf8)("password"),
            salt: (0, encoding_1.toUtf8)("salt"),
            iterations: 1,
            keylen: 20,
            expected: (0, encoding_1.fromHex)("867f70cf1ade02cff3752599a3a53dc4af34c7a6"),
        },
        // Test Case 2
        {
            secret: (0, encoding_1.toUtf8)("password"),
            salt: (0, encoding_1.toUtf8)("salt"),
            iterations: 2,
            keylen: 20,
            expected: (0, encoding_1.fromHex)("e1d9c16aa681708a45f5c7c4e215ceb66e011a2e"),
        },
        // Test Case 3
        {
            secret: (0, encoding_1.toUtf8)("password"),
            salt: (0, encoding_1.toUtf8)("salt"),
            iterations: 4096,
            keylen: 20,
            expected: (0, encoding_1.fromHex)("d197b1b33db0143e018b12f3d1d1479e6cdebdcc"),
        },
        // Test Case 4 (disabled by default because long running)
        // {
        //   secret: toUtf8("password"),
        //   salt: toUtf8("salt"),
        //   iterations: 16777216,
        //   keylen: 20,
        //   expected: fromHex("6180a3ceabab45cc3964112c811e0131bca93a35"),
        // },
        // Test Case 5
        {
            secret: (0, encoding_1.toUtf8)("passwordPASSWORDpassword"),
            salt: (0, encoding_1.toUtf8)("saltSALTsaltSALTsaltSALTsaltSALTsalt"),
            iterations: 4096,
            keylen: 25,
            expected: (0, encoding_1.fromHex)("8c0511f4c6e597c6ac6315d8f0362e225f3c501495ba23b868"),
        },
        // Test Case 6
        {
            secret: (0, encoding_1.toUtf8)("pass\0word"),
            salt: (0, encoding_1.toUtf8)("sa\0lt"),
            iterations: 4096,
            keylen: 16,
            expected: (0, encoding_1.fromHex)("9d9e9c4cd21fe4be24d5b8244c759665"),
        },
        // Test Case 7
        {
            secret: (0, encoding_1.toUtf8)("passwd"),
            salt: (0, encoding_1.toUtf8)("salt"),
            iterations: 1,
            keylen: 128,
            expected: (0, encoding_1.fromHex)("c74319d99499fc3e9013acff597c23c5baf0a0bec5634c46b8352b793e324723d55caa76b2b25c43402dcfdc06cdcf66f95b7d0429420b39520006749c51a04ef3eb99e576617395a178ba33214793e48045132928a9e9bf2661769fdc668f31798597aaf6da70dd996a81019726084d70f152baed8aafe2227c07636c6ddece"),
        },
        // Test Case 8
        {
            secret: (0, encoding_1.toUtf8)("Password"),
            salt: (0, encoding_1.toUtf8)("NaCl"),
            iterations: 80000,
            keylen: 128,
            expected: (0, encoding_1.fromHex)("e6337d6fbeb645c794d4a9b5b75b7b30dac9ac50376a91df1f4460f6060d5addb2c1fd1f84409abacc67de7eb4056e6bb06c2d82c3ef4ccd1bded0f675ed97c65c33d39f81248454327aa6d03fd049fc5cbb2b5e6dac08e8ace996cdc960b1bd4530b7e754773d75f67a733fdb99baf6470e42ffcb753c15c352d4800fb6f9d6"),
        },
        // Test Case 9
        {
            secret: (0, encoding_1.toUtf8)("Password"),
            salt: (0, encoding_1.toUtf8)("sa\0lt"),
            iterations: 4096,
            keylen: 256,
            expected: (0, encoding_1.fromHex)("10176fb32cb98cd7bb31e2bb5c8f6e425c103333a2e496058e3fd2bd88f657485c89ef92daa0668316bc23ebd1ef88f6dd14157b2320b5d54b5f26377c5dc279b1dcdec044bd6f91b166917c80e1e99ef861b1d2c7bce1b961178125fb86867f6db489a2eae0022e7bc9cf421f044319fac765d70cb89b45c214590e2ffb2c2b565ab3b9d07571fde0027b1dc57f8fd25afa842c1056dd459af4074d7510a0c020b914a5e202445d4d3f151070589dd6a2554fc506018c4f001df6239643dc86771286ae4910769d8385531bba57544d63c3640b90c98f1445ebdd129475e02086b600f0beb5b05cc6ca9b3633b452b7dad634e9336f56ec4c3ac0b4fe54ced8"),
        },
    ];
    describe("pbkdf2Sha512", () => {
        it("works", async () => {
            {
                const { secret, salt, iterations, keylen, expected } = botanTest;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512)(secret, salt, iterations, keylen);
                expect(hash).toEqual(expected);
            }
            for (const [index, test] of brycxTests.entries()) {
                const { secret, salt, iterations, keylen, expected } = test;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512)(secret, salt, iterations, keylen);
                expect(hash).withContext(`brycx tests index ${index}`).toEqual(expected);
            }
        });
    });
    describe("pbkdf2Sha512Subtle", () => {
        it("works", async () => {
            const subtle = await (0, pbkdf2_1.getSubtle)();
            if (!subtle)
                pending("Subtle is not available in this environment");
            {
                const { secret, salt, iterations, keylen, expected } = botanTest;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512Subtle)(subtle, secret, salt, iterations, keylen);
                expect(hash).toEqual(expected);
            }
            for (const [index, test] of brycxTests.entries()) {
                const { secret, salt, iterations, keylen, expected } = test;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512Subtle)(subtle, secret, salt, iterations, keylen);
                expect(hash).withContext(`brycx tests index ${index}`).toEqual(expected);
            }
        });
    });
    describe("pbkdf2Sha512Crypto", () => {
        it("works", async () => {
            const crypto = await (0, pbkdf2_1.getCryptoModule)();
            if (!crypto)
                pending("The crypto module is not available in this environment");
            {
                const { secret, salt, iterations, keylen, expected } = botanTest;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512Crypto)(crypto, secret, salt, iterations, keylen);
                expect(hash).toEqual(expected);
            }
            for (const [index, test] of brycxTests.entries()) {
                const { secret, salt, iterations, keylen, expected } = test;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512Crypto)(crypto, secret, salt, iterations, keylen);
                expect(hash).withContext(`brycx tests index ${index}`).toEqual(expected);
            }
        });
    });
    describe("pbkdf2Sha512Noble", () => {
        it("works", async () => {
            {
                const { secret, salt, iterations, keylen, expected } = botanTest;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512Noble)(secret, salt, iterations, keylen);
                expect(hash).toEqual(expected);
            }
            for (const [index, test] of brycxTests.entries()) {
                const { secret, salt, iterations, keylen, expected } = test;
                const hash = await (0, pbkdf2_1.pbkdf2Sha512Noble)(secret, salt, iterations, keylen);
                expect(hash).withContext(`brycx tests index ${index}`).toEqual(expected);
            }
        }, 120000);
    });
});
//# sourceMappingURL=pbkdf2.spec.js.map