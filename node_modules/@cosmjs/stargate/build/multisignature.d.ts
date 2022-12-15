import { MultisigThresholdPubkey, StdFee } from "@cosmjs/amino";
import { CompactBitArray } from "cosmjs-types/cosmos/crypto/multisig/v1beta1/multisig";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
export declare function makeCompactBitArray(bits: readonly boolean[]): CompactBitArray;
export declare function makeMultisignedTx(multisigPubkey: MultisigThresholdPubkey, sequence: number, fee: StdFee, bodyBytes: Uint8Array, signatures: Map<string, Uint8Array>): TxRaw;
