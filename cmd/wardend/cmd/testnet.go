package cmd

import (
	"bufio"
	"encoding/json"
	"fmt"
	"net"
	"os"
	"path/filepath"
	"time"

	"cosmossdk.io/log"
	"cosmossdk.io/math"
	cmtconfig "github.com/cometbft/cometbft/config"
	"github.com/cometbft/cometbft/types"
	tmtime "github.com/cometbft/cometbft/types/time"
	dbm "github.com/cosmos/cosmos-db"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	"github.com/cosmos/cosmos-sdk/server"
	srvconfig "github.com/cosmos/cosmos-sdk/server/config"
	servertypes "github.com/cosmos/cosmos-sdk/server/types"
	"github.com/cosmos/cosmos-sdk/testutil"
	"github.com/cosmos/cosmos-sdk/testutil/network"
	simtestutil "github.com/cosmos/cosmos-sdk/testutil/sims"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	moduletestutil "github.com/cosmos/cosmos-sdk/types/module/testutil"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/genutil"
	genutiltypes "github.com/cosmos/cosmos-sdk/x/genutil/types"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	cosmosevmhd "github.com/cosmos/evm/crypto/hd"
	cosmosevmkeyring "github.com/cosmos/evm/crypto/keyring"
	"github.com/cosmos/evm/evmd"
	evmdconfig "github.com/cosmos/evm/evmd/cmd/evmd/config"
	cosmosevmserverconfig "github.com/cosmos/evm/server/config"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
)

var (
	flagNodeDirPrefix     = "node-dir-prefix"
	flagNumValidators     = "validator-count"
	flagOutputDir         = "output-dir"
	flagNodeDaemonHome    = "node-daemon-home"
	flagStartingIPAddress = "starting-ip-address"
	flagsUseDocker        = "use-docker"
	flagEnableLogging     = "enable-logging"
	flagGRPCAddress       = "grpc.address"
	flagRPCAddress        = "rpc.address"
	flagAPIAddress        = "api.address"
	flagPrintMnemonic     = "print-mnemonic"
	flagSingleHost        = "single-host"
	flagCommitTimeout     = "commit-timeout"
)

type initArgs struct {
	algo              string
	chainID           string
	keyringBackend    string
	minGasPrices      string
	nodeDaemonHome    string
	nodeDirPrefix     string
	numValidators     int
	outputDir         string
	startingIPAddress string
	singleMachine     bool
	useDocker         bool
}

type startArgs struct {
	algo          string
	apiAddress    string
	chainID       string
	enableLogging bool
	grpcAddress   string
	minGasPrices  string
	numValidators int
	outputDir     string
	printMnemonic bool
	rpcAddress    string
}

func addTestnetFlagsToCmd(cmd *cobra.Command) {
	cmd.Flags().Int(flagNumValidators, 4, "Number of validators to initialize the testnet with")
	cmd.Flags().StringP(flagOutputDir, "o", "./.testnets", "Directory to store initialization data for the testnet")
	cmd.Flags().String(flags.FlagChainID, "", "genesis file chain-id, if left blank will be randomly created")
	cmd.Flags().String(server.FlagMinGasPrices, "0.000006"+sdk.DefaultBondDenom, "Minimum gas prices to accept for transactions; All fees in a tx must meet this minimum (e.g. 0.01photino,0.001stake)")
	cmd.Flags().String(flags.FlagKeyType, string(cosmosevmhd.EthSecp256k1Type), "Key signing algorithm to generate keys for")

	// support old flags name for backwards compatibility
	cmd.Flags().SetNormalizeFunc(func(f *pflag.FlagSet, name string) pflag.NormalizedName {
		if name == "algo" {
			name = flags.FlagKeyType
		}

		return pflag.NormalizedName(name)
	})
}

