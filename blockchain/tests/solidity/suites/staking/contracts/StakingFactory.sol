pragma solidity ^0.5.17;

import "./lib/os/ERC20.sol";

import "./Staking.sol";
import "./proxies/StakingProxy.sol";


contract StakingFactory {
    Staking public baseImplementation;
    mapping (address => address) internal instances;

    event NewStaking(address indexed instance, address token);

    constructor() public {
        baseImplementation = new Staking();
    }

    function existsInstance(ERC20 token) external view returns (bool) {
        return _getInstance(token) != address(0);
    }

    function getInstance(ERC20 token) external view returns (Staking) {
        return Staking(_getInstance(token));
    }

    function getOrCreateInstance(ERC20 token) external returns (Staking) {
        address instance = _getInstance(token);
        return instance != address(0) ? Staking(instance) : _createInstance(token);
    }

    function _getInstance(ERC20 token) internal view returns (address) {
        return instances[address(token)];
    }

    function _createInstance(ERC20 token) internal returns (Staking) {
        StakingProxy instance = new StakingProxy(baseImplementation, token);
        address tokenAddress = address(token);
        address instanceAddress = address(instance);
        instances[tokenAddress] = instanceAddress;
        emit NewStaking(instanceAddress, tokenAddress);
        return Staking(instanceAddress);
    }
}
