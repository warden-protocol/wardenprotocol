package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/qassets/types"
)

var _ = strconv.Itoa(0)

func CmdSend() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "send [from-workspace-id] [to-workspace-id] [qasset-denom] [amount]",
		Short: "Broadcast message send",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			amount, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}
			msg := types.NewMsgSend(
				clientCtx.GetFromAddress().String(),
				args[0],
				args[1],
				args[2],
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
