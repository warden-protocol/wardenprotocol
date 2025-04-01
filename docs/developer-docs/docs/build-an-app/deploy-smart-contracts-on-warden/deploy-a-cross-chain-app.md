---
sidebar_position: 3
---

# Deploy a crosschain application using GMP

## Overview

This guide explains how to build the logic for a **crosschain app** using **Axelar GMP** (General Message Passing).

You'll deploy two contracts:

- An EVM contract on **Ethereum Sepolia**
- A WASM contract on **Warden** (**Buenavista testnet**)

After you execute the WASM contract on Warden, it'll be able to burn tokens from the EVM contract on Sepolia. For crosschain interaction, the contracts will use the [x/gmp module](/learn/warden-protocol-modules/external-modules#xgmp), which enables Axelar GMP.

Note that this guide assumes you have a basic familiarity with Solidity and Rust and smart contract deployment.

:::tip
Axelar GMP will be soon available on our new testnet—[Chiado](/operate-a-node/chiado-testnet/chiado-overview). Stay tuned in for updates!
:::

## 1. Deploy an EVM contract on Sepolia

### The contract overview

In this section, you'll deploy an EVM contract on Ethereum Sepolia.

Here are the key features of this contract:

- It'll function both as an ERC20 token and a crosschain executable contract.
- It'll be able to receive burn instructions from other chains through the Axelar network.
- The initial token supply will be minted to the contract itself, not to any external address.
- Burning can only be done from the balance of the contract, not from user balances.

### Prerequisites

Before you start, complete the following prerequisites:

