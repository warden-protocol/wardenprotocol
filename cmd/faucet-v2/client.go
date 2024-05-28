package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"log/slog"
	"os/exec"
	"strings"
	"sync"
	"time"
)

type Client struct {
	logger *slog.Logger
	cfg    Config

	batchmu sync.Mutex
	batch   map[string]chan error
}

func NewClient(ctx context.Context, logger *slog.Logger, cfg Config) (*Client, error) {
	c := &Client{
		logger: logger,
		cfg:    cfg,
		batch:  make(map[string]chan error),
	}

	if cfg.Mnemonic != "" {
		if _, err := c.setupNewAccount(ctx); err != nil {
			return nil, err
		}
	}

	go c.sendBatchLoop(ctx)

	return c, nil
}

func (c *Client) setupNewAccount(ctx context.Context) (Out, error) {
	// echo $mnemonic | $baseCmd keys add $SK1 --recover
	cmd := strings.Join([]string{
		"echo",
		c.cfg.Mnemonic,
		"|",
		c.cfg.CliName,
		"keys",
		"--keyring-backend",
		c.cfg.KeyringBackend,
		"add",
		c.cfg.AccountName,
		"--recover",
	}, " ")
	return e(ctx, cmd, false)
}

func (c *Client) Send(addr string) chan error {
	c.batchmu.Lock()
	defer c.batchmu.Unlock()

	if len(c.batch) > c.cfg.BatchLimit {
		return nil
	}

	ch := make(chan error, 1)
	c.batch[addr] = ch
	batchSize.Inc()
	slog.Info("add address to batch", "address", addr)
	return ch
}

func (c *Client) sendBatchLoop(ctx context.Context) {
	ticker := time.NewTicker(c.cfg.BatchInterval)
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := c.sendBatchIfNeeded(ctx); err != nil {
				log.Printf("error sending batch: %s", err)
			}
		}
	}
}

func (c *Client) sendBatchIfNeeded(ctx context.Context) error {
	c.batchmu.Lock()
	defer c.batchmu.Unlock()

	if len(c.batch) == 0 {
		return nil
	}

	slog.Info("sending batch", "size", len(c.batch))
	err := c.sendBatch(ctx)
	if err != nil {
		// propagate error to each batch entry
		slog.Error("error sending batch", "err", err)
		for _, dest := range c.batch {
			dest <- err
		}
	} else {
		// clear batch entries chans
		for _, dest := range c.batch {
			close(dest)
		}
	}

	// Clear batch even if the transaction failed, it's easier to not get stuck
	// for some reasons this way. Users can retry using the faucet after a
	// while.
	clear(c.batch)
	batchSize.Set(0)

	return err
}

func (c *Client) sendBatch(ctx context.Context) error {
	send := "send"
	if len(c.batch) > 1 {
		send = "multi-send"
	}

	addrs := make([]string, 0, len(c.batch))
	for addr := range c.batch {
		addrs = append(addrs, addr)
	}

	cmd := strings.Join([]string{
		c.cfg.CliName,
		"tx",
		"bank",
		send,
		c.cfg.AccountName,
		strings.Join(addrs, " "),
		c.cfg.SendDenom,
		"--yes",
		"--keyring-backend",
		c.cfg.KeyringBackend,
		"--chain-id",
		c.cfg.ChainID,
		"--node",
		c.cfg.Node,
		"--gas-prices",
		c.cfg.Fees,
		"-o",
		"json",
	}, " ")

	out, err := e(ctx, cmd, false)
	if err != nil {
		return err
	}

	var result struct {
		Code   int    `json:"code"`
		TxHash string `json:"txhash"`
	}
	if err := json.Unmarshal(out.Stdout, &result); err != nil {
		return fmt.Errorf("error unmarshalling tx result: %w", err)
	}
	if result.Code != 0 {
		return fmt.Errorf("tx failed with code %d", result.Code)
	}

	err = c.waitTx(ctx, result.TxHash)
	if err != nil {
		return fmt.Errorf("error waiting for tx: %w", err)
	}

	batchSendCount.Inc()
	return nil
}

func (c *Client) waitTx(ctx context.Context, txHash string) error {
	cmd := strings.Join([]string{
		c.cfg.CliName,
		"q",
		"tx",
		txHash,
		"--node",
		c.cfg.Node,
		"-o",
		"json",
	}, " ")

	deadline, cancel := context.WithTimeout(ctx, c.cfg.WaitTxTimeout)
	defer cancel()
	ticker := time.NewTicker(1 * time.Second)

	var txErr error
	for {
		select {
		case <-deadline.Done():
			return txErr
		case <-ticker.C:
			out, err := e(ctx, cmd, true)
			if err != nil {
				txErr = err
				continue
			}
			var result struct {
				Code int `json:"code"`
			}
			if err := json.Unmarshal(out.Stdout, &result); err != nil {
				return err
			}
			if result.Code == 0 {
				return nil
			}
		}
	}
}

type Out struct {
	Stdout []byte
	Stderr []byte
}

func e(ctx context.Context, cmd string, silent bool) (Out, error) {
	cccc := exec.CommandContext(ctx, "sh", "-c", cmd)
	stdout, err := cccc.Output()
	var (
		exitErr *exec.ExitError
		stderr  []byte
	)
	if errors.As(err, &exitErr) {
		stderr = exitErr.Stderr
		if !silent {
			log.Printf("failed exec: %s\nstdout: %s\nstderr: %s\n", cmd, string(stdout), string(stderr))
		}
	}
	return Out{Stdout: stdout, Stderr: stderr}, err
}
