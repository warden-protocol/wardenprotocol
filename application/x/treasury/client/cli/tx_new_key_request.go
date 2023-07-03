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

func CmdNewKeyRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-key-request [workspace-id] [key-type]",
		Short: "Broadcast message NewKeyRequest",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			workspaceID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			var keyType types.KeyType
			switch strings.ToLower(args[1]) {
			case "ecdsa":
				keyType = types.KeyType_KEY_TYPE_ECDSA
			case "eddsa":
				keyType = types.KeyType_KEY_TYPE_EDDSA
			default:
				return fmt.Errorf("invalid key type: %s. Use one of: ecdsa, eddsa", args[1])
			}

			msg := types.NewMsgNewKeyRequest(
				clientCtx.GetFromAddress().String(),
				workspaceID,
				keyType,
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
