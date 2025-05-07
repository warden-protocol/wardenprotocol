---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deploy an EVM contract

## Overview

The [`x/evm` Warden module](/learn/warden-protocol-modules/external-modules#xevm) allows executing **Ethereum Virtual Machine (EVM)** contracts charged by [Evmos](https://docs.evmos.org/protocol/modules/evm) and written in **Solidity**.

This guide explains how to create and deploy a Solidity smart contract on a Warden local chain or on a testnet. You'll deploy a simple counter contract using [Foundry](https://book.getfoundry.sh)'s toolset.

:::tip
Existing Solidity contracts are easy to deploy on Warden, so you can seamlessly port applications from any EVM-compatible chain to Warden and reach new users. You can call [Warden precompiles](../precompiles/introduction) to [interact with Warden modules](../interact-with-warden-modules/introduction), accessing all core features of Warden Protocol. For advanced usage of EVM contracts with AI Agents, refer to [Build an onchain AI Agent](/build-an-agent/build-an-onchain-ai-agent/introduction).
:::

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Foundry](https://book.getfoundry.sh/getting-started/installation) by running the following command:

  ```bash
  curl -L https://foundry.paradigm.xyz | bash \ 
  foundryup
  ```

- [Set up a Warden account](../set-up-a-warden-account) on a local chain or a testnet. Note down your **private key**.

- If you're deploying on a local chain, make sure it's running. You can start your chain by running `wardend start` in a separate terminal window.

## 1. Create an EVM project

Initialize a new Foundry project and navigate to its directory:

```bash
forge init warden-smart-contract --no-commit
cd warden-smart-contract
```

## 2. Create a smart contract

After you initialize a Foundry project, the script will automatically create a sample contract named `Counter.sol` in the `src` directory:

```sol title="warden-smart-contract/src/Counter.sol"
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

## 3. Compile and deploy the contract

1. Set your private key as an environment variable. (You obtained it when [setting up your account](../set-up-a-warden-account).)

   ```bash
   export PRIVATE_KEY=my-private-key
   ```
   
   :::warning
   In production, never store private keys directly in environment variables. Consider using encrypted keystores or secure key management solutions like `env`.
   :::

2. Set the RPC URL as an environment variable. Specify the standard localhost address or Chiado's EVM endpoint:

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

## 4. Verify the deployment

To verify that the contract has been deployed on the address from the previous step, run this:

```bash
cast code $CONTRACT_ADDRESS --rpc-url $RPC_URL
```

:::note
The [`cast code` Foundry command](https://book.getfoundry.sh/reference/cast/cast-code) allows you to get the bytecode of a contract.
:::

You'll see an output similar to the following:

```bash
0x6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea26469706673582212201c88540d2739bb0e4f6179275ef6ff63cf1c34ed53189691f9dd0033f4382a0264736f6c634300081c0033
```

## 5. Interact with the contract

Now you can interact with the contract: adjust and increment the counter number.
   
1. Get the current number:

   ```bash
   cast call $CONTRACT_ADDRESS "number()" --rpc-url $RPC_URL
   ```
   
   :::note
   The [`cast call` Foundry command](https://book.getfoundry.sh/reference/cast/cast-call) allows you to read data from the chain. In this example, it calls the `number()` getter function: the Solidity compiler automatically generated it from the `number` variable in the sample contract.
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
   The [`cast send` Foundry command](https://book.getfoundry.sh/reference/cast/cast-send) allows you to send transactions. Note that it requires signing a transaction with your private key. In this example, `cast send` calls the `setNumber()` function of the sample contract.
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

  - Verify that your  [private key](../set-up-a-warden-account#get-the-private-key) is correct.
  - [Check your balance](../set-up-a-warden-account#check-the-key-balance) to make sure you have enough funds in your account. If funds are insufficient, you may need to [fund your key](../set-up-a-warden-account#fund-a-key) or [run a local chain](/operate-a-node/run-a-local-chain) from scratch.
  - Verify your contract address, as shown in [Step 4](#4-verify-the-deployment).

If you encounter any other issues, please reach out to us in [Discord](https://discord.com/invite/wardenprotocol) or [Twitter](https://twitter.com/wardenprotocol).

Happy coding! 🚀

## Next steps

After deploying a basic EVM smart contract, you can start using Warden precompiles to call Warden modules in your contract. This will allow you to access Warden-specific features such as managing Spaces and Keychains, creating Rules, getting data from oracles, and so on. See the following sections:

- [Interact with Warden modules](../interact-with-warden-modules/introduction)
- [Precompiles](../precompiles/introduction)

For advanced usage of EVM contracts with AI Agents, refer to [Build an onchain AI Agent](/build-an-agent/build-an-onchain-ai-agent/introduction).
