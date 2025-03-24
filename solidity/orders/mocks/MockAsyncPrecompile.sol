// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.25 <0.9.0;

import { 
    Future, 
    FutureByIdResponse, 
    FutureResponse, 
    FuturesResponse,
    FutureResult, 
    FutureVote, 
    IAsync,
    PendingFuturesResponse
} from "ext-async/IAsync.sol";
import { Types } from "ext-async/IAsync.sol";

contract MockAsyncPrecompile is IAsync {
    uint64 public futuresCount = 0;
    mapping(uint64 id => FutureByIdResponse output) public _futures;
    mapping(address orderAddress => address orderCreator) public orders;

    function addFuture(
        string calldata handler,
        bytes calldata input,
        address
    ) external returns (uint64 futureId)
    {
        futureId = uint64(++futuresCount);
        Future memory future = Future({
            id: futureId,
            // solhint-disable-next-line
            creator: tx.origin,
            handler: handler,
            input: input
        });

        FutureVote[] memory emptyVotes = new FutureVote[](0);
        bytes memory emptySubmitter;
        FutureResult memory futureResult = FutureResult({ 
            id: futureId,
            output: input,
            submitter: emptySubmitter
        });
        FutureResponse memory futureResponse = FutureResponse({
            future: future,
            votes: emptyVotes,
            result: futureResult
        });
        _futures[futureId] = FutureByIdResponse({
            futureResponse: futureResponse
        });
    }

    function futureById(
        uint64 futureId
    ) external view returns (FutureByIdResponse memory response) {
        response = _futures[futureId];
    }

    function futures(
        Types.PageRequest calldata,
        address
    ) external pure returns (FuturesResponse memory) {
        // solhint-disable-next-line
        revert("Unimplemented");
    }

    function pendingFutures(
        Types.PageRequest calldata
    ) external pure returns (PendingFuturesResponse memory) {
        // solhint-disable-next-line
        revert("Unimplemented");
    }
}
