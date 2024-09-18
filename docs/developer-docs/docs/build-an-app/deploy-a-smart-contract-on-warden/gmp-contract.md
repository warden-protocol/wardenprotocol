---
sidebar_position: 3
---

# Deploy cross chain application on Warden using GMP

## Overview

In this tutorial, you will learn how a smart contract deployed on the Warden chain can interact with a smart contract deployed on EVM chain. This demonstration relies on the GMP module powered by Axelar.

In this tutorial we will deploy a smart contract called `BurnableToken` on the EVM chain. This contract will be initated with a fix supply of tokens. Another `WASM` contract will be deployed on the Warden chain that will be used to interact with the `BurnableToken` contract. Upon executing the `WASM` contract, it will be able to burn the tokens from the `BurnableToken` contract.

## GMP

GMP, or General Message Passing, is a protocol designed to enable secure and efficient communication between different blockchain networks. It's a key technology in the realm of blockchain interoperability.

Key points about GMP:

1. **Cross-Chain Communication**: GMP allows smart contracts on one blockchain to send messages and data to smart contracts on another blockchain.

2. **Interoperability**: It enables different blockchain ecosystems to interact with each other, breaking down the silos between separate networks.

3. **Flexibility**: GMP can be used for various purposes, such as token transfers, data sharing, or triggering actions across chains.

4. **Security**: It includes mechanisms to ensure the authenticity and integrity of cross-chain messages.

5. **Scalability**: GMP is designed to handle a high volume of cross-chain transactions efficiently.

## Prerequisites

The tutorial assumes that you have basic understanding of `solidity` and `rust` and how to deploy smart contracts on EVM and Warden chains respectively.

## Deploy an EVM contract on Sepolia

### Prerequisites for EVM contract

1. Install `node.js` and `npm`
2. Install `truffle`  globally: `npm install -g truffle`
3. Make sure you have some sepolia ETH in your wallet (You can get this from a Sepolia faucet)
4. An Infura account for accessing the Sepolia network

### Step 1: Set up the project

1. Create a new directory and initialize a Truffle project:

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

3. Create a `.env` file in the root directory to store your private key and Infura project ID:

   ```.env
   PRIVATE_KEY=your_private_key_here
   INFURA_PROJECT_ID=your_infura_project_id_here
   ```

### Step 2: Add the contract

1. Create a new file `contracts/BurnableToken.sol` and paste the provided contract code.

```solidity

    // SPDX-License-Identifier: MIT
    
    pragma solidity ^0.8.20;

    import "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
    import "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
    import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

    /**
    * @title BurnableToken
    * @dev An ERC20 token that can be burned via cross-chain messages using the Axelar network.
    */

    contract BurnableToken is AxelarExecutable, ERC20Burnable {
        // Event emitted when tokens are burned
        event TokensBurned(uint256 amount);

        /**
        * @dev Constructor that mints an initial supply of tokens to the contract itself.
        * @param gateway_ The address of the Axelar gateway contract.
        * @param initialSupply The initial supply of tokens to mint.
        */

        constructor(address gateway_, uint256 initialSupply) 
            AxelarExecutable(gateway_) 
            ERC20("AliTokens", "AM") 
        {
            // Mint the initial supply to the contract's address
            _mint(address(this), initialSupply);
        }

        /**
        * @dev Handles cross-chain messages received via Axelar.
        * @param sourceChain The name of the source chain.
        * @param sourceAddress The address of the source contract on the source chain.
        * @param payload The payload sent from the source chain, expected to be the amount to burn.
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
        * @dev Burns a specified amount of tokens from the contract's balance.
        * @param amount The amount of tokens to burn.
        */
        function burnTokens(uint256 amount) public {
            require(balanceOf(address(this)) >= amount, "Insufficient balance to burn");
            _burn(address(this), amount);
            emit TokensBurned(amount);
        }

        // Allows the contract to receive native currency (e.g., ETH)
        receive() external payable {}
    }
```

**Key Points of the contract:**

