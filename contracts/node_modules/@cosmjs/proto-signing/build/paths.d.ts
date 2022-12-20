import { HdPath } from "@cosmjs/crypto";
/**
 * The Cosmos Hub derivation path in the form `m/44'/118'/0'/0/a`
 * with 0-based account index `a`.
 */
export declare function makeCosmoshubPath(a: number): HdPath;
