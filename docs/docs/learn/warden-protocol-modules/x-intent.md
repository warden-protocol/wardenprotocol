---
sidebar_position: 2
---

# x/act

## Abstract

The `x/act` module is a [Cosmos SDK](https://docs.cosmos.network/) module
capable of executing messages (called Actions) under certain conditions defined
by the users.

This module implements the following concepts:

- [Rule](/learn/glossary#rule)
- [Action](/learn/glossary#action)

## Concepts

### Rule

The **Rule** struct represents a set of conditions that must be met before
"something" can be executed.

Users can register a Rule on-chain, writing its expression using the
[Intent-Specific Language](/learn/glossary#intent-specific-language).

Other modules can plug their variables values into the Rule's execution
runtime, for users to be able to base their Rules on data available on-chain.

### Action

An **Action** wraps another message. When created, the Action starts in a
"pending" state.

An Action contains a Rule, when its conditions are met, the Actions state
changes to "completed" and its wrapped message is executed.

An Action can be **approved** by one or more users. The addresses of the user
that approved the Action are stored in the Action's `approvers` field and can
be used as boolean conditions in the Rule's expression.

The creator of the Action can **revoke** the Action at any time.

Optionally, it's possible to specify a **timeout height** for the Action. After
such height is reached by the blockchain, the Action state will change to
timeout.

### Intent-specific language

The language used to define Rules is called the **Intent-specific language**
(the current version is codenamed "shield").

It can be seen a very simple smart contract language.

A small example of a Rule that is satisfied when one of two addresses approves
an Action:

```
any(2, [warden1jdeysw88gtzz8da6qr6cqepl7ghleane5u46yh, warden1r4d7gh3ysfy3dz3nufpsmj4ad6t5qz2cs33xu3])
```

## State

The `x/act` module keeps state of the following primary objects:

* Rules
* Actions

In addition, the `x/act` module keeps the following indexes to manage the
aforementioned state:

* Action by address referenced in its Rule index

## Hooks

The following section describes how other modules can hook into the `x/act`,
customizing its behavior.

### Rule handlers

When a new Action is created, the `x/act` module will look for a "Rule handler"
for the message type being wrapped by the Action.

The handler's responsibility is to return the Rule to be applied to the Action.

Below is an example of a dummy `x/missiles` module, that register the handler
for fetching the Rule of its `MsgLaunchMissile` message:

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
  acttypes.Register(reg, k.launchMissileRule)

  return k
}

func (k Keeper) launchMissileRule(ctx context.Context, msg *types.MsgLaunchMissile) (acttypes.Rule, error) {
  // e.g. from here you can access the database to fetch the specific rules
  missile, err := k.missiles.Get(ctx, msg.MissileID)
  return missile.LaunchRule, err
}
```

Every time a new Action is created with a `MsgLaunchMissile` message, the
`x/act` module will invoke `launchMissileRule` to fetch the Rule that will be
applied for that particular Missile.

Note: handlers are invoked only once per Action, during its creation. They are
not invoked again every time the Action's Rule is re-evaluated.

### Rule's preprocessing

After the Rule's handler is invoked and the Rule is fetched, the `x/act` module
invokes the registered Rule's preprocessor.

This is an opportunity for other modules to **expand** some of the identifiers
in the Rule's expression into values, similar to a macro expansion.

You can register a preprocessor in the `app.go`. For example, you would
register an expander for a dummy `x/missile` module like this:

```go
appConfig = depinject.Configs(
  AppConfig(),
  depinject.Supply(
    // ...
    func() ast.Expander {
      return cosmoshield.NewExpanderManager(
        cosmoshield.NewPrefixedExpander(
          missiletypes.ModuleName,
          app.MissileKeeper.ShieldExpander(),
        ),
        // add more expanders here
      )
    },
```

The `PrefixedExpander` will handle all the identifiers that start with the
module name (`missiletypes.ModuleName`) followed by a dot (`.`). The
`ShieldExpander` will receive the rest of the identifiers and returns any other
AST node to replace it.

For example, the `MissileKeeper` could implement an expander like this:

```go
// ast.Expander is defined like this:
type Expander interface {
  Expand(ctx context.Context, ident *Identifier) (Expression, error)
}

type MissileExpander struct{Keeper}

func (k Keeper) ShieldExpander() ast.Expander { return MissileExpander{k} }

func (e MissileExpander) Expand(ctx context.Context, ident *Identifier) (Expression, error) {
  if ident.Name == "123.cost" {
    cost := e.k.GetMissileCost(ctx, 123) // access data provided by the Keeper
    return ast.NewIntegerLiteral(&ast.IntegerLiteral{
      Value: cost,
    }), nil
  }
  return nil, fmt.Errorf("unknown identifier: %s", ident.Value)
}
```

The user can then write a rule like this to automatically approve any missile
launch for missiles with a cost lower than 100, or to require at least two out
of three approvers:

```isl
missile.123.cost <= 100 || any(2, [warden1j6yh, warden1rxu3, warden1r4d7])
```

When the Action is **created**, the Rule gets preprocessed by the expander,
resulting in the following new Rule (assuming the cost for missile 123 is 900):

```isl
900 <= 100 || any(2, [warden1j6yh, warden1rxu3, warden1r4d7])
```

### Rule's evaluation

:::warning
This feature is still in development and is not available yet.
:::

The `x/act` module will need to re-evaluate the Rules of pending Actions to
check if they are satisfied by the current state of the blockchain.

Every time an Action is approved, it gets re-evaluated.

During the evaluation, all the identifiers that were left after the
preprocessing must have a value associated in the **environment**.

In contrast to the previous example, that used a value that needed to be
fetched only once during the Action's creation, providing a value in the
runtime environment allows the value to be re-fetched at every evaluation, and
is suitable for values that change over time.

You can register a module environment in the `app.go`. For example, you would
register an environment for a dummy `x/missile` module like this:

```go
appConfig = depinject.Configs(
  AppConfig(),
  depinject.Supply(
    // ...
    func() shield.Environment {
      return cosmoshield.NewEnvironmentManager(
        cosmoshield.NewPrefixedEnvironment(
          missiletypes.ModuleName,
          app.MissileKeeper.ShieldEnv(),
        ),
        // add more environments here
      )
    },
```

The `PrefixedEnvironment` will handle all the identifiers that start with the
module name (`missiletypes.ModuleName`) followed by a dot (`.`). The
`ShieldEnv` will receive the name of the identifier and will return its value.

```go
type MissileEnv struct{Keeper}

func (k Keeper) ShieldEnv() ast.Env { return MissileEnv{k} }

func (e MissileEnv) Get(ctx context.Context, name string) (object.Object, bool) {
  if name == "fuel_price" {
    price := e.k.FuelPrice(ctx) // access data provided by the Keeper
    return object.NewInteger(price), true
  }

  // returning false means that the identifier is not found, this will abort
  // the evaluation of the Rule with an error
  return nil, false
}
```

The user can then write a rule like this to keep launches on hold until the
fuel cost is lower than 100:

```isl
missile.fuel_price < 100
```

## Messages

### MsgNewRule

Create a new Rule with the given human-readable name.

It contains the expression (string) that will be parsed into the AST and stored
on-chain for this Rule.

This message is expected to fail if:

* the name is empty
* the expression is not a valid ISL expression

### MsgUpdateRule

Update an existing Rule with the given human-readable name and the new
expression.

This message is expected to fail if:

* the name is empty
* the expression is not a valid ISL expression

### MsgNewAction

Create a new Action with the wrapped message, optionally specifying a timeout
height.

During this message execution, the `x/act` module will invoke the registered
Rule handler for the wrapped message type, and store the final Rule in the
Action's `rule` field.

This message is expected to fail if:

* this message doesn't have a registered Rule handler
* the timeout height is in the past

### MsgApproveAction

Adds an approval to the Action with the given ID.

This message is expected to fail if:

* the approval from this address is already present
* the Action is not in the `ACTION_STATUS_PENDING` state

### MsgRevokeAction

Revokes a pending Action, aborting its execution.

This message is expected to fail if:

* the creator of this message is not the creator of the Action
* the Action is not in the `ACTION_STATUS_PENDING` state

