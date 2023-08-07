declare function toWords(bytes: ArrayLike<number>): number[];
declare function fromWordsUnsafe(words: ArrayLike<number>): number[] | undefined;
declare function fromWords(words: ArrayLike<number>): number[];
export declare const bech32: BechLib;
export declare const bech32m: BechLib;
export interface Decoded {
    prefix: string;
    words: number[];
}
export interface BechLib {
    decodeUnsafe: (str: string, LIMIT?: number | undefined) => Decoded | undefined;
    decode: (str: string, LIMIT?: number | undefined) => Decoded;
    encode: (prefix: string, words: ArrayLike<number>, LIMIT?: number | undefined) => string;
    toWords: typeof toWords;
    fromWordsUnsafe: typeof fromWordsUnsafe;
    fromWords: typeof fromWords;
}
export {};
