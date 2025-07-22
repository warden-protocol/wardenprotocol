package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"math/big"
	"net/http"
	"os/exec"
	"slices"
	"strings"
	"sync"
	"time"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32"
	"github.com/ethereum/go-ethereum/common"
	"github.com/rs/zerolog"

	"github.com/warden-protocol/wardenprotocol/cmd/faucet/pkg/config"
)

type Out struct {
	Stdout []byte
	Stderr []byte
}

type Faucet struct {
	*sync.Mutex

	log             zerolog.Logger
	config          config.Config
	DailySupply     float64
	TokensAvailable float64
	Amount          float64
	Batch           []string
	LatestTXHash    string
	DisplayTokens   bool
}

const (
	mutexLocked = 1
	workers     = 2
	dailyHours  = 24
)

func execute(ctx context.Context, cmdString string) (Out, error) {
	// Create the command
	cmd := exec.CommandContext(ctx, "sh", "-c", cmdString)

	// Get the output pipes
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		return Out{}, fmt.Errorf("error getting stdout pipe: %w", err)
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		return Out{}, fmt.Errorf("error getting stderr pipe: %w", err)
	}

	// Start the command
	if err = cmd.Start(); err != nil {
		return Out{}, fmt.Errorf("error starting command: %w", err)
	}

	// Read the output
	var output, errOutput []byte

	var stdoutErr, stderrErr error

	var wg sync.WaitGroup

	wg.Add(workers)

	go func() {
		defer wg.Done()

		output, stdoutErr = io.ReadAll(stdout)
	}()

	go func() {
		defer wg.Done()

		errOutput, stderrErr = io.ReadAll(stderr)
	}()

	wg.Wait()

	if stdoutErr != nil {
		return Out{}, fmt.Errorf("error reading stdout: %w", stdoutErr)
	}

	if stderrErr != nil {
		return Out{}, fmt.Errorf("error reading stderr: %w", stderrErr)
	}

	// Wait for the command to finish
	err = cmd.Wait()
	if err != nil {
		// Include stderr in the error message if available
		if len(errOutput) > 0 {
			return Out{}, fmt.Errorf("command failed: %w\nStderr: %s", err, string(errOutput))
		}

		return Out{}, fmt.Errorf("command failed: %w", err)
	}

	return Out{Stdout: output, Stderr: errOutput}, nil
}

func validAddress(addr string) error {
	pref, _, err := bech32.DecodeAndConvert(addr)
	if err != nil {
		reqInvalidAddrCount.Inc()
		return fmt.Errorf("invalid address: %w", err)
	}

	if pref != "warden" {
		reqInvalidAddrCount.Inc()
		return fmt.Errorf("invalid address prefix: %s", pref)
	}

	return nil
}

func InitFaucet(ctx context.Context, logger zerolog.Logger) (Faucet, error) {
	var err error

	cfg, err := config.LoadConfig()
	if err != nil {
		logger.Fatal().Msgf("error loading config: %s", err)
	}

	f := Faucet{
		config:          cfg,
		Mutex:           &sync.Mutex{},
		Batch:           []string{},
		log:             logger,
		TokensAvailable: float64(cfg.DailyLimit),
		DailySupply:     float64(cfg.DailyLimit),
		Amount:          cfg.Amount,
		DisplayTokens:   bool(cfg.DisplayTokens),
	}

	dailySupply.Set(f.DailySupply)

	if f.config.Mnemonic != "" {
		if err = f.setupNewAccount(ctx); err != nil {
			return Faucet{}, err
		}
	}

	return f, nil
}

func addressInBatch(batch []string, addr string) bool {
	return slices.Contains(batch, addr)
}

