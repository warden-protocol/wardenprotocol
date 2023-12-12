package client

import (
	"context"

	"github.com/qredo/fusionchain/x/treasury/types"
)

// TreasuryTxClient contains a raw tx client.
type TreasuryTxClient struct {
	c *RawTxClient
}

// NewTreasuryTxClient returns a TreasuryTxClient.
func NewTreasuryTxClient(c *RawTxClient) *TreasuryTxClient {
	return &TreasuryTxClient{c: c}
}

// FulfilKeyRequest completes a key request writing the public key bytes to fusiond. Note that the sender must be authorized to submit transactions
// for the keyring corresponding to the requestID. The transaction will be rejected if the TreasuryTxClient does not have the correct identity address.
func (c *TreasuryTxClient) FulfilKeyRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	status := types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
	result := types.NewMsgUpdateKeyRequestKey(publicKey)

	msg := types.NewMsgUpdateKeyRequest(
		c.c.Identity.Address.String(),
		requestID,
		status,
		result,
	)

	txBytes, err := c.c.BuildTx(ctx, DefaultGasLimit, DefaultFees, msg)
	if err != nil {
		return err
	}

	if err = c.c.SendWaitTx(ctx, txBytes); err != nil {
		return err
	}

	return nil
}

// FulfilSignatureRequest completes a signature request writing the signature bytes to fusiond. The sender must be authorized to submit transactions
// for the keyring corresponding to the requestID. The transaction will be rejected if the TreasuryTxClient does not have the correct identity address.
func (c *TreasuryTxClient) FulfilSignatureRequest(ctx context.Context, requestID uint64, sig []byte) error {
	status := types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
	result := types.NewMsgFulfilSignatureRequestPayload(sig)

	msg := types.NewMsgFulfilSignatureRequest(
		c.c.Identity.Address.String(),
		requestID,
		status,
		result,
	)

	txBytes, err := c.c.BuildTx(ctx, DefaultGasLimit, DefaultFees, msg)
	if err != nil {
		return err
	}

	if err = c.c.SendWaitTx(ctx, txBytes); err != nil {
		return err
	}

	return nil
}

// RejectSignatureRequest notifies fusiond that a signature request has been rejected. The sender must be authorized to submit transactions
// for the keyring corresponding to the requestID. The transaction will be rejected if the TreasuryTxClient does not have the correct identity address.
func (c *TreasuryTxClient) RejectSignatureRequest(ctx context.Context, requestID uint64, reason string) error {
	status := types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
	result := types.NewMsgFulfilSignatureRequestReject(reason)

	msg := types.NewMsgFulfilSignatureRequest(
		c.c.Identity.Address.String(),
		requestID,
		status,
		result,
	)

	txBytes, err := c.c.BuildTx(ctx, DefaultGasLimit, DefaultFees, msg)
	if err != nil {
		return err
	}

	if err = c.c.SendWaitTx(ctx, txBytes); err != nil {
		return err
	}

	return nil
}
