package cli

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdKeys() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "keys [wallet-type] [workspace-addr]",
		Short: "Query Keys, optionally by wallet type and workspace address",
		Args:  cobra.MaximumNArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			var walletType types.WalletType
			if len(args) > 0 {
				switch strings.ToLower(args[0]) {
				case "ethereum":
					walletType = types.WalletType_WALLET_TYPE_ETH
				case "sepolia":
					walletType = types.WalletType_WALLET_TYPE_ETH_SEPOLIA
				case "all":
					walletType = types.WalletType_WALLET_TYPE_UNSPECIFIED
				default:
					fmt.Printf("invalid wallet type '%s', defaulting to 'all'", args[0])
					walletType = types.WalletType_WALLET_TYPE_UNSPECIFIED
				}
			}
			params := &types.QueryKeysRequest{
				Pagination:    pageReq,
				WorkspaceAddr: "",
				Type:          walletType,
			}
			if len(args) > 1 {
				params.WorkspaceAddr = args[1]
			}

			res, err := queryClient.Keys(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
