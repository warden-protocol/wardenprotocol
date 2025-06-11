// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/src/Script.sol";
import "forge-std/src/console.sol";
import { IMailbox } from "@hyperlane-xyz/contracts/interfaces/IMailbox.sol";
import { StandardHookMetadata } from "@hyperlane-xyz/contracts/hooks/libs/StandardHookMetadata.sol";
import { IPostDispatchHook } from "@hyperlane-xyz/contracts/interfaces/hooks/IPostDispatchHook.sol";

contract SendMessageScript is Script {
    function run() external {
        // Start broadcasting to the network
        vm.startBroadcast();
        

        bytes memory payload = hex"123456";

        // Mailbox on Anvil
        IMailbox mailbox = IMailbox(
            0xd8Ac2849f01C819a6f8185A35cE31DBeeF0cd674  // Origin address
        );

        uint32 destination = 12345;
        // recipient would be the destination contract address, needs to have handle() function
        bytes32 recipient = bytes32(uint256(uint160(0x556556F69046701C48CD07eFa533448ec8FC4829)));

        IPostDispatchHook hook = 
            IPostDispatchHook(0x7A0Bba2e754Ed39073C8a04F6E333CcD01a0fBa9); //Aggregation with ERC5164PayableHook address
        // construct hook metadata:
        uint256 _msgValue = 20 ether; // WARD
        uint256 _gasLimit = 50_000; // 50_000 is default
        address _refundAddress = 0x6Ea8aC1673402989e7B653aE4e83b54173719C30; // tx origin for example, refund ETH on anvil
        bytes memory metadata = StandardHookMetadata.formatMetadata(
            _msgValue,
            _gasLimit,
            _refundAddress,
            ""
        );
        // queries from source chain fees from Oracles
        uint256 fee = mailbox.quoteDispatch(
            destination,
            recipient,
            payload,
            metadata,
            hook
        );

        bytes32 messageId = mailbox.dispatch{value: fee}(
            destination,
            recipient,
            payload,
            metadata,
            hook
        );

        console.log("Dispatched messageId:");
        console.logBytes32(messageId);

        vm.stopBroadcast();
    }
}