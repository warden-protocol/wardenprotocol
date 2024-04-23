package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"strconv"
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
	BatchInterval  time.Duration
	BatchLimit     int
}

func ConfigFromEnv() Config {
	cooldown, err := time.ParseDuration(envOrDefault("COOLDOWN", "12h"))
	if err != nil {
		panic(fmt.Sprintf("invalid COOLDOWN: %s", err))
	}

	batchInterval, err := time.ParseDuration(envOrDefault("BATCH_INTERVAL", "8s"))
	if err != nil {
		panic(fmt.Sprintf("invalid BATCH_INTERVAL: %s", err))
	}

	batchLimit, err := strconv.Atoi(envOrDefault("BATCH_LIMIT", "5"))
	if err != nil {
		panic(fmt.Sprintf("invalid BATCH_LIMIT: %s", err))
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
		BatchLimit:     batchLimit,
		BatchInterval:  batchInterval,
	}
}

type Dest struct {
	Address string
	IP      string
	Reset   func()
}

func DestAddresses(d []Dest) []string {
	addrs := make([]string, len(d))
	for i, dest := range d {
		addrs[i] = dest.Address
	}
	return addrs
}

type Client struct {
	cfg     Config
	limiter *Limiter

	batchmu sync.Mutex
	batch   []Dest
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

var ErrRateLimited = errors.New("rate limited")

func (c *Client) Send(ctx context.Context, addr, ip string) error {
	c.batchmu.Lock()
	defer c.batchmu.Unlock()

	reset, err := c.limiter.Allow(addr, ip)
	if err != nil {
		return err
	}

	c.batch = append(c.batch, Dest{Address: addr, IP: ip, Reset: reset})

	if len(c.batch) > c.cfg.BatchLimit {
		return c.sendBatchIfNeeded(ctx)
	}

	return nil
}

func (c *Client) sendBatchLoop(ctx context.Context) {
	ticker := time.NewTicker(c.cfg.BatchInterval)
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := c.sendBatchIfNeededLock(ctx); err != nil {
				log.Printf("error sending batch: %s", err)
			}
		}
	}
}

func (c *Client) sendBatchIfNeededLock(ctx context.Context) error {
	c.batchmu.Lock()
	defer c.batchmu.Unlock()
	return c.sendBatchIfNeeded(ctx)
}

func (c *Client) sendBatchIfNeeded(ctx context.Context) error {
	if len(c.batch) == 0 {
		return nil
	}

	err := c.sendBatch(ctx)
	c.batch = nil
	return err
}

func (c *Client) sendBatch(ctx context.Context) error {
	log.Printf("sending %s to %v", c.cfg.SendDenom, DestAddresses(c.batch))
	send := "send"
	if len(c.batch) > 1 {
		send = "multi-send"
	}
	cmd := strings.Join([]string{
		c.cfg.CliName,
		"tx",
		"bank",
		send,
		c.cfg.AccountName,
		strings.Join(DestAddresses(c.batch), " "),
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
		for _, dest := range c.batch {
			dest.Reset()
		}
		return err
	}

	var result struct {
		Code   int    `json:"code"`
		TxHash string `json:"txhash"`
	}
	if err := json.Unmarshal(out.Stdout, &result); err != nil {
		for _, dest := range c.batch {
			dest.Reset()
		}
		return fmt.Errorf("error unmarshalling tx result: %w", err)
	}
	if result.Code != 0 {
		for _, dest := range c.batch {
			dest.Reset()
		}
		return fmt.Errorf("tx failed with code %d", result.Code)
	}

	err = c.waitTx(ctx, result.TxHash)
	if err != nil {
		for _, dest := range c.batch {
			dest.Reset()
		}
		return fmt.Errorf("error waiting for tx: %w", err)
	}

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

	deadline, cancel := context.WithTimeout(ctx, 10*time.Second)
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

func faucetHandler(c *Client) http.HandlerFunc {
	type Req struct {
		Address string `json:"address"`
	}
	return func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.Error(w, "not found", http.StatusNotFound)
			return
		}

		if r.Method == http.MethodGet {
			w.Header().Set("Content-Type", "text/html")
			w.WriteHeader(http.StatusOK)
			htmlpage := `
<!DOCTYPE html>
<html>
<head>
	<title>Faucet</title>
</head>
<body>
<p>Usage:</p>
<pre>
curl --json '{"address":"$YOUR_ADDRESS"}' \
	http://localhost:8000
</pre>
<script>
	document.querySelector('pre').innerText = document.querySelector('pre').innerText.replace('http://localhost:8000', window.location.href)
</script>
</body>
</html>
`
			if _, err := w.Write([]byte(htmlpage)); err != nil {
				http.Error(w, fmt.Sprintf("error writing response: %v", err), http.StatusInternalServerError)
				return
			}
			return
		}

		req := &Req{}
		if err := json.NewDecoder(r.Body).Decode(req); err != nil {
			http.Error(w, fmt.Sprintf("error decoding request: %v", err), http.StatusBadRequest)
			return
		}

		ip, err := getIP(r)
		if err != nil {
			log.Printf("error getting IP: %s", err)
			http.Error(w, "error getting IP", http.StatusInternalServerError)
			return
		}

		log.Printf("request from %s for %s. Headers: %s", ip, req.Address, r.Header)

		err = c.Send(r.Context(), req.Address, ip)
		if errors.Is(err, ErrRateLimited) {
			log.Printf("error: %v", err)
			http.Error(w, "rate limited", http.StatusTooManyRequests)
			return
		}
		if err != nil {
			log.Printf("error sending to %s: %s", req.Address, err)
			http.Error(w, fmt.Sprintf("error executing cmd: %v", err), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		if _, err := w.Write([]byte("request batched\n")); err != nil {
			http.Error(w, fmt.Sprintf("error writing response: %v", err), http.StatusInternalServerError)
			return
		}
	}
}

func getIP(r *http.Request) (string, error) {
	forwardedFor := r.Header.Get("X-Forwarded-For")
	if forwardedFor != "" {
		hops := strings.SplitN(forwardedFor, ",", 2)
		client := strings.TrimSpace(hops[0])
		return client, nil
	}

	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return "", fmt.Errorf("userip: %q is not IP:port", r.RemoteAddr)
	}
	return ip, nil
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

func (l *Limiter) Allow(keys ...string) (func(), error) {
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, k := range keys {
		if time.Since(l.last[k]) < l.cooldown {
			return nil, fmt.Errorf("%w: key '%s' must wait %s", ErrRateLimited, k, time.Until(l.last[k].Add(l.cooldown)).String())
		}
	}
	for _, k := range keys {
		l.last[k] = time.Now()
	}
	return func() {
		l.Reset(keys...)
	}, nil
}

func (l *Limiter) Reset(key ...string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	for _, k := range key {
		l.last[k] = time.Time{}
	}
}
