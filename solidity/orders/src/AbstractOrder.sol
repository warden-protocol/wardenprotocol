// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { RLPEncode } from "./RLPEncode.sol";
import { Types } from "./Types.sol";

abstract contract AbstractOrder {
    function encodeUnsignedEIP1559(
        uint256 nonce,
        uint256 gas,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas,
        bytes[] calldata accessList,
        Types.CreatorDefinedTxFields calldata creatorDefinedTxFields

    ) public pure returns (bytes memory unsignedTx, bytes32 txHash) {
        uint256 txType = 2; // eip1559 tx type
        bytes[] memory txArray = new bytes[](9);
        txArray[0] = RLPEncode.encodeUint(creatorDefinedTxFields.chainId);
        txArray[1] = RLPEncode.encodeUint(nonce);
        txArray[2] = RLPEncode.encodeUint(maxPriorityFeePerGas);
        txArray[3] = RLPEncode.encodeUint(maxFeePerGas);
        txArray[4] = RLPEncode.encodeUint(gas);
        txArray[5] = RLPEncode.encodeAddress(creatorDefinedTxFields.to);
        txArray[6] = RLPEncode.encodeUint(creatorDefinedTxFields.value);
        txArray[7] = RLPEncode.encodeBytes(creatorDefinedTxFields.data);
        txArray[8] = RLPEncode.encodeList(accessList);
        bytes memory unsignedTxEncoded = RLPEncode.encodeList(txArray);
        unsignedTx = RLPEncode.concat(RLPEncode.encodeUint(txType), unsignedTxEncoded);
        txHash = keccak256(unsignedTx);
    }
}