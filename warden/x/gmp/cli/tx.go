package cli

import (
	"encoding/base64"
	"fmt"
	"strings"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdk "github.com/cosmos/cosmos-sdk/types"
	ibctransfertypes "github.com/cosmos/ibc-go/v8/modules/apps/transfer/types"
	"github.com/spf13/cobra"
	"github.com/warden-protocol/wardenprotocol/warden/x/gmp/types"
)

func GetTxCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Transaction commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	cmd.AddCommand(
		GetCmdBridge(),
		GetCmdBridgeWithContractCall(),
	)

	return cmd
}

func GetCmdBridge() *cobra.Command {
	cmd := &cobra.Command{
		Use:   `bridge [destination-chain] [warden-contract-address] [amount]`,
		Args:  cobra.ExactArgs(3),
		Short: "Bridge data via Axelar GMP",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			if args[0] == "" {
				return fmt.Errorf("destination-chain cannot be empty")
			}
			if args[1] == "" {
				return fmt.Errorf("warden-contract-address cannot be empty")
			}

			tokens := sdk.Coin{}
			// normalize the coin denom
			if args[2] != "" {
				coin, err := sdk.ParseCoinNormalized(args[2])
				if err != nil {
					return err
				}
				if !strings.HasPrefix(coin.Denom, "ibc/") {
					denomTrace := ibctransfertypes.ParseDenomTrace(coin.Denom)
					coin.Denom = denomTrace.IBCDenom()
				}
				tokens = coin
			}

			destinationContractCalldata, err := base64.StdEncoding.DecodeString("")
			if err != nil {
				return err
			}

			msg := types.NewMsgBridge(
				clientCtx.GetFromAddress().String(),
				args[0],                     // destination-chain e.g. "Ethereum"
				args[1],                     // warden-contract-address e.g. "0x001"
				"",                          // destination-contract-address e.g. "0x002"
				destinationContractCalldata, // destination-contract-calldata
				tokens,                      // amount
			)
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}

func GetCmdBridgeWithContractCall() *cobra.Command {
	cmd := &cobra.Command{
		Use: `bridge-with-contract-call [destination-chain] [warden-contract-address] ` +
			`[destination-contract-address] [destination-contract-calldata] [amount]`,
		Args:  cobra.ExactArgs(5),
		Short: "Bridge data via Axelar GMP and call contract method with data",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			if args[0] == "" {
				return fmt.Errorf("destination-chain cannot be empty")
			}
			if args[1] == "" {
				return fmt.Errorf("warden-contract-address cannot be empty")
			}
			if args[2] == "" {
				return fmt.Errorf("destination-contract-address cannot be empty")
			}
			if args[3] == "" {
				return fmt.Errorf("destination-contract-calldata cannot be empty")
			}

			tokens := sdk.Coin{}
			// normalize the coin denom
			if args[4] != "" {
				coin, err := sdk.ParseCoinNormalized(args[4])
				if err != nil {
					return err
				}
				if !strings.HasPrefix(coin.Denom, "ibc/") {
					denomTrace := ibctransfertypes.ParseDenomTrace(coin.Denom)
					coin.Denom = denomTrace.IBCDenom()
				}
				tokens = coin
			}

			if len(args[3]) == 0 {
				return fmt.Errorf("destination-contract-calldata cannot be empty")
			}

			destinationContractCalldata, err := base64.StdEncoding.DecodeString(args[3])
			if err != nil {
				return err
			}

			msg := types.NewMsgBridge(
				clientCtx.GetFromAddress().String(),
				args[0],                     // destination-chain e.g. "Ethereum"
				args[1],                     // warden-contract-address e.g. "0x001"
				args[2],                     // destination-contract-address e.g. "0x002"
				destinationContractCalldata, // destination-contract-calldata
				tokens,                      // amount
			)
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}

			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
