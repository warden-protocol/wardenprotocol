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
	"fmt"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/qredo/fusionchain/x/qassets/types"
	treasurytypes "github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdBurn() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "burn [workspace-addr] [wallet-type] [is-token] [token-name] [token-contract-addr] [amount]",
		Short: "Broadcast message burn",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			var walletType treasurytypes.WalletType
			switch strings.ToLower(args[1]) {
			case "ethereum":
				walletType = treasurytypes.WalletType_WALLET_TYPE_ETH
			case "sepolia":
				walletType = treasurytypes.WalletType_WALLET_TYPE_ETH_SEPOLIA
			default:
				return fmt.Errorf("invalid wallet type '%s'", args[1])
			}

			isToken, err := strconv.ParseBool(args[2])
			if err != nil {
				return err
			}
			amount, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgBurn(
				clientCtx.GetFromAddress().String(),
				args[0],
				walletType,
				isToken,
				args[3],
				args[4],
				amount,
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
