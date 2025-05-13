---
sidebar_position: 2.2
---

# Implement automated Orders

## Overview

This section explains how to implement basic **automated Orders**—smart contracts that monitor prices and execute token swaps on Uniswap based on simple price thresholds, signing transactions with [Keychains](/learn/glossary#keychain). This Order type serves as a foundation for building more advanced [Orders with price prediction](../implement-automated-orders-with-price-prediction/introduction).

You'll implement the core logic in the [`BasicOrder` contract](implement-orders), implement the creation of Orders in [`BasicOrderFactory`](implement-the-creation-of-orders), and finally [deploy an Order](deploy-an-order). To learn about the full architecture of this project, refer to the [main introduction](../introduction#architecture).

:::note Full code
Please note that the articles in this section typically contain only fragments of code.  
You can find the full code of the example on GitHub: [`orders`](https://github.com/warden-protocol/wardenprotocol/tree/main/solidity/orders)
:::

Automated Orders provide the following key features:

- Price threshold monitoring
- Single price source integration
- Direct Uniswap interactions
- Basic execution security

A user can create and manage multiple automated Orders. The user flow includes the following steps:

1. The user specifies the Order input with these details:
    - The price threshold and condition (greater/less than)
    - The token pair to monitor
    - Swap details such as amount, path, recipient, deadline
    - Transaction signing details
2. The [`OrderFactory` contract](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) calls [`BasicOrderFactory`](implement-the-creation-of-orders), which deploys a new [`BasicOrder` contract](implement-orders) (Order) and registers it in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).
3. The Order continuously monitors prices using [Slinky](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile).
4. When the price threshold is met, the Order executes a swap:
    - Constructs a swap transaction
    - Sends the transaction to [Warden](../build-the-infrastructure-for-orders/create-mock-precompiles#12-create-a-warden-precompile) for signing
    - Records the transaction in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry)
    - Executes the swap on Uniswap
5. Transaction details are stored in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).

## 1. Implement Orders

The `BasicOrder` contract implements the core of logic of this example—**automated Orders** that monitor prices and automatically execute token swaps on Uniswap when user-defined price thresholds are met. Note that you can extend some parts to [implement Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-orders).

This article will guide you through creating the `BasicOrder` contract. You'll implement the following architecture:

```solidity
contract BasicOrder is AbstractOrder, IExecution {
    // Core components
    ISlinky private immutable SLINKY_PRECOMPILE;
    Registry private immutable REGISTRY;
    
    // Order configuration
    Types.BasicOrderData public orderData;     // Price conditions
    Types.CommonExecutionData public commonExecutionData;  // Transaction details
    
    // State tracking
    bool private _executed;
    bytes private _unsignedTx;
}
```

:::note Directory
Store `BasicOrder` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/BasicOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrder.sol)
:::

1. Create core components: define the state variables and imports.

   **Note:** You can extend and expand all these components to [implement Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-orders).

