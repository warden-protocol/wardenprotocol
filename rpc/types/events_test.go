package types

import (
	"math/big"
	"testing"

	"github.com/ethereum/go-ethereum/common"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	"github.com/stretchr/testify/require"
	abci "github.com/tendermint/tendermint/abci/types"
)

func TestParseTxResult(t *testing.T) {
	address := "0x57f96e6B86CdeFdB3d412547816a82E3E0EbF9D2"
	txHash := common.BigToHash(big.NewInt(1))
	txHash2 := common.BigToHash(big.NewInt(2))

	testCases := []struct {
		name     string
		response abci.ResponseDeliverTx
		expTxs   []*ParsedTx // expected parse result, nil means expect error.
	}{
		{
			"format 1 events",
			abci.ResponseDeliverTx{
				GasUsed: 21000,
				Events: []abci.Event{
					{Type: "coin_received", Attributes: []abci.EventAttribute{
						{Key: []byte("receiver"), Value: []byte("ethm12luku6uxehhak02py4rcz65zu0swh7wjun6msa")},
						{Key: []byte("amount"), Value: []byte("1252860basetcro")},
					}},
					{Type: "coin_spent", Attributes: []abci.EventAttribute{
						{Key: []byte("spender"), Value: []byte("ethm17xpfvakm2amg962yls6f84z3kell8c5lthdzgl")},
						{Key: []byte("amount"), Value: []byte("1252860basetcro")},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash.Hex())},
						{Key: []byte("txIndex"), Value: []byte("10")},
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("21000")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
					}},
					{Type: "message", Attributes: []abci.EventAttribute{
						{Key: []byte("action"), Value: []byte("/ethermint.evm.v1.MsgEthereumTx")},
						{Key: []byte("key"), Value: []byte("ethm17xpfvakm2amg962yls6f84z3kell8c5lthdzgl")},
						{Key: []byte("module"), Value: []byte("evm")},
						{Key: []byte("sender"), Value: []byte(address)},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash2.Hex())},
						{Key: []byte("txIndex"), Value: []byte("11")},
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("21000")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
						{Key: []byte("ethereumTxFailed"), Value: []byte("contract reverted")},
					}},
					{Type: evmtypes.EventTypeTxLog, Attributes: []abci.EventAttribute{}},
				},
			},
			[]*ParsedTx{
				{
					MsgIndex:   0,
					Hash:       txHash,
					EthTxIndex: 10,
					GasUsed:    21000,
					Failed:     false,
				},
				{
					MsgIndex:   1,
					Hash:       txHash2,
					EthTxIndex: 11,
					GasUsed:    21000,
					Failed:     true,
				},
			},
		},
		{
			"format 2 events",
			abci.ResponseDeliverTx{
				GasUsed: 21000,
				Events: []abci.Event{
					{Type: "coin_received", Attributes: []abci.EventAttribute{
						{Key: []byte("receiver"), Value: []byte("ethm12luku6uxehhak02py4rcz65zu0swh7wjun6msa")},
						{Key: []byte("amount"), Value: []byte("1252860basetcro")},
					}},
					{Type: "coin_spent", Attributes: []abci.EventAttribute{
						{Key: []byte("spender"), Value: []byte("ethm17xpfvakm2amg962yls6f84z3kell8c5lthdzgl")},
						{Key: []byte("amount"), Value: []byte("1252860basetcro")},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash.Hex())},
						{Key: []byte("txIndex"), Value: []byte("0")},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash.Hex())},
						{Key: []byte("txIndex"), Value: []byte("0")},
						{Key: []byte("txGasUsed"), Value: []byte("21000")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
					}},
					{Type: "message", Attributes: []abci.EventAttribute{
						{Key: []byte("action"), Value: []byte("/ethermint.evm.v1.MsgEthereumTx")},
						{Key: []byte("key"), Value: []byte("ethm17xpfvakm2amg962yls6f84z3kell8c5lthdzgl")},
						{Key: []byte("module"), Value: []byte("evm")},
						{Key: []byte("sender"), Value: []byte(address)},
					}},
				},
			},
			[]*ParsedTx{
				{
					MsgIndex:   0,
					Hash:       txHash,
					EthTxIndex: 0,
					GasUsed:    21000,
					Failed:     false,
				},
			},
		},
		{
			"format 1 events, failed",
			abci.ResponseDeliverTx{
				GasUsed: 21000,
				Events: []abci.Event{
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash.Hex())},
						{Key: []byte("txIndex"), Value: []byte("10")},
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("21000")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash2.Hex())},
						{Key: []byte("txIndex"), Value: []byte("0x01")},
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("21000")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
						{Key: []byte("ethereumTxFailed"), Value: []byte("contract reverted")},
					}},
					{Type: evmtypes.EventTypeTxLog, Attributes: []abci.EventAttribute{}},
				},
			},
			nil,
		},
		{
			"format 1 events, failed",
			abci.ResponseDeliverTx{
				GasUsed: 21000,
				Events: []abci.Event{
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash.Hex())},
						{Key: []byte("txIndex"), Value: []byte("10")},
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("21000")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash2.Hex())},
						{Key: []byte("txIndex"), Value: []byte("10")},
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("0x01")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
						{Key: []byte("ethereumTxFailed"), Value: []byte("contract reverted")},
					}},
					{Type: evmtypes.EventTypeTxLog, Attributes: []abci.EventAttribute{}},
				},
			},
			nil,
		},
		{
			"format 2 events failed",
			abci.ResponseDeliverTx{
				GasUsed: 21000,
				Events: []abci.Event{
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash.Hex())},
						{Key: []byte("txIndex"), Value: []byte("0x01")},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("21000")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
					}},
				},
			},
			nil,
		},
		{
			"format 2 events failed",
			abci.ResponseDeliverTx{
				GasUsed: 21000,
				Events: []abci.Event{
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("ethereumTxHash"), Value: []byte(txHash.Hex())},
						{Key: []byte("txIndex"), Value: []byte("10")},
					}},
					{Type: evmtypes.EventTypeEthereumTx, Attributes: []abci.EventAttribute{
						{Key: []byte("amount"), Value: []byte("1000")},
						{Key: []byte("txGasUsed"), Value: []byte("0x01")},
						{Key: []byte("txHash"), Value: []byte("14A84ED06282645EFBF080E0B7ED80D8D8D6A36337668A12B5F229F81CDD3F57")},
						{Key: []byte("recipient"), Value: []byte("0x775b87ef5D82ca211811C1a02CE0fE0CA3a455d7")},
					}},
				},
			},
			nil,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			parsed, err := ParseTxResult(&tc.response, nil)
			if tc.expTxs == nil {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
				for msgIndex, expTx := range tc.expTxs {
					require.Equal(t, expTx, parsed.GetTxByMsgIndex(msgIndex))
					require.Equal(t, expTx, parsed.GetTxByHash(expTx.Hash))
					require.Equal(t, expTx, parsed.GetTxByTxIndex(int(expTx.EthTxIndex)))
				}
				// non-exists tx hash
				require.Nil(t, parsed.GetTxByHash(common.Hash{}))
				// out of range
				require.Nil(t, parsed.GetTxByMsgIndex(len(tc.expTxs)))
				require.Nil(t, parsed.GetTxByTxIndex(99999999))
			}
		})
	}
}
