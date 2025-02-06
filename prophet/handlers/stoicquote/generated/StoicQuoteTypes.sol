// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

/**
 * @title StoicQuoteTypes
 * @notice Solidity contract that declares structs derived from JSON.
 */
contract StoicQuoteTypes {

struct Data {
    string author;
    string quote;
}

struct StoicQuote {
    Data data;
}

function useAllTypes(StoicQuote memory _stoicquote) external {
    // This function doesn't do anything but ensures the top-level struct is referenced.
}
}
