package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/qredo/fusionchain/x/blackbird/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

// nolint:stylecheck,st1003
// revive:disable-next-line var-naming
func CmdPolicyById() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "policy-by-id [id]",
		Short: "Query policy-by-id",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			policyID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			params := &types.QueryPolicyByIdRequest{
				Id: policyID,
			}

			res, err := queryClient.PolicyById(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
