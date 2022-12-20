package backend

import (
	"fmt"
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	grpctypes "github.com/cosmos/cosmos-sdk/types/grpc"
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
var _ evmtypes.QueryClient = &mocks.QueryClient{}

// Params
func RegisterParams(queryClient *mocks.QueryClient, header *metadata.MD, height int64) {
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

func RegisterParamsInvalidHeader(queryClient *mocks.QueryClient, header *metadata.MD, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}, grpc.Header(header)).
		Return(&evmtypes.QueryParamsResponse{}, nil).
		Run(func(args mock.Arguments) {
			// If Params call is successful, also update the header height
			arg := args.Get(2).(grpc.HeaderCallOption)
			h := metadata.MD{}
			*arg.HeaderAddr = h
		})
}

func RegisterParamsInvalidHeight(queryClient *mocks.QueryClient, header *metadata.MD, height int64) {
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

// Params returns error
func RegisterParamsError(queryClient *mocks.QueryClient, header *metadata.MD, height int64) {
	queryClient.On("Params", rpc.ContextWithHeight(height), &evmtypes.QueryParamsRequest{}, grpc.Header(header)).
		Return(nil, sdkerrors.ErrInvalidRequest)
}

func TestRegisterParams(t *testing.T) {
	queryClient := mocks.NewQueryClient(t)
	var header metadata.MD
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
	queryClient := mocks.NewQueryClient(t)
	RegisterBaseFeeError(queryClient)
	_, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Error(t, err)
}

// BaseFee
func RegisterBaseFee(queryClient *mocks.QueryClient, baseFee sdk.Int) {
	queryClient.On("BaseFee", rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{}).
		Return(&evmtypes.QueryBaseFeeResponse{BaseFee: &baseFee}, nil)
}

// Base fee returns error
func RegisterBaseFeeError(queryClient *mocks.QueryClient) {
	queryClient.On("BaseFee", rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{}).
		Return(&evmtypes.QueryBaseFeeResponse{}, evmtypes.ErrInvalidBaseFee)
}

// Base fee not enabled
func RegisterBaseFeeDisabled(queryClient *mocks.QueryClient) {
	queryClient.On("BaseFee", rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{}).
		Return(&evmtypes.QueryBaseFeeResponse{}, nil)
}

func TestRegisterBaseFee(t *testing.T) {
	baseFee := sdk.NewInt(1)
	queryClient := mocks.NewQueryClient(t)
	RegisterBaseFee(queryClient, baseFee)
	res, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Equal(t, &evmtypes.QueryBaseFeeResponse{BaseFee: &baseFee}, res)
	require.NoError(t, err)
}

func TestRegisterBaseFeeError(t *testing.T) {
	queryClient := mocks.NewQueryClient(t)
	RegisterBaseFeeError(queryClient)
	res, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Equal(t, &evmtypes.QueryBaseFeeResponse{}, res)
	require.Error(t, err)
}

func TestRegisterBaseFeeDisabled(t *testing.T) {
	queryClient := mocks.NewQueryClient(t)
	RegisterBaseFeeDisabled(queryClient)
	res, err := queryClient.BaseFee(rpc.ContextWithHeight(1), &evmtypes.QueryBaseFeeRequest{})
	require.Equal(t, &evmtypes.QueryBaseFeeResponse{}, res)
	require.NoError(t, err)
}

// ValidatorAccount
func RegisterValidatorAccount(queryClient *mocks.QueryClient, validator sdk.AccAddress) {
	queryClient.On("ValidatorAccount", rpc.ContextWithHeight(1), &evmtypes.QueryValidatorAccountRequest{}).
		Return(
			&evmtypes.QueryValidatorAccountResponse{
				AccountAddress: validator.String(),
			},
			nil,
		)
}

func RegisterValidatorAccountError(queryClient *mocks.QueryClient) {
	queryClient.On("ValidatorAccount", rpc.ContextWithHeight(1), &evmtypes.QueryValidatorAccountRequest{}).
		Return(nil, status.Error(codes.InvalidArgument, "empty request"))
}

func TestRegisterValidatorAccount(t *testing.T) {
	queryClient := mocks.NewQueryClient(t)

	validator := sdk.AccAddress(tests.GenerateAddress().Bytes())
	RegisterValidatorAccount(queryClient, validator)
	res, err := queryClient.ValidatorAccount(rpc.ContextWithHeight(1), &evmtypes.QueryValidatorAccountRequest{})
	require.Equal(t, &evmtypes.QueryValidatorAccountResponse{AccountAddress: validator.String()}, res)
	require.NoError(t, err)
}
