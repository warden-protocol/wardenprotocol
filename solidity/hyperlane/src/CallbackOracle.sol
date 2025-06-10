// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { IGasOracle } from "@hyperlane-xyz/contracts/interfaces/IGasOracle.sol";

contract CallbackGasOracle is IGasOracle {
    function getExchangeRateAndGasPrice(
        uint32
    ) external view returns (uint128 tokenExchangeRate, uint128 gasPrice) {
        return (uint128(1), uint128(tx.gasprice));
    }
}
