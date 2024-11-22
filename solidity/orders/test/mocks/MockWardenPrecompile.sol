// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { BroadcastType, KeyResponse } from "precompile-warden/IWarden.sol";
import { Types } from "precompile-common/Types.sol";

contract MockWardenPrecompile {
    mapping(uint64 keyId => KeyResponse keyResponse) private keys;
    mapping(uint64 keyId => bool isGood) private goodKeys;

    function keyById(uint64 id, int32[] calldata) external view returns (KeyResponse memory key) {
        return keys[id];
    }

    function newSignRequest(
        uint64 keyId,
        bytes calldata,
        bytes[] calldata,
        bytes calldata,
        Types.Coin[] calldata,
        uint64,
        uint64,
        string calldata,
        string calldata,
        BroadcastType
    )
        external
        view
        returns (bool isGood)
    {
        isGood = goodKeys[keyId];
    }

    function addKey(uint64 keyId, bool isGood) external {
        goodKeys[keyId] = isGood;
    }
}
