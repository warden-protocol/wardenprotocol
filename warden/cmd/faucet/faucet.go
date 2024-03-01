// Copyright 2024
//
// This file includes work covered by the following copyright and permission notices:
//
// Copyright 2023 Qredo Ltd.
// Licensed under the Apache License, Version 2.0;
//
// This file is part of the Warden Protocol library.
//
// The Warden Protocol library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// You should have received a copy of the GNU Lesser General Public License
// along with the Warden Protocol library. If not, see https://github.com/warden-protocol/wardenprotocol/blob/main/LICENSE
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"sync"
	"time"
)

func main() {
	cfg := ConfigFromEnv()
	client, err := NewClient(context.Background(), cfg)
	if err != nil {
		panic(fmt.Sprintf("couldn't setup client: %s", err))
	}

	srv := &http.Server{
		Addr:         ":8000",
		Handler:      faucetHandler(client),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	log.Println("Listening on", srv.Addr)
	if err := srv.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
		panic(err)
	}
}

type Config struct {
	CliName        string
	ChainID        string
	KeyringBackend string
	Node           string
	SendDenom      string
	AccountName    string
	Mnemonic       string
	HDPath         string
	Fees           string
	OtherFlags     string
	Cooldown       time.Duration
}

func ConfigFromEnv() Config {
	cooldown, err := time.ParseDuration(envOrDefault("COOLDOWN", "12h"))
	if err != nil {
		panic(fmt.Sprintf("invalid COOLDOWN: %s", err))
	}

	return Config{
		CliName:        envOrDefault("CLI_NAME", "wardend"),
		ChainID:        envOrDefault("CHAIN_ID", "wardenprotocol"),
		KeyringBackend: envOrDefault("KEYRING_BACKEND", "test"),
		Node:           envOrDefault("NODE", "http://localhost:26657"),
		SendDenom:      envOrDefault("DENOM", "10000000uward"),
		AccountName:    envOrDefault("ACCOUNT_NAME", "shulgin"),
		Mnemonic:       envOrDefault("MNEMONIC", ""),
		HDPath:         envOrDefault("HD_PATH", "m/44'/118'/0'/0/0"),
		Fees:           envOrDefault("FEES", "1uward"),
		OtherFlags:     envOrDefault("OTHER_FLAGS", ""),
		Cooldown:       cooldown,
	}
}

type Client struct {
	cfg     Config
	limiter *Limiter

	sendmu sync.Mutex
}

func NewClient(ctx context.Context, cfg Config) (*Client, error) {
	c := &Client{
		cfg:     cfg,
		limiter: NewLimiter(cfg.Cooldown),
	}

	if cfg.Mnemonic != "" {
		if _, err := c.setupNewAccount(ctx); err != nil {
			return nil, err
		}
	}

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
	return e(ctx, cmd)
}

var ErrRateLimited = errors.New("faucet requests are rate limited")

func (c *Client) Send(ctx context.Context, dest string) (Out, error) {
	c.sendmu.Lock()
	defer c.sendmu.Unlock()

	if !c.limiter.Allow(dest) {
		return Out{}, ErrRateLimited
	}

	// $baseCmd tx bank send shulgin warden1f6zkpwezlw58mssh0qat8d0dvwu3qpw67p83za 100000000nward --yes
	log.Printf("sending %s to %s", c.cfg.SendDenom, dest)
	cmd := strings.Join([]string{
		c.cfg.CliName,
		"tx",
		"bank",
		"send",
		c.cfg.AccountName,
		dest,
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

	out, err := e(ctx, cmd)
	if err != nil {
		c.limiter.Reset(dest)
		return out, err
	}

	var result struct {
		Code   int    `json:"code"`
		TxHash string `json:"txhash"`
	}
	if err := json.Unmarshal(out.Stdout, &result); err != nil {
		c.limiter.Reset(dest)
		return out, fmt.Errorf("error unmarshalling tx result: %w", err)
	}
	if result.Code != 0 {
		c.limiter.Reset(dest)
		return out, fmt.Errorf("tx failed with code %d", result.Code)
	}

	err = c.waitTx(ctx, result.TxHash)
	if err != nil {
		c.limiter.Reset(dest)
		return out, fmt.Errorf("error waiting for tx: %w", err)
	}

	return out, nil
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

	deadline, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	ticker := time.NewTicker(1 * time.Second)

	var txErr error
	for {
		select {
		case <-deadline.Done():
			return txErr
		case <-ticker.C:
			out, err := e(ctx, cmd)
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

func e(ctx context.Context, cmd string) (Out, error) {
	cccc := exec.CommandContext(ctx, "sh", "-c", cmd)
	stdout, err := cccc.Output()
	var (
		exitErr *exec.ExitError
		stderr  []byte
	)
	if errors.As(err, &exitErr) {
		stderr = exitErr.Stderr
		log.Printf("failed exec: %s\nstdout: %s\nstderr: %s\n", cmd, string(stdout), string(stderr))
	}
	return Out{Stdout: stdout, Stderr: stderr}, err
}

func faucetHandler(c *Client) http.HandlerFunc {
	type Req struct {
		Address string `json:"address"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		req := &Req{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			http.Error(w, fmt.Sprintf("error decoding request: %v", err), http.StatusBadRequest)
			return
		}
		out, err := c.Send(r.Context(), req.Address)
		if errors.Is(err, ErrRateLimited) {
			http.Error(w, "rate limited", http.StatusTooManyRequests)
			return
		}
		if err != nil {
			log.Printf("error sending to %s: %s. Tx output: %s", req.Address, err, out)
			http.Error(w, fmt.Sprintf("error executing cmd: %v", err), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if _, err := w.Write(out.Stdout); err != nil {
			http.Error(w, fmt.Sprintf("error writing response: %v", err), http.StatusInternalServerError)
			return
		}
	}
}

func envOrDefault(key, defaultValue string) string {
	v := os.Getenv(key)
	if v == "" {
		return defaultValue
	}
	return v
}

type Limiter struct {
	cooldown time.Duration
	last     map[string]time.Time
	mu       sync.Mutex
}

func NewLimiter(cooldown time.Duration) *Limiter {
	return &Limiter{
		cooldown: cooldown,
		last:     make(map[string]time.Time),
	}
}

func (l *Limiter) Allow(key string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()
	if time.Since(l.last[key]) < l.cooldown {
		return false
	}
	l.last[key] = time.Now()
	return true
}

func (l *Limiter) Reset(key string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.last[key] = time.Time{}
}
