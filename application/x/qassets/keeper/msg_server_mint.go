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

type Denom struct {
	ChainID      string
	ContractAddr string
}

func (d Denom) String() string {
	return d.ChainID + ":" + d.ContractAddr
}

type QAssetMsg struct {
	Denom   Denom
	Address sdk.AccAddress
	Amount  int64
}
type QAssetResponse struct{}

// func (k msgServer) Mint(goCtx context.Context, msg *types.MsgMint) (*types.MsgMintResponse, error) {
func (k msgServer) Mint(goCtx context.Context, msg *QAssetMsg) (*QAssetResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.Keeper.Mint(ctx, msg)

	// return &types.MsgMintResponse{}, nil
	return &QAssetResponse{}, nil
}
