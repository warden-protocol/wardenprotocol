# EIP712

EIP712 transactions creator.

# Installation

- `yarn add @tharsis/evmosjs`

# Example

- MsgSend:

```ts
import {
  createEIP712,
  generateFee,
  generateMessage,
  generateTypes,
  createMsgSend,
  MSG_SEND_TYPES,
} from '@tharsis/evmosjs/packages/eip712'

let fee = generateFee(
  '20',
  'aphoton',
  '20000',
  'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
)
let types = generateTypes(MSG_SEND_TYPES)
let msg = createMsgSend(
  '1',
  'aphoton',
  'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
  'ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm',
)
let messages = generateMessage('9', '0', 'ethermint_9000-1', '', fee, msg)
let complete = createEIP712(types, 9000, messages)
console.log(complete)
```

```json
{
  "types": {
    "EIP712Domain": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "version",
        "type": "string"
      },
      {
        "name": "chainId",
        "type": "uint256"
      },
      {
        "name": "verifyingContract",
        "type": "string"
      },
      {
        "name": "salt",
        "type": "string"
      }
    ],
    "Tx": [
      {
        "name": "account_number",
        "type": "string"
      },
      {
        "name": "chain_id",
        "type": "string"
      },
      {
        "name": "fee",
        "type": "Fee"
      },
      {
        "name": "memo",
        "type": "string"
      },
      {
        "name": "msgs",
        "type": "Msg[]"
      },
      {
        "name": "sequence",
        "type": "string"
      }
    ],
    "Fee": [
      {
        "name": "feePayer",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "Coin[]"
      },
      {
        "name": "gas",
        "type": "string"
      }
    ],
    "Coin": [
      {
        "name": "denom",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "string"
      }
    ],
    "Msg": [
      {
        "name": "type",
        "type": "string"
      },
      {
        "name": "value",
        "type": "MsgValue"
      }
    ],
    "MsgValue": [
      {
        "name": "from_address",
        "type": "string"
      },
      {
        "name": "to_address",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "TypeAmount[]"
      }
    ],
    "TypeAmount": [
      {
        "name": "denom",
        "type": "string"
      },
      {
        "name": "amount",
        "type": "string"
      }
    ]
  },
  "primaryType": "Tx",
  "domain": {
    "name": "Cosmos Web3",
    "version": "1.0.0",
    "chainId": 9000,
    "verifyingContract": "cosmos",
    "salt": "0"
  },
  "message": {
    "account_number": "9",
    "chain_id": "ethermint_9000-1",
    "fee": {
      "amount": [
        {
          "amount": "20",
          "denom": "aphoton"
        }
      ],
      "gas": "20000",
      "feePayer": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm"
    },
    "memo": "",
    "msgs": [
      {
        "type": "cosmos-sdk/MsgSend",
        "value": {
          "amount": [
            {
              "amount": "1",
              "denom": "aphoton"
            }
          ],
          "from_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm",
          "to_address": "ethm1tfegf50n5xl0hd5cxfzjca3ylsfpg0fned5gqm"
        }
      }
    ],
    "sequence": "0"
  }
}
```