- The above contract acts as both an ERC20 token and a cross-chain executable contract.
- It can receive burn instructions from other chains via Axelar's network.
- The initial token supply is minted to the contract itself, not to any external address.
- Burning can only be done from the contract's balance, not from user balances.

### Step 3: Configure Truffle

1. Update `truffle-config.js` to include the Sepolia network:

```javascript
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
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

### Step 4: Create a migration script

1. Create a new file `migrations/2_deploy_contracts.js`:

```javascript
const BurnableToken = artifacts.require("BurnableToken");

module.exports = async function (deployer, network, accounts) {
  
  const AXELAR_GATEWAY_ADDRESS = "0xe432150cce91c13a887f7D836923d5597adD8E31";

  // Define the initial supply (e.g., 100 tokens with 18 decimals)
  const initialSupply = web3.utils.toWei("100000000", "ether"); // Mints 100M tokens

  // Deploy the BurnableToken contract with the required constructor parameters
  await deployer.deploy(
    BurnableToken,
    AXELAR_GATEWAY_ADDRESS,
    initialSupply
  );
};
```

The script will deploy the contract and mint the initial supply to the contract's address.

:::Tip
You will find AXELAR_GATEWAY_ADDRESS for Ethereum Sepolia or other chains [here](https://docs.axelar.dev/resources/contract-addresses/testnet/#evm-contract-addresses)
:::

### Step 5: Compile the contract

Run the following command to compile your contract:

```bash
truffle compile
```

### Step 6: Deploy the contract

1. Make sure you have enough Sepolia ETH in your wallet for deployment.

2. Run the migration to deploy the contract:

   ```bash
   truffle migrate --network sepolia
   ```

You will see an output similar to the following:

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

3. Note down the contract address from the deployment output.

### Step 7: Verify the deployment

You can verify the deployment by checking the tx hash in Etherscan.

For example, the contract - `0x5388dE880a16Ba9602746F3799E850E78148cd57` deployed on Sepolia can be verfied on [EtherScan](https://sepolia.etherscan.io/token/0x5388de880a16ba9602746f3799e850e78148cd57?a=0x5388dE880a16Ba9602746F3799E850E78148cd57)

Congratulations! You've successfully deployed your `BurnableToken` contract to the Sepolia testnet.

Remember to keep your private keys and sensitive information secure, and never share your `.env` file.

In the next part of the tutorial we will deploy a `WASM` contract on the Warden chain which will interact with the `BurnableToken` contract.

## Deploy a WASM contract on the Warden chain

### Pre-requisites

The tutorial assumes you have a basic understanding of the steps involved to deploy a `WASM` contract on Warden. If not, you should verse yourself with this [tutorial.](../deploy-a-smart-contract-on-warden/deploy-a-cosmwasm-contract.md)

### Step 1: Create a WASM contract to burn tokens on EVM contract

1. Create a new file `src/contract.rs`

```rust
#[cfg(not(feature = "library"))]
use cosmwasm_std::{Uint256, DepsMut, Env, MessageInfo, Response};
use ethabi::{encode, Token};
use serde_json_wasm::to_string;
use crate::error::ContractError;
use crate::msg::*;

pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    Ok(Response::new())
}

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

    fn create_burn_payload(amount: Uint256) -> Result<Vec<u8>, ContractError> {
        // Convert Uint256 to U256 using its byte representation
        let amount_bytes = amount.to_be_bytes(); // Uint256 to big-endian bytes
        let amount_u256 = U256::from_big_endian(&amount_bytes); // Convert bytes to ethabi::U256
        
        let amount_token = Token::Uint(amount_u256);
        Ok(encode(&[amount_token]))
    }

    // Sends a message via Axelar GMP to the EVM {destination_chain} and {destination_address}
    pub fn send_message_evm(
        _deps: DepsMut,
        env: Env,
        info: MessageInfo,
        amount_to_burn: Uint256,  // Amount to burn
    ) -> Result<Response, ContractError> {
        
        // Hardcode the destination values
        let destination_chain = "ethereum-sepolia".to_string();
        let destination_address = "0x5388dE880a16Ba9602746F3799E850E78148cd57".to_string();

        // Create the payload
        let payload = create_burn_payload(amount_to_burn)?;

        // {info.funds} used to pay gas. Must only contain 1 token type
        let coin: cosmwasm_std::Coin = cw_utils::one_coin(&info).unwrap();

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
    
        let ibc_message = crate::ibc::MsgTransfer {
            source_port: "transfer".to_string(),
            source_channel: "channel-1".to_string(), // Warden Testnet
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

**Code Explanation:**

This contract is designed to facilitate cross-chain token burning using Axelar's General Message Passing (GMP) protocol. Here's a breakdown of its key components:

1. **Imports and Setup**:
   - The contract uses `cosmwasm_std` for CosmWasm standard libraries.
   - It imports `ethabi` for Ethereum ABI encoding.
   - Custom modules like `error`, `msg`, and potentially `state` are used.

2. **Instantiate Function**:
   - This function is called when the contract is first deployed.
   - It currently doesn't perform any initialization, just returns an empty `Response`.

3. **Execute Function**:
   - This is the main entry point for contract execution.
   - It matches on the `ExecuteMsg` enum, currently only handling `SendMessageEvm`.

4. **SendMessageEvm Function** (in `exec` module):
   - This function prepares and sends a cross-chain message to burn tokens on an EVM chain.
   - Key steps:
     a. Creates a burn payload using the `create_burn_payload` function.
     b. Extracts the coin sent with the transaction for gas fees.
     c. Constructs a `GmpMessage` with hardcoded destination chain and address.
     d. Creates an IBC transfer message to send the GMP message via Axelar.

5. **create_burn_payload Function**:
   - Converts the `Uint256` amount to burn into an Ethereum-compatible `U256`.
   - Encodes this amount as an Ethereum ABI payload.

6. **GmpMessage and IBC Message Construction**:
   - The `GmpMessage` includes destination chain, address, payload, and fee information.
   - An IBC transfer message is created to send this GMP message to Axelar's network.

**Key Points:**

- The contract acts as a bridge between a contract deployed on Warden chain and a contract deployed on EVM chain (Ethereum Sepolia in this case).
- It uses Axelar's infrastructure for cross-chain communication.
- The burning amount is passed from the CosmWasm contract to the EVM contract.
- Gas fees for cross-chain execution are included in the transaction.

This contract is designed to initiate a token burn operation on a specific EVM chain (Ethereum Sepolia) from a CosmWasm-based chain, utilizing Axelar's cross-chain messaging capabilities.

:::Tip
The destination address is the EVM contract address that we obtained in previous step. For simplicity, we have coded the values in the tutorial. To make it more modular, you can require user to input the address during contract execution.
:::

### Step 2: Add helper functions to execute `contract.rs`

#### 1. Create a new file `src/msg.rs` and paste the following code

```rust
use cosmwasm_schema::cw_serde;
// use cosmwasm_std::Binary;
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

#### 2. Create a new file `src/error.rs` and paste the following code

```rust
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

#### 3. Create a new file `src/helpers.rs` and paste the following code

```rust
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{to_json_binary, Addr, CosmosMsg, StdResult, WasmMsg};

use crate::msg::ExecuteMsg;

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

#### 4. Create a new file `src/ibc.rs` and paste the following code

```rust
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

// We need to define the transfer here as a stargate message because this is
// not yet supported by cosmwasm-std.
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

// We define the response as a prost message to be able to decode the protobuf data.
#[derive(Clone, PartialEq, Eq, ::prost::Message)]
pub struct MsgTransferResponse {
    #[prost(uint64, tag = "1")]
    pub sequence: u64,
}
```

#### 5. Create a new file `src/lib.rs` and paste the following code

```rust
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

#### 6. Create a new file `src/state.rs` and paste the following code

```rust
use cosmwasm_schema::cw_serde;
use cw_storage_plus::Item;

#[cw_serde]
pub struct Message {
    pub sender: String,
    pub message: String,
}

pub const STORED_MESSAGE: Item<Message> = Item::new("storedmessage");
```

Once you have defined all the necessary files, go ahead and compile the contract, and optimize the contract.

### Step 3: Deploy the contract on buenavista chain

#### 1. Store the contract on chain

Make sure your warden account is funded with sufficient `ward` tokens. To store your contract on the buenavista chain, run the command below. Replace `key-name` with your key name.

```bash
wardend tx wasm store target/wasm32-unknown-unknown/release/burn_tokens.wasm --from <key-name>  --node https://rpc.buenavista.wardenprotocol.org:443 --chain-id buenavista-1 --gas auto --gas-adjustment 1.5 -y --gas-prices 0.025uward
```

:::Tip
Make sure your key is created using `/cosmos.crypto.secp256k1` instead of `ethermint.crypto.v1.ethsecp256k`. If it is created using `ethermint.crypto.v1.ethsecp256k`, then downgrade your node to `v0.4.1` and create your key again. This is because buenavista chain uses `cosmos.crypto.secp256k1` instead of `ethermint.crypto.v1.ethsecp256k`.
:::

#### 2.  Get the code ID

Get the code ID, which identifies your `WASM` contract.

```bash
wardend query wasm list-code --node https://rpc.buenavista.wardenprotocol.org:443
```

Note down `code_id` from the output.

#### 3. Instantiate the contract

You can instantiate the contract by using the command below.

Before you proceed, should replace replace 1 with the actual `code_id` you retrieved in previous step and replace `key-name` with your key name. Also note that you can either define an admin or pass --no-admin to make it immutable, like in this example.

```bash
wardend tx wasm instantiate 1 '{}' --from <key-name> --label "Burn Tokens" --gas auto --gas-adjustment 1.5 --gas-prices 0.025uward --no-admin --node https://rpc.buenavista.wardenprotocol.org:443 --chain-id buenavista-1 -y
```

#### 4. Get the contract address

To get the contract address, run the following command. Replace 1 with the actual `code_id`.

```bash
wardend query wasm list-contract-by-code 1 --node https://rpc.buenavista.wardenprotocol.org:443 --chain-id buenavista-1
```

#### 5. Execute the contract

Use the command below to exectute your contract. Replace `contract-address` with your contract address and `key-name` with your key name.

```bash
wardend tx wasm execute <contract-address> '{"send_message_evm": {"amount_to_burn": "1000000"}}' --from ali --gas auto --gas-adjustment 1.5 --gas-prices 0.025uward --node https://rpc.buenavista.wardenprotocol.org:443 --chain-id buenavista-1 --amount 3000000ibc/0E1517E2771CA7C03F2ED3F9BAECCAEADF0BFD79B89679E834933BC0F179AD98 -y
```

:::Tip
`--amount` passed is used passed to pay the gas fees for execution in `axl` tokens. You should obtain some before you execute the contract.
:::

#### 6. Verify the contract

Once you execute the contract, you can obtain the `tx` hash and verify on buenavista chain explorer. For example, the above contract was executed and can be verified [here](https://testnet.warden.explorers.guru/transaction/924E58EF8233D82F6BC881C22515E8C35C47A8AE0542F71EF65D6D89B04B6528)

You can then monitor the the transfer of tokens through GMP in real time using the [Axelar Explorer](https://testnet.axelarscan.io/gmp/924E58EF8233D82F6BC881C22515E8C35C47A8AE0542F71EF65D6D89B04B6528)

Finally, you can verify the contract executed in real time on Ethereum Sepolia Testnet where tokens were burned. [See here](https://sepolia.etherscan.io/token/0x5388de880a16ba9602746f3799e850e78148cd57?a=0x5388dE880a16Ba9602746F3799E850E78148cd57)

Thats it for this tutorial. You have successfully learned how to deploy contracts on EVM and Warden chain and interact with them using GMP.

If you encounter any issues, please reach out to us in [Discord](link) or [Twitter.](link)

Happy coding! 🚀