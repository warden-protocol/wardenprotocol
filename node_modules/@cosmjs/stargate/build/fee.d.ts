import { StdFee } from "@cosmjs/amino";
import { Decimal } from "@cosmjs/math";
/**
 * A gas price, i.e. the price of a single unit of gas. This is typically a fraction of
 * the smallest fee token unit, such as 0.012utoken.
 */
export declare class GasPrice {
    readonly amount: Decimal;
    readonly denom: string;
    constructor(amount: Decimal, denom: string);
    /**
     * Parses a gas price formatted as `<amount><denom>`, e.g. `GasPrice.fromString("0.012utoken")`.
     *
     * The denom must match the Cosmos SDK 0.42 pattern (https://github.com/cosmos/cosmos-sdk/blob/v0.42.4/types/coin.go#L599-L601).
     * See `GasPrice` in @cosmjs/stargate for a more generic matcher.
     *
     * Separators are not yet supported.
     */
    static fromString(gasPrice: string): GasPrice;
    /**
     * Returns a string representation of this gas price, e.g. "0.025uatom".
     * This can be used as an input to `GasPrice.fromString`.
     */
    toString(): string;
}
export declare function calculateFee(gasLimit: number, gasPrice: GasPrice | string): StdFee;
