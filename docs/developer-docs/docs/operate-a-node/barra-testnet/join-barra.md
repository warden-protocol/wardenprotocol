---
sidebar_position: 2
---

# Join Barra

:::important
Barra is our new testnet, currently available only to selected validators. It's a vanilla Cosmos chain with EVM support.
:::

## Overview

This tutorial explains how to run the Warden binary, `wardend`, and join the **Barra testnet**.

## Prerequisites

Before you start, complete the following prerequisites:

- We recommend running public testnet nodes on machines with the following characteristics:
  - at least 4 cores
  - 16GB of RAM
  - 300GB of disk space
- [Install Go](https://go.dev/doc/install) 1.25 or higher.

## 1. Install the binary

To be able to interact with the node, install `wardend` (the Warden binary) and configure it:

1. Download the binary for your platform from the release page and unzip it. The archive contains the `wardend` binary.

2. Navigate to the directory containing the binary and initialize the node, specifying a custom chain moniker:
    
   ```bash
   ./wardend init CHAIN_MONIKER
   ```

## 2. Configure the binary

To configure `wardend`, do the following:

1. Prepare the `genesis.json` file:
    
   ```bash
   cd $HOME/.warden/config
   rm genesis.json
   wget <https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/barra/genesis.json>    
   ```
    
   These commands will remove the `$HOME/.warden/genesis.json` file and replace it with the correct version.
    
2. In the `app.toml` file, set the mandatory options: the minimum gas price and a list of seeds nodes. To find seed nodes, see our network repository.
    
   ```bash
   sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "10award/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"/' app.toml
   ```
    
   ```bash
   sed -i 's/seeds = ""/seeds = "seed-nodes"/' config.toml
   ```
    
    These commands will update the `minimum-gas-price` and `seeds` fields in `$HOME/.warden/app.toml`. Alternatively, you can adjust the file manually.
    

## 3. Sync the node

:::tip
This step is recommended but optional.
:::

To speed up the initial sync, you can use the state sync feature. This will allow you to download the state at a specific height from a trusted node and after that only download the blocks from the network.

You'll need to use a [trusted RPC endpoint](https://github.com/warden-protocol/networks/blob/main/testnets/barra/chain.json)—for example, the following:

```bash
https://rpc.barra.wardenprotocol.org
```

1. From this RPC endpoint, you can get the trusted block height and hash:
    
   ```bash
   export SNAP_RPC_SERVERS="<https://rpc.barra.wardenprotocol.org:443>,<https://rpc.barra.wardenprotocol.org:443>"
   export LATEST_HEIGHT=$(curl -s "<https://rpc.barra.wardenprotocol.org/block>" | jq -r .result.block.header.height)
   export BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000))
   export TRUST_HASH=$(curl -s "<https://rpc.barra.wardenprotocol.org/block?height=$BLOCK_HEIGHT>" | jq -r .result.block_id.hash)
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
   sed -i.bak -E "s|^(enable[[:space:]]+=[[:space:]]+).*$|\\1true| ; \\
   s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\\1\\"$SNAP_RPC_SERVERS\\"| ; \\
   s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\\1$BLOCK_HEIGHT| ; \\
   s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\\1\\"$TRUST_HASH\\"|" $HOME/.warden/config/config.toml
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
We recommend using [Cosmovisor](https://docs.cosmos.network/v0.45/run-node/cosmovisor.html) for running a node. It's a utility for managing binary versions of Cosmos SDK-based chains, allowing you to enable binary upgrades without manual intervention.
:::

## Next steps

After joining Barra, you can take these steps:

- If you want to create a [validator](/learn/glossary#validator), follow the instructions in the [Create a validator](create-a-validator) guide.
- To learn more about `wardend` commands for interacting with the node, see [Node commands](../node-commands).
- Don't forget to join our community in [Discord](https://discord.com/invite/wardenprotocol).
