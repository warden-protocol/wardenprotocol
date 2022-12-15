import { StdSignature } from "./signature";
import { AminoMsg, StdFee, StdSignDoc } from "./signdoc";
/**
 * A Cosmos SDK StdTx
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdtx
 */
export interface StdTx {
    readonly msg: readonly AminoMsg[];
    readonly fee: StdFee;
    readonly signatures: readonly StdSignature[];
    readonly memo: string | undefined;
}
export declare function isStdTx(txValue: unknown): txValue is StdTx;
export declare function makeStdTx(content: Pick<StdSignDoc, "msgs" | "fee" | "memo">, signatures: StdSignature | readonly StdSignature[]): StdTx;
