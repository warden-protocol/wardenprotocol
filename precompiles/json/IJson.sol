// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.25 <0.9.0;

/// @dev The IJson contract's address.
address constant IJSON_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000904;

/// @dev The IJson contract's instance.
IJson constant IJSON_CONTRACT = IJson(IJSON_PRECOMPILE_ADDRESS);

struct ReadKeyValue {
    string key;
    string valueType;
    int64 decimals;
}

struct FixedPoint {
    int256 mantissa;
    uint8 exponent;
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
     * @dev Builds a JSON object from a series of operations and associated data.
     * @param ops An array of JsonOp codes that define the JSON structure.
     * @param data An array of ABI-encoded values corresponding to the operations.
     * @return json A bytes array containing the UTF-8 encoded JSON string.
     */
    function build(JsonOp[] memory ops, bytes[] memory data) external pure returns (bytes memory json);

    /**
     * @dev Parses JSON data according to a schema and returns ABI-encoded data.
     * @param jsonBytes The JSON data to parse as UTF-8 encoded bytes.
     * @param schema The schema defining the structure and types to extract from the JSON.
     * @return abiEncodedData The extracted data encoded according to the provided schema.
     */
    function parse(bytes memory jsonBytes, bytes memory schema) external view returns (bytes memory abiEncodedData);
}

/**
 * @dev Defines the set of operations for building a JSON structure.
 * Each operation dictates how the precompile should process the next piece of data.
 */
enum JsonOp {
    // --- Structural Operations (0-3) ---
    StartObject,      // 0: Marks the start of an object '{'
    EndObject,        // 1: Marks the end of an object '}'
    StartArray,       // 2: Marks the start of an array '['
    EndArray,         // 3: Marks the end of an array ']'

    // --- Key Operation (4) ---
    Key,              // 4: Defines a key for an object member.

    // --- Value Operations (5+) ---
    StringValue,      // 5: Adds a string value.
    UintValue,        // 6: Adds a uint256 value.
    IntValue,         // 7: Adds an int256 value.
    BoolValue,        // 8: Adds a boolean value.
    AddressValue,     // 9: Adds an address value (formatted as a hex string).
    BytesValue,       // 10: Adds a bytes value (formatted as a 0x-prefixed hex string).
    NullValue,        // 11: Adds a null value.
    FixedPointValue,  // 12: Adds a fixed-point number.
    RawJsonNumberValue// 13: Adds a pre-formatted number string.
}

