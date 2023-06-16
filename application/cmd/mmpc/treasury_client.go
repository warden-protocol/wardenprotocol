package main

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
	"google.golang.org/grpc"
)

// TreasuryClient is the client for the treasury module.
type TreasuryClient struct {
	id       *TxIdentity
	client   types.QueryClient
	txClient *TxClient
}

func NewTreasuryClient(id *TxIdentity, c *grpc.ClientConn, txClient *TxClient) *TreasuryClient {
	return &TreasuryClient{
		id:       id,
		client:   types.NewQueryClient(c),
		txClient: txClient,
	}
}

func (t *TreasuryClient) PendingWalletRequests(ctx context.Context) ([]*types.WalletRequest, error) {
	res, err := t.client.WalletRequests(ctx, &types.QueryWalletRequestsRequest{
		Pagination: &query.PageRequest{
			Limit: 10,
		},
		XStatus: &types.QueryWalletRequestsRequest_Status{
			Status: types.WalletRequestStatus_WALLET_REQUEST_STATUS_PENDING,
		},
	})
	if err != nil {
		return nil, err
	}

	return res.WalletRequests, nil
}

func (t *TreasuryClient) ApproveWalletRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	status := types.WalletRequestStatus_WALLET_REQUEST_STATUS_FULFILLED
	result := types.NewMsgUpdateWalletRequestWallet(publicKey)

	msg := types.NewMsgUpdateWalletRequest(
		t.id.Address.String(),
		requestID,
		status,
		result,
	)

	txBytes, err := t.txClient.BuildTx(msg)
	if err != nil {
		return err
	}

	err = t.txClient.SendTxBlocking(ctx, txBytes)
	if err != nil {
		return err
	}

	return nil
}

func (t *TreasuryClient) GetWalletRequest(ctx context.Context, requestID uint64) (*types.WalletRequest, error) {
	res, err := t.client.WalletRequestById(ctx, &types.QueryWalletRequestByIdRequest{
		Id: requestID,
	})
	if err != nil {
		return nil, err
	}

	return res.WalletRequest, nil
}

func (t *TreasuryClient) PendingSignatureRequests(ctx context.Context) ([]*types.SignRequest, error) {
	res, err := t.client.SignatureRequests(ctx, &types.QuerySignatureRequestsRequest{
		Pagination: &query.PageRequest{
			Limit: 10,
		},
		XStatus: &types.QuerySignatureRequestsRequest_Status{
			Status: types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
		},
	})
	if err != nil {
		return nil, err
	}

	return res.SignRequests, nil
}

func (t *TreasuryClient) ApproveSignatureRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	status := types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
	result := types.NewMsgFulfillSignatureRequestPayload(publicKey)

	msg := types.NewMsgFulfillSignatureRequest(
		t.id.Address.String(),
		requestID,
		status,
		result,
	)

	txBytes, err := t.txClient.BuildTx(msg)
	if err != nil {
		return err
	}

	err = t.txClient.SendTxBlocking(ctx, txBytes)
	if err != nil {
		return err
	}

	return nil
}

func (t *TreasuryClient) GetSignatureRequest(ctx context.Context, requestID uint64) (*types.SignRequest, error) {
	res, err := t.client.SignatureRequestById(ctx, &types.QuerySignatureRequestByIdRequest{
		Id: requestID,
	})
	if err != nil {
		return nil, err
	}

	return res.SignRequest, nil
}
