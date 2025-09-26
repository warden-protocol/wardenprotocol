// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Types } from "./Types.sol";
import { Instruction, FeeToken } from "./IExecutionV1.sol";

library TypesV1 {
    struct CommonExecutionData {
        Instruction[] instructions;
        FeeToken feeToken;
        Types.SignRequestData signRequestData;
    }
}
