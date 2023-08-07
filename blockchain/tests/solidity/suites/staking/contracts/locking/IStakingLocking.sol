pragma solidity ^0.5.17;


interface IStakingLocking {
    event NewLockManager(address indexed account, address indexed lockManager, bytes data);
    event Unlocked(address indexed account, address indexed lockManager, uint256 amount);
    event LockAmountChanged(address indexed account, address indexed lockManager, uint256 amount, bool increase);
    event LockAllowanceChanged(address indexed account, address indexed lockManager, uint256 allowance, bool increase);
    event LockManagerRemoved(address indexed account, address lockManager);
    event LockManagerTransferred(address indexed account, address indexed oldLockManager, address newLockManager);
    event StakeTransferred(address indexed from, address to, uint256 amount);

    function allowManager(address _lockManager, uint256 _allowance, bytes calldata _data) external;
    function allowManagerAndLock(uint256 _amount, address _lockManager, uint256 _allowance, bytes calldata _data) external;
    function unlockAndRemoveManager(address _account, address _lockManager) external;
    function increaseLockAllowance(address _lockManager, uint256 _allowance) external;
    function decreaseLockAllowance(address _account, address _lockManager, uint256 _allowance) external;
    function lock(address _account, address _lockManager, uint256 _amount) external;
    function unlock(address _account, address _lockManager, uint256 _amount) external;
    function setLockManager(address _account, address _newLockManager) external;
    function transfer(address _to, uint256 _amount) external;
    function transferAndUnstake(address _to, uint256 _amount) external;
    function slash(address _account, address _to, uint256 _amount) external;
    function slashAndUnstake(address _account, address _to, uint256 _amount) external;

    function getLock(address _account, address _lockManager) external view returns (uint256 _amount, uint256 _allowance);
    function unlockedBalanceOf(address _account) external view returns (uint256);
    function lockedBalanceOf(address _user) external view returns (uint256);
    function getBalancesOf(address _user) external view returns (uint256 staked, uint256 locked);
    function canUnlock(address _sender, address _account, address _lockManager, uint256 _amount) external view returns (bool);
}
