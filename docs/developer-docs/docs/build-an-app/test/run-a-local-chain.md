---
sidebar_position: 1
---

# Run a local chain

## Overview

This guide explains how to run a local chain for development and testing purposes.

There are three ways to run a node:

- **Option 1: Run a `just` script**  
It's the simplest way to run a local chain. Initiate a `just` script that builds the chain binary and then creates, configures, and runs a new chain.

- **Option 2: Use a devnet snapshot**  
You can use a devnet snapshot with prebuilt node settings.

- **Option 3. Configure manually**  
We recommend this option if you wish to run a node with custom settings and learn the basics of interacting with a node.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Go](https://golang.org/doc/install) 1.22.3 or later.
- Install [just](https://just.systems/man/en/chapter_4.html).

:::tip
You can install `just` it using `brew`:
   
```bash
brew install just
```
:::

## Option 1. Run a `just` script

The simplest way to run a local chain is initiating a `just` script that builds the chain binary and then creates, configures, and runs a new chain.


### 1. Clone the repository

Clone the Warden Protocol repository and navigate to the root directory:
   
```bash
git clone https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

### 2. Execute the script

Then execute the `just` script:
   
```bash
just localnet
```

You'll see blocks being produced and height incrementing.

:::note
You can check the settings of your node in the genesis file: `$HOME/.warden/config/genesis.json`. There you'll find two validator addresses, a Keychain, a Space, and other settings. See `accounts`, `keychains`, `spaces`, etc.
:::

## Option 2. Use a devnet snapshot

You can use a devnet snapshot with prebuilt node settings.

### 1. Clone the repository

Clone the Warden Protocol repository and navigate to the root directory:
   
```bash
git clone https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

### 2. Build the binary

Then use `just` to build the chain binary:
   
```bash
just wardend build
```

This will build the chain binary called `wardend` and install it in your `$GOPATH`.

You can check the binary location and version with these commands:

```bash
which wardend
wardend version
```

### 3. Download the snapshot

Download the [devnet snapshot](https://github.com/warden-protocol/snapshots/raw/main/devnet.tar.gz) and extract it to `~/.warden`:
   
```bash
wget https://github.com/warden-protocol/snapshots/raw/main/devnet.tar.gz
mkdir ~/.warden
tar -xvf devnet.tar.gz -C ~/.warden
```

:::tip
If you wish to use an alternative starting point, [check GitHub for other snapshots](https://github.com/warden-protocol/snapshots).
:::

### 4. Run the chain

Finally, run the chain:

```bash
wardend start
```

You'll see blocks being produced and height incrementing.

:::note
You can check the settings of your node in the genesis file: `$HOME/.warden/config/genesis.json`. There you'll find two validator addresses, a Keychain, a Space, and other settings. See `accounts`, `keychains`, `spaces`, etc.
:::

## Option 3. Configure manually

We recommend this option if you wish to run a node with custom settings and learn the basics of interacting with a node.

### 1. Clone the repository

Clone the Warden Protocol repository and navigate to the root directory:
   
```bash
git clone https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

### 2. Build the binary

Then use `just` to build the chain binary:
   
```bash
just wardend build
```
   
This will build the chain binary called `wardend` and install it in your `$GOPATH`.

You can check the binary location and version with these commands:

```bash
which wardend
wardend version
```

### 3. Create and configure a chain

In this flow, you'll create and configure your chain manually.

1. Initialize a local node. Specify a human-readable name (moniker) and ID for your chain:
   
   ```bash
   wardend init my-chain-moniker --chain-id my-chain-id
   ```

   You can find your new node in the `$HOME/.warden/config` directory. For the genesis file, see `$HOME/.warden/config/genesis.json.`

2. Set the correct denomination in `uward` across the genesis file:

   ```
   sed -i 's/stake/uward/g' ../.warden/config/genesis.json
   ```

3. Create a key pair, specifying a custom key (validator account) name:

   ```bash
   wardend keys add my-key-name
   ```

   You'll be prompted to create a passphrase, which is required for confirming some of the next steps.

   :::warning
   After you enter the passphrase, the node will return the validator account address and a mnemonic phrase. Note them down: you'll need this data for recovering your account if necessary.
   :::

4. Add a genesis (validator) account. Specify your key name and the number of tokens staked:

   ```bash
   wardend genesis add-genesis-account my-key-name 250000000000000uward
   ```

   This will add your address to the `accounts` section of the genesis file.

5. Generate a genesis transaction. Specify your key name, the amount to stake, and the chain ID:
   
   ```bash
   wardend genesis gentx my-key-name 1000000000000uward --chain-id my-chain-id
   ```

6. Collect genesis transactions:
   
   ```bash
   wardend genesis collect-gentxs
   ```

   This will add your transaction to the `gen_txs` section of the genesis file.

7. Validate the genesis file:
   
   ```bash
   wardend genesis validate-genesis
   ```

   You should receive a confirmation that `genesis.json` is a valid genesis file.

8. Set the minimum gas price:

   ```
   wardend config set app minimum-gas-prices 0uward
   ```

   This command will update the `minimum-gas-prices` field in `$HOME/.warden/config/app.toml`. For testing purposes, we recommend setting the gas price to 0. Otherwise, you'll have to add a `--fee` flag to all transactions, such as creating a Keychain or a Space.

### 4. Run the chain

Finally, start your node:
   
```bash
wardend start
```

You'll see blocks being produced and height incrementing.

### 5. Add more settings

In the previous steps, you configured your node with the minimum settings required for running it. However, for testing purposes, you may need to enable more features – for example, a Space and a Keychain.

#### Create a Keychain

1. While the node is running, execute the command below in a separate terminal window. Specify a custom keychain description, your key name, and the chain ID:
   
   ```bash
   wardend tx warden new-keychain \
     --description 'my-description' \
     --from my-key-name \
     --chain-id my-chain-id
   ```

2. Enter your passphrase and confirm the transaction.

3. After that, you can query the node to check the result:
   
   ```bash
   wardend query warden keychains
   ```
   
   The output should look like this:
   
   ```bash
   keychains:
   - admins:
     - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     description: my-description
     id: "1"
   pagination:
     total: "1"
   ```
   
#### Create a Space

1. To create a Space, run the following command. Specify your key name, and the chain ID:
   
   ```bash
   wardend tx warden new-space \
     --from my-key-name \
     --chain-id my-chain-id
   ```

2. Enter your passphrase and confirm the transaction.

3. After that, you can query the node to check the result:

   ```bash
   wardend query warden spaces
   ```
   
   The output should look like this::
   
   ```bash
   pagination:
     total: "1"
   spaces:
   - creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
     id: "1"
   owners:
   - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
   ```

## Result

If the chain is up, you'll see logs every time a new block is produced (approximately every second).

You should also be able to query the chain and access data from the genesis block. For example, you can run the following in a separate terminal window:

```bash
wardend status
```

The output should contain status information about your node:

```json
{
  "node_info": {
    "protocol_version": {
      "p2p": "8",
      "block": "11",
      "app": "0"
    },
    "id": "7165651eb07db46b86694db04bc29a83b682981f",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "my-chain-id",
    "version": "0.38.7",
    "channels": "40202122233038606100",
    "moniker": "my-chain-moniker",
    "other": {
      "tx_index": "on",
      "rpc_address": "tcp://127.0.0.1:26657"
    }
  },
  "sync_info": {
    "latest_block_hash": "B1C32EBAF2711ECBF051A790E7B478040988401B5A05AFF63C976FBB646F863E",
    "latest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "latest_block_height": "1",
    "latest_block_time": "2024-08-07T09:55:49.182399584Z",
    "earliest_block_hash": "B1C32EBAF2711ECBF051A790E7B478040988401B5A05AFF63C976FBB646F863E",
    "earliest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
    "earliest_block_height": "1",
    "earliest_block_time": "2024-08-07T09:55:49.182399584Z",
    "catching_up": false
  },
  "validator_info": {
    "address": "349AB1D6A70EE7F83B1C11A51CA72A11DFF1EBB3",
    "pub_key": {
      "type": "tendermint/PubKeyEd25519",
      "value": "q/OralvfqN2OpLGvCWaVAlkYSjI45Rtp3AOLdrMhJ3xCc="
    },
    "voting_power": "1000000"
  }
}
```

:::tip
To learn more about `wardend` commands for interacting with the node, see [Node commands](/operate-a-node/node-commands).
:::

:::tip
If you need to stop the node, use **Ctrl + C**. Note that when you run the chain again, it'll start from block 0.
:::
