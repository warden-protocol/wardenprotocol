package cli

import (
	"encoding/hex"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cobra"
	"gitlab.qredo.com/qrdochain/fusionchain/x/treasury/types"
)

var _ = strconv.Itoa(0)

func CmdApproveWalletRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "approve-wallet-request [request_id]  [hex_public_key]",
		Short: "Broadcast message UpdateWalletRequest approving the wallet request",
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

			publicKey, err := hex.DecodeString(args[1])
			if err != nil {
				return err
			}

			status := types.WalletRequestStatus_WALLET_REQUEST_STATUS_APPROVED
			result := types.NewMsgUpdateWalletRequestWallet(publicKey)

			msg := types.NewMsgUpdateWalletRequest(
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

func CmdRejectWalletRequest() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "reject-wallet-request [request_id]  [reason]",
		Short: "Broadcast message UpdateWalletRequest rejecting the wallet request",
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

			status := types.WalletRequestStatus_WALLET_REQUEST_STATUS_APPROVED
			result := types.NewMsgUpdateWalletRequestReject(args[1])

			msg := types.NewMsgUpdateWalletRequest(
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
