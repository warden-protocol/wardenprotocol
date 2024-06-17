package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) AddKeychainParty(goCtx context.Context, msg *types.MsgAddKeychainParty) (*types.MsgAddKeychainPartyResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	_, err := sdk.AccAddressFromBech32(msg.Party)
	if err != nil {
		return nil, fmt.Errorf("invalid party address: %s", err)
	}

	kr, err := k.keychains.Get(ctx, msg.KeychainId)
	if err != nil {
		return nil, err
	}

	if kr.IsParty(msg.Party) {
		return nil, fmt.Errorf("party is already a party of the keychain")
	}

	if !kr.IsAdmin(msg.Creator) {
		return nil, fmt.Errorf("tx creator is no keychain admin")
	}

	kr.AddParty(msg.Party)

	if err := k.keychains.Set(ctx, kr.Id, kr); err != nil {
		return nil, err
	}

	return &types.MsgAddKeychainPartyResponse{}, nil
}
