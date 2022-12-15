package simulation

import (
	"encoding/json"
	"io/ioutil"
	"math/rand"

	wasmvmtypes "github.com/CosmWasm/wasmvm/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"

	"github.com/CosmWasm/wasmd/app/params"
	wasmkeeper "github.com/CosmWasm/wasmd/x/wasm/keeper"
	"github.com/CosmWasm/wasmd/x/wasm/keeper/testdata"
	"github.com/CosmWasm/wasmd/x/wasm/types"
)

// Simulation operation weights constants
//nolint:gosec
const (
	OpWeightMsgStoreCode           = "op_weight_msg_store_code"
	OpWeightMsgInstantiateContract = "op_weight_msg_instantiate_contract"
	OpWeightMsgExecuteContract     = "op_weight_msg_execute_contract"
	OpReflectContractPath          = "op_reflect_contract_path"
)

// WasmKeeper is a subset of the wasm keeper used by simulations
type WasmKeeper interface {
	GetParams(ctx sdk.Context) types.Params
	IterateCodeInfos(ctx sdk.Context, cb func(uint64, types.CodeInfo) bool)
	IterateContractInfo(ctx sdk.Context, cb func(sdk.AccAddress, types.ContractInfo) bool)
	QuerySmart(ctx sdk.Context, contractAddr sdk.AccAddress, req []byte) ([]byte, error)
	PeekAutoIncrementID(ctx sdk.Context, lastIDKey []byte) uint64
}
type BankKeeper interface {
	simulation.BankKeeper
	IsSendEnabledCoin(ctx sdk.Context, coin sdk.Coin) bool
}

// WeightedOperations returns all the operations from the module with their respective weights
func WeightedOperations(
	simstate *module.SimulationState,
	ak types.AccountKeeper,
	bk BankKeeper,
	wasmKeeper WasmKeeper,
) simulation.WeightedOperations {
	var (
		weightMsgStoreCode           int
		weightMsgInstantiateContract int
		weightMsgExecuteContract     int
		wasmContractPath             string
	)

	simstate.AppParams.GetOrGenerate(simstate.Cdc, OpWeightMsgStoreCode, &weightMsgStoreCode, nil,
		func(_ *rand.Rand) {
			weightMsgStoreCode = params.DefaultWeightMsgStoreCode
		},
	)

	simstate.AppParams.GetOrGenerate(simstate.Cdc, OpWeightMsgInstantiateContract, &weightMsgInstantiateContract, nil,
		func(_ *rand.Rand) {
			weightMsgInstantiateContract = params.DefaultWeightMsgInstantiateContract
		},
	)
	simstate.AppParams.GetOrGenerate(simstate.Cdc, OpWeightMsgExecuteContract, &weightMsgInstantiateContract, nil,
		func(_ *rand.Rand) {
			weightMsgExecuteContract = params.DefaultWeightMsgExecuteContract
		},
	)
	simstate.AppParams.GetOrGenerate(simstate.Cdc, OpReflectContractPath, &wasmContractPath, nil,
		func(_ *rand.Rand) {
			wasmContractPath = ""
		},
	)

	var wasmBz []byte
	if wasmContractPath == "" {
		wasmBz = testdata.ReflectContractWasm()
	} else {
		var err error
		wasmBz, err = ioutil.ReadFile(wasmContractPath)
		if err != nil {
			panic(err)
		}
	}

	return simulation.WeightedOperations{
		simulation.NewWeightedOperation(
			weightMsgStoreCode,
			SimulateMsgStoreCode(ak, bk, wasmKeeper, wasmBz, 5_000_000),
		),
		simulation.NewWeightedOperation(
			weightMsgInstantiateContract,
			SimulateMsgInstantiateContract(ak, bk, wasmKeeper, DefaultSimulationCodeIDSelector),
		),
		simulation.NewWeightedOperation(
			weightMsgExecuteContract,
			SimulateMsgExecuteContract(
				ak,
				bk,
				wasmKeeper,
				DefaultSimulationExecuteContractSelector,
				DefaultSimulationExecuteSenderSelector,
				DefaultSimulationExecutePayloader,
			),
		),
	}
}

