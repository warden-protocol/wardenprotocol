// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.25 <0.9.0;

/// @dev The IJson contract's address.
address constant IJSON_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000904;

/// @dev The IJson contract's instance.
IJson constant IJSON_CONTRACT = IJson(IJSON_PRECOMPILE_ADDRESS);

struct SetKeyValue {
    string key;
    string valueType;
    bytes value;
    int64 decimals;
}

struct ReadKeyValue {
    string key;
    string valueType;
    int64 decimals;
}

/**
 * @author Warden Team
 * @title x/json Interface
 * @dev The interface through which users and solidity contracts can operate with JSON.
 * 
 * This interface provides methods to manipulate JSON data in Solidity, including adding, 
 * removing, and retrieving key-value pairs. It supports basic types, arrays, and nested objects.
 * 
 * @custom:address 0x0000000000000000000000000000000000000904
 */
interface IJson {

    /**
     * @dev Defines a method to create empty JSON object.
     * @return The created JSON as bytes.
     */
    function newJson() external view returns (bytes memory);

    /**
     * @dev Defines a method to remove a key-value pair from JSON.
     * @param input The JSON input as bytes.
     * @param key The key to remove.
     * @return The modified JSON as bytes.
     */
    function remove(
        bytes memory input,
        string memory key
    ) external view returns (bytes memory);

    // Get methods

