---
sidebar_position: 3
---

# Run a local chain (?)

## Overview

This guide explains how to run a local chain for development and testing purposes. You'll initiate our `just` script that builds the chain binary and then creates, configures, and runs a new chain.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Go](https://go.dev/doc/install) 1.24 or later.
- [Install just](https://github.com/casey/just) 1.34.0 or later.
- [Install jq](https://jqlang.org/download/).

:::tip
You can install `just` by using `brew`:
   
```bash
brew install just
```
:::

## Step 1. Clone the repository

Clone the Warden Protocol repository and navigate to the root directory:
   
```bash
git clone https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

If you wish to test the latest testnet release locally, run this instead:

```bash
git clone --depth 1 --branch v0.6.3 https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

## Step 2. Execute the script

Then execute the `just` script:
   
```bash
just localnet
```

You'll see blocks being produced and the height incrementing.


## Step 3. Verify initiation

1. You should now be able to query the chain and access data from the genesis block. In a separate terminal window, run the following:
   
   ```bash
   wardend status
   ```

2. To check the binary version, run this:

   ```bash
   wardend version
   ```

3. You can also check your node's configuration in its home directory at `$HOME/.warden`:

   - `config/genesis.json`: The genesis file. Here you'll find two validator addresses, a [Keychain](/learn/glossary#keychain), a [Space](/learn/glossary#space), and other initial node settings (see `accounts`, `keychains`, `spaces`, etc.).
   - `config/app.toml`: The application configuration file. Here you can adjust validator settings and other parameters.


:::tip
The local chain will have the following default settings:
- The default key (genesis account) name: `shulgin`
- The chain ID: `warden_1337-1`
:::

## Step 4. Stop and restart

To stop the node, press **Ctrl + C**.

To restart from block 0, run this command: 

```bash
wardend start
```

Alternatively you can do this:

- Reset the node home directory and start the chain from scratch.    
  ```bash
  just localnet
  ```
- Delete all local chain data but keep `config.toml`, `app.toml`, and keys.

  ```bash
  wardend comet unsafe-reset-all
  wardend start
  ```

## Next steps

- Use [node commands](node-commands) to interact with the chain and [manage your account](/build-an-agent/set-up-a-warden-account#useful-node-commands).
- Now you can [deploy an EVM contract](/build-an-agent/deploy-an-evm-contract) or a [WASM contract](/build-an-agent/deploy-a-wasm-contract) locally.
- To join our testnet, see Join Chiado.
