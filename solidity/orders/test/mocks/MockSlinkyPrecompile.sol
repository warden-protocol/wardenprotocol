pragma solidity >=0.8.25 <0.9.0;

struct GetPriceResponse {
    uint64 decimals;
    QuotePrice price;
}

struct QuotePrice {
    uint64 blockHeight;
    uint256 blockTimestamp;
    uint256 price;
}

contract MockSlinkyPrecompile {
    mapping(string => mapping(string => uint256)) private prices;
    function getPrice(
        string calldata base,
        string calldata quote
        ) external view returns (GetPriceResponse memory response) {
            uint256 price = prices[base][quote];
            if (price == 0) {
                string memory s1 = string.concat("no price / nonce reported for CurrencyPair: ", base);
                string memory s2 = string.concat(s1, "/");
                string memory s3 = string.concat(s2, quote);
                string memory s4 = string.concat(s3, ", the module is not tracking this CurrencyPair");
                revert(s4);
            }

            QuotePrice memory quotePrice = QuotePrice({
                blockHeight: 0,
                blockTimestamp: 0,
                price: price
            });

            return GetPriceResponse ({
                decimals: 9,
                price: quotePrice
            });
    }

    function setPrice(
        string calldata base,
        string calldata quote,
        uint256 price
        ) external {
            prices[base][quote] = price;
    }
}
