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
import { StandardHookMetadata } from '@hyperlane-xyz/contracts/hooks/libs/StandardHookMetadata.sol';

contract ERC5164PayableHookTest is Test {
    using TypeCasts for address;

    ERC5164PayableHook private eRC5164PayableHook;
    TestMailbox private mailbox;
    InterchainGasPaymaster private igp;
    StorageGasOracle private testOracle;

    uint32 private localDomain = 1;
    uint32 private remoteDomain = 2;
    address private destinationIsm = 0x4043B5bd20Cb3a98DC0ECD3a73769fE0580f0232;
    address private recipient = 0x4043B5bd20Cb3a98DC0ECD3a73769fE0580f0232;
    address private constant beneficiary = address(0x444444);
    address private constant erc5164Benefeciary = address(0x111111);
    uint96 constant testGasOverhead = 123000;

    function setUp() public {
        mailbox = new TestMailbox(localDomain);

        TestPostDispatchHook defaultHook = new TestPostDispatchHook();
        igp = new InterchainGasPaymaster();
        igp.initialize(address(this), beneficiary);
        testOracle = new StorageGasOracle();
        setRemoteGasData(
            remoteDomain,
            1,
            1000000
        );
        
        TestIsm defaultIsm = new TestIsm();

        mailbox.initialize(
            msg.sender,
            address(defaultIsm),
            address(defaultHook),
            address(igp)
        );

        eRC5164PayableHook = new ERC5164PayableHook(
            address(mailbox),
            remoteDomain,
            destinationIsm.addressToBytes32());

        eRC5164PayableHook.initialize(address(this), erc5164Benefeciary);

        setTestDestinationGasConfig(
            remoteDomain,
            testOracle,
            testGasOverhead
        );
    }

    function setTestDestinationGasConfig(
        uint32 _remoteDomain,
        IGasOracle _gasOracle,
        uint96 _gasOverhead
    ) internal {
        InterchainGasPaymaster.GasParam[]
            memory params = new InterchainGasPaymaster.GasParam[](1);

        params[0] = InterchainGasPaymaster.GasParam(
            _remoteDomain,
            InterchainGasPaymaster.DomainGasConfig(_gasOracle, _gasOverhead)
        );
        igp.setDestinationGasConfigs(params);
        eRC5164PayableHook.setDestinationGasConfigs(params);
    }

    function test_Dispatch() public {
        // mailbox.dispatch with custom metadata
        uint256 destinationValue = 20 ether;
        
        bytes memory metadata = StandardHookMetadata.formatMetadata(
            destinationValue,
            50_000,
            msg.sender,
            ""
        );
        bytes memory payload = hex"123456";
        bytes memory message = mailbox.buildOutboundMessage(
            remoteDomain,
            recipient.addressToBytes32(),
            payload
        );

        vm.txGasPrice(1000000007);
        uint256 quote = mailbox.quoteDispatch(
            remoteDomain,
            recipient.addressToBytes32(),
            payload,
            metadata,
            eRC5164PayableHook
        );
        uint256 igpQuote = igp.quoteDispatch(metadata, message);

        uint256 customQuote = eRC5164PayableHook.quoteDispatch(metadata, message);

        uint256 metadataValueAsSource = eRC5164PayableHook.destinationValueInLocalTokens(destinationValue, remoteDomain);

        console.log("igp quoteDispatch:", igpQuote);
        console.log("custom quoteDispatch:", customQuote);
        console.log("quoteDispatch with custom hook:", quote);
        console.log("metadataValueAsSource:", metadataValueAsSource);
        
        mailbox.dispatch{value: quote}(
            remoteDomain,
            recipient.addressToBytes32(),
            payload,
            metadata,
            eRC5164PayableHook
        );
    }

    function setRemoteGasData(
        uint32 _remoteDomain,
        uint128 _tokenExchangeRate,
        uint128 _gasPrice
    ) internal {
        testOracle.setRemoteGasData(
            StorageGasOracle.RemoteGasDataConfig({
                remoteDomain: _remoteDomain,
                tokenExchangeRate: _tokenExchangeRate,
                gasPrice: _gasPrice
            })
        );
    }
}