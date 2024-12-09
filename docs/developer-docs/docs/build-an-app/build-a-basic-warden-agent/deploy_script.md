---
sidebar_position: 6
---

# Deploy Script

Let's implement the deployment scripts. We'll need two scripts: one for deployment and one for creating orders.

## Create `script/Deploy.s.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Script } from "forge-std/Script.sol";
import { Registry } from "../src/Registry.sol";
import { OrderFactory } from "../src/OrderFactory.sol";

contract Deploy is Script {
    address internal broadcaster;
    address internal scheduler;
    address internal factoryOwner;
    address internal registryAddress;

    error InvalidScheduler();
    error InvalidFactory();

    constructor() {
        (broadcaster,) = deriveRememberKey({ mnemonic: vm.envString("MNEMONIC"), index: 0 });
        scheduler = vm.envAddress("SCHEDULER_ADDRESS");
        factoryOwner = vm.envAddress("FACTORY_OWNER_ADDRESS");
        registryAddress = vm.envOr("REGISTRY_ADDRESS", address(0));
        if (scheduler == address(0)) {
            revert InvalidScheduler();
        }
        if (factoryOwner == address(0)) {
            revert InvalidFactory();
        }
    }

    function run() external {
        vm.startBroadcast(broadcaster);

        Registry registry;
        if (registryAddress == address(0)) {
            registry = new Registry();
        } else {
            registry = Registry(registryAddress);
        }
        new OrderFactory(address(registry), scheduler, factoryOwner);

        vm.stopBroadcast();
    }
}
```

## Create `script/CreateOrder.s.sol:`

```solidity
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
        Types.SwapData calldata swapData,
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
            swapData: swapData,
            signRequestData: signRequestData
        });
        vm.etch(ISLINKY_PRECOMPILE_ADDRESS, address(mSlinkyPrecompile).code);
        MockSlinkyPrecompile mockSlinkyPrecompile = MockSlinkyPrecompile(ISLINKY_PRECOMPILE_ADDRESS);
        mockSlinkyPrecompile.setPrice(pricePair.base, pricePair.quote, thresholdPrice);
        vm.etch(IWARDEN_PRECOMPILE_ADDRESS, address(wPrecompile).code);
        vm.startBroadcast(broadcaster);
        FACTORY.createOrder(orderData, maxKeychainFees, OrderType.Basic);

        vm.stopBroadcast();
    }
}
```

### These scripts handle the following tasks

**Deploy.s.sol:**

1. Registry deployment
2. Factory deployment
3. Environment configuration

**CreateOrder.s.sol:**

1. Order creation through factory
2. Mock precompiles setup
3. Parameter configuration
