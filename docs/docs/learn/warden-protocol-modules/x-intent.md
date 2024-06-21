---
sidebar_position: 2
---

# x/intent

## Abstract

The `x/intent` module is a [Cosmos SDK](https://docs.cosmos.network/) module capable of
executing messages under certain conditions (typically user-defined). It's similar to [x/gov](https://docs.cosmos.network/main/build/modules/gov).

This module implements the following concepts:

- [Intent](/learn/glossary#intent)
- Expression
- [Action](/learn/glossary#action)

## Concepts

### Intent

The **Intent** struct represents a set of conditions that must be met before "something" can be executed.

The `x/intent` module doesn't dictate what "something" is: other modules can implement their own objects and plug their logic.

<!---
In the description of `msg`, we mention `intent`. Is it the same `intent`? In this section, we could reference it as "The Intent struct (`intent`) represents..."
--->

### Expression

An **expression** is a short program written in the [Intent-Specific Language](/learn/glossary#intent-specific-language) to define an Intent.

Users input their Intents as strings, which are further processed into [abstract syntax trees](/learn/glossary#abstract-syntax-tree) (ASTs). The `x/intent` module stores and checks these ASTs, not dealing with the initial user input.

<!---
Does the paragraph above sound correct? I expanded it a bit.
--->

### Action

An **Action** wraps one message and an Intent. When the Intent conditions are met, the message is executed.

The user submits a `MsgNewAction` transaction containing the message to be wrapped. The module responsible for handling that message should provide the Intent to be applied

<!---
This note was at the end of the document, and it wasn't clear how it's related to the rest. What if we include it here? Also, is it correct to say that `MsgNewAction` is a transaction? Finally, "The module responsible for handling that message" - is it some other module, not `x/intent`? In that case, we could say: "Another module that is responsible..."
--->

## State

### Intent

**Intent** is mainly composed of the following:

- `id`: The unique on-chain identifier.
- `name`: The name.
- `expression`: The [abstract syntax tree](/learn/glossary#abstract-syntax-tree) defining the Intent.

### Action

**Action** is composed of the following:

- `id`, `creator`, `status`, `result`, `approvers`, `btl`, `intent`
- `msg`: The message that will be executed by the `x/intent` module account when `intent` is satisfied. Type: `any`.

Instead of referencing an Intent by its ID, we store a copy of the Intent at the time the Action is created. This way we ensure that the Intent can't be changed after the Action is created, preventing unexpected behaviors.