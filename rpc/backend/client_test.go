package backend

import (
	"testing"

	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/ethereum/go-ethereum/common"
	"github.com/evmos/ethermint/rpc/backend/mocks"
	rpc "github.com/evmos/ethermint/rpc/types"
	mock "github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
	tmrpcclient "github.com/tendermint/tendermint/rpc/client"
	tmrpctypes "github.com/tendermint/tendermint/rpc/core/types"
	"github.com/tendermint/tendermint/types"
)

// Client defines a mocked object that implements the Tendermint JSON-RPC Client
// interface. It allows for performing Client queries without having to run a
// Tendermint RPC Client server.
//
// To use a mock method it has to be registered in a given test.
var _ tmrpcclient.Client = &mocks.Client{}

// Block
func RegisterBlock(
	client *mocks.Client,
	height int64,
	tx []byte,
) (*tmrpctypes.ResultBlock, error) {
	// without tx
	if tx == nil {
		emptyBlock := types.MakeBlock(height, []types.Tx{}, nil, nil)
		resBlock := &tmrpctypes.ResultBlock{Block: emptyBlock}
		client.On("Block", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
			Return(resBlock, nil)
		return resBlock, nil
	}

	// with tx
	block := types.MakeBlock(height, []types.Tx{tx}, nil, nil)
	res := &tmrpctypes.ResultBlock{Block: block}
	client.On("Block", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
		Return(res, nil)
	return res, nil
}

// Block returns error
func RegisterBlockError(client *mocks.Client, height int64) {
	client.On("Block", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
		Return(nil, sdkerrors.ErrInvalidRequest)
}

// Block not found
func RegisterBlockNotFound(
	client *mocks.Client,
	height int64,
) (*tmrpctypes.ResultBlock, error) {
	client.On("Block", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
		Return(&tmrpctypes.ResultBlock{Block: nil}, nil)

	return &tmrpctypes.ResultBlock{Block: nil}, nil
}

func TestRegisterBlock(t *testing.T) {
	client := mocks.NewClient(t)
	height := rpc.BlockNumber(1).Int64()
	RegisterBlock(client, height, nil)

	res, err := client.Block(rpc.ContextWithHeight(height), &height)

	emptyBlock := types.MakeBlock(height, []types.Tx{}, nil, nil)
	resBlock := &tmrpctypes.ResultBlock{Block: emptyBlock}
	require.Equal(t, resBlock, res)
	require.NoError(t, err)
}

// ConsensusParams
func RegisterConsensusParams(client *mocks.Client, height int64) {
	consensusParams := types.DefaultConsensusParams()
	client.On("ConsensusParams", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
		Return(&tmrpctypes.ResultConsensusParams{ConsensusParams: *consensusParams}, nil)
}

func RegisterConsensusParamsError(client *mocks.Client, height int64) {
	client.On("ConsensusParams", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
		Return(nil, sdkerrors.ErrInvalidRequest)
}

func TestRegisterConsensusParams(t *testing.T) {
	client := mocks.NewClient(t)
	height := int64(1)
	RegisterConsensusParams(client, height)

	res, err := client.ConsensusParams(rpc.ContextWithHeight(height), &height)
	consensusParams := types.DefaultConsensusParams()
	require.Equal(t, &tmrpctypes.ResultConsensusParams{ConsensusParams: *consensusParams}, res)
	require.NoError(t, err)
}

// BlockResults
func RegisterBlockResults(
	client *mocks.Client,
	height int64,
) (*tmrpctypes.ResultBlockResults, error) {
	res := &tmrpctypes.ResultBlockResults{
		Height:     height,
		TxsResults: []*abci.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
	}

	client.On("BlockResults", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
		Return(res, nil)
	return res, nil
}

func RegisterBlockResultsError(client *mocks.Client, height int64) {
	client.On("BlockResults", rpc.ContextWithHeight(height), mock.AnythingOfType("*int64")).
		Return(nil, sdkerrors.ErrInvalidRequest)
}

func TestRegisterBlockResults(t *testing.T) {
	client := mocks.NewClient(t)
	height := int64(1)
	RegisterBlockResults(client, height)

	res, err := client.BlockResults(rpc.ContextWithHeight(height), &height)
	expRes := &tmrpctypes.ResultBlockResults{
		Height:     height,
		TxsResults: []*abci.ResponseDeliverTx{{Code: 0, GasUsed: 0}},
	}
	require.Equal(t, expRes, res)
	require.NoError(t, err)
}

// BlockByHash
func RegisterBlockByHash(
	client *mocks.Client,
	hash common.Hash,
	tx []byte,
) (*tmrpctypes.ResultBlock, error) {
	block := types.MakeBlock(1, []types.Tx{tx}, nil, nil)
	resBlock := &tmrpctypes.ResultBlock{Block: block}

	client.On("BlockByHash", rpc.ContextWithHeight(1), []byte{0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0}).
		Return(resBlock, nil)
	return resBlock, nil
}
