import { Pubkey } from "@cosmjs/amino";
import { GetTxResponse, SimulateResponse } from "cosmjs-types/cosmos/tx/v1beta1/service";
import { Any } from "cosmjs-types/google/protobuf/any";
import { QueryClient } from "../../queryclient";
export interface TxExtension {
    readonly tx: {
        getTx: (txId: string) => Promise<GetTxResponse>;
        simulate: (messages: readonly Any[], memo: string | undefined, signer: Pubkey, sequence: number) => Promise<SimulateResponse>;
    };
}
export declare function setupTxExtension(base: QueryClient): TxExtension;