// NewTestnetCmd creates a root testnet command with subcommands to:
// 1. run an in-process testnet or
// 2. initialize validator configuration files for running a multi-validator testnet in a separate process or
// 3. update application and consensus state with the local validator info.
func NewTestnetCmd(mbm module.BasicManager, genBalIterator banktypes.GenesisBalancesIterator) *cobra.Command {
	testnetCmd := &cobra.Command{
		Use:                        "testnet",
		Short:                      "subcommands for starting or configuring local testnets",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	testnetCmd.AddCommand(testnetStartCmd())
	testnetCmd.AddCommand(testnetInitFilesCmd(mbm, genBalIterator))

	return testnetCmd
}

// testnetInitFilesCmd returns a cmd to initialize all files for tendermint testnet and application.
func testnetInitFilesCmd(mbm module.BasicManager, genBalIterator banktypes.GenesisBalancesIterator) *cobra.Command {
	cmd := &cobra.Command{
		Use:   "init-files",
		Short: "Initialize config directories & files for a multi-validator testnet running locally via separate processes (e.g. Docker Compose or similar)",
		Long: `init-files will setup "v" number of directories and populate each with
necessary files (private validator, genesis, config, etc.) for running "v" validator nodes.

Booting up a network with these validator folders is intended to be used with Docker Compose,
or a similar setup where each node has a manually configurable IP address.

Note, strict routability for addresses is turned off in the config file.

Example:
	evmd testnet init-files --v 4 --output-dir ./.testnets --starting-ip-address 192.168.10.2
	`,
		RunE: func(cmd *cobra.Command, _ []string) error {
			clientCtx, err := client.GetClientQueryContext(cmd)
			if err != nil {
				return err
			}

			clientCtx = clientCtx.WithKeyringOptions(cosmosevmkeyring.Option())

			serverCtx := server.GetServerContextFromCmd(cmd)
			config := serverCtx.Config

			args := initArgs{}
			args.outputDir, _ = cmd.Flags().GetString(flagOutputDir)
			args.keyringBackend, _ = cmd.Flags().GetString(flags.FlagKeyringBackend)
			args.chainID, _ = cmd.Flags().GetString(flags.FlagChainID)
			args.useDocker, _ = cmd.Flags().GetBool(flagsUseDocker)
			args.minGasPrices, _ = cmd.Flags().GetString(server.FlagMinGasPrices)
			args.nodeDirPrefix, _ = cmd.Flags().GetString(flagNodeDirPrefix)
			args.nodeDaemonHome, _ = cmd.Flags().GetString(flagNodeDaemonHome)
			args.startingIPAddress, _ = cmd.Flags().GetString(flagStartingIPAddress)
			args.numValidators, _ = cmd.Flags().GetInt(flagNumValidators)
			args.singleMachine, _ = cmd.Flags().GetBool(flagSingleHost)
			config.Consensus.TimeoutCommit, err = cmd.Flags().GetDuration(flagCommitTimeout)
			if err != nil {
				return err
			}
			args.algo, _ = cmd.Flags().GetString(flags.FlagKeyType)

			return initTestnetFiles(clientCtx, cmd, config, mbm, genBalIterator, args)
		},
	}

	addTestnetFlagsToCmd(cmd)
	cmd.Flags().Duration(flagCommitTimeout, 5*time.Second, "Time to wait after a block commit before starting on the new height")
	cmd.Flags().Bool(flagSingleHost, false, "Cluster runs on a single host machine with different ports")
	cmd.Flags().String(flagNodeDirPrefix, "node", "Prefix the directory name for each node with (node results in node0, node1, ...)")
	cmd.Flags().String(flagNodeDaemonHome, "evmd", "Home directory of the node's daemon configuration")
	cmd.Flags().String(flagStartingIPAddress, "192.168.0.1", "Starting IP address (192.168.0.1 results in persistent peers list ID0@192.168.0.1:46656, ID1@192.168.0.2:46656, ...)")
	cmd.Flags().String(flags.FlagKeyringBackend, flags.DefaultKeyringBackend, "Select keyring's backend (os|file|test)")
	cmd.Flags().Bool(flagsUseDocker, false, "test network via docker")

	return cmd
}

// testnetStartCmd returns a cmd to start multi validator in-process testnet.
func testnetStartCmd() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "start",
		Short: "Launch an in-process multi-validator testnet",
		Long: `testnet will launch an in-process multi-validator testnet,
and generate "v" directories, populated with necessary validator configuration files
(private validator, genesis, config, etc.).

Example:
	evmd testnet --v 4 --output-dir ./.testnets
	`,
		RunE: func(cmd *cobra.Command, _ []string) error {
			args := startArgs{}
			args.outputDir, _ = cmd.Flags().GetString(flagOutputDir)
			args.chainID, _ = cmd.Flags().GetString(flags.FlagChainID)
			args.minGasPrices, _ = cmd.Flags().GetString(server.FlagMinGasPrices)
			args.numValidators, _ = cmd.Flags().GetInt(flagNumValidators)
			args.algo, _ = cmd.Flags().GetString(flags.FlagKeyType)
			args.enableLogging, _ = cmd.Flags().GetBool(flagEnableLogging)
			args.rpcAddress, _ = cmd.Flags().GetString(flagRPCAddress)
			args.apiAddress, _ = cmd.Flags().GetString(flagAPIAddress)
			args.grpcAddress, _ = cmd.Flags().GetString(flagGRPCAddress)
			args.printMnemonic, _ = cmd.Flags().GetBool(flagPrintMnemonic)

			return startTestnet(cmd, args)
		},
	}

	addTestnetFlagsToCmd(cmd)
	cmd.Flags().Bool(flagEnableLogging, false, "Enable INFO logging of tendermint validator nodes")
	cmd.Flags().String(flagRPCAddress, "tcp://0.0.0.0:26657", "the RPC address to listen on")
	cmd.Flags().String(flagAPIAddress, "tcp://0.0.0.0:1317", "the address to listen on for REST API")
	cmd.Flags().String(flagGRPCAddress, "0.0.0.0:9090", "the gRPC server address to listen on")
	cmd.Flags().Bool(flagPrintMnemonic, true, "print mnemonic of first validator to stdout for manual testing")

	return cmd
}

