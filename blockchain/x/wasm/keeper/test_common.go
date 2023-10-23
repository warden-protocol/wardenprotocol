package keeper

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"os"
	"testing"
	"time"

	dbm "github.com/cometbft/cometbft-db"
	"github.com/cometbft/cometbft/crypto"
	"github.com/cometbft/cometbft/crypto/ed25519"
	"github.com/cometbft/cometbft/libs/log"
	"github.com/cometbft/cometbft/libs/rand"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	icacontrollertypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/controller/types"
	icahosttypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/host/types"
	"github.com/cosmos/ibc-go/v7/modules/apps/transfer"
	ibctransfertypes "github.com/cosmos/ibc-go/v7/modules/apps/transfer/types"
	ibc "github.com/cosmos/ibc-go/v7/modules/core"
	ibcexported "github.com/cosmos/ibc-go/v7/modules/core/exported"
	ibckeeper "github.com/cosmos/ibc-go/v7/modules/core/keeper"
	"github.com/stretchr/testify/require"

	errorsmod "cosmossdk.io/errors"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/std"
	"github.com/cosmos/cosmos-sdk/store"
	storetypes "github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/address"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/module"
	"github.com/cosmos/cosmos-sdk/x/auth"
	authkeeper "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/auth/vesting"
	authzkeeper "github.com/cosmos/cosmos-sdk/x/authz/keeper"
	"github.com/cosmos/cosmos-sdk/x/bank"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/cosmos-sdk/x/capability"
	capabilitykeeper "github.com/cosmos/cosmos-sdk/x/capability/keeper"
	capabilitytypes "github.com/cosmos/cosmos-sdk/x/capability/types"
	"github.com/cosmos/cosmos-sdk/x/crisis"
	crisistypes "github.com/cosmos/cosmos-sdk/x/crisis/types"
	"github.com/cosmos/cosmos-sdk/x/distribution"
	distributionkeeper "github.com/cosmos/cosmos-sdk/x/distribution/keeper"
	distributiontypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/cosmos/cosmos-sdk/x/evidence"
	evidencetypes "github.com/cosmos/cosmos-sdk/x/evidence/types"
	"github.com/cosmos/cosmos-sdk/x/feegrant"
	"github.com/cosmos/cosmos-sdk/x/gov"
	govclient "github.com/cosmos/cosmos-sdk/x/gov/client"
	govkeeper "github.com/cosmos/cosmos-sdk/x/gov/keeper"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	govv1 "github.com/cosmos/cosmos-sdk/x/gov/types/v1"
	"github.com/cosmos/cosmos-sdk/x/mint"
	minttypes "github.com/cosmos/cosmos-sdk/x/mint/types"
	"github.com/cosmos/cosmos-sdk/x/params"
	paramsclient "github.com/cosmos/cosmos-sdk/x/params/client"
	paramskeeper "github.com/cosmos/cosmos-sdk/x/params/keeper"
	paramstypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/cosmos/cosmos-sdk/x/slashing"
	slashingtypes "github.com/cosmos/cosmos-sdk/x/slashing/types"
	"github.com/cosmos/cosmos-sdk/x/staking"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/cosmos/cosmos-sdk/x/upgrade"
	upgradeclient "github.com/cosmos/cosmos-sdk/x/upgrade/client"
	upgradekeeper "github.com/cosmos/cosmos-sdk/x/upgrade/keeper"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"

	identitymodulekeeper "github.com/qredo/fusionchain/x/identity/keeper"
	identitymoduletypes "github.com/qredo/fusionchain/x/identity/types"
	policymodulekeeper "github.com/qredo/fusionchain/x/policy/keeper"
	policymoduletypes "github.com/qredo/fusionchain/x/policy/types"
	qassetsmodulekeeper "github.com/qredo/fusionchain/x/qassets/keeper"
	qassetsmoduletypes "github.com/qredo/fusionchain/x/qassets/types"
	treasurymodulekeeper "github.com/qredo/fusionchain/x/treasury/keeper"
	treasurymoduletypes "github.com/qredo/fusionchain/x/treasury/types"

	wasmappparams "github.com/CosmWasm/wasmd/app/params"
	"github.com/qredo/fusionchain/x/wasm/keeper/testdata"
	"github.com/qredo/fusionchain/x/wasm/keeper/wasmtesting"
	"github.com/qredo/fusionchain/x/wasm/types"
)

