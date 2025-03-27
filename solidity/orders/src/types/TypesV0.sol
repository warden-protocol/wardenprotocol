// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Types } from "./Types.sol";

library TypesV0 {
    struct CreatorDefinedTxFields {
        uint256 value;
        uint256 chainId;
        address to;
        bytes data;
    }

    // Data for execution
    struct CommonExecutionData {
        CreatorDefinedTxFields creatorDefinedTxFields;
        Types.SignRequestData signRequestData;
    }
}
