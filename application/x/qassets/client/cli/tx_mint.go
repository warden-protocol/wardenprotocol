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

func CmdMint() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "mint [from-wallet-id] [to-workspace-wallet-addr] [amount]",
		Short: "Broadcast message mint",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			walletID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}
			amount, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}
			msg := types.NewMsgMint(
				clientCtx.GetFromAddress().String(),
				walletID,
				args[1],
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
