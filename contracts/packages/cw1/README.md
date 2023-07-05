# CW1 Spec: Proxy Contracts

CW1 is a specification for proxy contracts based on CosmWasm. It is a very simple, but flexible interface designed for
the case where one contract is meant to hold assets (or rights) on behalf of other contracts.

The simplest example is a contract that will accept messages from the creator and resend them from its address. Simply
by making this transferable, you can then begin to transfer non-transferable assets (eg. staked tokens, voting power,
etc).

You can imagine more complex examples, such as a "1 of N" multisig, or conditional approval, where "sub-accounts" have
the right to spend a limited amount of funds from this account, with a "admin account" retaining full control.

The common denominator is that they allow you to immediately execute arbitrary `CosmosMsg` in the same transaction.

### Messages

`Execute{msgs}` - This accepts `Vec<CosmosMsg>` and checks permissions before re-dispatching all those messages from the
contract address. It emits the following attributes:

| Key      | Value        |
| -------- | ------------ |
| "action" | "execute"    |
| "owner"  | [msg sender] |

### Queries

`CanExecute{sender, msg}` - This accepts one `CosmosMsg` and checks permissions, returning true or false based on the
permissions. If `CanExecute` returns true then a call to `Execute` from that sender, with the same message, before any
further state changes, should also succeed. This can be used to dynamically provide some client info on a generic cw1
contract without knowing the extension details. (eg. detect if they can send coins or stake)
