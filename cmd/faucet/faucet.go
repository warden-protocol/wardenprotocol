package main

import (
	"context"
	"crypto/ecdsa"
	"errors"
	"fmt"
	"math/big"
	"net/http"
	"slices"
	"strings"
	"sync"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/rs/zerolog"

	"github.com/warden-protocol/wardenprotocol/cmd/faucet/pkg/config"
)

type Faucet struct {
	*sync.Mutex

	log             zerolog.Logger
	config          config.Config
	client          *ethclient.Client
	privateKey      *ecdsa.PrivateKey
	fromAddress     common.Address
	DailySupply     float64
	TokensAvailable float64
	Amount          float64
	Batch           []string
	LatestTXHash    string
	DisplayTokens   bool
	nonce           uint64
}

const (
	mutexLocked = 1
	dailyHours  = 24
)

func validAddress(addr string) error {
	if !common.IsHexAddress(addr) {
		reqInvalidAddrCount.Inc()
		return fmt.Errorf("invalid Ethereum address: %s", addr)
	}
	return nil
}

func InitFaucet(ctx context.Context, logger zerolog.Logger) (Faucet, error) {
	cfg, err := config.LoadConfig()
	if err != nil {
		logger.Fatal().Msgf("error loading config: %s", err)
	}

	// Connect to the Ethereum client
	client, err := ethclient.Dial(cfg.Node)
	if err != nil {
		return Faucet{}, fmt.Errorf("failed to connect to the Ethereum client: %w", err)
	}

	// Parse the private key from hex string
	privateKey, err := crypto.HexToECDSA(cfg.PrivateKey)
	if err != nil {
		return Faucet{}, fmt.Errorf("failed to parse private key: %w", err)
	}

	// Get the public key and address
	publicKey := privateKey.Public()
	publicKeyECDSA, ok := publicKey.(*ecdsa.PublicKey)
	if !ok {
		return Faucet{}, errors.New("failed to cast public key to ECDSA")
	}
	fromAddress := crypto.PubkeyToAddress(*publicKeyECDSA)

	f := Faucet{
		config:          cfg,
		client:          client,
		privateKey:      privateKey,
		fromAddress:     fromAddress,
		Mutex:           &sync.Mutex{},
		Batch:           []string{},
		log:             logger,
		TokensAvailable: float64(cfg.DailyLimit),
		DailySupply:     float64(cfg.DailyLimit),
		Amount:          cfg.Amount,
		DisplayTokens:   cfg.DisplayTokens,
	}

	// Get the initial nonce
	nonce, err := client.PendingNonceAt(ctx, fromAddress)
	if err != nil {
		return Faucet{}, fmt.Errorf("failed to get nonce: %w", err)
	}
	f.nonce = nonce

	dailySupply.Set(f.DailySupply)

	logger.Info().Msgf("EVM Faucet initialized with address: %s", fromAddress.Hex())

	return f, nil
}

func addressInBatch(batch []string, addr string) bool {
	return slices.Contains(batch, addr)
}