var moduleBasics = module.NewBasicManager(
	auth.AppModuleBasic{},
	bank.AppModuleBasic{},
	capability.AppModuleBasic{},
	staking.AppModuleBasic{},
	mint.AppModuleBasic{},
	distribution.AppModuleBasic{},
	gov.NewAppModuleBasic([]govclient.ProposalHandler{
		paramsclient.ProposalHandler,
		upgradeclient.LegacyProposalHandler,
		upgradeclient.LegacyCancelProposalHandler,
	}),
	params.AppModuleBasic{},
	crisis.AppModuleBasic{},
	slashing.AppModuleBasic{},
	ibc.AppModuleBasic{},
	upgrade.AppModuleBasic{},
	evidence.AppModuleBasic{},
	transfer.AppModuleBasic{},
	vesting.AppModuleBasic{},
)

func MakeTestCodec(tb testing.TB) codec.Codec {
	tb.Helper()

	return MakeEncodingConfig(tb).Codec
}

func MakeEncodingConfig(_ testing.TB) wasmappparams.EncodingConfig {
	encodingConfig := wasmappparams.MakeEncodingConfig()
	amino := encodingConfig.Amino
	interfaceRegistry := encodingConfig.InterfaceRegistry

	std.RegisterInterfaces(interfaceRegistry)
	std.RegisterLegacyAminoCodec(amino)

	moduleBasics.RegisterLegacyAminoCodec(amino)
	moduleBasics.RegisterInterfaces(interfaceRegistry)
	// add wasmd types
	types.RegisterInterfaces(interfaceRegistry)
	types.RegisterLegacyAminoCodec(amino)

	return encodingConfig
}

var TestingStakeParams = stakingtypes.Params{
	UnbondingTime:     100,
	MaxValidators:     10,
	MaxEntries:        10,
	HistoricalEntries: 10,
	BondDenom:         "stake",
	MinCommissionRate: stakingtypes.DefaultMinCommissionRate,
}

type TestFaucet struct {
	t                testing.TB
	bankKeeper       bankkeeper.Keeper
	sender           sdk.AccAddress
	balance          sdk.Coins
	minterModuleName string
}

func NewTestFaucet(tb testing.TB, ctx sdk.Context, bankKeeper bankkeeper.Keeper, minterModuleName string, initialAmount ...sdk.Coin) *TestFaucet {
	tb.Helper()

	require.NotEmpty(tb, initialAmount)
	r := &TestFaucet{t: tb, bankKeeper: bankKeeper, minterModuleName: minterModuleName}
	_, addr := keyPubAddr()
	r.sender = addr
	r.Mint(ctx, addr, initialAmount...)
	r.balance = initialAmount
	return r
}

func (f *TestFaucet) Mint(parentCtx sdk.Context, addr sdk.AccAddress, amounts ...sdk.Coin) {
	require.NotEmpty(f.t, amounts)
	ctx := parentCtx.WithEventManager(sdk.NewEventManager()) // discard all faucet related events
	err := f.bankKeeper.MintCoins(ctx, f.minterModuleName, amounts)
	require.NoError(f.t, err)
	err = f.bankKeeper.SendCoinsFromModuleToAccount(ctx, f.minterModuleName, addr, amounts)
	require.NoError(f.t, err)
	f.balance = f.balance.Add(amounts...)
}

func (f *TestFaucet) Fund(parentCtx sdk.Context, receiver sdk.AccAddress, amounts ...sdk.Coin) {
	require.NotEmpty(f.t, amounts)
	// ensure faucet is always filled
	if !f.balance.IsAllGTE(amounts) {
		f.Mint(parentCtx, f.sender, amounts...)
	}
	ctx := parentCtx.WithEventManager(sdk.NewEventManager()) // discard all faucet related events
	err := f.bankKeeper.SendCoins(ctx, f.sender, receiver, amounts)
	require.NoError(f.t, err)
	f.balance = f.balance.Sub(amounts...)
}

func (f *TestFaucet) NewFundedRandomAccount(ctx sdk.Context, amounts ...sdk.Coin) sdk.AccAddress {
	_, addr := keyPubAddr()
	f.Fund(ctx, addr, amounts...)
	return addr
}

type TestKeepers struct {
	AccountKeeper    authkeeper.AccountKeeper
	StakingKeeper    *stakingkeeper.Keeper
	DistKeeper       distributionkeeper.Keeper
	BankKeeper       bankkeeper.Keeper
	GovKeeper        *govkeeper.Keeper
	ContractKeeper   types.ContractOpsKeeper
	WasmKeeper       *Keeper
	IBCKeeper        *ibckeeper.Keeper
	Router           MessageRouter
	EncodingConfig   wasmappparams.EncodingConfig
	Faucet           *TestFaucet
	MultiStore       sdk.CommitMultiStore
	ScopedWasmKeeper capabilitykeeper.ScopedKeeper
	WasmStoreKey     *storetypes.KVStoreKey
}