2. Now create a `constructor` with validations. Your constructor should handle the following tasks:

   - Validate all inputs: the scheduler, the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry), price conditions
   - Set up connections with the [price feed](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile) and the [signing service](../build-the-infrastructure-for-orders/create-helpers-and-utils#2-create-an-abstract-order)
   - Initialize the Order parameters

3. In the `canExecute()` function, implement the logic for monitoring prices. This function should check if the price meets a given condition: `>=` or `<=` than the threshold—see the `PriceCondtion` enum in [`Types.sol`](../build-the-infrastructure-for-orders/create-helpers-and-utils#1-define-data-structures).

4. In the `execute()` function, implement the logic for executing trades. This function should do the following:

   - Verify the caller and conditions
   - Pack the swap data for Uniswap
   - Create and encode a transaction
   - Request a signature through the [Warden precompile](../build-the-infrastructure-for-orders/create-helpers-and-utils#2-create-an-abstract-order)
   - Emit the `Executed()` event
   - Register the transaction in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry)
   - Return the execution status

5. To test price conditions, use the following code:
   
   ```solidity
   function test_priceConditions() public {
       // Test the GTE condition
       vm.mockCall(
           address(SLINKY_PRECOMPILE),
           abi.encodeWithSelector(ISlinky.getPrice.selector),
           abi.encode(price)
       );
       assertTrue(order.canExecute());
   }
   ```

6. To test the execution flow, use this:
   
   ```solidity
   function test_execution() public {
       vm.startPrank(scheduler);
       (bool success, bytes32 txHash) = order.execute(
           1, // nonce
           200000, // gas
           0, // unused
           2 gwei, // maxPriorityFeePerGas
           100 gwei // maxFeePerGas
       );
       assertTrue(success);
   }
   ```

#### Security measures

In the previous steps, you've implemented the following security measures:

- **Reentrancy protection**  
  ```solidity
  function execute(...) external nonReentrant { ... }
  ```
- **Access control**  
  ```solidity
  if (msg.sender != scheduler) revert Unauthorized();
  ```
- **State management**
  ```solidity
  if (_executed) revert ExecutedError();
  ```

#### Extension points

To [implement Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-orders), you need to extend your basic contract with the following advanced features:

- **Complex price conditions**  
  The basic implementation shown in this guide supports the `<=` and `>=` price conditions:  
  ```solidity
  Types.PriceCondition condition = orderData.priceCondition;
  if (condition == Types.PriceCondition.GTE) {
     value = priceResponse.price.price >= orderData.thresholdPrice;
  } else if (condition == Types.PriceCondition.LTE) {
     value = priceResponse.price.price <= orderData.thresholdPrice;
  } else {
     revert InvalidPriceCondition();
  }
  ```
  In the advanced implementation, you can add strict inequality comparisons: `<` and `>`.  
  ```solidity
  function _checkPriceCondition(uint256 oraclePrice, uint256 predictedPrice) internal view returns (bool) {
      if (
          (orderData.priceCondition == Types.PriceCondition.GTE && oraclePrice >= predictedPrice) ||
          (orderData.priceCondition == Types.PriceCondition.LTE && oraclePrice <= predictedPrice) ||
          (orderData.priceCondition == Types.PriceCondition.GT && oraclePrice > predictedPrice) ||
          (orderData.priceCondition == Types.PriceCondition.LT && oraclePrice < predictedPrice)
      ) {
          return true;
      }
      return false;
  }
  ```
- **Multiple price sources**  
  The basic implementation uses prices from a single source—the oracle service:  
  ```solidity
  GetPriceResponse memory priceResponse = SLINKY_PRECOMPILE.getPrice(...);
  ```
  In the advanced implementation, you can use oracle and prediction prices:    
  ```solidity
  function _getPrices() internal virtual returns (uint256[] memory) {
      // ...
  }
  ```
- **A time-based execution window**  
   In the advanced implementation, you can limit the execution of Orders by a validity window:  
   ```solidity
   uint256 public validUntil;
   ```

## 2. Implement the creation of Orders

This article will guide you through creating the `BasicOrderFactory` contract. `BasicOrderFactory`,  when triggered by [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders), deploys Orders (instances of [`BasicOrder`](implement-orders)) and registers them in the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry).

This factory pattern supports deterministic address computation, front-running protection, and salt-based deployment security. Note that you can extend some parts to [implement the creation of Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-the-creation-of-orders).

:::note Directory
Store `BasicOrderFactory` in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src), alongside with other contracts.
:::

:::note Full code
You can find the full code on GitHub: [`src/BasicOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/BasicOrderFactory.sol)
:::

1. To start implementing the deployment of Orders, create a file `BasicOrderFactory.sol`.

2. In this contract, implement the core function for deploying new Orders: `createBasicOrder()`.

3. Add address computation: allow users to preview the Order addresses. See the `computeOrderAddress()` function.

5. Finally, implement tests:

   ```solidity
   contract BasicOrderFactoryTest is Test {
       function test_CreateOrder() public {
           // Test basic creation
           bytes32 salt = bytes32("test");
           address expected = factory.computeOrderAddress(
               address(this), 
               salt
           );
           
           address actual = factory.createBasicOrder(
               orderData,
               executionData,
               fees,
               scheduler,
               salt
           );
           
           assertEq(actual, expected);
           assertTrue(Registry(registry).isRegistered(actual));
       }
   
       function test_PreventSaltReuse() public {
           bytes32 salt = bytes32("test");
           factory.createBasicOrder(...);
           
           vm.expectRevert(SaltAlreadyUsed.selector);
           factory.createBasicOrder(...);
       }
   }
   ```

#### Extension points

To [implement the creation Orders with price prediction](../implement-automated-orders-with-price-prediction/implement-the-creation-of-orders), you need to extend the factory pattern with the following advanced features:

- **Complex validation**  
  ```solidity
  function _validateAdvancedOrder(
      Types.AdvancedOrderData memory orderData
  ) internal pure returns (bool);
  ```
- **Prediction setup**  
  ```solidity
  function _setupPrediction(
      address order,
      Types.PredictionData memory predData
  ) internal returns (uint64 futureId);
  ```

:::tip
When you were [implementing the Order creation logic](#2-implement-the-order-creation-logic), you enabled deployment with the `CREATE3` opcode. It ensures that Order addresses are known in advance, which becomes crucial for Orders with price prediction since they may need to reference each other.
:::

## 3. Deploy an Order

This article will guide you through deploying and monitoring automated Orders.

You'll deploy the following:

- The core infrastructure including the [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) and [`Registry`](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) contracts
- The [`BasicOrder` contract](implement-orders)

When you implement more advanced Orders with price prediction, you'll [deploy them](../implement-automated-orders-with-price-prediction/deploy-an-order) in a similar way, adding extra parameters for the advanced features.

1. Create an `.env` file with your environment configuration:

   ```bash
   # Network settings
   RPC_URL="http://127.0.0.1:8545"
   CHAIN_ID="12345"
   
   # Account settings
   MNEMONIC="your mnemonic phrase here"
   SCHEDULER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
   FACTORY_OWNER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
   ```

2. Install dependencies and compile all contracts:

   ```bash
   yarn install
   forge build   
   ```

3. Load the environment:
   
   ```
   source .env
   ```
   
4. Deploy the infrastructure by using the [main deployment script](../build-the-infrastructure-for-orders/create-deployment-scripts#1-implement-the-main-deployment-script):
   
   ```bash
   forge script script/Deploy.s.sol:Deploy \
       --rpc-url $RPC_URL \
       --broadcast \
       --chain-id $CHAIN_ID
   ```
  
   This will deploy the [`OrderFactory`](../build-the-infrastructure-for-orders/implement-the-creation-of-orders) and [`Registry`](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry) contracts.

5. Set the Order parameters:
   
   ```bash
   THRESHOLD_PRICE="3324181371"  # Target price in oracle decimals
   PRICE_CONDITION="0"           # 0 for LTE, 1 for GTE
   PRICE_PAIR='("ETH","USD")'    # Oracle price pair
   ```

6. Set the transaction parameters:

   ```
   TX_FIELDS="\
   (100000000000000,\    # The value (in wei)
   11155111,\            # The chain ID
   0x467b...1f,\         # The target contract
   0x7ff3...)`           # Encoded swap data
   ```

