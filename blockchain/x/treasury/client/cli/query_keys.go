package cli

import (
	"fmt"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdKeys() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "keys [workspace-addr]",
		Short: "Query Keys, optionally by workspace address",
		Args:  cobra.MaximumNArgs(1),
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

			walletTypeArg, err := cmd.Flags().GetString("wallet-type")
			if err != nil {
				return err
			}
			var walletType types.WalletType
			if len(walletTypeArg) > 0 {
				switch walletTypeArg {
				case "ethereum":
					walletType = types.WalletType_WALLET_TYPE_ETH
				case "sepolia":
					walletType = types.WalletType_WALLET_TYPE_ETH_SEPOLIA
				default:
					return fmt.Errorf("invalid wallet type %s", walletTypeArg)
				}
			}
			params := &types.QueryKeysRequest{
				Pagination:    pageReq,
				WorkspaceAddr: "",
				Type:          walletType,
			}
			if len(args) > 0 {
				params.WorkspaceAddr = args[0]
			}

			res, err := queryClient.Keys(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	cmd.Flags().String("wallet-type", "", "derive an address for type")

	return cmd
}
