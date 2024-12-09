---
sidebar_position: 2
---

# Trading Agent Structure

Let's create the fundamental structure for our trading agent. We'll break this into clear, manageable parts:

## Create the basic Types for our agent. Create a file `Types.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

library Types {
    // Data for swapExactETHForTokens method
    struct SwapData {
        uint256 amountIn;
        address[] path;
        address to;
        uint256 deadline;
    }

    // Sign request data
    struct SignRequestData {
        uint64 keyId;
        bytes[] analyzers;
        bytes encryptionKey;
        uint64 spaceNonce;
        uint64 actionTimeoutHeight;
        string expectedApproveExpression;
        string expectedRejectExpression;
    }

    enum PriceCondition {
        LTE,
        GTE
    }

    struct OrderData {
        uint256 thresholdPrice;
        PriceCondition priceCondition;
        PricePair pricePair;
        CreatorDefinedTxFields creatorDefinedTxFields;
        SwapData swapData;
        SignRequestData signRequestData;
    }

    struct PricePair {
        string base;
        string quote;
    }

    struct CreatorDefinedTxFields {
        uint256 value;
        uint256 chainId;
        address to;
    }
}
```

## Create the interface for our agent in `src/IExecution.sol:`

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

struct ExecutionData {
    address caller;
    address to;
    uint256 chainId;
    bytes data;
    uint256 value;
}

enum Caller {
    Scheduler,
    AI
}

interface IExecution {
    function canExecute() external view returns (bool);
    
    function execute(
        uint256 nonce,
        uint256 gas,
        uint256 gasPrice,
        uint256 maxPriorityFeePerGas,
        uint256 maxFeePerGas
    ) external returns (bool, bytes32);
    
    function callers() external returns (Caller[] memory callersList);
    
    function setByAIService(bytes calldata data) external returns (bool success);
    
    function isExecuted() external returns (bool);
    
    function executionData() external returns (ExecutionData memory executionData);
    
    function getTx() external returns (bytes memory tx);
}
```

These two files establish the foundational types and interfaces for our project. They create a framework for:

- Defining trade parameters
- Setting price conditions
- Managing transaction signing
- Executing trades through Uniswap
- Tracking trade status

## Implement the Registry `src/Registry.sol` contract that tracks all trading agents and their transactions

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { IExecution } from "./IExecution.sol";

error InvalidExecutionAddress();
error UnauthorizedToAddTx();
error TxAlreadyAdded();
error InvalidHash();
error NotExecuted();
error Executed();
error ExecutionAlreadyRegistered();

event Registered(address indexed creator, address indexed execution);
event NewTx(address indexed execution, bytes32 indexed txHash);

contract Registry is ReentrancyGuard {
    // Mapping of execution address to its creator
    mapping(address executionAddress => address orderCreator) public executions;
    // Mapping of transaction hash to transaction data
    mapping(bytes32 txHash => bytes tx) public transactions;

    function register(address execution) public {
        if (execution == address(0)) {
            revert InvalidExecutionAddress();
        }

        if (executions[execution] != address(0)) {
            revert ExecutionAlreadyRegistered();
        }

        try IExecution(execution).isExecuted() returns (bool executed) {
            if (executed) {
                revert Executed();
            }
        } catch {
            revert InvalidExecutionAddress();
        }

        executions[execution] = msg.sender;
        emit Registered(msg.sender, execution);
    }

    function addTransaction(bytes32 txHash) public nonReentrant {
        if (executions[msg.sender] == address(0)) {
            revert UnauthorizedToAddTx();
        }

        if (txHash == bytes32(0)) {
            revert InvalidHash();
        }

        if (transactions[txHash].length != 0) {
            revert TxAlreadyAdded();
        }

        IExecution execution = IExecution(msg.sender);

        try execution.isExecuted() returns (bool executed) {
            if (!executed) {
                revert NotExecuted();
            }
        } catch {
            revert InvalidExecutionAddress();
        }

        transactions[txHash] = execution.getTx();

        emit NewTx(msg.sender, txHash);
    }
}
```

This Registry contract provides:

- Registration for new trading agents
- Transaction tracking for executed trades
- Security checks and error handling
- Event emission for tracking

**Key features:**

- Uses ReentrancyGuard for security
- Validates execution addresses
- Tracks transaction history
- Ensures proper execution order
- Prevents duplicate registrations

## Next, let's implement the `RLPEncode` library that's crucial for encoding transaction data

`src/RLPEncode.sol:`

```solidity
pragma solidity >=0.8.25 <0.9.0;

/**
 * @title RLPEncode
 * @dev A simple RLP encoding library.
 * @author Bakaoh
 */
