// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "precompile-async/IAsync.sol";
import "precompile-sched/ISched.sol";
import "precompile-common/Types.sol";
import { IMailbox } from "@hyperlane-xyz/contracts/interfaces/IMailbox.sol";
import { TypeCasts } from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import { IInterchainSecurityModule, ISpecifiesInterchainSecurityModule } from '@hyperlane-xyz/contracts/interfaces/IInterchainSecurityModule.sol';

error Unauthorized();
error NotReady();

contract Destination is ISpecifiesInterchainSecurityModule {
    using TypeCasts for address;
    
    uint64 public lastTaskId;
    uint64 public lastCbId;

    bytes public output;
    IMailbox public mailbox;
    IInterchainSecurityModule public ism;
    // uint32 origin;
    // bytes32 sender;
    // bytes payload;

    constructor(address _mailbox, address _ism) {
        mailbox = IMailbox(_mailbox);
        ism = IInterchainSecurityModule(_ism);
    }

    function run(bytes calldata payload) external {
        Types.Coin[] memory maxFee;
        lastTaskId = 
            IASYNC_CONTRACT.addTask("echo", payload, maxFee, CallbackParams(address(this), 100000000));

        TaskByIdResponse memory taskResponse = IASYNC_CONTRACT.taskById(lastTaskId);
        lastCbId = taskResponse.taskResponse.task.callbackId;
    }

    function cb(uint64 id, bytes calldata o) external returns(bytes memory)  {
        // if(msg.sender != ISCHED_CONTRACT.getAddress()) {
        //     revert Unauthorized();
        // }

        // if(id == lastCbId) {
        TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(id);

        if (task.taskResponse.result.id == 0) revert NotReady();

        output = task.taskResponse.result.output;
        // }

        bytes32 _sender = (0x25678c9AAC4D86fC411A6A40bCB7D81B3A18240d).addressToBytes32();
        uint256 fee = mailbox.quoteDispatch(31337, _sender, output);
        mailbox.dispatch{value: fee}(31337, _sender, output);

        return o;
    }

    function handle(
        uint32,
        bytes32,
        bytes calldata payload
    ) external payable {
        this.run(payload);
    }

    function interchainSecurityModule()
        external
        view
        returns (IInterchainSecurityModule) {
            return ism;
        }

        receive() external payable {}
}