package keeper

import (
	"context"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/qredo/fusionchain/x/treasury/types"
)

func (k msgServer) NewSignTransactionRequest(goCtx context.Context, msg *types.MsgNewSignTransactionRequest) (*types.MsgNewSignTransactionRequestResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

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
}
