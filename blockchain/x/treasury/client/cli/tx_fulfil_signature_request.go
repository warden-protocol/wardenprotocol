package cli

import (
	"encoding/hex"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/qredo/fusionchain/x/treasury/types"
	"github.com/spf13/cobra"
)

var _ = strconv.Itoa(0)

func CmdFulfilSignatureRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "fulfil-signature-request [request-id] [signed-data]",
		Short: "Broadcast message FulfilSignatureRequest",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) (err error) {

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			requestID, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			status := types.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED

			signedData, err := hex.DecodeString(args[1])
			if err != nil {
				return err
			}

			result := &types.MsgFulfilSignatureRequest_Payload{
				Payload: &types.MsgSignedData{
					SignedData: signedData,
				},
			}

			msg := types.NewMsgFulfilSignatureRequest(
				clientCtx.GetFromAddress().String(),
				requestID,
				status,
				result,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
