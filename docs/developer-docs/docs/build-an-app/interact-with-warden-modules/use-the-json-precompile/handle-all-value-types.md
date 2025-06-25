---
sidebar_position: 1
---

# Handle all value types

## Overview

The [`IJson` precompile](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/precompiles/json/IJson.sol) allows manipulating JSON data from EVM smart contracts.

This article covers methods that allow handling all value types. You'll learn how to call these methods and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip

- For an overview of `JSON` functions, refer to [Precompiles: JSON](../../precompiles/json#all-value-types).
- The precompile address is `0x0000000000000000000000000000000000000904`.

:::

## Create a new root object

To create an empty root JSON object, use the following code in your contract. It calls the [`newJson()` function](../../precompiles/json#create-a-new-root-object) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function newJson() external returns (bytes32);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function createNewJson() external returns (bytes32) {
        return json.newJson();
    }
}
```

After deploying your contract, you can interact with it by calling the `createNewJson()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "createNewJson()" --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Get a value

To get a value by key, use the following code in your contract. It calls the [`get()` function](../../precompiles/json#get-a-value) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function get(bytes32 jsonId, string memory key) external view returns (bytes memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getValue(bytes32 jsonId, string memory key) external view returns (bytes memory) {
        return json.get(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Remove a pair

To remove a key-value pair from the root object, use the following code in your contract. It calls the [`remove()` function](../../precompiles/json#remove-a-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function remove(bytes32 jsonId, string memory key) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function removePair(bytes32 jsonId, string memory key) external {
        json.remove(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `removePair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "removePair(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Get multiple values

To get multiple values by their keys, use the following code in your contract. It calls the [`read()` function](../../precompiles/json#get-multiple-values) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function read(bytes32 jsonId, string[] memory keys) external view returns (bytes[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getMultipleValues(bytes32 jsonId, string[] memory keys) external view returns (bytes[] memory) {
        return json.read(jsonId, keys);
    }
}
```

After deploying your contract, you can interact with it by calling the `getMultipleValues()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getMultipleValues(bytes32,string[])" <JSON_ID> '["key1","key2"]' --rpc-url <RPC_URL>
```

## Set multiple pairs

To set multiple key-value pairs, use the following code in your contract. It calls the [`write()` function](../../precompiles/json#set-multiple-pairs) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function write(bytes32 jsonId, string[] memory keys, bytes[] memory values) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setMultiplePairs(bytes32 jsonId, string[] memory keys, bytes[] memory values) external {
        json.write(jsonId, keys, values);
    }
}
```

After deploying your contract, you can interact with it by calling the `setMultiplePairs()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setMultiplePairs(bytes32,string[],bytes[])" <JSON_ID> '["key1","key2"]' '["value1","value2"]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```
