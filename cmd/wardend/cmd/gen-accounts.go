package cmd

import (
	"bufio"
	"encoding/json"
	"fmt"
	"time"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	"github.com/cosmos/cosmos-sdk/server"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"

	evmoskr "github.com/evmos/evmos/v18/crypto/keyring"

	sdktypes "github.com/cosmos/cosmos-sdk/types"
	authvestingtypes "github.com/cosmos/cosmos-sdk/x/auth/vesting/types"
	vestingcli "github.com/evmos/evmos/v18/x/vesting/client/cli"
	vestingtypes "github.com/evmos/evmos/v18/x/vesting/types"
)

const (
	flagVestingStart = "vesting-start-time"
)

func AddGenesisAccountCmd(defaultNodeHome string) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-genesis-account ADDRESS_OR_KEY_NAME COIN...",
		Short: "Add a genesis account to genesis.json",
		Long: `Add a genesis account to genesis.json. The provided account must specify
the account address or key name and a list of initial coins. If a key name is given,
the address will be looked up in the local Keybase. The list of initial tokens must
contain valid denominations. Accounts may optionally be supplied with vesting parameters.
`,
		Args: cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config

			config.SetRoot(clientCtx.HomeDir)

			var kr keyring.Keyring
			addr, err := sdktypes.AccAddressFromBech32(args[0])
			if err != nil {
				inBuf := bufio.NewReader(cmd.InOrStdin())
				keyringBackend, _ := cmd.Flags().GetString(flags.FlagKeyringBackend)
				if keyringBackend != "" && clientCtx.Keyring == nil {
					var err error
					kr, err = keyring.New(
						sdktypes.KeyringServiceName(),
						keyringBackend,
						clientCtx.HomeDir,
						inBuf,
						clientCtx.Codec,
						evmoskr.Option(),
					)
					if err != nil {
						return err
					}
				} else {
					kr = clientCtx.Keyring
				}

				info, err := kr.Key(args[0])
				if err != nil {
					return fmt.Errorf("failed to get key info from Keyring: %w", err)
				}

				addr, err = info.GetAddress()
				if err != nil {
					return fmt.Errorf("failed to get address from Keyring: %w", err)
				}
			}

			coins, err := sdktypes.ParseCoinsNormalized(args[1])
			if err != nil {
				return fmt.Errorf("failed to parse coins: %w", err)
			}

			vestingStart, err := cmd.Flags().GetInt64(flagVestingStart)
			if err != nil {
				return err
			}

			// create concrete account type based on input parameters
			var genAccount authtypes.GenesisAccount

			balances := banktypes.Balance{Address: addr.String(), Coins: coins.Sort()}
			baseAccount := authtypes.NewBaseAccount(addr, nil, 0, 0)

			clawback, _ := cmd.Flags().GetBool(vestingcli.FlagClawback)

			// Create ClawbackvestingAccount or standard Evmos account
			switch {
			case clawback:
				// ClawbackvestingAccount requires clawback, lockup, vesting, and funder
				// flags
				var (
					lockupStart                   int64
					lockupPeriods, vestingPeriods authvestingtypes.Periods
				)

				// Get funder addr which can perform clawback
				funderStr, err := cmd.Flags().GetString(vestingcli.FlagFunder)
				if err != nil {
					return fmt.Errorf("must specify the clawback vesting account funder with the --funder flag")
				}
				funder, err := sdktypes.AccAddressFromBech32(funderStr)
				if err != nil {
					return err
				}

				// Read lockup and vesting schedules
				lockupFile, _ := cmd.Flags().GetString(vestingcli.FlagLockup)
				vestingFile, _ := cmd.Flags().GetString(vestingcli.FlagVesting)

				if lockupFile == "" && vestingFile == "" {
					return fmt.Errorf("must specify at least one of %s or %s", vestingcli.FlagLockup, vestingcli.FlagVesting)
				}

				if lockupFile != "" {
					lockupStart, lockupPeriods, err = vestingcli.ReadScheduleFile(lockupFile)
					if err != nil {
						return err
					}
				}

				if vestingFile != "" {
					vestingStart, vestingPeriods, err = vestingcli.ReadScheduleFile(vestingFile)
					if err != nil {
						return err
					}
				}

				// Align schedules in case lockup and vesting schedules have different
				// start_time
				commonStart, _ := vestingtypes.AlignSchedules(lockupStart, vestingStart, lockupPeriods, vestingPeriods)

				// Get total lockup and vesting from schedules
				vestingCoins := sdktypes.NewCoins()
				for _, period := range vestingPeriods {
					vestingCoins = vestingCoins.Add(period.Amount...)
				}

				lockupCoins := sdktypes.NewCoins()
				for _, period := range lockupPeriods {
					lockupCoins = lockupCoins.Add(period.Amount...)
				}

				// If lockup absent, default to an instant unlock schedule
				if !vestingCoins.IsZero() && len(lockupPeriods) == 0 {
					lockupPeriods = []authvestingtypes.Period{
						{Length: 0, Amount: vestingCoins},
					}
					lockupCoins = vestingCoins
				}

				// If vesting absent, default to an instant vesting schedule
				if !lockupCoins.IsZero() && len(vestingPeriods) == 0 {
					vestingPeriods = []authvestingtypes.Period{
						{Length: 0, Amount: lockupCoins},
					}
					vestingCoins = lockupCoins
				}

				// The vesting and lockup schedules must describe the same total amount.
				// IsEqual can panic, so use (a == b) <=> (a <= b && b <= a).
				if !vestingtypes.CoinEq(lockupCoins, vestingCoins) {
					return fmt.Errorf("lockup (%s) and vesting (%s) amounts must be equal",
						lockupCoins, vestingCoins,
					)
				}

				// Check if account balance is aligned with vesting schedule
				if !vestingCoins.Equal(coins) {
					return fmt.Errorf("vestingCoins (%s) and coin balance (%s) amounts must be equal",
						vestingCoins, coins,
					)
				}

				genAccount = vestingtypes.NewClawbackVestingAccount(
					baseAccount,
					funder,
					vestingCoins,
					time.Unix(commonStart, 0),
					lockupPeriods,
					vestingPeriods,
				)

			default:
				genAccount = baseAccount
			}

			if err := genAccount.Validate(); err != nil {
				return fmt.Errorf("failed to validate new genesis account: %w", err)
			}

			genFile := config.GenesisFile()
			appState, genDoc, err := genutiltypes.GenesisStateFromGenFile(genFile)
			if err != nil {
				return fmt.Errorf("failed to unmarshal genesis state: %w", err)
			}

			authGenState := authtypes.GetGenesisStateFromAppState(clientCtx.Codec, appState)

			accs, err := authtypes.UnpackAccounts(authGenState.Accounts)
			if err != nil {
				return fmt.Errorf("failed to get accounts from any: %w", err)
			}

			if accs.Contains(addr) {
				return fmt.Errorf("cannot add account at existing address %s", addr)
			}

			// Add the new account to the set of genesis accounts and sanitize the
			// accounts afterwards.
			accs = append(accs, genAccount)
			accs = authtypes.SanitizeGenesisAccounts(accs)

			genAccs, err := authtypes.PackAccounts(accs)
			if err != nil {
				return fmt.Errorf("failed to convert accounts into any's: %w", err)
			}
			authGenState.Accounts = genAccs

			authGenStateBz, err := clientCtx.Codec.MarshalJSON(&authGenState)
			if err != nil {
				return fmt.Errorf("failed to marshal auth genesis state: %w", err)
			}

			appState[authtypes.ModuleName] = authGenStateBz

			bankGenState := banktypes.GetGenesisStateFromAppState(clientCtx.Codec, appState)
			bankGenState.Balances = append(bankGenState.Balances, balances)
			bankGenState.Balances = banktypes.SanitizeGenesisBalances(bankGenState.Balances)
			bankGenState.Supply = bankGenState.Supply.Add(balances.Coins...)

			bankGenStateBz, err := clientCtx.Codec.MarshalJSON(bankGenState)
			if err != nil {
				return fmt.Errorf("failed to marshal bank genesis state: %w", err)
			}

			appState[banktypes.ModuleName] = bankGenStateBz

			appStateJSON, err := json.Marshal(appState)
			if err != nil {
				return fmt.Errorf("failed to marshal application genesis state: %w", err)
			}

			genDoc.AppState = appStateJSON
			return genutil.ExportGenesisFile(genDoc, genFile)
		},
	}

	cmd.Flags().String(flags.FlagHome, defaultNodeHome, "The application home directory")
	cmd.Flags().String(flags.FlagKeyringBackend, flags.DefaultKeyringBackend, "Select keyring's backend (os|file|kwallet|pass|test)")
	cmd.Flags().Int64(flagVestingStart, 0, "schedule start time (unix epoch) for vesting accounts")
	cmd.Flags().Bool(vestingcli.FlagClawback, false, "create clawback account")
	cmd.Flags().String(vestingcli.FlagFunder, "", "funder address for clawback")
	cmd.Flags().String(vestingcli.FlagLockup, "", "path to file containing unlocking periods for a clawback vesting account")
	cmd.Flags().String(vestingcli.FlagVesting, "", "path to file containing vesting periods for a clawback vesting account")
	flags.AddQueryFlagsToCmd(cmd)

	return cmd
}
