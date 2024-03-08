---
sidebar_position: 1
---

# Joining Alfama Testnet

This tutorial provides the necessary instructions to join the alfama testnet.
-   Current wardend version: v0.1.0
-   Chain ID: alfama

## Version History
|Release | Upgrade Block Height  | Upgrade Date |
|--|--|--|
| v0.1.0  | genesis |  |

## How to join Alfama testnet

The rest of this document provides a step-by-step walkthrough for setting up a test node.

## Hardware recommendations

-  We recommend running public testnet nodes on machines with at least 8 cores, 32GB of RAM and 300GB of disk space.

## Build Tools

Install Go following the instructions at https://golang.org/doc/install


## Installation & Configuration

You will need to install and configure the warden binary using the script below.
 
- For up-to-date endpoints like seed and state sync RPC servers, the [Warden networks repository](https://github.com/warden-protocol/networks/tree/main/testnet-alfama).

Build the wardend binary and initalize the chain home folder:

```
git clone --depth 1 --branch v0.1.0 https://github.com/warden-protocol/wardenprotocol/
cd  wardenprotocol/warden/cmd/wardend
go build

sudo mv wardend /usr/local/bin/
wardend init <custom_moniker>
```

Prepare the genesis file:

```
cd $HOME/.warden/config
rm genesis.json
wget https://raw.githubusercontent.com/warden-protocol/networks/main/testnet-alfama/genesis.json

# Set minimum gas price & peers
sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.0025uward"/' app.toml
sed -i 's/persistent_peers = ""/persistent_peers = "6a8de92a3bb422c10f764fe8b0ab32e1e334d0bd@sentry-1.alfama.wardenprotocol.org:26656,7560460b016ee0867cae5642adace5d011c6c0ae@sentry-2.alfama.wardenprotocol.org:26656,24ad598e2f3fc82630554d98418d26cc3edf28b9@sentry-3.alfama.wardenprotocol.org:26656"/' config.toml
```

## (Recommended) Setup state sync

This step is optional.

To speed up the initial sync, you can use the state sync feature. This will
allow you to download the state at a specific height from a trusted node and
then only download the blocks after that from the network.

You will need:
- a list of trusted RPC endpoints
- a trusted block height and its corresponding block hash

A list of RPC endpoints can be found in the [Warden networks
repository](https://github.com/warden-protocol/networks/blob/main/testnet-alfama/rpc-nodes.txt).
For the rest of the instructions we'll use
`https://rpc.alfama.wardenprotocol.org`.

From this RPC endpoint, you can get the trusted block height and hash using the
following command:

```bash
export SNAP_RPC_SERVERS="https://rpc.sentry-1.alfama.wardenprotocol.org:443,https://rpc.sentry-2.alfama.wardenprotocol.org:443,https://rpc.sentry-3.alfama.wardenprotocol.org:443"
export LATEST_HEIGHT=$(curl -s "https://rpc.alfama.wardenprotocol.org/block" | jq -r .result.block.header.height)
export BLOCK_HEIGHT=$((LATEST_HEIGHT - 2000))
export TRUST_HASH=$(curl -s "https://rpc.alfama.wardenprotocol.org/block?height=$BLOCK_HEIGHT" | jq -r .result.block_id.hash)
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

## Start the node

You can now start the node using the following command:

```
wardend start
```

It will connect to persistent peers provided and start downloading blocks. You can check the logs to see the progress.


## Create a validator

If you want to create a validator in the testnet, follow the instructions in the [Creating a validator](./creating-validator.md) section.
