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

	log.Println("Listening on http://localhost:8000")
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
	GasPrices      string
	OtherFlags     string
}

func ConfigFromEnv() Config {
	return Config{
		CliName:        envOrDefault("CLI_NAME", "fusiond"),
		ChainID:        envOrDefault("CHAIN_ID", "fusion_420-1"),
		KeyringBackend: envOrDefault("KEYRING_BACKEND", "test"),
		Node:           envOrDefault("NODE", "http://localhost:26657"),
		SendDenom:      envOrDefault("DENOM", "10000000000nQRDO"),
		AccountName:    envOrDefault("ACCOUNT_NAME", "shulgin"),
		Mnemonic:       envOrDefault("MNEMONIC", ""),
		HDPath:         envOrDefault("HD_PATH", "m/44'/60'/0'/0/0"),
		GasPrices:      envOrDefault("GAS_PRICES", "1000000000nQRDO"),
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

	if err := c.setupConfig(ctx); err != nil {
		return nil, err
	}

	if cfg.Mnemonic != "" {
		if err := c.setupNewAccount(ctx); err != nil {
			return nil, err
		}
	}

	return c, nil
}

func (c *Client) baseCmd() string {
	// Build a string like this:
	// fusiond --node tcp://localhost:26657 --fees 20nQRDO
	return strings.Join([]string{
		c.cfg.CliName,
		"--node",
		c.cfg.Node,
		"--gas-prices",
		c.cfg.GasPrices,
		"--from",
		c.cfg.AccountName,
	}, " ")
}

func (c *Client) setupNewAccount(ctx context.Context) error {
	// echo $mnemonic | $baseCmd keys add $SK1 --recover
	cmd := strings.Join([]string{
		"echo",
		c.cfg.Mnemonic,
		"|",
		c.baseCmd(),
		"keys",
		"add",
		c.cfg.AccountName,
		"--recover",
	}, " ")
	return e(ctx, cmd)
}

func (c *Client) setupConfig(ctx context.Context) error {
	// fusiond config keyring-backend $KEYRING
	cmd := strings.Join([]string{
		c.baseCmd(),
		"config",
		"keyring-backend",
		c.cfg.KeyringBackend,
	}, " ")
	if err := e(ctx, cmd); err != nil {
		return err
	}

	// fusiond config chain-id $CHAINID
	cmd = strings.Join([]string{
		c.baseCmd(),
		"config",
		"chain-id",
		c.cfg.ChainID,
	}, " ")
	if err := e(ctx, cmd); err != nil {
		return err
	}

	return nil
}

func (c *Client) Send(ctx context.Context, dest string) error {
	// $baseCmd tx bank send shulgin qredo1f6zkpwezlw58mssh0qat8d0dvwu3qpw63c64lm 100000000nQRDO --yes
	cmd := strings.Join([]string{
		c.baseCmd(),
		"tx",
		"bank",
		"send",
		c.cfg.AccountName,
		dest,
		c.cfg.SendDenom,
		"--yes",
	}, " ")
	return e(ctx, cmd)
}

func e(ctx context.Context, cmd string) error {
	cccc := exec.CommandContext(ctx, "sh", "-c", cmd)
	output, err := cccc.Output()
	var exitErr *exec.ExitError
	if errors.As(err, &exitErr) {
		log.Println(string(output), string(exitErr.Stderr))
	}
	return err
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
		if err := c.Send(r.Context(), req.Address); err != nil {
			http.Error(w, fmt.Sprintf("error executing cmd: %v", err), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.WriteHeader(http.StatusOK)
		if _, err := w.Write([]byte("OK")); err != nil {
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
