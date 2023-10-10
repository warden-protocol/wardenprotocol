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

func CmdAddWorkspaceOwner() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-workspace-owner [workspace-address] [owner-address] [btl]",
		Short: "Broadcast message AddWorkspaceOwner",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			btl, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}
			msg := types.NewMsgAddWorkspaceOwner(
				clientCtx.GetFromAddress().String(),
				args[0],
				args[1],
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
