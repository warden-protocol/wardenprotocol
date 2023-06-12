package keeper

import (
	"context"
	// "fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	// identitytypes "gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) NewSignatureRequest(goCtx context.Context, msg *types.MsgNewSignatureRequest) (*types.MsgNewSignatureRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// ws, found := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceId)
	// if !found {
	// 	return nil, fmt.Errorf("workspace not found")
	// }

	// if !canRequestNewSig(ws, msg.Creator) {
	// 	return nil, fmt.Errorf("account cannot request signature")
	// }

	req := types.SignRequest{
		Creator:  msg.Creator,
		WalletId: msg.WalletId,
		Status:   types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
	}

	id := k.AppendSignRequest(ctx, req)

	return &types.MsgNewSignatureRequestResponse{Id: id}, nil
}

// func canRequestNewSig(ws identitytypes.Workspace, creator string) bool {
// 	return ws.IsOwner(creator)
// }
