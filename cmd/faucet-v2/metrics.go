package main

import (
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
)

var (
	batchSendCount = promauto.NewCounter(prometheus.CounterOpts{
		Namespace: "faucet",
		Name:      "batch_send_count",
		Help:      "The total number of sent batches (success or error)",
	})

	batchSize = promauto.NewGauge(prometheus.GaugeOpts{
		Namespace: "faucet",
		Name:      "batch_size",
		Help:      "The size of the batch of addresses waiting for tokens",
	})

	reqCount = promauto.NewCounter(prometheus.CounterOpts{
		Namespace: "faucet",
		Name:      "req_count",
		Help:      "The total number of faucet requests",
	})

	reqInvalidIPCount = promauto.NewCounter(prometheus.CounterOpts{
		Namespace: "faucet",
		Name:      "req_invalid_ip_count",
		Help:      "The total number of failed requests for invalid IP",
	})

	reqInvalidAddrCount = promauto.NewCounter(prometheus.CounterOpts{
		Namespace: "faucet",
		Name:      "req_invalid_addr_count",
		Help:      "The total number of failed requests for invalid address",
	})

	reqInvalidCaptchaCount = promauto.NewCounter(prometheus.CounterOpts{
		Namespace: "faucet",
		Name:      "req_invalid_captcha_count",
		Help:      "The total number of failed requests for invalid captcha",
	})

	reqErrorCount = promauto.NewCounter(prometheus.CounterOpts{
		Namespace: "faucet",
		Name:      "req_error_count",
		Help:      "The total number of failed requests for errors during send",
	})
)
