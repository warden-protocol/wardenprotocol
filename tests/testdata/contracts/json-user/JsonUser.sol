// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "precompile-json/IJson.sol" as json;

event Ok(uint256);
event ErrorHappened(int8);

contract JsonUser {

    function doSomeJsonActions() external returns (bool) {
        bytes memory baseJson = json.IJSON_CONTRACT.newJson();
        
        bytes memory updatedJson = json.IJSON_CONTRACT.setUint256(baseJson, "key3", 123);
        updatedJson = json.IJSON_CONTRACT.setBool(updatedJson, "key1", true);
        updatedJson = json.IJSON_CONTRACT.setString(updatedJson, "key4", "foobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzzfoobuzz");
        
        bool boolValue = json.IJSON_CONTRACT.getBool(updatedJson, "key1");
        string memory str = json.IJSON_CONTRACT.getString(updatedJson, "key4");

        if(boolValue == false) {
            emit ErrorHappened(2);
            return false;
        }

        emit Ok(bytes(str).length);
        return true;
    }
}