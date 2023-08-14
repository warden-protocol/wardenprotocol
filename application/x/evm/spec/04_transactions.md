<!--
order: 4
-->

# Transactions

This section defines the `sdk.Msg` concrete types that result in the state transitions defined on the previous section.

## `MsgEthereumTx`

An EVM state transition can be achieved by using the `MsgEthereumTx`. This message encapsulates an Ethereum transaction data (`TxData`) as a `sdk.Msg`. It contains the necessary transaction data fields. Note, that the `MsgEthereumTx` implements both the [`sdk.Msg`](https://github.com/cosmos/cosmos-sdk/blob/v0.39.2/types/tx_msg.go#L7-L29) and [`sdk.Tx`](https://github.com/cosmos/cosmos-sdk/blob/v0.39.2/types/tx_msg.go#L33-L41) interfaces. Normally,  SDK messages only implement the former, while the latter is a group of messages bundled together.

```go
type MsgEthereumTx struct {
 // inner transaction data
 Data *types.Any `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
 // DEPRECATED: encoded storage size of the transaction
 Size_ float64 `protobuf:"fixed64,2,opt,name=size,proto3" json:"-"`
 // transaction hash in hex format
 Hash string `protobuf:"bytes,3,opt,name=hash,proto3" json:"hash,omitempty" rlp:"-"`
 // ethereum signer address in hex format. This address value is checked
 // against the address derived from the signature (V, R, S) using the
 // secp256k1 elliptic curve
 From string `protobuf:"bytes,4,opt,name=from,proto3" json:"from,omitempty"`
}
```

This message field validation is expected to fail if:

- `From` field is defined and the address is invalid
- `TxData` stateless validation fails

The transaction execution is expected to fail if:

- Any of the custom `AnteHandler` Ethereum decorators checks fail:
    - Minimum gas amount requirements for transaction
    - Tx sender account doesn't exist or hasn't enough balance for fees
    - Account sequence doesn't match the transaction `Data.AccountNonce`
    - Message signature verification fails
- EVM contract creation (i.e `evm.Create`) fails, or `evm.Call` fails

### Conversion

The `MsgEthreumTx` can be converted to the go-ethereum `Transaction` and `Message` types in order to create and call evm contracts.

```go
// AsTransaction creates an Ethereum Transaction type from the msg fields
func (msg MsgEthereumTx) AsTransaction() *ethtypes.Transaction {
 txData, err := UnpackTxData(msg.Data)
 if err != nil {
  return nil
 }

 return ethtypes.NewTx(txData.AsEthereumData())
}

