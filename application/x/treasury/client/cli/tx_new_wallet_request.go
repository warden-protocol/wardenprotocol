package cli

import (
	"fmt"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

var _ = strconv.Itoa(0)

func CmdNewWalletRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-wallet-request [workspace-id] [wallet-type]",
		Short: "Broadcast message NewWalletRequest",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			workspaceId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			var walletType types.WalletType
			switch args[1] {
			case "ecdsa":
				walletType = types.WalletType_WALLET_TYPE_ECDSA
			default:
				return fmt.Errorf("invalid wallet type: %s. Use one of: ecdsa", args[1])
			}

			msg := types.NewMsgNewWalletRequest(
				clientCtx.GetFromAddress().String(),
				workspaceId,
				walletType,
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