// CreateDefaultTestInput common settings for CreateTestInput
func CreateDefaultTestInput(tb testing.TB) (sdk.Context, TestKeepers) {
	tb.Helper()

	return CreateTestInput(tb, false, "staking")
}

// CreateTestInput encoders can be nil to accept the defaults, or set it to override some of the message handlers (like default)
func CreateTestInput(tb testing.TB, isCheckTx bool, availableCapabilities string, opts ...Option) (sdk.Context, TestKeepers) {
	tb.Helper()

	// Load default wasm config
	return createTestInput(tb, isCheckTx, availableCapabilities, types.DefaultWasmConfig(), dbm.NewMemDB(), opts...)
}

// encoders can be nil to accept the defaults, or set it to override some of the message handlers (like default)
func createTestInput(
	tb testing.TB,
	isCheckTx bool,
	availableCapabilities string,
	wasmConfig types.WasmConfig,
	db dbm.DB,
	opts ...Option,
) (sdk.Context, TestKeepers) {
	tb.Helper()

	tempDir := tb.TempDir()

	keys := sdk.NewKVStoreKeys(
		authtypes.StoreKey, banktypes.StoreKey, stakingtypes.StoreKey,
		minttypes.StoreKey, distributiontypes.StoreKey, slashingtypes.StoreKey,
		govtypes.StoreKey, paramstypes.StoreKey, ibcexported.StoreKey, upgradetypes.StoreKey,
		evidencetypes.StoreKey, ibctransfertypes.StoreKey,
		capabilitytypes.StoreKey, feegrant.StoreKey, authzkeeper.StoreKey,
		types.StoreKey,
	)
	ms := store.NewCommitMultiStore(db)
	for _, v := range keys {
		ms.MountStoreWithDB(v, storetypes.StoreTypeIAVL, db)
	}
	tkeys := sdk.NewTransientStoreKeys(paramstypes.TStoreKey)
	for _, v := range tkeys {
		ms.MountStoreWithDB(v, storetypes.StoreTypeTransient, db)
	}

	memKeys := sdk.NewMemoryStoreKeys(capabilitytypes.MemStoreKey)
	for _, v := range memKeys {
		ms.MountStoreWithDB(v, storetypes.StoreTypeMemory, db)
	}

	require.NoError(tb, ms.LoadLatestVersion())

	ctx := sdk.NewContext(ms, tmproto.Header{
		Height: 1234567,
		Time:   time.Date(2020, time.April, 22, 12, 0, 0, 0, time.UTC),
	}, isCheckTx, log.NewNopLogger())
	ctx = types.WithTXCounter(ctx, 0)

	encodingConfig := MakeEncodingConfig(tb)
	appCodec, legacyAmino := encodingConfig.Codec, encodingConfig.Amino

	paramsKeeper := paramskeeper.NewKeeper(
		appCodec,
		legacyAmino,
		keys[paramstypes.StoreKey],
		tkeys[paramstypes.TStoreKey],
	)
	for _, m := range []string{
		authtypes.ModuleName,
		banktypes.ModuleName,
		stakingtypes.ModuleName,
		minttypes.ModuleName,
		distributiontypes.ModuleName,
		slashingtypes.ModuleName,
		crisistypes.ModuleName,
		ibctransfertypes.ModuleName,
		capabilitytypes.ModuleName,
		ibcexported.ModuleName,
		govtypes.ModuleName,
		types.ModuleName,
	} {
		paramsKeeper.Subspace(m)
	}
	subspace := func(m string) paramstypes.Subspace {
		r, ok := paramsKeeper.GetSubspace(m)
		require.True(tb, ok)

		var keyTable paramstypes.KeyTable
		switch r.Name() {
		case authtypes.ModuleName:
			keyTable = authtypes.ParamKeyTable() //nolint:staticcheck
		case banktypes.ModuleName:
			keyTable = banktypes.ParamKeyTable() //nolint:staticcheck
		case stakingtypes.ModuleName:
			keyTable = stakingtypes.ParamKeyTable()
		case minttypes.ModuleName:
			keyTable = minttypes.ParamKeyTable() //nolint:staticcheck
		case distributiontypes.ModuleName:
			keyTable = distributiontypes.ParamKeyTable() //nolint:staticcheck
		case slashingtypes.ModuleName:
			keyTable = slashingtypes.ParamKeyTable() //nolint:staticcheck
		case govtypes.ModuleName:
			keyTable = govv1.ParamKeyTable() //nolint:staticcheck
		case crisistypes.ModuleName:
			keyTable = crisistypes.ParamKeyTable() //nolint:staticcheck
			// ibc types
		case ibctransfertypes.ModuleName:
			keyTable = ibctransfertypes.ParamKeyTable()
		case icahosttypes.SubModuleName:
			keyTable = icahosttypes.ParamKeyTable()
		case icacontrollertypes.SubModuleName:
			keyTable = icacontrollertypes.ParamKeyTable()
			// wasm
		case types.ModuleName:
			keyTable = types.ParamKeyTable() //nolint:staticcheck
		default:
			return r
		}

		if !r.HasKeyTable() {
			r = r.WithKeyTable(keyTable)
		}
		return r
	}
	maccPerms := map[string][]string{ // module account permissions
		authtypes.FeeCollectorName:     nil,
		distributiontypes.ModuleName:   nil,
		minttypes.ModuleName:           {authtypes.Minter},
		stakingtypes.BondedPoolName:    {authtypes.Burner, authtypes.Staking},
		stakingtypes.NotBondedPoolName: {authtypes.Burner, authtypes.Staking},
		govtypes.ModuleName:            {authtypes.Burner},
		ibctransfertypes.ModuleName:    {authtypes.Minter, authtypes.Burner},
		types.ModuleName:               {authtypes.Burner},
	}
	accountKeeper := authkeeper.NewAccountKeeper(
		appCodec,
		keys[authtypes.StoreKey],   // target store
		authtypes.ProtoBaseAccount, // prototype
		maccPerms,
		sdk.Bech32MainPrefix,
		authtypes.NewModuleAddress(authtypes.ModuleName).String(),
	)
	blockedAddrs := make(map[string]bool)
	for acc := range maccPerms {
		blockedAddrs[authtypes.NewModuleAddress(acc).String()] = true
	}

	require.NoError(tb, accountKeeper.SetParams(ctx, authtypes.DefaultParams()))

	bankKeeper := bankkeeper.NewBaseKeeper(
		appCodec,
		keys[banktypes.StoreKey],
		accountKeeper,
		blockedAddrs,
		authtypes.NewModuleAddress(banktypes.ModuleName).String(),
	)
	require.NoError(tb, bankKeeper.SetParams(ctx, banktypes.DefaultParams()))

	stakingKeeper := stakingkeeper.NewKeeper(
		appCodec,
		keys[stakingtypes.StoreKey],
		accountKeeper,
		bankKeeper,
		authtypes.NewModuleAddress(stakingtypes.ModuleName).String(),
	)
	stakingtypes.DefaultParams()
	require.NoError(tb, stakingKeeper.SetParams(ctx, TestingStakeParams))

	distKeeper := distributionkeeper.NewKeeper(
		appCodec,
		keys[distributiontypes.StoreKey],
		accountKeeper,
		bankKeeper,
		stakingKeeper,
		authtypes.FeeCollectorName,
		authtypes.NewModuleAddress(distributiontypes.ModuleName).String(),
	)
	require.NoError(tb, distKeeper.SetParams(ctx, distributiontypes.DefaultParams()))
	stakingKeeper.SetHooks(distKeeper.Hooks())

	// set genesis items required for distribution
	distKeeper.SetFeePool(ctx, distributiontypes.InitialFeePool())

	upgradeKeeper := upgradekeeper.NewKeeper(
		map[int64]bool{},
		keys[upgradetypes.StoreKey],
		appCodec,
		tempDir,
		nil,
		authtypes.NewModuleAddress(upgradetypes.ModuleName).String(),
	)

	faucet := NewTestFaucet(tb, ctx, bankKeeper, minttypes.ModuleName, sdk.NewCoin("stake", sdk.NewInt(100_000_000_000)))

	// set some funds ot pay out validatores, based on code from:
	// https://github.com/cosmos/cosmos-sdk/blob/fea231556aee4d549d7551a6190389c4328194eb/x/distribution/keeper/keeper_test.go#L50-L57
	distrAcc := distKeeper.GetDistributionAccount(ctx)
	faucet.Fund(ctx, distrAcc.GetAddress(), sdk.NewCoin("stake", sdk.NewInt(2000000)))
	accountKeeper.SetModuleAccount(ctx, distrAcc)

	capabilityKeeper := capabilitykeeper.NewKeeper(
		appCodec,
		keys[capabilitytypes.StoreKey],
		memKeys[capabilitytypes.MemStoreKey],
	)
	scopedIBCKeeper := capabilityKeeper.ScopeToModule(ibcexported.ModuleName)
	scopedWasmKeeper := capabilityKeeper.ScopeToModule(types.ModuleName)

	ibcKeeper := ibckeeper.NewKeeper(
		appCodec,
		keys[ibcexported.StoreKey],
		subspace(ibcexported.ModuleName),
		stakingKeeper,
		upgradeKeeper,
		scopedIBCKeeper,
	)

	querier := baseapp.NewGRPCQueryRouter()
	querier.SetInterfaceRegistry(encodingConfig.InterfaceRegistry)
	msgRouter := baseapp.NewMsgServiceRouter()
	msgRouter.SetInterfaceRegistry(encodingConfig.InterfaceRegistry)

	cfg := sdk.GetConfig()
	cfg.SetAddressVerifier(types.VerifyAddressLen())

	policyKeeper := *policymodulekeeper.NewKeeper(
		appCodec,
		keys[policymoduletypes.StoreKey],
		keys[policymoduletypes.MemStoreKey],
		subspace(policymoduletypes.ModuleName),
	)

	identityKeeper := *identitymodulekeeper.NewKeeper(
		appCodec,
		keys[identitymoduletypes.StoreKey],
		keys[identitymoduletypes.MemStoreKey],
		subspace(identitymoduletypes.ModuleName),
		&policyKeeper,
	)

	treasuryKeeper := *treasurymodulekeeper.NewKeeper(
		appCodec,
		keys[treasurymoduletypes.StoreKey],
		keys[treasurymoduletypes.MemStoreKey],
		subspace(treasurymoduletypes.ModuleName),
		identityKeeper,
		&policyKeeper,
		bankKeeper,
	)

	qassetsKeeper := *qassetsmodulekeeper.NewKeeper(
		appCodec,
		keys[qassetsmoduletypes.StoreKey],
		keys[qassetsmoduletypes.MemStoreKey],
		subspace(qassetsmoduletypes.ModuleName),
		bankKeeper,
		treasuryKeeper,
		identityKeeper,
	)

	keeper := NewKeeper(
		appCodec,
		keys[types.StoreKey],
		accountKeeper,
		bankKeeper,
		stakingKeeper,
		distributionkeeper.NewQuerier(distKeeper),
		ibcKeeper.ChannelKeeper, // ICS4Wrapper
		ibcKeeper.ChannelKeeper,
		&ibcKeeper.PortKeeper,
		scopedWasmKeeper,
		policyKeeper,
		qassetsKeeper,
		wasmtesting.MockIBCTransferKeeper{},
		msgRouter,
		querier,
		tempDir,
		wasmConfig,
		availableCapabilities,
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
		opts...,
	)
	require.NoError(tb, keeper.SetParams(ctx, types.DefaultParams()))

	// add wasm handler so we can loop-back (contracts calling contracts)
	contractKeeper := NewDefaultPermissionKeeper(&keeper)

	govKeeper := govkeeper.NewKeeper(
		appCodec,
		keys[govtypes.StoreKey],
		accountKeeper,
		bankKeeper,
		stakingKeeper,
		msgRouter,
		govtypes.DefaultConfig(),
		authtypes.NewModuleAddress(govtypes.ModuleName).String(),
	)
	require.NoError(tb, govKeeper.SetParams(ctx, govv1.DefaultParams()))
	govKeeper.SetProposalID(ctx, 1)

	am := module.NewManager( // minimal module set that we use for message/ query tests
		bank.NewAppModule(appCodec, bankKeeper, accountKeeper, subspace(banktypes.ModuleName)),
		staking.NewAppModule(appCodec, stakingKeeper, accountKeeper, bankKeeper, subspace(stakingtypes.ModuleName)),
		distribution.NewAppModule(appCodec, distKeeper, accountKeeper, bankKeeper, stakingKeeper, subspace(distributiontypes.ModuleName)),
		gov.NewAppModule(appCodec, govKeeper, accountKeeper, bankKeeper, subspace(govtypes.ModuleName)),
	)
	am.RegisterServices(module.NewConfigurator(appCodec, msgRouter, querier))
	types.RegisterMsgServer(msgRouter, NewMsgServerImpl(&keeper))
	types.RegisterQueryServer(querier, NewGrpcQuerier(appCodec, keys[types.ModuleName], keeper, keeper.queryGasLimit))

	keepers := TestKeepers{
		AccountKeeper:    accountKeeper,
		StakingKeeper:    stakingKeeper,
		DistKeeper:       distKeeper,
		ContractKeeper:   contractKeeper,
		WasmKeeper:       &keeper,
		BankKeeper:       bankKeeper,
		GovKeeper:        govKeeper,
		IBCKeeper:        ibcKeeper,
		Router:           msgRouter,
		EncodingConfig:   encodingConfig,
		Faucet:           faucet,
		MultiStore:       ms,
		ScopedWasmKeeper: scopedWasmKeeper,
		WasmStoreKey:     keys[types.StoreKey],
	}
	return ctx, keepers
}