func (f *Faucet) Send(ctx context.Context, addr string, force bool) (string, int, error) {
	f.Lock()
	defer f.Unlock()

	if f.TokensAvailable <= 0 {
		return "",
			http.StatusTooManyRequests,
			errors.New("no tokens available, please come back tomorrow")
	}

	// Normalize address to lowercase for consistency
	if strings.HasPrefix(addr, "0x") {
		addr = strings.ToLower(addr)
	}

	if len(f.Batch) < f.config.BatchLimit && !force {
		if strings.Contains(f.config.Blacklist, addr) {
			return "", http.StatusUnprocessableEntity, fmt.Errorf("address %s is blacklisted", addr)
		}

		if err := validAddress(addr); err != nil {
			return "", http.StatusUnprocessableEntity, err
		}

		if addressInBatch(f.Batch, addr) {
			return "", http.StatusUnprocessableEntity, errors.New("address already in batch")
		}

		f.Batch = append(f.Batch, addr)
		batchSize.Inc()
		return "", 0, nil
	}

	if len(f.Batch) == 0 {
		return "", http.StatusBadRequest, errors.New("no addresses in batch to send to")
	}

	// Send to all addresses in batch
	var txHashes []string
	var totalSent float64

	for _, address := range f.Batch {
		txHash, err := f.sendToAddress(ctx, address)
		if err != nil {
			f.log.Error().Msgf("failed to send to address %s: %v", address, err)
			continue
		}
		txHashes = append(txHashes, txHash)
		totalSent += f.Amount
		f.log.Info().Msgf("sent %f ETH to %s, tx: %s", f.Amount, address, txHash)
	}

	if len(txHashes) == 0 {
		return "", http.StatusInternalServerError, errors.New("failed to send to any addresses")
	}

	f.TokensAvailable -= totalSent
	f.log.Debug().Msgf("tokens available: %f", f.TokensAvailable)
	f.log.Info().Msgf("tokens sent to %v", f.Batch)
	dailySupply.Set(f.TokensAvailable)

	// Return the first transaction hash (or could return all)
	latestTxHash := txHashes[len(txHashes)-1]
	f.LatestTXHash = latestTxHash
	f.Batch = []string{}

	return latestTxHash, http.StatusOK, nil
}

func (f *Faucet) sendToAddress(ctx context.Context, toAddr string) (string, error) {
	toAddress := common.HexToAddress(toAddr)

	// Convert amount to wei
	amount := new(big.Float).SetFloat64(f.config.Amount)
	multiplierInt := new(big.Int).Exp(big.NewInt(10), big.NewInt(int64(f.config.Exponent)), nil)
	multiplier := new(big.Float).SetInt(multiplierInt)
	amount.Mul(amount, multiplier)

	amountWei := new(big.Int)
	amount.Int(amountWei)

	// Get current gas price
	gasPrice, err := f.client.SuggestGasPrice(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to suggest gas price: %w", err)
	}

	// Create the transaction
	tx := types.NewTransaction(
		f.nonce,
		toAddress,
		amountWei,
		21000, // Standard gas limit for ETH transfer
		gasPrice,
		nil,
	)

	// Get the chain ID
	chainID, err := f.client.NetworkID(ctx)
	if err != nil {
		return "", fmt.Errorf("failed to get network ID: %w", err)
	}

	// Sign the transaction
	signedTx, err := types.SignTx(tx, types.NewEIP155Signer(chainID), f.privateKey)
	if err != nil {
		return "", fmt.Errorf("failed to sign transaction: %w", err)
	}

	// Send the transaction
	err = f.client.SendTransaction(ctx, signedTx)
	if err != nil {
		return "", fmt.Errorf("failed to send transaction: %w", err)
	}

	// Increment nonce for next transaction
	f.nonce++

	return signedTx.Hash().Hex(), nil
}

// DailyRefresh resets the available tokens daily
func (f *Faucet) DailyRefresh() {
	for {
		now := time.Now()
		nextDay := now.AddDate(0, 0, 1).Truncate(dailyHours * time.Hour)
		durationUntilNextDay := time.Until(nextDay)

		f.log.Info().Msgf("next token refresh in %s", durationUntilNextDay)
		time.Sleep(durationUntilNextDay)

		f.Lock()
		f.TokensAvailable = f.DailySupply
		f.Unlock()
	}
}

func (f *Faucet) batchProcessInterval() {
	f.log.Info().Msgf("starting batch process interval")

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	ticker := time.NewTicker(f.config.BatchInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if len(f.Batch) > 0 {
				if txHash, _, err := f.Send(ctx, "", true); err != nil {
					reqErrorCount.Inc()
					f.log.Error().Msgf("error sending batch: %s", err)
				} else {
					f.log.Debug().Msgf("tx hash %s", txHash)
					f.LatestTXHash = txHash

					batchSendCount.Inc()
					batchSize.Set(0)
				}
			}
		}
	}
}
