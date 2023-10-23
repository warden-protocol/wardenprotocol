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

func CmdNewKeyring() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-keyring [description] [admin-policy-id] [key-request-fee] [sign-request-fee]",
		Short: "Broadcast message NewKeyring",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			adminPolicyID, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			keyReqFee, err := strconv.ParseUint(args[2], 10, 64)
			if err != nil {
				return err
			}
			sigReqFee, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgNewKeyring(
				clientCtx.GetFromAddress().String(),
				args[0],
				adminPolicyID,
				keyReqFee,
				sigReqFee,
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
