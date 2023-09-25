package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/qredo/fusionchain/x/policy/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdActionsByAddress() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "actions-by-address [address] --status [status]",
		Short: "Query Actions by address",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			status, err := cmd.Flags().GetString("status")
			if err != nil {
				return err
			}

			var statusEnum types.ActionStatus
			if status != "" {
				switch status {
				case "pending":
					statusEnum = types.ActionStatus_ACTION_STATUS_PENDING
				case "completed":
					statusEnum = types.ActionStatus_ACTION_STATUS_COMPLETED
				case "revoked":
					statusEnum = types.ActionStatus_ACTION_STATUS_REVOKED
				}
			}

			params := &types.QueryActionsByAddressRequest{
				Address: args[0],
				Status:  statusEnum,
			}

			res, err := queryClient.ActionsByAddress(cmd.Context(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	cmd.Flags().String("status", "", "status of the action (pending, completed, revoked)")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
