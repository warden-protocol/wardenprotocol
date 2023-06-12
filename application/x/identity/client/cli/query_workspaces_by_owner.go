package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
)

var _ = strconv.Itoa(0)

func CmdWorkspacesByOwner() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "workspaces-by-owner [owner]",
		Short: "Query WorkspacesByOwner",
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

			params := &types.QueryWorkspacesByOwnerRequest{
				Pagination: pageReq,
				Owner:      args[0],
			}

			res, err := queryClient.WorkspacesByOwner(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
