# Setup

This page describes the necessary steps to take before running and using Warden Protocol. 

## Contents

* [Requirements](#requirements)
* [Setup](#setup)
    * [Run the Chain](#run-the-chain)
    * [Faucet](#faucet)
    * [Keychain](#keychain)
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
git clone https://github.com/warden-protocol/wardenprotocol.git & cd wardenprotocol
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
wardend start
```

#### Faucet

If you don't use the default key, you need to fund your account. Run the faucet:

```bash
cd blockchain
go run cmd/faucet/faucet.go
```

Fund your Warden Protocol wallet

```bash
curl localhost:8000 -XPOST -d'{"address":"warden1ud49m3n00jkmtayj9w7k35zka3fqcl4l0chkjh"}'
```

#### Local keychain (wardenkms)

In a separate terminal, switch to the `keychain` directory and run it:

```bash
cd keychain && go run ./cmd/wardenkms -config ./cmd/wardenkms/config.yml
```

`keychain` will automatically monitor the chain and generate new keys and
signatures when requested.

#### Accounts

To interact with the chain you can use the `wardend` CLI tool.

It's suggested to create an alias like this:

```bash
alias w="wardend --node tcp://localhost:26657 --home ~/.wardend/ --from shulgin --gas-prices 1000000000uward"
```

that includes some common flags:

- `--node tcp://localhost:26657`, the Tendermint RPC endpoint
- `--home ~/.wardend/`, the directory containing node data
- `--from shulgin`, the account being used to sign transactions
- `--gas-prices 1000000000uward`, the fee for transactions

### Additional tools

After a successful setup of Warden Protocol, you can find here additional tools to interact or deploy on Warden Protocol.

#### Web Frontend 

The web frontend is a React.js app bundled with Vite. We use `pnpm` instead of
`npm`.

Ensure to have `pnpm` installed by following [the installation
instruction](https://pnpm.io/installation) for your system.

To run the development version (with hot reloading), run:

```bash
cd web

pnpm install  # only the first time

pnpm run dev
```

Make sure you have the [Keplr Wallet](https://www.keplr.app/download) installed
in your browser to interact with the chain. 

