// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Types } from "./Types.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { BasicOrder } from "./BasicOrder.sol";
import { Registry } from "./Registry.sol";
import { Create2 } from "@openzeppelin/contracts/utils/Create2.sol";

enum OrderType {
    Basic,
    Advanced
}

error Unimplemented();
error UnsupportedOrder();
error InvalidRegistryAddress();
error InvalidSchedulerAddress();
error OrderAlreadyExists();

event OrderCreated(address indexed orderCreator, OrderType indexed orderType, address indexed orderContact);

event SchedulerChanged(address indexed oldScheduler, address indexed newScheduler);

contract OrderFactory is Ownable {
    // Mapping from order contract to order creator
    mapping(address orderAddress => address orderCreator) public orders;

    // Registry of IExecution contracts
    Registry public immutable REGISTRY;

    // Scheduler address
    address public scheduler;

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

    function createOrder(
        Types.OrderData calldata _orderData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        OrderType orderType,
        bytes32 salt
    )
        public
        returns (address order)
    {
        if (orderType == OrderType.Basic) {
            return _createBasicOrder(_orderData, maxKeychainFees, scheduler, salt);
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
        address _scheduler,
        bytes32 salt
    )
        internal
        returns (address)
    {
        bytes memory creationCode = abi.encodePacked(
            type(BasicOrder).creationCode, abi.encode(_orderData, maxKeychainFees, _scheduler, address(REGISTRY))
        );

        bytes32 hash = keccak256(abi.encodePacked(bytes1(0xff), address(this), salt, keccak256(creationCode)));
        address expectedAddress = address(uint160(uint256(hash)));
        if (expectedAddress.code.length != 0) {
            revert OrderAlreadyExists();
        }

        address basicOrder = Create2.deploy(0, salt, creationCode);

        orders[basicOrder] = msg.sender;
        REGISTRY.register(basicOrder);
        emit OrderCreated(msg.sender, OrderType.Basic, basicOrder);

        return basicOrder;
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
