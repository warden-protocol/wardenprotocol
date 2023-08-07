package backend

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	errortypes "github.com/cosmos/cosmos-sdk/types/errors"
	grpctypes "github.com/cosmos/cosmos-sdk/types/grpc"
	"github.com/ethereum/go-ethereum/common"
	"github.com/evmos/ethermint/rpc/backend/mocks"
	rpc "github.com/evmos/ethermint/rpc/types"
	"github.com/evmos/ethermint/tests"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	mock "github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
)

// QueryClient defines a mocked object that implements the ethermint GRPC
// QueryClient interface. It allows for performing QueryClient queries without having
// to run a ethermint GRPC server.
//
// To use a mock method it has to be registered in a given test.
var _ evmtypes.QueryClient = &mocks.EVMQueryClient{}

// TraceTransaction
func RegisterTraceTransactionWithPredecessors(queryClient *mocks.EVMQueryClient, msgEthTx *evmtypes.MsgEthereumTx, predecessors []*evmtypes.MsgEthereumTx) {
	data := []byte{0x7b, 0x22, 0x74, 0x65, 0x73, 0x74, 0x22, 0x3a, 0x20, 0x22, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x22, 0x7d}
	queryClient.On("TraceTx", rpc.ContextWithHeight(1),
		&evmtypes.QueryTraceTxRequest{Msg: msgEthTx, BlockNumber: 1, Predecessors: predecessors, ChainId: 9000}).
		Return(&evmtypes.QueryTraceTxResponse{Data: data}, nil)
}

func RegisterTraceTransaction(queryClient *mocks.EVMQueryClient, msgEthTx *evmtypes.MsgEthereumTx) {
	data := []byte{0x7b, 0x22, 0x74, 0x65, 0x73, 0x74, 0x22, 0x3a, 0x20, 0x22, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x22, 0x7d}
	queryClient.On("TraceTx", rpc.ContextWithHeight(1), &evmtypes.QueryTraceTxRequest{Msg: msgEthTx, BlockNumber: 1, ChainId: 9000}).
		Return(&evmtypes.QueryTraceTxResponse{Data: data}, nil)
}

func RegisterTraceTransactionError(queryClient *mocks.EVMQueryClient, msgEthTx *evmtypes.MsgEthereumTx) {
	queryClient.On("TraceTx", rpc.ContextWithHeight(1), &evmtypes.QueryTraceTxRequest{Msg: msgEthTx, BlockNumber: 1, ChainId: 9000}).
		Return(nil, errortypes.ErrInvalidRequest)
}

// TraceBlock
func RegisterTraceBlock(queryClient *mocks.EVMQueryClient, txs []*evmtypes.MsgEthereumTx) {
	data := []byte{0x7b, 0x22, 0x74, 0x65, 0x73, 0x74, 0x22, 0x3a, 0x20, 0x22, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x22, 0x7d}
	queryClient.On("TraceBlock", rpc.ContextWithHeight(1),
		&evmtypes.QueryTraceBlockRequest{Txs: txs, BlockNumber: 1, TraceConfig: &evmtypes.TraceConfig{}, ChainId: 9000}).
		Return(&evmtypes.QueryTraceBlockResponse{Data: data}, nil)
}

func RegisterTraceBlockError(queryClient *mocks.EVMQueryClient) {
	queryClient.On("TraceBlock", rpc.ContextWithHeight(1), &evmtypes.QueryTraceBlockRequest{}).
		Return(nil, errortypes.ErrInvalidRequest)
}

// Params
func RegisterParams(queryClient *mocks.EVMQueryClient, header *metadata.MD, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}, grpc.Header(header)).
		Return(&evmtypes.QueryParamsResponse{}, nil).
		Run(func(args mock.Arguments) {
			// If Params call is successful, also update the header height
			arg := args.Get(2).(grpc.HeaderCallOption)
			h := metadata.MD{}
			h.Set(grpctypes.GRPCBlockHeightHeader, fmt.Sprint(height))
			*arg.HeaderAddr = h
		})
}

func RegisterParamsWithoutHeader(queryClient *mocks.EVMQueryClient, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}).
		Return(&evmtypes.QueryParamsResponse{Params: evmtypes.DefaultParams()}, nil)
}

func RegisterParamsInvalidHeader(queryClient *mocks.EVMQueryClient, header *metadata.MD, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}, grpc.Header(header)).
		Return(&evmtypes.QueryParamsResponse{}, nil).
		Run(func(args mock.Arguments) {
			// If Params call is successful, also update the header height
			arg := args.Get(2).(grpc.HeaderCallOption)
			h := metadata.MD{}
			*arg.HeaderAddr = h
		})
}

