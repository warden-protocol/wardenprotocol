// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {OrderData} from "./Types.sol";
import {Types} from "precompile-common/Types.sol";
import {BasicOrder} from "./BasicOrder.sol";

contract OrderFactory {
    enum OrderType {
        Basic,
        Advanced
    }

    // Mapping from order contract to order creator
    mapping(address orderAddredd => address orderCreator) public orders;

    event OrderCreated(address indexed orderCreator, address orderContact, OrderType orderType);

    function createOrder(OrderData memory _orderData, Types.Coin[] memory maxKeychainFees, OrderType orderType) public {
        if (orderType == OrderType.Basic) {
            _createBasicOrder(_orderData, maxKeychainFees);
        } else if (orderType == OrderType.Advanced) {
            _createAdvancedOrder(_orderData, maxKeychainFees);
        }
    }

    function _createBasicOrder(OrderData memory _orderData, Types.Coin[] memory maxKeychainFees) internal {
        BasicOrder basicOrder = new BasicOrder(_orderData, maxKeychainFees);
        orders[tx.origin] = address(basicOrder);
        emit OrderCreated(tx.origin, address(basicOrder), OrderType.Basic);
    }

    function _createAdvancedOrder(OrderData memory _orderData, Types.Coin[] memory maxKeychainFees) internal {
        // TODO
    }
}
