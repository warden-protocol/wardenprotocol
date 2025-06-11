// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/src/Script.sol";
import "forge-std/src/console.sol";
import { StaticAggregationHookFactory } 
    from "@hyperlane-xyz/contracts/hooks/aggregation/StaticAggregationHookFactory.sol";
import { StaticAggregationHook } from "@hyperlane-xyz/contracts/hooks/aggregation/StaticAggregationHook.sol";
import { TypeCasts } from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import { IMailbox } from "@hyperlane-xyz/contracts/interfaces/IMailbox.sol";
import { IGasOracle } from "@hyperlane-xyz/contracts/interfaces/IGasOracle.sol";
import { InterchainGasPaymaster } from "@hyperlane-xyz/contracts/hooks/igp/InterchainGasPaymaster.sol";
import { ERC5164PayableHook } from "../src/ERC5164PayableHook.sol";

contract SendMessageScript is Script {
    using TypeCasts for address;

    uint32 public destinationDomain = 12345; // warden chain id

    // Mailbox on Anvil
    IMailbox public mailbox = IMailbox(
        0xfaE46352d9E576F49787b3e3163090AC3507dF62 // source mailbox address
    );
    
    StaticAggregationHookFactory public factory = StaticAggregationHookFactory(
        0x0997931fFdBcAaddDA325153C1E1c4859fdF3317 // source factory address
    );

    InterchainGasPaymaster public igp = InterchainGasPaymaster(0x522D49aff9068060a4dBd4A6A5Aec6ACA4b8Da12); // IGP hook
    address public destinationIsm = 0x298950de5075C575267C4570b028c69A9DF17841; // address of destination ERC5164Ism

    address public erc5164Owner = 0xF7bFA2bc2C4c18eB68CAeDad58e5cAAB2A77c7F7;
    address public erc5164Beneficiary = 0xE5C25663E60cA459b7630FD7880A99Bc45c054F6;
    
    function run() external {
        // Start broadcasting to the network
        vm.startBroadcast();
        

        address[] memory hooks = new address[](2);
        hooks[0] = address(mailbox.defaultHook()); // IGP hook
        
        ERC5164PayableHook erc5164PayableHook = new ERC5164PayableHook(
            address(mailbox),
            destinationDomain,
            destinationIsm.addressToBytes32());
        
        erc5164PayableHook.initialize(erc5164Owner, erc5164Beneficiary);
        (IGasOracle gasOracle, uint96 gasOverhead) = igp.destinationGasConfigs(destinationDomain);
        InterchainGasPaymaster.GasParam memory gasParam = 
            InterchainGasPaymaster.GasParam(
                destinationDomain,
                InterchainGasPaymaster.DomainGasConfig(gasOracle, gasOverhead));

        InterchainGasPaymaster.GasParam[] memory gasParams = new InterchainGasPaymaster.GasParam[](1);
        gasParams[0] = gasParam;
        erc5164PayableHook.setDestinationGasConfigs(gasParams);
        hooks[1] = address(erc5164PayableHook);
        StaticAggregationHook hook = StaticAggregationHook(factory.deploy(hooks));

        console.log("Deployed ERC5164PayableHook hook:");
        console.logAddress(address(erc5164PayableHook));
        console.log("Deployed aggregation hook:");
        console.logAddress(address(hook));

        vm.stopBroadcast();
    }
}