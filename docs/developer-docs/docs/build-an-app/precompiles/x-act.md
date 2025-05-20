---
sidebar_position: 2
---

# x/act

## Overview

The `IAct.sol` precompile  enables EVM smart contracts to interact with the [`x/act` module](/learn/warden-protocol-modules/x-act).

In this article, you'll find a full list of available methods, allowing you to query and manage the following components:

- [Rules](/learn/warden-protocol-modules/x-act#rule)
- [Actions](/learn/warden-protocol-modules/x-act#action)

To learn how to use this precompile, refer to [Interact with `x/act`](/category/interact-with-xact).

:::note Code
You can find the `x/act` precomile code on GitHub: [`IAct.sol`](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/act/IAct.sol)
:::

## Precompile address

To reference the `IAct` precompile in your code, use the following precompile address:

```
0x0000000000000000000000000000000000000901
```

## Rules

### Create a new Rule

- **Method**: `newTemplate()`
- **Description**: Creates a new Rule (template). Emits the [`CreateTemplate` event](#createtemplate).
- **Code**:
  ```
  function newTemplate(
      string calldata name,
      string calldata definition
  ) external returns (uint64);
  ```
- **Parameters**:
  ```sol
  @param name The template name
  @param definition The template definition
  ```
- **Output**:  
  ```sol
  @return template id
  ```

- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-rules#create-a-new-rule)

### Update a Rule

- **Method**: `updateTemplate()`
- **Description**: Updates a Rule (template). Emits the [`UpdateTemplate` event](#updatetemplate).
- **Code**:
  ```
  function updateTemplate(
      uint64 templateId,
      string calldata name,
      string calldata definition
  ) external returns (bool);
  ```
- **Parameters**:
  ```sol
  @param templateId The id of the template
  @param name The template name
  @param definition The template definition
  ```
- **Output**:  
  ```sol
  @return true If execution was successful
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-rules#update-a-rule)

### Query Rules

- **Method**: `templates()`
- **Description**: Returns a list of all Rules (templates). See the [`TemplatesResponse` struct](#templatesresponse).
- **Code**:
  ```
  function templates(
      Types.PageRequest calldata pagination,
      address creator
  ) external view returns (TemplatesResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param pagination The pagination details
  @param creator The template creator
  ```
- **Output**:  
  ```sol
  @return response The paged templates
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-rules#query-rules)

### Query a Rule by ID

- **Method**: `templateById()`
- **Description**: Returns a Rule (template) by ID. See the [`TemplateByIdResponse` struct](#templatebyidresponse).
- **Code**:
  ```
  function templateById(
      uint64 templateId
  ) external view returns (TemplateByIdResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param templateId The id of the template
  ```
- **Output**:  
  ```sol
  @return response The template
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-rules#query-a-rule-by-id)

## Actions

### Vote for an Action

- **Method**: `voteForAction()`
- **Description**: Votes for an Action. Emits the [`ActionVoted` event](#actionvoted), returns [`ActionStatus`](#actionstatus).
- **Code**:
  ```
  function voteForAction(
      uint64 actionId,
      VoteType voteType
  ) external returns (string memory);
  ```
- **Parameters**:
  ```sol
  @param actionId The id of the action
  @param voteType The type of the vote
  ```
- **Output**:  
  ```sol
  @return action status
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-actions#vote-for-an-action)

### Revoke an Action

- **Method**: `revokeAction()`
- **Description**: Revokes an Action.
- **Code**:
  ```
  function revokeAction(
      uint64 actionId
  ) external returns (bool);
  ```
- **Parameters**:
  ```sol
  @param actionId The id of the action
  ```
- **Output**:  
  ```sol
  return true If execution was successful
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-actions#vote-for-an-action)

### Query Actions

- **Method**: `actions()`
- **Description**: Returns a list of all Actions. See the [`ActionsResponse` struct](#actionsresponse).
- **Code**:
  ```
  function actions(
      Types.PageRequest calldata pagination
  ) external view returns (ActionsResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param pagination The pagination details
  ```
- **Output**:  
  ```sol
  @return response The paged actions
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-actions#query-actions)

### Query Actions by address

- **Method**: `actionsByAddress()`
- **Description**: Returns a list of Actions by participant address—[`ActionsByAddressResponse`](#actionsbyaddressresponse). You can filter the output by [`ActionStatus`](#actionstatus).
- **Code**:
  ```
  function actionsByAddress(
      Types.PageRequest calldata pagination,
      address addr,
      ActionStatus status
  ) external view returns (ActionsByAddressResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param pagination The pagination details
  @param addr The participant address
  @param status The action status
  ```
- **Output**:  
  ```sol
  @return response The paged actions
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-actions#query-actions-by-address)

### Query an Action by ID

- **Method**: `actionById()`
- **Description**: Returns an Action by ID. See the [`ActionByIdResponse` struct](#actionbyidresponse).
- **Code**:
  ```
  function actionById(
      uint64 actionId
  ) external view returns (ActionByIdResponse memory response);
  ```
- **Parameters**:
  ```sol
  @param actionId The id of the action
  ```
- **Output**:  
  ```sol
  @return response The action
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-actions#query-an-action-by-id)

### Query the Action status by ID

- **Method**: `checkAction()`
- **Description**: Returns the status of an Action with a given ID. See the [`ActionStatus` enum](#actionstatus).
- **Code**:
  ```
  function checkAction(
      uint64 actionId
  ) external returns (string memory);
  ```
- **Parameters**:
  ```sol
  @param actionId The action id
  ```
- **Output**:  
  ```sol
  @return action status
  ```
- **Usage example**: [Create a new Space](../interact-with-warden-modules/interact-with-x-act/manage-actions#query-the-action-status-by-id)

## Structs

### `Template`

- **Description**: A struct representing a Rule (template).
- **Code**:
  ```
  struct Template {
      uint64 id;
      address creator;
      string name;
      string expression;
  }
  ```

### `TemplatesResponse`

- **Description**: A response returned when you [query Rules](#query-rules). Includes the [`Template` struct](#template).
- **Code**:
  ```
  struct TemplatesResponse {
      Types.PageResponse pagination;
      Template[] templates;
  }
  ```

### `TemplateByIdResponse`

- **Description**: A response returned when you [query a Rule by ID](#query-a-rule-by-id). Includes the [`Template` struct](#template).
- **Code**:
  ```
  struct TemplateByIdResponse {
      Template template;
  }
  ```

### `Action`

- **Description**: A struct representing an Action. Includes the [`ActionStatus` enum](#actionstatus).
- **Code**:
  ```
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
  ```

### `ActionsResponse`

- **Description**: A response returned when you [query Actions](#query-actions). Includes the [`Action` struct](#action).
- **Code**:
  ```
  struct ActionsResponse {
      Types.PageResponse pagination;
      Action[] actions;
  }
  ```

### `ActionsByAddressResponse`

- **Description**: A response returned when you [query an Action by ID](#query-an-action-by-id). Includes the [`Action` struct](#action).
- **Code**:
  ```
  
  struct ActionsByAddressResponse {
      Types.PageResponse pagination;
      Action[] actions;
  }
  ```

### `ActionByIdResponse`

- **Description**: A response returned when you [query Actions by address](#query-actions-by-address). Includes the [`Action` struct](#action).
- **Code**:
  ```
  struct ActionByIdResponse {
      Action action;
  }
  ```

## Enums

### `ActionStatus`

- **Description**: The status of an Action.
- **Code**:
  ```
  enum ActionStatus {
      Unspecified,
      Pending,
      Completed,
      Revoked,
      Timeout
  }
  ```

### `VoteType`

- **Description**: The vote type.
- **Code**:
  ```
  enum VoteType {
      None,
      Approve,
      Reject
  }
  ```

## Events

### `CreateTemplate`

- **Description**: An event emitted when [a Rule is created](#create-a-new-rule).
- **Code**:
  ```
  event CreateTemplate(
      address indexed creator,
      uint64 templateId
  );
  ```
- **Parameters**:  
  ```sol
  @param name The template name
  @param definition The template definition
  ```

### `UpdateTemplate`

- **Description**: An event emitted when [a Rule is updated](#update-a-rule).
- **Code**:
  ```
  event UpdateTemplate(
      address indexed author,
      uint64 templateId
  );
  ```
- **Parameters**:  
  ```sol
  @param creator The address of the creator
  @param templateId The template id
  ```

### `CreateAction`

- **Description**: An event emitted when an Action is created.
- **Code**:
  ```
  event CreateAction(
      address indexed creator,
      uint64 actionId
  );
  ```
- **Parameters**:  
  ```sol
  @param author The address of the author
  @param templateId The template id
  ```

### `ActionStateChange`

- **Description**: An event emitted when the status of an Action is changed.
- **Code**:
  ```
  event ActionStateChange(
      address indexed author,
      uint64 actionId,
      ActionStatus previousStatus,
      ActionStatus newStatus
  );
  ```
- **Parameters**:  
  ```sol
  @param author The address of the author
  @param actionId The action Id
  @param previousStatus The previous status of the action
  @param newStatus The new status of the action
  ```
### `ActionVoted`

- **Description**: An event emitted when [an Action is voted on](#vote-for-an-action). Includes the [`VoteType` enum](#votetype).
- **Code**:
  ```
  event ActionVoted(
      address indexed participant,
      uint64 actionId,
      VoteType voteType
  );
  ```
- **Parameters**:  
  ```sol
  @param participant The address of the participant
  @param actionId The action Id
  @param voteType The type of the vote
  ```
