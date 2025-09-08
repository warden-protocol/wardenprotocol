---
sidebar_position: 2
---

# Join Barra

:::important
Barra is our new testnet, currently available only to selected validators.
:::

## Overview

This tutorial explains how to run the Warden binary, `wardend`, and join the **Barra testnet**.

## Prerequisites

Before you start, complete the following prerequisites:

- We recommend running public testnet nodes on machines with the following characteristics:
  - at least 4 cores
  - 16GB of RAM
  - 300GB of disk space
- [Install Go](https://go.dev/doc/install) 1.24 or later.

## 1. Prepare a node

To be able to interact with the node, install `wardend` (the Warden binary) and configure it:

1. Download the binary for your platform from the release page and unzip it. The archive contains the `wardend` binary.

2. Navigate to the directory containing the binary and initialize the node:
    
   ```bash
   ./wardend init my-chain-moniker
   ```
    
3. Prepare the `genesis.json` file:
    
   ```bash
   cd $HOME/.warden/config
   rm genesis.json
   wget <https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/barra/genesis.json>    
   ```
    
   These commands will remove the `$HOME/.warden/genesis.json` file and replace it with the correct version.
    
4. In the `app.toml` file, set the mandatory options: the minimum gas price and a list of seeds nodes. To find seed nodes, see our network repository.
    
   ```bash
   sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.001ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2"/' app.toml
   ```
    
   ```bash
   sed -i 's/seeds = ""/seeds = "seed-nodes"/' config.toml
   ```
    
    These commands will update the `minimum-gas-price` and `seeds` fields in `$HOME/.warden/app.toml`. Alternatively, you can adjust the file manually.
    

## 2. Sync the node

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
    
4. Now you can start the node using the following command:
    
   ```bash
   wardend start
   ```
    
   If needed, add the path to the binary before the command:
    
   ```bash
   path-to-binary/wardend start
   ```
   
   It'll connect to persistent peers provided and start downloading blocks. You can check the logs to see the progress.
    

## 3. Create a key

1. Create a new key pair for your validator. Replace `my-key-name` with a key name of your choice and run the following:
    
   ```bash
   wardend keys add my-key-name
   ```
   
   After creating a new key, you'll see its information and its seed phrase. It's essential to write down this seed phrase and keep it in a safe place. The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of your tokens.
    
2. Provide the **valoper** and **key** **address** to the Warden Labs team. The Warden Labs team will provide your validator with **1 wSTAKE** token and an **initial supply of ATOM**.

   To calculate the valoper addresses, use your key address:
    
   ```
   wardend debug addr warden15l9xtg5xwjjkyyz0dymv7r8a2v97yjuhym302d
   Address bytes: [167 202 101 162 134 116 165 98 16 79 105 54 207 12 253 83 11 226 75 151]
   Address hex: 0xa7Ca65a28674A562104F6936Cf0cfd530bE24B97
    
   wardend debug addr 0xa7Ca65a28674A562104F6936Cf0cfd530bE24B97
   Address bytes: [167 202 101 162 134 116 165 98 16 79 105 54 207 12 253 83 11 226 75 151]
   Bech32 Acc warden15l9xtg5xwjjkyyz0dymv7r8a2v97yjuhym302d
   Bech32 Val wardenvaloper15l9xtg5xwjjkyyz0dymv7r8a2v97yjuh4qn29u    
    ```
    
## 4. Create a validator

1. Now create your validator:
    
   ```
   wardend tx staking create-validator \
     --from my-validator-account \
     --chain-id barra_10100-1 \
     --amount 1000000000000000000wSTAKE \
     --commission-rate 0.05 \
     --commission-max-rate 0.1 \
     --commission-max-change-rate 0.1 \
     --pubkey "$(wardend tendermint show-validator)" \
     --gas auto \
     --gas-adjustment 1.3 \
     --fees 3000ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2
   ```
    
2. After creating a validator, notify the Warden Labs team. We'll delegate for your validator.
    
   Happy validating!

## Next steps

After joining Barra, you can take these steps:

- If you want to create a [validator](/learn/glossary#validator), follow the instructions in the [Create a validator](../create-a-validator) section.
- To learn more about `wardend` commands for interacting with the node, see [Node commands](../node-commands).
- Don't forget to join our community in [Discord](https://discord.com/invite/wardenprotocol).
