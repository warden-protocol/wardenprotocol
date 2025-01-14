// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Types } from "./Types.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { BasicOrder } from "./BasicOrder.sol";
import { Registry } from "./Registry.sol";
import { Create3 } from "@0xsequence/create3/contracts/Create3.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

enum OrderType {
    Basic,
    Advanced
}

error Unimplemented();
error UnsupportedOrder();
error InvalidRegistryAddress();
error InvalidSchedulerAddress();
error OrderDeploymentFailed(bytes32 salt);
error SaltAlreadyUsed();

event OrderCreated(address indexed orderCreator, OrderType indexed orderType, address indexed orderContract);

event SchedulerChanged(address indexed oldScheduler, address indexed newScheduler);

event SaltUsed(bytes32 indexed salt, address indexed creator);

contract OrderFactory is Ownable, ReentrancyGuard {
    // Mapping from order contract to order creator
    mapping(address orderAddress => address orderCreator) public orders;

    // Registry of IExecution contracts
    Registry public immutable REGISTRY;

    // Scheduler address
    address public scheduler;

    // Mapping to track used salts to prevent reuse
    mapping(bytes32 salt => bool used) public usedSalts;

    constructor(address registry, address _scheduler, address owner) Ownable(owner) {
        if (registry == address(0)) {
            revert InvalidRegistryAddress();
        }

        if (_scheduler == address(0)) {
            revert InvalidSchedulerAddress();
        }

        REGISTRY = Registry(registry);
        scheduler = _scheduler;
    }

    /**
     * @notice Computes the deterministic address of a BasicOrder without deploying it
     * @param origin The potential order creator
     * @param salt The unique salt provided by the frontend
     * @return The computed address of the BasicOrder
     */
    function computeOrderAddress(address origin, bytes32 salt) external view returns (address) {
        // front-running protection
        bytes32 guardedSalt = keccak256(abi.encodePacked(uint256(uint160(origin)), salt));

        return Create3.addressOf(guardedSalt);
    }

    /**
     * @notice Creates a new order (Basic or Advanced) using CREATE3
     * @param _orderData The data required to create the order
     * @param maxKeychainFees The maximum fees allowed
     * @param orderType The type of order to create
     * @param salt The unique salt provided by the frontend
     * @return order The address of the newly created order
     */
    function createOrder(
        Types.OrderData calldata _orderData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        OrderType orderType,
        bytes32 salt
    )
        external
        nonReentrant
        returns (address order)
    {
        // front-running protection
        // we use tx.origin here as msg.sender the same for all orders created through factory
        // solhint-disable-next-line
        address origin = tx.origin;
        bytes32 guardedSalt = keccak256(abi.encodePacked(uint256(uint160(origin)), salt));

        if (usedSalts[guardedSalt]) {
            revert SaltAlreadyUsed();
        }

        usedSalts[guardedSalt] = true;
        emit SaltUsed(guardedSalt, origin);

        if (orderType == OrderType.Basic) {
            return _createBasicOrder(guardedSalt, _orderData, maxKeychainFees, scheduler);
        } else if (orderType == OrderType.Advanced) {
            return _createAdvancedOrder(guardedSalt, _orderData, maxKeychainFees);
        } else {
            revert UnsupportedOrder();
        }
    }

    /**
     * @notice Updates the scheduler address
     * @param _scheduler The new scheduler address
     */
    function setScheduler(address _scheduler) external onlyOwner {
        if (_scheduler == address(0)) {
            revert InvalidSchedulerAddress();
        }
        address oldScheduler = scheduler;
        scheduler = _scheduler;
        emit SchedulerChanged(oldScheduler, scheduler);
    }

    /**
     * @notice Internal function to create a BasicOrder using CREATE3
     * @param salt The unique salt provided by the frontend
     * @param _orderData The data required to create the order
     * @param maxKeychainFees The maximum fees allowed
     * @param _scheduler The scheduler address
     * @return The address of the newly created BasicOrder
     */
    function _createBasicOrder(
        bytes32 salt,
        Types.OrderData calldata _orderData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        address _scheduler
    )
        internal
        returns (address)
    {
        bytes memory bytecode = getBasicOrderBytecode(_orderData, maxKeychainFees, _scheduler);

        address orderAddress = Create3.create3(salt, bytecode);

        address expectedAddress = Create3.addressOf(salt);
        if (orderAddress == address(0) || orderAddress != expectedAddress) {
            revert OrderDeploymentFailed(salt);
        }

        orders[orderAddress] = msg.sender;

        REGISTRY.register(orderAddress);

        emit OrderCreated(msg.sender, OrderType.Basic, orderAddress);

        return orderAddress;
    }

    function _createAdvancedOrder(
        bytes32,
        Types.OrderData calldata,
        CommonTypes.Coin[] calldata
    )
        internal
        pure
        returns (address)
    {
        revert Unimplemented();
    }

    /**
     * @notice Prepares the creation bytecode for BasicOrder
     * @param _orderData The data required to create the order
     * @param maxKeychainFees The maximum fees allowed
     * @param _scheduler The scheduler address
     * @return The bytecode for deploying BasicOrder
     */
    function getBasicOrderBytecode(
        Types.OrderData calldata _orderData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        address _scheduler
    )
        internal
        view
        returns (bytes memory)
    {
        return abi.encodePacked(
            type(BasicOrder).creationCode, abi.encode(_orderData, maxKeychainFees, _scheduler, address(REGISTRY))
        );
    }
}
