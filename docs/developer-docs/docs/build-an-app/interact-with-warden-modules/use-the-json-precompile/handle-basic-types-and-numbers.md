---
sidebar_position: 2
---

# Handle basic types and numbers

## Overview

The [`IJson` precompile](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/precompiles/json/IJson.sol) allows manipulating JSON data from EVM smart contracts.

This article covers methods that allow handling basic value types and numbers. You'll learn how to call these methods and interact with them after deploying your contract.

To understand how to set up and deploy your project, see [Get started with precompiles](../get-started-with-precompiles).

:::tip

- For an overview of `JSON` functions, refer to [Precompiles: JSON](../../precompiles/json#basic-types-and-numbers).
- The precompile address is `0x0000000000000000000000000000000000000904`.

:::

## Get a string value

To get a string value by key, use the following code in your contract. It calls the [`getString()` function](../../precompiles/json#get-a-string-value) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getString(bytes32 jsonId, string memory key) external view returns (string memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getStringValue(bytes32 jsonId, string memory key) external view returns (string memory) {
        return json.getString(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getStringValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getStringValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get a boolean value

To get a boolean value by key, use the following code in your contract. It calls the [`getBool()` function](../../precompiles/json#get-a-boolean-value) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getBool(bytes32 jsonId, string memory key) external view returns (bool);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getBoolValue(bytes32 jsonId, string memory key) external view returns (bool) {
        return json.getBool(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getBoolValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getBoolValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get an address value

To get an address value by key, use the following code in your contract. It calls the [`getAddress()` function](../../precompiles/json#get-an-address-value) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getAddress(bytes32 jsonId, string memory key) external view returns (address);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getAddressValue(bytes32 jsonId, string memory key) external view returns (address) {
        return json.getAddress(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getAddressValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getAddressValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get a uint256 value

To get a uint256 value by key, use the following code in your contract. It calls the [`getUint256()` function](../../precompiles/json#get-a-uint256-value) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getUint256(bytes32 jsonId, string memory key) external view returns (uint256);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getUint256Value(bytes32 jsonId, string memory key) external view returns (uint256) {
        return json.getUint256(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getUint256Value()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getUint256Value(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get an int256 value

To get an int256 value by key, use the following code in your contract. It calls the [`getInt256()` function](../../precompiles/json#get-an-int256-value) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getInt256(bytes32 jsonId, string memory key) external view returns (int256);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getInt256Value(bytes32 jsonId, string memory key) external view returns (int256) {
        return json.getInt256(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getInt256Value()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getInt256Value(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Get a float value

To get a float value by key, use the following code in your contract. It calls the [`getFloat()` function](../../precompiles/json#get-a-float-value) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function getFloat(bytes32 jsonId, string memory key) external view returns (bytes memory);
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function getFloatValue(bytes32 jsonId, string memory key) external view returns (bytes memory) {
        return json.getFloat(jsonId, key);
    }
}
```

After deploying your contract, you can interact with it by calling the `getFloatValue()` function.

```bash
# Using cast
cast call <CONTRACT_ADDRESS> "getFloatValue(bytes32,string)" <JSON_ID> "myKey" --rpc-url <RPC_URL>
```

## Set a string pair

To set a string key-value pair, use the following code in your contract. It calls the [`setString()` function](../../precompiles/json#set-a-string-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setString(bytes32 jsonId, string memory key, string memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setStringPair(bytes32 jsonId, string memory key, string memory value) external {
        json.setString(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setStringPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setStringPair(bytes32,string,string)" <JSON_ID> "myKey" "myValue" --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a boolean pair

To set a boolean key-value pair, use the following code in your contract. It calls the [`setBool()` function](../../precompiles/json#set-a-boolean-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setBool(bytes32 jsonId, string memory key, bool value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setBoolPair(bytes32 jsonId, string memory key, bool value) external {
        json.setBool(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setBoolPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setBoolPair(bytes32,string,bool)" <JSON_ID> "myKey" true --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set an address pair

To set an address key-value pair, use the following code in your contract. It calls the [`setAddress()` function](../../precompiles/json#set-an-address-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setAddress(bytes32 jsonId, string memory key, address value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setAddressPair(bytes32 jsonId, string memory key, address value) external {
        json.setAddress(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setAddressPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setAddressPair(bytes32,string,address)" <JSON_ID> "myKey" "0x123..." --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a bytes pair

To set a bytes key-value pair, use the following code in your contract. It calls the [`setBytes()` function](../../precompiles/json#set-a-bytes-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setBytes(bytes32 jsonId, string memory key, bytes memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setBytesPair(bytes32 jsonId, string memory key, bytes memory value) external {
        json.setBytes(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setBytesPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setBytesPair(bytes32,string,bytes)" <JSON_ID> "myKey" "0x1234" --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a uint256 pair

To set a uint256 key-value pair, use the following code in your contract. It calls the [`setUint256()` function](../../precompiles/json#set-a-uint256-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setUint256(bytes32 jsonId, string memory key, uint256 value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setUint256Pair(bytes32 jsonId, string memory key, uint256 value) external {
        json.setUint256(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setUint256Pair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setUint256Pair(bytes32,string,uint256)" <JSON_ID> "myKey" 123 --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set an int256 pair

To set an int256 key-value pair, use the following code in your contract. It calls the [`setInt256()` function](../../precompiles/json#set-an-int256-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setInt256(bytes32 jsonId, string memory key, int256 value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setInt256Pair(bytes32 jsonId, string memory key, int256 value) external {
        json.setInt256(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setInt256Pair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setInt256Pair(bytes32,string,int256)" <JSON_ID> "myKey" -123 --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```

## Set a float pair

To set a float key-value pair, use the following code in your contract. It calls the [`setFloat()` function](../../precompiles/json#set-a-float-pair) of the precompile.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IJson {
    function setFloat(bytes32 jsonId, string memory key, bytes memory value) external;
}

contract JsonExample {
    IJson public json;
    
    constructor() {
        json = IJson(0x0000000000000000000000000000000000000904);
    }
    
    function setFloatPair(bytes32 jsonId, string memory key, bytes memory value) external {
        json.setFloat(jsonId, key, value);
    }
}
```

After deploying your contract, you can interact with it by calling the `setFloatPair()` function.

```bash
# Using cast
cast send <CONTRACT_ADDRESS> "setFloatPair(bytes32,string,bytes)" <JSON_ID> "myKey" "1.23" --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
```
