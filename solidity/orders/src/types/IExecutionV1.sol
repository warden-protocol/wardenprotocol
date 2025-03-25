// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

struct ExecutionData {
    address caller;
    Instruction[] instructions;
    FeeToken feeToken;
}

struct Instruction {
    Call[] calls;
    uint256 chainId;
}

struct Call {
    address to;
    bytes data;
    uint256 value;
}

struct FeeToken {
    address addr;
    uint256 chainId;
}

struct PaymentInfo {
    address sender;
    bytes initCode;
    address token;
    string nonce;
    string chainId;
    string tokenAmount;
    string tokenWeiAmount;
    string tokenValue;
}

struct UserOp {
    address sender;
    string nonce;
    bytes initCode;
    bytes callData;
    string callGasLimit;
    string verificationGasLimit;
    string maxFeePerGas;
    string maxPriorityFeePerGas;
    bytes paymasterAndData;
    string preVerificationGas;
}

struct UserOpMetadata {
    UserOp userOp;
    bytes32 userOpHash;
    bytes32 meeUserOpHash;
    string lowerBoundTimestamp;
    string upperBoundTimestamp;
    string maxGasLimit;
    string maxFeePerGas;
    string chainId;
}

struct GetQuotePayload {
    bytes32 hash;
    address node;
    bytes commitment;
    PaymentInfo paymentInfo;
    UserOpMetadata[] userOps;
}

interface IExecutionV1 {
    /**
     * @dev Indicates if an order can be executed.
     * @return A boolean value indicating that the order can be executed.
     */
    function canExecute() external view returns (bool);

    /**
     * @dev Creates action for new sign request from stored order data.
     * If action created successfully then emit Executed event.
     * @param quote Committed quote received from MEE node.
     * @return A boolean value indicating parameter action was created and transaction hash.
     */
    function execute(GetQuotePayload calldata quote) external returns (bool, bytes32);

    /**
     * @dev Indicates if execution was executed already.
     */
    function isExecuted() external returns (bool);

    /**
     * @dev Returns data necessary for scheduler.
     * @return executionData Data that scheduler needs to call execute method.
     */
    function executionData() external returns (ExecutionData memory executionData);

    /**
     * @dev Returns builded unsigned transaction.
     * @return tx Unsigned transaction.
     */
    function getTx() external returns (bytes memory tx);
}
