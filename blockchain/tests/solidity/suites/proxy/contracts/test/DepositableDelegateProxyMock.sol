pragma solidity 0.4.24;

import "../DepositableDelegateProxy.sol";


contract DepositableDelegateProxyMock is DepositableDelegateProxy {
    address private implementationMock;

    function enableDepositsOnMock() external {
        setDepositable(true);
    }

    function setImplementationOnMock(address _implementationMock) external {
        implementationMock = _implementationMock;
    }

    function implementation() public view returns (address) {
        return implementationMock;
    }

    function proxyType() public pure returns (uint256 proxyTypeId) {
        return UPGRADEABLE;
    }
}
