<!--
Guiding Principles:

Changelogs are for humans, not machines.
There should be an entry for every single version.
The same types of changes should be grouped.
Versions and sections should be linkable.
The latest version comes first.
The release date of each version is displayed.
Mention whether you follow Semantic Versioning.

Usage:

Change log entries are to be added to the Unreleased section under the
appropriate stanza (see below). Each entry should ideally include a tag and
the Github issue reference in the following format:

* (<tag>) \#<issue-number> message

The issue numbers will later be link-ified during the release process so you do
not have to worry about including a link manually, but you can if you wish.

Types of changes (Stanzas):

"Features" for new features.
"Improvements" for changes in existing functionality.
"Deprecated" for soon-to-be removed features.
"Bug Fixes" for any bug fixes.
"Client Breaking" for breaking CLI commands and REST routes used by end-users.
"API Breaking" for breaking exported APIs used by developers building on SDK.
"State Machine Breaking" for any changes that result in a different AppState given same genesisState and txList.

Ref: https://keepachangelog.com/en/1.0.0/
-->

# Changelog

## Unreleased

### Features

* (rpc) [#1682](https://github.com/evmos/ethermint/pull/1682) Add config for maximum number of bytes returned from eth_call.

### State Machine Breaking

- (deps) [#1168](https://github.com/evmos/ethermint/pull/1716) Bump Cosmos-SDK to v0.46.11, Tendermint to v0.34.27, IAVL v0.19.5 and btcd to v0.23.4
- (app) [#1739](https://github.com/evmos/ethermint/pull/1739) Remove distribution module perms
- (ante) [#1741](https://github.com/evmos/ethermint/pull/1741) Add authz ante handler
- (eip712) [#1746](https://github.com/evmos/ethermint/pull/1746) Add EIP712 support for multiple messages and schemas
- (feemarket) [#1790](https://github.com/evmos/ethermint/pull/1790) Raise error when get invalid consensus params
- (deps) [#1782](https://github.com/evmos/ethermint/pull/1782) Bump Cosmos-SDK to v0.47.3 and ibc-go to v7.1.0.

### Bug Fixes

- (rpc) [#1688](https://github.com/evmos/ethermint/pull/1688) Align filter rule for `debug_traceBlockByNumber`
- (rpc) [#1722](https://github.com/evmos/ethermint/pull/1722) Align revert response for `eth_estimateGas` and `eth_call` as Ethereum.
- (rpc) [#1720](https://github.com/evmos/ethermint/pull/1720) Fix next block fee for historical block and calculate base fee by params.
- (rpc) [#1685](https://github.com/evmos/ethermint/pull/1685) Fix parse for websocket connID.
- (rpc) [#1773](https://github.com/evmos/ethermint/pull/1773) Avoid channel get changed when concurrent subscribe happens.

### Improvements

- (ante) [#1717](https://github.com/evmos/ethermint/pull/1717) Reuse sender recovery result.
- (cli) [#242](https://github.com/crypto-org-chain/ethermint/pull/242) Integrate tendermint bootstrap cmd.
- (cli) [#246](https://github.com/crypto-org-chain/ethermint/pull/246) Call app.Close to cleanup resource on graceful shutdown.


## [v0.21.0] - 2023-01-26

### State Machine Breaking

- (feemarket) [#1509](https://github.com/evmos/ethermint/pull/1509) Deprecate usage of x/params in x/feemarket
- (evm) [#1472](https://github.com/evmos/ethermint/pull/1472) Deprecate usage of x/params in x/evm
- (deps) [#1575](https://github.com/evmos/ethermint/pull/1575) Bump ibc-go to [`v6.1.0`](https://github.com/cosmos/ibc-go/releases/tag/v6.1.0)

### Improvements

- (cli) [#1615](https://github.com/evmos/ethermint/pull/1615) Support customize db opener in `StartCmd`.
- (evm) [#1582](https://github.com/evmos/ethermint/pull/1582) Cleanup `evm` files
- (evm) [#1544](https://github.com/evmos/ethermint/pull/1544) Migrate deprecated event emitting to new `TypedEvent`
- (deps) [#1532](https://github.com/evmos/ethermint/pull/1532) Upgrade Go-Ethereum version to [`v1.10.26`](https://github.com/ethereum/go-ethereum/releases/tag/v1.10.26).

### Bug Fixes

- (upgrade) [#1617](https://github.com/evmos/ethermint/pull/1617) Refactor `evm` module's parameters to store them under a single store key
- (rpc) [#1600](https://github.com/evmos/ethermint/pull/1600) Revert changes from `TypedEvents`
- (rpc) [#1613](https://github.com/evmos/ethermint/pull/1613) Change the default json-rpc listen address to localhost.
- (rpc) [#1611](https://github.com/evmos/ethermint/pull/1611) Add missing next fee in fee history, fix wrong oldestBlock and align earliest input as ethereum.
- (proto) [#1586](https://github.com/evmos/ethermint/pull/1586) Avoid duplicate register proto type in `evm` & `feemarket`
- (rpc) [#1638](https://github.com/evmos/ethermint/pull/1638) Align results when querying `eth_getTransactionCount` for future blocks for accounts with zero and non-zero transaction counts.
- (rpc) [#1639](https://github.com/evmos/ethermint/pull/1639) Align block number input behaviour for `eth_getProof` as Ethereum.

## [v0.20.0] - 2022-12-28

### State Machine Breaking

- (deps) [#1564](https://github.com/evmos/ethermint/pull/1564) Bump ibc-go to [`v5.2.0`](https://github.com/cosmos/ibc-go/releases/tag/v5.2.0)
- (evm) [#1272](https://github.com/evmos/ethermint/pull/1272) Implement modular interface for the EVM.
- (deps) [#1551](https://github.com/evmos/ethermint/pull/1551) Upgrade Cosmos SDK to [`v0.46.7`](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.46.7).
- (feemarket) [#1194](https://github.com/evmos/ethermint/pull/1194) Apply feemarket to native cosmos tx.
- (eth) [#1346](https://github.com/evmos/ethermint/pull/1346) Added support for `sdk.Dec` and `ed25519` type on eip712.
- (evm) [#1452](https://github.com/evmos/ethermint/pull/1452) Simplify Gas Math in `ApplyTransaction`.
- (eth) [#1430](https://github.com/evmos/ethermint/pull/1430) Added support for array of type `Any` on eip712.
- (ante) [1460](https://github.com/evmos/ethermint/pull/1460) Add KV Gas config on ethereum Txs.
- (eth) [#1459](https://github.com/evmos/ethermint/pull/1459) Added support for messages with optional types omitted on eip712.
- (geth) [#1413](https://github.com/evmos/ethermint/pull/1413) Update go-ethereum version to [`v1.10.26`](https://github.com/ethereum/go-ethereum/releases/tag/v1.10.26).
- (deps) [#1419](https://github.com/evmos/ethermint/pull/1419) Add ics23 patch for dragonberry and bump iavl to v0.19.4

### API Breaking

- (ante) [#1521](https://github.com/evmos/ethermint/pull/1521) Deprecate support for legacy EIP-712 signature verification implementation via AnteHandler decorator.
- (ante) [#1214](https://github.com/evmos/ethermint/pull/1214) Set mempool priority to EVM transactions.
- (evm) [#1405](https://github.com/evmos/ethermint/pull/1405) Add parameter `chainID` to evm keeper's `EVMConfig` method, so caller can choose to not use the cached `eip155ChainID`.

### Features

- (ci) [#1528](https://github.com/evmos/ethermint/pull/1528) Add Golang dependency vulnerability checker.
- (app) [#1501](https://github.com/evmos/ethermint/pull/1501) Set default File store listener for application from [ADR38](https://docs.cosmos.network/v0.47/architecture/adr-038-state-listening)

### Improvements

- (tests) [#1507](https://github.com/evmos/ethermint/pull/1507) Remove legacy sim tests
- (feemarket) [#1508](https://github.com/evmos/ethermint/pull/1508) Remove old x/params migration logic
- (evm) [#1499](https://github.com/evmos/ethermint/pull/1499) Add Shanghai and Cancun block
- (ante) [#1455](https://github.com/evmos/ethermint/pull/1455) Refactor `AnteHandler` logic
- (evm) [#1444](https://github.com/evmos/ethermint/pull/1444) Improve performance of `eth_estimateGas`
- (ante) [#1388](https://github.com/evmos/ethermint/pull/1388) Optimize AnteHandler gas consumption
- (lint) [#1298](https://github.com/evmos/ethermint/pull/1298) 150 character line length limit, `gofumpt`, and linting
- (feemarket) [#1165](https://github.com/evmos/ethermint/pull/1165) Add hint in specs about different gas terminology in Cosmos and Ethereum.
- (cli) [#1226](https://github.com/evmos/ethermint/pull/1226) Add custom app db backend flag.
- (ante) [#1289](https://github.com/evmos/ethermint/pull/1289) Change the fallback tx priority mechanism to be based on gas price.
- (test) [#1311](https://github.com/evmos/ethermint/pull/1311) Add integration test for the `rollback` cmd
- (ledger) [#1277](https://github.com/evmos/ethermint/pull/1277) Add Ledger preprocessing transaction hook for EIP-712-signed Cosmos payloads.
- (rpc) [#1296](https://github.com/evmos/ethermint/pull/1296) Add RPC Backend unit tests.
- (rpc) [#1352](https://github.com/evmos/ethermint/pull/1352) Make the grpc queries run concurrently, don't block the consensus state machine.
- (cli) [#1360](https://github.com/evmos/ethermint/pull/1360) Introduce a new `grpc-only` flag, such that when enabled, will start the node in a query-only mode. Note, gRPC MUST be enabled with this flag.
- (rpc) [#1378](https://github.com/evmos/ethermint/pull/1378) Add support for EVM RPC metrics
- (ante) [#1390](https://github.com/evmos/ethermint/pull/1390) Added multisig tx support.
- (test) [#1396](https://github.com/evmos/ethermint/pull/1396) Increase test coverage for the EVM module `keeper`
- (ante) [#1397](https://github.com/evmos/ethermint/pull/1397) Refactor EIP-712 signature verification to support EIP-712 multi-signing.
- (deps) [#1416](https://github.com/evmos/ethermint/pull/1416) Bump Go version to `1.19`
- (cmd) [#1417](https://github.com/evmos/ethermint/pull/1417) Apply Google CLI Syntax for required and optional args.
- (deps) [#1456](https://github.com/evmos/ethermint/pull/1456) Migrate errors-related functionality from "github.com/cosmos/cosmos-sdk/types/errors" (deprecated) to "cosmossdk.io/errors"

### Bug Fixes

- (rpc) [#1561](https://github.com/evmos/ethermint/pull/1561) Fix call to `NewMnemonic` in `personal_newAccount`
- (cli) [#1550](https://github.com/evmos/ethermint/pull/1550) Fix signature algorithm validation and default for Ledger.
- (eip712) [#1543](https://github.com/evmos/ethermint/pull/1543) Improve error handling for EIP-712 encoding config initialization.
- (app) [#1505](https://github.com/evmos/ethermint/pull/1505) Setup gRPC node service with the application.
- (server) [#1497](https://github.com/evmos/ethermint/pull/1497) Fix telemetry server setup for observability
- (rpc) [#1442](https://github.com/evmos/ethermint/pull/1442) Fix decoding of `finalized` block number.
- (rpc) [#1179](https://github.com/evmos/ethermint/pull/1179) Fix gas used in traceTransaction response.
- (rpc) [#1284](https://github.com/evmos/ethermint/pull/1284) Fix internal trace response upon incomplete `eth_sendTransaction` call.
- (rpc) [#1340](https://github.com/evmos/ethermint/pull/1340) Fix error response when `eth_estimateGas` height provided is not found.
- (rpc) [#1354](https://github.com/evmos/ethermint/pull/1354) Fix grpc query failure(`BaseFee` and `EthCall`) on legacy block states.
- (cli) [#1362](https://github.com/evmos/ethermint/pull/1362) Fix `index-eth-tx` error when the indexer db is empty.
- (state) [#1320](https://github.com/evmos/ethermint/pull/1320) Fix codehash check mismatch when the code has been deleted in the evm state.
- (rpc) [#1392](https://github.com/evmos/ethermint/pull/1392) Allow fill the proposer address in json-rpc through tendermint api, and pass explicitly to grpc query handler.
- (rpc) [#1431](https://github.com/evmos/ethermint/pull/1431) Align hex-strings proof fields in `eth_getProof` as Ethereum.
- (proto) [#1466](https://github.com/evmos/ethermint/pull/1466) Fix proto scripts and upgrade them to mirror current cosmos-sdk scripts
- (rpc) [#1405](https://github.com/evmos/ethermint/pull/1405) Fix uninitialized chain ID field in gRPC requests.
- (analytics) [#1434](https://github.com/evmos/ethermint/pull/1434) Remove unbound labels from custom tendermint metrics.
- (rpc) [#1484](https://github.com/evmos/ethermint/pull/1484) Align empty account result for old blocks as ethereum instead of return account not found error.
- (rpc) [#1503](https://github.com/evmos/ethermint/pull/1503) Fix block hashes returned on JSON-RPC filter `eth_newBlockFilter`.
- (rpc) [#1557](https://github.com/evmos/ethermint/pull/1557) Patch GasUsed before the fix of revert gas refund logic when transaction reverted for `eth_getTransactionReceipt`.
- (ante) [#1566](https://github.com/evmos/ethermint/pull/1566) Fix `gasWanted` on `EthGasConsumeDecorator` ante handler when running transaction in `ReCheckMode`
- (rpc) [#1591](https://github.com/evmos/ethermint/pull/1591) Fix block number returned in opcode for debug trace related api.

## [v0.19.3] - 2022-10-14

- (deps) [1381](https://github.com/evmos/ethermint/pull/1381) Bump sdk to `v0.45.9`

## [v0.19.2] - 2022-08-29

### Improvements

- (deps) [1301](https://github.com/evmos/ethermint/pull/1301) Bump Cosmos SDK to `v0.45.8`, Tendermint to `v0.34.21`, IAVL to `v0.19.1` & store options

## [v0.19.1] - 2022-08-26

### State Machine Breaking

- (eth) [#1305](https://github.com/evmos/ethermint/pull/1305) Added support for optional params, basic types arrays and `time` type on eip712.

## [v0.19.0] - 2022-08-15

### State Machine Breaking

- (deps) [#1159](https://github.com/evmos/ethermint/pull/1159) Bump Geth version to `v1.10.19`.
- (ante) [#1176](https://github.com/evmos/ethermint/pull/1176) Fix invalid tx hashes; Remove `Size_` field and validate `Hash`/`From` fields in ante handler,
  recompute eth tx hashes in JSON-RPC APIs to fix old blocks.
- (ante) [#1173](https://github.com/evmos/ethermint/pull/1173) Make `NewAnteHandler` return error if input is invalid

### API Breaking

- (rpc) [#1121](https://github.com/tharsis/ethermint/pull/1121) Implement Ethereum tx indexer

### Bug Fixes

- (rpc) [#1179](https://github.com/evmos/ethermint/pull/1179) Fix gas used in `debug_traceTransaction` response.

### Improvements

- (test) [#1196](https://github.com/evmos/ethermint/pull/1196) Integration tests setup
- (test) [#1199](https://github.com/evmos/ethermint/pull/1199) Add backend test suite with mock gRPC query client
- (test) [#1189](https://github.com/evmos/ethermint/pull/1189) JSON-RPC unit tests
- (test) [#1212](https://github.com/evmos/ethermint/pull/1212) Prune node integration tests
- (test) [#1207](https://github.com/evmos/ethermint/pull/1207) JSON-RPC types integration tests
- (test) [#1218](https://github.com/evmos/ethermint/pull/1218) Restructure JSON-RPC API
- (rpc) [#1229](https://github.com/evmos/ethermint/pull/1229) Add support for configuring RPC `MaxOpenConnections`
- (cli) [#1230](https://github.com/evmos/ethermint/pull/1230) Remove redundant positional height parameter from feemarket's query cli.
- (test)[#1233](https://github.com/evmos/ethermint/pull/1233) Add filters integration tests

## [v0.18.0] - 2022-08-04

### State Machine Breaking

- (evm) [\#1234](https://github.com/evmos/ethermint/pull/1234) Fix [CVE-2022-35936](https://github.com/evmos/ethermint/security/advisories/GHSA-f92v-grc2-w2fg) security vulnerability.
- (evm) [\#1174](https://github.com/evmos/ethermint/pull/1174) Don't allow eth txs with 0 in mempool.

### Improvements

- (ante) [\#1208](https://github.com/evmos/ethermint/pull/1208) Change default `MaxGasWanted` value.

## [v0.17.2] - 2022-07-26

### Bug Fixes

- (rpc) [\#1190](https://github.com/evmos/ethermint/issues/1190) Fix `UnmarshalJSON` panic of breaking EVM and fee market `Params`.
- (evm) [\#1187](https://github.com/evmos/ethermint/pull/1187) Fix `TxIndex` value (expected 0, actual 1) when trace the first tx of a block via `debug_traceTransaction` API.

## [v0.17.1] - 2022-07-13

### Improvements

- (rpc) [\#1169](https://github.com/evmos/ethermint/pull/1169) Remove unnecessary queries from `getBlockNumber` function

## [v0.17.0] - 2022-06-27

### State Machine Breaking

- (evm) [\#1128](https://github.com/evmos/ethermint/pull/1128) Clear tx logs if tx failed in post processing hooks
- (evm) [\#1124](https://github.com/evmos/ethermint/pull/1124) Reject non-replay-protected tx in `AnteHandler` to prevent replay attack

### API Breaking

- (rpc) [\#1126](https://github.com/evmos/ethermint/pull/1126) Make some JSON-RPC APIS work for pruned nodes.
- (rpc) [\#1143](https://github.com/evmos/ethermint/pull/1143) Restrict unprotected txs on the node JSON-RPC configuration.
- (all) [\#1137](https://github.com/evmos/ethermint/pull/1137) Rename go module to `evmos/ethermint`

### API Breaking

- (json-rpc) [tharsis#1121](https://github.com/tharsis/ethermint/pull/1121) Store eth tx index separately

### Improvements

- (deps) [\#1147](https://github.com/evmos/ethermint/pull/1147) Bump Go version to `1.18`.
- (feemarket) [\#1135](https://github.com/evmos/ethermint/pull/1135) Set lower bound of base fee to min gas price param
- (evm) [\#1142](https://github.com/evmos/ethermint/pull/1142) Rename `RejectUnprotectedTx` to `AllowUnprotectedTxs` for consistency with go-ethereum.

### Bug Fixes

- (rpc) [\#1138](https://github.com/evmos/ethermint/pull/1138) Fix GasPrice calculation with relation to `MinGasPrice`

## [v0.16.1] - 2022-06-09

### Improvements

- (feemarket) [\#1120](https://github.com/evmos/ethermint/pull/1120) Make `min-gas-multiplier` parameter accept zero value

### Bug Fixes

- (evm) [\#1118](https://github.com/evmos/ethermint/pull/1118) Fix `Type()` `Account` method `EmptyCodeHash` comparison

## [v0.16.0] - 2022-06-06

### State Machine Breaking

- (feemarket) [tharsis#1105](https://github.com/evmos/ethermint/pull/1105) Update `BaseFee` calculation based on `GasWanted` instead of `GasUsed`.

### API Breaking

- (feemarket) [tharsis#1104](https://github.com/evmos/ethermint/pull/1104) Enforce a minimum gas price for Cosmos and EVM transactions through the `MinGasPrice` parameter.
- (rpc) [tharsis#1081](https://github.com/evmos/ethermint/pull/1081) Deduplicate some json-rpc logic codes, cleanup several dead functions.
- (ante) [tharsis#1062](https://github.com/evmos/ethermint/pull/1062) Emit event of eth tx hash in ante handler to support query failed transactions.
- (analytics) [tharsis#1106](https://github.com/evmos/ethermint/pull/1106) Update telemetry to Ethermint modules.
- (rpc) [tharsis#1108](https://github.com/evmos/ethermint/pull/1108) Update GetGasPrice RPC endpoint with global `MinGasPrice`

### Improvements

- (cli) [tharsis#1086](https://github.com/evmos/ethermint/pull/1086) Add rollback command.
- (specs) [tharsis#1095](https://github.com/evmos/ethermint/pull/1095) Add more evm specs concepts.
- (evm) [tharsis#1101](https://github.com/evmos/ethermint/pull/1101) Add tx_type, gas and counter telemetry for ethereum txs.

### Bug Fixes

- (rpc) [tharsis#1082](https://github.com/evmos/ethermint/pull/1082) fix gas price returned in getTransaction api.
- (evm) [tharsis#1088](https://github.com/evmos/ethermint/pull/1088) Fix ability to append log in tx post processing.
- (rpc) [tharsis#1081](https://github.com/evmos/ethermint/pull/1081) fix `debug_getBlockRlp`/`debug_printBlock` don't filter failed transactions.
- (ante) [tharsis#1111](https://github.com/evmos/ethermint/pull/1111) Move CanTransfer decorator before GasConsume decorator
- (types) [tharsis#1112](https://github.com/evmos/ethermint/pull/1112) Add `GetBaseAccount` to avoid invalid account error when create vesting account.

## [v0.15.0] - 2022-05-09

### State Machine Breaking

- (ante) [tharsis#1060](https://github.com/evmos/ethermint/pull/1060) Check `EnableCreate`/`EnableCall` in `AnteHandler` to short-circuit EVM transactions.
- (evm) [tharsis#1087](https://github.com/evmos/ethermint/pull/1087) Minimum GasUsed proportional to GasLimit and `MinGasDenominator` EVM module param.

### API Breaking

- (rpc) [tharsis#1070](https://github.com/evmos/ethermint/pull/1070) Refactor `rpc/` package:
  - `Backend` interface is now `BackendI`, which implements `EVMBackend` (for Ethereum namespaces) and `CosmosBackend` (for Cosmos namespaces)
  - Previous `EVMBackend` type is now `Backend`, which is the concrete implementation of `BackendI`
  - Move `rpc/ethereum/types` -> `rpc/types`
  - Move `rpc/ethereum/backend` -> `rpc/backend`
  - Move `rpc/ethereum/namespaces` -> `rpc/namespaces/ethereum`
- (rpc) [tharsis#1068](https://github.com/evmos/ethermint/pull/1068) Fix London hard-fork check logic in JSON-RPC APIs.

### Improvements

- (ci, evm) [tharsis#1063](https://github.com/evmos/ethermint/pull/1063) Run simulations on CI.

### Bug Fixes

- (rpc) [tharsis#1059](https://github.com/evmos/ethermint/pull/1059) Remove unnecessary event filtering logic on the `eth_baseFee` JSON-RPC endpoint.

## [v0.14.0] - 2022-04-19

### API Breaking

- (evm) [tharsis#1051](https://github.com/evmos/ethermint/pull/1051) Context block height fix on TraceTx. Removes `tx_index` on `QueryTraceTxRequest` proto type.
- (evm) [tharsis#1091](https://github.com/evmos/ethermint/pull/1091) Add query params command on EVM Module

### Improvements

- (deps) [tharsis#1046](https://github.com/evmos/ethermint/pull/1046) Bump Cosmos SDK version to [`v0.45.3`](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.45.3)
- (rpc) [tharsis#1056](https://github.com/evmos/ethermint/pull/1056) Make json-rpc namespaces extensible

### Bug Fixes

- (rpc) [tharsis#1050](https://github.com/evmos/ethermint/pull/1050) `eth_getBlockByNumber` fix on batch transactions
- (app) [tharsis#658](https://github.com/evmos/ethermint/issues/658) Support simulations for the EVM.

## [v0.13.0] - 2022-04-05

### API Breaking

- (evm) [tharsis#1027](https://github.com/evmos/ethermint/pull/1027) Change the `PostTxProcessing` hook interface to include the full message data.
- (feemarket) [tharsis#1026](https://github.com/evmos/ethermint/pull/1026) Fix REST endpoints to use `/ethermint/feemarket/*` instead of `/feemarket/evm/*`.

### Improvements

- (deps) [tharsis#1029](https://github.com/evmos/ethermint/pull/1029) Bump Cosmos SDK version to [`v0.45.2`](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.45.2)
- (evm) [tharsis#1025](https://github.com/evmos/ethermint/pull/1025) Allow to append logs after a post processing hook.

## [v0.12.2] - 2022-03-30

### Bug Fixes

- (feemarket) [tharsis#1021](https://github.com/evmos/ethermint/pull/1021) Fix fee market migration.

## [v0.12.1] - 2022-03-29

### Bug Fixes

- (evm) [tharsis#1016](https://github.com/evmos/ethermint/pull/1016) Update validate basic check for storage state.

## [v0.12.0] - 2022-03-24

### Bug Fixes

- (rpc) [tharsis#1012](https://github.com/evmos/ethermint/pull/1012) fix the tx hash in filter entries created by `eth_newPendingTransactionFilter`.
- (rpc) [tharsis#1006](https://github.com/evmos/ethermint/pull/1006) Use `string` as the parameters type to correct ambiguous results.
- (ante) [tharsis#1004](https://github.com/evmos/ethermint/pull/1004) Make `MaxTxGasWanted` configurable.
- (ante) [tharsis#991](https://github.com/evmos/ethermint/pull/991) Set an upper bound to gasWanted to prevent DoS attack.
- (rpc) [tharsis#990](https://github.com/evmos/ethermint/pull/990) Calculate reward values from all `MsgEthereumTx` from a block in `eth_feeHistory`.

## [v0.11.0] - 2022-03-06

### State Machine Breaking

- (ante) [tharsis#964](https://github.com/evmos/ethermint/pull/964) add NewInfiniteGasMeterWithLimit for storing the user provided gas limit. Fixes block's consumed gas calculation in the block creation phase.

### Bug Fixes

- (rpc) [tharsis#975](https://github.com/evmos/ethermint/pull/975) Fix unexpected `nil` values for `reward`, returned by `EffectiveGasTipValue(blockBaseFee)` in the `eth_feeHistory` RPC method.

### Improvements

- (rpc) [tharsis#979](https://github.com/evmos/ethermint/pull/979) Add configurable timeouts to http server
- (rpc) [tharsis#988](https://github.com/evmos/ethermint/pull/988) json-rpc server always use local rpc client

## [v0.10.1] - 2022-03-04

### Bug Fixes

- (rpc) [tharsis#970](https://github.com/evmos/ethermint/pull/970) Fix unexpected nil reward values on `eth_feeHistory` response
- (evm) [tharsis#529](https://github.com/evmos/ethermint/issues/529) Add support return value on trace tx response.

### Improvements

- (rpc) [tharsis#968](https://github.com/evmos/ethermint/pull/968) Add some buffer to returned gas price to provide better default UX for client.

## [v0.10.0] - 2022-02-26

### API Breaking

- (ante) [tharsis#866](https://github.com/evmos/ethermint/pull/866) `NewAnteHandler` constructor now receives a `HandlerOptions` field.
- (evm) [tharsis#849](https://github.com/evmos/ethermint/pull/849) `PostTxProcessing` hook now takes an Ethereum tx `Receipt` and a `from` `Address` as arguments.
- (ante) [tharsis#916](https://github.com/evmos/ethermint/pull/916) Don't check min-gas-price for eth tx if london hardfork enabled and feemarket enabled.

### State Machine Breaking

- (deps) [tharsis#912](https://github.com/evmos/ethermint/pull/912) Bump Cosmos SDK version to [`v0.45.1`](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.45.1)
- (evm) [tharsis#840](https://github.com/evmos/ethermint/pull/840) Store empty topics as empty array rather than nil.
- (feemarket) [tharsis#822](https://github.com/evmos/ethermint/pull/822) Update EIP1559 base fee in `BeginBlock`.
- (evm) [tharsis#817](https://github.com/evmos/ethermint/pull/817) Use `effectiveGasPrice` in ante handler, add `effectiveGasPrice` to tx receipt.
- (evm) [tharsis#808](https://github.com/evmos/ethermint/issues/808) increase nonce in ante handler for contract creation transaction.
- (evm) [tharsis#851](https://github.com/evmos/ethermint/pull/851) fix contract address used in EVM, this issue is caused by [tharsis#808](https://github.com/evmos/ethermint/issues/808).
- (evm) Reject invalid `MsgEthereumTx` wrapping tx
- (evm) Fix `SelfDestruct` opcode by deleting account code and state.
- (feemarket) [tharsis#855](https://github.com/evmos/ethermint/pull/855) Consistent `BaseFee` check logic.
- (evm) [tharsis#729](https://github.com/evmos/ethermint/pull/729) Refactor EVM `StateDB` implementation.
- (evm) [tharsis#945](https://github.com/evmos/ethermint/pull/945) Bumb Go-ethereum version to [`v1.10.16`](https://github.com/ethereum/go-ethereum/releases/tag/v1.10.16)

### Features

- (ante) [tharsis#950](https://github.com/evmos/ethermint/pull/950) Add support for EIP712 signed Cosmos transactions

### Improvements

- (types) [tharsis#884](https://github.com/evmos/ethermint/pull/884) Introduce a new `EthAccountI` interface for EVM-compatible account types.
- (types) [tharsis#849](https://github.com/evmos/ethermint/pull/849) Add `Type` function to distinguish EOAs from Contract accounts.
- (evm) [tharsis#826](https://github.com/evmos/ethermint/issues/826) Improve allocation of bytes of `tx.To` address.
- (evm) [tharsis#827](https://github.com/evmos/ethermint/issues/827) Speed up creation of event logs by using the slice insertion idiom with indices.
- (ante) [tharsis#819](https://github.com/evmos/ethermint/pull/819) Remove redundant ante handlers
- (app) [tharsis#873](https://github.com/evmos/ethermint/pull/873) Validate code hash in GenesisAccount
- (evm) [tharsis#901](https://github.com/evmos/ethermint/pull/901) Support multiple `MsgEthereumTx` in single tx.
- (config) [tharsis#908](https://github.com/evmos/ethermint/pull/908) Add `api.enable` flag for Cosmos SDK Rest server
- (feemarket) [tharsis#919](https://github.com/evmos/ethermint/pull/919) Initialize baseFee in default genesis state.
- (feemarket) [tharsis#943](https://github.com/evmos/ethermint/pull/943) Store the base fee as a module param instead of using state storage.

### Bug Fixes

- (rpc) [tharsis#955](https://github.com/evmos/ethermint/pull/955) Fix websocket server push duplicated messages to subscriber.
- (rpc) [tharsis#953](https://github.com/evmos/ethermint/pull/953) Add `eth_signTypedData` api support.
- (log) [tharsis#948](https://github.com/evmos/ethermint/pull/948) Redirect go-ethereum's logs to cosmos-sdk logger.
- (evm) [tharsis#884](https://github.com/evmos/ethermint/pull/884) Support multiple account types on the EVM `StateDB`.
- (rpc) [tharsis#831](https://github.com/evmos/ethermint/pull/831) Fix BaseFee value when height is specified.
- (evm) [tharsis#838](https://github.com/evmos/ethermint/pull/838) Fix splitting of trace.Memory into 32 chunks.
- (rpc) [tharsis#860](https://github.com/evmos/ethermint/pull/860) Fix `eth_getLogs` when specify blockHash without address/topics, and limit the response size.
- (rpc) [tharsis#865](https://github.com/evmos/ethermint/pull/865) Fix RPC Filter parameters being ignored
- (evm) [tharsis#871](https://github.com/evmos/ethermint/pull/871) Set correct nonce in `EthCall` and `EstimateGas` grpc query.
- (rpc) [tharsis#878](https://github.com/evmos/ethermint/pull/878) Workaround to make GetBlock RPC api report correct block gas used.
- (rpc) [tharsis#900](https://github.com/evmos/ethermint/pull/900) `newPendingTransactions` filter return ethereum tx hash.
- (rpc) [tharsis#933](https://github.com/evmos/ethermint/pull/933) Fix `newPendingTransactions` subscription deadlock when a Websocket client exits without unsubscribing and the node errors.
- (evm) [tharsis#932](https://github.com/evmos/ethermint/pull/932) Fix base fee check logic in state transition.

## [v0.9.0] - 2021-12-01

### State Machine Breaking

- (evm) [tharsis#802](https://github.com/evmos/ethermint/pull/802) Clear access list for each transaction

### Improvements

- (app) [tharsis#794](https://github.com/evmos/ethermint/pull/794) Setup in-place store migrators.
- (ci) [tharsis#784](https://github.com/evmos/ethermint/pull/784) Enable automatic backport of PRs.
- (rpc) [tharsis#786](https://github.com/evmos/ethermint/pull/786) Improve error message of `SendTransaction`/`SendRawTransaction` JSON-RPC APIs.
- (rpc) [tharsis#810](https://github.com/evmos/ethermint/pull/810) Optimize tx index lookup in web3 rpc

### Bug Fixes

- (license) [tharsis#800](https://github.com/evmos/ethermint/pull/800) Re-license project to [LGPLv3](https://choosealicense.com/licenses/lgpl-3.0/#) to comply with go-ethereum.
- (evm) [tharsis#794](https://github.com/evmos/ethermint/pull/794) Register EVM gRPC `Msg` server.
- (rpc) [tharsis#781](https://github.com/evmos/ethermint/pull/781) Fix get block invalid transactions filter.
- (rpc) [tharsis#782](https://github.com/evmos/ethermint/pull/782) Fix wrong block gas limit returned by JSON-RPC.
- (evm) [tharsis#798](https://github.com/evmos/ethermint/pull/798) Fix the semantic of `ForEachStorage` callback's return value

## [v0.8.1] - 2021-11-23

### Bug Fixes

- (feemarket) [tharsis#770](https://github.com/evmos/ethermint/pull/770) Enable fee market (EIP1559) by default.
- (rpc) [tharsis#769](https://github.com/evmos/ethermint/pull/769) Fix default Ethereum signer for JSON-RPC.

## [v0.8.0] - 2021-11-17

### State Machine Breaking

- (evm, ante) [tharsis#620](https://github.com/evmos/ethermint/pull/620) Add fee market field to EVM `Keeper` and `AnteHandler`.
- (all) [tharsis#231](https://github.com/evmos/ethermint/pull/231) Bump go-ethereum version to [`v1.10.9`](https://github.com/ethereum/go-ethereum/releases/tag/v1.10.9)
- (ante) [tharsis#703](https://github.com/evmos/ethermint/pull/703) Fix some fields in transaction are not authenticated by signature.
- (evm) [tharsis#751](https://github.com/evmos/ethermint/pull/751) don't revert gas refund logic when transaction reverted

### Features

- (rpc, evm) [tharsis#673](https://github.com/evmos/ethermint/pull/673) Use tendermint events to store fee market basefee.
- (rpc) [tharsis#624](https://github.com/evmos/ethermint/pull/624) Implement new JSON-RPC endpoints from latest geth version
- (evm) [tharsis#662](https://github.com/evmos/ethermint/pull/662) Disable basefee for non london blocks
- (cmd) [tharsis#712](https://github.com/evmos/ethermint/pull/712) add tx cli to build evm transaction
- (rpc) [tharsis#733](https://github.com/evmos/ethermint/pull/733) add JSON_RPC endpoint `personal_unpair`
- (rpc) [tharsis#734](https://github.com/evmos/ethermint/pull/734) add JSON_RPC endpoint `eth_feeHistory`
- (rpc) [tharsis#740](https://github.com/evmos/ethermint/pull/740) add JSON_RPC endpoint `personal_initializeWallet`
- (rpc) [tharsis#743](https://github.com/evmos/ethermint/pull/743) add JSON_RPC endpoint `debug_traceBlockByHash`
- (rpc) [tharsis#748](https://github.com/evmos/ethermint/pull/748) add JSON_RPC endpoint `personal_listWallets`
- (rpc) [tharsis#754](https://github.com/evmos/ethermint/pull/754) add JSON_RPC endpoint `debug_intermediateRoots`

### Bug Fixes

- (evm) [tharsis#746](https://github.com/evmos/ethermint/pull/746) Set EVM debugging based on tracer configuration.
- (app,cli) [tharsis#725](https://github.com/evmos/ethermint/pull/725) Fix cli-config for `keys` command.
- (rpc) [tharsis#727](https://github.com/evmos/ethermint/pull/727) Decode raw transaction using RLP.
- (rpc) [tharsis#661](https://github.com/evmos/ethermint/pull/661) Fix OOM bug when creating too many filters using JSON-RPC.
- (evm) [tharsis#660](https://github.com/evmos/ethermint/pull/660) Fix `nil` pointer panic in `ApplyNativeMessage`.
- (evm, test) [tharsis#649](https://github.com/evmos/ethermint/pull/649) Test DynamicFeeTx.
- (evm) [tharsis#702](https://github.com/evmos/ethermint/pull/702) Fix panic in web3 RPC handlers
- (rpc) [tharsis#720](https://github.com/evmos/ethermint/pull/720) Fix `debug_traceTransaction` failure
- (rpc) [tharsis#741](https://github.com/evmos/ethermint/pull/741) Fix `eth_getBlockByNumberAndHash` return with non eth txs
- (rpc) [tharsis#743](https://github.com/evmos/ethermint/pull/743) Fix debug JSON RPC handler crash on non-existing block

### Improvements

- (tests) [tharsis#704](https://github.com/evmos/ethermint/pull/704) Introduce E2E testing framework for clients
- (deps) [tharsis#737](https://github.com/evmos/ethermint/pull/737) Bump ibc-go to [`v2.0.0`](https://github.com/cosmos/ibc-go/releases/tag/v2.0.0)
- (rpc) [tharsis#671](https://github.com/evmos/ethermint/pull/671) Don't pass base fee externally for `EthCall`/`EthEstimateGas` apis.
- (evm) [tharsis#674](https://github.com/evmos/ethermint/pull/674) Refactor `ApplyMessage`, remove
  `ApplyNativeMessage`.
- (rpc) [tharsis#714](https://github.com/evmos/ethermint/pull/714) remove `MsgEthereumTx` support in `TxConfig`

## [v0.7.2] - 2021-10-24

### Improvements

- (deps) [tharsis#692](https://github.com/evmos/ethermint/pull/692) Bump Cosmos SDK version to [`v0.44.3`](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.44.3).
- (rpc) [tharsis#679](https://github.com/evmos/ethermint/pull/679) Fix file close handle.
- (deps) [tharsis#668](https://github.com/evmos/ethermint/pull/668) Bump Tendermint version to [`v0.34.14`](https://github.com/tendermint/tendermint/releases/tag/v0.34.14).

### Bug Fixes

- (rpc) [tharsis#667](https://github.com/evmos/ethermint/issues/667) Fix `ExpandHome` restrictions bypass

## [v0.7.1] - 2021-10-08

### Bug Fixes

- (evm) [tharsis#650](https://github.com/evmos/ethermint/pull/650) Fix panic when flattening the cache context in case transaction is reverted.
- (rpc, test) [tharsis#608](https://github.com/evmos/ethermint/pull/608) Fix rpc test.

## [v0.7.0] - 2021-10-07

### API Breaking

- (rpc) [tharsis#400](https://github.com/evmos/ethermint/issues/400) Restructure JSON-RPC directory and rename server config

### Improvements

- (deps) [tharsis#621](https://github.com/evmos/ethermint/pull/621) Bump IBC-go to [`v1.2.1`](https://github.com/cosmos/ibc-go/releases/tag/v1.2.1)
- (evm) [tharsis#613](https://github.com/evmos/ethermint/pull/613) Refactor `traceTx`
- (deps) [tharsis#610](https://github.com/evmos/ethermint/pull/610) Bump Cosmos SDK to [v0.44.1](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.44.1).

### Bug Fixes

- (rpc) [tharsis#642](https://github.com/evmos/ethermint/issues/642) Fix `eth_getLogs` when string is specified in filter's from or to fields
- (evm) [tharsis#616](https://github.com/evmos/ethermint/issues/616) Fix halt on deeply nested stack of cache context. Stack is now flattened before iterating over the tx logs.
- (rpc, evm) [tharsis#614](https://github.com/evmos/ethermint/issues/614) Use JSON for (un)marshaling tx `Log`s from events.
- (rpc) [tharsis#611](https://github.com/evmos/ethermint/pull/611) Fix panic on JSON-RPC when querying for an invalid block height.
- (cmd) [tharsis#483](https://github.com/evmos/ethermint/pull/483) Use config values on genesis accounts.

## [v0.6.0] - 2021-09-29

### State Machine Breaking

- (app) [tharsis#476](https://github.com/evmos/ethermint/pull/476) Update Bech32 HRP to `ethm`.
- (evm) [tharsis#556](https://github.com/evmos/ethermint/pull/556) Remove tx logs and block bloom from chain state
- (evm) [tharsis#590](https://github.com/evmos/ethermint/pull/590) Contract storage key is not hashed anymore

### API Breaking

- (evm) [tharsis#469](https://github.com/evmos/ethermint/pull/469) Deprecate `YoloV3Block` and `EWASMBlock` from `ChainConfig`

### Features

- (evm) [tharsis#469](https://github.com/evmos/ethermint/pull/469) Support [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)
- (evm) [tharsis#417](https://github.com/evmos/ethermint/pull/417) Add `EvmHooks` for tx post-processing
- (rpc) [tharsis#506](https://github.com/evmos/ethermint/pull/506) Support for `debug_traceTransaction` RPC endpoint
- (rpc) [tharsis#555](https://github.com/evmos/ethermint/pull/555) Support for `debug_traceBlockByNumber` RPC endpoint

### Bug Fixes

- (rpc, server) [tharsis#600](https://github.com/evmos/ethermint/pull/600) Add TLS configuration for websocket API
- (rpc) [tharsis#598](https://github.com/evmos/ethermint/pull/598) Check truncation when creating a `BlockNumber` from `big.Int`
- (evm) [tharsis#597](https://github.com/evmos/ethermint/pull/597) Check for `uint64` -> `int64` block height overflow on `GetHashFn`
- (evm) [tharsis#579](https://github.com/evmos/ethermint/pull/579) Update `DeriveChainID` function to handle `v` signature values `< 35`.
- (encoding) [tharsis#478](https://github.com/evmos/ethermint/pull/478) Register `Evidence` to amino codec.
- (rpc) [tharsis#478](https://github.com/evmos/ethermint/pull/481) Getting the node configuration when calling the `miner` rpc methods.
- (cli) [tharsis#561](https://github.com/evmos/ethermint/pull/561) `Export` and `Start` commands now use the same home directory.

### Improvements

- (evm) [tharsis#461](https://github.com/evmos/ethermint/pull/461) Increase performance of `StateDB` transaction log storage (r/w).
- (evm) [tharsis#566](https://github.com/evmos/ethermint/pull/566) Introduce `stateErr` store in `StateDB` to avoid meaningless operations if any error happened before
- (rpc, evm) [tharsis#587](https://github.com/evmos/ethermint/pull/587) Apply bloom filter when query ethlogs with range of blocks
- (evm) [tharsis#586](https://github.com/evmos/ethermint/pull/586) Benchmark evm keeper

## [v0.5.0] - 2021-08-20

### State Machine Breaking

- (app, rpc) [tharsis#447](https://github.com/evmos/ethermint/pull/447) Chain ID format has been changed from `<identifier>-<epoch>` to `<identifier>_<EIP155_number>-<epoch>`
  in order to clearly distinguish permanent vs impermanent components.
- (app, evm) [tharsis#434](https://github.com/evmos/ethermint/pull/434) EVM `Keeper` struct and `NewEVM` function now have a new `trace` field to define
  the Tracer type used to collect execution traces from the EVM transaction execution.
- (evm) [tharsis#175](https://github.com/evmos/ethermint/issues/175) The msg `TxData` field is now represented as a `*proto.Any`.
- (evm) [tharsis#84](https://github.com/evmos/ethermint/pull/84) Remove `journal`, `CommitStateDB` and `stateObjects`.
- (rpc, evm) [tharsis#81](https://github.com/evmos/ethermint/pull/81) Remove tx `Receipt` from store and replace it with fields obtained from the Tendermint RPC client.
- (evm) [tharsis#72](https://github.com/evmos/ethermint/issues/72) Update `AccessList` to use `TransientStore` instead of map.
- (evm) [tharsis#68](https://github.com/evmos/ethermint/issues/68) Replace block hash storage map to use staking `HistoricalInfo`.
- (evm) [tharsis#276](https://github.com/evmos/ethermint/pull/276) Vm errors don't result in cosmos tx failure, just
  different tx state and events.
- (evm) [tharsis#342](https://github.com/evmos/ethermint/issues/342) Don't clear balance when resetting the account.
- (evm) [tharsis#334](https://github.com/evmos/ethermint/pull/334) Log index changed to the index in block rather than
  tx.
- (evm) [tharsis#399](https://github.com/evmos/ethermint/pull/399) Exception in sub-message call reverts the call if it's not propagated.

### API Breaking

- (proto) [tharsis#448](https://github.com/evmos/ethermint/pull/448) Bump version for all Ethermint messages to `v1`
- (server) [tharsis#434](https://github.com/evmos/ethermint/pull/434) `evm-rpc` flags and app config have been renamed to `json-rpc`.
- (proto, evm) [tharsis#207](https://github.com/evmos/ethermint/issues/207) Replace `big.Int` in favor of `sdk.Int` for `TxData` fields
- (proto, evm) [tharsis#81](https://github.com/evmos/ethermint/pull/81) gRPC Query and Tx service changes:
  - The `TxReceipt`, `TxReceiptsByBlockHeight` endpoints have been removed from the Query service.
  - The `ContractAddress`, `Bloom` have been removed from the `MsgEthereumTxResponse` and the
    response now contains the ethereum-formatted `Hash` in hex format.
- (eth) [tharsis#845](https://github.com/cosmos/ethermint/pull/845) The `eth` namespace must be included in the list of API's as default to run the rpc server without error.
- (evm) [tharsis#202](https://github.com/evmos/ethermint/pull/202) Web3 api `SendTransaction`/`SendRawTransaction` returns ethereum compatible transaction hash, and query api `GetTransaction*` also accept that.
- (rpc) [tharsis#258](https://github.com/evmos/ethermint/pull/258) Return empty `BloomFilter` instead of throwing an error when it cannot be found (`nil` or empty).
- (rpc) [tharsis#277](https://github.com/evmos/ethermint/pull/321) Fix `BloomFilter` response.

### Improvements

- (client) [tharsis#450](https://github.com/evmos/ethermint/issues/450) Add EIP55 hex address support on `debug addr` command.
- (server) [tharsis#343](https://github.com/evmos/ethermint/pull/343) Define a wrap tendermint logger `Handler` go-ethereum's `root` logger.
- (rpc) [tharsis#457](https://github.com/evmos/ethermint/pull/457) Configure RPC gas cap through app config.
- (evm) [tharsis#434](https://github.com/evmos/ethermint/pull/434) Support different `Tracer` types for the EVM.
- (deps) [tharsis#427](https://github.com/evmos/ethermint/pull/427) Bump ibc-go to [`v1.0.0`](https://github.com/cosmos/ibc-go/releases/tag/v1.0.0)
- (gRPC) [tharsis#239](https://github.com/evmos/ethermint/pull/239) Query `ChainConfig` via gRPC.
- (rpc) [tharsis#181](https://github.com/evmos/ethermint/pull/181) Use evm denomination for params on tx fee.
- (deps) [tharsis#423](https://github.com/evmos/ethermint/pull/423) Bump Cosmos SDK and Tendermint versions to [v0.43.0](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.43.0) and [v0.34.11](https://github.com/tendermint/tendermint/releases/tag/v0.34.11), respectively.
- (evm) [tharsis#66](https://github.com/evmos/ethermint/issues/66) Support legacy transaction types for signing.
- (evm) [tharsis#24](https://github.com/evmos/ethermint/pull/24) Implement metrics for `MsgEthereumTx`, state transitions, `BeginBlock` and `EndBlock`.
- (rpc) [tharsis#124](https://github.com/evmos/ethermint/issues/124) Implement `txpool_content`, `txpool_inspect` and `txpool_status` RPC methods
- (rpc) [tharsis#112](https://github.com/evmos/ethermint/pull/153) Fix `eth_coinbase` to return the ethereum address of the validator
- (rpc) [tharsis#176](https://github.com/evmos/ethermint/issues/176) Support fetching pending nonce
- (rpc) [tharsis#272](https://github.com/evmos/ethermint/pull/272) do binary search to estimate gas accurately
- (rpc) [tharsis#313](https://github.com/evmos/ethermint/pull/313) Implement internal debug namespace (Not including logger functions nor traces).
- (rpc) [tharsis#349](https://github.com/evmos/ethermint/pull/349) Implement configurable JSON-RPC APIs to manage enabled namespaces.
- (rpc) [tharsis#377](https://github.com/evmos/ethermint/pull/377) Implement `miner_` namespace. `miner_setEtherbase` and `miner_setGasPrice` are working as intended. All the other calls are not applicable and return `unsupported`.
- (eth) [tharsis#460](https://github.com/evmos/ethermint/issues/460) Add support for EIP-1898.

### Bug Fixes

- (keys) [tharsis#346](https://github.com/evmos/ethermint/pull/346) Fix `keys add` command with `--ledger` flag for the `secp256k1` signing algorithm.
- (evm) [tharsis#291](https://github.com/evmos/ethermint/pull/291) Use block proposer address (validator operator) for `COINBASE` opcode.
- (rpc) [tharsis#81](https://github.com/evmos/ethermint/pull/81) Fix transaction hashing and decoding on `eth_sendTransaction`.
- (rpc) [tharsis#45](https://github.com/evmos/ethermint/pull/45) Use `EmptyUncleHash` and `EmptyRootHash` for empty ethereum `Header` fields.

## [v0.4.1] - 2021-03-01

### API Breaking

- (faucet) [tharsis#678](https://github.com/cosmos/ethermint/pull/678) Faucet module has been removed in favor of client libraries such as [`@cosmjs/faucet`](https://github.com/cosmos/cosmjs/tree/master/packages/faucet).
- (evm) [tharsis#670](https://github.com/cosmos/ethermint/pull/670) Migrate types to the ones defined by the protobuf messages, which are required for the stargate release.

### Bug Fixes

- (evm) [tharsis#799](https://github.com/cosmos/ethermint/issues/799) Fix wrong precision in calculation of gas fee.
- (evm) [tharsis#760](https://github.com/cosmos/ethermint/issues/760) Fix Failed to call function EstimateGas.
- (evm) [tharsis#767](https://github.com/cosmos/ethermint/issues/767) Fix error of timeout when using Truffle to deploy contract.
- (evm) [tharsis#751](https://github.com/cosmos/ethermint/issues/751) Fix misused method to calculate block hash in evm related function.
- (evm) [tharsis#721](https://github.com/cosmos/ethermint/issues/721) Fix mismatch block hash in rpc response when use eht.getBlock.
- (evm) [tharsis#730](https://github.com/cosmos/ethermint/issues/730) Fix 'EIP2028' not open when Istanbul version has been enabled.
- (evm) [tharsis#749](https://github.com/cosmos/ethermint/issues/749) Fix panic in `AnteHandler` when gas price larger than 100000
- (evm) [tharsis#747](https://github.com/cosmos/ethermint/issues/747) Fix format errors in String() of QueryETHLogs
- (evm) [tharsis#742](https://github.com/cosmos/ethermint/issues/742) Add parameter check for evm query func.
- (evm) [tharsis#687](https://github.com/cosmos/ethermint/issues/687) Fix nonce check to explicitly check for the correct nonce, rather than a simple 'greater than' comparison.
- (api) [tharsis#687](https://github.com/cosmos/ethermint/issues/687) Returns error for a transaction with an incorrect nonce.
- (evm) [tharsis#674](https://github.com/cosmos/ethermint/issues/674) Reset all cache after account data has been committed in `EndBlock` to make sure every node state consistent.
- (evm) [tharsis#672](https://github.com/cosmos/ethermint/issues/672) Fix panic of `wrong Block.Header.AppHash` when restart a node with snapshot.
- (evm) [tharsis#775](https://github.com/cosmos/ethermint/issues/775) MisUse of headHash as blockHash when create EVM context.

### Features

- (api) [tharsis#821](https://github.com/cosmos/ethermint/pull/821) Individually enable the api modules. Will be implemented in the latest version of ethermint with the upcoming stargate upgrade.

### Features

- (api) [tharsis#825](https://github.com/cosmos/ethermint/pull/825) Individually enable the api modules. Will be implemented in the latest version of ethermint with the upcoming stargate upgrade.

## [v0.4.0] - 2020-12-15

### API Breaking

- (evm) [tharsis#661](https://github.com/cosmos/ethermint/pull/661) `Balance` field has been removed from the evm module's `GenesisState`.

### Features

- (rpc) [tharsis#571](https://github.com/cosmos/ethermint/pull/571) Add pending queries to JSON-RPC calls. This allows for the querying of pending transactions and other relevant information that pertains to the pending state:
  - `eth_getBalance`
  - `eth_getTransactionCount`
  - `eth_getBlockTransactionCountByNumber`
  - `eth_getBlockByNumber`
  - `eth_getTransactionByHash`
  - `eth_getTransactionByBlockNumberAndIndex`
  - `eth_sendTransaction` - the nonce will automatically update to its pending nonce (when none is explicitly provided)

### Improvements

- (evm) [tharsis#661](https://github.com/cosmos/ethermint/pull/661) Add invariant check for account balance and account nonce.
- (deps) [tharsis#654](https://github.com/cosmos/ethermint/pull/654) Bump go-ethereum version to [v1.9.25](https://github.com/ethereum/go-ethereum/releases/tag/v1.9.25)
- (evm) [tharsis#627](https://github.com/cosmos/ethermint/issues/627) Add extra EIPs parameter to apply custom EVM jump tables.

### Bug Fixes

- (evm) [tharsis#661](https://github.com/cosmos/ethermint/pull/661) Set nonce to the EVM account on genesis initialization.
- (rpc) [tharsis#648](https://github.com/cosmos/ethermint/issues/648) Fix block cumulative gas used value.
- (evm) [tharsis#621](https://github.com/cosmos/ethermint/issues/621) EVM `GenesisAccount` fields now share the same format as the auth module `Account`.
- (evm) [tharsis#618](https://github.com/cosmos/ethermint/issues/618) Add missing EVM `Context` `GetHash` field that retrieves a the header hash from a given block height.
- (app) [tharsis#617](https://github.com/cosmos/ethermint/issues/617) Fix genesis export functionality.
- (rpc) [tharsis#574](https://github.com/cosmos/ethermint/issues/574) Fix outdated version from `eth_protocolVersion`.

## [v0.3.1] - 2020-11-24

### Improvements

- (deps) [tharsis#615](https://github.com/cosmos/ethermint/pull/615) Bump Cosmos SDK version to [v0.39.2](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.39.2)
- (deps) [tharsis#610](https://github.com/cosmos/ethermint/pull/610) Update Go dependency to 1.15+.
- (evm) [tharsis#603](https://github.com/cosmos/ethermint/pull/603) Add state transition params that enable or disable the EVM `Call` and `Create` operations.
- (deps) [tharsis#602](https://github.com/cosmos/ethermint/pull/602) Bump tendermint version to [v0.33.9](https://github.com/tendermint/tendermint/releases/tag/v0.33.9)

### Bug Fixes

- (rpc) [tharsis#613](https://github.com/cosmos/ethermint/issues/613) Fix potential deadlock caused if the keyring `List` returned an error.

## [v0.3.0] - 2020-11-16

### API Breaking

- (crypto) [tharsis#559](https://github.com/cosmos/ethermint/pull/559) Refactored crypto package in preparation for the SDK's Stargate release:
  - `crypto.PubKeySecp256k1` and `crypto.PrivKeySecp256k1` are now `ethsecp256k1.PubKey` and `ethsecp256k1.PrivKey`, respectively
  - Moved SDK `SigningAlgo` implementation for Ethermint's Secp256k1 key to `crypto/hd` package.
- (rpc) [tharsis#588](https://github.com/cosmos/ethermint/pull/588) The `rpc` package has been refactored to account for the separation of each
  corresponding Ethereum API namespace:
  - `rpc/namespaces/eth`: `eth` namespace. Exposes the `PublicEthereumAPI` and the `PublicFilterAPI`.
  - `rpc/namespaces/personal`: `personal` namespace. Exposes the `PrivateAccountAPI`.
  - `rpc/namespaces/net`: `net` namespace. Exposes the `PublicNetAPI`.
  - `rpc/namespaces/web3`: `web3` namespace. Exposes the `PublicWeb3API`.
- (evm) [tharsis#588](https://github.com/cosmos/ethermint/pull/588) The EVM transaction CLI has been removed in favor of the JSON-RPC.

### Improvements

- (deps) [tharsis#594](https://github.com/cosmos/ethermint/pull/594) Bump go-ethereum version to [v1.9.24](https://github.com/ethereum/go-ethereum/releases/tag/v1.9.24)

### Bug Fixes

- (ante) [tharsis#597](https://github.com/cosmos/ethermint/pull/597) Fix incorrect fee check on `AnteHandler`.
- (evm) [tharsis#583](https://github.com/cosmos/ethermint/pull/583) Fixes incorrect resetting of tx count and block bloom during `BeginBlock`, as well as gas consumption.
- (crypto) [tharsis#577](https://github.com/cosmos/ethermint/pull/577) Fix `BIP44HDPath` that did not prepend `m/` to the path. This now uses the `DefaultBaseDerivationPath` variable from go-ethereum to ensure addresses are consistent.

## [v0.2.1] - 2020-09-30

### Features

- (rpc) [tharsis#552](https://github.com/cosmos/ethermint/pull/552) Implement Eth Personal namespace `personal_importRawKey`.

### Bug fixes

- (keys) [tharsis#554](https://github.com/cosmos/ethermint/pull/554) Fix private key derivation.
- (app/ante) [tharsis#550](https://github.com/cosmos/ethermint/pull/550) Update ante handler nonce verification to accept any nonce greater than or equal to the expected nonce to allow to successive transactions.

## [v0.2.0] - 2020-09-24

### State Machine Breaking

- (app) [tharsis#540](https://github.com/cosmos/ethermint/issues/540) Chain identifier's format has been changed to match the Cosmos `chainID` [standard](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-5.md), which is required for IBC. The epoch number of the ID is used as the EVM `chainID`.

### API Breaking

- (types) [tharsis#503](https://github.com/cosmos/ethermint/pull/503) The `types.DenomDefault` constant for `"aphoton"` has been renamed to `types.AttoPhoton`.

### Improvements

- (types) [tharsis#504](https://github.com/cosmos/ethermint/pull/504) Unmarshal a JSON `EthAccount` using an Ethereum hex address in addition to Bech32.
- (types) [tharsis#503](https://github.com/cosmos/ethermint/pull/503) Add `--coin-denom` flag to testnet command that sets the given coin denomination to SDK and Ethermint parameters.
- (types) [tharsis#502](https://github.com/cosmos/ethermint/pull/502) `EthAccount` now also exposes the Ethereum hex address in `string` format to clients.
- (types) [tharsis#494](https://github.com/cosmos/ethermint/pull/494) Update `EthAccount` public key JSON type to `string`.
- (app) [tharsis#471](https://github.com/cosmos/ethermint/pull/471) Add `x/upgrade` module for managing software updates.
- (evm) [tharsis#458](https://github.com/cosmos/ethermint/pull/458) Define parameter for token denomination used for the EVM module.
- (evm) [tharsis#443](https://github.com/cosmos/ethermint/issues/443) Support custom Ethereum `ChainConfig` params.
- (types) [tharsis#434](https://github.com/cosmos/ethermint/issues/434) Update default denomination to Atto Photon (`aphoton`).
- (types) [tharsis#515](https://github.com/cosmos/ethermint/pull/515) Update minimum gas price to be 1.

### Bug Fixes

- (ante) [tharsis#525](https://github.com/cosmos/ethermint/pull/525) Add message validation decorator to `AnteHandler` for `MsgEthereumTx`.
- (types) [tharsis#507](https://github.com/cosmos/ethermint/pull/507) Fix hardcoded `aphoton` on `EthAccount` balance getter and setter.
- (types) [tharsis#501](https://github.com/cosmos/ethermint/pull/501) Fix bech32 encoding error by using the compressed ethereum secp256k1 public key.
- (evm) [tharsis#496](https://github.com/cosmos/ethermint/pull/496) Fix bugs on `journal.revert` and `CommitStateDB.Copy`.
- (types) [tharsis#480](https://github.com/cosmos/ethermint/pull/480) Update [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) coin type to `60` to satisfy [EIP84](https://github.com/ethereum/EIPs/issues/84).
- (types) [tharsis#513](https://github.com/cosmos/ethermint/pull/513) Fix simulated transaction bug that was causing a consensus error by unintentionally affecting the state.

## [v0.1.0] - 2020-08-23

### Improvements

- (sdk) [tharsis#386](https://github.com/cosmos/ethermint/pull/386) Bump Cosmos SDK version to [v0.39.1](https://github.com/cosmos/cosmos-sdk/releases/tag/v0.39.1)
- (evm) [tharsis#181](https://github.com/cosmos/ethermint/issues/181) Updated EVM module to the recommended module structure.
- (app) [tharsis#188](https://github.com/cosmos/ethermint/issues/186) Misc cleanup:
  - (evm) Rename `EthereumTxMsg` --> `MsgEthereumTx` and `EmintMsg` --> `MsgEthermint` for consistency with SDK standards
  - Updated integration and unit tests to use `EthermintApp` as testing suite
  - Use expected `Keeper` interface for `AccountKeeper`
  - Replaced `count` type in keeper with `int`
  - Add SDK events for transactions
- [tharsis#236](https://github.com/cosmos/ethermint/pull/236) Changes from upgrade:
  - (`app/ante`) Moved `AnteHandler` implementation to `app/ante`
  - (keys) Marked `ExportEthKeyCommand` as **UNSAFE**
  - (evm) Moved `BeginBlock` and `EndBlock` to `x/evm/abci.go`
- (evm) [tharsis#255](https://github.com/cosmos/ethermint/pull/255) Add missing `GenesisState` fields and support `ExportGenesis` functionality.
- [tharsis#272](https://github.com/cosmos/ethermint/pull/272) Add `Logger` for evm module.
- [tharsis#317](https://github.com/cosmos/ethermint/pull/317) `GenesisAccount` validation.
- (evm) [tharsis#319](https://github.com/cosmos/ethermint/pull/319) Various evm improvements:
  - Add transaction `[]*ethtypes.Logs` to evm's `GenesisState` to persist logs after an upgrade.
  - Remove evm `CodeKey` and `BlockKey`in favor of a prefix `Store`.
  - Set `BlockBloom` during `EndBlock` instead of `BeginBlock`.
  - `Commit` state object and `Finalize` storage after `InitGenesis` setup.
- (rpc) [tharsis#325](https://github.com/cosmos/ethermint/pull/325) `eth_coinbase` JSON-RPC query now returns the node's validator address.

### Features

- (build) [tharsis#378](https://github.com/cosmos/ethermint/pull/378) Create multi-node, local, automated testnet setup with `make localnet-start`.
- (rpc) [tharsis#330](https://github.com/cosmos/ethermint/issues/330) Implement `PublicFilterAPI`'s `EventSystem` which subscribes to Tendermint events upon `Filter` creation.
- (rpc) [tharsis#231](https://github.com/cosmos/ethermint/issues/231) Implement `NewBlockFilter` in rpc/filters.go which instantiates a polling block filter
  - Polls for new blocks via `BlockNumber` rpc call; if block number changes, it requests the new block via `GetBlockByNumber` rpc call and adds it to its internal list of blocks
  - Update `uninstallFilter` and `getFilterChanges` accordingly
  - `uninstallFilter` stops the polling goroutine
  - `getFilterChanges` returns the filter's internal list of block hashes and resets it
- (rpc) [tharsis#54](https://github.com/cosmos/ethermint/issues/54), [tharsis#55](https://github.com/cosmos/ethermint/issues/55)
  Implement `eth_getFilterLogs` and `eth_getLogs`:
  - For a given filter, look through each block for transactions. If there are transactions in the block, get the logs from it, and filter using the filterLogs method
  - `eth_getLogs` and `eth_getFilterChanges` for log filters use the same underlying method as `eth_getFilterLogs`
  - update `HandleMsgEthereumTx` to store logs using the ethereum hash
- (app) [tharsis#187](https://github.com/cosmos/ethermint/issues/187) Add support for simulations.

### Bug Fixes

- (evm) [tharsis#767](https://github.com/cosmos/ethermint/issues/767) Fix error of timeout when using Truffle to deploy contract.
- (evm) [tharsis#751](https://github.com/cosmos/ethermint/issues/751) Fix misused method to calculate block hash in evm related function.
- (evm) [tharsis#721](https://github.com/cosmos/ethermint/issues/721) Fix mismatch block hash in rpc response when use eth.getBlock.
- (evm) [tharsis#730](https://github.com/cosmos/ethermint/issues/730) Fix 'EIP2028' not open when Istanbul version has been enabled.
- (app) [tharsis#749](https://github.com/cosmos/ethermint/issues/749) Fix panic in `AnteHandler` when gas price larger than 100000
- (rpc) [tharsis#305](https://github.com/cosmos/ethermint/issues/305) Update `eth_getTransactionCount` to check for account existence before getting sequence and return 0 as the nonce if it doesn't exist.
- (evm) [tharsis#319](https://github.com/cosmos/ethermint/pull/319) Fix `SetBlockHash` that was setting the incorrect height during `BeginBlock`.
- (evm) [tharsis#176](https://github.com/cosmos/ethermint/issues/176) Updated Web3 transaction hash from using RLP hash. Now all transaction hashes exposed are amino hashes:
  - Removes `Hash()` (RLP) function from `MsgEthereumTx` to avoid confusion or misuse in future.
