package backend

import (
	"fmt"
	"math/big"
	"time"

	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	sdkcrypto "github.com/cosmos/cosmos-sdk/crypto"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdkconfig "github.com/cosmos/cosmos-sdk/server/config"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	authtx "github.com/cosmos/cosmos-sdk/x/auth/tx"
	distributiontypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/evmos/ethermint/crypto/ethsecp256k1"
	rpctypes "github.com/evmos/ethermint/rpc/types"
	"github.com/evmos/ethermint/server/config"
	ethermint "github.com/evmos/ethermint/types"
	evmtypes "github.com/evmos/ethermint/x/evm/types"
	tmtypes "github.com/tendermint/tendermint/types"
)

// Accounts returns the list of accounts available to this node.
func (b *Backend) Accounts() ([]common.Address, error) {
	addresses := make([]common.Address, 0) // return [] instead of nil if empty

	infos, err := b.clientCtx.Keyring.List()
	if err != nil {
		return addresses, err
	}

	for _, info := range infos {
		addressBytes := info.GetPubKey().Address().Bytes()
		addresses = append(addresses, common.BytesToAddress(addressBytes))
	}

	return addresses, nil
}

// Syncing returns false in case the node is currently not syncing with the network. It can be up to date or has not
// yet received the latest block headers from its pears. In case it is synchronizing:
// - startingBlock: block number this node started to synchronize from
// - currentBlock:  block number this node is currently importing
// - highestBlock:  block number of the highest block header this node has received from peers
// - pulledStates:  number of state entries processed until now
// - knownStates:   number of known state entries that still need to be pulled
func (b *Backend) Syncing() (interface{}, error) {
	status, err := b.clientCtx.Client.Status(b.ctx)
	if err != nil {
		return false, err
	}

	if !status.SyncInfo.CatchingUp {
		return false, nil
	}

	return map[string]interface{}{
		"startingBlock": hexutil.Uint64(status.SyncInfo.EarliestBlockHeight),
		"currentBlock":  hexutil.Uint64(status.SyncInfo.LatestBlockHeight),
		// "highestBlock":  nil, // NA
		// "pulledStates":  nil, // NA
		// "knownStates":   nil, // NA
	}, nil
}