    /**
     * @dev Defines a method to get a value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The value as bytes.
     */
    function get(
        bytes memory input,
        string memory key
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to get a string value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The string value.
     */
    function getString(
        bytes memory input,
        string memory key
    ) external view returns (string memory);

    /**
     * @dev Defines a method to get a boolean value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The boolean value.
     */
    function getBool(
        bytes memory input,
        string memory key
    ) external view returns (bool);

    /**
     * @dev Defines a method to get an address value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The address value.
     */
    function getAddress(
        bytes memory input,
        string memory key
    ) external view returns (address);

    /**
     * @dev Defines a method to get an int256 value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The int256 value.
     */
    function getInt256(
        bytes memory input,
        string memory key
    ) external view returns (int256);

    /**
     * @dev Defines a method to get a uint256 value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The uint256 value.
     */
    function getUint256(
        bytes memory input,
        string memory key
    ) external view returns (uint256);

    /**
     * @dev Defines a method to get a float value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @param decimals The number of decimal places.
     * @return The float value as int256.
     */
    function getFloat(
        bytes memory input,
        string memory key,
        int64 decimals
    ) external view returns (int256);

    /**
     * @dev Defines a method to get a string array value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The string array value.
     */
    function getStringArray(
        bytes memory input,
        string memory key
    ) external view returns (string[] memory);

    /**
     * @dev Defines a method to get a uint256 array value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The uint256 array value.
     */
    function getUintArray(
        bytes memory input,
        string memory key
    ) external view returns (uint256[] memory);

    /**
     * @dev Defines a method to get an int256 array value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The int256 array value.
     */
    function getIntArray(
        bytes memory input,
        string memory key
    ) external view returns (int256[] memory);

    /**
     * @dev Defines a method to get an float array value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The float array value.
     */
    function getFloatArray(
        bytes memory input,
        string memory key,
        int64 decimals
    ) external view returns (int256[] memory);

    /**
     * @dev Defines a method to get a boolean array value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The boolean array value.
     */
    function getBoolArray(
        bytes memory input,
        string memory key
    ) external view returns (bool[] memory);

    /**
     * @dev Defines a method to get an address array value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The address array value.
     */
    function getAddressArray(
        bytes memory input,
        string memory key
    ) external view returns (address[] memory);

    /**
     * @dev Defines a method to get a nested objects array value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The nested objects array value as bytes.
     */
    function getObjectsArray(
        bytes memory input,
        string memory key
    ) external view returns (bytes[] memory);

    /**
     * @dev Defines a method to get a nested object value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The nested object value as bytes.
     */
    function getObject(
        bytes memory input,
        string memory key
    ) external view returns (bytes memory);

    // Basic types

    /**
     * @dev Defines a method to set a string key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The string value to set.
     * @return The modified JSON as bytes.
     */
    function setString(
        bytes memory input,
        string memory key,
        string memory value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a boolean key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The boolean value to set.
     * @return The modified JSON as bytes.
     */
    function setBool(
        bytes memory input,
        string memory key,
        bool value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set an address key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The address value to set.
     * @return The modified JSON as bytes.
     */
    function setAddress(
        bytes memory input,
        string memory key,
        address value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a bytes key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The bytes value to set.
     * @return The modified JSON as bytes.
     */
    function setBytes(
        bytes memory input,
        string memory key,
        bytes memory value
    ) external view returns (bytes memory);

    // Number types

    /**
     * @dev Defines a method to set an int256 key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The int256 value to set.
     * @return The modified JSON as bytes.
     */
    function setInt256(
        bytes memory input,
        string memory key,
        int256 value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a uint256 key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The uint256 value to set.
     * @return The modified JSON as bytes.
     */
    function setUint256(
        bytes memory input,
        string memory key,
        uint256 value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a float key-value in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The int256 value to set.
     * @param decimals The number of decimal places.
     * @return The modified JSON as bytes.
     */
    function setFloat(
        bytes memory input,
        string memory key,
        int256 value,
        int64 decimals
    ) external view returns (bytes memory);

    // Array types

    /**
     * @dev Defines a method to set a string array key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The string array value to set.
     * @return The modified JSON as bytes.
     */
    function setStringArray(
        bytes memory input,
        string memory key,
        string[] memory value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a uint256 array key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The uint256 array value to set.
     * @return The modified JSON as bytes.
     */
    function setUintArray(
        bytes memory input,
        string memory key,
        uint256[] memory value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a int256 array key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The int256 array value to set.
     * @return The modified JSON as bytes.
     */
    function setIntArray(
        bytes memory input,
        string memory key,
        int256[] memory value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a float array key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The int256 array value to set.
     * @param decimals The number of decimal places.
     * @return The modified JSON as bytes.
     */
    function setFloatArray(
        bytes memory input,
        string memory key,
        int256[] memory value,
        int64 decimals
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a boolean array key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The boolean array value to set.
     * @return The modified JSON as bytes.
     */
    function setBoolArray(
        bytes memory input,
        string memory key,
        bool[] memory value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set an address array key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The address array value to set.
     * @return The modified JSON as bytes.
     */
    function setAddressArray(
        bytes memory input,
        string memory key,
        address[] memory value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set a nested objects array key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The nested objects values as bytes.
     * @return The modified JSON as bytes.
     */
    function setObjectsArray(
        bytes memory input,
        string memory key,
        bytes[] memory value
    ) external view returns (bytes memory);

    // Struct handling

    /**
     * @dev Defines a method to set a nested object key-value pair in JSON.
     * @param input The JSON input as bytes.
     * @param key The key to set.
     * @param value The nested object value as bytes.
     * @return The modified JSON as bytes.
     */
    function setObject(
        bytes memory input,
        string memory key,
        bytes memory value
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to set multiple key-value pairs in JSON.
     * @param input The JSON input as bytes.
     * @param keyValues The key-value pairs to set.
     * @return The modified JSON as bytes.
     */
    function write(
        bytes memory input,
        SetKeyValue[] memory keyValues
    ) external view returns (bytes memory);

    /**
     * @dev Defines a method to read multiple key-value pairs in JSON.
     * @param input The JSON input as bytes.
     * @param keyValues The key-value pairs to read.
     * @return The array of key-value pairs as bytes.
     */
    function read(
        bytes memory input,
        ReadKeyValue[] memory keyValues
    ) external view returns (bytes[] memory);
}
