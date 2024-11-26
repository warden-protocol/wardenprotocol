// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Script } from "forge-std/src/Script.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { OrderFactory, OrderType } from "../src/OrderFactory.sol";
import { Types } from "../src/Types.sol";

contract CreateOrder is Script {
    address internal broadcaster;
    OrderFactory private immutable FACTORY;

    error InvalidScheduler();
    error InvalidFactory();

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        address factory = vm.envAddress("FACTORY_ADDRESS");
        if (factory == address(0)) {
            revert InvalidScheduler();
        }
        FACTORY = OrderFactory(factory);
    }

    function run(
        uint256 thresholdPrice,
        Types.PriceCondition priceCondition,
        Types.PricePair calldata pricePair,
        Types.CreatorDefinedTxFields calldata creatorDefinedTxFields,
        Types.SwapData calldata swapData,
        Types.SignRequestData calldata signRequestData
    ) external {
        vm.startBroadcast(broadcaster);

        CommonTypes.Coin[] memory maxKeychainFees = new CommonTypes.Coin[](0);
        Types.OrderData memory orderData = Types.OrderData({
            thresholdPrice: thresholdPrice,
            priceCondition: priceCondition,
            pricePair: pricePair,
            creatorDefinedTxFields: creatorDefinedTxFields,
            swapData: swapData,
            signRequestData: signRequestData
        });
        FACTORY.createOrder(
            orderData,
            maxKeychainFees,
            OrderType.Basic
        );

        vm.stopBroadcast();
    }
}
