"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decimal = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
// Too large values lead to massive memory usage. Limit to something sensible.
// The largest value we need is 18 (Ether).
const maxFractionalDigits = 100;
/**
 * A type for arbitrary precision, non-negative decimals.
 *
 * Instances of this class are immutable.
 */
class Decimal {
    constructor(atomics, fractionalDigits) {
        this.data = {
            atomics: new bn_js_1.default(atomics),
            fractionalDigits: fractionalDigits,
        };
    }
    static fromUserInput(input, fractionalDigits) {
        Decimal.verifyFractionalDigits(fractionalDigits);
        const badCharacter = input.match(/[^0-9.]/);
        if (badCharacter) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            throw new Error(`Invalid character at position ${badCharacter.index + 1}`);
        }
        let whole;
        let fractional;
        if (input.search(/\./) === -1) {
            // integer format, no separator
            whole = input;
            fractional = "";
        }
        else {
            const parts = input.split(".");
            switch (parts.length) {
                case 0:
                case 1:
                    throw new Error("Fewer than two elements in split result. This must not happen here.");
                case 2:
                    if (!parts[1])
                        throw new Error("Fractional part missing");
                    whole = parts[0];
                    fractional = parts[1].replace(/0+$/, "");
                    break;
                default:
                    throw new Error("More than one separator found");
            }
        }
        if (fractional.length > fractionalDigits) {
            throw new Error("Got more fractional digits than supported");
        }
        const quantity = `${whole}${fractional.padEnd(fractionalDigits, "0")}`;
        return new Decimal(quantity, fractionalDigits);
    }
    static fromAtomics(atomics, fractionalDigits) {
        Decimal.verifyFractionalDigits(fractionalDigits);
        return new Decimal(atomics, fractionalDigits);
    }
    /**
     * Creates a Decimal with value 0.0 and the given number of fractial digits.
     *
     * Fractional digits are not relevant for the value but needed to be able
     * to perform arithmetic operations with other decimals.
     */
    static zero(fractionalDigits) {
        Decimal.verifyFractionalDigits(fractionalDigits);
        return new Decimal("0", fractionalDigits);
    }
    /**
     * Creates a Decimal with value 1.0 and the given number of fractial digits.
     *
     * Fractional digits are not relevant for the value but needed to be able
     * to perform arithmetic operations with other decimals.
     */
    static one(fractionalDigits) {
        Decimal.verifyFractionalDigits(fractionalDigits);
        return new Decimal("1" + "0".repeat(fractionalDigits), fractionalDigits);
    }
    static verifyFractionalDigits(fractionalDigits) {
        if (!Number.isInteger(fractionalDigits))
            throw new Error("Fractional digits is not an integer");
        if (fractionalDigits < 0)
            throw new Error("Fractional digits must not be negative");
        if (fractionalDigits > maxFractionalDigits) {
            throw new Error(`Fractional digits must not exceed ${maxFractionalDigits}`);
        }
    }
    static compare(a, b) {
        if (a.fractionalDigits !== b.fractionalDigits)
            throw new Error("Fractional digits do not match");
        return a.data.atomics.cmp(new bn_js_1.default(b.atomics));
    }
    get atomics() {
        return this.data.atomics.toString();
    }
    get fractionalDigits() {
        return this.data.fractionalDigits;
    }
    /** Creates a new instance with the same value */
    clone() {
        return new Decimal(this.atomics, this.fractionalDigits);
    }
    /** Returns the greatest decimal <= this which has no fractional part (rounding down) */
    floor() {
        const factor = new bn_js_1.default(10).pow(new bn_js_1.default(this.data.fractionalDigits));
        const whole = this.data.atomics.div(factor);
        const fractional = this.data.atomics.mod(factor);
        if (fractional.isZero()) {
            return this.clone();
        }
        else {
            return Decimal.fromAtomics(whole.mul(factor).toString(), this.fractionalDigits);
        }
    }
    /** Returns the smallest decimal >= this which has no fractional part (rounding up) */
    ceil() {
        const factor = new bn_js_1.default(10).pow(new bn_js_1.default(this.data.fractionalDigits));
        const whole = this.data.atomics.div(factor);
        const fractional = this.data.atomics.mod(factor);
        if (fractional.isZero()) {
            return this.clone();
        }
        else {
            return Decimal.fromAtomics(whole.addn(1).mul(factor).toString(), this.fractionalDigits);
        }
    }
    toString() {
        const factor = new bn_js_1.default(10).pow(new bn_js_1.default(this.data.fractionalDigits));
        const whole = this.data.atomics.div(factor);
        const fractional = this.data.atomics.mod(factor);
        if (fractional.isZero()) {
            return whole.toString();
        }
        else {
            const fullFractionalPart = fractional.toString().padStart(this.data.fractionalDigits, "0");
            const trimmedFractionalPart = fullFractionalPart.replace(/0+$/, "");
            return `${whole.toString()}.${trimmedFractionalPart}`;
        }
    }
    /**
     * Returns an approximation as a float type. Only use this if no
     * exact calculation is required.
     */
    toFloatApproximation() {
        const out = Number(this.toString());
        if (Number.isNaN(out))
            throw new Error("Conversion to number failed");
        return out;
    }
    /**
     * a.plus(b) returns a+b.
     *
     * Both values need to have the same fractional digits.
     */
    plus(b) {
        if (this.fractionalDigits !== b.fractionalDigits)
            throw new Error("Fractional digits do not match");
        const sum = this.data.atomics.add(new bn_js_1.default(b.atomics));
        return new Decimal(sum.toString(), this.fractionalDigits);
    }
    /**
     * a.minus(b) returns a-b.
     *
     * Both values need to have the same fractional digits.
     * The resulting difference needs to be non-negative.
     */
    minus(b) {
        if (this.fractionalDigits !== b.fractionalDigits)
            throw new Error("Fractional digits do not match");
        const difference = this.data.atomics.sub(new bn_js_1.default(b.atomics));
        if (difference.ltn(0))
            throw new Error("Difference must not be negative");
        return new Decimal(difference.toString(), this.fractionalDigits);
    }
    /**
     * a.multiply(b) returns a*b.
     *
     * We only allow multiplication by unsigned integers to avoid rounding errors.
     */
    multiply(b) {
        const product = this.data.atomics.mul(new bn_js_1.default(b.toString()));
        return new Decimal(product.toString(), this.fractionalDigits);
    }
    equals(b) {
        return Decimal.compare(this, b) === 0;
    }
    isLessThan(b) {
        return Decimal.compare(this, b) < 0;
    }
    isLessThanOrEqual(b) {
        return Decimal.compare(this, b) <= 0;
    }
    isGreaterThan(b) {
        return Decimal.compare(this, b) > 0;
    }
    isGreaterThanOrEqual(b) {
        return Decimal.compare(this, b) >= 0;
    }
}
exports.Decimal = Decimal;
//# sourceMappingURL=decimal.js.map