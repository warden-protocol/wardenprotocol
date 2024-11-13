// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Types } from "./Types.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { BasicOrder } from "./BasicOrder.sol";
import {Registry} from "./Registry.sol";

enum OrderType {
    Basic,
    Advanced
}

error Unimplemented();
error UnsupportedOrder();
error InvalidRegistryAddress();
error InvalidSchedulerAddress();

event OrderCreated(address indexed orderCreator, OrderType indexed orderType, address indexed orderContact);

event SchedulerChanged(address indexed oldScheduler, address indexed newScheduler);

contract OrderFactory is Ownable {
    // Mapping from order contract to order creator
    mapping(address orderAddress => address orderCreator) public orders;

    // Registry of IExecution contracts
    Registry public registry;

    // Scheduler address
    address public scheduler;

    constructor(address _registry, address _scheduler, address owner) Ownable(owner) {
        if (_registry == address(0)) {
            revert InvalidRegistryAddress();
        }

        if (_scheduler == address(0)) {
            revert InvalidSchedulerAddress();
        }

        registry = Registry(_registry);
        scheduler = _scheduler;
    }

    function createOrder(
        Types.OrderData calldata _orderData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        OrderType orderType
    )
        public
        returns (address order)
    {
        if (orderType == OrderType.Basic) {
            return _createBasicOrder(_orderData, maxKeychainFees, scheduler);
        } else if (orderType == OrderType.Advanced) {
            return _createAdvancedOrder(_orderData, maxKeychainFees);
        } else {
            revert UnsupportedOrder();
        }
    }

    function setScheduler(address _scheduler) public onlyOwner {
        if (_scheduler == address(0)) {
            revert InvalidSchedulerAddress();
        }
        address oldScheduler = scheduler;
        scheduler = _scheduler;
        emit SchedulerChanged(oldScheduler, scheduler);
    }

    function _createBasicOrder(
        Types.OrderData calldata _orderData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        address _scheduler
    )
        internal
        returns (address)
    {
        BasicOrder basicOrder = new BasicOrder(_orderData, maxKeychainFees, _scheduler);
        orders[address(basicOrder)] = msg.sender;
        
        registry.register(address(basicOrder));

        emit OrderCreated(msg.sender, OrderType.Basic, address(basicOrder));

        return address(basicOrder);
    }

    function _createAdvancedOrder(
        Types.OrderData calldata,
        CommonTypes.Coin[] calldata
    )
        internal
        pure
        returns (address)
    {
        revert Unimplemented();
    }
}
