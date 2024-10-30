// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The ISlinky contract's address.
address constant ISLINKY_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000902;

/// @dev The ISlinky contract's instance.
ISlinky constant ISLINKY_CONTRACT = ISlinky(ISLINKY_PRECOMPILE_ADDRESS);

struct CoinPriceResponse {
    uint64 decimals;
    QuotePrice price;
}

struct QuotePrice {
    uint64 blockHeight;
    int64 blockTimestamp;
    int64 price;
}

/**
 * @author Warden Team
 * @title x/slinky Interface
 * @dev The interface through which users and solidity contracts will interact with x/slinky.
 * @custom:address 0x0000000000000000000000000000000000000902
 */
interface ISlinky {
    /// @dev Defines a method to query the price of a coin.
    /// @param base The base coin name for the price
    /// @param quote The quote coin name for the price
    /// @return response The coin price if found
    function coinPrice(
        string calldata base,
        string calldata quote
    ) external view returns (CoinPriceResponse memory response);
}