library JsonUtils {
    // Default capacity for new builders.
    uint256 private constant INITIAL_CAPACITY = 32;

    /**
     * @dev The builder struct holds the state of the JSON being constructed.
     * It should be stored in memory during construction.
     */
    struct JsonBuilder {
        JsonOp[] ops;
        bytes[] data;
        uint256 count; // Tracks the number of items added.
    }

    // --- Builder Management ---

    /**
     * @dev Initializes a new JsonBuilder in memory with a default capacity.
     */
    function newBuilder() internal pure returns (JsonBuilder memory builder) {
        return newBuilderWithCapacity(INITIAL_CAPACITY);
    }

    /**
     * @dev Initializes a new JsonBuilder in memory with the specified
     * capacity.
     */
    function newBuilderWithCapacity(uint256 capacity) internal pure returns (JsonBuilder memory builder) {
        builder.ops = new JsonOp[](capacity);
        builder.data = new bytes[](capacity);
        // builder.count is initialized to 0 by default.
    }

    /**
     * @dev Finalizes the JSON construction, trims the arrays, and calls the precompile.
     * @param builder The JsonBuilder instance.
     * @return json The final JSON bytes.
     */
    function build(JsonBuilder memory builder) internal pure returns (bytes memory json) {
        // Create new arrays with the exact size to save gas on the external call.
        JsonOp[] memory finalOps = new JsonOp[](builder.count);
        bytes[] memory finalData = new bytes[](builder.count);

        for (uint256 i = 0; i < builder.count; i++) {
            finalOps[i] = builder.ops[i];
            finalData[i] = builder.data[i];
        }

        return IJSON_CONTRACT.build(finalOps, finalData);
    }

    // --- Structural Modifiers ---

    function startObject(JsonBuilder memory builder) internal pure {
        _push(builder, JsonOp.StartObject, "");
    }

    function endObject(JsonBuilder memory builder) internal pure {
        _push(builder, JsonOp.EndObject, "");
    }

    function startArray(JsonBuilder memory builder) internal pure {
        _push(builder, JsonOp.StartArray, "");
    }

    function endArray(JsonBuilder memory builder) internal pure {
        _push(builder, JsonOp.EndArray, "");
    }

    function key(JsonBuilder memory builder, string memory _key) internal pure {
        _push(builder, JsonOp.Key, abi.encodePacked(_key));
    }

    // --- Value Modifiers ---

    function nullValue(JsonBuilder memory builder) internal pure {
        _push(builder, JsonOp.NullValue, "");
    }

    function value(JsonBuilder memory builder, string memory _val) internal pure {
        _push(builder, JsonOp.StringValue, abi.encodePacked(_val));
    }

    function value(JsonBuilder memory builder, uint256 _val) internal pure {
        _push(builder, JsonOp.UintValue, abi.encode(_val));
    }

    function value(JsonBuilder memory builder, int256 _val) internal pure {
        _push(builder, JsonOp.IntValue, abi.encode(_val));
    }

    function value(JsonBuilder memory builder, bool _val) internal pure {
        _push(builder, JsonOp.BoolValue, abi.encode(_val));
    }

    function value(JsonBuilder memory builder, address _val) internal pure {
        _push(builder, JsonOp.AddressValue, abi.encode(_val));
    }

    function value(JsonBuilder memory builder, FixedPoint memory fp) internal pure {
        fixedPointValue(builder, fp.mantissa, fp.exponent);
    }

    function bytesValue(JsonBuilder memory builder, bytes memory _val) internal pure {
        _push(builder, JsonOp.BytesValue, _val);
    }

    function fixedPointValue(JsonBuilder memory builder, int256 mantissa, uint8 exponent) internal pure {
        _push(builder, JsonOp.FixedPointValue, abi.encode(mantissa, exponent));
    }

    function rawJsonNumber(JsonBuilder memory builder, string memory numString) internal pure {
        _push(builder, JsonOp.RawJsonNumberValue, abi.encodePacked(numString));
    }

    // --- Convenience Pair Functions ---

    function pair(JsonBuilder memory builder, string memory _key, string memory _val) internal pure {
        key(builder, _key);
        value(builder, _val);
    }

    function pair(JsonBuilder memory builder, string memory _key, uint256 _val) internal pure {
        key(builder, _key);
        value(builder, _val);
    }

    function pair(JsonBuilder memory builder, string memory _key, bool _val) internal pure {
        key(builder, _key);
        value(builder, _val);
    }

    function pair(JsonBuilder memory builder, string memory _key, FixedPoint memory _val) internal pure {
        key(builder, _key);
        value(builder, _val);
    }

    // --- Internal Helper ---

    /**
     * @dev Private helper to push a new operation and its data to the builder's arrays.
     * Handles dynamic array resizing if capacity is reached.
     */
    function _push(JsonBuilder memory builder, JsonOp op, bytes memory _data) private pure {
        // If the array is full, we need to resize it.
        if (builder.count == builder.ops.length) {
            // Create new arrays with double the capacity.
            JsonOp[] memory newOps = new JsonOp[](builder.count * 2);
            bytes[] memory newData = new bytes[](builder.count * 2);

            // Copy existing elements to the new arrays.
            for (uint i = 0; i < builder.count; i++) {
                newOps[i] = builder.ops[i];
                newData[i] = builder.data[i];
            }

            // Point the builder to the new, larger arrays.
            builder.ops = newOps;
            builder.data = newData;
        }

        // Add the new element at the current count index.
        builder.ops[builder.count] = op;
        builder.data[builder.count] = _data;

        // Increment the count for the next element.
        builder.count++;
    }
}
