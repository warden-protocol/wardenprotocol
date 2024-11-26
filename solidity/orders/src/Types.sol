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

    // Data for execution
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
