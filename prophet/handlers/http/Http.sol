// SPDX-License-Identifier: MIT
pragma solidity >=0.8.25 <0.9.0;

contract Http {
    struct Request {
        string url;
        string method;
        bytes body;
    }

    struct Response {
        uint256 status;
        bytes body;
    }

    function main(Request memory /* request */ ) external pure returns (Response memory) {
        Response memory out;
        return out;
    }
}
