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
appropriate stanza (see below). Each entry is required to include a tag and
the GitHub issue reference in the following format:

* (<tag>) \#<issue-number> message

The tag should consist of where the change is being made ex. (x/staking), (store)
The issue numbers will later be link-ified during the release process so you do
not have to worry about including a link manually, but you can if you wish.

Types of changes (Stanzas):

"Features" for new features.
"Improvements" for changes in existing functionality.
"Bug Fixes" for any bug fixes.
"API Breaking" for breaking exported APIs used by developers building on SDK.
"Consensus Breaking CHANGES" for any changes that result in a different AppState given same genesisState and txList.
Ref: https://keepachangelog.com/en/1.1.0/
-->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased changes

### Features (non-breaking)
* (precompiles) Add an ability for contracts to approve actions
* (go-client) Return transaction hash from SendWaitTx
* (keychain-sdk) Log transaction hashes of broadcasted transactions
* (relayer) #992 Added a service to relay transactions into Ethereum

### Consensus Breaking Changes
* (precompiles) Add slinky precompiled contract
* (x/warden) Add broadcastType to SignRequest
* (precompiles) Add broadcastType to SignRequest
* (precompiles) #1077 Change status fields from int32 to enums/uint8 in precompile ABIs for improved type safety and consistency
* (wardend) Bump IAVL to v1.2.2. Fixes some potential apphash mismatches that happen in some rare cases.
* (x/async) Scaffold new module with create/read operations
* (x/warden) Sign requests query return all request (not only with broadcastType=BroadcastType.Disabled)

### Bug Fixes

## [v0.5.4](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.5.4) - 2024-11-07

### Bug Fixes
* (precompiles) Fix analyzers address convert: change analyzers type from []address to []bytes in warden precompile.
* (precompiles) Fix address type convert and return derived addresses as strings
* (precompiles) Fix error with empty keys in space.
* (precompiles) Return expressions in json encoding.
* (precompiles) Fix spacesByOwner when no spaces.

## [v0.5.3](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.5.3) - 2024-10-31

### Features (non-breaking)
* Bump evmos to v20 (stable)

### Bug Fixes
* Add `comet` alias to `tendermint` command
* Fix mempool to be NoOp, for evmos' transactions to work, fixing some non-determinism in the network caused by different mempool settings in `app.toml`

## [v0.5.2](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.5.2) - 2024-10-22

### Features (non-breaking)
* (x/warden) Fix RejectSignRequestTxCmd - use SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
* (x/warden) Expose AddKeychainAdmin and RemoveKeychainAdmin in tx.proto to use in precompiles
* (evm) Precompiles for x/act and x/warden

### Bug Fixes
* (x/warden) Fix bug with Id=0 in NewKeyEvent

## [v0.5.1](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.5.1) - 2024-10-04

### Consensus Breaking Changes

