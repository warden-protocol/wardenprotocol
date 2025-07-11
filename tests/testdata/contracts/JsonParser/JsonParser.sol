// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IJSON_CONTRACT, FixedPoint} from "precompiles/json/IJson.sol";

contract JsonParser {
    function run() public view {
        string memory j = '{'
        '  "str": "foo",'
        '  "int": 1234,'
        '  "bool": true,'
        '  "float": 12.34,'
        '  "nestedarray": ['
        '    {"s":"a","v":1},'
        '    {"s":"b","v":2}'
        '  ]'
        '}';

        // basic types
        string memory schema = 'str:string,int:int256,bool:bool';
        (string memory s, int256 i, bool b) = abi.decode(IJSON_CONTRACT.parse(bytes(j), bytes(schema)), (string, int256, bool));
        require(keccak256(abi.encodePacked(s)) == keccak256(abi.encodePacked("foo")), "wrong str");
        require(i == 1234, "wrong int256");
        require(b == true, "wrong bool");

        // special case: fixed point decimals uses "fp" as type in the schema and are mapped to the FixedPoint struct
        string memory schema2 = 'float:fp';
        (FixedPoint memory fp) = abi.decode(IJSON_CONTRACT.parse(bytes(j), bytes(schema2)), (FixedPoint));
        require(fp.mantissa == 12340000000000000000, "wrong mantissa");
        require(fp.exponent == 18, "wrong exponent");

        // nested tuple arrays, items must abi-decoded singularly
        string memory schema3 = 'nestedarray:(s:string,v:int256)[]';
        bytes[] memory elements = abi.decode(IJSON_CONTRACT.parse(bytes(j), bytes(schema3)), (bytes[]));
        require(elements.length == 2, "wrong elements length");

        (string memory s1, int256 v1) = abi.decode(elements[0], (string, int256));
        require(v1 == 1, "wrong v1");
        require(keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked("a")), "wrong s1");

        (string memory s2, int256 v2) = abi.decode(elements[1], (string, int256));
        require(v2 == 2, "wrong v2");
        require(keccak256(abi.encodePacked(s2)) == keccak256(abi.encodePacked("b")), "wrong s2");
    }
}
