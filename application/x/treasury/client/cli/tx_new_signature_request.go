package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

var _ = strconv.Itoa(0)

func CmdNewSignatureRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-signature-request [workspace-id] [signature-type] [data-for-signing]",
		Short: "Broadcast message NewSignatureRequest",
		Args:  cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			workspaceID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			var signType types.SignType
			switch strings.ToLower(args[1]) {
			case "ecdsa":
				signType = types.SignType_SIGN_TYPE_ECDSA
			case "eddsa":
				signType = types.SignType_SIGN_TYPE_EDDSA
			default:
				return fmt.Errorf("invalid wallet type: %s. Use one of: ecdsa, eddsa", args[1])
			}

			msg := types.NewMsgNewSignatureRequest(
				clientCtx.GetFromAddress().String(),
				workspaceID,
				signType,
				[]byte(args[2]),
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
