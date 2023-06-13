package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	identitytypes "gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) NewWalletRequest(goCtx context.Context, msg *types.MsgNewWalletRequest) (*types.MsgNewWalletRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	ws, found := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceId)
	if !found {
		return nil, fmt.Errorf("workspace not found")
	}

	if !canRequestNewWallet(ws, msg.Creator) {
		return nil, fmt.Errorf("account cannot request wallet")
	}

	req := types.WalletRequest{
		Creator:     msg.Creator,
		WorkspaceId: msg.WorkspaceId,
		WalletType:  msg.WalletType,
		Status:      types.WalletRequestStatus_WALLET_REQUEST_STATUS_PENDING,
	}

	id := k.AppendWalletRequest(ctx, req)

	return &types.MsgNewWalletRequestResponse{
		Id: id,
	}, nil
}

func canRequestNewWallet(ws identitytypes.Workspace, creator string) bool {
	return ws.IsOwner(creator)
}
