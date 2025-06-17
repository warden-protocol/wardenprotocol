// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.25;

import "precompile-async/IAsync.sol";
import "precompile-sched/ISched.sol";
import "precompile-common/Types.sol";
import { IMailbox } from "@hyperlane-xyz/contracts/interfaces/IMailbox.sol";
import { IPostDispatchHook } from "@hyperlane-xyz/contracts/interfaces/hooks/IPostDispatchHook.sol";
import { TypeCasts } from "@hyperlane-xyz/contracts/libs/TypeCasts.sol";
import { 
    IInterchainSecurityModule,
    ISpecifiesInterchainSecurityModule
} from "@hyperlane-xyz/contracts/interfaces/IInterchainSecurityModule.sol";

error Unauthorized();
error NotReady();

contract Origin {
    IMailbox public mailbox;
    bytes32 public destinationSender;
    bytes public destinationMsg;
    constructor(address _mailbox) {
        mailbox = IMailbox(_mailbox);
    }
    function dispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) external payable returns (bytes32 messageId) {
        return mailbox.dispatch{value: msg.value}(destinationDomain, recipientAddress, messageBody);
    }
    function quoteDispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) external view returns (uint256 fee) {
        return mailbox.quoteDispatch(destinationDomain, recipientAddress, messageBody);
    }

    function dispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody,
        bytes calldata hookMetadata,
        IPostDispatchHook hook
    ) external payable returns (bytes32 messageId) {
        return mailbox.dispatch{value: msg.value}(destinationDomain, recipientAddress, messageBody, hookMetadata, hook);
    }

    function quoteDispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody,
        bytes calldata hookMetadata,
        IPostDispatchHook hook
    ) external view returns (uint256 fee) {
        return mailbox.quoteDispatch(destinationDomain, recipientAddress, messageBody, hookMetadata, hook);
    }

    function handle(
        uint32,
        bytes32 _sender,
        bytes calldata _message
    ) external payable {
        destinationSender = _sender;
        destinationMsg = _message;
    }
}

contract Destination is ISpecifiesInterchainSecurityModule {
    using TypeCasts for address;
    
    uint64 public lastTaskId;
    uint64 public lastCbId;

    bytes public output;
    IMailbox public mailbox;
    IInterchainSecurityModule public ism;
    uint32 public origin;
    bytes32 public sender;
    bytes public payload;

    constructor(address _mailbox, address _ism) {
        mailbox = IMailbox(_mailbox);
        ism = IInterchainSecurityModule(_ism);
    }

    function Run(bytes calldata input) external {
        Types.Coin[] memory maxFee;
        lastTaskId = 
            IASYNC_CONTRACT.addTask("echo", input, maxFee, CallbackParams(address(this), 100000000));

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

        // bytes32 _sender = sender.addressToBytes32();
        uint256 fee = mailbox.quoteDispatch(origin, sender, output);
        mailbox.dispatch{value: fee}(origin, sender, output);

        return o;
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _payload
    ) external payable {
        origin = _origin;
        sender = _sender;
        payload = _payload;
        this.Run(_payload);
    }

    function interchainSecurityModule()
        external
        view
        returns (IInterchainSecurityModule) {
            return ism;
        }

    receive() external payable {}
}