package keeper

import (
	"context"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/qredo/fusionchain/policy"
	bbird "github.com/qredo/fusionchain/x/policy/keeper"
	bbirdtypes "github.com/qredo/fusionchain/x/policy/types"
	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k msgServer) NewSignTransactionRequest(goCtx context.Context, msg *types.MsgNewSignTransactionRequest) (*types.MsgNewSignTransactionRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	w, _, err := k.getWallet(ctx, msg.WalletId)
	if err != nil {
		return nil, err
	}

	key, found := k.GetKey(ctx, w.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	ws := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	act, err := k.policyKeeper.AddAction(ctx, msg, ws.SignPolicyId, msg.Creator)
	if err != nil {
		return nil, err
	}
	return k.NewSignTransactionRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewSignTransactionRequestPolicyGenerator(ctx sdk.Context, msg *types.MsgNewSignTransactionRequest) (policy.Policy, error) {
	w, _, err := k.getWallet(ctx, msg.WalletId)
	if err != nil {
		return nil, err
	}

	key, found := k.GetKey(ctx, w.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	ws := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	pol := ws.PolicyNewSignTransactionRequest()
	return pol, nil
}

func (k msgServer) NewSignTransactionRequestActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgNewSignTransactionRequestResponse, error) {
	return bbird.TryExecuteAction(
		k.policyKeeper,
		k.cdc,
		ctx,
		act,
		payload,
		func(ctx sdk.Context, msg *types.MsgNewSignTransactionRequest) (*types.MsgNewSignTransactionRequestResponse, error) {
			// use wallet to parse unsigned transaction
			w, walletI, err := k.getWallet(ctx, msg.WalletId)
			if err != nil {
				return nil, err
			}

			parser, ok := walletI.(types.TxParser)
			if !ok {
				return nil, fmt.Errorf("wallet does not implement TxParser")
			}

			tx, err := parser.ParseTx(msg.UnsignedTransaction)
			if err != nil {
				return nil, fmt.Errorf("failed to parse tx: %w", err)
			}

			ctx.Logger().Debug("parsed layer 1 tx", "wallet", w, "tx", tx)

			// TODO: apply policies to tx

			// generate signature request
			signatureRequest := &types.SignRequest{
				Creator:        msg.Creator,
				KeyId:          w.KeyId,
				DataForSigning: tx.DataForSigning,
				Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
			}
			signRequestID := k.SignatureRequestsRepo().Append(ctx, signatureRequest)

			id := k.SignTransactionRequestsRepo().Append(ctx, &types.SignTransactionRequest{
				Creator:             msg.Creator,
				SignRequestId:       signRequestID,
				WalletId:            msg.WalletId,
				UnsignedTransaction: msg.UnsignedTransaction,
			})

			return &types.MsgNewSignTransactionRequestResponse{Id: id}, nil
		},
	)
}
