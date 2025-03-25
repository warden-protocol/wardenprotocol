export const getQuotePayloadAbiItem = {
  inputs: [],
  name: 'temp',
  stateMutability: 'view',
  type: 'function',
  outputs: [
    {
      "name": "GetQuotePayload",
      "type": "tuple",
      "components": [
        {
          "name": "hash",
          "type": "bytes32"
        },
        {
          "name": "node",
          "type": "address"
        },
        {
          "name": "commitment",
          "type": "bytes"
        },
        {
          "name": "paymentInfo",
          "type": "tuple",
          "components": [
            {
              "name": "sender",
              "type": "address"
            },
            {
              "name": "initCode",
              "type": "bytes"
            },
            {
              "name": "token",
              "type": "address"
            },
            {
              "name": "nonce",
              "type": "string"
            },
            {
              "name": "chainId",
              "type": "string"
            },
            {
              "name": "tokenAmount",
              "type": "string"
            },
            {
              "name": "tokenWeiAmount",
              "type": "string"
            },
            {
              "name": "tokenValue",
              "type": "string"
            }
          ]
        },
        {
          "name": "userOps",
          "type": "tuple[]",
          "components": [
            {
              "name": "userOp",
              "type": "tuple",
              "components": [
                {
                  "name": "sender",
                  "type": "address"
                },
                {
                  "name": "nonce",
                  "type": "string"
                },
                {
                  "name": "initCode",
                  "type": "bytes"
                },
                {
                  "name": "callData",
                  "type": "bytes"
                },
                {
                  "name": "callGasLimit",
                  "type": "string"
                },
                {
                  "name": "verificationGasLimit",
                  "type": "string"
                },
                {
                  "name": "maxFeePerGas",
                  "type": "string"
                },
                {
                  "name": "maxPriorityFeePerGas",
                  "type": "string"
                },
                {
                  "name": "paymasterAndData",
                  "type": "bytes"
                },
                {
                  "name": "preVerificationGas",
                  "type": "string"
                }
              ]
            },
            {
              "name": "userOpHash",
              "type": "bytes32"
            },
            {
              "name": "meeUserOpHash",
              "type": "bytes32"
            },
            {
              "name": "lowerBoundTimestamp",
              "type": "string"
            },
            {
              "name": "upperBoundTimestamp",
              "type": "string"
            },
            {
              "name": "maxGasLimit",
              "type": "string"
            },
            {
              "name": "maxFeePerGas",
              "type": "string"
            },
            {
              "name": "chainId",
              "type": "string"
            }
          ]
        }
      ]
    }
  ]
}