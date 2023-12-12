package client

import (
	"context"

	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/qredo/fusionchain/x/treasury/types"
	"google.golang.org/grpc"
)

type PageRequest = query.PageRequest

// TreasuryQueryClient is the client for the treasury module.
type TreasuryQueryClient struct {
	client types.QueryClient
}

// NewTreasuryQueryClient returns a TreasuryQueryClient
func NewTreasuryQueryClient(c *grpc.ClientConn) *TreasuryQueryClient {
	return &TreasuryQueryClient{
		client: types.NewQueryClient(c),
	}
}

// PendingKeyRequests executes a paginated pending key request query with context. fusiond will return a slice of pending
// key requests for the supplied keyring address.
func (t *TreasuryQueryClient) PendingKeyRequests(ctx context.Context, page *PageRequest, keyringAddr string) ([]*types.KeyRequest, error) {
	res, err := t.client.KeyRequests(ctx, &types.QueryKeyRequestsRequest{
		Pagination:  page,
		KeyringAddr: keyringAddr,
		Status:      types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING,
	})
	if err != nil {
		return nil, err
	}

	return res.KeyRequests, nil
}

// GetKeyRequest returns the key request corresponding to the specific request ID.
func (t *TreasuryQueryClient) GetKeyRequest(ctx context.Context, requestID uint64) (*types.KeyRequest, error) {
	res, err := t.client.KeyRequestById(ctx, &types.QueryKeyRequestByIdRequest{
		Id: requestID,
	})
	if err != nil {
		return nil, err
	}

	return res.KeyRequest, nil
}

// PendingSignatureRequests executes a paginated pending signature request query with context. fusiond will return a slice of pending
// signature requests for the supplied keyring address.
func (t *TreasuryQueryClient) PendingSignatureRequests(ctx context.Context, page *PageRequest, keyringAddr string) ([]*types.SignRequest, error) {
	res, err := t.client.SignatureRequests(ctx, &types.QuerySignatureRequestsRequest{
		Pagination:  page,
		KeyringAddr: keyringAddr,
		Status:      types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING,
	})
	if err != nil {
		return nil, err
	}

	return res.SignRequests, nil
}

// GetSignatureRequest returns the signature request corresponding to the specific request ID.
func (t *TreasuryQueryClient) GetSignatureRequest(ctx context.Context, requestID uint64) (*types.SignRequest, error) {
	res, err := t.client.SignatureRequestById(ctx, &types.QuerySignatureRequestByIdRequest{
		Id: requestID,
	})
	if err != nil {
		return nil, err
	}

	return res.SignRequest, nil
}

// SignedTransactions returns a paginated set of fulfilled signature requests for the supplied wallet type.
func (t *TreasuryQueryClient) SignedTransactions(ctx context.Context, page *PageRequest, walletType types.WalletType) (*types.QuerySignTransactionRequestsResponse, error) {
	res, err := t.client.SignTransactionRequests(ctx, &types.QuerySignTransactionRequestsRequest{
		Pagination: page,
		WalletType: walletType,
		Status:     types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED,
	})
	if err != nil {
		return nil, err
	}

	return res, nil
}
