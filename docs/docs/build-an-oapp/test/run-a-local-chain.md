---
sidebar_position: 1
---

# Run a local chain

Goal: run a local chain for development and testing purposes.

## Prerequisites

- [Go](https://golang.org/dl/) 1.22 or later
- [just](https://just.systems/man/en/chapter_4.html)

## 1. Clone the Warden Protocol repo

```sh
git clone https://github.com/warden-protocol/wardenprotocol
cd wardenprotocol
```

## 2. Build the chain

```sh
cd wardenprotocol
just install
```

This will build the chain binary called `wardend` and install it in your `$GOPATH`.


## 3. Run the chain

### Option 1. Use `ignite`

This option is recommended for development purposes.

```sh
ignite chain serve -p warden --home ~/.warden -v
```

### Option 2. Use the devnet snapshot

This option is recommended for testing purposes and doesn't require installing other tools such as `ignite`.

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
