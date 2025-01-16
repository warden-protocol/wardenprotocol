// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

library Types {
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
        GTE,
        LT,
        GT
    }

    // Data for basic order creation
    struct BasicOrderData {
        uint256 thresholdPrice;
        PriceCondition priceCondition;
        PricePair pricePair;
    }

    // Data for advanced order creation
    struct AdvancedOrderData {
        PricePair oraclePricePair;
        PricePair predictPricePair;
    }

    // Data for execution
    struct CommonExecutionData {
        CreatorDefinedTxFields creatorDefinedTxFields;
        SignRequestData signRequestData;
    }

    // Price pair for oracle/prediction requests
    struct PricePair {
        string base;
        string quote;
    }

    struct CreatorDefinedTxFields {
        uint256 value;
        uint256 chainId;
        address to;
        bytes data;
    }
}