// TestHandler returns a wasm handler for tests (to avoid circular imports)
func TestHandler(k types.ContractOpsKeeper) MessageRouter {
	return MessageRouterFunc(func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
		ctx = ctx.WithEventManager(sdk.NewEventManager())
		switch msg := msg.(type) {
		case *types.MsgStoreCode:
			return handleStoreCode(ctx, k, msg)
		case *types.MsgInstantiateContract:
			return handleInstantiate(ctx, k, msg)
		case *types.MsgExecuteContract:
			return handleExecute(ctx, k, msg)
		default:
			errMsg := fmt.Sprintf("unrecognized wasm message type: %T", msg)
			return nil, errorsmod.Wrap(sdkerrors.ErrUnknownRequest, errMsg)
		}
	})
}

var _ MessageRouter = MessageRouterFunc(nil)

type MessageRouterFunc func(ctx sdk.Context, req sdk.Msg) (*sdk.Result, error)

func (m MessageRouterFunc) Handler(msg sdk.Msg) baseapp.MsgServiceHandler {
	return m
}

func handleStoreCode(ctx sdk.Context, k types.ContractOpsKeeper, msg *types.MsgStoreCode) (*sdk.Result, error) {
	senderAddr, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return nil, errorsmod.Wrap(err, "sender")
	}
	codeID, _, err := k.Create(ctx, senderAddr, msg.WASMByteCode, msg.InstantiatePermission)
	if err != nil {
		return nil, err
	}

	return &sdk.Result{
		Data:   []byte(fmt.Sprintf("%d", codeID)),
		Events: ctx.EventManager().ABCIEvents(),
	}, nil
}

