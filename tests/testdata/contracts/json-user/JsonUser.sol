// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "precompile-json/IJson.sol" as json;

event Ok(int8);
event ErrorHappened(int8);

contract JsonUser {

    function doSomeJsonActions() external returns (bool) {
        bytes memory baseJson = json.IJSON_CONTRACT.newJson();
        
        bytes memory updatedJson = json.IJSON_CONTRACT.setUint256(baseJson, "key3", 123);
        updatedJson = json.IJSON_CONTRACT.setBool(updatedJson, "key1", true);
        
        bool boolValue = json.IJSON_CONTRACT.getBool(updatedJson, "key1");
        uint256 uint256Value = json.IJSON_CONTRACT.getUint256(updatedJson, "key3");

        if(boolValue == false) {
            emit ErrorHappened(2);
            return false;
        }

        emit Ok(1);
        return true;
    }
}