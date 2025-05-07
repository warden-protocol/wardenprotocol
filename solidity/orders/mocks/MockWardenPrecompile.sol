// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { AddressesResponse, AddressType, BroadcastType, Key, KeyResponse } from "precompile-warden/IWarden.sol";
import { Types } from "precompile-common/Types.sol";

contract MockWardenPrecompile {
    mapping(uint64 keyId => KeyResponse keyResponse) private keys;
    mapping(uint64 keyId => bool isGood) private goodKeys;

    function keyById(uint64, int32[] calldata) external pure returns (KeyResponse memory keyResponse) {
        Key memory key;
        AddressesResponse[] memory addresses = new AddressesResponse[](1);
        addresses[0] = AddressesResponse({
            addressValue: "0x0000000000000000000000000000000000000000",
            addressType: AddressType.Ethereum
        });
        keyResponse = KeyResponse({
            key: key,
            addresses: addresses
        });
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
