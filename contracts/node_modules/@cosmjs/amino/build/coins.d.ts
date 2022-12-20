export interface Coin {
    readonly denom: string;
    readonly amount: string;
}
/**
 * Creates a coin.
 *
 * If your values do not exceed the safe integer range of JS numbers (53 bit),
 * you can use the number type here. This is the case for all typical Cosmos SDK
 * chains that use the default 6 decimals.
 *
 * In case you need to supportr larger values, use unsigned integer strings instead.
 */
export declare function coin(amount: number | string, denom: string): Coin;
/**
 * Creates a list of coins with one element.
 */
export declare function coins(amount: number | string, denom: string): Coin[];
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
export declare function parseCoins(input: string): Coin[];
/**
 * Function to sum up coins with type Coin
 */
export declare function addCoins(lhs: Coin, rhs: Coin): Coin;
