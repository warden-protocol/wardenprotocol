// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/policy"
	"github.com/qredo/fusionchain/x/policy/types"
)

func (k msgServer) NewPolicy(goCtx context.Context, msg *types.MsgNewPolicy) (*types.MsgNewPolicyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var p policy.Policy
	if err := k.cdc.UnpackAny(msg.Policy, &p); err != nil {
		return nil, err
	}
	if err := p.Validate(); err != nil {
		return nil, err
	}

	policyPb := &types.Policy{
		Name:   msg.Name,
		Policy: msg.Policy,
	}
	id := k.PolicyRepo().Append(ctx, policyPb)

	return &types.MsgNewPolicyResponse{
		Id: id,
	}, nil
}
