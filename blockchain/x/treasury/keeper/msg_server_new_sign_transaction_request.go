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

	key, found := k.GetKey(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	ws := k.identityKeeper.GetWorkspace(ctx, key.WorkspaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("workspace not found")
	}

	if keyring := k.identityKeeper.GetKeyring(ctx, key.KeyringAddr); keyring == nil || !keyring.IsActive {
		return nil, fmt.Errorf("problem with keyring found:%v, IsActive:%v", found, keyring.IsActive)
	}

	act, err := k.policyKeeper.AddAction(ctx, msg.Creator, msg, ws.SignPolicyId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.NewSignTransactionRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewSignTransactionRequestPolicyGenerator(ctx sdk.Context, msg *types.MsgNewSignTransactionRequest) (policy.Policy, error) {
	key, found := k.GetKey(ctx, msg.KeyId)
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
			key, found := k.GetKey(ctx, msg.KeyId)
			if !found {
				return nil, fmt.Errorf("key not found")
			}

			// use wallet to parse unsigned transaction
			w, err := types.NewWallet(key, msg.WalletType)
			if err != nil {
				return nil, err
			}

			parser, ok := w.(types.TxParser)
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
				KeyId:          msg.KeyId,
				DataForSigning: tx.DataForSigning,
				Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
			}
			signRequestID := k.SignatureRequestsRepo().Append(ctx, signatureRequest)

			id := k.SignTransactionRequestsRepo().Append(ctx, &types.SignTransactionRequest{
				Creator:             msg.Creator,
				SignRequestId:       signRequestID,
				KeyId:               msg.KeyId,
				WalletType:          msg.WalletType,
				UnsignedTransaction: msg.UnsignedTransaction,
			})

			return &types.MsgNewSignTransactionRequestResponse{Id: id}, nil
		},
	)
}
