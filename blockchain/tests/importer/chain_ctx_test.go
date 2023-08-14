package importer

// NOTE: A bulk of these unit tests will change and evolve as the context and
// implementation of ChainConext evolves.

import (
	"math/big"
	"testing"

	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common"
	ethcons "github.com/ethereum/go-ethereum/consensus"
	ethcore "github.com/ethereum/go-ethereum/core"
	ethtypes "github.com/ethereum/go-ethereum/core/types"
)

func TestChainContextInterface(t *testing.T) {
	require.Implements(t, (*ethcore.ChainContext)(nil), new(ChainContext))
	require.Implements(t, (*ethcons.Engine)(nil), new(ChainContext))
}

func TestNewChainContext(t *testing.T) {
	cc := NewChainContext()
	require.NotNil(t, cc.headersByNumber)
}

func TestChainContextEngine(t *testing.T) {
	cc := NewChainContext()
	require.Equal(t, cc, cc.Engine())
}

func TestChainContextSetHeader(t *testing.T) {
	cc := NewChainContext()
	header := &ethtypes.Header{
		Number: big.NewInt(64),
	}

	cc.SetHeader(uint64(header.Number.Int64()), header)
	require.Equal(t, header, cc.headersByNumber[uint64(header.Number.Int64())])
}

func TestChainContextGetHeader(t *testing.T) {
	cc := NewChainContext()
	header := &ethtypes.Header{
		Number: big.NewInt(64),
	}

	cc.SetHeader(uint64(header.Number.Int64()), header)
	require.Equal(t, header, cc.GetHeader(common.Hash{}, uint64(header.Number.Int64())))
	require.Nil(t, cc.GetHeader(common.Hash{}, 0))
}

func TestChainContextAuthor(t *testing.T) {
	cc := NewChainContext()

	cb, err := cc.Author(nil)
	require.Nil(t, err)
	require.Equal(t, cc.Coinbase, cb)
}

func TestChainContextAPIs(t *testing.T) {
	cc := NewChainContext()
	require.Nil(t, cc.APIs(nil))
}

func TestChainContextCalcDifficulty(t *testing.T) {
	cc := NewChainContext()
	require.Nil(t, cc.CalcDifficulty(nil, 0, nil))
}

func TestChainContextFinalize(t *testing.T) {
	cc := NewChainContext()

	cc.Finalize(nil, nil, nil, nil, nil)
}

func TestChainContextPrepare(t *testing.T) {
	cc := NewChainContext()

	err := cc.Prepare(nil, nil)
	require.Nil(t, err)
}

func TestChainContextSeal(t *testing.T) {
	cc := NewChainContext()

	err := cc.Seal(nil, nil, nil, nil)
	require.Nil(t, err)
}

func TestChainContextVerifyHeader(t *testing.T) {
	cc := NewChainContext()

	err := cc.VerifyHeader(nil, nil, false)
	require.Nil(t, err)
}

func TestChainContextVerifyHeaders(t *testing.T) {
	cc := NewChainContext()

	ch, err := cc.VerifyHeaders(nil, nil, []bool{false})
	require.Nil(t, err)
	require.Nil(t, ch)
}

func TestChainContextVerifySeal(t *testing.T) {
	cc := NewChainContext()

	err := cc.VerifySeal(nil, nil)
	require.Nil(t, err)
}

func TestChainContextVerifyUncles(t *testing.T) {
	cc := NewChainContext()

	err := cc.VerifyUncles(nil, nil)
	require.Nil(t, err)
}
