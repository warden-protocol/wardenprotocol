# CW4 Spec: Group Members

CW4 is a spec for storing group membership, which can be combined with CW3 multisigs. The purpose is to store a set of
members/voters that can be accessed to determine permissions in another section.

Since this is often deployed as a contract pair, we expect this contract to often be queried with `QueryRaw` and the
internal layout of some of the data structures becomes part of the public API. Implementations may add more data
structures, but at least the ones laid out here should be under the specified keys and in the same format.

In this case, a cw3 contract could _read_ an external group contract with no significant cost besides reading local
storage. However, updating that group contract (if allowed), would be an external message and will be charged as part of
the overhead for each contract.

## Messages

We define an `InstantiateMsg{admin, members}` to make it easy to set up a group as part of another flow. Implementations
should work with this setup, but may add extra `Option<T>` fields for non-essential extensions to configure in the
`instantiate` phase.

There are three messages supported by a group contract:

`UpdateAdmin{admin}` - changes (or clears) the admin for the contract

Attributes emitted:

| Key       | Value                    |
| --------- | ------------------------ |
| "action"  | "update_members"         |
| "sender"  | msg sender               |
| "added"   | count of added members   |
| "removed" | count of removed members |

`AddHook{addr}` - adds a contract address to be called upon every `UpdateMembers` call. This can only be called by the
admin, and care must be taken. A contract returning an error or running out of gas will revert the membership change
(see more in Hooks section below).

Attributes emitted:

| Key      | Value        |
| -------- | ------------ |
| "action" | "add_hook"   |
| "sender" | msg sender   |
| "hook"   | hook address |

`RemoveHook{addr}` - unregister a contract address that was previously set by `AddHook`.

Attributes emitted:

| Key      | Value         |
| -------- | ------------- |
| "action" | "remove_hook" |
| "sender" | msg sender    |
| "hook"   | hook address  |

Only the `admin` may execute any of these function. Thus, by omitting an `admin`, we end up with a similar functionality
ad `cw3-fixed-multisig`. If we include one, it may often be desired to be a `cw3` contract that uses this group contract
as a group. This leads to a bit of chicken-and-egg problem, but we cover how to instantiate that in
[`cw3-flex-multisig`](../../contracts/cw3-flex-multisig/README.md#instantiation).

## Queries

### Smart

`TotalWeight{}` - Returns the total weight of all current members, this is very useful if some conditions are defined on
a "percentage of members".

`Member{addr, height}` - Returns the weight of this voter if they are a member of the group (may be 0), or `None` if
they are not a member of the group. If height is set and the cw4 implementation supports snapshots, this will return the
weight of that member at the beginning of the block with the given height.

`MemberList{start_after, limit}` - Allows us to paginate over the list of all members. 0-weight members will be
included. Removed members will not.

`Admin{}` - Returns the `admin` address, or `None` if unset.

### Raw

In addition to the above "SmartQueries", which make up the public API, we define two raw queries that are designed for
more efficiency in contract-contract calls. These use keys exported by `cw4`

`TOTAL_KEY` - making a raw query with this key (`b"total"`) will return a JSON-encoded `u64`

`members_key()` - takes a `CanonicalAddr` and returns a key that can be used for raw query
(`"\x00\x07members" || addr`). This will return empty bytes if the member is not inside the group, otherwise a
JSON-encoded `u64`

## Hooks

One special feature of the `cw4` contracts is they allow the admin to register multiple hooks. These are special
contracts that need to react to changes in the group membership, and this allows them stay in sync. Again, note this is
a powerful ability and you should only set hooks to contracts you fully trust, generally some contracts you deployed
alongside the group.

If a contract is registered as a hook on a cw4 contract, then anytime `UpdateMembers` is successfully executed, the hook
will receive a `handle` call with the following format:

```json
{
  "member_changed_hook": {
    "diffs": [
      {
        "addr": "cosmos1y3x7q772u8s25c5zve949fhanrhvmtnu484l8z",
        "old_weight": 20,
        "new_weight": 24
      }
    ]
  }
}
```

See [hook.rs](./src/hook.rs) for full details. Note that this example shows an update or an existing member.
`old_weight` will be missing if the address was added for the first time. And `new_weight` will be missing if the
address was removed.

The receiving contract must be able to handle the `MemberChangedHookMsg` and should only return an error if it wants to
change the functionality of the group contract (eg. a multisig that wants to prevent membership changes while there is
an open proposal). However, such cases are quite rare and often point to fragile code.

Note that the message sender will be the group contract that was updated. Make sure you check this when handling, so
external actors cannot call this hook, only the trusted group.
