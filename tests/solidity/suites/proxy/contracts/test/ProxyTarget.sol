pragma solidity 0.4.24;

contract ProxyTargetWithoutFallback {
    event Pong();

    function ping() external {
      emit Pong();
    }
}

contract ProxyTargetWithFallback is ProxyTargetWithoutFallback {
    event ReceivedEth();

    function () external payable {
      emit ReceivedEth();
    }
}
