<!-- This file is auto-generated. Please do not modify it yourself. -->
# Protobuf Documentation
<a name="top"></a>

## Table of Contents

- [ethermint/crypto/v1/ethsecp256k1/keys.proto](#ethermint/crypto/v1/ethsecp256k1/keys.proto)
    - [PrivKey](#ethermint.crypto.v1.ethsecp256k1.PrivKey)
    - [PubKey](#ethermint.crypto.v1.ethsecp256k1.PubKey)
  
- [ethermint/evm/v1/evm.proto](#ethermint/evm/v1/evm.proto)
    - [AccessTuple](#ethermint.evm.v1.AccessTuple)
    - [ChainConfig](#ethermint.evm.v1.ChainConfig)
    - [Log](#ethermint.evm.v1.Log)
    - [Params](#ethermint.evm.v1.Params)
    - [State](#ethermint.evm.v1.State)
    - [TraceConfig](#ethermint.evm.v1.TraceConfig)
    - [TransactionLogs](#ethermint.evm.v1.TransactionLogs)
    - [TxResult](#ethermint.evm.v1.TxResult)
  
- [ethermint/evm/v1/genesis.proto](#ethermint/evm/v1/genesis.proto)
    - [GenesisAccount](#ethermint.evm.v1.GenesisAccount)
    - [GenesisState](#ethermint.evm.v1.GenesisState)
  
- [ethermint/evm/v1/tx.proto](#ethermint/evm/v1/tx.proto)
    - [AccessListTx](#ethermint.evm.v1.AccessListTx)
    - [DynamicFeeTx](#ethermint.evm.v1.DynamicFeeTx)
    - [ExtensionOptionsEthereumTx](#ethermint.evm.v1.ExtensionOptionsEthereumTx)
    - [LegacyTx](#ethermint.evm.v1.LegacyTx)
    - [MsgEthereumTx](#ethermint.evm.v1.MsgEthereumTx)
    - [MsgEthereumTxResponse](#ethermint.evm.v1.MsgEthereumTxResponse)
  
    - [Msg](#ethermint.evm.v1.Msg)
  
- [ethermint/evm/v1/query.proto](#ethermint/evm/v1/query.proto)
    - [EstimateGasResponse](#ethermint.evm.v1.EstimateGasResponse)
    - [EthCallRequest](#ethermint.evm.v1.EthCallRequest)
    - [QueryAccountRequest](#ethermint.evm.v1.QueryAccountRequest)
    - [QueryAccountResponse](#ethermint.evm.v1.QueryAccountResponse)
    - [QueryBalanceRequest](#ethermint.evm.v1.QueryBalanceRequest)
    - [QueryBalanceResponse](#ethermint.evm.v1.QueryBalanceResponse)
    - [QueryBaseFeeRequest](#ethermint.evm.v1.QueryBaseFeeRequest)
    - [QueryBaseFeeResponse](#ethermint.evm.v1.QueryBaseFeeResponse)
    - [QueryCodeRequest](#ethermint.evm.v1.QueryCodeRequest)
    - [QueryCodeResponse](#ethermint.evm.v1.QueryCodeResponse)
    - [QueryCosmosAccountRequest](#ethermint.evm.v1.QueryCosmosAccountRequest)
    - [QueryCosmosAccountResponse](#ethermint.evm.v1.QueryCosmosAccountResponse)
    - [QueryParamsRequest](#ethermint.evm.v1.QueryParamsRequest)
    - [QueryParamsResponse](#ethermint.evm.v1.QueryParamsResponse)
    - [QueryStorageRequest](#ethermint.evm.v1.QueryStorageRequest)
    - [QueryStorageResponse](#ethermint.evm.v1.QueryStorageResponse)
    - [QueryTraceBlockRequest](#ethermint.evm.v1.QueryTraceBlockRequest)
    - [QueryTraceBlockResponse](#ethermint.evm.v1.QueryTraceBlockResponse)
    - [QueryTraceTxRequest](#ethermint.evm.v1.QueryTraceTxRequest)
    - [QueryTraceTxResponse](#ethermint.evm.v1.QueryTraceTxResponse)
    - [QueryTxLogsRequest](#ethermint.evm.v1.QueryTxLogsRequest)
    - [QueryTxLogsResponse](#ethermint.evm.v1.QueryTxLogsResponse)
    - [QueryValidatorAccountRequest](#ethermint.evm.v1.QueryValidatorAccountRequest)
    - [QueryValidatorAccountResponse](#ethermint.evm.v1.QueryValidatorAccountResponse)
  
    - [Query](#ethermint.evm.v1.Query)
  
- [ethermint/feemarket/v1/feemarket.proto](#ethermint/feemarket/v1/feemarket.proto)
    - [Params](#ethermint.feemarket.v1.Params)
  
- [ethermint/feemarket/v1/genesis.proto](#ethermint/feemarket/v1/genesis.proto)
    - [GenesisState](#ethermint.feemarket.v1.GenesisState)
  
- [ethermint/feemarket/v1/query.proto](#ethermint/feemarket/v1/query.proto)
    - [QueryBaseFeeRequest](#ethermint.feemarket.v1.QueryBaseFeeRequest)
    - [QueryBaseFeeResponse](#ethermint.feemarket.v1.QueryBaseFeeResponse)
    - [QueryBlockGasRequest](#ethermint.feemarket.v1.QueryBlockGasRequest)
    - [QueryBlockGasResponse](#ethermint.feemarket.v1.QueryBlockGasResponse)
    - [QueryParamsRequest](#ethermint.feemarket.v1.QueryParamsRequest)
    - [QueryParamsResponse](#ethermint.feemarket.v1.QueryParamsResponse)
  
    - [Query](#ethermint.feemarket.v1.Query)
  
- [ethermint/types/v1/account.proto](#ethermint/types/v1/account.proto)
    - [EthAccount](#ethermint.types.v1.EthAccount)
  
- [ethermint/types/v1/dynamic_fee.proto](#ethermint/types/v1/dynamic_fee.proto)
    - [ExtensionOptionDynamicFeeTx](#ethermint.types.v1.ExtensionOptionDynamicFeeTx)
  
- [ethermint/types/v1/indexer.proto](#ethermint/types/v1/indexer.proto)
    - [TxResult](#ethermint.types.v1.TxResult)
  
- [ethermint/types/v1/web3.proto](#ethermint/types/v1/web3.proto)
    - [ExtensionOptionsWeb3Tx](#ethermint.types.v1.ExtensionOptionsWeb3Tx)
  
- [Scalar Value Types](#scalar-value-types)



<a name="ethermint/crypto/v1/ethsecp256k1/keys.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/crypto/v1/ethsecp256k1/keys.proto



<a name="ethermint.crypto.v1.ethsecp256k1.PrivKey"></a>

### PrivKey
PrivKey defines a type alias for an ecdsa.PrivateKey that implements
Tendermint's PrivateKey interface.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `key` | [bytes](#bytes) |  |  |






<a name="ethermint.crypto.v1.ethsecp256k1.PubKey"></a>

### PubKey
PubKey defines a type alias for an ecdsa.PublicKey that implements
Tendermint's PubKey interface. It represents the 33-byte compressed public
key format.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `key` | [bytes](#bytes) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/evm/v1/evm.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/evm/v1/evm.proto



<a name="ethermint.evm.v1.AccessTuple"></a>

### AccessTuple
AccessTuple is the element type of an access list.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | hex formatted ethereum address |
| `storage_keys` | [string](#string) | repeated | hex formatted hashes of the storage keys |






<a name="ethermint.evm.v1.ChainConfig"></a>

### ChainConfig
ChainConfig defines the Ethereum ChainConfig parameters using *sdk.Int values
instead of *big.Int.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `homestead_block` | [string](#string) |  | Homestead switch block (nil no fork, 0 = already homestead) |
| `dao_fork_block` | [string](#string) |  | TheDAO hard-fork switch block (nil no fork) |
| `dao_fork_support` | [bool](#bool) |  | Whether the nodes supports or opposes the DAO hard-fork |
| `eip150_block` | [string](#string) |  | EIP150 implements the Gas price changes (https://github.com/ethereum/EIPs/issues/150) EIP150 HF block (nil no fork) |
| `eip150_hash` | [string](#string) |  | EIP150 HF hash (needed for header only clients as only gas pricing changed) |
| `eip155_block` | [string](#string) |  | EIP155Block HF block |
| `eip158_block` | [string](#string) |  | EIP158 HF block |
| `byzantium_block` | [string](#string) |  | Byzantium switch block (nil no fork, 0 = already on byzantium) |
| `constantinople_block` | [string](#string) |  | Constantinople switch block (nil no fork, 0 = already activated) |
| `petersburg_block` | [string](#string) |  | Petersburg switch block (nil same as Constantinople) |
| `istanbul_block` | [string](#string) |  | Istanbul switch block (nil no fork, 0 = already on istanbul) |
| `muir_glacier_block` | [string](#string) |  | Eip-2384 (bomb delay) switch block (nil no fork, 0 = already activated) |
| `berlin_block` | [string](#string) |  | Berlin switch block (nil = no fork, 0 = already on berlin) |
| `london_block` | [string](#string) |  | London switch block (nil = no fork, 0 = already on london) |
| `arrow_glacier_block` | [string](#string) |  | Eip-4345 (bomb delay) switch block (nil = no fork, 0 = already activated) |
| `gray_glacier_block` | [string](#string) |  | EIP-5133 (bomb delay) switch block (nil = no fork, 0 = already activated) |
| `merge_netsplit_block` | [string](#string) |  | Virtual fork after The Merge to use as a network splitter |






<a name="ethermint.evm.v1.Log"></a>

### Log
Log represents an protobuf compatible Ethereum Log that defines a contract
log event. These events are generated by the LOG opcode and stored/indexed by
the node.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address of the contract that generated the event |
| `topics` | [string](#string) | repeated | list of topics provided by the contract. |
| `data` | [bytes](#bytes) |  | supplied by the contract, usually ABI-encoded |
| `block_number` | [uint64](#uint64) |  | block in which the transaction was included |
| `tx_hash` | [string](#string) |  | hash of the transaction |
| `tx_index` | [uint64](#uint64) |  | index of the transaction in the block |
| `block_hash` | [string](#string) |  | hash of the block in which the transaction was included |
| `index` | [uint64](#uint64) |  | index of the log in the block |
| `removed` | [bool](#bool) |  | The Removed field is true if this log was reverted due to a chain reorganisation. You must pay attention to this field if you receive logs through a filter query. |






<a name="ethermint.evm.v1.Params"></a>

### Params
Params defines the EVM module parameters


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `evm_denom` | [string](#string) |  | evm denom represents the token denomination used to run the EVM state transitions. |
| `enable_create` | [bool](#bool) |  | enable create toggles state transitions that use the vm.Create function |
| `enable_call` | [bool](#bool) |  | enable call toggles state transitions that use the vm.Call function |
| `extra_eips` | [int64](#int64) | repeated | extra eips defines the additional EIPs for the vm.Config |
| `chain_config` | [ChainConfig](#ethermint.evm.v1.ChainConfig) |  | chain config defines the EVM chain configuration parameters |
| `allow_unprotected_txs` | [bool](#bool) |  | Allow unprotected transactions defines if replay-protected (i.e non EIP155 signed) transactions can be executed on the state machine. |






<a name="ethermint.evm.v1.State"></a>

### State
State represents a single Storage key value pair item.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `key` | [string](#string) |  |  |
| `value` | [string](#string) |  |  |






<a name="ethermint.evm.v1.TraceConfig"></a>

### TraceConfig
TraceConfig holds extra parameters to trace functions.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `tracer` | [string](#string) |  | custom javascript tracer |
| `timeout` | [string](#string) |  | overrides the default timeout of 5 seconds for JavaScript-based tracing calls |
| `reexec` | [uint64](#uint64) |  | number of blocks the tracer is willing to go back |
| `disable_stack` | [bool](#bool) |  | disable stack capture |
| `disable_storage` | [bool](#bool) |  | disable storage capture |
| `debug` | [bool](#bool) |  | print output during capture end |
| `limit` | [int32](#int32) |  | maximum length of output, but zero means unlimited |
| `overrides` | [ChainConfig](#ethermint.evm.v1.ChainConfig) |  | Chain overrides, can be used to execute a trace using future fork rules |
| `enable_memory` | [bool](#bool) |  | enable memory capture |
| `enable_return_data` | [bool](#bool) |  | enable return data capture |
| `tracer_json_config` | [string](#string) |  | tracer config |






<a name="ethermint.evm.v1.TransactionLogs"></a>

### TransactionLogs
TransactionLogs define the logs generated from a transaction execution
with a given hash. It is used for import/export data as transactions are not
persisted on blockchain state after an upgrade.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `hash` | [string](#string) |  |  |
| `logs` | [Log](#ethermint.evm.v1.Log) | repeated |  |






<a name="ethermint.evm.v1.TxResult"></a>

### TxResult
TxResult stores results of Tx execution.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `contract_address` | [string](#string) |  | contract_address contains the ethereum address of the created contract (if any). If the state transition is an evm.Call, the contract address will be empty. |
| `bloom` | [bytes](#bytes) |  | bloom represents the bloom filter bytes |
| `tx_logs` | [TransactionLogs](#ethermint.evm.v1.TransactionLogs) |  | tx_logs contains the transaction hash and the proto-compatible ethereum logs. |
| `ret` | [bytes](#bytes) |  | ret defines the bytes from the execution. |
| `reverted` | [bool](#bool) |  | reverted flag is set to true when the call has been reverted |
| `gas_used` | [uint64](#uint64) |  | gas_used notes the amount of gas consumed while execution |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/evm/v1/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/evm/v1/genesis.proto



<a name="ethermint.evm.v1.GenesisAccount"></a>

### GenesisAccount
GenesisAccount defines an account to be initialized in the genesis state.
Its main difference with Geth's GenesisAccount is that it uses a
custom storage type and that it doesn't contain the private key field.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address defines an ethereum hex formated address of an account |
| `code` | [string](#string) |  | code defines the hex bytes of the account code. |
| `storage` | [State](#ethermint.evm.v1.State) | repeated | storage defines the set of state key values for the account. |






<a name="ethermint.evm.v1.GenesisState"></a>

### GenesisState
GenesisState defines the evm module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `accounts` | [GenesisAccount](#ethermint.evm.v1.GenesisAccount) | repeated | accounts is an array containing the ethereum genesis accounts. |
| `params` | [Params](#ethermint.evm.v1.Params) |  | params defines all the parameters of the module. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/evm/v1/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/evm/v1/tx.proto



<a name="ethermint.evm.v1.AccessListTx"></a>

### AccessListTx
AccessListTx is the data of EIP-2930 access list transactions.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `chain_id` | [string](#string) |  | destination EVM chain ID |
| `nonce` | [uint64](#uint64) |  | nonce corresponds to the account nonce (transaction sequence). |
| `gas_price` | [string](#string) |  | gas price defines the value for each gas unit |
| `gas` | [uint64](#uint64) |  | gas defines the gas limit defined for the transaction. |
| `to` | [string](#string) |  | hex formatted address of the recipient |
| `value` | [string](#string) |  | value defines the unsigned integer value of the transaction amount. |
| `data` | [bytes](#bytes) |  | input defines the data payload bytes of the transaction. |
| `accesses` | [AccessTuple](#ethermint.evm.v1.AccessTuple) | repeated |  |
| `v` | [bytes](#bytes) |  | v defines the signature value |
| `r` | [bytes](#bytes) |  | r defines the signature value |
| `s` | [bytes](#bytes) |  | s define the signature value |






<a name="ethermint.evm.v1.DynamicFeeTx"></a>

### DynamicFeeTx
DynamicFeeTx is the data of EIP-1559 dynamic fee transactions.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `chain_id` | [string](#string) |  | destination EVM chain ID |
| `nonce` | [uint64](#uint64) |  | nonce corresponds to the account nonce (transaction sequence). |
| `gas_tip_cap` | [string](#string) |  | gas tip cap defines the max value for the gas tip |
| `gas_fee_cap` | [string](#string) |  | gas fee cap defines the max value for the gas fee |
| `gas` | [uint64](#uint64) |  | gas defines the gas limit defined for the transaction. |
| `to` | [string](#string) |  | hex formatted address of the recipient |
| `value` | [string](#string) |  | value defines the transaction amount. |
| `data` | [bytes](#bytes) |  | input defines the data payload bytes of the transaction. |
| `accesses` | [AccessTuple](#ethermint.evm.v1.AccessTuple) | repeated |  |
| `v` | [bytes](#bytes) |  | v defines the signature value |
| `r` | [bytes](#bytes) |  | r defines the signature value |
| `s` | [bytes](#bytes) |  | s define the signature value |






<a name="ethermint.evm.v1.ExtensionOptionsEthereumTx"></a>

### ExtensionOptionsEthereumTx







<a name="ethermint.evm.v1.LegacyTx"></a>

### LegacyTx
LegacyTx is the transaction data of regular Ethereum transactions.
NOTE: All non-protected transactions (i.e non EIP155 signed) will fail if the
AllowUnprotectedTxs parameter is disabled.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `nonce` | [uint64](#uint64) |  | nonce corresponds to the account nonce (transaction sequence). |
| `gas_price` | [string](#string) |  | gas price defines the value for each gas unit |
| `gas` | [uint64](#uint64) |  | gas defines the gas limit defined for the transaction. |
| `to` | [string](#string) |  | hex formatted address of the recipient |
| `value` | [string](#string) |  | value defines the unsigned integer value of the transaction amount. |
| `data` | [bytes](#bytes) |  | input defines the data payload bytes of the transaction. |
| `v` | [bytes](#bytes) |  | v defines the signature value |
| `r` | [bytes](#bytes) |  | r defines the signature value |
| `s` | [bytes](#bytes) |  | s define the signature value |






<a name="ethermint.evm.v1.MsgEthereumTx"></a>

### MsgEthereumTx
MsgEthereumTx encapsulates an Ethereum transaction as an SDK message.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `data` | [google.protobuf.Any](#google.protobuf.Any) |  | inner transaction data

caches |
| `size` | [double](#double) |  | DEPRECATED: encoded storage size of the transaction |
| `hash` | [string](#string) |  | transaction hash in hex format |
| `from` | [string](#string) |  | ethereum signer address in hex format. This address value is checked against the address derived from the signature (V, R, S) using the secp256k1 elliptic curve |






<a name="ethermint.evm.v1.MsgEthereumTxResponse"></a>

### MsgEthereumTxResponse
MsgEthereumTxResponse defines the Msg/EthereumTx response type.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `hash` | [string](#string) |  | ethereum transaction hash in hex format. This hash differs from the Tendermint sha256 hash of the transaction bytes. See https://github.com/tendermint/tendermint/issues/6539 for reference |
| `logs` | [Log](#ethermint.evm.v1.Log) | repeated | logs contains the transaction hash and the proto-compatible ethereum logs. |
| `ret` | [bytes](#bytes) |  | returned data from evm function (result or data supplied with revert opcode) |
| `vm_error` | [string](#string) |  | vm error is the error returned by vm execution |
| `gas_used` | [uint64](#uint64) |  | gas consumed by the transaction |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="ethermint.evm.v1.Msg"></a>

### Msg
Msg defines the evm Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `EthereumTx` | [MsgEthereumTx](#ethermint.evm.v1.MsgEthereumTx) | [MsgEthereumTxResponse](#ethermint.evm.v1.MsgEthereumTxResponse) | EthereumTx defines a method submitting Ethereum transactions. | POST|/ethermint/evm/v1/ethereum_tx|

 <!-- end services -->



<a name="ethermint/evm/v1/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/evm/v1/query.proto



<a name="ethermint.evm.v1.EstimateGasResponse"></a>

### EstimateGasResponse
EstimateGasResponse defines EstimateGas response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `gas` | [uint64](#uint64) |  | the estimated gas |
| `ret` | [bytes](#bytes) |  | ret is the returned data from evm function (result or data supplied with revert opcode) |
| `vm_error` | [string](#string) |  | vm_error is the error returned by vm execution |






<a name="ethermint.evm.v1.EthCallRequest"></a>

### EthCallRequest
EthCallRequest defines EthCall request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `args` | [bytes](#bytes) |  | same json format as the json rpc api. |
| `gas_cap` | [uint64](#uint64) |  | the default gas cap to be used |
| `proposer_address` | [bytes](#bytes) |  | the proposer of the requested block |
| `chain_id` | [int64](#int64) |  | the eip155 chain id parsed from the requested block header |






<a name="ethermint.evm.v1.QueryAccountRequest"></a>

### QueryAccountRequest
QueryAccountRequest is the request type for the Query/Account RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the ethereum hex address to query the account for. |






<a name="ethermint.evm.v1.QueryAccountResponse"></a>

### QueryAccountResponse
QueryAccountResponse is the response type for the Query/Account RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `balance` | [string](#string) |  | balance is the balance of the EVM denomination. |
| `code_hash` | [string](#string) |  | code hash is the hex-formatted code bytes from the EOA. |
| `nonce` | [uint64](#uint64) |  | nonce is the account's sequence number. |






<a name="ethermint.evm.v1.QueryBalanceRequest"></a>

### QueryBalanceRequest
QueryBalanceRequest is the request type for the Query/Balance RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the ethereum hex address to query the balance for. |






<a name="ethermint.evm.v1.QueryBalanceResponse"></a>

### QueryBalanceResponse
QueryBalanceResponse is the response type for the Query/Balance RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `balance` | [string](#string) |  | balance is the balance of the EVM denomination. |






<a name="ethermint.evm.v1.QueryBaseFeeRequest"></a>

### QueryBaseFeeRequest
QueryBaseFeeRequest defines the request type for querying the EIP1559 base
fee.






<a name="ethermint.evm.v1.QueryBaseFeeResponse"></a>

### QueryBaseFeeResponse
BaseFeeResponse returns the EIP1559 base fee.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `base_fee` | [string](#string) |  |  |






<a name="ethermint.evm.v1.QueryCodeRequest"></a>

### QueryCodeRequest
QueryCodeRequest is the request type for the Query/Code RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the ethereum hex address to query the code for. |






<a name="ethermint.evm.v1.QueryCodeResponse"></a>

### QueryCodeResponse
QueryCodeResponse is the response type for the Query/Code RPC
method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code` | [bytes](#bytes) |  | code represents the code bytes from an ethereum address. |






<a name="ethermint.evm.v1.QueryCosmosAccountRequest"></a>

### QueryCosmosAccountRequest
QueryCosmosAccountRequest is the request type for the Query/CosmosAccount RPC
method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the ethereum hex address to query the account for. |






<a name="ethermint.evm.v1.QueryCosmosAccountResponse"></a>

### QueryCosmosAccountResponse
QueryCosmosAccountResponse is the response type for the Query/CosmosAccount
RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `cosmos_address` | [string](#string) |  | cosmos_address is the cosmos address of the account. |
| `sequence` | [uint64](#uint64) |  | sequence is the account's sequence number. |
| `account_number` | [uint64](#uint64) |  | account_number is the account number. |






<a name="ethermint.evm.v1.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest defines the request type for querying x/evm parameters.






<a name="ethermint.evm.v1.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse defines the response type for querying x/evm parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#ethermint.evm.v1.Params) |  | params define the evm module parameters. |






<a name="ethermint.evm.v1.QueryStorageRequest"></a>

### QueryStorageRequest
QueryStorageRequest is the request type for the Query/Storage RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the ethereum hex address to query the storage state for. |
| `key` | [string](#string) |  | key defines the key of the storage state |






<a name="ethermint.evm.v1.QueryStorageResponse"></a>

### QueryStorageResponse
QueryStorageResponse is the response type for the Query/Storage RPC
method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `value` | [string](#string) |  | key defines the storage state value hash associated with the given key. |






<a name="ethermint.evm.v1.QueryTraceBlockRequest"></a>

### QueryTraceBlockRequest
QueryTraceBlockRequest defines TraceTx request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `txs` | [MsgEthereumTx](#ethermint.evm.v1.MsgEthereumTx) | repeated | txs messages in the block |
| `trace_config` | [TraceConfig](#ethermint.evm.v1.TraceConfig) |  | TraceConfig holds extra parameters to trace functions. |
| `block_number` | [int64](#int64) |  | block number |
| `block_hash` | [string](#string) |  | block hex hash |
| `block_time` | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  | block time |
| `proposer_address` | [bytes](#bytes) |  | the proposer of the requested block |
| `chain_id` | [int64](#int64) |  | the eip155 chain id parsed from the requested block header |






<a name="ethermint.evm.v1.QueryTraceBlockResponse"></a>

### QueryTraceBlockResponse
QueryTraceBlockResponse defines TraceBlock response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `data` | [bytes](#bytes) |  |  |






<a name="ethermint.evm.v1.QueryTraceTxRequest"></a>

### QueryTraceTxRequest
QueryTraceTxRequest defines TraceTx request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `msg` | [MsgEthereumTx](#ethermint.evm.v1.MsgEthereumTx) |  | msgEthereumTx for the requested transaction |
| `trace_config` | [TraceConfig](#ethermint.evm.v1.TraceConfig) |  | TraceConfig holds extra parameters to trace functions. |
| `predecessors` | [MsgEthereumTx](#ethermint.evm.v1.MsgEthereumTx) | repeated | the predecessor transactions included in the same block need to be replayed first to get correct context for tracing. |
| `block_number` | [int64](#int64) |  | block number of requested transaction |
| `block_hash` | [string](#string) |  | block hex hash of requested transaction |
| `block_time` | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |  | block time of requested transaction |
| `proposer_address` | [bytes](#bytes) |  | the proposer of the requested block |
| `chain_id` | [int64](#int64) |  | the eip155 chain id parsed from the requested block header |






<a name="ethermint.evm.v1.QueryTraceTxResponse"></a>

### QueryTraceTxResponse
QueryTraceTxResponse defines TraceTx response


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `data` | [bytes](#bytes) |  | response serialized in bytes |






<a name="ethermint.evm.v1.QueryTxLogsRequest"></a>

### QueryTxLogsRequest
QueryTxLogsRequest is the request type for the Query/TxLogs RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `hash` | [string](#string) |  | hash is the ethereum transaction hex hash to query the logs for. |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  | pagination defines an optional pagination for the request. |






<a name="ethermint.evm.v1.QueryTxLogsResponse"></a>

### QueryTxLogsResponse
QueryTxLogs is the response type for the Query/TxLogs RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `logs` | [Log](#ethermint.evm.v1.Log) | repeated | logs represents the ethereum logs generated from the given transaction. |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  | pagination defines the pagination in the response. |






<a name="ethermint.evm.v1.QueryValidatorAccountRequest"></a>

### QueryValidatorAccountRequest
QueryValidatorAccountRequest is the request type for the
Query/ValidatorAccount RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `cons_address` | [string](#string) |  | cons_address is the validator cons address to query the account for. |






<a name="ethermint.evm.v1.QueryValidatorAccountResponse"></a>

### QueryValidatorAccountResponse
QueryValidatorAccountResponse is the response type for the
Query/ValidatorAccount RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `account_address` | [string](#string) |  | account_address is the cosmos address of the account in bech32 format. |
| `sequence` | [uint64](#uint64) |  | sequence is the account's sequence number. |
| `account_number` | [uint64](#uint64) |  | account_number is the account number |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="ethermint.evm.v1.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Account` | [QueryAccountRequest](#ethermint.evm.v1.QueryAccountRequest) | [QueryAccountResponse](#ethermint.evm.v1.QueryAccountResponse) | Account queries an Ethereum account. | GET|/ethermint/evm/v1/account/{address}|
| `CosmosAccount` | [QueryCosmosAccountRequest](#ethermint.evm.v1.QueryCosmosAccountRequest) | [QueryCosmosAccountResponse](#ethermint.evm.v1.QueryCosmosAccountResponse) | CosmosAccount queries an Ethereum account's Cosmos Address. | GET|/ethermint/evm/v1/cosmos_account/{address}|
| `ValidatorAccount` | [QueryValidatorAccountRequest](#ethermint.evm.v1.QueryValidatorAccountRequest) | [QueryValidatorAccountResponse](#ethermint.evm.v1.QueryValidatorAccountResponse) | ValidatorAccount queries an Ethereum account's from a validator consensus Address. | GET|/ethermint/evm/v1/validator_account/{cons_address}|
| `Balance` | [QueryBalanceRequest](#ethermint.evm.v1.QueryBalanceRequest) | [QueryBalanceResponse](#ethermint.evm.v1.QueryBalanceResponse) | Balance queries the balance of a the EVM denomination for a single EthAccount. | GET|/ethermint/evm/v1/balances/{address}|
| `Storage` | [QueryStorageRequest](#ethermint.evm.v1.QueryStorageRequest) | [QueryStorageResponse](#ethermint.evm.v1.QueryStorageResponse) | Storage queries the balance of all coins for a single account. | GET|/ethermint/evm/v1/storage/{address}/{key}|
| `Code` | [QueryCodeRequest](#ethermint.evm.v1.QueryCodeRequest) | [QueryCodeResponse](#ethermint.evm.v1.QueryCodeResponse) | Code queries the balance of all coins for a single account. | GET|/ethermint/evm/v1/codes/{address}|
| `Params` | [QueryParamsRequest](#ethermint.evm.v1.QueryParamsRequest) | [QueryParamsResponse](#ethermint.evm.v1.QueryParamsResponse) | Params queries the parameters of x/evm module. | GET|/ethermint/evm/v1/params|
| `EthCall` | [EthCallRequest](#ethermint.evm.v1.EthCallRequest) | [MsgEthereumTxResponse](#ethermint.evm.v1.MsgEthereumTxResponse) | EthCall implements the `eth_call` rpc api | GET|/ethermint/evm/v1/eth_call|
| `EstimateGas` | [EthCallRequest](#ethermint.evm.v1.EthCallRequest) | [EstimateGasResponse](#ethermint.evm.v1.EstimateGasResponse) | EstimateGas implements the `eth_estimateGas` rpc api | GET|/ethermint/evm/v1/estimate_gas|
| `TraceTx` | [QueryTraceTxRequest](#ethermint.evm.v1.QueryTraceTxRequest) | [QueryTraceTxResponse](#ethermint.evm.v1.QueryTraceTxResponse) | TraceTx implements the `debug_traceTransaction` rpc api | GET|/ethermint/evm/v1/trace_tx|
| `TraceBlock` | [QueryTraceBlockRequest](#ethermint.evm.v1.QueryTraceBlockRequest) | [QueryTraceBlockResponse](#ethermint.evm.v1.QueryTraceBlockResponse) | TraceBlock implements the `debug_traceBlockByNumber` and `debug_traceBlockByHash` rpc api | GET|/ethermint/evm/v1/trace_block|
| `BaseFee` | [QueryBaseFeeRequest](#ethermint.evm.v1.QueryBaseFeeRequest) | [QueryBaseFeeResponse](#ethermint.evm.v1.QueryBaseFeeResponse) | BaseFee queries the base fee of the parent block of the current block, it's similar to feemarket module's method, but also checks london hardfork status. | GET|/ethermint/evm/v1/base_fee|

 <!-- end services -->



<a name="ethermint/feemarket/v1/feemarket.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/feemarket/v1/feemarket.proto



<a name="ethermint.feemarket.v1.Params"></a>

### Params
Params defines the EVM module parameters


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `no_base_fee` | [bool](#bool) |  | no base fee forces the EIP-1559 base fee to 0 (needed for 0 price calls) |
| `base_fee_change_denominator` | [uint32](#uint32) |  | base fee change denominator bounds the amount the base fee can change between blocks. |
| `elasticity_multiplier` | [uint32](#uint32) |  | elasticity multiplier bounds the maximum gas limit an EIP-1559 block may have. |
| `enable_height` | [int64](#int64) |  | height at which the base fee calculation is enabled. |
| `base_fee` | [string](#string) |  | base fee for EIP-1559 blocks. |
| `min_gas_price` | [string](#string) |  | min_gas_price defines the minimum gas price value for cosmos and eth transactions |
| `min_gas_multiplier` | [string](#string) |  | min gas denominator bounds the minimum gasUsed to be charged to senders based on GasLimit |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/feemarket/v1/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/feemarket/v1/genesis.proto



<a name="ethermint.feemarket.v1.GenesisState"></a>

### GenesisState
GenesisState defines the feemarket module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#ethermint.feemarket.v1.Params) |  | params defines all the paramaters of the module. |
| `block_gas` | [uint64](#uint64) |  | block gas is the amount of gas wanted on the last block before the upgrade. Zero by default. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/feemarket/v1/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/feemarket/v1/query.proto



<a name="ethermint.feemarket.v1.QueryBaseFeeRequest"></a>

### QueryBaseFeeRequest
QueryBaseFeeRequest defines the request type for querying the EIP1559 base
fee.






<a name="ethermint.feemarket.v1.QueryBaseFeeResponse"></a>

### QueryBaseFeeResponse
BaseFeeResponse returns the EIP1559 base fee.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `base_fee` | [string](#string) |  |  |






<a name="ethermint.feemarket.v1.QueryBlockGasRequest"></a>

### QueryBlockGasRequest
QueryBlockGasRequest defines the request type for querying the EIP1559 base
fee.






<a name="ethermint.feemarket.v1.QueryBlockGasResponse"></a>

### QueryBlockGasResponse
QueryBlockGasResponse returns block gas used for a given height.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `gas` | [int64](#int64) |  |  |






<a name="ethermint.feemarket.v1.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest defines the request type for querying x/evm parameters.






<a name="ethermint.feemarket.v1.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse defines the response type for querying x/evm parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#ethermint.feemarket.v1.Params) |  | params define the evm module parameters. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="ethermint.feemarket.v1.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Params` | [QueryParamsRequest](#ethermint.feemarket.v1.QueryParamsRequest) | [QueryParamsResponse](#ethermint.feemarket.v1.QueryParamsResponse) | Params queries the parameters of x/feemarket module. | GET|/ethermint/feemarket/v1/params|
| `BaseFee` | [QueryBaseFeeRequest](#ethermint.feemarket.v1.QueryBaseFeeRequest) | [QueryBaseFeeResponse](#ethermint.feemarket.v1.QueryBaseFeeResponse) | BaseFee queries the base fee of the parent block of the current block. | GET|/ethermint/feemarket/v1/base_fee|
| `BlockGas` | [QueryBlockGasRequest](#ethermint.feemarket.v1.QueryBlockGasRequest) | [QueryBlockGasResponse](#ethermint.feemarket.v1.QueryBlockGasResponse) | BlockGas queries the gas used at a given block height | GET|/ethermint/feemarket/v1/block_gas|

 <!-- end services -->



<a name="ethermint/types/v1/account.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/types/v1/account.proto



<a name="ethermint.types.v1.EthAccount"></a>

### EthAccount
EthAccount implements the authtypes.AccountI interface and embeds an
authtypes.BaseAccount type. It is compatible with the auth AccountKeeper.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `base_account` | [cosmos.auth.v1beta1.BaseAccount](#cosmos.auth.v1beta1.BaseAccount) |  |  |
| `code_hash` | [string](#string) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/types/v1/dynamic_fee.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/types/v1/dynamic_fee.proto



<a name="ethermint.types.v1.ExtensionOptionDynamicFeeTx"></a>

### ExtensionOptionDynamicFeeTx
ExtensionOptionDynamicFeeTx is an extension option that specify the maxPrioPrice for cosmos tx


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `max_priority_price` | [string](#string) |  | the same as `max_priority_fee_per_gas` in eip-1559 spec |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/types/v1/indexer.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/types/v1/indexer.proto



<a name="ethermint.types.v1.TxResult"></a>

### TxResult
TxResult is the value stored in eth tx indexer


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `height` | [int64](#int64) |  | the block height |
| `tx_index` | [uint32](#uint32) |  | cosmos tx index |
| `msg_index` | [uint32](#uint32) |  | the msg index in a batch tx |
| `eth_tx_index` | [int32](#int32) |  | eth tx index, the index in the list of valid eth tx in the block, aka. the transaction list returned by eth_getBlock api. |
| `failed` | [bool](#bool) |  | if the eth tx is failed |
| `gas_used` | [uint64](#uint64) |  | gas used by tx, if exceeds block gas limit, it's set to gas limit which is what's actually deducted by ante handler. |
| `cumulative_gas_used` | [uint64](#uint64) |  | the cumulative gas used within current batch tx |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="ethermint/types/v1/web3.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## ethermint/types/v1/web3.proto



<a name="ethermint.types.v1.ExtensionOptionsWeb3Tx"></a>

### ExtensionOptionsWeb3Tx



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `typed_data_chain_id` | [uint64](#uint64) |  | typed data chain id used only in EIP712 Domain and should match Ethereum network ID in a Web3 provider (e.g. Metamask). |
| `fee_payer` | [string](#string) |  | fee payer is an account address for the fee payer. It will be validated during EIP712 signature checking. |
| `fee_payer_sig` | [bytes](#bytes) |  | fee payer sig is a signature data from the fee paying account, allows to perform fee delegation when using EIP712 Domain. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/blackbird/params.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/blackbird/params.proto



<a name="fusionchain.blackbird.Params"></a>

### Params
Params defines the parameters for the module.





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/blackbird/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/blackbird/genesis.proto



<a name="fusionchain.blackbird.GenesisState"></a>

### GenesisState
GenesisState defines the blackbird module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.blackbird.Params) |  | this line is used by starport scaffolding # genesis/proto/state |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/blackbird/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/blackbird/query.proto



<a name="fusionchain.blackbird.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest is request type for the Query/Params RPC method.






<a name="fusionchain.blackbird.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse is response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.blackbird.Params) |  | params holds all the parameters of this module. |






<a name="fusionchain.blackbird.QueryVerifyRequest"></a>

### QueryVerifyRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `policy` | [string](#string) |  |  |
| `payload` | [string](#string) |  |  |






<a name="fusionchain.blackbird.QueryVerifyResponse"></a>

### QueryVerifyResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `result` | [bool](#bool) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.blackbird.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Params` | [QueryParamsRequest](#fusionchain.blackbird.QueryParamsRequest) | [QueryParamsResponse](#fusionchain.blackbird.QueryParamsResponse) | Parameters queries the parameters of the module. | GET|/fusionchain/blackbird/params|
| `Verify` | [QueryVerifyRequest](#fusionchain.blackbird.QueryVerifyRequest) | [QueryVerifyResponse](#fusionchain.blackbird.QueryVerifyResponse) | Queries a list of Verify items. | GET|/fusionchain/blackbird/verify/{policy}/{payload}|

 <!-- end services -->



<a name="fusionchain/blackbird/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/blackbird/tx.proto


 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.blackbird.Msg"></a>

### Msg
Msg defines the Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |

 <!-- end services -->



<a name="fusionchain/identity/params.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/params.proto



<a name="fusionchain.identity.Params"></a>

### Params
Params defines the parameters for the module.





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/identity/keyring.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/keyring.proto



<a name="fusionchain.identity.Keyring"></a>

### Keyring



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `creator` | [string](#string) |  |  |
| `description` | [string](#string) |  |  |
| `admins` | [string](#string) | repeated |  |
| `parties` | [string](#string) | repeated |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/identity/workspace.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/workspace.proto



<a name="fusionchain.identity.Action"></a>

### Action



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `approvers` | [string](#string) | repeated |  |
| `completed` | [bool](#bool) |  |  |
| `msg` | [google.protobuf.Any](#google.protobuf.Any) |  | original message that started the action, it will be executed when it will reach enough approvers |






<a name="fusionchain.identity.Workspace"></a>

### Workspace



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  |  |
| `creator` | [string](#string) |  |  |
| `owners` | [string](#string) | repeated |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/identity/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/genesis.proto



<a name="fusionchain.identity.GenesisState"></a>

### GenesisState
GenesisState defines the identity module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.identity.Params) |  |  |
| `keyrings` | [Keyring](#fusionchain.identity.Keyring) | repeated |  |
| `workspaces` | [Workspace](#fusionchain.identity.Workspace) | repeated |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/identity/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/query.proto



<a name="fusionchain.identity.QueryActionsRequest"></a>

### QueryActionsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |






<a name="fusionchain.identity.QueryActionsResponse"></a>

### QueryActionsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `actions` | [Action](#fusionchain.identity.Action) | repeated |  |






<a name="fusionchain.identity.QueryKeyringsRequest"></a>

### QueryKeyringsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |






<a name="fusionchain.identity.QueryKeyringsResponse"></a>

### QueryKeyringsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `keyrings` | [Keyring](#fusionchain.identity.Keyring) | repeated |  |






<a name="fusionchain.identity.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest is request type for the Query/Params RPC method.






<a name="fusionchain.identity.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse is response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.identity.Params) |  | params holds all the parameters of this module. |






<a name="fusionchain.identity.QueryWorkspacesByOwnerRequest"></a>

### QueryWorkspacesByOwnerRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |
| `owner` | [string](#string) |  |  |






<a name="fusionchain.identity.QueryWorkspacesRequest"></a>

### QueryWorkspacesRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |






<a name="fusionchain.identity.QueryWorkspacesResponse"></a>

### QueryWorkspacesResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `workspaces` | [Workspace](#fusionchain.identity.Workspace) | repeated |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.identity.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Params` | [QueryParamsRequest](#fusionchain.identity.QueryParamsRequest) | [QueryParamsResponse](#fusionchain.identity.QueryParamsResponse) | Parameters queries the parameters of the module. | GET|/fusionchain/identity/params|
| `Workspaces` | [QueryWorkspacesRequest](#fusionchain.identity.QueryWorkspacesRequest) | [QueryWorkspacesResponse](#fusionchain.identity.QueryWorkspacesResponse) | Queries a list of Workspaces items. | GET|/fusionchain/identity/workspaces|
| `WorkspacesByOwner` | [QueryWorkspacesByOwnerRequest](#fusionchain.identity.QueryWorkspacesByOwnerRequest) | [QueryWorkspacesResponse](#fusionchain.identity.QueryWorkspacesResponse) | Queries a list of Workspaces that has the specified owner. | GET|/fusionchain/identity/workspaces_by_owner|
| `Actions` | [QueryActionsRequest](#fusionchain.identity.QueryActionsRequest) | [QueryActionsResponse](#fusionchain.identity.QueryActionsResponse) | Queries a list of Actions items. | GET|/fusionchain/identity/actions|
| `Keyrings` | [QueryKeyringsRequest](#fusionchain.identity.QueryKeyringsRequest) | [QueryKeyringsResponse](#fusionchain.identity.QueryKeyringsResponse) | Queries a list of Keyrings items. | GET|/fusionchain/identity/keyrings|

 <!-- end services -->



<a name="fusionchain/identity/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/tx.proto



<a name="fusionchain.identity.MsgAddKeyringParty"></a>

### MsgAddKeyringParty



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `keyring_id` | [uint64](#uint64) |  |  |
| `party` | [string](#string) |  |  |






<a name="fusionchain.identity.MsgAddKeyringPartyResponse"></a>

### MsgAddKeyringPartyResponse







<a name="fusionchain.identity.MsgAddWorkspaceOwner"></a>

### MsgAddWorkspaceOwner



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `workspace_addr` | [string](#string) |  |  |
| `new_owner` | [string](#string) |  |  |






<a name="fusionchain.identity.MsgAddWorkspaceOwnerResponse"></a>

### MsgAddWorkspaceOwnerResponse







<a name="fusionchain.identity.MsgApproveAction"></a>

### MsgApproveAction



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `action_type` | [string](#string) |  |  |
| `action_id` | [uint64](#uint64) |  |  |






<a name="fusionchain.identity.MsgApproveActionResponse"></a>

### MsgApproveActionResponse







<a name="fusionchain.identity.MsgNewKeyring"></a>

### MsgNewKeyring



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `description` | [string](#string) |  |  |






<a name="fusionchain.identity.MsgNewKeyringResponse"></a>

### MsgNewKeyringResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.identity.MsgNewWorkspace"></a>

### MsgNewWorkspace



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |






<a name="fusionchain.identity.MsgNewWorkspaceResponse"></a>

### MsgNewWorkspaceResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.identity.MsgRemoveWorkspaceOwner"></a>

### MsgRemoveWorkspaceOwner



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `workspace_addr` | [string](#string) |  |  |
| `owner` | [string](#string) |  |  |






<a name="fusionchain.identity.MsgRemoveWorkspaceOwnerResponse"></a>

### MsgRemoveWorkspaceOwnerResponse






 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.identity.Msg"></a>

### Msg
Msg defines the Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `NewWorkspace` | [MsgNewWorkspace](#fusionchain.identity.MsgNewWorkspace) | [MsgNewWorkspaceResponse](#fusionchain.identity.MsgNewWorkspaceResponse) | Create a new Workspace. The user will be the first owner of the workspace. | |
| `AddWorkspaceOwner` | [MsgAddWorkspaceOwner](#fusionchain.identity.MsgAddWorkspaceOwner) | [MsgAddWorkspaceOwnerResponse](#fusionchain.identity.MsgAddWorkspaceOwnerResponse) | Add a new owner to a workspace. | |
| `RemoveWorkspaceOwner` | [MsgRemoveWorkspaceOwner](#fusionchain.identity.MsgRemoveWorkspaceOwner) | [MsgRemoveWorkspaceOwnerResponse](#fusionchain.identity.MsgRemoveWorkspaceOwnerResponse) | Remove an owner from the workspace. The user can remove itself, but at least one owner must be left. | |
| `ApproveAction` | [MsgApproveAction](#fusionchain.identity.MsgApproveAction) | [MsgApproveActionResponse](#fusionchain.identity.MsgApproveActionResponse) | Add an approval to an existing Action. | |
| `NewKeyring` | [MsgNewKeyring](#fusionchain.identity.MsgNewKeyring) | [MsgNewKeyringResponse](#fusionchain.identity.MsgNewKeyringResponse) | Create a new keyring. The user will be the first admin of the keyring. | |
| `AddKeyringParty` | [MsgAddKeyringParty](#fusionchain.identity.MsgAddKeyringParty) | [MsgAddKeyringPartyResponse](#fusionchain.identity.MsgAddKeyringPartyResponse) | Add a new party to a keyring. Transactions coming from this party will be considered trusted by the keyring. | |

 <!-- end services -->



<a name="fusionchain/qassets/params.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/qassets/params.proto



<a name="fusionchain.qassets.Params"></a>

### Params
Params defines the parameters for the module.





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/qassets/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/qassets/genesis.proto



<a name="fusionchain.qassets.GenesisState"></a>

### GenesisState
GenesisState defines the qassets module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.qassets.Params) |  | this line is used by starport scaffolding # genesis/proto/state |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/qassets/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/qassets/query.proto



<a name="fusionchain.qassets.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest is request type for the Query/Params RPC method.






<a name="fusionchain.qassets.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse is response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.qassets.Params) |  | params holds all the parameters of this module. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.qassets.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Params` | [QueryParamsRequest](#fusionchain.qassets.QueryParamsRequest) | [QueryParamsResponse](#fusionchain.qassets.QueryParamsResponse) | Parameters queries the parameters of the module.

this line is used by starport scaffolding # 2 this line is used by scaffolder # 1 | GET|/fusionchain/qassets/params|

 <!-- end services -->



<a name="fusionchain/qassets/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/qassets/tx.proto



<a name="fusionchain.qassets.MsgBurn"></a>

### MsgBurn



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `from_workspace_addr` | [string](#string) |  |  |
| `to_wallet_id` | [uint64](#uint64) |  |  |
| `is_token` | [bool](#bool) |  |  |
| `token_name` | [string](#string) |  |  |
| `token_contract_addr` | [string](#string) |  |  |
| `amount` | [uint64](#uint64) |  |  |






<a name="fusionchain.qassets.MsgBurnResponse"></a>

### MsgBurnResponse







<a name="fusionchain.qassets.MsgMint"></a>

### MsgMint



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `from_wallet_id` | [uint64](#uint64) |  |  |
| `to_workspace_addr` | [string](#string) |  |  |
| `is_token` | [bool](#bool) |  |  |
| `token_name` | [string](#string) |  |  |
| `token_contract_addr` | [string](#string) |  |  |
| `amount` | [uint64](#uint64) |  |  |






<a name="fusionchain.qassets.MsgMintResponse"></a>

### MsgMintResponse







<a name="fusionchain.qassets.MsgSend"></a>

### MsgSend



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `from_workspace_addr` | [string](#string) |  |  |
| `to_workspace_addr` | [string](#string) |  |  |
| `qasset_denom` | [string](#string) |  |  |
| `amount` | [uint64](#uint64) |  |  |






<a name="fusionchain.qassets.MsgSendResponse"></a>

### MsgSendResponse






 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.qassets.Msg"></a>

### Msg
Msg defines the Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Mint` | [MsgMint](#fusionchain.qassets.MsgMint) | [MsgMintResponse](#fusionchain.qassets.MsgMintResponse) | this line is used by starport scaffolding # proto/tx/rpc TODO: document Mint | |
| `Burn` | [MsgBurn](#fusionchain.qassets.MsgBurn) | [MsgBurnResponse](#fusionchain.qassets.MsgBurnResponse) | TODO: document Burn | |
| `Send` | [MsgSend](#fusionchain.qassets.MsgSend) | [MsgSendResponse](#fusionchain.qassets.MsgSendResponse) | TODO: document Send | |

 <!-- end services -->



<a name="fusionchain/treasury/params.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/params.proto



<a name="fusionchain.treasury.Params"></a>

### Params
Params defines the parameters for the module.





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/treasury/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/genesis.proto



<a name="fusionchain.treasury.GenesisState"></a>

### GenesisState
GenesisState defines the treasury module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.treasury.Params) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/treasury/key.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/key.proto



<a name="fusionchain.treasury.Key"></a>

### Key



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `workspace_addr` | [string](#string) |  |  |
| `keyring_id` | [uint64](#uint64) |  |  |
| `type` | [KeyType](#fusionchain.treasury.KeyType) |  |  |
| `public_key` | [bytes](#bytes) |  |  |






<a name="fusionchain.treasury.KeyRequest"></a>

### KeyRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `creator` | [string](#string) |  |  |
| `workspace_addr` | [string](#string) |  |  |
| `keyring_id` | [uint64](#uint64) |  |  |
| `key_type` | [KeyType](#fusionchain.treasury.KeyType) |  |  |
| `status` | [KeyRequestStatus](#fusionchain.treasury.KeyRequestStatus) |  |  |
| `success_key_id` | [uint64](#uint64) |  |  |
| `reject_reason` | [string](#string) |  |  |





 <!-- end messages -->


<a name="fusionchain.treasury.KeyRequestStatus"></a>

### KeyRequestStatus
KeyRequestStatus indicates the status of a key request.
A request starts as "pending", waiting to be picked up. Then it can move to
either "approved" or "rejected", depending on the decision of the MPC nodes.

| Name | Number | Description |
| ---- | ------ | ----------- |
| KEY_REQUEST_STATUS_UNSPECIFIED | 0 | The request is missing the status field. |
| KEY_REQUEST_STATUS_PENDING | 1 | The request is waiting to be fulfilled. This is the initial state of a request. |
| KEY_REQUEST_STATUS_FULFILLED | 2 | The request was fulfilled. This is a final state for a request. |
| KEY_REQUEST_STATUS_REJECTED | 3 | The request was rejected. This is a final state for a request. |



<a name="fusionchain.treasury.KeyType"></a>

### KeyType
KeyType indicates what crypto scheme will be used by this key (e.g.
ECDSA). Its public key will be one of the specified type.

| Name | Number | Description |
| ---- | ------ | ----------- |
| KEY_TYPE_UNSPECIFIED | 0 | The key type is missing. |
| KEY_TYPE_ECDSA_SECP256K1 | 1 | The key is an ECDSA secp256k1 key. |
| KEY_TYPE_EDDSA_ED25519 | 2 | The key is an EdDSA Ed25519 key. |


 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/treasury/mpcsign.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/mpcsign.proto



<a name="fusionchain.treasury.SignRequest"></a>

### SignRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `creator` | [string](#string) |  |  |
| `key_id` | [uint64](#uint64) |  |  |
| `data_for_signing` | [bytes](#bytes) |  |  |
| `status` | [SignRequestStatus](#fusionchain.treasury.SignRequestStatus) |  |  |
| `signed_data` | [bytes](#bytes) |  |  |
| `reject_reason` | [string](#string) |  |  |






<a name="fusionchain.treasury.SignTransactionRequest"></a>

### SignTransactionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `creator` | [string](#string) |  |  |
| `wallet_id` | [uint64](#uint64) |  |  |
| `unsigned_transaction` | [bytes](#bytes) |  |  |
| `sign_request_id` | [uint64](#uint64) |  |  |





 <!-- end messages -->


<a name="fusionchain.treasury.SignRequestStatus"></a>

### SignRequestStatus
SignRequestStatus indicates the status of an MPC signature request.
A request starts as "pending", waiting to be picked up. Then it can move to
either "approved" or "rejected", depending on the decision of the MPC nodes.

| Name | Number | Description |
| ---- | ------ | ----------- |
| SIGN_REQUEST_STATUS_UNSPECIFIED | 0 | The request is missing the status field. |
| SIGN_REQUEST_STATUS_PENDING | 1 | The request is waiting to be fulfilled. This is the initial state of a request. |
| SIGN_REQUEST_STATUS_FULFILLED | 2 | The request was fulfilled. This is a final state for a request. |
| SIGN_REQUEST_STATUS_REJECTED | 3 | The request was rejected. This is a final state for a request. |


 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/treasury/wallet.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/wallet.proto



<a name="fusionchain.treasury.Wallet"></a>

### Wallet



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `type` | [WalletType](#fusionchain.treasury.WalletType) |  |  |
| `key_id` | [uint64](#uint64) |  |  |





 <!-- end messages -->


<a name="fusionchain.treasury.WalletType"></a>

### WalletType
WalletType specifies the Layer 1 blockchain that this wallet will be used
for.

| Name | Number | Description |
| ---- | ------ | ----------- |
| WALLET_TYPE_UNSPECIFIED | 0 | The wallet type is missing |
| WALLET_TYPE_QRDO | 1 | The wallet type for native Fusion chain cosmos accounts (not ERC-20 QRDO tokens) |
| WALLET_TYPE_ETH | 2 | The wallet type for mainnet ETH and its ERC-20 tokens (including non-native QRDO) |
| WALLET_TYPE_ETH_SEPOLIA | 3 | The wallet type for Sepolia testnet ETH and its ERC-20 tokens |


 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="fusionchain/treasury/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/query.proto



<a name="fusionchain.treasury.QueryKeyRequestByIdRequest"></a>

### QueryKeyRequestByIdRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.QueryKeyRequestByIdResponse"></a>

### QueryKeyRequestByIdResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `key_request` | [KeyRequest](#fusionchain.treasury.KeyRequest) |  |  |






<a name="fusionchain.treasury.QueryKeyRequestsRequest"></a>

### QueryKeyRequestsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |
| `keyring_id` | [uint64](#uint64) |  |  |
| `status` | [KeyRequestStatus](#fusionchain.treasury.KeyRequestStatus) | optional |  |
| `workspace_addr` | [string](#string) |  |  |






<a name="fusionchain.treasury.QueryKeyRequestsResponse"></a>

### QueryKeyRequestsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `key_requests` | [KeyRequest](#fusionchain.treasury.KeyRequest) | repeated |  |






<a name="fusionchain.treasury.QueryKeysRequest"></a>

### QueryKeysRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |
| `workspace_addr` | [string](#string) | optional |  |






<a name="fusionchain.treasury.QueryKeysResponse"></a>

### QueryKeysResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `keys` | [Key](#fusionchain.treasury.Key) | repeated |  |






<a name="fusionchain.treasury.QueryParamsRequest"></a>

### QueryParamsRequest
QueryParamsRequest is request type for the Query/Params RPC method.






<a name="fusionchain.treasury.QueryParamsResponse"></a>

### QueryParamsResponse
QueryParamsResponse is response type for the Query/Params RPC method.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.treasury.Params) |  | params holds all the parameters of this module. |






<a name="fusionchain.treasury.QuerySignTransactionRequestsRequest"></a>

### QuerySignTransactionRequestsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |
| `wallet_type` | [WalletType](#fusionchain.treasury.WalletType) |  |  |
| `status` | [SignRequestStatus](#fusionchain.treasury.SignRequestStatus) | optional |  |
| `wallet_id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.QuerySignTransactionRequestsResponse"></a>

### QuerySignTransactionRequestsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `sign_transaction_requests` | [SignTransactionRequestResponse](#fusionchain.treasury.SignTransactionRequestResponse) | repeated |  |






<a name="fusionchain.treasury.QuerySignatureRequestByIdRequest"></a>

### QuerySignatureRequestByIdRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.QuerySignatureRequestByIdResponse"></a>

### QuerySignatureRequestByIdResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sign_request` | [SignRequest](#fusionchain.treasury.SignRequest) |  |  |






<a name="fusionchain.treasury.QuerySignatureRequestsRequest"></a>

### QuerySignatureRequestsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |
| `keyring_id` | [uint64](#uint64) |  |  |
| `status` | [SignRequestStatus](#fusionchain.treasury.SignRequestStatus) | optional |  |






<a name="fusionchain.treasury.QuerySignatureRequestsResponse"></a>

### QuerySignatureRequestsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `sign_requests` | [SignRequest](#fusionchain.treasury.SignRequest) | repeated |  |






<a name="fusionchain.treasury.QueryWalletByIdRequest"></a>

### QueryWalletByIdRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.QueryWalletByIdResponse"></a>

### QueryWalletByIdResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `wallet` | [WalletResponse](#fusionchain.treasury.WalletResponse) |  |  |






<a name="fusionchain.treasury.QueryWalletsRequest"></a>

### QueryWalletsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |
| `key_id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.QueryWalletsResponse"></a>

### QueryWalletsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `wallets` | [WalletResponse](#fusionchain.treasury.WalletResponse) | repeated |  |






<a name="fusionchain.treasury.SignTransactionRequestResponse"></a>

### SignTransactionRequestResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sign_transaction_request` | [SignTransactionRequest](#fusionchain.treasury.SignTransactionRequest) |  |  |
| `sign_request` | [SignRequest](#fusionchain.treasury.SignRequest) |  |  |






<a name="fusionchain.treasury.WalletResponse"></a>

### WalletResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `wallet` | [Wallet](#fusionchain.treasury.Wallet) |  |  |
| `address` | [string](#string) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.treasury.Query"></a>

### Query
Query defines the gRPC querier service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `Params` | [QueryParamsRequest](#fusionchain.treasury.QueryParamsRequest) | [QueryParamsResponse](#fusionchain.treasury.QueryParamsResponse) | Parameters queries the parameters of the module. | GET|/fusionchain/treasury/params|
| `KeyRequests` | [QueryKeyRequestsRequest](#fusionchain.treasury.QueryKeyRequestsRequest) | [QueryKeyRequestsResponse](#fusionchain.treasury.QueryKeyRequestsResponse) | Queries a list of KeyRequests items. | GET|/fusionchain/treasury/key_requests|
| `KeyRequestById` | [QueryKeyRequestByIdRequest](#fusionchain.treasury.QueryKeyRequestByIdRequest) | [QueryKeyRequestByIdResponse](#fusionchain.treasury.QueryKeyRequestByIdResponse) | Queries a single KeyRequest by its id. | GET|/fusionchain/treasury/key_request_by_id|
| `Keys` | [QueryKeysRequest](#fusionchain.treasury.QueryKeysRequest) | [QueryKeysResponse](#fusionchain.treasury.QueryKeysResponse) | Queries a list of Keys items. | GET|/fusionchain/treasury/keys|
| `SignatureRequests` | [QuerySignatureRequestsRequest](#fusionchain.treasury.QuerySignatureRequestsRequest) | [QuerySignatureRequestsResponse](#fusionchain.treasury.QuerySignatureRequestsResponse) | Queries a list of SignatureRequests items. | GET|/fusionchain/treasury/get_signature_requests|
| `SignatureRequestById` | [QuerySignatureRequestByIdRequest](#fusionchain.treasury.QuerySignatureRequestByIdRequest) | [QuerySignatureRequestByIdResponse](#fusionchain.treasury.QuerySignatureRequestByIdResponse) | Queries a single SignatureRequest by its id. | GET|/fusionchain/treasury/signature_request_by_id|
| `Wallets` | [QueryWalletsRequest](#fusionchain.treasury.QueryWalletsRequest) | [QueryWalletsResponse](#fusionchain.treasury.QueryWalletsResponse) | Queries a list of Wallet items. | GET|/fusionchain/treasury/wallets|
| `WalletById` | [QueryWalletByIdRequest](#fusionchain.treasury.QueryWalletByIdRequest) | [QueryWalletByIdResponse](#fusionchain.treasury.QueryWalletByIdResponse) | Queries a list of WalletById items. | GET|/fusionchain/treasury/wallet_by_id|
| `SignTransactionRequests` | [QuerySignTransactionRequestsRequest](#fusionchain.treasury.QuerySignTransactionRequestsRequest) | [QuerySignTransactionRequestsResponse](#fusionchain.treasury.QuerySignTransactionRequestsResponse) | Queries a list of SignTransactionRequests items. | GET|/fusionchain/treasury/sign_transaction_requests|

 <!-- end services -->



<a name="fusionchain/treasury/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/tx.proto



<a name="fusionchain.treasury.MsgFulfilSignatureRequest"></a>

### MsgFulfilSignatureRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `request_id` | [uint64](#uint64) |  |  |
| `status` | [SignRequestStatus](#fusionchain.treasury.SignRequestStatus) |  |  |
| `payload` | [MsgSignedData](#fusionchain.treasury.MsgSignedData) |  |  |
| `reject_reason` | [string](#string) |  |  |






<a name="fusionchain.treasury.MsgFulfilSignatureRequestResponse"></a>

### MsgFulfilSignatureRequestResponse







<a name="fusionchain.treasury.MsgNewKey"></a>

### MsgNewKey



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `public_key` | [bytes](#bytes) |  |  |






<a name="fusionchain.treasury.MsgNewKeyRequest"></a>

### MsgNewKeyRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `workspace_addr` | [string](#string) |  |  |
| `keyring_id` | [uint64](#uint64) |  |  |
| `key_type` | [KeyType](#fusionchain.treasury.KeyType) |  |  |






<a name="fusionchain.treasury.MsgNewKeyRequestResponse"></a>

### MsgNewKeyRequestResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.MsgNewSignTransactionRequest"></a>

### MsgNewSignTransactionRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `wallet_id` | [uint64](#uint64) |  |  |
| `unsigned_transaction` | [bytes](#bytes) |  |  |






<a name="fusionchain.treasury.MsgNewSignTransactionRequestResponse"></a>

### MsgNewSignTransactionRequestResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.MsgNewSignatureRequest"></a>

### MsgNewSignatureRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `key_id` | [uint64](#uint64) |  |  |
| `data_for_signing` | [bytes](#bytes) |  |  |






<a name="fusionchain.treasury.MsgNewSignatureRequestResponse"></a>

### MsgNewSignatureRequestResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.MsgNewWalletRequest"></a>

### MsgNewWalletRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `wallet_type` | [WalletType](#fusionchain.treasury.WalletType) |  |  |
| `key_id` | [uint64](#uint64) |  |  |






<a name="fusionchain.treasury.MsgNewWalletRequestResponse"></a>

### MsgNewWalletRequestResponse







<a name="fusionchain.treasury.MsgSignedData"></a>

### MsgSignedData



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `signed_data` | [bytes](#bytes) |  |  |






<a name="fusionchain.treasury.MsgUpdateKeyRequest"></a>

### MsgUpdateKeyRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `request_id` | [uint64](#uint64) |  |  |
| `status` | [KeyRequestStatus](#fusionchain.treasury.KeyRequestStatus) |  |  |
| `key` | [MsgNewKey](#fusionchain.treasury.MsgNewKey) |  |  |
| `reject_reason` | [string](#string) |  |  |






<a name="fusionchain.treasury.MsgUpdateKeyRequestResponse"></a>

### MsgUpdateKeyRequestResponse






 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="fusionchain.treasury.Msg"></a>

### Msg
Msg defines the Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `NewKeyRequest` | [MsgNewKeyRequest](#fusionchain.treasury.MsgNewKeyRequest) | [MsgNewKeyRequestResponse](#fusionchain.treasury.MsgNewKeyRequestResponse) | Request a new key to the MPC network, the key will belong to the specified workspace. | |
| `UpdateKeyRequest` | [MsgUpdateKeyRequest](#fusionchain.treasury.MsgUpdateKeyRequest) | [MsgUpdateKeyRequestResponse](#fusionchain.treasury.MsgUpdateKeyRequestResponse) | Update an existing request by writing a result into it. This message is called by MPC network nodes. | |
| `NewSignatureRequest` | [MsgNewSignatureRequest](#fusionchain.treasury.MsgNewSignatureRequest) | [MsgNewSignatureRequestResponse](#fusionchain.treasury.MsgNewSignatureRequestResponse) | Request a new signature | |
| `FulfilSignatureRequest` | [MsgFulfilSignatureRequest](#fusionchain.treasury.MsgFulfilSignatureRequest) | [MsgFulfilSignatureRequestResponse](#fusionchain.treasury.MsgFulfilSignatureRequestResponse) | Fulfill a signature request | |
| `NewWalletRequest` | [MsgNewWalletRequest](#fusionchain.treasury.MsgNewWalletRequest) | [MsgNewWalletRequestResponse](#fusionchain.treasury.MsgNewWalletRequestResponse) | Request a new wallet | |
| `NewSignTransactionRequest` | [MsgNewSignTransactionRequest](#fusionchain.treasury.MsgNewSignTransactionRequest) | [MsgNewSignTransactionRequestResponse](#fusionchain.treasury.MsgNewSignTransactionRequestResponse) | Request a new signature for a layer 1 transaction, using the specified wallet. The difference with NewSignatureRequest is that this message will be parsed by the wallet to apply specific Blackbird policies that depends on informations contained in the transaction itself (e.g. amount, recipient). | |

 <!-- end services -->



## Scalar Value Types

| .proto Type | Notes | C++ | Java | Python | Go | C# | PHP | Ruby |
| ----------- | ----- | --- | ---- | ------ | -- | -- | --- | ---- |
| <a name="double" /> double |  | double | double | float | float64 | double | float | Float |
| <a name="float" /> float |  | float | float | float | float32 | float | float | Float |
| <a name="int32" /> int32 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="int64" /> int64 | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="uint32" /> uint32 | Uses variable-length encoding. | uint32 | int | int/long | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64 | Uses variable-length encoding. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64 | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="fixed32" /> fixed32 | Always four bytes. More efficient than uint32 if values are often greater than 2^28. | uint32 | int | int | uint32 | uint | integer | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64 | Always eight bytes. More efficient than uint64 if values are often greater than 2^56. | uint64 | long | int/long | uint64 | ulong | integer/string | Bignum |
| <a name="sfixed32" /> sfixed32 | Always four bytes. | int32 | int | int | int32 | int | integer | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes. | int64 | long | int/long | int64 | long | integer/string | Bignum |
| <a name="bool" /> bool |  | bool | boolean | boolean | bool | bool | boolean | TrueClass/FalseClass |
| <a name="string" /> string | A string must always contain UTF-8 encoded or 7-bit ASCII text. | string | String | str/unicode | string | string | string | String (UTF-8) |
| <a name="bytes" /> bytes | May contain any arbitrary sequence of bytes. | string | ByteString | str | []byte | ByteString | string | String (ASCII-8BIT) |

