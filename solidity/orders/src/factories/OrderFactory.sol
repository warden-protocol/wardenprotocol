// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Types } from "../types/Types.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { AdvancedOrderFactory } from "./AdvancedOrderFactory.sol";
import { Registry } from "../Registry.sol";
import { BasicOrderFactory } from "./BasicOrderFactory.sol";
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

    // BasicOrderFactory contract
    BasicOrderFactory public immutable BASIC_ORDER_FACTORY;

    // AdvancedOrderFactory contract
    AdvancedOrderFactory public immutable ADVANCED_ORDER_FACTORY;

    // Scheduler address
    address public scheduler;

    constructor(
        address registry,
        address _scheduler,
        address owner,
        address basicOrderFactory,
        address advancedOrderFactory
    )
        Ownable(owner)
    {
        if (registry == address(0)) {
            revert InvalidRegistryAddress();
        }

        if (_scheduler == address(0)) {
            revert InvalidSchedulerAddress();
        }

        REGISTRY = Registry(registry);
        BASIC_ORDER_FACTORY = BasicOrderFactory(basicOrderFactory);
        ADVANCED_ORDER_FACTORY = AdvancedOrderFactory(advancedOrderFactory);
        scheduler = _scheduler;
    }

    /**
     * @notice Computes the deterministic address of a order without deploying it
     * @param origin The potential order creator
     * @param salt The unique salt provided by the frontend
     * @return order The computed address of the order
     */
    function computeOrderAddress(
        address origin,
        bytes32 salt,
        OrderType orderType
    )
        external
        view
        returns (address order)
    {
        if (orderType == OrderType.Basic) {
            order = BASIC_ORDER_FACTORY.computeOrderAddress(origin, salt);
        } else if (orderType == OrderType.Advanced) {
            order = ADVANCED_ORDER_FACTORY.computeOrderAddress(origin, salt);
        }
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
        bytes calldata _orderData,
        Types.CommonExecutionData calldata _executionData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        OrderType orderType,
        bytes32 salt
    )
        external
        nonReentrant
        returns (address order)
    {
        if (orderType == OrderType.Basic) {
            Types.BasicOrderData memory basicOrderData = abi.decode(_orderData, (Types.BasicOrderData));
            order = _createBasicOrder(salt, basicOrderData, _executionData, maxKeychainFees, scheduler);
        } else if (orderType == OrderType.Advanced) {
            Types.AdvancedOrderData memory advancedOrderData = abi.decode(_orderData, (Types.AdvancedOrderData));
            order = _createAdvancedOrder(salt, advancedOrderData, _executionData, maxKeychainFees, scheduler);
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
     * @param _executionData The data required for order execution
     * @param maxKeychainFees The maximum fees allowed
     * @param _scheduler The scheduler address
     * @return The address of the newly created BasicOrder
     */
    function _createBasicOrder(
        bytes32 salt,
        Types.BasicOrderData memory _orderData,
        Types.CommonExecutionData calldata _executionData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        address _scheduler
    )
        internal
        returns (address)
    {
        address orderAddress =
            BASIC_ORDER_FACTORY.createBasicOrder(_orderData, _executionData, maxKeychainFees, _scheduler, salt);

        orders[orderAddress] = msg.sender;

        emit OrderCreated(msg.sender, OrderType.Basic, orderAddress);

        return orderAddress;
    }

    /**
     * @notice Internal function to create a AdvancedOrder using CREATE3
     * @param salt The unique salt provided by the frontend
     * @param _orderData The data required to create the order
     * @param _executionData The data required for order execution
     * @param maxKeychainFees The maximum fees allowed
     * @param _scheduler The scheduler address
     * @return The address of the newly created AdvancedOrder
     */
    function _createAdvancedOrder(
        bytes32 salt,
        Types.AdvancedOrderData memory _orderData,
        Types.CommonExecutionData calldata _executionData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        address _scheduler
    )
        internal
        returns (address)
    {
        address orderAddress =
            ADVANCED_ORDER_FACTORY.createAdvancedOrder(_orderData, _executionData, maxKeychainFees, _scheduler, salt);

        orders[orderAddress] = msg.sender;

        emit OrderCreated(msg.sender, OrderType.Advanced, orderAddress);

        return orderAddress;
    }
}
