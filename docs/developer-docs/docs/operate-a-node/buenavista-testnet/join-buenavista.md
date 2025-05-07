---
sidebar_position: 2
---

import PersistentPeers from "@site/src/components/PersistentPeers";

# Join Buenavista

:::warning
We've sunsetted [Buenavista](join-buenavista). Please join our new and improved testnet, [Chiado](../chiado-testnet/join-chiado).
:::

## Overview

This tutorial explains how to run the Warden binary, `wardend`, and join the **Buenavista testnet**.

## Prerequisites

Before you start, complete the following prerequisites:

- We recommend running public testnet nodes on machines with the following characteristics:
  - at least 8 cores
  - 32GB of RAM
  - 300GB of disk space
- [Install Go](https://golang.org/doc/install) 1.22.3 or later.
- If you wish to build the binary from the source code, [install Just](https://github.com/casey/just) 1.34.0 or later.

## 1. Install

To be able to interact with the node, install `wardend` (the Warden binary) using the script below. There are two ways to do it:

### Option 1: Use the prebuilt binary

1. Download the binary for your platform from the [release page](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.4.2) and unzip it. The archive contains the `wardend` binary.

2. Navigate to the directory containing the binary and initialize the node:
  
   ```bash
   ./wardend init my-chain-moniker
   ```

   :::tip
   When interacting with the node, you should add the path to the binary before `wardend` [commands](../node-commands).
   :::


### Option 2: Use the source code

1. Clone the repository and navigate to the root directory:

   ```bash
   git clone --depth 1 --branch v0.4.2 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   ```

   The binary is located in `wardenprotocol/build`.

2. Use our `just` script to build the `wardend` binary and install it to the `$GOPATH/bin` directory. Then initialize the node.
   
   ```bash
   just build
   just install
   wardend init my-chain-moniker
   ```
   
   Alternatively, you can skip installation to `$GOPATH/bin`:
   
   ```bash
   just build
   build/wardend init my-chain-moniker
   ```
   
   :::tip
   When interacting with the node, you should add the path to the binary before `wardend` [commands](../node-commands). If you install the binary to `$GOPATH/bin`, it's not required.
   :::

## 2. Configure

To configure `wardend`, do the following:

1. Prepare the `genesis.json` file:

   ```bash
   cd $HOME/.warden/config
   rm genesis.json
   wget https://buenavista-genesis.s3.eu-west-1.amazonaws.com/genesis.json.tar.xz | tar -xJ
   ```

   These commands will remove the `$HOME/.warden/genesis.json` file and replace it with the correct version.

2. In the `app.toml` file, set the mandatory options: the minimum gas price and persistent peers.

   ```bash
   sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "250uward"/' app.toml
   ```

   <PersistentPeers
   chainInfoUrl='https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/buenavista/chain.json'
   code={`sed -i 's/persistent_peers = ""/persistent_peers = "{{persistent_peers}}"/' config.toml`} />

   These commands will update the `minimum-gas-prices` and `persistent_peers` fields in `$HOME/.warden/app.toml`. Alternatively, you can adjust the file manually.

## 3. Set up the state sync

:::tip
This step is recommended but optional.
:::

To speed up the initial sync, you can use the state sync feature. This will allow you to download the state at a specific height from a trusted node and after that only download the blocks from the network.

You'll need to use a [trusted RPC endpoint](https://github.com/warden-protocol/networks/blob/main/testnets/buenavista/chain.json)—for example, the following:

```bash
https://rpc.buenavista.wardenprotocol.org
```

1. From this RPC endpoint, you can get the trusted block height and hash:

   ```bash
   export SNAP_RPC_SERVERS="https://rpc.buenavista.wardenprotocol.org:443,https://rpc.buenavista.wardenprotocol.org:443    "
   export LATEST_HEIGHT=$(curl -s "https://rpc.buenavista.wardenprotocol.org/block" | jq -r .result.block.header.height)
   export BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000))
   export TRUST_HASH=$(curl -s "https://rpc.buenavista.wardenprotocol.org/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)
   ```

2. Check that all variables have been set correctly:

   ```bash
   echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
   ```

   The output should be similar to this:

   ```
   70694 68694 6AF4938885598EA10C0BD493D267EF363B067101B6F81D1210B27EBE0B32FA2A
   ```

3. Add the state sync configuration to the `config.toml` file:

   ```bash
   sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; \
   s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1\"$SNAP_RPC_SERVERS\"| ; \
   s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1$BLOCK_HEIGHT| ; \
   s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1\"$TRUST_HASH\"|" $HOME/.warden/config/config.toml
   ```

   These commands will update the `[statesync]` section in `$HOME/.warden/config.toml`. Alternatively, you can adjust the file manually.

## 4. Start the node

Now you can start the node using the following command:

```bash
wardend start
```

If needed, add the path to the binary before the command:

```bash
path-to-binary/wardend start
```

It'll connect to persistent peers provided and start downloading blocks. You can check the logs to see the progress.

:::tip
We recommend [using Cosmovisor](https://docs.cosmos.network/v0.45/run-node/cosmovisor.html) for running a node. It's a utility for managing binary versions of Cosmos SDK-based chains, allowing you to enable binary upgrades without manual intervention.
:::

## Next steps

After joining Buenavista, you can take these steps:

- If you want to create a [validator](/learn/glossary#validator), follow the instructions in the [Create a validator](../create-a-validator) section.
- To learn more about `wardend` commands for interacting with the node, see [Node commands](../node-commands).
- Don't forget to join our community in [Discord](https://discord.com/invite/wardenprotocol).
