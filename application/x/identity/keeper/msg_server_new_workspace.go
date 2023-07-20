package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

func (k msgServer) NewWorkspace(goCtx context.Context, msg *types.MsgNewWorkspace) (*types.MsgNewWorkspaceResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	kr, err := keyring.New("workspaceAddr", "memory", "", nil)
	if err != nil {
		panic(err)
	}

	info, _, err := kr.NewMnemonic("workspaceAddr", keyring.English, sdk.FullFundraiserPath, keyring.DefaultBIP39Passphrase, hd.Secp256k1)
	if err != nil {
		panic(err)
	}

	err = kr.Delete("workspaceAddr")
	if err != nil {
		return nil, err
	}

	workspace := types.Workspace{
		Creator: msg.Creator,
		Owners:  []string{msg.Creator},
		Address: sdk.AccAddress(info.GetPubKey().Address().Bytes()).String(),
	}
	id := k.WorkspacesRepo().Append(ctx, &workspace)

	return &types.MsgNewWorkspaceResponse{
		Id: id,
	}, nil
}
