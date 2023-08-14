package cli

import (
	"fmt"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

var _ = strconv.Itoa(0)

func CmdSignTransactionRequests() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "sign-transaction-requests [wallet_type]",
		Short: "Query sign transactions requests",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			var walletType types.WalletType
			switch args[0] {
			case "ethereum":
				walletType = types.WalletType_WALLET_TYPE_ETH
			default:
				return fmt.Errorf("invalid wallet type %s", args[0])
			}

			params := &types.QuerySignTransactionRequestsRequest{
				Pagination: pageReq,
				WalletType: walletType,
			}

			res, err := queryClient.SignTransactionRequests(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	flags.AddPaginationFlagsToCmd(cmd, "sign-transaction-requests")

	return cmd
}