func RegisterParamsInvalidHeight(queryClient *mocks.EVMQueryClient, header *metadata.MD, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}, grpc.Header(header)).
		Return(&evmtypes.QueryParamsResponse{}, nil).
		Run(func(args mock.Arguments) {
			// If Params call is successful, also update the header height
			arg := args.Get(2).(grpc.HeaderCallOption)
			h := metadata.MD{}
			h.Set(grpctypes.GRPCBlockHeightHeader, "invalid")
			*arg.HeaderAddr = h
		})
}

func RegisterParamsWithoutHeaderError(queryClient *mocks.EVMQueryClient, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}).
		Return(nil, errortypes.ErrInvalidRequest)
}

// Params returns error
func RegisterParamsError(queryClient *mocks.EVMQueryClient, header *metadata.MD, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}, grpc.Header(header)).
		Return(nil, errortypes.ErrInvalidRequest)
}

func TestRegisterParams(t *testing.T) {
	var header metadata.MD
	queryClient := mocks.NewEVMQueryClient(t)

	height := int64(1)
	RegisterParams(queryClient, &header, height)

	_, err := queryClient.Params(rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}, grpc.Header(&header))
	require.NoError(t, err)
	blockHeightHeader := header.Get(grpctypes.GRPCBlockHeightHeader)
	headerHeight, err := strconv.ParseInt(blockHeightHeader[0], 10, 64)
	require.NoError(t, err)
	require.Equal(t, height, headerHeight)
}

func TestRegisterParamsError(t *testing.T) {
	queryClient := mocks.NewEVMQueryClient(t)
	RegisterBaseFeeError(queryClient)
	_, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Error(t, err)
}

// ETH Call
func RegisterEthCall(queryClient *mocks.EVMQueryClient, request *evmtypes.EthCallRequest) {
	ctx, _ := context.WithCancel(rpc.ContextWithHeight(1))
	queryClient.On("EthCall", ctx, request).
		Return(&evmtypes.MsgEthereumTxResponse{}, nil)
}

func RegisterEthCallError(queryClient *mocks.EVMQueryClient, request *evmtypes.EthCallRequest) {
	ctx, _ := context.WithCancel(rpc.ContextWithHeight(1))
	queryClient.On("EthCall", ctx, request).
		Return(nil, errortypes.ErrInvalidRequest)
}

// Estimate Gas
func RegisterEstimateGas(queryClient *mocks.EVMQueryClient, args evmtypes.TransactionArgs) {
	bz, _ := json.Marshal(args)
	queryClient.On("EstimateGas", rpc.ContextWithHeight(1), &evmtypes.EthCallRequest{Args: bz, ChainId: args.ChainID.ToInt().Int64()}).
		Return(&evmtypes.EstimateGasResponse{}, nil)
}

// BaseFee
func RegisterBaseFee(queryClient *mocks.EVMQueryClient, baseFee sdk.Int) {
	queryClient.On("BaseFee", rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{}).
		Return(&evmtypes.QueryBaseFeeResponse{BaseFee: &baseFee}, nil)
}

// Base fee returns error
func RegisterBaseFeeError(queryClient *mocks.EVMQueryClient) {
	queryClient.On("BaseFee", rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{}).
		Return(&evmtypes.QueryBaseFeeResponse{}, evmtypes.ErrInvalidBaseFee)
}

// Base fee not enabled
func RegisterBaseFeeDisabled(queryClient *mocks.EVMQueryClient) {
	queryClient.On("BaseFee", rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{}).
		Return(&evmtypes.QueryBaseFeeResponse{}, nil)
}

func TestRegisterBaseFee(t *testing.T) {
	baseFee := sdk.NewInt(1)
	queryClient := mocks.NewEVMQueryClient(t)
	RegisterBaseFee(queryClient, baseFee)
	res, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Equal(t, &evmtypes.QueryBaseFeeResponse{BaseFee: &baseFee}, res)
	require.NoError(t, err)
}

func TestRegisterBaseFeeError(t *testing.T) {
	queryClient := mocks.NewEVMQueryClient(t)
	RegisterBaseFeeError(queryClient)
	res, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Equal(t, &evmtypes.QueryBaseFeeResponse{}, res)
	require.Error(t, err)
}

