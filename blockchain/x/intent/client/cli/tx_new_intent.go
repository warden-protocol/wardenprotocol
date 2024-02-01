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
	"fmt"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/warden-protocol/wardenprotocol/x/intent/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNewIntent() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-intent [name] [intent definition]",
		Short: "Broadcast message new-intent",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			name := args[0]

			rawParticipants, err := cmd.Flags().GetStringSlice("participants")
			if err != nil {
				return err
			}

			participants := make([]*types.IntentParticipant, 0, len(rawParticipants))
			for _, rawParticipant := range rawParticipants {
				split := strings.Split(rawParticipant, ":")
				if len(split) != 2 {
					return fmt.Errorf("invalid participant: %s", rawParticipant)
				}
				participants = append(participants, &types.IntentParticipant{
					Abbreviation: split[0],
					Address:      split[1],
				})
			}

			boolparserIntent := &types.BoolparserIntent{
				Definition:   args[1],
				Participants: participants,
			}
			intentAny, err := codectypes.NewAnyWithValue(boolparserIntent)
			if err != nil {
				return err
			}

			msg := types.NewMsgNewIntent(
				clientCtx.GetFromAddress().String(),
				name,
				intentAny,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().StringSliceP("participants", "p", []string{}, "List of participants (e.g. -p foo:warden123,bar:warden456)")
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
