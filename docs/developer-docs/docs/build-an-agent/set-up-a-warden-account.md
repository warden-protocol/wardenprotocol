---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Set up a Warden account (?)

## Overview

Before building an application on Warden, it's always required to create and fund a [key](/learn/glossary#key) (account) on a local chain or a testnet. This guide explains how to do it.

To get started with application development, you can [set an account on a local chain](#set-up-an-account-on-a-local-chain) and then [deploy an EVM contract](deploy-an-evm-contract) or a [WASM contract](deploy-a-wasm-contract) locally. Alternatively, you can [set up an account on Chiado](#set-up-an-account-on-chiado) and deploy your contract there.

Some situations may require slightly different or additional steps—for example, you may need to use an existing key instead of a new one or to create a [Space](/learn/glossary#space). Whenever it happens, refer to [useful node commands](#useful-node-commands).

## Set up an account on a local chain

To deploy a smart contract locally, you need to run a local chain and make sure it's properly configured.

### 1. Run a local chain

1. Meet the prerequisites:

   - [Install Go](https://go.dev/doc/install) 1.24 or later.
   - [Install just](https://github.com/casey/just) 1.34.0 or later: `brew install just`.
   - [Install jq](https://jqlang.org/download/).

2. Clone the Warden Protocol repository and navigate to the root directory:
   
   ```bash
   git clone https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

   If you wish to test the latest testnet release locally, run this instead:
   
   ```bash
   git clone --depth 1 --branch v0.6.3 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

3. Execute the `just` script:
      
   ```bash
   just localnet
   ```

   You'll see blocks being produced and height incrementing.
   
:::tip
You can check your node's initial settings in the genesis file: `$HOME/.warden/config/genesis.json`. Here you'll find two validator addresses, a [Keychain](/learn/glossary#keychain), a [Space](/learn/glossary#space), and other settings (see `accounts`, `keychains`, `spaces`, etc.).
:::

:::note
Learn more: [Run a local chain](/operate-a-node/run-a-local-chain).
:::

### 2. Check your key

1. Check the list of available keys (local accounts) and note down your **key name**.

   ```bash
   wardend keys list
   ```

   The default key name is `shulgin`. However, you can [create](#create-a-key) and [fund](#fund-a-key) additional keys if needed.

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

To connect to the Chiado testnet, take the following steps:

1. Meet the prerequisites:

   - [Install Go](https://go.dev/doc/install) 1.24 or later.
   - [Install just](https://github.com/casey/just) 1.34.0 or later: `brew install just`.

2. Clone the Warden Protocol repository and navigate to the root directory:

   ```bash
   git clone --depth 1 --branch v0.6.3 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

3. Build the binary and initialize the chain's home directory:
  
   ```bash
   just wardend build
   just wardend install
   wardend init my-chain-moniker
   ```

:::note
Learn more: Join Chiado.
:::   

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

   Alternatively, you can use [Chiado block explorer](https://testnet.warden.exploreme.pro).

### 3. Get your private key

To deploy an EVM smart contract, you'll also need the **private key** associated with your account. Run the following command and note down the private key:

```bash
wardend keys export my-key-name --unarmored-hex --unsafe
```

## Useful node commands

This subsection lists some useful [node commands](/operate-a-node/node-commands) typically required to manage your account when deploying a smart contract on Warden. Note that some commands vary depending on the chain.

The local chain has the following default settings:
- The default key name (the genesis account): `shulgin`
- The chain ID: `warden_1337-1`

Transactions on Chiado testnet require these flags:
- The RPC address: `--node https://rpc.chiado.wardenprotocol.org:443`
- The chain ID: `--chain-id chiado_10010-1`

### Get your chain ID

In some of the commands, you need to specify your chain ID.  To check it, run this:

```bash
wardend status
```

See the `network` field in the output.

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

### Get the private key

To get the **private key** associated with your account, run the following command. Specify your [key name](#get-the-key-name).

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

### Get the public address

You can always check your **public address** by running the following command. Specify your [key name](#get-the-key-name).

<Tabs>
<TabItem value="default" label="shulgin">
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

```bash
wardend tx bank send \
  shulgin \
  $(wardend keys show --address my-key-name) \
  1000000000000000000award \
  --chain-id warden_1337-1
```

To fund your key on Chiado, just use your [public address](#get-the-public-address) with [Chiado faucet](https://faucet.chiado.wardenprotocol.org/). 

:::tip
Keys are [created](#create-a-key) locally, but if you [fund your key](#fund-a-key) in a testnet, your account will be automatically registered on the network.
:::

### Check the key balance

After [funding your key](#fund-a-key), you can check your balance by running the following command. Specify your [key name](#get-the-key-name).

<Tabs>
<TabItem value="local-default" label="Local node: shulgin">
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

To check the key balance on Chiado, you can simply use the [block explorer](https://testnet.warden.exploreme.pro).

### Create a Space

To create a Space, run the following command. Specify your [key name](#get-the-key-name) and the chain ID:
   
<Tabs>
<TabItem value="local-default" label="Local node: default key">
```bash
wardend tx warden new-space \
  --from shulgin \
  --chain-id warden_1337-1
```
</TabItem>
<TabItem value="local-custom" label="Local node: custom key">
```bash
wardend tx warden new-space \
  --from my-key-name \
  --chain-id warden_1337-1
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
<TabItem value="local" label="Local node">
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

- [Deploy an EVM contract](deploy-an-evm-contract)
- [Deploy a WASM contract](deploy-a-wasm-contract)
