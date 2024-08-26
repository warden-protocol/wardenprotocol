---
sidebar_position: 1
---

# Run a local chain

## Overview

This guide explains how to run a local chain for development and testing purposes.

## Prerequisites

- [Go](https://golang.org/dl/) 1.22.5 or later
- [just](https://just.systems/man/en/chapter_4.html)

## 1. Clone the Warden repository

Clone the Warden Protocol repository and navigate to the root directory:

```sh
git clone https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

## 2. Build the chain

1. Check if `just` is installed. If not, you can install it using `brew`:
    
    ```sh
    brew install just
    ```

2. Install the `wardend` binary:
    
    ```sh
    just install
    ```
    
    This will build the chain binary called `wardend` and install it in your `$GOPATH`. You can check the location by running this:

    ```sh
    which wardend
    ```

3. Check if your `wardend` binary has been properly installed:

    ```sh
    wardend version  
    ```

    You'll see an output like this:

    ```sh
    v0.4.0.0
    ```

## 3. Run the chain

### Option 1. Use `just`

Once `just` and `wardend` are correctly installed, you can initiate a script that creates, configures, and runs a new chain.

Make sure you're in the `wardenprotocol` directory and execute this command:

```sh
just localnet
```

You'll see blocks being produced and height incrementing.

:::note
You can check the settings of your node in the genesis file: `$HOME/.warden/config/genesis.json`. There you'll find two validator addresses, a Keychain, a Space, and other settings. See `accounts`, `keychains`, `spaces`, etc.
:::

### Option 2. Use the devnet snapshot

You can use a devnet snapshot with prebuilt node settings.

1. Download the [devnet snapshot](https://github.com/warden-protocol/snapshots/raw/main/devnet.tar.gz) and extract it to `~/.warden`:
    
    ```sh
    wget https://github.com/warden-protocol/snapshots/raw/main/devnet.tar.gz
    mkdir ~/.warden
    tar -xvf devnet.tar.gz -C ~/.warden
    ```
       
2. Run the chain:
    
    ```sh
    wardend start
    ```

:::note
You can check the settings of your node in the genesis file: `$HOME/.warden/config/genesis.json`. There you'll find two validator addresses, a Keychain, a Space, and other settings. See `accounts`, `keychains`, `spaces`, etc.
:::

:::tip
You can find [other devnet snapshots](https://github.com/warden-protocol/snapshots) on GitHub and use  them as alternative starting points.
:::

### Option 3. Configure manually

Options 1 and 2 allow you to run a node with prebuilt settings. Alternatively, you can configure your node manually before running it, as shown in the steps below.

1. Initialize a local node. Specify a human-readable name (moniker) and ID for your chain:
    
    ```sh
    wardend init my-chain-name --chain-id my-chain-id
    ```

    You can find your new node in the `$HOME/.warden/config` directory.

2. Create a key pair, specifying a custom validator name:
    ```sh
    wardend keys add my-validator-name
    ```

    You'll be prompted to create a passphrase, which is required for confirming some of the next steps.

    :::warning
    After you enter the passphrase, the node will return the validator address and a mnemonic phrase. Note them down: you'll need this data for recovering your account if necessary.
    :::

3. Add a genesis account. Specify your validator name and the number of tokens staked:

    ```sh
    wardend genesis add-genesis-account my-validator-name 100000000000stake
    ```

    This will add your validator address to the `accounts` section of the genesis file. See `$HOME/.warden/config/genesis.json`.

4. Generate a genesis transaction. Specify your validator name, the amount to stake, and the chain ID:
    
    ```sh
    wardend genesis gentx my-validator-name 1000000000stake --chain-id my-chain-id
    ```

5. Collect genesis transactions:
    
    ```sh
    wardend genesis collect-gentxs
    ```

   This will add your transaction to the `gen_txs` section of the genesis file.

6. Validate the genesis file:
    
    ```sh
    wardend genesis validate-genesis
    ```

    You should receive a confirmation that `genesis.json` is a valid genesis file.

7. Edit the `app.toml` file. Navigate to `$HOME/.warden/config/app.toml` and add your preferred gas price to the `minimum-gas-prices` field:

    ```toml
    minimum-gas-prices = "0.025stake"
    ```
    
8. Start your node:
    
    ```sh
    wardend start
    ```
    
    You'll see blocks being produced and height incrementing.

:::tip
After you verify your node is running in [Step 4](#4-verify-the-chain-is-up), you may need to make more configurations, as shown in [Step 5](#5-additional-configuration).
:::

## 4. Verify the chain is up

If the chain is up, you'll see logs every time a new block is produced (approximately every second).

You should also be able to query the chain and access data from the genesis block. For example, you can run the following in a separate terminal window:

```sh
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
    "moniker": "my-chain-name",
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
    "voting_power": "1000"
  }
}
```

:::tip
You can use other `wardend` commands to interact with the node. Just run `wardend` to see a list of available commands.
:::

:::tip
If you need to stop the node, use **Ctrl + C**. Note that when you run the chain again, it'll start from block 0.
:::

## 5. Additional configuration

If you configured your node manually in Step 3 ([Option 3](#option-3-configure-manually)), you may also need to add a Space and a Keychain for testing purposes. Other flows utilize prebuilt configurations that already contain these settings.

1. Create a Keychain. While the node is running, execute the command below in a separate terminal window. Specify a custom keychain description, your validator name, chain ID, and fees to pay:

    ```sh
    wardend tx warden new-keychain --description 'my-description' --from my-validator-name --chain-id my-chain-id --fees 5000stake
    ```

    Enter your passphrase and confirm the transaction. After that, you can query the node to check the result:

    ```sh
    wardend query warden keychains
    ```

    The output should look like this:

    ```sh
    keychains:
    - admins:
      - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
      creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
      description: my-description
      id: "1"
    pagination:
      total: "1"
    ```

2. Create a Space. Specify your validator name, chain ID, and fees to pay:

    ```sh
    wardend tx warden new-space --from my-validator-name --chain-id my-chain-id --fees 5000stake
    ```

    Enter your passphrase and confirm the transaction. After that, you can query the node to check the result:

    ```sh
    wardend query warden spaces
    ```

    The output should look like this::

    ```sh
    pagination:
      total: "1"
    spaces:
    - creator: warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
      id: "1"
    owners:
    - warden1h7akmejqcrafp3mfpjqamghh89kzmkgjzsy3mc
    ```
