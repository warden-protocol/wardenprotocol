pragma solidity >=0.8.25 <0.9.0;

import {KeyResponse} from "precompile-warden/IWarden.sol";
import {Types} from "precompile-common/Types.sol";

contract MockWardenPrecompile {
    mapping(uint64 keyId => KeyResponse keyResponse) private keys;
    mapping(uint64 keyId => bool isGood) private goodKeys;
    
    function keyById(uint64 id, int32[] calldata deriveAddresses) external view returns (KeyResponse memory key) {
        // return keys[id];
    }

    function newSignRequest(
        uint64 keyId,
        bytes calldata input,
        bytes[] calldata analyzers,
        bytes calldata encryptionKey,
        Types.Coin[] calldata maxKeychainFees,
        uint64 nonce,
        uint64 actionTimeoutHeight,
        string calldata expectedApproveExpression,
        string calldata expectedRejectExpression
    ) external returns (bool isGood) {
        isGood = goodKeys[keyId];
    }

    function addKey(uint64 keyId, bool isGood) external {
        goodKeys[keyId] = isGood;
    }
}