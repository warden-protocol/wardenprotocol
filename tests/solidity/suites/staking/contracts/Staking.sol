pragma solidity 0.5.17;

import "./lib/os/SafeMath.sol";
import "./lib/os/SafeERC20.sol";
import "./lib/os/IsContract.sol";
import "./lib/os/Autopetrified.sol";
import "./lib/Checkpointing.sol";

import "./standards/ERC900.sol";
import "./locking/IStakingLocking.sol";
import "./locking/ILockManager.sol";


contract Staking is Autopetrified, ERC900, IStakingLocking, IsContract {
    using SafeMath for uint256;
    using Checkpointing for Checkpointing.History;
    using SafeERC20 for ERC20;

    uint256 private constant MAX_UINT64 = uint256(uint64(-1));

    string private constant ERROR_TOKEN_NOT_CONTRACT = "STAKING_TOKEN_NOT_CONTRACT";
    string private constant ERROR_AMOUNT_ZERO = "STAKING_AMOUNT_ZERO";
    string private constant ERROR_TOKEN_TRANSFER = "STAKING_TOKEN_TRANSFER_FAIL";
    string private constant ERROR_TOKEN_DEPOSIT = "STAKING_TOKEN_DEPOSIT_FAIL";
    string private constant ERROR_TOKEN_NOT_SENDER = "STAKING_TOKEN_NOT_SENDER";
    string private constant ERROR_WRONG_TOKEN = "STAKING_WRONG_TOKEN";
    string private constant ERROR_NOT_ENOUGH_BALANCE = "STAKING_NOT_ENOUGH_BALANCE";
    string private constant ERROR_NOT_ENOUGH_ALLOWANCE = "STAKING_NOT_ENOUGH_ALLOWANCE";
    string private constant ERROR_SENDER_NOT_ALLOWED = "STAKING_SENDER_NOT_ALLOWED";
    string private constant ERROR_ALLOWANCE_ZERO = "STAKING_ALLOWANCE_ZERO";
    string private constant ERROR_LOCK_ALREADY_EXISTS = "STAKING_LOCK_ALREADY_EXISTS";
    string private constant ERROR_LOCK_DOES_NOT_EXIST = "STAKING_LOCK_DOES_NOT_EXIST";
    string private constant ERROR_NOT_ENOUGH_LOCK = "STAKING_NOT_ENOUGH_LOCK";
    string private constant ERROR_CANNOT_UNLOCK = "STAKING_CANNOT_UNLOCK";
    string private constant ERROR_CANNOT_CHANGE_ALLOWANCE = "STAKING_CANNOT_CHANGE_ALLOWANCE";
    string private constant ERROR_LOCKMANAGER_CALL_FAIL = "STAKING_LOCKMANAGER_CALL_FAIL";
    string private constant ERROR_BLOCKNUMBER_TOO_BIG = "STAKING_BLOCKNUMBER_TOO_BIG";

    struct Lock {
        uint256 amount;
        uint256 allowance;  // must be greater than zero to consider the lock active, and always greater than or equal to amount
    }

    struct Account {
        mapping (address => Lock) locks; // from manager to lock
        uint256 totalLocked;
        Checkpointing.History stakedHistory;
    }

    ERC20 internal stakingToken;
    mapping (address => Account) internal accounts;
    Checkpointing.History internal totalStakedHistory;

    /**
     * @notice Initialize Staking app with token `_stakingToken`
     * @param _stakingToken ERC20 token used for staking
     */
    function initialize(ERC20 _stakingToken) external {
        require(isContract(address(_stakingToken)), ERROR_TOKEN_NOT_CONTRACT);
        initialized();
        stakingToken = _stakingToken;
    }

    /**
     * @notice Stakes `@tokenAmount(self.token(): address, _amount)`, transferring them from `msg.sender`
     * @param _amount Number of tokens staked
     * @param _data Used in Staked event, to add signalling information in more complex staking applications
     */
    function stake(uint256 _amount, bytes calldata _data) external isInitialized {
        _stakeFor(msg.sender, msg.sender, _amount, _data);
    }

    /**
     * @notice Stakes `@tokenAmount(self.token(): address, _amount)`, transferring them from `msg.sender`, and assigns them to `_user`
     * @param _user The receiving accounts for the tokens staked
     * @param _amount Number of tokens staked
     * @param _data Used in Staked event, to add signalling information in more complex staking applications
     */
    function stakeFor(address _user, uint256 _amount, bytes calldata _data) external isInitialized {
        _stakeFor(msg.sender, _user, _amount, _data);
    }

    /**
     * @notice Unstakes `@tokenAmount(self.token(): address, _amount)`, returning them to the user
     * @param _amount Number of tokens to unstake
     * @param _data Used in Unstaked event, to add signalling information in more complex staking applications
     */
    function unstake(uint256 _amount, bytes calldata _data) external isInitialized {
        // unstaking 0 tokens is not allowed
        require(_amount > 0, ERROR_AMOUNT_ZERO);

        _unstake(msg.sender, _amount, _data);
    }

    /**
     * @notice Allow `_lockManager` to lock up to `@tokenAmount(self.token(): address, _allowance)` of `msg.sender`
     *         It creates a new lock, so the lock for this manager cannot exist before.
     * @param _lockManager The manager entity for this particular lock
     * @param _allowance Amount of tokens that the manager can lock
     * @param _data Data to parametrize logic for the lock to be enforced by the manager
     */
    function allowManager(address _lockManager, uint256 _allowance, bytes calldata _data) external isInitialized {
        _allowManager(_lockManager, _allowance, _data);
    }

    /**
     * @notice Lock `@tokenAmount(self.token(): address, _amount)` and assign `_lockManager` as manager with `@tokenAmount(self.token(): address, _allowance)` allowance and `_data` as data, so they can not be unstaked
     * @param _amount The amount of tokens to be locked
     * @param _lockManager The manager entity for this particular lock. This entity will have full control over the lock, in particular will be able to unlock it
     * @param _allowance Amount of tokens that the manager can lock
     * @param _data Data to parametrize logic for the lock to be enforced by the manager
     */
    function allowManagerAndLock(uint256 _amount, address _lockManager, uint256 _allowance, bytes calldata _data) external isInitialized {
        _allowManager(_lockManager, _allowance, _data);

        _lockUnsafe(msg.sender, _lockManager, _amount);
    }

    /**
     * @notice Transfer `@tokenAmount(self.token(): address, _amount)` to `_to`’s staked balance
     * @param _to Recipient of the tokens
     * @param _amount Number of tokens to be transferred
     */
    function transfer(address _to, uint256 _amount) external isInitialized {
        _transfer(msg.sender, _to, _amount);
    }

    /**
     * @notice Transfer `@tokenAmount(self.token(): address, _amount)` to `_to`’s external balance (i.e. unstaked)
     * @param _to Recipient of the tokens
     * @param _amount Number of tokens to be transferred
     */
    function transferAndUnstake(address _to, uint256 _amount) external isInitialized {
        _transfer(msg.sender, _to, _amount);
        _unstake(_to, _amount, new bytes(0));
    }

    /**
     * @notice Transfer `@tokenAmount(self.token(): address, _amount)` from `_from`'s lock by `msg.sender` to `_to`
     * @param _from Owner of locked tokens
     * @param _to Recipient of the tokens
     * @param _amount Number of tokens to be transferred
     */
    function slash(
        address _from,
        address _to,
        uint256 _amount
    )
        external
        isInitialized
    {
        _unlockUnsafe(_from, msg.sender, _amount);
        _transfer(_from, _to, _amount);
    }

    /**
     * @notice Transfer `@tokenAmount(self.token(): address, _amount)` from `_from`'s lock by `msg.sender` to `_to` (unstaked)
     * @param _from Owner of locked tokens
     * @param _to Recipient of the tokens
     * @param _amount Number of tokens to be transferred
     */
    function slashAndUnstake(
        address _from,
        address _to,
        uint256 _amount
    )
        external
        isInitialized
    {
        _unlockUnsafe(_from, msg.sender, _amount);
        _transfer(_from, _to, _amount);
        _unstake(_to, _amount, new bytes(0));
    }

    /**
     * @notice Transfer `@tokenAmount(self.token(): address, _slashAmount)` from `_from`'s lock by `msg.sender` to `_to`, and decrease `@tokenAmount(self.token(): address, _unlockAmount)` from that lock
     * @param _from Owner of locked tokens
     * @param _to Recipient of the tokens
     * @param _unlockAmount Number of tokens to be unlocked
     * @param _slashAmount Number of tokens to be transferred
     */
    function slashAndUnlock(
        address _from,
        address _to,
        uint256 _unlockAmount,
        uint256 _slashAmount
    )
        external
        isInitialized
    {
        // No need to check that _slashAmount is positive, as _transfer will fail
        // No need to check that have enough locked funds, as _unlockUnsafe will fail
        require(_unlockAmount > 0, ERROR_AMOUNT_ZERO);

        _unlockUnsafe(_from, msg.sender, _unlockAmount.add(_slashAmount));
        _transfer(_from, _to, _slashAmount);
    }

    /**
     * @notice Increase allowance by `@tokenAmount(self.token(): address, _allowance)` of lock manager `_lockManager` for user `msg.sender`
     * @param _lockManager The manager entity for this particular lock
     * @param _allowance Amount of allowed tokens increase
     */
    function increaseLockAllowance(address _lockManager, uint256 _allowance) external isInitialized {
        Lock storage lock_ = accounts[msg.sender].locks[_lockManager];
        require(lock_.allowance > 0, ERROR_LOCK_DOES_NOT_EXIST);

        _increaseLockAllowance(_lockManager, lock_, _allowance);
    }

    /**
     * @notice Decrease allowance by `@tokenAmount(self.token(): address, _allowance)` of lock manager `_lockManager` for user `_user`
     * @param _user Owner of locked tokens
     * @param _lockManager The manager entity for this particular lock
     * @param _allowance Amount of allowed tokens decrease
     */
    function decreaseLockAllowance(address _user, address _lockManager, uint256 _allowance) external isInitialized {
        // only owner and manager can decrease allowance
        require(msg.sender == _user || msg.sender == _lockManager, ERROR_CANNOT_CHANGE_ALLOWANCE);
        require(_allowance > 0, ERROR_AMOUNT_ZERO);

        Lock storage lock_ = accounts[_user].locks[_lockManager];
        uint256 newAllowance = lock_.allowance.sub(_allowance);
        require(newAllowance >= lock_.amount, ERROR_NOT_ENOUGH_ALLOWANCE);
        // unlockAndRemoveManager must be used for this:
        require(newAllowance > 0, ERROR_ALLOWANCE_ZERO);

        lock_.allowance = newAllowance;

        emit LockAllowanceChanged(_user, _lockManager, _allowance, false);
    }

    /**
     * @notice Increase locked amount by `@tokenAmount(self.token(): address, _amount)` for user `_user` by lock manager `_lockManager`
     * @param _user Owner of locked tokens
     * @param _lockManager The manager entity for this particular lock
     * @param _amount Amount of locked tokens increase
     */
    function lock(address _user, address _lockManager, uint256 _amount) external isInitialized {
        // we are locking funds from owner account, so only owner or manager are allowed
        require(msg.sender == _user || msg.sender == _lockManager, ERROR_SENDER_NOT_ALLOWED);

        _lockUnsafe(_user, _lockManager, _amount);
    }

    /**
     * @notice Decrease locked amount by `@tokenAmount(self.token(): address, _amount)` for user `_user` by lock manager `_lockManager`
     * @param _user Owner of locked tokens
     * @param _lockManager The manager entity for this particular lock
     * @param _amount Amount of locked tokens decrease
     */
    function unlock(address _user, address _lockManager, uint256 _amount) external isInitialized {
        require(_amount > 0, ERROR_AMOUNT_ZERO);

        // only manager and owner (if manager allows) can unlock
        require(_canUnlockUnsafe(msg.sender, _user, _lockManager, _amount), ERROR_CANNOT_UNLOCK);

        _unlockUnsafe(_user, _lockManager, _amount);
    }

    /**
     * @notice Unlock `_user`'s lock by `_lockManager` so locked tokens can be unstaked again
     * @param _user Owner of locked tokens
     * @param _lockManager Manager of the lock for the given account
     */
    function unlockAndRemoveManager(address _user, address _lockManager) external isInitialized {
        // only manager and owner (if manager allows) can unlock
        require(_canUnlockUnsafe(msg.sender, _user, _lockManager, 0), ERROR_CANNOT_UNLOCK);

        Account storage account = accounts[_user];
        Lock storage lock_ = account.locks[_lockManager];

        uint256 amount = lock_.amount;
        // update total
        account.totalLocked = account.totalLocked.sub(amount);

        emit LockAmountChanged(_user, _lockManager, amount, false);
        emit LockManagerRemoved(_user, _lockManager);

        delete account.locks[_lockManager];
    }

    /**
     * @notice Change the manager of `_user`'s lock from `msg.sender` to `_newLockManager`
     * @param _user Owner of lock
     * @param _newLockManager New lock manager
     */
    function setLockManager(address _user, address _newLockManager) external isInitialized {
        Lock storage lock_ = accounts[_user].locks[msg.sender];
        require(lock_.allowance > 0, ERROR_LOCK_DOES_NOT_EXIST);

        accounts[_user].locks[_newLockManager] = lock_;

        delete accounts[_user].locks[msg.sender];

        emit LockManagerTransferred(_user, msg.sender, _newLockManager);
    }

    /**
     * @dev MiniMeToken ApproveAndCallFallBack compliance
     * @param _from Account approving tokens
     * @param _amount Amount of `_token` tokens being approved
     * @param _token MiniMeToken that is being approved and that the call comes from
     * @param _data Used in Staked event, to add signalling information in more complex staking applications
     */
    function receiveApproval(address _from, uint256 _amount, address _token, bytes calldata _data) external isInitialized {
        require(_token == msg.sender, ERROR_TOKEN_NOT_SENDER);
        require(_token == address(stakingToken), ERROR_WRONG_TOKEN);

        _stakeFor(_from, _from, _amount, _data);
    }

    /**
     * @notice Check whether it supports history of stakes
     * @return Always true
     */
    function supportsHistory() external pure returns (bool) {
        return true;
    }

    /**
     * @notice Get the token used by the contract for staking and locking
     * @return The token used by the contract for staking and locking
     */
    function token() external view isInitialized returns (address) {
        return address(stakingToken);
    }

    /**
     * @notice Get last time `_user` modified its staked balance
     * @param _user Account requesting for
     * @return Last block number when account's balance was modified
     */
    function lastStakedFor(address _user) external view isInitialized returns (uint256) {
        return accounts[_user].stakedHistory.lastUpdate();
    }

    /**
     * @notice Get total amount of locked tokens for `_user`
     * @param _user Owner of locks
     * @return Total amount of locked tokens for the requested account
     */
    function lockedBalanceOf(address _user) external view isInitialized returns (uint256) {
        return _lockedBalanceOf(_user);
    }

    /**
     * @notice Get details of `_user`'s lock by `_lockManager`
     * @param _user Owner of lock
     * @param _lockManager Manager of the lock for the given account
     * @return Amount of locked tokens
     * @return Amount of tokens that lock manager is allowed to lock
     */
    function getLock(address _user, address _lockManager)
        external
        view
        isInitialized
        returns (
            uint256 _amount,
            uint256 _allowance
        )
    {
        Lock storage lock_ = accounts[_user].locks[_lockManager];
        _amount = lock_.amount;
        _allowance = lock_.allowance;
    }

    /**
     * @notice Get staked and locked balances of `_user`
     * @param _user Account being requested
     * @return Amount of staked tokens
     * @return Amount of total locked tokens
     */
    function getBalancesOf(address _user) external view isInitialized returns (uint256 staked, uint256 locked) {
        staked = _totalStakedFor(_user);
        locked = _lockedBalanceOf(_user);
    }

    /**
     * @notice Get the amount of tokens staked by `_user`
     * @param _user The owner of the tokens
     * @return The amount of tokens staked by the given account
     */
    function totalStakedFor(address _user) external view isInitialized returns (uint256) {
        return _totalStakedFor(_user);
    }

    /**
     * @notice Get the total amount of tokens staked by all users
     * @return The total amount of tokens staked by all users
     */
    function totalStaked() external view isInitialized returns (uint256) {
        return _totalStaked();
    }

    /**
     * @notice Get the total amount of tokens staked by `_user` at block number `_blockNumber`
     * @param _user Account requesting for
     * @param _blockNumber Block number at which we are requesting
     * @return The amount of tokens staked by the account at the given block number
     */
    function totalStakedForAt(address _user, uint256 _blockNumber) external view isInitialized returns (uint256) {
        require(_blockNumber <= MAX_UINT64, ERROR_BLOCKNUMBER_TOO_BIG);

        return accounts[_user].stakedHistory.get(uint64(_blockNumber));
    }

    /**
     * @notice Get the total amount of tokens staked by all users at block number `_blockNumber`
     * @param _blockNumber Block number at which we are requesting
     * @return The amount of tokens staked at the given block number
     */
    function totalStakedAt(uint256 _blockNumber) external view isInitialized returns (uint256) {
        require(_blockNumber <= MAX_UINT64, ERROR_BLOCKNUMBER_TOO_BIG);

        return totalStakedHistory.get(uint64(_blockNumber));
    }

    /**
     * @notice Get the staked but unlocked amount of tokens by `_user`
     * @param _user Owner of the staked but unlocked balance
     * @return Amount of tokens staked but not locked by given account
     */
    function unlockedBalanceOf(address _user) external view isInitialized returns (uint256) {
        return _unlockedBalanceOf(_user);
    }

    /**
     * @notice Check if `_sender` can unlock `_user`'s `@tokenAmount(self.token(): address, _amount)` locked by `_lockManager`
     * @param _sender Account that would try to unlock tokens
     * @param _user Owner of lock
     * @param _lockManager Manager of the lock for the given owner
     * @param _amount Amount of tokens to be potentially unlocked. If zero, it means the whole locked amount
     * @return Whether given lock of given owner can be unlocked by given sender
     */
    function canUnlock(address _sender, address _user, address _lockManager, uint256 _amount) external view isInitialized returns (bool) {
        return _canUnlockUnsafe(_sender, _user, _lockManager, _amount);
    }

    function _stakeFor(address _from, address _user, uint256 _amount, bytes memory _data) internal {
        // staking 0 tokens is invalid
        require(_amount > 0, ERROR_AMOUNT_ZERO);

        // checkpoint updated staking balance
        uint256 newStake = _modifyStakeBalance(_user, _amount, true);

        // checkpoint total supply
        _modifyTotalStaked(_amount, true);

        // pull tokens into Staking contract
        require(stakingToken.safeTransferFrom(_from, address(this), _amount), ERROR_TOKEN_DEPOSIT);

        emit Staked(_user, _amount, newStake, _data);
    }

    function _unstake(address _from, uint256 _amount, bytes memory _data) internal {
        // checkpoint updated staking balance
        uint256 newStake = _modifyStakeBalance(_from, _amount, false);

        // checkpoint total supply
        _modifyTotalStaked(_amount, false);

        // transfer tokens
        require(stakingToken.safeTransfer(_from, _amount), ERROR_TOKEN_TRANSFER);

        emit Unstaked(_from, _amount, newStake, _data);
    }

    function _modifyStakeBalance(address _user, uint256 _by, bool _increase) internal returns (uint256) {
        uint256 currentStake = _totalStakedFor(_user);

        uint256 newStake;
        if (_increase) {
            newStake = currentStake.add(_by);
        } else {
            require(_by <= _unlockedBalanceOf(_user), ERROR_NOT_ENOUGH_BALANCE);
            newStake = currentStake.sub(_by);
        }

        // add new value to account history
        accounts[_user].stakedHistory.add(getBlockNumber64(), newStake);

        return newStake;
    }

    function _modifyTotalStaked(uint256 _by, bool _increase) internal {
        uint256 currentStake = _totalStaked();

        uint256 newStake;
        if (_increase) {
            newStake = currentStake.add(_by);
        } else {
            newStake = currentStake.sub(_by);
        }

        // add new value to total history
        totalStakedHistory.add(getBlockNumber64(), newStake);
    }

    function _allowManager(address _lockManager, uint256 _allowance, bytes memory _data) internal {
        Lock storage lock_ = accounts[msg.sender].locks[_lockManager];
        // check if lock exists
        require(lock_.allowance == 0, ERROR_LOCK_ALREADY_EXISTS);

        emit NewLockManager(msg.sender, _lockManager, _data);

        _increaseLockAllowance(_lockManager, lock_, _allowance);
    }

    function _increaseLockAllowance(address _lockManager, Lock storage _lock, uint256 _allowance) internal {
        require(_allowance > 0, ERROR_AMOUNT_ZERO);

        _lock.allowance = _lock.allowance.add(_allowance);

        emit LockAllowanceChanged(msg.sender, _lockManager, _allowance, true);
    }

    /**
     * @dev Assumes that sender is either owner or lock manager
     */
    function _lockUnsafe(address _user, address _lockManager, uint256 _amount) internal {
        require(_amount > 0, ERROR_AMOUNT_ZERO);

        // check enough unlocked tokens are available
        require(_amount <= _unlockedBalanceOf(_user), ERROR_NOT_ENOUGH_BALANCE);

        Account storage account = accounts[_user];
        Lock storage lock_ = account.locks[_lockManager];

        uint256 newAmount = lock_.amount.add(_amount);
        // check allowance is enough, it also means that lock exists, as newAmount is greater than zero
        require(newAmount <= lock_.allowance, ERROR_NOT_ENOUGH_ALLOWANCE);

        lock_.amount = newAmount;

        // update total
        account.totalLocked = account.totalLocked.add(_amount);

        emit LockAmountChanged(_user, _lockManager, _amount, true);
    }

    /**
     * @dev Assumes `canUnlock` passes
     */
    function _unlockUnsafe(address _user, address _lockManager, uint256 _amount) internal {
        Account storage account = accounts[_user];
        Lock storage lock_ = account.locks[_lockManager];

        uint256 lockAmount = lock_.amount;
        require(lockAmount >= _amount, ERROR_NOT_ENOUGH_LOCK);

        // update lock amount
        // No need for SafeMath: checked just above
        lock_.amount = lockAmount - _amount;

        // update total
        account.totalLocked = account.totalLocked.sub(_amount);

        emit LockAmountChanged(_user, _lockManager, _amount, false);
    }

    function _transfer(address _from, address _to, uint256 _amount) internal {
        // transferring 0 staked tokens is invalid
        require(_amount > 0, ERROR_AMOUNT_ZERO);

        // update stakes
        _modifyStakeBalance(_from, _amount, false);
        _modifyStakeBalance(_to, _amount, true);

        emit StakeTransferred(_from, _to, _amount);
    }

    /**
     * @notice Get the amount of tokens staked by `_user`
     * @param _user The owner of the tokens
     * @return The amount of tokens staked by the given account
     */
    function _totalStakedFor(address _user) internal view returns (uint256) {
        // we assume it's not possible to stake in the future
        return accounts[_user].stakedHistory.getLast();
    }

    /**
     * @notice Get the total amount of tokens staked by all users
     * @return The total amount of tokens staked by all users
     */
    function _totalStaked() internal view returns (uint256) {
        // we assume it's not possible to stake in the future
        return totalStakedHistory.getLast();
    }

    /**
     * @notice Get the staked but unlocked amount of tokens by `_user`
     * @param _user Owner of the staked but unlocked balance
     * @return Amount of tokens staked but not locked by given account
     */
    function _unlockedBalanceOf(address _user) internal view returns (uint256) {
        return _totalStakedFor(_user).sub(_lockedBalanceOf(_user));
    }

    function _lockedBalanceOf(address _user) internal view returns (uint256) {
        return accounts[_user].totalLocked;
    }

    /**
     * @notice Check if `_sender` can unlock `_user`'s `@tokenAmount(self.token(): address, _amount)` locked by `_lockManager`
     * @dev If calling this from a state modifying function trying to unlock tokens, make sure first parameter is `msg.sender`
     * @param _sender Account that would try to unlock tokens
     * @param _user Owner of lock
     * @param _lockManager Manager of the lock for the given owner
     * @param _amount Amount of locked tokens to unlock. If zero, the full locked amount
     * @return Whether given lock of given owner can be unlocked by given sender
     */
    function _canUnlockUnsafe(address _sender, address _user, address _lockManager, uint256 _amount) internal view returns (bool) {
        Lock storage lock_ = accounts[_user].locks[_lockManager];
        require(lock_.allowance > 0, ERROR_LOCK_DOES_NOT_EXIST);
        require(lock_.amount >= _amount, ERROR_NOT_ENOUGH_LOCK);

        uint256 amount = _amount == 0 ? lock_.amount : _amount;

        // If the sender is the lock manager, unlocking is allowed
        if (_sender == _lockManager) {
            return true;
        }

        // If the sender is neither the lock manager nor the owner, unlocking is not allowed
        if (_sender != _user) {
            return false;
        }

        // The sender must therefore be the owner of the tokens
        // Allow unlocking if the amount of locked tokens has already been decreased to 0
        if (amount == 0) {
            return true;
        }

        // Otherwise, check whether the lock manager allows unlocking
        return ILockManager(_lockManager).canUnlock(_user, amount);
    }

    function _toBytes4(bytes memory _data) internal pure returns (bytes4 result) {
        if (_data.length < 4) {
            return bytes4(0);
        }

        assembly { result := mload(add(_data, 0x20)) }
    }
}