// SetEtherbase sets the etherbase of the miner
func (b *Backend) SetEtherbase(etherbase common.Address) bool {
	delAddr, err := b.GetCoinbase()
	if err != nil {
		b.logger.Debug("failed to get coinbase address", "error", err.Error())
		return false
	}

	withdrawAddr := sdk.AccAddress(etherbase.Bytes())
	msg := distributiontypes.NewMsgSetWithdrawAddress(delAddr, withdrawAddr)

	if err := msg.ValidateBasic(); err != nil {
		b.logger.Debug("tx failed basic validation", "error", err.Error())
		return false
	}

	// Assemble transaction from fields
	builder, ok := b.clientCtx.TxConfig.NewTxBuilder().(authtx.ExtensionOptionsTxBuilder)
	if !ok {
		b.logger.Debug("clientCtx.TxConfig.NewTxBuilder returns unsupported builder", "error", err.Error())
		return false
	}

	err = builder.SetMsgs(msg)
	if err != nil {
		b.logger.Error("builder.SetMsgs failed", "error", err.Error())
		return false
	}

	// Fetch minimun gas price to calculate fees using the configuration.
	minGasPrices := b.cfg.GetMinGasPrices()
	if len(minGasPrices) == 0 || minGasPrices.Empty() {
		b.logger.Debug("the minimun fee is not set")
		return false
	}
	minGasPriceValue := minGasPrices[0].Amount
	denom := minGasPrices[0].Denom

	delCommonAddr := common.BytesToAddress(delAddr.Bytes())
	nonce, err := b.GetTransactionCount(delCommonAddr, rpctypes.EthPendingBlockNumber)
	if err != nil {
		b.logger.Debug("failed to get nonce", "error", err.Error())
		return false
	}

	txFactory := tx.Factory{}
	txFactory = txFactory.
		WithChainID(b.clientCtx.ChainID).
		WithKeybase(b.clientCtx.Keyring).
		WithTxConfig(b.clientCtx.TxConfig).
		WithSequence(uint64(*nonce)).
		WithGasAdjustment(1.25)

	_, gas, err := tx.CalculateGas(b.clientCtx, txFactory, msg)
	if err != nil {
		b.logger.Debug("failed to calculate gas", "error", err.Error())
		return false
	}

	txFactory = txFactory.WithGas(gas)

	value := new(big.Int).SetUint64(gas * minGasPriceValue.Ceil().TruncateInt().Uint64())
	fees := sdk.Coins{sdk.NewCoin(denom, sdk.NewIntFromBigInt(value))}
	builder.SetFeeAmount(fees)
	builder.SetGasLimit(gas)

	keyInfo, err := b.clientCtx.Keyring.KeyByAddress(delAddr)
	if err != nil {
		b.logger.Debug("failed to get the wallet address using the keyring", "error", err.Error())
		return false
	}

	if err := tx.Sign(txFactory, keyInfo.GetName(), builder, false); err != nil {
		b.logger.Debug("failed to sign tx", "error", err.Error())
		return false
	}

	// Encode transaction by default Tx encoder
	txEncoder := b.clientCtx.TxConfig.TxEncoder()
	txBytes, err := txEncoder(builder.GetTx())
	if err != nil {
		b.logger.Debug("failed to encode eth tx using default encoder", "error", err.Error())
		return false
	}

	tmHash := common.BytesToHash(tmtypes.Tx(txBytes).Hash())

	// Broadcast transaction in sync mode (default)
	// NOTE: If error is encountered on the node, the broadcast will not return an error
	syncCtx := b.clientCtx.WithBroadcastMode(flags.BroadcastSync)
	rsp, err := syncCtx.BroadcastTx(txBytes)
	if rsp != nil && rsp.Code != 0 {
		err = sdkerrors.ABCIError(rsp.Codespace, rsp.Code, rsp.RawLog)
	}
	if err != nil {
		b.logger.Debug("failed to broadcast tx", "error", err.Error())
		return false
	}

	b.logger.Debug("broadcasted tx to set miner withdraw address (etherbase)", "hash", tmHash.String())
	return true
}

// ImportRawKey armors and encrypts a given raw hex encoded ECDSA key and stores it into the key directory.
// The name of the key will have the format "personal_<length-keys>", where <length-keys> is the total number of
// keys stored on the keyring.
//
// NOTE: The key will be both armored and encrypted using the same passphrase.
func (b *Backend) ImportRawKey(privkey, password string) (common.Address, error) {
	priv, err := crypto.HexToECDSA(privkey)
	if err != nil {
		return common.Address{}, err
	}

	privKey := &ethsecp256k1.PrivKey{Key: crypto.FromECDSA(priv)}

	addr := sdk.AccAddress(privKey.PubKey().Address().Bytes())
	ethereumAddr := common.BytesToAddress(addr)

	// return if the key has already been imported
	if _, err := b.clientCtx.Keyring.KeyByAddress(addr); err == nil {
		return ethereumAddr, nil
	}

	// ignore error as we only care about the length of the list
	list, _ := b.clientCtx.Keyring.List()
	privKeyName := fmt.Sprintf("personal_%d", len(list))

	armor := sdkcrypto.EncryptArmorPrivKey(privKey, password, ethsecp256k1.KeyType)

	if err := b.clientCtx.Keyring.ImportPrivKey(privKeyName, armor, password); err != nil {
		return common.Address{}, err
	}

	b.logger.Info("key successfully imported", "name", privKeyName, "address", ethereumAddr.String())

	return ethereumAddr, nil
}

// ListAccounts will return a list of addresses for accounts this node manages.
func (b *Backend) ListAccounts() ([]common.Address, error) {
	addrs := []common.Address{}

	list, err := b.clientCtx.Keyring.List()
	if err != nil {
		return nil, err
	}

	for _, info := range list {
		addrs = append(addrs, common.BytesToAddress(info.GetPubKey().Address()))
	}

	return addrs, nil
}

