package cli

import (
	"encoding/hex"
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

func CmdNewSignTransactionRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-sign-transaction-request [key-id] [wallet-type] [unsigned-tx] [btl]",
		Short: "Broadcast message new-sign-transaction-request",
		Args:  cobra.ExactArgs(4),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			keyID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			var walletType types.WalletType
			switch strings.ToLower(args[1]) {
			case "ethereum":
				walletType = types.WalletType_WALLET_TYPE_ETH
			case "sepolia":
				walletType = types.WalletType_WALLET_TYPE_ETH_SEPOLIA
			case "all":
				walletType = types.WalletType_WALLET_TYPE_UNSPECIFIED
			default:
				fmt.Printf("invalid wallet type '%s', defaulting to 'all'", args[1])
				walletType = types.WalletType_WALLET_TYPE_UNSPECIFIED
			}

			unsignedTx, err := hex.DecodeString(args[2])
			if err != nil {
				return err
			}

			btl, err := strconv.ParseUint(args[3], 10, 64)
			if err != nil {
				return err
			}

			msg := types.NewMsgNewSignTransactionRequest(
				clientCtx.GetFromAddress().String(),
				keyID,
				walletType,
				unsignedTx,
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
