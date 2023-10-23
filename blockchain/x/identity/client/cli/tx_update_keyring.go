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

func CmdMsgUpdateKeyring() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-keyring [keyring-addr] [status] [description] ",
		Short: "Broadcast message update-keyring",
		Args:  cobra.RangeArgs(2, 3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			status, err := strconv.ParseBool(args[1])
			if err != nil {
				return err
			}
			var description string
			if len(args) == 3 {
				description = args[2]
			}

			msg := types.NewMsgUpdateKeyring(
				clientCtx.GetFromAddress().String(),
				args[0],
				description,
				status,
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
