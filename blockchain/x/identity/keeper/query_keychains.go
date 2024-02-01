// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Keychains(goCtx context.Context, req *types.QueryKeychainsRequest) (*types.QueryKeychainsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	keychains := make([]types.Keychain, 0, query.DefaultLimit)
	store := ctx.KVStore(k.storeKey)
	keychainsStore := prefix.NewStore(store, types.KeyPrefix(types.KeychainKey))

	pageRes, err := query.Paginate(keychainsStore, req.Pagination, func(key []byte, value []byte) error {
		var keychain types.Keychain
		if err := k.cdc.Unmarshal(value, &keychain); err != nil {
			return err
		}

		keychains = append(keychains, keychain)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryKeychainsResponse{
		Pagination: pageRes,
		Keychains:   keychains,
	}, nil
}

// (optional: get Keychain based on the status)
