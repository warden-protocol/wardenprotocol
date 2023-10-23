package cli

import (
	"strconv"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdKeyRequests() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "key-requests [keyring-addr] [pending|fulfilled|rejected|all]",
		Short: "Query KeyRequests, optionally filtering by their current status",
		Args:  cobra.ExactArgs(2),
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

			params := &types.QueryKeyRequestsRequest{
				Pagination:  pageReq,
				KeyringAddr: args[0],
				Status:      types.KeyRequestStatus_KEY_REQUEST_STATUS_UNSPECIFIED,
			}
			switch strings.ToLower(args[1]) {
			case "pending":
				params.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_PENDING
			case "fulfilled":
				params.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED
			case "rejected":
				params.Status = types.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED
			}

			res, err := queryClient.KeyRequests(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
