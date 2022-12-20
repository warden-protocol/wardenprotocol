import { Coin } from "./coins";
export interface AminoMsg {
    readonly type: string;
    readonly value: any;
}
export interface StdFee {
    readonly amount: readonly Coin[];
    readonly gas: string;
}
/**
 * The document to be signed
 *
 * @see https://docs.cosmos.network/master/modules/auth/03_types.html#stdsigndoc
 */
export interface StdSignDoc {
    readonly chain_id: string;
    readonly account_number: string;
    readonly sequence: string;
    readonly fee: StdFee;
    readonly msgs: readonly AminoMsg[];
    readonly memo: string;
}
/** Returns a JSON string with objects sorted by key */
export declare function sortedJsonStringify(obj: any): string;
export declare function makeSignDoc(msgs: readonly AminoMsg[], fee: StdFee, chainId: string, memo: string | undefined, accountNumber: number | string, sequence: number | string): StdSignDoc;
export declare function serializeSignDoc(signDoc: StdSignDoc): Uint8Array;
