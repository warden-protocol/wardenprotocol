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

func CmdAppendChildWorkspace() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "append-child-workspace [parent-workspace-addr] [child-workspace-addr] [btl]",
		Short: "Broadcast message append-child-workspace",
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
			msg := types.NewMsgAppendChildWorkspace(
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
