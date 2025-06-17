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
        

        bytes memory payload = hex"111111122222222222222222222222";

        // Mailbox on Anvil
        IMailbox mailbox = IMailbox(
            0xd8Ac2849f01C819a6f8185A35cE31DBeeF0cd674  // Origin address
        );

        uint32 destination = 12345;
        // recipient would be the destination contract address, needs to have handle() function
        bytes32 recipient = bytes32(uint256(uint160(0xD11B11d43B36693bB0226fCab55E3c66980e71dF)));

        IPostDispatchHook hook = 
            IPostDispatchHook(0xa5012c86E891e21384FCE20e828B7f9eB58f20d8); //Aggregation with ERC5164PayableHook address
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