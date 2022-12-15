package simulation

import (
	"encoding/json"
	"fmt"
	"math/big"
	"math/rand"
	"time"

	"github.com/cosmos/cosmos-sdk/baseapp"
	"github.com/cosmos/cosmos-sdk/codec"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	sdktx "github.com/cosmos/cosmos-sdk/types/tx"
	"github.com/cosmos/cosmos-sdk/x/auth/tx"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	"github.com/cosmos/cosmos-sdk/client"
	cryptotypes "github.com/cosmos/cosmos-sdk/crypto/types"
	"github.com/cosmos/cosmos-sdk/x/auth/signing"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/evmos/ethermint/encoding"
	"github.com/evmos/ethermint/tests"
	"github.com/evmos/ethermint/x/evm/keeper"
	"github.com/evmos/ethermint/x/evm/types"
)

const (
	/* #nosec */
	OpWeightMsgEthSimpleTransfer = "op_weight_msg_eth_simple_transfer"
	/* #nosec */
	OpWeightMsgEthCreateContract = "op_weight_msg_eth_create_contract"
	/* #nosec */
	OpWeightMsgEthCallContract = "op_weight_msg_eth_call_contract"
)

const (
	WeightMsgEthSimpleTransfer = 50
	WeightMsgEthCreateContract = 50
)

var ErrNoEnoughBalance = fmt.Errorf("no enough balance")

var maxWaitSeconds = 10

type simulateContext struct {
	context sdk.Context
	bapp    *baseapp.BaseApp
	rand    *rand.Rand
	keeper  *keeper.Keeper
}

// WeightedOperations generate Two kinds of operations: SimulateEthSimpleTransfer, SimulateEthCreateContract.
// Contract call operations work as the future operations of SimulateEthCreateContract.
func WeightedOperations(
	appParams simtypes.AppParams, cdc codec.JSONCodec, ak types.AccountKeeper, k *keeper.Keeper,
) simulation.WeightedOperations {
	var (
		weightMsgEthSimpleTransfer int
		weightMsgEthCreateContract int
	)

	appParams.GetOrGenerate(cdc, OpWeightMsgEthSimpleTransfer, &weightMsgEthSimpleTransfer, nil,
		func(_ *rand.Rand) {
			weightMsgEthSimpleTransfer = WeightMsgEthSimpleTransfer
		},
	)

	appParams.GetOrGenerate(cdc, OpWeightMsgEthCreateContract, &weightMsgEthCreateContract, nil,
		func(_ *rand.Rand) {
			weightMsgEthCreateContract = WeightMsgEthCreateContract
		},
	)

	return simulation.WeightedOperations{
		simulation.NewWeightedOperation(
			weightMsgEthSimpleTransfer,
			SimulateEthSimpleTransfer(ak, k),
		),
		simulation.NewWeightedOperation(
			weightMsgEthCreateContract,
			SimulateEthCreateContract(ak, k),
		),
	}
}

// SimulateEthSimpleTransfer simulate simple eth account transferring gas token.
// It randomly choose sender, recipient and transferable amount.
// Other tx details like nonce, gasprice, gaslimit are calculated to get valid value.
func SimulateEthSimpleTransfer(ak types.AccountKeeper, k *keeper.Keeper) simtypes.Operation {
	return func(
		r *rand.Rand, bapp *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		var recipient simtypes.Account
		if r.Intn(2) == 1 {
			recipient, _ = simtypes.RandomAcc(r, accs)
		} else {
			recipient = simtypes.RandomAccounts(r, 1)[0]
		}
		from := common.BytesToAddress(simAccount.Address)
		to := common.BytesToAddress(recipient.Address)

		simulateContext := &simulateContext{ctx, bapp, r, k}

		return SimulateEthTx(simulateContext, &from, &to, nil, (*hexutil.Bytes)(&[]byte{}), simAccount.PrivKey, nil)
	}
}

