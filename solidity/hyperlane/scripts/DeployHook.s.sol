// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/src/Script.sol";
import "forge-std/src/console.sol";
import { StaticAggregationHookFactory } from "@hyperlane-xyz/contracts/hooks/aggregation/StaticAggregationHookFactory.sol";
import { TypeCasts } from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import { InterchainGasPaymaster } from "@hyperlane-xyz/contracts/hooks/igp/InterchainGasPaymaster.sol";
import { ERC5164PayableHook } from "../src/ERC5164PayableHook.sol";

contract SendMessageScript is Script {
    using TypeCasts for address;

    function run() external {
        // Start broadcasting to the network
        vm.startBroadcast();
        
        uint32 destinationDomain = 1337; // warden chain id

        // Mailbox on Anvil
        IMailbox mailbox = IMailbox(
            0x9959e8C9Cc02cA2f727B0b9E14bacbb270c03eF6 // source mailbox address
        );
        
        StaticAggregationHookFactory factory = StaticAggregationHookFactory(
            0x0f25Ef0425E15b0d843Ed542CC4fA7F4636727BD // source factory address
        );

        InterchainGasPaymaster igp = InterchainGasPaymaster(0x69982FD5372A86D66614A55f97Dd71Ac30135968); // IGP hook
        destinationIsm = 0x4043B5bd20Cb3a98DC0ECD3a73769fE0580f0232; // address of destination ERC5164Ism

        erc5164Owner = 0x6EA8AC1673402989E7B653AE4E83B54173719C30;
        erc5164Beneficiary = 0x6EA8AC1673402989E7B653AE4E83B54173719C30;

        address[] memory hooks = new address[](2);
        hooks[0] = address(igp); // IGP hook
        
        ERC5164PayableHook erc5164PayableHook = new ERC5164PayableHook(
            address(mailbox),
            destinationDomain,
            destinationIsm.addressToBytes32());
        
        erc5164PayableHook.initialize(erc5164Owner, erc5164Beneficiary);
        InterchainGasPaymaster.DomainGasConfig memory domainGasConfig = igp.destinationGasConfigs(destinationDomain);
        InterchainGasPaymaster.GasParam memory gasParam = 
            InterchainGasPaymaster.GasParam(destinationDomain, domainGasConfig);
        InterchainGasPaymaster.GasParam[] memory gasParams = new InterchainGasPaymaster.GasParam[](1);
        gasParams[0] = gasParam;
        erc5164PayableHook.setDestinationGasConfigs(_configs);
        hooks[1] = address(erc5164PayableHook);
        hook = StaticAggregationHook(factory.deploy(hooks));

        console.log("Deployed ERC5164PayableHook hook:");
        console.logAddress(address(erc5164PayableHook));
        console.log("Deployed aggregation hook:");
        console.logAddress(hook);

        vm.stopBroadcast();
    }
}