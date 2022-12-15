// Package rpc contains RPC handler methods, namespaces and utilities to start
// Ethermint's Web3-compatible JSON-RPC server.
//
// The list of available namespaces are:
//
// * `rpc/namespaces/eth`: `eth` namespace. Exposes the `PublicEthereumAPI` and the `PublicFilterAPI`.
// * `rpc/namespaces/personal`: `personal` namespace. Exposes the `PrivateAccountAPI`.
// * `rpc/namespaces/net`: `net` namespace. Exposes the `PublicNetAPI`.
// * `rpc/namespaces/web3`: `web3` namespace. Exposes the `PublicWeb3API`
package rpc
