package keeper

import (
	"context"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/intent"
	bbird "github.com/warden-protocol/wardenprotocol/x/intent/keeper"
	bbirdtypes "github.com/warden-protocol/wardenprotocol/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
)

func (k msgServer) NewSignTransactionRequest(goCtx context.Context, msg *types.MsgNewSignTransactionRequest) (*types.MsgNewSignTransactionRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	key, found := k.GetKey(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	ws := k.identityKeeper.GetSpace(ctx, key.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	if keychain := k.identityKeeper.GetKeychain(ctx, key.KeychainAddr); keychain == nil || !keychain.IsActive {
		return nil, fmt.Errorf("problem with keychain found:%v, IsActive:%v", found, keychain.IsActive)
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.SignIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}
	return k.NewSignTransactionRequestActionHandler(ctx, act, &cdctypes.Any{})
}

func (k msgServer) NewSignTransactionRequestIntentGenerator(ctx sdk.Context, msg *types.MsgNewSignTransactionRequest) (intent.Intent, error) {
	key, found := k.GetKey(ctx, msg.KeyId)
	if !found {
		return nil, fmt.Errorf("key not found")
	}

	ws := k.identityKeeper.GetSpace(ctx, key.SpaceAddr)
	if ws == nil {
		return nil, fmt.Errorf("space not found")
	}

	pol := ws.IntentNewSignTransactionRequest()
	return pol, nil
}

func (k msgServer) NewSignTransactionRequestActionHandler(ctx sdk.Context, act *bbirdtypes.Action, payload *cdctypes.Any) (*types.MsgNewSignTransactionRequestResponse, error) {
	return bbird.TryExecuteAction(
		k.intentKeeper,
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

			var meta types.Metadata
			if err := k.cdc.UnpackAny(msg.Metadata, &meta); err != nil {
				return nil, fmt.Errorf("failed to unpack metadata: %w", err)
			}
			tx, err := parser.ParseTx(msg.UnsignedTransaction, meta)
			if err != nil {
				return nil, fmt.Errorf("failed to parse tx: %w", err)
			}

			ctx.Logger().Debug("parsed layer 1 tx", "wallet", w, "tx", tx)

			// TODO: apply intents to tx

			// generate signature request
			signatureRequest := &types.SignRequest{
				Creator:        msg.Creator,
				KeyId:          msg.KeyId,
				KeyType:        key.Type,
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

			return &types.MsgNewSignTransactionRequestResponse{Id: id, SignatureRequestId: signRequestID}, nil
		},
	)
}
