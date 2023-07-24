package cli

import (
	"encoding/hex"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

var _ = strconv.Itoa(0)

func CmdNewSignTransactionRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-sign-transaction-request [wallet-id] [unsigned-tx]",
		Short: "Broadcast message new-sign-transaction-request",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			walletID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			unsignedTx, err := hex.DecodeString(args[1])
			if err != nil {
				return err
			}

			msg := types.NewMsgNewSignTransactionRequest(
				clientCtx.GetFromAddress().String(),
				walletID,
				unsignedTx,
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
