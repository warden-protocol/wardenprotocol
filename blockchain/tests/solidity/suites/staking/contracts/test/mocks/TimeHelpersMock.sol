pragma solidity ^0.5.17;

import "../../lib/os/TimeHelpers.sol";
import "../..//lib/os/SafeMath.sol";
import "../..//lib/os/SafeMath64.sol";


contract TimeHelpersMock is TimeHelpers {
    using SafeMath for uint256;
    using SafeMath64 for uint64;

    uint256 public mockedTimestamp;
    uint256 public mockedBlockNumber;

    /**
    * @dev Sets a mocked timestamp value, used only for testing purposes
    */
    function mockSetTimestamp(uint256 _timestamp) external {
        mockedTimestamp = _timestamp;
    }

    /**
    * @dev Increases the mocked timestamp value, used only for testing purposes
    */
    function mockIncreaseTime(uint256 _seconds) external {
        if (mockedTimestamp != 0) mockedTimestamp = mockedTimestamp.add(_seconds);
        else mockedTimestamp = block.timestamp.add(_seconds);
    }

    /**
    * @dev Decreases the mocked timestamp value, used only for testing purposes
    */
    function mockDecreaseTime(uint256 _seconds) external {
        if (mockedTimestamp != 0) mockedTimestamp = mockedTimestamp.sub(_seconds);
        else mockedTimestamp = block.timestamp.sub(_seconds);
    }

    /**
    * @dev Advances the mocked block number value, used only for testing purposes
    */
    function mockAdvanceBlocks(uint256 _number) external {
        if (mockedBlockNumber != 0) mockedBlockNumber = mockedBlockNumber.add(_number);
        else mockedBlockNumber = block.number.add(_number);
    }

    /**
    * @dev Returns the mocked timestamp value
    */
    function getTimestampPublic() external view returns (uint64) {
        return getTimestamp64();
    }

    /**
    * @dev Returns the mocked block number value
    */
    function getBlockNumberPublic() external view returns (uint256) {
        return getBlockNumber();
    }

    /**
    * @dev Returns the mocked timestamp if it was set, or current `block.timestamp`
    */
    function getTimestamp() internal view returns (uint256) {
        if (mockedTimestamp != 0) return mockedTimestamp;
        return super.getTimestamp();
    }

    /**
    * @dev Returns the mocked block number if it was set, or current `block.number`
    */
    function getBlockNumber() internal view returns (uint256) {
        if (mockedBlockNumber != 0) return mockedBlockNumber;
        return super.getBlockNumber();
    }
}