* (x/warden) [#660](https://github.com/warden-protocol/wardenprotocol/660) Added `Nonce` field to Space to avoid race conditions
* (x/warden) Keychain fees are deducted with escrow account
* (wardend) Bump Cosmos SDK to v0.50.9
* (wardend) Bump ibc-go to v8.5.0
* (wardend) Bump slinky to v1.0.10
* (x/warden) [#570](https://github.com/warden-protocol/wardenprotocol/570) Added more metadata to Keychain
  * Replaced Description by Name field (required, non-empty)
  * Added new Description field instead of replaced one
  * Added Url field
  * Added Keybase Id field (16 symbols)
* (x/act) [#631](https://github.com/warden-protocol/wardenprotocol/631) Add pruning of timed-out actions
* (x/warden) Make `KeychainFees` fields non-nullable, use an empty list of coins to indicate no fees
* (evm) Resolve dependencies issues. For go-ethereum use [evmos fork](https://github.com/evmos/go-ethereum/releases/tag/v1.10.26-evmos-rc2) patched with [c1b68f1d05a7ee8eee1bde3c4054f49f5d3e3b9f](https://github.com/ethereum/go-ethereum/pull/24911) from original repository to support slinky.
* (evm) To adopt ethsecp256k1 use fork of evmos's cosmos-sdk. Fork patched runtime/module adding into ProvideApp two arguments to customize registering interface registry and legacy amino codec.
* (evm) Introduce award denomination to adjust units with Ethereum
* (evm) Using ethsecp256k1 signature for all transactions. Users should reimport their seeds to get new addresses.
* (x/act) Introduce Votes and Approve/Reject expressions for Actions
* (x/act) Add expected expressions to MsgAddAction
* (x/act) Set approve/reject expressions in MsgNewAction. Change rules registry to keep approve/reject expressions.
* (x/act) Rename `Rule` to `Template`
* (x/act) Remove Template and Approvers from Action.
* (x/act) Remove TemplateId from Key, AdminTemplateId and SignTemplateId from Space
* (evm) Bump evmOS to V20

### Features (non-breaking)

* (x/act) Add support for sdk.Coins fields in autogenerated CLI commands for new actions
* (x/warden) Add the ability for the user to specify the maximum keychain fee size to be deducted
* (x/warden) Return error if analyzer's address is not bech32
* (x/act) [724](https://github.com/warden-protocol/wardenprotocol/issues/724) Add `creator` filter param to `Rules` query
* (wardend) Validate bech32 format in add-genesis-keychain and add-genesis-space

### Bug Fixes
* (x/gmp) Remove the GMP default params from genesis
* (go-client) Use ethsecp256k1 instead of Cosmos secp256k1

### Misc

* (wardend) Bump CometBFT to v0.38.11

## [v0.4.1](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.4.1) - 2024-08-07

### Consensus Breaking Changes

* (x/warden) Implemented `AddKeychainAdmin`, `RemoveKeychainAdmin` features
* (x/warden) Add `AddKeychainAdmin` and `RemoveKeychainAdmin` to manage Keychain's admins
* (cosmwasm) Add interoperability with the following messages, that can now be used in CosmWasm contracts:
    * `MsgNewSignatureRequest`
    * `KeysBySpaceId`
    * `KeyById`
    * `SignRequests`
    * `SignRequestById`

### Bug Fixes

* (wardend) Upgrade Cosmos SDK to v0.50.8
* (wardend) Upgrade cosmos/iavl to v1.2.0
* (x/act) When an Action is approved, the new approval was not recorded in the database
* (x/warden) Fixed a bug where UpdateKey could be used to set RuleID to a non-existent Rule
* (x/warden) Fixed a bug where Keychains fees could be set to negative or invalid amounts
* (x/warden) Fixed a bug in v3 migrations where some insertions in the database were performed in a non-deterministic order. From our tests this didn't lead to any problem, in this particular case, but we want to play it safe.

### Misc

* (x/warden) Register error codes
* (x/act) Register error codes


## [v0.4.0](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.4.0) - 2024-07-17

### Consensus Breaking Changes

* (shield) [#225](https://github.com/warden-protocol/wardenprotocol/225) Fix shield to handle grouped expression
* (shield) Add new operators: `<`, `>`, `<=`, `>=`, `==`, `!=` for comparing integers to each others.
* (shield) Add support for `string` objects
* (shield) Add `contains(elem, array)` builtin function for checking if `elem` is contained in the `array`
* (shield) Add `+`, `-`, `*`, `/` math operators for basic integer arithmetic
* (shield) Add negative prefix operator to handle negative expressions and integers
* (shield) Change integer representation from int64 to big.Int
* (x/act) Add `MsgNewAction` as unique entrypoint for creating Actions
* (x/act) Fix bug where Actions' Results were being wrapped in `Any` twice
* (x/act) Add `SimulateRule` query request
* (x/act) Add the following events:
    * `EventCreateRule`
    * `EventUpdateRule`
    * `EventCreateAction`
    * `EventApproveAction`
    * `EventActionStateChange`
* (x/act) Improve CLI flags allowing to specify enums using their names instead of their numeric values
* (x/warden) Ensure only Keychain's parties can update a SignRequest
* (x/warden) Change Keychain.Fees type to Coins instead of uint64s. This makes possible to receive any token as a fee, not just uward.
* (x/warden) Remove Keychain.IsActive field. This field was used to determine if a Keychain was active or not, to automatically reject incoming requests, but it was never used.
* (x/warden) Add the following events:
    * `EventCreateSpace`
    * `EventUpdateSpace`
    * `EventAddSpaceOwner`
    * `EventRemoveSpaceOwner`
    * `EventNewKeyRequest`
    * `EventNewKey`
    * `EventRejectKeyRequest`
    * `EventUpdateKey`
    * `EventNewSignRequest`
    * `EventFulfilSignRequest`
    * `EventRejectSignRequest`
    * `EventNewKeychain`
    * `EventUpdateKeychain`
    * `EventAddKeychainParty`
* (x/warden) Rename `UpdateKeyRequest` to `FulfilKeyRequest`
* (x/warden) Rename `SignatureRequest` to `SignRequest`
* (x/oracle) Integrate Slinky
* (faucet) New version of the web based Faucet

### Features

* (wardend) Add `wardend genesis add-genesis-space` and `wardend genesis add-genesis-keychain` commands to prepare the genesis file
* (wardend) analyzers smart contract: a way for 3rd party builders to provide metadata to shield's intents during new signature requests
* (wardend) Initial version Ethereum analyzer
    * can be used to pass an Ethereum unsigned transaction, and will return the correct DataForSigning
* (faucet/v2) New web-based version of the faucet that uses recaptcha.
* (faucet/v2) UI/UX tweaks.
* (x/warden) [#377](https://github.com/warden-protocol/wardenprotocol/pull/377) Add `keychain_fees` field to `MsgUpdateKeychain` message
* (x/warden) Remove Keychain.AdminIntentId field. This field was used to choose an Intent for operations, but it was never used.
* (x/warden) Add autogenerated CLI subcommands for `MsgNewAction`. These make it easier to send transactions such as AddSpaceOwner, etc.
* (x/warden) Add an option EncryptionKey to SignRequests. If set, the Keychain is requested to encrypt the signature before sending it back to the Warden Protocol.
    * This is useful for users who want to keep their signatures private, allowing them to use in dApps such as dYdX, where the signature is used to "login".
* (x/warden) Remove deprecated `SignMethod` field from `MsgNewSignatureRequest`. Use analyzers instead.
* (x/act) Fix bug for Rules hooks not having the creator of the Action in the context
* (x/act) Added a new MsgCheckAction for manually re-checking the action rule status 
* (x/act) Added Export/Import for the State the module (`Rules`, `Actions`)
* (x/gmp) Added a new module to make Axelar GMP requests from Warden.
* (cosmwasm) Installed IBC-Hooks to be able to call CosmWasm contracts from the other chains.

### Bug Fixes

* (shield) fix possible occurring panic in case of nil env
* (x/act) Prevent Rules from being created with an empty name
* (x/warden) Handle analyzers that return string values correctly
* (x/warden) Fix KeyRequests query when KeychainId filter is not set
* (x/warden) Fix SignRequests query when KeychainId filter is not set
* (x/warden) Ensure that SpacesByOwner index is updated when an owner is removed

### Misc

* (build) Add `just localnet` command to replace `ignite chain serve`
* (shield) Improved error messages when parsing an unknown token type
* (shield) Add unit tests for AST preprocessor
* (x/warden) Rename Keychain "parties" to "writers" for clarity, as they are the only ones that can write on-chain data on behalf of the Keychain.

## [v0.3.0](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.3.0) - 2024-03-16

### Consensus Breaking Changes

* (x/act) [#139](https://github.com/warden-protocol/wardenprotocol/pull/139) Ability for modules to dynamically resolve variables on Action creation
    * x/warden can now resolve `warden.space.owners` in Intent definitions into the list of owners of the space
* (x/act) [#151](https://github.com/warden-protocol/wardenprotocol/pull/151) Store Intents' AST, instead of the raw string
* (x/warden) [#152](https://github.com/warden-protocol/wardenprotocol/pull/152) Prevent adding invalid addresses as Keychain parties
* (cosmwasm) [#156](https://github.com/warden-protocol/wardenprotocol/pull/156) Add support for smart contracts by integrating CosmWasm
* (x/warden) [#173](https://github.com/warden-protocol/wardenprotocol/pull/173) Remove `SignTransactionRequests` in favor of just `SignRequests`

### Features

* (shield) [#148](https://github.com/warden-protocol/wardenprotocol/pull/148) Use protobufs for defining the AST
* (x/act) [#155](https://github.com/warden-protocol/wardenprotocol/pull/155) Add MsgUpdateIntent, creators of an Intent can use it to change name and definition of their Intents.
* (x/warden) [#159](https://github.com/warden-protocol/wardenprotocol/pull/159) Resolve `warden.space.owners` in Intent definitions for MsgNewSignRequest and MsgNewSignTransactionRequest
* (x/warden) [#160](https://github.com/warden-protocol/wardenprotocol/pull/160) Add Osmosis support
    * Derive Osmosis addresses from ECDSA_SECP256K1 keys
    * Extract DataForSigning for Osmosis Amino JSON transactions
* (cosmwasm) [#171](https://github.com/warden-protocol/wardenprotocol/pull/171) Add support for executing NewKeyRequest from contracts
* (cosmwasm) [#185](https://github.com/warden-protocol/wardenprotocol/pull/185) Add support for querying AllKeys from contracts

### Bug Fixes

* (x/act) [#187](https://github.com/warden-protocol/wardenprotocol/pull/187) Fix QueryActionsByAddress to not reuse the pointer of iterating variable, causing the query to return the same action multiple times

### Misc

* (docs) [#127](https://github.com/warden-protocol/wardenprotocol/pull/127) Add CHANGELOG.md
* (ci) [#137](https://github.com/warden-protocol/wardenprotocol/pull/137) Add CodeRabbit configuration file, copied from Cosmos SDK's repo
* (perf) [#138](https://github.com/warden-protocol/wardenprotocol/pull/138) Add benchmarks for most hit queries in `x/warden` and `x/act` (ActionsByAddress, AllKeys, KeysBySpaceId)
* (chore) [#180](https://github.com/warden-protocol/wardenprotocol/pull/180) Update to use pnpm v9.0.0
* (docs) [#185](https://github.com/warden-protocol/wardenprotocol/pull/185) Add CosmWasm integration related docs.

## [v0.2.0](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.2.0) - 2024-03-26

### Consensus Breaking Changes

* (x/warden) [#77](https://github.com/warden-protocol/wardenprotocol/pull/77) Use uint64 IDs for Space and Keychain, instead of string bech32 addresses
* (x/act) [#55](https://github.com/warden-protocol/wardenprotocol/pull/55) Initial release of the `shield` intent engine, replacing the old `boolparser` and cleaning up the API
* (x/act) [#112](https://github.com/warden-protocol/wardenprotocol/pull/112) Store a list of referenced addresses when a new intent is created. This is useful for querying all intents that reference a given address.
* Refactor of `x/act`'s and `x/warden`'s store design to improve queries performance:
    * (x/act) [#117](https://github.com/warden-protocol/wardenprotocol/pull/117) Pin the intent definition when an Action is created instead of just referencing it. This allows faster queries "by address" by storing the list of addresses directly inside the action, instead of having to re-evaluate the linked intent for each action.
    * (x/warden) [#121](https://github.com/warden-protocol/wardenprotocol/pull/121) Separate Keys queries into `AllKeys`, `KeysBySpaceId`, and `KeyById`. This allowed some improvements, especially in the `KeysBySpaceId` that can benefit from a new "space id -> key id" index.
    * (x/warden) [#122](https://github.com/warden-protocol/wardenprotocol/pull/122) Improve `SpacesByOwner` query by adding a new "owner -> space id" index.

### Features

* (client) [#116](https://github.com/warden-protocol/wardenprotocol/pull/116) Add `warden q wait-tx` command to wait for a transaction to be included in a block
    * The same command was submitted to Cosmos SDK: https://github.com/cosmos/cosmos-sdk/pull/19870
* (clichain) [#113](https://github.com/warden-protocol/wardenprotocol/pull/113) Initial release of `clichain`, a CLI for acting as a Keychain from the command line
* (x/warden) [#109](https://github.com/warden-protocol/wardenprotocol/pull/109) Add ability to assign an intent to a key, overriding the SignIntent of the Space
    * [#110](https://github.com/warden-protocol/wardenprotocol/pull/110) Add MsgUpdateKey for updating a key's intent
* (keychain-sdk) [#92](https://github.com/warden-protocol/wardenprotocol/pull/92) Increase Keychain SDK's throughput by batching requests into a single transaction
* (snap) [#83](https://github.com/warden-protocol/wardenprotocol/pull/83) Initial release of Warden Protocol's MetaMask snap
* (build) [#69](https://github.com/warden-protocol/wardenprotocol/pull/69) Add Makefile for building `wardend`
* (faucet) [#99](https://github.com/warden-protocol/wardenprotocol/pull/99) Rate limit faucet requests by IP address, not only by account
* (faucet) [#66](https://github.com/warden-protocol/wardenprotocol/pull/66) Batch multiple faucet request in a single transaction

### Bug Fixes

* (x/warden) [#120](https://github.com/warden-protocol/wardenprotocol/pull/120) Don't stop Keys query if one key is invalid (i.e. fails to derive a layer 1 address)


## [v0.1.0](https://github.com/warden-protocol/wardenprotocol/releases/tag/v0.1.0) - 2024-03-06

Initial release of `wardend` and launch of the Alfama testnet.


