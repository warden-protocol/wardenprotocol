﻿---
sidebar_position: 2
---

# x/act

## Overview

The [`IAct` precompile](https://github.com/warden-protocol/wardenprotocol/blob/main/precompiles/act/IAct.sol) allows calling the [`x/act`](/learn/warden-protocol-modules/x-act) module from EVM smart contracts.

In this article, you'll find a full list of available methods and events. You can use them for querying and managing the following components:

- [Rules](/learn/glossary#approval-rule)
- [Actions](/learn/glossary#action)

## Precompile address

To reference the `IAct` precompile in your code, use the following precompile address:

```
0x0000000000000000000000000000000000000901
```

## Rules

### Create a new Rule

- **Method**: `newTemplate()`
- **Description**: Creates a new Rule (template). Emits the [`CreateTemplate`](#createtemplate) event.
- **Parameters** :
  ```sol
  @param name The template name
  @param definition The template definition
  ```
- **Output**:  
  ```sol
  @return template id
  ```

### Update a Rule

- **Method**: `updateTemplate()`
- **Description**: Updates a Rule (template). Emits the [`UpdateTemplate`](#createtemplate) event.
- **Parameters** :
  ```sol
  @param templateId The id of the template
  @param name The template name
  @param definition The template definition
  ```
- **Output**:  
  ```sol
  @return true If execution was successful
  ```

### Query Rules

- **Method**: `templates()`
- **Description**: Returns a list of all Rules (templates). See the [`TemplatesResponse`](#templatesresponse) struct.
- **Parameters** :
  ```sol
  @param pagination The pagination details
  @param creator The template creator
  ```
- **Output**:  
  ```sol
  @return response The paged templates
  ```

### Query a Rule by ID

- **Method**: `templateById()`
- **Description**: Returns a Rule (template) by ID. See the [`TemplateByIdResponse`](#templatebyidresponse) struct.
- **Parameters** :
  ```sol
  @param templateId The id of the template
  ```
- **Output**:  
  ```sol
  @return response The template
  ```

## Actions

### Vote for an Action

- **Method**: `voteForAction()`
- **Description**: Votes for an Action. Emits the [`ActionVoted`](#actionvoted) event, returns [`ActionStatus`](#actionstatus).
- **Parameters** :
  ```sol
  @param actionId The id of the action
  @param voteType The type of the vote
  ```
- **Output**:  
  ```sol
  @return action status
  ```

### Revoke an Action

- **Method**: `revokeAction()`
- **Description**: Revokes an Action.
- **Parameters** :
  ```sol
  @param actionId The id of the action
  ```
- **Output**:  
  ```sol
  return true If execution was successful
  ```

### Query Actions

- **Method**: `actions()`
- **Description**: Returns a list of all Actions. See the [`ActionsResponse`](#actionsresponse) struct.
- **Parameters** :
  ```sol
  @param pagination The pagination details
  ```
- **Output**:  
  ```sol
  @return response The paged actions
  ```

### Query Actions by address

- **Method**: `actionsByAddress()`
- **Description**: Returns a list of Actions by participant address – [`ActionsByAddressResponse`](#actionsbyaddressresponse). You can filter the output by [`ActionStatus`](#actionstatus).
- **Parameters** :
  ```sol
  @param pagination The pagination details
  @param addr The participant address
  @param status The action status
  ```
- **Output**:  
  ```sol
  @return response The paged actions
  ```

### Query an Action by ID

- **Method**: `actionById()`
- **Description**: Returns an Action by ID. See the [`ActionByIdResponse`](#actionbyidresponse) struct.
- **Parameters** :
  ```sol
  @param actionId The id of the action
  ```
- **Output**:  
  ```sol
  @return response The action
  ```

### Query the Action status by ID

- **Method**: `checkAction()`
- **Description**: Returns the status of an Action with a given ID. See the [`ActionStatus`](#actionstatus) enum.
- **Parameters** :
  ```sol
  @param actionId The action id
  ```
- **Output**:  
  ```sol
  @return action status
  ```

## Structs

### `Template`

- **Description**: A struct representing a Rule (template).

```
struct Template {
    uint64 id;
    address creator;
    string name;
    string expression;
}
```

### `TemplatesResponse`

- **Description**: The response returned when you [query Rules](#query-rules). Includes the [`Template`](#template) struct.

```
struct TemplatesResponse {
    Types.PageResponse pagination;
    Template[] templates;
}
```

### `TemplateByIdResponse`

- **Description**: The response returned when you [query a Rule by ID](#query-a-rule-by-id). Includes the [`Template`](#template) struct.

```
struct TemplateByIdResponse {
    Template template;
}
```

### `Action`

- **Description**: A struct representing an Action. Includes the [`ActionStatus`](#actionstatus) enum.

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

- **Description**: The response returned when you [query Actions](#query-actions). Includes the [`Action`](#action) struct.

```
struct ActionsResponse {
    Types.PageResponse pagination;
    Action[] actions;
}
```

### `ActionsByAddressResponse`

- **Description**: The response returned when you [query an Action by ID](#query-an-action-by-id). Includes the [`Action`](#action) struct.

```

struct ActionsByAddressResponse {
    Types.PageResponse pagination;
    Action[] actions;
}
```

### `ActionByIdResponse`

- **Description**: The response returned when you [query Actions by address](#query-actions-by-address). Includes the [`Action`](#action) struct.

```
struct ActionByIdResponse {
    Action action;
}
```

## Enums

### `ActionStatus`

- **Description**: The status of an Action.

```
enum ActionStatus { Unspecified, Pending, Completed, Revoked, Timeout }
```

### `VoteType`

- **Description**: The vote type.

```
enum VoteType { None, Approve, Reject }
```

## Events

### `CreateTemplate`

- **Description**: An event emitted when [a Rule is created](#create-a-new-rule).
- **Parameters**:  
  ```sol
  @param name The template name
  @param definition The template definition
  ```

### `UpdateTemplate`

- **Description**: An event emitted when [a Rule is updated](#update-a-rule).
- **Parameters**:  
  ```sol
  @param creator The address of the creator
  @param templateId The template id
  ```

### `CreateAction`

- **Description**: An event emitted when an Action is created.
- **Parameters**:  
  ```sol
  @param author The address of the author
  @param templateId The template id
  ```

### `ActionStateChange`

- **Description**: An event emitted when the status of an Action is changed.
- **Parameters**:  
  ```sol
  @param author The address of the author
  @param actionId The action Id
  @param previousStatus The previous status of the action
  @param newStatus The new status of the action
  ```
### `ActionVoted`

- **Description**: An event emitted when [an Action is voted on](#vote-for-an-action). Includes the [`VoteType`](#votetype) enum.
- **Parameters**:  
  ```sol
  @param participant The address of the participant
  @param actionId The action Id
  @param voteType The type of the vote
  ```