const nodeDirPerm = 0o755

// initTestnetFiles initializes testnet files for a testnet to be run in a separate process.
func initTestnetFiles(
	clientCtx client.Context,
	cmd *cobra.Command,
	nodeConfig *cmtconfig.Config,
	mbm module.BasicManager,
	genBalIterator banktypes.GenesisBalancesIterator,
	args initArgs,
) error {
	if args.chainID == "" {
		args.chainID = "local-4221"
	}

	nodeIDs := make([]string, args.numValidators)
	valPubKeys := make([]cryptotypes.PubKey, args.numValidators)

	appConfig := srvconfig.DefaultConfig()
	appConfig.MinGasPrices = args.minGasPrices
	appConfig.API.Enable = true
	appConfig.Telemetry.Enabled = true
	appConfig.Telemetry.PrometheusRetentionTime = 60
	appConfig.Telemetry.EnableHostnameLabel = false
	appConfig.Telemetry.GlobalLabels = [][]string{{"chain_id", args.chainID}}
	evm := cosmosevmserverconfig.DefaultEVMConfig()
	evm.EVMChainID = evmdconfig.EVMChainID
	evmCfg := evmdconfig.EVMAppConfig{
		Config:  *appConfig,
		EVM:     *evm,
		JSONRPC: *cosmosevmserverconfig.DefaultJSONRPCConfig(),
		TLS:     *cosmosevmserverconfig.DefaultTLSConfig(),
	}

	var (
		genAccounts []authtypes.GenesisAccount
		genBalances []banktypes.Balance
		genFiles    []string
	)

	const (
		sdkRPCPort  = 26657
		sdkAPIPort  = 1317
		sdkGRPCPort = 9090

		// evmGRPC           = 9900 // TODO: maybe need this? idk.
		evmJSONRPC        = 8545
		evmJSONRPCWS      = 8546
		evmJSONRPCMetrics = 6065
	)

	p2pPortStart := 26656

	inBuf := bufio.NewReader(cmd.InOrStdin())
	// generate private keys, node IDs, and initial transactions
	for i := range args.numValidators {
		var (
			portOffset    int
			evmPortOffset int
		)

		if args.singleMachine {
			portOffset = i
			evmPortOffset = i * 10
			p2pPortStart = 16656
			nodeConfig.P2P.AddrBookStrict = false
			nodeConfig.P2P.PexReactor = false
			nodeConfig.P2P.AllowDuplicateIP = true
			evmCfg.API.Address = fmt.Sprintf("tcp://0.0.0.0:%d", sdkAPIPort+portOffset)
			evmCfg.GRPC.Address = fmt.Sprintf("0.0.0.0:%d", sdkGRPCPort+portOffset)
			evmCfg.JSONRPC.Address = fmt.Sprintf("127.0.0.1:%d", evmJSONRPC+evmPortOffset)
			evmCfg.JSONRPC.MetricsAddress = fmt.Sprintf("127.0.0.1:%d", evmJSONRPCMetrics+evmPortOffset)
			evmCfg.JSONRPC.WsAddress = fmt.Sprintf("127.0.0.1:%d", evmJSONRPCWS+evmPortOffset)
		}

		nodeDirName := fmt.Sprintf("%s%d", args.nodeDirPrefix, i)
		nodeDir := filepath.Join(args.outputDir, nodeDirName, args.nodeDaemonHome)
		gentxsDir := filepath.Join(args.outputDir, "gentxs")

		nodeConfig.SetRoot(nodeDir)
		nodeConfig.Moniker = nodeDirName
		nodeConfig.RPC.ListenAddress = fmt.Sprintf("tcp://0.0.0.0:%d", sdkRPCPort+portOffset)

		if err := os.MkdirAll(filepath.Join(nodeDir, "config"), nodeDirPerm); err != nil {
			_ = os.RemoveAll(args.outputDir)
			return err
		}

		var (
			err error
			ip  string
		)
		if args.singleMachine {
			ip = "0.0.0.0"
		} else {
			ip, err = getIP(i, args.startingIPAddress)
			if err != nil {
				_ = os.RemoveAll(args.outputDir)
				return err
			}
		}

		nodeIDs[i], valPubKeys[i], err = genutil.InitializeNodeValidatorFiles(nodeConfig)
		if err != nil {
			_ = os.RemoveAll(args.outputDir)
			return err
		}

		memo := fmt.Sprintf("%s@%s:%d", nodeIDs[i], ip, p2pPortStart+portOffset)

		genFiles = append(genFiles, nodeConfig.GenesisFile())

		kb, err := keyring.New(sdk.KeyringServiceName(), args.keyringBackend, nodeDir, inBuf, clientCtx.Codec, cosmosevmkeyring.Option())
		if err != nil {
			return err
		}

		keyringAlgos, _ := kb.SupportedAlgorithms()

		algo, err := keyring.NewSigningAlgoFromString(args.algo, keyringAlgos)
		if err != nil {
			return err
		}

		addr, secret, err := testutil.GenerateSaveCoinKey(kb, nodeDirName, "", true, algo)
		if err != nil {
			_ = os.RemoveAll(args.outputDir)
			return err
		}

		info := map[string]string{"secret": secret}

		cliPrint, err := json.Marshal(info)
		if err != nil {
			return err
		}

		// save private key seed words
		if err := writeFile(fmt.Sprintf("%v.json", "key_seed"), nodeDir, cliPrint); err != nil {
			return err
		}

		accTokens := sdk.TokensFromConsensusPower(1000, sdk.DefaultPowerReduction)
		accStakingTokens := sdk.TokensFromConsensusPower(500, sdk.DefaultPowerReduction)
		coins := sdk.Coins{
			sdk.NewCoin("testtoken", accTokens),
			sdk.NewCoin(sdk.DefaultBondDenom, accStakingTokens),
		}

		genBalances = append(genBalances, banktypes.Balance{Address: addr.String(), Coins: coins.Sort()})
		genAccounts = append(genAccounts, authtypes.NewBaseAccount(addr, nil, 0, 0))

		valTokens := sdk.TokensFromConsensusPower(100, sdk.DefaultPowerReduction)

		createValMsg, err := stakingtypes.NewMsgCreateValidator(
			sdk.ValAddress(addr).String(),
			valPubKeys[i],
			sdk.NewCoin(sdk.DefaultBondDenom, valTokens),
			stakingtypes.NewDescription(nodeDirName, "", "", "", ""),
			stakingtypes.NewCommissionRates(math.LegacyOneDec(), math.LegacyOneDec(), math.LegacyOneDec()),
			math.OneInt(),
		)
		if err != nil {
			return err
		}

		txBuilder := clientCtx.TxConfig.NewTxBuilder()
		if err := txBuilder.SetMsgs(createValMsg); err != nil {
			return err
		}

		txBuilder.SetMemo(memo)

		txFactory := tx.Factory{}
		txFactory = txFactory.
			WithChainID(args.chainID).
			WithMemo(memo).
			WithKeybase(kb).
			WithTxConfig(clientCtx.TxConfig)

		if err := tx.Sign(cmd.Context(), txFactory, nodeDirName, txBuilder, true); err != nil {
			return err
		}

		txBz, err := clientCtx.TxConfig.TxJSONEncoder()(txBuilder.GetTx())
		if err != nil {
			return err
		}

		if err := writeFile(fmt.Sprintf("%v.json", nodeDirName), gentxsDir, txBz); err != nil {
			return err
		}

		srvconfig.WriteConfigFile(filepath.Join(nodeDir, "config", "app.toml"), evmCfg)
	}

	if err := initGenFiles(clientCtx, mbm, args.chainID, genAccounts, genBalances, genFiles, args.numValidators); err != nil {
		return err
	}

	err := collectGenFiles(
		clientCtx, nodeConfig, args.chainID, nodeIDs, valPubKeys, args.numValidators,
		args.outputDir, args.nodeDirPrefix, args.nodeDaemonHome, genBalIterator, clientCtx.TxConfig.SigningContext().ValidatorAddressCodec(),
		sdkRPCPort, p2pPortStart, args.singleMachine,
	)
	if err != nil {
		return err
	}

	cmd.PrintErrf("Successfully initialized %d node directories\n", args.numValidators)

	return nil
}

