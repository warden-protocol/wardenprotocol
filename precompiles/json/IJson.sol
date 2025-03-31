// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.25;

/// @dev The IJson contract's address.
address constant IJSON_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000905;

/// @dev The IJson contract's instance.
IJson constant IJSON_CONTRACT = IJson(IJSON_PRECOMPILE_ADDRESS);

/**
 * @author Warden Team
 * @title x/json Interface
 * @dev The interface through which users and solidity contracts can operate with JSON.
 * 
 * This interface provides methods to manipulate JSON data in Solidity, including adding, 
 * removing, and retrieving key-value pairs. It supports basic types, arrays, and nested objects.
 * 
 * @custom:address 0x0000000000000000000000000000000000000905
 */
interface IJson {

    /**
     * @dev Defines a method to remove a key-value pair from JSON.
     * @param input The JSON input as bytes.
     * @param key The key to remove.
     * @return The modified JSON as bytes.
     */
    function remove(
        bytes memory input,
        string memory key
    ) external pure returns (bytes memory);

    /**
     * @dev Defines a method to get a value from JSON by key.
     * @param input The JSON input as bytes.
     * @param key The key to look up.
     * @return The value as bytes.
     */
    function get(
        bytes memory input,
        string memory key
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);

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
    ) external pure returns (bytes memory);
}
