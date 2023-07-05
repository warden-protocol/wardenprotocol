# CW20 Spec: Fungible Tokens

CW20 is a specification for fungible tokens based on CosmWasm. The name and design is loosely based on Ethereum's ERC20
standard, but many changes have been made. The types in here can be imported by contracts that wish to implement this
spec, or by contracts that call to any standard cw20 contract.

The specification is split into multiple sections, a contract may only implement some of this functionality, but must
implement the base.

## Base

This handles balances and transfers. Note that all amounts are handled as `Uint128` (128 bit integers with JSON string
representation). Handling decimals is left to the UI and not interpreted

### Messages

`Transfer{recipient, amount}` - Moves `amount` tokens from the `info.sender` account to the `recipient` account. This is
designed to send to an address controlled by a private key and _does not_ trigger any actions on the recipient if it is
a contract.

Attributes emitted:

| Key      | Value      |
| -------- | ---------- |
| "action" | "transfer" |
| "from"   | sender     |
| "to"     | recipient  |
| "amount" | amount     |

`Send{contract, amount, msg}` - Moves `amount` tokens from the `info.sender` account to the `contract` account.
`contract` must be an address of a contract that implements the `Receiver` interface. The `msg` will be passed to the
recipient contract, along with the amount.

Attributes emitted:

| Key      | Value     |
| -------- | --------- |
| "action" | "send"    |
| "from"   | sender    |
| "to"     | recipient |
| "amount" | amount    |

`Burn{amount}` - Remove `amount` tokens from the balance of `info.sender` and reduce `total_supply` by the same amount.

Attributes emitted:

| Key      | Value  |
| -------- | ------ |
| "action" | "burn" |
| "from"   | sender |
| "amount" | amount |

### Queries

`Balance{address}` - Returns the balance of the given address. Returns "0" if the address is unknown to the contract.
Return type is `BalanceResponse{balance}`.

`TokenInfo{}` - Returns the token info of the contract. Return type is
`TokenInfoResponse{name, symbol, decimal, total_supply}`.

### Receiver

The counter-part to `Send` is `Receive`, which must be implemented by any contract that wishes to manage CW20 tokens.
This is generally _not_ implemented by any CW20 contract.

`Receive{sender, amount, msg}` - This is designed to handle `Send` messages. The address of the contract is stored in
`info.sender` so it cannot be faked. The contract should ensure the sender matches the token contract it expects to
handle, and not allow arbitrary addresses.

The `sender` is the original account requesting to move the tokens and `msg` is a `Binary` data that can be decoded into
a contract-specific message. This can be empty if we have only one default action, or it may be a `ReceiveMsg` variant
to clarify the intention. For example, if I send to a uniswap contract, I can specify which token I want to swap against
using this field.

## Allowances

A contract may allow actors to delegate some of their balance to other accounts. This is not as essential as with ERC20
as we use `Send`/`Receive` to send tokens to a contract, not `Approve`/`TransferFrom`. But it is still a nice use-case,
and you can see how the Cosmos SDK wants to add payment allowances to native tokens. This is mainly designed to provide
access to other public-key-based accounts.

There was an issue with race conditions in the original ERC20 approval spec. If you had an approval of 50 and I then
want to reduce it to 20, I submit a Tx to set the allowance to 20. If you see that and immediately submit a tx using the
entire 50, you then get access to the other 20. Not only did you quickly spend the 50 before I could reduce it, you get
another 20 for free.

The solution discussed in the Ethereum community was an `IncreaseAllowance` and `DecreaseAllowance` operator (instead of
`Approve`). To originally set an approval, use `IncreaseAllowance`, which works fine with no previous allowance.
`DecreaseAllowance` is meant to be robust, that is if you decrease by more than the current allowance (eg. the user
spent some in the middle), it will just round down to 0 and not make any underflow error.

### Messages

`IncreaseAllowance{spender, amount, expires}` - Set or increase the allowance such that `spender` may access up to
`amount + current_allowance` tokens from the `info.sender` account. This may optionally come with an `Expiration` time,
which if set limits when the approval can be used (by time or height).

Attributes emitted:

| Key       | Value                |
| --------- | -------------------- |
| "action"  | "increase_allowance" |
| "owner"   | sender               |
| "spender" | spender              |
| "amount"  | amount               |

`DecreaseAllowance{spender, amount, expires}` - Decrease or clear the allowance such that `spender` may access up to
`current_allowance - amount` tokens from the `info.sender` account. This may optionally come with an `Expiration` time,
which if set limits when the approval can be used (by time or height). If `amount >= current_allowance`, this will clear
the allowance (delete it).

Attributes emitted:

| Key       | Value                |
| --------- | -------------------- |
| "action"  | "decrease_allowance" |
| "owner"   | sender               |
| "spender" | spender              |
| "amount"  | amount               |

