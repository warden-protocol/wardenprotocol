package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdNewWalletRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-wallet-request [wallet-type] [key-id]",
		Short: "Broadcast message NewWalletRequest",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			var walletType types.WalletType
			switch strings.ToLower(args[0]) {
			case "fusion":
				walletType = types.WalletType_WALLET_TYPE_QRDO
			case "native":
				walletType = types.WalletType_WALLET_TYPE_QRDO
			case "ethereum":
				walletType = types.WalletType_WALLET_TYPE_ETH
			case "eth":
				walletType = types.WalletType_WALLET_TYPE_ETH
			case "sepolia":
				walletType = types.WalletType_WALLET_TYPE_ETH_SEPOLIA

			default:
				return fmt.Errorf("invalid wallet type: %s", args[0])
			}

			keyId, err := strconv.ParseUint(args[1], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgNewWalletRequest(
				clientCtx.GetFromAddress().String(),
				walletType,
				keyId,
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
