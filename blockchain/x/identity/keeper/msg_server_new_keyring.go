package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/identity/types"
)

func (k msgServer) NewKeyring(goCtx context.Context, msg *types.MsgNewKeyring) (*types.MsgNewKeyringResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	keyring := &types.Keyring{
		Creator:       msg.Creator,
		Description:   msg.Description,
		Admins:        []string{msg.Creator},
		AdminPolicyId: msg.AdminPolicyId,
		Fees:          msg.Fees,
		IsActive:      true,
	}
	address := k.CreateKeyring(ctx, keyring)

	return &types.MsgNewKeyringResponse{
		Address: address,
	}, nil
}