func handleInstantiate(ctx sdk.Context, k types.ContractOpsKeeper, msg *types.MsgInstantiateContract) (*sdk.Result, error) {
	senderAddr, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return nil, errorsmod.Wrap(err, "sender")
	}
	var adminAddr sdk.AccAddress
	if msg.Admin != "" {
		if adminAddr, err = sdk.AccAddressFromBech32(msg.Admin); err != nil {
			return nil, errorsmod.Wrap(err, "admin")
		}
	}

	contractAddr, _, err := k.Instantiate(ctx, msg.CodeID, senderAddr, adminAddr, msg.Msg, msg.Label, msg.Funds)
	if err != nil {
		return nil, err
	}

	return &sdk.Result{
		Data:   contractAddr,
		Events: ctx.EventManager().Events().ToABCIEvents(),
	}, nil
}

func handleExecute(ctx sdk.Context, k types.ContractOpsKeeper, msg *types.MsgExecuteContract) (*sdk.Result, error) {
	senderAddr, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return nil, errorsmod.Wrap(err, "sender")
	}
	contractAddr, err := sdk.AccAddressFromBech32(msg.Contract)
	if err != nil {
		return nil, errorsmod.Wrap(err, "admin")
	}
	data, err := k.Execute(ctx, contractAddr, senderAddr, msg.Msg, msg.Funds)
	if err != nil {
		return nil, err
	}

	return &sdk.Result{
		Data:   data,
		Events: ctx.EventManager().Events().ToABCIEvents(),
	}, nil
}

