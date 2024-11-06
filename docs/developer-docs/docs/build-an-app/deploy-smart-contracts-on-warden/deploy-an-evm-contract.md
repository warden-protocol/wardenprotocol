---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy an EVM contract

## Overview

The [`x/evm`](/learn/warden-protocol-modules/external-modules#xevm) Warden module allows executing **Ethereum Virtual Machine (EVM)** contracts charged by [Evmos](https://docs.evmos.org/protocol/modules/evm) and written in **Solidity**.

This guide explains how to create and deploy a simple "Counter" Solidity smart contract using Foundry's toolset on a Warden local chain or on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview).

## Prerequisites

Before you start, complete the following prerequisites:

- Install `foundry` by running the following command:

  ```bash
  curl -L https://foundry.paradigm.xyz | bash \ 
  foundryup
  ```

## 1. Prepare the chain

### Option 1. Run a local chain

To deploy an EVM contract locally, you need to run a local chain and make sure it's configured properly, as shown in the following steps:

1. Run a local chain as explained here: [Run a local chain](/operate-a-node/run-a-local-chain). Note that you'll need to [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Check the list of available keys (local accounts) and note down your key name.

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

4. The next steps require the private key associated with this account. To get it, run this:

   <Tabs>
   <TabItem value="default" label="Default node settings">
   ```bash
   wardend keys export shulgin --unarmored-hex --unsafe
   ```
   </TabItem>
   <TabItem value="custom" label="Custom node settings">
   ```bash
   wardend keys export my-key-name --unarmored-hex --unsafe
   ```
   </TabItem>
   </Tabs>

5. You'll also need your chain ID. Run the following and note down the value from the `network` field:

   ```bash
   wardend status
   ```

   :::tip
   If you used our `just` script to run the node with default settings, the chain ID is `warden_1337-1`.
   :::

### Option 2. Connect to Chiado

To deploy an EVM contract on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview), you need to install its binary and fund your key, as shown in the following steps:

