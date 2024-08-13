---
sidebar_position: 1
---

import PersistentPeers from "@site/src/components/PersistentPeers";

# Join Buenavista

## Overview

This tutorial explains how to run the Warden binary, `wardend`, and join the **Buenavista testnet**:

- The chain ID in queries: `buenavista-1`
- Endpoints: [networks repository > buenavista](https://github.com/warden-protocol/networks/tree/main/testnets/buenavista)
- The current `wardend` version: **v0.3.1**

## Version history

| Release | Upgrade block height | Upgrade date |
| ------- | -------------------- | ------------ |
| v0.3.0  | genesis              |              |
| v0.4.1  | 1675700              | Aug 13, 2024 |

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

    ```bash
    ./wardend init <custom_moniker>
    ```

### Option 2: Use the source code

Build the `wardend` binary and initialize the chain home folder:

```bash
git clone --depth 1 --branch v0.3.0 https://github.com/warden-protocol/wardenprotocol/
just build

build/wardend init <custom_moniker>
```

## 2. Configure

To configure `wardend`, do the following:

1. Prepare the genesis file:

    ```bash
    cd $HOME/.warden/config
    rm genesis.json
    wget https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/buenavista/genesis.json
    ```

2. Set the mandatory configuration options:
    
    ```bash
    # set minimum gas price & peers
    sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.0025uward"/' app.toml
    ```

    <PersistentPeers
        chainInfoUrl='https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/buenavista/chain.json'
        code={`sed -i 's/persistent_peers = ""/persistent_peers = "{{persistent_peers}}"/' config.toml`} />

## 3. Set up the state sync

:::tip
This step is recommended but optional.
:::

To speed up the initial sync, you can use the state sync feature. This will allow you to download the state at a specific height from a trusted node and after that only download the blocks from the network.

You'll need to use a [trusted RPC endpoint](https://github.com/warden-protocol/networks/blob/main/testnets/buenavista/chain.json) – for example, the following:

```bash
https://rpc.buenavista.wardenprotocol.org
```

1. From this RPC endpoint, you can get the trusted block height and hash:
    
    ```bash
    export SNAP_RPC_SERVERS="    https://rpc.buenavista.wardenprotocol.org:443,https://rpc.buenavista.wardenprotocol.org:443    "
    export LATEST_HEIGHT=$(curl -s "https://rpc.buenavista.wardenprotocol.org/block" | jq -r     .result.block.header.height)
    export BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000))
    export TRUST_HASH=$(curl -s "https://rpc.buenavista.wardenprotocol.org/block?height=$    BLOCK_HEIGHT" | jq -r .result.block_id.hash)
    ```

2. Check that all variables have been set correctly:
    
    ```bash
    echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
    
    # output should be similar to:
    # 70694 68694 6AF4938885598EA10C0BD493D267EF363B067101B6F81D1210B27EBE0B32FA2A
    ```

3. Add the state sync configuration to your `config.toml`:

    ```bash
    sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
    s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC_SERVERS\"| ; \
    s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
    s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" $HOME/.warden/config/config.toml
    ```

## 4. Start the node

Now you can start the node using the following command:

```bash
wardend start
```

It'll connect to persistent peers provided and start downloading blocks. You can check the logs to see the progress.

## 5. Create a validator

If you want to create a validator in the testnet, follow the instructions in the [Create a validator](/operate-a-node/create-a-validator) section.
