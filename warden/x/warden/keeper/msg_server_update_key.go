package keeper

import (
	"context"

	types "github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta2"
)

func (k msgServer) UpdateKey(ctx context.Context, msg *types.MsgUpdateKey) (*types.MsgUpdateKeyResponse, error) {
	if err := k.assertActAuthority(msg.Authority); err != nil {
		return nil, err
	}

	key, err := k.KeysKeeper.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	key.RuleId = msg.RuleId

	if err := k.KeysKeeper.Set(ctx, key); err != nil {
		return nil, err
	}

	return &types.MsgUpdateKeyResponse{}, nil
}
