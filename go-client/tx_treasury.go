package client

import (
	"context"

	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

type TreasuryTxClient struct {
	c *RawTxClient
}

func NewTreasuryTxClient(c *RawTxClient) *TreasuryTxClient {
	return &TreasuryTxClient{c: c}
}

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

	err = c.c.SendWaitTx(ctx, txBytes)
	if err != nil {
		return err
	}

	return nil
}

func (c *TreasuryTxClient) FulfilSignatureRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	status := types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
	result := types.NewMsgFulfilSignatureRequestPayload(publicKey)

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

	err = c.c.SendWaitTx(ctx, txBytes)
	if err != nil {
		return err
	}

	return nil
}

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

	err = c.c.SendWaitTx(ctx, txBytes)
	if err != nil {
		return err
	}

	return nil
}
