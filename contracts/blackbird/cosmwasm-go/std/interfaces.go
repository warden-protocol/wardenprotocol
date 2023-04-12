package std

import (
	"errors"

	"github.com/CosmWasm/cosmwasm-go/std/types"
)

// Deps contains the dependencies passed to a contract's mutating entrypoints.
type Deps struct {
	// Storage provides access to the data persistence layer at write and read level.
	Storage Storage
	// Api provides access to common utilities such as address
	// parsing and verification.
	Api Api
	// Querier is used to query information from other contracts.
	Querier Querier
}

// Order defines how keys are ordered during iteration.
type Order uint32

const (
	// Ascending orders ranged keys from smallest to biggest.
	Ascending Order = 1
	// Descending orders ranged keys from biggest to smallest.
	Descending Order = 2
)

// ReadonlyStorage defines the behaviour of a KV with only read capabilities.
type ReadonlyStorage interface {
	// Get gets the value of the provided key. If value is nil then the key does not exist.
	Get(key []byte) (value []byte)
	// Range ranges from start to end byte prefixes with the provided Order flag.
	Range(start, end []byte, order Order) (iterator Iterator)
}

// Storage defines the behaviour of a KV with read and write capabilities.
type Storage interface {
	ReadonlyStorage

	// Set sets the key and value.
	Set(key, value []byte)
	// Remove removes the value from the db.
	Remove(key []byte)
}

// This is a special, placeholder to signal iteration is finished
var ErrIteratorDone = errors.New("iterator is done")

type Iterator interface {
	Next() (key, value []byte, err error)
}

// Secp256k1RecoveryParam is used by the RecoverSecp256k1PubKey and indicates whether or not the y-coordinate of the original VerifyingKey is odd.
type Secp256k1RecoveryParam uint8

const (
	Secp256k1RecoveryParamYCoordIsOdd  Secp256k1RecoveryParam = 0
	Secp256k1RecoveryParamYCoordNotOdd Secp256k1RecoveryParam = 1
)

type Api interface {
	// CanonicalAddress converts the human-readable address to a canonical representation.
	CanonicalAddress(human types.HumanAddress) (types.CanonicalAddress, error)

	// HumanAddress converts the canonical address to a human-readable representation.
	HumanAddress(canonical types.CanonicalAddress) (types.HumanAddress, error)

	// ValidateAddress validates the human-readable address performing CanonicalAddress and HumanAddress conversions.
	ValidateAddress(human types.HumanAddress) error

	// Debug sends the debug log message to the host which can either process or ignore it.
	Debug(msg string)

	// VerifySecp256k1Signature verifies the given message hash against the signature with the public key, using the secp256k1 ECDSA parametrization.
	// Returns true if the signature is valid, false otherwise.
	VerifySecp256k1Signature(hash, signature, publicKey []byte) (bool, error)

	// RecoverSecp256k1PubKey recovers a public key from the message hash agains the signature, using the secp256k1 ECDSA parametrization and recovery param (0/1).
	RecoverSecp256k1PubKey(hash, signature []byte, recoveryParam Secp256k1RecoveryParam) ([]byte, error)

	// VerifyEd25519Signature verifies the given message against the signature with the public key, using the ed25519 parametrization.
	// Returns true if the signature is valid, false otherwise.
	VerifyEd25519Signature(message, signature, publicKey []byte) (bool, error)

	// VerifyEd25519Signatures verifies given messages against signatures with the public keys, using the ed25519 parametrization.
	// Returns true if all signature are valid, false otherwise.
	VerifyEd25519Signatures(messages, signatures, publicKeys [][]byte) (bool, error)
}

type Querier interface {
	RawQuery(request []byte) ([]byte, error)
}

type QuerierWrapper struct {
	Querier
}

type JSONType interface {
	MarshalJSON() ([]byte, error)
	UnmarshalJSON([]byte) error
}

func (q QuerierWrapper) Query(query types.ToQuery, result JSONType) error {
	binQuery, err := query.ToQuery().MarshalJSON()
	if err != nil {
		return err
	}
	data, err := q.Querier.RawQuery(binQuery)
	if err != nil {
		return err
	}
	return result.UnmarshalJSON(data)
}

func (q QuerierWrapper) QueryAllBalances(addr string) ([]types.Coin, error) {
	query := types.AllBalancesQuery{
		Address: addr,
	}
	qres := types.AllBalancesResponse{}
	err := q.Query(query, &qres)
	if err != nil {
		return nil, err
	}
	return qres.Amount, nil
}

func (q QuerierWrapper) QueryBalance(addr string, denom string) (types.Coin, error) {
	query := types.BalanceQuery{
		Address: addr,
		Denom:   denom,
	}
	qres := types.BalanceResponse{}
	err := q.Query(query, &qres)
	return qres.Amount, err
}

func (q QuerierWrapper) QuerySmart(addr string, msg JSONType, resp JSONType) error {
	bin, err := msg.MarshalJSON()
	if err != nil {
		return err
	}
	query := types.SmartQuery{
		ContractAddr: addr,
		Msg:          bin,
	}
	err = q.Query(query, resp)
	return err
}

func (q QuerierWrapper) QueryRaw(addr string, key []byte, resp JSONType) error {
	query := types.RawQuery{
		ContractAddr: addr,
		Key:          key,
	}
	err := q.Query(query, resp)
	return err
}

func (q QuerierWrapper) QueryContractInfo(addr string) (*types.ContractInfo, error) {
	query := types.ContractInfoQuery{
		ContractAddr: addr,
	}
	qres := new(types.ContractInfo)
	err := q.Query(query, qres)
	return qres, err
}
