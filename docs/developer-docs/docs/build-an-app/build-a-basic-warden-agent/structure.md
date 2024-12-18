---
sidebar_position: 2
---

# Trading Agent Structure

Let's build the foundation of our trading agent by implementing the core data structures and interfaces.

## Define Trading Types (`src/Types.sol`)

First, let's create our essential data structures.

```solidity
library Types {
    // Define swap parameters for Uniswap
    struct SwapData {
        uint256 amountIn;          // Amount of input token
        address[] path;            // Trading path through Uniswap
        address to;                // Recipient address
        uint256 deadline;          // Transaction deadline
    }

    // NEW: Price condition enum for flexible trading
    enum PriceCondition {
        LTE,    // Less than or equal to threshold
        GTE     // Greater than or equal to threshold
    }

    // Main order configuration
    struct OrderData {
        uint256 thresholdPrice;
        PriceCondition priceCondition;  // NEW: Price condition type
        PricePair pricePair;
        CreatorDefinedTxFields creatorDefinedTxFields;
        SwapData swapData;
        SignRequestData signRequestData;
    }
}
```

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Types.sol)

## Create Execution Interface (`src/IExecution.sol`)

The execution interface defines the core functionality of our agent with new security and validation features:

```solidity
interface IExecution {
    // Check if order can execute based on conditions
    function canExecute() external view returns (bool);
    
    // Execute trade with enhanced security parameters
    function execute(
        uint256 nonce,
        uint256 gas,
        uint256 gasPrice,
        uint256 maxPriorityFeePerGas,  // NEW: EIP-1559 support
        uint256 maxFeePerGas           // NEW: EIP-1559 support
    ) external returns (bool, bytes32);
    
    // NEW: Get list of authorized callers
    function callers() external returns (Caller[] memory callersList);
    
    // Check execution status
    function isExecuted() external returns (bool);
}
```

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/IExecution.sol)

## Registry Implementation (`src/Registry.sol`)

The registry now includes enhanced security features and better transaction tracking:

```solidity
contract Registry is ReentrancyGuard {  // NEW: Added ReentrancyGuard
    // Track agent creators
    mapping(address executionAddress => address orderCreator) public executions;
    
    // Store transaction data
    mapping(bytes32 txHash => bytes tx) public transactions;

    // NEW: Enhanced registration with validation
    function register(address execution) public {
        if (execution == address(0)) {
            revert InvalidExecutionAddress();
        }
        // Additional validation...
        
        executions[execution] = msg.sender;
        emit Registered(msg.sender, execution);
    }
}
```

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Registry.sol)

## RLP Transaction Encoding (`src/RLPEncode.sol`)

Implement RLP encoding for EIP-1559 transaction support:

```solidity
library RLPEncode {
    // NEW: Enhanced encoding for EIP-1559 transactions
    function encodeTransaction(
        Types.OrderData memory orderData,
        uint256 nonce,
        uint256 gas,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    ) internal pure returns (bytes memory) {
        bytes[] memory txArray = new bytes[](9);
        // Transaction encoding...
        return RLPEncode.encodeList(txArray);
    }
}
```

[Code Reference](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/RLPEncode.sol)
