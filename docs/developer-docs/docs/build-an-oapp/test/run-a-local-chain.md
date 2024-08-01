---
sidebar_position: 1
---

# Run a local chain

Goal: run a local chain for development and testing purposes.

## Prerequisites

- [Go](https://golang.org/dl/) 1.22.5 or later
- [just](https://just.systems/man/en/chapter_4.html)

## 1. Clone the Warden Protocol repo

```sh
git clone https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

## 2. Build the chain

Check if `just` is installed. If not, you can install it via brew:

```sh
brew install just
```

Then, you can proceed to install the `wardend` binary.

```sh
just install
```

This will build the chain binary called `wardend` and install it in your `$GOPATH`. Please check if your `wardend` binary has been properly installed by running the command `wardend version`.

You will see output as:

```sh
wardend version  
v0.4.0.0
```

## 3. Run the chain

### Option 1. Run the chain using `just`

Once `just` and `wardend` are correctly installed, you can start a new chain.

```sh
just localnet
```
This will start the chain and you will see blocks produced and height incrementing.

### Option 2. Run locally

This option is recommended for development purposes, when you want to manually configure the chain.

1. Initialize the Node

```sh
wardend init my-local-node --chain-id local-testnet
```

This will initialize a new node which you can find in the `$HOME/.warden/config` folder.

2. Create a Key Pair

```sh
wardend keys add my-validator
```

Tip: Note down the generated address and the mnemonic. This will be used to recover your account if needed.

3. Add Genesis Account

```sh
wardend genesis add-genesis-account my-validator 100000000000stake
```

Add the validator's address to the genesis file with sufficient tokens

4. Generate Genesis Transaction (gentx)

```sh
wardend genesis gentx my-validator 1000000000stake --chain-id local-testnet
```

Create a genesis transaction for your validator

5. Collect Genesis Transactions

```sh
wardend genesis collect-gentxs
```

Add the gentx to the genesis file

6. Validate the Genesis File

```sh
wardend genesis validate-genesis
```

Ensure the genesis file is valid

7. Configure app.toml

Navigate to $HOME/.warden/config/app.toml and edit the gas value as needed.

```toml
minimum-gas-prices = "0.025stake"
```

8. Start the Node

```sh
wardend start
```

This will start the chain and you will see blocks produced and height incrementing.

### Option 3. Use the devnet snapshot

This option is recommended for testing purposes.

Download the devnet snapshot and extract it to `~/.warden`:

```sh
wget https://github.com/warden-protocol/snapshots/raw/main/devnet.tar.gz
mkdir ~/.warden
tar -xvf devnet.tar.gz -C ~/.warden
```

:::tip

Tip: we have other snapshots available at https://github.com/warden-protocol/snapshots that can be used as alternative starting points.

:::

Then run the chain:

```sh
wardend start
```

## 4. Confirm the chain is running

You should see some logs every time a new block is produced (every second).

You should also be able to query the chain and find some data from the genesis block:

```sh
$ wardend q warden keychains

keychains:
- admins:
  - warden16hmn8nh3fn79ce53fxdmp6p7fpp4mdncf70xug
  creator: warden16hmn8nh3fn79ce53fxdmp6p7fpp4mdncf70xug
  description: WardenKMS
  id: "1"
  is_active: true
  writers:
  - warden1phhmc2wkx0h4qdnuh0me47xlkgh3rnk8zayxnk
pagination:
  total: "1"
```