// AsMessage returns the transaction as a core.Message.
func (tx *Transaction) AsMessage(s Signer, baseFee *big.Int) (Message, error) {
 msg := Message{
  nonce:      tx.Nonce(),
  gasLimit:   tx.Gas(),
  gasPrice:   new(big.Int).Set(tx.GasPrice()),
  gasFeeCap:  new(big.Int).Set(tx.GasFeeCap()),
  gasTipCap:  new(big.Int).Set(tx.GasTipCap()),
  to:         tx.To(),
  amount:     tx.Value(),
  data:       tx.Data(),
  accessList: tx.AccessList(),
  isFake:     false,
 }
 // If baseFee provided, set gasPrice to effectiveGasPrice.
 if baseFee != nil {
  msg.gasPrice = math.BigMin(msg.gasPrice.Add(msg.gasTipCap, baseFee), msg.gasFeeCap)
 }
 var err error
 msg.from, err = Sender(s, tx)
 return msg, err
}
```

### Signing

In order for the signature verification to be valid, the  `TxData` must contain the `v | r | s` values from the `Signer`. Sign calculates a secp256k1 ECDSA signature and signs the transaction. It takes a keyring signer and the chainID to sign an Ethereum transaction according to EIP155 standard. This method mutates the transaction as it populates the V, R, S fields of the Transaction's Signature. The function will fail if the sender address is not defined for the msg or if the sender is not registered on the keyring.

```go
// Sign calculates a secp256k1 ECDSA signature and signs the transaction. It
// takes a keyring signer and the chainID to sign an Ethereum transaction according to
// EIP155 standard.
// This method mutates the transaction as it populates the V, R, S
// fields of the Transaction's Signature.
// The function will fail if the sender address is not defined for the msg or if
// the sender is not registered on the keyring
func (msg *MsgEthereumTx) Sign(ethSigner ethtypes.Signer, keyringSigner keyring.Signer) error {
 from := msg.GetFrom()
 if from.Empty() {
  return fmt.Errorf("sender address not defined for message")
 }

 tx := msg.AsTransaction()
 txHash := ethSigner.Hash(tx)

 sig, _, err := keyringSigner.SignByAddress(from, txHash.Bytes())
 if err != nil {
  return err
 }

 tx, err = tx.WithSignature(ethSigner, sig)
 if err != nil {
  return err
 }

 msg.FromEthereumTx(tx)
 return nil
}
```

## TxData

The `MsgEthereumTx` supports the 3 valid Ethereum transaction data types from go-ethereum: `LegacyTx`, `AccessListTx`  and `DynamicFeeTx`. These types are defined as protobuf messages and packed into a `proto.Any` interface type in the `MsgEthereumTx` field.

- `LegacyTx`: [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md) transaction type
- `DynamicFeeTx`: [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) transaction type. Enabled by London hard fork block
- `AccessListTx`: [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) transaction type. Enabled by Berlin hard fork block

### `LegacyTx`

The transaction data of regular Ethereum transactions.

```go
type LegacyTx struct {
 // nonce corresponds to the account nonce (transaction sequence).
 Nonce uint64 `protobuf:"varint,1,opt,name=nonce,proto3" json:"nonce,omitempty"`
 // gas price defines the value for each gas unit
 GasPrice *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,2,opt,name=gas_price,json=gasPrice,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"gas_price,omitempty"`
 // gas defines the gas limit defined for the transaction.
 GasLimit uint64 `protobuf:"varint,3,opt,name=gas,proto3" json:"gas,omitempty"`
 // hex formatted address of the recipient
 To string `protobuf:"bytes,4,opt,name=to,proto3" json:"to,omitempty"`
 // value defines the unsigned integer value of the transaction amount.
 Amount *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,5,opt,name=value,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"value,omitempty"`
 // input defines the data payload bytes of the transaction.
 Data []byte `protobuf:"bytes,6,opt,name=data,proto3" json:"data,omitempty"`
 // v defines the signature value
 V []byte `protobuf:"bytes,7,opt,name=v,proto3" json:"v,omitempty"`
 // r defines the signature value
 R []byte `protobuf:"bytes,8,opt,name=r,proto3" json:"r,omitempty"`
 // s define the signature value
 S []byte `protobuf:"bytes,9,opt,name=s,proto3" json:"s,omitempty"`
}
```

This message field validation is expected to fail if:

- `GasPrice` is invalid (`nil` , negaitve or out of int256 bound)
- `Fee` (gasprice * gaslimit) is invalid
- `Amount` is invalid (negaitve or out of int256 bound)
- `To` address is invalid (non valid ethereum hex address)

### `DynamicFeeTx`

The transaction data of EIP-1559 dynamic fee transactions.

```go
type DynamicFeeTx struct {
 // destination EVM chain ID
 ChainID *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,1,opt,name=chain_id,json=chainId,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"chainID"`
 // nonce corresponds to the account nonce (transaction sequence).
 Nonce uint64 `protobuf:"varint,2,opt,name=nonce,proto3" json:"nonce,omitempty"`
 // gas tip cap defines the max value for the gas tip
 GasTipCap *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,3,opt,name=gas_tip_cap,json=gasTipCap,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"gas_tip_cap,omitempty"`
 // gas fee cap defines the max value for the gas fee
 GasFeeCap *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,4,opt,name=gas_fee_cap,json=gasFeeCap,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"gas_fee_cap,omitempty"`
 // gas defines the gas limit defined for the transaction.
 GasLimit uint64 `protobuf:"varint,5,opt,name=gas,proto3" json:"gas,omitempty"`
 // hex formatted address of the recipient
 To string `protobuf:"bytes,6,opt,name=to,proto3" json:"to,omitempty"`
 // value defines the the transaction amount.
 Amount *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,7,opt,name=value,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"value,omitempty"`
 // input defines the data payload bytes of the transaction.
 Data     []byte     `protobuf:"bytes,8,opt,name=data,proto3" json:"data,omitempty"`
 Accesses AccessList `protobuf:"bytes,9,rep,name=accesses,proto3,castrepeated=AccessList" json:"accessList"`
 // v defines the signature value
 V []byte `protobuf:"bytes,10,opt,name=v,proto3" json:"v,omitempty"`
 // r defines the signature value
 R []byte `protobuf:"bytes,11,opt,name=r,proto3" json:"r,omitempty"`
 // s define the signature value
 S []byte `protobuf:"bytes,12,opt,name=s,proto3" json:"s,omitempty"`
}
```

This message field validation is expected to fail if:

- `GasTipCap` is invalid (`nil` , negative or overflows int256)
- `GasFeeCap` is invalid (`nil` , negative or overflows int256)
- `GasFeeCap` is less than `GasTipCap`
- `Fee` (gas price * gas limit) is invalid (overflows int256)
- `Amount` is invalid (negative or overflows int256)
- `To` address is invalid (non-valid ethereum hex address)
- `ChainID` is `nil`

### `AccessListTx`

The transaction data of EIP-2930 access list transactions.

```go
type AccessListTx struct {
 // destination EVM chain ID
 ChainID *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,1,opt,name=chain_id,json=chainId,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"chainID"`
 // nonce corresponds to the account nonce (transaction sequence).
 Nonce uint64 `protobuf:"varint,2,opt,name=nonce,proto3" json:"nonce,omitempty"`
 // gas price defines the value for each gas unit
 GasPrice *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,3,opt,name=gas_price,json=gasPrice,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"gas_price,omitempty"`
 // gas defines the gas limit defined for the transaction.
 GasLimit uint64 `protobuf:"varint,4,opt,name=gas,proto3" json:"gas,omitempty"`
 // hex formatted address of the recipient
 To string `protobuf:"bytes,5,opt,name=to,proto3" json:"to,omitempty"`
 // value defines the unsigned integer value of the transaction amount.
 Amount *github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,6,opt,name=value,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"value,omitempty"`
 // input defines the data payload bytes of the transaction.
 Data     []byte     `protobuf:"bytes,7,opt,name=data,proto3" json:"data,omitempty"`
 Accesses AccessList `protobuf:"bytes,8,rep,name=accesses,proto3,castrepeated=AccessList" json:"accessList"`
 // v defines the signature value
 V []byte `protobuf:"bytes,9,opt,name=v,proto3" json:"v,omitempty"`
 // r defines the signature value
 R []byte `protobuf:"bytes,10,opt,name=r,proto3" json:"r,omitempty"`
 // s define the signature value
 S []byte `protobuf:"bytes,11,opt,name=s,proto3" json:"s,omitempty"`
}
```

This message field validation is expected to fail if:

- `GasPrice` is invalid (`nil` , negative or overflows int256)
- `Fee` (gas price * gas limit) is invalid (overflows int256)
- `Amount` is invalid (negative or overflows int256)
- `To` address is invalid (non-valid ethereum hex address)
- `ChainID` is `nil`