func RandomAccountAddress(_ testing.TB) sdk.AccAddress {
	_, addr := keyPubAddr()
	return addr
}

// DeterministicAccountAddress  creates a test address with v repeated to valid address size
func DeterministicAccountAddress(_ testing.TB, v byte) sdk.AccAddress {
	return bytes.Repeat([]byte{v}, address.Len)
}

func RandomBech32AccountAddress(tb testing.TB) string {
	tb.Helper()

	return RandomAccountAddress(tb).String()
}

type ExampleContract struct {
	InitialAmount sdk.Coins
	Creator       crypto.PrivKey
	CreatorAddr   sdk.AccAddress
	CodeID        uint64
	Checksum      []byte
}

func StoreHackatomExampleContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers) ExampleContract {
	tb.Helper()

	return StoreExampleContractWasm(tb, ctx, keepers, testdata.HackatomContractWasm())
}

func StoreBurnerExampleContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers) ExampleContract {
	tb.Helper()

	return StoreExampleContractWasm(tb, ctx, keepers, testdata.BurnerContractWasm())
}

func StoreIBCReflectContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers) ExampleContract {
	tb.Helper()

	return StoreExampleContractWasm(tb, ctx, keepers, testdata.IBCReflectContractWasm())
}

func StoreReflectContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers) ExampleContract {
	tb.Helper()

	return StoreExampleContractWasm(tb, ctx, keepers, testdata.ReflectContractWasm())
}

func StoreExampleContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers, wasmFile string) ExampleContract {
	tb.Helper()

	wasmCode, err := os.ReadFile(wasmFile)
	require.NoError(tb, err)
	return StoreExampleContractWasm(tb, ctx, keepers, wasmCode)
}

func StoreExampleContractWasm(tb testing.TB, ctx sdk.Context, keepers TestKeepers, wasmCode []byte) ExampleContract {
	tb.Helper()

	anyAmount := sdk.NewCoins(sdk.NewInt64Coin("denom", 1000))
	creator, creatorAddr := keyPubAddr()
	fundAccounts(tb, ctx, keepers.AccountKeeper, keepers.BankKeeper, creatorAddr, anyAmount)

	codeID, _, err := keepers.ContractKeeper.Create(ctx, creatorAddr, wasmCode, nil)
	require.NoError(tb, err)
	hash := keepers.WasmKeeper.GetCodeInfo(ctx, codeID).CodeHash
	return ExampleContract{anyAmount, creator, creatorAddr, codeID, hash}
}

var wasmIdent = []byte("\x00\x61\x73\x6D")

type ExampleContractInstance struct {
	ExampleContract
	Contract sdk.AccAddress
}

// SeedNewContractInstance sets the mock WasmEngine in keeper and calls store + instantiate to init the contract's metadata
func SeedNewContractInstance(tb testing.TB, ctx sdk.Context, keepers TestKeepers, mock types.WasmEngine) ExampleContractInstance {
	tb.Helper()
	exampleContract := StoreRandomContract(tb, ctx, keepers, mock)
	contractAddr, _, err := keepers.ContractKeeper.Instantiate(ctx, exampleContract.CodeID, exampleContract.CreatorAddr, exampleContract.CreatorAddr, []byte(`{}`), "", nil)
	require.NoError(tb, err)
	return ExampleContractInstance{
		ExampleContract: exampleContract,
		Contract:        contractAddr,
	}
}

// StoreRandomContract sets the mock WasmEngine in keeper and calls store
func StoreRandomContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers, mock types.WasmEngine) ExampleContract {
	tb.Helper()

	return StoreRandomContractWithAccessConfig(tb, ctx, keepers, mock, nil)
}

func StoreRandomContractWithAccessConfig(
	tb testing.TB, ctx sdk.Context,
	keepers TestKeepers,
	mock types.WasmEngine,
	cfg *types.AccessConfig,
) ExampleContract {
	tb.Helper()
	anyAmount := sdk.NewCoins(sdk.NewInt64Coin("denom", 1000))
	creator, creatorAddr := keyPubAddr()
	fundAccounts(tb, ctx, keepers.AccountKeeper, keepers.BankKeeper, creatorAddr, anyAmount)
	keepers.WasmKeeper.wasmVM = mock
	wasmCode := append(wasmIdent, rand.Bytes(10)...)
	codeID, checksum, err := keepers.ContractKeeper.Create(ctx, creatorAddr, wasmCode, cfg)
	require.NoError(tb, err)
	exampleContract := ExampleContract{InitialAmount: anyAmount, Creator: creator, CreatorAddr: creatorAddr, CodeID: codeID, Checksum: checksum}
	return exampleContract
}

type HackatomExampleInstance struct {
	ExampleContract
	Contract        sdk.AccAddress
	Verifier        crypto.PrivKey
	VerifierAddr    sdk.AccAddress
	Beneficiary     crypto.PrivKey
	BeneficiaryAddr sdk.AccAddress
	Label           string
	Deposit         sdk.Coins
}

// InstantiateHackatomExampleContract load and instantiate the "./testdata/hackatom.wasm" contract
func InstantiateHackatomExampleContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers) HackatomExampleInstance {
	tb.Helper()

	contract := StoreHackatomExampleContract(tb, ctx, keepers)

	verifier, verifierAddr := keyPubAddr()
	fundAccounts(tb, ctx, keepers.AccountKeeper, keepers.BankKeeper, verifierAddr, contract.InitialAmount)

	beneficiary, beneficiaryAddr := keyPubAddr()
	initMsgBz := HackatomExampleInitMsg{
		Verifier:    verifierAddr,
		Beneficiary: beneficiaryAddr,
	}.GetBytes(tb)
	initialAmount := sdk.NewCoins(sdk.NewInt64Coin("denom", 100))

	adminAddr := contract.CreatorAddr
	label := "demo contract to query"
	contractAddr, _, err := keepers.ContractKeeper.Instantiate(ctx, contract.CodeID, contract.CreatorAddr, adminAddr, initMsgBz, label, initialAmount)
	require.NoError(tb, err)
	return HackatomExampleInstance{
		ExampleContract: contract,
		Contract:        contractAddr,
		Verifier:        verifier,
		VerifierAddr:    verifierAddr,
		Beneficiary:     beneficiary,
		BeneficiaryAddr: beneficiaryAddr,
		Label:           label,
		Deposit:         initialAmount,
	}
}

