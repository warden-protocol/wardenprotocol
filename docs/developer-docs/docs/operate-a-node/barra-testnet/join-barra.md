---
sidebar_position: 2
---

# Join Barra

:::important
Barra is our new EVM testnet, currently available only to selected validators.
:::

## Overview

This tutorial explains how to run the Warden binary, `wardend`, and join the **Barra testnet**.

## Prerequisites

Before you start, complete the following prerequisites:

- [Install Go](https://go.dev/doc/install) 1.25 or higher.
- Make sure you have the following shell tools installed: `wget`, `sed`, `curl`, `jq`.
- We recommend running public testnet nodes on machines with the following characteristics:
  - at least 4 cores
  - 16GB of RAM
  - 300GB of disk space

## 1. Install the binary

To be able to interact with the node, install `wardend` (the Warden binary) and configure it:

1. Download the binary for your platform from the [release page](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.7.2) and unzip it. The archive contains the `wardend` binary.

2. Navigate to the directory containing the binary and initialize the node, specifying a custom chain moniker:
    
   ```bash
   ./wardend init CHAIN_MONIKER
   ```

## 2. Configure the binary

To configure `wardend`, update files in `$HOME/.warden/config/`.

The following list shows the files and fields you need to adjust. You can do it manually or use the CLI commands below.

- `app.toml`  
  Set the minimum gas price and the EVM chain ID:
  ```toml
  minimum-gas-prices = "10award"
  ```
  ```toml
  evm-chain-id = 9191
  ```
- `client.toml`   
  Set the chain ID:
  ```toml
  chain-id = "barra_9191-1"
  ```
- `config.toml`   
  Add [seed nodes](https://github.com/warden-protocol/networks/blob/main/testnets/barra/chain.json) and adjust consensus parameters:
  ```toml
  seeds = "c489c003b7c72298840bd4411ffc98ce13e07c27@54.194.136.183:26656,4564c91423a923eaba7982e69e33aec6185d362f@54.72.5.234:26656"
  ```
  ```toml
  timeout_propose = "1s"
  timeout_propose_delta = "200ms"
  timeout_prevote = "500ms"
  timeout_prevote_delta = "200ms"
  timeout_precommit = "500ms"
  timeout_precommit_delta = "200ms"
  timeout_commit = "2s"
  create_empty_blocks = true
  ```
- `genesis.json`  
  Replace its contents with the correct [genesis settings](https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/barra/genesis.json).

To update the files automatically, you can use the following commands:

```bash
cd $HOME/.warden/config
sed -i.bak 's|^\s*minimum-gas-prices\s*=.*|minimum-gas-prices = "10award"|' app.toml
sed -i.bak 's|^\s*evm-chain-id\s*=.*|evm-chain-id = 9191|' app.toml
sed -i.bak 's|^\s*chain-id\s*=.*|chain-id = "barra_9191-1"|' client.toml
sed -i.bak 's|^\s*seeds\s*=.*|seeds = "c489c003b7c72298840bd4411ffc98ce13e07c27@54.194.136.183:26656,4564c91423a923eaba7982e69e33aec6185d362f@54.72.5.234:26656"|' config.toml
sed -i.bak 's|^\s*timeout_propose\s*=.*|timeout_propose = "1s"|' config.toml
sed -i.bak 's|^\s*timeout_propose_delta\s*=.*|timeout_propose_delta = "200ms"|' config.toml
sed -i.bak 's|^\s*timeout_prevote\s*=.*|timeout_prevote = "500ms"|' config.toml
sed -i.bak 's|^\s*timeout_prevote_delta\s*=.*|timeout_prevote_delta = "200ms"|' config.toml
sed -i.bak 's|^\s*timeout_precommit\s*=.*|timeout_precommit = "500ms"|' config.toml
sed -i.bak 's|^\s*timeout_precommit_delta\s*=.*|timeout_precommit_delta = "200ms"|' config.toml
sed -i.bak 's|^\s*timeout_commit\s*=.*|timeout_commit = "2s"|' config.toml
sed -i.bak 's|^\s*create_empty_blocks\s*=.*|create_empty_blocks = true|' config.toml
rm genesis.json
wget https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/barra/genesis.json 
```

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
   export SNAP_RPC_SERVERS="https://rpc.barra.wardenprotocol.org:443,https://rpc.barra.wardenprotocol.org:443"
   export LATEST_HEIGHT=$(curl -s "https://rpc.barra.wardenprotocol.org/block" | jq -r .result.block.header.height)
   export BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000))
   export TRUST_HASH=$(curl -s "https://rpc.barra.wardenprotocol.org/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)
   ```
    
2. Check that all variables have been set correctly:
    
   ```bash
   echo $LATEST_HEIGHT $BLOCK_HEIGHT $TRUST_HASH
   ```
    
   The output should be similar to this:
   
   ```bash
   70694 68694 6AF4938885598EA10C0BD493D267EF363B067101B6F81D1210B27EBE0B32FA2A
   ```
    
3. Add the state sync configuration to the `config.toml` file, under `[statesync]`:

   ```toml
   enable = true # enable the state sync
   ```
   ```toml
   rpc_servers = "SNAP_RPC_SERVERS"
   ```
   ```toml
   trust_height = BLOCK_HEIGHT
   ```
   ```toml
   trust_hash = "TRUST_HASH"
   ```

   You can also do it automatically:
     
   ```bash
   sed -i.bak -E \
   's|^(enable[[:space:]]+=[[:space:]]+).*$|\1true| ; 
   s|^(rpc_servers[[:space:]]+=[[:space:]]+).*$|\1"'"$SNAP_RPC_SERVERS"'"| ; 
   s|^(trust_height[[:space:]]+=[[:space:]]+).*$|\1'"$BLOCK_HEIGHT"'| ; 
   s|^(trust_hash[[:space:]]+=[[:space:]]+).*$|\1"'"$TRUST_HASH"'"|' \
   "$HOME/.warden/config/config.toml"
   ```

## 4. Start the node

Now you can start the node using the following command:
 
```bash
wardend start
```
 
If needed, add the path to the binary before the command:
 
```bash
path-to-binary/wardend start
```

It'll connect to the configured seed nodes and start downloading blocks. You can check the logs to see the progress.

:::tip
We recommend using [Cosmovisor](https://docs.cosmos.network/v0.47/build/tooling/cosmovisor) for running a node. It's a utility for managing binary versions of Cosmos SDK-based chains, allowing you to enable binary upgrades without manual intervention.
:::

## Next steps

After joining Barra, you can take these steps:

- If you want to create a [validator](/learn/glossary#validator), follow the instructions in the [Create a validator](create-a-validator) guide.
- To learn more about `wardend` commands for interacting with the node, see [Node commands](../node-commands).
- Don't forget to join our community in [Discord](https://discord.com/invite/wardenprotocol).
