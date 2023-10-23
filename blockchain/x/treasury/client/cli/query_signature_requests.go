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

func CmdSignatureRequests() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "signature-requests [keyring-id] [pending|fulfilled|rejected|all]",
		Short: "Query SignatureRequests, optionally filtering by their current status",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			params := &types.QuerySignatureRequestsRequest{
				KeyringAddr: args[0],
				Pagination:  pageReq,
				Status:      types.SignRequestStatus_SIGN_REQUEST_STATUS_UNSPECIFIED,
			}
			switch strings.ToLower(args[1]) {
			case "pending":
				params.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_PENDING
			case "fulfilled":
				params.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED
			case "rejected":
				params.Status = types.SignRequestStatus_SIGN_REQUEST_STATUS_REJECTED
			}

			res, err := queryClient.SignatureRequests(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
