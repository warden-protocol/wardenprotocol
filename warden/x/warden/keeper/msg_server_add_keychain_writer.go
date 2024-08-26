package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

func (k msgServer) AddKeychainWriter(goCtx context.Context, msg *types.MsgAddKeychainWriter) (*types.MsgAddKeychainWriterResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, err := sdk.AccAddressFromBech32(msg.Writer)
	if err != nil {
		return nil, errors.Wrapf(types.ErrInvalidKeychainWriterAddress, "%v", err)
	}

	kr, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	if kr.IsWriter(msg.Writer) {
		return nil, types.ErrDuplicateKeychainWriter
	}

	if !kr.IsAdmin(msg.Creator) {
		return nil, types.ErrNotKeychainAdmin
	}

	kr.AddWriter(msg.Writer)

	if err := k.keychains.Set(ctx, kr.Id, kr); err != nil {
		return nil, err
	}

	if err := ctx.EventManager().EmitTypedEvent(&types.EventAddKeychainWriter{
		Id:           kr.Id,
		NewWriter:    msg.Writer,
		WritersCount: uint64(len(kr.Writers)),
	}); err != nil {
		return nil, err
	}

	return &types.MsgAddKeychainWriterResponse{}, nil
}
