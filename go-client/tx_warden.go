// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package client

import (
	"context"
	"fmt"

	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types"
)

// WardenTxClient contains a raw tx client.
type WardenTxClient struct {
	c *RawTxClient
}

// NewWardenTxClient returns a WardenTxClient.
func NewWardenTxClient(c *RawTxClient) *WardenTxClient {
	return &WardenTxClient{c: c}
}

// FulfilKeyRequest completes a key request writing the public key bytes to wardend. Note that the sender must be authorized to submit transactions
// for the keychain corresponding to the requestID. The transaction will be rejected if the WardenTxClient does not have the correct identity address.
func (c *WardenTxClient) FulfilKeyRequest(ctx context.Context, requestID uint64, publicKey []byte) error {
	status := types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
	result := types.NewMsgUpdateKeyRequestKey(publicKey)

	msg := &types.MsgUpdateKeyRequest{
		Creator:   c.c.Identity.Address.String(),
		RequestId: requestID,
		Status:    status,
		Result:    result,
	}

	txBytes, err := c.c.BuildTx(ctx, DefaultGasLimit, DefaultFees, msg)
	if err != nil {
		return fmt.Errorf("build tx: %w", err)
	}

	if err = c.c.SendWaitTx(ctx, txBytes); err != nil {
		return fmt.Errorf("send wait tx: %w", err)
	}

	return nil
}

// FulfilSignatureRequest completes a signature request writing the signature bytes to wardend. The sender must be authorized to submit transactions
// for the keychain corresponding to the requestID. The transaction will be rejected if the WardenTxClient does not have the correct identity address.
func (c *WardenTxClient) FulfilSignatureRequest(ctx context.Context, requestID uint64, sig []byte) error {
	status := types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
	result := &types.MsgFulfilSignatureRequest_Payload{
		Payload: &types.MsgSignedData{
			SignedData: sig,
		},
	}

	msg := &types.MsgFulfilSignatureRequest{
		Creator:   c.c.Identity.Address.String(),
		RequestId: requestID,
		Status:    status,
		Result:    result,
	}

	txBytes, err := c.c.BuildTx(ctx, DefaultGasLimit, DefaultFees, msg)
	if err != nil {
		return err
	}

	if err = c.c.SendWaitTx(ctx, txBytes); err != nil {
		return err
	}

	return nil
}

// RejectSignatureRequest notifies wardend that a signature request has been rejected. The sender must be authorized to submit transactions
// for the keychain corresponding to the requestID. The transaction will be rejected if the WardenTxClient does not have the correct identity address.
func (c *WardenTxClient) RejectSignatureRequest(ctx context.Context, requestID uint64, reason string) error {
	status := types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
	result := &types.MsgFulfilSignatureRequest_RejectReason{RejectReason: reason}

	msg := &types.MsgFulfilSignatureRequest{
		Creator:   c.c.Identity.Address.String(),
		RequestId: requestID,
		Status:    status,
		Result:    result,
	}

	txBytes, err := c.c.BuildTx(ctx, DefaultGasLimit, DefaultFees, msg)
	if err != nil {
		return err
	}

	if err = c.c.SendWaitTx(ctx, txBytes); err != nil {
		return err
	}

	return nil
}
