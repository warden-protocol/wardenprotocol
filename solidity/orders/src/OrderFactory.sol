// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import {CreatorDefinedTxFields, OrderData} from "./Types.sol";
import {Types} from "precompile-common/Types.sol";
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

    event OrderCreated(address indexed orderCreator, address orderContact, OrderType orderType);

    constructor(address _registry) {
        registry = _registry;
    }

    function createOrder(
        OrderData memory _orderData,
        Types.Coin[] memory maxKeychainFees,
        CreatorDefinedTxFields memory txFields,
        address _scheduler,
        OrderType orderType) public returns (address order) {
        if (orderType == OrderType.Basic) {
            return _createBasicOrder(_orderData, maxKeychainFees, txFields, _scheduler);
        } else if (orderType == OrderType.Advanced) {
            return _createAdvancedOrder(_orderData, maxKeychainFees);
        }
    }

    function _createBasicOrder(
        OrderData memory _orderData,
        Types.Coin[] memory maxKeychainFees,
        CreatorDefinedTxFields memory _txFields,
        address _scheduler
        ) internal returns (address) {
        BasicOrder basicOrder = new BasicOrder(_orderData, maxKeychainFees, _txFields, _scheduler);
        orders[address(basicOrder)] = tx.origin;
        // TODO: register in regisry
        emit OrderCreated(tx.origin, address(basicOrder), OrderType.Basic);

        return address(basicOrder);
    }

    function _createAdvancedOrder(
        OrderData memory _orderData,
        Types.Coin[] memory maxKeychainFees) internal returns (address) {
        revert("Unimplemented");
    }

    function getCreator(address order) public view returns (address) {
        return orders[order];
    }
    
    function getRegistry() public view returns (address) {
        return registry;
    }
}
