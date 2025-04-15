// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "precompile-json/IJson.sol" as json;

event Ok(int8);
event ErrorHappened(int8);

contract JsonUser {

    function doSomeJsonActions() external returns (bool) {
        bytes memory baseJson = json.IJSON_CONTRACT.newJson();
        
        json.SetKeyValue[] memory setKeyValuePairs = new json.SetKeyValue[](6);
        bool boolValue = true;
        setKeyValuePairs[0] = json.SetKeyValue("key1", "bool", abi.encode(boolValue), 0);
        uint256 uintValue = 123;
        setKeyValuePairs[1] = json.SetKeyValue("key2", "uint256",  abi.encode(uintValue), 0);
        int256 intValue = 123;
        setKeyValuePairs[2] = json.SetKeyValue("key3", "int256",  abi.encode(intValue), 0);
        string memory stringValue = "hello";
        setKeyValuePairs[3] = json.SetKeyValue("key4", "string",  abi.encode(stringValue), 0);
        address addressValue = json.IJSON_PRECOMPILE_ADDRESS;
        setKeyValuePairs[4] = json.SetKeyValue("key5", "address", abi.encode(addressValue), 0);
        int256 floatValute = 1234567890;
        setKeyValuePairs[5] = json.SetKeyValue("key6", "int256", abi.encode(floatValute), 5);

        bytes memory updatedJson = json.IJSON_CONTRACT.write(baseJson, setKeyValuePairs);

        json.ReadKeyValue[] memory keyValuePairs = new json.ReadKeyValue[](6);
        keyValuePairs[0] = json.ReadKeyValue("key1", "bool", 0);
        keyValuePairs[1] = json.ReadKeyValue("key3", "uint256", 0);
        keyValuePairs[2] = json.ReadKeyValue("key3", "int256", 0);
        keyValuePairs[3] = json.ReadKeyValue("key4", "string", 0);
        keyValuePairs[4] = json.ReadKeyValue("key5", "address", 0);
        keyValuePairs[5] = json.ReadKeyValue("key6", "int256", 5);
        
        bytes[] memory readResult = json.IJSON_CONTRACT.read(updatedJson, keyValuePairs);

        bool decodedKey1 = abi.decode(readResult[0], (bool));
        uint256 decodedKey2 = abi.decode(readResult[1], (uint256));
        int256 decodedKey3 = abi.decode(readResult[2], (int256));
        string memory decodedKey4 = abi.decode(readResult[3], (string));
        address decodedKey5 = abi.decode(readResult[4], (address));
        int256 decodedKey6 = abi.decode(readResult[5], (int256));

        if(decodedKey1 == false || decodedKey2 != 123 || decodedKey3 != 123 || keccak256(abi.encodePacked(decodedKey4)) != keccak256(abi.encodePacked("hello")) || decodedKey5 != json.IJSON_PRECOMPILE_ADDRESS || decodedKey6 != 1234567890) {
            emit ErrorHappened(2);
            return false;
        }

        emit Ok(1);
        return true;
    }
}