5. Deploy an Order by using the [script for creating Orders](../build-the-infrastructure-for-orders/create-deployment-scripts#2-implement-the-script-for-creating-orders):
   
   ```
   forge script script/CreateOrder.s.sol:CreateOrder \
       --rpc-url $RPC_URL \
       --broadcast \
       --sig "basic(uint256,uint8,(string,string),(uint256,uint256,address,bytes))" \
       $THRESHOLD_PRICE \
       $PRICE_CONDITION \
       $PRICE_PAIR \
       $TX_FIELDS
   ```

## Utility commands

#### Monitor the Order state

- Check if the Order is executable:  
  ```bash
  cast call $ORDER_ADDRESS "canExecute()"
  ```
- Check if the Order is executed:  
  ```bash
  cast call $ORDER_ADDRESS "isExecuted()"
  ```
- Get the execution data:
  ```bash
  cast call $ORDER_ADDRESS "executionData()"
  ```

#### Monitor events

- Monitor the execution:  
  ```bash
  cast logs $ORDER_ADDRESS "Executed()"
  ```
- Monitor new transactions:  
  ```bash
  cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
  ```

#### Monitor prices

- Get prices from the [oracle](../build-the-infrastructure-for-orders/create-mock-precompiles#11-create-a-slinky-precompile):
  ```bash
  cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
  ```

#### Check the transaction

- Get the unsigned transaction:  
  ```bash
  cast call $ORDER_ADDRESS "getTx()"
  ```
#### Get data from the registry 

- Get the order creator from the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry):
  ```bash
  cast call $REGISTRY_ADDRESS "executions(address)" $ORDER_ADDRESS
  ```
- Get the transaction details from the [registry](../build-the-infrastructure-for-orders/create-helpers-and-utils#3-implement-the-registry):
  ```bash
  cast call $REGISTRY_ADDRESS "transactions(bytes32)" $TX_HASH
  ```

## Troubleshooting

Here are some of the common deployment issues and solutions for them:

- **The Order creation fails**  
  Solution: Check the salt usage and verify the registry status.
  ```bash
  cast call $FACTORY_ADDRESS "usedSalts(bytes32)" $SALT
  cast call $REGISTRY_ADDRESS "isRegistered(address)" $ORDER_ADDRESS
  ```
- **The Order execution fails**  
  Solution: Check the price feeds and verify the scheduler permissions.
  ```bash
  cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
  cast call $ORDER_ADDRESS "scheduler()"
  ```

## Extension points

When you implement more advanced Orders with price prediction, you'll [deploy them](../implement-automated-orders-with-price-prediction/deploy-an-order) in a similar way, adding extra parameters for the advanced features:

- **Prediction integration**  
  ```bash
  ORACLE_PAIR='("ETH","USD")'
  PREDICT_PAIR='("ethereum","tether")'
  ```
- **Complex price conditions**
  ```bash
  PRICE_CONDITION="2"  # 2 for LT, 3 for GT
  ```
- **Time windows**
  ```bash
  cast call $ORDER_ADDRESS "validUntil()"
  ```

## Next steps
