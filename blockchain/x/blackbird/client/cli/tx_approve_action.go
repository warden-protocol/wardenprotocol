package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	"github.com/qredo/fusionchain/x/blackbird/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

var witnessFlag = "witness"

func CmdApproveAction() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "approve-action [action_type] [action_id] --witness [witness]",
		Short: "Broadcast message ApproveAction",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			actionID, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			witness, err := cmd.Flags().GetBytesHex(witnessFlag)
			if err != nil {
				return err
			}

			var payload *cdctypes.Any
			if len(witness) > 0 {
				payload, err = cdctypes.NewAnyWithValue(&types.BlackbirdPolicyPayload{Witness: witness})
				if err != nil {
					return err
				}
			}

			msg := types.NewMsgApproveAction(
				clientCtx.GetFromAddress().String(),
				args[0],
				actionID,
				payload,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	cmd.Flags().BytesHex(witnessFlag, nil, "Optional witness for the Blackbird policy attached to this action")
	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