func TestRegisterBaseFeeDisabled(t *testing.T) {
	queryClient := mocks.NewEVMQueryClient(t)
	RegisterBaseFeeDisabled(queryClient)
	res, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Equal(t, &evmtypes.QueryBaseFeeResponse{}, res)
	require.NoError(t, err)
}

// ValidatorAccount
func RegisterValidatorAccount(queryClient *mocks.EVMQueryClient, validator sdk.AccAddress) {
	queryClient.On("ValidatorAccount", rpc.ContextWithHeight(1), &evmtypes.QueryValidatorAccountRequest{}).
		Return(&evmtypes.QueryValidatorAccountResponse{AccountAddress: validator.String()}, nil)
}

func RegisterValidatorAccountError(queryClient *mocks.EVMQueryClient) {
	queryClient.On("ValidatorAccount", rpc.ContextWithHeight(1), &evmtypes.QueryValidatorAccountRequest{}).
		Return(nil, status.Error(codes.InvalidArgument, "empty request"))
}

func TestRegisterValidatorAccount(t *testing.T) {
	queryClient := mocks.NewEVMQueryClient(t)

	validator := sdk.AccAddress(tests.GenerateAddress().Bytes())
	RegisterValidatorAccount(queryClient, validator)
	res, err := queryClient.ValidatorAccount(rpc.ContextWithHeight(1), &evmtypes.QueryValidatorAccountRequest{})
	require.Equal(t, &evmtypes.QueryValidatorAccountResponse{AccountAddress: validator.String()}, res)
	require.NoError(t, err)
}

// Code
func RegisterCode(queryClient *mocks.EVMQueryClient, addr common.Address, code []byte) {
	queryClient.On("Code", rpc.ContextWithHeight(1), &evmtypes.QueryCodeRequest{Address: addr.String()}).
		Return(&evmtypes.QueryCodeResponse{Code: code}, nil)
}

func RegisterCodeError(queryClient *mocks.EVMQueryClient, addr common.Address) {
	queryClient.On("Code", rpc.ContextWithHeight(1), &evmtypes.QueryCodeRequest{Address: addr.String()}).
		Return(nil, errortypes.ErrInvalidRequest)
}

// Storage
func RegisterStorageAt(queryClient *mocks.EVMQueryClient, addr common.Address, key string, storage string) {
	queryClient.On("Storage", rpc.ContextWithHeight(1), &evmtypes.QueryStorageRequest{Address: addr.String(), Key: key}).
		Return(&evmtypes.QueryStorageResponse{Value: storage}, nil)
}

func RegisterStorageAtError(queryClient *mocks.EVMQueryClient, addr common.Address, key string) {
	queryClient.On("Storage", rpc.ContextWithHeight(1), &evmtypes.QueryStorageRequest{Address: addr.String(), Key: key}).
		Return(nil, errortypes.ErrInvalidRequest)
}

func RegisterAccount(queryClient *mocks.EVMQueryClient, addr common.Address, height int64) {
	queryClient.On("Account", rpc.ContextWithHeight(height), &evmtypes.QueryAccountRequest{Address: addr.String()}).
		Return(&evmtypes.QueryAccountResponse{
			Balance:  "0",
			CodeHash: "",
			Nonce:    0,
		},
			nil,
		)
}

// Balance
func RegisterBalance(queryClient *mocks.EVMQueryClient, addr common.Address, height int64) {
	queryClient.On("Balance", rpc.ContextWithHeight(height), &evmtypes.QueryBalanceRequest{Address: addr.String()}).
		Return(&evmtypes.QueryBalanceResponse{Balance: "1"}, nil)
}

func RegisterBalanceInvalid(queryClient *mocks.EVMQueryClient, addr common.Address, height int64) {
	queryClient.On("Balance", rpc.ContextWithHeight(height), &evmtypes.QueryBalanceRequest{Address: addr.String()}).
		Return(&evmtypes.QueryBalanceResponse{Balance: "invalid"}, nil)
}

func RegisterBalanceNegative(queryClient *mocks.EVMQueryClient, addr common.Address, height int64) {
	queryClient.On("Balance", rpc.ContextWithHeight(height), &evmtypes.QueryBalanceRequest{Address: addr.String()}).
		Return(&evmtypes.QueryBalanceResponse{Balance: "-1"}, nil)
}

func RegisterBalanceError(queryClient *mocks.EVMQueryClient, addr common.Address, height int64) {
	queryClient.On("Balance", rpc.ContextWithHeight(height), &evmtypes.QueryBalanceRequest{Address: addr.String()}).
		Return(nil, errortypes.ErrInvalidRequest)
}
