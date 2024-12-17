// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { IWARDEN_PRECOMPILE_ADDRESS } from "precompile-warden/IWarden.sol";
import { ISLINKY_PRECOMPILE_ADDRESS } from "precompile-slinky/ISlinky.sol";
import { Script } from "forge-std/src/Script.sol";
import { Types as CommonTypes } from "precompile-common/Types.sol";
import { MockWardenPrecompile } from "../mocks/MockWardenPrecompile.sol";
import { MockSlinkyPrecompile } from "../mocks/MockSlinkyPrecompile.sol";
import { OrderFactory, OrderType } from "../src/OrderFactory.sol";
import { Types } from "../src/Types.sol";

contract CreateOrder is Script {
    address internal broadcaster;
    OrderFactory private immutable FACTORY;

    error InvalidFactory();

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        address factory = vm.envAddress("FACTORY_ADDRESS");
        if (factory == address(0)) {
            revert InvalidFactory();
        }
        FACTORY = OrderFactory(factory);
    }

    function run(
        uint256 thresholdPrice,
        Types.PriceCondition priceCondition,
        Types.PricePair calldata pricePair,
        Types.CreatorDefinedTxFields calldata creatorDefinedTxFields,
        uint64 keyId,
        uint64 spaceNonce,
        uint64 actionTimeoutHeight,
        bytes calldata expectedApproveExpression,
        bytes calldata expectedRejectExpression
    )
        external
    {
        MockSlinkyPrecompile mSlinkyPrecompile = new MockSlinkyPrecompile();
        MockWardenPrecompile wPrecompile = new MockWardenPrecompile();

        bytes[] memory analyzers = new bytes[](0);
        bytes memory encryptionKey = new bytes(0);
        Types.SignRequestData memory signRequestData = Types.SignRequestData({
            keyId: keyId,
            analyzers: analyzers,
            encryptionKey: encryptionKey,
            spaceNonce: spaceNonce,
            actionTimeoutHeight: actionTimeoutHeight,
            expectedApproveExpression: string(expectedApproveExpression),
            expectedRejectExpression: string(expectedRejectExpression)
        });
        CommonTypes.Coin[] memory maxKeychainFees = new CommonTypes.Coin[](0);
        Types.OrderData memory orderData = Types.OrderData({
            thresholdPrice: thresholdPrice,
            priceCondition: priceCondition,
            pricePair: pricePair,
            creatorDefinedTxFields: creatorDefinedTxFields,
            signRequestData: signRequestData
        });
        vm.etch(ISLINKY_PRECOMPILE_ADDRESS, address(mSlinkyPrecompile).code);
        MockSlinkyPrecompile mockSlinkyPrecompile = MockSlinkyPrecompile(ISLINKY_PRECOMPILE_ADDRESS);
        mockSlinkyPrecompile.setPrice(pricePair.base, pricePair.quote, thresholdPrice);
        vm.etch(IWARDEN_PRECOMPILE_ADDRESS, address(wPrecompile).code);
        vm.startBroadcast(broadcaster);
        bytes32 salt = keccak256(abi.encodePacked(broadcaster, block.number));
        FACTORY.createOrder(orderData, maxKeychainFees, OrderType.Basic, salt);

        vm.stopBroadcast();
    }
}
