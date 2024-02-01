// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package cli

import (
	"context"
	"fmt"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/version"

	"github.com/warden-protocol/wardenprotocol/x/revenue/v1/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd() *cobra.Command {
	feesQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	feesQueryCmd.AddCommand(
		GetCmdQueryRevenues(),
		GetCmdQueryRevenue(),
		GetCmdQueryParams(),
		GetCmdQueryDeployerRevenues(),
		GetCmdQueryWithdrawerRevenues(),
	)

	return feesQueryCmd
}

// GetCmdQueryRevenues implements a command to return all registered contracts
// for fee distribution
func GetCmdQueryRevenues() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "contracts",
		Short: "Query all revenues",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, _ []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			req := &types.QueryRevenuesRequest{
				Pagination: pageReq,
			}

			res, err := queryClient.Revenues(context.Background(), req)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

// GetCmdQueryRevenue implements a command to return a registered contract for fee
// distribution
func GetCmdQueryRevenue() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "contract CONTRACT_ADDRESS",
		Args:    cobra.ExactArgs(1),
		Short:   "Query a registered contract for fee distribution by hex address",
		Long:    "Query a registered contract for fee distribution by hex address",
		Example: fmt.Sprintf("%s query revenue contract <contract-address>", version.AppName),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			req := &types.QueryRevenueRequest{ContractAddress: args[0]}

			// Query store
			res, err := queryClient.Revenue(context.Background(), req)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

// GetCmdQueryParams implements a command to return the current revenue
// parameters.
func GetCmdQueryParams() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "params",
		Short: "Query the current revenue module parameters",
		Args:  cobra.NoArgs,
		RunE: func(cmd *cobra.Command, _ []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}
			queryClient := types.NewQueryClient(clientCtx)

			params := &types.QueryParamsRequest{}

			res, err := queryClient.Params(context.Background(), params)
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(&res.Params)
		},
	}

	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}

// GetCmdQueryDeployerRevenues implements a command that returns all contracts
// that a deployer has registered for fee distribution
func GetCmdQueryDeployerRevenues() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "deployer-contracts DEPLOYER_ADDRESS",
		Args:    cobra.ExactArgs(1),
		Short:   "Query all contracts that a given deployer has registered for fee distribution",
		Long:    "Query all contracts that a given deployer has registered for fee distribution",
		Example: fmt.Sprintf("%s query revenue deployer-contracts <deployer-address>", version.AppName),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			// Query store
			res, err := queryClient.DeployerRevenues(context.Background(), &types.QueryDeployerRevenuesRequest{
				DeployerAddress: args[0],
				Pagination:      pageReq,
			})
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}

// GetCmdQueryWithdrawerRevenues implements a command that returns all
// contracts that have registered for fee distribution with a given withdraw
// address
func GetCmdQueryWithdrawerRevenues() *cobra.Command {
	cmd := &cobra.Command{
		Use:     "withdrawer-contracts WITHDRAWER_ADDRESS",
		Args:    cobra.ExactArgs(1),
		Short:   "Query all contracts that have been registered for fee distribution with a given withdrawer address",
		Long:    "Query all contracts that have been registered for fee distribution with a given withdrawer address",
		Example: fmt.Sprintf("%s query revenue withdrawer-contracts <withdrawer-address>", version.AppName),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			queryClient := types.NewQueryClient(clientCtx)

			pageReq, err := client.ReadPageRequest(cmd.Flags())
			if err != nil {
				return err
			}

			// Query store
			res, err := queryClient.WithdrawerRevenues(context.Background(), &types.QueryWithdrawerRevenuesRequest{
				WithdrawerAddress: args[0],
				Pagination:        pageReq,
			})
			if err != nil {
				return err
			}

			return clientCtx.PrintProto(res)
		},
	}
	flags.AddQueryFlagsToCmd(cmd)
	return cmd
}
