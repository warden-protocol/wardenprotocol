package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/qassets/types"
)

func (k msgServer) Mint(goCtx context.Context, msg *types.MsgMint) (*types.MsgMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Keeper.Mint(ctx, msg.Creator, msg.FromWalletId, msg.ToWorkspaceAddr, msg.IsToken, msg.TokenName, msg.TokenContractAddr, msg.Amount)

	return &types.MsgMintResponse{}, nil
}
