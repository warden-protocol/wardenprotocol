# Docker test environment

This is meant to be used for testing Warden network locally for dynamic amount of validators

## Services

This script will deploy these services

| Name      | Port (localhost)         |
| --------- | ------------------------ |
| wardend   | 26657, 26656, 1317, 8545 |
| faucet    | 8081                     |
| spaceward | 8082                     |
| kms       | internal                 |

## Usage

First cleans up any existing network and then initialises the new network, this
will create genesis, configuration, volumes for the validators.

It will also generate `docker-compose.yaml` file for deployment.

```
make init
```

Deploy the network

```
make deploy
```

Cleans up everything

```
make clean
```

Will initialize and deploy the network

```
make all
```

## Defaults

| Name       | Description                    | Default        |
| ---------- | ------------------------------ | -------------- |
| CHAIN_ID   | The chain ID that will be used | devnet_12345-1 |
| VALIDATORS | The amount of validators       | 3              |
| DENOM      | The denom that will be used    | award          |