func initGenFiles(
	clientCtx client.Context, mbm module.BasicManager, chainID string,
	genAccounts []authtypes.GenesisAccount, genBalances []banktypes.Balance,
	genFiles []string, numValidators int,
) error {
	appGenState := mbm.DefaultGenesis(clientCtx.Codec)

	// set the accounts in the genesis state
	var authGenState authtypes.GenesisState
	clientCtx.Codec.MustUnmarshalJSON(appGenState[authtypes.ModuleName], &authGenState)

	accounts, err := authtypes.PackAccounts(genAccounts)
	if err != nil {
		return err
	}

	authGenState.Accounts = accounts
	appGenState[authtypes.ModuleName] = clientCtx.Codec.MustMarshalJSON(&authGenState)

	// set the balances in the genesis state
	var bankGenState banktypes.GenesisState
	clientCtx.Codec.MustUnmarshalJSON(appGenState[banktypes.ModuleName], &bankGenState)

	bankGenState.Balances = banktypes.SanitizeGenesisBalances(genBalances)
	for _, bal := range bankGenState.Balances {
		bankGenState.Supply = bankGenState.Supply.Add(bal.Coins...)
	}

	appGenState[banktypes.ModuleName] = clientCtx.Codec.MustMarshalJSON(&bankGenState)

	appGenStateJSON, err := json.MarshalIndent(appGenState, "", "  ")
	if err != nil {
		return err
	}

	genDoc := types.GenesisDoc{
		ChainID:    chainID,
		AppState:   appGenStateJSON,
		Validators: nil,
	}

	// generate empty genesis files for each validator and save
	for i := 0; i < numValidators; i++ {
    if err := genDoc.SaveAs(genFiles[i]); err != nil {
        return err
    }
}

	return nil
}

