package keeper

import (
	"crypto/ecdsa"
	"errors"
	"fmt"
	"math/big"

	cometabci "github.com/cometbft/cometbft/abci/types"
	"github.com/cosmos/cosmos-sdk/client"
	codectypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authante "github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/cosmos/cosmos-sdk/x/auth/signing"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	"github.com/cosmos/evm/crypto/ethsecp256k1"
	vmtypes "github.com/cosmos/evm/x/vm/types"
	"github.com/cosmos/gogoproto/proto"
	"github.com/ethereum/go-ethereum/common"
	ethtypes "github.com/ethereum/go-ethereum/core/types"

	"github.com/warden-protocol/wardenprotocol/warden/abciutil"
	types "github.com/warden-protocol/wardenprotocol/warden/x/sched/types/v1beta1"
)

const (
	// SchedPrecompileAddress is the address of the x/sched precompile contract.
	//
	// Must match the one defined in precompiles/sched.PrecompileAddress.
	SchedPrecompileAddress = "0x0000000000000000000000000000000000000905"

	// ExecuteCallbacksSelector is the 4-byte selector for executeCallbacks().
	ExecuteCallbacksSelector = "0x06e6ee28"

	// schedTxTriggerPosition is the position the the injected tx will occupy in the block.
	schedTxTriggerPosition = 2
)

func (k Keeper) PrepareProposalHandler(txConfig client.TxConfig) sdk.PrepareProposalHandler {
	return abciutil.InjectTxPrepareProposalHandler(func(ctx sdk.Context, _ *cometabci.RequestPrepareProposal) (int, []byte, error) {
		ethtx, err := k.buildEthTx(txConfig)
		if err != nil {
			return 0, nil, err
		}

		return schedTxTriggerPosition, ethtx, nil
	})
}

func (k Keeper) ProcessProposalHandler(txConfig client.TxConfig) sdk.ProcessProposalHandler {
	txDecoder := txConfig.TxDecoder()

	return func(ctx sdk.Context, req *cometabci.RequestProcessProposal) (*cometabci.ResponseProcessProposal, error) {
		var (
			position int
			found    bool
		)
		// find the transactions that have the ExtensionOptionsCallbacks
		for i, txBz := range req.Txs {
			tx, err := txDecoder(txBz)
			if err != nil {
				// invalid transaction data, just skip it
				continue
			}

			if hasExtOptsTx, ok := tx.(authante.HasExtensionOptionsTx); ok {
				opts := hasExtOptsTx.GetExtensionOptions()

				typeURL := "/" + proto.MessageName(&types.ExtensionOptionsCallbacks{})
				if len(opts) > 0 && opts[0].TypeUrl == typeURL {
					if found {
						// found a second transaction with the extensions
						ctx.Logger().Error("invalid proposal: only one transaction per block can have the extension " + typeURL)

						return &cometabci.ResponseProcessProposal{
							Status: cometabci.ResponseProcessProposal_REJECT,
						}, nil
					}

					position = i
					found = true
				}
			}
		}

		// accept blocks that do not have the injected transaction at all
		if !found {
			return &cometabci.ResponseProcessProposal{
				Status: cometabci.ResponseProcessProposal_ACCEPT,
			}, nil
		}

		// expect the tx to be at the block position [schedTxTriggerPosition]
		if position != schedTxTriggerPosition {
			ctx.Logger().Error("found x/sched injected transaction at the wrong position in block", "expected", schedTxTriggerPosition, "found", position)

			return &cometabci.ResponseProcessProposal{
				Status: cometabci.ResponseProcessProposal_REJECT,
			}, nil
		}

		return &cometabci.ResponseProcessProposal{
			Status: cometabci.ResponseProcessProposal_ACCEPT,
		}, nil
	}
}

// privkey is used to sign the injected ethereum transaction,
// this signature is not actually checked, so any private key
// will work.
var privkey *ecdsa.PrivateKey

func init() {
	pk, err := ethsecp256k1.GenerateKey()
	if err != nil {
		panic(err)
	}

	ecdsaPk, err := pk.ToECDSA()
	if err != nil {
		panic(err)
	}

	privkey = ecdsaPk
}

func (k Keeper) buildEthTx(txConfig client.TxConfig) ([]byte, error) {
	chainID := vmtypes.GetChainConfig().ChainId

	to := common.HexToAddress(SchedPrecompileAddress) // x/sched precompile
	data := common.FromHex(ExecuteCallbacksSelector)  // executeCallbacks()

	signedEthTx, err := ethtypes.SignNewTx(
		privkey,
		ethtypes.NewLondonSigner(new(big.Int).SetUint64(chainID)),
		&ethtypes.LegacyTx{
			Gas:      200_000, // this value must be at least equal to the intrinsic gas cost or the tx will be rejected by the evm without even trying to execute it
			GasPrice: big.NewInt(0),
			To:       &to,
			Data:     data,
		})
	if err != nil {
		return nil, fmt.Errorf("SignNewTx: %w", err)
	}

	builder := txConfig.NewTxBuilder()

	cosmosTx, err := buildCosmosWrappedTx(builder, signedEthTx)
	if err != nil {
		return nil, err
	}

	if err := overwriteExtension(builder); err != nil {
		return nil, err
	}

	txBytes, err := txConfig.TxEncoder()(cosmosTx)
	if err != nil {
		return nil, err
	}

	return txBytes, nil
}

func buildCosmosWrappedTx(builder client.TxBuilder, signedEthTx *ethtypes.Transaction) (signing.Tx, error) {
	tx := &vmtypes.MsgEthereumTx{}
	if err := tx.FromEthereumTx(signedEthTx); err != nil {
		return nil, fmt.Errorf("FromEthereumTx: %w", err)
	}

	denom := vmtypes.GetEVMCoinDenom()

	cosmosTx, err := tx.BuildTx(builder, denom)
	if err != nil {
		return nil, fmt.Errorf("BuildTx: %w", err)
	}

	return cosmosTx, nil
}

func overwriteExtension(builder client.TxBuilder) error {
	// replace ExtensionOptionsEthereumTx with ExtensionOptionsTxBuilder
	builderOpt, ok := builder.(authtx.ExtensionOptionsTxBuilder)
	if !ok {
		return errors.New("unsupported builder")
	}

	option, err := codectypes.NewAnyWithValue(&types.ExtensionOptionsCallbacks{})
	if err != nil {
		return err
	}

	builderOpt.SetExtensionOptions(option)

	return nil
}
