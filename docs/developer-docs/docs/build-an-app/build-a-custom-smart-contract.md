---
sidebar_position: 2
---

# Build a custom smart contract

## Overview

This guide explains how to create and deploy a simple "Hello World" smart contract on the Warden chain. Since it's intended for testing purposes, you'll be running a local chain.

## Prerequisites

Before you start, complete following prerequisites:

- Install Rust by running the following:

    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

- Set up the CosmWasm development environment:

   - [CosmWasm](https://book.cosmwasm.com/setting-up-env.html): The CosmWasm binary and its dependencies.

   - [cargo-generate](https://cargo-generate.github.io/cargo-generate/installation.html): A tool to help you get up and running quickly with a new Rust project by leveraging a pre-existing git repository as a template.

   - [wasm-opt](https://docs.rs/wasm-opt/latest/wasm_opt/index.html): A tool for optimizing the compiled WebAssembly (Wasm) code.
   
   To install these tools, run the following commands:

   ```bash
   rustup target add wasm32-unknown-unknown
   cargo install cargo-generate --features vendored-openssl
   brew install binaryen
   ```

- [Run a local chain](test/run-a-local-chain) and make sure you have `wardend` correctly installed. You can stop the chain for now if you wish.

   The next steps require your local account name, or key name, which is referenced as `my-key-name` in the provided command-line examples. You can check the list of available keys by executing this command (while the node is running):

   ```
   wardend keys list
   ```
   :::tip
   In development genesis files, you'll typically find an account named shulgin that is preconfigured and ready for use.
   :::

## 1. Create a new CosmWasm project

Create a new CosmWasm project by running the following:

```bash
cargo generate --git https://github.com/CosmWasm/cw-template.git --name hello-world
cd hello-world
```

## 2. Modify the contract code

1. Open `src/contract.rs` and replace its contents with this code:

   ```rust
   use cosmwasm_std::{
       entry_point, to_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
   };
   use cw2::set_contract_version;
   
   use crate::error::ContractError;
   use crate::msg::{ExecuteMsg, InstantiateMsg, QueryMsg};
   
   const CONTRACT_NAME: &str = "crates.io:hello-world";
   const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");
   
   #[entry_point]
   pub fn instantiate(
       deps: DepsMut,
       _env: Env,
       info: MessageInfo,
       _msg: InstantiateMsg,
   ) -> Result<Response, ContractError> {
       set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
       Ok(Response::new().add_attribute("method", "instantiate")
           .add_attribute("owner", info.sender))
   }
   
   #[entry_point]
   pub fn execute(
       _deps: DepsMut,
       _env: Env,
       info: MessageInfo,
       msg: ExecuteMsg,
   ) -> Result<Response, ContractError> {
       match msg {
           ExecuteMsg::SayHello {} => Ok(Response::new()
               .add_attribute("method", "say_hello")
               .add_attribute("sender", info.sender)),
       }
   }
   
   #[entry_point]
   pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
       match msg {
           QueryMsg::GetGreeting {} => to_binary(&"Hello, World!"),
       }
   }
   ```

2. Open `src/msg.rs` and replace its contents with this code:
   
   ```rust
   use cosmwasm_schema::{cw_serde, QueryResponses};
   
   #[cw_serde]
   pub struct InstantiateMsg {}
   
   #[cw_serde]
   pub enum ExecuteMsg {
       SayHello {},
   }
   
   #[cw_serde]
   #[derive(QueryResponses)]
   pub enum QueryMsg {
       #[returns(String)]
       GetGreeting {},
   }
   ```

## 4. Compile the contract

To compile the contract, run the following:

```bash
cargo wasm
```

The contract should be compiled without any errors.

## 5. Optimize the compiled Wasm code

Now you need to optimize your compiled Wasm code:

```bash
wasm-opt -Os -o target/wasm32-unknown-unknown/release/hello_world.wasm /
target/wasm32-unknown-unknown/release/hello_world.wasm
```

## 6. Run the chain

If your local chain isn't running, start it:
   
```
wardend start
```

## 7. Store the contract on-chain

To store your contract on the Warden chain, run the command below. Replace `my-key-name` with your key name (typically `shulgin`).
   
   ```bash
   wardend tx wasm store target/wasm32-unknown-unknown/release/hello_world.wasm /
   --from my-key-name --gas auto --gas-adjustment 1.3 --gas-prices 0.1uward -y
   ```
   
   The transaction should be successful without any errors.

## 8. Get the code ID

Get the code ID, which identifies your Wasm code:

```bash
wardend query wasm list-code
```

Note down `code_id` from the output.

## 9. Instantiate the contract

You can instantiate the contract by using the command below.

Before you should replace replace `1` with the actual code ID you retrieved in previous step and replace `my-key-name` with your key name. Also note that you can either define an admin or pass `--no-admin` to make it immutable, like in this example.

```bash
wardend tx wasm instantiate 1 '{}' --from my-key-name /
--label "Hello World" --gas auto --gas-adjustment 1.3 /
--gas-prices 0.1uward --no-admin -y 
```

## 10. Get the contract address

To get the contract address, run the following command. Replace `1` with the actual code ID:

```bash
wardend query wasm list-contract-by-code 1
```

Note down the contract address.

## 11. Execute the contract

Use the command below to exectute your contract. Replace `my-contract-address` with your contract address and `my-key-name` with your key name.

```bash
wardend tx wasm execute my-contract-address '{"say_hello":{}}' /
--from my-key-name --gas auto --gas-adjustment 1.3 --gas-prices 0.1uward -y
```

## Result

Now your contract is ready!

You can query it with the following command. Replace `my-contract-address` with your contract address.

```bash
wardend query wasm contract-state smart my-contract-address '{"get_greeting":{}}'
```

In the output, you should see `data: Hello, World!`

If you encounter any issues, please reach out to us via [Discord](https://discord.com/invite/warden) or [Twitter](https://twitter.com/wardenprotocol).

Happy Coding! 🚀