func collectGenFiles(
	clientCtx client.Context, nodeConfig *cmtconfig.Config, chainID string,
	nodeIDs []string, valPubKeys []cryptotypes.PubKey, numValidators int,
	outputDir, nodeDirPrefix, nodeDaemonHome string, genBalIterator banktypes.GenesisBalancesIterator, valAddrCodec runtime.ValidatorAddressCodec,
	rpcPortStart, p2pPortStart int,
	singleMachine bool,
) error {
	var appState json.RawMessage

	genTime := tmtime.Now()

	for i := 0; i < numValidators; i++ {
		if singleMachine {
			portOffset := i
			nodeConfig.RPC.ListenAddress = fmt.Sprintf("tcp://0.0.0.0:%d", rpcPortStart+portOffset)
			nodeConfig.P2P.ListenAddress = fmt.Sprintf("tcp://0.0.0.0:%d", p2pPortStart+portOffset)
		}

		nodeDirName := fmt.Sprintf("%s%d", nodeDirPrefix, i)
		nodeDir := filepath.Join(outputDir, nodeDirName, nodeDaemonHome)
		gentxsDir := filepath.Join(outputDir, "gentxs")
		nodeConfig.Moniker = nodeDirName

		nodeConfig.SetRoot(nodeDir)

		nodeID, valPubKey := nodeIDs[i], valPubKeys[i]
		initCfg := genutiltypes.NewInitConfig(chainID, gentxsDir, nodeID, valPubKey)

		appGenesis, err := genutiltypes.AppGenesisFromFile(nodeConfig.GenesisFile())
		if err != nil {
			return err
		}

		nodeAppState, err := genutil.GenAppStateFromConfig(clientCtx.Codec, clientCtx.TxConfig, nodeConfig, initCfg, appGenesis, genBalIterator, genutiltypes.DefaultMessageValidator,
			valAddrCodec)
		if err != nil {
			return err
		}

		if appState == nil {
			// set the canonical application state (they should not differ)
			appState = nodeAppState
		}

		genFile := nodeConfig.GenesisFile()

		// overwrite each validator's genesis file to have a canonical genesis time
		if err := genutil.ExportGenesisFileWithTime(genFile, chainID, nil, appState, genTime); err != nil {
			return err
		}
	}

	return nil
}

