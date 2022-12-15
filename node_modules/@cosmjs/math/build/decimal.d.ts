import { Uint32, Uint53, Uint64 } from "./integers";
/**
 * A type for arbitrary precision, non-negative decimals.
 *
 * Instances of this class are immutable.
 */
export declare class Decimal {
    static fromUserInput(input: string, fractionalDigits: number): Decimal;
    static fromAtomics(atomics: string, fractionalDigits: number): Decimal;
    /**
     * Creates a Decimal with value 0.0 and the given number of fractial digits.
     *
     * Fractional digits are not relevant for the value but needed to be able
     * to perform arithmetic operations with other decimals.
     */
    static zero(fractionalDigits: number): Decimal;
    /**
     * Creates a Decimal with value 1.0 and the given number of fractial digits.
     *
     * Fractional digits are not relevant for the value but needed to be able
     * to perform arithmetic operations with other decimals.
     */
    static one(fractionalDigits: number): Decimal;
    private static verifyFractionalDigits;
    static compare(a: Decimal, b: Decimal): number;
    get atomics(): string;
    get fractionalDigits(): number;
    private readonly data;
    private constructor();
    /** Creates a new instance with the same value */
    private clone;
    /** Returns the greatest decimal <= this which has no fractional part (rounding down) */
    floor(): Decimal;
    /** Returns the smallest decimal >= this which has no fractional part (rounding up) */
    ceil(): Decimal;
    toString(): string;
    /**
     * Returns an approximation as a float type. Only use this if no
     * exact calculation is required.
     */
    toFloatApproximation(): number;
    /**
     * a.plus(b) returns a+b.
     *
     * Both values need to have the same fractional digits.
     */
    plus(b: Decimal): Decimal;
    /**
     * a.minus(b) returns a-b.
     *
     * Both values need to have the same fractional digits.
     * The resulting difference needs to be non-negative.
     */
    minus(b: Decimal): Decimal;
    /**
     * a.multiply(b) returns a*b.
     *
     * We only allow multiplication by unsigned integers to avoid rounding errors.
     */
    multiply(b: Uint32 | Uint53 | Uint64): Decimal;
    equals(b: Decimal): boolean;
    isLessThan(b: Decimal): boolean;
    isLessThanOrEqual(b: Decimal): boolean;
    isGreaterThan(b: Decimal): boolean;
    isGreaterThanOrEqual(b: Decimal): boolean;
}
