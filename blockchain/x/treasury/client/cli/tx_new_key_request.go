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
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNewKeyRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   `new-key-request [workspace-addr] [keyring-addr] [key-type: "secp256k1" | "ed25519"] [btl]`,
		Short: "Broadcast message NewKeyRequest",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			var keyType types.KeyType
			switch strings.ToLower(args[2]) {
			case "secp256k1":
				keyType = types.KeyType_KEY_TYPE_ECDSA_SECP256K1
			case "ecdsa":
				keyType = types.KeyType_KEY_TYPE_ECDSA_SECP256K1
			case "ed25519":
				keyType = types.KeyType_KEY_TYPE_EDDSA_ED25519
			case "eddsa":
				keyType = types.KeyType_KEY_TYPE_EDDSA_ED25519
			default:
				return fmt.Errorf("invalid key type: %s. Use one of: ecdsa, eddsa", args[1])
			}

			btl, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgNewKeyRequest(
				clientCtx.GetFromAddress().String(),
				args[0],
				args[1],
				keyType,
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
