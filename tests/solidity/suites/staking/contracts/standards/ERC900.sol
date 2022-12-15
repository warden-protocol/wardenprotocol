pragma solidity ^0.5.17;


// Interface for ERC900: https://eips.ethereum.org/EIPS/eip-900
interface ERC900 {
    event Staked(address indexed user, uint256 amount, uint256 total, bytes data);
    event Unstaked(address indexed user, uint256 amount, uint256 total, bytes data);

    /**
     * @dev Stake a certain amount of tokens
     * @param _amount Amount of tokens to be staked
     * @param _data Optional data that can be used to add signalling information in more complex staking applications
     */
    function stake(uint256 _amount, bytes calldata _data) external;

    /**
     * @dev Stake a certain amount of tokens in favor of someone
     * @param _user Address to stake an amount of tokens to
     * @param _amount Amount of tokens to be staked
     * @param _data Optional data that can be used to add signalling information in more complex staking applications
     */
    function stakeFor(address _user, uint256 _amount, bytes calldata _data) external;

    /**
     * @dev Unstake a certain amount of tokens
     * @param _amount Amount of tokens to be unstaked
     * @param _data Optional data that can be used to add signalling information in more complex staking applications
     */
    function unstake(uint256 _amount, bytes calldata _data) external;

    /**
     * @dev Tell the total amount of tokens staked for an address
     * @param _addr Address querying the total amount of tokens staked for
     * @return Total amount of tokens staked for an address
     */
    function totalStakedFor(address _addr) external view returns (uint256);

    /**
     * @dev Tell the total amount of tokens staked
     * @return Total amount of tokens staked
     */
    function totalStaked() external view returns (uint256);

    /**
     * @dev Tell the address of the token used for staking
     * @return Address of the token used for staking
     */
    function token() external view returns (address);

    /*
     * @dev Tell if the current registry supports historic information or not
     * @return True if the optional history functions are implemented, false otherwise
     */
    function supportsHistory() external pure returns (bool);
}
