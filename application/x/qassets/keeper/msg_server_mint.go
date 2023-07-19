package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/tendermint/tendermint/libs/log"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

func moduleLogger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func (k msgServer) Mint(goCtx context.Context, msg *types.MsgMint) (*types.MsgMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Keeper.Mint(ctx, msg.Creator, msg.FromWalletId, msg.ToWorkspaceWalletAddr, msg.Amount)

	return &types.MsgMintResponse{}, nil
}
