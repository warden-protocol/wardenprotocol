package keeper

import (
	"context"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) NewKeychain(goCtx context.Context, msg *types.MsgNewKeychain) (*types.MsgNewKeychainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := msg.KeychainFees.EnsureValid(); err != nil {
		return nil, err
	}
	if msg.Name == "" {
		return nil, fmt.Errorf("keychain name cannot be empty")
	}
	keybaseId, err := types.NewKeybaseId(msg.KeybaseId)
	if err != nil {
		return nil, err
	}

	keychain := &types.Keychain{
		Creator:     msg.Creator,
		Name:        msg.Name,
		Description: msg.Description,
		Admins:      []string{msg.Creator},
		Fees:        msg.KeychainFees,
		KeybaseId:   keybaseId,
		Url:         msg.Url,
	}

	id, err := k.keychains.Append(ctx, keychain)
	if err != nil {
		return nil, err
	}

	if err := ctx.EventManager().EmitTypedEvent(&types.EventNewKeychain{
		Id:           id,
		Creator:      msg.Creator,
		KeychainFees: msg.KeychainFees,
	}); err != nil {
		return nil, err
	}

	return &types.MsgNewKeychainResponse{
		Id: id,
	}, nil
}
