package sched

import (
	"fmt"
	"math/big"

	"cosmossdk.io/math"
	"cosmossdk.io/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/vm"
	"github.com/holiman/uint256"

	"github.com/warden-protocol/wardenprotocol/precompiles/callbacks"
	precommon "github.com/warden-protocol/wardenprotocol/precompiles/common"
)

const (
	ExecuteCallbacksMethod = "executeCallbacks"
)

func (p *Precompile) ExecuteCallbacksMethod(
	ctx sdk.Context,
	evm *vm.EVM,
	stateDB vm.StateDB,
	method *abi.Method,
	args any,
) ([]byte, error) {
	ctx = ctx.WithGasMeter(types.NewInfiniteGasMeter())

	queue := p.schedKeeper.CallbacksQueue(ctx)
	it, err := queue.Iterate(ctx, nil)
	if err != nil {
		return nil, err
	}

	for ; it.Valid(); it.Next() {
		id, err := it.Key()
		if err != nil {
			return nil, err
		}

		cb, err := p.schedKeeper.GetCallbackById(ctx, id)
		if err != nil {
			return nil, err
		}

		output, err := it.Value()
		if err != nil {
			return nil, err
		}

		abi, err := callbacks.ICallbackMetaData.GetAbi()
		if err != nil {
			return nil, err
		}

		method := "cb"
		if _, ok := abi.Methods[method]; !ok {
			return nil, fmt.Errorf("invalid callback method: %v", method)
		}

		cbAddress, err := precommon.AddressFromBech32Str(cb.Address)
		if err != nil {
			return nil, err
		}

		data, err := abi.Pack(method, id, output)
		if err != nil {
			return nil, err
		}

		// take a snapshot in case we need to rollback just this callback execution
		snapshot := stateDB.Snapshot()

		ret, leftOverGas, err := evm.Call(
			common.HexToAddress(PrecompileAddress),
			cbAddress,
			data,
			cb.GasLimit,
			uint256.MustFromDecimal("0"),
		)
		if err != nil {
			if err := p.schedKeeper.SetFailed(ctx, id, fmt.Errorf("executing callback: %w", err)); err != nil {
				return nil, err
			}
			continue
		}

		// deduct callback cost from cbAddress balance
		params := p.evmKeeper.GetParams(ctx)
		feeAmt := new(big.Int).Mul(evm.GasPrice, new(big.Int).SetUint64(cb.GasLimit-leftOverGas))
		fees := sdk.NewCoins(sdk.NewCoin(params.EvmDenom, math.NewIntFromBigInt(feeAmt)))
		if err := p.evmKeeper.DeductTxCostsFromUserBalance(ctx, fees, cbAddress); err != nil {
			stateDB.RevertToSnapshot(snapshot)
			if err := p.schedKeeper.SetFailed(ctx, id, fmt.Errorf("paying callback gas cost: %w", err)); err != nil {
				return nil, err
			}
			continue
		}

		if err := p.schedKeeper.SetSuccess(ctx, id, ret); err != nil {
			return nil, err
		}
	}
	if err := it.Close(); err != nil {
		return nil, err
	}

	if err := queue.Clear(ctx, nil); err != nil {
		return nil, err
	}

	if err := p.eventsRegistry.EmitEvents(ctx, stateDB, &evm.Origin); err != nil {
		return nil, err
	}

	return nil, nil
}
