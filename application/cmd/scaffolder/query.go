package main

// /proto/fusionchain/$module/query.proto

// add into service
//  // Queries a list of XXXX items.
//  rpc XXXX (QueryXXXXRequest) returns (QueryXXXXResponse) {
//    option (google.api.http).get = "/qrdochain/fusionchain/$module/xxxx";
//
//  }

// add at the bottom
// message QueryXXXXRequest {}
//
// message QueryXXXXResponse {}

// -----------------

// x/identity/client/cli/query.go
//	cmd.AddCommand(CmdXXXX())
//
//	// this line is used by starport scaffolding # 1

// ------------------

// x/identity/client/cli/query_xxxx.go (new file)
//package cli
//
//import (
//	"strconv"
//
//	"github.com/cosmos/cosmos-sdk/client"
//	"github.com/cosmos/cosmos-sdk/client/flags"
//	"github.com/spf13/cobra"
//	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
//)
//
//var _ = strconv.Itoa(0)
//
//func CmdXXXX() *cobra.Command {
//	cmd := &cobra.Command{
//		Use:   "xxxx",
//		Short: "Query XXXX",
//		Args:  cobra.ExactArgs(0),
//		RunE: func(cmd *cobra.Command, args []string) (err error) {
//
//			clientCtx, err := client.GetClientQueryContext(cmd)
//			if err != nil {
//				return err
//			}
//
//			queryClient := types.NewQueryClient(clientCtx)
//
//			params := &types.QueryXXXXRequest{}
//
//			res, err := queryClient.XXXX(cmd.Context(), params)
//			if err != nil {
//				return err
//			}
//
//			return clientCtx.PrintProto(res)
//		},
//	}
//
//	flags.AddQueryFlagsToCmd(cmd)
//
//	return cmd
//}

// -------------------

// x/identity/keeper/query_xxxx.go (new file)
// package keeper
//
// import (
// 	"context"
//
// 	sdk "github.com/cosmos/cosmos-sdk/types"
// 	"gitlab.qredo.com/qrdochain/fusionchain/x/identity/types"
// 	"google.golang.org/grpc/codes"
// 	"google.golang.org/grpc/status"
// )
//
// func (k Keeper) XXXX(goCtx context.Context, req *types.QueryXXXXRequest) (*types.QueryXXXXResponse, error) {
// 	if req == nil {
// 		return nil, status.Error(codes.InvalidArgument, "invalid request")
// 	}
//
// 	ctx := sdk.UnwrapSDKContext(goCtx)
//
// 	// TODO: Process the query
// 	_ = ctx
//
// 	return &types.QueryXXXXResponse{}, nil
// }
