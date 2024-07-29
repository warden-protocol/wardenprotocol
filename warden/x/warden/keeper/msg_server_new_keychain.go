package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) NewKeychain(goCtx context.Context, msg *types.MsgNewKeychain) (*types.MsgNewKeychainResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if err := ensureKeychainFeesValid(msg.KeychainFees); err != nil {
		return nil, err
	}

	keychain := &types.Keychain{
		Creator:     msg.Creator,
		Description: msg.Description,
		Admins:      []string{msg.Creator},
		Fees:        msg.KeychainFees,
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

func ensureKeychainFeesValid(fees *types.KeychainFees) error {
	if err := fees.KeyReq.Validate(); err != nil {
		return fmt.Errorf("key req is invalid: %w", err)
	}

	if err := fees.SigReq.Validate(); err != nil {
		return fmt.Errorf("sig req is invalid: %w", err)
	}

	return nil
}
