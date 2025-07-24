---
sidebar_position: 2.2
---

# Implement automated Orders

## Overview

This guide explains how to implement basic **automated Orders**—smart contracts that monitor prices and execute token swaps on Uniswap based on simple price thresholds.

Automated Orders use the following Warden modules:

- [`x/oracle`](/learn/warden-protocol-modules/external-modules#xoracle) to fetch oracle prices
- [`x/warden`](/learn/warden-protocol-modules/x-warden) to sign transactions with [Keychains](/learn/warden-protocol-modules/x-warden#keychain)

You'll take these steps:

1. Implement the core logic of Orders in the `BasicOrder` contract: create the logic for price monitoring and trade execution
2. Implement the creation of Orders in `BasicOrderFactory`: implement Order deployment, register and track the Order
3. Deploy an Order: specify the Order input, including the price pair and threshold, and  monitor the result

:::note
This Order type serves as a foundation for building more advanced [Orders with price prediction](implement-orders-with-price-prediction). When implementing them, you'll add such features as mupltiple price sources (predicted and oracle), strict inequality comparisons (`<`, `>`), and a 24-hour execution time window. In addition to the Warden and Slinky precompiles, you'll also use Async.
:::

## Prerequisites

Before you start implementing automated Orders, take these steps:

1. [Meet the prerequisites](prerequisites)
2. [Build the infrastructure for Orders](build-the-infrastructure)

## 1. Implement Orders

In our example, the core logic of Orders resides in the `BasicOrder` contract.

:::note Code
[`src/orders/BasicOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/orders/BasicOrder.sol)
:::

This contract implements the logic for price monitoring and trade execution using the [Slinky and Warden precompiles](build-the-infrastructure#4-create-mock-precompiles). Once the price threshold is met, the Order will construct a swap transaction, send it for signing, and record the transaction in the [registry](build-the-infrastructure#3-implement-the-registry).

To create this logic, add `BasicOrder` to the `src/orders` directory and take these steps:

1. Declare the following state variables:

   - The Order and execution data structures from [`Types` and `TypesV0`](build-the-infrastructure#1-create-data-structures)
   - References to the Slinky precompile and the registry
   - State tracking (`_executed`, `_unsignedTx`, etc.)

2. Create a `constructor` handling the following tasks:

   - Validate all inputs
   - Set up a connection with [`AbstractOrder`](build-the-infrastructure#5-implement-transaction-signing) (the transaction signing service)
   - Validate the threshold price
   - Initialize the Slinky price feed
   - Store the Order and execution data

3. In the `canExecute()` function, implement the logic for monitoring prices. This function should check if the price meets a given condition: `>=` or `<=` than the threshold. See the `PriceCondition` enum in `Types`.

4. In the `execute()` function, implement the logic for executing trades. This function should do the following:

   - Verify the caller and conditions
   - Pack the swap data for Uniswap
   - Create and encode a transaction
   - Request a signature through the Warden precompile 
   - Emit the `Executed()` event
   - Register the transaction in the registry
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

:::note Security measures
- **Reentrancy protection**: The execution function can't be re-entered before the previous execution finishes.
  ```solidity
  function execute(...) external nonReentrant { ... }
  ```
- **Access control**: If the caller is unauthorized, the execution will be reverted.
  ```solidity
  if (msg.sender != scheduler) revert Unauthorized();
  ```
- **State management**: If the Order has already been executed, the execution will be reverted.
  ```solidity
  if (_executed) revert ExecutedError();
  ```
:::

## 2. Implement Order creation

In our example, the creation of Orders is implemented in the `BasicOrderFactory` contract.

:::note Code
[`src/factories/BasicOrderFactory.sol`](https://github.com/warden-protocol/wardenprotocol/blob/v0.6.3/solidity/orders/src/factories/BasicOrderFactory.sol)
:::

`BasicOrderFactory`, when triggered by [`OrderFactory`](build-the-infrastructure#6-implement-order-creation), deploys Orders (instances of [`BasicOrder`](#1-implement-orders)) and registers them in the [registry](build-the-infrastructure#3-implement-the-registry). Orders are deployed with the `CREATE3` opcode to provide front-running protection, salt-based deployment security, and deterministic address computation.

To create this logic, add `BasicOrderFactory` to the `src/factories` directory and take the following steps:

1. Include a `createBasicOrder()` function implementing the deployment of Orders. It should do the following:

   - Create the deployment bytecode
   - Deploy an Orders with an precomputed address using the `CREATE3` opcode
   - Verify the contract address
   - Register and track the Order
   - Emit the `BasicOrderCreated()` event

2. Include a `computeOrderAddress()` function for previewing the deterministic address of an Order without deploying it.

3. To test the contract, you can use the following code:

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

:::note Security measures
- **Salt management**: Salts are guarded by `tx.origin` to prevent front-running. Each salt can only be used once per creator.
  ```
  address origin = tx.origin;
  bytes32 guardedSalt = keccak256(
      abi.encodePacked(uint256(uint160(origin)), salt)

  if (usedSalts[guardedSalt]) {
        revert SaltAlreadyUsed();
  }
  ```
:::

## 3. Deploy an Order

To deploy an Order, take these steps:

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
   
4. Deploy the infrastructure by using the [main deployment script](build-the-infrastructure#7-create-deployment-scripts):
   
   ```bash
   forge script script/Deploy.s.sol:Deploy \
       --rpc-url $RPC_URL \
       --broadcast \
       --chain-id $CHAIN_ID
   ```
  
   This will deploy the [`OrderFactory`](build-the-infrastructure#6-implement-order-creation) and [`Registry`](build-the-infrastructure#3-implement-the-registry) contracts.

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

7. Deploy an Order by using the [script for creating Orders](build-the-infrastructure#7-create-deployment-scripts):
   
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

- Get prices from the [oracle]:
  ```bash
  cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
  ```

#### Check the transaction

- Get the unsigned transaction:  
  ```bash
  cast call $ORDER_ADDRESS "getTx()"
  ```
#### Get data from the registry 

- Get the order creator from the [registry]:
  ```bash
  cast call $REGISTRY_ADDRESS "executions(address)" $ORDER_ADDRESS
  ```
- Get the transaction details from the [registry]:
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

## Next steps

Now you can implement more advanced [Orders with price prediction](implement-orders-with-price-prediction).
