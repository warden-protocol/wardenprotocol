import { Address, Hex } from "viem";

export interface INewSignatureRequest {
  id: bigint;
  creator: Address;
  signature: Hex;
  transactionHash: Hex;
}
