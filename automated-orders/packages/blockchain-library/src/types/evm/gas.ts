export interface GasFeeData {
  gasLimit: bigint | undefined;
  gasPrice: bigint | undefined;
  maxFeePerGas: bigint | undefined;
  maxPriorityFeePerGas: bigint | undefined;
}
