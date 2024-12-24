---
sidebar_position: 7
---

# Deploy the trading Agent

## Overview

The following implementation will guide you through the process of how to deploy and test the basic Warden Agent.

### 1. Deploy the Agent

1. Set up the environment file (.env)

   ```bash
   MNEMONIC="your mnemonic phrase here"
   RPC_URL="http://127.0.0.1:8545"
   CHAIN_ID="12345"
   SCHEDULER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
   FACTORY_OWNER_ADDRESS="0x6EA8AC1673402989E7B653AE4E83B54173719C30"
   ```
   
2. Compile the contract:

   ```bash
   forge build
   ```

3. Deploy the Base Contract:
   
   ```bash
   # Load environment
   source .env
   
   # Deploy Registry and Factory
   forge script script/Deploy.s.sol:Deploy \
       --rpc-url $RPC_URL \
       --broadcast \
       --chain-id $CHAIN_ID
   ```
   
4. Create an order
   
   ```bash
   forge script script/CreateOrder.s.sol:CreateOrder \
       --rpc-url $RPC_URL \
       --broadcast \
       --sig "run(uint256,uint8,(string,string),(uint256,uint256,address),(uint256,address[],address,uint256),uint64,uint64,   uint64,bytes,bytes)" \
       3324181371 \  # threshold price
       0 \          # LTE condition
       '("ETH","USD")' \  # price pair
       '(100000000000000,11155111,0x467b...)' \  # tx fields
       # ... other parameters
   ```
   
   **Key parameters explained:**
   
   - `thresholdPrice`: Price level to trigger execution
   - `priceCondition`: 0 for LTE, 1 for GTE
   - `pricePair`: Trading pair (e.g., "ETH/USD")
   - `creatorDefinedTxFields`: Chain and transaction details
   - `swapData`: Uniswap swap parameters
   - `keyId`: Warden signing key ID
   - `spaceNonce`: Nonce for the signing space
   - `actionTimeoutHeight`: Timeout for execution
   - `expectedApproveExpression`: Conditions for approval
   - `expectedRejectExpression`: Conditions for rejection

5. Verify the deployment:
   
   ```bash
   # Get order details
   cast call $ORDER_ADDRESS "orderData()"
   ```

### 2. Monitor and manage orders

1. Monitor order status:
   
   ```bash
   # Check if order can execute
   cast call $ORDER_ADDRESS "canExecute()" --rpc-url $RPC_URL
   
   # Check if order has been executed
   cast call $ORDER_ADDRESS "isExecuted()" --rpc-url $RPC_URL
   
   # Get execution data
   cast call $ORDER_ADDRESS "executionData()" --rpc-url $RPC_URL
   ```

2. Track in Registry:

   ```bash
   # Get order creator from registry
   cast call $REGISTRY_ADDRESS "executions(address)" $ORDER_ADDRESS
   
   # Get transaction details
   cast call $REGISTRY_ADDRESS "transactions(bytes32)" $TX_HASH
   ```
   
3. Monitor events:
   
   ```bash
   # Watch for Executed events
   cast logs $ORDER_ADDRESS "Executed()"
   
   # Watch for NewTx events in Registry
   cast logs $REGISTRY_ADDRESS "NewTx(address,bytes32)"
   ```
   
4. Utility commands:

   ```bash
   # Get current price from Slinky
   cast call $SLINKY_PRECOMPILE "getPrice(string,string)" "ETH" "USD"
   
   # Check Warden key status
   cast call $WARDEN_PRECOMPILE "keyById(uint64,int32[])" $KEY_ID []
   ```

5. Debug tools:

   ```bash
   # Get raw transaction data
   cast call $ORDER_ADDRESS "getTx()"
   
   # Check callers list
   cast call $ORDER_ADDRESS "callers()"
   ```
