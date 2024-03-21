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

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/warden-protocol/wardenprotocol/shield"
	"github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
)

func (k msgServer) NewIntent(goCtx context.Context, msg *types.MsgNewIntent) (*types.MsgNewIntentResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	metadata, err := shield.Validate(msg.Definition)
	if err != nil {
		return nil, err
	}

	addresses := extractAddresses(metadata.Identifiers)

	intentPb := types.Intent{
		Name:       msg.Name,
		Definition: msg.Definition,
		Addresses:  addresses,
	}
	id, err := k.intents.Append(ctx, &intentPb)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewIntentResponse{
		Id: id,
	}, nil
}

// extractAddresses filters a list of string by returning only the ones that are valid bech32 addresses.
func extractAddresses(identifiers []string) []string {
	addresses := make([]string, 0, len(identifiers))
	for _, identifier := range identifiers {
		_, err := sdk.AccAddressFromBech32(identifier)
		if err != nil {
			continue
		}
		addresses = append(addresses, identifier)
	}
	return addresses
}
