---
sidebar_position: 4
---

# Implement the creation of Orders

## Overview

The `BasicOrderFactory` contract creates Orders (by deploying [`BasicOrder`](implement-orders)) and registers them in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).

:::note Directory
Store `BasicOrderFactory` in the [`/src`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src) directory, alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`/src/BasicOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrderFactory.sol)
:::

## Create the `BasicOrderFactory` contract

Implement the creation of Orders in a file `BasicOrderFactory.sol`:

```solidity title="/src/BasicOrderFactory.sol"
contract BasicOrderFactory is ReentrancyGuard {

    // Create a new instance of the BasicOrder contract.
    function createBasicOrder(
        Types.BasicOrderData calldata orderData,
        Types.CommonExecutionData calldata executionData,
        CommonTypes.Coin[] calldata maxKeychainFees,
        address scheduler,
        bytes32 salt
    )
        external
        nonReentrant
        returns (address orderAddress)
    {
        // front-running protection
        address origin = tx.origin;
        bytes32 guardedSalt = keccak256(abi.encodePacked(uint256(uint160(origin)), salt));

        if (usedSalts[guardedSalt]) {
            revert SaltAlreadyUsed();
        }

        emit SaltUsed(guardedSalt, origin);

        bytes memory bytecode = abi.encodePacked(
            type(BasicOrder).creationCode,
            abi.encode(orderData, executionData, maxKeychainFees, scheduler, address(REGISTRY))
        );

        orderAddress = Create3.create3(guardedSalt, bytecode);
        address expectedAddress = Create3.addressOf(guardedSalt);
        if (orderAddress == address(0) || orderAddress != expectedAddress) {
            revert OrderDeploymentFailed(guardedSalt);
        }

        REGISTRY.register(orderAddress);
        usedSalts[guardedSalt] = true;

        emit BasicOrderCreated(msg.sender, orderAddress);
    }

    // Compute the deterministic address of a order without deploying it
    function computeOrderAddress(address origin, bytes32 salt) external view returns (address) {
        // front-running protection
        bytes32 guardedSalt = keccak256(abi.encodePacked(uint256(uint160(origin)), salt));

        return Create3.addressOf(guardedSalt);
    }
}
```

## Next steps

After creating the `BasicOrderFactory` contract, you can [deploy an Order](deploy-an-order).