// SimulateEthCreateContract simulate create an ERC20 contract.
// It makes operationSimulateEthCallContract the future operations of SimulateEthCreateContract to ensure valid contract call.
func SimulateEthCreateContract(ak types.AccountKeeper, k *keeper.Keeper) simtypes.Operation {
	return func(
		r *rand.Rand, bapp *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)

		from := common.BytesToAddress(simAccount.Address)
		nonce := k.GetNonce(ctx, from)

		ctorArgs, err := types.ERC20Contract.ABI.Pack("", from, sdk.NewIntWithDecimal(1000, 18).BigInt())
		if err != nil {
			return simtypes.NoOpMsg(types.ModuleName, types.TypeMsgEthereumTx, "can not pack owner and supply"), nil, err
		}
		data := types.ERC20Contract.Bin
		data = append(data, ctorArgs...)

		simulateContext := &simulateContext{ctx, bapp, r, k}

		fops := make([]simtypes.FutureOperation, 1)
		whenCall := ctx.BlockHeader().Time.Add(time.Duration(r.Intn(maxWaitSeconds)+1) * time.Second)
		contractAddr := crypto.CreateAddress(from, nonce)
		var tokenReceipient simtypes.Account
		if r.Intn(2) == 1 {
			tokenReceipient, _ = simtypes.RandomAcc(r, accs)
		} else {
			tokenReceipient = simtypes.RandomAccounts(r, 1)[0]
		}
		receipientAddr := common.BytesToAddress(tokenReceipient.Address)
		fops[0] = simtypes.FutureOperation{
			BlockTime: whenCall,
			Op:        operationSimulateEthCallContract(k, &contractAddr, &receipientAddr, nil),
		}
		return SimulateEthTx(simulateContext, &from, nil, nil, (*hexutil.Bytes)(&data), simAccount.PrivKey, fops)
	}
}

// operationSimulateEthCallContract simulate calling an contract.
// It is always calling an ERC20 contract.
func operationSimulateEthCallContract(k *keeper.Keeper, contractAddr, to *common.Address, amount *big.Int) simtypes.Operation {
	return func(
		r *rand.Rand, bapp *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)

		from := common.BytesToAddress(simAccount.Address)

		ctorArgs, err := types.ERC20Contract.ABI.Pack("transfer", to, amount)
		if err != nil {
			return simtypes.NoOpMsg(types.ModuleName, types.TypeMsgEthereumTx, "can not pack method and args"), nil, err
		}
		data := types.ERC20Contract.Bin
		data = append(data, ctorArgs...)

		simulateContext := &simulateContext{ctx, bapp, r, k}

		return SimulateEthTx(simulateContext, &from, contractAddr, nil, (*hexutil.Bytes)(&data), simAccount.PrivKey, nil)
	}
}

// SimulateEthTx creates valid ethereum tx and pack it as cosmos tx, and deliver it.
func SimulateEthTx(
	ctx *simulateContext, from, to *common.Address, amount *big.Int, data *hexutil.Bytes, prv cryptotypes.PrivKey, fops []simtypes.FutureOperation,
) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
	ethTx, err := CreateRandomValidEthTx(ctx, from, nil, nil, data)
	if err == ErrNoEnoughBalance {
		return simtypes.NoOpMsg(types.ModuleName, types.TypeMsgEthereumTx, "no enough balance"), nil, nil
	}
	if err != nil {
		return simtypes.NoOpMsg(types.ModuleName, types.TypeMsgEthereumTx, "can not create valid eth tx"), nil, err
	}

	txConfig := encoding.MakeConfig(module.NewBasicManager()).TxConfig
	txBuilder := txConfig.NewTxBuilder()
	signedTx, err := GetSignedTx(ctx, txBuilder, ethTx, prv)
	if err != nil {
		return simtypes.NoOpMsg(types.ModuleName, types.TypeMsgEthereumTx, "can not sign ethereum tx"), nil, err
	}

	_, _, err = ctx.bapp.Deliver(txConfig.TxEncoder(), signedTx)
	if err != nil {
		return simtypes.NoOpMsg(types.ModuleName, types.TypeMsgEthereumTx, "failed to deliver tx"), nil, err
	}

	return simtypes.OperationMsg{}, fops, nil
}