`TransferFrom{owner, recipient, amount}` - This makes use of an allowance and if there was a valid, un-expired
pre-approval for the `info.sender`, then we move `amount` tokens from `owner` to `recipient` and deduct it from the
available allowance.

Attributes emitted:

| Key      | Value                    |
| -------- | ------------------------ |
| "action" | "transfer_from"          |
| "from"   | account transferred from |
| "to"     | recipient                |
| "by"     | message sender           |
| "amount" | amount                   |

`SendFrom{owner, contract, amount, msg}` - `SendFrom` is to `Send`, what `TransferFrom` is to `Transfer`. This allows a
pre-approved account to not just transfer the tokens, but to send them to another contract to trigger a given action.
**Note** `SendFrom` will set the `Receive{sender}` to be the `info.sender` (the account that triggered the transfer)
rather than the `owner` account (the account the money is coming from). This is an open question whether we should
switch this?

Attributes emitted:

| Key      | Value             |
| -------- | ----------------- |
| "action" | "send_from"       |
| "from"   | account sent from |
| "to"     | recipient         |
| "by"     | message sender    |
| "amount" | amount            |

`BurnFrom{owner, amount}` - This works like `TransferFrom`, but burns the tokens instead of transfering them. This will
reduce the owner's balance, `total_supply` and the caller's allowance.

Attributes emitted:

| Key      | Value              |
| -------- | ------------------ |
| "action" | "burn_from"        |
| "from"   | account burnt from |
| "by"     | message sender     |
| "amount" | amount             |

### Queries

`Allowance{owner, spender}` - This returns the available allowance that `spender` can access from the `owner`'s account,
along with the expiration info. Return type is `AllowanceResponse{balance, expiration}`.

## Mintable

This allows another contract to mint new tokens, possibly with a cap. There is only one minter specified here, if you
want more complex access management, please use a multisig or other contract as the minter address and handle updating
the ACL there.

### Messages

`Mint{recipient, amount}` - If the `info.sender` is the allowed minter, this will create `amount` new tokens (updating
total supply) and add them to the balance of `recipient`, as long as it does not exceed the cap.

Attributes emitted:

| Key      | Value     |
| -------- | --------- |
| "action" | "mint"    |
| "to"     | recipient |
| "amount" | amount    |

`UpdateMinter { new_minter: Option<String> }` - Callable only by the current minter. If `new_minter` is `Some(address)`
the minter is set to the specified address, otherwise the minter is removed and no future minters may be set.

Attributes emitted:

| Key          | Value                               |
| ------------ | ----------------------------------- |
| "action"     | "update_minter"                     |
| "new_minter" | minter address or "None" if removed |

### Queries

`Minter{}` - Returns who and how much can be minted. Return type is `MinterResponse {minter, cap}`. Cap may be unset.

If the cap is set, it defines the maximum `total_supply` that may ever exist. If initial supply is 1000 and cap is
`Some(2000)`, you can only mint 1000 more tokens. However, if someone then burns 500 tokens, the minter can mint those
500 again. This allows for dynamic token supply within a set of parameters, especially when the minter is a smart
contract.

## Enumerable

This should be enabled with all blockchains that have iterator support. It allows us to get lists of results with
pagination.

### Queries

`AllAllowances{owner, start_after, limit}` - Returns the list of all non-expired allowances by the given owner.
`start_after` and `limit` provide pagination.

`AllAccounts{start_after, limit}` - Returns the list of all accounts that have been created on the contract (just the
addresses). `start_after` and `limit` provide pagination.

## Marketing

This allows us to attach more metadata on the token to help with displaying the token in wallets. When you see a token's
website, then see it in a wallet, you know what it is. However, if you see it in a wallet or a DEX trading pair, there
is no clear way to find out any more info about it.

This extension allows us to attach more "Marketing" metadata, which has no effect on the on-chain functionality of the
token, but is very useful in providing a better client-side experience. Note, that we add a new role `marketing`, which
can update such info, but not affect on-chain logic.

### Messages

`UploadLogo{url | embedded}` - If the `info.sender` is the allowed marketing account, this will either set a new URL
reference where the logo is served, or allow them to upload a small (less than 5KB) SVG or PNG logo onto the blockchain
to be served.

Attributes emitted:

| Key      | Value         |
| -------- | ------------- |
| "action" | "upload_logo" |

`UpdateMarketing{project, description, marketing}` - If the `info.sender` is the allowed marketing account, this will
update some marketing-related metadata on the contract.

Attributes emitted:

| Key      | Value              |
| -------- | ------------------ |
| "action" | "update_marketing" |

### Queries

`MarketingInfo{}` - Returns marketing-related metadata. Return type is
`MarketingInfoResponse {project, description, logo, marketing}`.

`DownloadLogo{}` - If the token's logo was previously uploaded to the blockchain (see `UploadLogo` message), then it
returns the raw data to be displayed in a browser. Return type is `DownloadLogoResponse{ mime_type, data }`.
