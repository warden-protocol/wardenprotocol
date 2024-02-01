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
package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/warden-protocol/wardenprotocol/x/identity/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNewSpace() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-space --admin-intent-id [admin-intent-id] --sign-intent-id [sign-intent-id] --additional-owners [additional-owners]",
		Short: "Broadcast message NewSpace",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			adminIntentID, err := cmd.Flags().GetUint64("admin-intent-id")
			if err != nil {
				return err
			}

			signIntentID, err := cmd.Flags().GetUint64("sign-intent-id")
			if err != nil {
				return err
			}

			additionalOwners, err := cmd.Flags().GetStringSlice("additional-owners")
			if err != nil {
				return err
			}

			msg := types.NewMsgNewSpace(
				clientCtx.GetFromAddress().String(),
				adminIntentID,
				signIntentID,
				additionalOwners...,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)
	cmd.Flags().Uint64("admin-intent-id", 0, "Optional intent ID applied to admin operations")
	cmd.Flags().Uint64("sign-intent-id", 0, "Optional intent ID applied to sign operations")
	cmd.Flags().StringSlice("additional-owners", []string{}, "Optional additional owners")

	return cmd
}
