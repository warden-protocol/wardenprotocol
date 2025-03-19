// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { AdvancedOrder } from "./AdvancedOrder.sol";
import { Types } from "./Types.sol";
import { Types as CommonTypes } from "ext-common/Types.sol";
import { Create3 } from "@0xsequence/create3/contracts/Create3.sol";
import { Registry } from "./Registry.sol";

error OrderDeploymentFailed(bytes32 salt);
error SaltAlreadyUsed();

event SaltUsed(bytes32 indexed salt, address indexed creator);

event AdvancedOrderCreated(address indexed creator, address orderAddress);

contract AdvancedOrderFactory is ReentrancyGuard {
    // Registry of IExecution contracts
    Registry public immutable REGISTRY;

    // Mapping to track used salts to prevent reuse
    mapping(bytes32 salt => bool used) public usedSalts;

    constructor(address registry) {
        REGISTRY = Registry(registry);
    }

    /**
     * @dev Creates a new instance of the AdvancedOrder contract.
     * @param orderData Data specific to the order.
     * @param executionData Common execution data.
     * @param maxKeychainFees Maximum fees for keychain operations.
     * @param scheduler Address of the scheduler.
     * @param salt Salt to ensure uniqueness of the deployed contract address.
     * @return orderAddress Address of the newly created AdvancedOrder contract.
     */
    function createAdvancedOrder(
        Types.AdvancedOrderData calldata orderData,
        Types.CommonExecutionData calldata executionData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        address scheduler,
        bytes32 salt
    )
        external
        nonReentrant
        returns (address orderAddress)
    {
        // Front-running protection using tx.origin
        // solhint-disable-next-line
        address origin = tx.origin;
        bytes32 guardedSalt = keccak256(abi.encodePacked(uint256(uint160(origin)), salt));

        if (usedSalts[guardedSalt]) {
            revert SaltAlreadyUsed();
        }

        emit SaltUsed(guardedSalt, origin);

        // Encode contract creation bytecode with constructor arguments
        bytes memory bytecode = abi.encodePacked(
            type(AdvancedOrder).creationCode,
            abi.encode(orderData, executionData, maxKeychainFees, scheduler, address(REGISTRY))
        );

        // Deploy the contract using Create3
        orderAddress = Create3.create3(guardedSalt, bytecode);

        address expectedAddress = Create3.addressOf(guardedSalt);
        if (orderAddress == address(0) || orderAddress != expectedAddress) {
            revert OrderDeploymentFailed(guardedSalt);
        }

        // Register the deployed contract in the registry
        REGISTRY.register(orderAddress);
        usedSalts[guardedSalt] = true;

        emit AdvancedOrderCreated(msg.sender, orderAddress);
    }

    /**
     * @notice Computes the deterministic address of a order without deploying it
     * @param origin The potential order creator
     * @param salt The unique salt provided by the frontend
     * @return The computed address of the order
     */
    function computeOrderAddress(address origin, bytes32 salt) external view returns (address) {
        // front-running protection
        bytes32 guardedSalt = keccak256(abi.encodePacked(uint256(uint160(origin)), salt));

        return Create3.addressOf(guardedSalt);
    }
}
