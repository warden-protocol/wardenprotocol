package keeper

import (
	"context"
	"fmt"

	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/warden-protocol/wardenprotocol/warden/intent"
	intenttypes "github.com/warden-protocol/wardenprotocol/warden/x/intent/types"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

func (k msgServer) NewSignTransactionRequest(goCtx context.Context, msg *types.MsgNewSignTransactionRequest) (*types.MsgNewSignTransactionRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	key, err := k.keys.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	ws, err := k.GetSpace(ctx, key.SpaceAddr)
	if err != nil {
		return nil, err
	}

	keychain, err := k.GetKeychain(ctx, key.KeychainAddr)
	if err != nil {
		return nil, err
	}

	if !keychain.IsActive {
		return nil, fmt.Errorf("keychain is not active")
	}

	act, err := k.intentKeeper.AddAction(ctx, msg.Creator, msg, ws.SignIntentId, msg.Btl)
	if err != nil {
		return nil, err
	}

	res, err := k.NewSignTransactionRequestActionHandler(ctx, *act, &cdctypes.Any{})
	return res.(*types.MsgNewSignTransactionRequestResponse), err
}

func (k msgServer) NewSignTransactionRequestIntentGenerator(ctx sdk.Context, act intenttypes.Action) (intent.Intent, error) {
	msg, err := intenttypes.GetActionMessage[*types.MsgNewSignTransactionRequest](k.cdc, act)
	if err != nil {
		return nil, err
	}

	key, err := k.keys.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	ws, err := k.GetSpace(ctx, key.SpaceAddr)
	if err != nil {
		return nil, err
	}

	pol := ws.IntentNewSignTransactionRequest()
	return pol, nil
}

func (k msgServer) NewSignTransactionRequestActionHandler(ctx sdk.Context, act intenttypes.Action, payload *cdctypes.Any) (any, error) {
	ready, err := k.intentKeeper.CheckActionReady(ctx, act, nil)
	if err != nil {
		return nil, err
	}

	if !ready {
		return nil, nil
	}

	msg, err := intenttypes.GetActionMessage[*types.MsgNewSignTransactionRequest](k.cdc, act)
	if err != nil {
		return nil, err
	}

	key, err := k.keys.Get(ctx, msg.KeyId)
	if err != nil {
		return nil, err
	}

	// use wallet to parse unsigned transaction
	w, err := types.NewWallet(&key, msg.WalletType)
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

	// generate signature request
	signatureRequest := types.SignRequest{
		Creator:        msg.Creator,
		KeyId:          msg.KeyId,
		KeyType:        key.Type,
		DataForSigning: tx.DataForSigning,
		Status:         types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
	}
	signRequestID, err := k.signatureRequests.Append(ctx, signatureRequest)
	if err != nil {
		return nil, err
	}

	id, err := k.signTransactionRequests.Append(ctx, types.SignTransactionRequest{
		Creator:             msg.Creator,
		SignRequestId:       signRequestID,
		KeyId:               msg.KeyId,
		WalletType:          msg.WalletType,
		UnsignedTransaction: msg.UnsignedTransaction,
	})
	if err != nil {
		return nil, err
	}

	return &types.MsgNewSignTransactionRequestResponse{Id: id, SignatureRequestId: signRequestID}, nil
}
