---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Useful node commands

## Overview

This article lists useful [node commands](/operate-a-node/node-commands) you'll typically need to run before and sometimes while building your application.

In all cases, it's required to create and fund a [key](/learn/glossary#key) (account) on a local chain or on a testnet, but some situations may require slightly different or additional steps. For example, you may need to create a [Space](/learn/glossary#space) or use an existing key instead of a new one. Whenever it happens, you can refer to this article.

Here you'll find different versions of commands: for a local chain and for our testnet, [Chiado](/operate-a-node/chiado-testnet/chiado-overview). Note that some commands will additionally vary depending on how exactly you [run a local chain](/operate-a-node/run-a-local-chain):

- If you use our `just` script, your chain will have default settings. For example, the default genesis account and chain ID are `shulgin` and `warden_1337-1`.
- If you configure the chain manually, you'll create a custom key and set a custom chain ID.

## Manage keys

### Create a key

To create a new key, run this:

```bash
wardend keys add my-key-name
```

Write down the **mnemonic phrase** and the **public address** of the new account. You'll need this information to interact with the chain and [restore the key](#restore-a-key). You may also need the **name** you specified when creating your key.

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
<TabItem value="local-default" label="Local node: default key">
```bash
wardend keys export shulgin --unarmored-hex --unsafe
```
</TabItem>
<TabItem value="custom" label="Local & testnet: custom key">
```bash
wardend keys export my-key-name --unarmored-hex --unsafe
```
</TabItem>
</Tabs>

### Get the public address

You can always check your **public address** by running the following command. Specify your [key name](#get-the-key-name).

<Tabs>
<TabItem value="local-default" label="Local node: default key">
```bash
wardend query bank balances shulgin
```
</TabItem>
<TabItem value="custom" label="Local & testnet: custom key">
```bash
wardend query bank balances my-key-name
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
  my-key-name-1 \
  $(wardend keys show --address my-key-name-2) \
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

After [funding your key](fund-a-key), you can check your balance by running the following command. Specify your [key name](#get-the-key-name).

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

## Manage Spaces

### Create a Space

To create a Space, run the following command. Specify your [key name](#get-the-key-name) and the chain ID:
   
```bash
wardend tx warden new-space \
  --from my-key-name \
  --chain-id chain_123-1
```

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

:::note
A Space is a hub allowing its owner to manage multiple cryptographic keys that identify users and secure the ownership of wallets.
:::

### List Spaces

To get a list of all spaces on the chain, run this:

```bash
wardend query warden spaces
```
