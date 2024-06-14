package keeper

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) AddKeychainWriter(goCtx context.Context, msg *types.MsgAddKeychainWriter) (*types.MsgAddKeychainWriterResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, err := sdk.AccAddressFromBech32(msg.Writer)
	if err != nil {
		return nil, fmt.Errorf("invalid writer address: %s", err)
	}

	kr, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	if kr.IsWriter(msg.Writer) {
		return nil, fmt.Errorf("writer is already a writer of the keychain")
	}

	if !kr.IsAdmin(msg.Creator) {
		return nil, fmt.Errorf("tx creator is no keychain admin")
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

	telemetry.IncrCounter(1, "add_keychain_writer", "msg", "count")

	return &types.MsgAddKeychainWriterResponse{}, nil
}
