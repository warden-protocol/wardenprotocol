package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/cosmos/cosmos-sdk/types/bech32"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	"github.com/sethvargo/go-envconfig"
)

type Config struct {
	CliName        string `env:"CLI_NAME, default=wardend"`
	ChainID        string `env:"CHAIN_ID, default=warden"`
	KeyringBackend string `env:"KEYRING_BACKEND, default=test"`
	Node           string `env:"NODE, default=http://localhost:26657"`
	SendDenom      string `env:"DENOM, default=10000000uward"`
	AccountName    string `env:"ACCOUNT_NAME, default=shulgin"`
	Mnemonic       string `env:"MNEMONIC"`
	HDPath         string `env:"HD_PATH, default=m/44'/118'/0'/0/0"`
	Fees           string `env:"FEES, default=1uward"`
	OtherFlags     string `env:"OTHER_FLAGS"`

	Cooldown      time.Duration `env:"COOLDOWN, default=12h"`
	BatchInterval time.Duration `env:"BATCH_INTERVAL, default=6s"`
	BatchLimit    int           `env:"BATCH_LIMIT, default=10"`
	WaitTxTimeout time.Duration `env:"WAIT_TX_TIMEOUT, default=15s"`

	RecaptchaSiteKey      string  `env:"RECAPTCHA_SITE_KEY"`
	RecaptchaSecret       string  `env:"RECAPTCHA_SECRET_KEY"`
	RecaptchaMinimumScore float64 `env:"RECAPTCHA_MINIMUM_SCORE, default=0.8"`
}

type Env struct {
	Logger         *slog.Logger
	AddressLimiter *Limiter
	IPLimiter      *Limiter
	Client         *Client
}

func main() {
	ctx := context.Background()
	var c Config
	if err := envconfig.Process(ctx, &c); err != nil {
		log.Fatal(err)
	}

	logger := slog.New(slog.NewJSONHandler(os.Stderr, nil))

	client, err := NewClient(ctx, logger.With("module", "client"), c)
	if err != nil {
		log.Fatalf("can't init client: %v", err)
	}

	env := Env{
		Logger:         logger,
		AddressLimiter: NewLimiter(c.Cooldown),
		IPLimiter:      NewLimiter(c.Cooldown),
		Client:         client,
	}

	http.HandleFunc("/", formHandler(c))
	http.HandleFunc("/submit", submitHandler(c, env))
	http.Handle("/metrics", promhttp.Handler())

	addr := ":8000"
	server := &http.Server{
		Addr:              addr,
		ReadHeaderTimeout: 300 * time.Millisecond,
	}

	logger.Info("faucet started", "addr", addr)
	if err := server.ListenAndServe(); err != nil {
		logger.Error("failed to start server", "error", err)
		os.Exit(1)
	}
}

func formHandler(c Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		addr := r.FormValue("addr")

		err := homepage.Execute(w, struct {
			C       Config
			Address string
		}{C: c, Address: addr})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func submitHandler(c Config, e Env) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		reqCount.Inc()

		address := r.FormValue("address")
		if len(address) == 0 {
			http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
			return
		}

		remoteIP, err := getIP(r)
		if err != nil {
			e.Logger.Info("couldn't get remote ip", "err", err)
			writeBadRequest(w, "Error: couldn't fetch your remote IP address.")
			reqInvalidIPCount.Inc()
			return
		}

		if err := validateIP(e, remoteIP); err != nil {
			e.Logger.Info("invalid ip", "ip", remoteIP, "err", err)
			var rateLimitErr RateLimitError
			if errors.As(err, &rateLimitErr) {
				writeBadRequest(w, fmt.Sprintf("Error: your IP address is rate limited. Wait %s before trying again.", prettyDuration(rateLimitErr.Wait)))
			} else {
				writeBadRequest(w, "Error: your IP can't request tokens at this time. Try again later.")
			}
			reqInvalidIPCount.Inc()
			return
		}

		if err := validateAddress(e, address); err != nil {
			e.Logger.Info("invalid address", "ip", remoteIP, "address", address, "err", err)
			var rateLimitErr RateLimitError
			if errors.As(err, &rateLimitErr) {
				writeBadRequest(w, fmt.Sprintf("Error: your address is rate limited. Wait %s before trying again.", prettyDuration(rateLimitErr.Wait)))
			} else {
				writeBadRequest(w, "Error: your address is invalid. Try again.")
			}
			reqInvalidAddrCount.Inc()
			return
		}

		recaptchaResponse := r.FormValue("g-recaptcha-response")
		if err := validateRecaptcha(c, recaptchaResponse, remoteIP); err != nil {
			e.Logger.Info("invalid captcha", "ip", remoteIP, "address", address, "err", err)
			writeBadRequest(w, "Error: captcha failed.")
			reqInvalidCaptchaCount.Inc()
			return
		}

		if err := <-e.Client.Send(address); err != nil {
			e.Logger.Info("failed send", "ip", remoteIP, "address", address, "err", err)
			e.IPLimiter.Reset(remoteIP)
			e.AddressLimiter.Reset(address)
			writeInternalServerError(w, "Error: an unexpected error occurred while sending the transaction.")
			reqErrorCount.Inc()
			return
		}

		if err := successpage.Execute(w, nil); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			reqErrorCount.Inc()
			return
		}
	}
}

func validateAddress(e Env, addr string) error {
	// check format
	pref, _, err := bech32.DecodeAndConvert(addr)
	if err != nil {
		return fmt.Errorf("invalid address: %w", err)
	}
	if pref != "warden" {
		return fmt.Errorf("invalid address prefix: %s", pref)
	}

	// check rate-limit
	if err := e.AddressLimiter.Allow(addr); err != nil {
		return err
	}

	return nil
}

func validateIP(e Env, remoteIP string) error {
	return e.IPLimiter.Allow(remoteIP)
}

func validateRecaptcha(c Config, recaptchaResponse, remoteIP string) error {
	resp, err := http.PostForm("https://www.google.com/recaptcha/api/siteverify", url.Values{
		"secret":   {c.RecaptchaSecret},
		"response": {recaptchaResponse},
		"remoteip": {remoteIP},
	})
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var result struct {
		Success     bool     `json:"success"`
		Score       float64  `json:"score"`
		Action      string   `json:"action"`
		ChallengeTs string   `json:"challenge_ts"`
		Hostname    string   `json:"hostname"`
		ErrorCodes  []string `json:"error-codes"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return err
	}

	if !result.Success || result.Score < c.RecaptchaMinimumScore {
		return fmt.Errorf("verification failed")
	}

	return nil
}

func writeBadRequest(w http.ResponseWriter, msg string) {
	writeError(w, http.StatusBadRequest, msg)
}

func writeInternalServerError(w http.ResponseWriter, msg string) {
	writeError(w, http.StatusInternalServerError, msg)
}

func writeError(w http.ResponseWriter, status int, msg string) {
	w.WriteHeader(status)
	_ = errorpage.Execute(w, msg)
}

func prettyDuration(d time.Duration) string {
	var seconds time.Duration = 1000000000
	return d.Round(seconds).String()
}
