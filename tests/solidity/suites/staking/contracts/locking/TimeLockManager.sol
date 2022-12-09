pragma solidity 0.5.17;

import "../lib/os/TimeHelpers.sol";
import "../lib/os/ScriptHelpers.sol";

import "../locking/ILockManager.sol";
import "../locking/IStakingLocking.sol";


/**
 * Time based lock manager for Staking contract
 * Allows to set a time interval, either in blocks or seconds, during which the funds are locked.
 * Outside that window the owner can unlock them.
 */
contract TimeLockManager is ILockManager, TimeHelpers {
    using ScriptHelpers for bytes;

    string private constant ERROR_ALREADY_LOCKED = "TLM_ALREADY_LOCKED";
    string private constant ERROR_WRONG_INTERVAL = "TLM_WRONG_INTERVAL";

    enum TimeUnit { Blocks, Seconds }

    struct TimeInterval {
        uint256 unit;
        uint256 start;
        uint256 end;
    }

    mapping (address => TimeInterval) internal timeIntervals;

    event LogLockCallback(uint256 amount, uint256 allowance, bytes data);

    /**
     * @notice Set a locked amount, along with a time interval, either in blocks or seconds during which the funds are locked.
     * @param _staking The Staking contract holding the lock
     * @param _owner The account owning the locked funds
     * @param _amount The amount to be locked
     * @param _unit Blocks or seconds, the unit for the time interval
     * @param _start The start of the time interval
     * @param _end The end of the time interval
     */
    function lock(IStakingLocking _staking, address _owner, uint256 _amount, uint256 _unit, uint256 _start, uint256 _end) external {
        require(timeIntervals[_owner].end == 0, ERROR_ALREADY_LOCKED);
        require(_end > _start, ERROR_WRONG_INTERVAL);
        timeIntervals[_owner] = TimeInterval(_unit, _start, _end);

        _staking.lock(_owner, address(this), _amount);
    }

    /**
     * @notice Check if the owner can unlock the funds, i.e., if current timestamp is outside the lock interval
     * @param _owner Owner of the locked funds
     * @return True if current timestamp is outside the lock interval
     */
    function canUnlock(address _owner, uint256) external view returns (bool) {
        TimeInterval storage timeInterval = timeIntervals[_owner];
        uint256 comparingValue;
        if (timeInterval.unit == uint256(TimeUnit.Blocks)) {
            comparingValue = getBlockNumber();
        } else {
            comparingValue = getTimestamp();
        }

        return comparingValue < timeInterval.start || comparingValue > timeInterval.end;
    }

    function getTimeInterval(address _owner) external view returns (uint256 unit, uint256 start, uint256 end) {
        TimeInterval storage timeInterval = timeIntervals[_owner];

        return (timeInterval.unit, timeInterval.start, timeInterval.end);
    }
}
