// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0; 

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

 // Data for execution
struct OrderData {
    address to;
    uint256 thresholdPrice;
    SwapData swapData;
    SignRequestData signRequestData;
}

struct CreatorDefinedTxFields {
    uint256 value;
    uint256 chainId;
}

// Raw unsigned transaction fields
struct UnsignedEthTx {
    uint256 nonce;
    uint256 maxFeePerGas;
    uint256 maxPriorityFeePerGas;
    address to;
    uint256 value;
    bytes data;
    uint256 chainId;
}