// SimulateMsgStoreCode generates a MsgStoreCode with random values
func SimulateMsgStoreCode(ak types.AccountKeeper, bk simulation.BankKeeper, wasmKeeper WasmKeeper, wasmBz []byte, gas uint64) simtypes.Operation {
	return func(
		r *rand.Rand,
		app *baseapp.BaseApp,
		ctx sdk.Context,
		accs []simtypes.Account,
		chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		if wasmKeeper.GetParams(ctx).CodeUploadAccess.Permission != types.AccessTypeEverybody {
			return simtypes.NoOpMsg(types.ModuleName, types.MsgStoreCode{}.Type(), "no chain permission"), nil, nil
		}

		simAccount, _ := simtypes.RandomAcc(r, accs)

		permission := wasmKeeper.GetParams(ctx).InstantiateDefaultPermission
		config := permission.With(simAccount.Address)

		msg := types.MsgStoreCode{
			Sender:                simAccount.Address.String(),
			WASMByteCode:          wasmBz,
			InstantiatePermission: &config,
		}

		txCtx := simulation.OperationInput{
			R:             r,
			App:           app,
			TxGen:         simappparams.MakeTestEncodingConfig().TxConfig,
			Cdc:           nil,
			Msg:           &msg,
			MsgType:       msg.Type(),
			Context:       ctx,
			SimAccount:    simAccount,
			AccountKeeper: ak,
			Bankkeeper:    bk,
			ModuleName:    types.ModuleName,
		}

		return GenAndDeliverTxWithRandFees(txCtx, gas)
	}
}

// CodeIDSelector returns code id to be used in simulations
type CodeIDSelector = func(ctx sdk.Context, wasmKeeper WasmKeeper) uint64

// DefaultSimulationCodeIDSelector picks the first code id
func DefaultSimulationCodeIDSelector(ctx sdk.Context, wasmKeeper WasmKeeper) uint64 {
	var codeID uint64
	wasmKeeper.IterateCodeInfos(ctx, func(u uint64, info types.CodeInfo) bool {
		if info.InstantiateConfig.Permission != types.AccessTypeEverybody {
			return false
		}
		codeID = u
		return true
	})
	return codeID
}

// SimulateMsgInstantiateContract generates a MsgInstantiateContract with random values
func SimulateMsgInstantiateContract(ak types.AccountKeeper, bk BankKeeper, wasmKeeper WasmKeeper, codeSelector CodeIDSelector) simtypes.Operation {
	return func(
		r *rand.Rand,
		app *baseapp.BaseApp,
		ctx sdk.Context,
		accs []simtypes.Account,
		chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)

		codeID := codeSelector(ctx, wasmKeeper)
		if codeID == 0 {
			return simtypes.NoOpMsg(types.ModuleName, types.MsgInstantiateContract{}.Type(), "no codes with permission available"), nil, nil
		}
		deposit := sdk.Coins{}
		spendableCoins := bk.SpendableCoins(ctx, simAccount.Address)
		for _, v := range spendableCoins {
			if bk.IsSendEnabledCoin(ctx, v) {
				deposit = deposit.Add(simtypes.RandSubsetCoins(r, sdk.NewCoins(v))...)
			}
		}

		msg := types.MsgInstantiateContract{
			Sender: simAccount.Address.String(),
			Admin:  simtypes.RandomAccounts(r, 1)[0].Address.String(),
			CodeID: codeID,
			Label:  simtypes.RandStringOfLength(r, 10),
			Msg:    []byte(`{}`),
			Funds:  deposit,
		}

		txCtx := simulation.OperationInput{
			R:               r,
			App:             app,
			TxGen:           simappparams.MakeTestEncodingConfig().TxConfig,
			Cdc:             nil,
			Msg:             &msg,
			MsgType:         msg.Type(),
			Context:         ctx,
			SimAccount:      simAccount,
			AccountKeeper:   ak,
			Bankkeeper:      bk,
			ModuleName:      types.ModuleName,
			CoinsSpentInMsg: deposit,
		}

		return simulation.GenAndDeliverTxWithRandFees(txCtx)
	}
}

// MsgExecuteContractSelector returns contract address to be used in simulations
type MsgExecuteContractSelector = func(ctx sdk.Context, wasmKeeper WasmKeeper) sdk.AccAddress

// MsgExecutePayloader extension point to modify msg with custom payload
type MsgExecutePayloader func(msg *types.MsgExecuteContract) error

// MsgExecuteSenderSelector extension point that returns the sender address
type MsgExecuteSenderSelector func(wasmKeeper WasmKeeper, ctx sdk.Context, contractAddr sdk.AccAddress, accs []simtypes.Account) (simtypes.Account, error)

