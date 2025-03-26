// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { Types as CommonTypes } from "precompile-common/Types.sol";
import { AbstractOrderV1 } from "../orders/AbstractOrderV1.sol";
import { ExecutionData, GetQuotePayload, IExecutionV1 } from "../types/IExecutionV1.sol";
import { TypesV1 } from "../types/TypesV1.sol";
import { Registry } from "../Registry.sol";

event Executed();

contract TemplateOrderV1 is AbstractOrderV1, IExecutionV1 {
    GetQuotePayload public quote;
    TypesV1.CommonExecutionData public commonExecutionData;

    Registry private immutable REGISTRY;
    CommonTypes.Coin[] private _coins;
    bool private _executed;

    constructor(
        TypesV1.CommonExecutionData memory _commonExecutionData,
        CommonTypes.Coin[] memory maxKeychainFees,
        address scheduler,
        address registry
    )
        AbstractOrderV1(_commonExecutionData, scheduler, registry)
    {
        REGISTRY = Registry(registry);

        for (uint256 i = 0; i < maxKeychainFees.length; i++) {
            _coins.push(maxKeychainFees[i]);
        }
    }

    function canExecute() external pure returns (bool) {
        return true;
    }

    function execute(GetQuotePayload calldata _quote) external returns (bool, bytes32) {
        quote = _quote;

        bytes memory signRequestInput = abi.encodePacked(quote.hash);

        _executed = this.createSignRequest(commonExecutionData.signRequestData, signRequestInput, _coins);

        if (_executed) {
            emit Executed();
        }

        // origin always creator of sign request
        // solhint-disable-next-line
        REGISTRY.addTransaction(tx.origin, _quote.hash);

        return (_executed, _quote.hash);
    }

    function isExecuted() external pure returns (bool) {
        return true;
    }

    function executionData() external returns (ExecutionData memory) { }

    function getTx() external returns (bytes memory) { }
}
