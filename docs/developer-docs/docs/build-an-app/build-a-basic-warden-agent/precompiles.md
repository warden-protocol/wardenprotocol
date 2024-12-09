---
sidebar_position: 3
---

# Mock Precompiles

In this section we will create mock precompiles that are essential for testing our Agent end to end.

Before you proceed, please create a `mock` directory where these functions will reside.

## Create `mocks/MockSlinkyPrecompile.sol`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { GetPriceResponse, QuotePrice, ISlinky } from "precompile-slinky/ISlinky.sol";

contract MockSlinkyPrecompile is ISlinky {
    mapping(string base => mapping(string quote => uint256 price)) private prices;

    function getPrice(
        string calldata base,
        string calldata quote
    )
        external
        view
        returns (GetPriceResponse memory response)
    {
        uint256 price = prices[base][quote];
        if (price == 0) {
            string memory s1 = string.concat("no price / nonce reported for CurrencyPair: ", base);
            string memory s2 = string.concat(s1, "/");
            string memory s3 = string.concat(s2, quote);
            string memory s4 = string.concat(s3, ", the module is not tracking this CurrencyPair");
            revert(s4);
        }

        QuotePrice memory quotePrice = QuotePrice({ blockHeight: 0, blockTimestamp: 0, price: price });

        response = GetPriceResponse({ id: 0, nonce: 0, decimals: 9, price: quotePrice });
    }

    function setPrice(string calldata base, string calldata quote, uint256 price) external {
        prices[base][quote] = price;
    }
}
```

## Create `mocks/MockWardenPrecompile.sol`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { BroadcastType, KeyResponse } from "precompile-warden/IWarden.sol";
import { Types } from "precompile-common/Types.sol";

contract MockWardenPrecompile {
    mapping(uint64 keyId => KeyResponse keyResponse) private keys;
    mapping(uint64 keyId => bool isGood) private goodKeys;

    function keyById(uint64 id, int32[] calldata) external view returns (KeyResponse memory key) {
        return keys[id];
    }

    function newSignRequest(
        uint64 keyId,
        bytes calldata,
        bytes[] calldata,
        bytes calldata,
        Types.Coin[] calldata,
        uint64,
        uint64,
        string calldata,
        string calldata,
        BroadcastType
    )
        external
        view
        returns (bool isGood)
    {
        isGood = goodKeys[keyId];
    }

    function addKey(uint64 keyId, bool isGood) external {
        goodKeys[keyId] = isGood;
    }
}
```

These mock contracts simulate the behavior of:

**MockSlinkyPrecompile:**

- Price feed functionality
- Price setting for testing
- Error handling for missing prices

**MockWardenPrecompile:**

- Key management
- Transaction signing requests
- Key validation
