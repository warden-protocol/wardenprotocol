package cli

import (
	rpctypes "github.com/evmos/ethermint/rpc/types"
	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"

	"github.com/evmos/ethermint/x/evm/types"
)

// GetQueryCmd returns the parent command for all x/bank CLi query commands.
func GetQueryCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      "Querying commands for the evm module",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		GetStorageCmd(),
		GetCodeCmd(),
		GetParamsCmd(),
	)
	return cmd
}

// GetStorageCmd queries a key in an accounts storage
func GetStorageCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "storage [address] [key]",
		Short: "Gets storage for an account with a given key and height",
		Long:  "Gets storage for an account with a given key and height. If the height is not provided, it will use the latest height from context.",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			address, err := accountToHex(args[0])
			if err != nil {
				return err
			}

			key := formatKeyToHash(args[1])

			req := &types.QueryStorageRequest{
				Address: address,
				Key:     key,
			}

			res, err := queryClient.Storage(rpctypes.ContextWithHeight(clientCtx.Height), req)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

// GetCodeCmd queries the code field of a given address
func GetCodeCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "code [address]",
		Short: "Gets code from an account",
		Long:  "Gets code from an account. If the height is not provided, it will use the latest height from context.",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			address, err := accountToHex(args[0])
			if err != nil {
				return err
			}

			req := &types.QueryCodeRequest{
				Address: address,
			}

			res, err := queryClient.Code(rpctypes.ContextWithHeight(clientCtx.Height), req)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

// GetParamsCmd queries the fee market params
func GetParamsCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "params",
		Short: "Get the evm params",
		Long:  "Get the evm parameter values.",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, _ []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			res, err := queryClient.Params(cmd.Context(), &types.QueryParamsRequest{})
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}
