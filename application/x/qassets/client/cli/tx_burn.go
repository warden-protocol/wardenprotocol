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

func CmdBurn() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "burn [from-workspace-addr] [to-wallet-id] [is-token] [token-name] [token-contract-addr] [amount]",
		Short: "Broadcast message burn",
		Args:  cobra.ExactArgs(6),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}
			walletID, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
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
				walletID,
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