type ExampleInstance struct {
	ExampleContract
	Contract sdk.AccAddress
	Label    string
	Deposit  sdk.Coins
}

// InstantiateReflectExampleContract load and instantiate the "./testdata/reflect.wasm" contract
func InstantiateReflectExampleContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers) ExampleInstance {
	tb.Helper()

	example := StoreReflectContract(tb, ctx, keepers)
	initialAmount := sdk.NewCoins(sdk.NewInt64Coin("denom", 100))
	label := "demo contract to query"
	contractAddr, _, err := keepers.ContractKeeper.Instantiate(ctx, example.CodeID, example.CreatorAddr, example.CreatorAddr, []byte("{}"), label, initialAmount)

	require.NoError(tb, err)
	return ExampleInstance{
		ExampleContract: example,
		Contract:        contractAddr,
		Label:           label,
		Deposit:         initialAmount,
	}
}

type HackatomExampleInitMsg struct {
	Verifier    sdk.AccAddress `json:"verifier"`
	Beneficiary sdk.AccAddress `json:"beneficiary"`
}

func (m HackatomExampleInitMsg) GetBytes(tb testing.TB) []byte {
	tb.Helper()

	initMsgBz, err := json.Marshal(m)
	require.NoError(tb, err)
	return initMsgBz
}

type IBCReflectExampleInstance struct {
	Contract      sdk.AccAddress
	Admin         sdk.AccAddress
	CodeID        uint64
	ReflectCodeID uint64
}

// InstantiateIBCReflectContract load and instantiate the "./testdata/ibc_reflect.wasm" contract
func InstantiateIBCReflectContract(tb testing.TB, ctx sdk.Context, keepers TestKeepers) IBCReflectExampleInstance {
	tb.Helper()

	reflectID := StoreReflectContract(tb, ctx, keepers).CodeID
	ibcReflectID := StoreIBCReflectContract(tb, ctx, keepers).CodeID

	initMsgBz := IBCReflectInitMsg{
		ReflectCodeID: reflectID,
	}.GetBytes(tb)
	adminAddr := RandomAccountAddress(tb)

	contractAddr, _, err := keepers.ContractKeeper.Instantiate(ctx, ibcReflectID, adminAddr, adminAddr, initMsgBz, "ibc-reflect-factory", nil)
	require.NoError(tb, err)
	return IBCReflectExampleInstance{
		Admin:         adminAddr,
		Contract:      contractAddr,
		CodeID:        ibcReflectID,
		ReflectCodeID: reflectID,
	}
}

type IBCReflectInitMsg struct {
	ReflectCodeID uint64 `json:"reflect_code_id"`
}

func (m IBCReflectInitMsg) GetBytes(tb testing.TB) []byte {
	tb.Helper()

	initMsgBz, err := json.Marshal(m)
	require.NoError(tb, err)
	return initMsgBz
}

type BurnerExampleInitMsg struct {
	Payout sdk.AccAddress `json:"payout"`
	Delete uint32         `json:"delete"`
}

func (m BurnerExampleInitMsg) GetBytes(tb testing.TB) []byte {
	tb.Helper()
	initMsgBz, err := json.Marshal(m)
	require.NoError(tb, err)
	return initMsgBz
}

func fundAccounts(tb testing.TB, ctx sdk.Context, am authkeeper.AccountKeeper, bank bankkeeper.Keeper, addr sdk.AccAddress, coins sdk.Coins) {
	tb.Helper()
	acc := am.NewAccountWithAddress(ctx, addr)
	am.SetAccount(ctx, acc)
	NewTestFaucet(tb, ctx, bank, minttypes.ModuleName, coins...).Fund(ctx, addr, coins...)
}

var keyCounter uint64

// we need to make this deterministic (same every test run), as encoded address size and thus gas cost,
// depends on the actual bytes (due to ugly CanonicalAddress encoding)
func keyPubAddr() (crypto.PrivKey, sdk.AccAddress) {
	keyCounter++
	seed := make([]byte, 8)
	binary.BigEndian.PutUint64(seed, keyCounter)

	key := ed25519.GenPrivKeyFromSecret(seed)
	pub := key.PubKey()
	addr := sdk.AccAddress(pub.Address())
	return key, addr
}
