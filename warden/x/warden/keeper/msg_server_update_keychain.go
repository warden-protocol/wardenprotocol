package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateKeychain(goCtx context.Context, msg *types.MsgUpdateKeychain) (*types.MsgUpdateKeychainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	// Check if the requester is an admin
	if !kr.IsAdmin(msg.Creator) {
		return nil, fmt.Errorf("keychain updates should be requested by admins")
	}

	kr.SetFees(msg.KeychainFees)
	if msg.Description != "" {
		kr.SetDescription(msg.Description)
	}

	if err := k.keychains.Set(ctx, kr.Id, kr); err != nil {
		return nil, err
	}

	if err := ctx.EventManager().EmitTypedEvent(&types.EventUpdateKeychain{
		Id:           kr.Id,
		KeychainFees: kr.Fees,
	}); err != nil {
		return nil, err
	}

	telemetry.IncrCounter(1, "update_keychain", "msg", "count")

	return &types.MsgUpdateKeychainResponse{}, nil
}
