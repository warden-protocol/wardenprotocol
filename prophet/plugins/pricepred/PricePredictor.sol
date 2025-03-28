// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

/**
 * @title PricePredictor
 * @notice Solidity contract that declares the structs for input/output.
 */
contract PricePredictor {
    struct SolverReceipt {
        bytes bloomFilter;
        uint256 countItems;
    }

    struct InputData {
        uint256 date;
        string[] tokens;
        uint256[] metrics;
        uint64[2] falsePositiveRate;
    }

    struct OutputData {
        uint256[] predictions;
        SolverReceipt solverReceipt;
        uint256[][] metrics;
    }

    /**
     * @notice stub function
     */
    function solve(InputData memory /* inputData */ ) public pure returns (OutputData memory outputData) {
        return outputData;
    }
}