// SimulateMsgExecuteContract create a execute message a reflect contract instance
func SimulateMsgExecuteContract(
	ak types.AccountKeeper,
	bk BankKeeper,
	wasmKeeper WasmKeeper,
	contractSelector MsgExecuteContractSelector,
	senderSelector MsgExecuteSenderSelector,
	payloader MsgExecutePayloader,
) simtypes.Operation {
	return func(
		r *rand.Rand,
		app *baseapp.BaseApp,
		ctx sdk.Context,
		accs []simtypes.Account,
		chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		contractAddr := contractSelector(ctx, wasmKeeper)
		if contractAddr == nil {
			return simtypes.NoOpMsg(types.ModuleName, types.MsgExecuteContract{}.Type(), "no contract instance available"), nil, nil
		}
		simAccount, err := senderSelector(wasmKeeper, ctx, contractAddr, accs)
		if err != nil {
			return simtypes.NoOpMsg(types.ModuleName, types.MsgExecuteContract{}.Type(), "query contract owner"), nil, err
		}

		deposit := sdk.Coins{}
		spendableCoins := bk.SpendableCoins(ctx, simAccount.Address)
		for _, v := range spendableCoins {
			if bk.IsSendEnabledCoin(ctx, v) {
				deposit = deposit.Add(simtypes.RandSubsetCoins(r, sdk.NewCoins(v))...)
			}
		}
		if deposit.IsZero() {
			return simtypes.NoOpMsg(types.ModuleName, types.MsgExecuteContract{}.Type(), "broke account"), nil, nil
		}
		msg := types.MsgExecuteContract{
			Sender:   simAccount.Address.String(),
			Contract: contractAddr.String(),
			Funds:    deposit,
		}
		if err := payloader(&msg); err != nil {
			return simtypes.NoOpMsg(types.ModuleName, types.MsgExecuteContract{}.Type(), "contract execute payload"), nil, err
		}

		txCtx := simulation.OperationInput{
			R:               r,
			App:             app,
			TxGen:           simappparams.MakeTestEncodingConfig().TxConfig,
			Cdc:             nil,
			Msg:             &msg,
			MsgType:         msg.Type(),
			Context:         ctx,
			SimAccount:      simAccount,
			AccountKeeper:   ak,
			Bankkeeper:      bk,
			ModuleName:      types.ModuleName,
			CoinsSpentInMsg: deposit,
		}
		return simulation.GenAndDeliverTxWithRandFees(txCtx)
	}
}

// DefaultSimulationExecuteContractSelector picks the first contract address
func DefaultSimulationExecuteContractSelector(ctx sdk.Context, wasmKeeper WasmKeeper) sdk.AccAddress {
	var r sdk.AccAddress
	wasmKeeper.IterateContractInfo(ctx, func(address sdk.AccAddress, info types.ContractInfo) bool {
		r = address
		return true
	})
	return r
}

// DefaultSimulationExecuteSenderSelector queries reflect contract for owner address and selects accounts
func DefaultSimulationExecuteSenderSelector(wasmKeeper WasmKeeper, ctx sdk.Context, contractAddr sdk.AccAddress, accs []simtypes.Account) (simtypes.Account, error) {
	var none simtypes.Account
	bz, err := json.Marshal(testdata.ReflectQueryMsg{Owner: &struct{}{}})
	if err != nil {
		return none, sdkerrors.Wrap(err, "build smart query")
	}
	got, err := wasmKeeper.QuerySmart(ctx, contractAddr, bz)
	if err != nil {
		return none, sdkerrors.Wrap(err, "exec smart query")
	}
	var ownerRes testdata.OwnerResponse
	if err := json.Unmarshal(got, &ownerRes); err != nil || ownerRes.Owner == "" {
		return none, sdkerrors.Wrap(err, "parse smart query response")
	}
	ownerAddr, err := sdk.AccAddressFromBech32(ownerRes.Owner)
	if err != nil {
		return none, sdkerrors.Wrap(err, "parse contract owner address")
	}
	simAccount, ok := simtypes.FindAccount(accs, ownerAddr)
	if !ok {
		return none, sdkerrors.Wrap(err, "unknown contract owner address")
	}
	return simAccount, nil
}

// DefaultSimulationExecutePayloader implements a bank msg to send the
// tokens from contract account back to original sender
func DefaultSimulationExecutePayloader(msg *types.MsgExecuteContract) error {
	reflectSend := testdata.ReflectHandleMsg{
		Reflect: &testdata.ReflectPayload{
			Msgs: []wasmvmtypes.CosmosMsg{{
				Bank: &wasmvmtypes.BankMsg{
					Send: &wasmvmtypes.SendMsg{
						ToAddress: msg.Sender, //
						Amount:    wasmkeeper.ConvertSdkCoinsToWasmCoins(msg.Funds),
					},
				},
			}},
		},
	}
	reflectSendBz, err := json.Marshal(reflectSend)
	if err != nil {
		return err
	}
	msg.Msg = reflectSendBz
	return nil
}
