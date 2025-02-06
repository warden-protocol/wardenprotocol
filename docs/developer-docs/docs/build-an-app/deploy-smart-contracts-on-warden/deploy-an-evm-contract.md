---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy an EVM contract

## Overview

The [`x/evm`](/learn/warden-protocol-modules/external-modules#xevm) Warden module allows executing **Ethereum Virtual Machine (EVM)** contracts charged by [Evmos](https://docs.evmos.org/protocol/modules/evm) and written in **Solidity**.

This guide explains how to create and deploy a Solidity smart contract on a Warden local chain or on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview). You'll deploy a simple counter contract using [Foundry](https://book.getfoundry.sh)'s toolset.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running the following command:

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

### Option 2. Connect to Chiado

To deploy an EVM contract on [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview), you need to install its binary and fund your key, as shown in the following steps:

1. If you haven't yet, [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Clone the repository with Warden source code. Then build the binary and initialize the chain's home directory:
  
   ```bash
   git clone --depth 1 --branch v0.5.4 https://github.com/warden-protocol/wardenprotocol
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

Initialize a new Foundry project and navigate to its directory:

```bash
forge init warden-smart-contract --no-commit
cd warden-smart-contract
```

## 3. Create a smart contract

After you initialize a Foundry project, the script will automatically create a sample contract named `Counter.sol` in the `/src` directory:

```sol title="/warden-smart-contract/src/Counter.sol"
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    // A function for setting a new number
    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    // A function for incrementing the number
    function increment() public {
        number++;
    }
}
```

This is a counter contract with two functions: for changing the `number` variable and for incrementing it.

In the following steps, we're going to deploy this contract without modification.

## 4. Compile and deploy the contract

1. Set your private key from [Step 1](#1-prepare-the-chain) as an environment variable:

   ```bash
   export PRIVATE_KEY=my-private-key
   ```
   
   :::warning
   In production, never store private keys directly in environment variables. Consider using encrypted keystores or secure key management solutions like `env`.
   :::

1. Set the RPC URL as an environment variable. Specify the standard localhost address or Chiado's EVM endpoint:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   export RPC_URL=http://127.0.0.1:8545 
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   export RPC_URL=https://evm.chiado.wardenprotocol.org
   ```
   </TabItem>
   </Tabs>

   :::tip
   If you're running a local chain and deploying the contract on different machines, you need to specify your chain's host address. To get it, just execute `wardend status` on the machine hosting the chain.
   :::

3. To compile and deploy the contract, run this command:

   ```bash
   forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/Counter.sol:Counter
   ```
   
   You'll see an output similar to the following:
   
   ```bash
   Deployer: 0x6Ea8aC1673402989e7B653aE4e83b54173719C30
   Deployed to: 0x2AAbb1a9b8EdE05f183FfD90A324ce02A349F6e5
   Transaction hash: 0x38c67c5bd92589ec6e31c2204a577e4c8d365099daad1382ff2596893b405249
   ```

4. Note down the value returned as `Deployed to`—that's your **contract address**. Set it as an environment variable: 

   ```bash
   export CONTRACT_ADDRESS=my-contract-address
   ```

## 5. Verify the deployment

To verify that the contract has been deployed on the address from the previous step, run this:

```bash
cast code $CONTRACT_ADDRESS --rpc-url $RPC_URL
```

:::note
The [`cast code`](https://book.getfoundry.sh/reference/cast/cast-code) Foundry command allows you to get the bytecode of a contract.
:::

You'll see an output similar to the following:

```bash
0x6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212201c88540d2739bb0e4f6179275ef6ff63cf1c34ed53189691f9dd0033f4382a0264736f6c634300081c0033
```

## 6. Interact with the contract

Now you can interact with the contract: adjust and increment the counter number.
   
1. Get the current number:

   ```bash
   cast call $CONTRACT_ADDRESS "number()" --rpc-url $RPC_URL
   ```
   
   :::note
   The [`cast call`](https://book.getfoundry.sh/reference/cast/cast-call) Foundry command allows you to read data from the chain. In this example, it calls the `number()` getter function: the Solidity compiler automatically generated it from the `number` variable in the sample contract.
   :::

   This will return a hex value representing 0:

   ```bash
   0x0000000000000000000000000000000000000000000000000000000000000000
   ```

2. Set a new number:

   ```bash
   cast send $CONTRACT_ADDRESS "setNumber(uint256)" 42 \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

   :::note
   The [`cast send`](https://book.getfoundry.sh/reference/cast/cast-send) Foundry command allows you to send transactions. Note that it requires signing a transaction with your private key. In this example, `cast send` calls the `setNumber()` function of the sample contract.
   :::    

   The output will include `status: 1 (success)` indicating that the transaction was successful. You'll also see the block number and hash, the gas used, the transaction hash, and other details:

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
   # highlight-next-line                    
   status                  1 (success)
   transactionHash         0xaed1d70baf7d277cad64935146ec46fc6c3842c6d965c88371a75c458fff7533
   transactionIndex        0
   type                    2
   blobGasPrice            
   blobGasUsed             
   authorizationList       
   to                      0xb9dE7e835C44D6301A8EEF6658720198a17b0B3A
   ```

3. Verify the number change:

   ```bash
   cast call $CONTRACT_ADDRESS "number()" --rpc-url $RPC_URL
   ```

   This should return a hex value representing 42:

   ```
   0x000000000000000000000000000000000000000000000000000000000000002a
   ```

4. Increment the number:

   ```bash
   cast send $CONTRACT_ADDRESS "increment()" \
     --private-key $PRIVATE_KEY \
     --rpc-url $RPC_URL
   ```

   In the output, you'll see the transaction details again, including the status code `1`, indicating success.

6. Verify the increment:

   ```bash
   cast call $CONTRACT_ADDRESS "number()" --rpc-url $RPC_URL
   ```

   This should return a hex value representing 43

   ```
   0x000000000000000000000000000000000000000000000000000000000000002b
   ```

## Troubleshooting

If your transaction fails, try the following:

  - Verify that your private key is correct. See [Step 1](#1-prepare-the-chain).
  - Make sure you have enough funds in your account, as shown in [Step 1](#1-prepare-the-chain). If funds are insufficient, you may need to [run a local chain](/operate-a-node/run-a-local-chain) from scratch or use [Chiado faucet](https://faucet.chiado.wardenprotocol.org).
  - Verify your contract address, as shown in [Step 5](#5-verify-the-deployment).

If you encounter any other issues, please reach out to us in [Discord](https://discord.com/invite/wardenprotocol) or [Twitter](https://twitter.com/wardenprotocol).

Happy coding! 🚀

## Next steps

After deploying a basic EVM smart contract, start using Warden precompiles to call Warden modules in your contract. This will allow you to access Warden-specific features such as managing Spaces and Keychains, creating Rules, getting data from oracles, and so on.

See the following sections:

- [Call Warden modules in your contract](/category/interact-with-warden-modules)
- [Precompiles](/category/precompiles)

