package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k msgServer) NewSignatureRequest(goCtx context.Context, msg *types.MsgNewSignatureRequest) (*types.MsgNewSignatureRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	key, found := k.KeysRepo().Get(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}
	ws := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}
	if !ws.IsOwner(msg.Creator) {
		return nil, fmt.Errorf("account cannot request signature")
	}

	req := &types.SignRequest{
		Creator:        msg.Creator,
		KeyId:          msg.KeyId,
		DataForSigning: msg.DataForSigning,
		Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
	}

	id := k.SignatureRequestsRepo().Append(ctx, req)

	return &types.MsgNewSignatureRequestResponse{Id: id}, nil
}
