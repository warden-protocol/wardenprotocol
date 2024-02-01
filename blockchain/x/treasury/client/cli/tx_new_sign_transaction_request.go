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
	"encoding/hex"
	"fmt"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/warden-protocol/wardenprotocol/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNewSignTransactionRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-sign-transaction-request [key-id] [wallet-type] [unsigned-tx] [btl] [ethereum-chain-id]",
		Short: "Broadcast message new-sign-transaction-request",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			keyID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			ethereumChainID, err := strconv.ParseUint(args[4], 10, 64)
			if err != nil {
				return err
			}

			var metadataAny *cdctypes.Any
			var walletType types.WalletType
			switch strings.ToLower(args[1]) {
			case "ethereum":
				walletType = types.WalletType_WALLET_TYPE_ETH
				metadata := types.MetadataEthereum{
					ChainId: ethereumChainID,
				}

				metadataAny, err = cdctypes.NewAnyWithValue(&metadata)
				if err != nil {
					return err
				}

			case "all":
				walletType = types.WalletType_WALLET_TYPE_UNSPECIFIED
			default:
				fmt.Printf("invalid wallet type '%s', defaulting to 'all'", args[1])
				walletType = types.WalletType_WALLET_TYPE_UNSPECIFIED
			}

			unsignedTx, err := hex.DecodeString(args[2])
			if err != nil {
				return err
			}

			btl, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgNewSignTransactionRequest(
				clientCtx.GetFromAddress().String(),
				keyID,
				walletType,
				unsignedTx,
				btl,
				metadataAny,
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
