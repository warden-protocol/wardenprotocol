---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Keychain

## Overview

To become a **Keychain operator**, you need to create and configure a Keychain entity onchain, as shown in this guide. To interact with the chain,  you'll use [node commands](/operate-a-node/node-commands).

You can either run a [local chain](/operate-a-node/run-a-local-chain) to test your configuration or interact with [Chiado testnet](/operate-a-node/chiado-testnet/join-chiado). In the provided code snippets, you'll find tabs with different versions of node commands.

:::tip
You can skip this guide and test a preconfigured Keychain. Just run a local node using our [`just` script](/operate-a-node/run-a-local-chain#option-1-run-a-just-script) and [start fulfilling requests](fulfill-requests-from-cli).
:::

## 1. Prepare the chain

### Option 1. Run a local chain

1. Run a local chain as explained here: [Run a local chain](/operate-a-node/run-a-local-chain). Note that you'll need to [install Go](https://golang.org/doc/install) 1.22.3 and [just](https://github.com/casey/just) 1.34.0 or later.
   
   For the rest of this guide, we'll assume you have a running Warden Protocol node with a local account (key) that has a few [WARD tokens](/tokens/ward-token/ward). You'll use these tokens to fund the Keychain and its Writers.
   
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
   
4. In some of the commands, you'll also need to specify your chain ID. The actual value depends on the configuration you used when running your node.

   To check your chain ID, run this:

   ```bash
   wardend status
   ```

   See the `network` field in the output.

   :::tip
   If you used our `just` script to run the node with default settings, the chain ID is `warden_1337-1`.
   :::

### Option 2. Connect to Chiado

1. If you haven't yet, [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Clone the repository with Warden source code. Then build the binary and initialize the chain's home directory:
  
   ```bash
   git clone --depth 1 --branch v0.6.2 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   just wardend build
   just wardend install
   wardend init my-chain-moniker
   ```

3. Create a new key:

   ```
   wardend keys add my-key-name
   ```

4. Write down the **mnemonic phrase** and the **address** of the new account. You'll need this information to interact with the chain and restore the account.

   :::warning
   The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
   :::

   :::tip
   You can always check your public address by running this command:

   ```
   wardend keys show my-key-name --address
   ```
   :::

5. Fund your key using [Chiado faucet](https://faucet.chiado.wardenprotocol.org) and the public address returned in the previous step.

6. Check your balance. Here and in other commands, you need to add the `--node` flag with an RPC URL for connecting to Chiado. 
   
   ```
   wardend query bank balances my-key-name --node https://rpc.chiado.wardenprotocol.org:443
   ```

## 2. Register a Keychain

The following steps show how to register a new Keychain entity onchain.

1. Run this command to create a new Keychain:

   <Tabs>
   <TabItem value="local-default" label="Local node: default settings">
   ```bash
   wardend tx warden new-keychain \
     --from shulgin \
     --name 'my-keychain-name' \
     --chain-id warden_1337-1
   ```
   </TabItem>
   <TabItem value="local-custom" label="Local node: custom settings">
   ```bash
   wardend tx warden new-keychain \
     --from my-key-name \
     --name 'my-keychain-name' \
     --chain-id chain_123-1
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend tx warden new-keychain \
     --from my-key-name \
     --name 'my-keychain-name' \
     --fees 400000000award \
     --chain-id chiado_10010-1 \
     --node https://rpc.chiado.wardenprotocol.org:443
   ```
   </TabItem>
   </Tabs>

   Specify the required details:

   - `name`: The Keychain name
   - `from`: Your local account name (key name)
   - `chain-id`: The ID of the chain you're running

   Optionally, you can also set the following:

   - `description`: The Keychain description
   - `keychain-fees`: Keychain fees in aWARD (0.000000000000000001 WARD)
        - `key_req`: A fee for creating a key pair
        - `sig_req`: A fee for signing a transaction
   - For more settings, see `wardend tx warden new-keychain --help`.

2. Confirm the transaction. A new Keychain object will be created onchain.

3. Every Keychain is created with a **Keychain ID** that identifies it in key and signature requests and collects fees from users. You'll need this ID to operate your Keychain. Run the following command and check the `id` field in the output:

   <Tabs>
   <TabItem value="local-default" label="Local node">
   ```bash
   wardend query warden keychains
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend query warden keychains --node https://rpc.chiado.wardenprotocol.org:443
   ```
   </TabItem>
   </Tabs>

   ```bash
   keychains:
   - admins:
     - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     description: my-keychain-description
     fees:
       key_req:
      - amount: "100"
        denom: award
    sig_req:
      - amount: "1"
        denom: award
     # highlight-next-line
     id: "1"
     name: my-keychain-name
   pagination:
     total: "1"
   ```

## 3. Add a Keychain Writer

A Keychain Writer is an account that can write Keychain results (public keys and signatures) to the chain. The Keychain Writers list is essentially an allowlist of accounts that can interact on behalf of the Keychain.

To add a Keychain Writer, take these steps:

1. Create a new key (account) with a preferred name:

   ```bash
   wardend keys add my-keychain-writer-name
   ```

2. Write down the **mnemonic phrase** and the **address** of the new account. You'll need this information to interact with the chain and restore the account. Note that only this address will be able to publish signatures and public keys on behalf of the Keychain.

   :::warning
   The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
   :::

   :::tip
   You can always check your public address by running this command:

   ```
   wardend keys show my-keychain-writer-name --address
   ```
   :::

3. Now you need to fund the account. If you're running a local chain, execute the command below. After `send`, specify your key name. Also set the Keychain Writer name and the chain ID.

    <Tabs>
    <TabItem value="local-default" label="Local node: default settings">
    ```bash
    wardend tx bank send \
      shulgin \
      $(wardend keys show --address my-keychain-writer-name) \
      1000000000000000000award \
      --chain-id warden_1337-1
    ```
    </TabItem>
    <TabItem value="local-custom" label="Local node: custom settings">
    ```bash
    wardend tx bank send \
      my-key-name \
      $(wardend keys show --address my-keychain-writer-name) \
      1000000000000000000award \
      --chain-id chain_123-1
    ```
    </TabItem>
    </Tabs>

    If you're interacting with Chiado, fund your key using [Chiado faucet](https://faucet.chiado.wardenprotocol.org) and the public address returned in the previous step.

4. Check the Keychain Writer balance:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend query bank balances my-keychain-writer-name
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend query bank balances my-keychain-writer-name --node https://rpc.chiado.wardenprotocol.org:443
   ```
   </TabItem>
   </Tabs>   

   :::tip
   In this example, we used `$(wardend keys show --address my-keychain-writer-name)` to get the Keychain Writer address by its name. Alternatively, you can just specify the address obtained earlier.
   :::

5. Finally, add the Writer account to your Keychain. In the `--from` flag, specify your key name. Also set the Keychain ID from [Step 2.3](#2-register-a-keychain), your Keychain writer name, and the chain ID:
   
   <Tabs>
   <TabItem value="local-default" label="Local node: default settings">
   ```bash
   wardend tx warden add-keychain-writer \
     --from shulgin \
     --keychain-id 1 \
     --writer $(wardend keys show --address my-keychain-writer-name) \
     --chain-id warden_1337-1
   ```
   </TabItem>
   <TabItem value="local-custom" label="Local node: custom settings">
   ```bash
   wardend tx warden add-keychain-writer \
     --from my-key-name \
     --keychain-id 1 \
     --writer $(wardend keys show --address my-keychain-writer-name) \
     --chain-id chain_123-1
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend tx warden add-keychain-writer \
     --from my-key-name \
     --keychain-id 1 \
     --writer $(wardend keys show --address my-keychain-writer-name) \
     --fees 400000000award \
     --chain-id chiado_10010-1 \
     --node https://rpc.chiado.wardenprotocol.org:443
   ```
   </TabItem>
   </Tabs>
  
6. To check the result, get the list of Keychains:

   <Tabs>
   <TabItem value="local" label="Local node">
   ```bash
   wardend query warden keychains
   ```
   </TabItem>
   <TabItem value="chiado" label="Chiado">
   ```bash
   wardend query warden keychains --node https://rpc.chiado.wardenprotocol.org:443
   ```
   </TabItem>
   </Tabs>   

   In the output, find your Keychain and check the `writers` list:

   ```bash
   keychains:
   - admins:
     - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     description: my-keychain-description
     fees:
       key_req:
      - amount: "100"
        denom: award
    sig_req:
      - amount: "1"
        denom: award
     id: "1"
     name: my-keychain-name
     # highlight-start
     writers:
       - warden18my6wqsrf5ek85znp8x202wwyg8rw4fqhy54k2
     # highlight-end
   pagination:
     total: "1"
   ```

## Next steps

The next steps depend on your goals:

- To start fulfilling key and signature requests, follow this guide: [Fulfill requests from CLI](fulfill-requests-from-cli).
- To start building a Keychain service, follow [Build a Keychain app](../build-a-keychain-app).