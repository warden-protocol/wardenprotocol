package cli

import (
	"encoding/base64"
	"fmt"
	"strconv"
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
		GetCmdRelay(),
		GetCmdRelayWithContractCall(),
	)

	return cmd
}

func GetCmdRelay() *cobra.Command {
	cmd := &cobra.Command{
		Use:   `relay [destination-chain] [warden-contract-address] [timestamp] [denoms] [amount]`,
		Args:  cobra.ExactArgs(5),
		Short: "Relay oracle data via Axelar GMP",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			if args[0] == "" {
				return fmt.Errorf("destination-chain cannot be empty")
			}
			if args[1] == "" {
				return fmt.Errorf("ojo-contract-address cannot be empty")
			}
			if args[2] == "" {
				return fmt.Errorf("timestamp cannot be empty")
			}
			if args[3] == "" {
				return fmt.Errorf("denoms cannot be empty")
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

			// convert denoms to string array
			denoms := strings.Split(args[3], ",")

			// convert timestamp string to int64
			timestamp, err := strconv.ParseInt(args[2], 10, 64)
			if err != nil {
				return err
			}

			commandSelector, err := base64.StdEncoding.DecodeString("")
			if err != nil {
				return err
			}
			commandParams, err := base64.StdEncoding.DecodeString("")
			if err != nil {
				return err
			}

			msg := types.NewMsgRelay(
				clientCtx.GetFromAddress().String(),
				args[0],         // destination-chain e.g. "Ethereum"
				args[1],         // ojo-contract-address e.g. "0x001"
				"",              // customer-contract-address e.g. "0x002"
				tokens,          // amount
				denoms,          // denoms
				commandSelector, // command-selector
				commandParams,   // command-params
				timestamp,       // timestamp
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

func GetCmdRelayWithContractCall() *cobra.Command {
	cmd := &cobra.Command{
		Use: `relay-with-contract-call [destination-chain] [ojo-contract-address] [client-contract-address] ` +
			`[command-selector] [command-params] [timestamp] [denoms] [amount]`,
		Args:  cobra.ExactArgs(8),
		Short: "Relay oracle data via Axelar GMP and call contract method with oracle data",
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			if args[0] == "" {
				return fmt.Errorf("destination-chain cannot be empty")
			}
			if args[1] == "" {
				return fmt.Errorf("ojo-contract-address cannot be empty")
			}
			if args[2] == "" {
				return fmt.Errorf("client-contract-address cannot be empty")
			}
			if args[3] == "" {
				return fmt.Errorf("command-selector cannot be empty")
			}
			if args[4] == "" {
				return fmt.Errorf("command-params cannot be empty")
			}
			if args[5] == "" {
				return fmt.Errorf("timestamp cannot be empty")
			}
			if args[6] == "" {
				return fmt.Errorf("denoms cannot be empty")
			}

			tokens := sdk.Coin{}
			// normalize the coin denom
			if args[7] != "" {
				coin, err := sdk.ParseCoinNormalized(args[7])
				if err != nil {
					return err
				}
				if !strings.HasPrefix(coin.Denom, "ibc/") {
					denomTrace := ibctransfertypes.ParseDenomTrace(coin.Denom)
					coin.Denom = denomTrace.IBCDenom()
				}
				tokens = coin
			}

			// convert denoms to string array
			denoms := strings.Split(args[6], ",")

			// convert timestamp string to int64
			timestamp, err := strconv.ParseInt(args[5], 10, 64)
			if err != nil {
				return err
			}

			commandSelector, err := base64.StdEncoding.DecodeString(args[3])
			if err != nil {
				return err
			}
			commandParams, err := base64.StdEncoding.DecodeString(args[4])
			if err != nil {
				return err
			}

			msg := types.NewMsgRelay(
				clientCtx.GetFromAddress().String(),
				args[0],         // destination-chain e.g. "Ethereum"
				args[1],         // ojo-contract-address e.g. "0x001"
				args[2],         // customer-contract-address e.g. "0x002"
				tokens,          // amount
				denoms,          // denoms
				commandSelector, // command-selector
				commandParams,   // command-params
				timestamp,       // timestamp
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
