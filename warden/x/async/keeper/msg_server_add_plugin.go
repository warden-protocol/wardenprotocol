// Copyright (c) 2025 Warden Labs. All Rights Reserved.
//
// ** RESTRICTED LICENSE **
//
// This file is part of the 'async' module. It is NOT licensed
// under the Apache 2.0 license governing the rest of the project.
// Refer to the LICENSE file in this module's directory for full terms.
// Use, modification, and distribution are strictly limited.
// Do NOT use this file unless you agree to the terms stated in that license.
//
// SPDX-FileCopyrightText: 2025 Warden Labs
// SPDX-License-Identifier: LicenseRef-Proprietary-RestrictedModule

package keeper

import (
	"context"

	errorsmod "cosmossdk.io/errors"

	types "github.com/warden-protocol/wardenprotocol/warden/x/async/types/v1beta1"
)

func (k msgServer) AddPlugin(goCtx context.Context, req *types.MsgAddPlugin) (*types.MsgAddPluginResponse, error) {
	if k.GetAuthority() != req.Authority {
		return nil, errorsmod.Wrapf(types.ErrInvalidSigner, "invalid authority; expected %s, got %s", k.GetAuthority(), req.Authority)
	}

	if err := k.addPlugin(goCtx, types.Plugin{
		Id:          req.Name,
		Creator:     req.Authority,
		Description: req.Description,
		Fee:         req.Fee,
		Timeout:     req.Timeout,
	}); err != nil {
		return nil, err
	}

	return &types.MsgAddPluginResponse{}, nil
}
