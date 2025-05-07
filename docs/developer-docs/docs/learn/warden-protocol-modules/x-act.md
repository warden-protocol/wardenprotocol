---
sidebar_position: 3
---

# x/act

## Overview

The `x/act` module is a [Cosmos SDK](https://docs.cosmos.network/) module executing messages (called Actions) under certain conditions, or Rules, defined by users.

This module implements the following concepts:

- [Rule](#rule)
- [Action](#action)
- [Intent-Specific Language](#intent-specific-language)

## Usage

You can call the `x/act` module from your EVM smart contract using the [`x/act` precompile](/build-an-app/precompiles/x-act), as show in the [Interact with x/act](/category/interact-with-xact) section.

## Concepts

### Rule

An **Approval Rule** is a set of user-defined conditions under which an [Action](#action) is performed. The `Rule` struct represents a set of conditions that must be met before something can be executed.

Users can register Rules onchain, writing their expressions in the [Intent-Specific Language](#intent-specific-language).

Other modules can plug their variables into the execution runtime of Rules. This enables users to base their Rules on data available onchain. To learn more, see [Hooks](#hooks).

### Action

An **Action** wraps another message: an onchain transaction on Warden Protocol or an offchain operation. Each Action contains a [Rule](#rule): when the conditions specified in the Rule are met, the wrapped message is executed.

When created, an Action has a *pending* state. When the wrapped message is executed, the Action state changes to *completed*. The creator of the Action can **revoke** it at any time, changing the Action status to *revoked*.

Optionally, it's possible to specify a **timeout height** for an Action. After this height is reached by the blockchain, the Action state will change to *timeout*.

An Action can be **approved** by one or more users. The addresses of the users that approved the Action are stored in its `approvers` field. These addresses can be used as boolean conditions in the Rule expression.

### Intent-Specific Language

The **Intent-Specific Language** (**ISL**) is a language designed to define [Rules](#rule), functioning as a very simple smart contract language. Its current version is codenamed `shield`.

Here is an example of a basic Rule that is satisfied when one of two addresses approve an [Action](#action):

```
any(2, [warden1jdeysw88gtzz8da6qr6cqepl7ghleane5u46yh, warden1r4d7gh3ysfy3dz3nufpsmj4ad6t5qz2cs33xu3])
```

## State

The `x/act` module keeps the state of the following primary objects:

- Rules
- Actions

To manage this state, the module also keeps the following indexes:

- Action by address referenced in its Rule

## Hooks

This section explains how other modules can hook into the `x/act` module, customizing its behavior.

### Rule handlers

A **Rule handler** is a handler returning the [Rule](#rule) that will be applied to an [Action](#action).

Each Rule handler is associated with a certain message type. When a new Action is created, the `x/act` module invokes a Rule handler for the wrapped message type.

Handlers are invoked only once per Action, during its creation. They aren't invoked again every time the Action's Rule is re-evaluated.

#### Example

The code sample below is a dummy `x/satellites` module. It registers a handler for fetching the Rule of its `MsgLaunchSatellite` message:

```go
package keeper

import (
  // ...
  acttypes "github.com/warden-protocol/wardenprotocol/warden/x/act/types/v1beta1"
)

func NewKeeper(
  // ...
  actKeeper types.ActKeeper,
) Keeper {
  // ...

  k := Keeper{...}
  acttypes.Register(reg, k.launchSatelliteRule)

  return k
}

func (k Keeper) launchSatelliteRule(ctx context.Context, msg *types.MsgLaunchSatellite) (acttypes.Rule, error) {
  // for example, from here you can access the database to fetch specific Rules
  satellite, err := k.satellites.Get(ctx, msg.SatelliteID)
  return satellite.LaunchRule, err
}
```

Every time a new Action with a `MsgLaunchSatellite` message is created, the `x/act` module invokes `launchSatelliteRule` to fetch the Rule that will be applied to a particular satellite.

### Rule preprocessing

After a [Rule handler](#rule-handlers) is invoked and the [Rule](#rule) is fetched, the `x/act` module invokes the registered **Rule preprocessor**. This enables other modules to **expand** some of the identifiers in the Rule expression into values, similar to a macro expansion.

#### Example

You can register a preprocessor in `app.go`. For example, an expander for the dummy [`x/satellites` module](#example) from the previous section would look like this:

```go
appConfig = depinject.Configs(
  AppConfig(),
  depinject.Supply(
    // ...
    func() ast.Expander {
      return cosmoshield.NewExpanderManager(
        cosmoshield.NewPrefixedExpander(
          satellitetypes.ModuleName,
          app.SatelliteKeeper.ShieldExpander(),
        ),
        // add more expanders here
      )
    },
```

`PrefixedExpander` handles all identifiers that start with the module name (`satellitetypes.ModuleName`) followed by a dot. `ShieldExpander` receives the rest of the identifiers and returns any other [abstract syntax tree](../glossary#abstract-syntax-tree) node to replace it.

`SatelliteKeeper` could implement an expander like this:

```go
// ast.Expander is defined like this:
type Expander interface {
 Expand(ctx context.Context, ident *Identifier) (Expression, error)
}

type SatelliteExpander struct{Keeper}

func (k Keeper) ShieldExpander() ast.Expander { return SatelliteExpander{k} }

func (e SatelliteExpander) Expand(ctx context.Context, ident *Identifier) (Expression, error) {
 if ident.Name == "123.cost" {
   cost := e.k.GetSatelliteCost(ctx, 123) // access data provided by Keeper
   return ast.NewIntegerLiteral(&ast.IntegerLiteral{
     Value: cost,
   }), nil
 }
 return nil, fmt.Errorf("unknown identifier: %s", ident.Value)
}
```

A user can then write a Rule—for example, to automatically approve any satellite launch for satellites with a cost lower than 100 or to require at least 2 out of 3 approvers:

```isl
satellite.123.cost <= 100 || any(2, [warden1j6yh, warden1rxu3, warden1r4d7])
```

When an Action is created, the Rule gets preprocessed by the expander, resulting in the following new Rule (assuming the cost for the satellite 123 is 900):

```isl
900 <= 100 || any(2, [warden1j6yh, warden1rxu3, warden1r4d7])
```

### Rule evaluation

:::warning
This feature is still in development and is not available yet.
:::

The `x/act` module re-evaluates the [Rules](#rule) of pending [Actions](#action) to check if they're satisfied by the current state of the blockchain.

Every time an Action is approved, it gets re-evaluated. During evaluation, all identifiers left after [preprocessing](#rule-preprocessing) must have an associated value in the **environment**.

#### Example

The [preprocessing example](#example-1) uses a value that needs to be fetched only once—when an Action is created. By contrast, in the evaluation example below, a value is provided in the runtime environment and can be re-fetched at every evaluation. This approach is suitable for values that change over time.

You can register a module environment in `app.go`. For example, registering an environment for the dummy [`x/satellites` ](#example) module would look like this:

```go
appConfig = depinject.Configs(
  AppConfig(),
  depinject.Supply(
    // ...
    func() shield.Environment {
      return cosmoshield.NewEnvironmentManager(
        cosmoshield.NewPrefixedEnvironment(
          satellitetypes.ModuleName,
          app.SatelliteKeeper.ShieldEnv(),
        ),
        // add more environments here
      )
    },
```

`PrefixedEnvironment` handles all identifiers that start with the module name (`satellitetypes.ModuleName`) followed by a dot. The `ShieldEnv` receives the identifier name and returns its value.

```go
type SatelliteEnv struct{Keeper}

func (k Keeper) ShieldEnv() ast.Env { return SatelliteEnv{k} }

func (e SatelliteEnv) Get(ctx context.Context, name string) (object.Object, bool) {
  if name == "fuel_price" {
    price := e.k.FuelPrice(ctx) // access data provided by Keeper
    return object.NewInteger(price), true
  }

  // returning false means that the identifier is not found
  // this will abort the evaluation of the Rule with an error
  return nil, false
}
```

A user can then write a Rule—for example, to keep launches on hold until the fuel cost is lower than 100:

```isl
satellite.fuel_price < 100
```

## Messages

### `MsgNewRule`

Creates a new [Rule](#rule) with a given human-readable name. The Rule contains an expression (string) that will be parsed into an [abstract syntax tree](../glossary#abstract-syntax-tree) and stored onchain.

This message is expected to fail in the following cases:

- The name is empty.
- The expression is not a valid [Intent-Specific Language](#intent-specific-language) expression.

### `MsgUpdateRule`

Updates an existing [Rule](#rule) with a given human-readable name and a new expression.

This message is expected to fail in the following cases:

- The name is empty.
- The expression is not a valid [Intent-Specific Language](#intent-specific-language) expression.

### `MsgNewAction`

Creates a new [Action](#action) with a wrapped message, optionally specifying a timeout height.

During this message execution, the `x/act` module invokes the registered [Rule handler](#rule-handlers) for the wrapped message type. The final Rule is stored in the `rule` field of the Action.

This message is expected to fail in the following cases:

- The message doesn't have a registered Rule handler.
- The timeout height is in the past.

### `MsgApproveAction`

Adds an approval to an [Action](#action) with a given ID.

This message is expected to fail in the following cases:

- An approval from this address is already present.
- The Action state isn't *pending*.

### `MsgRevokeAction`

Revokes a pending [Action](#action), aborting its execution.

This message is expected to fail in the following cases:

- The creator of the message isn't the creator of the Action.
- The Action state isn't *pending* (`ACTION_STATUS_PENDING`).

