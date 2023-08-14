pragma solidity ^0.5.17;


/**
* @title Checkpointing - Library to handle a historic set of numeric values
*/
library Checkpointing {
    uint256 private constant MAX_UINT192 = uint256(uint192(-1));

    string private constant ERROR_VALUE_TOO_BIG = "CHECKPOINT_VALUE_TOO_BIG";
    string private constant ERROR_CANNOT_ADD_PAST_VALUE = "CHECKPOINT_CANNOT_ADD_PAST_VALUE";

    /**
     * @dev To specify a value at a given point in time, we need to store two values:
     *      - `time`: unit-time value to denote the first time when a value was registered
     *      - `value`: a positive numeric value to registered at a given point in time
     *
     *      Note that `time` does not need to refer necessarily to a timestamp value, any time unit could be used
     *      for it like block numbers, terms, etc.
     */
    struct Checkpoint {
        uint64 time;
        uint192 value;
    }

    /**
     * @dev A history simply denotes a list of checkpoints
     */
    struct History {
        Checkpoint[] history;
    }

    /**
     * @dev Add a new value to a history for a given point in time. This function does not allow to add values previous
     *      to the latest registered value, if the value willing to add corresponds to the latest registered value, it
     *      will be updated.
     * @param self Checkpoints history to be altered
     * @param _time Point in time to register the given value
     * @param _value Numeric value to be registered at the given point in time
     */
    function add(History storage self, uint64 _time, uint256 _value) internal {
        require(_value <= MAX_UINT192, ERROR_VALUE_TOO_BIG);
        _add192(self, _time, uint192(_value));
    }

    /**
     * TODO
     */
    function lastUpdate(History storage self) internal view returns (uint256) {
        uint256 length = self.history.length;

        if (length > 0) {
            return uint256(self.history[length - 1].time);
        }

        return 0;
    }

    /**
     * @dev Fetch the latest registered value of history, it will return zero if there was no value registered
     * @param self Checkpoints history to be queried
     */
    function getLast(History storage self) internal view returns (uint256) {
        uint256 length = self.history.length;
        if (length > 0) {
            return uint256(self.history[length - 1].value);
        }

        return 0;
    }

    /**
     * @dev Fetch the most recent registered past value of a history based on a given point in time that is not known
     *      how recent it is beforehand. It will return zero if there is no registered value or if given time is
     *      previous to the first registered value.
     *      It uses a binary search.
     * @param self Checkpoints history to be queried
     * @param _time Point in time to query the most recent registered past value of
     */
    function get(History storage self, uint64 _time) internal view returns (uint256) {
        return _binarySearch(self, _time);
    }

    /**
     * @dev Private function to add a new value to a history for a given point in time. This function does not allow to
     *      add values previous to the latest registered value, if the value willing to add corresponds to the latest
     *      registered value, it will be updated.
     * @param self Checkpoints history to be altered
     * @param _time Point in time to register the given value
     * @param _value Numeric value to be registered at the given point in time
     */
    function _add192(History storage self, uint64 _time, uint192 _value) private {
        uint256 length = self.history.length;
        if (length == 0 || self.history[self.history.length - 1].time < _time) {
            // If there was no value registered or the given point in time is after the latest registered value,
            // we can insert it to the history directly.
            self.history.push(Checkpoint(_time, _value));
        } else {
            // If the point in time given for the new value is not after the latest registered value, we must ensure
            // we are only trying to update the latest value, otherwise we would be changing past data.
            Checkpoint storage currentCheckpoint = self.history[length - 1];
            require(_time == currentCheckpoint.time, ERROR_CANNOT_ADD_PAST_VALUE);
            currentCheckpoint.value = _value;
        }
    }

    /**
     * @dev Private function execute a binary search to find the most recent registered past value of a history based on
     *      a given point in time. It will return zero if there is no registered value or if given time is previous to
     *      the first registered value. Note that this function will be more suitable when don't know how recent the
     *      time used to index may be.
     * @param self Checkpoints history to be queried
     * @param _time Point in time to query the most recent registered past value of
     */
    function _binarySearch(History storage self, uint64 _time) private view returns (uint256) {
        // If there was no value registered for the given history return simply zero
        uint256 length = self.history.length;
        if (length == 0) {
            return 0;
        }

        // If the requested time is equal to or after the time of the latest registered value, return latest value
        uint256 lastIndex = length - 1;
        if (_time >= self.history[lastIndex].time) {
            return uint256(self.history[lastIndex].value);
        }

        // If the requested time is previous to the first registered value, return zero to denote missing checkpoint
        if (_time < self.history[0].time) {
            return 0;
        }

        // Execute a binary search between the checkpointed times of the history
        uint256 low = 0;
        uint256 high = lastIndex;

        while (high > low) {
            // No need for SafeMath: for this to overflow array size should be ~2^255
            uint256 mid = (high + low + 1) / 2;
            Checkpoint storage checkpoint = self.history[mid];
            uint64 midTime = checkpoint.time;

            if (_time > midTime) {
                low = mid;
            } else if (_time < midTime) {
                // No need for SafeMath: high > low >= 0 => high >= 1 => mid >= 1
                high = mid - 1;
            } else {
                return uint256(checkpoint.value);
            }
        }

        return uint256(self.history[low].value);
    }
}
