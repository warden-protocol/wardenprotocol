pragma solidity ^0.8.25;

import "/precompiles/slinky/ISlinky.sol";

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

contract Destination {
    IMailbox public mailbox;
    bytes32 public destinationSender;
    bytes public destinationMsg;
    uint32 public origin;
    bytes32 public sender;
    bytes public output;
    constructor(address _mailbox) {
        mailbox = IMailbox(_mailbox);
    }
    
    function Run(bytes calldata payload) public {
        (string memory base, string memory quote) = abi.decode(payload, (string,string));

        // Get the price 
        GetPriceResponse memory priceResponse = ISLINKY_CONTRACT.getPrice(base, quote);

        uint256 price = priceResponse.price.price / (10 ** priceResponse.decimals);
        bytes memory priceBytes = abi.encode(price);
        // Send the price back to the origin
        uint256 fees = mailbox.quoteDispatch(origin, sender, priceBytes);
        mailbox.dispatch{value: fees}(origin, sender, priceBytes);
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
