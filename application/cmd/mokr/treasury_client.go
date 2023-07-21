package main

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
	"google.golang.org/grpc"
)

// TreasuryClient is the client for the treasury module.
type TreasuryClient struct {
	id        KeyringIdentity
	keyringID uint64
	client    types.QueryClient
	txClient  *TxClient
}

func NewTreasuryClient(id KeyringIdentity, c *grpc.ClientConn, txClient *TxClient) *TreasuryClient {
	return &TreasuryClient{
		id:       id,
		client:   types.NewQueryClient(c),
		txClient: txClient,
	}
}

func (t *TreasuryClient) PendingKeyRequests(ctx context.Context) ([]*types.KeyRequest, error) {
	res, err := t.client.KeyRequests(ctx, &types.QueryKeyRequestsRequest{
		Pagination: &query.PageRequest{
			Limit: 10,
		},
		KeyringId: t.id.KeyringID,
		XStatus: &types.QueryKeyRequestsRequest_Status{
			Status: types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
		},
	})
	if err != nil {
		return nil, err
	}

	return res.KeyRequests, nil
}

func (t *TreasuryClient) FulfilKeyRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	status := types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
	result := types.NewMsgUpdateKeyRequestKey(publicKey)

	msg := types.NewMsgUpdateKeyRequest(
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

func (t *TreasuryClient) GetKeyRequest(ctx context.Context, requestID uint64) (*types.KeyRequest, error) {
	res, err := t.client.KeyRequestById(ctx, &types.QueryKeyRequestByIdRequest{
		Id: requestID,
	})
	if err != nil {
		return nil, err
	}

	return res.KeyRequest, nil
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

func (t *TreasuryClient) FulfilSignatureRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	status := types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
	result := types.NewMsgFulfilSignatureRequestPayload(publicKey)

	msg := types.NewMsgFulfilSignatureRequest(
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
