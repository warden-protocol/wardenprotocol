#!/bin/sh

# prepare sloc v0.5.17 in PATH
solc --combined-json bin,abi --allow-paths . ./tests/solidity/suites/staking/contracts/test/mocks/StandardTokenMock.sol \
    | jq ".contracts.\"./tests/solidity/suites/staking/contracts/test/mocks/StandardTokenMock.sol:StandardTokenMock\"" \
    > x/evm/types/ERC20Contract.json

solc --combined-json bin,abi --allow-paths . ./tests/solidity/suites/basic/contracts/TestMessageCall.sol \
    | jq ".contracts.\"./tests/solidity/suites/basic/contracts/TestMessageCall.sol:TestMessageCall\"" \
    > x/evm/types/TestMessageCall.json
