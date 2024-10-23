// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.18;

import "../common/Types.sol";

/// @dev The IAct contract's address.
address constant IACT_PRECOMPILE_ADDRESS = 0x0000000000000000000000000000000000000901;

/// @dev The IAct contract's instance.
IAct constant IACT_CONTRACT = IAct(IACT_PRECOMPILE_ADDRESS);

enum ActionStatus { Unspecified, Pending, Completed, Revoked, Timeout }
enum VoteType { None, Approve, Reject }

struct ActionVote {
    address participant;
    Types.Timestamp votedAt;
    VoteType voteType;
}

struct Action {
    uint64 id;
    ActionStatus status;
    Types.AnyType msg;
    Types.AnyType result;
    address creator;
    uint64 timeoutHeight;
    Types.Timestamp createdAt;
    Types.Timestamp updatedAt;
    string approveExpression;
    string rejectExpression;
    address[] mentions;
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
    address creator;
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
    /// @dev Defines a method to check an action.
    /// @param actionId The action id
    /// @return action status
    function checkAction(uint64 actionId) external returns (string memory);

    /// @dev Defines a method to create a new template.
    /// @param name The template name
    /// @param definition The template definition
    /// @return template id
    function newTemplate(
        string calldata name,
        string calldata definition
    ) external returns (uint64);

    /// @dev Defines a method to revoke an action.
    /// @param actionId The id of the action
    /// @return true If execution was successful
    function revokeAction(uint64 actionId) external returns (bool);

    /// @dev Defines a method to update a template.
    /// @param templateId The id of the template
    /// @param name The template name
    /// @param definition The template definition
    /// @return true If execution was successful
    function updateTemplate(
        uint64 templateId,
        string calldata name,
        string calldata definition
    ) external returns (bool);

    /// @dev Defines a method to vote for an action.
    /// @param actionId The id of the action
    /// @param voteType The type of the vote
    /// @return action status
    function voteForAction(
        uint64 actionId,
        VoteType voteType
    ) external returns (string memory);

    /// @dev Defines a method to query actions.
    /// @param pagination The pagination details
    /// @return response The paged actions
    function actions(
        Types.PageRequest calldata pagination
    ) external view returns (ActionsResponse memory response);

    /// @dev Defines a method to query an action by id.
    /// @param actionId The id of the action
    /// @return response The action
    function actionById(
        uint64 actionId
    ) external view returns (ActionByIdResponse memory response);

    /// @dev Defines a method to query an action by participant address.
    /// @param pagination The pagination details
    /// @param addr The participant address
    /// @param status The action status
    /// @return response The paged actions
    function actionsByAddress(
        Types.PageRequest calldata pagination,
        address addr,
        ActionStatus status
    ) external view returns (ActionsByAddressResponse memory response);

    /// @dev Defines a method to query templates.
    /// @param pagination The pagination details
    /// @param creator The template creator
    /// @return response The paged templates
    function templates(
        Types.PageRequest calldata pagination,
        address creator
    ) external view returns (TemplatesResponse memory response);

    /// @dev Defines a method to query a template by id.
    /// @param templateId The id of the template
    /// @return response The template
    function templateById(
        uint64 templateId
    ) external view returns (TemplateByIdResponse memory response);

    /// @dev CreateTemplate defines an Event emitted when a template is created.
    /// @param creator The address of the creator
    /// @param templateId The template id
    event CreateTemplate(address indexed creator, uint64 templateId);

    /// @dev UpdateTemplate defines an Event emitted when a template is updated.
    /// @param author The address of the author
    /// @param templateId The template id
    event UpdateTemplate(address indexed author, uint64 templateId);

    /// @dev ActionVoted defines an Event emitted when an action is voted.
    /// @param participant The address of the participant
    /// @param actionId The action Id
    /// @param voteType The type of the vote
    event ActionVoted(
        address indexed participant,
        uint64 actionId,
        VoteType voteType
    );

    /// @dev CreateAction defines an Event emitted when an action is created.
    /// @param creator The address of the creator
    /// @param actionId The action Id
    event CreateAction(address indexed creator, uint64 actionId);

    /// @dev ActionStateChange defines an Event emitted when an action state is changed.
    /// @param author The address of the author
    /// @param actionId The action Id
    /// @param previousStatus The previous status of the action
    /// @param newStatus The new status of the action
    event ActionStateChange(
        address indexed author,
        uint64 actionId,
        ActionStatus previousStatus,
        ActionStatus newStatus
    );
}
