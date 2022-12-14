import { Coin } from "@cosmjs/amino";
/**
 * Takes a coins list like "819966000ucosm,700000000ustake" and parses it.
 *
 * This is a Stargate ready version of parseCoins from @cosmjs/amino.
 * It supports more denoms.
 */
export declare function parseCoins(input: string): Coin[];
