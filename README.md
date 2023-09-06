# Fusion Chain

The Fusion Chain is a blockchain built with the Cosmos SDK to provide various execution layers within the Qredo network.
It provides functions to create workspaces and keyrings in the [identity module](./blockchain/x/identity/README.md), 
request keys and signatures from a specific keyring in the [treasury module](./blockchain/x/treasury/README.md),
manage QAssets that represent funds on other L1s in the [QAssets module](./blockchain/x/qassets/README.md), 
and allows publishing custom policies that can be added through the [blackbird module](./blockchain/x/blackbird/README.md). 

CosmWasm and Ethermint have both been integrated in order to leverage execution of WASM and EVM-based smart contracts.
Furthermore, Fusion Chain comes with the latest IBC version to connect with other chains via IBC to transfer of funds or
interchain accounts and -queries. 

## Joining the Network

We have provided documentation on setting up and using the Fusion Chain.
- [Setup the Fusion Chain](./SETUP.md)
- [Tx Guide](./GUIDE.md)

## Contributing

We are appreciating all contributions to Fusion Chain and will closely review them. Find more information on how to
contribute to the Fusion Chain in the [contributing file](./CONTRIBUTING.md).

