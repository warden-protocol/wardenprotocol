---
sidebar_position: 3
---

# Build a custom smart contract

This end-to-end guide should help you create, deploy, and interact with a simple "Hello World" smart contract on the Warden chain

## Prerequisites

1. Install Rust: Ensure you have Rust installed. You can install it by running:

    ```bash
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    ```

2. Set Up CosmWasm Development Environment: You will need the following tools:

- **CosmWasm**: Install the CosmWasm binary and its dependencies.
- **cargo-generate**: To create new CosmWasm projects easily.
- **wasm-opt**: Optimizes the compiled WebAssembly (Wasm) code.

    ```bash
    rustup target add wasm32-unknown-unknown
    cargo install cargo-generate --features vendored-openssl
    brew install binaryen # For wasm-opt
    ```

3. Make sure you have `wardend` correctly installed. If not you can follow this guide. <!-- To be added later -->

## Create a new CosmWasm project

```bash
cargo generate --git https://github.com/CosmWasm/cw-template.git --name hello-world
cd hello-world
```

## Modify the contract code

1. Open `src/contract.rs` and replace its contents with:

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

2. Open `src/msg.rs` and replace its contents with:

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

## Compile the contract

```bash
cargo wasm
```

The contract should be compiled without any errors.

## Optimize the compiled Wasm code

```bash
wasm-opt -Os -o target/wasm32-unknown-unknown/release/hello_world.wasm target/wasm32-unknown-unknown/release/hello_world.wasm
```

This should optimize your compiled Wasm code.

## Store the contract on the Warden chain

```bash
wardend tx wasm store target/wasm32-unknown-unknown/release/hello_world.wasm --from shulgin --gas auto --gas-adjustment 1.3 --gas-prices 0.1uward -y
```

The tx should be successful without any errors.

## Get the code ID

```bash
wardend query wasm list-code
```

Note down the code_id from the output.

## Instantiate the contract

```bash
wardend tx wasm instantiate 1 '{}' --from shulgin --label "Hello World" --gas auto --gas-adjustment 1.3 --gas-prices 0.1uward --no-admin -y 
```

Replace `1` with the actual code ID you got in previous step.
You can either define an admin or explicitly pass --no-admin to make it immutible.

## Get the contract address

```bash
wardend query wasm list-contract-by-code 1
```

Replace `1` with the actual code ID. Note down the contract address.

## Execute the contract

```bash
wardend tx wasm execute <contract_address> '{"say_hello":{}}' --from shulgin --gas auto --gas-adjustment 1.3 --gas-prices 0.1uward -y
```

Replace `<contract_address>` with the actual contract address.

## Query the contract

```bash
wardend query wasm contract-state smart <contract_address> '{"get_greeting":{}}'
```

Replace `<contract_address>` with the actual contract address.

You should see `data: Hello, World!` in the output.

If you encounter any issues, please reach out to us via Discord or Twitter.

Happy Coding! 🚀