- Install `node.js` and `npm`.
- Install `truffle`  globally: `npm install -g truffle`.
- Create a wallet and get Sepolia ETH—for example, from the [PoW Sepolia Faucet](https://sepolia-faucet.pk910.de).
- Create an [Infura](https://www.infura.io) account for accessing the Sepolia network.

### 1.1. Set up the project

1. Create a new directory `burnable-token` and initialize a Truffle project:

   ```bash
   mkdir burnable-token
   cd burnable-token
   truffle init
   ```

2. Install necessary dependencies:

   ```bash
   npm init -y
   npm install @axelar-network/axelar-gmp-sdk-solidity 
   npm install @openzeppelin/contracts 
   npm install @truffle/hdwallet-provider 
   npm install dotenv
   ```

3. In the root directory, create a file named `.env` to store your private key and the Infura project ID:

   ```ini title="burnable-token/.env"
   PRIVATE_KEY=my-private-key
   INFURA_PROJECT_ID=my-infura-project-id
   ```

### 1.2. Add the contract

1. In the `contracts` directory, create a new file `BurnableToken.sol` with the following contents:

```solidity title="burnable-token/contracts/BurnableToken.sol"

    // SPDX-License-Identifier: MIT
    
    pragma solidity ^0.8.20;

    import "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
    import "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

    /**
    * @title BurnableToken
    * @dev An ERC20 token that can be burned through crosschain messages using Axelar
    */

    contract BurnableToken is AxelarExecutable, ERC20Burnable {
        // An event emitted when tokens are burned
        event TokensBurned(uint256 amount);

        /**
        * @dev A constructor that mints an initial supply of tokens to the contract
        * @param gateway_ The address of the Axelar gateway contract
        * @param initialSupply The initial supply of tokens to mint
        */

        constructor(address gateway_, uint256 initialSupply) 
            AxelarExecutable(gateway_) 
            ERC20("WardenTokens", "AM") 
        {
            // Mint the initial supply to the contract address
            _mint(address(this), initialSupply);
        }

        /**
        * @dev Handles crosschain messages received through Axelar
        * @param sourceChain The name of the source chain
        * @param sourceAddress The address of the source contract on the source chain
        * @param payload The payload sent from the source chain (the amount to burn)
        */

        function _execute(
            string calldata sourceChain,
            string calldata sourceAddress,
            bytes calldata payload
        ) internal override {
            // Decode the payload to get the amount to burn
            uint256 amountToBurn = abi.decode(payload, (uint256));
            // Burn the specified amount of tokens
            burnTokens(amountToBurn);
        }

        /**
        * @dev Burns a specified amount of tokens from the contract's balance
        * @param amount The amount of tokens to burn
        */
        function burnTokens(uint256 amount) public {
            require(balanceOf(address(this)) >= amount, "Insufficient balance to burn");
            _burn(address(this), amount);
            emit TokensBurned(amount);
        }

        // Allows the contract to receive native currency—for example, ETH
        receive() external payable {}
    }
```

### 1.3. Configure Truffle

In the root directory, update the `truffle-config.js` file to include the Sepolia network:

```javascript title="burnable-token/truffle-config.js"
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
      ),
      network_id: 11155111,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },
  compilers: {
    solc: {
      version: "0.8.20",
    }
  },
};
```

### 1.4. Create a migration script

Now you need to add a migration script that will deploy the contract and mint the initial supply to the contract address.

In `migrations`, create a new file `migrations/2_deploy_contracts.js` with the following contents:

```javascript title="burnable-token/migrations/2_deploy_contracts.js"
const BurnableToken = artifacts.require("BurnableToken");

module.exports = async function (deployer, network, accounts) {
  
  const AXELAR_GATEWAY_ADDRESS = "0xe432150cce91c13a887f7D836923d5597adD8E31";

  // Define the initial supply—for example, 100 tokens with 18 decimals
  const initialSupply = web3.utils.toWei("100000000", "ether"); // Mints 100M tokens
/burnable-token
  // Deploy the BurnableToken contract with the required constructor parameters
  await deployer.deploy(
    BurnableToken,
    AXELAR_GATEWAY_ADDRESS,
    initialSupply
  );
};
```

:::tip
To verify the Ethereum Sepolia gateway address in `AXELAR_GATEWAY_ADDRESS` or find gateway contracts for other chains, see [EVM contract addresses](https://docs.axelar.dev/resources/contract-addresses/testnet/#evm-contract-addresses) in the Axelar documentation.
:::

### 1.5. Compile the contract

Run the following command to compile your contract:

```bash
truffle compile
```

### 1.6. Deploy the contract

1. To deploy the contract, make sure your wallet has enough Sepolia ETH. Then run the migration script:

   ```bash
   truffle migrate --network sepolia
   ```

   You'll see an output similar to the following:
   
   ```bash
   Starting migrations...
   ======================
   > Network name:    'sepolia'
   > Network id:      11155111
   > Block gas limit: 30000000 (0x1c9c380)
   
   
   2_deploy_contracts.js
   =====================
   
      Deploying 'BurnableToken'
      -------------------------
      > transaction hash:    0x969021618f339d2e5231920652699b13071adb44fcce27cf7d46dca9e2dcba61
      > Blocks: 0            Seconds: 4
      > contract address:    0x5388dE880a16Ba9602746F3799E850E78148cd57
      > block number:        6688280
      > block timestamp:     1726294248
      > account:             0xc00d0c1255883B9c0D8D3a17927F5b8a06802937
      > balance:             0.371481630374370861
      > gas used:            950251 (0xe7feb)
      > gas price:           3.567435322 gwei
      > value sent:          0 ETH
      > total cost:          0.003389958982165822 ETH
   
      Pausing for 2 confirmations...
   
      -------------------------------
      > confirmation number: 1 (block: 6688281)
      > confirmation number: 2 (block: 6688282)
      > Saving artifacts
      -------------------------------------
      > Total cost:     0.003389958982165822 ETH
   
   Summary
   =======
   > Total deployments:   1
   > Final cost:          0.003389958982165822 ETH
   ```

2. Note down the contract address returned in the `contract address` field of the deployment output.

### 1.7. Verify the deployment

Congratulations! You've successfully deployed your `BurnableToken` contract to the Sepolia testnet. Remember to keep your private keys and sensitive information secure and never share your `.env` file.

Verify the deployment by checking the contract address on [Etherscan](https://sepolia.etherscan.io). For example, you can find the contract from this guide here: [contract 0x5388...cd57](https://sepolia.etherscan.io/address/0x5388de880a16ba9602746f3799e850e78148cd57).

## 2. Deploy a WASM contract on Warden

### The contract overview

In the following steps, you'll deploy a WASM contract on a Warden testnet, Buenavista. This contract will interact with the `BurnableToken` contract from the first part of the guide.

Here are the key points of this contract:

- It'll function as a bridge between a contract deployed on Warden and a contract deployed on an EVM chain (Sepolia in this case).
- It'll use Axelar's infrastructure for crosschain communication.
- The burning amount will be passed from the WASM contract to the EVM contract.
- Gas fees for crosschain execution will be included in the transaction.

### Prerequisites

Before you start, do the following:

- If you wish to learn the basics, follow this guide: [Deploy a WASM contract](../deploy-smart-contracts-on-warden/deploy-a-wasm-contract).
- Install Rust and set up the CosmWasm environment, as shown in [the guide](../deploy-smart-contracts-on-warden/deploy-a-wasm-contract#prerequisites).
- For interacting with the node, [install Go](https://go.dev/doc/install) 1.24 or later and [just](https://github.com/casey/just) 1.34.0 or later.
- Obtain some AXL tokens in the Axelar network.

### 2.1. Create a WASM contract

Start by creating a WASM contract that will burn tokens on the EVM contract:

1. Create a CosmWasm project. You can [use a template](../deploy-smart-contracts-on-warden/deploy-a-wasm-contract#2-create-a-cosmwasm-project).

2. In the `src` directory of your project, create a `contract.rs` file with the code below. If you've used a template, update the existing file.

   Set `destination_address` to the EVM contract address from [Step 1.6](#16-deploy-the-contract). Optionally, modify the code to let users input the address during execution.
   
   ```rust title="my-wasm-project/src/contract.rs"
   #[cfg(not(feature = "library"))]
   // Import standard CosmWasm libraries
   use cosmwasm_std::{Uint256, DepsMut, Env, MessageInfo, Response};
   // Import a library for Ethereum ABI encoding
   use ethabi::{encode, Token};
   // Import custom modules
   use serde_json_wasm::to_string;
   use crate::error::ContractError;
   use crate::msg::*;
   
   // This function is called when the contract is first deployed
   // It currently doesn't perform any initialization, just returns an empty response
   pub fn instantiate(
       _deps: DepsMut,
       _env: Env,
       _info: MessageInfo,
       _msg: InstantiateMsg,
   ) -> Result<Response, ContractError> {
       Ok(Response::new())
   }
   
   // This function is the main entry point for contract execution
   // It matches on the `ExecuteMsg` enum, currently only handling `SendMessageEvm`
   pub fn execute(
       deps: DepsMut,
       env: Env,
       info: MessageInfo,
       msg: ExecuteMsg,
   ) -> Result<Response, ContractError> {
       match msg {
           ExecuteMsg::SendMessageEvm { amount_to_burn } => {
               exec::send_message_evm(deps, env, info, amount_to_burn)
           }
       }
   }
   
   mod exec {
       use super::*;
       use ethabi::ethereum_types::U256;
   
       // This function creates an Ethereum ABI payload for burning tokens
       fn create_burn_payload(amount: Uint256) -> Result<Vec<u8>, ContractError> {
           // Convert the Uint256 amount to burn to a big-endian byte array
           let amount_bytes = amount.to_be_bytes();
           // Convert the big-endian byte array to a U256
           let amount_u256 = U256::from_big_endian(&amount_bytes);
           // Wrap the amount in a token
           let amount_token = Token::Uint(amount_u256);
           // Encode the amount as an Ethereum ABI payload
           Ok(encode(&[amount_token]))
       }
   
       // This function burns tokens on an EVM chain
       // It sends a message through Axelar GMP to a given chain and address
       pub fn send_message_evm(
           _deps: DepsMut,
           env: Env,
           info: MessageInfo,
           amount_to_burn: Uint256,  // The amount to burn
       ) -> Result<Response, ContractError> {
           
           // Hardcode the destination chain and address
           let destination_chain = "ethereum-sepolia".to_string();
           let destination_address = "0x5388dE880a16Ba9602746F3799E850E78148cd57".to_string();
   
           // Create a burn payload
           let payload = create_burn_payload(amount_to_burn)?;
   
           // Extract the coin sent with the transaction for gas fees
           // It must contain only 1 token type
           let coin: cosmwasm_std::Coin = cw_utils::one_coin(&info).unwrap();
           
           // Construct a GMP message with the hardcoded destination values
           // Include the payload and fee information
           let gmp_message: GmpMessage = GmpMessage {
               destination_chain,
               destination_address,
               payload,
               type_: 1,
               fee: Some(Fee {
                   amount: coin.amount.to_string(),
                   recipient: "axelar1zl3rxpp70lmte2xr6c4lgske2fyuj3hupcsvcd".to_string(),
               }),
           };
       
           // Construct an IBC transfer message
           // It'll send the GMP message to the Axelar network
           let ibc_message = crate::ibc::MsgTransfer {
               source_port: "transfer".to_string(),
               source_channel: "channel-1".to_string(), // The Warden testnet
               token: Some(coin.into()),
               sender: env.contract.address.to_string(),
               receiver: "axelar1dv4u5k73pzqrxlzujxg3qp8kvc3pje7jtdvu72npnt5zhq05ejcsn5qme5"
                   .to_string(),
               timeout_height: None,
               timeout_timestamp: Some(env.block.time.plus_seconds(604_800u64).nanos()),
               memo: to_string(&gmp_message).unwrap(),
           };
       
           Ok(Response::new().add_message(ibc_message))
       }
   }   
   ```

### 2.2. Add supporting code

In the following steps, you'll create files in the `src` directory to add supporting code for your contract. If you're using a [CosmWasm project template](../deploy-smart-contracts-on-warden/deploy-a-wasm-contract#2-create-a-cosmwasm-project), just update the existing files.

1. Create a file named `msg.rs` with the following code:
   
   ```rust title="my-wasm-project/src/msg.rs"
   use cosmwasm_schema::cw_serde;
   use cosmwasm_std::Uint256;
   
   #[cw_serde]
   pub struct InstantiateMsg {}
   
   #[cw_serde]
   pub enum ExecuteMsg {
       SendMessageEvm {
           amount_to_burn: Uint256,
       },
   }
   
   #[cw_serde]
   pub enum QueryMsg {
       GetStoredMessage {},
   }
   
   #[cw_serde]
   pub struct GetStoredMessageResp {
       pub sender: String,
       pub message: String,
   }
   
   #[cw_serde]
   pub struct Fee {
       pub amount: String,
       pub recipient: String,
   }
   
   #[cw_serde]
   pub struct GmpMessage {
       pub destination_chain: String,
       pub destination_address: String,
       pub payload: Vec<u8>,
       #[serde(rename = "type")]
       pub type_: i64,
       pub fee: Option<Fee>,
   }
   ```

2. Create a file named `error.rs` with the following code:
   
   ```rust title="my-wasm-project/src/error.rs"
   use cosmwasm_std::StdError;
   use thiserror::Error;
   
   #[derive(Error, Debug)]
   pub enum ContractError {
       #[error("{0}")]
       Std(#[from] StdError),
   
       #[error("Unauthorized")]
       Unauthorized {},
   
       #[error("Serialization error")]
       SerializationError,
   }
   ```

3. Create a file named `helpers.rs` file with the following code:

   ```rust title="my-wasm-project/src/helpers.rs"
   use schemars::JsonSchema;
   use serde::{Deserialize, Serialize};
   
   use cosmwasm_std::{to_json_binary, Addr, CosmosMsg, StdResult, WasmMsg};
   
   use crate::msg::ExecuteMsg;
   
   // CwTemplateContract is a wrapper around Addr
   // It provides various helper functions for working with the contract
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

4. Create a file named `ibc.rs` with the following code:
   
   ```rust title="my-wasm-project/src/ibc.rs"
   use osmosis_std_derive::CosmwasmExt;
   #[derive(
       Clone,
       PartialEq,
       Eq,
       ::prost::Message,
       serde::Serialize,
       serde::Deserialize,
       schemars::JsonSchema,
   )]
   pub struct IbcCounterpartyHeight {
       #[prost(uint64, optional, tag = "1")]
       revision_number: Option<u64>,
       #[prost(uint64, optional, tag = "2")]
       revision_height: Option<u64>,
   }

   // Define the transfer as a Stargate message   
   // It's required because IBC token transfers aren't fully supported by cosmwasm-std
   #[derive(
       Clone,
       PartialEq,
       Eq,
       ::prost::Message,
       serde::Serialize,
       serde::Deserialize,
       schemars::JsonSchema,
       CosmwasmExt,
   )]
   #[proto_message(type_url = "/ibc.applications.transfer.v1.MsgTransfer")]
   pub struct MsgTransfer {
       #[prost(string, tag = "1")]
       pub source_port: String,
       #[prost(string, tag = "2")]
       pub source_channel: String,
       #[prost(message, optional, tag = "3")]
       pub token: ::core::option::Option<osmosis_std::types::cosmos::base::v1beta1::Coin>,
       #[prost(string, tag = "4")]
       pub sender: String,
       #[prost(string, tag = "5")]
       pub receiver: String,
       #[prost(message, optional, tag = "6")]
       pub timeout_height: Option<IbcCounterpartyHeight>,
       #[prost(uint64, optional, tag = "7")]
       pub timeout_timestamp: ::core::option::Option<u64>,
       #[prost(string, tag = "8")]
       pub memo: String,
   }
   
   // Define the response as a prost message to facilitate decoding of the protobuf data
   #[derive(Clone, PartialEq, Eq, ::prost::Message)]
   pub struct MsgTransferResponse {
       #[prost(uint64, tag = "1")]
       pub sequence: u64,
   }
   ```

5. Create a file named `lib.rs` with the following code:
   
   ```rust title="my-wasm-project/src/lib.rs"
   pub mod contract;
   mod error;
   mod ibc;
   pub mod msg;
   pub mod state;
   
   #[cfg(test)]
   mod unit_tests;
   
   pub use crate::error::ContractError;
   
   use msg::{ExecuteMsg, InstantiateMsg};
   
   use cosmwasm_std::entry_point;
   use cosmwasm_std::{DepsMut, Env, MessageInfo, Response};
   
   #[cfg_attr(not(feature = "library"), entry_point)]
   pub fn instantiate(
       deps: DepsMut,
       env: Env,
       info: MessageInfo,
       msg: InstantiateMsg,
   ) -> Result<Response, ContractError> {
       contract::instantiate(deps, env, info, msg)
   }
   
   #[cfg_attr(not(feature = "library"), entry_point)]
   pub fn execute(
       deps: DepsMut,
       env: Env,
       info: MessageInfo,
       msg: ExecuteMsg,
   ) -> Result<Response, ContractError> {
       contract::execute(deps, env, info, msg)
   }
   ```

6. Create a file named `state.rs` with the following code:
   
   ```rust title="my-wasm-project/src/state.rs"
   use cosmwasm_schema::cw_serde;
   use cw_storage_plus::Item;
   
   #[cw_serde]
   pub struct Message {
       pub sender: String,
       pub message: String,
   }
   
   pub const STORED_MESSAGE: Item<Message> = Item::new("storedmessage");
   ```

### 2.3. Compile & optimize

Now you can [compile](../deploy-smart-contracts-on-warden/deploy-a-wasm-contract#4-compile-the-contract) and [optimize](../deploy-smart-contracts-on-warden/deploy-a-wasm-contract#5-optimize-the-code) your contract.

### 2.4. Create a Warden account

1. Download Warden [v.0.4.1](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.4.1) and navigate to the root directory:

   ```bash
   git clone --depth 1 --branch v0.4.1 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

2. Build the `wardend` binary and install it in your `$GOPATH`:

   ```bash
   just build
   just install
   ``` 
3. Verify the installation:

   ```bash
   wardend version
   ```

   You should see the following output:
   
   ```bash
   v0.4.1
   ```

4. Create a key, specifying a custom key (account) name::

   ```bash
   wardend keys add my-key-name
   ```

   You'll be prompted to create a passphrase, which is required for confirming some of the next steps.

   :::warning
   After you enter the passphrase, the node will return the account address and a mnemonic phrase. Note them down: you'll need this data for recovering your account if necessary.
   :::

5. Get some [WARD](/tokens/ward-token/ward) in [Buenavista faucet](https://faucet.buenavista.wardenprotocol.org): paste the address returned in the previous step.

   You can verify that your account is funded by running the command below. Specify the custom key name you chose before.

   ```bash
   wardend query bank balances my-key-name --node https://rpc.buenavista.wardenprotocol.org:443
   ```

### 2.5. Deploy on Buenavista

1. Now you can store your contract on Buenavista by running the following command. Replace `my-key-name` with your key name from the previous step.
   
   ```bash
   wardend tx wasm store target/wasm32-unknown-unknown/release/burn_tokens.wasm \
     --from my-key-name \
     --gas auto \
     --gas-adjustment 1.5 \
     --gas-prices 0.025uward  -y \
     --chain-id buenavista-1 \
     --node https://rpc.buenavista.wardenprotocol.org:443
   ```
   
   :::tip
   Buenavista uses the `cosmos.crypto.secp256k1` module for cryptographic operations. If your key is created with the `ethermint.crypto.v1.ethsecp256k1` module, downgrade your node to `v0.4.1` and create a key with `cosmos.crypto.secp256k1`.
   :::

2. Get the code ID that identifies your WASM contract:
   
   ```bash
   wardend query wasm list-code --node https://rpc.buenavista.wardenprotocol.org:443
   ```
   
   Note down `code_id` from the output.

3. Instantiate the contract by using the command below. 

   Before you proceed, replace `1` with the actual code ID and `my-key-name` with your key name. Also note that you can either define an admin or pass `--no-admin` to make it immutable, like in this example.

   ```bash
   wardend tx wasm instantiate 1 '{}' \
     --from my-key-name \
     --label "Burn Tokens" \
     --gas auto \
     --gas-adjustment 1.5 \
     --gas-prices 0.025uward \
     --no-admin -y \
     --chain-id buenavista-1 \
     --node https://rpc.buenavista.wardenprotocol.org:443
   ```

4. To get the contract address, run the following command. Replace `1` with the actual `code_id`.
   
   ```bash
   wardend query wasm list-contract-by-code 1 --node https://rpc.buenavista.wardenprotocol.org:443
   ```
   
5. Use the command below to execute your contract.

   Before you proceed, replace `my-contract-address` with your contract address and `my-key-name` with your key name. The `--amount` flag specifies the gas fee in the Axelar network—make sure you have enough AXL.
   
   ```bash
   wardend tx wasm execute my-contract-address '{"send_message_evm": {"amount_to_burn": "1000000"}}' \
    --from my-key-name \
    --amount 3000000ibc/0E1517E2771CA7C03F2ED3F9BAECCAEADF0BFD79B89679E834933BC0F179AD98 \
    --gas auto \
    --gas-adjustment 1.5 \
    --gas-prices 0.025uward \
    -y \
    --chain-id buenavista-1 \
    --node https://rpc.buenavista.wardenprotocol.org:443
   ```

### 2.6. Verify the deployment

Congratulations! You've successfully deployed your WASM contract on Warden.

Now you can verify the deployment and see how the EVM and WASM contracts interact:

1. Verify the deployment by checking the transaction hash on the [Buenavista chain explorer](https://spaceward.buenavista.wardenprotocol.org/explorer). For example, the following verifies that the contract from this guide was executed: [transaction 924E...6428](https://testnet.warden.explorers.guru/transaction/924E58EF8233D82F6BC881C22515E8C35C47A8AE0542F71EF65D6D89B04B6528).

2. To verify the transfer of tokens through GMP, visit [Axelarscan](https://testnet.axelarscan.io/gmp/924E58EF8233D82F6BC881C22515E8C35C47A8AE0542F71EF65D6D89B04B6528).

3. To verify the token burn, visit [Etherscan](https://sepolia.etherscan.io/token/0x5388de880a16ba9602746f3799e850e78148cd57?a=0x5388dE880a16Ba9602746F3799E850E78148cd57).

If you encounter any issues, please reach out to us in [Discord](https://discord.com/invite/wardenprotocol) or [Twitter](https://twitter.com/wardenprotocol).

Happy coding! 🚀
