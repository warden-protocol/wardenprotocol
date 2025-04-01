---
sidebar_position: 2.5
---

# Prepare the chain

## Overview

To deploy a smart contract on our testnet or a local chain, you need to create and fund a [key](/learn/glossary#space). To build your application or to [operate a Keychain](/build-a-keychain/introduction), you may also need to create a [Space](/learn/glossary#space).

The following article shows typical preparatory steps you may need to take before building an application.

:::note
A Space is a hub allowing its owner to manage multiple cryptographic keys that identify users and secure the ownership of wallets. To create a key, a user requests it from a Keychain—a custodian that generates and stores keys and signs transactions with them.
:::

## Connect to a network

### Run a local chain

Run a local chain as explained here: [Run a local chain](/operate-a-node/run-a-local-chain). Note that you'll need to [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

### Connect to a testnet

To connect to [Chiado testnet](/operate-a-node/chiado-testnet/chiado-overview), you need to install its binary and fund your key, as shown in the following steps:

1. If you haven't yet, [install Go](https://golang.org/doc/install) 1.22.3 or later and [just](https://github.com/casey/just) 1.34.0 or later.

2. Clone the repository with Warden source code. Then build the binary and initialize the chain's home directory:
  
   ```bash
   git clone --depth 1 --branch v0.6.2 https://github.com/warden-protocol/wardenprotocol
   cd wardenprotocol
   just wardend build
   just wardend install
   wardend init my-chain-moniker
   ```

## Create a new key

To create a new key, run this:

```bash
wardend keys add my-key-name
```

Write down the **mnemonic phrase** and the **address** of the new account. You'll need this information to interact with the chain and restore the account.

:::warning
The seed phrase is the only way to restore your keys. Losing it can result in the irrecoverable loss of WARD tokens.
:::

## Restore a key

## Get the key name

```bash
wardend keys list
```

If you used our `just` script to run the node with default settings, the local account name is `shulgin`.

## Get the public key

You can always check your public address by running this command:

```bash
wardend keys show my-key-name --address
```
## Get the private key

To get the private key associated with this account, run this:

```bash
wardend keys export my-key-name --unarmored-hex --unsafe
```

## Check the key balance

To check your balance, run this:
   
```bash
wardend query bank balances my-key-name --node https://rpc.chiado.wardenprotocol.org:443
```
## Fund a key
