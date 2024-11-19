import { Hex } from "viem";

export interface INewSignatureRequest {
  signature: Hex;
  transactionHash: Hex;
}
