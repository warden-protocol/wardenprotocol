package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

func (k msgServer) UpdateWalletRequest(goCtx context.Context, msg *types.MsgUpdateWalletRequest) (*types.MsgUpdateWalletRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !isAllowedToCreateWallets(msg.Creator) {
		return nil, fmt.Errorf("only MPC can update wallet requests")
	}

	req, found := k.GetWalletRequest(ctx, msg.RequestId)
	if !found {
		return nil, fmt.Errorf("request not found")
	}

	if req.Status != types.WalletRequestStatus_WALLET_REQUEST_STATUS_PENDING {
		return nil, fmt.Errorf("request is not pending, can't be updated")
	}

	switch msg.Status {
	case types.WalletRequestStatus_WALLET_REQUEST_STATUS_APPROVED:
		// setup new wallet
		wallet := types.Wallet{
			WorkspaceId: req.WorkspaceId,
			Type:        req.WalletType,
			PublicKey:   (msg.Result.(*types.MsgUpdateWalletRequest_Wallet)).Wallet.PublicKey,
		}
		walletID := k.AppendWallet(ctx, wallet)

		// update WalletRequest with newly created wallet id
		req.Status = types.WalletRequestStatus_WALLET_REQUEST_STATUS_APPROVED
		req.Result = &types.WalletRequest_SuccessWalletId{
			SuccessWalletId: walletID,
		}
		k.SetWalletRequest(ctx, req)

		return &types.MsgUpdateWalletRequestResponse{}, nil

	case types.WalletRequestStatus_WALLET_REQUEST_STATUS_REJECTED:
		req.Status = types.WalletRequestStatus_WALLET_REQUEST_STATUS_REJECTED
		req.Result = &types.WalletRequest_RejectReason{
			RejectReason: msg.Result.(*types.MsgUpdateWalletRequest_RejectReason).RejectReason,
		}
		k.SetWalletRequest(ctx, req)

	default:
		return nil, fmt.Errorf("invalid status field, should be one of approved/rejected")
	}

	return &types.MsgUpdateWalletRequestResponse{}, nil
}

func isAllowedToCreateWallets(addr string) bool {
	// TODO: check if address belongs to a valid MPC node identity
	return true
}
