// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The IAct contract's address.
address constant IACT_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000901;

/// @dev The IAct contract's instance.
IAct constant IACT_CONTRACT = IAct(IACT_PRECOMPILE_ADDRESS);

    struct AnyType {
        string typeUrl;
        bytes value;
    }

    struct Timestamp {
        uint64 secs;
        uint64 nanos;
    }

    struct ActionVote {
        string participant;
        Timestamp votedAt;
        string voteType;
    }

    struct Action {
        uint64 id;
        string status;
        AnyType msg;
        AnyType result;
        string creator;
        uint64 timeoutHeight;
        Timestamp createdAt;
        Timestamp updatedAt;
        string approveExpression;
        string rejectExpression;
        string[] mentions;
        ActionVote[] votes;
    }

    struct ActionsResponse {
        Types.PageResponse pagination;
        Action[] actions;
    }

    struct ActionByIdResponse {
        Action action;
    }

    struct ActionsByAddressResponse {
        Types.PageResponse pagination;
        Action[] actions;
    }

    struct Template {
        uint64 id;
        string creator;
        string name;
        string expression;
    }

    struct TemplatesResponse {
        Types.PageResponse pagination;
        Template[] templates;
    }

    struct TemplateByIdResponse {
        Template template;
    }

/**
 * @author Act Team
 * @title x/act Interface
 * @dev The interface through which users and solidity contracts will interact with x/act.
 * @custom:address 0x0000000000000000000000000000000000000901
 */
interface IAct {
    function checkAction(uint64 actionId) external returns (string memory);

    function newTemplate(string calldata name, string calldata definition) external returns (uint64);

    function revokeAction(uint64 actionId) external;

    function updateTemplate(uint64 templateId, string calldata name, string calldata definition) external;

    function voteForAction(uint64 actionId, int32 voteType) external returns (string memory);

    function actions(Types.PageRequest calldata pagination) external view returns (ActionsResponse memory response);

    function actionById(uint64 actionId) external view returns (ActionByIdResponse memory response);

    function actionsByAddress(Types.PageRequest calldata pagination, string calldata addr, int status)
    external view returns (ActionsByAddressResponse memory response);

    function templates(Types.PageRequest calldata pagination)
    external view returns (TemplatesResponse memory response);

    function templateById(uint64 templateId)
    external view returns (TemplateByIdResponse memory response);
}