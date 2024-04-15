# Warden Contracts

This repo contains bindings (with usage examples) for accessing functionality of Warden Protocol blockchain
from CosmWasm contracts.

## Build

```shell
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/workspace-optimizer:0.13.0
```
## License

This repo is licensed under [Apache 2.0](./LICENSE).
