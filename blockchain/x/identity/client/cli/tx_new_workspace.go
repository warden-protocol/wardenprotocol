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
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/qredo/fusionchain/x/identity/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNewWorkspace() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-workspace --admin-policy-id [admin-policy-id] --sign-policy-id [sign-policy-id] --additional-owners [additional-owners]",
		Short: "Broadcast message NewWorkspace",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			adminPolicyID, err := cmd.Flags().GetUint64("admin-policy-id")
			if err != nil {
				return err
			}

			signPolicyID, err := cmd.Flags().GetUint64("sign-policy-id")
			if err != nil {
				return err
			}

			additionalOwners, err := cmd.Flags().GetStringSlice("additional-owners")
			if err != nil {
				return err
			}

			msg := types.NewMsgNewWorkspace(
				clientCtx.GetFromAddress().String(),
				adminPolicyID,
				signPolicyID,
				additionalOwners...,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)
	cmd.Flags().Uint64("admin-policy-id", 0, "Optional policy ID applied to admin operations")
	cmd.Flags().Uint64("sign-policy-id", 0, "Optional policy ID applied to sign operations")
	cmd.Flags().StringSlice("additional-owners", []string{}, "Optional additional owners")

	return cmd
}
