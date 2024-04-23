---
sidebar_position: 1
---

# Joining Buenavista Testnet

This tutorial provides the necessary instructions to join the Buenavista testnet.

-   Current wardend version: v0.3.0
-   Chain ID: buenavista-1

## Version History
|Release | Upgrade Block Height  | Upgrade Date |
|--|--|--|
| v0.3.0  | genesis |  |

## How to join Buenavista testnet

The rest of this document provides a step-by-step walkthrough for setting up a test node.

## Hardware recommendations

-  We recommend running public testnet nodes on machines with at least 8 cores, 32GB of RAM and 300GB of disk space.

## Build Tools

Install Go following the instructions at https://golang.org/doc/install


## Installation & Configuration

You will need to install and configure the warden binary using the script below.
 
- For up-to-date endpoints like seed and state sync RPC servers, the [Warden networks repository](https://github.com/warden-protocol/networks/tree/main/testnets/buenavista).

To install wardend, you can choose one of the following methods:

### Method 1: Using prebuilt binaries

Download the binary for your platform from the release page:
https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.3.0 and unzip
it. The archive contains the `wardend` binary.

Initialize the chain home folder:

```
./wardend init <custom_moniker>
```


### Method 2: From source code

Build the wardend binary and initialize the chain home folder:

```
git clone --depth 1 --branch v0.3.0 https://github.com/warden-protocol/wardenprotocol/
make build-wardend

build/wardend init <custom_moniker>
```

### Set up configuration

Prepare the genesis file:

```
cd $HOME/.warden/config
rm genesis.json
wget https://raw.githubusercontent.com/warden-protocol/networks/main/testnets/buenavista/genesis.json
```

And set some mandatory configuration options:

```bash
# Set minimum gas price & peers
sed -i 's/minimum-gas-prices = ""/minimum-gas-prices = "0.0025uward"/' app.toml
sed -i 's/persistent_peers = ""/persistent_peers = "ddb4d92ab6eba8363bab2f3a0d7fa7a970ae437f@sentry-1.buenavista.wardenprotocol.org:26656,c717995fd56dcf0056ed835e489788af4ffd8fe8@sentry-2.buenavista.wardenprotocol.org:26656,e1c61de5d437f35a715ac94b88ec62c482edc166@sentry-3.buenavista.wardenprotocol.org:26656"/' config.toml
```

<!--- To be confirmed
## (Recommended) Setup state sync

This step is optional.

To speed up the initial sync, you can use the state sync feature. This will
allow you to download the state at a specific height from a trusted node and
then only download the blocks after that from the network.

You will need:
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

## Start the node

You can now start the node using the following command:

```
wardend start
```

It will connect to persistent peers provided and start downloading blocks. You can check the logs to see the progress.


## Create a validator

If you want to create a validator in the testnet, follow the instructions in the [Creating a validator](./creating-validator.md) section.
