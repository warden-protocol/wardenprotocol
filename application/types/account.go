package types

import (
	"bytes"

	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)

var (
	_ authtypes.AccountI                 = (*EthAccount)(nil)
	_ EthAccountI                        = (*EthAccount)(nil)
	_ authtypes.GenesisAccount           = (*EthAccount)(nil)
	_ codectypes.UnpackInterfacesMessage = (*EthAccount)(nil)
)

var emptyCodeHash = crypto.Keccak256(nil)

const (
	// AccountTypeEOA defines the type for externally owned accounts (EOAs)
	AccountTypeEOA = int8(iota + 1)
	// AccountTypeContract defines the type for contract accounts
	AccountTypeContract
)

// EthAccountI represents the interface of an EVM compatible account
type EthAccountI interface {
	authtypes.AccountI
	// EthAddress returns the ethereum Address representation of the AccAddress
	EthAddress() common.Address
	// CodeHash is the keccak256 hash of the contract code (if any)
	GetCodeHash() common.Hash
	// SetCodeHash sets the code hash to the account fields
	SetCodeHash(code common.Hash) error
	// Type returns the type of Ethereum Account (EOA or Contract)
	Type() int8
}

// ----------------------------------------------------------------------------
// Main Ethermint account
// ----------------------------------------------------------------------------

// ProtoAccount defines the prototype function for BaseAccount used for an
// AccountKeeper.
func ProtoAccount() authtypes.AccountI {
	return &EthAccount{
		BaseAccount: &authtypes.BaseAccount{},
		CodeHash:    common.BytesToHash(emptyCodeHash).String(),
	}
}

// GetBaseAccount returns base account.
func (acc EthAccount) GetBaseAccount() *authtypes.BaseAccount {
	return acc.BaseAccount
}

// EthAddress returns the account address ethereum format.
func (acc EthAccount) EthAddress() common.Address {
	return common.BytesToAddress(acc.GetAddress().Bytes())
}

// GetCodeHash returns the account code hash in byte format
func (acc EthAccount) GetCodeHash() common.Hash {
	return common.HexToHash(acc.CodeHash)
}

// SetCodeHash sets the account code hash to the EthAccount fields
func (acc *EthAccount) SetCodeHash(codeHash common.Hash) error {
	acc.CodeHash = codeHash.Hex()
	return nil
}

// Type returns the type of Ethereum Account (EOA or Contract)
func (acc EthAccount) Type() int8 {
	if bytes.Equal(emptyCodeHash, common.HexToHash(acc.CodeHash).Bytes()) {
		return AccountTypeEOA
	}
	return AccountTypeContract
}
