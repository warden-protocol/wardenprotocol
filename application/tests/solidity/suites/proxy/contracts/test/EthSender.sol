pragma solidity 0.4.24;


contract EthSender {
    function sendEth(address to) external payable {
        to.transfer(msg.value);
    }
}