// NewAccount will create a new account and returns the address for the new account.
func (b *Backend) NewMnemonic(uid string, language keyring.Language, hdPath, bip39Passphrase string, algo keyring.SignatureAlgo) (keyring.Info, error) {
	info, _, err := b.clientCtx.Keyring.NewMnemonic(uid, keyring.English, bip39Passphrase, bip39Passphrase, algo)
	if err != nil {
		return nil, err
	}
	return info, err
}

// SetGasPrice sets the minimum accepted gas price for the miner.
// NOTE: this function accepts only integers to have the same interface than go-eth
// to use float values, the gas prices must be configured using the configuration file
func (b *Backend) SetGasPrice(gasPrice hexutil.Big) bool {
	appConf, err := config.GetConfig(b.clientCtx.Viper)
	if err != nil {
		b.logger.Debug("could not get the server config", "error", err.Error())
		return false
	}

	var unit string
	minGasPrices := appConf.GetMinGasPrices()

	// fetch the base denom from the sdk Config in case it's not currently defined on the node config
	if len(minGasPrices) == 0 || minGasPrices.Empty() {
		var err error
		unit, err = sdk.GetBaseDenom()
		if err != nil {
			b.logger.Debug("could not get the denom of smallest unit registered", "error", err.Error())
			return false
		}
	} else {
		unit = minGasPrices[0].Denom
	}

	c := sdk.NewDecCoin(unit, sdk.NewIntFromBigInt(gasPrice.ToInt()))

	appConf.SetMinGasPrices(sdk.DecCoins{c})
	sdkconfig.WriteConfigFile(b.clientCtx.Viper.ConfigFileUsed(), appConf)
	b.logger.Info("Your configuration file was modified. Please RESTART your node.", "gas-price", c.String())
	return true
}

// UnprotectedAllowed returns the node configuration value for allowing
// unprotected transactions (i.e not replay-protected)
func (b Backend) UnprotectedAllowed() bool {
	return b.allowUnprotectedTxs
}

// RPCGasCap is the global gas cap for eth-call variants.
func (b *Backend) RPCGasCap() uint64 {
	return b.cfg.JSONRPC.GasCap
}

// RPCEVMTimeout is the global evm timeout for eth-call variants.
func (b *Backend) RPCEVMTimeout() time.Duration {
	return b.cfg.JSONRPC.EVMTimeout
}

// RPCGasCap is the global gas cap for eth-call variants.
func (b *Backend) RPCTxFeeCap() float64 {
	return b.cfg.JSONRPC.TxFeeCap
}

// RPCFilterCap is the limit for total number of filters that can be created
func (b *Backend) RPCFilterCap() int32 {
	return b.cfg.JSONRPC.FilterCap
}

// RPCFeeHistoryCap is the limit for total number of blocks that can be fetched
func (b *Backend) RPCFeeHistoryCap() int32 {
	return b.cfg.JSONRPC.FeeHistoryCap
}

// RPCLogsCap defines the max number of results can be returned from single `eth_getLogs` query.
func (b *Backend) RPCLogsCap() int32 {
	return b.cfg.JSONRPC.LogsCap
}

// RPCBlockRangeCap defines the max block range allowed for `eth_getLogs` query.
func (b *Backend) RPCBlockRangeCap() int32 {
	return b.cfg.JSONRPC.BlockRangeCap
}

// RPCMinGasPrice returns the minimum gas price for a transaction obtained from
// the node config. If set value is 0, it will default to 20.

func (b *Backend) RPCMinGasPrice() int64 {
	evmParams, err := b.queryClient.Params(b.ctx, &evmtypes.QueryParamsRequest{})
	if err != nil {
		return ethermint.DefaultGasPrice
	}

	minGasPrice := b.cfg.GetMinGasPrices()
	amt := minGasPrice.AmountOf(evmParams.Params.EvmDenom).TruncateInt64()
	if amt == 0 {
		return ethermint.DefaultGasPrice
	}

	return amt
}
