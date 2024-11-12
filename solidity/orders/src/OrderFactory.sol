// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {Types} from "./Types.sol";
import {Types as CommonTypes} from "precompile-common/Types.sol";
import {BasicOrder} from "./BasicOrder.sol";

enum OrderType {
    Basic,
    Advanced
}

contract OrderFactory {
    // Mapping from order contract to order creator
    mapping(address orderAddress => address orderCreator) public orders;

    // Registry of IExecution contracts
    address public registry;

    event OrderCreated(address indexed orderCreator, OrderType indexed orderType, address orderContact);

    constructor(address _registry) {
        registry = _registry;
    }

    function createOrder(
        Types.OrderData memory _orderData,
        CommonTypes.Coin[] memory maxKeychainFees,
        address _scheduler,
        OrderType orderType) public returns (address order) {
        if (orderType == OrderType.Basic) {
            return _createBasicOrder(_orderData, maxKeychainFees, _scheduler);
        } else if (orderType == OrderType.Advanced) {
            return _createAdvancedOrder(_orderData, maxKeychainFees);
        }
    }

    function _createBasicOrder(
        Types.OrderData memory _orderData,
        CommonTypes.Coin[] memory maxKeychainFees,
        address _scheduler
        ) internal returns (address) {
        BasicOrder basicOrder = new BasicOrder(_orderData, maxKeychainFees, _scheduler);
        orders[address(basicOrder)] = tx.origin;
        // TODO: register in regisry
        emit OrderCreated(tx.origin, OrderType.Basic, address(basicOrder));

        return address(basicOrder);
    }

    function _createAdvancedOrder(
        Types.OrderData memory _orderData,
        CommonTypes.Coin[] memory maxKeychainFees) internal returns (address) {
        revert("Unimplemented");
    }

    function getCreator(address order) public view returns (address) {
        return orders[order];
    }
    
    function getRegistry() public view returns (address) {
        return registry;
    }
}
