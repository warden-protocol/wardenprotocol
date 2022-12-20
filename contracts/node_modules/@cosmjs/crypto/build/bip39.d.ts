export declare function entropyToMnemonic(entropy: Uint8Array): string;
export declare function mnemonicToEntropy(mnemonic: string): Uint8Array;
export declare class EnglishMnemonic {
    static readonly wordlist: readonly string[];
    private static readonly mnemonicMatcher;
    private readonly data;
    constructor(mnemonic: string);
    toString(): string;
}
export declare class Bip39 {
    /**
     * Encodes raw entropy of length 16, 20, 24, 28 or 32 bytes as an English mnemonic between 12 and 24 words.
     *
     * | Entropy            | Words |
     * |--------------------|-------|
     * | 128 bit (16 bytes) |    12 |
     * | 160 bit (20 bytes) |    15 |
     * | 192 bit (24 bytes) |    18 |
     * | 224 bit (28 bytes) |    21 |
     * | 256 bit (32 bytes) |    24 |
     *
     *
     * @see https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki#generating-the-mnemonic
     * @param entropy The entropy to be encoded. This must be cryptographically secure.
     */
    static encode(entropy: Uint8Array): EnglishMnemonic;
    static decode(mnemonic: EnglishMnemonic): Uint8Array;
    static mnemonicToSeed(mnemonic: EnglishMnemonic, password?: string): Promise<Uint8Array>;
}
