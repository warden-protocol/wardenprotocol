// Copyright 2023 Qredo Ltd.
// This file is part of the Fusion library.
//
// The Fusion library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Fusion library. If not, see https://github.com/qredo/fusionchain/blob/main/LICENSE
package cli

import (
	"encoding/hex"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdFulfilKeyRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "approve-key-request [request_id]  [hex_public_key]",
		Short: "Broadcast message UpdateKeyRequest fulfilling the key request",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			requestID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			publicKey, err := hex.DecodeString(args[1])
			if err != nil {
				return err
			}

			status := types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
			result := types.NewMsgUpdateKeyRequestKey(publicKey)

			msg := types.NewMsgUpdateKeyRequest(
				clientCtx.GetFromAddress().String(),
				requestID,
				status,
				result,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func CmdRejectKeyRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "reject-key-request [request_id]  [reason]",
		Short: "Broadcast message UpdateKeyRequest rejecting the key request",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			requestID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			status := types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
			result := types.NewMsgUpdateKeyRequestReject(args[1])

			msg := types.NewMsgUpdateKeyRequest(
				clientCtx.GetFromAddress().String(),
				requestID,
				status,
				result,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