library RLPEncode {
    /**
     * @dev RLP encodes a byte string.
     */
    function encodeBytes(bytes memory self) internal pure returns (bytes memory) {
        bytes memory encoded;
        if (self.length == 1 && uint8(self[0]) < 128) {
            encoded = self;
        } else {
            encoded = concat(encodeLength(self.length, 128), self);
        }
        return encoded;
    }

    /**
     * @dev RLP encodes a list of RLP encoded byte strings.
     */
    function encodeList(bytes[] memory self) internal pure returns (bytes memory) {
        bytes memory list = flatten(self);
        return concat(encodeLength(list.length, 192), list);
    }

    /**
     * @dev RLP encodes an address.
     */
    function encodeAddress(address self) internal pure returns (bytes memory) {
        bytes memory inputBytes;
        assembly {
            let m := mload(0x40)
            mstore(add(m, 20), xor(0x140000000000000000000000000000000000000000, self))
            mstore(0x40, add(m, 52))
            inputBytes := m
        }
        return encodeBytes(inputBytes);
    }

    /**
     * @dev RLP encodes a uint.
     */
    function encodeUint(uint256 self) internal pure returns (bytes memory) {
        return encodeBytes(toBinary(self));
    }

    /*
     * Private functions
     */

    function encodeLength(uint256 len, uint256 offset) private pure returns (bytes memory) {
        bytes memory encoded;
        if (len < 56) {
            encoded = new bytes(1);
            encoded[0] = bytes32(len + offset)[31];
        } else {
            uint256 lenLen;
            uint256 i = 1;
            while (len / i != 0) {
                lenLen++;
                i *= 256;
            }

            encoded = new bytes(lenLen + 1);
            encoded[0] = bytes32(lenLen + offset + 55)[31];
            for (i = 1; i <= lenLen; i++) {
                encoded[i] = bytes32((len / (256 ** (lenLen - i))) % 256)[31];
            }
        }
        return encoded;
    }

    function toBinary(uint256 _x) private pure returns (bytes memory) {
        bytes memory b = new bytes(32);
        assembly {
            mstore(add(b, 32), _x)
        }
        uint256 i;
        for (i = 0; i < 32; i++) {
            if (b[i] != 0) {
                break;
            }
        }
        bytes memory res = new bytes(32 - i);
        for (uint256 j = 0; j < res.length; j++) {
            res[j] = b[i++];
        }
        return res;
    }

    function memcpy(uint256 _dest, uint256 _src, uint256 _len) private pure {
        uint256 dest = _dest;
        uint256 src = _src;
        uint256 len = _len;

        for (; len >= 32; len -= 32) {
            assembly {
                mstore(dest, mload(src))
            }
            dest += 32;
            src += 32;
        }

        uint256 mask = 256 ** (32 - len) - 1;
        assembly {
            let srcpart := and(mload(src), not(mask))
            let destpart := and(mload(dest), mask)
            mstore(dest, or(destpart, srcpart))
        }
    }

    function flatten(bytes[] memory _list) private pure returns (bytes memory) {
        if (_list.length == 0) {
            return new bytes(0);
        }

        uint256 len;
        uint256 i;
        for (i = 0; i < _list.length; i++) {
            require(_list[i].length > 0, "An item in the list to be RLP encoded is null.");
            len += _list[i].length;
        }

        bytes memory flattened = new bytes(len);
        uint256 flattenedPtr;
        assembly {
            flattenedPtr := add(flattened, 0x20)
        }

        for (i = 0; i < _list.length; i++) {
            bytes memory item = _list[i];
            uint256 listPtr;
            assembly {
                listPtr := add(item, 0x20)
            }
            memcpy(flattenedPtr, listPtr, item.length);
            flattenedPtr += _list[i].length;
        }

        return flattened;
    }

    function concat(bytes memory _preBytes, bytes memory _postBytes) private pure returns (bytes memory) {
        bytes memory tempBytes;
        assembly {
            tempBytes := mload(0x40)
            let length := mload(_preBytes)
            mstore(tempBytes, length)
            let mc := add(tempBytes, 0x20)
            let end := add(mc, length)
            for { let cc := add(_preBytes, 0x20) } lt(mc, end) {
                mc := add(mc, 0x20)
                cc := add(cc, 0x20)
            } { mstore(mc, mload(cc)) }
            length := mload(_postBytes)
            mstore(tempBytes, add(length, mload(tempBytes)))
            mc := end
            end := add(mc, length)
            for { let cc := add(_postBytes, 0x20) } lt(mc, end) {
                mc := add(mc, 0x20)
                cc := add(cc, 0x20)
            } { mstore(mc, mload(cc)) }
            mstore(0x40, and(add(add(end, iszero(add(length, mload(_preBytes)))), 31), not(31)))
        }
        return tempBytes;
    }
}
```

This library provides `RLP` (Recursive Length Prefix) encoding functionality which is crucial for:

- Encoding transaction data
- Creating standardized transaction formats
- Supporting Ethereum transaction encoding

**Key functions:**

- `encodeBytes:` Encodes byte strings
- `encodeList:` Encodes lists of encoded items
- `encodeAddress:` Encodes Ethereum addresses
- `encodeUint:` Encodes unsigned integers
