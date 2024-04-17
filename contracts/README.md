# Warden Contracts

This repo contains bindings (with usage examples) for accessing core functionality of Warden Protocol blockchain
from CosmWasm contracts.

## Prerequisites

- You need rust to generate schema files.
- You need a Docker to build a contract.
- You need an account in the Warden Protocol blockchain with some balance in order to deploy contracts and perform transactions on it.

## Generate Schema

To generate schema files perform following commands:

```shell
# generate bindings schema
cd packages/bindings
cargo build
cargo run schema

cd ../..

# generate sapmle contract schema
cd contracts
cargo build
cargo run schema
```

## Build

```shell
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.13.0
```

After a successful build you'll see a newly generated `sample.wasm` file in the `artifacts` directory.

## Deploy a Contract

We assume that you have a `wardend` executable's directory in your `$PATH` environment variable in order to perform following steps.
Also, your account should be added to the `wardend`'s keychain. Following commands use `alice` name for such account.

```shell
wardend tx wasm store artifacts/sample.wasm --from alice -y -b sync --chain-id warden --gas 2000000
```

Now you should find an id that system assigned to your code.
One of the methods to do this is simply list all stored code bundles and find the last one.

```shell
wardend query wasm list-code
```

Let's assume it's 100. Next step is to instantiate our contract using previously deployed code:

```shell
wardend tx wasm instantiate 100 '{}' --from alice --label "Group 1" --no-admin -y --chain-id warden
```

Let's find out address of the newly created contract. The simple way to do it is to query all contracts
with code id that we used previously, and find the last one:

```shell
wardend query wasm list-contract-by-code 100
```

Let's assume its address is `warden1ghd753shjuwexxywmgs4xz7x2q732vcnkm6h2pyv9s6ah3hylvrqtn83hn`
and store it to the `$contract` environment variable for the convenience:

```shell
contract=warden1ghd753shjuwexxywmgs4xz7x2q732vcnkm6h2pyv9s6ah3hylvrqtn83hn
```

Now we are ready to interact with our contract!

# Interacting with Contract

You can query it's state, for example, let's list all existing keys:

```shell
wardend query wasm contract-state smart $contract '{ "warden_all_keys": {"pagination":{"limit":0,"reverse":false}, "derive_wallets":[]} }'--chain-id warden
```

And perform transactions, let's create request for a new key:

```shell
wardend tx wasm execute $contract '{ "new_key_request": { "space_id": 1, "keychain_id": 2, "key_type": 1, "btl": 888, "intent_id": 0 } }' --from alice -y --chain-id warden
```

Note that `space_id` 1 and `keychain_id` 2 should already exist before your transaction.