import { FeeTokenInfo, Instruction } from "@biconomy/abstractjs";
import { AbiFunction, Address } from "viem";

export interface IExecutionDataV1 {
  caller: Address;
  instructions: Instruction[];
  feeToken: FeeTokenInfo
}

export const ExecutionDataAbiV1: AbiFunction = {
  type: 'function',
  name: 'executionData',
  inputs: [],
  outputs: [
    {
      name: "",
      type: "tuple",
      internalType: "struct ExecutionData",
      components: [
        {
          name: "caller",
          type: "address",
          internalType: "address"
        },
        {
          name: "instructions",
          type: "tuple[]",
          internalType: "struct Instruction[]",
          components: [
            {
              name: "calls",
              type: "tuple[]",
              internalType: "struct Call[]",
              components: [
                {
                  name: "to",
                  type: "address",
                  internalType: "address"
                },
                {
                  name: "data",
                  type: "bytes",
                  internalType: "bytes"
                },
                {
                  name: "value",
                  type: "uint256",
                  internalType: "uint256"
                }
              ]
            },
            {
              name: "chainId",
              type: "uint256",
              internalType: "uint256"
            }
          ]
        },
        {
          name: "feeToken",
          type: "tuple",
          internalType: "struct FeeToken",
          components: [
            {
              name: "addr",
              type: "address",
              internalType: "address"
            },
            {
              name: "chainId",
              type: "uint256",
              internalType: "uint256"
            }
          ]
        }
      ]
    }
  ],
  stateMutability: 'view',
};

export const ExecuteAbiV1: AbiFunction = {
  type: 'function',
  name: 'execute',
  inputs: [
    {
      internalType: "struct GetQuotePayload",
      name: "_quote",
      type: "tuple",
      components: [
        {
          internalType: "bytes32",
          name: "hash",
          type: "bytes32"
        },
        {
          internalType: "address",
          name: "node",
          type: "address"
        },
        {
          internalType: "bytes",
          name: "commitment",
          type: "bytes"
        },
        {
          internalType: "struct PaymentInfo",
          name: "paymentInfo",
          type: "tuple",
          components: [
            {
              internalType: "address",
              name: "sender",
              type: "address"
            },
            {
              internalType: "bytes",
              name: "initCode",
              type: "bytes"
            },
            {
              internalType: "address",
              name: "token",
              type: "address"
            },
            {
              internalType: "string",
              name: "nonce",
              type: "string"
            },
            {
              internalType: "string",
              name: "chainId",
              type: "string"
            },
            {
              internalType: "string",
              name: "tokenAmount",
              type: "string"
            },
            {
              internalType: "string",
              name: "tokenWeiAmount",
              type: "string"
            },
            {
              internalType: "string",
              name: "tokenValue",
              type: "string"
            }
          ]
        },
        {
          internalType: "struct UserOpMetadata[]",
          name: "userOps",
          type: "tuple[]",
          components: [
            {
              internalType: "struct UserOp",
              name: "userOp",
              type: "tuple",
              components: [
                {
                  internalType: "address",
                  name: "sender",
                  type: "address"
                },
                {
                  internalType: "string",
                  name: "nonce",
                  type: "string"
                },
                {
                  internalType: "bytes",
                  name: "initCode",
                  type: "bytes"
                },
                {
                  internalType: "bytes",
                  name: "callData",
                  type: "bytes"
                },
                {
                  internalType: "string",
                  name: "callGasLimit",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "verificationGasLimit",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "maxFeePerGas",
                  type: "string"
                },
                {
                  internalType: "string",
                  name: "maxPriorityFeePerGas",
                  type: "string"
                },
                {
                  internalType: "bytes",
                  name: "paymasterAndData",
                  type: "bytes"
                },
                {
                  internalType: "string",
                  name: "preVerificationGas",
                  type: "string"
                }
              ]
            },
            {
              internalType: "bytes32",
              name: "userOpHash",
              type: "bytes32"
            },
            {
              internalType: "bytes32",
              name: "meeUserOpHash",
              type: "bytes32"
            },
            {
              internalType: "string",
              name: "lowerBoundTimestamp",
              type: "string"
            },
            {
              internalType: "string",
              name: "upperBoundTimestamp",
              type: "string"
            },
            {
              internalType: "string",
              name: "maxGasLimit",
              type: "string"
            },
            {
              internalType: "string",
              name: "maxFeePerGas",
              type: "string"
            },
            {
              internalType: "string",
              name: "chainId",
              type: "string"
            }
          ]
        }
      ]
    }
  ],
  outputs: [
    {
      internalType: "bool",
      name: "",
      type: "bool"
    },
    {
      internalType: "bytes32",
      name: "",
      type: "bytes32"
    }
  ],
  stateMutability: 'nonpayable',
};
