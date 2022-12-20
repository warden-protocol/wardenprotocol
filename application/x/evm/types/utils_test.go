package types_test

import (
	"errors"
	"math/big"
	"testing"

	"github.com/cosmos/cosmos-sdk/client"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	"github.com/evmos/ethermint/app"
	"github.com/evmos/ethermint/encoding"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	proto "github.com/gogo/protobuf/proto"

	"github.com/stretchr/testify/require"

	"github.com/ethereum/go-ethereum/common"
)

func TestEvmDataEncoding(t *testing.T) {
	ret := []byte{0x5, 0x8}

	data := &evmtypes.MsgEthereumTxResponse{
		Hash: common.BytesToHash([]byte("hash")).String(),
		Logs: []*evmtypes.Log{{
			Data:        []byte{1, 2, 3, 4},
			BlockNumber: 17,
		}},
		Ret: ret,
	}

	enc, err := proto.Marshal(data)
	require.NoError(t, err)

	txData := &sdk.TxMsgData{
		Data: []*sdk.MsgData{{MsgType: evmtypes.TypeMsgEthereumTx, Data: enc}},
	}

	txDataBz, err := proto.Marshal(txData)
	require.NoError(t, err)

	res, err := evmtypes.DecodeTxResponse(txDataBz)
	require.NoError(t, err)
	require.NotNil(t, res)
	require.Equal(t, data.Logs, res.Logs)
	require.Equal(t, ret, res.Ret)
}

func TestUnwrapEthererumMsg(t *testing.T) {
	_, err := evmtypes.UnwrapEthereumMsg(nil, common.Hash{})
	require.NotNil(t, err)

	encodingConfig := encoding.MakeConfig(app.ModuleBasics)
	clientCtx := client.Context{}.WithTxConfig(encodingConfig.TxConfig)
	builder, _ := clientCtx.TxConfig.NewTxBuilder().(authtx.ExtensionOptionsTxBuilder)

	tx := builder.GetTx().(sdk.Tx)
	_, err = evmtypes.UnwrapEthereumMsg(&tx, common.Hash{})
	require.NotNil(t, err)

	msg := evmtypes.NewTx(big.NewInt(1), 0, &common.Address{}, big.NewInt(0), 0, big.NewInt(0), nil, nil, []byte{}, nil)
	err = builder.SetMsgs(msg)

	tx = builder.GetTx().(sdk.Tx)
	msg_, err := evmtypes.UnwrapEthereumMsg(&tx, msg.AsTransaction().Hash())
	require.Nil(t, err)
	require.Equal(t, msg_, msg)
}

func TestBinSearch(t *testing.T) {
	success_executable := func(gas uint64) (bool, *evmtypes.MsgEthereumTxResponse, error) {
		target := uint64(21000)
		return gas < target, nil, nil
	}
	failed_executable := func(gas uint64) (bool, *evmtypes.MsgEthereumTxResponse, error) {
		return true, nil, errors.New("contract failed")
	}

	gas, err := evmtypes.BinSearch(20000, 21001, success_executable)
	require.NoError(t, err)
	require.Equal(t, gas, uint64(21000))

	gas, err = evmtypes.BinSearch(20000, 21001, failed_executable)
	require.Error(t, err)
	require.Equal(t, gas, uint64(0))
}
