package mock

import (
	"crypto/ed25519"
	"errors"
	"fmt"
	"math/big"

	"github.com/CosmWasm/cosmwasm-go/std/math"

	dbm "github.com/tendermint/tm-db"

	"github.com/CosmWasm/cosmwasm-go/std"
	"github.com/CosmWasm/cosmwasm-go/std/types"

	secp256k1 "github.com/btcsuite/btcd/btcec"
	ed25519Consensus "github.com/hdevalence/ed25519consensus"
)

const (
	// ContractAddress is the default contract address returned by Env.
	ContractAddress = "test-contract"
	// BlockHeight is the default height returned by Env.
	BlockHeight = 12_345
	// BlockTime is the default block time returned by Env.
	BlockTime = 1_571_797_419_404_808_777
	// ChainID is the default chain ID returned by Env.
	ChainID = "cosmos-testnet-14002"
)

const (
	canonicalAddressLength = 32
)

var (
	_ std.Iterator        = (*iterator)(nil)
	_ std.ReadonlyStorage = (*storage)(nil)
	_ std.Storage         = (*storage)(nil)
	_ std.Querier         = (*querier)(nil)
	_ std.Api             = (*api)(nil)
)

// Deps returns mocked dependencies, funds can be provided optionally.
func Deps(funds []types.Coin) *std.Deps {
	return &std.Deps{
		Storage: Storage(),
		Api:     api{},
		Querier: Querier(funds),
	}
}

// Env returns mocked environment.
func Env() types.Env {
	return types.Env{
		Block: types.BlockInfo{
			Height:  BlockHeight,
			Time:    BlockTime,
			ChainID: ChainID,
		},
		Contract: types.ContractInfo{
			Address: ContractAddress,
		},
	}
}

// Info returns mocked message info, given a sender and the funds.
func Info(sender string, funds []types.Coin) types.MessageInfo {
	return types.MessageInfo{
		Sender: sender,
		Funds:  funds,
	}
}

// iterator mocks the std.Iterator.
type iterator struct {
	Iter dbm.Iterator
}

func newIterator(iter dbm.Iterator) iterator {
	return iterator{
		Iter: iter,
	}
}

func (i iterator) Next() (key, value []byte, err error) {
	if !i.Iter.Valid() {
		i.Iter.Close()
		return key, value, std.ErrIteratorDone
	}
	key, value = i.Iter.Key(), i.Iter.Value()
	i.Iter.Next()
	return
}

type storage struct {
	storage dbm.DB
}

func Storage() std.Storage {
	return &storage{
		storage: dbm.NewMemDB(),
	}
}

func (s *storage) Get(key []byte) []byte {
	v, err := s.storage.Get(key)
	if err != nil {
		// tm-db says that if the key is not found then the
		// value is nil, so we can panic here.
		panic(err)
	}

	return v
}

func (s *storage) Range(start, end []byte, order std.Order) (iter std.Iterator) {
	var (
		iterator dbm.Iterator
		err      error
	)

	switch order {
	case std.Ascending:
		iterator, err = s.storage.Iterator(start, end)
		iter = newIterator(iterator)
	case std.Descending:
		iterator, err = s.storage.ReverseIterator(start, end)
		iter = newIterator(iterator)
	default:
		err = errors.New("unexpected Order")
	}

	if err != nil {
		panic(err)
	}
	return
}

func (s *storage) Set(key, value []byte) {
	err := s.storage.Set(key, value)
	if err != nil {
		panic(err)
	}
}

func (s *storage) Remove(key []byte) {
	err := s.storage.Delete(key)
	if err != nil {
		panic(err)
	}
}

// API returns a mocked std.Api
func API() std.Api {
	return api{}
}

type api struct{}

func (a api) CanonicalAddress(human string) (types.CanonicalAddress, error) {
	if len(human) == 0 {
		return nil, errors.New("empty address")
	}
	if len(human) > canonicalAddressLength {
		return nil, errors.New("human encoding too long")
	}

	return []byte(human), nil
}

func (a api) HumanAddress(canonical types.CanonicalAddress) (string, error) {
	if len(canonical) != canonicalAddressLength {
		return "", errors.New("wrong canonical address length")
	}

	cutIndex := canonicalAddressLength
	for i, v := range canonical {
		if v == 0 {
			cutIndex = i
			break
		}
	}

	return string(canonical[:cutIndex]), nil
}

func (a api) ValidateAddress(human string) error {
	if len(human) > canonicalAddressLength {
		return errors.New("human encoding too long")
	}
	return nil
}

func (a api) Debug(msg string) {
	fmt.Println("DEBUG: " + msg)
}