func getIP(i int, startingIPAddr string) (ip string, err error) {
	if len(startingIPAddr) == 0 {
		ip, err = server.ExternalIP()
		if err != nil {
			return "", err
		}

		return ip, nil
	}

	return calculateIP(startingIPAddr, i)
}

func calculateIP(ip string, i int) (string, error) {
	ipv4 := net.ParseIP(ip).To4()
	if ipv4 == nil {
		return "", fmt.Errorf("%v: non ipv4 address", ip)
	}

	// increment IPv4 by i with carry across octets
ipInt := uint32(ipv4[0])<<24 | uint32(ipv4[1])<<16 | uint32(ipv4[2])<<8 | uint32(ipv4[3])
ipInt += uint32(i)
return net.IPv4(byte(ipInt>>24), byte(ipInt>>16), byte(ipInt>>8), byte(ipInt)).String(), nil

func writeFile(name string, dir string, contents []byte) error {
	file := filepath.Join(dir, name)

	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("could not create directory %q: %w", dir, err)
	}

	if err := os.WriteFile(file, contents, 0o644); err != nil { //nolint: gosec
		return err
	}

	return nil
}

// startTestnet starts an in-process testnet.
func startTestnet(cmd *cobra.Command, args startArgs) error {
	networkConfig := network.DefaultConfig(NewTestNetworkFixture)

	// Default networkConfig.ChainID is random, and we should only override it if chainID provided
	// is non-empty
	if args.chainID != "" {
		networkConfig.ChainID = args.chainID
	}

	networkConfig.SigningAlgo = args.algo
	networkConfig.MinGasPrices = args.minGasPrices
	networkConfig.NumValidators = args.numValidators
	networkConfig.EnableLogging = args.enableLogging
	networkConfig.RPCAddress = args.rpcAddress
	networkConfig.APIAddress = args.apiAddress
	networkConfig.GRPCAddress = args.grpcAddress
	networkConfig.PrintMnemonic = args.printMnemonic
	networkLogger := network.NewCLILogger(cmd)

	baseDir := fmt.Sprintf("%s/%s", args.outputDir, networkConfig.ChainID)
	if _, err := os.Stat(baseDir); !os.IsNotExist(err) {
		return fmt.Errorf(
			"testnests directory already exists for chain-id '%s': %s, please remove or select a new --chain-id",
			networkConfig.ChainID, baseDir)
	}

	testnet, err := network.New(networkLogger, baseDir, networkConfig)
	if err != nil {
		return err
	}

	if _, err := testnet.WaitForHeight(1); err != nil {
		return err
	}

	cmd.Println("press the Enter Key to terminate")

	if _, err := fmt.Scanln(); err != nil { // wait for Enter Key
		return err
	}

	testnet.Cleanup()

	return nil
}

// NewTestNetworkFixture returns a new evmd AppConstructor for network simulation tests.
func NewTestNetworkFixture() network.TestFixture {
	dir, err := os.MkdirTemp("", "evm")
	if err != nil {
		panic(fmt.Sprintf("failed creating temporary directory: %v", err))
	}
	defer os.RemoveAll(dir)

	app := evmd.NewExampleApp(
		log.NewNopLogger(),
		dbm.NewMemDB(),
		nil,
		true,
		simtestutil.EmptyAppOptions{},
		evmdconfig.EVMChainID,
		evmdconfig.EvmAppOptions,
	)

	appCtr := func(val network.ValidatorI) servertypes.Application {
		return evmd.NewExampleApp(
			log.NewNopLogger(),
			dbm.NewMemDB(),
			nil,
			true,
			simtestutil.EmptyAppOptions{},
			evmdconfig.EVMChainID,
			evmdconfig.EvmAppOptions,
		)
	}

	return network.TestFixture{
		AppConstructor: appCtr,
		GenesisState:   app.DefaultGenesis(),
		EncodingConfig: moduletestutil.TestEncodingConfig{
			InterfaceRegistry: app.InterfaceRegistry(),
			Codec:             app.AppCodec(),
			TxConfig:          app.GetTxConfig(),
			Amino:             app.LegacyAmino(),
		},
	}
}
