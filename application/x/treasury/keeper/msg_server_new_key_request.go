package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	identitytypes "gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) NewKeyRequest(goCtx context.Context, msg *types.MsgNewKeyRequest) (*types.MsgNewKeyRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	ws, found := k.identityKeeper.GetWorkspace(ctx, msg.WorkspaceId)
	if !found {
		return nil, fmt.Errorf("workspace not found")
	}

	if !canRequestNewKey(ws, msg.Creator) {
		return nil, fmt.Errorf("account cannot request key")
	}

	req := types.KeyRequest{
		Creator:     msg.Creator,
		WorkspaceId: msg.WorkspaceId,
		KeyType:     msg.KeyType,
		Status:      types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
	}

	id := k.AppendKeyRequest(ctx, req)

	return &types.MsgNewKeyRequestResponse{
		Id: id,
	}, nil
}

func canRequestNewKey(ws identitytypes.Workspace, creator string) bool {
	return ws.IsOwner(creator)
}
