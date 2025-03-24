// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The IAsync contract's address.
address constant IASYNC_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000903;

/// @dev The IAsync contract's instance.
IAsync constant IASYNC_CONTRACT = IAsync(IASYNC_PRECOMPILE_ADDRESS);

struct Future {
    uint64 id;
    address creator;
    string handler;
    bytes input;
}

enum FutureVoteType {
    Unspecified,
    Verified,
    Rejected
}

struct FutureVote {
    uint64 futureId;
    bytes Voter;
    FutureVoteType vote;
}

struct FutureResult { 
    uint64 id;
    bytes output;
    bytes submitter;
}

struct FutureResponse {
    Future future;
    FutureVote[] votes;
    FutureResult result;
}

struct PendingFuturesResponse {
    Types.PageResponse pagination;
    Future[] futures;
}

struct FuturesResponse {
    Types.PageResponse pagination;
    FutureResponse[] futures;
}

struct FutureByIdResponse {
    FutureResponse futureResponse;
}

/**
 * @author Warden Team
 * @title x/async Interface
 * @dev The interface through which users and solidity contracts will interact with x/async.
 * @custom:address 0x0000000000000000000000000000000000000903
 */
interface IAsync {
    /// @dev Defines a method to add a future.
    /// @param handler The unique name of the handler
    /// @param input The handler's input
    /// @param callback The address of callback contract
    /// @return futureId The id of the future
    function addFuture(
        string calldata handler,
        bytes calldata input,
        address callback
    ) external returns (uint64 futureId);

    /// @dev Defines a method to query future by id.
    /// @param futureId The future id
    /// @return response The future reponse
    function futureById(
        uint64 futureId
    ) external view returns (FutureByIdResponse memory response);

    /// @dev Defines a method to query futures.
    /// @param pagination The pagination details
    /// @param creator Optional creator address filter
    /// @return response The paged futures
    function futures(
        Types.PageRequest calldata pagination,
        address creator
    ) external view returns (FuturesResponse memory response);

    /// @dev Defines a method to query pending futures.
    /// @param pagination The pagination details
    /// @return response The paged futures
    function pendingFutures(
        Types.PageRequest calldata pagination
    ) external view returns (PendingFuturesResponse memory response);

    /// @dev CreateFuture defines an Event emitted when a future is created.
    /// @param creator The address of the creator
    /// @param futureId The future Id
    /// @param handler The name of the handler
    /// @param callbackAddress The address of callback contract
    event CreateFuture(
        uint64 indexed futureId,
        address indexed creator,
        string handler,
        address callbackAddress
    );
}
