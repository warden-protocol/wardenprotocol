---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy a WASM contract

## Overview

The [`x/wasm` Warden module](/learn/warden-protocol-modules/external-modules#xwasm) allows executing **WebAssembly smart contracts** developed with [CosmWasm](https://cosmwasm.com) and **Rust**.

This guide explains how to create and deploy a simple "Hello World" WASM contract on a Warden local chain or on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview).

## Prerequisites

Before you start, complete the following prerequisites:

- Install Rust by running the following:

  ```bash
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```

- Set up the CosmWasm development environment:

  - [CosmWasm](https://book.cosmwasm.com/setting-up-env.html): The CosmWasm binary and its dependencies.

  - [cargo-generate](https://cargo-generate.github.io/cargo-generate/installation.html): A tool to help you get up and running quickly with a new Rust project by leveraging a pre-existing git repository as a template.

  - [wasm-opt](https://docs.rs/wasm-opt/latest/wasm_opt/index.html): A tool for optimizing the compiled WebAssembly (Wasm) code.
   
   ```bash
   rustup target add wasm32-unknown-unknown
   cargo install cargo-generate --features vendored-openssl
   brew install binaryen
   ```

## 1. Prepare the chain

### Option 1. Run a local chain

To deploy a WASM contract locally, you need to run a local chain and make sure it's configured properly, as shown in the following steps:

1. Run a local chain as explained here: [Run a local chain](/operate-a-node/run-a-local-chain). Note that you'll need to [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. The next steps require your local account name, or key name. You can check the list of available keys by executing this command:

   ```bash
   wardend keys list
   ```
   :::tip
   If you used our `just` script to run the node with default settings, the local account name is `shulgin`.
   :::

3. Check the local account balance to make sure it has funds:
   
   <Tabs>
   <TabItem value="local-default" label="Local node: default settings">
   ```bash
   wardend query bank balances shulgin
   ```
   </TabItem>
   <TabItem value="local-custom" label="Local node: custom settings">
   ```bash
   wardend query bank balances my-key-name
   ```
   </TabItem>
   </Tabs>

### Option 2. Connect to Chiado

To deploy a WASM contract on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview), you need to install its binary and fund your key, as shown in the following steps:

1. If you haven't yet, [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Clone the repository with Warden source code. Then build the binary and initialize the chain's home directory:
  
   ```bash
   git clone --depth 1 --branch v0.6.1 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   just wardend build
   just wardend install
   wardend init my-chain-moniker
   ```

3. Create a new key:

   ```bash
   wardend keys add my-key-name
   ```

4. Write down the **mnemonic phrase** and the **address** of the new account. You'll need this information to interact with the chain and restore the account.

   :::warning
   The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
   :::

   :::tip
   You can always check your public address by running this command:

   ```bash
   wardend keys show my-key-name --address
   ```
   :::

5. Fund your key using [Chiado faucet](https://faucet.chiado.wardenprotocol.org) and the public address obtained in the previous step.

6. Check your balance. Here and in other commands, you need to add the `--node` flag with an RPC URL for connecting to Chiado. 
   
   ```bash
   wardend query bank balances my-key-name --node https://rpc.chiado.wardenprotocol.org:443
   ```

## 2. Create a CosmWasm project

Create a new CosmWasm project template:

```bash
cargo generate --git https://github.com/CosmWasm/cw-template.git --name hello-world
cd hello-world
```

## 3. Modify the contract code

Now you need to modify files in the `src` directory as shown in the steps below.

1. Open the `contract.rs` file and replace its contents with this code:

   ```rust title="hello-world/src/contract.rs"
   use cosmwasm_std::{
       entry_point, to_json_binary, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult,
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
   pub fn query(_deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
       match msg {
           QueryMsg::GetGreeting {} => to_json_binary(&"Hello, World!"),
       }
   }
   ```

2. Open the `msg.rs` file and replace its contents with this code:
   
   ```rust title="hello-world/src/msg.rs"
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

2. Open the `helpers.rs` file and replace its contents with this code:
   
   ```rust title="hello-world/src/helpers.rs"
   use schemars::JsonSchema;
   use serde::{Deserialize, Serialize};
   
   use cosmwasm_std::{
       to_json_binary, Addr, CosmosMsg, StdResult, WasmMsg
   };
   
   use crate::msg::{ExecuteMsg};
   
   /// CwTemplateContract is a wrapper around Addr that provides a lot of helpers
   /// for working with this.
   #[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq, JsonSchema)]
   pub struct CwTemplateContract(pub Addr);
   
   impl CwTemplateContract {
       pub fn addr(&self) -> Addr {
           self.0.clone()
       }
   
       pub fn call<T: Into<ExecuteMsg>>(&self, msg: T) -> StdResult<CosmosMsg> {
           let msg = to_json_binary(&msg.into())?;
           Ok(WasmMsg::Execute {
               contract_addr: self.addr().into(),
               msg,
               funds: vec![],
           }
           .into())
       }
   }
   ```

## 4. Compile the contract

To compile the contract, run the following from the `hello-world` directory:

```bash
cargo wasm
```

The contract should be compiled without any errors.

## 5. Optimize the code

Now you need to optimize your compiled Wasm code:

```bash
wasm-opt -Os -o target/wasm32-unknown-unknown/release/hello_world.wasm \
  target/wasm32-unknown-unknown/release/hello_world.wasm
```

## 6. Store the contract onchain

If you're deploying on a local chain, make sure it's running. You can start your chain by running `wardend start` in a separate terminal window.

To store your contract onchain, run the command below. Specify your key name from [Step 1](#1-prepare-the-chain) in the `--from` flag, also set the chain ID.

<Tabs>
<TabItem value="default" label="Default node settings">
```bash
wardend tx wasm store target/wasm32-unknown-unknown/release/hello_world.wasm \
  --from shulgin \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  -y \
  --chain-id warden_1337-1
```
</TabItem>
<TabItem value="custom" label="Custom node settings">
```bash
wardend tx wasm store target/wasm32-unknown-unknown/release/hello_world.wasm \
  --from my-key-name \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  -y \
  --chain-id chain_123-1
```
</TabItem>
<TabItem value="chiado" label="Chiado">
```bash
wardend tx wasm store target/wasm32-unknown-unknown/release/hello_world.wasm \
  --from my-key-name \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  -y \
  --chain-id chain_123-1 \
  --node https://rpc.chiado.wardenprotocol.org:443
```
</TabItem>
</Tabs>

The transaction should be successful without any errors.

## 7. Get the code ID

Get the code ID that identifies your Wasm code:

<Tabs>
<TabItem value="local" label="Local chain">
```bash
wardend query wasm list-code
```
</TabItem>
<TabItem value="chiado" label="Chiado">
```bash
wardend query wasm list-code --node https://rpc.chiado.wardenprotocol.org:443
```
</TabItem>
</Tabs>

Note down `code_id` from the output.

## 8. Instantiate the contract

You can instantiate the contract by using the command below.


Before you proceed, replace `1` with the actual code ID you retrieved in previous step . Specify your key name in the `--from` flag and the chain ID. Also note that you can either define an admin or pass `--no-admin` to make it immutable, like in this example.

<Tabs>
<TabItem value="default" label="Default node settings">
```bash
wardend tx wasm instantiate 1 '{}' \
  --from shulgin \
  --label "Hello World" \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  --no-admin \
  -y \
  --chain-id warden_1337-1
```
</TabItem>
<TabItem value="custom" label="Custom node settings">
```bash
wardend tx wasm instantiate 1 '{}' \
  --from my-key-name \
  --label "Hello World" \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  --no-admin \
  -y \
  --chain-id chain_123-1
```
</TabItem>
<TabItem value="chiado" label="Chiado">
```bash
wardend tx wasm instantiate 1 '{}' \
  --from my-key-name \
  --label "Hello World" \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  --no-admin \
  -y \
  --chain-id chain_123-1 \
  --node https://rpc.chiado.wardenprotocol.org:443
```
</TabItem>
</Tabs>


## 9. Get the contract address

To get the contract address, run the following command. Replace `1` with the actual code ID:

```bash
wardend query wasm list-contract-by-code 1
```

Note down the contract address.

## 10. Execute the contract

Use the command below to exectute your contract. Replace `my-contract-address` with your contract address. Specify your key name in the `--from` flag and the chain ID.

<Tabs>
<TabItem value="default" label="Default node settings">
```bash
wardend tx wasm execute my-contract-address '{"say_hello":{}}' \
  --from shulgin \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  -y \
  --chain-id warden_1337-1
```
</TabItem>
<TabItem value="custom" label="Custom node settings">
```bash
wardend tx wasm execute my-contract-address '{"say_hello":{}}' \
  --from my-key-name \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  -y \
  --chain-id chain_123-1
```
</TabItem>
<TabItem value="chiado" label="Chiado">
```bash
wardend tx wasm execute my-contract-address '{"say_hello":{}}' \
  --from my-key-name \
  --gas auto \
  --gas-adjustment 1.3 \
  --gas-prices 100000000000award \
  -y \
  --chain-id chain_123-1 \
  --node https://rpc.chiado.wardenprotocol.org:443
```
</TabItem>
</Tabs>


## 11. Query the contract

You can query your contract with the following command. Replace `my-contract-address` with your contract address.

```bash
wardend query wasm contract-state smart my-contract-address '{"get_greeting":{}}'
```

In the output, you should see this: `data: Hello, World!`

If you encounter any issues, please reach out to us in [Discord](https://discord.com/invite/wardenprotocol) or [Twitter](https://twitter.com/wardenprotocol).

Happy coding! 🚀

## Next steps

After deploying a basic WASM smart contract, you can [deploy a cross-chain app using GMP](deploy-a-cross-chain-app).

