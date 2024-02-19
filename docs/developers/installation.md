# Installation

Warden Protocol is composed by different components, each one with its own
installation instructions. This document will guide you through the process of
installing each one of them.

## Prerequisites

- [Go](https://golang.org/dl/) 1.21 or later
- [Ignite](https://docs.ignite.com/welcome/install)
- Clone the repository:

```bash
git clone https://github.com/warden-protocol/wardenprotocol --depth=1
cd wardenprotocol
```

## Docker

You can run all the services using Docker and Docker Compose.

All you need to run is:

```bash
docker-compose up
```

You can also bring up specific services to run in the background, while running
the rest locally on your machine for easier debugging.


## Wardend (blockchain node)

### Build

```bash
ignite chain build
```

This will clone our repository and build the chain binary called `wardend`.

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
some accounts and a keychain pre-configured. Using this method will make it
easier to run other services (e.g. faucet, keychain, ...).


## Faucet

### From source

You can run the faucet directly from source.

#### Build

```bash
go run ./warden/cmd/faucet
```

It will start a server on `::8080` that you can use to request tokens.

The faucet will use the same keychain as the `wardend` node, so you can use the
same accounts to request tokens.


## WardenKMS

### From source

You can run WardenKMS directly from source.

For developing purposes, we also provide a `config.yml` file that comes
pre-configured for using it with the chain ran by `ignite`.

#### Build

```bash
go run ./keychain/cmd/wardenkms -config ./keychain/cmd/wardenkms/config.yml
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
pnpm dev
```

### Build (production)

```bash
cd spaceward
pnpm run build
```
