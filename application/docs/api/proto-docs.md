<!-- This file is auto-generated. Please do not modify it yourself. -->
# Protobuf Documentation
<a name="top"></a>

## Table of Contents

- [cosmwasm/wasm/v1/types.proto](#cosmwasm/wasm/v1/types.proto)
    - [AbsoluteTxPosition](#cosmwasm.wasm.v1.AbsoluteTxPosition)
    - [AccessConfig](#cosmwasm.wasm.v1.AccessConfig)
    - [AccessTypeParam](#cosmwasm.wasm.v1.AccessTypeParam)
    - [CodeInfo](#cosmwasm.wasm.v1.CodeInfo)
    - [ContractCodeHistoryEntry](#cosmwasm.wasm.v1.ContractCodeHistoryEntry)
    - [ContractInfo](#cosmwasm.wasm.v1.ContractInfo)
    - [Model](#cosmwasm.wasm.v1.Model)
    - [Params](#cosmwasm.wasm.v1.Params)
  
    - [AccessType](#cosmwasm.wasm.v1.AccessType)
    - [ContractCodeHistoryOperationType](#cosmwasm.wasm.v1.ContractCodeHistoryOperationType)
  
- [cosmwasm/wasm/v1/tx.proto](#cosmwasm/wasm/v1/tx.proto)
    - [MsgClearAdmin](#cosmwasm.wasm.v1.MsgClearAdmin)
    - [MsgClearAdminResponse](#cosmwasm.wasm.v1.MsgClearAdminResponse)
    - [MsgExecuteContract](#cosmwasm.wasm.v1.MsgExecuteContract)
    - [MsgExecuteContractResponse](#cosmwasm.wasm.v1.MsgExecuteContractResponse)
    - [MsgInstantiateContract](#cosmwasm.wasm.v1.MsgInstantiateContract)
    - [MsgInstantiateContractResponse](#cosmwasm.wasm.v1.MsgInstantiateContractResponse)
    - [MsgMigrateContract](#cosmwasm.wasm.v1.MsgMigrateContract)
    - [MsgMigrateContractResponse](#cosmwasm.wasm.v1.MsgMigrateContractResponse)
    - [MsgStoreCode](#cosmwasm.wasm.v1.MsgStoreCode)
    - [MsgStoreCodeResponse](#cosmwasm.wasm.v1.MsgStoreCodeResponse)
    - [MsgUpdateAdmin](#cosmwasm.wasm.v1.MsgUpdateAdmin)
    - [MsgUpdateAdminResponse](#cosmwasm.wasm.v1.MsgUpdateAdminResponse)
  
    - [Msg](#cosmwasm.wasm.v1.Msg)
  
- [cosmwasm/wasm/v1/genesis.proto](#cosmwasm/wasm/v1/genesis.proto)
    - [Code](#cosmwasm.wasm.v1.Code)
    - [Contract](#cosmwasm.wasm.v1.Contract)
    - [GenesisState](#cosmwasm.wasm.v1.GenesisState)
    - [GenesisState.GenMsgs](#cosmwasm.wasm.v1.GenesisState.GenMsgs)
    - [Sequence](#cosmwasm.wasm.v1.Sequence)
  
- [cosmwasm/wasm/v1/ibc.proto](#cosmwasm/wasm/v1/ibc.proto)
    - [MsgIBCCloseChannel](#cosmwasm.wasm.v1.MsgIBCCloseChannel)
    - [MsgIBCSend](#cosmwasm.wasm.v1.MsgIBCSend)
  
- [cosmwasm/wasm/v1/proposal.proto](#cosmwasm/wasm/v1/proposal.proto)
    - [AccessConfigUpdate](#cosmwasm.wasm.v1.AccessConfigUpdate)
    - [ClearAdminProposal](#cosmwasm.wasm.v1.ClearAdminProposal)
    - [ExecuteContractProposal](#cosmwasm.wasm.v1.ExecuteContractProposal)
    - [InstantiateContractProposal](#cosmwasm.wasm.v1.InstantiateContractProposal)
    - [MigrateContractProposal](#cosmwasm.wasm.v1.MigrateContractProposal)
    - [PinCodesProposal](#cosmwasm.wasm.v1.PinCodesProposal)
    - [StoreCodeProposal](#cosmwasm.wasm.v1.StoreCodeProposal)
    - [SudoContractProposal](#cosmwasm.wasm.v1.SudoContractProposal)
    - [UnpinCodesProposal](#cosmwasm.wasm.v1.UnpinCodesProposal)
    - [UpdateAdminProposal](#cosmwasm.wasm.v1.UpdateAdminProposal)
    - [UpdateInstantiateConfigProposal](#cosmwasm.wasm.v1.UpdateInstantiateConfigProposal)
  
- [cosmwasm/wasm/v1/query.proto](#cosmwasm/wasm/v1/query.proto)
    - [CodeInfoResponse](#cosmwasm.wasm.v1.CodeInfoResponse)
    - [QueryAllContractStateRequest](#cosmwasm.wasm.v1.QueryAllContractStateRequest)
    - [QueryAllContractStateResponse](#cosmwasm.wasm.v1.QueryAllContractStateResponse)
    - [QueryCodeRequest](#cosmwasm.wasm.v1.QueryCodeRequest)
    - [QueryCodeResponse](#cosmwasm.wasm.v1.QueryCodeResponse)
    - [QueryCodesRequest](#cosmwasm.wasm.v1.QueryCodesRequest)
    - [QueryCodesResponse](#cosmwasm.wasm.v1.QueryCodesResponse)
    - [QueryContractHistoryRequest](#cosmwasm.wasm.v1.QueryContractHistoryRequest)
    - [QueryContractHistoryResponse](#cosmwasm.wasm.v1.QueryContractHistoryResponse)
    - [QueryContractInfoRequest](#cosmwasm.wasm.v1.QueryContractInfoRequest)
    - [QueryContractInfoResponse](#cosmwasm.wasm.v1.QueryContractInfoResponse)
    - [QueryContractsByCodeRequest](#cosmwasm.wasm.v1.QueryContractsByCodeRequest)
    - [QueryContractsByCodeResponse](#cosmwasm.wasm.v1.QueryContractsByCodeResponse)
    - [QueryPinnedCodesRequest](#cosmwasm.wasm.v1.QueryPinnedCodesRequest)
    - [QueryPinnedCodesResponse](#cosmwasm.wasm.v1.QueryPinnedCodesResponse)
    - [QueryRawContractStateRequest](#cosmwasm.wasm.v1.QueryRawContractStateRequest)
    - [QueryRawContractStateResponse](#cosmwasm.wasm.v1.QueryRawContractStateResponse)
    - [QuerySmartContractStateRequest](#cosmwasm.wasm.v1.QuerySmartContractStateRequest)
    - [QuerySmartContractStateResponse](#cosmwasm.wasm.v1.QuerySmartContractStateResponse)
  
    - [Query](#cosmwasm.wasm.v1.Query)
  
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
  
- [ethermint/types/v1/indexer.proto](#ethermint/types/v1/indexer.proto)
    - [TxResult](#ethermint.types.v1.TxResult)
  
- [ethermint/types/v1/web3.proto](#ethermint/types/v1/web3.proto)
    - [ExtensionOptionsWeb3Tx](#ethermint.types.v1.ExtensionOptionsWeb3Tx)
  
- [fusionchain/blackbird/params.proto](#fusionchain/blackbird/params.proto)
    - [Params](#fusionchain.blackbird.Params)
  
- [fusionchain/blackbird/genesis.proto](#fusionchain/blackbird/genesis.proto)
    - [GenesisState](#fusionchain.blackbird.GenesisState)
  
- [fusionchain/blackbird/query.proto](#fusionchain/blackbird/query.proto)
    - [QueryParamsRequest](#fusionchain.blackbird.QueryParamsRequest)
    - [QueryParamsResponse](#fusionchain.blackbird.QueryParamsResponse)
    - [QueryVerifyRequest](#fusionchain.blackbird.QueryVerifyRequest)
    - [QueryVerifyResponse](#fusionchain.blackbird.QueryVerifyResponse)
  
    - [Query](#fusionchain.blackbird.Query)
  
- [fusionchain/blackbird/tx.proto](#fusionchain/blackbird/tx.proto)
    - [Msg](#fusionchain.blackbird.Msg)
  
- [fusionchain/identity/params.proto](#fusionchain/identity/params.proto)
    - [Params](#fusionchain.identity.Params)
  
- [fusionchain/identity/genesis.proto](#fusionchain/identity/genesis.proto)
    - [GenesisState](#fusionchain.identity.GenesisState)
  
- [fusionchain/identity/workspace.proto](#fusionchain/identity/workspace.proto)
    - [Action](#fusionchain.identity.Action)
    - [Workspace](#fusionchain.identity.Workspace)
  
- [fusionchain/identity/query.proto](#fusionchain/identity/query.proto)
    - [QueryActionsRequest](#fusionchain.identity.QueryActionsRequest)
    - [QueryActionsResponse](#fusionchain.identity.QueryActionsResponse)
    - [QueryParamsRequest](#fusionchain.identity.QueryParamsRequest)
    - [QueryParamsResponse](#fusionchain.identity.QueryParamsResponse)
    - [QueryWorkspacesByOwnerRequest](#fusionchain.identity.QueryWorkspacesByOwnerRequest)
    - [QueryWorkspacesRequest](#fusionchain.identity.QueryWorkspacesRequest)
    - [QueryWorkspacesResponse](#fusionchain.identity.QueryWorkspacesResponse)
  
    - [Query](#fusionchain.identity.Query)
  
- [fusionchain/identity/tx.proto](#fusionchain/identity/tx.proto)
    - [MsgAddWorkspaceOwner](#fusionchain.identity.MsgAddWorkspaceOwner)
    - [MsgAddWorkspaceOwnerResponse](#fusionchain.identity.MsgAddWorkspaceOwnerResponse)
    - [MsgApproveAction](#fusionchain.identity.MsgApproveAction)
    - [MsgApproveActionResponse](#fusionchain.identity.MsgApproveActionResponse)
    - [MsgNewWorkspace](#fusionchain.identity.MsgNewWorkspace)
    - [MsgNewWorkspaceResponse](#fusionchain.identity.MsgNewWorkspaceResponse)
    - [MsgRemoveWorkspaceOwner](#fusionchain.identity.MsgRemoveWorkspaceOwner)
    - [MsgRemoveWorkspaceOwnerResponse](#fusionchain.identity.MsgRemoveWorkspaceOwnerResponse)
  
    - [Msg](#fusionchain.identity.Msg)
  
- [fusionchain/treasury/params.proto](#fusionchain/treasury/params.proto)
    - [Params](#fusionchain.treasury.Params)
  
- [fusionchain/treasury/genesis.proto](#fusionchain/treasury/genesis.proto)
    - [GenesisState](#fusionchain.treasury.GenesisState)
  
- [fusionchain/treasury/key.proto](#fusionchain/treasury/key.proto)
    - [Key](#fusionchain.treasury.Key)
    - [KeyRequest](#fusionchain.treasury.KeyRequest)
  
    - [KeyRequestStatus](#fusionchain.treasury.KeyRequestStatus)
    - [KeyType](#fusionchain.treasury.KeyType)
  
- [fusionchain/treasury/mpcsign.proto](#fusionchain/treasury/mpcsign.proto)
    - [SignRequest](#fusionchain.treasury.SignRequest)
  
    - [SignRequestStatus](#fusionchain.treasury.SignRequestStatus)
  
- [fusionchain/treasury/wallet.proto](#fusionchain/treasury/wallet.proto)
    - [Wallet](#fusionchain.treasury.Wallet)
  
    - [WalletType](#fusionchain.treasury.WalletType)
  
- [fusionchain/treasury/query.proto](#fusionchain/treasury/query.proto)
    - [QueryKeyRequestByIdRequest](#fusionchain.treasury.QueryKeyRequestByIdRequest)
    - [QueryKeyRequestByIdResponse](#fusionchain.treasury.QueryKeyRequestByIdResponse)
    - [QueryKeyRequestsRequest](#fusionchain.treasury.QueryKeyRequestsRequest)
    - [QueryKeyRequestsResponse](#fusionchain.treasury.QueryKeyRequestsResponse)
    - [QueryKeysRequest](#fusionchain.treasury.QueryKeysRequest)
    - [QueryKeysResponse](#fusionchain.treasury.QueryKeysResponse)
    - [QueryParamsRequest](#fusionchain.treasury.QueryParamsRequest)
    - [QueryParamsResponse](#fusionchain.treasury.QueryParamsResponse)
    - [QuerySignatureRequestByIdRequest](#fusionchain.treasury.QuerySignatureRequestByIdRequest)
    - [QuerySignatureRequestByIdResponse](#fusionchain.treasury.QuerySignatureRequestByIdResponse)
    - [QuerySignatureRequestsRequest](#fusionchain.treasury.QuerySignatureRequestsRequest)
    - [QuerySignatureRequestsResponse](#fusionchain.treasury.QuerySignatureRequestsResponse)
    - [QueryWalletsRequest](#fusionchain.treasury.QueryWalletsRequest)
    - [QueryWalletsResponse](#fusionchain.treasury.QueryWalletsResponse)
    - [WalletResponse](#fusionchain.treasury.WalletResponse)
  
    - [Query](#fusionchain.treasury.Query)
  
- [fusionchain/treasury/tx.proto](#fusionchain/treasury/tx.proto)
    - [MsgFulfillSignatureRequest](#fusionchain.treasury.MsgFulfillSignatureRequest)
    - [MsgFulfillSignatureRequestResponse](#fusionchain.treasury.MsgFulfillSignatureRequestResponse)
    - [MsgNewKey](#fusionchain.treasury.MsgNewKey)
    - [MsgNewKeyRequest](#fusionchain.treasury.MsgNewKeyRequest)
    - [MsgNewKeyRequestResponse](#fusionchain.treasury.MsgNewKeyRequestResponse)
    - [MsgNewSignatureRequest](#fusionchain.treasury.MsgNewSignatureRequest)
    - [MsgNewSignatureRequestResponse](#fusionchain.treasury.MsgNewSignatureRequestResponse)
    - [MsgNewWalletRequest](#fusionchain.treasury.MsgNewWalletRequest)
    - [MsgNewWalletRequestResponse](#fusionchain.treasury.MsgNewWalletRequestResponse)
    - [MsgSignedData](#fusionchain.treasury.MsgSignedData)
    - [MsgUpdateKeyRequest](#fusionchain.treasury.MsgUpdateKeyRequest)
    - [MsgUpdateKeyRequestResponse](#fusionchain.treasury.MsgUpdateKeyRequestResponse)
  
    - [Msg](#fusionchain.treasury.Msg)
  
- [Scalar Value Types](#scalar-value-types)



<a name="cosmwasm/wasm/v1/types.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## cosmwasm/wasm/v1/types.proto



<a name="cosmwasm.wasm.v1.AbsoluteTxPosition"></a>

### AbsoluteTxPosition
AbsoluteTxPosition is a unique transaction position that allows for global
ordering of transactions.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `block_height` | [uint64](#uint64) |  | BlockHeight is the block the contract was created at |
| `tx_index` | [uint64](#uint64) |  | TxIndex is a monotonic counter within the block (actual transaction index, or gas consumed) |






<a name="cosmwasm.wasm.v1.AccessConfig"></a>

### AccessConfig
AccessConfig access control type.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `permission` | [AccessType](#cosmwasm.wasm.v1.AccessType) |  |  |
| `address` | [string](#string) |  |  |






<a name="cosmwasm.wasm.v1.AccessTypeParam"></a>

### AccessTypeParam
AccessTypeParam


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `value` | [AccessType](#cosmwasm.wasm.v1.AccessType) |  |  |






<a name="cosmwasm.wasm.v1.CodeInfo"></a>

### CodeInfo
CodeInfo is data for the uploaded contract WASM code


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_hash` | [bytes](#bytes) |  | CodeHash is the unique identifier created by wasmvm |
| `creator` | [string](#string) |  | Creator address who initially stored the code |
| `instantiate_config` | [AccessConfig](#cosmwasm.wasm.v1.AccessConfig) |  | InstantiateConfig access control to apply on contract creation, optional |






<a name="cosmwasm.wasm.v1.ContractCodeHistoryEntry"></a>

### ContractCodeHistoryEntry
ContractCodeHistoryEntry metadata to a contract.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `operation` | [ContractCodeHistoryOperationType](#cosmwasm.wasm.v1.ContractCodeHistoryOperationType) |  |  |
| `code_id` | [uint64](#uint64) |  | CodeID is the reference to the stored WASM code |
| `updated` | [AbsoluteTxPosition](#cosmwasm.wasm.v1.AbsoluteTxPosition) |  | Updated Tx position when the operation was executed. |
| `msg` | [bytes](#bytes) |  |  |






<a name="cosmwasm.wasm.v1.ContractInfo"></a>

### ContractInfo
ContractInfo stores a WASM contract instance


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_id` | [uint64](#uint64) |  | CodeID is the reference to the stored Wasm code |
| `creator` | [string](#string) |  | Creator address who initially instantiated the contract |
| `admin` | [string](#string) |  | Admin is an optional address that can execute migrations |
| `label` | [string](#string) |  | Label is optional metadata to be stored with a contract instance. |
| `created` | [AbsoluteTxPosition](#cosmwasm.wasm.v1.AbsoluteTxPosition) |  | Created Tx position when the contract was instantiated. This data should kept internal and not be exposed via query results. Just use for sorting |
| `ibc_port_id` | [string](#string) |  |  |
| `extension` | [google.protobuf.Any](#google.protobuf.Any) |  | Extension is an extension point to store custom metadata within the persistence model. |






<a name="cosmwasm.wasm.v1.Model"></a>

### Model
Model is a struct that holds a KV pair


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `key` | [bytes](#bytes) |  | hex-encode key to read it better (this is often ascii) |
| `value` | [bytes](#bytes) |  | base64-encode raw value |






<a name="cosmwasm.wasm.v1.Params"></a>

### Params
Params defines the set of wasm parameters.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_upload_access` | [AccessConfig](#cosmwasm.wasm.v1.AccessConfig) |  |  |
| `instantiate_default_permission` | [AccessType](#cosmwasm.wasm.v1.AccessType) |  |  |





 <!-- end messages -->


<a name="cosmwasm.wasm.v1.AccessType"></a>

### AccessType
AccessType permission types

| Name | Number | Description |
| ---- | ------ | ----------- |
| ACCESS_TYPE_UNSPECIFIED | 0 | AccessTypeUnspecified placeholder for empty value |
| ACCESS_TYPE_NOBODY | 1 | AccessTypeNobody forbidden |
| ACCESS_TYPE_ONLY_ADDRESS | 2 | AccessTypeOnlyAddress restricted to an address |
| ACCESS_TYPE_EVERYBODY | 3 | AccessTypeEverybody unrestricted |



<a name="cosmwasm.wasm.v1.ContractCodeHistoryOperationType"></a>

### ContractCodeHistoryOperationType
ContractCodeHistoryOperationType actions that caused a code change

| Name | Number | Description |
| ---- | ------ | ----------- |
| CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED | 0 | ContractCodeHistoryOperationTypeUnspecified placeholder for empty value |
| CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT | 1 | ContractCodeHistoryOperationTypeInit on chain contract instantiation |
| CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE | 2 | ContractCodeHistoryOperationTypeMigrate code migration |
| CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS | 3 | ContractCodeHistoryOperationTypeGenesis based on genesis data |


 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="cosmwasm/wasm/v1/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## cosmwasm/wasm/v1/tx.proto



<a name="cosmwasm.wasm.v1.MsgClearAdmin"></a>

### MsgClearAdmin
MsgClearAdmin removes any admin stored for a smart contract


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  | Sender is the that actor that signed the messages |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |






<a name="cosmwasm.wasm.v1.MsgClearAdminResponse"></a>

### MsgClearAdminResponse
MsgClearAdminResponse returns empty data






<a name="cosmwasm.wasm.v1.MsgExecuteContract"></a>

### MsgExecuteContract
MsgExecuteContract submits the given message data to a smart contract


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  | Sender is the that actor that signed the messages |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |
| `msg` | [bytes](#bytes) |  | Msg json encoded message to be passed to the contract |
| `funds` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | Funds coins that are transferred to the contract on execution |






<a name="cosmwasm.wasm.v1.MsgExecuteContractResponse"></a>

### MsgExecuteContractResponse
MsgExecuteContractResponse returns execution result data.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `data` | [bytes](#bytes) |  | Data contains base64-encoded bytes to returned from the contract |






<a name="cosmwasm.wasm.v1.MsgInstantiateContract"></a>

### MsgInstantiateContract
MsgInstantiateContract create a new smart contract instance for the given
code id.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  | Sender is the that actor that signed the messages |
| `admin` | [string](#string) |  | Admin is an optional address that can execute migrations |
| `code_id` | [uint64](#uint64) |  | CodeID is the reference to the stored WASM code |
| `label` | [string](#string) |  | Label is optional metadata to be stored with a contract instance. |
| `msg` | [bytes](#bytes) |  | Msg json encoded message to be passed to the contract on instantiation |
| `funds` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | Funds coins that are transferred to the contract on instantiation |






<a name="cosmwasm.wasm.v1.MsgInstantiateContractResponse"></a>

### MsgInstantiateContractResponse
MsgInstantiateContractResponse return instantiation result data


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | Address is the bech32 address of the new contract instance. |
| `data` | [bytes](#bytes) |  | Data contains base64-encoded bytes to returned from the contract |






<a name="cosmwasm.wasm.v1.MsgMigrateContract"></a>

### MsgMigrateContract
MsgMigrateContract runs a code upgrade/ downgrade for a smart contract


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  | Sender is the that actor that signed the messages |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |
| `code_id` | [uint64](#uint64) |  | CodeID references the new WASM code |
| `msg` | [bytes](#bytes) |  | Msg json encoded message to be passed to the contract on migration |






<a name="cosmwasm.wasm.v1.MsgMigrateContractResponse"></a>

### MsgMigrateContractResponse
MsgMigrateContractResponse returns contract migration result data.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `data` | [bytes](#bytes) |  | Data contains same raw bytes returned as data from the wasm contract. (May be empty) |






<a name="cosmwasm.wasm.v1.MsgStoreCode"></a>

### MsgStoreCode
MsgStoreCode submit Wasm code to the system


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  | Sender is the that actor that signed the messages |
| `wasm_byte_code` | [bytes](#bytes) |  | WASMByteCode can be raw or gzip compressed |
| `instantiate_permission` | [AccessConfig](#cosmwasm.wasm.v1.AccessConfig) |  | InstantiatePermission access control to apply on contract creation, optional |






<a name="cosmwasm.wasm.v1.MsgStoreCodeResponse"></a>

### MsgStoreCodeResponse
MsgStoreCodeResponse returns store result data.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_id` | [uint64](#uint64) |  | CodeID is the reference to the stored WASM code |






<a name="cosmwasm.wasm.v1.MsgUpdateAdmin"></a>

### MsgUpdateAdmin
MsgUpdateAdmin sets a new admin for a smart contract


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `sender` | [string](#string) |  | Sender is the that actor that signed the messages |
| `new_admin` | [string](#string) |  | NewAdmin address to be set |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |






<a name="cosmwasm.wasm.v1.MsgUpdateAdminResponse"></a>

### MsgUpdateAdminResponse
MsgUpdateAdminResponse returns empty data





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="cosmwasm.wasm.v1.Msg"></a>

### Msg
Msg defines the wasm Msg service.

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `StoreCode` | [MsgStoreCode](#cosmwasm.wasm.v1.MsgStoreCode) | [MsgStoreCodeResponse](#cosmwasm.wasm.v1.MsgStoreCodeResponse) | StoreCode to submit Wasm code to the system | |
| `InstantiateContract` | [MsgInstantiateContract](#cosmwasm.wasm.v1.MsgInstantiateContract) | [MsgInstantiateContractResponse](#cosmwasm.wasm.v1.MsgInstantiateContractResponse) | Instantiate creates a new smart contract instance for the given code id. | |
| `ExecuteContract` | [MsgExecuteContract](#cosmwasm.wasm.v1.MsgExecuteContract) | [MsgExecuteContractResponse](#cosmwasm.wasm.v1.MsgExecuteContractResponse) | Execute submits the given message data to a smart contract | |
| `MigrateContract` | [MsgMigrateContract](#cosmwasm.wasm.v1.MsgMigrateContract) | [MsgMigrateContractResponse](#cosmwasm.wasm.v1.MsgMigrateContractResponse) | Migrate runs a code upgrade/ downgrade for a smart contract | |
| `UpdateAdmin` | [MsgUpdateAdmin](#cosmwasm.wasm.v1.MsgUpdateAdmin) | [MsgUpdateAdminResponse](#cosmwasm.wasm.v1.MsgUpdateAdminResponse) | UpdateAdmin sets a new admin for a smart contract | |
| `ClearAdmin` | [MsgClearAdmin](#cosmwasm.wasm.v1.MsgClearAdmin) | [MsgClearAdminResponse](#cosmwasm.wasm.v1.MsgClearAdminResponse) | ClearAdmin removes any admin stored for a smart contract | |

 <!-- end services -->



<a name="cosmwasm/wasm/v1/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## cosmwasm/wasm/v1/genesis.proto



<a name="cosmwasm.wasm.v1.Code"></a>

### Code
Code struct encompasses CodeInfo and CodeBytes


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_id` | [uint64](#uint64) |  |  |
| `code_info` | [CodeInfo](#cosmwasm.wasm.v1.CodeInfo) |  |  |
| `code_bytes` | [bytes](#bytes) |  |  |
| `pinned` | [bool](#bool) |  | Pinned to wasmvm cache |






<a name="cosmwasm.wasm.v1.Contract"></a>

### Contract
Contract struct encompasses ContractAddress, ContractInfo, and ContractState


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `contract_address` | [string](#string) |  |  |
| `contract_info` | [ContractInfo](#cosmwasm.wasm.v1.ContractInfo) |  |  |
| `contract_state` | [Model](#cosmwasm.wasm.v1.Model) | repeated |  |






<a name="cosmwasm.wasm.v1.GenesisState"></a>

### GenesisState
GenesisState - genesis state of x/wasm


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#cosmwasm.wasm.v1.Params) |  |  |
| `codes` | [Code](#cosmwasm.wasm.v1.Code) | repeated |  |
| `contracts` | [Contract](#cosmwasm.wasm.v1.Contract) | repeated |  |
| `sequences` | [Sequence](#cosmwasm.wasm.v1.Sequence) | repeated |  |
| `gen_msgs` | [GenesisState.GenMsgs](#cosmwasm.wasm.v1.GenesisState.GenMsgs) | repeated |  |






<a name="cosmwasm.wasm.v1.GenesisState.GenMsgs"></a>

### GenesisState.GenMsgs
GenMsgs define the messages that can be executed during genesis phase in
order. The intention is to have more human readable data that is auditable.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `store_code` | [MsgStoreCode](#cosmwasm.wasm.v1.MsgStoreCode) |  |  |
| `instantiate_contract` | [MsgInstantiateContract](#cosmwasm.wasm.v1.MsgInstantiateContract) |  |  |
| `execute_contract` | [MsgExecuteContract](#cosmwasm.wasm.v1.MsgExecuteContract) |  |  |






<a name="cosmwasm.wasm.v1.Sequence"></a>

### Sequence
Sequence key and value of an id generation counter


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id_key` | [bytes](#bytes) |  |  |
| `value` | [uint64](#uint64) |  |  |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="cosmwasm/wasm/v1/ibc.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## cosmwasm/wasm/v1/ibc.proto



<a name="cosmwasm.wasm.v1.MsgIBCCloseChannel"></a>

### MsgIBCCloseChannel
MsgIBCCloseChannel port and channel need to be owned by the contract


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `channel` | [string](#string) |  |  |






<a name="cosmwasm.wasm.v1.MsgIBCSend"></a>

### MsgIBCSend
MsgIBCSend


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `channel` | [string](#string) |  | the channel by which the packet will be sent |
| `timeout_height` | [uint64](#uint64) |  | Timeout height relative to the current block height. The timeout is disabled when set to 0. |
| `timeout_timestamp` | [uint64](#uint64) |  | Timeout timestamp (in nanoseconds) relative to the current block timestamp. The timeout is disabled when set to 0. |
| `data` | [bytes](#bytes) |  | Data is the payload to transfer. We must not make assumption what format or content is in here. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="cosmwasm/wasm/v1/proposal.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## cosmwasm/wasm/v1/proposal.proto



<a name="cosmwasm.wasm.v1.AccessConfigUpdate"></a>

### AccessConfigUpdate
AccessConfigUpdate contains the code id and the access config to be
applied.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_id` | [uint64](#uint64) |  | CodeID is the reference to the stored WASM code to be updated |
| `instantiate_permission` | [AccessConfig](#cosmwasm.wasm.v1.AccessConfig) |  | InstantiatePermission to apply to the set of code ids |






<a name="cosmwasm.wasm.v1.ClearAdminProposal"></a>

### ClearAdminProposal
ClearAdminProposal gov proposal content type to clear the admin of a
contract.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |






<a name="cosmwasm.wasm.v1.ExecuteContractProposal"></a>

### ExecuteContractProposal
ExecuteContractProposal gov proposal content type to call execute on a
contract.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `run_as` | [string](#string) |  | RunAs is the address that is passed to the contract's environment as sender |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |
| `msg` | [bytes](#bytes) |  | Msg json encoded message to be passed to the contract as execute |
| `funds` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | Funds coins that are transferred to the contract on instantiation |






<a name="cosmwasm.wasm.v1.InstantiateContractProposal"></a>

### InstantiateContractProposal
InstantiateContractProposal gov proposal content type to instantiate a
contract.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `run_as` | [string](#string) |  | RunAs is the address that is passed to the contract's environment as sender |
| `admin` | [string](#string) |  | Admin is an optional address that can execute migrations |
| `code_id` | [uint64](#uint64) |  | CodeID is the reference to the stored WASM code |
| `label` | [string](#string) |  | Label is optional metadata to be stored with a constract instance. |
| `msg` | [bytes](#bytes) |  | Msg json encoded message to be passed to the contract on instantiation |
| `funds` | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | Funds coins that are transferred to the contract on instantiation |






<a name="cosmwasm.wasm.v1.MigrateContractProposal"></a>

### MigrateContractProposal
MigrateContractProposal gov proposal content type to migrate a contract.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text

Note: skipping 3 as this was previously used for unneeded run_as |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |
| `code_id` | [uint64](#uint64) |  | CodeID references the new WASM code |
| `msg` | [bytes](#bytes) |  | Msg json encoded message to be passed to the contract on migration |






<a name="cosmwasm.wasm.v1.PinCodesProposal"></a>

### PinCodesProposal
PinCodesProposal gov proposal content type to pin a set of code ids in the
wasmvm cache.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `code_ids` | [uint64](#uint64) | repeated | CodeIDs references the new WASM codes |






<a name="cosmwasm.wasm.v1.StoreCodeProposal"></a>

### StoreCodeProposal
StoreCodeProposal gov proposal content type to submit WASM code to the system


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `run_as` | [string](#string) |  | RunAs is the address that is passed to the contract's environment as sender |
| `wasm_byte_code` | [bytes](#bytes) |  | WASMByteCode can be raw or gzip compressed |
| `instantiate_permission` | [AccessConfig](#cosmwasm.wasm.v1.AccessConfig) |  | InstantiatePermission to apply on contract creation, optional |






<a name="cosmwasm.wasm.v1.SudoContractProposal"></a>

### SudoContractProposal
SudoContractProposal gov proposal content type to call sudo on a contract.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |
| `msg` | [bytes](#bytes) |  | Msg json encoded message to be passed to the contract as sudo |






<a name="cosmwasm.wasm.v1.UnpinCodesProposal"></a>

### UnpinCodesProposal
UnpinCodesProposal gov proposal content type to unpin a set of code ids in
the wasmvm cache.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `code_ids` | [uint64](#uint64) | repeated | CodeIDs references the WASM codes |






<a name="cosmwasm.wasm.v1.UpdateAdminProposal"></a>

### UpdateAdminProposal
UpdateAdminProposal gov proposal content type to set an admin for a contract.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `new_admin` | [string](#string) |  | NewAdmin address to be set |
| `contract` | [string](#string) |  | Contract is the address of the smart contract |






<a name="cosmwasm.wasm.v1.UpdateInstantiateConfigProposal"></a>

### UpdateInstantiateConfigProposal
UpdateInstantiateConfigProposal gov proposal content type to update
instantiate config to a  set of code ids.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `title` | [string](#string) |  | Title is a short summary |
| `description` | [string](#string) |  | Description is a human readable text |
| `access_config_updates` | [AccessConfigUpdate](#cosmwasm.wasm.v1.AccessConfigUpdate) | repeated | AccessConfigUpdate contains the list of code ids and the access config to be applied. |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->

 <!-- end services -->



<a name="cosmwasm/wasm/v1/query.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## cosmwasm/wasm/v1/query.proto



<a name="cosmwasm.wasm.v1.CodeInfoResponse"></a>

### CodeInfoResponse
CodeInfoResponse contains code meta data from CodeInfo


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_id` | [uint64](#uint64) |  | id for legacy support |
| `creator` | [string](#string) |  |  |
| `data_hash` | [bytes](#bytes) |  |  |
| `instantiate_permission` | [AccessConfig](#cosmwasm.wasm.v1.AccessConfig) |  |  |






<a name="cosmwasm.wasm.v1.QueryAllContractStateRequest"></a>

### QueryAllContractStateRequest
QueryAllContractStateRequest is the request type for the
Query/AllContractState RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the address of the contract |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  | pagination defines an optional pagination for the request. |






<a name="cosmwasm.wasm.v1.QueryAllContractStateResponse"></a>

### QueryAllContractStateResponse
QueryAllContractStateResponse is the response type for the
Query/AllContractState RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `models` | [Model](#cosmwasm.wasm.v1.Model) | repeated |  |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  | pagination defines the pagination in the response. |






<a name="cosmwasm.wasm.v1.QueryCodeRequest"></a>

### QueryCodeRequest
QueryCodeRequest is the request type for the Query/Code RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_id` | [uint64](#uint64) |  | grpc-gateway_out does not support Go style CodID |






<a name="cosmwasm.wasm.v1.QueryCodeResponse"></a>

### QueryCodeResponse
QueryCodeResponse is the response type for the Query/Code RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_info` | [CodeInfoResponse](#cosmwasm.wasm.v1.CodeInfoResponse) |  |  |
| `data` | [bytes](#bytes) |  |  |






<a name="cosmwasm.wasm.v1.QueryCodesRequest"></a>

### QueryCodesRequest
QueryCodesRequest is the request type for the Query/Codes RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  | pagination defines an optional pagination for the request. |






<a name="cosmwasm.wasm.v1.QueryCodesResponse"></a>

### QueryCodesResponse
QueryCodesResponse is the response type for the Query/Codes RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_infos` | [CodeInfoResponse](#cosmwasm.wasm.v1.CodeInfoResponse) | repeated |  |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  | pagination defines the pagination in the response. |






<a name="cosmwasm.wasm.v1.QueryContractHistoryRequest"></a>

### QueryContractHistoryRequest
QueryContractHistoryRequest is the request type for the Query/ContractHistory
RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the address of the contract to query |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  | pagination defines an optional pagination for the request. |






<a name="cosmwasm.wasm.v1.QueryContractHistoryResponse"></a>

### QueryContractHistoryResponse
QueryContractHistoryResponse is the response type for the
Query/ContractHistory RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `entries` | [ContractCodeHistoryEntry](#cosmwasm.wasm.v1.ContractCodeHistoryEntry) | repeated |  |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  | pagination defines the pagination in the response. |






<a name="cosmwasm.wasm.v1.QueryContractInfoRequest"></a>

### QueryContractInfoRequest
QueryContractInfoRequest is the request type for the Query/ContractInfo RPC
method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the address of the contract to query |






<a name="cosmwasm.wasm.v1.QueryContractInfoResponse"></a>

### QueryContractInfoResponse
QueryContractInfoResponse is the response type for the Query/ContractInfo RPC
method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the address of the contract |
| `contract_info` | [ContractInfo](#cosmwasm.wasm.v1.ContractInfo) |  |  |






<a name="cosmwasm.wasm.v1.QueryContractsByCodeRequest"></a>

### QueryContractsByCodeRequest
QueryContractsByCodeRequest is the request type for the Query/ContractsByCode
RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_id` | [uint64](#uint64) |  | grpc-gateway_out does not support Go style CodID |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  | pagination defines an optional pagination for the request. |






<a name="cosmwasm.wasm.v1.QueryContractsByCodeResponse"></a>

### QueryContractsByCodeResponse
QueryContractsByCodeResponse is the response type for the
Query/ContractsByCode RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `contracts` | [string](#string) | repeated | contracts are a set of contract addresses |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  | pagination defines the pagination in the response. |






<a name="cosmwasm.wasm.v1.QueryPinnedCodesRequest"></a>

### QueryPinnedCodesRequest
QueryPinnedCodesRequest is the request type for the Query/PinnedCodes
RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  | pagination defines an optional pagination for the request. |






<a name="cosmwasm.wasm.v1.QueryPinnedCodesResponse"></a>

### QueryPinnedCodesResponse
QueryPinnedCodesResponse is the response type for the
Query/PinnedCodes RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `code_ids` | [uint64](#uint64) | repeated |  |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  | pagination defines the pagination in the response. |






<a name="cosmwasm.wasm.v1.QueryRawContractStateRequest"></a>

### QueryRawContractStateRequest
QueryRawContractStateRequest is the request type for the
Query/RawContractState RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the address of the contract |
| `query_data` | [bytes](#bytes) |  |  |






<a name="cosmwasm.wasm.v1.QueryRawContractStateResponse"></a>

### QueryRawContractStateResponse
QueryRawContractStateResponse is the response type for the
Query/RawContractState RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `data` | [bytes](#bytes) |  | Data contains the raw store data |






<a name="cosmwasm.wasm.v1.QuerySmartContractStateRequest"></a>

### QuerySmartContractStateRequest
QuerySmartContractStateRequest is the request type for the
Query/SmartContractState RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `address` | [string](#string) |  | address is the address of the contract |
| `query_data` | [bytes](#bytes) |  | QueryData contains the query data passed to the contract |






<a name="cosmwasm.wasm.v1.QuerySmartContractStateResponse"></a>

### QuerySmartContractStateResponse
QuerySmartContractStateResponse is the response type for the
Query/SmartContractState RPC method


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `data` | [bytes](#bytes) |  | Data contains the json data returned from the smart contract |





 <!-- end messages -->

 <!-- end enums -->

 <!-- end HasExtensions -->


<a name="cosmwasm.wasm.v1.Query"></a>

### Query
Query provides defines the gRPC querier service

| Method Name | Request Type | Response Type | Description | HTTP Verb | Endpoint |
| ----------- | ------------ | ------------- | ------------| ------- | -------- |
| `ContractInfo` | [QueryContractInfoRequest](#cosmwasm.wasm.v1.QueryContractInfoRequest) | [QueryContractInfoResponse](#cosmwasm.wasm.v1.QueryContractInfoResponse) | ContractInfo gets the contract meta data | GET|/cosmwasm/wasm/v1/contract/{address}|
| `ContractHistory` | [QueryContractHistoryRequest](#cosmwasm.wasm.v1.QueryContractHistoryRequest) | [QueryContractHistoryResponse](#cosmwasm.wasm.v1.QueryContractHistoryResponse) | ContractHistory gets the contract code history | GET|/cosmwasm/wasm/v1/contract/{address}/history|
| `ContractsByCode` | [QueryContractsByCodeRequest](#cosmwasm.wasm.v1.QueryContractsByCodeRequest) | [QueryContractsByCodeResponse](#cosmwasm.wasm.v1.QueryContractsByCodeResponse) | ContractsByCode lists all smart contracts for a code id | GET|/cosmwasm/wasm/v1/code/{code_id}/contracts|
| `AllContractState` | [QueryAllContractStateRequest](#cosmwasm.wasm.v1.QueryAllContractStateRequest) | [QueryAllContractStateResponse](#cosmwasm.wasm.v1.QueryAllContractStateResponse) | AllContractState gets all raw store data for a single contract | GET|/cosmwasm/wasm/v1/contract/{address}/state|
| `RawContractState` | [QueryRawContractStateRequest](#cosmwasm.wasm.v1.QueryRawContractStateRequest) | [QueryRawContractStateResponse](#cosmwasm.wasm.v1.QueryRawContractStateResponse) | RawContractState gets single key from the raw store data of a contract | GET|/cosmwasm/wasm/v1/contract/{address}/raw/{query_data}|
| `SmartContractState` | [QuerySmartContractStateRequest](#cosmwasm.wasm.v1.QuerySmartContractStateRequest) | [QuerySmartContractStateResponse](#cosmwasm.wasm.v1.QuerySmartContractStateResponse) | SmartContractState get smart query result from the contract | GET|/cosmwasm/wasm/v1/contract/{address}/smart/{query_data}|
| `Code` | [QueryCodeRequest](#cosmwasm.wasm.v1.QueryCodeRequest) | [QueryCodeResponse](#cosmwasm.wasm.v1.QueryCodeResponse) | Code gets the binary code and metadata for a singe wasm code | GET|/cosmwasm/wasm/v1/code/{code_id}|
| `Codes` | [QueryCodesRequest](#cosmwasm.wasm.v1.QueryCodesRequest) | [QueryCodesResponse](#cosmwasm.wasm.v1.QueryCodesResponse) | Codes gets the metadata for all stored wasm codes | GET|/cosmwasm/wasm/v1/code|
| `PinnedCodes` | [QueryPinnedCodesRequest](#cosmwasm.wasm.v1.QueryPinnedCodesRequest) | [QueryPinnedCodesResponse](#cosmwasm.wasm.v1.QueryPinnedCodesResponse) | PinnedCodes gets the pinned code ids | GET|/cosmwasm/wasm/v1/codes/pinned|

 <!-- end services -->



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






<a name="ethermint.evm.v1.TransactionLogs"></a>

### TransactionLogs
TransactionLogs define the logs generated from a transaction execution
with a given hash. It it used for import/export data as transactions are not
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
Its main difference between with Geth's GenesisAccount is that it uses a
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
DynamicFeeTx is the data of EIP-1559 dinamic fee transactions.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `chain_id` | [string](#string) |  | destination EVM chain ID |
| `nonce` | [uint64](#uint64) |  | nonce corresponds to the account nonce (transaction sequence). |
| `gas_tip_cap` | [string](#string) |  | gas tip cap defines the max value for the gas tip |
| `gas_fee_cap` | [string](#string) |  | gas fee cap defines the max value for the gas fee |
| `gas` | [uint64](#uint64) |  | gas defines the gas limit defined for the transaction. |
| `to` | [string](#string) |  | hex formatted address of the recipient |
| `value` | [string](#string) |  | value defines the the transaction amount. |
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






<a name="ethermint.evm.v1.EthCallRequest"></a>

### EthCallRequest
EthCallRequest defines EthCall request


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `args` | [bytes](#bytes) |  | same json format as the json rpc api. |
| `gas_cap` | [uint64](#uint64) |  | the default gas cap to be used |






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
| `account_number` | [uint64](#uint64) |  | account_number is the account numbert |






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



<a name="fusionchain/identity/genesis.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/genesis.proto



<a name="fusionchain.identity.GenesisState"></a>

### GenesisState
GenesisState defines the identity module's genesis state.


| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `params` | [Params](#fusionchain.identity.Params) |  |  |





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
| `id` | [uint64](#uint64) |  |  |
| `creator` | [string](#string) |  |  |
| `owners` | [string](#string) | repeated |  |





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
| `WorkspacesByOwner` | [QueryWorkspacesByOwnerRequest](#fusionchain.identity.QueryWorkspacesByOwnerRequest) | [QueryWorkspacesResponse](#fusionchain.identity.QueryWorkspacesResponse) | Queries a list of Workspaces that has the specified owner. | GET|/qrdochain/fusionchain/identity/workspaces_by_owner|
| `Actions` | [QueryActionsRequest](#fusionchain.identity.QueryActionsRequest) | [QueryActionsResponse](#fusionchain.identity.QueryActionsResponse) | Queries a list of Actions items. | GET|/fusionchain/identity/actions|

 <!-- end services -->



<a name="fusionchain/identity/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/identity/tx.proto



<a name="fusionchain.identity.MsgAddWorkspaceOwner"></a>

### MsgAddWorkspaceOwner



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `workspace_id` | [uint64](#uint64) |  |  |
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
| `workspace_id` | [uint64](#uint64) |  |  |
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
| `workspace_id` | [uint64](#uint64) |  |  |
| `type` | [KeyType](#fusionchain.treasury.KeyType) |  |  |
| `public_key` | [bytes](#bytes) |  |  |






<a name="fusionchain.treasury.KeyRequest"></a>

### KeyRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `id` | [uint64](#uint64) |  |  |
| `creator` | [string](#string) |  |  |
| `workspace_id` | [uint64](#uint64) |  |  |
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
| WALLET_TYPE_UNSPECIFIED | 0 | The wallet type is missing. |
| WALLET_TYPE_FUSION | 1 | The wallet type for native fusion chain accounts. |
| WALLET_TYPE_ETHEREUM | 2 | The wallet type is ethereum. |


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
| `status` | [KeyRequestStatus](#fusionchain.treasury.KeyRequestStatus) | optional |  |






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
| `workspace_id` | [uint64](#uint64) | optional |  |






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
| `status` | [SignRequestStatus](#fusionchain.treasury.SignRequestStatus) | optional |  |






<a name="fusionchain.treasury.QuerySignatureRequestsResponse"></a>

### QuerySignatureRequestsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `sign_requests` | [SignRequest](#fusionchain.treasury.SignRequest) | repeated |  |






<a name="fusionchain.treasury.QueryWalletsRequest"></a>

### QueryWalletsRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageRequest](#cosmos.base.query.v1beta1.PageRequest) |  |  |






<a name="fusionchain.treasury.QueryWalletsResponse"></a>

### QueryWalletsResponse



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `pagination` | [cosmos.base.query.v1beta1.PageResponse](#cosmos.base.query.v1beta1.PageResponse) |  |  |
| `wallets` | [WalletResponse](#fusionchain.treasury.WalletResponse) | repeated |  |






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
| `Params` | [QueryParamsRequest](#fusionchain.treasury.QueryParamsRequest) | [QueryParamsResponse](#fusionchain.treasury.QueryParamsResponse) | Parameters queries the parameters of the module. | GET|/qrdochain/fusionchain/treasury/params|
| `KeyRequests` | [QueryKeyRequestsRequest](#fusionchain.treasury.QueryKeyRequestsRequest) | [QueryKeyRequestsResponse](#fusionchain.treasury.QueryKeyRequestsResponse) | Queries a list of KeyRequests items. | GET|/qrdochain/fusionchain/treasury/key_requests|
| `KeyRequestById` | [QueryKeyRequestByIdRequest](#fusionchain.treasury.QueryKeyRequestByIdRequest) | [QueryKeyRequestByIdResponse](#fusionchain.treasury.QueryKeyRequestByIdResponse) | Queries a single KeyRequest by its id. | GET|/qrdochain/fusionchain/treasury/key_request_by_id|
| `Keys` | [QueryKeysRequest](#fusionchain.treasury.QueryKeysRequest) | [QueryKeysResponse](#fusionchain.treasury.QueryKeysResponse) | Queries a list of Keys items. | GET|/qrdochain/fusionchain/treasury/keys|
| `SignatureRequests` | [QuerySignatureRequestsRequest](#fusionchain.treasury.QuerySignatureRequestsRequest) | [QuerySignatureRequestsResponse](#fusionchain.treasury.QuerySignatureRequestsResponse) | Queries a list of SignatureRequests items. | GET|/fusionchain/treasury/get_signature_requests|
| `SignatureRequestById` | [QuerySignatureRequestByIdRequest](#fusionchain.treasury.QuerySignatureRequestByIdRequest) | [QuerySignatureRequestByIdResponse](#fusionchain.treasury.QuerySignatureRequestByIdResponse) | Queries a single SignatureRequest by its id. | GET|/qrdochain/fusionchain/treasury/signature_request_by_id|
| `Wallets` | [QueryWalletsRequest](#fusionchain.treasury.QueryWalletsRequest) | [QueryWalletsResponse](#fusionchain.treasury.QueryWalletsResponse) | Queries a list of Wallet items. | GET|/qrdochain/fusionchain/treasury/wallets|

 <!-- end services -->



<a name="fusionchain/treasury/tx.proto"></a>
<p align="right"><a href="#top">Top</a></p>

## fusionchain/treasury/tx.proto



<a name="fusionchain.treasury.MsgFulfillSignatureRequest"></a>

### MsgFulfillSignatureRequest



| Field | Type | Label | Description |
| ----- | ---- | ----- | ----------- |
| `creator` | [string](#string) |  |  |
| `request_id` | [uint64](#uint64) |  |  |
| `status` | [SignRequestStatus](#fusionchain.treasury.SignRequestStatus) |  |  |
| `payload` | [MsgSignedData](#fusionchain.treasury.MsgSignedData) |  |  |
| `reject_reason` | [string](#string) |  |  |






<a name="fusionchain.treasury.MsgFulfillSignatureRequestResponse"></a>

### MsgFulfillSignatureRequestResponse







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
| `workspace_id` | [uint64](#uint64) |  |  |
| `key_type` | [KeyType](#fusionchain.treasury.KeyType) |  |  |






<a name="fusionchain.treasury.MsgNewKeyRequestResponse"></a>

### MsgNewKeyRequestResponse



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
| `FulfillSignatureRequest` | [MsgFulfillSignatureRequest](#fusionchain.treasury.MsgFulfillSignatureRequest) | [MsgFulfillSignatureRequestResponse](#fusionchain.treasury.MsgFulfillSignatureRequestResponse) | Fulfill a signature request | |
| `NewWalletRequest` | [MsgNewWalletRequest](#fusionchain.treasury.MsgNewWalletRequest) | [MsgNewWalletRequestResponse](#fusionchain.treasury.MsgNewWalletRequestResponse) | Request a new wallet | |

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

