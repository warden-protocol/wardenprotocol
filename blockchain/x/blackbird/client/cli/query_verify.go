package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/blackbird/types"
)

var _ = strconv.Itoa(0)

func CmdVerify() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "verify [policy] [payload]",
		Short: "Query verify",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			reqPolicy := args[0]
			reqPayload := args[1]

			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryVerifyRequest{

				Policy:  reqPolicy,
				Payload: reqPayload,
			}

			res, err := queryClient.Verify(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