func (a api) VerifySecp256k1Signature(hash, signature, publicKey []byte) (bool, error) {
	if len(hash) != 32 {
		return false, errors.New("invalid hash len (32 is expected)")
	}
	if len(signature) != 64 {
		return false, errors.New("invalid signature len (64 is expected)")
	}

	secpPubKey, err := secp256k1.ParsePubKey(publicKey, secp256k1.S256())
	if err != nil {
		return false, errors.New("parsing pubKey: " + err.Error())
	}

	secpSig := &secp256k1.Signature{
		R: new(big.Int).SetBytes(signature[:32]),
		S: new(big.Int).SetBytes(signature[32:64]),
	}

	return secpSig.Verify(hash, secpPubKey), nil
}

func (a api) RecoverSecp256k1PubKey(hash, signature []byte, recoveryParam std.Secp256k1RecoveryParam) ([]byte, error) {
	if len(hash) != 32 {
		return nil, errors.New("invalid hash len (32 is expected)")
	}
	if len(signature) != 64 {
		return nil, errors.New("invalid signature len (64 is expected)")
	}
	// TODO: add proper implementation (github.com/btcsuite/btcd/btcec analog gives different results than the CosmWasm's one)

	mockPubKey := make([]byte, 0, 65)
	for i := 0; i < cap(mockPubKey); i++ {
		mockPubKey = append(mockPubKey, byte(i))
	}

	return mockPubKey, nil
}

func (a api) VerifyEd25519Signature(message, signature, publicKey []byte) (bool, error) {
	if len(signature) != ed25519.SignatureSize {
		return false, errors.New("invalid signature len (64 is expected)")
	}
	if len(publicKey) != ed25519.PublicKeySize {
		return false, errors.New("invalid pubKey len (32 is expected)")
	}

	return ed25519Consensus.Verify(publicKey, message, signature), nil
}

func (a api) VerifyEd25519Signatures(messages, signatures, publicKeys [][]byte) (bool, error) {
	if len(messages) != len(signatures) || len(messages) != len(publicKeys) {
		return false, errors.New("batch lengths mismatch")
	}

	for i := 0; i < len(messages); i++ {
		ok, err := a.VerifyEd25519Signature(messages[i], signatures[i], publicKeys[i])
		if err != nil {
			return false, err
		}
		if !ok {
			return false, nil
		}
	}

	return true, nil
}

type querier struct {
	Balances map[string][]types.Coin
}

func Querier(funds []types.Coin) std.Querier {
	q := querier{
		Balances: make(map[string][]types.Coin),
	}
	if len(funds) > 0 {
		q.SetBalance(ContractAddress, funds)
	}
	return &q
}

func (q *querier) RawQuery(raw []byte) ([]byte, error) {
	var request types.QueryRequest
	err := request.UnmarshalJSON(raw)
	if err != nil {
		return nil, err
	}
	res, err := q.HandleQuery(request)
	if err != nil {
		return nil, err
	}
	return res.MarshalJSON()
}

func (q *querier) HandleQuery(request types.QueryRequest) (std.JSONType, error) {
	switch {
	case request.Bank != nil:
		return q.HandleBank(request.Bank)
	case request.Staking != nil:
		return nil, errors.New("staking queries not implemented")
	case request.Wasm != nil:
		return nil, errors.New("wasm queries not implemented")
	case request.Custom != nil:
		return nil, errors.New("custom queries not implemented")
	default:
		return nil, errors.New("unknown types.QueryRequest variant")
	}
}

func (q *querier) HandleBank(request *types.BankQuery) (std.JSONType, error) {
	switch {
	case request.Balance != nil:
		balances := q.GetBalance(request.Balance.Address)
		coin := types.Coin{Denom: request.Balance.Denom, Amount: math.ZeroUint128()}
		for _, c := range balances {
			if c.Denom == coin.Denom {
				coin.Amount = c.Amount
				break
			}
		}
		return &types.BalanceResponse{Amount: coin}, nil
	case request.AllBalances != nil:
		balances := q.GetBalance(request.AllBalances.Address)
		return &types.AllBalancesResponse{Amount: balances}, nil
	default:
		return nil, errors.New("unknown types.BankQuery variant")
	}
}

func (q *querier) SetBalance(addr string, balance []types.Coin) {
	// clone coins so we don't accidentally edit them
	var empty []types.Coin
	q.Balances[addr] = append(empty, balance...)
}

func (q *querier) GetBalance(addr string) []types.Coin {
	bal := q.Balances[addr]
	if len(bal) == 0 {
		return bal
	}
	// if not empty, clone data
	var empty []types.Coin
	return append(empty, bal...)
}
