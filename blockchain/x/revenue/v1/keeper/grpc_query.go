// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:LGPL-3.0-only

package keeper

import (
	"context"
	"strings"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/ethereum/go-ethereum/common"
	evmostypes "github.com/evmos/ethermint/types"

	"github.com/qredo/fusionchain/x/revenue/v1/types"
)

var _ types.QueryServer = Keeper{}

// Revenues returns all Revenues that have been registered for fee distribution
func (k Keeper) Revenues(
	c context.Context,
	req *types.QueryRevenuesRequest,
) (*types.QueryRevenuesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	var revenues []types.Revenue
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefixRevenue)

	pageRes, err := query.Paginate(store, req.Pagination, func(_, value []byte) error {
		var revenue types.Revenue
		if err := k.cdc.Unmarshal(value, &revenue); err != nil {
			return err
		}
		revenues = append(revenues, revenue)
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	return &types.QueryRevenuesResponse{
		Revenues:   revenues,
		Pagination: pageRes,
	}, nil
}

// Revenue returns the Revenue that has been registered for fee distribution for a given
// contract
func (k Keeper) Revenue(
	c context.Context,
	req *types.QueryRevenueRequest,
) (*types.QueryRevenueResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	if strings.TrimSpace(req.ContractAddress) == "" {
		return nil, status.Error(
			codes.InvalidArgument,
			"contract address is empty",
		)
	}

	// check if the contract is a non-zero hex address
	if err := evmostypes.ValidateNonZeroAddress(req.ContractAddress); err != nil {
		return nil, status.Errorf(
			codes.InvalidArgument,
			"invalid format for contract %s, should be non-zero hex ('0x...')", req.ContractAddress,
		)
	}

	revenue, found := k.GetRevenue(ctx, common.HexToAddress(req.ContractAddress))
	if !found {
		return nil, status.Errorf(
			codes.NotFound,
			"fees registered contract '%s'",
			req.ContractAddress,
		)
	}

	return &types.QueryRevenueResponse{Revenue: revenue}, nil
}

// Params returns the fees module params
func (k Keeper) Params(
	c context.Context,
	_ *types.QueryParamsRequest,
) (*types.QueryParamsResponse, error) {
	ctx := sdk.UnwrapSDKContext(c)
	params := k.GetParams(ctx)
	return &types.QueryParamsResponse{Params: params}, nil
}

// DeployerRevenues returns all contracts that have been registered for fee
// distribution by a given deployer
func (k Keeper) DeployerRevenues( //nolint: dupl
	c context.Context,
	req *types.QueryDeployerRevenuesRequest,
) (*types.QueryDeployerRevenuesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	if strings.TrimSpace(req.DeployerAddress) == "" {
		return nil, status.Error(
			codes.InvalidArgument,
			"deployer address is empty",
		)
	}

	deployer, err := sdk.AccAddressFromBech32(req.DeployerAddress)
	if err != nil {
		return nil, status.Errorf(
			codes.InvalidArgument,
			"invalid format for deployer %s, should be bech32 ('evmos...')", req.DeployerAddress,
		)
	}

	var contracts []string
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.GetKeyPrefixDeployer(deployer),
	)

	pageRes, err := query.Paginate(store, req.Pagination, func(key, _ []byte) error {
		contracts = append(contracts, common.BytesToAddress(key).Hex())
		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryDeployerRevenuesResponse{
		ContractAddresses: contracts,
		Pagination:        pageRes,
	}, nil
}

// WithdrawerRevenues returns all fees for a given withdraw address
func (k Keeper) WithdrawerRevenues( //nolint: dupl
	c context.Context,
	req *types.QueryWithdrawerRevenuesRequest,
) (*types.QueryWithdrawerRevenuesResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "empty request")
	}

	ctx := sdk.UnwrapSDKContext(c)

	if strings.TrimSpace(req.WithdrawerAddress) == "" {
		return nil, status.Error(
			codes.InvalidArgument,
			"withdraw address is empty",
		)
	}

	deployer, err := sdk.AccAddressFromBech32(req.WithdrawerAddress)
	if err != nil {
		return nil, status.Errorf(
			codes.InvalidArgument,
			"invalid format for withdraw addr %s, should be bech32 ('evmos...')", req.WithdrawerAddress,
		)
	}

	var contracts []string
	store := prefix.NewStore(
		ctx.KVStore(k.storeKey),
		types.GetKeyPrefixWithdrawer(deployer),
	)

	pageRes, err := query.Paginate(store, req.Pagination, func(key, _ []byte) error {
		contracts = append(contracts, common.BytesToAddress(key).Hex())

		return nil
	})
	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}
	return &types.QueryWithdrawerRevenuesResponse{
		ContractAddresses: contracts,
		Pagination:        pageRes,
	}, nil
}
