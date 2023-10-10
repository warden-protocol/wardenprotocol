package cli

import (
	"encoding/hex"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNewSignatureRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-signature-request [key-id] [data-for-signing] [btl]",
		Short: "Broadcast message NewSignatureRequest",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			keyID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			dataForSigning, err := hex.DecodeString(args[1])
			if err != nil {
				return err
			}
			btl, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}
			msg := types.NewMsgNewSignatureRequest(
				clientCtx.GetFromAddress().String(),
				keyID,
				dataForSigning,
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
