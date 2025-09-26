// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The ISched contract's address.
address constant ISCHED_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000905;

/// @dev The ISched contract's instance.
ISched constant ISCHED_CONTRACT = ISched(ISCHED_PRECOMPILE_ADDRESS);

struct CallbacksResponse {
    Types.PageResponse pagination;
    CallbackResponse[] callbacks;
}

struct CallbackByIdResponse {
    CallbackResponse callbackResponse;
}

struct CallbackResponse {
    Callback callback;
    CallbackResult result;
}

struct Callback {
    uint64 id;
    address addressValue;
    uint64 gasLimit;
}

struct CallbackResult {
    CallbackStatus status;
    bytes result;
}

enum CallbackStatus {
    Unspecified,
    Succeed,
    Failed
}

struct CallbackParams {
    address addressValue;
    uint64 gasLimit;
}

/**
 * @author Warden Team
 * @title x/sched Interface
 * @dev The interface through which users and solidity contracts will interact with x/sched.
 * @custom:address 0x0000000000000000000000000000000000000905
 */
interface ISched {
    /**
     * @notice Retrieves a specific callback by its ID
     * @param id The unique identifier of the callback to retrieve
     * @return response A CallbackByIdResponse containing the callback details and its execution result
     */
    function callbackById(
        uint64 id
    ) external view returns (CallbackByIdResponse memory response);

    /**
     * @notice Retrieves a paginated list of all callbacks
     * @param pagination The pagination parameters to control the number of results and page offset
     * @return response A CallbacksResponse containing the list of callbacks and pagination information
     */
    function callbacks(
        Types.PageRequest calldata pagination
    ) external view returns (CallbacksResponse memory response);

    /**
     * @notice Returns the address of the sched module.
     * @return The address of the sched module
     */
    function getAddress() external view returns (address);

    /**
     * @notice This is an internal API (even if marked as external). Do not call.
     */
    function executeCallbacks() external;
}
