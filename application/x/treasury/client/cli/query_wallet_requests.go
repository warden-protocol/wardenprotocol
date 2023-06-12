package cli

import (
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

var _ = strconv.Itoa(0)

func CmdWalletRequests() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "wallet-requests [pending|fulfilled|rejected|all]",
		Short: "Query WalletRequests, optionally filtering by their current status",
		Args:  cobra.ExactArgs(1),
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

			params := &types.QueryWalletRequestsRequest{
				Pagination: pageReq,
				XStatus:    nil,
			}
			switch strings.ToLower(args[0]) {
			case "pending":
				params.XStatus = &types.QueryWalletRequestsRequest_Status{
					Status: types.WalletRequestStatus_WALLET_REQUEST_STATUS_PENDING,
				}
			case "fulfilled":
				params.XStatus = &types.QueryWalletRequestsRequest_Status{
					Status: types.WalletRequestStatus_WALLET_REQUEST_STATUS_FULFILLED,
				}
			case "rejected":
				params.XStatus = &types.QueryWalletRequestsRequest_Status{
					Status: types.WalletRequestStatus_WALLET_REQUEST_STATUS_REJECTED,
				}
			}

			res, err := queryClient.WalletRequests(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
