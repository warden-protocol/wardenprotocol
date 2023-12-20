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

func CmdMsgUpdateWorkspace() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-workspace [workspace-address] [admin-policy-id] [sign-policy-id] [btl]",
		Short: "Broadcast message update-workspace",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			workspaceAddress := args[0]
			adminPolicyID, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}
			signPolicyID, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}
			btl, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}
			msg := types.NewMsgUpdateWorkspace(
				clientCtx.GetFromAddress().String(),
				workspaceAddress,
				adminPolicyID,
				signPolicyID,
				btl,
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
