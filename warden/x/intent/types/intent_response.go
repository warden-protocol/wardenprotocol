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
package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/warden-protocol/wardenprotocol/warden/intent"
)

func NewIntentResponse(cdc codec.BinaryCodec, intentPb Intent) (IntentResponse, error) {
	p, err := UnpackIntent(cdc, &intentPb)
	if err != nil {
		return IntentResponse{}, err
	}

	var metadata *cdctypes.Any
	if p, ok := p.(intent.IntentMetadata); ok {
		m, err := p.Metadata()
		if err != nil {
			return IntentResponse{}, err
		}

		metadata, err = cdctypes.NewAnyWithValue(m)
		if err != nil {
			return IntentResponse{}, err
		}
	}

	return IntentResponse{
		Intent:   &intentPb,
		Metadata: metadata,
	}, nil
}
