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
}

func ConfigFromEnv() Config {
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
	}
}

type Client struct {
	cfg Config
}

func NewClient(ctx context.Context, cfg Config) (*Client, error) {
	c := &Client{
		cfg: cfg,
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

func (c *Client) Send(ctx context.Context, dest string) (Out, error) {
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
	return e(ctx, cmd)
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
		if err != nil {
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