1. If you haven't yet, [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Clone the repository with Warden source code. Then build the binary and initialize the chain home folder:
  
   ```bash
   git clone --depth 1 --branch v0.5.3 https://github.com/warden-protocol/wardenprotocol
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

6. Check your balance:
   
   ```bash
   wardend query bank balances my-key-name --node https://rpc.chiado.wardenprotocol.org:443
   ```

7. The next steps require the private key associated with this account. To get it, run this:

   ```bash
   wardend keys export my-key-name --unarmored-hex --unsafe
   ```

## 2. Create an EVM project

1. Create a new directory `/warden-smart-contract` for your project and navigate there:

    ```bash
    mkdir warden-smart-contract
    cd warden-smart-contract
    ```

2. Initialize a new Foundry project:

    ```bash
    forge init
    ```

## 3. Create a smart contract

Your contract is already created at `src/Counter.sol`. We will reuse and deploy the same contract.

## 4. Compile and Deploy the contract

To compile & deploy your contract, run this command:

```bash
export PRIVATE_KEY=<your-private-key>
```

```bash
forge create --rpc-url http://127.0.0.1:8545 --private-key $PRIVATE_KEY src/Counter.sol:Counter
```

You'll see an output similar to the following:

```bash
Deployer: 0x6Ea8aC1673402989e7B653aE4e83b54173719C30
Deployed to: 0x2AAbb1a9b8EdE05f183FfD90A324ce02A349F6e5
Transaction hash: 0x38c67c5bd92589ec6e31c2204a577e4c8d365099daad1382ff2596893b405249
```

## 5. Interact with the contract

1. Set up the Contract Address

Store the contract address for convenience

   ```bash
   export CONTRACT_ADDRESS=<your-deployed-contract-address>
   ```

   Note: The contract address is "Deployed to" address you would have seen in your previous step.

   You can also verify if the contract has been deployed on this address by:

   ```bash
   cast code $CONTRACT_ADDRESS --rpc-url http://127.0.0.1:8545 
   ```

   You will see the following output:

   ```bash
   0x6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212201c88540d2739bb0e4f6179275ef6ff63cf1c34ed53189691f9dd0033f4382a0264736f6c634300081c0033
   ```
   
2. Read the current number

   ```bash
   cast call $CONTRACT_ADDRESS "number()" --rpc-url http://127.0.0.1:8545
   ```

   This will return a hex value like:

   ```bash
   0x0000000000000000000000000000000000000000000000000000000000000000
   ```

   (representing 0)

3. Set a New Number

   ```bash
   cast send $CONTRACT_ADDRESS "setNumber(uint256)" 42 \
    --private-key $PRIVATE_KEY \
    --rpc-url http://127.0.0.1:8545
   ```     

   You will see the following output:

   ```bash
   blockHash               0x1e755e7f98361a33b81f98018b75f6aa935b8070a61bf4656991551b657d1c96
   blockNumber             14640
   contractAddress         
   cumulativeGasUsed       43494
   effectiveGasPrice       8
   from                    0x6Ea8aC1673402989e7B653aE4e83b54173719C30
   gasUsed                 43494
   logs                    []
   logsBloom               0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
   root                    
   status                  1 (success)
   transactionHash         0xaed1d70baf7d277cad64935146ec46fc6c3842c6d965c88371a75c458fff7533
   transactionIndex        0
   type                    2
   blobGasPrice            
   blobGasUsed             
   authorizationList       
   to                      0xb9dE7e835C44D6301A8EEF6658720198a17b0B3A
   ```

   Your tx transaction receipt will include:

   - status: 1 (success) indicating the transaction was successful
   - blockNumber, transactionHash, and other transaction details

4. Verify the Number Changed

   ```bash
   cast call $CONTRACT_ADDRESS "number()" --rpc-url http://127.0.0.1:8545
   ```

   This should return `0x000000000000000000000000000000000000000000000000000000000000002a` (hex for 42)

5. Increment the Number

   ```bash
   cast send $CONTRACT_ADDRESS "increment()" \
    --private-key $PRIVATE_KEY \
    --rpc-url http://127.0.0.1:8545
    ```

   Again, you will see a message similar to message above with `1` indicating success.

6. Verify Increment

   ```bash
   cast call $CONTRACT_ADDRESS "number()" --rpc-url http://127.0.0.1:8545
   ```

   This should return `0x000000000000000000000000000000000000000000000000000000000000002b` (hex for 43)

## Understanding the Commands

`cast call`

- Used for reading data from the blockchain
- Doesn't modify state
- Free (no gas needed)
- Format: cast call <contract-address> "<function-signature>" [arguments]

`cast send`

- Used for sending transactions that modify blockchain state
- Requires gas
- Requires signing with a private key
- Format: cast send <contract-address> "<function-signature>" [arguments] --private-key <key>

**Reading Transaction Results**
When you send a transaction, check these fields in the receipt:

- `status`: 1 means success
- `gasUsed` shows how much gas was consumed
- `transactionHash` can be used to look up the transaction
- `blockNumber` shows which block included the transaction

**Common Issues and Solutions**

"null response" error

Add --legacy flag to your cast send command
Example: cast send $CONTRACT_ADDRESS "setNumber(uint256)" 42 --private-key $PRIVATE_KEY --rpc-url http://127.0.0.1:8545 --legacy

**Transaction fails**

Verify your private key is correct
Check that you have enough funds in your account
Verify the contract address exists using cast code $CONTRACT_ADDRESS --rpc-url http://127.0.0.1:8545

**Reading hex values**

Values are returned in hex format
0x2a = 42 in decimal
0x2b = 43 in decimal

If you encounter any issues, please reach out to us in [Discord](https://discord.com/invite/warden) or [Twitter](https://twitter.com/wardenprotocol).

Happy coding! 🚀
