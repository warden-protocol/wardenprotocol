package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) UpdateKeyring(goCtx context.Context, msg *types.MsgUpdateKeyring) (*types.MsgUpdateKeyringResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr := k.GetKeyring(ctx, msg.KeyringAddr)
	if kr == nil {
		return nil, fmt.Errorf("keyring not found")
	}

	// Check if the requester is an admin
	if !isAdmin(kr, msg.Creator) {
		return nil, fmt.Errorf("keyring updates should be requested by admins")
	}

	kr.SetStatus(msg.IsActive)
	if msg.Description != "" {
		kr.SetDescription(msg.Description)
	}
	k.SetKeyring(ctx, kr)
	return &types.MsgUpdateKeyringResponse{}, nil
}

// isAdmin checks if the given creator is in the list of keyring admins.
func isAdmin(kr *types.Keyring, creator string) bool {
	for _, admin := range kr.Admins {
		if creator == admin {
			return true
		}
	}
	return false
}
