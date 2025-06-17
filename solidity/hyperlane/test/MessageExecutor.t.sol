// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Test } from "forge-std/src/Test.sol";
import {console} from "forge-std/src/console.sol";
import { ERC5164PayableHook } from "../src/ERC5164PayableHook.sol";
import { TestMailbox } from "@hyperlane-xyz/contracts/test/TestMailbox.sol";
import { TestPostDispatchHook } from "@hyperlane-xyz/contracts/test/TestPostDispatchHook.sol";
import { TestIsm } from "@hyperlane-xyz/contracts/test/TestIsm.sol";
import { InterchainGasPaymaster } from "@hyperlane-xyz/contracts/hooks/igp/InterchainGasPaymaster.sol";
import { StorageGasOracle } from "@hyperlane-xyz/contracts/hooks/igp/StorageGasOracle.sol";
import { IGasOracle } from "@hyperlane-xyz/contracts/interfaces/IGasOracle.sol";
import { TypeCasts } from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import { StandardHookMetadata } from "@hyperlane-xyz/contracts/hooks/libs/StandardHookMetadata.sol";
import { ERC5164Ism } from "@hyperlane-xyz/contracts/isms/hook/ERC5164Ism.sol";
import {Message} from "@hyperlane-xyz/contracts/libs/Message.sol";
import { MessageExecutor } from "../src/MessageExecutor.sol";

contract ERC5164PayableHookTest is Test {
    using TypeCasts for address;

    ERC5164PayableHook private eRC5164PayableHook;
    TestMailbox private mailbox;
    InterchainGasPaymaster private igp;
    StorageGasOracle private testOracle;
    MessageExecutor private messageExecutor;
    ERC5164Ism private ism;

    uint32 private localDomain = 1;
    uint32 private remoteDomain = 2;
    address private destinationIsm = 0x4043B5bd20Cb3a98DC0ECD3a73769fE0580f0232;
    address private recipient = 0x4043B5bd20Cb3a98DC0ECD3a73769fE0580f0232;

    function setUp() public {
        messageExecutor = new MessageExecutor();
        ism = new ERC5164Ism(address(messageExecutor));
        messageExecutor.initialize(address(ism));
    }

    function test_Execute() public {
        bytes32 messageId = hex"0dd19b0906facb50a7cad4078aad9cbc8194582a99914884e18ad001dbe9a3f5";
        uint256 msgValue = 20000000000000000000;
        uint256 before = ism.verifiedMessages(messageId);
        console.log(before);
        messageExecutor.execute{value: msgValue}(messageId, msgValue);
        uint256 a = ism.verifiedMessages(messageId);
        console.log(a);

        bytes memory payload = hex"123456";
    }
}