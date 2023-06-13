package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

var _ = strconv.Itoa(0)

func CmdAddWorkspaceOwner() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-workspace-owner [workspaceId] [owner]",
		Short: "Broadcast message AddWorkspaceOwner",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			workspaceId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			owner := args[1]

			msg := types.NewMsgAddWorkspaceOwner(
				clientCtx.GetFromAddress().String(),
				workspaceId,
				owner,
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
