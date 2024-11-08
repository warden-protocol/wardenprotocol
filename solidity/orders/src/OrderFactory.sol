// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {CreatorDefinedTxFields, OrderData} from "./Types.sol";
import {Types} from "precompile-common/Types.sol";
import {BasicOrder} from "./BasicOrder.sol";

contract OrderFactory {
    enum OrderType {
        Basic,
        Advanced
    }

    // Mapping from order contract to order creator
    mapping(address orderAddredd => address orderCreator) public orders;

    // Registry of IExecution contracts
    address public registry;

    event OrderCreated(address indexed orderCreator, address orderContact, OrderType orderType);

    constructor(address _registry) {
        registry = _registry;
    }

    function createOrder(
        OrderData memory _orderData,
        Types.Coin[] memory maxKeychainFees,
        CreatorDefinedTxFields memory txFields,
        address _scheduler,
        OrderType orderType) public {
        if (orderType == OrderType.Basic) {
            _createBasicOrder(_orderData, maxKeychainFees, txFields, _scheduler);
        } else if (orderType == OrderType.Advanced) {
            _createAdvancedOrder(_orderData, maxKeychainFees);
        }
    }

    function _createBasicOrder(
        OrderData memory _orderData,
        Types.Coin[] memory maxKeychainFees,
        CreatorDefinedTxFields memory _txFields,
        address _scheduler
        ) internal {
        BasicOrder basicOrder = new BasicOrder(_orderData, maxKeychainFees, _txFields, _scheduler);
        orders[address(basicOrder)] = tx.origin;
        emit OrderCreated(tx.origin, address(basicOrder), OrderType.Basic);
    }

    function _createAdvancedOrder(OrderData memory _orderData, Types.Coin[] memory maxKeychainFees) internal {
        // TODO
    }

    function getCreator(address order) public view returns (address) {
        return orders[order];
    }
    
    function getRegistry() public view returns (address) {
        return registry;
    }
}
