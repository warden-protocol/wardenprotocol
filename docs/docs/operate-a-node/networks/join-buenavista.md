---
sidebar_position: 2
---

# Join Buenavista

## Overview

This tutorial explains how to run the Warden binary, `wardend`, and join the **Buenavista testnet**:

- The chain ID in queries: `buenavista-1`
- Endpoints: [networks repository > buenavista](https://github.com/warden-protocol/networks/tree/main/testnets/buenavista)
- The current `wardend` version: **v0.3.0**

## Version history

| Release | Upgrade Block Height | Upgrade Date |
| ------- | -------------------- | ------------ |
| v0.3.0  | genesis              |              |

## Prerequisites

- We recommend running public testnet nodes on machines with the following characteristics:
    - at least 8 cores
    - 32GB of RAM
    - 300GB of disk space

- You'll also need to [install Go](https://golang.org/doc/install).

## 1. Install

To join Buenavista, install `wardend` (the Warden binary) using the script below. There are two ways to do it:

### Option 1: Use the prebuilt binary

1. Download the binary for your platform from the [release page](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.3.0) and unzip it. The archive contains the `wardend` binary.

2. Initialize the chain home folder:

    ```
    ./wardend init <custom_moniker>
    ```

### Option 2: Use the source code

Build the `wardend` binary and initialize the chain home folder:

```
git clone --depth 1 --branch v0.3.0 https://github.com/warden-protocol/wardenprotocol/
just build

build/wardend init <custom_moniker>
```

## 2. Configure

To configure `wardend`, do the following:

1. Prepare the genesis file:

    ```
    cd $HOME/.warden/config
    rm genesis.json
    wget https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/buenavista/genesis.json
    ```

2. Set the mandatory configuration options:

    ```bash
    # Set minimum gas price & peers
    sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.0025uward"/' app.toml
    sed -i 's/persistent_peers = ""/persistent_peers = "650c66dda5f7aa954f44fd6148a6f32b085ca792@sentry-0.buenavista.wardenprotocol.org:26656,7c70120717ef5eae8236162ede6819249bd6587d@sentry-1.buenavista.wardenprotocol.org:26656,288116b75c3c710268b5d86182d8dd5e33a6b56f@sentry-2.buenavista.wardenprotocol.org:26656"/' config.toml
    ```

<!--- To be confirmed
## (Recommended) Setup state sync

This step is optional.

To speed up the initial sync, you can use the state sync feature. This will
allow you to download the state at a specific height from a trusted node and
then only download the blocks after that from the network.

You'll need:
- a list of trusted RPC endpoints
- a trusted block height and its corresponding block hash

A list of RPC endpoints can be found in the [Warden networks
repository](https://github.com/warden-protocol/networks/blob/main/testnets/buenavista/rpc-nodes.txt).
For the rest of the instructions we'll use
`https://rpc.buenavista.wardenprotocol.org`.

From this RPC endpoint, you can get the trusted block height and hash using the
following command:

```bash
export SNAP_RPC_SERVERS="https://rpc.buenavista.wardenprotocol.org:443,https://rpc.buenavista.wardenprotocol.org:443"
export LATEST_HEIGHT=$(curl -s "https://rpc.buenavista.wardenprotocol.org/block" | jq -r .result.block.header.height)
export BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000))
export TRUST_HASH=$(curl -s "https://rpc.buenavista.wardenprotocol.org/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)
```

Check that all variables have been set correctly:

```bash
echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH

# output should be similar to:
# 70694 68694 6AF4938885598EA10C0BD493D267EF363B067101B6F81D1210B27EBE0B32FA2A
```

Now you can add the state sync configuration to your `config.toml`:

```bash
sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC_SERVERS\"| ; \
s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" $HOME/.warden/config/config.toml
```
--->

## 3. Start the node

You can now start the node using the following command:

```
wardend start
```

It'll connect to persistent peers provided and start downloading blocks. You can check the logs to see the progress.

## 4. Create a validator

If you want to create a validator in the testnet, follow the instructions in the [Create a validator](/operate-a-node/create-a-validator) section.
