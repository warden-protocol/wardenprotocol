---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set up a Warden account

## Overview

Before building an application on Warden, it's always required to create and fund a [key](/learn/glossary#key) (account) on a local chain or a testnet. This guide explains how to do it.

To get started with application development, you can [set an account on a local chain](#set-up-an-account-on-a-local-chain) and then [deploy an EVM/WASM contract](/category/deploy-smart-contracts-on-warden) locally. Alternatively, you can [set up an account on Chiado](#set-up-an-account-on-chiado) and deploy your contract there.

Some situations may require slightly different or additional steps—for example, you may need to use an existing key instead of a new one or to create a [Space](/learn/glossary#space). Whenever it happens, refer to [useful node commands](#useful-node-commands).

## Set up an account on a local chain

To deploy an EVM contract locally, you need to run a local chain and make sure it's configured properly.

### 1. Run a local chain

:::tip
The simplest way to run a local chain is using our `just` script, as shown below. Alternatively, you can configure the chain manually to run it with custom settings. To learn more, follow this guide: [Run a local chain](/operate-a-node/run-a-local-chain).
:::

1. [Install Go](https://go.dev/doc/install) 1.24 or later.

2. [Install just](https://github.com/casey/just) 1.34.0 or later:

   ```
   brew install just
   ```

3. Clone the Warden Protocol repository and navigate to the root directory:
   
   ```bash
   git clone https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

   If you need to test the latest testnet release locally, run this instead:
   
   ```bash
   git clone --depth 1 --branch v0.6.3 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

4. Execute the `just` script:
      
   ```bash
   just localnet
   ```

   You'll see blocks being produced and height incrementing.
   
   :::note
   You can check the settings of your node in the genesis file: `$HOME/.warden/config/genesis.json`. There you'll find two validator addresses, a [Keychain](/learn/glossary#keychain), a [Space](/learn/glossary#space), and other settings. See `accounts`, `keychains`, `spaces`, etc.
   :::

### 2. Check your key

1. Check the list of available keys (local accounts) and note down your **key name**.

   ```bash
   wardend keys list
   ```

   If you used our `just` script to run the node with default settings, the local account name is `shulgin`. However, you can [create](#create-a-key) and [fund](#fund-a-key) additional keys if needed.

2. Check the local account balance to make sure it has funds:
   
   <Tabs>
   <TabItem value="default" label="shulgin">
   ```bash
   wardend query bank balances shulgin
   ```
   </TabItem>
   <TabItem value="custom" label="custom key">
   ```bash
   wardend query bank balances my-key-name
   ```
   </TabItem>
   </Tabs>

### 3. Get your private key

To deploy an EVM smart contract, you'll also need the **private key** associated with your account. Run the following command and note down the private key:

<Tabs>
<TabItem value="default" label="shulgin">
```bash
wardend keys export shulgin --unarmored-hex --unsafe
```
</TabItem>
<TabItem value="custom" label="custom key">
```bash
wardend keys export my-key-name --unarmored-hex --unsafe
```
</TabItem>
</Tabs>

## Set up an account on Chiado

### 1. Connect to Chiado

To connect to the [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview), take the following steps:

1. [Install Go](https://go.dev/doc/install) 1.24 or later.

2. [Install just](https://github.com/casey/just) 1.34.0 or later:

   ```
   brew install just
   ```

3. Clone the Warden Protocol repository and navigate to the root directory:

   ```bash
   git clone --depth 1 --branch v0.6.3 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

4. Build the binary and initialize the chain's home directory:
  
   ```bash
   just wardend build
   just wardend install
   wardend init my-chain-moniker
   ```

### 2. Create and fund a key

Now you need to create a fund a key, as shown below. Alternatively, you can find or restore an existing key. To learn more, see [Useful node commands](#useful-node-commands).

1. To create a new key, run the following command. Specify the key name.

   ```bash
   wardend keys add my-key-name
   ```

2. Write down the **mnemonic phrase** and **public address** of the new account. You'll need this information to interact with the chain and restore the account. You may also need the **name** you specified when creating your key.

   :::warning
   The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
   :::

3. Fund your key using the [Chiado faucet](https://faucet.chiado.wardenprotocol.org) and the public address obtained in the previous step.

4. Check your balance on Chiado:
   
   ```bash
   wardend query bank balances my-key-name --node https://rpc.chiado.wardenprotocol.org:443
   ```

### 3. Get your private key

To deploy an EVM smart contract, you'll also need the **private key** associated with your account. Run the following command and note down the private key:

```bash
wardend keys export my-key-name --unarmored-hex --unsafe
```

## Useful node commands

This subsection lists some useful [node commands](/operate-a-node/node-commands) typically required to manage your account when deploying a smart contract on Warden.

### Note: Chain-specific settings

Some example node commands vary depending on the chain and initial setup:

Transactions on the [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview) require specifying the following:
- The chain ID: `--chain-id chiado_10010-1`
- The RPC address: `--node https://rpc.chiado.wardenprotocol.org:443`

If you [run a local chain using our script](/operate-a-node/run-a-local-chain#option-1-run-a-just-script), the chain will have the default settings:
- The default key name (the genesis account): `shulgin`
- The chain ID: `warden_1337-1`

If you [configure a local chain manually](/operate-a-node/run-a-local-chain#option-2-configure-manually), the chain will have custom settings:
- A custom key name: `my-key-name` in example commands
- A a custom chain ID formatted as `chain_123-1`

### Get your chain ID

In some of the commands, you need to specify your chain ID. The actual value depends on the configuration you used when running your node.

To check your chain ID, run this:

```bash
wardend status
```

See the `network` field in the output.

:::tip
If you used our `just` script to run the node with default settings, the chain ID is `warden_1337-1`.
:::

### Create a key

To create a new key, run the following command. Specify the key name.

```bash
wardend keys add my-key-name
```

Write down the **mnemonic phrase**, **public address** of the new account. You'll need this information to interact with the chain and [restore the key](#restore-a-key). You may also need the **name** you specified when creating your key.

:::warning
The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
:::

:::tip
Keys are created locally, but if you [fund your key](#fund-a-key) in a testnet, your account will be automatically registered on the network.
:::

### Restore a key

To restore an existing key, run the command below, specifying the [key name](#get-the-key-name). You will be prompted to enter the mnemonic you noted down when [creating a key](#create-a-key).

```bash
wardend keys add my-key-name --recover
```

### Get the key name

To manage your key, you need to know it's **name**. If you don't remember the name of an existing key, just run the following command, and it'll list all your keys: 

```bash
wardend keys list
```

:::tip
If you used our `just` script to run the local node with default settings, the local account name is `shulgin`. But you can always [create additional keys](#create-a-key).
:::

### Get the private key

To get the **private key** associated with your account, run the following command. Specify your [key name](#get-the-key-name).

<Tabs>
<TabItem value="local-default" label="shulgin">
```bash
wardend keys export shulgin --unarmored-hex --unsafe
```
</TabItem>
<TabItem value="custom" label="custom key">
```bash
wardend keys export my-key-name --unarmored-hex --unsafe
```
</TabItem>
</Tabs>

### Get the public address

You can always check your **public address** by running the following command. Specify your [key name](#get-the-key-name).

<Tabs>
<TabItem value="local-default" label="shulgin">
```bash
wardend keys show shulgin --address
```
</TabItem>
<TabItem value="custom" label="custom key">
```bash
wardend keys show my-key-name --address
```
</TabItem>
</Tabs>

### Fund a key

Setting up a local chain involves creating a genesis account with some funds. However, after that you may need to [create a new key](#create-a-key) and transfer assets from the genesis account to the new one. Run the command below, specifying both [keys' names](#get-the-key-name):

<Tabs>
<TabItem value="local-default" label="Local node: default settings">
```bash
wardend tx bank send \
  shulgin \
  $(wardend keys show --address my-key-name) \
  1000000000000000000award \
  --chain-id warden_1337-1
```
</TabItem>
<TabItem value="custom" label="Local node: custom settings">
```bash
wardend tx bank send \
  my-key-name \
  $(wardend keys show --address my-new-key-name) \
  1000000000000000000award \
  --chain-id chain_123-1
```
</TabItem>
</Tabs>

To fund your key on Chiado, just use your [public address](#get-the-public-address) with [Chiado faucet](https://faucet.chiado.wardenprotocol.org/). 

:::tip
Keys are [created](#create-a-key) locally, but if you [fund your key](#fund-a-key) in a testnet, your account will be automatically registered on the network.
:::

### Check the key balance

After [funding your key](#fund-a-key), you can check your balance by running the following command. Specify your [key name](#get-the-key-name).

<Tabs>
<TabItem value="local-default" label="Local node: default key">
```bash
wardend query bank balances shulgin
```
</TabItem>
<TabItem value="local-custom" label="Local node: custom key">
```bash
wardend query bank balances my-key-name
```
</TabItem>
<TabItem value="chiado" label="Chiado">
```bash
wardend query bank balances my-key-name --node https://rpc.chiado.wardenprotocol.org:443
```
</TabItem>
</Tabs>

### Create a Space

To create a Space, run the following command. Specify your [key name](#get-the-key-name) and the chain ID:
   
<Tabs>
<TabItem value="local-default" label="Local node: default settings">
```bash
wardend tx warden new-space \
  --from shulgin \
  --chain-id warden_1337-1
```
</TabItem>
<TabItem value="local-custom" label="Local node: custom settings">
```bash
wardend tx warden new-space \
  --from my-key-name \
  --chain-id chain_123-1
```
</TabItem>
<TabItem value="chiado" label="Chiado">
```bash
wardend tx warden new-space \
  --from my-key-name \
  --fees 400000000award \
  --chain-id chiado_10010-1 \
  --node https://rpc.chiado.wardenprotocol.org:443
```
</TabItem>
</Tabs>

:::note
A Space is a hub allowing its owner to manage multiple cryptographic keys that identify users and secure the ownership of wallets.
:::

### List Spaces

To get the 5 most recently created Spaces, run the following:

<Tabs>
<TabItem value="local-default" label="Local node">
```bash
wardend query warden spaces \
  --page-limit 5 \
  --page-reverse
```
</TabItem>
<TabItem value="chiado" label="Chiado">
```bash
wardend query warden spaces \
  --page-limit 5 \
  --page-reverse \
  --node https://rpc.chiado.wardenprotocol.org:443
```
</TabItem>
</Tabs>

For each Space, this command will return its creator, ID, and owners:

```
spaces:
- creator: warden1y8jvrg3rmzq4evguakjqqny99au5ys92rnf2l8
  id: "2"
  owners:
  - warden1y8jvrg3rmzq4evguakjqqny99au5ys92rnf2l8
- creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
  id: "1"
  owners:
  - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
```

If you've just [created a Space](#create-a-space) and wish to find it, look for one associated with your [public address](#get-the-public-address).

## Next steps

After setting up your account on a local chain or a testnet, you can deploy an EVM or WASM contract on Warden:

- [Deploy an EVM contract](deploy-smart-contracts-on-warden/deploy-an-evm-contract)
- [Deploy a WASM contract](deploy-smart-contracts-on-warden/deploy-a-wasm-contract)
