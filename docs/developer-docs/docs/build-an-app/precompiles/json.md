---
sidebar_position: 4
---

# JSON

## Overview

The `IJson.sol` precompile enables... [`x/async` module](/learn/warden-protocol-modules/x-async).

In this article, you'll find a full list of available methods, allowing you to manage JSON objects and to get and set different values.

To learn how to use this precompile, refer to [Use the JSON precompile].

:::note Code
You can find the `x/async` precomile code on GitHub: [`IAsync.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/async/IJson.sol)
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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

### Get multiple pairs

- **Method**: `read()`
- **Description**: Returns multiple key-value pairs, requires passing an array of pairs. See the [`ReadKeyValue` struct](#readkeyvalue).
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param keyValues The key-value pairs to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [XXX]

### Set multiple pairs

- **Method**: `write()`
- **Description**: Sets multiple key-value pairs, requires passing an array of pairs. See the [`SetKeyValue` struct](#setkeyvalue).
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param keyValues The key-value pairs to set.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

### Set a float pair

- **Method**: `setFloat()`
- **Description**: Set a float key-value pair.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to set.
  @param value The uint256 value to set.
  @param decimals The number of decimal places.
  ```
- **Output**:  
  ```sol
  @return The modified JSON as bytes.
  ```
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

### Get a uint256 array

- **Method**: `getUintArray()`
- **Description**: Returns a uint256 array value by key.
- **Parameters** :
  ```sol
  @param input The JSON input as bytes.
  @param key The key to look up.XX
  ```
- **Output**:  
  ```sol
  @return The uint256 array value.
  ```
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

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
- **Usage example**: [XXX]

## Structs

### `SetKeyValue`

### `ReadKeyValue`

- **Description**: A struct representing a key-value pair. It's used for [getting multiple pairs](#get-multiple-pairs).

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
