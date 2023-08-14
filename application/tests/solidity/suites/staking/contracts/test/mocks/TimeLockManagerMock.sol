pragma solidity 0.5.17;

import "../../locking/TimeLockManager.sol";
import "../../Staking.sol";


contract TimeLockManagerMock is TimeLockManager {
    uint64 public constant MAX_UINT64 = uint64(-1);

    uint256 _mockTime = now;
    uint256 _mockBlockNumber = block.number;

    function getTimestampExt() external view returns (uint256) {
        return getTimestamp();
    }

    function getBlockNumberExt() external view returns (uint256) {
        return getBlockNumber();
    }

    function setTimestamp(uint256 i) public {
        _mockTime = i;
    }

    function setBlockNumber(uint256 i) public {
        _mockBlockNumber = i;
    }

    function getTimestamp() internal view returns (uint256) {
        return _mockTime;
    }

    function getBlockNumber() internal view returns (uint256) {
        return _mockBlockNumber;
    }
}
