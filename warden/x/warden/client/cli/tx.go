package cli

import (
	"encoding/base64"
	"fmt"
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/version"
	"github.com/spf13/cobra"

	actcli "github.com/warden-protocol/wardenprotocol/warden/x/act/client"
	"github.com/warden-protocol/wardenprotocol/warden/x/warden/types/v1beta3"
)

// NewTxCmd returns a root CLI command handler for x/warden transaction commands.
func NewTxCmd() *cobra.Command {
	txCmd := &cobra.Command{
		Use:                        v1beta3.ModuleName,
		Short:                      "Warden transaction subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	txCmd.AddCommand(
		NewActionTxCmd(),
		FulfillKeyRequestTxCmd(),
		RejectKeyRequestTxCmd(),
		FulfillSignRequestTxCmd(),
		RejectSignRequestTxCmd(),
		NewInferenceRequestTxCmd(),
	)

	return txCmd
}

func NewActionTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-action",
		Short: "Create a new Action subcommands",
	}

	cmd.AddCommand(
		actcli.RegisterActionCmd(&v1beta3.MsgAddSpaceOwner{}, "Add a new owner to a Space"),
		actcli.RegisterActionCmd(&v1beta3.MsgNewKeyRequest{}, "Request a new Key"),
		actcli.RegisterActionCmd(&v1beta3.MsgNewSignRequest{}, "Request a signature"),
		actcli.RegisterActionCmd(&v1beta3.MsgRemoveSpaceOwner{}, "Remove an owner from a Space"),
		actcli.RegisterActionCmd(&v1beta3.MsgUpdateKey{}, "Update a Key information"),
		actcli.RegisterActionCmd(&v1beta3.MsgUpdateSpace{}, "Update a Space information"),
	)

	return cmd
}

func FulfillKeyRequestTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "fulfill-key-request [request-id] [public-key-data]",
		Short: "Fulfill a key request providing the public key.",
		Long: `Fulfill a key request providing the public key.
The sender of this transaction must be a writer of the Keychain for the request.
The public key must be a base64 encoded string.`,
		Example: fmt.Sprintf("%s tx warden fulfill-key-request 1234 aGV5dGhlcmU=", version.AppName),
		Args:    cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			reqId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			pk, err := base64.StdEncoding.DecodeString(args[1])
			if err != nil {
				return err
			}

			msg := &v1beta3.MsgFulfilKeyRequest{
				Creator:   clientCtx.GetFromAddress().String(),
				Status:    v1beta3.KeyRequestStatus_KEY_REQUEST_STATUS_FULFILLED,
				RequestId: reqId,
				Result:    v1beta3.NewMsgFulfilKeyRequestKey(pk),
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func RejectKeyRequestTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "reject-key-request [request-id] [reason]",
		Short: "Reject a key request providing the reason.",
		Long: `Reject a key request providing a reason.
The sender of this transaction must be a writer of the Keychain for the request.`,
		Example: fmt.Sprintf("%s tx warden reject-key-request 1234 'something happened'", version.AppName),
		Args:    cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			reqId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			msg := &v1beta3.MsgFulfilKeyRequest{
				Creator:   clientCtx.GetFromAddress().String(),
				Status:    v1beta3.KeyRequestStatus_KEY_REQUEST_STATUS_REJECTED,
				RequestId: reqId,
				Result:    v1beta3.NewMsgFulfilKeyRequestReject(args[1]),
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func FulfillSignRequestTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "fulfill-sign-request [request-id] [sign-data]",
		Short: "Fulfill a signature request providing the signature.",
		Long: `Fulfill a signature request providing the signature.
The sender of this transaction must be a writer of the Keychain for the request.
The sign-data must be a base64 encoded string.`,
		Example: fmt.Sprintf("%s tx warden fulfill-sign-request 1234 aGV5dGhlcmU=", version.AppName),
		Args:    cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			reqId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			sig, err := base64.StdEncoding.DecodeString(args[1])
			if err != nil {
				return err
			}

			msg := &v1beta3.MsgFulfilSignRequest{
				Creator:   clientCtx.GetFromAddress().String(),
				RequestId: reqId,
				Status:    v1beta3.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED,
				Result: &v1beta3.MsgFulfilSignRequest_Payload{
					Payload: &v1beta3.MsgSignedData{
						SignedData: sig,
					},
				},
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func RejectSignRequestTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "reject-sign-request [request-id] [reject-reason]",
		Short: "Reject a signature request providing a reason.",
		Long: `Reject a signature request providing a reason.
The sender of this transaction must be a writer of the Keychain for the request.`,
		Example: fmt.Sprintf("%s tx warden reject-sign-request 1234 oops", version.AppName),
		Args:    cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			reqId, err := strconv.ParseUint(args[0], 10, 64)
			if err != nil {
				return err
			}

			msg := &v1beta3.MsgFulfilSignRequest{
				Creator:   clientCtx.GetFromAddress().String(),
				RequestId: reqId,
				Status:    v1beta3.SignRequestStatus_SIGN_REQUEST_STATUS_FULFILLED,
				Result: &v1beta3.MsgFulfilSignRequest_RejectReason{
					RejectReason: args[1],
				},
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func NewInferenceRequestTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "new-inference-request --input [input] --adversary-mode [true,false]",
		Short: "Create a new inference request",
		Long: `Create a new inference request by providing an input.

The input is a list of token denoms.

E.g. the list:
	ward, usdt, atom
will be interpreted as list of 3 elements:
	["ward", "usdt", "atom"]
`,
		Example: fmt.Sprintf("%s tx warden new-inference-request --input ward,usdt,atom --adversary-mode true", version.AppName),
		Args:    cobra.ExactArgs(0),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			input, err := cmd.Flags().GetStringSlice("input")
			if err != nil {
				return err
			}

			if len(input) < 1 {
				return fmt.Errorf("input must contain at least one token")
			}

			adversaryMode, err := cmd.Flags().GetBool("adversary-mode")
			if err != nil {
				return err
			}

			solverInput := v1beta3.SolverInput{
				Tokens:        input,
				AdversaryMode: adversaryMode,
			}

			callbackContractAddr, err := cmd.Flags().GetString("callback-contract-addr")
			if err != nil {
				return err
			}

			msg := &v1beta3.MsgNewInferenceRequest{
				Creator:          clientCtx.GetFromAddress().String(),
				Input:            &solverInput,
				ContractCallback: callbackContractAddr,
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)
	cmd.Flags().StringSlice("input", nil, "Input tokens")
	cmd.Flags().Bool("adversary-mode", true, "Run in adversary mode")
	cmd.Flags().String("callback-contract-addr", "", "CosmWasm address of the contract to call after inference is done")

	return cmd
}