// CreateRandomValidEthTx create the ethereum tx with valid random values
func CreateRandomValidEthTx(ctx *simulateContext, from, to *common.Address, amount *big.Int, data *hexutil.Bytes) (ethTx *types.MsgEthereumTx, err error) {
	gasCap := ctx.rand.Uint64()
	estimateGas, err := EstimateGas(ctx, from, to, data, gasCap)
	if err != nil {
		return nil, err
	}
	// we suppose that gasLimit should be larger than estimateGas to ensure tx validity
	gasLimit := estimateGas + uint64(ctx.rand.Intn(int(sdktx.MaxGasWanted-estimateGas)))
	ethChainID := ctx.keeper.ChainID()
	chainConfig := ctx.keeper.GetParams(ctx.context).ChainConfig.EthereumConfig(ethChainID)
	gasPrice := ctx.keeper.GetBaseFee(ctx.context, chainConfig)
	gasFeeCap := new(big.Int).Add(gasPrice, big.NewInt(int64(ctx.rand.Int())))
	gasTipCap := big.NewInt(int64(ctx.rand.Int()))
	nonce := ctx.keeper.GetNonce(ctx.context, *from)

	if amount == nil {
		amount, err = RandomTransferableAmount(ctx, *from, estimateGas, gasFeeCap)
		if err != nil {
			return nil, err
		}
	}

	ethTx = types.NewTx(ethChainID, nonce, to, amount, gasLimit, gasPrice, gasFeeCap, gasTipCap, *data, nil)
	ethTx.From = from.String()
	return ethTx, nil
}

// EstimateGas estimates the gas used by quering the keeper.
func EstimateGas(ctx *simulateContext, from, to *common.Address, data *hexutil.Bytes, gasCap uint64) (gas uint64, err error) {
	args, err := json.Marshal(&types.TransactionArgs{To: to, From: from, Data: data})
	if err != nil {
		return 0, err
	}

	res, err := ctx.keeper.EstimateGas(sdk.WrapSDKContext(ctx.context), &types.EthCallRequest{
		Args:   args,
		GasCap: gasCap,
	})
	if err != nil {
		return 0, err
	}
	return res.Gas, nil
}

// RandomTransferableAmount generates a random valid transferable amount.
// Transferable amount is between the range [0, spendable), spendable = balance - gasFeeCap * GasLimit.
func RandomTransferableAmount(ctx *simulateContext, address common.Address, estimateGas uint64, gasFeeCap *big.Int) (amount *big.Int, err error) {
	balance := ctx.keeper.GetBalance(ctx.context, address)
	feeLimit := new(big.Int).Mul(gasFeeCap, big.NewInt(int64(estimateGas)))
	if (feeLimit.Cmp(balance)) > 0 {
		return nil, ErrNoEnoughBalance
	}
	spendable := new(big.Int).Sub(balance, feeLimit)
	if spendable.Cmp(big.NewInt(0)) == 0 {
		amount = new(big.Int).Set(spendable)
		return amount, nil
	}
	simAmount, err := simtypes.RandPositiveInt(ctx.rand, sdk.NewIntFromBigInt(spendable))
	if err != nil {
		return nil, err
	}
	amount = simAmount.BigInt()
	return amount, nil
}

// GetSignedTx sign the ethereum tx and packs it as a signing.Tx .
func GetSignedTx(ctx *simulateContext, txBuilder client.TxBuilder, msg *types.MsgEthereumTx, prv cryptotypes.PrivKey) (signedTx signing.Tx, err error) {
	builder, ok := txBuilder.(tx.ExtensionOptionsTxBuilder)
	if !ok {
		return nil, fmt.Errorf("can not initiate ExtensionOptionsTxBuilder")
	}
	option, err := codectypes.NewAnyWithValue(&types.ExtensionOptionsEthereumTx{})
	if err != nil {
		return nil, err
	}
	builder.SetExtensionOptions(option)

	if err := msg.Sign(ethtypes.LatestSignerForChainID(ctx.keeper.ChainID()), tests.NewSigner(prv)); err != nil {
		return nil, err
	}

	if err = builder.SetMsgs(msg); err != nil {
		return nil, err
	}

	txData, err := types.UnpackTxData(msg.Data)
	if err != nil {
		return nil, err
	}

	fees := sdk.NewCoins(sdk.NewCoin(ctx.keeper.GetParams(ctx.context).EvmDenom, sdk.NewIntFromBigInt(txData.Fee())))
	builder.SetFeeAmount(fees)
	builder.SetGasLimit(msg.GetGas())

	signedTx = builder.GetTx()
	return signedTx, nil
}
