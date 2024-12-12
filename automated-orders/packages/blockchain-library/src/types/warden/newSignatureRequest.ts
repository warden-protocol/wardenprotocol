import { Hex } from "viem";

export interface INewSignatureRequest {
  id: bigint;
  signature: Hex;
  transactionHash: Hex;
}
