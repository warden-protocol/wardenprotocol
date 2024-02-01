# Warden Protocol

The Warden Protocol is a blockchain built with the Cosmos SDK to provide
various execution layers for interoperability and key management actions. It
provides functions to create spaces and keychains in the [identity
module](./blockchain/x/identity/README.md), request keys and signatures from a
specific keychain in the [keychain module](./blockchain/x/keychain/README.md), and
allows publishing custom intents that can be added through the [intent
module](./blockchain/x/intent/README.md). An intent is a set of declarative
constraints which allow a user to predefine and enforce certain rules and
activity. 

CosmWasm and Ethermint have both been integrated in order to leverage execution
of WASM and EVM-based smart contracts. Furthermore, Warden Protocol comes with the
latest IBC version to connect with other chains via IBC to transfer of funds or
interchain accounts and queries.

## Joining the Network

We have provided documentation on setting up and using Warden.

- [Setup the Warden Protocol](./SETUP.md)
- [CLI tutorial](./GUIDE.md)

## Run your own Keychain

To learn more about keychains and how you can run your own, visit the [keychain
documentation](./keychain/README.md).

## Contributing

We are appreciating all contributions to Warden Protocol and will closely
review them. Find more information on how to contribute in the [contributing
file](./CONTRIBUTING.md).


## License

This project is released under the terms of the Apache 2.0 License - see
LICENSE for details. The repository is [REUSE](https://reuse.software/)
compliant. The copyright owner are listed in the `.reuse/dep5` file or in the
respective copyright notice.