func convertHexToBech32(hexAddr string) (string, error) {
	if common.IsHexAddress(hexAddr) {
		addr := common.HexToAddress(hexAddr).Bytes()
		bech32Addr, err := sdk.Bech32ifyAddressBytes("warden", addr)
		// 	addr, err = bech32.ConvertAndEncode("warden", []byte(addr))
		if err != nil {
			return "", fmt.Errorf(
				"error converting hex address to bech32: %w",
				err,
			)
		}

		return bech32Addr, nil
	}

	return "", errors.New("error converting hex address to bech32: address is not hex")
}

func (f *Faucet) Send(ctx context.Context, addr string, force bool) (string, int, error) {
	var err error

	f.Lock()
	defer f.Unlock()

	if f.TokensAvailable <= 0 {
		return "",
			http.StatusTooManyRequests,
			errors.New("no tokens available, please come back tomorrow")
	}

	// if the address is a hex string, convert it to bech32
	if strings.HasPrefix(addr, "0x") {
		addr, err = convertHexToBech32(addr)
		if err != nil {
			return "", http.StatusUnprocessableEntity, err
		}
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

	send := "send"
	if len(f.Batch) > 1 {
		send = "multi-send"
	}

	f.log.Debug().Msgf("sending %f %s to %v", f.config.Amount, f.config.Denom, f.Batch)

	// Convert the float amount to a big.Float.
	amt := new(big.Float).SetFloat64(f.config.Amount)

	// Compute the multiplier as 10^decimals using big.Int and then convert to big.Float.
	multiplierInt := new(big.Int).Exp(big.NewInt(10), big.NewInt(int64(f.config.Exponent)), nil)
	multiplier := new(big.Float).SetInt(multiplierInt)

	// Multiply the amount by the multiplier to shift the decimal point.
	amt.Mul(amt, multiplier)

	// Convert the scaled value to a big.Int, truncating any fractional part.
	intAmt := new(big.Int)
	amt.Int(intAmt)

	// Build the final result string by concatenating the integer amount and the denomination.
	amount := intAmt.String() + f.config.Denom
	f.log.Debug().Msg(amount)

	cmd := strings.Join([]string{
		f.config.CliName,
		"tx",
		"bank",
		send,
		f.config.AccountName,
		strings.Join(f.Batch, " "),
		amount,
		"--yes",
		"--keyring-backend",
		"test",
		"--chain-id",
		f.config.ChainID,
		"--node",
		f.config.Node,
		"--fees",
		f.config.Fees,
		"--gas",
		"auto",
		"--gas-adjustment",
		"1.6",
		"-o",
		"json",
	}, " ")
	f.log.Debug().Msg(cmd)

	out, err := execute(ctx, cmd)
	if err != nil {
		return "", http.StatusInternalServerError, err
	}

	var result struct {
		Code   int    `json:"code"`
		TxHash string `json:"txhash"`
	}

	if err = json.Unmarshal(out.Stdout, &result); err != nil {
		return "", http.StatusInternalServerError, fmt.Errorf(
			"error unmarshalling tx result: %w",
			err,
		)
	}

	if result.Code != 0 {
		return "", http.StatusInternalServerError, fmt.Errorf(
			"tx failed with code %d for address %s",
			result.Code,
			addr,
		)
	}

	f.TokensAvailable = (f.TokensAvailable - float64(len(f.Batch))*f.Amount)
	f.log.Debug().Msgf("tokens available: %f", f.TokensAvailable)
	f.log.Info().Msgf("tokens sent to %v", f.Batch)
	dailySupply.Set(f.TokensAvailable)

	f.Batch = []string{}

	return result.TxHash, http.StatusOK, nil
}

// DailyRefresh.
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

func (f *Faucet) setupNewAccount(ctx context.Context) error {
	cmd := strings.Join([]string{
		"echo",
		f.config.Mnemonic,
		"|",
		f.config.CliName,
		"keys",
		"--keyring-backend",
		"test",
		"add",
		f.config.AccountName,
		"--recover",
	}, " ")

	_, err := execute(ctx, cmd)
	if err != nil {
		return err
	}

	return nil
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
