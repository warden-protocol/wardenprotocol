// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { ERC5164Ism } from "@hyperlane-xyz/contracts/isms/hook/ERC5164Ism.sol";

contract MessageExecutor {
    ERC5164Ism public ism;

    function initialize(address _ism) public {
        if(address(ism) == address(0)) {
            ism = ERC5164Ism(_ism);
        }
    }

    function execute(bytes32 messageId, uint256 msgValue) public payable {
        ism.preVerifyMessage{value: msg.value}(messageId, msgValue);
    }
}