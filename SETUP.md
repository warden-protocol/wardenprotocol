# Setup

This page describes the necessary steps to take before running and using the Fusion Chain. 

## Contents

* [Requirements](#requirements)
* [Setup](#setup)
    * [Run the Chain](#run-the-chain)
    * [Faucet](#faucet)
    * [Keyring](#keyring)
    * [Accounts](#accounts)
* [Additional Tools](#additional-tools)
    * [Frontend](#web-frontend)
    * [Contracts](#cosmwasm-contracts)
    * [Sepolia Watcher](#sepolia-watcher)

## Prerequisites

### Requirements

- go 1.21+
- make
- docker (used to regenerate protobufs)

### Setup

#### Run the chain

Clone the repo:

```bash
git clone git@github.com:qredo/fusionchain.git
```

The `blockchain` directory contains the Cosmos SDK blockchain code. We can run
a local node with the following:

```bash
cd blockchain
./init.sh
```

This will run a local node with a couple of pre-funded accounts.

Ports:

- Port 26657 is the Cosmos & Tendermint RPC port for interacting with CosmWasm contracts and Cosmos accounts
- Port 8545 is the Ethermint RPC port for interacting with Ethereum accounts and contracts

Resume the chain after stopping the daemon 
```bash
fusiond start
```

#### Faucet

If you don't use the default key, you need to fund your account. Run the faucet:

```bash
cd blockchain
go run cmd/faucet/faucet.go
```

Fund your Fusion Chain wallet

```bash
curl localhost:8000 -XPOST -d'{"address":"qredo1ud49m3n00jkmtayj9w7k35zka3fqcl4lqp2j03"}'
```

#### Keyring

Currently, we have two implementations of keyrings for Fusionchain. A simple mocked keyring (`mokr`) and a more realistic keyring interface with a mocked keyring (`keyring`). Pick one of the two implementations to get started. Both keyrings listen to requests for the same default keyring address `qredokeyring1ph63us46lyw56vrzgaq`.

##### Mork
In a separate terminal, switch to the mocked keyring (`mokr`) and run it:

```bash
cd mokr && go run .
```

`mokr` will automatically monitor the chain and generate new keys and
signatures when requested.

##### Keyring
In a separate terminal, switch to the `keyring` directory and run it:

```bash
cd keyring/cmd/mpc-relayer && go run main.go
```

`keyring` will automatically monitor the chain and generate new keys and
signatures when requested.

#### Accounts

To interact with the chain you can use the `fusiond` CLI tool.

It's suggested to create an alias like this:

```bash
alias fchain="fusiond --node tcp://localhost:26657 --home ~/.fusiond/ --from shulgin --gas-prices 1000000000nQRDO"
```

that includes some common flags:

- `--node tcp://localhost:26657`, the Tendermint RPC endpoint
- `--home ~/.fusiond/`, the directory containing keys data
- `--from shulgin`, the account being used to sign transactions
- `--gas-prices 1000000000nQRDO`, the fee for transactions

### Additional tools

After a successful setup of the Fusion Chain, you can find here additional tools to interact or deploy on the Fusion Chain.

#### Web Frontend 

```bash
## changes to the web directory
cd web

## install node packages
npm install

## starts local frontend
npm run dev
```

On Mac you may need to install the following dependencies:
```bash
brew install npm
npm install vite
```

Make sure you have the [Keplr Wallet](https://www.keplr.app/download) installed in your browser to interact with the chain. 

#### Sepolia Relayer

If you want to broadcast a transaction that was requested, signed and published via Fusionchain, take a look at the [relayer-eth](./relayer-eth/README.md) directory.

