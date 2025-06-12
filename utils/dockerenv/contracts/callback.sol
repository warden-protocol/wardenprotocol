pragma solidity ^0.8.25;

import "/precompiles/async/IAsync.sol";
import "/precompiles/common/Types.sol";

error Unauthorized();
error NotReady();

interface IMailbox {
    function dispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) external payable returns (bytes32 messageId);
    function quoteDispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody
    ) external view returns (uint256 fee);
}

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
    function handle(
        uint32,
        bytes32 _sender,
        bytes calldata _message
    ) external payable {
        destinationSender = _sender;
        destinationMsg = _message;
    }
}

contract Destination {
    IMailbox public mailbox;
    bytes32 public destinationSender;
    bytes public destinationMsg;
    uint32 public origin;
    bytes32 public sender;
    bytes32 public msgId;
    uint64 public lastTaskId;
    uint64 public lastCbId;
    bytes public output;
    constructor(address _mailbox) {
        mailbox = IMailbox(_mailbox);
    }
    
    function Run(bytes calldata payload) public {
        Types.Coin[] memory maxFee;
        (string memory plugin, string memory payloadStr) = abi.decode(payload, (string,string));

        // Use the decoded fields
        lastTaskId = 
            IASYNC_CONTRACT.addTask(
            plugin, 
            bytes(payloadStr), 
            maxFee, 
            CallbackParams(address(this), 100000000)
        );

        TaskByIdResponse memory taskResponse = IASYNC_CONTRACT.taskById(lastTaskId);
        lastCbId = taskResponse.taskResponse.task.callbackId;
    }

    function cb(uint64 id, bytes calldata o) external returns(bytes memory)  {
        if(msg.sender != ISCHED_CONTRACT.getAddress()) {
            revert Unauthorized();
        }

        if(id == lastCbId) {
            TaskByIdResponse memory task = IASYNC_CONTRACT.taskById(lastTaskId);

            if (task.taskResponse.result.id == 0) revert NotReady();

            output = task.taskResponse.result.output;
        }
        uint256 fees = mailbox.quoteDispatch(origin, sender, output);
        msgId = mailbox.dispatch{value: fees}(origin, sender, output);
        return o;
    }
    
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata input
    ) external payable {
        origin = _origin;
        sender = _sender;
        Run(input);
    }
}
