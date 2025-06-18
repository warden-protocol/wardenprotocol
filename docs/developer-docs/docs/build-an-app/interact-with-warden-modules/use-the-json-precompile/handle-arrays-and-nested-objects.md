---
sidebar_position: 3
---

# Handle arrays and nested objects

## Overview

The [`IJson` precompile](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/precompiles/json/IJson.sol) allows manipulating JSON data from EVM smart contracts.

This article covers methods that allow handling arrays and nested objects. You'll learn how to call these methods and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip

- For an overview of `JSON` functions, refer to [Precompiles: JSON](../../precompiles/json#arrays-and-nested-objects).
- The precompile address is `0x0000000000000000000000000000000000000904`.

:::

## Get a string array

To get a string array value by key, use the following code in your contract. It calls the [`getStringArray()` function](../../precompiles/json#get-a-string-array) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getStringArray(bytes32 jsonId, string memory key) external view returns (string[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getStringArrayValue(bytes32 jsonId, string memory key) external view returns (string[] memory) {
        return json.getStringArray(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getStringArrayValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getStringArrayValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get a boolean array

To get a boolean array value by key, use the following code in your contract. It calls the [`getBoolArray()` function](../../precompiles/json#get-a-boolean-array) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getBoolArray(bytes32 jsonId, string memory key) external view returns (bool[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getBoolArrayValue(bytes32 jsonId, string memory key) external view returns (bool[] memory) {
        return json.getBoolArray(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getBoolArrayValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getBoolArrayValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get an address array

To get an address array value by key, use the following code in your contract. It calls the [`getAddressArray()` function](../../precompiles/json#get-an-address-array) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getAddressArray(bytes32 jsonId, string memory key) external view returns (address[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getAddressArrayValue(bytes32 jsonId, string memory key) external view returns (address[] memory) {
        return json.getAddressArray(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getAddressArrayValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getAddressArrayValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get a uint256 array

To get a uint256 array value by key, use the following code in your contract. It calls the [`getUintArray()` function](../../precompiles/json#get-a-uint256-array) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getUintArray(bytes32 jsonId, string memory key) external view returns (uint256[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getUintArrayValue(bytes32 jsonId, string memory key) external view returns (uint256[] memory) {
        return json.getUintArray(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getUintArrayValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getUintArrayValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get an int256 array

To get an int256 array value by key, use the following code in your contract. It calls the [`getIntArray()` function](../../precompiles/json#get-an-int256-array) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getIntArray(bytes32 jsonId, string memory key) external view returns (int256[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getIntArrayValue(bytes32 jsonId, string memory key) external view returns (int256[] memory) {
        return json.getIntArray(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getIntArrayValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getIntArrayValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get a float array

To get a float array value by key, use the following code in your contract. It calls the [`getFloatArray()` function](../../precompiles/json#get-a-float-array) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getFloatArray(bytes32 jsonId, string memory key) external view returns (bytes[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getFloatArrayValue(bytes32 jsonId, string memory key) external view returns (bytes[] memory) {
        return json.getFloatArray(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getFloatArrayValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getFloatArrayValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get an object array

To get an object array value by key, use the following code in your contract. It calls the [`getObjectsArray()` function](../../precompiles/json#get-an-object-array) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getObjectsArray(bytes32 jsonId, string memory key) external view returns (bytes32[] memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getObjectsArrayValue(bytes32 jsonId, string memory key) external view returns (bytes32[] memory) {
        return json.getObjectsArray(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getObjectsArrayValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getObjectsArrayValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get a nested object

To get a nested object value by key, use the following code in your contract. It calls the [`getObject()` function](../../precompiles/json#get-a-nested-object) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getObject(bytes32 jsonId, string memory key) external view returns (bytes32);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getNestedObject(bytes32 jsonId, string memory key) external view returns (bytes32) {
        return json.getObject(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getNestedObject()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getNestedObject(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Set a string array pair

To set a string array key-value pair, use the following code in your contract. It calls the [`setStringArray()` function](../../precompiles/json#set-a-string-array-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setStringArray(bytes32 jsonId, string memory key, string[] memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setStringArrayPair(bytes32 jsonId, string memory key, string[] memory value) external {
        json.setStringArray(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setStringArrayPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setStringArrayPair(bytes32,string,string[])" <JSON_ID> "myKey" '["value1","value2"]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set an address array pair

To set an address array key-value pair, use the following code in your contract. It calls the [`setAddressArray()` function](../../precompiles/json#set-an-address-array-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setAddressArray(bytes32 jsonId, string memory key, address[] memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setAddressArrayPair(bytes32 jsonId, string memory key, address[] memory value) external {
        json.setAddressArray(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setAddressArrayPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setAddressArrayPair(bytes32,string,address[])" <JSON_ID> "myKey" '["0x123...","0x456..."]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a boolean array pair

To set a boolean array key-value pair, use the following code in your contract. It calls the [`setBoolArray()` function](../../precompiles/json#set-a-boolean-array-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setBoolArray(bytes32 jsonId, string memory key, bool[] memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setBoolArrayPair(bytes32 jsonId, string memory key, bool[] memory value) external {
        json.setBoolArray(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setBoolArrayPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setBoolArrayPair(bytes32,string,bool[])" <JSON_ID> "myKey" '[true,false]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a uint256 array pair

To set a uint256 array key-value pair, use the following code in your contract. It calls the [`setUintArray()` function](../../precompiles/json#set-a-uint256-array-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setUintArray(bytes32 jsonId, string memory key, uint256[] memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setUintArrayPair(bytes32 jsonId, string memory key, uint256[] memory value) external {
        json.setUintArray(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setUintArrayPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setUintArrayPair(bytes32,string,uint256[])" <JSON_ID> "myKey" '[1,2,3]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set an int256 array pair

To set an int256 array key-value pair, use the following code in your contract. It calls the [`setIntArray()` function](../../precompiles/json#set-an-int256-array-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setIntArray(bytes32 jsonId, string memory key, int256[] memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setIntArrayPair(bytes32 jsonId, string memory key, int256[] memory value) external {
        json.setIntArray(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setIntArrayPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setIntArrayPair(bytes32,string,int256[])" <JSON_ID> "myKey" '[-1,0,1]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a float array pair

To set a float array key-value pair, use the following code in your contract. It calls the [`setFloatArray()` function](../../precompiles/json#set-a-float-array-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setFloatArray(bytes32 jsonId, string memory key, bytes[] memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setFloatArrayPair(bytes32 jsonId, string memory key, bytes[] memory value) external {
        json.setFloatArray(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setFloatArrayPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setFloatArrayPair(bytes32,string,bytes[])" <JSON_ID> "myKey" '["1.5","2.7"]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set an object array pair

To set an object array key-value pair, use the following code in your contract. It calls the [`setObjectsArray()` function](../../precompiles/json#set-an-object-array-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setObjectsArray(bytes32 jsonId, string memory key, bytes32[] memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setObjectsArrayPair(bytes32 jsonId, string memory key, bytes32[] memory value) external {
        json.setObjectsArray(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setObjectsArrayPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setObjectsArrayPair(bytes32,string,bytes32[])" <JSON_ID> "myKey" '["0x123...","0x456..."]' --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a nested object pair

To set a nested object key-value pair, use the following code in your contract. It calls the [`setObject()` function](../../precompiles/json#set-a-nested-object-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setObject(bytes32 jsonId, string memory key, bytes32 value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setNestedObjectPair(bytes32 jsonId, string memory key, bytes32 value) external {
        json.setObject(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setNestedObjectPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setNestedObjectPair(bytes32,string,bytes32)" <JSON_ID> "myKey" "0x123..." --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```
