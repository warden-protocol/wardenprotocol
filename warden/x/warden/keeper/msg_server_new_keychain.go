package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) NewKeychain(goCtx context.Context, msg *types.MsgNewKeychain) (*types.MsgNewKeychainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keychain := &types.Keychain{
		Creator:       msg.Creator,
		Description:   msg.Description,
		Admins:        []string{msg.Creator},
		AdminIntentId: msg.AdminIntentId,
		Fees:          msg.KeychainFees,
		IsActive:      true,
	}

	id, err := k.keychains.Append(ctx, keychain)
	if err != nil {
		return nil, err
	}

	return &types.MsgNewKeychainResponse{
		Id: id,
	}, nil
}
