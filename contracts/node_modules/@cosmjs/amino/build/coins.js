"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCoins = exports.parseCoins = exports.coins = exports.coin = void 0;
const math_1 = require("@cosmjs/math");
/**
 * Creates a coin.
 *
 * If your values do not exceed the safe integer range of JS numbers (53 bit),
 * you can use the number type here. This is the case for all typical Cosmos SDK
 * chains that use the default 6 decimals.
 *
 * In case you need to supportr larger values, use unsigned integer strings instead.
 */
function coin(amount, denom) {
    let outAmount;
    if (typeof amount === "number") {
        try {
            outAmount = new math_1.Uint53(amount).toString();
        }
        catch (_err) {
            throw new Error("Given amount is not a safe integer. Consider using a string instead to overcome the limitations of JS numbers.");
        }
    }
    else {
        if (!amount.match(/^[0-9]+$/)) {
            throw new Error("Invalid unsigned integer string format");
        }
        outAmount = amount.replace(/^0*/, "") || "0";
    }
    return {
        amount: outAmount,
        denom: denom,
    };
}
exports.coin = coin;
/**
 * Creates a list of coins with one element.
 */
function coins(amount, denom) {
    return [coin(amount, denom)];
}
exports.coins = coins;
/**
 * Takes a coins list like "819966000ucosm,700000000ustake" and parses it.
 *
 * A Stargate-ready variant of this function is available via:
 *
 * ```
 * import { parseCoins } from "@cosmjs/proto-signing";
 * // or
 * import { parseCoins } from "@cosmjs/stargate";
 * ```
 */
function parseCoins(input) {
    return input
        .replace(/\s/g, "")
        .split(",")
        .filter(Boolean)
        .map((part) => {
        const match = part.match(/^([0-9]+)([a-zA-Z]+)/);
        if (!match)
            throw new Error("Got an invalid coin string");
        return {
            amount: math_1.Uint64.fromString(match[1]).toString(),
            denom: match[2],
        };
    });
}
exports.parseCoins = parseCoins;
/**
 * Function to sum up coins with type Coin
 */
function addCoins(lhs, rhs) {
    if (lhs.denom !== rhs.denom)
        throw new Error("Trying to add two coins with different denoms");
    return {
        amount: math_1.Decimal.fromAtomics(lhs.amount, 0).plus(math_1.Decimal.fromAtomics(rhs.amount, 0)).atomics,
        denom: lhs.denom,
    };
}
exports.addCoins = addCoins;
//# sourceMappingURL=coins.js.map