---
sidebar_position: 1
---

# Create helpers and utils

## Overview

This article will guide you through building a foundation for the Agent executing automated Orders. You'll create helper libraries and contracts defining the core data structures and interfaces for managing Orders.

:::note Directory
Store helper libraries and contracts in the [`src` directory](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src).
:::

## 1. Define data structures

First, create a library `Types.sol`  with the core data structures:

:::note Full code
You can find the full code on GitHub: [`src/Types.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Types.sol)
:::

```solidity title="src/Types.sol"
library Types {
    // Define swap parameters for Uniswap
    struct SwapData {
        uint256 amountIn;    // The amount of input tokens
        address[] path;      // The trading path through Uniswap
        address to;          // The recipient address
        uint256 deadline;    // The transaction deadline
    }

    // A price condition for flexible trading
    enum PriceCondition {
        LTE,    // Less than or equal to the threshold
        GTE     // Greater than or equal to the threshold
        LT,     // Less than the threshold
        GT      // Greater thatn the threshold
    }

    // The main order configuration
    struct OrderData {
        uint256 thresholdPrice;
        PriceCondition priceCondition;
        PricePair pricePair;
        CreatorDefinedTxFields creatorDefinedTxFields;
        SwapData swapData;
        SignRequestData signRequestData;
    }
}
```

## 2. Create an abstract Order

Now, add an abstract contract with functions required to create Orders of both types. Your code should include a function for creating [signature requests](/learn/glossary#signature-request) by calling the [Warden precompile](create-mock-precompiles#12-create-a-warden-precompile).

:::note Full code
You can find the full code on GitHub: [`src/AbstractOrder.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/AbstractOrder.sol)
:::

```solidity title="src/AbstractOrder.sol"
abstract contract AbstractOrder {

    function encodeUnsignedEIP1559(
        uint256 nonce,
        uint256 gas,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas,
        bytes[] calldata accessList,
        Types.CreatorDefinedTxFields calldata creatorDefinedTxFields
    )
        public
        pure
        returns (bytes memory unsignedTx, bytes32 txHash)
    {
        uint256 txType = 2; // eip1559 tx type
        bytes[] memory txArray = new bytes[](9);
        txArray[0] = RLPEncode.encodeUint(creatorDefinedTxFields.chainId);
        txArray[1] = RLPEncode.encodeUint(nonce);
        txArray[2] = RLPEncode.encodeUint(maxPriorityFeePerGas);
        txArray[3] = RLPEncode.encodeUint(maxFeePerGas);
        txArray[4] = RLPEncode.encodeUint(gas);
        txArray[5] = RLPEncode.encodeAddress(creatorDefinedTxFields.to);
        txArray[6] = RLPEncode.encodeUint(creatorDefinedTxFields.value);
        txArray[7] = RLPEncode.encodeBytes(creatorDefinedTxFields.data);
        txArray[8] = RLPEncode.encodeList(accessList);
        bytes memory unsignedTxEncoded = RLPEncode.encodeList(txArray);
        unsignedTx = RLPEncode.concat(RLPEncode.encodeUint(txType), unsignedTxEncoded);
        txHash = keccak256(unsignedTx);
    }

    function buildExecutionData(Types.CreatorDefinedTxFields calldata creatorDefinedTxFields)
        public
        view
        returns (ExecutionData memory data)
    {
        data = ExecutionData({
            caller: _keyAddress,
            to: creatorDefinedTxFields.to,
            chainId: creatorDefinedTxFields.chainId,
            value: creatorDefinedTxFields.value,
            data: creatorDefinedTxFields.data
        });
    }
 
    // Create a new signature request by calling the Warden precompile
    function createSignRequest(
        Types.SignRequestData calldata signRequestData,
        bytes calldata signRequestInput,
        CommonTypes.Coin[] calldata maxKeychainFees
    )
        public
        returns (bool)
    {
        return WARDEN_PRECOMPILE.newSignRequest(
            signRequestData.keyId,
            signRequestInput,
            signRequestData.analyzers,
            signRequestData.encryptionKey,
            maxKeychainFees,
            signRequestData.spaceNonce,
            signRequestData.actionTimeoutHeight,
            signRequestData.expectedApproveExpression,
            signRequestData.expectedRejectExpression,
            BroadcastType.Automatic
        );
    }
}
```

## 3. Implement the registry

In a file `Registry.sol`, implement a registry for tracking transactions:

:::note Full code
You can find the full code on GitHub: [`src/Registry.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Registry.sol)
:::

```solidity title="src/Registry.sol"
contract Registry is ReentrancyGuard {
    // Track Order creators
    mapping(address executionAddress => address orderCreator) public executions;
    
    // Store the transaction data
    mapping(bytes32 txHash => bytes tx) public transactions;

    // Register an Order with additional validation
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

## 4. Implement string operations

To support EIP-1559 transactions, create a `Strings.sol` library implementing string operations:

:::note Full code
You can find the full code on GitHub: [`src/Strings.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Strings.sol)
:::

```solidity title="src/Strings.sol"
library Strings {

    // Parse a hexadecimal string and return the value as an `address`
    function parseAddress(string memory input) internal pure returns (address) {
        return parseAddress(input, 0, bytes(input).length);
    }

    // Parse a substring of `input` located between position `begin` (included) and `end` (excluded)
    function parseAddress(string memory input, uint256 begin, uint256 end) internal pure returns (address) {
        (bool success, address value) = tryParseAddress(input, begin, end);
        if (!success) revert StringsInvalidAddressFormat();
        return value;
    }

    // Add more functions for string operations...
}
```

## 5. Implement RLP encoding

To support EIP-1559 transactions, create an `RLPEncode.sol` library implementing RLP encoding:

:::note Full code
You can find the full code on GitHub: [`src/RLPEncode.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/RLPEncode.sol)
:::

```solidity title="src/RLPEncode.sol"
library RLPEncode {
    // Implement the RLP encoding for EIP-1559 transactions
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

## 6. Implement custom deployment

Create a helper contract used in the [main deployment script](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Create2.sol). This contract allows deploying the infrastructure for Orders with the `CREATE2` opcode.

:::note Full code
You can find the full code on GitHub: [`src/Create2.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/solidity/orders/src/Create2.sol)
:::

```solidity title="src/Create2.sol"
contract Create2 {

    function deploy(bytes32 salt, bytes memory creationCode) external payable returns (address addr) {
        if (creationCode.length == 0) {
            revert Create2EmptyBytecode();
        }

        // solhint-disable-next-line
        assembly {
            addr := create2(callvalue(), add(creationCode, 0x20), mload(creationCode), salt)
        }

        if (addr == address(0)) {
            revert Create2FailedDeployment();
        }
    }

    function computeAddress(bytes32 salt, bytes32 creationCodeHash) external view returns (address addr) {
        address contractAddress = address(this);

        // solhint-disable-next-line
        assembly {
            let ptr := mload(0x40)

            mstore(add(ptr, 0x40), creationCodeHash)
            mstore(add(ptr, 0x20), salt)
            mstore(ptr, contractAddress)
            let start := add(ptr, 0x0b)
            mstore8(start, 0xff)
            addr := keccak256(start, 85)
        }
    }
}
```

## Next steps

After building the foundation for your Agent, you can [create mock precompiles](create-mock-precompiles).
