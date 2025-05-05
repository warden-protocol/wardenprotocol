---
sidebar_position: 4
---

# JSON

## Overview

The `IJson.sol` precompile enables EVM smart contracts to manipulate JSON data.

In this article, you'll find a full list of available methods, allowing you to handle different value types:

- [All value types](#all-value-types)
- [Basic types and numbers](#basic-types-and-numbers)
- [Arrays and nested objects](#arrays-and-nested-objects)

To learn how to use this precompile, refer to [Use the JSON precompile](/category/use-the-json-precompile).

:::note Code
You can find the `JSON` precompile code on GitHub: [`IJson.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/json/IJson.sol)
:::

## Precompile address

To reference the `IJson` precompile in your code, use the following precompile address:

```
0x0000000000000000000000000000000000000904
```

## All value types

### Create a new root object

- **Method**: `newJson()`
- **Description**: Creates an empty root JSON object.
- **Output**:  
  ```sol
  @return The created JSON as bytes.
  ```
- **Usage example**: [Create a new root object](../interact-with-warden-modules/use-the-json-precompile/handle-all-value-types#create-a-new-root-object)

### Get a value

- **Method**: `get()`
- **Description**: Returns a value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The value as bytes.
  ```
- **Usage example**: [Get a value](../interact-with-warden-modules/use-the-json-precompile/handle-all-value-types#get-a-value)

### Remove a pair

- **Method**: `remove()`
- **Description**: Removes a key-value pair from the root object.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to remove.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Remove a pair](../interact-with-warden-modules/use-the-json-precompile/handle-all-value-types#remove-a-pair)

### Get multiple values

- **Method**: `read()`
- **Description**: Returns multiple values by their keys. Requires passing an array of keys: see the [`ReadKeyValue` struct](#readkeyvalue).
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param keyValues The key-value pairs to read.
  ```
- **Output**:  
  ```sol
  @return The array of key-value pairs as bytes.
  ```
- **Usage example**: [Get multiple pairs](../interact-with-warden-modules/use-the-json-precompile/handle-all-value-types#get-multiple-values)

### Set multiple pairs

- **Method**: `write()`
- **Description**: Sets multiple key-value pairs. Requires passing an array of pairs: seee the [`SetKeyValue` struct](#setkeyvalue).
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param keyValues The key-value pairs to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set multiple pairs](../interact-with-warden-modules/use-the-json-precompile/handle-all-value-types#get-multiple-pairs)

## Basic types and numbers

### Get a string value

- **Method**: `getString()`
- **Description**: Returns a string value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The string value.
  ```
- **Usage example**: [Get a string value](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#get-a-string-value)

### Get a boolean value

- **Method**: `getBool()`
- **Description**: Returns a boolean value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The boolean value.
  ```
- **Usage example**: [Get a boolean value](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#get-a-boolean-value)

### Get an address value

- **Method**: `getAddress()`
- **Description**: Returns an address value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The address value.
  ```
- **Usage example**: [Get an address value](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#get-an-address-value)

### Get a uint256 value

- **Method**: `getUint256()`
- **Description**: Returns a uint256 value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The uint256 value
  ```
- **Usage example**: [Get a uint256 value](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#get-a-uint256-value)

### Get an int256 value

- **Method**: `getInt256()`
- **Description**: Returns an int256 value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The int256 value.
  ```
- **Usage example**: [Get an int256 value](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#get-an-int256-value)

### Get a float value

- **Method**: `getFloat()`
- **Description**: Returns a float value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  @param decimals The number of decimal places.
  ```
- **Output**:  
  ```sol
  @return The float value as int256.
  ```
- **Usage example**: [Get a float value](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#get-a-float-value)

### Set a string pair

- **Method**: `setString()`
- **Description**: Sets a string key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The string value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a string pair](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#set-a-string-pair)

### Set a boolean pair

- **Method**: `setBool()`
- **Description**: Sets a boolean key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The boolean value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a boolean pair](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#set-a-boolean-pair)

### Set an address pair

- **Method**: `setAddress()`
- **Description**: Sets an address key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The address value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set an address pair](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#set-an-address-pair)

### Set a bytes pair

- **Method**: `setBytes()`
- **Description**: Set a bytes key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The bytes value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a bytes pair](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#set-a-bytes-pair)

### Set a uint256 pair

- **Method**: `setUint256()`
- **Description**: Set a uint256 key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The uint256 value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a uint256 pair](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#set-a-uint256-pair)

### Set an int256 pair

- **Method**: `setInt256()`
- **Description**: Set an int256 key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The int256 value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set an int256 pair](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#set-an-int256-pair)

### Set a float pair

- **Method**: `setFloat()`
- **Description**: Set a float key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The int256 value to set.
  @param decimals The number of decimal places.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a float pair](../interact-with-warden-modules/use-the-json-precompile/handle-basic-types-and-numbers#set-a-float-pair)

## Arrays and nested objects

### Get a string array

- **Method**: `getStringArray()`
- **Description**: Returns a string array value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The string array value.
  ```
- **Usage example**: [Get a string array](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-a-string-array)

### Get a boolean array

- **Method**: `getBoolArray()`
- **Description**: Returns a boolean array value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The boolean array value.
  ```
- **Usage example**: [Get a boolean array](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-a-boolean-array)

### Get an address array

- **Method**: `getAddressArray()`
- **Description**: Returns an address array value by key.
- **Parameters** :
  ```sol
   @param input The JSON input as bytes.
   @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The address array value.
  ```
- **Usage example**: [Get an address array](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-an-address-array)

### Get a uint256 array

- **Method**: `getUintArray()`
- **Description**: Returns a uint256 array value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The uint256 array value.
  ```
- **Usage example**: [Get a uint256 array](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-a-uint256-array)

### Get an int256 array

- **Method**: `getIntArray()`
- **Description**: Returns an int256 array value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The int256 array value.
  ```
- **Usage example**: [Get an int256 array](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-an-int256-array)

### Get a float array

- **Method**: `getFloatArray()`
- **Description**: Returns a float array value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The float array value.
  ```
- **Usage example**: [Get a float array](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-a-float-array)

### Get an object array

- **Method**: `getObjectsArray()`
- **Description**: Returns an object array value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The nested object value as bytes.
  ```
- **Usage example**: [Get an object array](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-an-object-array)

### Get a nested object

- **Method**: `getObject()`
- **Description**: Returns a nest object value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.
  ```
- **Output**:  
  ```sol
  @return The nested object value as bytes.
  ```
- **Usage example**: [Get a nested object](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#get-a-nested-object)

### Set a string array pair

- **Method**: `setStringArray()`
- **Description**: Set a string array key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The string array value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a string array pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-a-string-array-pair)

### Set an address array pair

- **Method**: `setAddressArray()`
- **Description**: Set an address array key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The address array value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set an address array pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-an-address-array-pair)

### Set a boolean array pair

- **Method**: `setBoolArray()`
- **Description**: Set a boolean array key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The boolean array value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a boolean array pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-a-boolean-array-pair)

### Set a uint256 array pair

- **Method**: `setUintArray()`
- **Description**: Set a uint256 array key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The uint256 array value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a uint256 array pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-a-uint256-array-pair)

### Set an int256 array pair

- **Method**: `setIntArray()`
- **Description**: Set an int256 array key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The int256 array value to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set an int256 array pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-an-int256-array-pair)

### Set a float array pair

- **Method**: `setFloatArray()`
- **Description**: Set a float array key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The int256 array value to set.
  @param decimals The number of decimal places.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a float array pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-a-float-array-pair)

### Set an object array pair

- **Method**: `setObjectsArray()`
- **Description**: Set an object array key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The nested objects values as bytes.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set an object array pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-an-object-array-pair)

### Set a nested object pair

- **Method**: `setObject()`
- **Description**: Set a nested object key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The nested object value as bytes.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [Set a nested object pair](../interact-with-warden-modules/use-the-json-precompile/handle-arrays-and-nested-objects#set-a-nested-object-pair)

## Structs

### `SetKeyValue`

### `ReadKeyValue`

- **Description**: A struct representing a key. It's used for [getting multiple values](#get-multiple-values).

```
struct ReadKeyValue {
    string key;
    string valueType;
    int64 decimals;
}
```

- **Description**: A struct representing a key-value pair. It's used for [setting multiple pairs](#set-multiple-pairs).

```
struct SetKeyValue {
    string key;
    string valueType;
    bytes value;
    int64 decimals;
}
```
