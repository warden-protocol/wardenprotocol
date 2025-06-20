
# Installation

The Warden Protocol is composed by different components, each one with its own
installation instructions. This document will guide you through the process of
installing each one of these components.

## Prerequisites

- [Go](https://golang.org/dl/) 1.22 or later
- [just](https://just.systems/man/en/packages.html)
- Clone the repository:

```bash
git clone https://github.com/warden-protocol/wardenprotocol --depth=1
cd wardenprotocol
```

## Docker

You can run all the services using Docker and Docker Compose.

All you need to run is:

```bash
docker compose up
```

You can also bring up specific services to run in the background, while running
the rest locally on your machine for easier debugging.


## Wardend (blockchain node)

### Build

```bash
just install
```

This will build the chain binary called `wardend` and install it in your
`$GOPATH`.

Verify the installation by running:

```bash
wardend version
```

If you can't find the `wardend` binary, make sure your `PATH` includes the
`$GOPATH/bin` directory (by default `$GOPATH` is `~/go`).


### Run

When developing, it's best to use `ignite` to run the node:

```bash
ignite chain serve -p ./warden --home ~/.warden
```

This will start the node with a default configuration and genesis that contains
some accounts and a Keychain pre-configured. Using this method will make it
easier to run other services (e.g. faucets, Keychains, etc.).


## Faucet

### Build

You can use `just`:

```bash
just build faucet
./build/faucet
```

or run it directly:

```bash
go run ./cmd/faucet
```

It will start a server on `::8000` that you can use to request tokens.

The faucet will use the same keychain as the `wardend` node, so you can use the
same accounts to request tokens.

You can use `curl` to request tokens:

```bash
curl http://localhost:8000/faucet --json '{"address": "wardenXXX"}'
```


## WardenKMS

### Build

You can use `just`:

```bash
just build wardenkms
./build/wardenkms
```

or run it directly:

```bash
KEYRING_MNEMONIC="liberty lucky weapon argue blast borrow matrix fabric topple auto tomato age simple obvious mushroom hire edge vault federal climb step element divorce problem" \
  KEYRING_PASSWORD="$USER" \
  go run ./cmd/wardenkms
```


## SpaceWard

SpaceWard is a React app bundled with Vite.

### Prerequisites

We use `pnpm` as the package manager, so make sure you have it installed.

```bash
npm install -g pnpm
```

### Run (development)

```bash
cd spaceward
pnpm install
just dev
```

### Build (production)

```bash
cd spaceward
pnpm run build
```
